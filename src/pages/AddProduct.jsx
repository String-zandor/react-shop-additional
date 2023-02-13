import { ProductForm } from "../components/ProductForm";

export function AddProduct({ products, onSubmit }) {
  return <ProductForm products={products} onSubmit={onSubmit} />;
}
