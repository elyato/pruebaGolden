// Importar las bibliotecas y dependencias necesarias
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Alert } from "@mui/material";
import { vehiculo } from "../interfaces/Data";

const useFetchCarroData = () => {
  const apiCarroUrl = "http://localhost:3000/carro"; // URL para los datos de carros

  // Crear una instancia del cliente de consulta
  const queryClient = useQueryClient();

  // Obtener datos de carros utilizando React Query
  const {
    data: carroData = [],
    isLoading: loading,
    error,
  } = useQuery<vehiculo[]>({
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

  // Crear una mutación para actualizar datos de carros
  const actualizarCarroMutacion = useMutation(
    ({
      carroId,
      nuevosDatos,
    }: {
      carroId: number;
      nuevosDatos: Partial<vehiculo>;
    }) => axios.patch(`${apiCarroUrl}/${carroId}`, nuevosDatos),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
  );

  // Crear una mutación para agregar nuevos datos de carros
  const agregarCarroMutacion = useMutation(
    (nuevosDatosCarro: Omit<vehiculo, "id">) =>
      axios.post(apiCarroUrl, nuevosDatosCarro),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("carroData");
      },
    }
  );

  const agregarCarro = async (nuevosDatosCarro: Omit<vehiculo, "id">) => {
    try {
      if (carroData.length <= 9) {
        await agregarCarroMutacion.mutateAsync(nuevosDatosCarro);
        return true;
      }
    } catch (error) {
      console.error("Error al agregar el carro:", error);
      return false;
    }
    return false;
  };

  const actualizarCarro = async (
    carroId: number,
    nuevosDatos: Partial<vehiculo>
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
