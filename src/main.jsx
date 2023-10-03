import { AuthContextProvider } from "./context/AuthContext.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ChakraProvider>

  // </React.StrictMode>,
);
