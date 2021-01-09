import React, { Component } from 'react'
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'
import Room from './Room'
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"


export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
        }
        this.clearRoomCode = this.clearRoomCode.bind(this)
    }


    async componentDidMount() {
        fetch('/api/user-in-room').then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code
                })
                console.log("Hey There!")
            })
    }
    renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={Link}>Join A Room</Button>
                        <Button color="secondary" to='/create' component={Link}>Create A Room</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

    clearRoomCode() {
        this.setState({
            roomCode: null
        })
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : this.renderHomePage()
                    }}></Route>
                    <Route exact path="/join" component={RoomJoinPage}></Route>
                    <Route exact path="/create" component={CreateRoomPage}></Route>
                    {/* :roomcode will be the param */}
                    <Route path="/room/:roomCode" render={
                        (props) => {
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                        }
                    }></Route>

                </Switch>
            </Router>
        )
    }
}

export default HomePage
