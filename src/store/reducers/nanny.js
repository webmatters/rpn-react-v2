const nanny = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NANNY_BY_ID':
      return action.nanny

    default:
      return state
  }
}

export default nanny
