import React,{createElement as h} from "react";
import {createRoot} from "react-dom/client";
import "./styles/main.css";
import {App} from "./App.jsx";

createRoot(document.getElementById("root")).render(h(App));
