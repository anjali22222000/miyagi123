import React,{createElement as h} from "react";
import {Scene,kp} from "./Scene.jsx";
/* Stable public asset paths (src/../public/assets) so saved data keeps working after rebuilds */
export const asset=p=>{const m=typeof window!=="undefined"&&window.__ASSETS;return (m&&m[p])||import.meta.env.BASE_URL+"assets/"+p};
/* resolves stored "./assets/…" image paths (also supports the single-file preview build) */
export const rs=u=>u&&u.startsWith("./assets/")?asset(u.slice(9)):u;
export const Logo=({height=46})=>h("img",{className:"logo-img",src:asset("miyagi-logo.png"),alt:"Miyagi — The Communication Champ",width:Math.round(height*240/104),height,style:{height}});
import {PROGRAM_IMG} from "../data/media.js";
export const hasPhoto=s=>!!PROGRAM_IMG[s];
/* if a photo fails to load, drop it so the illustrated fallback and overlay styles return */
export const imgFail=x=>{const el=x.target;if(el.parentNode)el.parentNode.classList.remove("has-img");el.remove()};
export const PArt=({p})=>h(React.Fragment,null,h(Scene,{k:kp(p.s),c:p.c}),PROGRAM_IMG[p.s]&&h("img",{className:"fill-img",src:asset(PROGRAM_IMG[p.s]),alt:p.s==="confidence-building"?"A student smiling with two thumbs up":p.t+" program poster",loading:"lazy",decoding:"async",onError:imgFail}));
export const MarkImg=()=>h("img",{className:"fill-img",src:asset("miyagi-mark.png"),alt:"Miyagi mascot logo mark",width:900,height:900,loading:"lazy"});
