import React, { useCallback, useEffect, useMemo, useState } from "react";
import sendIcon from "./assets/send.svg";
import logo from "./assets/logo.png";
import { ctImage } from "./assets/imageBase64";
import Message from "./Message";
import { DirectLine } from "botframework-directlinejs";
import { jsPDF } from "jspdf";

var directLine = null;

const Chatbox = ({ setToggleChatbox, token, handleFetchToken }) => {
  const [messageArr, setMessageArr] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    handleFetchToken();
    getResponse();
  }, [handleFetchToken]);

  const onResponse = function (activity) {
    console.log(activity);
    if (activity.from.id === "webchat-mockbot") {
      if (activity.attachments) {
        setMessageArr((preValues) => {
          return [
            ...preValues,
            {
              channelId: activity.channelId,
              speak: "attachments",
              heroCards: activity.attachments,
            },
          ];
        });
      } else {
        setMessageArr((preValues) => {
          return [
            ...preValues,
            {
              channelId: activity.channelId,
              speak: activity.speak,
            },
          ];
        });
      }
    }
  };

  const getResponse = () => {
    directLine = new DirectLine({
      // secret: "jul7Q~QRdwQ4uDP_0BaahJbMGqdJqv~yVRAJV",
      domain: `https://directline.botframework.com/v3/directline`,
      token: token,
    });
    directLine.activity$.subscribe((activity) => onResponse(activity));
  };

  const directLinePost = (message) => {
    directLine
      .postActivity({
        from: { id: "myUserId" },
        type: "message",
        text: message,
      })
      .subscribe(
        (id) => console.log("posted activity, assigned ID", id),
        (error) => console.log("Error posting activity", error),
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageArr((preValues) => {
      return [...preValues, { channelId: "user", speak: message }];
    });
    directLinePost(message);
    setMessage("");
  };

  const pdfDownload = () => {
    const customizePara = (para) => {
      var newPara = "";
      if (para.split(" ").length <= 1) {
        newPara = para;
      } else {
        para.split(" ").map((word, index) => {
          if (index > 0 && index % 18 === 0) {
            newPara += "\n";
          }
          newPara += word + " ";
        });
      }
      return newPara;
    };

    var mssg = [];
    const doc = new jsPDF("p", "px", "a4");

    /**************** HEADER **********************/

    //logo
    doc.addImage(ctImage, "PNG", 10, 10, 60, 25);

    //title
    doc.setFont("times sew roman", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#D63526");
    doc.text("CELEBAL BOT", 180, 25);

    //date and time
    const date = new Date();
    const dateTime =
      date.toLocaleDateString() +
      "  " +
      date.getHours() +
      ":" +
      date.getMinutes();

    doc.setFontSize(8);
    doc.setFont("courier", "semibold");
    doc.setTextColor("#2C3038");
    doc.text(dateTime, 360, 20);

    doc.line(10, 40, 435, 40);

    /*************** MAIN BODY ********************/
    messageArr.map((val) => {
      if (val.channelId === "user") {
        let para = customizePara(val.speak);
        mssg.push({
          isbot: false,
          msg: para,
        });
      } else {
        let para = customizePara(val.speak);
        mssg.push({
          isbot: true,
          msg: para,
        });
      }
    });
    console.log(mssg);

    //messages
    doc.setFont("courier");
    doc.setFontSize(10);
    let count = 0;
    let y = 60;

    while (mssg.length > count) {
      if (mssg[count].isbot) {
        doc.setTextColor("#106843");
      } else {
        doc.setTextColor("#000000");
      }
      doc.text(mssg[count].msg, 20, y, {
        align: "left",
      });
      if (mssg[count].msg.includes("\n")) {
        let a = mssg[count].msg.split("\n").length;
        console.log(a);
        y += a * 10;
      } else {
        y += 10;
      }
      count++;
      if (y > 600) {
        doc.addPage();
        y = 25;
      }
    }

    doc.setFont("courier", "italic");
    doc.setTextColor("#000000");
    doc.text("session end...", 200, y + 20);

    doc.setFont("times new roman", "bold");
    doc.text("©celebal bot 2022", 200, 620);

    doc.save("a4.pdf");
  };

  console.log(messageArr);

  return (
    <div className="chat-box-container">
      <img
        src={logo}
        alt=""
        className="chat-img"
        onClick={() => setToggleChatbox(false)}
      />
      <div className="message-container">
        {messageArr.map((msg, index) => (
          <Message
            key={index}
            msg={msg.speak}
            channelId={msg.channelId}
            attachments={msg.heroCards}
            directLinePost={directLinePost}
          />
        ))}
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          placeholder="messge..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <p onClick={() => pdfDownload()}>download</p> */}
        <i
          onClick={() => pdfDownload()}
          className="file pdf large outline icon"></i>
        <button className="send-btn">
          <img src={sendIcon} className="send-icon" alt="" />
        </button>
      </form>
    </div>
  );
};

export default React.memo(Chatbox);
