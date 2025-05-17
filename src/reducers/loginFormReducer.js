import { Password } from "@mui/icons-material";

const initLoginFormState = {
  email: "",
  password: "",
  rememberMe: false,
  error: {
    email: false,
    password: false,
  },
};

const loginFormReducer = (state, action) => {
  const { name, value } = action.payload;
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "UPDATE_FORM":
      return {
        ...state,
        [name]: value,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [name]: value,
        },
      };
    default:
      return state;
  }
};

export { initLoginFormState, loginFormReducer }; // named export
