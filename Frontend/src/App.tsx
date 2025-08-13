import CreateReservation from "./pages/CreateReservation";
import HomePage from "./pages/homePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router";
import ReservationPage from "./pages/ReservationPage";
import AddMenuItem from "./pages/addMenu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/reservations/create" element={<CreateReservation />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/addMenu" element={<AddMenuItem />} />
      </Routes>
    </>
  );
}

export default App;
