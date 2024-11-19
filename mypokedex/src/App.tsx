import React from "react";
import Button from "@mui/material/Button";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Hello Vite + React + TypeScript
      </h1>
      <Button variant="contained" color="primary">
        Material-UI Button
      </Button>
    </div>
  );
};

export default App;
