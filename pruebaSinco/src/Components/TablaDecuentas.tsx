import React, { useState } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface CuotasTableProps {
  valor: number;
  numCuotas: number;
  interes: number;
}

export const CuotasTable: React.FC<CuotasTableProps> = ({
  valor,
  numCuotas,
  interes,
}) => {
  const [cuotasData, setCuotasData] = useState([]);

  const redondear = (numero: number, decimales: number) => {
    const factor = 10 ** decimales;
    return Math.round(numero * factor) / factor;
  };

  const calcularCuotas = () => {
    const cuotaInicial = valor / numCuotas;
    const cuotas = [];

    let totalInteres = 0;
    let saldoPendiente = valor;

    for (let i = 1; i <= numCuotas; i++) {
      const cuotaInteres = saldoPendiente * (interes / 100);
      totalInteres += cuotaInteres;

      const cuotaPrincipal = cuotaInicial + cuotaInteres;
      saldoPendiente -= cuotaInicial;

      cuotas.push({
        cuota: i,
        cuotaPrincipal: redondear(cuotaPrincipal, 2),
        saldoPendiente: redondear(saldoPendiente, 2),
        cuotaInteres: redondear(cuotaInteres, 2),
        cuotaInicial: redondear(cuotaInicial, 2),
      });
    }

    cuotas.push({
      cuota: "Total",
      cuotaPrincipal: redondear(valor, 2),
      cuotaInteres: redondear(totalInteres, 2),
      cuotaInicial: redondear(cuotaInicial, 2),
    });

    setCuotasData(cuotas);
  };

  return (
    <>
      <Button onClick={calcularCuotas}>Calcular Cuotas</Button>
      <TableContainer sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Num Cuota</TableCell>
              <TableCell>Cuota sin Interés</TableCell>
              <TableCell>Saldo Pendiente</TableCell>
              <TableCell>Intereses</TableCell>
              <TableCell>Cuota con Interés</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuotasData.map((cuota) => (
              <TableRow key={cuota.cuota}>
                <TableCell>{cuota.cuota}</TableCell>
                <TableCell>{cuota.cuotaInicial}</TableCell>
                <TableCell>{cuota.saldoPendiente}</TableCell>
                <TableCell>{cuota.cuotaInteres}</TableCell>
                <TableCell>{cuota.cuotaPrincipal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
