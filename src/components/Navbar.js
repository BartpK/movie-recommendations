import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, Switch } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 5rem;
  position: sticky;
  bottom: 0;
  background-color: #1c2541;
  div:nth-child(2) {
    border-left: #535a6e 1px solid;
    border-right: #535a6e 1px solid;
  }
  a {
    text-decoration: none;
  }
`;

const Navitem = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  padding: auto;
  p {
    font-size: 0.8rem;
    margin: 0.4rem;
  }
`;

const Navbar = (props) => {
  return (
    <Wrapper>
      <Navitem>
        <Link to="/">
          <i className="fas fa-search"></i>
          <p>Discover</p>
        </Link>
      </Navitem>

      <Navitem>
        <Link to="/recommended">
          <i className="far fa-star"></i>

          <p>Recommended</p>
        </Link>
      </Navitem>

      <Navitem>
        <Link to="/watchlist">
          <i className="far fa-bookmark"></i>

          <p>Watchlist</p>
        </Link>
      </Navitem>
    </Wrapper>
  );
};

export default Navbar;
