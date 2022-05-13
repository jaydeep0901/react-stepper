import * as React from "react";
import { connect } from "react-redux";
import { Grid,Button, TextField,Paper, Typography, FormLabel } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";
import validate from "../../validation";

class CurrentStatus extends React.Component{
  constructor(props){
    super(props)
    this.state={};
  }

  handleInput=(name,value)=>{
    this.props.setEmpData(name,value);
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
                        <Typography variant='h5'>Current Status</Typography>
                    </div>
                    <TextField error={errors.company_name!==undefined} helperText={errors.company_name} label="Company" variant="standard"
                    defaultValue={this.props.cur_emp.company_name?this.props.cur_emp.company_name:''}
                    onChange={(e)=>{
                            this.props.setEmpData("company_name",e.target.value)
                    }}
                    />
                    <TextField error={errors.designation!==undefined} helperText={errors.designation}  label="Designation" variant="standard" 
                    defaultValue={this.props.cur_emp.designation?this.props.cur_emp.designation:''}
                    onChange={(e)=>{
                        this.props.setEmpData("designation",e.target.value)
                    }}
                    style={{
                        marginBottom:'10px',
                    }}
                    />
                          
                    <TextField  
                     error={errors.department!==undefined} helperText={errors.department}
                     onChange={(e)=>{
                        this.props.setEmpData("department",e.target.value)
                    }}
                     defaultValue={this.props.cur_emp.department?this.props.cur_emp.department:''}
                    label="Department" variant="standard" />

                    <TextField  label="CTC" variant="standard"
                        onChange={(e)=>{
                            this.props.setEmpData("ctc",e.target.value)
                        }}
                     defaultValue={this.props.cur_emp.ctc?this.props.cur_emp.ctc:''}
                    error={errors.ctc!==undefined} helperText={errors.ctc}
                    />
                     <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="Working from"
                            value={this.props.cur_emp.join_date?this.props.cur_emp.join_date:new Date()}
                            onChange={(newValue) => {
                                this.props.setEmpData("join_date",newValue)
                            }}
                            renderInput={(params) => {
                                return <>
                                <TextField 
                                // helperText={errors.join_date}
                                variant="standard"  {...params} />
                                <Typography align="left" color={'red'} variant='caption' >{errors.join_date}</Typography>
                                </>
                            }
                            
                            }
                            />
                    </LocalizationProvider>
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
export default connect(mapStateToProps,mapDispatchToProps)(CurrentStatus)
