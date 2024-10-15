import React, {useState} from 'react'
import myimage from "../../Image/istockphoto.jpg";
import './Chatbot.css';
import ChatMessage from './ChatMessage';
import { analyze } from './utils';
const Chatbot = () => {
   const [message,setMessage] = useState([
    {
       message: "Hi, May I have your name?",
    }
   ])
 
  const [text,setText] = useState('');

  const onSend = () => {
    let list = [...message, {message: text, user: true}];
    if(list.length>2){
       const reply = analyze(text)
       list =  [...list, {message: reply}]
    }
    else{
        list = [
            ...list,{
                message: `Hi, ${text}`,
            },
            {
                message: "How can i help you?",
            },
        ];
    }
    setMessage(list)
    setText("")
    setTimeout(() => {
        document.querySelector('copyright-chat-243').scrollIntoView();
    }, 1);
  }
  return (
    <div>
      <div className='row-chat-243'>
        <img src={myimage} className='img-chat-243' alt="logo"/>
      <h2 className='text-primary-chat-243'>Chatbot</h2>
      </div>

      <div className="chat-message-243">
        {message.length > 0 && message.map((data) => <ChatMessage {...data}  />)}
        <div className='chatbox-243'>
            <input type='text' className='chat-box-input-243' value={text} onChange={(e) => setText(e.target.value)}/>
            <button className='button-2-chat-243' onClick={onSend}>Send</button>
        </div>
        <div id='copyright-chat-243' className='copyright-243'>Copyrights reserved Jobhunt</div>
      </div>
    </div>
    
  )
}

export default Chatbot
