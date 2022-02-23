### Notas personales para el entendimiento del proyecto.
## Massive Color Project Pt1: 
Se otorga un archivo llamado seedColors.js el cual es un array con distintas paletas de colores que contienen paletteName, id, emojis and colors; los cuales son usados como props.
*Palette.js* es el componente el cual va a tener un nav, las cajas con los colores y un footer. 
### CSS
ColorBox.css tiene un width y un height pero por si solo no funciona, es un component hijo, es decir que al usar porcentajes sus medidas se van a adaptar al elemento padre; en este caso Palette.css que dispone un view height de 100% y para la paleta de colores un hight del 90% que es esta ultima medida la que utilizara ColorBox para armar sus cajitas de colores.  

### JSS
Se genera un objeto en el cual se asigna un nombre de clase (className) el cual tendra estilos que tomara un elemento.
A la hora de exportar, en este proyecto se importaron los estilos de la libreria MaterialUI por lo tanto se pasa el nombre del objeto creado como parametro y luego el nombre del componente. De esta forma se exportara un nuevo componente con estilos propios que son pasados como *props*.
Dentro de props existe un atributo llamado *classes* y dentro de el esta nuestra className creada con nuestros estilos. Por lo tanto...  
```
import React from 'react';  
import {withStyles} from '@material-ui/styles';  

const styles = {  
    main: {  
        backgroundColor: 'purple',  
        border:'3px solid teal'  
    }  
};  
function MiniPalette(props) { 
    const { classes } = props;   
    return (  
        <div>  
            <h1 className={classes.main}>Mini Palette</h1>    
        </div>  
    )  
}  

export default withStyles(styles)(MiniPalette);  
```
Al ser un componente funcional se accede a **classes** directo desde props, si es un componente de clase se accede atraves de this.props
**METODOS**
#### ColorBox.js
- *changeCopyState()* lo llama onCopy dentro de CopyToClipboard para cambia el estado a true, y luedo de 1500ms lo vuelve a poner en false. Esto es utilizado para agregar una clase y sacarla dinamicamente si el usuario hace click en copiar un color.
#### Palette.js
- *changeLevel()* cambia el nivel de transparencia de la paleta de colores.
- *changeFormat()* cambia el formato de escritura de color, hex, rgb o rgba.
#### NavBar.js
- *handleFormatChange* permite seleccionar el formato de la paleta de colores.
- *closeSnackbar()* setea el open en false, para que el snakbar quede oculto.

**React-Router-Dom**
El curso esta desactualizado, para la continuidad del mismo se opto por la instalacion de Router v5 y seguir con la explicación de Colt Steele, con la idea de hacer un refactor posteriormente.
#### SingleColorPalette.js*
- *gatherShades(palette, colorToFilterBy)* busca encontrar las key (100 - 900) dentro de un color, y concatenarselas a un array para luego filtrarlo y obtener un nuevo color.

