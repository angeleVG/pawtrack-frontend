import "./App.css";
import { Routes, Route } from "react-router-dom";

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
import TaskPage from "./pages/TaskPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

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
          path="/food"
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
          path="/task"
          element={
            <IsPrivate>
              <TaskPage />
            </IsPrivate>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
