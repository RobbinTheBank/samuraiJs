import React from 'react';
import { useState } from 'react';
import s from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, boxSize = 20 }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
}
    let [boxNumber, setBoxNumber] = useState(1)
    let left = ((boxNumber -1 ) * boxSize) + 1
    let rigth = boxNumber * boxSize
    let boxPageCount = Math.ceil(pagesCount / boxSize)
    
    return <div className={s.paginator}  >
       {boxNumber > 1 && <button onClick ={()=>{setBoxNumber(boxNumber - 1)}} >Prev</button>}
        {pages.filter(p=> p >= left && p <= rigth)
        .map(p => {
            return <span className={currentPage === p && s.selectedPage}
                key={p}
                onClick={(e) => {
                    onPageChanged(p)
                }} > {p}  </span>
        })}
        {boxPageCount > boxNumber && <button onClick={()=>{setBoxNumber(boxNumber + 1)}} >Next</button>}
    </div>

}
export default Paginator