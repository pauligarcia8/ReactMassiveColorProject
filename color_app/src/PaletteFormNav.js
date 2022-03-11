import React, {Component} from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import { withStyles } from '@material-ui/core';
import {Link} from "react-router-dom";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = {
          newPaletteName: "", 
          formShowing: false
        };
    }
    
    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
      };
    showForm = () => {
      this.setState({formShowing: true})
    }
    hideForm = () => {
      this.setState({formShowing: false})
    }
    render(){
        const {classes, open, palettes, handleSubmit, handleDrawerOpen} = this.props;
        const { formShowing } = this.state; 
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, {
                      [classes.hide]: open
                    })}
                    >
                    <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Create a Palette
                    </Typography>
                    
                </Toolbar>
                <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button 
                            variant="contained" color="secondary"
                            className={classes.button}>
                            Go Back
                            </Button>
                        </Link>
                        <Button 
                        variant='contained'
                        color="primary"
                        onClick={this.showForm}
                        className={classes.button}
                        >
                        Save   
                        </Button>
                    </div>
                </AppBar>
                {formShowing && (
                <PaletteMetaForm 
                palettes={palettes}
                handleSubmit={handleSubmit}
                hideForm={this.hideForm}
                />
                )}
        </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
