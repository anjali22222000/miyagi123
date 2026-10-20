import React,{useState,useEffect,useMemo,createElement as h} from "react";
import {EVENT_IMG,POST_IMG,imgUrl} from "./media.js";
import {SEED} from "./seed.js";

export const ls={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
export const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
export const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
export const fd=d=>new Date(d+"T00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
export const inr=n=>"₹"+Number(n).toLocaleString("en-IN");
export const mem={},subs=new Set();
export const seen=ls.get("miyagi_seeded",[]);
Object.keys(SEED).forEach(k=>{let v=ls.get(k,null);if(!Array.isArray(v)){v=SEED[k];ls.set(k,v)}else{const add=SEED[k].filter(x=>!seen.includes(x.id)&&!v.some(y=>y.id===x.id));if(add.length){v=[...v,...add];ls.set(k,v)}}mem[k]=v});
ls.set("miyagi_seeded",[...new Set(Object.values(SEED).flat().map(x=>x.id).concat(seen))]);
export const save=(k,v)=>{mem[k]=v;ls.set(k,v);subs.forEach(f=>f())};
export function useData(k){const[,n]=useState(0);useEffect(()=>{const f=()=>n(x=>x+1);subs.add(f);return()=>subs.delete(f)},[]);return[mem[k],v=>save(k,v)]}
let tf;export const setToast=f=>{tf=f};
export const toast=m=>tf&&tf(m);
export const isPast=e=>e.date<today();
export const left=e=>e.cap-mem.regs.filter(r=>r.eventId===e.id).reduce((a,r)=>a+r.qty,0);
export const canBook=e=>e.pub&&e.status==="Open"&&!isPast(e)&&left(e)>0;
export const byDate=(a,b)=>a.date.localeCompare(b.date);

{let c1=0,c2=0;mem.events.forEach(e=>{if(EVENT_IMG[e.id]&&!e.poster){e.poster=imgUrl(EVENT_IMG[e.id]);c1=1}});mem.posts.forEach(p=>{if(POST_IMG[p.id]&&!p.img){p.img=imgUrl(POST_IMG[p.id]);c2=1}});if(c1)ls.set("events",mem.events);if(c2)ls.set("posts",mem.posts)}
