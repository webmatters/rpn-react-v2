const nannies = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_NANNIES':
      return action.nannies

    case 'CREATE_NANNY':
      return [...state, action.nanny]

    default:
      return state
  }
}

export default nannies
