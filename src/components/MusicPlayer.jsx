import React,{useState,useEffect,useRef,createElement as h} from "react";
import {asset} from "./Brand.jsx";
import {toast} from "../data/store.js";
const I=(d,x)=>h("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":true},h("path",{d}),x);
/* One optional background-music control. Never autoplays; starts only on click. */
export function MusicPlayer(){const a=useRef(),[on,so]=useState(false),[mu,sm]=useState(false),[er,se]=useState(false),[ld,sl]=useState(false);
useEffect(()=>{if(a.current)a.current.muted=mu},[mu]);
useEffect(()=>()=>{a.current&&a.current.pause()},[]);
const toggle=async()=>{const el=a.current;if(!el||er)return;if(on){el.pause();return}sl(true);try{await el.play()}catch{se(true);toast("Music couldn’t be played. Please try again later.")}sl(false)};
const msg=er?"Music unavailable":ld?"Loading music":on?(mu?"Music playing, muted":"Music playing"):"Music paused";
return h("div",{className:"mp"+(on?" on":""),role:"group","aria-label":"Background music"},
h("audio",{ref:a,src:asset("miyagi-music.mp3"),loop:true,preload:"none",onPlay:()=>{so(true);sl(false)},onPause:()=>so(false),onError:()=>{se(true);so(false);sl(false)}}),
h("button",{type:"button",className:"mp-b",onClick:toggle,disabled:er,"aria-pressed":on,"aria-label":on?"Pause background music":"Play background music",title:on?"Pause music":"Play music"},on?I("M6 5h4v14H6zM14 5h4v14h-4z"):I("M8 5v14l11-7z")),
h("span",{className:"mp-eq","aria-hidden":true},[0,1,2,3].map(i=>h("i",{key:i}))),
h("span",{className:"mp-t","aria-hidden":true},er?"Unavailable":on?"Music on":"Play music"),
on&&h("button",{type:"button",className:"mp-m",onClick:()=>sm(!mu),"aria-pressed":mu,"aria-label":mu?"Unmute music":"Mute music",title:mu?"Unmute":"Mute"},mu?I("M3 9v6h4l5 4V5L7 9H3z",h("path",{d:"M16 9l5 6m0-6l-5 6",stroke:"currentColor",strokeWidth:2,fill:"none"})):I("M3 9v6h4l5 4V5L7 9H3zM16 8a5 5 0 0 1 0 8",h("path",{d:"M16 8a5 5 0 0 1 0 8",stroke:"currentColor",strokeWidth:2,fill:"none"}))),
h("span",{className:"sr","aria-live":"polite"},msg))}
