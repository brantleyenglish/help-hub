import React from "react";
import Search from "../components/home/search";
import Categories from "../components/home/categories";
import Call from "../components/home/call";
import About from "../components/home/about";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Search />
        <Categories />
        <Call />
        <About />
      </div>
    );
  }
}
