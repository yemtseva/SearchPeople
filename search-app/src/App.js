import './App.css';

import { Home } from './Home';
import { People } from './People';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="container">
                <div className="float-child">
                    <Home />
                </div>
                <div className="float-child">
                    <People /> 
                </div>

            </div>
        </Router>
            
     
    );
}

export default App;
