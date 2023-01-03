import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Home from './Home'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import { LoadingBar } from 'react-redux-loading-bar'
import Question from './Question'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <LoadingBar/>
                    <div className="container">
                        <Nav/>
                        <Routes>
                            <Route exact path='/' element={<Home/>}/>
                            <Route path='/add' element={<NewQuestion/>}/>
                            <Route path='/leaderboard' element={<Leaderboard/>}/>
                            <Route path='/questions/:question_id' element={<Question/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>    
                    </div>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App)
