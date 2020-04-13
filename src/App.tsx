import React from 'react';
import logo from './logo.svg';
import './App.scss';

// Components

import ToolBar from "./components/ToolBar";
import SideBar from "./components/SideBar";
import DiagramContainer from "./components/DiagramContainer";

function App() {
	return (
		<div className="App">
			<ToolBar />
			<SideBar />
			<DiagramContainer />
		</div>
	);
}

export default App;
