import React,{useMemo,useRef,useEffect,useState,createElement as h} from "react";
import {asset} from "./Brand.jsx";

/*
  Hero background: the generated speaker animation (public/assets/miyagi-speech-video.html)
  ported into the app as an inline SVG layer. The geometry, seeded layout and timings are the
  original's; the captions, end card and fade loop were left out (the hero carries its own message),
  and the navy/blue tones were mapped to the brand black + amber.
  It pauses when scrolled out of view and is not rendered at all on small screens or for reduced motion.
*/
const AMB="#FBB03B";
const rng=()=>{let s=7;return()=>{s=(s*9301+49297)%233280;return s/233280}};
const ROWS=[{y:640,s:.62,n:17,c:"#171717"},{y:700,s:.78,n:14,c:"#121212"},{y:775,s:.98,n:11,c:"#0d0d0d"},{y:870,s:1.3,n:8,c:"#080808"},{y:985,s:1.75,n:6,c:"#030303"}];

function build(){
 const r=rng(),bokeh=[],motes=[],crowd=[];
 for(let i=0;i<26;i++)bokeh.push({cx:r()*1600,cy:30+r()*420,r:8+r()*22,f:r()>.5?AMB:"#ffffff",o:.15+r()*.35});
 for(let j=0;j<30;j++)motes.push({cx:480+r()*640,cy:300+r()*320,r:1.4+r()*1.8,delay:-r()*9,dur:7+r()*6});
 ROWS.forEach(rw=>{for(let i=0;i<rw.n;i++){
  const x=(i+.5)*(1600/rw.n)+(r()-.5)*40,y=rw.y+(r()-.5)*14,s=rw.s*(.9+r()*.2),delay=-r()*3,dur=2.2+r()*2;
  crowd.push({x,y,s,c:rw.c,delay,dur,key:rw.y+"-"+i})}});
 return{bokeh,motes,crowd}}

