import React from 'react';
import './App.css';
import BiddersList from "./components/BiddersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {routes} from "./utils/constants";

const App = () => (
    <div className="App">
        <BrowserRouter>
        <Switch>
            {routes.map((route: any, index: number) => (
                <Route
                    path={route.path}
                    key={index}
                    exact
                    component={route.component}
                />
            ))}
        </Switch>
        </BrowserRouter>
    </div>
);

export default App;
