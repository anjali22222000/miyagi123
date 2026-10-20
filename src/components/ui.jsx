import React,{useState,useEffect,useMemo,createElement as h} from "react";
import {imgFail,rs,asset} from "./Brand.jsx";
import {PageLoop} from "./PageLoop.jsx";
import {fd,inr,isPast,canBook} from "../data/store.js";
import {ke,Scene} from "./Scene.jsx";

export const A=(to,p,...c)=>h("a",{href:"#"+to,...p},...c);
export const Fld=({f,v,set,err})=>{const id="f-"+f.n,onChange=e=>set(f.n,f.t==="checkbox"?e.target.checked:e.target.value);let c;
if(f.t==="checkbox")return h("label",{className:"chk"},h("input",{type:"checkbox",checked:!!v,onChange}),f.l);
const p={id,value:v??"",onChange,"aria-invalid":!!err};
if(f.t==="textarea")c=h("textarea",{...p,rows:f.r||4});else if(f.t==="select")c=h("select",p,f.o.map(o=>h("option",{key:o},o)));else c=h("input",{...p,type:f.t||"text",min:f.min});
return h("div",{className:"fld"+(f.w?" wide":"")},h("label",{htmlFor:id},f.l,f.req&&" *"),c,err&&h("small",{className:"err",role:"alert"},err))};
export const check=(fs,v)=>{const e={};fs.forEach(f=>{const x=v[f.n];if(f.req&&(x==null||String(x).trim()===""))e[f.n]="This field is required";else if(f.t==="email"&&x&&!/^\S+@\S+\.\S+$/.test(x))e[f.n]="Enter a valid email address";else if(f.n==="phone"&&x&&String(x).replace(/\D/g,"").length<10)e[f.n]="Enter a valid 10-digit phone number";else if(f.t==="number"&&x!==""&&x!=null&&+x<(f.min??0))e[f.n]="Must be at least "+(f.min??0)});return e};
export function Form({fs,init={},cta,onSubmit,ok}){const[v,sv]=useState(init),[er,se]=useState({}),[d,sd]=useState(false);const set=(n,x)=>sv(o=>({...o,[n]:x}));
if(d)return h("div",{className:"okbox",role:"status"},ok);
return h("form",{noValidate:true,className:"form",onSubmit:e=>{e.preventDefault();const r=check(fs,v);se(r);if(Object.keys(r).length)return;onSubmit&&onSubmit(v);if(ok)sd(true)}},fs.map(f=>h(Fld,{key:f.n,f,v:v[f.n],set,err:er[f.n]})),h("button",{className:"btn"},cta))}
export const Poster=({e,big})=>h("div",{className:"poster"+(big?" big":"")+(e.poster?" has-img":"")},h(Scene,{k:ke(e),c:e.color,v:+e.id.slice(1)||0}),e.poster&&h("img",{src:rs(e.poster),alt:e.title+" — event poster",loading:big?"eager":"lazy",decoding:"async",onError:imgFail}),h("span",{className:"eyebrow",style:{color:"#fff",opacity:.9}},e.cat),h("span",{className:"d"},fd(e.date)));
export const Badge=({e})=>isPast(e)?h("span",{className:"badge past"},"Completed"):e.status!=="Open"?h("span",{className:"badge x"},e.status):h("span",{className:"badge"+(e.paid?"":" free")},e.paid?inr(e.price):"Free");
export const EventCard=({e})=>{const past=isPast(e);return h("article",{className:"ev"+(past?" pastc":"")},h(Poster,{e}),h("div",{className:"body"},h("div",{className:"tagrow"},h(Badge,{e}),h("span",{className:"cat"},e.cat)),h("h3",null,e.title),h("small",{className:"mut"},fd(e.date)," · ",e.time," · ",e.venue),h("p",{className:"mut"},e.desc),A("/events/"+e.id,{className:"btn"+(past?" alt":"")},past?"View highlights":canBook(e)?(e.paid?"View & book":"Register free"):"View details")))};
export const Head=({eye,t,children,img,pos="50% 50%",alt=""})=>h("header",{className:"phead"+(img?" has-pic":"")},h(PageLoop),h("div",{className:"wrap phead-g"},h("div",{className:"phead-tx"},h("div",{className:"eyebrow"},eye),h("h1",null,t),children&&h("p",{className:"lead"},children)),img&&h("div",{className:"phead-pic img-rv"},h("img",{src:asset(img),alt,decoding:"async",fetchPriority:"high",style:{objectPosition:pos}}))));
export const Cta=()=>h("section",{className:"cta"},h("div",{className:"wrap two"},h("div",null,h("div",{className:"eyebrow"},"Own your voice. Shape your impact."),h("h2",null,"Bring Miyagi to your stage."),h("p",null,"Booking a keynote for your school, campus or company, or looking for a seat at the next event? Let’s talk.")),h("div",{className:"ctas"},A("/contact",{className:"btn"},"Enquire for your event"),A("/events",{className:"btn alt"},"Browse events"))));
