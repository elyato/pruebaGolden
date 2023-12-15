import { RouterProvider, createHashRouter } from "react-router-dom";
import { Concesionario } from "../Form/FormConcesionario";
import { FormMoto } from "../FormMoto";
import AddMotoForm from "../Form/AddMotoForm";

const router = createHashRouter([
  {
    path: "/",
    element: <Concesionario />,
  },
  {
    path: "/moto",
    element: <FormMoto />,
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
