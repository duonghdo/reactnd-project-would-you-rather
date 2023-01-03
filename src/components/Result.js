import React, { Component } from 'react'
import { connect } from 'react-redux'

class Result extends Component {
    render() {
        const { question, users } = this.props
        const totalVote = question.optionOne.votes.length + question.optionTwo.votes.length
        const percentageOne = (question.optionOne.votes.length / totalVote * 100).toFixed(2)
        const percentageTwo = (question.optionTwo.votes.length / totalVote * 100).toFixed(2)

        return (
            <div className='result'>
                <p>Asked by {users[question.author].name}</p>
                <h3>Results:</h3>
                <strong>Would you rather ...</strong>
                <ul>
                    <li className='result-detail'>
                        <p>{question.optionOne.text}</p>
                        <p>{question.optionOne.votes.length} out of {totalVote} votes</p>
                        <p>Percentage: {percentageOne}%</p>
                    </li>
                    <li className='result-detail'>
                        <p>{question.optionTwo.text}</p>
                        <p>{question.optionTwo.votes.length} out of {totalVote} votes</p>
                        <p>Percentage: {percentageTwo}%</p>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Result)