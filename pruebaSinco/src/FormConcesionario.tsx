import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FormConcesionario = () => {
  const navigate = useNavigate();

  const handleCarroButtonClick = () => {
    navigate("/carro");
  };

  const handleMotoButtonClick = () => {
    navigate("/moto");
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography variant="h2">Concesionario el yato</Typography>
        <Typography>¿Qué le gustaría mirar?</Typography>

        <Button variant="contained" onClick={handleCarroButtonClick}>
          Ver Carros
        </Button>

        <Button variant="contained" onClick={handleMotoButtonClick}>
          Ver Motos
        </Button>
      </CardContent>
    </Card>
  );
};
