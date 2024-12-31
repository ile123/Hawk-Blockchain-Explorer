import './App.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Main from './page/main/Main';
import Login from './page/login/Login';
import Register from './page/register/Register';
import NotFound from './page/not-found/NotFound';
import SearchResult from './page/search-result/SearchResult';
import SearchResultAddresses from './page/search-result/SearchResultAddresses';
import SearchResultTransactions from './page/search-result/SearchResultTransactions';
import SearchResultBlock from './page/search-result/SearchResultBlock';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/address/:query" element={<SearchResultAddresses />} />
      <Route path="/transaction/:query" element={<SearchResultTransactions />} />
      <Route path="/block/:query" element={<SearchResultBlock />} />
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