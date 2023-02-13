import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { currency } from "../util/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Product({ product, onQtyUpdate, onDelete }) {
  const navigate = useNavigate();
  // Add to cart, decrement, and increment
  let buttons;
  if (product.qty > 0) {
    buttons = (
      <>
        <IconButton
          onClick={() => onQtyUpdate({ ...product, qty: product.qty - 1 })}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <span>{product.qty}</span>
        <IconButton
          onClick={() => onQtyUpdate({ ...product, qty: product.qty + 1 })}
        >
          <AddCircleIcon />
        </IconButton>
      </>
    );
  } else {
    buttons = (
      <Button
        variant="outlined"
        fullWidth
        onClick={() => onQtyUpdate({ ...product, qty: 1 })}
      >
        <AddShoppingCartIcon />
        ADD TO CART
      </Button>
    );
  }
  // Edit, Delete
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Card variant="outlined" className="product-card">
        <div>
          <CardHeader
            action={
              <IconButton onClick={handleMenu}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => navigate(`edit/${product.id}`)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => onDelete(product.id)}>Delete</MenuItem>
          </Menu>
          <div className="img-box">
            <img src={product.image} alt={product.title} />
          </div>
          <CardContent>
            <Typography paragraph>{product.title}</Typography>
            <Typography paragraph>{currency(product.price)}</Typography>
            <Rating
              defaultValue={product.rating.rate}
              readOnly
              precision={0.1}
            ></Rating>
          </CardContent>
        </div>
        <CardActions className="center-box">{buttons}</CardActions>
      </Card>
    </>
  );
}
