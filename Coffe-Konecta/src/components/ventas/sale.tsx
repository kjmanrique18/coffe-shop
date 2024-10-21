import React, { useState, useEffect, useMemo } from "react";
import "./Sale.css";
import ISale from "../../interface/ISale";

interface DetailModalProps {
  sale: ISale;
  onClose: () => void;
}
const DetailModal: React.FC<DetailModalProps> = ({ sale, onClose }) => {
  console.log(sale);
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Detalles de la Venta</h3>
        <p>
          <strong>Fecha:</strong> {new Date(sale.saleDate).toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> ${sale.total}
        </p>
        <h4>Productos:</h4>
        <ul>
          {sale.detailsSale && sale.detailsSale.length > 0 ? (
            sale.detailsSale.map((detail) => (
              <li key={detail._id}>
                <strong>{detail.productId}</strong> - Cantidad:{" "}
                {detail.amountSale} - Precio: ${detail.priceSale}
              </li>
            ))
          ) : (
            <li>No hay detalles de productos disponibles.</li>
          )}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

function Sale() {
  const [sales, setSales] = useState<ISale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedSale, setSelectedSale] = useState<ISale | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:3000/sale");
        if (!response.ok) throw new Error("Error al consultar la API");
        const data = await response.text();
        if (data) {
          const jsonData = JSON.parse(data);
          setSales(jsonData);
        }else {
          console.error('Respuesta vacía');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const filteredSales = useMemo(
    () =>
      sales.filter((sale) => {
        return sale.saleDate.toLowerCase().includes(search.toLowerCase());
      }),
    [sales, search]
  );

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const currentSales = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSales.slice(start, start + itemsPerPage);
  }, [filteredSales, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  if (loading)
    return <div className="text-center py-10">Cargando ventas...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="sales-container">
      <h2 className="sales-title">Lista de Ventas</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar ventas..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table className="sales-table">
          <thead className="table-header">
            <tr>
              <th>Fecha de Venta</th>
              <th>Precio Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentSales.map((sale) => (
              <tr key={sale._id} className="table-row">
                <td className="table-cell">
                  {new Date(sale.saleDate).toLocaleString()}
                </td>
                <td className="table-cell">${sale.total}</td>
                <td className="table-cell">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                      setSelectedSale(sale);
                      setShowDetail(true);
                    }}
                  >
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-text">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>

      {showDetail && selectedSale && (
        <DetailModal sale={selectedSale} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
}

export default Sale;
