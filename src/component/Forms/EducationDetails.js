import * as React from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@mui/material";
import { setEmpData } from "../../redux/actions";
import EducationForm from './EducationForm'
class EducationDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  handleAddClick = () => {
    let education = [];
    if (Array.isArray(this.props.cur_emp.education)) {
      education = [...this.props.cur_emp.education];
    };
    education.push({});
    this.handleInput("education", education);
  }

  handleInput = (name, value) => {
    this.props.setEmpData(name, value);
  }
  render() {
    let errors = this.props.errors;
    //since errors.education will be added when validation performed
    if (errors.education === undefined) {
      errors.education = [];
    }
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
      <div><br />
        <Typography variant='h5'> Education Details</Typography>
      </div>
      {
        this.props.cur_emp.education !== undefined && this.props.cur_emp.education.map((edu, index) => <EducationForm index={index} key={index} errors={errors.education !== undefined ? errors.education[index] : undefined} edu={edu} />)
      }
      <div>
        <Button variant="contained" color='primary' onClick={this.handleAddClick} >+Add</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails)
