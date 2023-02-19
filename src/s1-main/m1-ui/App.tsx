import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Pages from "./routes/Pages";
import {Layout} from "./header/Layout";

function App() {
    return (
        //hr, prov
        <HashRouter>
            <div className="App">
                <Layout>
                    <Pages/>
                </Layout>
                {/*<Main/>*/}
            </div>
        </HashRouter>
    );
}

export default App;
