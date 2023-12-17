import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageHeader } from "@sinco/react";
import useFetchMotoData from "../hook/useMoto";
import EditIcon from "@mui/icons-material/Edit";
import { ModalCompra } from "./ModalCompra";
import { Link } from "react-router-dom";

export const CardView = () => {
  const data = useFetchMotoData();
  const { motoData, updateMoto } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [filteredMotos, setFilteredMotos] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newColor, setNewColor] = useState("");
  useEffect(() => {
    setCardCount(motoData.length);
  }, [motoData]);

  useEffect(() => {
    if (selectedMoto) {
      setFilteredMotos([selectedMoto]);
    } else {
      setFilteredMotos(motoData);
    }
  }, [selectedMoto, motoData]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleOpenModalEdit = () => {
    setEditModalOpen(true);
    setNewColor(selectedMoto.color)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleVenderClick = (moto) => {
    setSelectedMoto(moto);
    handleOpenModal();
  };

  const handleUpdateField = async (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => {
    await updateMoto(motoId, { [fieldName]: newValue });
  };

  const options = motoData.map((moto) => ({
    label: `${moto.modelo} - ID: ${moto.id}`,
    value: moto,
  }));

  return (
    <>
      <PageHeader
        title={`Bienvenido a la sección de motos, elige nuestro catálogo`}
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
          onChange={(event, value) => setSelectedMoto(value?.value || null)}
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
        {filteredMotos.map((moto, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card key={index}>
              <CardHeader
                title={`Vehiculo: ${moto.modelo}`}
                action={
                  <IconButton onClick={handleOpenModalEdit}>
                    <EditIcon />
                  </IconButton>
                }
              />
              <CardMedia
                component="img"
                image={moto.image}
                sx={{ width: "auto" }}
                alt={`Imagen de ${moto.modelo}`}
              />
              <CardActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="subtitle1" color="text.primary">
                    {`Precio: ${moto.precio}`}
                  </Typography>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    onClick={() => handleVenderClick(moto)}
                  >
                    Vender
                  </Button>
                </Box>
              </CardActions>
              <CardContent>
                <Typography>{`Cilindraje: ${moto.cilindraje}`}</Typography>
                <Typography>{`Color: ${moto.color}`}</Typography>
                <Typography>{`Número de velocidad: ${moto.numeroVelocidad}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ModalCompra
        modalOpen={modalOpen}
        selectedMoto={selectedMoto}
        handleCloseModal={handleCloseModal}
      />
    
    </>
  );
};
