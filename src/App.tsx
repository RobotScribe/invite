import React from 'react';
import { AppContainer } from './App.style';
import Button from './components/Button'

const App = () => (
    <AppContainer>
        <Button onClick={() => console.log('Hello')}>Invite teammates</Button>
    </AppContainer>
);

export default App;
