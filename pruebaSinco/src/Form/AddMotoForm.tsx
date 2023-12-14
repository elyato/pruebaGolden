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
import useFetchMotoData from "../hook/useMoto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
const AddMotoForm = () => {
  const { addMoto } = useFetchMotoData();
  const [IsActualizo, setIsActualizo] = useState(false);
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
    debugger;
    console.log(adMoto);

    setNewMoto({
      modelo: "",
      color: "",
      kilometraje: 0,
      precio: 0,
      cilindraje: "",
      nuemroVelocidad: 0,
    });
  };

  return (
    <Card sx={{ width: "99vw", height: "95vh" }}>
      <CardContent sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <Box display="flex" justifyContent="space-between">
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Agregar Nueva Moto</Typography>
        </Box>
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
          type="number"
          value={newMoto.nuemroVelocidad}
          onChange={handleInputChange("nuemroVelocidad")}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMoto}
          disabled={
            newMoto.modelo === "" ||
            newMoto.color === "" ||
            newMoto.precio == 0 ||
            newMoto.cilindraje === "" ||
            newMoto.nuemroVelocidad == 0
          }
        >
          Agregar Moto
        </Button>
      </CardContent>
      {IsActualizo && <Alert title="Se agrego correctamente" />}
    </Card>
  );
};

export default AddMotoForm;
