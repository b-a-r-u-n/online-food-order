import { useDispatch, useSelector } from "react-redux";
import { Error, Home, Loading } from "./components";
import { useEffect } from "react";
import { fetchedData } from "./Features/homeSlice";
// import {datas} from "./data/data"


function App() {

  const dispatch = useDispatch();

  const isError = useSelector(state => state.home.isError);
  const isLoading = useSelector(state => state.home.isLoading);
  console.log("Loading",isLoading );
  console.log("Error", isError);

  useEffect(() => {
    dispatch(fetchedData());
  },[])
  
  
  return (
    <>
      {
        isLoading ? <Loading /> : (isError ? <Error /> : <Home />)
      }
    </>
  );
}

export default App;
