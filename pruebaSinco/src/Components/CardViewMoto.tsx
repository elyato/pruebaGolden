import { useState, useEffect } from "react";
import {
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
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageHeader, ToastNotification } from "@sinco/react";
import useFetchMotoData from "../hook/useMoto";
import EditIcon from "@mui/icons-material/Edit";
import { ModalCompra } from "./ModalCompra";
import { Link } from "react-router-dom";
import { ModalEditVehiculo } from "./ModalEditVehiculo";
import { Moto, RespuestaPeticion } from "../interfaces/Data";

export const CardView = () => {
  const data = useFetchMotoData();
  const { motoData, updateMoto } = data;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [cardCount, setCardCount] = useState(0);
  const [isActualizo, setIsActualizo] = useState(false);
  const [respuestaPeticion, setRespuestaPeticion] =
    useState<RespuestaPeticion>();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    setCardCount(motoData.length);
  }, [motoData]);

  const handleOpenModal = (moto: Moto) => {
    setModalOpen(true);
    setSelectedMoto(moto);
  };
  const handleOpenModalEdit = (moto: Moto) => {
    setEditModalOpen(true);
    setSelectedMoto(moto);
  };
  const handleCloseModalEdit = () => {
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateField = async (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => {
    const motoActualizada = await updateMoto(motoId, {
      [fieldName]: newValue,
    });
    setRespuestaPeticion(motoActualizada);
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
      <Stack alignItems="center" justifyContent="center">
        <Grid container spacing={6} marginTop={2} xs={9}>
          {isActualizo && respuestaPeticion && (
            <ToastNotification
              time={3}
              title={respuestaPeticion.mensaje}
              type={respuestaPeticion.estado ? "success" : "error"}
            />
          )}
          {motoData.map((moto, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card key={index}>
                <CardHeader
                  title={`Vehiculo: ${moto.modelo}`}
                  action={
                    <IconButton onClick={() => handleOpenModalEdit(moto)}>
                      <EditIcon />
                    </IconButton>
                  }
                />
                <CardMedia
                  component="img"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCPJhkMJEvvA3AoeFMc--WofmfMDUhCXYMg&usqp=CAU"
                  sx={{ width: "auto", height: "200px" }}
                  alt={`Imagen de ${moto.modelo}`}
                />
                <CardActions>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography variant="subtitle1" color="text.primary">
                      {`Precio: ${moto.precio}`}
                    </Typography>
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenModal(moto)}
                    >
                      Vender
                    </Button>
                  </Box>
                </CardActions>
                <CardContent>
                  <Box display="flex" gap={1}>
                    <Typography variant="subtitle1">{`Cilindraje:`}</Typography>
                    <Typography>{` ${moto.cilindraje}CC`}</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography variant="subtitle1">{`Color:`}</Typography>
                    <Typography>{` ${moto.color}`}</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography variant="subtitle1">{`Número de veloocidad:`}</Typography>
                    <Typography>{` ${moto.numeroVelocidad}`}</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography variant="subtitle1">{`Kilometraje:`}</Typography>
                    <Typography>{` ${moto.kilometraje}`}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <ModalCompra
        modalOpen={modalOpen}
        selectedVehicle={selectedMoto}
        handleCloseModal={handleCloseModal}
        vehicleType="moto"
      />
      <ModalEditVehiculo
        selectedVehiculo={selectedMoto}
        isEditModalOpen={isEditModalOpen}
        handleCloseModal={handleCloseModalEdit}
        handleUpdateVehiculo={handleUpdateField}
        setIsActualizo={setIsActualizo}
      />
    </>
  );
};
