import { AuthAction, authType } from "./action"



export interface IToken {
  token: string | null
}

const initialState: IToken = {
  token: null
}


export const authReduser = (state = initialState, action: AuthAction):  IToken => {
  switch (action.type) {
    case authType.LOGIN:
      return {...state, token: action.payload}
    default:
      return state
}
}