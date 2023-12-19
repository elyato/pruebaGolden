import { useMutation, useQuery, useQueryClient } from "react-query";
import { Precios } from "../interfaces/Data";
import axios from "axios";

export const usePrecios = () => {
  const apiPrecios = "http://localhost:3000/precios";

  const queryClient = useQueryClient();

  const {
    data: dataPrecios = [],
    isLoading: loading,
  } = useQuery<Precios[]>("preciosData", async () => {
    const response = await axios.get(apiPrecios);
    return response.data;
  });

  const AddModeloMutation = useMutation(
    (newModeloData: Omit<Precios, "id">) =>
      axios.post(apiPrecios, newModeloData),
    {
      onSuccess() {
        queryClient.invalidateQueries("preciosData");
      },
    }
  );

  const addModelo = async (newModelo: Omit<Precios, "id">) => {
    try {
      const fechaRegistro = new Date();

      const formattedFechaRegistro =
        fechaRegistro.getFullYear() +
        "-" +
        String(fechaRegistro.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(fechaRegistro.getDate()).padStart(2, "0") +
        " " +
        String(fechaRegistro.getHours()).padStart(2, "0") +
        ":" +
        String(fechaRegistro.getMinutes()).padStart(2, "0") +
        ":" +
        String(fechaRegistro.getSeconds()).padStart(2, "0");

      const newModeloData = {
        ...newModelo,
        fechaRegistro: formattedFechaRegistro,
      };

      await AddModeloMutation.mutateAsync(newModeloData);
    } catch (error) {
      console.error("error al agregar el modelo", error);
    }
  };

  return { dataPrecios, loading, addModelo };
};
