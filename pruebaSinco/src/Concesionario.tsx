import { Box, Button, Stack, Typography, TextField, Card, CardHeader, MenuItem, Select } from "@mui/material";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { PageHeader } from "@sinco/react";
import { TablaModelos } from "./Components/Tablas/TablaModelos";
import { CardSelecVehiculo } from "./Components/CardSelecVehiculo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePrecios } from "./hook/usePrecios";
export const Concesionario = () => {
  const [isNewModelo, setIsNewModelo] = useState(false);
  const { addModelo } = usePrecios();
  const [modeloData, setModeloData] = useState({
    modelo: "",
    precio: 0,
    fechaRegistro: "",
    tipo: "",
  });

  const handleInputChange = (field) => (event) => {
    setModeloData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleAddModelo = () => {
    addModelo(modeloData);
  };

  const handleShowForm = () => {
    setIsNewModelo(true);
  };
  return (
    <>
      <PageHeader
        buttonBack={
          <Box display="flex" gap={1} alignItems="center">
            <img src="./src/assets/LogoConce.svg" alt="" />
            <Typography variant="h3">YATO MOTORS</Typography>
          </Box>
        }
        title=""
        actions={
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/clientes"
          >
            Ver Clientes
          </Button>
        }
      />
      <Box
        display="flex"
        width="100%"
        height="100%"
        justifyContent="space-around"
      >
        <Stack>
          <CardSelecVehiculo
            image="./src/assets/imgCar.svg"
            router="/carro"
            title="Carros"
            textButton="Ver carro"
            icon={<DirectionsCarIcon />}
          />

          <CardSelecVehiculo
            image="./src/assets/ImageMoto.svg"
            router="/moto"
            title="Motos"
            textButton="Ver motos"
            icon={<TwoWheelerIcon />}
          />
        </Stack>
        <Stack height="100%" gap={2}>
          <TablaModelos handleShowForm={handleShowForm} />
          {isNewModelo && (
            <Card>
              <CardHeader title="Agregar nuevo modelo" />
              <TextField
                label="Modelo"
                value={modeloData.modelo}
                onChange={handleInputChange("modelo")}
                margin="normal"
              />
              <TextField
                label="Precio"
                value={modeloData.precio}
                onChange={handleInputChange("precio")}
                margin="normal"
              />
              <Select
                label="Tipo"
                value={modeloData.tipo}
                onChange={handleInputChange("tipo")}
              >
                <MenuItem value="carro">Carro</MenuItem>
                <MenuItem value="moto">Moto</MenuItem>
              </Select>

              <Button variant="contained" onClick={handleAddModelo}>
                Agregar Modelo
              </Button>
            </Card>
          )}
        </Stack>
      </Box>
    </>
  );
};
