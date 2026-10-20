import React,{useState,useEffect,createElement as h} from "react";
import {useData,isPast,byDate,fd} from "../data/store.js";
import {A,Cta} from "../components/ui.jsx";
import {asset,rs,MarkImg} from "../components/Brand.jsx";
import {PR} from "../data/programs.js";
import {ProgIndex,EventFeature,EventRow,StoryFigure,Statement,AudTile} from "../components/Editorial.jsx";
import {HeroStage,FilmModal} from "../components/HeroStage.jsx";

const STEPS=[["Listen","We start from where each person is, not from a script."],["Practise","Short live exercises instead of long lectures."],["Get feedback","Specific, honest and kind, from Miyagi and from peers."],["Apply","A simple plan for the next 30 days."]];
const VOICES=[["I stopped dreading presentations after one session.","Student"],["Our managers now actually listen in one-to-ones.","HR lead"],["Clear, warm and practical. No fluff.","Teacher"]];

/* gentle depth: elements marked data-par drift a few pixels against the scroll. Off for reduced motion and small screens. */
function useParallax(){useEffect(()=>{
 if(matchMedia("(prefers-reduced-motion:reduce)").matches||matchMedia("(max-width:900px)").matches)return;
 const els=[...document.querySelectorAll("[data-par]")];let t=0;
 const run=()=>{t=0;els.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;el.style.setProperty("--py",(((r.top+r.height/2-innerHeight/2)/innerHeight)*-36).toFixed(1)+"px")})};
 const on=()=>{t||(t=requestAnimationFrame(run))};run();addEventListener("scroll",on,{passive:true});addEventListener("resize",on);
 return()=>{removeEventListener("scroll",on);removeEventListener("resize",on);cancelAnimationFrame(t)}},[])}

