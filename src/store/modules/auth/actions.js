export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, age, weight, height) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function planRequest(title, duration, price) {
  return {
    type: '@auth/PLAN_REQUEST',
    payload: { title, duration, price },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
