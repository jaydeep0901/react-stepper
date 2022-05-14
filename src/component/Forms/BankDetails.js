import * as React from "react";
import { connect } from "react-redux";
import { TextField, Typography } from "@mui/material";
import { setEmpData } from "../../redux/actions";

class BankDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  handleInput = (name, value) => {
    this.props.setEmpData(name, value);
  }
  render() {
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
        <Typography variant='h5'>Bank Details</Typography>
      </div>


      <TextField error={errors.account_number !== undefined} helperText={errors.account_number} label="Account Number" variant="standard"
        defaultValue={this.props.cur_emp.account_number ? this.props.cur_emp.account_number : ''}
        onChange={(e) => {
          this.props.setEmpData("account_number", e.target.value)
        }}
      />
      <TextField error={errors.ifsc_code !== undefined} helperText={errors.ifsc_code} label="IFSC Code" variant="standard"
        defaultValue={this.props.cur_emp.ifsc_code ? this.props.cur_emp.ifsc_code : ''}
        onChange={(e) => {
          this.props.setEmpData("ifsc_code", e.target.value)
        }}
        style={{
          marginBottom: '10px',
        }}
      />

      <TextField
        error={errors.pan_number !== undefined} helperText={errors.pan_number}
        inputProps={{
          maxLength: 10,
        }}
        onChange={(e) => {
          this.props.setEmpData("pan_number", e.target.value)
        }}
        defaultValue={this.props.cur_emp.pan_number ? this.props.cur_emp.pan_number : ''}
        label="PAN Card Number" variant="standard" />
      <TextField label="Adhaar Card Number" variant="standard"
        onChange={(e) => {
          this.props.setEmpData("aadhar_number", e.target.value)
        }}
        inputProps={{
          maxLength: 12
        }}
        defaultValue={this.props.cur_emp.aadhar_number ? this.props.cur_emp.aadhar_number : ''}
        error={errors.aadhar_number !== undefined} helperText={errors.aadhar_number}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(BankDetails)
