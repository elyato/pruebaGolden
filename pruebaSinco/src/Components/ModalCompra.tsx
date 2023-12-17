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
import { vehiculo } from "../interfaces/Data";
import useClientes from "../hook/useClientes";

interface Props {
  selectedMoto: vehiculo | null;
  modalOpen: boolean;
  handleCloseModal: () => void;
}

export const ModalCompra = ({
  modalOpen,
  handleCloseModal,

  // handleUpdateMoto,
  selectedMoto,
}: Props) => {
  const [textField1Value, setTextField1Value] = useState("");
  const [textField2Value, setTextField2Value] = useState("");
  const data = useFetchMotoData();
  const { deleteMoto } = data;

  const { addCliente } = useClientes();

  const handleConfirmCompra = async () => {
    debugger
    if (selectedMoto) {
      try {
        const newClient = {
          nombreCompleto: textField1Value,
          cedula: textField2Value,
        };

        await addCliente(newClient);
        setTextField1Value("");
        setTextField2Value("");
        await deleteMoto(selectedMoto.id);
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
              disabled={textField1Value === "" || textField2Value === ""}
            >
              Confirmar compra
            </Button>
          </Box>
        </Stack>
      </div>
    </Modal>
  );
};
