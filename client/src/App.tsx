import {
  createBrowserRouter,
  Link,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router";

import AdminLayout from "@/layouts/crm/admin-layout";
import { api } from "@/api";
import Login from "@/pages/login-page";
import { store } from "@/store";
import { logout, setCredentials } from "@/slices/auth-slice";
import ErrorPage from "@/pages/error-page";
import SettingsPage from "@/pages/crm/settings/settings-page";
import RequestsPage from "@/pages/crm/requests/requests-page";
import ServicesPage from "@/pages/crm/settings/services/services-page";
import PrivateRoute from "@/components/private-route";
import RatesPage from "./pages/crm/settings/rates/rates-page";
import CalendarRatesPage from "./pages/crm/settings/calendar-rates/calendar-rates-page";
import MessagesPage from "./pages/crm/messages/messages-page";
import MessagePage from "./pages/crm/messages/message/message-page";
import TrucksPage from "./pages/crm/settings/trucks/trucks-page";
import ExtraServicesPage from "./pages/crm/settings/extra-services/extra-services-page";
import RequestLayout from "./layouts/crm/request-layout";
import RequestPage from "./pages/crm/request/request-page";
import PackingsPage from "./pages/crm/settings/packings/packings-page";
import AccountLayout from "./layouts/account/account-layout";
import AccountPage from "./pages/account/account-page";
import ProfilePage from "./pages/account/profile-page";
import AccountRequestPage from "./pages/account/request/account-request-page";
import DispatchPage from "./pages/crm/dispatch/dispatch-page";

type ResponseData = {
  error?: string;
  user?: any;
};

async function verifyAuthLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await api.get("/auth/verify");
    const data: ResponseData = response.data;

    if (data.error) {
      store.dispatch(logout());
    } else {
      store.dispatch(setCredentials({ user: data.user, token }));
    }

    return null;
  } catch (error) {
    store.dispatch(logout());
    return redirect("/login");
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col gap-10">
        Hello world!
        <Link to="/login">Login</Link>
        <Link to="/crm">CRM</Link>
        <Link to="/account">Account</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    loader: () => {
      const token = localStorage.getItem("token");
      if (token) {
        return redirect("/");
      }
      return null;
    },
    element: <Login />,
  },
  {
    path: "account",
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={["admin", "customer"]}>
        <AccountLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Fallback />,
    children: [
      {
        index: true,
        element: <AccountPage />,
      },
      {
        path: "requests",
        children: [
          {
            index: true,
            element: <Navigate to="/account" replace />,
          },
          {
            path: ":id",
            element: <AccountRequestPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "crm",
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Fallback />,
    children: [
      {
        index: true,
        element: <Navigate to="/crm/requests" replace />,
      },
      {
        path: "requests",
        element: <RequestsPage />,
      },
      {
        path: "dispatch",
        element: <DispatchPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
        children: [
          {
            path: ":requestId",
            element: <MessagePage />,
          },
        ],
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "extra-services",
            element: <ExtraServicesPage />,
          },
          {
            path: "packing",
            element: <PackingsPage />,
          },
          {
            path: "trucks",
            element: <TrucksPage />,
          },
          {
            path: "rates",
            element: <RatesPage />,
          },
          {
            path: "calendar-rates",
            element: <CalendarRatesPage />,
          },
        ],
      },
    ],
  },
  {
    path: "crm/requests/:id",
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <RequestLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <Fallback />,
    children: [
      {
        index: true,
        element: <RequestPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Fallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Global Loading...</p>
    </div>
  );
}
