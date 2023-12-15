import { useEffect, useState } from "react";
import useFetchMotoData from "./hook/useMoto";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  Box,
  CardMedia,
  Grid,
} from "@mui/material";
import { PageHeader } from "@sinco/react";
import { DrawerInfo } from "./Components/DrawerInfo";
import InfoIcon from "@mui/icons-material/Info";
import { ModalCompra } from "./ModalCompra";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export const FormMoto = () => {
  const data = useFetchMotoData();
  const { motoData, updateMoto } = data;

  const [selectedMoto, setSelectedMoto] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [textField1Value, setTextField1Value] = useState("");
  const [textField2Value, setTextField2Value] = useState("");
  const handleOpenModal = () => {
    setModalOpen(true);
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

  const handleOpenDrawer = (moto) => {
    setSelectedMoto(moto);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedMoto(null);
    setDrawerOpen(false);
  };

  return (
    <Stack width="99vw">
      <PageHeader
        title="Bienvenido a la sección de motos, elige nuestro catálogo"
        buttonBack={
          <IconButton component={Link} to="/">
            <ArrowBackIcon />
          </IconButton>
        }
      />

      <Grid container spacing={2} marginTop={2}>
        {motoData.map((moto, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ marginTop: "16px" }}>
              <CardContent>
                <Typography variant="body1">Modelo: {moto.modelo}</Typography>
                <CardMedia
                  sx={{ width: "200px" }}
                  component="img"
                  alt=""
                  image={moto.image}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  height={50}
                  alignItems="center"
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDrawer(moto)}
                    startIcon={<InfoIcon />}
                  >
                    Ver detalle
                  </Button>
                  <Button
                    color="success"
                    variant="outlined"
                    size="small"
                    onClick={() => handleVenderClick(moto)}
                  >
                    Vender
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DrawerInfo
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedMoto={selectedMoto}
      />
      <ModalCompra
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        setTextField1Value={setTextField1Value}
        setTextField2Value={setTextField2Value}
        textField1Value={textField1Value}
        textField2Value={textField2Value}
        handleUpdateMoto={handleUpdateField}
        selectedMoto={selectedMoto}
      />
    </Stack>
  );
};
