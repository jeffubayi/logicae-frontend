import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Link, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';
import { useRouter } from "next/router";

import { JokesState } from "../types";
import CardTitle from "./list";
import { renderViewsComponent } from "./viewsChip";
import { timeConverter } from "../utility";

interface Props {
    rows: any;
    loading: boolean;
    error: any;
}

export default function Table(props: Props) {
    const { rows, loading, error } = props

  console.log(`dataaaaR`, rows)

    const router = useRouter();
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const columns = useMemo(
        () => [
            {
                field: "Category",
                sortable: false,
                renderCell: (params: GridRenderCellParams<any>) => (
                    <Link href="#">{params.row.Category}</Link>
                ),
            },
            { field: "Body", flex: 3, sortable: false },
            {
                field: "created_at",
                headerName: "Created Date",
                sort: "desc",
                sortable: true,
                valueGetter: (params: GridValueGetterParams) => {
                    return timeConverter(params.row.created_at) || "N/A"
                },
            },
            {
                field: "Likes",
                sortable: true,
                type: 'number',
                renderCell: (params: GridRenderCellParams<any>) => (
                    renderViewsComponent(params.row.likes)
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
    const data = rows[29] || []
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
            {error ? (
                <Typography>Unable to Fetch Jokes</Typography>
            ) : (
                <DataGrid
                    autoHeight
                    pagination
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
            )}
        </Box>
    );
}