import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import ChatMessage from './ChatMessage'
import {generateRandomName, makeRandomMessage} from '../utils/helper';

const LiveChat = () => {
  const [LiveMessage, setLiveMessage] = useState("");
 
    const dispatch = useDispatch();

    const chatMessages = useSelector((store) => store.chat.messages);
    useEffect(() => {
        const i = setInterval(() => {
            //API Polling

          dispatch(addMessage({
              name:generateRandomName(),
              message:makeRandomMessage(20),
          }));
        },2000);

        return () => clearInterval(i);
    }, [LiveMessage,chatMessages]);
  return (
    <>
    <div className="ml-2  h-[500px] p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>{
            chatMessages.map((c, i) =>(
            <ChatMessage key={i}
                name={c.name}
                message={c.message} />
        ))}
        </div>
    </div>
    <form className='flex px-2 w-96 m-full p-2 ml-2 border border-black ' 
    onSubmit={(e) => {
      e.preventDefault();
       dispatch(
         addMessage({
           name:"Prashant Shinde",
           message : LiveMessage,
         })
       );
       setLiveMessage("");
    }}>
      <input  type="text" 
      className='px-2 w-96 m-full p-2 ml-2 border border-black'
       value={LiveMessage}
       onChange = {(e) => {
         setLiveMessage(e.target.value);
       }}
       />
      <button className='px-2 mx-2 bg-green-100 '>Send</button>
    </form>
    </>
  )
}

export default LiveChat
