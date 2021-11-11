import React from "hoist-non-react-statics/node_modules/@types/react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { actions } from "../../redux/dialogs-reducer"
import { AppStateType } from "../../redux/redux-store"
import { getDialogsData, getDialogsMessages } from "../../redux/users-selectors"
import Dialogs from "./Dialogs"

let mapStateToProps = (state: AppStateType)=>{
    return {
        messages: getDialogsMessages(state),
        dialogs: getDialogsData(state)
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)