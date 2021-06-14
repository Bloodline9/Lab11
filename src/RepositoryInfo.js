import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default class RepoPage extends Component {
  render() {
    console.log(this.props);
    const QUERY = gql`
      query {
        repository(name: "${this.props.name}", owner: "${this.props.owner}") {
          createdAt
          updatedAt
          issues {
            totalCount
          }
          languages(first: 10) {
            totalCount
            edges {
              size
              node {
                color
                name
              }
            }
          }
          forkCount
        }
      }
    `;
    return (
      <div>
        <Query query={QUERY}>
          {({ loading, data }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <div>
                <div className="info">
                  <p>
                    <b>Created:</b> {data.repository.createdAt}
                  </p>
                  <p>
                    <b>Updated:</b> {data.repository.updatedAt}
                  </p>
                  <p>
                    <b>Issues count:</b> {data.repository.issues.totalCount}
                  </p>
                  <p>
                    <b>Forks count:</b> {data.repository.forkCount}
                  </p>
                </div>

                <div className="languages">
                  <h3>Using languages:</h3>
                  {data.repository.languages.edges.map((data, key) => {
                    return (
                      <div key={key}>
                        <p>
                          {data.node.name}, Count chars code: {data.size}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
