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
import NewPaletteForm from "./NewPaletteForm";


class App extends Component {
  constructor(props) {
    super(props);
    // se implementa localStorage para reservar datos en el browser
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.state = { palettes: seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  // este metodo sirve para retornar el obejto completo de seedColors (paleta de colores) que corresponda con el id ingresado 
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  render() {
     return (
       <Switch>
         <Route 
          exact 
          path="/palette/new" 
          render={routeProps => (
            <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
            )}
            />
          <Route 
           path='/palette/:paletteId/:colorId' 
           render={routeProps => ( 
             <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
              )} 
             />
           )} 
          />     
         <Route 
         exact 
         path="/" 
         render={routeProps => (
           <PaletteList palettes={this.state.palettes} {...routeProps} />
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
          </Switch>
     );
  }
}
        
 

export default App;
