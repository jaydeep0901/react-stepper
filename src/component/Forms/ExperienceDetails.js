import * as React from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@mui/material";
import { setEmpData } from "../../redux/actions";
import ExperienceFrom from './ExperienceForm'
class ExperienceDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  handleAddClick = () => {
    let experience = [];
    if (Array.isArray(this.props.cur_emp.experience)) {
      experience = [...this.props.cur_emp.experience];
    };
    experience.push({});
    this.handleInput("experience", experience);
  }

  handleInput = (name, value) => {
    this.props.setEmpData(name, value);
  }
  render() {
    let errors = this.props.errors;
    //since errors.experience will be added when validation performed
    if (errors.experience === undefined) {
      errors.experience = [];
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
        <Typography variant='h5'> Experience Details</Typography>
      </div>
      {
        this.props.cur_emp.experience !== undefined && this.props.cur_emp.experience.map((exp, index) => <ExperienceFrom key={index} index={index} errors={errors.experience[index]} exp={exp} />)
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
export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDetails)
