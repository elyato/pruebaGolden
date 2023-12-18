import { useState } from "react";
import { TextField, Button, Card, CardHeader } from "@mui/material";
import { usePrecios } from "./hook/usePrecios";

export const FormularioModelo = () => {
  const { addModelo } = usePrecios();
  const [modeloData, setModeloData] = useState({
    modelo: "",
    precio: 0,
    color: "",
    kilometraje: 0,
    fechaRegistro: "",
  });

  const handleInputChange = (field: string) => (event: any) => {
    setModeloData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleAddModelo = () => {
    addModelo(modeloData);
  };

  return (
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
      <TextField
        label="Color"
        value={modeloData.color}
        onChange={handleInputChange("color")}
        margin="normal"
      />
      <TextField
        label="Kilometraje"
        value={modeloData.kilometraje}
        onChange={handleInputChange("kilometraje")}
        margin="normal"
      />

      <Button variant="contained" onClick={handleAddModelo}>
        Agregar Modelo
      </Button>
    </Card>
  );
};
