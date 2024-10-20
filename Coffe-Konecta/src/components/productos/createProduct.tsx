import { useState } from "react";
import IProduct from "../../interface/IProduct";

interface CreateProductProps {
  closeModal: () => void;
  onProductCreated: (newProduct: IProduct) => void;
}

function CreateProduct({ closeModal, onProductCreated }: CreateProductProps) {
  const [formValues, setFormValues] = useState<IProduct>({
    _id:"",
    nameProduct: "",
    reference: "",
    price: 0,
    weight: 0,
    category: "",
    stock: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "price" || name === "weight" || name === "stock"
        ? Number(value)  // Convertir a número
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameProduct: formValues.nameProduct,
          reference: formValues.reference,
          price: formValues.price,
          weight: formValues.weight,
          category: formValues.category,
          stock: formValues.stock,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el producto");
      }

      const newProduct = await response.json();
      onProductCreated(newProduct);
      closeModal(); // Cerrar el modal después de crear el producto
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Crear Producto</h1>
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
        
          <button type="submit">Guardar</button>
        </form>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default CreateProduct;
