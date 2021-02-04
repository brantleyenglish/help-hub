import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../components/Theme";
import YouTube from "react-youtube";
import UWHeader from "../images/uw_header.png";


const FAQWrapper = styled.div`
width: 100%;`;
const Header = styled.div`
padding: 4em 0px 6em 0px;
  text-align: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue};
  background-image: url(${UWHeader});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & h1 {
    font-size: 45px;
    margin-bottom: 0px;
    text-transform: uppercase;
  }
  & h2 {
    font-size: 25px;
    margin-top: 10px;
  }
`;
const VideoWrapper = styled.div`
text-align:center;
padding: 30px;
& h3{
    color: ${theme.colors.blue};
    text-transform: uppercase;
    font-size: 30px;
}`;

const FAQ = () => {
    const opts = {
    };

    return (
        <FAQWrapper>
            <Header>
                <h1>Frequently Asked Questions</h1>
            </Header>
            <VideoWrapper>
                <h3>How do I sign up?</h3>
                <YouTube videoId="vi6zlqFwMPI" opts={opts} />
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do I Edit My Agency's Profile?</h3>
                <YouTube videoId="c0_sCxnnGzM" opts={opts} />
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do I Navigate My Agency Dashboard?</h3>
                <YouTube videoId="agk6SZ2e98I" opts={opts} />
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do i Add and Edit Agency Services?</h3>
                <YouTube videoId="SuvaoRs972U" opts={opts} />
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do i Create and Edit a Client?</h3>
                <YouTube videoId="nqw-w6tq_KQ" opts={opts} />
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do I Add Assistance, Notes, and Files to a Client?</h3>
                <YouTube videoId="2MSVUOWkeZA" opts={opts} />
            </VideoWrapper>
        </FAQWrapper>
    );

};
export default FAQ;
