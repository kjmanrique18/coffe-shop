import React, { useState, useEffect } from "react";
import IProduct from "../../interface/IProduct";
import IProductSale from "../../interface/IProductSale";
import './Sell.css'; // Asegúrate de importar el archivo CSS

function Sell() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCategory, setProductCategory] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedProducts, setAddedProducts] = useState<IProductSale[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/product/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    const productsByCategory = products.filter(product => product.category === category);
    setProductCategory(productsByCategory);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = products.find(product => product.nameProduct === event.target.value);
    setSelectedProduct(selected || null);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const addProductToTable = () => {
    if (!selectedProduct || quantity <= 0) return;

    const productToAdd: IProductSale = {
      productId: selectedProduct._id,
      amountSale: quantity,
      priceSale: selectedProduct.price,
      _id: selectedProduct._id,
    };
    
    setAddedProducts([...addedProducts, productToAdd]);
    setTotal(total + selectedProduct.price * quantity);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const finalizePurchase = async () => {
    const idSale = new Date().toISOString();
    const saleDate = new Date();

    const saleData = {
      idSale,
      saleDate,
      category: selectedCategory,
      total,
      products: addedProducts,
    };

    try {
      const response = await fetch("http://localhost:3000/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (!response.ok) throw new Error('Error finalizing purchase');
      alert('Compra finalizada con éxito');
      setAddedProducts([]);
      setTotal(0);
    } catch (error) {
      console.error("Error finalizing purchase:", error);
    }
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Generar una venta</h1>
      <div>
        <label>Categoria</label>
        <select value={selectedCategory} onChange={handleCategoryChange} className="search-input">
          <option value="">--Seleccione una categoria--</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Productos</label>
        <select value={selectedProduct?.nameProduct || ''} onChange={handleProductChange} className="search-input">
          <option value="">--Seleccione un producto--</option>
          {productCategory.map((product) => (
            <option key={product._id} value={product.nameProduct}>
              {product.nameProduct}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="Cantidad"
          min="1"
          required
          className="search-input"
        />
      </div>
      <button onClick={addProductToTable} className="createbutton">Agregar</button>
      <div className="table-container">
        <table className="products-table">
          <thead className="table-header">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {addedProducts.map((item, index) => (
              <tr key={index}>
                <td>{products.find(p => p._id === item.productId)?.nameProduct}</td>
                <td>{item.amountSale}</td>
                <td>{item.priceSale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Total: {total}</h3>
      <button onClick={finalizePurchase} className="createbutton">Finalizar compra</button>
    </div>
  );
}

export default Sell;
