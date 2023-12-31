import { QueryClient, QueryClientProvider } from "react-query";
import { RouterPages } from "./routes/Index";
import "./estilos.css";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterPages />
    </QueryClientProvider>
  );
};

export default App;
