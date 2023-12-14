import { useState } from "react";
import useFetchMotoData from "./hook/useMoto";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { DrawerInfo } from "./Components/DrawerInfo";
import InfoIcon from "@mui/icons-material/Info";

export const FormMoto = () => {
  const data = useFetchMotoData();
  const { motoData, updateMoto } = data;

  const [selectedMoto, setSelectedMoto] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleUpdateField = async (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => {
    await updateMoto(motoId, { [fieldName]: newValue });
  };
  console.log(motoData);

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
      <img src="/assets/image/MT09-2022-COLOR_AZUL.jpg" alt="" />

      {motoData.map((moto, index) => (
        <Card key={index} sx={{ marginTop: "16px", height: 200 }}>
          <CardContent>
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
            <Button color="success">Vender</Button>
          </CardContent>
        </Card>
      ))}
      <DrawerInfo
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedMoto={selectedMoto}
        handleUpdateMoto={handleUpdateField}
      />
    </Stack>
  );
};
