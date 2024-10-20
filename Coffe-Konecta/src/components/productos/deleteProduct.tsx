import React from 'react';
import './product.css';
import IProduct from '../../interface/IProduct';

interface DeleteProductProps {
  closeModal: () => void;
  onConfirm: () => void;
  productToDelete: IProduct | null;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const handleProductDelete = async (
  productToDelete: IProduct | null,
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  closeModal: () => void
) => { 
  if (!productToDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/product/${productToDelete._id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    // Actualizar el estado de productos
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productToDelete._id)
    );

    closeModal(); // Cerrar el modal de eliminación
  } catch (error) {
    console.error("Error:", error);
  }
};

const DeleteProduct: React.FC<DeleteProductProps> = ({
  closeModal,
  onConfirm,
  productToDelete,
  setProducts,
}) => {
  const handleConfirm = () => {
    handleProductDelete(productToDelete, setProducts, closeModal);
    onConfirm(); // Otras acciones adicionales al confirmar
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Confirmar Eliminación</h1>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <button onClick={handleConfirm}>Sí, eliminar</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
