import React, { Component } from "react";
import PublicRepositories from "./PublicRepositories";
import UserRepositories from "./UserRepositories";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRepos: false,
      isUser: true
    };
  }
  render() {
    return (
      <div>
        <button
          class="btn btn-dark"
          onClick={() => {
            this.setState(() => {
              return { isRepos: true, isUser: false };
            });
          }}
        >
          Public Users Repositories
        </button>
        <br />
        <br />
        <button
          class="btn btn-dark"
          onClick={() => {
            this.setState(() => {
              return { isRepos: false, isUser: true };
            });
          }}
        >
          Your Repositories
        </button>

        {this.state.isRepos && <PublicRepositories />}

        {this.state.isUser && <UserRepositories />}
      </div>
    );
  }
}

export default Button;
