import css from "./Profile.module.css"
import React, {PureComponent, useEffect, useState} from "react";
import Preloader from "../../common/preloader/preloader";
import {updateAvatarThunkCreator} from "../../../Redux/profileReducer";
import AddFriendButton from "../../common/images/AddFriend.png"
import OkButton from "../../common/images/ok.png"
import SettingsButton from "../../common/images/Settings.png"
import ChangeAvaButton from "../../common/images/ChangeAvatar.png"
import MessageButton from "../../common/images/Message.png"
import SendPostButton from "../../common/images/send.png"
import { Transition } from 'react-transition-group';
import NoAvatarPicture from "../../common/images/User.png"
import {useNavigate} from "react-router";
import Messages from "../Messages/Messages";


const Post = (props) => {
    return <div className={css.Post}>
        <img width={"60px"} src={props.profileInfo.profile.photos.small
            ? props.profileInfo.profile.photos.small
            : NoAvatarPicture
        }/>
        <div>
            <span>{props.profileInfo.profile.fullName}</span>
            <p>{props.text}</p>
        </div>
    </div>
}

class ProfileStatus extends PureComponent {
    state = {
        editMode: false, status: this.props.status,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (<div>
            <div> {this.state.editMode ? <input onChange={this.onStatusChange} value={this.state.status} onBlur={() => {
                this.setState({editMode: false});
                this.props.updateStatus(this.state.status);
            }}/> : <div onClick={() => {
                this.setState({editMode: true});
            }}>{this.props.status || "no status"}</ div>}
            </div>
        </div>)
    }
}
let idCrutch = 0;


