import { Grid, Button, TextField, Paper, Typography } from "@mui/material";
import * as React from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { removeEmp, setCurEmp, setPage, setStep } from "../redux/actions";

class EmpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: ''
        }
    }

    showForm = (emp) => {
        this.props.setStep(0);
        this.props.setCurEmp(emp);
        this.props.setPage("form")//show the form
    }

    handleAddClick = () => {
        let new_emp = { id: 0, date_of_birth: new Date() };
        this.showForm(new_emp);
    }
    handleEditClick = (emp) => {
        this.showForm(emp);
    }
    handleDeleteClick = (id) => {
        this.props.removeEmp(id)
    }
    getList = (q) => {
        let list = this.props.list;
        if (q !== '') {
            list = list.filter(t => t.first_name.includes(q) || t.last_name.includes(q) || t.company_name.includes(q) || t.designation.includes(q) || t.department.includes(q));
        }
        return list;
    }

    render() {
        let list = this.getList(this.state.search_query)
        return <>
            <Paper>
                <Typography variant="h4" align="center" component="div" gutterBottom>
                    Albiorix Technology Team
                </Typography>
                <Grid container justifyContent='space-between' >
                    <Grid item md col='1' >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            padding: '10px'
                        }}>
                            <TextField defaultValue={this.state.search_query} onChange={(e) => this.setState({ search_query: e.target.value })} label="Search emp" variant="outlined" />
                        </div>
                    </Grid>
                    <Grid item md col='1'  >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            padding: '10px'
                        }}>
                            <Button variant="contained" onClick={this.handleAddClick} >Add</Button>
                        </div>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Designation</TableCell>
                                <TableCell align="right">Department</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list.length === 0 ?
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" colSpan={4}>
                                            No records found
                                        </TableCell>
                                    </TableRow>
                                    :
                                    list.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.first_name} {row.last_name}
                                            </TableCell>
                                            <TableCell align="right">{row.designation}</TableCell>
                                            <TableCell align="right">{row.department}</TableCell>
                                            <TableCell align="right">
                                                <Button variant='contained' color='error' onClick={() => this.handleDeleteClick(row.id)} > Delete </Button>&nbsp;
                                                <Button variant='contained' onClick={() => { this.handleEditClick(row) }} color='primary' > Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    }
}
function mapStateToProps(state) {
    return {
        list: state.employees
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setPage: (page) => { return dispatch(setPage(page)); },
        setStep: (step) => { return dispatch(setStep(step)); },
        setCurEmp: (emp) => { return dispatch(setCurEmp(emp)); },
        removeEmp: (id) => { return dispatch(removeEmp(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmpList);