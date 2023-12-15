import { useState } from "react";
import { Card, CardContent, Button, Box, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { PageHeader } from "@sinco/react";
import AddIcon from "@mui/icons-material/Add";
import { TablaPrecios } from "./Components/TablaPrecios";

export const Concesionario = () => {
  const [showTablaPrecios, setShowTablaPrecios] = useState(false);

  const handlePreciosClick = () => {
    setShowTablaPrecios(!showTablaPrecios);
  };

  return (
    <Box
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <PageHeader
        title="Concesionario El Yato"
        actions={
          <Box display="flex" justifyContent="space-between">
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
      <Box display="flex" justifyContent="space-around">
        <Card sx={{ marginTop: 2 }}>
          <CardMedia
            component="img"
            alt="Concesionario Image"
            height="200"
            image="https://cdn5.dibujos.net/dibujos/pintados/202048/coche-deportivo-rapido-vehiculos-coches-12091495.jpg"
          />
          <CardContent>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                component={Link}
                to="/carro"
                startIcon={<DirectionsCarIcon />}
              >
                Carros
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 2 }}>
          <CardMedia
            component="img"
            alt="Concesionario Image"
            height="200"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IHGoWebHe79EO1G16jn0WEOzNmzSPQa-Ug&usqp=CAU"
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              component={Link}
              to="/moto"
              startIcon={<TwoWheelerIcon />}
            >
              Motos
            </Button>
          </CardContent>
        </Card>
      </Box>
      {showTablaPrecios && (
        <TablaPrecios
          setShowTablaPrecios={setShowTablaPrecios}
          showTablaPrecios={showTablaPrecios}
        />
      )}
    </Box>
  );
};
