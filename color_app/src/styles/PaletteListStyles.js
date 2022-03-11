import sizes from "./sizes";
import bg from "./bg.svg";
export default {
    "@global": {
        ".fade-exit": {
          opacity: 1
        },
        ".fade-exit-active": {
          opacity: 0,
          transition: "opacity 500ms ease-out"
        }
      },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        /* background by SVGBackgrounds.com */
        backgroundColor: "#394bad",backgroundImage: `url(${bg})`,
        overflow: "scroll"
        // para no tener que cambiar el height de la img
    },
    heading: {
        fontSize: "2rem",
    },
    container: {
        width: '70%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down("xl")]: {
            width: "80%"
          },
          [sizes.down("xs")]: {
            width: "75%"
          }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        "& a": {
            color: "white"
          }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)", // 3 cajitas que ocupen el 30% del espacio
        gridGap: "5%", // se completa el espacio entre medio de las tres columnas 
        [sizes.down("md")]: {
          gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
          gridTemplateColumns: "repeat(1, 100%)",
          gridGap: "1.4rem"
        }
    }

};