import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./hooks/useAuth.tsx";
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  </>
);

postMessage({ payload: "removeLoading" }, "*");
