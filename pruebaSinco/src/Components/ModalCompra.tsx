import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useClientes } from "../hook/useClientes";

import { Carro, Moto } from "../interfaces/Data";
import useFetchMotoData from "../hook/useMoto";
import useFetchCarroData from "../hook/useCarro";
import { CuotasTable } from "./TablaDecuentas";

interface Props {
  selectedVehicle: Carro | Moto;
  modalOpen: boolean;
  handleCloseModal: () => void;
  vehicleType: "moto" | "carro";
}

export const ModalCompra = ({
  modalOpen,
  handleCloseModal,
  selectedVehicle,
  vehicleType,
}: Props) => {
  const data = useFetchMotoData();
  const { deleteMoto } = data;
  const [textField1Value, setTextField1Value] = useState("");
  const [textField2Value, setTextField2Value] = useState("");
  const [isBuyingInInstallments, setIsBuyingInInstallments] = useState(false);
  const [installmentsFormData, setInstallmentsFormData] = useState({
    precio: 0,
    numInstallments: 1,
  });

  const { addCliente } = useClientes();
  const { eliminarCarro } = useFetchCarroData();

  const isConfirmButtonDisabled =
    textField1Value.trim() === "" || textField2Value.trim() === "";

  useEffect(() => {
    const fetchData = async () => {
      if (selectedVehicle) {
        setInstallmentsFormData({
          precio: selectedVehicle.precio,
          numInstallments: 1,
        });
      }
    };

    fetchData();
  }, [selectedVehicle]);

  const handleConfirmCompra = async () => {
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

  const handleBuyInInstallments = () => {
    setIsBuyingInInstallments(true);
  };

  const handleInstallmentsFormChange = (field: string) => (event: any) => {
    setInstallmentsFormData({
      ...installmentsFormData,
      [field]: event.target.value,
    });
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
      <>
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
            <Button onClick={handleBuyInInstallments}>Comprar a cuotas</Button>
            <Button
              variant="contained"
              onClick={handleConfirmCompra}
              disabled={isConfirmButtonDisabled}
            >
              Confirmar compra
            </Button>
          </Box>
          {isBuyingInInstallments && (
            <>
              <Typography variant="subtitle1">Compra a cuotas</Typography>
              <Typography>Precio: ${installmentsFormData.precio}</Typography>
              <TextField
                label="Número de coutas"
                type="number"
                value={installmentsFormData.numInstallments}
                onChange={handleInstallmentsFormChange("numInstallments")}
                fullWidth
                margin="dense"
              />
              <Box display="flex" justifyContent="space-between">
                <Button onClick={() => setIsBuyingInInstallments(false)}>
                  Cancelar
                </Button>

                <CuotasTable
                  interes={0.5}
                  numCuotas={installmentsFormData.numInstallments}
                  valor={installmentsFormData.precio}
                />
              </Box>
            </>
          )}
        </Stack>
      </>
    </Modal>
  );
};
