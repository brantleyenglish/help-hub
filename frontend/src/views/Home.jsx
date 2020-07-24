import React from "react";
<<<<<<< HEAD
import Search from "../components/home/search";
import Categories from "../components/home/categories";
import Call from "../components/home/call";
import About from "../components/home/about";
=======
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import styled from "styled-components";
>>>>>>> 5846fe0c73c2da28b6364e58e4eaba3073a43197

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
<<<<<<< HEAD
}
=======
`;

const Home = () => {
  return (
    <>
      <Navigation />
      <section id="about">
        <div className="container">
          <div className="row about-section">
            <img
              className="col-lg-5 unitedway-logo"
              src="/images/helphub.png"
              alt=""
            />
            <div className="col-lg-7">
              <h2>About Help Hub</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
                quae esse sit commodi illo natus! Eius, totam perferendis! Odio
                nulla maiores accusamus quis, eveniet autem beatae quod
                repudiandae at expedita. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Voluptate, libero vero atque nulla porro
                impedit animi reiciendis tenetur non, velit, quis doloremque
                quas facere nam corrupti ipsum explicabo tempore quisquam.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="search-header" className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="header-message col-lg-8">
              <h1>Welcome to Help Hub</h1>
              <h3>Search agencies, services, and keywords below.</h3>
              <br />
              <form>
                <div className="mx-sm-3 mb-2">
                  <label for="search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Example: United Way, food bank, addiction"
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                  Find Help
                </button>
              </form>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </section>
      <section id="categories">
        {/* <div className="container">
          <div className="row"> */}
        <FlexWrapper>
          {/* <a href="#"><i className="categories-icon fas fa-heartbeat"></i></a> */}
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
          <Link to="/category">
            <h2 className="categories-txt">Health</h2>
          </Link>
        </FlexWrapper>
        {/* </div> */}
        {/* <div className="row">
            <div className="categories-wrap col-lg-3">
              {/* <a href="#"><i className="categories-icon fas fa-book"></i></a> */}
        {/* <h2 className="categories-txt">Education</h2>
            </div>
          </div> */}
        {/* </div> */}
      </section>
      <section id="call" className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="header-message col-lg-12">
              <h1>Can't find what you need?</h1>
              <button type="submit" className="btn btn-primary mb-2 d-inline">
                CALL 2-1-1
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
>>>>>>> 5846fe0c73c2da28b6364e58e4eaba3073a43197
