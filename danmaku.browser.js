/*!
 * awesome-danmaku v1.4.6
 * (c) 2020 August-Z
 * https://github.com/August-Z/awesome-danmaku
 */
(function t(e,n){if(typeof exports==="object"&&typeof module==="object")module.exports=n();else if(typeof define==="function"&&define.amd)define([],n);else{var r=n();for(var i in r)(typeof exports==="object"?exports:e)[i]=r[i]}})(window,function(){return function(n){var r={};function i(t){if(r[t]){return r[t].exports}var e=r[t]={i:t,l:false,exports:{}};n[t].call(e.exports,e,e.exports,i);e.l=true;return e.exports}i.m=n;i.c=r;i.d=function(t,e,n){if(!i.o(t,e)){Object.defineProperty(t,e,{enumerable:true,get:n})}};i.r=function(t){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(t,"__esModule",{value:true})};i.t=function(e,t){if(t&1)e=i(e);if(t&8)return e;if(t&4&&typeof e==="object"&&e&&e.__esModule)return e;var n=Object.create(null);i.r(n);Object.defineProperty(n,"default",{enumerable:true,value:e});if(t&2&&typeof e!="string")for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n};i.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};i.d(t,"a",t);return t};i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};i.p="/";return i(i.s=14)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.DanmakuPlayer=undefined;var f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n){if(Object.prototype.hasOwnProperty.call(n,r)){t[r]=n[r]}}}return t};var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var i=n(1);var c=d(i);var o=n(2);var a=d(o);var u=n(3);var h=n(7);var s=n(10);var l=n(11);function d(t){if(t&&t.__esModule){return t}else{var e={};if(t!=null){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))e[n]=t[n]}}e.default=t;return e}}function y(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++){n[e]=t[e]}return n}else{return Array.from(t)}}function p(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var v=e.DanmakuPlayer=function(){function n(t){p(this,n);this.trackList=[];this.nodeList=[];this.list=[];if(!window){throw new Error("Please run in browser support.")}else if(n.__lock__!==true){throw new Error('Please use the "getPlayer" function instead of creating objects.')}this.playStatus=i.DanmakuControlPlayStatus.EMPTY;this._handleOptions(t);this._init();this._registerEvent()}r(n,[{key:"insert",value:function t(e){var n=this;var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(r){var i=this.nodeTag.toLowerCase();var o=document.createElement(i);var a=this._handleDanmakuOps(e).shift();var u=new h.Dnode(f({control:this},c.DnodeDefaultConfig.getDefault,a)).init(o);var s="";if("nodeClass"in a&&a.nodeClass){if(Array.isArray(a.nodeClass)&&a.nodeClass.every(function(t){return typeof t==="string"})){s=a.nodeClass.join(" ")}else if(typeof a.nodeClass==="string"){s=a.nodeClass}}o.setAttribute("class",this.nodeClass+" "+s);this.el.appendChild(o);u.patch(a).run(function(t){n.el.removeChild(o);delete u.dom})}else{var l;(l=this.list).push.apply(l,y(this._handleDanmakuOps(e)))}return this.list}},{key:"play",value:function t(){if(!Array.isArray(this.list)){throw new TypeError("list must instanceof Array")}else if(["static","static !important",""].includes(getComputedStyle(this.el).position)){throw new Error("Play error! el (wrap dom) position can't is static or empty, \n"+'Please set "relative"、"absolute" or "fixed".')}var e=this;var n=0;function r(){requestAnimationFrame(r);if(++n%e._overlap===0){n=0;e.playTick()}}requestAnimationFrame(r);this.playStatus=i.DanmakuControlPlayStatus.PLAY;this._controlHook(i.DanmakuControlEventName.PLAY);return this}},{key:"playTick",value:function t(){if(this.hasTasks&&this.playStatus===i.DanmakuControlPlayStatus.PLAY){var e=this.list.shift();var n=this.getUnObstructedNode();n.patch(e).run()}}},{key:"pause",value:function t(){var e=this;setTimeout(function(){e.playStatus=i.DanmakuControlPlayStatus.PAUSED;e._controlHook(i.DanmakuControlEventName.PAUSE)},this._loopTime);return this}},{key:"stop",value:function t(){var e=this;setTimeout(function(){clearInterval(e.playTimer);e.clearList();e.playStatus=i.DanmakuControlPlayStatus.STOP;e._controlHook(i.DanmakuControlEventName.STOP)},this._loopTime);return this}},{key:"clearList",value:function t(){if(Array.isArray(this.list)&&this.list.length){this.list=[]}return this}},{key:"change",value:function t(e,n){switch(e){case"opacity":this._changeOpacity(Number(n));break;case"speed":this._changeSpeed(Number(n));break;case"overlap":this._changeOverlap(Number(n));break;default:console.warn("[Change WARN]: The player not has '"+e+"' param! Or this property is readonly.\n")}}},{key:"getUnObstructedTrack",value:function t(e){var n=this.trackList.filter(function(t){return t.unObstructed});var r=typeof e==="number"?e:Math.floor(Math.random()*n.length);return n[r]}},{key:"getUnObstructedNode",value:function t(e){var n=this.nodeList.filter(function(t){return t.unObstructed});var r=typeof e==="number"?e:Math.floor(Math.random()*n.length);return n[r]}},{key:"_handleOptions",value:function t(e){var n=c.DanmakuPlayDefaultConfig.getDefault;if(typeof e==="string"||e instanceof HTMLElement){(0,s.initMergeDefaultParams)({},f({el:e},n),this)}else if(e instanceof Object||Object.prototype.toString.call(e)==="[object Object]"){(0,s.initMergeDefaultParams)(e,f({el:document.body},n),this);if(e.hasOwnProperty("list")){this.insert(e.list)}}else{throw new Error("Control error, bad param(options) !")}return this}},{key:"_init",value:function t(){this._initSelfConfig();this._checkElement();this._bindControlStyle();this._initTrackList();this._initNodeList();this.playStatus=i.DanmakuControlPlayStatus.INIT;this._controlHook(i.DanmakuControlEventName.INIT);return this}},{key:"_registerEvent",value:function t(){var a=this;if(!this.el){return undefined}this.el.addEventListener("transitionend",function(t){if(t&&t.target){var e=t.target;if(!(e instanceof HTMLElement)){return undefined}var n=void 0;if(a._elementMap.has(e)){n=a._elementMap.get(e)}else{for(var r=0,i=a.nodeList.length,o;r<i;r++){o=a.nodeList[r];if(o.dom===e){n=o;break}}}n&&n.flyBack()}})}},{key:"_initSelfConfig",value:function t(){this._loopTime=Number(Math.round(this.rollingTime/this.nodeMaxCount)+c.TICK_TIME);this._overlap=15;return this}},{key:"_checkElement",value:function t(){if(typeof this.el==="string"){var e=document.querySelector(this.el);if(e===null){throw new Error("Control dom(el) query for no result")}else{this.el=e}}else if(!(this.el instanceof HTMLElement)){throw new Error("Control[el] not is HTMLElement, check code !")}return this}},{key:"_bindControlStyle",value:function t(){var e=["overflow: hidden;","cursor: none;","pointer-events: none;","vertical-align: baseline;","transform: translateZ(0);"];if(["","static"].includes(getComputedStyle(this.el).position)){e.push("position: relative;")}this.el.style.cssText=e.join("");return this}},{key:"_initTrackList",value:function t(){var e=this.playerWidth;for(var n=0;n<this.trackCount;n++){this.trackList[n]=new u.Dtrack({index:n,width:e,height:this.trackHeight})}return this}},{key:"_initNodeList",value:function t(){var n=this;var e="";var r=this.nodeTag.toLowerCase();for(var i=0;i<this.nodeMaxCount;i++){e+="<"+r+' class="'+this.nodeClass+'" danmaku></'+r+">"}this.el.innerHTML=e;this._elementMap=new WeakMap;var o=this;requestAnimationFrame(function(){var t=n.el.getElementsByClassName(n.nodeClass);n.nodeList=Array.prototype.slice.call(t).map(function(t){var e=new h.Dnode(f({control:n,text:""},c.DnodeDefaultConfig.getDefault)).init(t);o._elementMap.set(t,e);return e})});return this}},{key:"_handleDanmakuOps",value:function t(e){var n=this;var r=[];if(Array.isArray(e)||Object.prototype.toString.call(e)==="[object Array]"){r.push.apply(r,y(e.map(function(t){return n._transformDnodeOps(t)})))}else{r.push(this._transformDnodeOps(e))}return r}},{key:"_transformDnodeOps",value:function t(e){if(typeof e==="string"){return f({control:this,text:e},c.DnodeDefaultConfig.getDefault)}else if(e instanceof Object){return(0,s.initMergeDefaultParams)(e,f({control:this,text:e.hasOwnProperty(this.nodeValueKey)?e[this.nodeValueKey]:""},c.DnodeDefaultConfig.getDefault))}else{throw new TypeError("TransformDnodeOps error, Bad param!")}}},{key:"_changeDensity",value:function t(){}},{key:"_changeSpeed",value:function t(e){if(Number.isNaN(e)){throw new Error("Change Error, speed type must be number, not NaN !\n"+"Please check speed param !")}else if(e<0){throw new Error("Change Error, opacity value must be greater than 0.\n")}this.nodeList.forEach(function(t){t.speed=e});this.list.forEach(function(t){t.speed=e})}},{key:"_changeOpacity",value:function t(e){if(Number.isNaN(e)){throw new Error("Change Error, opacity type must be number, not NaN !\n"+"Please check opacity param !")}else if(e<0||e>1){throw new Error("Change Error, opacity value must between 0 and 1.\n")}this.nodeList.map(function(t){return t.dom}).forEach(function(t){t.style.opacity=e+""});this.list.forEach(function(t){t.opacity=e})}},{key:"_changeOverlap",value:function t(e){var n=Math.round((1-e)*20)+5;this._overlap=Math.min(25,Math.max(5,n))}},{key:"_controlHook",value:function t(n){var r=this;if(this.on.hasOwnProperty(n)&&typeof this.on[n]==="function"){a.controlEmitter.hook(n,function(t,e){r.on[n](r,t,e)})}}},{key:"playerWidth",get:function t(){return this.el.clientWidth||0}},{key:"hasTasks",get:function t(){return!!this.list.length&&this.trackList.some(function(t){return t.unObstructed})&&this.nodeList.some(function(t){return t.unObstructed})}}],[{key:"getPlayer",value:function t(e){if(!n.instanceControl){n.__lock__=true;n.instanceControl=new n(e)}return n.instanceControl}}]);return n}()},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:true});var r=e(4);Object.keys(r).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return r[e]}})});var i=e(5);Object.keys(i).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return i[e]}})});var o=n.TICK_TIME=16},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.controlEmitter=e.DanmakuControlEvent=undefined;var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var i=n(1);var o=n(6);function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function u(t,e){if(!t){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e&&(typeof e==="object"||typeof e==="function")?e:t}function s(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof e)}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:false,writable:true,configurable:true}});if(e)Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e}var l=function(t){s(e,t);function e(t){a(this,e);return u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}r(e,[{key:"hook",value:function t(e,n){if(this.hooks.has(e)){n(this,e);return}throw new Error("[Event Error]: Hook error, Not has "+e+" event !")}}]);return e}(o.DanmakuEvent);e.DanmakuControlEvent=l;var f=e.controlEmitter=new l(i.DanmakuControlEventName)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var i=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function o(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var r=e.Dtrack=function(){function r(t){o(this,r);this.status=r.UN_ROLLING;this.index=t.index;this.height=t.height;this.offsetTop=t.height*t.index}i(r,[{key:"rolling",value:function t(e){var n=this;requestAnimationFrame(function(){n.status=r.ROLLING;typeof e==="function"&&e(n)})}},{key:"stopRolling",value:function t(){this.status=r.UN_ROLLING}},{key:"getTopByMiddleDnode",value:function t(e){return this.offsetTop+(this.height-e)/2}},{key:"obstructed",get:function t(){return this.status===r.ROLLING}},{key:"unObstructed",get:function t(){return this.status===r.UN_ROLLING}}]);return r}();r.ROLLING=1;r.UN_ROLLING=0},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function i(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var o=e.DnodeDefaultConfig=function(){function e(){i(this,e)}r(e,null,[{key:"getDefault",get:function t(){return{fontSize:e.FONT_SIZE,fontFamily:e.FONT_FAMILY,color:e.COLOR,speed:e.SPEED,fontWeight:e.FONT_WEIGHT,opacity:e.OPACITY,nodeClass:""}}}]);return e}();o.FONT_SIZE=22;o.FONT_FAMILY="SimHei";o.COLOR="#FFFFFF";o.SPEED=1;o.FONT_WEIGHT="normal";o.OPACITY="1";var a=e.DanmakuPlayDefaultConfig=function(){function e(){i(this,e)}r(e,null,[{key:"getDefault",get:function t(){return{rollingTime:e.ROLLING_TIME,nodeTag:e.NODE_TAG,nodeClass:e.NODE_CLASS,nodeMaxCount:e.NODE_MAX_COUNT,nodeValueKey:e.NODE_VALUE_KEY,trackCount:e.TRACK_COUNT,trackHeight:e.TRACK_HEIGHT,on:e.EVENT}}}]);return e}();a.ROLLING_TIME=6e3;a.NODE_TAG="p";a.NODE_CLASS="awesome-danmaku-item";a.NODE_MAX_COUNT=25;a.NODE_VALUE_KEY="value";a.TRACK_COUNT=5;a.TRACK_HEIGHT=40;a.EVENT={}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});function r(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=e.DanmakuControlPlayStatus=function t(){r(this,t)};i.EMPTY=-1;i.INIT=100;i.STOP=110;i.PLAY=200;i.PAUSED=210;var o=e.DanmakuControlEventName={INIT:"init",PLAY:"play",PAUSE:"pause",STOP:"stop"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var o=function(){function n(t,e){var n=[];var r=true;var i=false;var o=undefined;try{for(var a=t[Symbol.iterator](),u;!(r=(u=a.next()).done);r=true){n.push(u.value);if(e&&n.length===e)break}}catch(t){i=true;o=t}finally{try{if(!r&&a["return"])a["return"]()}finally{if(i)throw o}}return n}return function(t,e){if(Array.isArray(t)){return t}else if(Symbol.iterator in Object(t)){return n(t,e)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=function(){function e(t){var i=this;a(this,e);this.hooks=new Set;Object.entries(t).forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i.hooks.add(r)})}r(e,[{key:"hook",value:function t(e,n){}}]);return e}();e.DanmakuEvent=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.Dnode=undefined;var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var o=n(8);var i=n(3);var a=n(0);var u=n(9);function s(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var l=e.Dnode=function(){function i(t){s(this,i);this.launchTimer=null;this.runningTimer=null;this.runStatus=u.DnodeRunStatus.EMPTY;this._init(t)}r(i,[{key:"getDrawStyle",value:function t(){return{display:"inline-block",width:this.width+"px",height:this.height+"px","line-height":this.height+"px","font-size":this.fontSize+"px","font-family":this.fontFamily,"font-weight":this.fontWeight,color:this.color,top:this.track.getTopByMiddleDnode(this.height)+"px",left:this.control.playerWidth+"px",opacity:this.opacity+"","will-change":"transform",transform:"translate3d(0, 0, 0)",transition:"transform "+this.totalTime+"ms linear 0s",perspective:"500px",position:"absolute","user-select":"none","white-space":"nowrap",cursor:"none","pointer-events":"none"}}},{key:"init",value:function t(e){this.dom=e;this.runStatus=u.DnodeRunStatus.INIT;return this}},{key:"patch",value:function t(e){this._init(e);this._computedTextSize();this._computedTotalDistance();this._joinTrack();this._editText();return this}},{key:"run",value:function t(e){var n=this;this._draw();this.runStatus=u.DnodeRunStatus.READY;this.track.rolling(function(t){n.launch();if(n.launchTimer){clearTimeout(n.launchTimer);n.launchTimer=null}n.launchTimer=setTimeout(function(){t.stopRolling();n.runStatus=u.DnodeRunStatus.LAUNCHED},n.launchTime);if(typeof e==="function"){if(n.runningTimer){clearTimeout(n.runningTimer);n.runningTimer=null}n.runningTimer=setTimeout(function(){typeof e==="function"&&e(n)},n.totalTime)}})}},{key:"launch",value:function t(){this.runStatus=u.DnodeRunStatus.RUNNING;this.dom.style.transform="translate3d("+this.translateX+"px, 0, 0)";return this}},{key:"flyBack",value:function t(){this.runStatus=u.DnodeRunStatus.RUN_END;this.dom.style.transition="none";this.dom.style.transform="translate3d(0, 0, 0)";return this}},{key:"_init",value:function t(e){this.text=e.text;this.control=e.control;this.fontSize=e.fontSize;this.fontFamily=e.fontFamily;this.fontWeight=e.fontWeight;this.opacity=e.opacity;this.color=e.color;this.speed=e.speed}},{key:"_computedTextSize",value:function t(){var e=this.fontSize+"px "+this.fontFamily;var n=(0,o.renderTextToSize)(this.text,e,i.getInstanceCanvasRenderingContext2D()),r=n.width;this.width=Math.ceil(r)+Number(this.fontSize);this.height=this.control.trackHeight}},{key:"_computedTotalDistance",value:function t(){var e=this.control.playerWidth+this.width;this.translateX=-1*e;this.launchTime=Math.ceil(this.control.rollingTime*(this.width/e));this.totalTime=Math.ceil(this.control.rollingTime/this.speed)}},{key:"_joinTrack",value:function t(){this.track=this.control.getUnObstructedTrack();return this}},{key:"_editText",value:function t(){this.dom.textContent=this.text;return this}},{key:"_draw",value:function t(){if(!(this.dom instanceof HTMLElement)){throw new Error("Draw error: dom not instanceof HTMLElement !")}var e=this.getDrawStyle();var n="";for(var r in e){n+=r+": "+e[r]+";"}this.dom.style.cssText=n;return this}},{key:"unObstructed",get:function t(){return u.DnodeRunStatus.INIT===this.runStatus||u.DnodeRunStatus.RUN_END===this.runStatus}}],[{key:"getInstanceCanvasRenderingContext2D",value:function t(){if(!this.instanceTextSizeCanvas){var e=document.createElement("canvas");e.id="awesome-danmaku__canvas-rendering-2d";e.style.display="none";if(window&&document.body){document.body.appendChild(e)}this.instanceTextSizeCanvas=e;this.instanceTextSizeCanvasRenderingContext2D=e.getContext("2d")}return this.instanceTextSizeCanvasRenderingContext2D}}]);return i}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.translateTextToSize=r;e.renderTextToSize=i;function r(t,e){e.textContent=t;var n=window.getComputedStyle(e),r=n.width,i=n.height;return{width:parseFloat(r),height:parseFloat(i)}}function i(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";var n=arguments[2];n.font=e;return n.measureText(t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});function r(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=e.DnodeRunStatus=function t(){r(this,t)};i.EMPTY=-1;i.INIT=100;i.READY=110;i.RUNNING=200;i.LAUNCHED=210;i.RUN_END=220},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var o=function(){function n(t,e){var n=[];var r=true;var i=false;var o=undefined;try{for(var a=t[Symbol.iterator](),u;!(r=(u=a.next()).done);r=true){n.push(u.value);if(e&&n.length===e)break}}catch(t){i=true;o=t}finally{try{if(!r&&a["return"])a["return"]()}finally{if(i)throw o}}return n}return function(t,e){if(Array.isArray(t)){return t}else if(Symbol.iterator in Object(t)){return n(t,e)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();e.initMergeDefaultParams=r;function r(t,i,e){if(!(t instanceof Object)||!(i instanceof Object)){throw new TypeError("params must instanceof Object !")}Object.entries(t).forEach(function(t){var e=o(t,2),n=e[0],r=e[1];if(i.hasOwnProperty(n)){i[n]=r}});var n=Object.entries(i);return e&&e instanceof Object?a(e,n):u(n)}function a(i,t){t.forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i[n]=r});return i}function u(t){var i={};t.forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i[n]=r});return i}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:true});var r=e(2);Object.keys(r).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return r[e]}})})},,,function(t,e,n){"use strict";var r=n(0);if(window&&window["AwesomeDanmaku"]===undefined){window.AwesomeDanmaku=r.DanmakuPlayer}}])});