import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { TextField, Button, Grid, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@material-ui/core'

export class CreateRoomPage extends Component {
    defaultVotes = 2;
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        }
        this.handleRoomButtonPress = this.handleRoomButtonPress.bind(this)
        this.handleVotesChange = this.handleVotesChange.bind(this)
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)

    }
    handleVotesChange(e) {
        this.setState(
            {
                votesToSkip: e.target.value
            }
        )
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? false : false
        })

    }


    handleRoomButtonPress() {
        // post the data
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        }
        fetch("/api/create-room", requestOptions).then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => this.props.history.push('/room/' + data.code))
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            >
                            </FormControlLabel>
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            >
                            </FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" }
                            }}
                            onChange={this.handleVotesChange}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes Required To Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonPress}>
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center" to="/" component={Link}>
                    <Button color="secondary" variant="contained" >
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default CreateRoomPage
