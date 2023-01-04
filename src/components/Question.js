import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from  'react-redux'
import Answer from './Answer'
import Result from './Result'

// HOC withRouter https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
export function withRouter(Children){
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class Question extends Component {
    render() {
        const { users, authedUser, questions, question_id } = this.props
        const userAnswers = users[authedUser].answers
        let question = null
        if (Object.keys(questions).includes(question_id)) {
            question = questions[question_id]
        }
        if (question === null) {
            return <p>This page does not exist</p>
        }

        return (
            Object.keys(userAnswers).includes(question.id)
                ? <Result question={question}/>
                : <Answer question={question}/>
        )
    }
}

function mapStateToProps({ users, authedUser, questions }, props ) {
    const { question_id } = props.match.params
    return {
        users,
        authedUser,
        questions,
        question_id
    }
}

export default withRouter(connect(mapStateToProps)(Question))