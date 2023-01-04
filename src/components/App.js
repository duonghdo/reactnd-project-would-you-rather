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
import RequireAuth from './RequireAuth'

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
                            <Route exact path='/' element={<RequireAuth><Home/></RequireAuth>}/>
                            <Route path='/add' element={<RequireAuth><NewQuestion/></RequireAuth>}/>
                            <Route path='/leaderboard' element={<RequireAuth><Leaderboard/></RequireAuth>}/>
                            <Route path='/questions/:question_id' element={<RequireAuth><Question/></RequireAuth>}/>
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
