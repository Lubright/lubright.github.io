const validateEmail = (email) => {
  if (email === "") {
    return false;
  }
  // 簡單 email 格式檢查
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  if (password === "") {
    return false;
  }
  // 簡單 password 格式檢查
  return password.length >= 6; // 假設密碼至少需要 6 個字元
};

export const handleLoginFormSubmit = (event, state, dispatch, setUser) => {
  event.preventDefault();
  const { email, password } = state;

  // Check if email and password are valid
  // const isEmailValid = validateEmail(email);
  // const isPasswordValid = validatePassword(password);

  // if (!isEmailValid || !isPasswordValid) {
  //   dispatch({
  //     type: "SET_ERROR",
  //     payload: {
  //       email: !isEmailValid,
  //       password: !isPasswordValid,
  //     },
  //   });
  //   return;
  // }

  // If valid, proceed with login
  // AuthService.login(email, password)
  // setUser
  window.alert("登入成功!");
};

export const handleEmailBlur = (event, email, dispatch) => {
  // Check if email and password are valid
  const isEmailValid = validateEmail(email);
  dispatch({
    type: "SET_ERROR",
    payload: {
      name: "email",
      value: !isEmailValid,
    },
  });
};

export const handlePasswordBlur = (event, password, dispatch) => {
  // Check if email and password are valid
  const isPasswordValid = validatePassword(password);
  dispatch({
    type: "SET_ERROR",
    payload: {
      name: "password",
      value: !isPasswordValid,
    },
  });
};
