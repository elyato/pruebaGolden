import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import { PageHeader, ToastNotification } from "@sinco/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import useFetchMotoData from "../hook/useMoto";
import { Precios, RespuestaPeticion } from "../interfaces/Data";
import { usePrecios } from "../hook/usePrecios";

const AddMotoForm = () => {
  const { addMoto } = useFetchMotoData();
  const { dataPrecios } = usePrecios();

  const [respuestaPeticion, setRespuestaPeticion] =
    useState<RespuestaPeticion>();
  const [isActualizo, setIsActualizo] = useState(false);

  const [newMoto, setNewMoto] = useState({
    modelo: "",
    image: "",
    color: "",
    kilometraje: 0,
    precio: 0,
    cilindraje: 0,
    numeroVelocidad: 0,
  });

  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  const [selectedVehicleData, setSelectedVehicleData] =
    useState<Precios | null>(null);

  const handleInputChange = (field: string) => (event: any) => {
    let value = event.target.value;

    if (
      field === "kilometraje" ||
      field === "numeroVelocidad" ||
      field === "precio" ||
      field === "cilindraje"
    ) {
      value = value.replace(/[^0-9]/g, "");
    }

    setNewMoto((prevMoto) => ({
      ...prevMoto,
      [field]: value,
    }));
  };

  const handleCheckBoxChange = () => {
    setIsCheckBoxChecked(!isCheckBoxChecked);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedModel = event.target.value as string;

    const selectedData = dataPrecios.find(
      (modelo: Precios) => modelo.modelo === selectedModel
    );

    setSelectedVehicleData(selectedData);

    setNewMoto((prevMoto) => ({
      ...prevMoto,
      modelo: selectedData?.modelo || "",
      precio: selectedData?.precio || 0,

      cilindraje: +selectedData?.cilindraje || 0,
    }));
  };

  const handleAddMoto = async () => {
    const adMoto = await addMoto(newMoto);

    if (adMoto) {
      setRespuestaPeticion(adMoto);
      setIsActualizo(true);
    }

    setNewMoto({
      modelo: "",
      color: "",
      image: "",
      kilometraje: 0,
      precio: 0,
      cilindraje: 0,
      numeroVelocidad: 0,
    });

    setSelectedVehicleData(null);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsActualizo(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isActualizo]);

  return (
    <>
      <PageHeader
        title="Agregar Nueva Moto"
        buttonBack={
          <IconButton component={Link} to="/moto" sx={{ color: "#546e7a" }}>
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
          {isActualizo && respuestaPeticion && (
            <ToastNotification
              title={respuestaPeticion?.mensaje}
              time={5}
              type={respuestaPeticion?.estado ? "success" : "error"}
            />
          )}
          <Typography variant="body1">
            Completa el formulario con los detalles de la nueva moto.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Select
              label="Modelo"
              value={newMoto.modelo}
              onChange={handleSelectChange}
              margin="dense"
              sx={{ minWidth: 120 }}
            >
              {dataPrecios
                .filter((modelo: Precios) => modelo.tipo === "moto")
                .map((modelo: Precios) => (
                  <MenuItem key={modelo.id} value={modelo.modelo}>
                    {modelo.modelo}
                  </MenuItem>
                ))}
            </Select>

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
              // Deshabilitar el campo si isCheckBoxChecked es false
              disabled={!isCheckBoxChecked}
            />
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              label="Precio"
              value={newMoto.precio}
              onChange={handleInputChange("precio")}
              margin="normal"
              // Deshabilitar el campo si isCheckBoxChecked es false
              disabled={!isCheckBoxChecked}
            />
            <TextField
              label="Cilindraje"
              value={newMoto.cilindraje}
              onChange={handleInputChange("cilindraje")}
              margin="normal"
              // Deshabilitar el campo si isCheckBoxChecked es false
            />
            <TextField
              label="Número de Velocidad"
              value={newMoto.numeroVelocidad}
              onChange={handleInputChange("numeroVelocidad")}
              margin="normal"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={isCheckBoxChecked}
              onChange={handleCheckBoxChange}
            />
            <Typography variant="body1">
              ¿El vehiculo se encuentra usado?
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMoto}
            disabled={
              newMoto.modelo === "" ||
              newMoto.color === "" ||
              newMoto.numeroVelocidad === 0
            }
            sx={{ mt: 2, gridColumn: "span 2" }}
          >
            Agregar Moto
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddMotoForm;
