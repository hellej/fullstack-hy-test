
const initialNotification = { text: null, type: null }
let notifTimeout


const notificationReducer = (store = initialNotification, action) => {
  console.log('action: ', action)

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.notification.text, type: action.notification.type }
    case 'RMNOTIF':
      return { initialNotification }
    default:
      return store
  }
}


export const showNotification = (notification, notiftime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOWNOTIF',
      notification
    })
    console.log(notification, notiftime)

    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))
    console.log('WAITED ', notiftime, ' seconds')

    dispatch({
      type: 'RMNOTIF'
    })
  }
}


export const clearNotification = () => {
  return { type: 'RMNOTIF' }
}


export default notificationReducer