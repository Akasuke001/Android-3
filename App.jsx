import { useState } from "react";

const QUESTIONS = [
  { id: "budget", title: "予算", options: ["low","mid","high","ultra"] },
  { id: "usage", title: "用途", options: ["game","camera","sns","work"] },
];

const PHONES = [
  { name: "Pixel 9", usage:["camera","sns"], price:"mid" },
  { name: "ROG Phone 8", usage:["game"], price:"ultra" },
  { name: "Galaxy S25", usage:["sns"], price:"high" },
];

function scorePhone(phone, answers){
  let score = 0;
  if(phone.price === answers.budget) score += 50;
  if(phone.usage.includes(answers.usage)) score += 50;
  return score;
}

export default function App(){
  const [step,setStep] = useState(0);
  const [answers,setAnswers] = useState({});
  const [result,setResult] = useState(null);

  const current = QUESTIONS[step];

  const select = (val)=>{
    const newAns = {...answers,[current.id]:val};
    setAnswers(newAns);

    if(step+1 >= QUESTIONS.length){
      const ranked = PHONES.map(p=>({...p,score:scorePhone(p,newAns)}))
        .sort((a,b)=>b.score-a.score);
      setResult(ranked);
    }else{
      setStep(step+1);
    }
  };

  if(result){
    return (
      <div style={{padding:20}}>
        <h1>結果</h1>
        {result.map((p,i)=>(
          <div key={i}>#{i+1} {p.name} ({p.score}pt)</div>
        ))}
      </div>
    );
  }

  return (
    <div style={{padding:20}}>
      <h1>{current.title}</h1>
      {current.options.map(o=>(
        <button key={o} onClick={()=>select(o)} style={{display:"block",margin:"10px"}}>
          {o}
        </button>
      ))}
    </div>
  );
}
