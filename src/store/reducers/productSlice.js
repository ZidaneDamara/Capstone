import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadStockFromStorage = () => {
  try {
    const serializedStock = localStorage.getItem("productStock");
    if (serializedStock === null) {
      return {};
    }
    return JSON.parse(serializedStock);
  } catch (err) {
    console.error("Error loading stock from storage:", err);
    return {};
  }
};

const saveStockToStorage = (stock) => {
  try {
    const serializedStock = JSON.stringify(stock);
    localStorage.setItem("productStock", serializedStock);
  } catch (err) {
    console.error("Error saving stock to storage:", err);
  }
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const storedStock = loadStockFromStorage();
    return response.data.map((product) => ({
      ...product,
      stock:
        storedStock[product.id] !== undefined ? storedStock[product.id] : 20,
    }));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.stock -= quantity;
        const newStock = state.items.reduce((acc, item) => {
          acc[item.id] = item.stock;
          return acc;
        }, {});
        saveStockToStorage(newStock);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateStock } = productSlice.actions;
export default productSlice.reducer;
