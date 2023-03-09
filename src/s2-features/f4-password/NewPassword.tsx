import React, {useState} from 'react';
import {useAppDispatch} from "../../s1-main/m2-bll/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {getNewToken, sendNewToken} from "../../s1-main/m2-bll/auth-reducer";
import style from "./PasswordRestore.module.scss";
import {emailCheck} from "../../s1-main/m1-ui/assets/validation";
import {CommonInput} from "../../s1-main/m1-ui/assets/CommonInput/CommonInput";
import SuperButton from "../../s1-main/m1-ui/superComponents/c2-SuperButton/SuperButton";
import {NavLink, useParams} from "react-router-dom";
import {PATH} from "../f1-header/routes/Pages";
import eye from "../../s1-main/m1-ui/images/eyeIcon.svg";

const NewPassword = () => {
    const dispatch = useAppDispatch()
    const [isPasswordVisible, setIsPasswordVisible] = useState('password')

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(resetPasswordToken)
        // dispatch(getNewToken(data.password, 'sd'))
        console.log(data.password)
    };

    const changePasswordVisible = () => {
        if (isPasswordVisible === 'password') {
            setIsPasswordVisible('text')
        } else {
            setIsPasswordVisible('password')
        }
    }
    let {resetPasswordToken} = useParams()

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={style.title}>Create new password</h1>
                <Controller
                    rules={{
                        minLength: {value: 6, message: 'Minimum length of password is 6 symbols'},
                        required: 'Field is required',
                        maxLength: {value: 30, message: 'Maximum length of password is 30 symbols'},
                    }}
                    control={control}
                    name="password"
                    render={({field: {onChange}}) => (
                        <div className={style.item}>
                            <CommonInput
                                autoComplete={'new-password'}
                                onChange={onChange}
                                error={errors.password?.message}
                                fieldname={'Password'}
                                type={isPasswordVisible}
                            />
                            <img
                                onClick={changePasswordVisible}
                                className={style.eyeIcon}
                                src={eye}
                                alt={'show Password'}
                            />
                        </div>
                    )}
                />

                <p> Create new password and we will send you further instructions to email</p>
                <SuperButton
                    style={{marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem'}}
                    type="submit"
                >
                    Create new password
                </SuperButton>
            </form>
        </div>
    )
};

export default NewPassword;

interface FormValues {
    password: string
}