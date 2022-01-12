import React, { useState, useCallback } from "react";
import { DirectLine } from "botframework-directlinejs";
import ctLogo from "./assets/ct.png";
import backgroundImg from "./assets/mobile-chatting-app.png";
import chatBotIcon from "./assets/chatbot.svg";
import logo from "./assets/logo.png";
import Chatbox from "./Chatbox";

import "./App.css";
import HeroCard from "./HeroCard";
import AdaptiveCard from "./AdaptiveCard";

const App = () => {
  const [toggelChatbox, setToggleChatbox] = useState(false);
  const [token, setToken] = useState();

  const handleFetchToken = useCallback(async () => {
    if (!token) {
      const res = await fetch(
        `https://webchat-mockbot.azurewebsites.net/directline/token`,
        {
          method: "POST",
          // headers: {
          //   Authorization:
          //     "Bearer uPW0XttSTK0.t1D9hOckaP248JLbHbZY2rNi4lj12qzb_IA9QDJo6P0",
          // },
        },
      );
      const { token } = await res.json();
      setToken(token);
    }
  }, [setToken, token]);

  return (
    <>
      <header>
        <img src={ctLogo} alt="" />
      </header>
      <main>
        <img
          src={backgroundImg}
          alt=""
          className={
            toggelChatbox ? "background-img move-bg-img" : "background-img"
          }
        />
        {!toggelChatbox ? (
          <div
            className="minimize-chatbox"
            onClick={() => setToggleChatbox(true)}>
            <img src={chatBotIcon} alt="" className="minimize-chatbot-icon" />
            <img src={logo} alt="" className="minimize-chat-icon" />
          </div>
        ) : (
          <Chatbox
            // directLineFun={directLineFun}
            setToggleChatbox={setToggleChatbox}
            handleFetchToken={handleFetchToken}
            token={token}
          />
        )}
      </main>
    </>
  );
};

export default React.memo(App);
