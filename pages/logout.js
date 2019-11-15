import React from 'react'
import fetch from 'isomorphic-unfetch'

class Logout extends React.Component {
  componentDidMount () {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        window.location.href = '/login'
      })
  }

  render () {
    return (
      <form />
    )
  }
}

export default Logout
