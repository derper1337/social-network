import {NavLink, Navigate, Route, Routes} from "react-router-dom";
import css from "./Messages.module.css"
import React, {useEffect, useState} from "react";
import SendPostButton from "../../common/images/send.png";
import WarningImage from "../../common/images/warning.png";
import DeleteButton from "../../common/images/delete.png";

let crutch429 = false;
const DialogItem = (props) => {
    return <div className={css.DialogItem}>
        <button onClick={()=> {
            try {
                props.deleteFriend(props.userId)
            }
            catch {
                crutch429 = true
            }
        }}><img width={"10px"} src={DeleteButton}/></button>
        <NavLink onClick={() => {
            props.setActiveDialog(props.name)
        }}       className={props.messageData.activeDialog === props.name ? css.active : null}
                 to={"/messages/" + props.name}><span>{props.name}</span></NavLink>
    </div>
}
const MessageItem = (props) => {
    return <div className={css.MessageItem}>
        <div className={css.Message}>
            <span className={css.MessageContent}>{props.message}</span>
        </div>
    </div>
}
let idCrutch = 0;
const Messages = (props) => {

    let text = React.createRef();
    const dialogList = props.messageData.friends.map(d => <DialogItem
        messageData={props.messageData}
        setActiveDialog={props.setActiveDialog}
        userId={d.id}
        deleteFriend={props.deleteFriend}
        id={d.id} name={d.name} key={d.id}/>);
    let messageList = props.messageData.dialogs.map(m => <Route
        path={m.name}
        key={m.name}
        element={m.messages.map(ml => <MessageItem message={ml.message} name={props.login} key={idCrutch++}/>)}/>);

    return <div className={css.Messages}>
        <div className={css.LeftColumn}>
            {dialogList}
        </div>
        <div className={css.RightColumn}>
            <div className={css.MessageWarning}>
                <img src={WarningImage} width={"40px"}/>
                <span>Current version of API doesn't support proper message exchange, this page exist as a space for
                future improvement!</span>
            </div>
            <div className={css.MessageSpace}>
                <Routes>
                    {messageList}
                </Routes>
            </div>
            <div className={css.MessagePanel}>
                <textarea ref={text}
                          value={props.messageData.newMessageText.message}
                          onChange={() => props.textareaChange(text.current.value)}
                          placeholder={"Enter your message..."}
                          onFocus={()=>{
                              let flag = 0;
                              if (props.messageData.activeDialog === "") {
                                  text.current.placeholder = "Select a dialog"
                                  text.current.blur();
                                  flag = 1;
                              }
                              if (flag == 0){
                                  text.current.placeholder = "Enter your message..."
                              }
                          }}
                          onKeyDown={(event)=>{
                              if (event.key === "Enter"){
                                  event.preventDefault();
                                  props.addMessage();
                              }}}/>
                <button onClick={() => {
                    props.addMessage();
                }}><img src={SendPostButton} width={"40px"}/>
                </button>
            </div>
        </div>
        {crutch429
            ? <div className = {css.Warning} > Too many requests, please wait a little! < /div>
            : null}
    </div>


    // let messageList;
    // let dialogList = props.messageData.dialogs.map(d => <DialogItem dialogName={d.name} key={d.name}/>);
    // let messages = props.messageData.dialogs.map(m => <Route
    //     path={m.name}
    //     key={m.name}
    //     element={messageList = m.messages.map(ml => <MessageItem message={ml.message} key={ml.message}/>)}>
    // </Route>);
    // let text = React.createRef();
    // return (
    //     <div className={css.Messages}>
    //         <div className={css.leftbar}>
    //             {dialogList}
    //         </div>
    //         <div className={css.rightBar}>
    //             <Routes>
    //                 {messages}
    //             </Routes>
    //             <textarea ref={text}
    //                       value={props.messageData.newMessageText.message}
    //                       onChange={() => props.textareaChange(text)}></textarea>
    //             <br/>
    //             <button onClick={() => {
    //                 props.addMessage()
    //             }}> send
    //             </button>
    //
    //         </div>
    //     </div>
    // );
}

export default Messages;