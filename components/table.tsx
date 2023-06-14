import * as React from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useLocalStorage } from 'react-use';

import { JokesState } from "../types";
import CardTitle from "./list";

interface Props {
    rows: JokesState[];
    columns: GridColDef<JokesState>[];
    loading: boolean;
    onRowClick:(params: GridRowParams) => void;
}

export default function Table(props: Props) {
    const { rows, columns, loading,onRowClick } = props
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination",{
        pageSize: 5,
        page: 0,
    });

    return (
        <Box sx={{ p: 2 }}>
            <CardTitle />
            <DataGrid
                autoHeight
                pagination
                showCellVerticalBorder
                disableColumnSelector
                disableDensitySelector
                disableColumnMenu
                sortingOrder={['asc', 'desc']}
                rows={rows}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                onRowClick={onRowClick}
                pageSizeOptions={[5, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
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
                    sorting: {
                        sortModel: [{ field: 'Views', sort: 'desc' }, { field: 'CreatedAt', sort: 'desc' }],
                    },
                }}
                sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
            />
        </Box>
    );
}