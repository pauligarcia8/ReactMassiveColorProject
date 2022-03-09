import React from 'react';
import styles from "./styles/DraggableColorBoxStyles";
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const DraggableColorBox = SortableElement(({classes, handleClick, name, color}) => {
    return (
        <div 
            className={classes.root} 
            style={{backgroundColor: color}}
        >
        <div className={classes.boxContent}>
            <span>{name}</span>
            <DeleteIcon 
            className={classes.deleteIcon} 
            onClick={handleClick}
            />
        </div>
        </div>
    
    )
})

export default withStyles(styles)(DraggableColorBox);