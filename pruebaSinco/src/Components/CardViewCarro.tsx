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
import useFetchCarroData from "../hook/useCarro";
import { Carro } from "../interfaces/Data";
import { ModalEditVehiculo } from "./ModalEditVehiculo";

export const CardViewCarro = () => {
  const data = useFetchCarroData();
  const { carroData, actualizarCarro } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCarro, setSelectedCarro] = useState<Carro>(null);
  const [cardCount, setCardCount] = useState(0);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    setCardCount(carroData.length);
  }, [carroData]);

  const handleOpenModal = (carro: Carro) => {
    setModalOpen(true);
    setSelectedCarro(carro);
  };

  const handleOpenModalEdit = (carro: Carro) => {
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

        <Button
          variant="contained"
          component={Link}
          to="/agregarCarro"
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
                image="data:image/jpeg;base64,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"
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
                  <Typography variant="subtitle1">{`Color:`}</Typography>
                  <Typography>{` ${carro.color}`}</Typography>
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
      <ModalEditVehiculo
        selectedVehiculo={selectedCarro}
        isEditModalOpen={isEditModalOpen}
        handleCloseModal={handleCloseModalEdit}
        handleUpdateVehiculo={handleUpdateField}
      />
    </>
  );
};
