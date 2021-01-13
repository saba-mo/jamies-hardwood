/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'
const SET_A_USER = 'SET_A_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
// const defaultUser = {}
// in JPFP started with below. users.js in BoilerMaker is above
const initialState = []

/**
 * ACTION CREATORS
 */
export const destroyUser = (user) => ({
  type: DELETE_USER,
  user: user,
})
export const setUser = (user) => ({
  type: SET_A_USER,
  user: user,
})
export const setUsers = (users) => ({
  type: SET_USERS,
  users: users,
})

/**
 * THUNK CREATORS
 */

export const deleteUser = (user) => async (dispatch, getState, {axios}) => {
  try {
    await axios.delete(`/api/users/${user.id}`)
    dispatch(destroyUser(user))
  } catch (error) {
    console.error('could not delete user: ', error)
  }
}

// removed getState from the variables of the async function. Test to see if works. If it does, then remove getState from the other functions.
export const fetchUser = (userId) => async (dispatch, {axios}) => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(setUser(data))
  } catch (error) {
    console.log('unable to fetch user: ', error)
  }
}

export const fetchUsers = () => async (dispatch, getState, {axios}) => {
  try {
    const {data} = await axios.get(`/api/users/`)
    dispatch(setUsers(data))
  } catch (error) {
    console.log('Unable to fetch all users:', error)
  }
}

/**
 * REDUCER
 */
export default function (users = initialState, action) {
  switch (action.type) {
    case DELETE_USER:
      users = users.filter(
        (user) => parseInt(user.id) !== parseInt(action.user.id)
      )
      return users
    case SET_A_USER:
      users = users.filter(
        (user) => parseInt(user.id) !== parseInt(action.user.id)
      )
      return users.concat([action.user])
    case SET_USERS:
      return action.users

    default:
      return users
  }
}
