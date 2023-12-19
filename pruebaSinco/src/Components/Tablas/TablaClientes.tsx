import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  Card,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Autocomplete } from "@mui/material";
import useClientes from "../../hook/useClientes";
import { PageHeader } from "@sinco/react";
import { Link } from "react-router-dom";

const TablaClientes = () => {
  const { dataClientes } = useClientes();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedClientes = dataClientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <PageHeader
        title="Clientes"
        buttonBack={
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <Card sx={{ width: 600, marginTop: 3 }}>
        <TableContainer component={Paper}>
          <Autocomplete
            options={dataClientes}
            getOptionLabel={(option) => option.id}
            style={{ width: 300, marginBottom: 20 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar cliente"
                variant="outlined"
              />
            )}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Cédula</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.nombreCompleto}</TableCell>
                  <TableCell>{cliente.cedula}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={dataClientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};

export default TablaClientes;
