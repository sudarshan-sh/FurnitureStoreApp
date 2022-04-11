import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'

// wrapping whole appliaction in AuthWrapper, so use children---
const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if(isLoading){
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    )
  }

  if(error){
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }

  // return children
  return (
    <>{ children }</>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
