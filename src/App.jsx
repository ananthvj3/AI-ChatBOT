import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { GoogleGenAI } from "@google/genai";
import {BeatLoader} from 'react-spinners'



function App() {

  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)
  const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

  let messages = [];
  

  const [data,setData] = useState(messages);

 async function getResponse() {
  if (prompt === "" || loading) return;

  const userMessage = prompt;
  setPrompt("");

  setData(prev => [
    ...prev,
    { role: "user", content: userMessage }
  ]);

  setScreen(2);
  setLoading(true);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
    });

    setData(prev => [
      ...prev,
      { role: "ai", content: response.text }
    ]);

  } catch (error) {
    console.log(error);

    setData(prev => [
      ...prev,
      { role: "ai", content: "Error getting response." }
    ]);

  } finally {
    setLoading(false);
  }
}

  return (
    <>
     <div className='w-screen h-screen flex flex-col overflow-hidden'>
    
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
                  <div className='user bg-gray-800 rounded-lg w-fit max-w-[40vw] mb-5 ml-[auto] overflow-x-scroll '>
                    <p className="text-[14px] text-gray-400 ">User</p>
                    <p>{item.content}</p>
                  </div>
                  :
                  <div className='ai mb-5 bg-gray-700 rounded-lg   w-fitt max-w-[70vw] overflow-x-scroll' >
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
        <div className="input w-[90%]  flex items-center gap-[10px] bg-zinc-800 rounded-lg overflow-x-hidden">
          <input 
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              getResponse();
            }
          }}
          onChange={(e)=> {setPrompt(e.target.value)}}  value={prompt} type="text" placeholder='Enter your prompt'
           className='flex-1 bg-transparent p-5 outline-none text-[18px] font-[500]'
           />
        </div>
        <p className='text-[gray] text-center mt-3 '>ChatBOT can make mistakes! cross check it.</p>
      </div>
     </div>
    </>
  )
}

export default App
