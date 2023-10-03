import Sidebar from "./Layout/Navbar";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import ViewCar from "./pages/Car/ViewCar";
import Login from "./pages/Auth/auth";
import EditCar from "./pages/Car/CarDetails";
import Add from "./pages/Car/Add";
import Edit from "./pages/Car/Edit";
import Booking from "./pages/Booking/booking";
import BookingH from "./pages/Booking/bookingHistory";
import { Brand } from "./pages/Car/Brand";

import Users from "./pages/Users/Users";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const Auth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const Layout = () => {
    return (
      <main>
        <Auth>
          <Sidebar>
            <Toaster />
            <Outlet />
          </Sidebar>
        </Auth>
      </main>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/view",
          element: <ViewCar />,
        },
        {
          path: "/car/add",
          element: <Add />,
        },
        {
          path: "/car/edit/:id",
          element: <Edit />,
        },
        {
          path: "/details/:id",
          element: <EditCar />,
        },
        {
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/booking/History",
          element: <BookingH />,
        },
        {
          path: "/brand",
          element: <Brand />,
        },

        {
          path: "/users",
          element: <Users />,
        },
         {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
