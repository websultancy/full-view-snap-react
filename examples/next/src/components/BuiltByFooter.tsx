import websultancyLogoLight from "../assets/websultancy-logo-light.png";
import websultancyLogoDark from "../assets/websultancy-logo-dark.png";

export default function BuiltByFooter() {
  return (
    <div className="built-by-footer">
      by:&nbsp;
      <a
        href="https://www.websultancy.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center" }}
        aria-label="Websultancy website"
      >
        <picture>
          <source
            srcSet={websultancyLogoDark.src}
            media="(prefers-color-scheme: dark)"
          />
          <img
            src={websultancyLogoLight.src}
            alt="Websultancy"
            className="websultancy-logo"
          />
        </picture>
      </a>
    </div>
  );
}
