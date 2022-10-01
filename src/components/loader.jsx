import React from "react";

export default function loader() {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100vh", zIndex: "999999999999999", top:"0", background:"#00000080" }}>
      <div className="spinner-border position-absolute top-50 start-50">
        <span></span>
      </div>
    </div>
  );
}
