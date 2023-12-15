import { usePrecios } from "../hook/usePrecios";
import {
  Card,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { Precios } from "../interfaces/Data";
import { Dispatch, SetStateAction } from "react";

interface props {
  setShowTablaPrecios: Dispatch<SetStateAction<boolean>>;
  showTablaPrecios: boolean;
}
export const TablaPrecios = ({
  setShowTablaPrecios,
  showTablaPrecios,
}: props) => {
  const data = usePrecios();
  const { dataPrecios } = data;

  const handleClick = () => {
    setShowTablaPrecios(!showTablaPrecios);
  };
  return (
    <Card>
      <Button onClick={handleClick}> holaaa</Button>

      <Typography></Typography>
      <TableContainer>
        <Table>
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
              <TableRow sx={{ height: 50 }}>
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
  );
};
