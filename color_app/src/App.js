import React, { Component } from "react";
import {
  Switch, 
  Route,
  
} from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";


class App extends Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }
  // este metodo sirve para retornar el obejto completo de seedColors (paleta de colores) que corresponda con el id ingresado 
  render() {
     return (
      //  <Switch>
      //    <Route 
      //    exact path="/" 
      //    render={routeProps => (
      //    <PaletteList palettes={seedColors} {...routeProps}/>
      //    )} //routeProps se importa para acceder a metodos como history para poder usarlo dentro de paletteList
      //    />
      //    <Route 
      //    exact path="/palette/:id" 
      //    render={routeProps => ( 
      //       <Palette 
      //       palette={generatePalette(
      //         this.findPalette(routeProps.match.params.id)
      //       )}
      //       /> 
      //    )}
      //    />
      //    <Route path='/palette/:paletteId/:colorId' render={() => <SingleColorPalette />}></Route>
      //  </Switch>
       <Switch>
         <Route 
         exact 
         path="/" 
         render={routeProps => (
           <PaletteList palettes={seedColors} {...routeProps} />
           )} //routeProps se importa para acceder a metodos como history para poder usarlo dentro de paletteList
          />
          <Route 
            exact 
            path="/palette/:id" 
            render={routeProps => ( 
              <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
                /> 
            )}
          />
          <Route 
           path='/palette/:paletteId/:colorId' 
           render={routeProps => ( 
             <SingleColorPalette
               palette={generatePalette(
               this.findPalette(routeProps.match.params.paletteId)
               )} 
             />
           )} 
          />       
          </Switch>
     );
  }
}
        
 

export default App;
