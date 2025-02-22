import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    Container, 
    Typography, 
    Paper, 
    Grid, 
    MenuItem, 
    MenuList, 
} from '@mui/material';
import axios from 'axios';
import ReportTable from './reporttable';

export default function HomePage() {
    const menuItems = useMemo(() => ["Normativa Nazionale", "Sentenze Cassazione", "def.finanze.it"], []);
    const categoryList = useMemo(() => [
        { title: "www.normattiva.it/ricerca/elencoPerData", type: "normative", ftpPath: "DB-Legale-doc/normative/downloaded"},
        { title: "www.italgiure.giustizia.it/sncass/", type: "sentenze_cassazione", ftpPath: "DB-Legale-doc/sentenze_cassazione/downloaded"},
        { title: "def.finanze.it/DocTribFrontend/RS2_HomePage.jsp", type: "def.finanze.it", ftpPath: "DB-Legale-doc/fisco/downloaded/def.finanze.it"}
    ], []);

    // Retrieve selected menu and page number from localStorage
    const [selectedMenu, setSelectedMenu] = useState(() => {
        return parseInt(localStorage.getItem("selectedMenu")) || 0;
    });
    const [filterDate, setFilterDate] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(() => {
        return parseInt(localStorage.getItem("pageNumber")) || 0;
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const category = useMemo(() => {
        const last_category = localStorage.getItem("categoryType") || "normattiva"
        if(categoryList[selectedMenu].type !== last_category) {
            setPage(0);
            localStorage.setItem("pageNumber", 0);
        }
        localStorage.setItem("categoryType", categoryList[selectedMenu].type);
        return categoryList[selectedMenu]
    }, [selectedMenu, categoryList]);


    useEffect(() => {
        localStorage.setItem("selectedMenu", selectedMenu); // Save selection
    }, [selectedMenu]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                const res = await axios.get(`http://188.245.216.211:8000/api/${category.type}?filterDate=${filterDate}&page=${page}&rowsPerPage=${rowsPerPage}`);
                // const res = await axios.get(`http://localhost:8000/api/${category.type}?filterDate=${filterDate}&page=${page}&rowsPerPage=${rowsPerPage}`);
                if (res.data.status === "success") {
                    setRows(res.data.reports);
                    setTotal(res.data.total);
                } else {
                    setRows([]);
                    setTotal(0);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setRows([]);
                setTotal(0);
            }
            setLoading(false); // Stop loading
        };
        fetchData();
    }, [filterDate, category, page, rowsPerPage]);

    const handleMenuSelect = useCallback((index) => {
        setSelectedMenu(index);
        localStorage.setItem("selectedMenu", index); // Store in localStorage
        localStorage.setItem("pageNumber", 0);
    }, []);

    return (
        <>
            <Container>
                <Typography sx={{ textAlign: 'center', my: 4 }} variant="h3" id="tableTitle">
                    SCRAPING CHECK
                </Typography>
            </Container>
            <Grid container spacing={2} style={{ padding: 16 }}>
                <Grid item xs={2}>
                    <Paper sx={{ px: 2, py: 4 }}>
                        <MenuList style={{ width: "100%" }}>
                            {menuItems.map((item, index) => (
                                <MenuItem 
                                    key={index} 
                                    selected={selectedMenu === index} 
                                    onClick={() => !loading && handleMenuSelect(index)} 
                                    disabled={loading}
                                >
                                    {item}
                                </MenuItem>
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
