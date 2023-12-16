import { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { PageHeader } from "@sinco/react";
import AddIcon from "@mui/icons-material/Add";
import { TablaPrecios } from "./Components/TablaPrecios";
import { CardSelecVehiculo } from "./Components/CardSelecVehiculo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
export const Concesionario = () => {
  const [showTablaPrecios, setShowTablaPrecios] = useState(false);

  const handlePreciosClick = () => {
    setShowTablaPrecios(!showTablaPrecios);
  };

  return (
    <>
      <PageHeader
        title="Concesionario El Yato"
        actions={
          <Box>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={handlePreciosClick}
            >
              Precios
            </Button>
            <Button
              color="success"
              variant="contained"
              component={Link}
              to="/agregarMoto"
              size="small"
              startIcon={<AddIcon />}
            >
              Agregar Vehículo
            </Button>
          </Box>
        }
      />
      <Box
        display="flex"
        width="100%"
        height="100%"

        bgcolor="#E4ECF4"
      >
        <Stack>
          <CardSelecVehiculo
            image="./src/assets/imgCar.svg"
            router="/carro"
            title="Carro"
            textButton="Ver carro"
            icon={<DirectionsCarIcon />}
          />

          <CardSelecVehiculo
            image="./src/assets/ImageMoto.svg"
            router="/moto"
            title="Moto"
            textButton="Ver motos"
            icon={<TwoWheelerIcon />}
          />
        </Stack>
        {<TablaPrecios />}
      </Box>
    </>
  );
};
