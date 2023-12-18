import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Alert } from "@mui/material";
import { Precios, vehiculo } from "../interfaces/Data";

const useFetchMotoData = () => {
  const apiMotoUrl = "http://localhost:3000/moto";

  const queryClient = useQueryClient();

  const {
    data: motoData = [],
    isLoading: loading,
    error,
  } = useQuery<vehiculo[]>({
    queryKey: "motoData",
    queryFn: async () => {
      const response = await axios.get(apiMotoUrl);
      return response.data;
    },
  });

  const showAlert = (alert = "el vehiculo se agrego correctamente!") => {
    <Alert title={alert} />;
  };

  const updateMotoMutation = useMutation(
    ({ motoId, newData }: { motoId: number; newData: Partial<vehiculo> }) =>
      axios.patch(`${apiMotoUrl}/${motoId}`, newData),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
  );

  const addMotoMutation = useMutation(
    (newMotoData: Omit<vehiculo, "id">) => axios.post(apiMotoUrl, newMotoData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motoData");
      },
    }
  );

  const addMoto = async (newMotoData: Omit<vehiculo, "id">) => {
    debugger;
    try {
      if (newMotoData.kilometraje !== 0) {
        // Consulta la data de precios
        const preciosData = queryClient.getQueryData<Precios[]>("preciosData");
        console.log(preciosData);

        if (preciosData && preciosData.length > 0) {
          const modeloBase = preciosData.find(
            (precio) => precio.modelo === newMotoData.modelo
          );

          if (modeloBase) {
            const precioCalculado = modeloBase.precio * 0.85;

            if (newMotoData.precio == precioCalculado) {
              console.error(
                "Error: El precio de la moto no puede ser igual al 85% del precio base."
              );
              return false;
            }
          }
        }
      }

      // Si todo está bien, agrega la moto
      await addMotoMutation.mutateAsync(newMotoData);
      return true;
    } catch (error) {
      console.error("Error al agregar la moto:", error);
      return false;
    }
  };

  const updateMoto = async (motoId: number, newData: Partial<vehiculo>) => {
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
