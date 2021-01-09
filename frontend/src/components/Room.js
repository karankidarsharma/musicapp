import React, { Component } from 'react'
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
export default class ROom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        }
        // fetch the room code from the url
        this.roomCode = this.props.match.params.roomCode
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
        this.getRoomDetails()
    }

    getRoomDetails() {
        fetch('/api/get-room?code=' + this.roomCode).then((response) => {
            if (!response.ok) {
                this.props.leaveRoomCallback()
                this.props.history.push("/")
            }
            return response.json()
        }
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host
            })
        })
    }

    leaveButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" }

        }
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallback()
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        LEAVE ROOM
                    </Button>
                </Grid>
            </Grid>
        )

    }
}

/* <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip} </p>
                <p>Guest Can pause: {this.state.guestCanPause ? "True" : "false"} </p>
                <p>Host:  {this.state.isHost ? "True" : "false"} </p>
            </div>
            */