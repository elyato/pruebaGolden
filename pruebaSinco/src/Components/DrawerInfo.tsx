import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { useState } from "react";

interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje?: string;
  numeroVelocidad?: number;
  image: string;
}

interface DrawerInfoProps {
  handleCloseDrawer: () => void;
  drawerOpen: boolean;
  selectedMoto: Moto | null;
  handleUpdateMoto: (
    motoId: number,
    fieldName: string,
    newValue: any
  ) => Promise<void>;
}

export const DrawerInfo = ({
  handleCloseDrawer,
  drawerOpen,
  selectedMoto,
  handleUpdateMoto,
}: DrawerInfoProps) => {
  const [newColor, setNewColor] = useState("");

  const handleColorChange = (event: any) => {
    setNewColor(event.target.value);
  };

  const handleConfirmColor = async () => {
    if (selectedMoto) {
      await handleUpdateMoto(selectedMoto.id, "color", newColor);
      setNewColor("");
    }
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <List>
        {selectedMoto && (
          <>
            <ListItem>
              <Typography variant="h5">
                Especificaciones de {selectedMoto.modelo}
              </Typography>
            </ListItem>
            <ListItem>
              <Chip label={`Color: ${selectedMoto.color}`} />
            </ListItem>
            <ListItem>
              <Chip label={`Kilometraje: ${selectedMoto.kilometraje} km`} />
            </ListItem>
            <ListItem>
              <Chip label={`Precio: $${selectedMoto.precio}`} />
            </ListItem>
            {selectedMoto.cilindraje && (
              <ListItem>
                <Chip label={`Cilindraje: ${selectedMoto.cilindraje}`} />
              </ListItem>
            )}
            {selectedMoto.numeroVelocidad && (
              <ListItem>
                <Chip
                  label={`Número de Velocidades: ${selectedMoto.numeroVelocidad}`}
                />
              </ListItem>
            )}

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
          </>
        )}
      </List>
    </Drawer>
  );
};
