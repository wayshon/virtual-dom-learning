import React from "react";
import { render } from "react-dom";
import Router from './router/index.jsx'
import './assets/css/main.css'

const App = Router('/')

render(<App />,
	document.getElementById("app")
);