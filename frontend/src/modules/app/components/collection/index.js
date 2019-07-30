import React from "react";
import { Cover } from "../../components";

const Collection = ({ games }) => {
  return (
    <div>
      {games.map(g => {
        return <Cover className="tiny-cover" size="big" imageId={g.cover_id} />;
      })}
    </div>
  );
};

export default Collection;
