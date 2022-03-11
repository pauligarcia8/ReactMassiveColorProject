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
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props);
    // se implementa localStorage para reservar datos en el browser
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  // este metodo sirve para retornar el obejto completo de seedColors (paleta de colores) que corresponda con el id ingresado 
  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id )}), 
      this.localStorage
    );
  }
  // este metodo sirve para remover una paleta completa de la ruta principal. Cual Id que sea pasado, se va a filtrar todos los palettes que no matcheen con ese Id y asi quedar uno que tenga ese ID, se setea el estado y se sincroniza con localStorage.
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
       <Route render={({location}) => (
         <TransitionGroup>
         <CSSTransition key={location.key} classNames='fade' timeout={5000}>
            <Switch location={location}>
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
              <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
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
         </CSSTransition>
         </TransitionGroup>        
       )}/>
       
     );
  }
}
        
 

export default App;
