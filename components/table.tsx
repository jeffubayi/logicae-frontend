import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridRowId, GridActionsCellItem, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Link, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

import { supabase } from "../utility/supabaseClient";
import DeleteIcon from '@mui/icons-material/Delete';
import UpIcon from '@mui/icons-material/ThumbUp';
import DownIcon from '@mui/icons-material/ThumbDown';
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

    const router = useRouter();
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const deleteUser = async (id: any) => {
        console.log(`id`,id)
        const { error } = await supabase
            .from('jokes')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error(`Joke ${id} failed to delete`)
            console.log(error)
        } else {
            toast.success(`Joke ${id} successfully deleted`)
        }

    };

    const deleteJoke = React.useCallback(
        (id: GridRowId) => () => {
            deleteUser(id)
        },
        [],
    );

    const editLikes = React.useCallback(
        (params: any, type: string) => () => {
            upvoteJoke(params, type)
        },
        [],
    );


    const upvoteJoke = async (params: any, type: string) => {
        const { error } = await supabase
            .from('jokes')
            .update({ likes: type === "liked" ? params.row.likes + 1 : type === "disliked" && params.row.likes !== 0 || null ? params.row.likes - 1 : 0 })
            .eq('id', params.id)

        if (error) {
            toast.error(`Failed to ${type} ${params.row.Category}`)
            console.log(error)
        } else {
            toast.success(` You ${type} a ${params.row.Category} successfully`)
        }

    };

    const columns = useMemo<GridColDef<JokesState>[]>(
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
                valueGetter: (params: GridValueGetterParams) => {
                    return timeConverter(params.row.created_at) || "N/A"
                },
            },
            {
                field: "Likes",
                sort: "asc",
                sortable: true,
                type: 'number',
                renderCell: (params: GridRenderCellParams<any>) => (
                    renderViewsComponent(params.row.likes)
                ),
            },
            {
                field: 'actions',
                type: 'actions',
                flex: 1,
                getActions: (params: any) => [
                    <GridActionsCellItem
                        icon={<UpIcon />}
                        label="Like"
                        showInMenu={true}
                        onClick={editLikes(params, 'liked')}
                    />,
                    <GridActionsCellItem
                        icon={<DownIcon />}
                        label="Dislike"
                        showInMenu={true}
                        onClick={editLikes(params, 'disliked')}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon color="warning" />}
                        label="Delete"
                        onClick={deleteJoke(params.id)}
                    />,
                ],
            },
        ], [deleteJoke, editLikes]);

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
        const { Category, Body, likes, created_at } = params.row
        router.push(
            {
                pathname: "/jokes/[id]",
                query: {
                    id: params.id,
                    Category,
                    Body,
                    likes,
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