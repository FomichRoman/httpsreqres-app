import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { saveToken } from './action';

export const registerThunk =
  (email: string, pass: string): ThunkAction<void, any, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      let response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        }),
      });
      let token = await response.json();
      if (!token.error){
        localStorage.setItem('partners', JSON.stringify(token))
        dispatch(saveToken(token));
      }
    } catch (err) {
        console.log(err)
    }
  };

  export const loginThunk =
  (email: string, pass: string): ThunkAction<void, any, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      let response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        }),
      });
      let token = await response.json();
      if (!token.error){
        localStorage.setItem('partners', JSON.stringify(token))
        dispatch(saveToken(token));
      }
    } catch (err) {
        console.log(err)
    }
  };
