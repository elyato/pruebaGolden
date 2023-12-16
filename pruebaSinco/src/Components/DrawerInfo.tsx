import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { vehiculo } from "../interfaces/Data";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerInfoProps {
  handleCloseDrawer: () => void;
  drawerOpen: boolean;
  selectedMoto: vehiculo | null;
}

export const DrawerInfo = ({
  handleCloseDrawer,
  drawerOpen,
  selectedMoto,
}: DrawerInfoProps) => {
  return (
    <Modal
      open={drawerOpen}
      onClose={handleCloseDrawer}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box width={500}>
        <TableContainer component={Paper}>
          <Table aria-label="Moto Information" sx={{ height: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  {selectedMoto && (
                    <>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">
                          Especificaciones de {selectedMoto.modelo}
                        </Typography>

                        <IconButton onClick={handleCloseDrawer}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedMoto && (
                <>
                  <TableRow>
                    <TableCell>
                      <Chip label="Color" />
                    </TableCell>
                    <TableCell>{selectedMoto.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Chip label="Kilometraje" />
                    </TableCell>
                    <TableCell>{`${selectedMoto.kilometraje} km`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Chip label="Precio" />
                    </TableCell>
                    <TableCell>{`$${selectedMoto.precio}`}</TableCell>
                  </TableRow>
                  {selectedMoto.cilindraje && (
                    <TableRow>
                      <TableCell>
                        <Chip label="Cilindraje" />
                      </TableCell>
                      <TableCell>{selectedMoto.cilindraje}</TableCell>
                    </TableRow>
                  )}
                  {selectedMoto.numeroVelocidad && (
                    <TableRow>
                      <TableCell>
                        <Chip label="Número de Velocidades" />
                      </TableCell>
                      <TableCell>{selectedMoto.numeroVelocidad}</TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
