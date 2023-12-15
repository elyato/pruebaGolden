import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { PageHeader } from "@sinco/react";

export const Concesionario = () => {
  return (
    <Box width="100%" height="100%" alignItems="center" justifyContent="center">
      <PageHeader
        title="Concesionario El Yato"
        actions={
          <Button
            color="success"
            variant="contained"
            component={Link}
            to="/agregarMoto"
            size="small"
          >
            Agregar Vehículo
          </Button>
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
            <Typography variant="body1" paragraph>
              ¿Qué le gustaría mirar?
            </Typography>
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
    </Box>
  );
};
