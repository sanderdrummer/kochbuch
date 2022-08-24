import { Global } from "@emotion/react";

export const BaseStyles = () => {
  return (
    <Global
      styles={{
        html: {
          background: "var(--mainBackground)",
          color: "var(--text)",
          fontSize: "18px",
          fontFamily: "sans-serif",
        },
        body: { margin: 0, padding: 0 },
        "*": {
          outline: "none",
          boxSizing: "border-box",
          "&:before": { boxSizing: "border-box" },
          "&after:after": { boxSizing: "border-box" },
        },
        a: { cursor: "revert" },
        button: { cursor: "revert", fontSize: "1rem" },
        ol: { listStyle: "none" },
        ul: { listStyle: "none" },
        menu: { listStyle: "none" },
        img: { maxWidth: "100%" },
        table: { borderCollapse: "collapse" },
        input: { WebkitUserSelect: "auto" },
        textarea: { whiteSpace: "revert" },
        placeholder: { color: "unset" },

        ":root": {
          "--border": "#59687c",
          "--componentBackgroundDark": "#1d2832",
          "--componentBackgroundLight": "#2e3d4d",
          "--greenHover": "#1e4b3d",
          "--greenLight": "#2b584a",
          "--hover": "#47525a",
          "--mainBackground": "#25333f",
          "--primary": "#00acc1",
          "--redHover": "#443444",
          "--redLight": "#514151",
          "--text": "#fdfdfd",
          "--textSubtile": "#59687c",
          "--headerBackground": "#1d2832",
          "--buttonCancelFont": "#ffedf0",
          "--buttonCancelBackground": "#f54963",
          "--buttonHighlightFont": "#353535",
          "--buttonHighlightBackground": "#f2f3f2",
          "--buttonGreenBackground": "#155949",
          "--buttonGreenFont": "#00cc1d",
          "--buttonRedBackground": "#544052",
          "--buttonRedFont": "#f54963",
          "--buttonDefaultBackground": "#2a3e4f",
          "--buttonDefaultFont": "#eaebed",
          "--defaultFillColor": "#e9ebec",
        },
      }}
    ></Global>
  );
};
