import * as yup from "yup";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { authSelector, loginLoading } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/system";
import InputField from "../components/form_field/InputField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please type your gmail"),
  password: yup.string().required("No password provided."),
});
function Login() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { responseData } = useSelector(authSelector);
  const history = useHistory();
  useEffect(() => {
    if (responseData?.token) history.push("/");
  }, [responseData?.token, history]);
  const onSubmit = (data) => {
    dispatch(loginLoading(data));
  };
  return (
    <Box className="main_box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className="title_typography" variant="h5">
          Welcome to InstaBook
        </Typography>
        <Box mt={1}>
          <Stack spacing={2}>
            <InputField
              id="standard-basic"
              name="email"
              control={control}
              label="Email"
            />
            <InputField
              id="standard-adornment-password"
              type="password"
              name="password"
              control={control}
              label="Password"
            />
          </Stack>
        </Box>
        <Box mt={3} mb={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Sign In
          </Button>
        </Box>
        <Box className="check_member_box" mt={2}>
          <Typography sx={{ paddingRight: "0.3125rem" }}>
            Your are not our member ?
          </Typography>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "crimson" }}
          >
            Register here
          </Link>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
