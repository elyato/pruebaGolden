import { Box, Button, Stack, Typography } from "@mui/material";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { PageHeader } from "@sinco/react";
import { TablaPrecios } from "./Components/Tablas/TablaPrecios";
import { CardSelecVehiculo } from "./Components/CardSelecVehiculo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import { FormularioModelo } from "./Form/FormularioModelo";
import { Link } from "react-router-dom";
export const Concesionario = () => {
  const [isNewModelo, setIsNewModelo] = useState(false);

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
          <TablaPrecios handleShowForm={handleShowForm} />
          {isNewModelo && <FormularioModelo />}
        </Stack>
      </Box>
    </>
  );
};
