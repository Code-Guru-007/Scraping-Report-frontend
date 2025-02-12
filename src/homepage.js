import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Typography, Paper, Grid, MenuItem, MenuList } from '@mui/material';
import axios from 'axios';
import ReportTable from './reporttable';

export default function HomePage() {
    const menuItems = useMemo(() => ["Normattiva", "Normattiva Local"], []);
    const categoryList = useMemo(() => [
        { title: "www.normattiva.it", type: "normattiva" },
        { title: "www.agenziaentrate.gov.it", type: "normattiva_local" }
    ], []);

    // Retrieve selected menu and page number from localStorage
    const [selectedMenu, setSelectedMenu] = useState(() => {
        return parseInt(localStorage.getItem("selectedMenu")) || 0;
    });
    const [filterDate, setFilterDate] = useState(null);
    const [rows, setRows] = useState([]);

    const category = useMemo(() => categoryList[selectedMenu], [selectedMenu, categoryList]);

    useEffect(() => {
        localStorage.setItem("selectedMenu", selectedMenu); // Save selection
    }, [selectedMenu]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://188.245.216.211:8000/api/${category.type}?filterDate=${filterDate}`);
                if (res.data.status === "success") {
                    setRows(res.data.reports);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [filterDate, category]);

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
                                    onClick={() => handleMenuSelect(index)}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <ReportTable rows={rows} setFilterDate={setFilterDate} category={category} />
                </Grid>
            </Grid>
        </>
    );
}
