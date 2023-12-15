import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";

interface Cliente {
  nombreCompleto: string;
  cedula: string;
}

export const useClientes = () => {
  const apiClientes = "http://localhost:3000/clientes";

  const queryClient = useQueryClient();
  const {
    data: dalaClient = [],
    isLoading: loading,
    error,
  } = useQuery<Cliente[]>({
    queryKey: "motoData",
    queryFn: async () => {
      const response = await axios.get(apiClientes);
      return response.data;
    },
  });
  const createClienteMutation = useMutation(
    (newCliente: Cliente) => axios.post(apiClientes, newCliente),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dataCliente");
      },
    }
  );

  const addCliente = async (newClient: Cliente) => {
    try {
      await createClienteMutation.mutateAsync(newClient);
      return true;
    } catch (error) {
      console.error("Error en agregar el usuario", error);

      throw error;
    }
  };

  return { loading, error, addCliente };
};

export default useClientes;
