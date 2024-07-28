import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Table from './Pages/Table.jsx';
import Treeviewdata from './Pages/Treeviewdata.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route index element={<Home />} />
    <Route path='treeview' element={<Treeviewdata />} />
    <Route path='aggrid' element={<Table />} />
  </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
