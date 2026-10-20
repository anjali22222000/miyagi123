import React,{useState,createElement as h} from "react";
import {A,Badge} from "./ui.jsx";
import {PArt,MarkImg,asset,rs} from "./Brand.jsx";
import {canBook,isPast,fd,inr} from "../data/store.js";

const cap=s=>s[0].toUpperCase()+s.slice(1);
const hideImg=x=>x.target.remove();

/* Programs as an editorial index: hovering or focusing a row previews its image */
export function ProgIndex({list}){const[a,sa]=useState(0);const cur=Math.min(a,list.length-1);
return h("div",{className:"pidx"},
h("ol",{className:"pidx-list"},list.map((p,i)=>h("li",{key:p.s},A("/programs/"+p.s,{className:"pidx-row"+(i===cur?" on":""),onMouseEnter:()=>sa(i),onFocus:()=>sa(i)},
 h("span",{className:"n"},String(i+1).padStart(2,"0")),h("span",{className:"th","aria-hidden":true},h(PArt,{p})),
 h("span",{className:"t"},h("b",null,p.t),h("small",null,p.d)),h("span",{className:"pa"},p.a.map(cap).join(" · ")),h("span",{className:"arr","aria-hidden":true},"→"))))),
h("div",{className:"pidx-view","aria-hidden":true},list.map((p,i)=>h("div",{key:p.s,className:"pidx-img"+(i===cur?" on":"")},h(PArt,{p}))),h("div",{className:"pidx-cap"},h("b",null,list[cur].t),h("span",null,list[cur].a.map(cap).join(" · ")))))}

/* One listing row for an event */
export const EventRow=({e})=>{const d=new Date(e.date+"T00:00");
return A("/events/"+e.id,{className:"erow"+(isPast(e)?" past":"")},
 h("div",{className:"edate"},h("b",null,d.getDate()),h("span",null,d.toLocaleString("en-IN",{month:"short"})+" "+d.getFullYear())),
 h("div",{className:"ethumb","aria-hidden":true},e.poster&&h("img",{src:rs(e.poster),alt:"",loading:"lazy",decoding:"async",onError:hideImg})),
 h("div",{className:"einfo"},h("small",null,e.cat),h("h3",null,e.title),h("p",{className:"mut"},e.time+" · "+e.venue),h("span",{className:"eb"},h(Badge,{e}))),
 h("div",{className:"eprice"},h(Badge,{e})),h("span",{className:"arr","aria-hidden":true},"→"))};

/* Large featured event */
export const EventFeature=({e})=>{const book=canBook(e);
return h("article",{className:"efeat"},
 A("/events/"+e.id,{className:"efeat-img img-rv","aria-label":e.title+" — details"},e.poster&&h("img",{src:rs(e.poster),alt:e.title+" — event poster",decoding:"async",onError:hideImg})),
 h("div",null,h("div",{className:"eyebrow"},e.cat),h("h2",null,e.title),h("p",{className:"when"},fd(e.date)+" · "+e.time),h("p",{className:"mut"},e.venue),h("p",null,e.desc),
  h("div",{className:"ctas"},book&&A("/register/"+e.id,{className:"btn"},e.paid?"Book tickets · "+inr(e.price):"Register free"),A("/events/"+e.id,{className:"btn alt"},"Event details"))))};

/* Brand story: a layered composition. The workshop photograph leads, an audience photograph overlaps it on the grid
   (no negative margins), and the Miyagi mark anchors the corner. */
export const StoryFigure=({alt="Miyagi coaching a confidence workshop for students"})=>h("div",{className:"story-fig"},
 h("div",{className:"sf-main img-rv"},h("img",{src:asset("speak_with_confidence.jpeg"),alt,loading:"lazy",decoding:"async",width:1600,height:900})),
 h("div",{className:"sf-sub img-rv"},h("img",{src:asset("campus_voice_tour_pune.jpeg"),alt:"A speaker addressing a student audience on the Campus Voices Tour in Pune",loading:"lazy",decoding:"async",width:1536,height:1024})),
 h("div",{className:"sf-mk"},h(MarkImg)));

/* Full-width typographic statement; the text is passed as plain copy, never as a quotation */
export const Statement=({lines,eye})=>h("section",{className:"stmt wrap rv"},eye&&h("div",{className:"eyebrow"},eye),
 h("p",{className:"stmt-t"},lines.map((l,i)=>h("span",{key:i,className:i%2?"em":""},l," "))));

/* An audience tile: photograph first, copy on a solid panel */
export const AudTile=({to,t,d,tags,img,pos,cls})=>A(to,{className:"atile "+cls},
 h("span",{className:"atile-img img-rv"},h("img",{src:asset(img),alt:"",loading:"lazy",decoding:"async",style:{objectPosition:pos}})),
 h("span",{className:"atile-tx"},h("h3",null,t),h("p",null,d),h("small",null,tags),h("span",{className:"arr","aria-hidden":true},"→")));
