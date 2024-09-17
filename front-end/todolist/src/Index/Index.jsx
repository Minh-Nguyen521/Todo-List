import React from "react";
import "../css/index.css";
import MainContent from "./mainContent";
import Sidebar from "./Sidebar";

const Index = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Index;
