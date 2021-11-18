import React from 'react'
import preloader from '../../../assets/preloader.svg'

let Preloader: React.FC<PropsType> = ()=>{
    return <div>
        <img src={preloader} />
    </div>
}
export default Preloader
type PropsType = {

}