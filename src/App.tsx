import { ToastContainer } from 'react-toastify';

import './App.css';
import { Navbar } from '@/components/layout/Navbar';
import { AppRoutes } from '@/components/routing/AppRoutes';

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
