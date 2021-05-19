import React from 'react';
import s from './Users.module.css'
import userIcon from '../../assets/userIcon.png'
const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for(let i = 1; i<=pagesCount; i++){
        if(i <= 15){
          pages.push(i)  
        }
        
    }
    return (
        <div>
            <div>
                {pages.map(p=>{
                    return <span className={props.currentPage === p && s.selectedPage}
                    onClick={(e)=>{
                        props.onPageChanged(p)
                    }} > {p} </span>
                })}
            </div>
            
            <div>
                {
                    props.users.map(u => <div>
                                <div >
                                    <img className={s.userPhoto} src={u.photos.large != null ? u.photos.large : userIcon }/>
                                </div>
                                <div>
                                    { u.followed
                                        ? <button onClick={() => {
                                            props.unfollowUser(u.id)
                                        }} >Unfollow</button>
                                        : <button onClick={() => {
                                            props.followUser(u.id)
                                        }
                                        } >Follow</button>} 
                                </div>
                            
                            <div>
                                
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                
                            </div>
                        </div>
                    )
                }
            </div>
            <div></div>
        </div>
    )
}
export default Users