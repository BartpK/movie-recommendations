import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

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
  i {
    background-color: ${(props) =>
      props.currentLocation === props.route ? "#6fffe9" : "none"};
    color: ${(props) =>
      props.currentLocation === props.route ? "#1c2541" : "white"};
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.5rem 0.4rem 0.2rem 0.4rem;
    border-radius: 50%;
  }
`;

const Navbar = (props) => {
  const location = useLocation().pathname;

  return (
    <Wrapper>
      <Navitem currentLocation={location} route={"/"}>
        <Link to="/">
          <i className="fas fa-search"></i>
          <p>Discover</p>
        </Link>
      </Navitem>

      <Navitem currentLocation={location} route={"/recommended"}>
        <Link to="/recommended">
          <i className="far fa-star"></i>

          <p>Recommended</p>
        </Link>
      </Navitem>

      <Navitem currentLocation={location} route={"/watchlist"}>
        <Link to="/watchlist">
          <i className="far fa-bookmark"></i>

          <p>Watchlist</p>
        </Link>
      </Navitem>
    </Wrapper>
  );
};

export default Navbar;
