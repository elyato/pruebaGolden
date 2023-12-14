import axios from "axios";
import { useQuery } from "react-query";

interface Cliente {
  nombre: string;
  cedula: number;
}

export const useClientes = () => {
  const apiClientes = "http://localhost:3000/clientes";

  const {
    data: clienteData = [],
    isLoading: loading,
    error,
  } = useQuery<Cliente[]>("clienteData", async () => {
    const response = await axios.get(apiClientes);
    return response.data;
  });

  return { clienteData, loading, error };
};

export default useClientes;
