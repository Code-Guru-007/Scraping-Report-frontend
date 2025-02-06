import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Container,
    Paper,
} from '@mui/material';

const columns = [
    { field: 'dateTime', headerName: 'Date Time' },
    { field: 'status', headerName: 'Status' },
    { field: 'id', headerName: 'ID' },
    { field: 'fileName', headerName: 'File Name' },
    { field: 'fileLink', headerName: 'File Link' },
];

const rows = [
    { id: 1, dateTime: '2024-02-05 10:00:00', status: 'Yes', fileName: 'report1.pdf', fileLink: 'https://example.com/report1.pdf' },
    { id: 2, dateTime: '2024-02-05 10:30:00', status: 'No', fileName: 'data_export.pdf', fileLink: 'https://example.com/data_export.pdf' },
    { id: 3, dateTime: '2024-02-05 11:00:00', status: 'Yes', fileName: 'error_log.pdf', fileLink: 'https://example.com/error_log.pdf' },
    { id: 4, dateTime: '2024-02-05 11:30:00', status: 'No', fileName: 'summary.pdf', fileLink: 'https://example.com/summary.pdf' },
    { id: 5, dateTime: '2024-02-05 12:00:00', status: 'Yes', fileName: 'invoice_2024.pdf', fileLink: 'https://example.com/invoice_2024.pdf' },
    { id: 6, dateTime: '2024-02-05 12:30:00', status: 'No', fileName: 'financial_report.pdf', fileLink: 'https://example.com/financial_report.pdf' },
    { id: 7, dateTime: '2024-02-05 13:00:00', status: 'Yes', fileName: 'meeting_notes.pdf', fileLink: 'https://example.com/meeting_notes.pdf' },
    { id: 8, dateTime: '2024-02-05 13:30:00', status: 'No', fileName: 'project_plan.pdf', fileLink: 'https://example.com/project_plan.pdf' },
    { id: 9, dateTime: '2024-02-05 14:00:00', status: 'Yes', fileName: 'contract_agreement.pdf', fileLink: 'https://example.com/contract_agreement.pdf' },
    { id: 10, dateTime: '2024-02-05 14:30:00', status: 'No', fileName: 'training_manual.pdf', fileLink: 'https://example.com/training_manual.pdf' },
    { id: 11, dateTime: '2024-02-05 15:00:00', status: 'Yes', fileName: 'proposal.pdf', fileLink: 'https://example.com/proposal.pdf' },
    { id: 12, dateTime: '2024-02-05 15:30:00', status: 'No', fileName: 'resume.pdf', fileLink: 'https://example.com/resume.pdf' },
    { id: 13, dateTime: '2024-02-05 16:00:00', status: 'Yes', fileName: 'design_specs.pdf', fileLink: 'https://example.com/design_specs.pdf' },
    { id: 14, dateTime: '2024-02-05 16:30:00', status: 'No', fileName: 'audit_report.pdf', fileLink: 'https://example.com/audit_report.pdf' },
    { id: 15, dateTime: '2024-02-05 17:00:00', status: 'Yes', fileName: 'safety_guidelines.pdf', fileLink: 'https://example.com/safety_guidelines.pdf' },
    { id: 16, dateTime: '2024-02-05 17:30:00', status: 'No', fileName: 'performance_review.pdf', fileLink: 'https://example.com/performance_review.pdf' },
    { id: 17, dateTime: '2024-02-05 18:00:00', status: 'Yes', fileName: 'business_strategy.pdf', fileLink: 'https://example.com/business_strategy.pdf' },
    { id: 18, dateTime: '2024-02-05 18:30:00', status: 'No', fileName: 'user_guide.pdf', fileLink: 'https://example.com/user_guide.pdf' },
    { id: 19, dateTime: '2024-02-05 19:00:00', status: 'Yes', fileName: 'team_schedule.pdf', fileLink: 'https://example.com/team_schedule.pdf' },
    { id: 20, dateTime: '2024-02-05 19:30:00', status: 'No', fileName: 'technical_documentation.pdf', fileLink: 'https://example.com/technical_documentation.pdf' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    return (
        <Container>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </Container>
    );
}