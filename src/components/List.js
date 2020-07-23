import React, { Component } from "react";

import { Cont } from "./Grid";
import Title from "./Title";
import Search from "./Search";
import HeaderRow from "./HeaderRow";
import Result from "./Result";
import API from "../utils/API";

class List extends Component {
  state = {
    search: "",
    renderResults: [{ id: "" }],
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
            renderResults: [...cleanedResults],
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
      search: "",
    });
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

  handleSort = (event) => {
    const param = event.target.id;
    let sortedArray = [...this.state.renderResults];
    sortedArray.sort((a, b) => {
      if (a[param] > b[param]) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setState({
      renderResults: [...sortedArray],
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
          <Result
            id={x.id}
            thumbnail={x.thumbnail}
            first={x.first}
            last={x.last}
            email={x.email}
            phone={x.phone}
            city={x.city}
            state={x.state}
          />
        ))}
      </Cont>
    );
  }
}

export default List;
