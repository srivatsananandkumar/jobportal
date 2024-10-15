import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css';

export default function ChatMessage(props) {
  return (
    <div className={`main-message-243 ${props.user && 'justify-user-chat-243'}`}>
      {props.user ? (
        <span className='span-chatmessage-243-1'>
        <span className='msg-text-chat-243'>{props.message}</span>
        <FontAwesomeIcon icon={faUser}className='msg-icon-243'/>
        </span>
        

      ) : (
        <span className='span-chatmessage-243-2'>
            <FontAwesomeIcon icon={faCommentDots} className='msg-icon-243' /> 
            <span className='msg-text-chat-243'>{props.message}</span>
        </span>
      )}
    </div>
  )
}


