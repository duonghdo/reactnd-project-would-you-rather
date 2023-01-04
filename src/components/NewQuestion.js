import React, { Component } from 'react'
import { connect } from  'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Navigate } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        option1: '',
        option2: '',
        toHome: false,
    }

    handleChangeOption1 = (e) => {
        const option1 = e.target.value
        this.setState({ option1 })
    }

    handleChangeOption2 = (e) => {
        const option2 = e.target.value
        this.setState({ option2 })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { option1, option2 } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddQuestion({ 
            optionOneText: option1, 
            optionTwoText: option2, 
            author: authedUser 
        }))

        this.setState(() => ({
            option1: '',
            option2: '',
            toHome: true,
        }))
    }

    render() {
        const { option1, option2, toHome } = this.state

        if (toHome === true) {
            return <Navigate to='/'/>
        }

        return (
            <div>
                <h3>Create new question</h3>
                <p>Complete the question:</p>
                <p><strong>Would you rather ...</strong></p>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Enter option one here"
                        value={option1}
                        onChange={this.handleChangeOption1}
                        className='textarea'
                        maxLength={200}
                        rows={3}
                        cols={60}
                    />
                    <div>&nbsp;OR</div>
                    <textarea
                        placeholder="Enter option one here"
                        value={option2}
                        onChange={this.handleChangeOption2}
                        className='textarea'
                        maxLength={200}
                        rows={3}
                        cols={60}
                    />
                    <div>&nbsp;</div>
                    <button
                        className='btn'
                        type='submit'
                        disabled={option1 === '' || option2 === ''}>
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

export default connect(mapStateToProps)(NewQuestion)