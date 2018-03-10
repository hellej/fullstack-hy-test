import React from 'react'

const Notification = ({ notif }) => {
  return (
    <div className={notif.type}>
      {notif.text}
    </div>
  )
}

export default Notification