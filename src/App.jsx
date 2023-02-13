import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CartSummary } from "./components/CartSummary";
import { Navbar } from "./components/Navbar";
import { ProductList } from "./components/ProductList";
import { PRODUCTS_DATA } from "./data/products";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";

function App() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  function handleQtyUpdate(updatedProd) {
    setProducts(
      products.map((prod) => {
        return prod.id === updatedProd.id
          ? { ...prod, qty: updatedProd.qty }
          : prod;
      })
    );
  }

  function handleDelete(id) {
    setProducts(products.filter((prod) => prod.id !== id));
  }

  function handleEditProduct(product) {
    const newProducts = products.map((prod) => {
      return prod.id === product.id ? { ...prod, ...product } : prod;
    });
    setProducts(newProducts);
  }

  function handleAddProduct(product) {
    const newProducts = products.slice();
    newProducts.push(product);
    setProducts(newProducts);
  }

  return (
    <>
      <Navbar cart={products.filter((prod) => prod.qty > 0)} />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products">
          <Route
            index
            element={
              <ProductList
                products={products}
                onQtyUpdate={handleQtyUpdate}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="new"
            element={
              <AddProduct products={products} onSubmit={handleAddProduct} />
            }
          />
          <Route
            path="edit/:id"
            element={
              <EditProduct products={products} onSubmit={handleEditProduct} />
            }
          />
        </Route>
        <Route
          path="cart"
          element={
            <CartSummary cart={products.filter((prod) => prod.qty > 0)} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
