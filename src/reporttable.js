import { useEffect } from 'react';
import {
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    Button,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'No',
    },
    {
        id: 'dateTime',
        numeric: true,
        disablePadding: false,
        label: 'Date and  Time',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Scrape Status',
    },
    {
        id: 'fileName',
        numeric: true,
        disablePadding: false,
        label: 'File Name',
    },
    {
        id: 'fileLink',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];


function EnhancedTableHead(props) {

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                        
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function ReportTable(props) {
    const { rows, page, loading, category, setFilterDate, setPage, rowsPerPage, setRowsPerPage, total, setDocDate, showDocDate} = props;

    console.log(category)
    // Load page number from localStorage
    

    const viewPdf = (row) => {
        // const fileLink = `http://localhost:8000/api/pdf?pdfPath=${category.ftpPath}/${row.fileLink}`
        const fileLink = `http://188.245.216.211:8000/api/pdf?pdfPath=${category.ftpPath}/${row.fileLink}`
        // const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileLink)}`;
        // const googleViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(fileLink)}`;

        // window.open(googleViewerUrl, '_blank');
        window.open(fileLink, '_blank');
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

    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h5" id="tableTitle" component="div">
                {category.title}
            </Typography>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                {/* <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}> */}
                    <Typography variant="h6" id="tableTitle" component="div" sx={{mr: 2}}>
                        {`${total} Documents`}
                    </Typography>
                    <div style={{display: "flex", gap: "15px"}}>
                        {showDocDate && <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Auto-detect local timezone
                                            const localDate = dayjs(newValue).tz(userTimezone).format('YYYY-MM-DD');
                                            setDocDate(localDate);
                                        } else {
                                            setDocDate(null);
                                        }
                                    }}
                                    label="Doc Date" 
                                    slotProps={{field: {clearable: true}}}
                                />
                            </DemoContainer>
                        </LocalizationProvider>}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Auto-detect local timezone
                                            const localDate = dayjs(newValue).tz(userTimezone).format('YYYY-MM-DD');
                                            setFilterDate(localDate);
                                        } else {
                                            setFilterDate(null);
                                        }
                                    }}
                                    label="Scrape Date" 
                                    slotProps={{field: {clearable: true}}}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                {/* </div> */}
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead/>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={headCells.length} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                                ):(
                                rows.map((row, index) => (
                                    <TableRow hover role="checkbox" key={index} sx={{ cursor: 'pointer' }}>
                                        <TableCell align="right">{total - page * rowsPerPage - index}</TableCell>
                                        <TableCell align="right">{new Date(row.dateTime).toLocaleString()}</TableCell>
                                        <TableCell align="right">{row.status ? "Yes" : "No"}</TableCell>
                                        <TableCell align="right">{row.fileName}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={`DB-Legale-doc${category.ftpPath}/${row.fileLink}`}>
                                                <Button variant="outlined" onClick={() => viewPdf(row)}  disabled={!row.status}>
                                                    View PDF
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                                )}
                        </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100, 500, 1000]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                disabled={loading}
            />
        </Paper>
    );
}
