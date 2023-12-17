import { Box, Stack, Typography } from "@mui/material";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { PageHeader } from "@sinco/react";
import { TablaPrecios } from "./Components/TablaPrecios";
import { CardSelecVehiculo } from "./Components/CardSelecVehiculo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
export const Concesionario = () => {
  return (
    <>
      <PageHeader
        buttonBack={
          <Box display="flex" gap={1} alignItems="center">
            <img src="./src/assets/LogoConce.svg" alt="" />
            <Typography variant="h3">YATO MOTORS</Typography>
          </Box>
        }
      />
      <Box display="flex" width="100%" height="100%" justifyContent="space-around">
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
        <TablaPrecios />
      </Box>
    </>
  );
};
