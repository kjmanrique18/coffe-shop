import { useState, useEffect } from "react";
import IProduct from "../../interface/IProduct";

interface EditProductProps {
  closeModal: () => void;
  productToEdit: IProduct; // Nuevo prop para el producto a editar
  onProductUpdated: (updatedProduct: IProduct) => void; // Nuevo prop para manejar la actualización
}

function EditProduct({ closeModal, productToEdit, onProductUpdated }: EditProductProps) {
  const [formValues, setFormValues] = useState<IProduct>({
    _id: productToEdit._id,
    nameProduct: productToEdit.nameProduct,
    reference: productToEdit.reference,
    price: productToEdit.price,
    weight: productToEdit.weight,
    category: productToEdit.category,
    stock: productToEdit.stock,
  });

  useEffect(() => {
    setFormValues({
      _id: productToEdit._id,
      nameProduct: productToEdit.nameProduct,
      reference: productToEdit.reference,
      price: productToEdit.price,
      weight: productToEdit.weight,
      category: productToEdit.category,
      stock: productToEdit.stock,
    });
  }, [productToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "price" || name === "weight" || name === "stock"
        ? Math.max(Number(value), 0)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/product/${productToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Error al editar el producto");
      }

      const updatedProduct = await response.json();
      onProductUpdated(updatedProduct);
      closeModal(); // Cerrar el modal después de editar el producto
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Editar Producto</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nameProduct"
            placeholder="Nombre del producto"
            value={formValues.nameProduct}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <input
            type="text"
            name="reference"
            placeholder="Referencia"
            value={formValues.reference}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formValues.price}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <input
            type="number"
            name="weight"
            placeholder="Peso"
            value={formValues.weight}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={formValues.category}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formValues.stock}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
          <button type="submit">Actualizar</button>
        </form>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default EditProduct;