export function Home(){const[ev]=useData("events"),[po]=useData("posts"),[film,sf]=useState(false);useParallax();
const up=ev.filter(e=>e.pub&&!isPast(e)).sort(byDate),nx=up[0],bl=po.filter(p=>p.pub),U=i=>({"--i":i});
const cue=()=>scrollTo({top:document.querySelector(".hx").offsetHeight-60,behavior:"smooth"});
return h("div",null,
/* 1 — hero: animated stage behind, headline left, photograph layered right */
h("section",{className:"hx","aria-labelledby":"hx-h"},
 h(HeroStage),h("div",{className:"hx-shade","aria-hidden":true}),
 h("div",{className:"wrap hx-grid"},
  h("div",{className:"hx-copy"},
   h("div",{className:"eyebrow in-up",style:U(0)},"Speaker · Trainer · Author"),
   h("h1",{id:"hx-h"},h("span",{className:"ln"},h("span",{style:U(1)},"Find the voice")),h("span",{className:"ln"},h("span",{style:U(2)},"you were ",h("em",null,"afraid")," to use."))),
   h("p",{className:"lead in-up",style:U(3)},"The confidence to speak. The courage to lead. Miyagi coaches students, professionals and teams to communicate with clarity."),
   h("div",{className:"ctas in-up",style:U(4)},A("/contact",{className:"btn"},"Book Miyagi to speak"),A("/programs",{className:"btn alt"},"Explore programs"),h("button",{type:"button",className:"hx-play",onClick:()=>sf(true)},h("i",{"aria-hidden":true},"▶"),"Watch the speaker film")),
   nx&&A("/events/"+nx.id,{className:"hx-next in-up",style:U(5)},h("span",null,h("small",null,"Next event"),h("b",null,nx.title)),h("span",{className:"hx-when"},fd(nx.date)+" · "+nx.venue+"  →"))),
  h("figure",{className:"hx-photo in-up",style:U(3)},h("img",{src:asset("speaker-hero.jpg"),alt:"A cheerful student giving two thumbs up at a Miyagi workshop",width:1800,height:1200,fetchPriority:"high"}),h("div",{className:"hx-mark"},h(MarkImg)))),
 h("button",{type:"button",className:"hx-cue",onClick:cue,"aria-label":"Scroll to explore"},h("span",null,"Scroll"),h("i",{"aria-hidden":true}))),
film&&h(FilmModal,{onClose:()=>sf(false)}),
/* 2 — the power of communication */
h(Statement,{eye:"The power of communication",lines:["Your voice is not just heard.","It changes what happens next."]}),
/* 3 — brand story */
h("section",{className:"wrap rv"},h("div",{className:"story"},h(StoryFigure),h("div",null,h("div",{className:"eyebrow"},"Why Miyagi exists"),h("h2",null,"Everyone has something worth saying."),h("p",null,"Miyagi began as a debate coach in a small school. The lesson never changed: people grow when they are given a safe place to practise being heard."),h("p",{className:"pull"},"Help one million people speak with clarity and courage."),A("/about",{className:"btn alt"},"Read the story")))),
/* 4 — programs */
h("section",{className:"band rv"},h("div",{className:"wrap"},h("div",{className:"row"},h("div",null,h("div",{className:"eyebrow"},"Signature programs"),h("h2",{style:{margin:0}},"Eight ways to build your voice")),A("/programs",{className:"btn alt"},"Compare all programs")),h(ProgIndex,{list:PR}))),
/* 5 — audiences, led by photography */
h("section",{className:"wrap rv"},h("div",{className:"eyebrow"},"Who we work with"),h("h2",null,"One method, three audiences"),
 h("div",{className:"atiles"},
  h(AudTile,{cls:"a1",to:"/programs",t:"Schools",d:"Confidence, debating and public speaking for students who are still finding their voice.",tags:"Public Speaking · Debating · Confidence Building",img:"debate.jpeg",pos:"50% 60%"}),
  h(AudTile,{cls:"a2",to:"/programs",t:"Colleges",d:"Leadership, communication and career readiness, from campus sessions to placement preparation.",tags:"Leadership · Career Readiness · Goal Setting",img:"rise_and_lead__2_.jpeg",pos:"50% 40%"}),
  h(AudTile,{cls:"a3",to:"/corporate",t:"Corporate teams",d:"Seminars and cohorts that help managers listen, give feedback and lead through change.",tags:"Leadership · Communication · Teamwork",img:"corporate_leader_seminar.jpeg",pos:"50% 40%"}))),
/* 6 — the speaker in action */
h("section",{className:"act","aria-labelledby":"act-h"},
 h("div",{className:"act-img"},h("img",{"data-par":1,src:asset("youth_leadership_submit.jpeg"),alt:"A speaker addressing a seated student audience at the Youth Leadership Summit",loading:"lazy",decoding:"async",width:1536,height:1024})),
 h("div",{className:"act-in wrap"},h("div",{className:"act-panel rv"},h("div",{className:"eyebrow"},"How a session works"),h("h2",{id:"act-h"},"Practice beats theory. Every time."),
  h("ol",{className:"steps"},STEPS.map(([t,d],i)=>h("li",{key:t},h("b",null,String(i+1).padStart(2,"0")),h("h3",null,t),h("p",null,d))))))),
/* 7 — featured event */
h("section",{className:"wrap rv"},h("div",{className:"row"},h("div",null,h("div",{className:"eyebrow"},"Speaking & events"),h("h2",{style:{margin:0}},"Come and hear it live")),A("/events",{className:"btn alt"},"All events")),
 nx?h(EventFeature,{e:nx}):h("p",{className:"mut"},"New events are announced soon."),
 up.length>1&&h("div",{className:"elist"},up.slice(1,4).map(e=>h(EventRow,{key:e.id,e})))),
/* 8 — signature philosophy */
h("section",{className:"band phil rv"},h("div",{className:"wrap"},h("div",{className:"phil-g"},
 h("div",{className:"phil-img img-rv"},h("img",{src:asset("listening_is_the_first_step.jpeg"),alt:"A small group in conversation, one person speaking while the others listen",loading:"lazy",decoding:"async",width:1536,height:1024})),
 h("div",null,h("div",{className:"eyebrow"},"Our philosophy"),h("p",{className:"phil-t"},"Leadership begins when people ",h("span",null,"feel heard."))))),
 h("div",{className:"wrap"},h("div",{className:"voices"},h("div",{className:"eyebrow"},"After the session · fictional demo content"),VOICES.map(([q,a])=>h("figure",{key:q},h("blockquote",null,q),h("figcaption",null,a)))))),
/* 9 — journal */
bl.length>0&&h("section",{className:"wrap rv"},h("div",{className:"row"},h("div",null,h("div",{className:"eyebrow"},"Journal"),h("h2",{style:{margin:0}},"Ideas worth practising")),A("/blog",{className:"btn alt"},"All articles")),
 h("div",{className:"jwrap"},A("/blog/"+bl[0].id,{className:"jlead"},h("span",{className:"jimg img-rv"},h("img",{src:rs(bl[0].img),alt:bl[0].title+" — article illustration",loading:"lazy",decoding:"async",width:1600,height:900})),h("small",null,bl[0].cat+" · "+bl[0].read+" min read"),h("h3",null,bl[0].title),h("p",{className:"mut"},bl[0].excerpt)),
  h("div",{className:"jlist"},bl.slice(1,4).map(p=>A("/blog/"+p.id,{key:p.id,className:"jrow"},h("span",{className:"jimg"},h("img",{src:rs(p.img),alt:"",loading:"lazy",decoding:"async",width:1600,height:900})),h("div",null,h("small",null,p.cat+" · "+p.read+" min read"),h("h3",null,p.title))))))),
/* 10 — closing invitation */
h(Cta))}
