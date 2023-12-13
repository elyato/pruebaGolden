import useFetchMotoData from "./hook/useMoto";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const FormMoto = () => {
  const data = useFetchMotoData();

  const { motoData, updateColor } = data;

  const handleUpdateColor = async (motoId: number, newColor: string) => {
    await updateColor(motoId, newColor);
  };
  console.log();

  return (
    <Card>
      <CardContent>
        <Typography>
          Bienvenido a la sección de motos, elige nuestro catálogo
        </Typography>
        
        {motoData.map((moto, index) => (
          <div key={index}>
            <Typography variant="body1">Modelo: {moto.modelo}</Typography>
            <Typography variant="body1">Color: {moto.color}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateColor(moto.id, "amarillo")}
            >
              Actualizar Color
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
