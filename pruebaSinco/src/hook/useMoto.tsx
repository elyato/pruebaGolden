import { useQuery, useMutation, QueryClient } from "react-query";
import axios from "axios";
import { Alert } from "@mui/material";

interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje: string;
  nuemroVelocidad: number;
  image?: string;
}

const queryClient = new QueryClient();

const useFetchMotoData = () => {
  const apiMotoUrl = "http://localhost:3000/moto";

  const showAlert = (alert = "el vehiculo se agrego correctamente!") => {
    <Alert title={alert} />; // Aquí puedes mostrar la alerta usando el componente Alert de tu biblioteca de diseño (por ejemplo, MUI)
  };

  const {
    data: motoData = [],
    isLoading: loading,
    error,
  } = useQuery<Moto[]>("motoData", async () => {
    const response = await axios.get(apiMotoUrl);
    return response.data;
  });

  const updateMotoMutation = useMutation(
    ({ motoId, newData }: { motoId: number; newData: Partial<Moto> }) =>
      axios.patch(`${apiMotoUrl}/${motoId}`, newData)
  );

  const addMotoMutation = useMutation(
    (newMotoData: Omit<Moto, "id">) => axios.post(apiMotoUrl, newMotoData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motoData");
      },
    }
  );

  const addMoto = async (newMotoData: Omit<Moto, "id">) => {
    try {
      if (motoData.length < 11) {
        await addMotoMutation.mutateAsync(newMotoData);
        return true;
      }
    } catch (error) {
      console.error("Error al agregar la moto:", error);
      return false;
    }
  };
  const updateMoto = async (motoId: number, newData: Partial<Moto>) => {
    try {
      await updateMotoMutation.mutateAsync({ motoId, newData });
    } catch (error) {
      console.error("Error al actualizar el color de la moto:", error);
    }
  };

  const deleteMotoMutation = useMutation(
    (motoId: number) => axios.delete(`${apiMotoUrl}/${motoId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motoData");
        // Mostrar la alerta
        showAlert("¡El vehículo se eliminó correctamente!");
      },
    }
  );

  const deleteMoto = async (motoId: number) => {
    try {
      await deleteMotoMutation.mutateAsync(motoId);
    } catch (error) {
      console.error("Error al eliminar la moto:", error);
    }
  };

  return { motoData, loading, error, updateMoto, addMoto, deleteMoto };
};

export default useFetchMotoData;
