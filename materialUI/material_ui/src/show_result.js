import React , {Component }from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import {withR } from 'react-router-dom';
import { BrowserR  as R , Route, Link, Switch } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import img_test from './112.png';

const ITEM_HEIGHT = 48;
const styles = theme => ({
  root: {
    flexGrow: 1,
    width:'100%',
    //maxWidth: 1000,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  control: {
    padding: theme.spacing.unit * 2,
    direction: 'column',
  },
  button_1: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    height: 48,
    width: 100,
  },
   button_2: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    height: 48,
    width: 100,
  },
  input: {
    display: 'none',
  },
  gridList: {
    overflow: 'hidden',
    width:'90%',
    alignItems: 'center',
    marginLeft: theme.spacing.unit*10,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper:{
    ...theme.mixins.gutters(),
    overflow: 'hidden',
    width:'85%',
    alignItems: 'center',
    paddingTop:theme.spacing.unit*5,
    paddingBottom: theme.spacing.unit*5,
  },
});
class show_result extends React.Component {

  state = {
    spacing: '16',
    anchorEl: null,
    text:'',
    img: ''
  };
  constructor(props) {
    super(props);
    this.state.text = this.props.location.state.text;
    //this.state.img = this.props.location.state.img;
  }
 handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    //this.props.history.push("/MainWebSet");
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (

    <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-haspopup="true" aria-owns={open ? 'long-menu' : undefined} 
              className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={this.handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                },
             }}>
             <Link to="/LeftMenu">
             < MenuItem   onClick={this.handleClose}>
              Charts
             </MenuItem>
             </Link>
             <Link to="/MainWebset" >
             < MenuItem  onClick={this.handleClose}  >
             Prediction
             </MenuItem>
             </Link>

             
              </Menu>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
     <Typography component="h2" variant="h1" align="center" gutterBottom>
        Here is the prediction result. 
        </Typography>
      <Grid container >
        <Grid container justify='center' styl={{display: "inline"}}>

              <GridList cellHeight={100} className={classes.gridList} alignItems='center' >
                 <GridListTile key = "Subheader" cols={3} style={{height:'auto'}}>
                  <ListSubheader component="h1" variant="h1">Analytics Result</ListSubheader>
            </GridListTile>

              <GridListTile cols={2} style={{height:400,width:500,margin:'500xp', display:'inline'}}>
                <img src={img_test} />
          </GridListTile>
        ))}
          </GridList>
       
        </Grid>
        <Grid container justify='center'>
        <p><b>The result is: </b><br /> {this.state.text}</p>
        </Grid>
      </Grid>


     </div>

    );
  }
}




export default withStyles(styles)(show_result);
//export default withR (GuttersGrid);