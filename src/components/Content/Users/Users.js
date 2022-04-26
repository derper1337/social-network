import React, {useEffect, useState} from "react";
import css from "./Users.module.css"
import {NavLink} from "react-router-dom";
import NoAvatarPicture from "../../common/images/User.png"
import AddFriendButton from "../../common/images/AddFriend.png"
import OkButton from "../../common/images/ok.png"
import ArowButton from "../../common/images/arrow.png"
import SearchButton from "../../common/images/search.png"

let Paginator = (props) => {
    let portionSize = 10; //количество порций юзеров
    let pagesCount = Math.ceil(props.pageInfo.pageCount / props.pageInfo.pageSize); // всего страниц
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let [portionNumber, setPortionNumber] = useState(Math.floor(props.pageInfo.currentPage/portionSize) + 1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1; // самое левое число
    let rightPortionNumber = portionNumber * portionSize; // самое правое число
    pages = pages.filter(p => p >= leftPortionNumber && p <= rightPortionNumber).map(p => <span
        key={p}
        className={props.pageInfo.currentPage === p ? css.SelectedPage : css.UnselectedPage}
        onClick={() => props.onPageChange(p)}> {p} </span>);

    return <div className={css.Paginator}>
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}> <img style={{"transform": "scaleX(-1)"}} src={ArowButton} width={"30px"}/>
        </button>
        <div className={css.PageNumbers}>
            {pages}
        </div>
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}> <img src={ArowButton} width={"30px"}/>
        </button>
    </div>
}

let Users = (props) => {

    let unfollow = (userId) => {
        props.unfollowThunkCreator(userId);
    }
    let follow = (userId) => {
        props.followThunkCreator(userId);
    }

    const [search, setSearch] = useState("");

    return (<div className={css.Users}>
        <div className={css.SearchContainer}>
            <div className={css.Searcher}>
                <input value={search} onChange={(event)=>{setSearch(event.currentTarget.value)}}/>
                <button onClick={()=>props.searchUsersThunkCreator(search)}>
                    <img src={SearchButton} width={"30px"}/>
                </button>
            </div>
                <Paginator {...props} />
        </div>
        {
            props.users.length === 0
                ? <div className={css.Warning}> No such users found </div>
                : props.users.map(u => {
                return (
                    <div key={u.name} className={css.UsersContainer}>
                        <NavLink className={css.UserPicture} to={"/profile/" + u.id}>
                            <div>{u.photos.small ? <img src={u.photos.small}/> :
                                <img style={{width: "100px"}} src={NoAvatarPicture}/>}</div>
                        </NavLink>

                        <NavLink className={css.UserName} to={"/profile/" + u.id}>
                            <span>{u.name}</span>
                            <br/>
                            <p>{u.status}</p>
                        </NavLink>

                        <div className={css.UserFollowButton}>
                            {u.followed
                                ? <div>
                                    <span> Followed </span>
                                    <button disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => unfollow(u.id)}><img width={"50px"} src={OkButton}/></button>
                                </div>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => follow(u.id)}><img width={"50px"} src={AddFriendButton}/>
                                </button>}
                        </div>
                    </div>)
            })
        }
    </div>)
}

export default Users;
