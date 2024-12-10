import './App.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Main from './page/main/Main';
import Login from './page/login/Login';
import Register from './page/register/Register';
import NotFound from './page/not-found/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}