const Profile = (props) => {

    let unfollow = (userId) => {
        props.unfollowThunkCreator(userId);
    }
    let follow = (userId) => {
        props.followThunkCreator(userId);
    }

    let postElements = props.ProfileData.posts.map(p => <Post profileInfo={props.ProfileData} text={p.text}
                                                              key={idCrutch++}/>);
    let text = React.createRef();
    const [editMode, setEditMode] = useState(false);
    const [localProfile, setLocalProfile] = useState({});
    useEffect(() => {
        setLocalProfile({...props.ProfileData.profile});
    }, [props.ProfileData.profile])
    let navigate = useNavigate();

    if (!props.ProfileData.profile) {
        return <Preloader/>
    }
    return (<div className={css.Profile}>

        <div className={css.Columns}>
            <div className={css.LeftColumn}>
                <img className={css.ProfilePicture}
                     src={props.ProfileData.profile.photos.large ? props.ProfileData.profile.photos.large : NoAvatarPicture}/>

                <div className={css.UnderPicture}>
                    {(props.myId === props.userId)
                        ? <div style={{display: "flex", justifyContent: "space-between"}}>
                            <button className={css.UserButton} onClick={() => {
                                if (editMode) props.updateProfileThunkCreator(localProfile);
                                setEditMode(!editMode);
                            }}> {editMode
                                ? <img width={"40px"} src={OkButton}/>
                                : <img width={"40px"} src={SettingsButton}/>}</button>
                            <label htmlFor={"avatar"} className={css.Label}>
                                <img width={"40px"} src={ChangeAvaButton}/>
                                <input className={css.AvatarInput} type={"file"} id={"avatar"} onChange={() => {
                                    let avatar = document.getElementById('avatar').files[0];
                                    props.updateAvatarThunkCreator(avatar);
                                }}/>
                            </label>
                        </div>
                        : <div>
                            <button onClick={()=>follow(localProfile.userId)} className={css.UserButton}><img width={"40px"} src={AddFriendButton}/></button>
                            <button onClick={()=>{
                                follow(localProfile.userId);
                                navigate("/messages/"+localProfile.fullName)
                            }} className={css.UserButton}><img width={"40px"} src={MessageButton}/></button>
                        </div>}
                </div>

            </div>

            <div className={css.RightColumn}>
                <div><span className={css.Name}>{props.ProfileData.profile.fullName}</span></div>
                <div className={css.Status}><ProfileStatus status={props.ProfileData.status}
                                                           updateStatus={props.updateStatus}/></div>

                <div className={css.Info}>
                    {/*about me*/}
                    <div className={css.AboutMe}>
                        <div style={{display: "inline"}}>About me:</div>
                        {editMode
                            ? <input className={css.AboutMeInput} style={{display: "inline"}} onChange={(event) => {
                                setLocalProfile({...localProfile, aboutMe: event.currentTarget.value})
                            }
                            } type={"text"} value={localProfile.aboutMe || ""}/>
                            : <div
                                style={{display: "inline"}}>{localProfile.aboutMe ?
                                <span>{localProfile.aboutMe}</span> : <span>no info</span>}</div>}
                    </div>
                    {/*looking for a job*/}
                    <div className={css.LookingForAJob}>
                        <div style={{display: "inline"}}>Looking for a Job:</div>
                        {editMode
                            ? <input onChange={() => {
                                setLocalProfile({
                                    ...localProfile,
                                    lookingForAJob: !localProfile.lookingForAJob,
                                    lookingForAJobDescription: "nothing here"
                                })
                            }} type={"checkbox"} checked={localProfile.lookingForAJob}/>
                            : <div style={{display: "inline"}}>{localProfile.lookingForAJob ? <span>yes</span> :
                                <span>no</span>}</div>}
                    </div>
                    {/*{vk}*/}
                    <div className={css.Contacts}>
                        <div style={{display: "inline"}}>{"vk: "}</div>
                        {editMode
                            ? <input style={{display: "inline"}} onChange={(event) => {
                                setLocalProfile({
                                    ...localProfile,
                                    contacts: {...localProfile.contacts, vk: event.currentTarget.value}
                                })
                            }
                            } type={"text"} value={localProfile.contacts.vk || ""}/>
                            : <div
                                style={{display: "inline"}}>{localProfile.contacts ? localProfile.contacts.vk ?
                                    <span>{localProfile.contacts.vk}</span> : <span>no info</span> :
                                <span>no info</span>}</div>}
                    </div>
                    {/*github*/}
                    <div className={css.Contacts}>
                        <div style={{display: "inline"}}>{"github: "}</div>
                        {editMode
                            ? <input style={{display: "inline"}} onChange={(event) => {
                                setLocalProfile({
                                    ...localProfile,
                                    contacts: {...localProfile.contacts, github: event.currentTarget.value}
                                })
                            }
                            } type={"text"} value={localProfile.contacts.github || ""}/>
                            : <div
                                style={{display: "inline"}}>{localProfile.contacts ? localProfile.contacts.github ?
                                    <span>{localProfile.contacts.github}</span> : <span>no info</span> :
                                <span>no info</span>}</div>}
                    </div>
                    {/*website*/}
                    <div className={css.Contacts}>
                        <div style={{display: "inline"}}>{"website: "}</div>
                        {editMode
                            ? <input style={{display: "inline"}} onChange={(event) => {
                                setLocalProfile({
                                    ...localProfile,
                                    contacts: {...localProfile.contacts, website: event.currentTarget.value}
                                })
                            }
                            } type={"text"} value={localProfile.contacts.website || ""}/>
                            : <div
                                style={{display: "inline"}}>{localProfile.contacts ? localProfile.contacts.website ?
                                    <span>{localProfile.contacts.website}</span> : <span>no info</span> :
                                <span>no info</span>}</div>}
                    </div>
                </div>
            </div>
        </div>


        {(props.myId === props.userId)
            ? <div className={css.PostMenu}>
        <textarea onChange={() => props.textareaChange(text)}
                  ref={text}
                  value={props.ProfileData.newPostText.text}>
        </textarea>
                <button className={css.AddPostButton} onClick={() => {
                    props.addPost();
                }}><img src={SendPostButton} width={"40px"}/>
                </button>
            </div>
        : null}
        <div className={css.MyPosts}>
            {postElements}
        </div>
    </div>);


    // return (
    //     <div className={css.Profile}>
    //         <div className={css.ProfileName}>{props.ProfileData.profile.fullName}</div>
    //         <img className={css.ProfilePicture}
    //              src={props.ProfileData.profile.photos.large}/>
    //         <br/>
    //         <div>
    //             {props.isOwner && <input type={"file"}/>}
    //         </div>
    //         <ProfileStatus status={props.ProfileData.status} updateStatus={props.updateStatus}/>
    //         <br/>
    //         <textarea onChange={() => props.textareaChange(text)}
    //                   ref={text}
    //                   value={props.ProfileData.newPostText.text}>
    //         </textarea>
    //         <br/>
    //         <button onClick={() => {
    //             props.addPost();
    //         }}>Add new post
    //         </button>
    //         <br/>
    //         <div className={css.MyPosts}>
    //             {postElements}
    //         </div>
    //     </div>);
}
export default Profile;