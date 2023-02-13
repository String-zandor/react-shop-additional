import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "./Product";

export function ProductList({ products, onQtyUpdate, onDelete }) {
  return (
    <div className="container">
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} textAlign="right">
          <Button variant="outlined" LinkComponent={Link} to="new">
            + PRODUCT
          </Button>
        </Grid>
        {products.map((prod) => {
          return (
            <Grid item key={prod.id}>
              <Product
                product={prod}
                onQtyUpdate={onQtyUpdate}
                onDelete={onDelete}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
