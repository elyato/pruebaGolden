import { useQuery, useQueryClient } from "react-query";
import { Precios } from "../interfaces/Data";
import axios from "axios";

export const usePrecios = () => {
  const apiPrecios = "http://localhost:3000/precios";

  const queryClient = useQueryClient();

  const {
    data: dataPrecios = [],
    isLoading: loading,
    error,
  } = useQuery<Precios[]>("PreciosData", async () => {
    const response = await axios.get(apiPrecios);
    return response.data;
  });

  return { dataPrecios, loading };
};
