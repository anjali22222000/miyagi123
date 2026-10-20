import React,{useRef,useEffect,createElement as h} from "react";

/*
  Page-header background: the generated "Aurora Network" loop (public/assets/miyagi-background-loop.html)
  ported into the app. Same structure as the original: four slow blurred light blobs plus a drifting
  dot-and-line network on a canvas. The navy base and blue/teal/red blobs were mapped to the brand black
  and amber, and the floating logo was left out because the header already carries it.
  It sizes to its header, pauses off-screen, and draws one still frame for reduced motion.
*/
export function PageLoop(){
 const box=useRef(),cv=useRef();
 useEffect(()=>{
  const el=box.current,c=cv.current,cx=c.getContext("2d");let W=0,H=0,P=[],raf=0,vis=true;
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,RGB="251,176,59";
  const size=()=>{const dpr=Math.min(devicePixelRatio||1,2);W=el.clientWidth;H=el.clientHeight;c.width=W*dpr;c.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
   const n=Math.round(Math.min(70,Math.max(24,W*H/9000)));P=[];
   for(let i=0;i<n;i++){const a=Math.random()*6.283,v=.12+Math.random()*.22;P.push({x:Math.random()*W,y:Math.random()*H,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:1.2+Math.random()*1.6})}};
  const draw=move=>{cx.clearRect(0,0,W,H);const L=Math.min(170,Math.max(100,W/9));
   for(let i=0;i<P.length;i++){const p=P[i];
    if(move){p.x+=p.vx;p.y+=p.vy;if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20}
    for(let j=i+1;j<P.length;j++){const o=P[j],dx=p.x-o.x,dy=p.y-o.y,d=Math.sqrt(dx*dx+dy*dy);
     if(d<L){cx.strokeStyle="rgba("+RGB+","+(.3*(1-d/L)).toFixed(3)+")";cx.lineWidth=1;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(o.x,o.y);cx.stroke()}}}
   cx.fillStyle="rgba("+RGB+",.6)";for(const p of P){cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}};
  const loop=()=>{raf=0;draw(true);if(vis)raf=requestAnimationFrame(loop)};
  const start=()=>{if(!raf&&!reduce&&vis)raf=requestAnimationFrame(loop)};
  size();draw(false);start();
  const ro=new ResizeObserver(()=>{size();draw(false)});ro.observe(el);
  const io=new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis)start();else{cancelAnimationFrame(raf);raf=0}});io.observe(el);
  return()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect()}},[]);
 return h("div",{ref:box,className:"loop","aria-hidden":true},["a","b","c","d"].map(k=>h("i",{key:k,className:"lb "+k})),h("canvas",{ref:cv}))}
