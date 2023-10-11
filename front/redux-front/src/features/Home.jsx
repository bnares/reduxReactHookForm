import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAsync, getAllUsersStatus, selectAllUsers } from './UserSlice';
import OutlinedCard from '../app/components/CardData';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.users.users);
    //const userStatus = useSelector(getAllUsersStatus);
    const userStatus = useSelector((state)=>state.users.status);
    useEffect(()=>{
        dispatch(fetchUsersAsync())
        console.log("users: ", users);
        console.log("users status:", userStatus);
        setLoading(false);
    },[ dispatch])
    {console.log("Home users: ",users)}
  return (
    <>
      <Typography variant='h3'>HOME</Typography>
      <Button color='primary' variant='outlined' component={Link} to="/create">ADD NEW</Button>
      {!loading && users.map((item,idx)=>(
        <OutlinedCard data={item} key={idx}/>
      ))}
    </>
  )
}

export default Home