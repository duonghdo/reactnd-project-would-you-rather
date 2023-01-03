import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'

class Answer extends Component {
    state = {
        answer: ''
    }

    handleChange = (e) => {
        const value = e.target.value
        const { question } = this.props
        const answer = value === question.optionOne.text ? 'optionOne' : 'optionTwo'

        this.setState({
            answer
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { answer } = this.state
        const { dispatch, question, authedUser } = this.props
        const qid = question.id

        dispatch(handleAddQuestionAnswer({ authedUser, qid, answer}))
    }

    render() {
        const { answer } = this.state
        const { question, users } = this.props

        return (
            <div className='answer'>
                <p>Asked by {users[question.author].name}</p>
                <strong>Would you rather</strong>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='radio'
                        value={question.optionOne.text}
                        checked={answer === 'optionOne'}
                        onChange={this.handleChange}
                    />{question.optionOne.text}
                    <div>&nbsp;OR</div>
                    <input
                        type='radio'
                        value={question.optionTwo.text}
                        checked={answer === 'optionTwo'}
                        onChange={this.handleChange}
                    />{question.optionTwo.text}
                    <div>&nbsp;</div>
                    <div>Selected option is: {answer}</div>
                    <button
                        className='btn'
                        type='submit'
                        disabled={answer === ''}>
                            Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Answer)