import axios from "axios";

const apiCarroUrl = " http://localhost:3000/carro";

axios
  .get(apiCarroUrl)
  .then((response) => {
    const carroData = response.data;

    console.log("Datos del carro:", carroData);
  })
  .catch((error) => {
    console.error("Error al obtener datos del carro:", error);
  });
