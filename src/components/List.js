import React, { Component } from "react";

import { Col, Row, Cont } from "./Grid";
import API from "../utils/API";

class List extends Component {
  state = {
    result: {},
    search: ""
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.search()
      .then(res => this.setState({ result: res.results }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

  render() {
    return (
      <Cont fluid>
        <Row>
          <Col size="md-3">
            <img src={this.state.result.picture.thumbnail} alt={this.state.result.name.first} />
          </Col>
          <Col size="md-3">
            <p>{this.state.result.name.first}</p>
            <p>{this.state.result.name.last}</p>
          </Col>
          <Col size="md-3">
            <p>{this.state.result.email}</p>
            <p>{this.state.result.phone}</p>
            <p>{this.state.result.cell}</p>
          </Col>
          <Col size="md-3">
            <p>{this.state.result.location.city}</p>
            <p>{this.state.result.location.state}</p>
          </Col>
        </Row>
      </Cont>
    );
  }
}

export default List;
