import React from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import "./App.css";

const App = () => {
    return (
        <main className="mainpage">
            <div className="leftout">
                <LeftSection />
            </div>
            <div className="rightout">
                <RightSection />
            </div>
        </main>
    );
};

export default App;