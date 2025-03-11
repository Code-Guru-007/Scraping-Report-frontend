import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Typography, Paper, Grid, MenuItem, MenuList, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ReportTable from './reporttable';

export default function HomePage() {

    ////////////////    Start Const Variable //////////////////////
    const menuItems = useMemo(
        () => [
        { 
            label: 'Assistente Normativa', 
            title: 'www.normattiva.it/ricerca/elencoPerData',
            type: 'normative',
            ftpPath: '/normative/downloaded',
            subMenu: [] 
        },
        { 
            label: 'Assistente Cassazione', 
            type: 'sentenze_cassazione',
            subMenu: [
                { 
                    title: 'www.italgiure.giustizia.it/sncass/',
                    label: "Civile", 
                    subType: "snciv",
                    ftpPath: '/sentenze_cassazione_civile/downloaded',
                },
                { 
                    title: 'www.italgiure.giustizia.it/sncass/',
                    label: "Penale", 
                    subType: "snpen",
                    ftpPath: '/sentenze_cassazione_penale/downloaded',
                },
            ] 
        },
        {
            label: 'Assistente Tributano',
            type: 'def.finanze.it',
            subMenu: [
                { 
                    title: 'def.finanze.it/DocTribFrontend/RS2_HomePage.jsp',
                    ftpPath: '/fisco/downloaded/def.finanze.it',
                    label: 'Normativa Tributaria', 
                    subType: 'Normativa' 
                },
                { 
                    title: 'def.finanze.it/DocTribFrontend/RS2_HomePage.jsp',
                    ftpPath: '/fisco/downloaded/def.finanze.it',
                    label: 'Prassi Tributaria', 
                    subType: 'Prassi' 
                },
                { 
                    title: 'def.finanze.it/DocTribFrontend/RS2_HomePage.jsp',
                    ftpPath: '/fisco/downloaded/def.finanze.it',
                    label: 'Giurisprudenza Tributaria', 
                    subType: 'Giurisprudenza' 
                },
            ],
        },
        { 
            label: 'Assistente Sentenze Di Merito',
            type: 'merito',
            subMenu: [
                { 
                    title: 'www.ilmerito.it/bancadati/index.php?pag_id=43&tipo=4',
                    ftpPath: '/sentenze_merito/downloaded',
                    label: 'Il Merito', 
                    subType: 'ilmerito' 
                },
                { 
                    title: 'apps.dirittopratico.it/sentenze.html',
                    ftpPath: '/sentenze_merito/downloaded/',
                    label: 'Dirittopratico', 
                    subType: 'dirittopratico' 
                },
            ]
        },
        ],
        []
    );

    const [selectedMenu, setSelectedMenu] = useState(
        () => parseInt(localStorage.getItem('selectedMenu')) || 0
    );
    const [subType, setSubType] = useState(() => (localStorage.getItem('subType') || ''));
    const [filterDate, setFilterDate] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(() => parseInt(localStorage.getItem('pageNumber')) || 0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState(() => (JSON.parse(localStorage.getItem('openSubmenus')) || {}));
    const [dailyData, setDailyData] = useState({});
    const [reportDate, setReportDate] = useState(new Date().toUTCString().split("T")[0]);
    const [category, setCategory] = useState({
        type: localStorage.getItem('menuItemType') || 'normative'
    })

    ////////////////    End Const Variable //////////////////////
    


    ///////////     Start   useEffect        ////////////

    useEffect(() => {
        fetchDailyData();
        localStorage.setItem('selectedMenu', selectedMenu);
    }, [selectedMenu]);

    useEffect(() => {
        const fetchPDFData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://188.245.216.211:8000/api/${category.type}?filterDate=${filterDate}&page=${page}&rowsPerPage=${rowsPerPage}&subType=${subType}`
                );
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
        fetchDailyData();
        fetchPDFData();
    }, [filterDate, category, page, rowsPerPage, subType]);

    ///////////     End   useEffect        ////////////
    
    ///////////     Start   function       ////////////

    const handleMenuSelect = useCallback((menuIndex, ftpPath, title, subTypeValue = '') => {
        const lastCategory = localStorage.getItem('menuItemType') || 'normative';
        if (menuItems[menuIndex].type !== lastCategory) {
            setPage(0);
            localStorage.setItem('pageNumber', 0);
        }
        localStorage.setItem('menuItemType', menuItems[menuIndex].type);
        setCategory({
            type: menuItems[menuIndex].type,
            ftpPath: ftpPath,
            title: title
        })
        setSelectedMenu(menuIndex);
        setSubType(subTypeValue);
        localStorage.setItem('selectedMenu', menuIndex);
        localStorage.setItem('pageNumber', 0);
        localStorage.setItem('subType', subTypeValue);
        setPage(0);
    }, [menuItems]);

    const toggleSubmenu = (menuIndex) => {
        setOpenSubmenus((prev) => {
            const newState = { ...prev, [menuIndex]: !prev[menuIndex] };
            localStorage.setItem('openSubmenus', JSON.stringify(newState)); // Save to storage
            return newState;
        });
    };

    const fetchDailyData = async () => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
        try {
            setReportDate(currentDate)
            const res = await axios.get(`http://188.245.216.211:8000/api/report?reportDate=${currentDate}`);
            if (res.data.status === "success") {
                setDailyData(res.data.report); 
            }
        } catch (error) {
            console.error("Error fetching daily data:", error);
        }
    };
    

    ///////////     End   useEffect        ////////////
    

    return (
        <>
        <Container>
            <Typography sx={{ textAlign: 'center', my: 4 }} variant="h3" id="tableTitle">
            SCRAPING CHECK
            </Typography>
        </Container>
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3}>
                <Paper sx={{ px: 2, py: 4 }}>
                    <MenuList>
                        <MenuItem disabled sx={{opacity: "1!important", display: "flex", flexDirection: "row-reverse", pr: "46px"}}> {reportDate}</MenuItem>
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
                                            ? !loading && handleMenuSelect(index, item.ftpPath, item.title)
                                            : toggleSubmenu(index) // Only toggle expand/collapse for submenus
                                    }
                                    disabled={loading}
                                >   
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        {item.label}
                                        {item.subMenu.length === 0 && (<p style={{margin: "0 30px 0 0"}}>{dailyData[menuItems[index].type]}</p>)}
                                        {item.subMenu.length > 0 && (openSubmenus[index] ? <ExpandLess /> : <ExpandMore />)}
                                    </div>
                                </MenuItem>
                                {item.subMenu.length > 0 && (
                                    <Collapse in={openSubmenus[index]} timeout="auto" unmountOnExit>
                                        <MenuList component="div" disablePadding>
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <MenuItem
                                                    key={subIndex}
                                                    sx={{ pl: 4 }}
                                                    selected={selectedMenu === index && subType === subItem.subType}
                                                    onClick={() => handleMenuSelect(index, subItem.ftpPath, subItem.title, subItem.subType)}
                                                    disabled={loading}
                                                >
                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                        {subItem.label}
                                                        <p style={{margin: "0 30px 0 0"}}>{dailyData[subItem.subType]}</p>
                                                    </div>
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
            <Grid item xs={9}>
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
