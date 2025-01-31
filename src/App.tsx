import React from "react";

import Board from "./components/Board";
import { ColumnsProvider } from "./context/ColumnsProvider";
import "./styles/tailwind.css";

const App: React.FC = () => {
  return (
    <ColumnsProvider>
      <Board />
    </ColumnsProvider>
  );
};

export default App;
