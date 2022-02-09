import * as yup from "yup";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { authSelector, register } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/system";
import InputField from "../components/form_field/InputField";
import { Link } from "react-router-dom";
import SelectField from "../components/form_field/SelectField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullname: yup.string().max(25).required("This field is required"),
  username: yup.string().max(25).required("This field is required"),
  email: yup.string().email().required("This field is required"),
  password: yup.string().min(6).required("This field is required"),
  cf_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required("Please select your gender"),
});
function Register() {
  const { responseData } = useSelector(authSelector);
  const history = useHistory();
  useEffect(() => {
    if (responseData?.token) history.push("/");
  }, [responseData?.token, history]);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      cf_password: "",
      gender: "male",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      register({
        ...data,
        username: data.username.toLowerCase().replace(/ /g, ""),
      })
    );
  };
  return (
    <Box className="main_box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className="title_typography" variant="h5">
          Welcome to InstaBook
        </Typography>
        <Box mt={1}>
          <Stack spacing={1}>
            <InputField
              id="standard-basic-1"
              name="fullname"
              control={control}
              label="Full Name"
            />
            <InputField
              id="standard-basic-2"
              name="username"
              control={control}
              label="User Name"
            />
            <InputField
              id="standard-basic-3"
              name="email"
              control={control}
              label="Email"
            />
            <InputField
              id="standard-adornment-password-1"
              type="password"
              name="password"
              control={control}
              label="Password"
            />
            <InputField
              id="standard-adornment-password-2"
              type="password"
              name="cf_password"
              control={control}
              label="Confirm Password"
            />
            <SelectField
              name="gender"
              control={control}
              label="Gender"
              options={[
                { lable: "Male", value: "male" },
                { lable: "Female", value: "female" },
                { lable: "Other", value: "other" },
              ]}
              sx={{ marginTop: "15px" }}
            ></SelectField>
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
            &nbsp;Register
          </Button>
        </Box>
        <Box className="check_member_box" mt={2}>
          <Typography sx={{ paddingRight: "0.3125rem" }}>
            Your already have an account ?
          </Typography>
          <Link to="/" style={{ textDecoration: "none", color: "crimson" }}>
            Login now
          </Link>
        </Box>
      </form>
    </Box>
  );
}

export default Register;
