import React from "react";
import SessionButtons from "./SessionButtons";

const TopBar = () => {
  return (
    <header className="gap-4 p-6 bg-gradient-to-bl from-yellow-100 to-purple-100 shadow">
      <SessionButtons />
    </header>
  );
};

export default TopBar;
