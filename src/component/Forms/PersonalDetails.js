import * as React from "react";
import { connect } from "react-redux";
import { Grid,Button, TextField,Paper, Typography, FormLabel } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";
import validate from "../../validation";

class PersonalDetails extends React.Component{
  constructor(props){
    super(props)
    this.state={};
  }

  handleInput=(name,value)=>{
    this.props.setEmpData(name,value);
  }


  handleFileUpload=(evt)=>{
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = ((theFile)=>{
          return (e)=> {
              this.handleInput("photo",e.target.result)
          };
        })(f);
        reader.readAsDataURL(f);
      }
  }
  render(){
        let errors = this.props.errors;
        return <div 
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            padding: '10px',
            textAlign: 'center'
        }}
        >
                    <div>
                        <Typography variant='h5'>Personal Details</Typography>
                    </div>
                    <div>
                        <FormLabel>
                            Profile picture
                        </FormLabel>
                    </div>
                    <div>
                        <input type='file' onChange={this.handleFileUpload} />
                        <img  width='200' src={this.props.cur_emp.photo==undefined?'/images/avatar.jpg':this.props.cur_emp.photo} />
                    </div>

                    <TextField error={errors.first_name!==undefined} helperText={errors.first_name} label="First Name" variant="standard"
                    defaultValue={this.props.cur_emp.first_name?this.props.cur_emp.first_name:''}
                    onChange={(e)=>{
                            this.handleInput("first_name",e.target.value)
                    }}
                    />
                    <TextField error={errors.last_name!==undefined} helperText={errors.last_name}  label="Last Name" variant="standard" 
                    defaultValue={this.props.cur_emp.last_name?this.props.cur_emp.last_name:''}
                    onChange={(e)=>{
                      this.handleInput("last_name",e.target.value)
                    }}
                    style={{
                        marginBottom:'10px',
                    }}
                    />
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="Date of Birth"
                            value={this.props.cur_emp.date_of_birth?this.props.cur_emp.date_of_birth:new Date()}
                            onChange={(newValue) => {
                              this.handleInput("date_of_birth",newValue)
                            // setValue(newValue);
                            }}
                            renderInput={(params) => {
                                return <>
                                <TextField 
                                // helperText={errors.date_of_birth}
                                variant="standard"  {...params} />
                                <Typography align="left" color={'red'} variant='caption' >{errors.date_of_birth}</Typography>
                                </>
                            }
                            
                            }
                            />
                            </LocalizationProvider>
                    <TextField  
                     error={errors.phone!==undefined} helperText={errors.phone}
                     inputProps={{
                        maxLength: 10,
                      }}
                     onChange={(e)=>{
                      this.handleInput("phone",e.target.value)
                    }}
                     defaultValue={this.props.cur_emp.phone?this.props.cur_emp.phone:''}
                    label="Phone" variant="standard" />
                    <TextField  label="Email" variant="standard"
                        onChange={(e)=>{
                          this.handleInput("email",e.target.value)
                        }}
                     defaultValue={this.props.cur_emp.email?this.props.cur_emp.email:''}
                    error={errors.email!==undefined} helperText={errors.email}
                    />
               </div>
  }
}
function mapStateToProps(state){
  return {
      cur_emp:state.selected_employee,
      cur_step : state.cur_step
  };
}
function mapDispatchToProps(dispatch){
  return {
      setEmpData:(name,value)=>dispatch(setEmpData(name,value)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersonalDetails)
