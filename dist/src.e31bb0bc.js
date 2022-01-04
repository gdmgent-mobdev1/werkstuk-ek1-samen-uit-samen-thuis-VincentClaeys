// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"library/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component(_ref) {
    var name = _ref.name,
        routerPath = _ref.routerPath;

    _classCallCheck(this, Component);

    this.name = name;
    this.routerPath = routerPath;
    this.reRender = null;
    this.componentContainer = document.getElementById('container');
  }

  _createClass(Component, [{
    key: "clearComponent",
    value: function clearComponent() {
      this.componentContainer.innerHTML = '';
    }
  }]);

  return Component;
}();

var _default = Component;
exports.default = _default;
},{}],"../node_modules/navigo/lib/navigo.min.js":[function(require,module,exports) {
var define;
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("Navigo",[],n):"object"==typeof exports?exports.Navigo=n():t.Navigo=n()}("undefined"!=typeof self?self:this,(function(){return function(){"use strict";var t={407:function(t,n,e){e.d(n,{default:function(){return N}});var o=/([:*])(\w+)/g,r=/\*/g,i=/\/\?/g;function a(t){return void 0===t&&(t="/"),v()?location.pathname+location.search+location.hash:t}function s(t){return t.replace(/\/+$/,"").replace(/^\/+/,"")}function c(t){return"string"==typeof t}function u(t){return t&&t.indexOf("#")>=0&&t.split("#").pop()||""}function h(t){var n=s(t).split(/\?(.*)?$/);return[s(n[0]),n.slice(1).join("")]}function f(t){for(var n={},e=t.split("&"),o=0;o<e.length;o++){var r=e[o].split("=");if(""!==r[0]){var i=decodeURIComponent(r[0]);n[i]?(Array.isArray(n[i])||(n[i]=[n[i]]),n[i].push(decodeURIComponent(r[1]||""))):n[i]=decodeURIComponent(r[1]||"")}}return n}function l(t,n){var e,a=h(s(t.currentLocationPath)),l=a[0],p=a[1],d=""===p?null:f(p),v=[];if(c(n.path)){if(e="(?:/^|^)"+s(n.path).replace(o,(function(t,n,e){return v.push(e),"([^/]+)"})).replace(r,"?(?:.*)").replace(i,"/?([^/]+|)")+"$",""===s(n.path)&&""===s(l))return{url:l,queryString:p,hashString:u(t.to),route:n,data:null,params:d}}else e=n.path;var g=new RegExp(e,""),m=l.match(g);if(m){var y=c(n.path)?function(t,n){return 0===n.length?null:t?t.slice(1,t.length).reduce((function(t,e,o){return null===t&&(t={}),t[n[o]]=decodeURIComponent(e),t}),null):null}(m,v):m.groups?m.groups:m.slice(1);return{url:s(l.replace(new RegExp("^"+t.instance.root),"")),queryString:p,hashString:u(t.to),route:n,data:y,params:d}}return!1}function p(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function d(t,n){return void 0===t[n]||!0===t[n]}function v(){return"undefined"!=typeof window}function g(t,n){return void 0===t&&(t=[]),void 0===n&&(n={}),t.filter((function(t){return t})).forEach((function(t){["before","after","already","leave"].forEach((function(e){t[e]&&(n[e]||(n[e]=[]),n[e].push(t[e]))}))})),n}function m(t,n,e){var o=n||{},r=0;!function n(){t[r]?Array.isArray(t[r])?(t.splice.apply(t,[r,1].concat(t[r][0](o)?t[r][1]:t[r][2])),n()):t[r](o,(function(t){void 0===t||!0===t?(r+=1,n()):e&&e(o)})):e&&e(o)}()}function y(t,n){void 0===t.currentLocationPath&&(t.currentLocationPath=t.to=a(t.instance.root)),t.currentLocationPath=t.instance._checkForAHash(t.currentLocationPath),n()}function _(t,n){for(var e=0;e<t.instance.routes.length;e++){var o=l(t,t.instance.routes[e]);if(o&&(t.matches||(t.matches=[]),t.matches.push(o),"ONE"===t.resolveOptions.strategy))return void n()}n()}function k(t,n){t.navigateOptions&&(void 0!==t.navigateOptions.shouldResolve&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),void 0!==t.navigateOptions.silent&&console.warn('"silent" is deprecated. Please check the documentation.')),n()}function O(t,n){!0===t.navigateOptions.force?(t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]),n(!1)):n()}m.if=function(t,n,e){return Array.isArray(n)||(n=[n]),Array.isArray(e)||(e=[e]),[t,n,e]};var w=v(),L=p();function b(t,n){if(d(t.navigateOptions,"updateBrowserURL")){var e=("/"+t.to).replace(/\/\//g,"/"),o=w&&t.resolveOptions&&!0===t.resolveOptions.hash;L?(history[t.navigateOptions.historyAPIMethod||"pushState"](t.navigateOptions.stateObj||{},t.navigateOptions.title||"",o?"#"+e:e),location&&location.hash&&(t.instance.__freezeListening=!0,setTimeout((function(){if(!o){var n=location.hash;location.hash="",location.hash=n}t.instance.__freezeListening=!1}),1))):w&&(window.location.href=t.to)}n()}function A(t,n){var e=t.instance;e.lastResolved()?m(e.lastResolved().map((function(n){return function(e,o){if(n.route.hooks&&n.route.hooks.leave){var r=!1,i=t.instance.matchLocation(n.route.path,t.currentLocationPath,!1);r="*"!==n.route.path?!i:!(t.matches&&t.matches.find((function(t){return n.route.path===t.route.path}))),d(t.navigateOptions,"callHooks")&&r?m(n.route.hooks.leave.map((function(n){return function(e,o){return n((function(n){!1===n?t.instance.__markAsClean(t):o()}),t.matches&&t.matches.length>0?1===t.matches.length?t.matches[0]:t.matches:void 0)}})).concat([function(){return o()}])):o()}else o()}})),{},(function(){return n()})):n()}function P(t,n){d(t.navigateOptions,"updateState")&&t.instance._setCurrent(t.matches),n()}var R=[function(t,n){var e=t.instance.lastResolved();if(e&&e[0]&&e[0].route===t.match.route&&e[0].url===t.match.url&&e[0].queryString===t.match.queryString)return e.forEach((function(n){n.route.hooks&&n.route.hooks.already&&d(t.navigateOptions,"callHooks")&&n.route.hooks.already.forEach((function(n){return n(t.match)}))})),void n(!1);n()},function(t,n){t.match.route.hooks&&t.match.route.hooks.before&&d(t.navigateOptions,"callHooks")?m(t.match.route.hooks.before.map((function(n){return function(e,o){return n((function(n){!1===n?t.instance.__markAsClean(t):o()}),t.match)}})).concat([function(){return n()}])):n()},function(t,n){d(t.navigateOptions,"callHandler")&&t.match.route.handler(t.match),t.instance.updatePageLinks(),n()},function(t,n){t.match.route.hooks&&t.match.route.hooks.after&&d(t.navigateOptions,"callHooks")&&t.match.route.hooks.after.forEach((function(n){return n(t.match)})),n()}],S=[A,function(t,n){var e=t.instance._notFoundRoute;if(e){t.notFoundHandled=!0;var o=h(t.currentLocationPath),r=o[0],i=o[1],a=u(t.to);e.path=s(r);var c={url:e.path,queryString:i,hashString:a,data:null,route:e,params:""!==i?f(i):null};t.matches=[c],t.match=c}n()},m.if((function(t){return t.notFoundHandled}),R.concat([P]),[function(t,n){t.resolveOptions&&!1!==t.resolveOptions.noMatchWarning&&void 0!==t.resolveOptions.noMatchWarning||console.warn('Navigo: "'+t.currentLocationPath+"\" didn't match any of the registered routes."),n()},function(t,n){t.instance._setCurrent(null),n()}])];function E(){return(E=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t}).apply(this,arguments)}function x(t,n){var e=0;A(t,(function o(){e!==t.matches.length?m(R,E({},t,{match:t.matches[e]}),(function(){e+=1,o()})):P(t,n)}))}function H(t){t.instance.__markAsClean(t)}function j(){return(j=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t}).apply(this,arguments)}var C="[data-navigo]";function N(t,n){var e,o=n||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:C},r=this,i="/",d=null,w=[],L=!1,A=p(),P=v();function R(t){return t.indexOf("#")>=0&&(t=!0===o.hash?t.split("#")[1]||"/":t.split("#")[0]),t}function E(t){return s(i+"/"+s(t))}function N(t,n,e,o){return t=c(t)?E(t):t,{name:o||s(String(t)),path:t,handler:n,hooks:g(e)}}function U(t,n){if(!r.__dirty){r.__dirty=!0,t=t?s(i)+"/"+s(t):void 0;var e={instance:r,to:t,currentLocationPath:t,navigateOptions:{},resolveOptions:j({},o,n)};return m([y,_,m.if((function(t){var n=t.matches;return n&&n.length>0}),x,S)],e,H),!!e.matches&&e.matches}r.__waiting.push((function(){return r.resolve(t,n)}))}function q(t,n){if(r.__dirty)r.__waiting.push((function(){return r.navigate(t,n)}));else{r.__dirty=!0,t=s(i)+"/"+s(t);var e={instance:r,to:t,navigateOptions:n||{},resolveOptions:n&&n.resolveOptions?n.resolveOptions:o,currentLocationPath:R(t)};m([k,O,_,m.if((function(t){var n=t.matches;return n&&n.length>0}),x,S),b,H],e,H)}}function F(){if(P)return(P?[].slice.call(document.querySelectorAll(o.linksSelector||C)):[]).forEach((function(t){"false"!==t.getAttribute("data-navigo")&&"_blank"!==t.getAttribute("target")?t.hasListenerAttached||(t.hasListenerAttached=!0,t.navigoHandler=function(n){if((n.ctrlKey||n.metaKey)&&"a"===n.target.tagName.toLowerCase())return!1;var e=t.getAttribute("href");if(null==e)return!1;if(e.match(/^(http|https)/)&&"undefined"!=typeof URL)try{var o=new URL(e);e=o.pathname+o.search}catch(t){}var i=function(t){if(!t)return{};var n,e=t.split(","),o={};return e.forEach((function(t){var e=t.split(":").map((function(t){return t.replace(/(^ +| +$)/g,"")}));switch(e[0]){case"historyAPIMethod":o.historyAPIMethod=e[1];break;case"resolveOptionsStrategy":n||(n={}),n.strategy=e[1];break;case"resolveOptionsHash":n||(n={}),n.hash="true"===e[1];break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":o[e[0]]="true"===e[1]}})),n&&(o.resolveOptions=n),o}(t.getAttribute("data-navigo-options"));L||(n.preventDefault(),n.stopPropagation(),r.navigate(s(e),i))},t.addEventListener("click",t.navigoHandler)):t.hasListenerAttached&&t.removeEventListener("click",t.navigoHandler)})),r}function I(t,n,e){var o=w.find((function(n){return n.name===t})),r=null;if(o){if(r=o.path,n)for(var a in n)r=r.replace(":"+a,n[a]);r=r.match(/^\//)?r:"/"+r}return r&&e&&!e.includeRoot&&(r=r.replace(new RegExp("^/"+i),"")),r}function M(t){var n=h(s(t)),o=n[0],r=n[1],i=""===r?null:f(r);return{url:o,queryString:r,hashString:u(t),route:N(o,(function(){}),[e],o),data:null,params:i}}function T(t,n,e){return"string"==typeof n&&(n=z(n)),n?(n.hooks[t]||(n.hooks[t]=[]),n.hooks[t].push(e),function(){n.hooks[t]=n.hooks[t].filter((function(t){return t!==e}))}):(console.warn("Route doesn't exists: "+n),function(){})}function z(t){return"string"==typeof t?w.find((function(n){return n.name===E(t)})):w.find((function(n){return n.handler===t}))}t?i=s(t):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'),this.root=i,this.routes=w,this.destroyed=L,this.current=d,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=function(t){t.instance.__dirty=!1,t.instance.__waiting.length>0&&t.instance.__waiting.shift()()},this.on=function(t,n,o){var r=this;return"object"!=typeof t||t instanceof RegExp?("function"==typeof t&&(o=n,n=t,t=i),w.push(N(t,n,[e,o])),this):(Object.keys(t).forEach((function(n){if("function"==typeof t[n])r.on(n,t[n]);else{var o=t[n],i=o.uses,a=o.as,s=o.hooks;w.push(N(n,i,[e,s],a))}})),this)},this.off=function(t){return this.routes=w=w.filter((function(n){return c(t)?s(n.path)!==s(t):"function"==typeof t?t!==n.handler:String(n.path)!==String(t)})),this},this.resolve=U,this.navigate=q,this.navigateByName=function(t,n,e){var o=I(t,n);return null!==o&&(q(o.replace(new RegExp("^/?"+i),""),e),!0)},this.destroy=function(){this.routes=w=[],A&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=L=!0},this.notFound=function(t,n){return r._notFoundRoute=N("*",t,[e,n],"__NOT_FOUND__"),this},this.updatePageLinks=F,this.link=function(t){return"/"+i+"/"+s(t)},this.hooks=function(t){return e=t,this},this.extractGETParameters=function(t){return h(R(t))},this.lastResolved=function(){return d},this.generate=I,this.getLinkPath=function(t){return t.getAttribute("href")},this.match=function(t){var n={instance:r,currentLocationPath:t,to:t,navigateOptions:{},resolveOptions:o};return _(n,(function(){})),!!n.matches&&n.matches},this.matchLocation=function(t,n,e){void 0===n||void 0!==e&&!e||(n=E(n));var o={instance:r,to:n,currentLocationPath:n};return y(o,(function(){})),"string"==typeof t&&(t=void 0===e||e?E(t):t),l(o,{name:String(t),path:t,handler:function(){},hooks:{}})||!1},this.getCurrentLocation=function(){return M(s(a(i)).replace(new RegExp("^"+i),""))},this.addBeforeHook=T.bind(this,"before"),this.addAfterHook=T.bind(this,"after"),this.addAlreadyHook=T.bind(this,"already"),this.addLeaveHook=T.bind(this,"leave"),this.getRoute=z,this._pathToMatchObject=M,this._clean=s,this._checkForAHash=R,this._setCurrent=function(t){return d=r.current=t},function(){A&&(this.__popstateListener=function(){r.__freezeListening||U()},window.addEventListener("popstate",this.__popstateListener))}.call(this),F.call(this)}}},n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{}};return t[o](r,r.exports,e),r.exports}return e.d=function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e(407)}().default}));

},{}],"Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _navigo = _interopRequireDefault(require("navigo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Router
 */
// eslint-disable-next-line import/no-extraneous-dependencies
var Router = {
  router: null,
  getRouter: function getRouter() {
    if (!this.router) {
      this.router = new _navigo.default('/', false);
    }

    return this.router;
  }
};
var _default = Router;
exports.default = _default;
},{"navigo":"../node_modules/navigo/lib/navigo.min.js"}],"App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component = _interopRequireDefault(require("./library/Component"));

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(parent) {
    _classCallCheck(this, App);

    this.parent = parent;
    this.components = [];
  } // eslint-disable-next-line class-methods-use-this


  _createClass(App, [{
    key: "clearContainer",
    value: function clearContainer(container) {
      while (container.firstchild) {
        container.removeChild(container.lastChild);
      }
    }
  }, {
    key: "addComponent",
    value: function addComponent(component) {
      var _this = this;

      if (!(component instanceof _Component.default)) return;
      var name = component.name,
          routerPath = component.routerPath;
      this.components.push(component);

      _Router.default.getRouter().on(routerPath, function () {
        _this.showComponent({
          name: name
        });
      }).resolve();
    }
  }, {
    key: "showComponent",
    value: function showComponent(_ref) {
      var name = _ref.name;
      var foundCompent = this.components.find(function (component) {
        return component.name === name;
      });
      if (!foundCompent) return;
      this.clearContainer(this.parent);
      this.clearContainer(this.parent);

      if (foundCompent.render) {
        this.parent.appendChild(foundCompent.render());
      }
    }
  }]);

  return App;
}();

var _default = App;
exports.default = _default;
},{"./library/Component":"library/Component.js","./Router":"Router.js"}],"library/Elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * My Element Helpers
 */
var Elements = {
  createButton: function createButton(_ref) {
    var _ref$textContent = _ref.textContent,
        textContent = _ref$textContent === void 0 ? '' : _ref$textContent,
        className = _ref.className;
    var button = document.createElement('button');
    button.textContent = textContent;
    button.classList.add(className);
    return button;
  },
  createHeader: function createHeader(_ref2) {
    var _ref2$textContent = _ref2.textContent,
        textContent = _ref2$textContent === void 0 ? ' ' : _ref2$textContent,
        className = _ref2.className;
    var header = document.createElement('h1');
    header.textContent = textContent;
    header.classList.add(className);
    return header;
  },
  createText: function createText(_ref3) {
    var _ref3$textContent = _ref3.textContent,
        textContent = _ref3$textContent === void 0 ? ' ' : _ref3$textContent,
        className = _ref3.className;
    var text = document.createElement('p');
    text.textContent = textContent;
    text.classList.add(className);
    return text;
  },
  createImage: function createImage(_ref4) {
    var newSource = _ref4.newSource,
        className = _ref4.className;
    var picture = document.createElement('img');
    picture.src = newSource;
    picture.classList.add(className);
    return picture;
  },
  createInputField: function createInputField(_ref5) {
    var className = _ref5.className,
        type = _ref5.type,
        text = _ref5.text,
        placeholder = _ref5.placeholder;
    var inputField = document.createElement('input');
    inputField.classList.add(className);
    inputField.setAttribute(type, text);
    inputField.placeholder = placeholder;
    return inputField;
  },
  createContainer: function createContainer(_ref6) {
    var _ref6$className = _ref6.className,
        className = _ref6$className === void 0 ? '' : _ref6$className,
        _ref6$id = _ref6.id,
        id = _ref6$id === void 0 ? '' : _ref6$id,
        _ref6$children = _ref6.children,
        children = _ref6$children === void 0 ? [] : _ref6$children;
    var container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    container.className = className;

    if (children.length) {
      children.forEach(function (child) {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }

    return container;
  }
};
var _default = Elements;
exports.default = _default;
},{}],"images/backgroundImages2.png":[function(require,module,exports) {
module.exports = "/backgroundImages2.409f4c7c.png";
},{}],"images/logo.png":[function(require,module,exports) {
module.exports = "/logo.6023b87e.png";
},{}],"components/HomePage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../library/Component"));

