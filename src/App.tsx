import React from 'react';
//import logo from './logo.svg';
import './App.scss';

// Components

import ToolBar from "./components/ToolBar";
import SideBar from "./components/SideBar";
import DiagramContainer from "./components/DiagramContainer";
import DetailsBar from "./components/DetailsBar";
import Toasts from "./components/Toasts";

function App() {
	
	return (
		<div className="App">
			<ToolBar />
			<SideBar />
			<DiagramContainer />
			<DetailsBar />
			<Toasts />
		</div>
	);
}

export default App;
