import React from 'react';
import Grid from '@mui/material/Grid';
import './App.css';
import { Button, Card, CardMedia, Divider, TextField } from '@mui/material';
import { FaAddressBook } from "react-icons/fa";
import logo from './logo1.png';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [user,setUserData] = React.useState({
      username:'',
      password:''
  })
  const handleChange =(e)=>{
    setUserData( {...user,[e.target.name]: e.target.value} )
  }
  const login =()=>{
      if(user.username === 'admin' && user.password === 'admin'){
        navigate("/FadeMenu")
      }else{
          alert("Wrong credentials")
      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
      <Card style={{backgroundColor:'white'}}>
      <CardMedia
        component="img"
        className='image-logo'
        image={logo}
        alt="green iguana"
      />
      <div style={{margin:'30px'}}><FaAddressBook /><span>Login user</span></div>
      <Divider />
      <div>
      <TextField
          id="email"
          label="Email"
          multiline
          maxRows={4}
          value={user.username}
          onChange={handleChange}
          variant="filled"
          style={{width:'75%',margin: '10px'}}
          name='username'
        />
         <TextField
          id="password"
          label="Password"
          type="password"
          value={user.password}
          onChange={handleChange}
          variant="filled"
          style={{width:'75%',margin: '10px'}}
          name='password'
        />
        </div>
        <Divider />
        <Button variant="contained" color="success" style={{margin: '10px',float:'right'}} onClick={login}>Login</Button>
      </Card>
      </Grid>
      <Grid item xs={4}></Grid>
      </Grid>
      </header>
    </div>
  );
}

export default Login;
