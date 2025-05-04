import React from "react";

export default function BackgroundWrapper({ children }) {
  return (
    <div
      style={{
        backgroundImage: "url('/webboard-app/menureal.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed", 
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
