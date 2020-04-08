import React, { Component } from 'react';
import Header from '../assets/header';
import Break from '../assets/break';
import { socket } from '../assets/socket';

import 'bootstrap/dist/js/bootstrap.bundle';
import '../assets/App.css';
import ViewLobbies from './viewLobbies';
import ClickSound from '../sounds/click';
import Room from './room';

class JoinCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.name,
            email: this.props.email,
            previous: false,
            image: this.props.image,
            roomID: '',
            enter_room: false,
            errorMsg: ""
        };

        this.goPrevious = this.goPrevious.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goPrevious() {
        console.log('hello');
        ClickSound();
        this.setState({
            previous: true,
        });
    }

    handleKeyboard(e) {
        console.log(e.target.value);
        this.setState({
            roomID: e.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        ClickSound();
        socket.emit("validate join code req", {room: this.state.roomID, email: this.state.email, username: this.state.userName});

        socket.on("validate join code res", properRoom => {
            if(properRoom){
                this.setState({
                    enter_room: true,
                });
            }else{
                // error message saying not a valid room
                this.setState({
                    errorMsg: "Incorrect join code. Please try again."
                })
            }

        })

    }


    render() {
        let comp;
        if (this.state.previous) {
            comp = (
                <ViewLobbies
                    name={this.state.userName}
                    email={this.state.email}
                    image={this.state.image}
                />
            );
        } else if (this.state.enter_room === true) {
            comp = (
                <Room
                    name={this.state.userName}
                    email={this.state.email}
                    image={this.state.image}
                    join_code={this.state.roomID}
                />
            );
        } else {
            comp = (
                <div className="GameWindow">
                    <Header previous={this.goPrevious} image={this.state.image} />
                    <Break />
                    <div className="ContentScreen">
                        <div className="usernameSelection">
                            <p className="errorMsg">{this.state.errorMsg}</p>
                            <h2>Enter a Join Code:</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleKeyboard}
                                    value={this.state.roomID}
                                    required
                                />
                                <br />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return <div>{comp}</div>;
    }
}
export default JoinCode;
