import Alert from "@components/commons/Modal/Alert";
import Confirm from "@components/commons/Modal/Confirm";
import router from "@routes/Router";
import GlobalStyle from "@styles/global";
import theme from "@styles/theme";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Alert />
      <Confirm />
    </ThemeProvider>
  );
}

export default App;
