import "./style.css";
import * as util from "./util.js";

function component() {
  var element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add("hello");
  element.onclick = util.aa;
  return element;
}

document.body.appendChild(component());
