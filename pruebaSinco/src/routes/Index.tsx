import { RouterProvider, createHashRouter } from "react-router-dom";
import { FormConcesionario } from "../FormConcesionario";
import { FormMoto } from "../FormMoto";

const router = createHashRouter([
  {
    path: "/",
    element: <FormConcesionario />,
  },
  {
    path: "/moto",
    element: <FormMoto />,
  },
  //   {
  //     path: "/carro",
  //     element: <RegistroUsuario />,
  //     errorElement: <ErrorPage />,
]);

export const RouterPages = () => {
  return <RouterProvider router={router} />;
};
