import { useState } from "react";
import useFetchMotoData from "./hook/useMoto";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { DrawerInfo } from "./Components/DrawerInfo";
import InfoIcon from "@mui/icons-material/Info";
import { ModalCompra } from "./ModalCompra";

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
      <Typography variant="h5">
        Bienvenido a la sección de motos, elige nuestro catálogo
      </Typography>

      {motoData.map((moto, index) => (
        <Card key={index} sx={{ marginTop: "16px", height: 200 }}>
          <CardContent>
            <img src={moto.image} alt="" />
            <Typography variant="body1">Modelo: {moto.modelo}</Typography>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleOpenDrawer(moto)}
              startIcon={<InfoIcon />}
            >
              Ver detalle
            </Button>
            <Button color="success" onClick={() => handleVenderClick(moto)}>
              Vender
            </Button>
          </CardContent>
        </Card>
      ))}
      <DrawerInfo
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedMoto={selectedMoto}
        handleUpdateMoto={handleUpdateField}
      />
      <ModalCompra
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        setTextField1Value={setTextField1Value}
        setTextField2Value={setTextField2Value}
        textField1Value={textField1Value}
        textField2Value={textField2Value}
      />
    </Stack>
  );
};
