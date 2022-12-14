import { ActionCreator } from "redux"

export enum authType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

interface loginAction {
  type: authType.LOGIN,
  payload: string,
}


export type AuthAction = loginAction

export const saveToken: ActionCreator<loginAction> = (token: string) => ({
  type: authType.LOGIN,
  payload: token,
})
