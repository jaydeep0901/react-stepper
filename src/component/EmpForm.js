import * as React from "react";
import { Grid, Button, Paper } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { connect } from "react-redux";
import { addEmp, setCurEmp, setPage, setStep, updateEmp } from "../redux/actions";
import PersonalDetails from "./Forms/PersonalDetails";
import BankDetails from "./Forms/BankDetails";
import validate from "../validation";
import ProfessonalDetails from "./Forms/ProfessonalDetails";
import CurrentStatus from "./Forms/CurrentStatus";
import ExperienceDetails from "./Forms/ExperienceDetails";
import EducationDetails from "./Forms/EducationDetails";


class EmpForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errors: []
        }
    }
    getSteps = () => {
        return ['Personal Details', 'Bank Details', 'Professional Details', "Current Status", "Experience Details", "Educational Details"];
    }

    hanldeExitClick = () => {
        this.props.setStep(0);
        this.props.setPage("list");
    }
    handlePreviousClick = () => {
        if (this.props.cur_step === 0) return;
        this.props.setStep(this.props.cur_step - 1);
    }

    doValidation = () => {
        let errors = validate(this.props.cur_emp, this.props.cur_step);
        let cur_state = { ...this.state };
        cur_state.errors[this.props.cur_step - 1] = errors;
        this.setState(cur_state);
    }

    handleNextClick = () => {
        if (this.props.cur_step < this.getSteps().length) {
            this.doValidation();
            let errors = this.getErrors();
            if (errors.failed === false) {
                //move to next step
                this.props.setStep(this.props.cur_step + 1);
            }
        }
    }
    handleSubmitClick = () => {
        this.doValidation();
        let errors = this.getErrors();
        if (errors.failed === false) {
            let emp = { ...this.props.cur_emp };
            alert("thanks for joining")
            if (emp.id === 0) {
                emp.id = this.props.next_id;
                this.props.addEmp(emp);
            } else {
                this.props.updateEmp(emp)
            }
            this.props.setStep(0);
            this.props.setCurEmp({});
            this.props.setPage("list");
        }
    }

    getErrors = () => {
        let errors = this.state.errors[this.props.cur_step - 1];
        if (errors === undefined) {
            return { failed: false }
        }
        return errors;
    }
    render() {
        let errors = this.getErrors();
        const steps = this.getSteps();
        return <>
            <Paper>
                <div style={{
                    padding: '10px'
                }}>
                    <Stepper activeStep={this.props.cur_step}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {(() => {
                        switch (this.props.cur_step) {
                            case 0:
                                return <PersonalDetails errors={errors} doValidation={this.doValidation} />
                            case 1:
                                return <BankDetails errors={errors} doValidation={this.doValidation} />
                            case 2:
                                return <ProfessonalDetails errors={errors} doValidation={this.doValidation} />
                            case 3:
                                return <CurrentStatus errors={errors} doValidation={this.doValidation} />
                            case 4:
                                return <ExperienceDetails errors={errors} doValidation={this.doValidation} />
                            case 5:
                                return <EducationDetails errors={errors} doValidation={this.doValidation} />
                            default:
                                return <h1>invalid step : {this.props.cur_step}</h1>
                        }
                    })()
                    }
                    <Grid container>
                        <Grid item md col='2'>
                            <Button disabled={this.props.cur_emp.id === 0} variant="contained" color='error' >Remove</Button>
                        </Grid>
                        <Grid item md col='8' style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button variant="outlined" disabled={this.props.cur_step === 0} onClick={this.handlePreviousClick} > Previous </Button>
                            <Button variant="outlined" color='error' onClick={this.hanldeExitClick}  > Exit </Button>
                            <Button variant="contained" disabled={this.props.cur_step + 1 >= steps.length} onClick={this.handleNextClick} > Next </Button>
                        </Grid>
                        <Grid item md col='2'>
                            <Button disabled={this.props.cur_step + 1 < steps.length} variant="contained" onClick={this.handleSubmitClick} style={{ float: 'right' }} >Submit</Button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    }
}


function mapStateToProps(state) {
    let next_id = 0;
    if (state.employees.length > 0) {
        next_id = state.employees[state.employees.length - 1].id;
    }
    next_id++;

    return {
        next_id: next_id,
        cur_step: state.cur_step,
        cur_emp: state.selected_employee
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setPage: (page) => { return dispatch(setPage(page)); },
        setStep: (step) => { return dispatch(setStep(step)); },
        setCurEmp: (emp) => { return dispatch(setCurEmp(emp)); },
        addEmp: (emp) => { return dispatch(addEmp(emp)) },
        updateEmp: (emp) => { return dispatch(updateEmp(emp)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmpForm);