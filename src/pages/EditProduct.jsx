import { useParams } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";

export function EditProduct({ products, onSubmit }) {
  const { id } = useParams();
  const prodForEdit = products.find((prod) => prod.id === +id);
  return (
    <ProductForm
      products={products}
      prodForEdit={prodForEdit}
      onSubmit={onSubmit}
    />
  );
}
