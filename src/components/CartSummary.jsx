import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import { currency } from "../util/util";

export function CartSummary({ cart }) {
  const subTotal = cart
    .map((product) => product.qty * product.price)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="container">
      <Grid container spacing={2} className="center-box">
        <Grid item xs={8}>
          <h3>Cart Summary</h3>
        </Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell>{product.title}</TableCell>
                      <TableCell align="right">{product.qty}</TableCell>
                      <TableCell align="right">
                        {currency(product.price)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1} align="right">
                    Subtotal
                  </TableCell>
                  <TableCell align="right">{currency(subTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
