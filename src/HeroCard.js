import React from "react";
import "./HeroCard.css";

const HeroCard = ({ card }) => {
  // const obj = {
  //   contentType: "application/vnd.microsoft.card.hero",
  //   content: {
  //     title: "Seattle Center Monorail",
  //     subtitle: "Seattle Center Monorail",
  //     text: "The Seattle Center Monorail is an elevated train line between Seattle Center (near the Space Needle) and downtown Seattle. It was built for the 1962 World's Fair. Its original two trains, completed in 1961, are still in service.",
  //     images: [
  //       {
  //         url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Seattle_monorail01_2008-02-25.jpg/1024px-Seattle_monorail01_2008-02-25.jpg",
  //       },
  //     ],
  //     buttons: [
  //       {
  //         type: "openUrl",
  //         title: "Official website",
  //         value: "https://www.seattlemonorail.com",
  //       },
  //       {
  //         type: "openUrl",
  //         title: "Wikipeda page",
  //         value: "https://en.wikipedia.org/wiki/Seattle_Center_Monorail",
  //       },
  //     ],
  //   },
  // };

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

  return (
    <div className="hero-card__container">
      <h3 className="hero-card__title">{title}</h3>
      {subtitle && <p className="hero-card__subtitle">{subtitle}</p>}
      {images && (
        <div className="hero-card__image-container">
          {images.map((imgSrc) => {
            return <img src={imgSrc.url} alt="" className="hero-card__image" />;
          })}
        </div>
      )}
      {text && <p className="hero-card__text">{text}</p>}
      <div className="hero-card__btn-container">
        {buttons.map((btn) => {
          return <button className="hero-card__btn">{btn.title}</button>;
        })}
      </div>
    </div>
  );
};

export default HeroCard;
