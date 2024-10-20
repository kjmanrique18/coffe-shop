import React, { useState, useEffect, useMemo } from "react";
import "./Product.css";
import CreateProduct from "./createProduct"; 
import EditProduct from "./editProduct"; 
import DeleteProduct from "./deleteProduct";
import IProduct from "../../interface/IProduct";


function Product() { 
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        if (!response.ok) throw new Error("Error al consultar la API");
        const data = await response.json();
        setProducts(data);
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

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.nameProduct.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

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

  // Crear un  producto
  const handleProductCreated = (newProduct: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsCreateModalOpen(false);
  };

  // Editar un producto
  const handleProductUpdated = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setIsEditModalOpen(false); 
  };

  if (loading)
    return <div className="text-center py-10">Cargando productos...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="products-container">
      <h2 className="products-title">Lista de Productos</h2>
      <div className="flex justify-end">
        <button onClick={() => setIsCreateModalOpen(true)} className="createbutton">
          Crear producto
        </button>
      </div>

      {isCreateModalOpen && (
        <CreateProduct
          closeModal={() => setIsCreateModalOpen(false)}
          onProductCreated={handleProductCreated}
        />
      )}

      {isEditModalOpen && productToEdit && (
        <EditProduct
          closeModal={() => setIsEditModalOpen(false)}
          productToEdit={productToEdit}
          onProductUpdated={handleProductUpdated}
        />
      )}

      {isDeleteModalOpen && productToDelete && (
        <DeleteProduct
          closeModal={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            // Al eliminar, no necesitamos definir handleProductDelete en este componente
            setIsDeleteModalOpen(false); // Solo cerramos el modal después de la confirmación
          }}
          productToDelete={productToDelete}
          setProducts={setProducts} // Pasamos setProducts para actualizar la lista
        />
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Referencia</th>
              <th>Precio</th>
              <th>Peso</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentProducts.map((product) => (
              <tr key={product._id} className="table-row">
                <td className="table-cell-name">{product.nameProduct}</td>
                <td className="table-cell">{product.reference}</td>
                <td className="table-cell">${product.price}</td>
                <td className="table-cell">{product.weight}</td>
                <td className="table-cell">{product.category}</td>
                <td className="table-cell">{product.stock}</td>
                <td className="table-cell">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                      setProductToEdit(product);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 ml-2"
                    onClick={() => {
                      setProductToDelete(product); // Establecer el producto a eliminar
                      setIsDeleteModalOpen(true); // Abrir el modal de confirmación de eliminación
                    }}
                  >
                    Eliminar
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
    </div>
  );
}

export default Product;
