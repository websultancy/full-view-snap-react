import React from "react";

const Accreditation: React.FC = () => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      background: "black",
      color: "white",
      padding: "10px 20px",
      fontSize: "14px",
      borderTopRightRadius: "8px",
      boxShadow: "0 0 8px rgba(0,0,0,0.3)",
      maxWidth: "calc(100% - 210px)"
    }}
  >
    <b>Credit:</b> Animations downloaded from&nbsp;
    <a
      href="https://iconscout.com/free-lottie-animation-pack/animal-and-nature-2_344421"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", textDecoration: "underline" }}
    >
      Free Animal And Nature Animated Icon Pack - 50 Free Download Animal Animated Icons | IconScout
    </a>
    &nbsp;by&nbsp;
    <a
      href="https://iconscout.com/contributors/google-inc/lottie-animations"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#fff", textDecoration: "underline" }}
    >
      Google Inc
    </a>
  </div>
);

export default Accreditation;