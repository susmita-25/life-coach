import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import '../App.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const notify = (msg) => toast.success(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;
export default function FadeMenu() {

  //Set state for differet reminder forms
    const [value, setValue] = React.useState(0);
    const [remindVal, setRemindVal] = React.useState('');
    const [remindCustomVal,setRemindCustomVal] = React.useState('');
    const [titleVal,setTitleVal] = React.useState('');
    const [startTime, setStartTime] = React.useState(0);
    const [endTime, setEndTime] = React.useState(0);
    const [eventData,setEventData ] = React.useState({
      title:'',
      remind_after:0,
      cur_date:new Date(),
      rem_date:new Date(),
      start_time:0,
      end_time:0,
      is_show:true
    })

    React.useEffect(() => {
      localStorage.clear();
      localStorage.setItem('eventArray',JSON.stringify(newEventArray))
      // Call interval after every 30 seconds to send notifications
      setInterval(() => timer(), 30000);
    }, [])
  
    //Method to send notification after evenry 30 seconds
    const timer = () => {
      let new_Arr = JSON.parse(localStorage.getItem('eventArray') === null ? [] : localStorage.getItem('eventArray'))
      if(new_Arr.length > 0){
        new_Arr.map((reminder) => {
          if(new Date().getTime() > new Date(reminder.rem_date).getTime()){
            notifyMe(reminder.title)
            reminder.rem_date = new Date(new Date().getTime()+(reminder.remind_after*60*1000));
            reminder.cur_date = new Date();
          }
        })
        localStorage.removeItem('eventArray');
        localStorage.setItem('eventArray',JSON.stringify(new_Arr));
      }
    }

    //Add motivational quotes for user to motivate work life
    const motivationalQuotesArr = [
      {
        title:'Your children get only one childhood. Make it memorable. —Regina Brett, author',
        remind_after:1,
        cur_date:new Date(),
        rem_date:new Date(new Date().getTime()+(1*60*1000)),
        start_time:0,
        end_time:0,
        is_show:false
      },
      {
        title:'The bad news is time flies. The good news is you are the pilot. —Michael Altshuler, motivational speaker and sales consultant',
        remind_after:2,
        cur_date:new Date(),
        rem_date:new Date(new Date().getTime()+(2*60*1000)),
        start_time:0,
        end_time:0,
        is_show:false
      },
      {
        title:'The key is in not spending time, but in investing it. —Stephen R. Covey, author',
        remind_after:3,
        cur_date:new Date(),
        rem_date:new Date(new Date().getTime()+(3*60*1000)),
        start_time:0,
        end_time:0,
        is_show:false
      },
      {
        title:'Children learn to smile from their parents. —Shinichi Suzuki, musician and educator',
        remind_after:4,
        cur_date:new Date(),
        rem_date:new Date(new Date().getTime()+(4*60*1000)),
        start_time:0,
        end_time:0,
        is_show:false
      }, 
]
    const [newEventArray,setNewEventArray] = React.useState(
      localStorage.getItem('eventArray') === null ? motivationalQuotesArr : JSON.parse(localStorage.getItem('eventArray')).concat(motivationalQuotesArr)
    )
    // Handle change events for reminder dropdowns
    const handleRemindValueChange = (event) => {
        setRemindVal(event.target.value);
        handleFieldChange(event)
    };

    const handleCustomRemindValueChange = (event) => {
      setRemindCustomVal(event.target.value);
      handleFieldChange(event)
    };

    const handleTitleValueChange = (event) => {
      setTitleVal(event.target.value);
      handleFieldChange(event)
  };

    const handleStartTimeChange = (event) => {
      setStartTime(event.target.value);
      handleFieldChange(event)
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    handleFieldChange(event)
};

  const handleChange = (e, newValue) => {
      resetForm();
      setValue(newValue);
    };

    const handleFieldChange = (e, newValue) => {
      setEventData( {...eventData,[e.target.name]: e.target.value} )
    };

    // Save notification form
    const handleSaveUserInfoActionEvent=(e)=>{
      if(eventData.start_time === 0){
        alert("Please select start time");
        return false;
      }
      if(eventData.end_time === 0){
        alert("Please select end time");
        return false;
      }
       let diff = eventData.end_time - eventData.start_time;
       let temp = eventData;
       let title = document.getElementById('standard-basic-usr-info').value;
       temp.remind_after = diff;
       temp.title = title;
       temp.is_show = false;
       setEventData(temp);
       handleSaveActionEvent(e);
    }

    const handleSaveActionEvent = (e) => {
      
      if(eventData.title.trim() === ""){
        alert("Please add title");
        return false;
      }
      if(eventData.remind_after === 0){
        alert("Please select remind time");
        // resetForm();
        return false;
      }
      let temp = [...newEventArray]
      let next_date = new Date(new Date().getTime()+(eventData.remind_after*60*1000));
      eventData.rem_date = next_date;
      eventData.cur_date = new Date();
      eventData.is_show = true;
      temp.push(eventData)
      // newEventArray.push(eventData)
      setNewEventArray(temp)
      localStorage.removeItem('eventArray')
      localStorage.setItem("eventArray",JSON.stringify(temp))
      resetForm();
      temp = {
        title:'',
        remind_after:0,
        cur_date:new Date(),
        rem_date:new Date(),
        is_show:true
      }
      setEventData(temp)      
    }

    //Reset form and state
    const resetForm=()=>{
      let temp = {
        title:'',
        remind_after:0,
        cur_date:new Date(),
        rem_date:new Date(),
        is_show:true
      }
      setRemindVal('');
    setRemindCustomVal('');
    setTitleVal('');
    setStartTime(0);
    setEndTime(0);
      setEventData(temp);
    }

    //delete notification from array
    const deleteForm= (e,index)=>{
     let temp = JSON.parse(localStorage.getItem('eventArray'))
     temp.splice(index,1);
     setNewEventArray(temp)
     localStorage.removeItem('eventArray')
      localStorage.setItem('eventArray',JSON.stringify(temp))
    }
    
    // Notification call
    const notifyMe = (title) => {
      let notification 
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
    
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        notification = new Notification(title.toUpperCase()+"!");
      }
    
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            notification = new Notification(title.toUpperCase()+"!");
          }
        });
      }
      return notification
      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them any more.
    }
  return (
  <div>
    <div style={{float:'right'}}>
        <Button ><Link style={{color:'white'}} to="/">Logout</Link></Button>
        </div>
  
    <div style={{backgroundColor: '#455272'}}>
      
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
        <Tab label="User Info" className='tabs' />
          <Tab label="Remainder" className='tabs' />
          <Tab label="Event" className='tabs' />
        </Tabs>
        
      </Box>
      <Grid container>
      <Grid item>
          <TabPanel value={value} index={0}>
          <Card>
          <CardHeader
        title="User Information !"
        subheader=""
        />
        <CardContent>
        <input className='w-100' id="standard-basic-usr-info" type={'hidden'} value={'Stop...! your Work is done '} name='title' label="Title" variant="standard" onChange={handleFieldChange} /><br />
      
      <FormControl variant="standard" className='w-100'>
        <InputLabel id="demo-simple-select-standard-label">Start Time</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={startTime}
          onChange={handleStartTimeChange}
          label="Start Time"
          name='start_time'
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={60}>01</MenuItem>
          <MenuItem value={120}>02</MenuItem>
          <MenuItem value={180}>03</MenuItem>
          <MenuItem value={240}>04</MenuItem>
          <MenuItem value={300}>05</MenuItem>
          <MenuItem value={360}>06</MenuItem>
          <MenuItem value={420}>07</MenuItem>
          <MenuItem value={480}>08</MenuItem>
          <MenuItem value={540}>09</MenuItem>
          <MenuItem value={600}>10</MenuItem>
          <MenuItem value={660}>11</MenuItem>
          <MenuItem value={720}>12</MenuItem>
          <MenuItem value={780}>13</MenuItem>
          <MenuItem value={840}>14</MenuItem>
          <MenuItem value={900}>15</MenuItem>
          <MenuItem value={960}>16</MenuItem>
          <MenuItem value={1020}>17</MenuItem>
          <MenuItem value={1080}>18</MenuItem>
          <MenuItem value={1140}>19</MenuItem>
          <MenuItem value={1200}>20</MenuItem>
          <MenuItem value={1260}>21</MenuItem>
          <MenuItem value={1320}>22</MenuItem>
          <MenuItem value={1380}>23</MenuItem>
          <MenuItem value={1440}>00</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" className='w-100'>
        <InputLabel id="demo-simple-select-standard-label">End Time</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={endTime}
          onChange={handleEndTimeChange}
          label="End Time After"
          name='end_time'
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={60}>01</MenuItem>
          <MenuItem value={120}>02</MenuItem>
          <MenuItem value={180}>03</MenuItem>
          <MenuItem value={240}>04</MenuItem>
          <MenuItem value={300}>05</MenuItem>
          <MenuItem value={360}>06</MenuItem>
          <MenuItem value={420}>07</MenuItem>
          <MenuItem value={480}>08</MenuItem>
          <MenuItem value={540}>09</MenuItem>
          <MenuItem value={600}>10</MenuItem>
          <MenuItem value={660}>11</MenuItem>
          <MenuItem value={720}>12</MenuItem>
          <MenuItem value={780}>13</MenuItem>
          <MenuItem value={840}>14</MenuItem>
          <MenuItem value={900}>15</MenuItem>
          <MenuItem value={960}>16</MenuItem>
          <MenuItem value={1020}>17</MenuItem>
          <MenuItem value={1080}>18</MenuItem>
          <MenuItem value={1140}>19</MenuItem>
          <MenuItem value={1200}>20</MenuItem>
          <MenuItem value={1260}>21</MenuItem>
          <MenuItem value={1320}>22</MenuItem>
          <MenuItem value={1380}>23</MenuItem>
          <MenuItem value={1440}>00</MenuItem>
        </Select>
      </FormControl>
      </CardContent>
      <CardActions disableSpacing>
      <div style={{float:'right',margin:50}}>
        <Button variant="contained" onClick={handleSaveUserInfoActionEvent}>Remind Me</Button>
        <Button style={{marginLeft:10}} onClick={resetForm} variant="contained" >Cancel</Button>
       </div>
      </CardActions>
      
      
      </Card>
      </TabPanel>
          </Grid>
          <Grid item>
          <TabPanel value={value} index={1}>
          <Card>
          <CardHeader
        title="Reminder Alert !"
        subheader="Set alert for your convenience"
        />
        <CardContent>
        <TextField className='w-100' id="standard-basic" name='title' value={titleVal} label="Title" variant="standard" onChange={handleTitleValueChange} /><br />
      
      <FormControl variant="standard" className='w-100'>
        <InputLabel id="demo-simple-select-standard-label">Remind After</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={remindCustomVal}
          onChange={handleCustomRemindValueChange}
          label="Remind After"
          name='remind_after'
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
      </CardContent>
      <CardActions disableSpacing>
      <div style={{float:'right',margin:50}}>
        <Button variant="contained" onClick={handleSaveActionEvent}>Remind Me</Button>
        <Button style={{marginLeft:10}} variant="contained" onClick={resetForm}>Cancel</Button>
       </div>
      </CardActions>
      
      
      </Card>
      </TabPanel>
          </Grid>
          <Grid item>
          <TabPanel value={value} index={2}>
          <Card>
          <CardHeader
        title="Health Alert !"
        subheader="Set alert for your health"
        />
        <CardContent>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard-custom"
          value={titleVal}
          onChange={handleTitleValueChange}
          label="title"
          name='title'
          className='w-100'
        >
          <MenuItem value="Walk Alert">Walk Alert</MenuItem>
          <MenuItem value="Drink Alert">Drink Alert</MenuItem>
          <MenuItem value="Take a Break">Take a Break</MenuItem>
          
        </Select>
      
      <FormControl variant="standard" className='w-100'>
        <InputLabel id="demo-simple-select-standard-label">Remind After</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={remindVal}
          onChange={handleRemindValueChange}
          label="Remind After"
          name='remind_after'
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
      </CardContent>
      <CardActions disableSpacing>
      <div style={{float:'right',margin:50}}>
        <Button variant="contained" onClick={handleSaveActionEvent}>Remind Me</Button>
        <Button style={{marginLeft:10}} variant="contained" onClick={resetForm}>Cancel</Button>
       </div>
      </CardActions>
      
      
      </Card>
      </TabPanel>
          </Grid>
      </Grid>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell >Title</TableCell>
            <TableCell >Reminder-After</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newEventArray.map((item,index) => (
            item.is_show && <TableRow
            key={index}
            >
            <TableCell component="th" scope="row">
            {index+1}
            </TableCell>
            <TableCell >{item.title}</TableCell>
            <TableCell >{item.remind_after}</TableCell>
            <TableCell align="right"> 
            <Button variant="contained" style={{backgroundColor:'red'}} onClick={(e) => deleteForm(e,index)}>Delete</Button> 
            </TableCell> 
          </TableRow>
          ))}
            
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
