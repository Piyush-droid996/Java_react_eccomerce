import Header from "./components/Header";

import Footer from "./components/footer/Footer";
import React from "react";

//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./custom.scss";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Header/>
  },
  {
    path:"/about",
    element: </>
  },
  {
    path:"/contact",
    element: <Header/>
  },
  {
    path:"/login",
    element: <Header/>
  },
  {
    path:"/cart",
    element: <Header/>
  },
]);
function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
