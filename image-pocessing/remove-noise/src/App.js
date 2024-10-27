import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RemoveNoise from "./components/RemoveNoise";

const App = () => {
  return (
    <>
      <div className="w-full  h-screen bg-zic-700 p-4">
        <h1 className="text-4xl text-center text-medium">Images Processing</h1>
        <h1 className="text-lg text-center text-medium">
          Remove the noise on images
        </h1>

        <div className="w-full h-[100%] flex justify-center items-center ">
          <RemoveNoise />
        </div>
      </div>
    </>
  );
};

export default App;
