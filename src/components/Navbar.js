import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 5rem;
  position: fixed;
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
  text-align: center;
  padding: 0.6rem 0 0 0;
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
    transition: color 600ms, background 200ms;
  }
`;

const Navbar = (props) => {
  const location = useLocation().pathname;

  return (
    <Wrapper>
      <Link to="/" onClick={() => props.setShowMovieDetails(false)}>
        <Navitem currentLocation={location} route={"/"}>
          <i className="fas fa-search"></i>
          <p>Discover</p>
        </Navitem>
      </Link>

      <Link to="/recommended" onClick={() => props.setShowMovieDetails(false)}>
        <Navitem currentLocation={location} route={"/recommended"}>
          <i className="far fa-star"></i>
          <p>Recommended</p>
        </Navitem>
      </Link>

      <Link to="/watchlist" onClick={() => props.setShowMovieDetails(false)}>
        <Navitem currentLocation={location} route={"/watchlist"}>
          <i className="far fa-bookmark"></i>
          <p>Watchlist</p>
        </Navitem>
      </Link>
    </Wrapper>
  );
};

export default Navbar;
