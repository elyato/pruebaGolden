const jsonServer = require("json-server");

const server = jsonServer.create();

const router = jsonServer.route("concesionario.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.get("/informe", (req, res) => {
  const db = router.db.getState();
  const carrosSum = sumarValoresPorTipoYModelo(db.carros);
  const motosSum = sumarValoresPorTipoYModelo(db.motos);

  res.json({
    carros: carrosSum,
    motos: motosSum,
  });
});

function sumarValoresPorTipoYModelo(vehiculos) {
  const sumas = {};
  vehiculos.forEach((vehiculo) => {
    const tipo = vehiculo.hasOwnProperty("cilindraje") ? "motos" : "carros";
    if (!sumas[tipo]) {
      sumas[tipo] = {};
    }

    if (!sumas[tipo][vehiculo.modelo]) {
      sumas[tipo][vehiculo.modelo] = 0;
    }

    sumas[tipo][vehiculo.modelo] += parseFloat(vehiculo.precio);
  });

  return sumas;
}

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
