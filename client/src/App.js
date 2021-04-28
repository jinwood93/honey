import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatHome from './pages/ChatHomePage';
import Chat from './pages/ChatPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ChatHome}/>
                <Route exact path="/:room" component={Chat}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;