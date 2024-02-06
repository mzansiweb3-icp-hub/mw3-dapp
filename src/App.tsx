import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;