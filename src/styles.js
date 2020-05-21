/**
 * Customized Style
 */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
  },


  textBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    //background: "linear-gradient(45deg, #ff5900 20%, #FF8E53 90%)",
    backgroundColor: "rgba(232, 49, 12, .75)",
    boxShadow: '0 2px 3px 0 rgba(255, 255, 255, .4)',
    borderRadius: 12,
    width: "70%",
    padding: '0 30px 30px',
    textAlign: "center",
  },


  logoBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "90vh"
  },


  logo: {
      height: 400,
      width: 400,
  },


  container: {
  },


  startButton: {
    border: 0,
    borderRadius: 12,
    boxShadow: '0 1px 1px 1px rgba(255, 255, 255, .4)',
    color: 'white',
    height: 40,
    width: 170,
    padding: '0 30px',
    alignSelf: "center",
    background: "linear-gradient(45deg, #ff8e53 30%, #ffb00d 90%)",
    backgroundColor: "#FFB00D",
    marginTop: 30,
  },
  
}));

export { useStyles };