import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { updateUserAsync } from './UserSlice';
import { toast } from 'react-toastify';
import {DevTool} from "@hookform/devtools"
function UpdateUser() {
  const users = useSelector((state)=>state.users);
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues:{
      email: users.updateUser.email!=null ? users.updateUser.email: "",
      name: users.updateUser.name !=null ? users.updateUser.name : "",
      surname: users.updateUser.surname!=null ? users.updateUser.surname : "",
      age: users.updateUser.age != null ? users.updateUser.age : ""
    },
    mode:'onBlur'
  });
  const {register, handleSubmit, formState, control} = form;
  const {errors, 
    touchedFields, 
    dirtyFields, 
    isDirty, 
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
    } = formState;
  
    const onSubmit = (data)=>{
      
      const formData = {...data, id:users.updateUser.id}
      console.log("Form submitted: ", formData);
      dispatch(updateUserAsync(formData));
      toast.success("User updated");
    }

    const onError = (errors)=>{
      console.log("FormErrro: ",errors);
    }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  {console.log(users.updateUser)}

  return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              UPDATE
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                autoFocus
                //type='email'
                {...register("email", {
                  required:'Email is required'
                })}
                error={!!errors.email}
                helperText ={errors?.email?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                type="text"
                {...register("name", {
                  required:"Name is required"
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Surname"
                type="text"
                {...register("surname", {
                  required:"Surname is required"
                })}
                error={!!errors.surname}
                helperText={errors.surname?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Age"
                type="number"
                {...register("age", {
                  required:"Age is required"
                })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CONFIRM
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
            <DevTool control={control} />
          </Box>
        </Grid>
        
      </Grid>
    
  )
}

export default UpdateUser