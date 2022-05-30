import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string, updateStatusTC: (status: string) => void
}

export function ProfileStatusWithHooks({updateStatusTC, ...props}: PropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

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
        <div>
            <span onDoubleClick={activateMode}>
                {status || '---'}
            </span>
        </div>
        }
        {editMode &&
        <div>
            <input
                autoFocus={true}
                onBlur={deactivateMode}
                value={status}
                onChange={onStatusChange}/>
        </div>
        }
    </>)
}


