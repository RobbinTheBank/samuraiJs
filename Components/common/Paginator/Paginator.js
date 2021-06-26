import React from 'react';
import s from './Paginator.module.css'

const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        if (i <= 15) {
            pages.push(i)
        }
    }
    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p && s.selectedPage}
                onClick={(e) => {
                    props.onPageChanged(p)
                }} > {p} </span>
        })}
    </div>

}
export default Paginator