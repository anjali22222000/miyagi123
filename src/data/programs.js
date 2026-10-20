import React,{useState,useEffect,useMemo,createElement as h} from "react";

export const PR=[
["public-speaking","Public Speaking","Structure, voice and presence for any stage.",["schools","colleges","individuals"],"#183D32"],
["debating","Debating","Argue ideas well, listen better and think on your feet.",["schools","colleges"],"#C77B42"],
["leadership","Leadership","Lead people with clarity, empathy and accountability.",["colleges","individuals"],"#252824"],
["confidence-building","Confidence Building","Practical exercises that replace self-doubt with evidence.",["schools","individuals"],"#3b6b58"],
["communication-skills","Communication Skills","Say what you mean and be understood the first time.",["schools","colleges","individuals"],"#8a5a34"],
["personality-development","Personality Development","Presence, etiquette and self-awareness for everyday life.",["schools","colleges"],"#5c7a68"],
["career-readiness","Career Readiness","Interviews, presentations and professional habits.",["colleges","individuals"],"#183D32"],
["goal-setting","Goal Setting","Turn ambition into a plan with milestones.",["schools","colleges","individuals"],"#C77B42"]
].map(([s,t,d,a,c])=>({s,t,d,a,c,obj:["Build a clear foundation in "+t.toLowerCase(),"Practise through live exercises and feedback","Leave with a personal action plan"],out:["Greater clarity and self-belief","Techniques you can use the next day","A repeatable practice routine"]}));
export const AUD=["All","Schools","Colleges","Individuals"];
