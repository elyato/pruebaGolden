import { useState } from "react";
import { TextField, Typography, Box, Button, Modal } from "@mui/material";
import { Carro, Moto } from "../interfaces/Data";
interface porps {
  selectedVehiculo: Moto | Carro | null;
  isEditModalOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateVehiculo: (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => Promise<void>;
}
export const ModalEditVehiculo = ({
  handleUpdateVehiculo,
  selectedVehiculo,
  handleCloseModal,
  isEditModalOpen,
}: porps) => {
  const [newColor, setNewColor] = useState("");
  const handleConfirmColor = async () => {
    if (selectedVehiculo) {
      await handleUpdateVehiculo(selectedVehiculo.id, "color", newColor);
      setNewColor("");
    }
  };
  return (
    <Modal
      open={isEditModalOpen}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Editar el color de la moto
        </Typography>
        <TextField
          label="Nuevo color"
          sx={{ width: 150 }}
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <Box display="flex">
          <Button variant="contained" onClick={handleConfirmColor}>
            Guardar
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
