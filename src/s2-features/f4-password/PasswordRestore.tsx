import React from 'react';
import style from './PasswordRestore.module.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {sendNewToken} from "../../s1-main/m2-bll/auth-reducer";
import {useAppDispatch} from "../../s1-main/m2-bll/store";
import {NavLink} from "react-router-dom";
import {PATH} from "../f1-header/routes/Pages";
import {emailCheck} from "../../s1-main/m1-ui/assets/validation";
import SuperButton from "../../s1-main/m1-ui/superComponents/c2-SuperButton/SuperButton";
import {CommonInput} from "../../s1-main/m1-ui/assets/CommonInput/CommonInput";



const PasswordRestore = () => {
    const dispatch = useAppDispatch()

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        dispatch(sendNewToken(data.email))
    };
    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={style.title}>Forgot your password?</h1>
                <Controller
                    rules={{
                        pattern: {
                            value: emailCheck,
                            message: 'Email is not valid',
                        },
                        required: 'Field is required',
                        maxLength: {value: 30, message: 'Maximum length of email is 30 symbols'},
                    }}
                    control={control}
                    name="email"
                    render={({field: {onChange}}) => (
                        <div className={style.item}>
                            <CommonInput
                                autoComplete={'email'}
                                onChange={onChange} // send value to hook form
                                error={errors.email?.message}
                                fieldname={'Email'}
                            />
                        </div>
                    )}
                />

                <p> Enter you email adress and we will send you further instructions</p>
                <SuperButton
                    style={{marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem'}}
                    type="submit"
                >
                    Submit
                </SuperButton>
                <p>Did you remember you password?</p>

                <NavLink className={style.navLinkSignIn} to={PATH.LOGIN}>
                    Try logging in
                </NavLink>
            </form>
        </div>
    )

};
export default PasswordRestore;

//types
interface FormValues {
    email: string
}