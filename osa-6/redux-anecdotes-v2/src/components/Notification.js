import React from 'react'
import { clearNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'


// let notifTimeout


class Notification extends React.Component {

  // setNewTimeout = (func) => {
  //   clearTimeout(notifTimeout)
  //   notifTimeout = setTimeout(() => {
  //     func()
  //   }, this.props.notification.time * 1000)
  // }

  // componentDidUpdate() {
  //   if (this.props.notification.text !== null) {
  //     this.setNewTimeout(this.props.clearNotification)
  //   }
  // }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: this.props.notification.text === null ? 'none' : ''
    }

    return (
      <div style={style}>
        {this.props.notification.text}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const ConnectedNotification = connect(mapStateToProps, { clearNotification }) (Notification)

export default ConnectedNotification
