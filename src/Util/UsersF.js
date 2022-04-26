import React from "react";
import css from "./Users.module.css";
import axios from "axios";

const Users = (props) => {

    let jopa = (page) =>{
        props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${props.pageInfo.pageSize}`, {
            withCredentials:true}).then(response => {
            props.setUsers(response.data.items);})}
    let newUsers = [{}];
    let pagesCount = Math.ceil(props.pageInfo.pageCount / props.pageInfo.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    pages = pages.map(p => <span
        className={props.pageInfo.currentPage === p && css.SelectedPage}
        onClick={() => props.onPageChange(p)}> {p} </span>);

    return <div>
        {pages}

        {props.users.map(u => {
            return (
                <div>
                    {u.name}
                    <br/>
                    {
                        u.followed
                            ? <button onClick={() => props.unfollow(u.id)}> unfollow </button>
                            : <button onClick={() => props.follow(u.id)}> follow </button>
                    }
                </div>)
        })
        }
    </div>
}

export default Users;