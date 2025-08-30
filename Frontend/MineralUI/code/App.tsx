import React from 'react';
import { render } from 'react-dom';
import SyncForm from './SyncForm';
import { ThemeProvider } from 'mineral-ui/themes';

function App() {
    return (
        <ThemeProvider>
            <SyncForm />
        </ThemeProvider>
    );
}

export default App;