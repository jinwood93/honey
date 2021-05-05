import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatHomePage from './pages/ChatHomePage';
import ChatPage from './pages/ChatPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/chat" component={ChatHomePage}/>
                <Route exact path="/chat/:room" component={ChatPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;