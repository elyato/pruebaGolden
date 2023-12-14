import { Drawer, List, ListItem, Typography, Chip } from "@mui/material";
import { Moto } from "../interfaces/DataMoto";


interface DrawerInfoProps {
  handleCloseDrawer: () => void;
  drawerOpen: boolean;
  selectedMoto: Moto | null;
}

export const DrawerInfo = ({
  handleCloseDrawer,
  drawerOpen,
  selectedMoto,
}: DrawerInfoProps) => {
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
          </>
        )}
      </List>
    </Drawer>
  );
};
