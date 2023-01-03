import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (question) {
    return (dispatch) => {
        return saveQuestion(question)
            .then((question) => {
                dispatch(addQuestion(question))
            })
            .catch((e) => {
                console.warn('Error saving question: ', e)
                alert('Error saving question.')
            })
    }
}

function addQuestionAnswer ({ qid, authedUser, answer }) {
    return {
        type: ADD_QUESTION_ANSWER,
        qid,
        authedUser,
        answer
    }
}

export function handleAddQuestionAnswer (questionAnswer) {
    return (dispatch) => {
        return saveQuestionAnswer(questionAnswer)
            .then((questionAnswer) => {
                dispatch(addQuestionAnswer(questionAnswer))
            })
            .catch((e) => {
                console.warn('Error saving question answer: ', e)
                alert('Error saving question answer.')
            })
    }
}