import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { PageHeader, ToastNotification } from "@sinco/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import useFetchCarroData from "../hook/useCarro";
import { Precios, RespuestaPeticion } from "../interfaces/Data";
import { usePrecios } from "../hook/usePrecios";

export const AddCarroForm = () => {
  const { agregarCarro } = useFetchCarroData();
  const { dataPrecios } = usePrecios();

  const [respuestaPeticion, setRespuestaPeticion] =
    useState<RespuestaPeticion>();
  const [isActualizo, setIsActualizo] = useState(false);

  const [newCarro, setNewCarro] = useState({
    modelo: "",
    color: "",
    kilometraje: 0,
    precio: 0,
  });

  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [selectedVehicleData, setSelectedVehicleData] =
    useState<Precios | null>();

  const handleInputChange = (field: string) => (event: any) => {
    let value = event.target.value;

    if (field === "kilometraje" || field === "precio") {
      value = value.replace(/[^0-9]/g, "");
    }
    setNewCarro((prevCarro) => ({
      ...prevCarro,
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

    setNewCarro((prevCarro) => ({
      ...prevCarro,
      modelo: selectedData?.modelo || "",
      precio: selectedData?.precio || 0,

      cilindraje: +selectedData?.cilindraje || 0,
    }));
  };
  const handleAddCarro = async () => {
    const addCarro = await agregarCarro(newCarro);
    if (addCarro) {
      setIsActualizo(true);

      setRespuestaPeticion(addCarro);
    }

    setNewCarro({
      modelo: "",
      color: "",
      kilometraje: 0,
      precio: 0,
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
          {isActualizo && respuestaPeticion && (
            <ToastNotification
              title={respuestaPeticion?.mensaje}
              time={5}
              type={respuestaPeticion?.estado ? "success" : "error"}
            />
          )}
          <Typography variant="body1">
            Completa el formulario con los detalles del nuevo carro.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Select
              label="Modelo"
              value={newCarro.modelo}
              onChange={handleSelectChange}
              margin="dense"
              sx={{ minWidth: 120 }}
            >
              {dataPrecios
                .filter((modelo: Precios) => modelo.tipo === "carro")
                .map((modelo: Precios) => (
                  <MenuItem key={modelo.id} value={modelo.modelo}>
                    {modelo.modelo}
                  </MenuItem>
                ))}
            </Select>

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
              disabled={!isCheckBoxChecked}
            />
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              label="Precio"
              value={newCarro.precio}
              onChange={handleInputChange("precio")}
              margin="normal"
              disabled={!isCheckBoxChecked}
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