var _Elements = _interopRequireDefault(require("../library/Elements"));

var _backgroundImages = _interopRequireDefault(require("../images/backgroundImages2.png"));

var _logo = _interopRequireDefault(require("../images/logo.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HomePageComponent = /*#__PURE__*/function (_Component) {
  _inherits(HomePageComponent, _Component);

  var _super = _createSuper(HomePageComponent);

  function HomePageComponent() {
    _classCallCheck(this, HomePageComponent);

    return _super.call(this, {
      name: 'home',
      routerPath: '/'
    });
  }

  _createClass(HomePageComponent, [{
    key: "render",
    value: function render() {
      // content wrapper One
      var HomepageContainer = document.createElement('div');

      var header = _Elements.default.createImage({
        newSource: _logo.default,
        className: 'header__logo'
      });

      var firstImage = _Elements.default.createImage({
        newSource: _backgroundImages.default,
        className: 'header__photo'
      }); // wrapper One


      var homePageWrapperOne = _Elements.default.createContainer({
        className: 'header',
        children: [header, firstImage]
      }); // content wrapper Two


      var headerContainerTwo = _Elements.default.createHeader({
        textContent: 'Welcome',
        className: 'welcomeBackContainer__sloganOne'
      });

      var textContainerTwo = _Elements.default.createText({
        textContent: "Don't have an account yet? ",
        className: 'welcomeBackContainer__text'
      }); // inputfield one


      var inputFieldOne = _Elements.default.createInputField({
        className: 'welcomeBackContainer__wrapperFields--inputfieldOne',
        type: 'email',
        placeholder: 'username'
      }); // inputfield Two


      var inputFieldTwo = _Elements.default.createInputField({
        className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
        type: 'password',
        text: 'password',
        placeholder: 'password'
      }); // Login button


      var loginButton = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnLogin',
        textContent: 'Login'
      }); // facebook button


      var loginButtonFacebook = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnFacebook',
        textContent: 'f'
      }); // google button


      var loginButtonGoogle = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnGoogle',
        textContent: 'G'
      }); // btn Register


      var registerButton = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnRegister',
        textContent: 'Register here'
      }); // wrapper inputfields


      var wrapperInputFields = _Elements.default.createContainer({
        className: 'welcomeBackContainer__wrapperFields',
        children: [inputFieldOne, inputFieldTwo]
      }); // wrapper Two


      var homePageWrapperTwo = _Elements.default.createContainer({
        className: 'welcomeBackContainer',
        children: [headerContainerTwo, wrapperInputFields, loginButton, loginButtonFacebook, loginButtonGoogle, textContainerTwo, registerButton]
      }); // combine two wrappers


      var createContainer = _Elements.default.createContainer({
        className: 'togheter',
        children: [homePageWrapperOne, homePageWrapperTwo]
      });

      HomepageContainer.appendChild(createContainer);
      return HomepageContainer;
    }
  }]);

  return HomePageComponent;
}(_Component2.default);

