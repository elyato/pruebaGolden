import { RouterProvider, createHashRouter } from "react-router-dom";
import { Concesionario } from "../Concesionario";
import AddMotoForm from "../Form/AddMotoForm";
import { CardView } from "../Components/CardViewMoto";
import { CardViewCarro } from "../Components/CardViewCarro";
import { AddCarroForm } from "../Form/AddCarroForm";
import TablaClientes from "../Components/Tablas/TablaClientes";

const router = createHashRouter([
  {
    path: "/",
    element: <Concesionario />,
  },
  {
    path: "/moto",
    element: <CardView />,
  },
  {
    path: "/agregarMoto",
    element: <AddMotoForm />,
  },
  {
    path: "/agregarCarro",
    element: <AddCarroForm />,
  },

  {
    path: "/carro",
    element: <CardViewCarro />,
  },
  {
    path: "/clientes",
    element: <TablaClientes />,
  },
]);

export const RouterPages = () => {
  return <RouterProvider router={router} />;
};
