import * as React from "react";
import { connect } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";

class EducationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  handleRemoveClcik = () => {
    let education = [...this.props.cur_emp.education];
    education.splice(this.props.index, 1);
    this.props.setEmpData("education", education);
  }
  handleInput = (name, value) => {
    let education = [...this.props.cur_emp.education]
    let cur_exp = { ...education[this.props.index] };
    cur_exp[name] = value;
    education[this.props.index] = cur_exp;
    this.props.setEmpData("education", education)
  }
  render() {
    let errors = this.props.errors;
    if (errors === undefined) {
      errors = {};
    }
    return <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        padding: '10px',
        textAlign: 'center',
        border: '1px solid lightgray',
        marginTop: '10px'
      }}
    >

      <TextField error={errors.course_name !== undefined} helperText={errors.course_name} label="Course" variant="standard"
        defaultValue={this.props.edu.course_name ? this.props.edu.course_name : ''}
        onChange={(e) => {
          this.handleInput("course_name", e.target.value)
        }}
      />
      <TextField error={errors.university_name !== undefined} helperText={errors.university_name} label="University Name" variant="standard"
        defaultValue={this.props.edu.university_name ? this.props.edu.university_name : ''}
        onChange={(e) => {
          this.handleInput("university_name", e.target.value)
        }}
        style={{
          marginBottom: '10px',
        }}
      />


      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <MobileDatePicker
          label="Passed on"
          value={this.props.edu.last_date ? this.props.edu.last_date : new Date()}
          onChange={(newValue) => {
            this.handleInput("last_date", newValue)
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
      <TextField label="Grade" variant="standard"
        onChange={(e) => {
          this.handleInput("grade", e.target.value)
        }}
        defaultValue={this.props.edu.grade ? this.props.edu.grade : ''}
        error={errors.grade !== undefined} helperText={errors.grade}
      />
      <div style={{ display: 'flex', padding: '10px' }}>
        <Button variant="contained" color='secondary' onClick={this.handleRemoveClcik}>Remove</Button>
      </div>
    </div>
  }
}
function mapStateToProps(state) {
  return {
    cur_emp: state.selected_employee,
    cur_step: state.cur_step
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEmpData: (name, value) => dispatch(setEmpData(name, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EducationForm)
