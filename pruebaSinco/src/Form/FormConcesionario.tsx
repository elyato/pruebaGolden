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

export const FormConcesionario = () => {
  return (
    <Stack width="100vw" height="100vh">
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3">Concesionario el yato</Typography>
            <Button component={Link} to="/agregarMoto" size="small">
              Agregar vehiculo
            </Button>
          </Box>
          <Typography variant="body1">¿Qué le gustaría mirar?</Typography>
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
