import * as React from "react";
import { connect } from "react-redux";
import { Grid,Button, TextField,Paper, Typography, FormLabel } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";
import validate from "../../validation";

class ExperienceFrom extends React.Component{
  constructor(props){
    super(props)
    this.state={};
  }
  handleRemoveClcik=()=>{
    let experience=[...this.props.cur_emp.experience] ;
    experience.splice(this.props.index,1);
    this.props.setEmpData("experience",experience);       
  }
  handleInput=(name,value)=>{
    let experience=[...this.props.cur_emp.experience]
    let cur_exp={...experience[this.props.index]};
    cur_exp[name] = value;
    experience[this.props.index]=cur_exp;
    this.props.setEmpData("experience",experience)
  }
  render(){
        let errors = this.props.errors;
        if(errors==undefined){
          errors={};
        }
        return <div 
        style={{
display: 'flex',
justifyContent: 'center',
alignContent: 'center',
flexDirection: 'column',
padding: '10px',
textAlign: 'center',
border:'1px solid lightgray',
marginTop:'10px'
        }}
        >

                    <TextField error={errors.company_name!==undefined} helperText={errors.company_name} label="Company" variant="standard"
                    defaultValue={this.props.exp.company_name?this.props.exp.company_name:''}
                    onChange={(e)=>{
                            this.handleInput("company_name",e.target.value)
                    }}
                    />
                    <TextField error={errors.designation!==undefined} helperText={errors.designation}  label="Designation" variant="standard" 
                    defaultValue={this.props.exp.designation?this.props.exp.designation:''}
                    onChange={(e)=>{
                        this.handleInput("designation",e.target.value)
                    }}
                    style={{
                        marginBottom:'10px',
                    }}
                    />
                          
                    <TextField  
                     error={errors.department!==undefined} helperText={errors.department}
                     onChange={(e)=>{
                        this.handleInput("department",e.target.value)
                    }}
                     defaultValue={this.props.exp.department?this.props.exp.department:''}
                    label="Department" variant="standard" />

                    <TextField  label="CTC" variant="standard"
                        onChange={(e)=>{
                            this.handleInput("ctc",e.target.value)
                        }}
                     defaultValue={this.props.exp.ctc?this.props.exp.ctc:''}
                    error={errors.ctc!==undefined} helperText={errors.ctc}
                    />
                     <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="From"
                            value={this.props.exp.join_date?this.props.exp.join_date:new Date()}
                            onChange={(newValue) => {
                                this.handleInput("join_date",newValue)
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
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="To"
                            value={this.props.exp.last_date?this.props.exp.last_date:new Date()}
                            onChange={(newValue) => {
                                this.handleInput("last_date",newValue)
                            }}
                            renderInput={(params) => {
                                return <>
                                <TextField 
                                // helperText={errors.last_date}
                                variant="standard"  {...params} />
                                <Typography align="left" color={'red'} variant='caption' >{errors.last_date}</Typography>
                                </>
                            }
                            
                            }
                            />
                    </LocalizationProvider>
                    <div style={{display:'flex',padding:'10px'}}>
                      <Button variant="contained" color='secondary' onClick={this.handleRemoveClcik}>Remove</Button>
                    </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(ExperienceFrom)
