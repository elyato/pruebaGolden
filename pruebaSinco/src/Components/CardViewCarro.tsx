import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PageHeader } from "@sinco/react";
import { Link } from "react-router-dom";
import { ModalCompra } from "./ModalCompra";
import { ModalEditCarro } from "./ModalEditCarro"; // Import the car modal
import useFetchCarroData from "../hook/useCarro";
import { vehiculo } from "../interfaces/Data";

export const CardViewCarro = () => {
  const data = useFetchCarroData(); // Use the car data hook
  const { carroData, actualizarCarro } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCarro, setSelectedCarro] = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [filteredCarros, setFilteredCarros] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    setCardCount(carroData.length);
  }, [carroData]);

  useEffect(() => {
    if (selectedCarro) {
      setFilteredCarros([selectedCarro]);
    } else {
      setFilteredCarros(carroData);
    }
  }, [selectedCarro, carroData]);

  const handleOpenModal = (carro: vehiculo) => {
    setModalOpen(true);
    setSelectedCarro(carro);
  };

  const handleOpenModalEdit = (carro: vehiculo) => {
    setEditModalOpen(true);
    setSelectedCarro(carro);
  };

  const handleCloseModalEdit = () => {
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateField = async (
    carroId: number,
    fieldName: string,
    newValue: any
  ) => {
    await actualizarCarro(carroId, { [fieldName]: newValue });
  };

  const options = carroData.map((carro) => ({
    label: `${carro.modelo} - ID: ${carro.id}`,
    value: carro,
  }));

  return (
    <>
      <PageHeader
        title={`Bienvenido a la sección de carros, elige nuestro catálogo`}
        buttonBack={
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <Box
        marginTop={2}
        height={60}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        bgcolor={"#c7d5f3"}
      >
        <Typography
          color="text.primary"
          variant="h2"
        >{`${cardCount} | Publicaciones activas `}</Typography>

        <Autocomplete
          sx={{ width: 300 }}
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar Modelo o ID" />
          )}
          onChange={(event, value) => setSelectedCarro(value?.value || null)}
        />
        <Button
          variant="contained"
          component={Link}
          to="/agregarMoto"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
        >
          Agregar Vehículo
        </Button>
      </Box>
      <Grid container spacing={2} marginTop={2}>
        {carroData.map((carro, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card key={index}>
              <CardHeader
                title={`Vehiculo: ${carro.modelo}`}
                action={
                  <IconButton onClick={() => handleOpenModalEdit(carro)}>
                    <EditIcon />
                  </IconButton>
                }
              />
              <CardMedia
                component="img"
                image={carro.image}
                sx={{ width: "auto", height: "200px" }}
                alt={`Imagen de ${carro.modelo}`}
              />
              <CardActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="subtitle1" color="text.primary">
                    {`Precio: ${carro.precio}`}
                  </Typography>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenModal(carro)}
                  >
                    Vender
                  </Button>
                </Box>
              </CardActions>
              <CardContent>
                <Box display="flex" gap={1}>
                  <Typography variant="subtitle1">{`Cilindraje:`}</Typography>
                  <Typography>{` ${carro.cilindraje}`}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography variant="subtitle1">{`Color:`}</Typography>
                  <Typography>{` ${carro.color}`}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography variant="subtitle1">{`Número de velocidad:`}</Typography>
                  <Typography>{` ${carro.numeroVelocidad}`}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography variant="subtitle1">{`Kilometraje:`}</Typography>
                  <Typography>{` ${carro.kilometraje}`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ModalCompra
        modalOpen={modalOpen}
        selectedVehicle={selectedCarro}
        handleCloseModal={handleCloseModal}
        vehicleType="carro"
      />
      {/* <ModalEditCarro
        selectedCarro={selectedCarro}
        isEditModalOpen={isEditModalOpen}
        handleCloseModal={handleCloseModalEdit}
        handleUpdateCarro={handleUpdateField}
      /> */}
    </>
  );
};
