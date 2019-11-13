import React from 'react'
import fetch from 'isomorphic-unfetch'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
  }

  async handleSignIn (e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }
    )
    const result = await res.json()
    if (result.result === 'success') {
      window.location.href = '/'
    }
  }

  render () {
    return (
      <form className='container' onSubmit={this.handleSignIn}>
        <h3>Sign in</h3>
        <input type='text' ref='username' placeholder='enter you username' />
        <input type='password' ref='password' placeholder='enter password' />
        <input type='submit' value='Login' />
        <style jsx>
          {`
            .container {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }

            input {
              margin-bottom: 15px;
            }
          `}
        </style>
      </form>
    )
  }
}

export default Login
