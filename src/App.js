import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LandingPage from "./components/LandingPage";
function App() {

  // console.log("app"); //  TO CHECK EVENT BUBLING


  //  ******************    THIS STATE STORE USER INPUT AFTER SUBMIT   ****************
  const [getInfo,setGetInfo]= useState(null);


  // ***************      THIS STATE STORE AI RESPONSE         ***************************8
  const [aiRes,setAiRes] = useState('');


  // ********************       FUNCTION TO FETCH AI API RESPONSE         **************************8

  async function fetchApi() {

    const options = {
    method: 'POST',
    url: 'https://simple-chatgpt-api.p.rapidapi.com/ask',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '8d493d71f0msh32a691079eb2435p13c483jsn3c9ad4e873e3',
      'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
    },
    data: {
      // ******************      HERE  YOUR ALSO SEND ENTIRE QUESTION OF USER   ******************************
      question: `Best ${getInfo.product} of ${getInfo.company} under ${getInfo.price} `
    }
  };

  try {
    const response = await axios.request(options);

    // ***************     CHECK WHAT API GIVE RESPONSE      ******** *
    // console.log(response.data);

    setAiRes(response.data.answer)
  } catch (error) {
    // ***************     CHECK WHAT API GIVE ERROR      ******** *
    // console.error(error);

    setAiRes('There is some technical problem ')
  }

  }

  //  *****************     THIS USEEFFECT RENDER  WHEN EVER GETINFO CHANGED        ********************
  useEffect(()=>{
    if (getInfo !==null){
         fetchApi();
        }
    },[getInfo])

  return (
    <>
      <LandingPage setGetInfo={setGetInfo} aiRes={aiRes}/>
    
    </>
  );
}

export default App;
