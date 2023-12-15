import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";

interface Cliente {
  nombre: string;
  cedula: number;
}

export const useClientes = () => {
  const apiClientes = "http://localhost:3000/clientes";

  const queryClient = useQueryClient();

  const createClienteMutation = useMutation(
    (newCliente: Cliente) => axios.post(apiClientes, newCliente),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dataCliente");
      },
    }
  );

  const {
    data: clienteData = [],
    isLoading: loading,
    error,
  } = useQuery<Cliente[]>("dataCliente", async () => {
    const response = await axios.get(apiClientes);
    return response.data;
  });

  return { clienteData, loading, error, createClienteMutation };
};

export default useClientes;
