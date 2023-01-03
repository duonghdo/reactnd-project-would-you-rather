import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Navigate } from 'react-router-dom'

class Leaderboard extends Component {
    render() {
        const { uid, users, authedUser } = this.props

        if (authedUser === null) {
            return <Navigate to='/login' replace/>
        }

        return (
            <ul className='leaderboard'>
                {uid.map((uid) => {
                    const user = users[uid]
                    const score = Object.keys(user.answers).length + user.questions.length
                    return (
                        <li key={user.id}>
                            <div>
                                <img src={user.avatarURL} alt='' loading='lazy' height={25}/>
                                <strong>  {user.name}</strong>
                            </div>
                            <p>Answered questions: {Object.keys(user.answers).length}</p>
                            <p>Created questions: {user.questions.length}</p>
                            <p>Score: {score}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    const userScore = (id) => Object.keys(users[id].answers).length + users[id].questions.length
    return {
        uid: Object.keys(users).sort((a, b) => userScore(b) - userScore(a)),
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)