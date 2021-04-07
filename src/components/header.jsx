import React from "react";

const Header = () => {
  const headerStyle = {
    color: "white",
    backgroundColor: "#0d0c0a",
    padding: "10px",
    fontFamily: "bebe",
    paddingTop: "100px",
  };

  const headerTittle = {
    fontSize: "60px",
  };

  const smallTittle = {
    fontWeight: "500",
  };

  return (
    <div style={headerStyle} className="text-center">
      <h1 style={headerTittle}>Burger</h1>
      <h1 style={smallTittle}>King</h1>
    </div>
  );
};

export default Header;
