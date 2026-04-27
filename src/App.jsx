import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { GoogleGenAI } from "@google/genai";
import {BeatLoader} from 'react-spinners'



function App() {

  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)
  const ai = new GoogleGenAI({apiKey: "AIzaSyDeuYcZNBNUGoqfogeSAyIvVaRPWtMf_G4"});

  let messages = [];
  

  const [data,setData] = useState(messages);

  async function getResponse() {
    if(prompt === ""){
      alert("Please enter a prompt")
      return;
    }

    setData(prevData => [...prevData, {role: "user", content: prompt}])
    setScreen(2);
    setLoading(true);

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  setData(prevData => [...prevData, {role: "ai", content: response.text}]);
  setPrompt("");
  setLoading(false);
}
  

  return (
    <>
     <div>
    
      <Navbar/>


      <div className="screen">

      {
        screen === 1 ?
        <div className="screen-1 w-screen h-[65vh] flex items-center justify-center flex-col" >
          <h3 className='!text-[40px] font-[700]'>Chat<span className='text-purple-500'>BOT</span></h3>
          

        </div>  :  <>
        <div className="screen-2 overflow-y-auto w-screen h-[70vh] ">

          {
            data ? data.map((item,index)=>{
              return(
                <>
                  {
                  item.role === "user"? 
                  <div className='user bg-gray-800 rounded-lg w-fit max-w-[40vw] mb-5 ml-[auto] '>
                    <p className="text-[14px] text-gray-400 ">User</p>
                    <p>{item.content}</p>
                  </div>
                  :
                  <div className='ai mb-5 bg-gray-700 rounded-lg mr-[auto]  w-fit max-w-[40vw] ' >
                    <p className="text-[14px] text-gray-400 ">ChatBOT</p>
                    <p>{item.content}</p>
                  </div>
                  
                  }
                
                 
                </>
              )
            }) : "No Messages yet!"
          }
           {
                  loading &&(  <div className="loader"><BeatLoader color='#fff'/></div>)
                 }

        </div>

        </>
      }
        

        
      </div>

      <div className="inputBox h-[20vh] pt-3">
        <div className="input w-[90%]  flex items-center gap-[10px] bg-zinc-800 rounded-lg ">
          <input 
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              getResponse();
            }
          }}
          onChange={(e)=> {setPrompt(e.target.value)}}  value={prompt} type="text" placeholder='Enter your prompt'
           className='flex-1 bg-trensparent p-20px outline-none text-[18px] font-[500]'
           />
        </div>
        <p className='text-[gray] text-center mt-3 '>ChatBOT can make mistakes! cross check it.</p>
      </div>
     </div>
    </>
  )
}

export default App
