import { AppBar, Badge, Button, IconButton, Toolbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export function Navbar({ cart }) {
  return (
    <AppBar>
      <Toolbar>
        <Button variant="text" LinkComponent={Link} to="/" color="inherit">
          React Shop
        </Button>
        <IconButton LinkComponent={Link} to="/cart">
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
