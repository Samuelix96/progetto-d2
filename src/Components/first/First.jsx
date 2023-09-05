import React, {Component} from "react";

import Main from "../main/Main";


class First extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }
    render() {
        return (
            <div>
                <Main
                    fantasyBooks={this.props.data}
                />
            </div>
        )
    }
}

export default First;