import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import { useAppContext } from "./Context/AppContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout";
import EventDetails from "./Pages/EventDetails";
import AllEvents from "./Pages/AllEvents";
import CreateEvent from "./Pages/CreateEvent";

function App() {
  const { user } = useAppContext();
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <ProtectedRoute user={!user} redirect="/">
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <AllEvents />,
        },
        {
          path: "/details",
          element: <EventDetails />,
        },
        {
          path: "/create",
          element: <CreateEvent />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
