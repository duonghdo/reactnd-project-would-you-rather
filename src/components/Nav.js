import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    handleLogout = (e) => {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch(setAuthedUser(null))
    }

    render() {
        const { users, authedUser } = this.props

        let user = null
        if (authedUser) {
            user = users[authedUser]
        }
    
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact="true" className='nav-item'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' className='nav-item'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' className='nav-item'>
                            Leaderboard
                        </NavLink>
                    </li>
                    { user === null 
                        ? (
                            <li>
                                <NavLink to='/login' className='nav-item'>
                                    Log in
                                </NavLink>
                            </li>
                        ) : (
                            <li>
                                Hello, {user.name}
                                <img src={user.avatarURL} alt='' loading='lazy' height={25} style={{padding:5}}/>
                                <button onClick={this.handleLogout}>Log out</button>
                            </li>

                        )}

                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Nav)