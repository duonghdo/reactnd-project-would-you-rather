import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

function Login({ users }) {
    const [user, setUser] = useState('')
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const selected = e.target.value
        setUser(selected)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setAuthedUser(user))
        navigate(state?.path || '/')
    }

    return (
        <div>
            <div>
                <h3>Welcome to the Would You Rather App</h3>
                <p>Please sign in to continue</p>
            </div>
            <div>
                <form className='login' onSubmit={handleSubmit}>
                    <select value={user} onChange={handleChange}>
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

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)