var _default = HomePageComponent;
exports.default = _default;
},{"../library/Component":"library/Component.js","../library/Elements":"library/Elements.js","../images/backgroundImages2.png":"images/backgroundImages2.png","../images/logo.png":"images/logo.png"}],"components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HomePageComponent", {
  enumerable: true,
  get: function () {
    return _HomePage.default;
  }
});

var _HomePage = _interopRequireDefault(require("./HomePage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./HomePage":"components/HomePage.js"}],"components/registerPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../library/Component"));

var _Elements = _interopRequireDefault(require("../library/Elements"));

var _backgroundImages = _interopRequireDefault(require("../images/backgroundImages2.png"));

var _logo = _interopRequireDefault(require("../images/logo.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ReigsterPageComponent = /*#__PURE__*/function (_Component) {
  _inherits(ReigsterPageComponent, _Component);

  var _super = _createSuper(ReigsterPageComponent);

  function ReigsterPageComponent() {
    _classCallCheck(this, ReigsterPageComponent);

    return _super.call(this, {
      name: 'register',
      routerPath: '/register'
    });
  }

  _createClass(ReigsterPageComponent, [{
    key: "render",
    value: function render() {
      // content wrapper One
      var registerPageContainer = document.createElement('div');

      var header = _Elements.default.createImage({
        newSource: _logo.default,
        className: 'header__logo'
      });

      var firstImage = _Elements.default.createImage({
        newSource: _backgroundImages.default,
        className: 'header__photo'
      }); // wrapper One


      var homePageWrapperOne = _Elements.default.createContainer({
        className: 'header',
        children: [header, firstImage]
      }); // content wrapper Two


      var headerContainerTwo = _Elements.default.createHeader({
        textContent: 'Register',
        className: 'welcomeBackContainer__sloganOne'
      });

      var textContainerTwo = _Elements.default.createText({
        textContent: "Don't have an account yet? ",
        className: 'welcomeBackContainer__text'
      }); // inputfield one


      var inputFieldOne = _Elements.default.createInputField({
        className: 'welcomeBackContainer__wrapperFields--inputfieldOne',
        type: 'email',
        placeholder: 'username'
      }); // inputfield Two


      var inputFieldTwo = _Elements.default.createInputField({
        className: 'welcomeBackContainer__wrapperFields--inputfieldTwo',
        type: 'password',
        text: 'password',
        placeholder: 'password'
      }); // Login button


      var loginButton = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnLogin',
        textContent: 'Login'
      }); // facebook button


      var loginButtonFacebook = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnFacebook',
        textContent: 'f'
      }); // google button


      var loginButtonGoogle = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnGoogle',
        textContent: 'G'
      }); // btn Register


      var registerButton = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnRegister',
        textContent: 'Register here'
      }); // wrapper inputfields


      var wrapperInputFields = _Elements.default.createContainer({
        className: 'welcomeBackContainer__wrapperFields',
        children: [inputFieldOne, inputFieldTwo]
      }); // wrapper Two


      var homePageWrapperTwo = _Elements.default.createContainer({
        className: 'welcomeBackContainer',
        children: [headerContainerTwo, wrapperInputFields, loginButton, loginButtonFacebook, loginButtonGoogle, textContainerTwo, registerButton]
      }); // combine two wrappers


      var createContainer = _Elements.default.createContainer({
        className: 'togheter',
        children: [homePageWrapperOne, homePageWrapperTwo]
      });

      registerPageContainer.appendChild(createContainer);
      return registerPageContainer;
    }
  }]);

  return ReigsterPageComponent;
}(_Component2.default);

var _default = ReigsterPageComponent;
exports.default = _default;
},{"../library/Component":"library/Component.js","../library/Elements":"library/Elements.js","../images/backgroundImages2.png":"images/backgroundImages2.png","../images/logo.png":"images/logo.png"}],"index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./App"));

var _components = require("./components");

var _registerPage = _interopRequireDefault(require("./components/registerPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // Element Helpers
// import './sass/main.scss';
// import Elements from './library/Elements';
// const appContainer = document.getElementById('container');
// const button = Elements.createButton({
//   textContent: 'klik hier',
// });
// const header = Elements.createHeader({
//   textContent: 'toop tegoare door Gent',
// });
// const loginContainer = Elements.createContainer({
//   children: [button, header],
// });
// appContainer.appendChild(loginContainer);
// Element Helpers
var initApp = function initApp() {
  var appContainer = document.getElementById('container');
  var app = new _App.default(appContainer);
  app.addComponent(new _components.HomePageComponent());
  app.addComponent(new _registerPage.default());
};

window.addEventListener('load', initApp);
},{"./App":"App.js","./components":"components/index.js","./components/registerPage":"components/registerPage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49815" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map