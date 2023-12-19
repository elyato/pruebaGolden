import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { usePrecios } from "../../hook/usePrecios";
import { Precios } from "../../interfaces/Data";

export const TablaPrecios = ({ handleShowForm }) => {
  const data = usePrecios();
  const { dataPrecios } = data;
  const [selectedModelo, setSelectedModelo] = useState<Precios | null>(null);

  const handleModeloChange = (
    event: React.ChangeEvent<{}>,
    value: Precios | null
  ) => {
    setSelectedModelo(value);
  };

  const filteredData = selectedModelo ? [selectedModelo] : dataPrecios;

  return (
    <>
      <Card sx={{ marginTop: 2, height: "100%" }}>
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
                <TableCell>Color</TableCell>
                <TableCell>Kilometraje</TableCell>
                <TableCell>Fecha registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row: Precios) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.kilometraje}</TableCell>
                  <TableCell>{row.fechaRegistro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CardActions>
          <Button variant="contained" onClick={handleShowForm}>
            Agregar nuevo modelo
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
