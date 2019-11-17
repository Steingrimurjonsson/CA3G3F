import React, { Component } from "react";
import facade from "./apiFacade";
import facadeSwappi from "./apiFacadeSwappi";
import facadeAdmin from "./apiAdminFacade";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
class LogInAsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  loginAsAdmin = evt => {
    evt.preventDefault();
    this.props.loginAsAdmin(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div>
        <h2>Login as Admin</h2>
        <form onSubmit={this.loginAsAdmin} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login as Admin</button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res.msg }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}
class LoggedInAsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facadeAdmin.fetchData().then(res => this.setState({ dataFromServer: res.msg }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}

class SwappiData extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ""};
  }
  getData = evt => {
    evt.preventDefault();
    this.props.getData(this.state.data);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  render() {
    return (
      <div>
        <h2>Chose what planet you want to look up</h2>
        <form onSubmit={this.getData} onChange={this.onChange}>
        <select id="data">
          <option value="planets/1">Tatooine</option>
          <option value="planets/2">Alderaan</option>
          <option value="planets/3">Yavin IV</option>
        </select>
          <button>Look up</button>
        </form>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  logoutAsAdmin = () => {
    facadeAdmin.logoutAsAdmin();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  };
  loginAsAdmin = (user, pass) => {
    facadeAdmin.loginAsAdmin(user, pass).then(res => this.setState({ loggedIn: true }));
  };

  getSwappiData = (data) => {
    facadeSwappi.getData(data);
  };


  render() {
    return (
      <div>
       <SwappiData/>    
        {!this.state.loggedIn ? (
          <LogIn login={this.login} /> 
        ) : (
          <div>
            <LoggedIn />
            <button onClick={this.logout}>Logout</button>
          </div>
        )}
                {!this.state.loggedIn ? (
          <LogInAsAdmin loginAsAdmin={this.loginAsAdmin} /> 
        ) : (
          <div>
            <LoggedInAsAdmin />
            <button onClick={this.logoutAsAdmin}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
export default App;
