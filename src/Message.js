import React from "react";
import AdaptiveCard from "./AdaptiveCard";
import HeroCard from "./HeroCard";

const Message = ({ msg, channelId, attachments, directLinePost }) => {
  console.log(attachments);
  return (
    <>
      <div className="msg-container">
        {msg && (
          <p className={channelId === "user" ? "user-msg" : "bot-msg"}>{msg}</p>
        )}
        {/* {
          // attachments && <AdaptiveCard directLinePost={directLinePost} />
          attachments?.map((card) => {
            return (
              <>
                <HeroCard card={card} />
                <AdaptiveCard directLinePost={directLinePost} card={card} />
              </>
            );
          })
        } */}
      </div>
    </>
  );
};

export default Message;
