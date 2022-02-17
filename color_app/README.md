### Notas personales para el entendimiento del proyecto.
## Massive Color Project Pt1: 
Se otorga un archivo llamado seedColors.js el cual es un array con distintas paletas de colores que contienen paletteName, id, emojis and colors; los cuales son usados como props.
*Palette.js* es el componente el cual va a tener un nav, las cajas con los colores y un footer. 
# CSS
ColorBox.css tiene un width y un height pero por si solo no funciona, es un component hijo, es decir que al usar porcentajes sus medidas se van a adaptar al elemento padre; en este caso Palette.css que dispone un view height de 100% y para la paleta de colores un hight del 90% que es esta ultima medida la que utilizara ColorBox para armar sus cajitas de colores.
**METODOS**
*changeCopyState()* lo llama onCopy dentro de CopyToClipboard para cambia el estado a true, y luedo de 1500ms lo vuelve a poner en false. Esto es utilizado para agregar una clase y sacarla dinamicamente si el usuario hace click en copiar un color.