import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/reducers/productSlice";
import AppRoutes from "./routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
