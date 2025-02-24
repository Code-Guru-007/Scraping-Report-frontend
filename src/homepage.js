import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Typography, Paper, Grid, MenuItem, MenuList, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ReportTable from './reporttable';

export default function HomePage() {
    const menuItems = useMemo(
        () => [
        { label: 'Normativa Nazionale', subMenu: [] },
        { label: 'Sentenze Cassazione', subMenu: [] },
        {
            label: 'Sentenze Tributarie',
            subMenu: [
            { label: 'Normativa Tributaria', subType: 'Normativa' },
            { label: 'Prassi Tributaria', subType: 'Prassi' },
            { label: 'Giurisprudenza Tributaria', subType: 'Giurisprudenza' },
            ],
        },
        ],
        []
    );

    const categoryList = useMemo(
        () => [
        {
            title: 'www.normattiva.it/ricerca/elencoPerData',
            type: 'normative',
            ftpPath: 'DB-Legale-doc/normative/downloaded',
        },
        {
            title: 'www.italgiure.giustizia.it/sncass/',
            type: 'sentenze_cassazione',
            ftpPath: 'DB-Legale-doc/sentenze_cassazione/downloaded',
        },
        {
            title: 'def.finanze.it/DocTribFrontend/RS2_HomePage.jsp',
            type: 'def.finanze.it',
            ftpPath: 'DB-Legale-doc/fisco/downloaded/def.finanze.it',
        },
        ],
        []
    );

    const [selectedMenu, setSelectedMenu] = useState(
        () => parseInt(localStorage.getItem('selectedMenu')) || 0
    );
    const [subType, setSubType] = useState('');
    const [filterDate, setFilterDate] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(() => parseInt(localStorage.getItem('pageNumber')) || 0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(false);

    const category = useMemo(() => {
        const lastCategory = localStorage.getItem('categoryType') || 'normattiva';
        if (categoryList[selectedMenu].type !== lastCategory) {
        setPage(0);
        localStorage.setItem('pageNumber', 0);
        }
        localStorage.setItem('categoryType', categoryList[selectedMenu].type);
        return categoryList[selectedMenu];
    }, [selectedMenu, categoryList]);

    useEffect(() => {
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://188.245.216.211:8000/api/${category.type}?filterDate=${filterDate}&page=${page}&rowsPerPage=${rowsPerPage}&subType=${subType}`
            );
            // const res = await axios.get(
            //     `http://localhost:8000/api/${category.type}?filterDate=${filterDate}&page=${page}&rowsPerPage=${rowsPerPage}&subType=${subType}`
            // );
            if (res.data.status === 'success') {
                setRows(res.data.reports);
                setTotal(res.data.total);
            } else {
                setRows([]);
                setTotal(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setRows([]);
            setTotal(0);
        }
        setLoading(false);
        };
        fetchData();
    }, [filterDate, category, page, rowsPerPage, subType]);

    const handleMenuSelect = useCallback((menuIndex, subTypeValue = '') => {
        setSelectedMenu(menuIndex);
        localStorage.setItem('selectedMenu', menuIndex);
        localStorage.setItem('pageNumber', 0);
        setPage(0);
        setSubType(subTypeValue);
    }, []);

    return (
        <>
        <Container>
            <Typography sx={{ textAlign: 'center', my: 4 }} variant="h3" id="tableTitle">
            SCRAPING CHECK
            </Typography>
        </Container>
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={2}>
            <Paper sx={{ px: 2, py: 4 }}>
                <MenuList>
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                    <MenuItem
                        selected={
                        item.subMenu.length > 0
                            ? !subType && selectedMenu === index
                            : selectedMenu === index
                        }
                        onClick={() =>
                        item.subMenu.length === 0
                            ? !loading && handleMenuSelect(index)
                            : setOpenSubmenu((prev) => !prev)
                        }
                        disabled={loading}
                    >   
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            {item.label}
                            {item.subMenu.length > 0 && (openSubmenu ? <ExpandLess /> : <ExpandMore />)}
                        </div>
                    </MenuItem>
                    {item.subMenu.length > 0 && (
                        <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                        <MenuList component="div" disablePadding>
                            {item.subMenu.map((subItem, subIndex) => (
                            <MenuItem
                                key={subIndex}
                                sx={{ pl: 4 }}
                                selected={selectedMenu === index && subType === subItem.subType}
                                onClick={() => handleMenuSelect(index, subItem.subType)}
                            >
                                {subItem.label}
                            </MenuItem>
                            ))}
                        </MenuList>
                        </Collapse>
                    )}
                    </React.Fragment>
                ))}
                </MenuList>
            </Paper>
            </Grid>
            <Grid item xs={10}>
            <ReportTable
                total={total}
                loading={loading}
                rows={rows}
                page={page}
                category={category}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
                setFilterDate={setFilterDate}
            />
            </Grid>
        </Grid>
        </>
    );
}
