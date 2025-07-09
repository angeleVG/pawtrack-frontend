import { Routes, Route, useLocation  } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

import WeightPage from "./pages/WeightPage";
import FoodPage from "./pages/FoodPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import MedicationPage from "./pages/MedicationPage";
import VaccinationPage from "./pages/VaccinationPage";
import ActivityPage from "./pages/ActivityPage";

import TopNavbar from "./components/Navbar/TopNavbar";
import BottomNavbar from "./components/Navbar/BottomNavbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";



function App() {
    const location = useLocation(); 
 const hideNavbarOn = ["/", "/login", "/signup"]; // not show navbar
 const hideNavbars = hideNavbarOn.includes(location.pathname); // fasle is show navbar

  return (
    <div className="App">
          {!hideNavbars && <TopNavbar />}

{/* public routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

{/* private routes */}
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <DashboardPage />
            </IsPrivate>
          }
        />
        <Route
          path="/weight"
          element={
            <IsPrivate>
              <WeightPage />
            </IsPrivate>
          }
        />
      <Route
  path="/pet/:petId/food"
  element={
    <IsPrivate>
      <FoodPage />
    </IsPrivate>
  }
/>
        <Route
          path="/contacts"
          element={
            <IsPrivate>
              <ContactPage />
            </IsPrivate>
          }
        />
        <Route
          path="/medication"
          element={
            <IsPrivate>
              <MedicationPage />
            </IsPrivate>
          }
        />
        <Route
          path="/vaccination"
          element={
            <IsPrivate>
              <VaccinationPage />
            </IsPrivate>
          }
        />
        <Route
          path="/activity"
          element={
            <IsPrivate>
              <ActivityPage />
            </IsPrivate>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
        <BottomNavbar />
    </div>
  );
}

export default App;
