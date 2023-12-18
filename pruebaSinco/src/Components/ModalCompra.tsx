import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useFetchMotoData from "../hook/useMoto";
import useClientes from "../hook/useClientes";
import { vehiculo } from "../interfaces/Data";
import useFetchCarroData from "../hook/useCarro";

interface Props {
  selectedVehicle: vehiculo | null;
  modalOpen: boolean;
  handleCloseModal: () => void;
  vehicleType: "moto" | "carro";
}

// ... (código anterior)

export const ModalCompra = ({
  modalOpen,
  handleCloseModal,
  selectedVehicle,
  vehicleType,
}: Props) => {
  const [textField1Value, setTextField1Value] = useState("");
  const [textField2Value, setTextField2Value] = useState("");
  const data = useFetchMotoData();
  const { deleteMoto } = data;

  const { addCliente } = useClientes();
  const { eliminarCarro } = useFetchCarroData();

  const isConfirmButtonDisabled =
    textField1Value.trim() === "" || textField2Value.trim() === "";

  const handleConfirmCompra = async () => {
    debugger
    if (selectedVehicle) {
      try {
        const newClient = {
          nombreCompleto: textField1Value,
          cedula: textField2Value,
        };

        await addCliente(newClient);
        setTextField1Value("");
        setTextField2Value("");

        if (vehicleType === "moto") {
          await deleteMoto(selectedVehicle.id);
        } else if (vehicleType === "carro") {
          await eliminarCarro(selectedVehicle.id);
        }

        handleCloseModal();
      } catch (error) {
        console.error("Error al confirmar la compra", error);
      }
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Stack
          width={600}
          p={2}
          bgcolor="background.paper"
          gap="10px"
          borderRadius={1}
        >
          <Typography variant="subtitle1">Datos del comprador</Typography>
          <TextField
            label="Nombre Completo"
            value={textField1Value}
            onChange={(e) => setTextField1Value(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Cédula"
            value={textField2Value}
            onChange={(e) => setTextField2Value(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              color="primary"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmCompra}
              disabled={isConfirmButtonDisabled}
            >
              Confirmar compra
            </Button>
          </Box>
        </Stack>
      </div>
    </Modal>
  );
};
