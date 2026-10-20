import React,{useState,useEffect,useMemo,createElement as h} from "react";
import {Logo} from "../components/Brand.jsx";
import {A} from "../components/ui.jsx";
import {Foot} from "../components/Footer.jsx";

export const NAV=[["/","Home"],["/about","About"],["/team","Team"],["/programs","Programs"],["/corporate","Corporate"],["/events","Events"],["/blog","Blog"],["/contact","Contact"]];
export function Public({path,children}){const[o,so]=useState(false);useEffect(()=>so(false),[path]);
return h("div",null,h("nav",{className:"top","aria-label":"Main"},h("div",{className:"wrap"},A("/",{className:"logo","aria-label":"Miyagi home"},h(Logo,{height:46})),h("button",{className:"burger","aria-expanded":o,onClick:()=>so(!o)},o?"Close":"Menu"),h("div",{className:"links"+(o?" open":"")},NAV.map(([t,l])=>A(t,{key:t,className:(t==="/"?path==="/":path.startsWith(t))?"on":""},l)),A("/events",{className:"btn sm"},"Book a seat")))),h("main",{className:"page",key:path},children),
h(Foot))}
