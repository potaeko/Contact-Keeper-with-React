import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import './App.css';

//changed to arrow function
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;


//==============================================================
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
