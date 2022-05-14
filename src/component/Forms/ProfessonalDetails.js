/* eslint-disable no-cond-assign */
import * as React from "react";
import { connect } from "react-redux";
import { Chip, ListItemText, TextField, Select, Typography, FormLabel, MenuItem } from "@mui/material";
import { setEmpData } from "../../redux/actions";

class ProfessionalDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  handleFileUpload = (evt) => {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          this.handleInput("resume", e.target.result)
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  handleInput = (name, value) => {
    this.props.setEmpData(name, value);
  }
  handleSkillDelete = (skill) => {
    let skills = [...this.props.cur_emp.skills];
    let index = skills.indexOf(skill);
    skills.splice(index, 1);
    this.handleInput("skills", skills);
  }
  render() {
    let skills = ["Javascript", "HTML", "CSS", "JAVA", "PHP", "LARAVEL"];
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
        <Typography variant='h5'>Professional Details</Typography>
      </div>
      <div>
        <FormLabel>
          Resume
        </FormLabel>
      </div>
      <div>
        <input type='file' onChange={this.handleFileUpload} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{ width: '49%' }}>
          <TextField fullWidth error={errors.exp_year !== undefined} helperText={errors.exp_year} label="Years" variant="standard"
            defaultValue={this.props.cur_emp.exp_year ? this.props.cur_emp.exp_year : ''}
            inputProps={{
              type: 'number',
              min: 0,

            }}
            onChange={(e) => {
              this.props.setEmpData("exp_year", e.target.value)
            }}

          />
        </div>
        <div style={{ width: '49%' }} >
          <TextField fullWidth error={errors.exp_month !== undefined} helperText={errors.exp_month} label="Months" variant="standard"
            inputProps={{
              type: 'number',
              min: 0,
              max: 11
            }}
            defaultValue={this.props.cur_emp.exp_month ? this.props.cur_emp.exp_month : ''}
            onChange={(e) => {
              this.props.setEmpData("exp_month", e.target.value)
            }}
          />
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <FormLabel style={{ float: 'left' }} >Skills</FormLabel>
        <div>
          {
            this.props.cur_emp.skills !== undefined && this.props.cur_emp.skills.map((item, index) => <Chip key={index} clickable label={item} onDelete={() => { this.handleSkillDelete(item) }} />)
          }
        </div>
      </div>

      <Select
        variant="standard"
        renderValue={() => {
          return null
        }}
        onChange={(e) => {
          let skills = [];
          if (Array.isArray(this.props.cur_emp.skills)) {
            skills = [...this.props.cur_emp.skills];
          };
          if (!skills.includes(e.target.value)) {
            skills.push(e.target.value)
          }
          this.handleInput("skills", skills);

        }}
      >

        {skills.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      <Typography variant='caption' textAlign='left' color='red' >{errors.skills}</Typography>

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
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetails)
