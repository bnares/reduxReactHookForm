import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DeleteUserAsync, fetchUsersAsync, setUpdateUser} from "../../features/UserSlice";
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  
  
const CardData = (data) =>{
  const updateUser = useSelector((state)=>state.users.updateUser);
  const users = useSelector((state)=>state.users.users)
  const dispatch = useDispatch();

  const clickedUpdateUser = (item)=>{
    dispatch(setUpdateUser(item));
             
  }

  const handleDeleteUser =()=>{
    dispatch(DeleteUserAsync(data.id));
    //setUpdateUser(data);
    users.filter(item=> item.id!=data.id);
    dispatch(fetchUsersAsync())
  }


  return (
    <>
        <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                USER CARD
            </Typography>
            <Typography variant="h5" component="div">
                {data.name}{bull}{data.surname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Email: {data.email}
            </Typography>
            <Typography variant="body2">
                Age: {data.age}
            </Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button size="small" component={Link} to="update" variant='outlined' onClick={()=>clickedUpdateUser(data)}>UPDATE</Button>
            <Button 
              size="small" 
              to="update" 
              variant='outlined' 
              color='error'
              onClick={()=>handleDeleteUser()}
            >
              DELETE
            </Button>
        </CardActions>
    </>
  )
}

export default function OutlinedCard({data}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center"  padding="1rem">
      <Card variant="outlined">{CardData(data)}</Card>
    </Box>
  );
}

