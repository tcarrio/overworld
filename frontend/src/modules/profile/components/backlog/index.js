import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { Collection } from "../../../app/components";
import { loadProfile } from "../../actions";

class Backlog extends Component {
  
  componentWillMount() {
    this.props.loadProfile(this.props.match.params.username);
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <Container>
          <Collection games={this.props.profile.backlog} />
        </Container>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading
});

export default connect(
  mapStateToProps,
  { loadProfile }
)(Backlog);
