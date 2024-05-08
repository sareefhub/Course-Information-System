import React from "react";
import './fanpagecard.css';

const FanPageCard = ({ item }) => {
    return (
      <a className="custom-card" href={item.link} target="_blank" rel="noopener noreferrer">
        <div>
          <img src={item.Image} alt="" width={250} height={250}/>
        </div>
        <div className="fanpage-name" >{item.FB}</div>
      </a>
    );
  };


export default FanPageCard;
