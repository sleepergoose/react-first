export const getAuthState = () => {
  try {
    const serializedAuthState = localStorage.getItem('auth');
    if (serializedAuthState === null) {
      return undefined;
    }
    return JSON.parse(serializedAuthState);
  } catch (err) {
    return undefined;
  }
};

export const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const clearAuthState = () => {
  localStorage.clear();
};
