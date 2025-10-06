import React from "react";

const TestLogin: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 20px 0", color: "#333" }}>
          Test Admin Login
        </h1>
        <p style={{ margin: "0 0 30px 0", color: "#666" }}>
          This is a test component to verify rendering
        </p>
        <div
          style={{
            padding: "20px",
            background: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
            If you can see this, the routing is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