export function HeroStage(){
 const box=useRef(),[live,setLive]=useState(true),[on,setOn]=useState(false);
 const d=useMemo(build,[]);
 /* only render the animated layer on larger screens with motion allowed and no data-saver */
 useEffect(()=>{
  const mq=matchMedia("(min-width:901px) and (prefers-reduced-motion:no-preference)"),sd=navigator.connection&&navigator.connection.saveData;
  const f=()=>setOn(mq.matches&&!sd);f();mq.addEventListener("change",f);return()=>mq.removeEventListener("change",f)},[]);
 useEffect(()=>{const el=box.current;if(!el||!on||!("IntersectionObserver" in window))return;
  const io=new IntersectionObserver(([e])=>setLive(e.isIntersecting));io.observe(el);return()=>io.disconnect()},[on]);
 return h("div",{ref:box,className:"stage"+(live?"":" paused"),"aria-hidden":true},on&&h("div",{className:"stage-cam"},
  h("svg",{viewBox:"0 0 1600 900",preserveAspectRatio:"xMidYMid slice",focusable:"false"},
   h("defs",null,
    h("linearGradient",{id:"sg-wall",x1:0,y1:0,x2:0,y2:1},h("stop",{offset:0,stopColor:"#000"}),h("stop",{offset:1,stopColor:"#1c1c1c"})),
    h("linearGradient",{id:"sg-floor",x1:0,y1:0,x2:0,y2:1},h("stop",{offset:0,stopColor:"#262626"}),h("stop",{offset:1,stopColor:"#0a0a0a"})),
    h("linearGradient",{id:"sg-cone",x1:0,y1:0,x2:0,y2:1},h("stop",{offset:0,stopColor:AMB,stopOpacity:.6}),h("stop",{offset:1,stopColor:AMB,stopOpacity:.02})),
    h("radialGradient",{id:"sg-glow",cx:.5,cy:.5,r:.5},h("stop",{offset:0,stopColor:AMB,stopOpacity:.5}),h("stop",{offset:1,stopColor:AMB,stopOpacity:0})),
    h("filter",{id:"sg-blur"},h("feGaussianBlur",{stdDeviation:14}))),
   h("rect",{width:1600,height:900,fill:"url(#sg-wall)"}),
   h("g",{opacity:.35,fill:"#2a2a2a"},[120,330,1180,1390].map(x=>h("rect",{key:x,x,y:60,width:90,height:480}))),
   h("ellipse",{cx:800,cy:300,rx:560,ry:300,fill:"url(#sg-glow)"}),
   h("g",{filter:"url(#sg-blur)",opacity:.7},d.bokeh.map((b,i)=>h("circle",{key:i,cx:b.cx,cy:b.cy,r:b.r,fill:b.f,opacity:b.o*(b.f===AMB?1:.6)}))),
   h("polygon",{className:"st-beam",points:"760,0 840,0 1130,600 470,600",fill:"url(#sg-cone)"}),
   h("rect",{x:0,y:560,width:1600,height:340,fill:"url(#sg-floor)"}),
   h("rect",{x:300,y:548,width:1000,height:22,fill:"#333"}),h("rect",{x:300,y:548,width:1000,height:4,fill:AMB,opacity:.9}),
   h("image",{href:asset("miyagi-logo.png"),x:610,y:86,width:380,height:167}),
   h("rect",{x:604,y:80,width:392,height:179,rx:14,fill:"none",stroke:AMB,strokeWidth:3,opacity:.6}),
   h("g",null,
    h("path",{d:"M740 610 L750 470 Q800 440 850 470 L860 610Z",fill:"#050505",stroke:AMB,strokeWidth:2,strokeOpacity:.7}),
    h("circle",{cx:800,cy:425,r:30,fill:"#050505",stroke:AMB,strokeWidth:2,strokeOpacity:.8}),
    h("line",{className:"st-arm",x1:842,y1:480,x2:905,y2:440,stroke:"#050505",strokeWidth:22,strokeLinecap:"round"}),
    h("line",{x1:758,y1:480,x2:735,y2:525,stroke:"#050505",strokeWidth:22,strokeLinecap:"round"})),
   h("path",{d:"M730 530 H870 L880 612 H720Z",fill:"#161616",stroke:AMB,strokeWidth:2,strokeOpacity:.8}),
   h("rect",{x:765,y:548,width:70,height:30,rx:6,fill:AMB}),
   h("g",null,d.motes.map((m,i)=>h("circle",{key:i,className:"st-mote",cx:m.cx,cy:m.cy,r:m.r,fill:"#fff",opacity:.5,style:{animationDelay:m.delay+"s",animationDuration:m.dur+"s"}}))),
   h("g",null,d.crowd.map(p=>{const{x,y,s,c}=p;return h("g",{key:p.key,className:"st-bob",style:{animationDelay:p.delay+"s",animationDuration:p.dur+"s"}},
    h("path",{d:`M${x-58*s} ${y+120*s} Q${x-55*s} ${y+42*s} ${x} ${y+36*s} Q${x+55*s} ${y+42*s} ${x+58*s} ${y+120*s}Z`,fill:c,stroke:AMB,strokeOpacity:.18,strokeWidth:1.5}),
    h("circle",{cx:x,cy:y,r:27*s,fill:c,stroke:AMB,strokeOpacity:.28,strokeWidth:1.5}))})))))}

/* "Watch the speaker film": the untouched original file in a modal, loaded only when opened */
export function FilmModal({onClose}){
 const ref=useRef();
 useEffect(()=>{const prev=document.activeElement;ref.current&&ref.current.focus();
  const k=e=>{if(e.key==="Escape")onClose()};addEventListener("keydown",k);document.body.style.overflow="hidden";
  return()=>{removeEventListener("keydown",k);document.body.style.overflow="";prev&&prev.focus&&prev.focus()}},[]);
 return h("div",{className:"film",role:"dialog","aria-modal":true,"aria-label":"Miyagi speaker film",onClick:e=>e.target===e.currentTarget&&onClose()},
  h("div",{className:"film-in"},
   h("button",{ref,type:"button",className:"film-x",onClick:onClose},"Close ✕"),
   h("div",{className:"film-fr"},h("iframe",{src:asset("miyagi-speech-video.html"),title:"Miyagi speaker film (animated, no sound)",allow:"autoplay",loading:"lazy"}))))}
