import SuperInputText from "../../../s1-main/m1-ui/superComponents/c1-SuperInputText/SuperInputText";
import React, {ChangeEvent, useState} from "react";
import changeNameIcon from "../../../s1-main/m1-ui/images/pencil.svg";
import s from './EditableSpan.module.scss'
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log("EditableSpan called");
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>
            {props.value}
            <img
                src={changeNameIcon}
                className={s.pen}
                alt={'change name'}
            />
    </span>
});