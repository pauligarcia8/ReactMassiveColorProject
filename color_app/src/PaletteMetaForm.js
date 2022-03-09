import React, {Component} from "react";
import { Button } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css"
import {Picker} from "emoji-mart";
class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
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
    showEmojiPicker = () => {
        this.setState({ stage: "emoji" });
    }
    savePalette = (emoji) => {
        const newPalette = {
            paletteName: this.state.newPaletteName, 
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
        this.setState({ stage: "" });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { newPaletteName, stage } = this.state
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog open={stage === "emoji"} onClose={hideForm}>
                <DialogTitle >
                    Choose a Palette Emoji
                </DialogTitle>
                <Picker title='Pick a Palette Emoji' onSelect={this.savePalette} />
                </Dialog>
                <Dialog
                open={stage === 'form'}
                onClose={hideForm}
                aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id="form-dialog-title">
                        Choose a Palette Name 🎨
                    </DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beatiful palette. Make sure it's unique!
                        </DialogContentText>
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
            </div>
        )
    }
}

export default PaletteMetaForm;