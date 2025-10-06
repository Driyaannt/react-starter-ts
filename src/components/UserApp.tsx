import React, { useState } from "react";
import { UserAuthProvider, useUserAuth } from "../context/UserAuthContext";
import UserLandingPage from "../pages/UserLandingPage";
import BookingPage from "../pages/BookingPage";
import Login from "../pages/Login";

type UserView = "landing" | "booking" | "login";

const UserApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<UserView>("landing");
  const { isAuthenticated, isAdmin, loading } = useUserAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // If user is authenticated as admin, redirect to admin panel would be handled elsewhere
  // This component only handles user-facing views

  const handleBookingClick = () => {
    setCurrentView("booking");
  };

  const handleBackToHome = () => {
    setCurrentView("landing");
  };

  const handleLoginClick = () => {
    setCurrentView("login");
  };

  switch (currentView) {
    case "booking":
      return <BookingPage onBack={handleBackToHome} />;
    case "login":
      return <Login />;
    default:
      return (
        <>
          <UserLandingPage onBookingClick={handleBookingClick} />
          {/* Floating Booking Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleBookingClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span className="text-2xl">📅</span>
              <span className="font-semibold">Book Now</span>
            </button>
          </div>
        </>
      );
  }
};

const UserAppWithProvider: React.FC = () => {
  return (
    <UserAuthProvider>
      <UserApp />
    </UserAuthProvider>
  );
};

export default UserAppWithProvider;
