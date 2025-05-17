import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import { useLoginFormContext } from "../Login"; // context
import { handlePasswordBlur } from "../../handlers/handleLoginFormSubmit"; // handlers

const InputPassword = () => {
  // const [password, setPassword] = React.useState("");
  // const [error, setError] = React.useState(false);

  const { state, dispatch } = useLoginFormContext();
  const { password } = state;
  const error = state.error.password;
  const handleChange = (event) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        name: "password",
        value: event.target.value,
      },
    });
  };
  const handleBlur = (event) => {
    handlePasswordBlur(event, password, dispatch);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth required error={error}>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="password"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormHelperText sx={{ color: "error.main" }}>
        {error ? "Password is required" : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default InputPassword;
