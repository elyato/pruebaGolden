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

  const updateColor = async (motoId: number, newColor: string) => {
    try {
      await axios.patch(`${apiMotoUrl}/${motoId}`, { color: newColor });

      setMotoData((prevData) =>
        prevData.map((moto) =>
          moto.id === motoId ? { ...moto, color: newColor } : moto
        )
      );
    } catch (error) {
      console.error("Error al actualizar el color de la moto:", error);
    }
  };

  return { motoData, loading, error, updateColor};
};

export default useFetchMotoData;
