import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import { PageHeader } from "@sinco/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import useFetchMotoData from "../hook/useMoto";

const AddMotoForm = () => {
  const { addMoto } = useFetchMotoData();
  const [isActualizo, setIsActualizo] = useState(false);
  const [newMoto, setNewMoto] = useState({
    modelo: "",
    color: "",
    kilometraje: 0,
    precio: 0,
    cilindraje: "",
    nuemroVelocidad: 0,
  });

  const handleInputChange = (field) => (event) => {
    setNewMoto((prevMoto) => ({
      ...prevMoto,
      [field]: event.target.value,
    }));
  };

  const handleAddMoto = async () => {
    const adMoto = await addMoto(newMoto);
    setIsActualizo(adMoto);
    console.log(adMoto);

    setNewMoto({
      modelo: "",
      color: "",
      kilometraje: 0  ,
      precio: 0,
      cilindraje: "",
      nuemroVelocidad: 0,
    });
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <PageHeader
        title="Agregar Nueva Moto"
        buttonBack={
          <IconButton component={Link} to="/" sx={{ color: "#546e7a" }}>
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          Completa el formulario con los detalles de la nueva moto.
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="Modelo"
            value={newMoto.modelo}
            onChange={handleInputChange("modelo")}
            margin="normal"
          />
          <TextField
            label="Color"
            value={newMoto.color}
            onChange={handleInputChange("color")}
            margin="normal"
          />
          <TextField
            label="Kilometraje"
            value={newMoto.kilometraje}
            onChange={handleInputChange("kilometraje")}
            margin="normal"
          />
        </Box>
        <Box display="flex" gap={1}>
          <TextField
            label="Precio"
            value={newMoto.precio}
            onChange={handleInputChange("precio")}
            margin="normal"
          />
          <TextField
            label="Cilindraje"
            value={newMoto.cilindraje}
            onChange={handleInputChange("cilindraje")}
            margin="normal"
          />
          <TextField
            label="Número de Velocidad"
            value={newMoto.nuemroVelocidad}
            onChange={handleInputChange("nuemroVelocidad")}
            margin="normal"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMoto}
          disabled={
            newMoto.modelo === "" ||
            newMoto.color === "" ||
            newMoto.precio === 0 ||
            newMoto.cilindraje === "" ||
            newMoto.nuemroVelocidad === 0
          }
          sx={{ mt: 2, gridColumn: "span 2" }}
        >
          Agregar Moto
        </Button>
      </CardContent>
      {isActualizo && (
        <Alert severity="success" sx={{ mt: 2, borderRadius: 0 }}>
          Se agregó correctamente
        </Alert>
      )}
    </Card>
  );
};

export default AddMotoForm;
