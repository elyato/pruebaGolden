import { Box, Button, ListItem, Modal, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import useFetchMotoData from "./hook/useMoto";
import { Moto } from "./interfaces/DataMoto";
import useClientes from "./hook/useClientes";

interface porps {
  selectedMoto: Moto | null;
  modalOpen: boolean;
  handleCloseModal: () => void;
  textField1Value: string;
  textField2Value: string;
  setTextField1Value: Dispatch<SetStateAction<string>>;
  setTextField2Value: Dispatch<SetStateAction<string>>;
  handleUpdateMoto: (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => Promise<void>;
}
export const ModalCompra = ({
  modalOpen,
  handleCloseModal,
  textField1Value,
  textField2Value,
  setTextField1Value,
  setTextField2Value,
  handleUpdateMoto,
  selectedMoto,
}: porps) => {
  const [newColor, setNewColor] = useState("");
  const handleColorChange = (event: any) => {
    setNewColor(event.target.value);
  };

  const data = useFetchMotoData();
  const { deleteMoto } = data;

  const dataCliente = useClientes()
  const handleConfirmColor = async () => {
    if (selectedMoto) {
      await handleUpdateMoto(selectedMoto.id, "color", newColor);
      setNewColor("");
    }
  };

  const handleConfirmCompra = async () => {
    if (selectedMoto) {
      deleteMoto(selectedMoto.id);
    }
  };
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <div>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
          }}
        >
          <TextField
            label="Nombre Completo"
            value={textField1Value}
            onChange={(e) => setTextField1Value(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Cedula"
            value={textField2Value}
            onChange={(e) => setTextField2Value(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button
            color="primary"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleConfirmCompra}>
            Confirmar compra
          </Button>
          <ListItem>
            <TextField
              label="Nuevo Color"
              variant="outlined"
              value={newColor}
              onChange={handleColorChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmColor}
            >
              Confirmar
            </Button>
          </ListItem>
        </Box>
      </div>
    </Modal>
  );
};
