//ACTION TYPES
const GET_USERS = 'GET_USERS';
const SEE_A_USER = 'SEE_A_USER';
const DELETE_USER = 'DELETE_USER';

//ACTION CREATORS
export const destroyUser = (user) => ({
  type: DELETE_USER,
  user: user,
});
export const setUser = (user) => ({
  type: SEE_A_USER,
  user: user,
});
export const setUsers = (users) => ({
  type: GET_USERS,
  users: users,
});

//THUNK CREATORS

export const deleteUser = (user) => async (dispatch, getState, {axios}) => {
  try {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(destroyUser(user));
  } catch (error) {
    console.error('could not delete user: ', error);
  }
};

export const fetchUser = (userId) => async (dispatch, getState, {axios}) => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`);
    dispatch(setUser(data));
  } catch (error) {
    console.log('Unable to fetch user: ', error);
  }
};

export const fetchUsers = () => async (dispatch, getState, {axios}) => {
  try {
    const {data} = await axios.get(`/api/users/`);
    dispatch(setUsers(data));
  } catch (error) {
    console.log('Unable to fetch all users:', error);
  }
};

//INITIAL STATE
const initialState = [];

//REDUCER
export default function (users = initialState, action) {
  switch (action.type) {
    case DELETE_USER:
      users = users.filter(
        (user) => parseInt(user.id) !== parseInt(action.user.id)
      );
      return users;
    case SEE_A_USER:
      users = users.filter(
        (user) => parseInt(user.id) !== parseInt(action.user.id)
      );
      return users.concat([action.user]);
    case GET_USERS:
      return action.users;
    default:
      return users;
  }
}
