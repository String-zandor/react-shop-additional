import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "../util/util";

export function ProductForm({ products, onSubmit, prodForEdit }) {
  const [form, setForm] = useState(
    prodForEdit || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    }
  );
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    image: Joi.string(),
    rating: {
      rate: Joi.number(),
      count: Joi.number(),
    },
    qty: Joi.number(),
  });

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    const { error } = schema.extract(name).label(name).validate(value);
    if (error) {
      setErrors({ ...errors, [name]: error.message });
    } else {
      delete errors[name];
      setErrors(errors);
    }

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const price = +form.price;
    const id = prodForEdit ? prodForEdit.id : generateId(products);
    const product = { ...form, id: id, price: price };
    onSubmit(product);
    navigate("/");
  }

  function isFormInvalid() {
    const { error } = schema.validate(form);
    console.log(error);
    return !!error;
  }

  return (
    <div className="container">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h2>{prodForEdit ? "EDIT" : "ADD"} PRODUCT</h2>
      </Box>
      <div className="product-form">
        <Box component="form" sx={{ width: "400px" }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title || " "}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline={true}
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description || " "}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            step="0.01"
            variant="outlined"
            name="price"
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price || " "}
          />
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="category"
            value={form.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category || " "}
          />
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            name="image"
            value={form.image}
            onChange={handleChange}
            helperText=" "
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              disabled={isFormInvalid()}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
