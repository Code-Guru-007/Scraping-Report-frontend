import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
    Box,
    Container,
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
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
    Link
} from '@mui/material';
import { 
    DeleteIcon,
    CalendarMonth,
    FilterListIcon,
    HighlightOff
} from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios'


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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
        label: 'File Link',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//     const { numSelected } = props;
//     return (
//         <Toolbar
//             sx={[
//                 {
//                     pl: { sm: 2 },
//                     pr: { xs: 1, sm: 1 },
//                 },
//                 numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 },
//             ]}
//         >
//             {numSelected > 0 ? (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     color="inherit"
//                     variant="subtitle1"
//                     component="div"
//                 >
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     variant="h6"
//                     id="tableTitle"
//                     component="div"
//                 >
//                     Nutrition
//                 </Typography>
//             )}
//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// }

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    // const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [filterDate, setFilterDate] = React.useState();

    React.useEffect(() => {
        console.log(filterDate)
        axios.get(`http://188.245.216.211:8000/api/normattiva?filterDate=${filterDate}`)
        .then((res) => {
            console.log(res.data)
            if(res.data.status === "success")
                setRows(res.data.reports)
        })
    },[filterDate])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onDateChange = (e) => {
        console.log(e)
    }

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //     const newSelected = rows.map((n) => n.id);
    //     setSelected(newSelected);
    //     return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //     );
    //     }
    //     setSelected(newSelected);
    // };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString(); // Uses system locale
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [rows, order, orderBy, page, rowsPerPage],
    );

    return (
        <>
            <Container>
                <Typography
                    sx={{ textAlign: 'center', my: 4 }}
                    variant="h3"
                    id="tableTitle"
                    component="div"
                >
                    SCRAPING CHECK
                </Typography>
            </Container>
            <Container >
                <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
                    <Toolbar
                        sx={[
                            {
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },
                            }
                        ]}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%', mb: 1 }}
                            variant="h5"
                            id="tableTitle"
                            component="div"
                        >
                            www.normattiva.it
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
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <EnhancedTableHead
                                // numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                // onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    // const isItemSelected = selected.includes(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            // aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={labelId}
                                            // selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell align="right">{index+1}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align='right'
                                            >
                                                {formatDateTime(row.dateTime)}
                                            </TableCell>
                                            <TableCell align="right">{row.status ? "Yes" : "No"}</TableCell>
                                            <TableCell align="right">{row.fileName}</TableCell>
                                            <TableCell align="right"><Link href={`/pdf/${row.fileName.split('.')[0]}`} target="_blank" rel="noopener noreferrer">{row.fileLink} </Link></TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
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
            </Container>
        </>
    );
}
