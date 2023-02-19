import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Pages from "./routes/Pages";

function App() {
    return (
        //hr, prov
        <HashRouter>
            <div className="App">
                <Pages/>
                {/*<Main/>*/}
            </div>
        </HashRouter>
    );
}

export default App;
