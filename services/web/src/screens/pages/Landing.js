import React from "react";
import { Link } from "@reach/router";
import styled from 'styled-components';
import Header from "../../components/Header";
import images from '../../themes/images';
import { Button } from 'smooth-ui'

const StyledLink = styled(Link)`
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  background-image: linear-gradient(100deg, #2575fc, #e64d4d);
  z-index: 1;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  padding: 0.475rem 0.85rem;
  border-radius: 0.25rem;
  border-width: 0px;
`;

const Wrapper = styled.section`
  height: 100vh;
`;

const LogoWrapper = styled.div`
  margin: 4px
`

const LandingContainer = styled.div`
  padding: 32px;
  text-align: center;
`

const Landing = () => (
  <Wrapper>
    {/* renderSvgBg */}
    <LandingContainer>
      <div>
        <h1>Hisona makes the history around you come alive.</h1>
        <p>Learn about the history and culture around you by talking with Hisona enabled artefacts wherever, whenever.</p>
        <p>We're on a mission to turn every historical artefact into a conversational learning experience.</p>
        <br />
        <StyledLink to="/artefacts">Discover Artefacts</StyledLink>
      </div>
      <div>
        <img src={images.hero} width="500px" />
      </div>
    </LandingContainer>
  </Wrapper>
);

export default Landing;
