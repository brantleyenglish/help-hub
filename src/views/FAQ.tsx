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
max-width:650px;
margin: auto;
padding: 30px;
& h3{
    text-align:center;
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
                <p></p>
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
                <ol>
                    <li>Click on the "Client" tab and search for your client in the search bar.</li>
                    <li>Once you've identified your client, click on them. If they aren't in the system, then use the "Create a Client" button below to add them.</li>
                </ol>
            </VideoWrapper>

            <VideoWrapper>
                <h3>How do I Add Assistance, Notes, and Files to a Client?</h3>
                <YouTube videoId="2MSVUOWkeZA" opts={opts} />
                <h4>Adding an Assistance</h4>
                <ol>
                    <li>Click the "+" button on the "assistance" tab.</li>
                    <li>You'll see a drop down menu with all of the services that your agency provides. Open it up and select the service that you're providing the current client.</li>
                    <li>Add any specific notes that would help clarify the service provided, or important details that might help other agencies serving this client.</li>
                    <li>When you've added all you need to, click the "submit" button.</li>
                </ol>
                <p>Note: You'll also see a check box that says "Make this assistance private". The goal of The 211 Hub is to increase collaboration and share helpful information with each other. But sometimes you need to keep certain pieces of information private to your agency, for the safety and protection of the client. So when you check that box, only your agency will be able to see the assistance provided and the notes attached to it.</p>
                <h4>Adding a Note</h4>
                <ol>
                    <li>Press the "+" button on the "notes" tab</li>
                    <li>Add a subject for your note and whatever particular information you would like.</li>
                    <li>Make the note private if you so choose</li>
                    <li>When you're finished click "submit"</li>
                </ol>
                <h4>Adding a File</h4>
                <ol>
                    <li>Press the "+" button on the "files" tab.</li>
                    <li>Add a title, description, and make the file private if you so choose.</li>
                    <li>To upload your file, click on the "choose file" button and select the appropriate file.</li>
                    <li>To finish the upload, press the "submit" button.</li>
                </ol>
            </VideoWrapper>

        </FAQWrapper>
    );

};
export default FAQ;
