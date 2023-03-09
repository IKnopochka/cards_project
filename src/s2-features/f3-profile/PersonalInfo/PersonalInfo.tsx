import React from 'react'
import style from '../Profile.module.scss'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import changePhotoIcon from "../../../s1-main/m1-ui/images/camera.svg";
import {UserType} from "../../../s1-main/m3-dal/authAPI";
import SuperButton from "../../../s1-main/m1-ui/superComponents/c2-SuperButton/SuperButton";

const PersonalInfo = ({profile, onChangeHandler, logoutHandler}: PersonalInfoPropsTypes) => {

    const avaImage = 'https://vjoy.cc/wp-content/uploads/2019/06/9-29.jpg';
    return (
        <div className={style.form}>
            <h2 className={style.title}>Personal Information</h2>
            <div className={style.image}>
                <img src={avaImage} className={style.avatar}/>
                <div className={style.camera}>
                    <img
                        src={changePhotoIcon}
                        alt={'change profile picture'}
                    />
                </div>
            </div>
            <div className={style.name}>
                <EditableSpan value={profile.name} onChange={onChangeHandler}/>

            </div>
            <div className={style.email}>{profile.email}</div>
            <div className={style.changeButton}>
                <SuperButton onClick={logoutHandler}>Log out</SuperButton>
            </div>
        </div>
    )
}
export default PersonalInfo

//types
type PersonalInfoPropsTypes = {
    profile: UserType
    onChangeHandler: (newName: string) => void
    logoutHandler: () => void
}