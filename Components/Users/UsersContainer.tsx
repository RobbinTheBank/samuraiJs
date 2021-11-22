import React from 'react'
import { useSelector } from "react-redux";
import Preloader from '../common/Preloader/Preloader';
import Users from "./Users";
import {getIsFething} from '../../redux/selectors/users-selectors'

export const UsersContainer: React.FC<UsersContainerProps> = (props)=>{
    const isFetching = useSelector(getIsFething)
    return <>
        <h2>users</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}

type UsersContainerProps = {
    
}   

