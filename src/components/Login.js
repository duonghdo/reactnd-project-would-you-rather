import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        user: '',
        toHome: false,
    }

    handleChange = (e) => {
        const user = e.target.value
        this.setState({ user })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { user } = this.state
        const { dispatch } = this.props

        dispatch(setAuthedUser(user))

        this.setState(() => ({
            user: user,
            toHome: true,
        }))
    }

    render() {
        const { user, toHome } = this.state
        const { users } = this.props

        if (toHome === true) {
            return <Navigate to='/'/>
        }

        return (
            <div>
                <div>
                    <h3>Welcome to the Would You Rather App</h3>
                    <p>Please sign in to continue</p>
                </div>
                <div>
                    <form className='login' onSubmit={this.handleSubmit}>
                        <select value={user} onChange={this.handleChange}>
                            <option value="" disabled>Select User</option>
                            { Object.values(users).map((u) => (
                                <option value={u.id} key={u.id}>{u.name}</option>
                            ))}
                        </select>
                        <div>&nbsp;</div>
                        <button
                            className='btn'
                            type='submit'
                            disabled={user === ''}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)