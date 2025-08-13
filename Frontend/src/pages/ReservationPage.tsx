import NavBar from "../components/navBar/navBar"
import BackgroundFader from "../components/Homepage/BackgroundFader";
import GetAllReservations from "../components/reservas/getAllReservations";

const ReservationPage = () => {
  return (
    <div>
        <NavBar/>
        <BackgroundFader>
          <GetAllReservations />
        </BackgroundFader>
    </div>
  )
}

export default ReservationPage