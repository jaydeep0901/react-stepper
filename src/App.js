import * as React from "react";
import "./App.css";
import { connect } from "react-redux";
import EmpList from "./component/EmpList";
import EmpForm from "./component/EmpForm";
class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }
  render() {
    let cur_page = null;
    switch (this.props.cur_page) {
      case 'list':
        cur_page = <EmpList />
        break;
      case 'form':
        cur_page = <EmpForm />;
        break;
      default:
        cur_page = <h1>Page not found </h1>;
    }
    return <><div style={{ padding: '0px 10% 0px 10% ' }}>{cur_page}</div></>
  }
}
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps() {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
