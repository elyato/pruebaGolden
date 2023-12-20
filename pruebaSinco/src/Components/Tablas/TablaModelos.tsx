import { ChangeEvent, MouseEvent, useState } from "react";
import {
  Card,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  CardActions,
  Button,
  CardHeader,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { usePrecios } from "../../hook/usePrecios";
import { Precios } from "../../interfaces/Data";

interface props {
  handleShowForm: () => void;
}

export const TablaModelos = ({ handleShowForm }: props) => {
  const { dataPrecios } = usePrecios();
  const [selectedModelo, setSelectedModelo] = useState<Precios | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleModeloChange = (
    event: ChangeEvent<{}>,
    value: Precios | null
  ) => {
    setSelectedModelo(value);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = selectedModelo
    ? [selectedModelo]
    : dataPrecios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Card sx={{ marginTop: 2, height: "100%", width: 650 }}>
        <CardHeader title="Precios" />
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="text.primary"></Typography>
        </Box>
        <CardActions>
          <Autocomplete
            fullWidth
            options={dataPrecios}
            getOptionLabel={(option: Precios) => option.modelo}
            value={selectedModelo}
            onChange={handleModeloChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar modelo"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </CardActions>

        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row: Precios) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>{row.fechaRegistro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 12, 18]}
          component="div"
          count={selectedModelo ? 1 : dataPrecios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CardActions>
          <Button variant="contained" onClick={handleShowForm}>
            Agregar nuevo modelo
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
