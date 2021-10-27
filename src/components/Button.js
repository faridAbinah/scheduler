import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   //Use classNames to conditionally set the class name for the buttong based on if props.whatever is truthy or falsy. If truthy the key will be added as a class.

   let buttonClass=  classNames('button', {'button--confirm':props.confirm},{'button--danger':props.danger});;
   
 

   
   
   
   //disable logic
   //clickable logic is inside the buttong tag
   
   return (
      <button onClick={props.onClick} className={buttonClass} disabled={props.disabled}>{props.children}</button>
   );
}
