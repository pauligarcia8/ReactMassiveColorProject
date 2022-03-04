// ESTE COMPONENTE SE ACTUALIZO UTILIZANDO HOOKS YA QUE EL DRAWER DE MATERIAL UI CAMBIO MUCHO DESDE QUE LO UTILIZO COLT STEELE CUANDO HIZO EL CURSO.

// import * as React from 'react';
import React, { useState, useEffect } from "react";
import DraggableColorBox from "./DraggableColorBox";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChromePicker } from 'react-color';
import { Button, toggleButtonClasses } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function NewPaletteForm(props) {  
  const [currentColor, setCurrentColor] = useState('teal'); // Hook creado para manejar el color del color picker y el boton
  const [colors, setColors] = useState([]);

  const listColors = colors.map((color) => 
  <DraggableColorBox color={color.color} name={color.name}/>
  );

  const [newName, setNewName] = useState("");
  //Material UI methods
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return colors.every(
        ({ color }) => color !== currentColor
      );
    });
  });
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateNewColor = (newColor) => {
    console.log(newColor.hex);
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor, 
      name: newName
    };
    setColors([...colors, newColor])
    console.log(colors)
  };
  const handleChange = (evt) => {
    setNewName(evt.target.value)
    console.log(newName)
  };
  
  const handleSubmit = () => {
    const newPalette = {
      paletteName: 'New Teste Palette', 
      colors: colors
    };
    props.savePalette(newPalette);
    props.history.push("/");
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
      position="fixed" 
      open={open} 
      color='default'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
          variant="h6" 
          noWrap component="div">
            Persistent drawer
          </Typography>
          <Button 
          variant='contained' 
          color='primary' 
          onClick={handleSubmit}>Save Palette</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        containerStyle={{height: 'calc(100% - 64px)', top: 64}}
      >
        <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>
            Design Your Palette
        </Typography>
        <div>
            <Button variant='contained' color='secondary'>Create Palette</Button>
            <Button variant='contained' color='primary'>Random Color</Button>
        </div>
          <ChromePicker color={currentColor} onChangeComplete={updateNewColor}/>
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator 
            value={newName} 
            onChange={handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name must be unique', 'Color is already used']}
            />
          <Button 
          variant='contained' 
          type="submit"
          style={{backgroundColor: currentColor}}
          >Add Color</Button>
          </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ul>{listColors}</ul>
      </Main>
    </Box>
  );
}