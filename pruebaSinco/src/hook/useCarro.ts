// Importar las bibliotecas y dependencias necesarias
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Alert } from "@mui/material";
import { Carro } from "../interfaces/Data";

const useFetchCarroData = () => {
  const apiCarroUrl = "http://localhost:3000/carros"; // URL para los datos de carros

  // Crear una instancia del cliente de consulta
  const queryClient = useQueryClient();

  // Obtener datos de carros utilizando React Query
  const {
    data: carroData = [],
    isLoading: loading,
    error,
  } = useQuery<Carro[]>({
    queryKey: "carroData",
    queryFn: async () => {
      const response = await axios.get(apiCarroUrl);
      return response.data;
    },
  });

  // Función para mostrar alertas
  const mostrarAlerta = (alerta = "El vehículo se agregó correctamente") => {
    // <Alert title={alerta} />;
  };

  const actualizarCarroMutacion = useMutation(
    ({
      carroId,
      nuevosDatos,
    }: {
      carroId: number;
      nuevosDatos: Partial<Carro>;
    }) => axios.patch(`${apiCarroUrl}/${carroId}`, nuevosDatos),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
  );

  const agregarCarroMutacion = useMutation(
    (nuevosDatosCarro: Omit<Carro, "id">) =>
      axios.post(apiCarroUrl, nuevosDatosCarro),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("carroData");
      },
    }
  );

  const agregarCarro = async (nuevosDatosCarro: Omit<Carro, "id">) => {
    if (carroData.length >= 9) {
      return {
        estado: false,
        mensaje: "No se pueden agregar más de 9 carros.",
      };
    }

    try {
      if (nuevosDatosCarro.precio > 250000000) {
        console.error(
          "No se permite autos con un precio superior a 250.000.000"
        );
        return {
          estado: false,
          mensaje: "No se permite autos con un precio superior a 250.000.000",
        };
      }

      // Si llega hasta aquí, no hay errores, entonces se agrega el carro
      await agregarCarroMutacion.mutateAsync(nuevosDatosCarro);

      return {
        estado: true,
        mensaje: "Se agregó correctamente",
      };
    } catch (error) {
      console.error("Error al agregar el carro:", error);
      return {
        estado: false,
        mensaje: "Error al agregar el carro",
      };
    }
  };

  const actualizarCarro = async (
    carroId: number,
    nuevosDatos: Partial<Carro>
  ) => {
    try {
      await actualizarCarroMutacion.mutateAsync({ carroId, nuevosDatos });
    } catch (error) {
      console.error("Error al actualizar el carro:", error);
    }
  };

  const eliminarCarroMutacion = useMutation(
    (carroId: number) => axios.delete(`${apiCarroUrl}/${carroId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("carroData");
        mostrarAlerta("¡El vehículo se eliminó correctamente!");
      },
    }
  );

  const eliminarCarro = async (carroId: number) => {
    try {
      await eliminarCarroMutacion.mutateAsync(carroId);
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
    }
  };

  return {
    carroData,
    loading,
    error,
    actualizarCarro,
    agregarCarro,
    eliminarCarro,
  };
};

export default useFetchCarroData;
