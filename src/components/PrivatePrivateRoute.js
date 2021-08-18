import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  var isLoggedIn = JSON.parse(localStorage.getItem('authenticated'));
  const authority = false;
  console.log(localStorage.getItem('username'));
  //var allowed = false;
  if(authority===false){
  try{
  if(Boolean(isLoggedIn)) {
      if((localStorage.getItem('username')==='headLS')||(localStorage.getItem('username')==='headDISEC')||(localStorage.getItem('username')==='headUNSC')) {
          isLoggedIn = true;
          console.log(true)
      } else {isLoggedIn = false; console.log(false)}
  }} catch(err){console.log(err)}}
  console.log('isLoggedIn', isLoggedIn)
  return (
    <Route
      {...rest}
      render={props =>
            Boolean(isLoggedIn) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute