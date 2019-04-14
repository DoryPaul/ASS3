import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {tileData}  from './tileData';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withR } from 'react-router-dom';
import { BrowserR  as R , Router, Link, Switch } from "react-router-dom";
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const ITEM_HEIGHT = 48;
const href_dir = [
	"/LeftMenu",
	"/MainWebset"
];

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
  	width:'90%',
  	alignItems: 'center',
  	paddingTop:theme.spacing.unit*5,
  	paddingBottom: theme.spacing.unit*5,
  },
  dialogPaper: {
    height: '80%',
    width: '80%',
  },
});


class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
    anchorEl: null,
    preview:'',
    open:false
  };

  constructor(props) {
    super(props);
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
  handleDialogClickOpen = ( img_path, event) => {
    this.setState({ open: true });
    this.setState({preview: img_path})
  };

  handleDialogClose = () => {
    this.setState({ open: false });
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
            <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
          fullWidth="150%"
        >
          <DialogTitle id="form-dialog-title">Preview</DialogTitle>
          <DialogContent>
            <DialogContentText>
                <img src={this.state.preview} width="100%"/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
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
        Statistical Analysis 
      </Typography>
	   <Grid container className={classes.root} spacing={24} justify="center" alignItems='center' wrap="wrap" alignContent='center'>
      	<Grid item className = {classes.root} xs={12} justify="center" alignItems="center"  wrap="wrap" alignContent='center'>
	  	    <Paper className={classes.paper} elevation={24} alignItems='center'>
      		  <Grid container className={classes.root} spacing={0} alignItems='center'>
              <GridList cellHeight={100} className={classes.gridList} alignItems='center' >
          	     <GridListTile key = "Subheader" cols={3} style={{height:'auto'}}>
          		    <ListSubheader component="h1" variant="h1">Statistical Analysis Charts</ListSubheader>
          	</GridListTile>
          	 {tileData.map(tile => (
              <GridListTile   key={tile.img} cols={2} style={{height:300,width:320,margin:'10xp'}}>
                <img src={tile.img} alt={tile.title}/>
              <GridListTileBar
                title={tile.title}
                // subtitle={<span>by: {tile.weight}</span>}
                actionIcon={
                  <IconButton className={classes.icon}  onClick={this.handleDialogClickOpen.bind(this, tile.img)}>
                    <InfoIcon />
                  </IconButton>
              }
            />
          </GridListTile>
        ))}
          </GridList>
       
      </Grid>
      </Paper>
      </Grid>
      </Grid>
	    </div>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(GuttersGrid);
//export default withR (GuttersGrid);