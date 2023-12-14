import { useEffect, useState } from "react";
import axios from "axios";

// Define una interfaz para el tipo de datos de las motos
interface Moto {
  id: number;
  modelo: string;
  color: string;
  kilometraje: number;
  precio: number;
  cilindraje: string;
  nuemroVelocidad: number;
}

const useFetchMotoData = () => {
  const [motoData, setMotoData] = useState<Moto[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiMotoUrl = "http://localhost:3000/moto";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiMotoUrl);
        const data = response.data;
        setMotoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos de la moto:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateMoto = async (motoId: number, newData: Partial<Moto>) => {
    try {
      await axios.patch(`${apiMotoUrl}/${motoId}`, newData);

      setMotoData((prevData) =>
        prevData.map((moto) =>
          moto.id === motoId ? { ...moto, ...newData } : moto
        )
      );
    } catch (error) {
      console.error("Error al actualizar el color de la moto:", error);
    }
  };

  const addMoto = async (newMotoData: Omit<Moto, "id">) => {
    try {
      const response = await axios.post(apiMotoUrl, newMotoData);

      setMotoData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error al agregar la moto:", error);
    }
  };

  return { motoData, loading, error, updateMoto, addMoto };
};

export default useFetchMotoData;
