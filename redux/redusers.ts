
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { authReduser } from './auth/reduser';
import { usersReduser } from './users/reduser';

const rootReducer = combineReducers({
  auth: authReduser,
  users: usersReduser
});

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state) nextState.auth = state.auth; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
