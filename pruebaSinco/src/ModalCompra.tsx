import { Box, Button, Modal, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface porps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  textField1Value: string;
  textField2Value: string;
  setTextField1Value: Dispatch<SetStateAction<string>>;
  setTextField2Value: Dispatch<SetStateAction<string>>;
}
export const ModalCompra = ({
  modalOpen,
  handleCloseModal,
  textField1Value,
  textField2Value,
  setTextField1Value,
  setTextField2Value,
}: porps) => {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
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
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseModal();
          }}
          sx={{ marginTop: 2 }}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};
