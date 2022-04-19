import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css'

type ProfileStatusPropsType = { status: string, updateStatusTC: (status: string) => void }

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {editMode: false, status: this.props.status}

    activateEditMode = () => {
        this.setState({editMode: true});
    }
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatusTC(this.state.status)
    }
    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: event.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (<>
            {!this.state.editMode &&
            <div>
            <span onDoubleClick={this.activateEditMode}>
                {this.props.status || '---'}
            </span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input
                    autoFocus={true}
                    onBlur={this.deactivateEditMode}
                    value={this.state.status}
                    onChange={this.onStatusChange}/>
            </div>
            }
        </>)
    }
}

export default ProfileStatus