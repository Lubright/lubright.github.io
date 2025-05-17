import React, { createContext, useContext, useReducer } from "react";
import { green, pink } from "@mui/material/colors";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SummarizeIcon from "@mui/icons-material/Summarize";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import InputEmail from "./partials/InputEmail";
import InputPassword from "./partials/InputPassword";
import Copyright from "./partials/Copyright";

// reducers
import {
  initLoginFormState,
  loginFormReducer,
} from "../reducers/loginFormReducer";

// handlers
import { handleLoginFormSubmit } from "../handlers/handleLoginFormSubmit";

// context
const LoginFormContext = createContext();
const useLoginFormContext = () => {
  return useContext(LoginFormContext);
};

const Login = ({ setUser }) => {
  // useReducer
  const [state, dispatch] = useReducer(loginFormReducer, initLoginFormState);
  // const [rememberMe, setRememberMe] = React.useState(false);
  const handleRemeberMeChange = (event) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        name: "rememberMe",
        value: event.target.checked,
      },
    });
  };

  const handleSubmit = (event) => {
    handleLoginFormSubmit(event, state, dispatch, setUser);
  };

  return (
    <LoginFormContext.Provider value={{ state, dispatch }}>
      <div className="Login">
        <Container maxWidth="xs">
          <Box
            className="login-box"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ borderRadius: 2 }}
          >
            <Avatar sx={{ bgcolor: green[500] }}>
              <SummarizeIcon />
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              sx={{ marginLeft: 2, mt: 2 }}
            >
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 1, width: "100%" }}
            >
              <InputEmail />
              <InputPassword />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.rememberMe}
                    onChange={handleRemeberMeChange}
                  />
                }
                label="Remember me"
                sx={{ alignSelf: "flex-start", marginLeft: 0, marginTop: 1 }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit}
              >
                SIGN IN
              </Button>

              <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Container>
      </div>
    </LoginFormContext.Provider>
  );
};

export default Login;
export { useLoginFormContext };
