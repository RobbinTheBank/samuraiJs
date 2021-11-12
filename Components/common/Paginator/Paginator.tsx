import React from 'react';
import { useState } from 'react';
//@ts-ignore
import style from './Paginator.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage?: number
    onPageChanged: (pageNumber: number)=>void 
    boxSize?: number 
}
const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, boxSize = 20 }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
}
console.log(currentPage)
    let [boxNumber, setBoxNumber] = useState(1)
    let left = ((boxNumber -1 ) * boxSize) + 1
    let rigth = boxNumber * boxSize
    let boxPageCount = Math.ceil(pagesCount / boxSize)
    
    return <div className={style.paginator}  >
       {boxNumber > 1 && <button onClick ={()=>{setBoxNumber(boxNumber - 1)}} >Prev</button>}
        {pages.filter(p=> p >= left && p <= rigth)
        .map(p => {
            //@ts-ignore
            return <span className={currentPage === p && style.selectedPage}
                key={p}
                onClick={(e) => {
                    onPageChanged(p)
                }} > {p}  </span>
        })}
        {boxPageCount > boxNumber && <button onClick={()=>{setBoxNumber(boxNumber + 1)}} >Next</button>}
    </div>

}
export default Paginator