import React, {Component} from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Picker} from "emoji-mart";
import "emoji-mart/css/emoji-mart.css"
class PaletteMetaForm extends Component {
    state = {
        open: false
    };
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        };
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
    }
    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { hideForm, handleSubmit } = this.props;
        const { newPaletteName } = this.state
        return (
                <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name 🎨</DialogTitle>
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your ew beatiful palette. Make sure it's unique!
                        </DialogContentText>
                        <Picker />
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={this.handleChange}
                            fullWidth
                            margin='normal'
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name alredy used"]}
                        />  
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color='primary'>
                        Cancel    
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Save Palette
                        </Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>

        )
    }
}

export default PaletteMetaForm;