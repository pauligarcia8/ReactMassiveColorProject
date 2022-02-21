### Notas personales para el entendimiento del proyecto.
## Massive Color Project Pt1: 
Se otorga un archivo llamado seedColors.js el cual es un array con distintas paletas de colores que contienen paletteName, id, emojis and colors; los cuales son usados como props.
*Palette.js* es el componente el cual va a tener un nav, las cajas con los colores y un footer. 
### CSS
ColorBox.css tiene un width y un height pero por si solo no funciona, es un component hijo, es decir que al usar porcentajes sus medidas se van a adaptar al elemento padre; en este caso Palette.css que dispone un view height de 100% y para la paleta de colores un hight del 90% que es esta ultima medida la que utilizara ColorBox para armar sus cajitas de colores.  

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
