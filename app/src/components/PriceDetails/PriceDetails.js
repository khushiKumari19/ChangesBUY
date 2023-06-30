import React from "react";
import './style.css'
const PriceDetails = (props) => {
  return (
    <div className="containerInPriceDetails">
      <div>
        <div><text className="txt">No.Of Tokens = <span className="sp">{props.totalItem}</span></text></div>
        {/* <div>{props.totalPrice}</div> */}
      </div>
      <div>
        <div><text className="txt">Total Amount: <span className="sp">{props.totalPrice}</span></text></div>
      </div>
    </div>
  );
};

export default PriceDetails;
