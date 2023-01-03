import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Link, Navigate } from 'react-router-dom'

class Home extends Component {
    state = {
        unanswered: true
    }

    handleUnanswered = (e) => {
        this.setState({ unanswered: true })
    }

    handleAnswered = (e) => {
        this.setState({ unanswered: false })
    }

    render() {
        const { unanswered } = this.state
        const { unansweredQuestions, answeredQuestions, users, authedUser } = this.props
        if (authedUser === null) {
            return <Navigate to='/login' replace/>
        }

        return (
            <div className='home'>
                <div>
                    <button onClick={this.handleUnanswered}>Unanswered</button>
                    <button onClick={this.handleAnswered}>Answered</button>
                </div>
                <ul className='question-list'>
                    { unanswered
                        ? (
                            unansweredQuestions.map((question) => (
                                <li key={question.id}>
                                    <p>{users[question.author].name} asked:</p>
                                    <strong>Would you rather ...</strong>
                                    <p>{question.optionOne.text} or {question.optionTwo.text}?</p>
                                    <Link to={`/questions/${question.id}`}>
                                        <button>View Poll</button>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            answeredQuestions.map((question) => (
                                <li key={question.id}>
                                    <p>{users[question.author].name} asked:</p>
                                    <strong>Would you rather ...</strong>
                                    <p>{question.optionOne.text} or {question.optionTwo.text}?</p>
                                    <Link to={`/questions/${question.id}`}>
                                        <button>View Poll</button>
                                    </Link>
                                </li>
                            ))
                        )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
    const unansweredQuestions = Object.values(questions).filter((question) =>
        !answeredQuestions.includes(question))
    return {
        answeredQuestions,
        unansweredQuestions,
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)