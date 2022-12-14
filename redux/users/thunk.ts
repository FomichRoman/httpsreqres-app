import { IUser } from './reduser';
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk/es/types";
import { likeUser, savePageUsers, saveUsers } from "./action";

export const getUsersThunk = (page: number): ThunkAction<void, any, unknown, AnyAction> => async (dispatch) => {
  const getData = page + 1
  const getData2 = page + 2
  const res = await fetch(`https://reqres.in/api/users?page=${getData}`)
  const data = await res.json()
  const res2 = await fetch(`https://reqres.in/api/users?page=${getData2}`)
  const data2 = await res2.json()
  dispatch(saveUsers([...data.data, ...data2.data]))
}

export const addUsersThunk = (data: IUser[]): ThunkAction<void, any, unknown, AnyAction> => async (dispatch) => {
  let localStorageAll = JSON.parse(`${localStorage.getItem('users')}`)
  localStorageAll ? dispatch(savePageUsers(localStorageAll)) : localStorage.setItem('users', JSON.stringify(data))
}

export const likeUserThunk = (id: number): ThunkAction<void, any, unknown, AnyAction> => async (dispatch) => {
  let localStorageAll: IUser[] = JSON.parse(`${localStorage.getItem('users')}`)
  let user = localStorageAll.find(item => item.id == id);
  user ? user.like = !user.like : null
  localStorage.setItem('users', JSON.stringify(localStorageAll))
  localStorageAll ? dispatch(likeUser(id)) : null
}