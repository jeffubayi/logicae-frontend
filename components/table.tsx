import * as React from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useRouter } from "next/router";

import { JokesState } from "../types";
import CardTitle from "./list";

interface Props {
    rows: JokesState[];
    columns: GridColDef<JokesState>[];
    loading: boolean;
}

export default function Table(props: Props) {
    const { rows, columns, loading } = props
    const router = useRouter();

    const handleTitleClick = (
        params: GridRowParams,
    ) => {
        router.push(
            {
                pathname: "/jokes/[id]",
                query: {
                    id: params.id,
                    method: "Edit",
                },
            },
            `/jokes/edit/${params.id}`
        );
    };

    return (
        <Box sx={{ p: 2 }}>
            <CardTitle />
            <DataGrid
                sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
                autoHeight
                pagination
                showColumnVerticalBorder
                disableColumnSelector
                disableDensitySelector
                rows={rows}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                onRowClick={handleTitleClick}
                pageSizeOptions={[5, 10]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
            />
        </Box>
    );
}