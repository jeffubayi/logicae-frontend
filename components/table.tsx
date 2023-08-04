import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridRowId, GridActionsCellItem, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Link, Chip, Paper } from '@mui/material';
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
import ActionDialog from '../components/dialog';

interface Props {
    rows: any;
    loading: boolean;
    error: any;
}

export default function Table(props: Props) {
    const { rows, loading, error } = props
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<any | undefined>();
    const [method, setMethod] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };



    const deleteUser = async (id: any) => {
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
                    renderViewsComponent(params.row.Category)
                ),
            },
            { field: "Body", flex: 3, sortable: false },
            {
                field: "created_at",
                sortable: false,
                headerName: "Created At",
                valueGetter: (params: GridValueGetterParams) => {
                    return timeConverter(params.row.created_at) || "N/A"
                },
            },
            {
                field: "Likes",
                sortable: true,
                renderCell: (params: GridRenderCellParams<any>) => (
                    <Chip size="small" label={params.row.likes} />

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


    //redirect to edit view
    const onRowClick = (
        params: any
    ) => {
        setOpen(true);
        setData(params.row)
        setMethod('Edit')
    };

    const addJoke = () => {
        setOpen(true);
        setData({
            Category: "",
            Body: "",
            id: null,
        })
        setMethod('Create')
    };

    return (
        <Box sx={{ p: 2 }}>
            {open &&
                <ActionDialog
                    open={open}
                    handleClose={handleClose}
                    data={data}
                    method={method}
                />
            }
            <CardTitle handleAddJoke={addJoke} />
            {error ? (
                <Paper>Unable to Fetch Jokes</Paper>
            ) : (
                <DataGrid
                    disableColumnMenu
                    disableDensitySelector
                    disableColumnSelector
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
                            sortModel: [{ field: 'Likes', sort: 'asc' }],
                        },
                    }}
                    sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
                />
            )}
        </Box>
    );
}