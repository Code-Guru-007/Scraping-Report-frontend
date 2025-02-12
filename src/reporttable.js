import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Box,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Button,
    Tooltip
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';

export default function ReportTable(props) {
    const { rows, category, setFilterDate } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('dateTime');

    // Load page number from localStorage
    const [page, setPage] = useState(() => {
        return parseInt(localStorage.getItem("pageNumber")) || 0;
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();


    useEffect(() => {
        setPage(0);
        localStorage.setItem("pageNumber", 0);
    }, [category]);

    const viewPdf = (row) => {
        navigate(`/pdf/${row.fileName.split('.')[0]}`, { 
            state: { 
                fileLink: row.fileLink,
            } 
        });
    };

    useEffect(() => {
        localStorage.setItem("pageNumber", page); // Store page number
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        localStorage.setItem("pageNumber", newPage); // Save new page number
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        localStorage.setItem("pageNumber", 0); // Reset to first page when changing rows per page
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort((a, b) => (order === 'asc' ? (a.dateTime > b.dateTime ? 1 : -1) : (a.dateTime < b.dateTime ? 1 : -1)))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [rows, order, orderBy, page, rowsPerPage]
    );

    return (
        <Paper sx={{ p: 4 }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h5" id="tableTitle" component="div">
                    {category.title}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker 
                            onChange={(newValue) => setFilterDate(newValue)}
                            label="Date Filter" 
                            slotProps={{field: {clearable: true}}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">No</TableCell>
                            <TableCell align="right">Date and Time</TableCell>
                            <TableCell align="right">Scrape Status</TableCell>
                            <TableCell align="right">File Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                                <TableCell align="right">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell align="right">{new Date(row.dateTime).toLocaleString()}</TableCell>
                                <TableCell align="right">{row.status ? "Yes" : "No"}</TableCell>
                                <TableCell align="right">{row.fileName}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title={row.fileLink}>
                                        <Button variant="outlined" onClick={() => viewPdf(row)}>
                                            View PDF
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
