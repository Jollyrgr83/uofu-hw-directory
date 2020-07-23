import React, { Component } from "react";

import { Col, Row, Cont } from "./Grid";
import Title from "./Title";
import Search from "./Search";
import HeaderRow from "./HeaderRow";
import API from "../utils/API";

class List extends Component {
  state = {
    search: "",
    renderResults: [
      {
        id: "",
        email: "",
        phone: "",
        cell: "",
        picture: { thumbnail: "" },
        name: { first: "", last: "" },
        location: { city: "", state: "" },
      },
    ]
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    if (this.state.renderResults[0].id === "") {
      API.search()
        .then((res) => {
          let cleanedResults = res.data.results.map((x) => {
            return {
              id: x.id.value,
              first: x.name.first,
              last: x.name.last,
              city: x.location.city,
              state: x.location.state,
              phone: x.phone,
              email: x.email,
              thumbnail: x.picture.thumbnail,
            };
          });
          this.setState({
            results: [...cleanedResults],
            renderResults: [...cleanedResults]
          });
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchUsers(this.state.search);
  };

  handleReset = () => {
    this.setState({
      renderResults: [...this.state.results],
      search: ""
    })
  };

  searchUsers = (query) => {
    let filteredArray = this.state.results.filter((x) => {
      return (
        x.first.includes(query) ||
        x.last.includes(query) ||
        x.city.includes(query) ||
        x.state.includes(query) ||
        x.phone.includes(query) ||
        x.email.includes(query)
      );
    });
    this.setState({ renderResults: [...filteredArray], search: "" });
  }; 

  handleSort = event => {
    const param = event.target.id;
    let sortedArray = [...this.state.renderResults];
    sortedArray.sort((a, b) => {
      if (a[param] > b[param]) {
        return 1;
      } else {
        return -1;
      }
    })
    this.setState({
      renderResults: [...sortedArray]
    });
  };

  render() {
    return (
      <Cont fluid>
        <Title />
        <Search
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          handleReset={this.handleReset}
          value={this.state.search}
        />
        <HeaderRow handleSort={this.handleSort} />
        {this.state.renderResults.map((x) => (
          <Row key={x.id}>
            <Col size="md-2">
              <img src={x.thumbnail} alt={`${x.first} ${x.last}`} />
            </Col>
            <Col size="md-2">
              <p>
                {x.first} {x.last}
              </p>
            </Col>
            <Col size="md-3">
              <p>{x.email}</p>
            </Col>
            <Col size="md-2">
              <p>{x.phone}</p>
            </Col>
            <Col size="md-2">
              <p>
                {x.city}, {x.state}
              </p>
            </Col>
          </Row>
        ))}
      </Cont>
    );
  }
}

export default List;
