import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.log('single product thunk error: ', err)
    }
  }
}

const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
