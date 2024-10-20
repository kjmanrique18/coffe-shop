import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Product from './components/productos/product';
import Sale from './components/ventas/sale';
import Sell from './components/generar-venta/sell';
function App() {
  const navigate = useNavigate();

  function route(ruta: string) {
    navigate('/' + ruta); // dirige a la ruta especificada
  }

  return (
    <>
     <div>
      <h1>Coffee shop - KONECTA</h1>
      <button onClick={() => route('Product')}>Productos</button>
      <button onClick={() => route('Sale')}>Ventas</button>
      <button onClick={() => route('Sell')}>Generar venta</button>

      <Routes>
        <Route path="/Product" element={<Product />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Sell" element={<Sell />} />
      </Routes>
    </div>
    </>
  )
}

export default App
