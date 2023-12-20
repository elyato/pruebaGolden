import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Alert } from "@mui/material";
import { Moto, Precios } from "../interfaces/Data";

const useFetchMotoData = () => {
  const apiMotoUrl = "http://localhost:3000/motos";

  const queryClient = useQueryClient();

  const {
    data: motoData = [],
    isLoading: loading,
    error,
  } = useQuery<Moto[]>({
    queryKey: "motoData",
    queryFn: async () => {
      const response = await axios.get(apiMotoUrl);
      return response.data;
    },
  });

  const updateMotoMutation = useMutation(
    ({ motoId, newData }: { motoId: number; newData: Partial<Moto> }) =>
      axios.patch(`${apiMotoUrl}/${motoId}`, newData),
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
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
    if (motoData && motoData.length >= 15) {
      console.error("Error: No se pueden agregar más de 15 motos.");
      return {
        estado: false,
        mensaje: "No se pueden agregar más de 15 motos.",
      };
    }

    try {
      if (newMotoData.cilindraje > 400) {
        console.error(
          "Error: No se permite agregar motos con cilindraje superior a 400cc."
        );
        return {
          estado: false,
          mensaje:
            "No se permite agregar motos con cilindraje superior a 400cc",
        };
      }

      if (newMotoData.kilometraje !== 0) {
        const preciosData = queryClient.getQueryData<Precios[]>("preciosData");

        if (preciosData && preciosData.length > 0) {
          const modeloBase = preciosData.find(
            (precio) => precio.modelo === newMotoData.modelo
          );

          if (modeloBase) {
            const precioCalculado = modeloBase.precio * 0.85;

            if (newMotoData.precio <= precioCalculado) {
              console.error(
                "Error: El precio de la moto no puede ser igual al 85% del precio base."
              );
              return {
                estado: false,
                mensaje:
                  "El precio de la moto no puede ser igual al 85% del precio base.",
              };
            }

            if (newMotoData.precio >= modeloBase.precio) {
              console.error(
                "Error: El precio de la moto no puede ser mayor o igual al precio base cuando el kilometraje es diferente de 0."
              );
              return {
                estado: false,
                mensaje:
                  "El precio de la moto no puede ser mayor o igual al precio base cuando el kilometraje es diferente de 0.",
              };
            }
          }
        }
      }

      await addMotoMutation.mutateAsync(newMotoData);
      return {
        estado: true,
        mensaje: "Se agregó correctamente",
      };
    } catch (error) {
      console.error("Error al agregar la moto:", error);
      return {
        estado: false,
        mensaje: "No se pudo registrar la moto",
      };
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
