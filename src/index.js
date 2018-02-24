import "./less/index.less";
import "./css/index.css";
require("expose-loader?zjs!./js/index.js");
require("expose-loader?zutil!./util/util.js");
require("expose-loader?$!jquery");

// var dv = document.createElement("div");
// dv.className = localCss.test;
// document.body.appendChild(dv);
import {test} from "./js/shaking"

console.log(test());