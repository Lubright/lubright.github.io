import React from "react";
import TextField from "@mui/material/TextField";

import { useLoginFormContext } from "../Login"; // context
import { handleEmailBlur } from "../../handlers/handleLoginFormSubmit"; // handlers

function validateEmail(email) {
  if (email === "") {
    return false;
  }
  // 簡單 email 格式檢查
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const InputEmail = () => {
  // const [email, setEmail] = React.useState("");
  // const [error, setError] = React.useState(false);

  // const handleChange = (event) => {
  //   setEmail(event.target.value);

  //   if (event.target.value === "") {
  //     setError(true);
  //   } else {
  //     setError(!validateEmail(event.target.value));
  //   }
  // };

  const { state, dispatch } = useLoginFormContext();
  const { email } = state;
  const error = state.error.email;

  const handleChange = (event) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        name: "email",
        value: event.target.value,
      },
    });
  };

  const handleBlur = (event) => {
    handleEmailBlur(event, email, dispatch);
  };

  return (
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      required
      fullWidth
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={error ? "Invalid email address" : ""}
    />
  );
};

export default InputEmail;
