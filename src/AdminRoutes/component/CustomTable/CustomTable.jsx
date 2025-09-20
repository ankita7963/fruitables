import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';
import React, { createContext } from 'react';
import { token } from '../../theme';

function CustomTable({ rows, columns }) {
    const theme = useTheme();
    const color = token(theme.palette.mode);

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
                border: 0,
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: color.primary[900]
                }
            }}
            showToolbar
            getRowId={(row) => row._id}
        />
    );
}

export default CustomTable;