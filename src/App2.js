import {BrowserRouter as Router, Route, NavLink, Switch,useRouteMatch,useParams} from "react-router-dom"
import data from "./data/data.json"
import React from "react";
export default function App() {
  return (
    <Router>
      <Header/>
      <Content/>
    </Router>
  );
}
const Header = () => {
  return(
    <nav>
   <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all">All users</NavLink>
          </li>
        </ul>
  </nav>
  );
}
const Content = () => {
  return(
    <div>
    <Route exact path="/">
            <Home />
          </Route>
          <Route path="/all">
            <All />
          </Route>
  </div>
  );
}
function Home() {
    return (
        <h2>Home</h2>
        );  
    }
  function All() {
  let match = useRouteMatch();
console.log(match);
  return (
    <div>
      <h2>All users</h2>
      <ul>
      {data.users.map((u, index) => (
          <NavLink to={`${match.url}/${index}`}>
                     <li key={index} >
                         <h2>{u.title + " " + u.first + " " + u.last}</h2>
                         <img src={`${u.picture.thumbnail}`} alt="imgOfUser"/>
                     </li>
          </NavLink>
         ))}
      </ul>
    <Switch>
        <Route path={`${match.path}/:userIndex`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Click on a user to see more detail.</h3>
        </Route>
        </Switch>
    </div>
  );
}
function Topic() {
  let { userIndex } = useParams();
  var sUser = data.users[userIndex];
return (
    <div>
        <div>
          <h2>{"User : " +sUser.title + " " + sUser.first + " " + sUser.last}</h2>
          <h4>{"Address : " +sUser.street + " " + sUser.city + " " + sUser.state+ " " + sUser.zip}</h4>
          <h4>{"Contact Info : " +sUser.email + " " + sUser.phone + " " + sUser.cell}</h4>
          <h4>{"Personal Info : " +sUser.dob + " " + sUser.gender}</h4>
         <img src={`${sUser.picture.large}`} alt="imgOfUser"/>
        </div>
    </div>
  );
}
