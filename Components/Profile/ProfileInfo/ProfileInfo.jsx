import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.backFon}>
                <img src='https://c.wallhere.com/photos/ff/a4/uk_seascape_clouds_cornwall_gray_fujifilm_stives_fujix100s-932576.jpg!d' />
            </div>
            <div className={s.descriptionBlock} >
                ava + description
            </div>
        </div>
    )
}
export default ProfileInfo