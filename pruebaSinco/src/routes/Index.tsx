import { RouterProvider, createHashRouter } from "react-router-dom";
import { Concesionario } from "../Concesionario";
import AddMotoForm from "../Form/AddMotoForm";
import { CardView } from "../Components/CardView";

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

  //   {
  //     path: "/carro",
  //     element: <RegistroUsuario />,
  //     errorElement: <ErrorPage />,
]);

export const RouterPages = () => {
  return <RouterProvider router={router} />;
};
