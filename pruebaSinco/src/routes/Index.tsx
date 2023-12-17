import { RouterProvider, createHashRouter } from "react-router-dom";
import { Concesionario } from "../Concesionario";
import AddMotoForm from "../Form/AddMotoForm";
import { CardView } from "../Components/CardView";
import { CardViewCarro } from "../Components/CardViewCarro";

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
    path: "/carro",
    element: <CardViewCarro />,
  },
]);

export const RouterPages = () => {
  return <RouterProvider router={router} />;
};
