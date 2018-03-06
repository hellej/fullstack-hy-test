

const initialFilter = ''

const filterReducer = (store = initialFilter, action) => {
  console.log('action: ', action)

  switch (action.type) {
    case 'UPDATEFILTER':
      return action.data.filter

    default:
      return store
  }
}


export const updateFilter = (filter) => {
  return { type: 'UPDATEFILTER', data: { filter } }
}


export default filterReducer