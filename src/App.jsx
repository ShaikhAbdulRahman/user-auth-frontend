import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Support from "./pages/Support/Support";
import TransactionPage from "./pages/Transaction/Transaction";
import SignIn from "./pages/Auth/Signin/Signin";
import SignUp from "./pages/Auth/Signup/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ForgotPasswordSent from "./pages/Auth/ForgotPasswordSent/ForgotPasswordSent";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "./pages/Auth/ResetPasswordSuccess/ResetPasswordSuccess";
import RegisterSuccess from "./pages/Auth/RegisterSuccess/RegisterSuccess";
import RegisterEmailVerify from "./pages/Auth/RegisterEmailVerify/RegisterEmailVerify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import AlreadySigninRoute from "./components/AlreadySigninRoute";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <ProtectedRoute>
        <Dashboard />,
        </ProtectedRoute>
        ) 
    },
    {
      path: "/transactions",
      element:(
        <ProtectedRoute>
        <TransactionPage />,
        </ProtectedRoute>
        ) 
    },
    {
      path: "/support",
      element:(
        <ProtectedRoute>
        <Support />,
        </ProtectedRoute>
        ) 
    },
    {
      path: "/signin",
      element:(
        <AlreadySigninRoute>
          <SignIn />,
        </AlreadySigninRoute>
      ),
    },
    {
      path: "/signup",
      element:(
        <AlreadySigninRoute>
          <SignUp />,
        </AlreadySigninRoute>
      ),
    },
    {
      path: "/forgot-password",
      element:(
        <AlreadySigninRoute>
          <ForgotPassword />,
        </AlreadySigninRoute>
      ),
    },
    {
      path: "/forgot-success/:email",
      element:(
        <AlreadySigninRoute>
          <ForgotPasswordSent />,
        </AlreadySigninRoute>
      ),
    },
    {
      path:"/reset-password-verify/:id/:token",
      element:(
        <AlreadySigninRoute>
          <ResetPassword />,
        </AlreadySigninRoute>
      ),
    },
    {
      path:"/reset-success",
      element:(
        <AlreadySigninRoute>
          <ResetPasswordSuccess/>,
        </AlreadySigninRoute>
      ),
    },
    {
      path:"/email-verify",
      element:(
        <AlreadySigninRoute>
          <RegisterSuccess />,
        </AlreadySigninRoute>
      ),
    },
    {
      path:"/register-verify-email",
      element:(
        <AlreadySigninRoute>
          <RegisterEmailVerify />,
        </AlreadySigninRoute>
      ),
    }
  ]);
  const queryClient= new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </>
  );
}

export default App;
