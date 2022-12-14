import { UsersAction, usersType } from "./action"


export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
  like: boolean
}


const initialState: IUser[] = []


export const usersReduser = (state = initialState, action: UsersAction):  IUser[] => {
  switch (action.type) {
    case usersType.PAGE:
      return [...action.payload]
    case usersType.MORE:
      return [...state, ...action.payload]
    case usersType.LIKE:
      let userLike = state.find(item => item.id == action.payload);
      userLike ? userLike.like = !userLike.like : null
      return [...state]
    default:
      return state
}
}