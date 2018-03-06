
const initialNotification = { text: null, time: null }
let notifTimeout


const notificationReducer = (store = initialNotification, action) => {

  switch (action.type) {

    case 'SHOWNOTIF':
      return { text: action.notiftext, time: action.notiftime }

    case 'RMNOTIF':
      return { text: null, time: null }

    default:
      return store
  }
}


export const showNotification = (notiftext, notiftime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOWNOTIF',
      notiftext,
      notiftime
    })

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