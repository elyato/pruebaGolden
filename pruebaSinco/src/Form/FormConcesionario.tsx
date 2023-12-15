import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { PageHeader } from "@sinco/react";

export const Concesionario = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
          <PageHeader
            title="Concesionario El Yato"
            actions={
              <Button color="success" variant="contained" component={Link} to="/agregarMoto" size="small">
                Agregar Vehículo
              </Button>
            }
          />
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
          </Box>
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
            <Button
              variant="contained"
              component={Link}
              to="/moto"
              startIcon={<TwoWheelerIcon />}
            >
              Motos
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};
