import React, { useEffect } from 'react';
import { useState } from 'react';

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    
    useEffect(()=>{
        setStatus(props.status)
    }, [props.status])
    
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        if (status !== props.status) {
            props.updateStatus(status)
        }
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    // componentDidUpdate(prevProps, prevState){
    //     if(this.props !== prevProps){
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }
    return (
        <div >

            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode} >
                        {props.status || '______'}
                    </span>
                </div>
                : <div>
                    <input onChange={onStatusChange} autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status} />
                </div>}
        </div>
    )
}

export default ProfileStatus