import React , {Component }from 'react';
import Grid from '@material-ui/core/Grid';
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
import { BrowserR  as R , Route, Link, Switch, withRouter } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

const ITEM_HEIGHT = 48;
const options = [
	'Charts',
	'prediction',];
const href_dir = [
	"/LeftMenu",
	"/MainWebset"
];

const sex = [
  {
    value: '1',
    label: 'male',
  },
  {
    value: '0',
    label: 'female',
  },
  ];

  const restingelectrocardiographicresults=[
  {
    value: '0',
    label: 'normal',
  },
  {
    value: '1',
    label: 'ST-T wave abnormality',
  },
  {
  	value: '2',
    label: 'showing probable or definite left ventricular hypertrophy',
  },
  ];

  const thalassemia=[
  	{
    value: '3',
    label: 'normal',
  },
  {
    value: '6',
    label: 'fixed defect',
  },
  {
  	value: '7',
    label: 'reversable defect',
  },
  ];

 const chestpaintype = [
  {
    value: '1',
    label: 'typical angin',
  },
  {
    value: '2',
    label: 'atypical angina',
  },
  {
  	value: '3',
    label: 'non-anginal pain',
  },
  {
  	value: '4',
    label: 'asymptomatic',
  },
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
    marginLeft: theme.spacing.unit*10,
    padding: theme.spacing.unit * 2,
    height: 90,
    width: 400,
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
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container:{
		display:'flex',
		flexWrap:'wrap',
	},
  textField: {
  		width : '40%',
  		height:90,
    	marginLeft: theme.spacing.unit*10,
    	marginRight: theme.spacing.unit*2,
  },
  menu:{
  	width: 200,
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


class MainWebset extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit=this.handleSubmit.bind(this); 
    fetch('http://localhost:5000/weight', { 
        method: 'GET',
        mode:'cors'
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        this.setState({weight_age : data['age']});
        this.setState({weight_thal : data['thal']});
        this.setState({weight_pain_type : data['chest pain type']});
        this.setState({weight_serum : data['serum cholestoral']});
        this.setState({weight_oldpeak : data['oldpeak']});
        this.setState({weight_vessel : data['number of major vessels']});
        this.setState({weight_max : data['maximum heart rate']});
        this.setState({weight_rbp : data['resting blood pressure']});
        this.setState({weight_sex : data['sex']});
        this.setState({weight_rer : data['resting electrocardiographic results']});
        this.setState({weight_eia : data['exercise induced angina']});
        this.setState({weight_slope : data['the slope of ST']});
        this.setState({weight_fbs : data['fasting blood sugar']});
        
    }
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var formData = new FormData();
    formData.append('age', this.state.age);
    formData.append('sex', this.state.sex);
    formData.append('pain_type', this.state.chestpaintype);
    formData.append('resting_blood_pressure', this.state.restingbloodpressure);
    formData.append('serum_cholestorable', this.state.serumcholestoral);
    formData.append('fasting_blood_pressure', this.state.fastingbloodpressure);
    formData.append('resting_elec_results', this.state.restingelectrocardiographicresults);
    formData.append('max_heart_rate', this.state.maximumheartrate);
    formData.append('exercise_induced_angina', this.state.exerciseinducedangina);
    formData.append('oldpeak', this.state.oldpeak);
    formData.append('slope', this.state.slope);
    formData.append('no_of_major_vessels', this.state.numberofmajorvessels);
    formData.append('thalassemia', this.state.thalassemia);
    let initHeaders = new Headers()
    initHeaders.append('Accept', 'application/json, text/plain, */*')
    initHeaders.append('Cache-Control', 'no-cache')
    initHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    console.log(formData);
    fetch('http://localhost:5000/test', { 
        method: 'POST',
        //mode:'cors',
        hearders: initHeaders,
        body: formData
    }).then(response => response.json())
    .then(data => {
        this.props.history.push({pathname:'/show_result',state:{ text : data.text}});
       // this.context.router.push({pathname:'/show_result',state:{img_path : data.img_path, text : data.text}});   '../../../../4.14/ASS3-master/112.png'
    }
    );
  }

  state = {
    spacing: '16',
    anchorEl: null,
    age: '',
    multiline: 'Controlled',
    sex: '',
    chestpaintype:'',
    serumcholestoral:'',
    restingbloodpressure:'',
    restingelectrocardiographicresults:'',
    maximumheartrate:'',
    exerciseinducedangina:'',
    oldpeak:'',
    slope:'',
    numberofmajorvessels:'',
    thalassemia:'',
    fastingbloodpressure:'',
    weight_age : '',
    weight_thal : '',
    weight_pain_type : '',
    weight_serum : '',
    weight_oldpeak : '',
    weight_vessel : '',
    weight_max : '',
    weight_rbp : '',
    weight_sex : '',
    weight_rer : '',
    weight_eia : '',
    weight_slope : '',
    weight_fbs : ''
  };
  handleChange_new = name => event => {
    this.setState({
      [name]: event.target.value,
    });};

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
        Heart Disease Protection
      </Typography>
      <Grid container className={classes.root} spacing={24} justify="center" alignItems='center' wrap="wrap" alignContent='center'>
      	<Grid item className = {classes.root} xs={12} justify="center" alignItems="center"  wrap="wrap" alignContent='center'>
	  	<Paper className={classes.paper} elevation={24} alignItems='center'>
	  		<Typography variant="h5" component="h3" align="center">
          		Please fill in the specific information.
      		</Typography>
	 		<List component="nav" >
	  			<TextField
						id = "outline-age"
						label ={'Age (Weight:' + this.state.weight_age + ')'}
						className={classes.textField}
						value={this.state.age}
						onChange={this.handleChange_new('age')}
						margin="normal"
						variant="outlined"
					/>
	  		
	  			<TextField
            id="outlined-select-sex-native"
          	select
          	label={'Sex (Weight:' + this.state.weight_sex + ')'}
          	className={classes.textField}
          	value={this.state.sex}
          	onChange={this.handleChange_new('sex')}
          	SelectProps={{
            	MenuProps: {
              	className: classes.menu,
            	},
          	}}
          	helperText="1 = male, 0 = female"
          	margin="normal"
          	variant="outlined"
        	>
        			{sex.map(option => (
            		<option key={option.value} value={option.value}>
              		{option.label}
            		</option>
          			))}
          		</TextField>
          	</List>

	  		<List component="nav">
	  				<TextField
          				id="outlined-select-chestpain-native"
          				select
          				label={'Chest Pain Type (Weight:' + this.state.weight_pain_type + ')'}
          				className={classes.textField}
          				value={this.state.chestpaintype}
          				onChange={this.handleChange_new('chestpaintype')}
          				SelectProps={{
            				MenuProps: {
              				className: classes.menu,
            				},
          				}}
          				helperText="1=typical angin,2=atypical angina,3=non-anginal pain,4=asymptomatic"
          				margin="normal"
          				variant="outlined"
        			>
        			{chestpaintype.map(option => (
            		<option key={option.value} value={option.value}>
              		{option.label}
            		</option>
          			))}
          		</TextField>
	 		
	            <TextField
					id = "outline-restingbloodpressure"
					label ={'Resting Blood Pressure (Weight :' + this.state.weight_rbp + ')'}
					className={classes.textField}
					value={this.state.restingbloodpressure}
					onChange={this.handleChange_new('restingbloodpressure')}
					margin="normal"
					variant="outlined"
				/>
			</List>

			<List component="nav">	  	
	  			<TextField
					id = "outline-serumcholestoral"
					label ={'Serum Cholestoral (Weight :' + this.state.weight_serum + ')'}
					className={classes.textField}
					value={this.state.serumcholestoral}
					onChange={this.handleChange_new('serumcholestoral')}
					margin="normal"
					variant="outlined"
					helperText="mg/dl"
				/>
	  		
	  			<TextField
					id = "outline-fastingbloodpressure"
					label ={'Fasting Blood Pressure (Weight :' + this.state.weight_fbs + ')'}
					className={classes.textField}
					value={this.state.fastingbloodpressure}
					onChange={this.handleChange_new('fastingbloodpressure')}
					margin="normal"
					variant="outlined"
					helperText="> 120 mg/dl"
				/>
	  		</List>

	  		<List component="nav">
	  				<TextField
          				id="outlined-select-restingelectrocardiographicresults-native"
          				select
                  label ={'Resting Electrocardiographic Results (Weight :' + this.state.weight_rer + ')'}
          				className={classes.textField}
          				value={this.state.restingelectrocardiographicresults}
          				onChange={this.handleChange_new('restingelectrocardiographicresults')}
          				SelectProps={{
            				MenuProps: {
              				className: classes.menu,
            				},
          				}}
          				helperText="(0=normal,1=ST-T wave abnormality,2=showing probable or definite leftventricular hypertrophy by Estes’ criteria"
          				margin="normal"
          				variant="outlined"
        			>
        			{restingelectrocardiographicresults.map(option => (
            		<option key={option.value} value={option.value}>
              		{option.label}
            		</option>
          			))}
          		</TextField>
	  		
	  			<TextField
					id = "maximumheartrate"
          label ={'Maximum Heart Rate(Weight :' + this.state.weight_max + ')'}
					className={classes.textField}
					value={this.state.maximumheartrate}
					onChange={this.handleChange_new('maximumheartrate')}
					margin="normal"
					variant="outlined"
				/>
	  		</List>

	  		<List component="nav">
	  			<TextField
					id = "exerciseinducedangina"
          label ={'Exercise Induced Angina (Weight :' + this.state.weight_eia + ')'}
					className={classes.textField}
					value={this.state.exerciseinducedangina}
					onChange={this.handleChange_new('exerciseinducedangina')}
					margin="normal"
					variant="outlined"
				/>	
	  		
	  			<TextField
					id = "oldpeak"
          label ={'Oldpeak (Weight :' + this.state.weight_oldpeak + ')'}
					className={classes.textField}
					value={this.state.oldpeak}
					onChange={this.handleChange_new('oldpeak')}
					margin="normal"
					variant="outlined"
					helperText="ST depression induced by exercise relative to rest"
				/>	
	  		</List>

	  		<List component="nav">
	  			<TextField
						id = "slope"
            label ={'Slope (Weight :' + this.state.weight_slope + ')'}
						className={classes.textField}
						value={this.state.slope}
						onChange={this.handleChange_new('slope')}
						margin="normal"
						variant="outlined"
						helperText="the slope of the peak exercise ST segment"
				/>	
	  		
	  			<TextField
					id = "numberofmajorvessels"
          label ={'Number of Major Vessels (Weight :' + this.state.weight_vessel + ')'}
					className={classes.textField}
					value={this.state.numberofmajorvessels}
					onChange={this.handleChange_new('numberofmajorvessels')}
					margin="normal"
					variant="outlined"
					helperText="number of major vessels (0-3) colored by flourosopy"
				/>
	  		</List>

	 		<List component="nav">
	  			<TextField
          				id="thalassemia"
          				select
                  label ={'Thalassmia (Weight :' + this.state.weight_thal + ')'}
          				className={classes.textField}
          				value={this.state.thalassemia}
          				onChange={this.handleChange_new('thalassemia')}
          				SelectProps={{
            				MenuProps: {
              				className: classes.menu,
            				},
          				}}
          				helperText="3 = normal, 6 = fixed defect, 7 = reversable defect"
          				margin="normal"
          				variant="outlined"
        			>
        			{thalassemia.map(option => (
            		<option key={option.value} value={option.value}>
              		{option.label}
            		</option>
          			))}
          		</TextField>
          	</List>	
	  		<List component="nav">
				<Button variant="contained" color="primary" className={classes.button_1} component={Link} onClick={this.onSubmit} to="/show_result">
        		Submit and Get the prediction Result
      	</Button>
    		</List>
    	</Paper>
    	</Grid>
    </Grid>
	</div>

    );
  }
}




export default withStyles(styles)(MainWebset);