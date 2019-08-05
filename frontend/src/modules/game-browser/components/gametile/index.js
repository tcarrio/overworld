import React from "react";
import { Cover } from "../../../app/components";
import { TileCoverLoader, TextLoader } from "../../../game/components";
import { Card, Icon, Popup, Image, Header } from "semantic-ui-react";
import Moment from "react-moment";
import "./styles.css";

const GameTile = ({ game }) => {
  const getDeveloperName = companies => {
    if (companies) {
      var dev = companies.find(c => {
        return c.developer === true;
      });
      if (dev) return dev.company.name;
    }
    return "Not Found";
  };

  const getPlatformIcons = platforms => {
    return (
      <React.Fragment>
        {platforms.map((platform, index) => {
          let name = null;

          if (platform.name.includes("PC")) name = "steam";
          else if (platform.name.includes("PlayStation")) name = "playstation";
          else if (platform.name.includes("Xbox")) name = "xbox";
          else if (platform.name.includes("Switch")) name = "nintendo switch";
          else if (platform.name.includes("Windows")) name = "windows";
          else if (platform.name.includes("Mac")) name = "apple";
          else if (platform.name.includes("Android")) name = "android";
          else if (platform.name.includes("iOS")) name = "app store ios";
          const iconWrapper = React.createElement(Icon, {
            name: name,
            size: "large"
          });
          // const iconWrapper = () => <Icon name={name} size={"large"} aria-label={platform.name} />
          return (
            <Popup
              key={game.slug + name + index}
              content={platform.name}
              trigger={iconWrapper}
            />
          );
        })}
      </React.Fragment>
    );
  };

  if (game) {
    const description = game.summary ? game.summary.slice(0, 50) + "..." : null;

    const cover = game.cover ? (
      <div className="game-card-cover">
        <Image
          fluid
          className="cover"
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
            game.cover.image_id
          }.jpg`}
        />
      </div>
    ) : null; //TODO there should be a default cover if the API doesnt provide one

    const developer = game.involved_companies
      ? getDeveloperName(game.involved_companies)
      : null;

    const date = game.first_release_date ? (
      <Moment format="YYYY">{game.first_release_date * 1000}</Moment>
    ) : null;

    const header = game.name ? game.name : null;

    const platforms = game.platforms ? game.platforms : [];

    return (
      // <div className="game-card">
      //   <Cover
      //     imageId={game.cover.image_id}
      //     size="big"
      //     className="smcover-wrapper"
      //   />
      //   <Header>{game.name}</Header>
      // </div>
      <Card
        className="game-card"
        image={cover}
        header={header}
        // description={description}
        href={"/games/" + game.slug}
        extra={getPlatformIcons(platforms)}
      />
    );
  } else {
    return (
      <Card
        className="game-card"
        image={TileCoverLoader}
        description={TextLoader}
      />
    );
  }
};

export default GameTile;
