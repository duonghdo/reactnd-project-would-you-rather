import React from 'react'
import { connect } from  'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RequiredAuth({ children, authedUser }) {
    const location = useLocation()
    return authedUser === null
        ? <Navigate to='/login' replace state={{ path: location.pathname }}/>
        : children
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(RequiredAuth)