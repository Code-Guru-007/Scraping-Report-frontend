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
    Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const rows = [
    { id: 1, dateTime: '2024-02-05 10:00:00', status: 'Yes', fileName: 'report1.pdf', fileLink: 'https://example.com/report1.pdf' },
    { id: 2, dateTime: '2024-02-05 10:30:00', status: 'No', fileName: 'data_export.pdf', fileLink: 'https://example.com/data_export.pdf' },
    { id: 3, dateTime: '2024-02-05 11:00:00', status: 'Yes', fileName: 'error_log.pdf', fileLink: 'https://example.com/error_log.pdf' },
    { id: 4, dateTime: '2024-02-05 11:30:00', status: 'No', fileName: 'summary.pdf', fileLink: 'https://example.com/summary.pdf' },
    { id: 5, dateTime: '2024-02-05 12:00:00', status: 'Yes', fileName: 'invoice_2024.pdf', fileLink: 'https://example.com/invoice_2024.pdf' },
    { id: 6, dateTime: '2024-02-05 12:30:00', status: 'Yes', fileName: 'financial_report.pdf', fileLink: 'https://example.com/financial_report.pdf' },
    { id: 7, dateTime: '2024-02-05 13:00:00', status: 'Yes', fileName: 'meeting_notes.pdf', fileLink: 'https://example.com/meeting_notes.pdf' },
    { id: 8, dateTime: '2024-02-05 13:30:00', status: 'No', fileName: 'project_plan.pdf', fileLink: 'https://example.com/project_plan.pdf' },
    { id: 9, dateTime: '2024-02-05 14:00:00', status: 'Yes', fileName: 'contract_agreement.pdf', fileLink: 'https://example.com/contract_agreement.pdf' },
    { id: 10, dateTime: '2024-02-05 14:30:00', status: 'No', fileName: 'training_manual.pdf', fileLink: 'https://example.com/training_manual.pdf' },
    { id: 11, dateTime: '2024-02-05 15:00:00', status: 'Yes', fileName: 'proposal.pdf', fileLink: 'https://example.com/proposal.pdf' },
    { id: 12, dateTime: '2024-02-05 15:30:00', status: 'Yes', fileName: 'resume.pdf', fileLink: 'https://example.com/resume.pdf' },
    { id: 13, dateTime: '2024-02-05 16:00:00', status: 'Yes', fileName: 'design_specs.pdf', fileLink: 'https://example.com/design_specs.pdf' },
    { id: 14, dateTime: '2024-02-05 16:30:00', status: 'No', fileName: 'audit_report.pdf', fileLink: 'https://example.com/audit_report.pdf' },
    { id: 15, dateTime: '2024-02-05 17:00:00', status: 'Yes', fileName: 'safety_guidelines.pdf', fileLink: 'https://example.com/safety_guidelines.pdf' },
    { id: 16, dateTime: '2024-02-05 17:30:00', status: 'No', fileName: 'performance_review.pdf', fileLink: 'https://example.com/performance_review.pdf' },
    { id: 17, dateTime: '2024-02-05 18:00:00', status: 'Yes', fileName: 'business_strategy.pdf', fileLink: 'https://example.com/business_strategy.pdf' },
    { id: 18, dateTime: '2024-02-05 18:30:00', status: 'No', fileName: 'user_guide.pdf', fileLink: 'https://example.com/user_guide.pdf' },
    { id: 19, dateTime: '2024-02-05 19:00:00', status: 'No', fileName: 'team_schedule.pdf', fileLink: 'https://example.com/team_schedule.pdf' },
    { id: 20, dateTime: '2024-02-05 19:30:00', status: 'No', fileName: 'technical_documentation.pdf', fileLink: 'https://example.com/technical_documentation.pdf' },
];

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
        id: 'dateTime',
        numeric: false,
        disablePadding: true,
        label: 'Date and  Time',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Scrape Status',
    },
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'No',
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
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }
        setSelected(newSelected);
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
        [order, orderBy, page, rowsPerPage],
    );

    return (
    <>
        <Container>
            <Typography
                sx={{ textAlign: 'center', my: 6}}
                variant="h3"
                id="tableTitle"
                component="div"
            >
                SCRAPING CHECK
            </Typography>
        </Container>
        <Container >
            <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
                <Typography
                    sx={{ flex: '1 1 100%', mb: 1}}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                >
                    www.normattiva.it
                </Typography>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = selected.includes(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.dateTime}
                                </TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.fileName}</TableCell>
                                <TableCell align="right">{row.fileLink}</TableCell>
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
