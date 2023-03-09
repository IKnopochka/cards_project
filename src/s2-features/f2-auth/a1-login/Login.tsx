import React, {FC, useState} from 'react'
import {NavLink} from 'react-router-dom'
import style from './Login.module.scss'
import {useAppDispatch, useAppSelector} from "../../../s1-main/m2-bll/store";
import {useForm, Controller} from "react-hook-form";
import {emailCheck} from "../../../s1-main/m1-ui/assets/validation";
import {CommonInput} from "../../../s1-main/m1-ui/assets/CommonInput/CommonInput";
import SuperButton from "../../../s1-main/m1-ui/superComponents/c2-SuperButton/SuperButton";
import eye from '../../../s1-main/m1-ui/images/eyeIcon.svg'
import {LoginType} from "../../../s1-main/m3-dal/authAPI";
import {PATH} from "../../f1-header/routes/Pages";
import {login} from "../../../s1-main/m2-bll/auth-reducer";
import { Navigate } from 'react-router-dom'

export const Login: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<LoginType>()

    const onSubmit = (data: LoginType) => {
        dispatch(login({email: data.email, password: data.password}))
    }

    const [isPassVisible, setIsPassVisible] = useState('password')

    const changePass1Visible = () => {
        if (isPassVisible === 'password') {
            setIsPassVisible('text')
        } else {
            setIsPassVisible('password')
        }
    }

    if(isLoggedIn) return <Navigate to={PATH.PROFILE}/>

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={style.title}>Log in</h1>
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
                                autoComplete={'Email'}
                                onChange={onChange} // send value to hook form
                                error={errors.email?.message}
                                fieldname={'Email'}
                            />
                        </div>
                    )}
                />
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
                                onChange={onChange} // send value to hook form
                                error={errors.password?.message}
                                fieldname={'Password'}
                                type={isPassVisible}
                            />
                            <img
                                onClick={changePass1Visible}
                                className={style.eyeIcon}
                                src={eye}
                                alt={'show Password'}
                            />
                        </div>
                    )}
                />
                <SuperButton
                    style={{marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem'}}
                    type="submit"
                >
                    Sign in
                </SuperButton>
                <NavLink className={style.navLinkSignIn} to={PATH.PASSWORD_RESTORE}>
                    Forgot your password?
                </NavLink>
            </form>
        </div>
    )
}


// return (
//     <div className={s.segment}>
//         <Paper style={{padding: '10px'}}>
//             <div className={s.container}>
//                 <h2>Log in</h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Controller
//                         rules={{
//                             pattern: {
//                                 value: emailCheck,
//                                 message: 'Email is not valid',
//                             },
//                             required: 'Field is required',
//                             maxLength: {value: 30, message: 'Maximum length of email is 30 symbols'},
//                         }}
//                         control={control}
//                         name="email"
//                         render={({field: {onChange}}) => (
//                             <div>
//                                 <CommonInput
//                                     autoComplete={'Email'}
//                                     onChange={onChange} // send value to hook form
//                                     error={errors.email?.message}
//                                     fieldname={'Email'}
//                                 />
//                             </div>
//                         )}
//                     />
//                     <Controller
//                         rules={{
//                             minLength: {value: 6, message: 'Minimum length of password is 6 symbols'},
//                             required: 'Field is required',
//                             maxLength: {value: 30, message: 'Maximum length of password is 30 symbols'},
//                         }}
//                         control={control}
//                         name="password"
//                         render={({field: {onChange}}) => (
//                             <div>
//                                 <CommonInput
//                                     autoComplete={'new-password'}
//                                     onChange={onChange} // send value to hook form
//                                     error={errors.password?.message}
//                                     fieldname={'Password'}
//                                     type={isPassVisible}
//                                 />
//                                 <img
//                                     onClick={changePass1Visible}
//                                     className={s.eyeIcon}
//                                     src={eye}
//                                     alt={'show Password'}
//                                 />
//                             </div>
//                         )}
//                     />
//                     <SuperButton
//                         style={{marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem'}}
//                         type="submit"
//                     >
//                         Sign in
//                     </SuperButton>
//                     <NavLink className={s.navLinkHaveAnAcc} to={PATH.PASSWORD_RESTORE}>
//                         Forgot your password?
//                     </NavLink>
//                 </form>
//             </div>
//         </Paper>
//     </div>
//
// )

// <div>
//     <div className={s.segment}>
//         <Paper style={{padding: '10px'}}>
//             <div className={s.container}>
//                 <h2>Log in</h2>
//
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <input placeholder='Email' {...register("email", {
//                         required: 'Email is required',
//                         pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "invalid email address"
//                         }
//                     })}/>
//                     <p>{errors.email?.message}</p>
//
//
//                     <input type={"password"}
//                            placeholder='Password'
//                            {...register("password", {
//                                required: "Password is required",
//                                minLength: {value: 4, message: "Password must be more than 4 characters"},
//                                maxLength: {value: 12, message: "Password cannot exceed more than 12 characters"}
//                            })}/>
//                     <p>{errors.password?.message}</p>
//                     <label>
//                         <input
//                             type='checkbox'
//                             {...register('rememberMe')}
//                         />
//                         remember me?
//                     </label>
//                     <input type={'submit'}/>
//                 </form>
//             </div>
//         </Paper>
//     </div>
// </div>