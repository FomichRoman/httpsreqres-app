import { IUser } from './reduser';
import { ActionCreator } from "redux"

export enum usersType {
  PAGE = 'PAGE',
  MORE = 'MORE',
  LIKE = 'LIKE'
}

interface pageUsersAction {
  type: usersType.PAGE,
  payload: IUser[],
}

interface getUsersAction {
  type: usersType.MORE,
  payload: IUser[],
}

interface likeUserAction {
  type: usersType.LIKE,
  payload: number,
}


export type UsersAction = pageUsersAction | getUsersAction | likeUserAction

export const savePageUsers: ActionCreator<pageUsersAction> = (array: IUser[]) => ({
  type: usersType.PAGE,
  payload: array,
})

export const saveUsers: ActionCreator<getUsersAction> = (array: IUser[]) => ({
  type: usersType.MORE,
  payload: array,
})

export const likeUser: ActionCreator<likeUserAction> = (id: number) => ({
  type: usersType.LIKE,
  payload: id,
})
