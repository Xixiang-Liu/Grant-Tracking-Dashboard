import React from 'react';
import Login from './Login';



const Home = () => {
  
  if(isSubmitting){
    return <Login />
  }
  else
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Center',
        alignItems: 'Center',
        height: '100vh'
      }}
    >

      <h1>Welcome to Grant Tracking Board</h1> 
    </div>
  );
};
  
export default Home;

