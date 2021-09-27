
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";

function App() {
    const [username, setUsername] = useState("");
    

    return (
        <div>
            <BrowserRouter>
                <Header />
                <main className="py-3">
                    < Chat />
                    hello
                    
                </main>
                {/* <Route path="/chat" component={Chat} /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
