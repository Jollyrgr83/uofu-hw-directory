import axios from "axios";
const BASEURL = "https://randomuser.me/api/";
const resultsString = "?results=";
const nationalityString = "&nat=";
const numberOfResults = "200";
const nationality = "us";

const queryURL = BASEURL + resultsString + numberOfResults + nationalityString + nationality;

export default {
  search: function() {
    return axios.get(queryURL);
  }
};
