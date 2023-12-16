import { usePrecios } from "../hook/usePrecios";
import {
  Card,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Precios } from "../interfaces/Data";
import { Dispatch, SetStateAction } from "react";

interface props {
  setShowTablaPrecios: Dispatch<SetStateAction<boolean>>;
  showTablaPrecios: boolean;
}
export const TablaPrecios = ({}: props) => {
  const data = usePrecios();
  const { dataPrecios } = data;

  return (
    <Box>
      <Card sx={{ marginTop: 2, border: "solid 1px red", width: "500px" }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="text.primary">
            Precios
          </Typography>
        </Box>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Kilometraje</TableCell>
                <TableCell>Fecha registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPrecios.map((row: Precios) => (
                <TableRow>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.kilometraje}</TableCell>
                  <TableCell>{row.fechaRegistro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
