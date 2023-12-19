import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { PageHeader, ToastNotification } from "@sinco/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import useFetchCarroData from "../hook/useCarro";

export const AddCarroForm = () => {
  const { agregarCarro } = useFetchCarroData();
  const [isActualizo, setIsActualizo] = useState(false);
  const [newCarro, setNewCarro] = useState({
    modelo: "",
    color: "",
    kilometraje: 0,
    precio: 0,
  });
  const handleInputChange = (field: string) => (event: any) => {
    setNewCarro((prevCarro) => ({
      ...prevCarro,
      [field]: event.target.value,
    }));
  };

  const handleAddCarro = async () => {
    const addCarro = await agregarCarro(newCarro);
    setIsActualizo(addCarro);

    setNewCarro({
      modelo: "",
      color: "",
      kilometraje: 0,
      precio: 0,
    });
  };

  return (
    <>
      <PageHeader
        title="Agregar Nuevo Carro"
        buttonBack={
          <IconButton component={Link} to="/carro" sx={{ color: "#546e7a" }}>
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <Card
        sx={{
          width: "600px",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            gap: 2,
            alignItems: "center",
          }}
        >
          {isActualizo && (
            <ToastNotification
              title="Se agregó correctamente"
              time={5}
              type="success"
            />
          )}
          <Typography variant="body1">
            Completa el formulario con los detalles del nuevo carro.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Modelo"
              value={newCarro.modelo}
              onChange={handleInputChange("modelo")}
              margin="normal"
            />
            <TextField
              label="Color"
              value={newCarro.color}
              onChange={handleInputChange("color")}
              margin="normal"
            />
            <TextField
              label="Kilometraje"
              value={newCarro.kilometraje}
              onChange={handleInputChange("kilometraje")}
              margin="normal"
            />
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              label="Precio"
              value={newCarro.precio}
              onChange={handleInputChange("precio")}
              margin="normal"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCarro}
            disabled={
              newCarro.modelo === "" ||
              newCarro.color === "" ||
              newCarro.precio === 0
            }
            sx={{ mt: 2, gridColumn: "span 2" }}
          >
            Agregar Carro
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
