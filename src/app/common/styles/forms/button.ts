import { Shadows } from './../shadows';
import { Colors } from './../colors';
import { Gardients } from './../gardients';
import { style, classes } from 'typestyle';

const reset = {
  height: '2rem',
  border: 'none',
  outline: 'none',
  padding: '0.5rem'
};

export const buttonStyle = style(
  { ...reset, ...{
  background: Gardients.getGardient(Colors.primary, Colors.primaryDark),
  color: Colors.white,
  border: 'none',
  } 
});

export const inputStyle = style({...reset});

const hoverStyle = style({
  boxShadow: Shadows.level2,
  transition: 'cubic - bezier(0.4, 0.0, 0.6, 1)',
  $nest: {
    '&:hover': {
      boxShadow: Shadows.level4,
    }
  }
});

export const hoverButton = classes(hoverStyle, buttonStyle);