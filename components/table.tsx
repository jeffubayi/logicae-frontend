import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Link } from '@mui/material';
import { useLocalStorage } from 'react-use';
import { useRouter } from "next/router";

import { JokesState } from "../types";
import CardTitle from "./list";
import { renderViewsComponent } from "./viewsChip";
import { timeConverter } from "../utility";

interface Props {
    rows: JokesState[];
    loading: boolean;
}

export default function Table(props: Props) {
    const { rows, loading } = props
    const router = useRouter();
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const columns = useMemo(
        () => [
            {
                field: "Title",
                flex: 1,
                sortable: false,
                renderCell: (params: GridRenderCellParams<JokesState>) => (
                    <Link href="#">{params.row.Title}</Link>
                ),
            },
            { field: "Author", flex: 1, sortable: false },
            {
                field: "CreatedAt",
                headerName: "Created Date",
                sort: "desc",
                sortable: true,
                flex: 1,
                valueGetter: (params: GridValueGetterParams) => {
                    return timeConverter(params.row.CreatedAt)
                },
            },
            {
                field: "Views",
                sortable: true,
                type: 'number',
                renderCell: (params: GridRenderCellParams<JokesState>) => (
                    renderViewsComponent(params.row.Views)
                ),
            },
        ],
        []
    );

    const filterProps = {
        toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        }
    }

    //redirect to edit view
    const onRowClick = (
        params: GridRowParams,
    ) => {
        const { Title, Body, Author, Views, CreatedAt } = params.row
        router.push(
            {
                pathname: "/jokes/[id]",
                query: {
                    id: params.id,
                    Title,
                    Body,
                    Author,
                    Views,
                    CreatedAt,
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
                slotProps={filterProps}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'Views', sort: 'desc' }],
                    },
                }}
                sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
            />
        </Box>
    );
}