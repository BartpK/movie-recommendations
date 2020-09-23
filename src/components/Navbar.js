import React from "react";
import styled from "styled-components";

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
        <i className="fas fa-search"></i>

        <p>Discover</p>
      </Navitem>
      <Navitem>
        <i className="far fa-star"></i>

        <p>Recommended</p>
      </Navitem>
      <Navitem>
        <i className="far fa-bookmark"></i>

        <p>Watchlist</p>
      </Navitem>
    </Wrapper>
  );
};

export default Navbar;
