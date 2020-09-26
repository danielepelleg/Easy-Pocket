import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
//const orange = '#FF9500';
const red = "#E8310C";
const fireRed = "#FF0500";
const pink = "#F50069";
const orange = "#FF5000";
const yellow = "#FFE781";

export default {
  black,
  white,
  default: {
    light: yellow,
    orange: orange,
    main: red,
    red: fireRed,
    dark: pink,
  },
  primary: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[500],
    light: colors.orange[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    title: "#F95700",
    error: 'red',
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
