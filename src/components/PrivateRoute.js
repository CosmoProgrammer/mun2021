import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = JSON.parse(localStorage.getItem('authenticated'));
  //console.log('isLoggedIn', typeof(isLoggedIn));
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
