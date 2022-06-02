import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import s from './ProfileInfo.module.css'
import {Input} from "@mui/material";

type PropsType = {
    status: string, updateStatusTC: (status: string) => void
}

export function ProfileStatusWithHooks({updateStatusTC, ...props}: PropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {

            setStatus(props.status)
        }, [props.status]
    )

    const activateMode = () => {
        setEditMode(true)
    }
    const deactivateMode = () => {
        setEditMode(false)
        updateStatusTC(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (<>
        {!editMode &&
        <div >
                    <div className={s.doubleClickDirection}>Double click to edit status</div>

            <span className={s.onDoubleClickStatus} onDoubleClick={activateMode}>
               {status || '---'}
            </span>
        </div>
        }
        {editMode &&
        <div>
            <Input
                autoFocus={true}
                onBlur={deactivateMode}
                value={status}
                onChange={onStatusChange}/>
        </div>
        }
    </>)
}
