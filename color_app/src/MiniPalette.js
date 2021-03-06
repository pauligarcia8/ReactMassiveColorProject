import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";
class MiniPalette extends Component {
  constructor(props){
    super(props);

  }
  deletePalette = (e) => {
    e.stopPropagation();
    this.props.openDialog(this.props.id)
  }
   render() {
      const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
      const miniColorBoxes = colors.map(color => (
        <div
          className={classes.miniColor}
          style={{ backgroundColor: color.color }}
          key={color.name}
        />
      ));
    return (
        <div className={classes.root} onClick={() => handleClick(id)}>
        <div className={classes.delete}>
          <DeleteIcon 
          className={classes.deleteIcon} 
          style={{transition: "all 0.3s ease-in-out"}}
          onClick={this.deletePalette}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
          <h5 className={classes.title}>
              {paletteName} <span className={classes.emoji}>{emoji}</span>
          </h5>
        </div>
    );
    }
}

export default withStyles(styles)(MiniPalette);