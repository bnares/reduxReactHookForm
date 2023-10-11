import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddNewUserAsync } from './UserSlice';
import { router } from '../app/router/Routes';

function CreateUser() {
  const form = useForm({
    defaultValues:{
      name:'',
      surname:'',
      email:'',
      age:0,
    },
    mode:'onBlur'
  });
  const {register, handleSubmit, formState} = form;
  const {errors} = formState;
  const dispatch = useDispatch();
  const submitForm = (data)=>{
    console.log(data);
    dispatch(AddNewUserAsync(data));
    //router.navigate("/");
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            NEW USER
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  {...register("name",{
                    required:"First name is required"
                  })}
                  label="First Name"
                  autoFocus
                  error = {!!errors.name}
                  helperText = {errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  {...register("surname",{
                    required:"Surname is required"
                  })}
                  label="Last Name"
                  error={!!errors.surname}
                  helperText = {errors.surname?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register("email", {
                    required:'Email is required'
                  })}
                  label="Email Address"
                  error = {!!errors.email}
                  helperText = {errors.email?.message}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register("age",{
                    required:"Age is required"
                  })}
                  label="Age"
                  type="number"
                  autoComplete="new-password"
                  error = {!!errors.age}
                  helperText = {errors.age?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default CreateUser