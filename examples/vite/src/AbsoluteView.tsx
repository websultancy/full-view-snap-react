
import {
  FullViewSnap,
  Controller,
  FullView,
  AbsoluteView,
} from "full-view-snap-react";

const mobileStyles = `
  @media (max-width: 768px) {
    .mobile-offset {
      top: 80px !important;
      margin-top: 80px !important;
    }
    .mobile-height {
      height: calc(100vh * 2 + 200px + 80px) !important;
    }
  }
`;

function AbsoluteViewExample() {
  return (
    <>
      <style>{mobileStyles}</style>
      <FullViewSnap
        hideScrollBars={true}
        render={() => (
          <>
            <Controller>
            <FullView>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                height: "100vh"
              }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  AbsoluteView Demo
                </h1>
                <p style={{ fontSize: "1.2rem", textAlign: "center", maxWidth: "600px" }}>
                  AbsoluteView allows you to place decorative elements between FullView components while preserving native snap behavior. Scroll to see the sticky element!
                </p>
              </div>
            </FullView>
            <AbsoluteView 
              className="mobile-height"
              style={{
                zIndex: 10, 
                height: "calc(100vh * 2 + 200px)",
                right: "20px",
              }}
            >
              <div 
                className="mobile-offset"
                style={{
                  position: "sticky",
                  top: "0px",
                  color: "white",
                  height: "200px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  width: "300px"
                }}
              >
                <div style={{ 
                  padding: "1rem", 
                  background: "rgba(0,0,0,0.8)", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  borderRadius: "8px", 
                  marginTop: "0px"
                }}>
                  🎯 Sticky Decorative Element
                </div>
              </div>
            </AbsoluteView>
            <FullView>
              <div style={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                height: "100vh"
              }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  Second View
                </h1>
                <p style={{ fontSize: "1.2rem", textAlign: "center", maxWidth: "600px" }}>
                  The AbsoluteView element stays sticky while scrolling through FullView sections. Notice how it maintains its position!
                </p>
              </div>
            </FullView>           
            <FullView>
              <div style={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                height: "100vh"
              }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  Third View
                </h1>
                <p style={{ fontSize: "1.2rem", textAlign: "center", maxWidth: "600px" }}>
                  Perfect for overlays, notifications, or decorative elements that need to persist across multiple views.
                </p>
              </div>
            </FullView>           
            <FullView>
              <div style={{
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                height: "100vh"
              }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  Fourth View
                </h1>
                <p style={{ fontSize: "1.2rem", textAlign: "center", maxWidth: "600px" }}>
                  The AbsoluteView maintains its position while preserving the native snap behavior of FullView components.
                </p>
              </div>
            </FullView>
          </Controller>
        </>
      )}
    />
    </>
  );
};

export default AbsoluteViewExample;
