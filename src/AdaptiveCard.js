import React, { useEffect, useRef, useState } from "react";
import * as AdaptiveCards from "adaptivecards";

const AdaptiveCard = ({ directLinePost, card }) => {
  const [actionData, setActionData] = useState("help");
  const cardRef = useRef();

  let {
    content: {
      title: title,
      subtitle: subtitle,
      text: text,
      images: images,
      buttons: buttons,
    },
    contentType: contentType,
  } = card;

  var cardData = {
    type: "AdaptiveCard",
    body: [
      {
        type: "TextBlock",
        size: "Medium",
        weight: "Bolder",
        text: `${title}`,
      },
      {
        type: "ActionSet",
        actions: [
          {
            type: "Action.Submit",
            title: "Help",
            style: "positive",
          },
        ],
      },
    ],
    actions: [
      {
        type: "Action.ShowCard",
        title: "Set due date",
        card: {
          type: "AdaptiveCard",
          body: [
            {
              type: "Input.Date",
              id: "dueDate",
            },
            {
              type: "Input.Text",
              id: "comment",
              placeholder: "Add a comment",
              isMultiline: true,
            },
          ],
          actions: [
            {
              type: "Action.Submit",
              title: "OK",
            },
          ],
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        },
      },
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.5",
  };

  useEffect(() => {
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();

    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Nunito",
    });
    adaptiveCard.onExecuteAction = function (action) {
      setActionData(action._propertyBag.title);
      alert(actionData);
      console.log(actionData);
      directLinePost(actionData);
    };

    adaptiveCard.parse(cardData);

    var renderedCard = adaptiveCard.render();

    cardRef.current.append(renderedCard);

    console.log(cardRef);
  }, []);

  return <div ref={cardRef} />;
};

export default AdaptiveCard;
