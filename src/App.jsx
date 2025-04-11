import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import Education from "./pages/Education";
import { Locations } from "./pages/locations";
import { AppWindow } from "lucide-react";
import AppLayout from "./layouts/app-layout";
import Favourites from "./components/favourites";
import ProtectedRoute from "./components/protected-route";
import { useNavigate } from "react-router-dom";
import { PGDetails } from "./pages/pgdetails";
import { AboutUs } from "./pages/aboutus";
import Addtocart from "./pages/Addtocart";
import PaymentForm from "./pages/PaymentForm";
import AddPG from "./pages/AddPG";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/favourites-pgs",
        element: <Favourites />,
      },
      {
        path: "/pg-details",
        element: <PGDetails />,
      },
      {
        path: "/education",
        element: <Education />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Addtocart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-method",
        element: (
          <ProtectedRoute>
            <PaymentForm />
          </ProtectedRoute>
        ),
      },

      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <PaymentForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/listed-PGs",
        element: (
          <ProtectedRoute>
            <Locations />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addpg",
        element: (
          <ProtectedRoute>
            <AddPG />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
