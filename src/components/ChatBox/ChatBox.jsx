import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'


const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Richard Sanford <img className='dot' src={assets.green_dot} alt="" /> </p>
        <img src={assets.help_icon} alt="" className='help' />
      </div>


      <div className="chat-message">
        <div className="sender-message">
          <p className="message">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30pm</p>
          </div>
        </div>
        
        <div className="sender-message">
          <img className='message-img' src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30pm</p>
          </div>
        </div>
        <div className="receiver-message">
          <p className="message">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30pm</p>
          </div>
        </div>
      </div>
      
      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />

      </div>
    </div>
  )
}

export default ChatBox
