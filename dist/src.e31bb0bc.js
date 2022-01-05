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
})({"../node_modules/@firebase/util/dist/index.esm2017.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.issuedAtTime = exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.validateArgCount = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,

  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,

  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws an error if the provided assertion is falsy
 */

exports.CONSTANTS = CONSTANTS;

const assert = function (assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */


exports.assert = assert;

const assertionError = function (message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.assertionError = assertionError;

const stringToByteArray$1 = function (str) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */


const byteArrayToString = function (bytes) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let pos = 0,
      c = 0;

  while (pos < bytes.length) {
    const c1 = bytes[pos++];

    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }

  return out.join('');
}; // We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()


const base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,

  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,

  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,

  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,

  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',

  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },

  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },

  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',

  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }

    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];

    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 0x3f;

      if (!haveByte3) {
        outByte4 = 64;

        if (!haveByte2) {
          outByte3 = 64;
        }
      }

      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }

    return output.join('');
  },

  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }

    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },

  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }

    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },

  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];

    for (let i = 0; i < input.length;) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;

      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }

      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);

      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);

        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }

    return output;
  },

  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {}; // We want quick mappings back and forth, so we precompute two maps.

      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i; // Be forgiving when decoding and correctly decode both encodings.

        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }

};
/**
 * URL-safe base64 encoding
 */

exports.base64 = base64;

const base64Encode = function (str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */


exports.base64Encode = base64Encode;

const base64urlEncodeWithoutPadding = function (str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */


exports.base64urlEncodeWithoutPadding = base64urlEncodeWithoutPadding;

const base64Decode = function (str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }

  return null;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */


exports.base64Decode = base64Decode;

function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */


function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      const dateValue = source;
      return new Date(dateValue.getTime());

    case Object:
      if (target === undefined) {
        target = {};
      }

      break;

    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;

    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }

  for (const prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }

    target[prop] = deepExtend(target[prop], source[prop]);
  }

  return target;
}

function isValidKey(key) {
  return key !== '__proto__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Deferred {
  constructor() {
    this.reject = () => {};

    this.resolve = () => {};

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */


  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }

      if (typeof callback === 'function') {
        // Attaching noop handler just in case developer wasn't expecting
        // promises
        this.promise.catch(() => {}); // Some of our callbacks don't expect a value and our own tests
        // assert that the parameter length is 1

        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }

}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Deferred = Deferred;

function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  } // Unsecured JWTs use "none" as the algorithm.


  const header = {
    alg: 'none',
    type: 'JWT'
  };
  const project = projectId || 'demo-project';
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;

  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }

  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token); // Unsecured JWTs use the empty string as a signature.

  const signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */


function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */


function isMobileCordova() {
  return typeof window !== 'undefined' && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/


function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment
 */


function isBrowser() {
  return typeof self === 'object' && self.self === self;
}

function isBrowserExtension() {
  const runtime = typeof chrome === 'object' ? chrome.runtime : typeof browser === 'object' ? browser.runtime : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */


function isReactNative() {
  return typeof navigator === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */


function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */


function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */


function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */


function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */


function isSafari() {
  return !isNode() && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */


function isIndexedDBAvailable() {
  return typeof indexedDB === 'object';
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */


function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);

      request.onsuccess = () => {
        request.result.close(); // delete database only when it doesn't pre-exist

        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }

        resolve(true);
      };

      request.onupgradeneeded = () => {
        preExist = false;
      };

      request.onerror = () => {
        var _a;

        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */


function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }

  return true;
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */


function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */


const ERROR_NAME = 'FirebaseError'; // Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

class FirebaseError extends Error {
  constructor(code, message, customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    this.name = ERROR_NAME; // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, FirebaseError.prototype); // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }

}

exports.FirebaseError = FirebaseError;

class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }

  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : 'Error'; // Service Name: Error message (service/code).

    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }

}

exports.ErrorFactory = ErrorFactory;

function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}

const PATTERN = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */

function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */


function stringify(data) {
  return JSON.stringify(data);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


const decode = function (token) {
  let header = {},
      claims = {},
      data = {},
      signature = '';

  try {
    const parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}

  return {
    header,
    claims,
    data,
    signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.decode = decode;

const isValidTimestamp = function (token) {
  const claims = decode(token).claims;
  const now = Math.floor(new Date().getTime() / 1000);
  let validSince = 0,
      validUntil = 0;

  if (typeof claims === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }

    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }

  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidTimestamp = isValidTimestamp;

const issuedAtTime = function (token) {
  const claims = decode(token).claims;

  if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }

  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.issuedAtTime = issuedAtTime;

const isValidFormat = function (token) {
  const decoded = decode(token),
        claims = decoded.claims;
  return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidFormat = isValidFormat;

const isAdmin = function (token) {
  const claims = decode(token).claims;
  return typeof claims === 'object' && claims['admin'] === true;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.isAdmin = isAdmin;

function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function map(obj, fn, contextObj) {
  const res = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }

  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }

    const aProp = a[k];
    const bProp = b[k];

    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }

  return true;
}

function isObject(thing) {
  return thing !== null && typeof thing === 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */


function querystring(querystringParams) {
  const params = [];

  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach(arrayVal => {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */


function querystringDecode(querystring) {
  const obj = {};
  const tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(token => {
    if (token) {
      const [key, value] = token.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */


function extractQuerystring(url) {
  const queryStart = url.indexOf('?');

  if (!queryStart) {
    return '';
  }

  const fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */

/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */


class Sha1 {
  constructor() {
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */

    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */

    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */

    this.pad_ = [];
    /**
     * @private {number}
     */

    this.inbuf_ = 0;
    /**
     * @private {number}
     */

    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;

    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }

    this.reset();
  }

  reset() {
    this.chain_[0] = 0x67452301;
    this.chain_[1] = 0xefcdab89;
    this.chain_[2] = 0x98badcfe;
    this.chain_[3] = 0x10325476;
    this.chain_[4] = 0xc3d2e1f0;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */


  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }

    const W = this.W_; // get 16 big endian words

    if (typeof buf === 'string') {
      for (let i = 0; i < 16; i++) {
        // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
        // have a bug that turns the post-increment ++ operator into pre-increment
        // during JIT compilation.  We have code that depends heavily on SHA-1 for
        // correctness and which is affected by this bug, so I've removed all uses
        // of post-increment ++ in which the result value is used.  We can revert
        // this change once the Safari bug
        // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
        // most clients have been updated.
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    } // expand to 80 words


    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 0xffffffff;
    }

    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k; // TODO(user): Try to unroll this loop to speed up the computation.

    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 0x5a827999;
        } else {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
      }

      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 0xffffffff;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 0xffffffff;
      b = a;
      a = t;
    }

    this.chain_[0] = this.chain_[0] + a & 0xffffffff;
    this.chain_[1] = this.chain_[1] + b & 0xffffffff;
    this.chain_[2] = this.chain_[2] + c & 0xffffffff;
    this.chain_[3] = this.chain_[3] + d & 0xffffffff;
    this.chain_[4] = this.chain_[4] + e & 0xffffffff;
  }

  update(bytes, length) {
    // TODO(johnlenz): tighten the function signature and remove this check
    if (bytes == null) {
      return;
    }

    if (length === undefined) {
      length = bytes.length;
    }

    const lengthMinusBlock = length - this.blockSize;
    let n = 0; // Using local instead of member variables gives ~5% speedup on Firefox 16.

    const buf = this.buf_;
    let inbuf = this.inbuf_; // The outer while loop should execute at most twice.

    while (n < length) {
      // When we have no data in the block to top up, we can directly process the
      // input buffer (assuming it contains sufficient data). This gives ~25%
      // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
      // the data is provided in large chunks (or in multiples of 64 bytes).
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }

      if (typeof bytes === 'string') {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      }
    }

    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */


  digest() {
    const digest = [];
    let totalBits = this.total_ * 8; // Add pad 0x80 0x00*.

    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    } // Add # bits.


    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256; // Don't use bit-shifting here!
    }

    this.compress_(this.buf_);
    let n = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }

    return digest;
  }

}
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */


exports.Sha1 = Sha1;

function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */


class ObserverProxy {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0; // Micro-task scheduling by calling task.then().

    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers; // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.

    this.task.then(() => {
      executor(this);
    }).catch(e => {
      this.error(e);
    });
  }

  next(value) {
    this.forEachObserver(observer => {
      observer.next(value);
    });
  }

  error(error) {
    this.forEachObserver(observer => {
      observer.error(error);
    });
    this.close(error);
  }

  complete() {
    this.forEachObserver(observer => {
      observer.complete();
    });
    this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */


  subscribe(nextOrObserver, error, complete) {
    let observer;

    if (nextOrObserver === undefined && error === undefined && complete === undefined) {
      throw new Error('Missing Observer.');
    } // Assemble an Observer object when passed as callback functions.


    if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }

    if (observer.next === undefined) {
      observer.next = noop;
    }

    if (observer.error === undefined) {
      observer.error = noop;
    }

    if (observer.complete === undefined) {
      observer.complete = noop;
    }

    const unsub = this.unsubscribeOne.bind(this, this.observers.length); // Attempt to subscribe to a terminated Observable - we
    // just respond to the Observer with the final error or complete
    // event.

    if (this.finalized) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {// nothing
        }

        return;
      });
    }

    this.observers.push(observer);
    return unsub;
  } // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.


  unsubscribeOne(i) {
    if (this.observers === undefined || this.observers[i] === undefined) {
      return;
    }

    delete this.observers[i];
    this.observerCount -= 1;

    if (this.observerCount === 0 && this.onNoObservers !== undefined) {
      this.onNoObservers(this);
    }
  }

  forEachObserver(fn) {
    if (this.finalized) {
      // Already closed by previous event....just eat the additional values.
      return;
    } // Since sendOne calls asynchronously - there is no chance that
    // this.observers will become undefined.


    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  } // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.


  sendOne(i, fn) {
    // Execute the callback asynchronously
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      if (this.observers !== undefined && this.observers[i] !== undefined) {
        try {
          fn(this.observers[i]);
        } catch (e) {
          // Ignore exceptions raised in Observers or missing methods of an
          // Observer.
          // Log error to console. b/31404806
          if (typeof console !== 'undefined' && console.error) {
            console.error(e);
          }
        }
      }
    });
  }

  close(err) {
    if (this.finalized) {
      return;
    }

    this.finalized = true;

    if (err !== undefined) {
      this.finalError = err;
    } // Proxy is no longer needed - garbage collect references
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    this.task.then(() => {
      this.observers = undefined;
      this.onNoObservers = undefined;
    });
  }

}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(fn, onError) {
  return (...args) => {
    Promise.resolve(true).then(() => {
      fn(...args);
    }).catch(error => {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */


function implementsAnyMethods(obj, methods) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const method of methods) {
    if (method in obj && typeof obj[method] === 'function') {
      return true;
    }
  }

  return false;
}

function noop() {// do nothing
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */


const validateArgCount = function (fnName, minCount, maxCount, argCount) {
  let argError;

  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }

  if (argError) {
    const error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */


exports.validateArgCount = validateArgCount;

function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */


function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }

  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}

function validateCallback(fnName, argumentName, // eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }

  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}

function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }

  if (typeof context !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3

/**
 * @param {string} str
 * @return {Array}
 */


const stringToByteArray = function (str) {
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i); // Is this the lead surrogate in a surrogate pair?

    if (c >= 0xd800 && c <= 0xdbff) {
      const high = c - 0xd800; // the high 10 bits.

      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.

      c = 0x10000 + (high << 10) + low;
    }

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */


exports.stringToByteArray = stringToByteArray;

const stringLength = function (str) {
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }

  return p;
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The amount of milliseconds to exponentially increase.
 */


exports.stringLength = stringLength;
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */

const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */

const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.

/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */

exports.MAX_VALUE_MILLIS = MAX_VALUE_MILLIS;
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */

exports.RANDOM_FACTOR = RANDOM_FACTOR;

function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount); // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.

  const randomWait = Math.round( // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * ( // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2); // Limits backoff to max to avoid effectively permanent backoff.

  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provide English ordinal letters after a number
 */


function ordinal(i) {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }

  return i + indicator(i);
}

function indicator(i) {
  i = Math.abs(i);
  const cent = i % 100;

  if (cent >= 10 && cent <= 20) {
    return 'th';
  }

  const dec = i % 10;

  if (dec === 1) {
    return 'st';
  }

  if (dec === 2) {
    return 'nd';
  }

  if (dec === 3) {
    return 'rd';
  }

  return 'th';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{}],"../node_modules/@firebase/component/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;

var _util = require("@firebase/util");

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */

    this.serviceProps = {};
    this.instantiationMode = "LAZY"
    /* LAZY */
    ;
    this.onInstanceCreated = null;
  }

  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }

  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }

  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }

  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */

class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */


  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);

    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);

      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });

          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {// when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }

    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }

  getImmediate(options) {
    var _a; // if multipleInstances is not supported, use the default name


    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;

    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }

  getComponent() {
    return this.component;
  }

  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }

    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }

    this.component = component; // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)

    if (!this.shouldAutoInitialize()) {
      return;
    } // if the service is eager, initialize the default instance


    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {// when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    } // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.


    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {// when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }

  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  } // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?


  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }

  isComponentSet() {
    return this.component != null;
  }

  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }

  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }

  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);

    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }

    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }

    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    }); // resolve any pending promise waiting for the service instance

    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }

    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */


  onInit(callback, identifier) {
    var _a;

    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);

    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }

    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */


  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {// ignore errors in the onInit callback
      }
    }
  }

  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);

    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */

      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */

      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {// ignore errors in the onInstanceCreatedCallback
        }
      }
    }

    return instance || null;
  }

  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }

  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    /* EXPLICIT */
    ;
  }

} // undefined should be passed to the service factory for the default instance


exports.Provider = Provider;

function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}

function isComponentEager(component) {
  return component.instantiationMode === "EAGER"
  /* EAGER */
  ;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */


class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */


  addComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }

    provider.setComponent(component);
  }

  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }

    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */


  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    } // create a Provider for a service that hasn't registered with Firebase


    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }

  getProviders() {
    return Array.from(this.providers.values());
  }

}

exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/@firebase/logger/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */

var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */

const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */

const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */

const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }

  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];

  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};

class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */

    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */

    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */

    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */

    instances.push(this);
  }

  get logLevel() {
    return this._logLevel;
  }

  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }

    this._logLevel = val;
  } // Workaround for setter/getter having to be the same type.


  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }

  get logHandler() {
    return this._logHandler;
  }

  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }

    this._logHandler = val;
  }

  get userLogHandler() {
    return this._userLogHandler;
  }

  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */


  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);

    this._logHandler(this, LogLevel.DEBUG, ...args);
  }

  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);

    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }

  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);

    this._logHandler(this, LogLevel.INFO, ...args);
  }

  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);

    this._logHandler(this, LogLevel.WARN, ...args);
  }

  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);

    this._logHandler(this, LogLevel.ERROR, ...args);
  }

}

exports.Logger = Logger;

function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}

function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;

    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }

    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');

        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}
},{}],"../node_modules/@firebase/app/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  } // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.


  getPlatformInfoString() {
    const providers = this.container.getProviders(); // Loop through providers and get library/version pairs from any that are
    // version components.

    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }

}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */


function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION"
  /* VERSION */
  ;
}

const name$o = "@firebase/app";
const version$1 = "0.7.11";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const logger = new _logger.Logger('@firebase/app');
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "9.6.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default app name
 *
 * @internal
 */

const DEFAULT_ENTRY_NAME = '[DEFAULT]';
exports._DEFAULT_ENTRY_NAME = DEFAULT_ENTRY_NAME;
const PLATFORM_LOG_STRING = {
  [name$o]: 'fire-core',
  [name$n]: 'fire-core-compat',
  [name$l]: 'fire-analytics',
  [name$m]: 'fire-analytics-compat',
  [name$j]: 'fire-app-check',
  [name$k]: 'fire-app-check-compat',
  [name$i]: 'fire-auth',
  [name$h]: 'fire-auth-compat',
  [name$g]: 'fire-rtdb',
  [name$f]: 'fire-rtdb-compat',
  [name$e]: 'fire-fn',
  [name$d]: 'fire-fn-compat',
  [name$c]: 'fire-iid',
  [name$b]: 'fire-iid-compat',
  [name$a]: 'fire-fcm',
  [name$9]: 'fire-fcm-compat',
  [name$8]: 'fire-perf',
  [name$7]: 'fire-perf-compat',
  [name$6]: 'fire-rc',
  [name$5]: 'fire-rc-compat',
  [name$4]: 'fire-gcs',
  [name$3]: 'fire-gcs-compat',
  [name$2]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  'fire-js': 'fire-js',
  [name]: 'fire-js-all'
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */

const _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


exports._apps = _apps;

const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */


exports._components = _components;

function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */


function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */


function _registerComponent(component) {
  const componentName = component.name;

  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }

  _components.set(componentName, component); // add the component to existing app instances


  for (const app of _apps.values()) {
    _addComponent(app, component);
  }

  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */


function _getProvider(app, name) {
  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */


function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 * Test only
 *
 * @internal
 */


function _clearComponents() {
  _components.clear();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const ERRORS = {
  ["no-app"
  /* NO_APP */
  ]: "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()',
  ["bad-app-name"
  /* BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}",
  ["duplicate-app"
  /* DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"
  /* APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  ["invalid-app-argument"
  /* INVALID_APP_ARGUMENT */
  ]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument"
  /* INVALID_LOG_ARGUMENT */
  ]: 'First argument to `onLog` must be null or a function.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC"
    /* PUBLIC */
    ));
  }

  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }

  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }

  get name() {
    this.checkDestroyed();
    return this._name;
  }

  get options() {
    this.checkDestroyed();
    return this._options;
  }

  get config() {
    this.checkDestroyed();
    return this._config;
  }

  get container() {
    return this._container;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */


  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted"
      /* APP_DELETED */
      , {
        appName: this._name
      });
    }
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The current SDK version.
 *
 * @public
 */


const SDK_VERSION = version;
exports.SDK_VERSION = SDK_VERSION;

function initializeApp(options, rawConfig = {}) {
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }

  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;

  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name"
    /* BAD_APP_NAME */
    , {
      appName: String(name)
    });
  }

  const existingApp = _apps.get(name);

  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app"
      /* DUPLICATE_APP */
      , {
        appName: name
      });
    }
  }

  const container = new _component.ComponentContainer(name);

  for (const component of _components.values()) {
    container.addComponent(component);
  }

  const newApp = new FirebaseAppImpl(options, config, container);

  _apps.set(name, newApp);

  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */


function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);

  if (!app) {
    throw ERROR_FACTORY.create("no-app"
    /* NO_APP */
    , {
      appName: name
    });
  }

  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */


function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */


async function deleteApp(app) {
  const name = app.name;

  if (_apps.has(name)) {
    _apps.delete(name);

    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */


function registerVersion(libraryKeyOrName, version, variant) {
  var _a; // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.


  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;

  if (variant) {
    library += `-${variant}`;
  }

  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);

  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];

    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }

    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }

    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }

    logger.warn(warning.join(' '));
    return;
  }

  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION"
  /* VERSION */
  ));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */


function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument"
    /* INVALID_LOG_ARGUMENT */
    );
  }

  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */


function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  )); // Register `app` package.


  registerVersion(name$o, version$1, variant); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  registerVersion(name$o, version$1, 'esm2017'); // Register platform SDK identifier (no version).

  registerVersion('fire-js', '');
}
/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */


registerCoreComponents('');
},{"@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/firebase/app/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("@firebase/app");

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "9.6.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js"}],"firebase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("firebase/app");

/**
 *  Firebase initializer
 */
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA7ept9dMYY1m3IEt7wpjaUPn72sTJGG3Q',
  authDomain: 'spa-samenuit-samenthuis.firebaseapp.com',
  projectId: 'spa-samenuit-samenthuis',
  storageBucket: 'spa-samenuit-samenthuis.appspot.com',
  messagingSenderId: '731709963843',
  appId: '1:731709963843:web:3fe1da7497f09dd604def6'
}; // Initialize Firebase

var initFirebase = function initFirebase() {
  (0, _app.initializeApp)(firebaseConfig);
};

var _default = initFirebase;
exports.default = _default;
},{"firebase/app":"../node_modules/firebase/app/dist/index.esm.js"}],"library/Component.js":[function(require,module,exports) {
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

var _firebase = _interopRequireDefault(require("./firebase"));

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
    (0, _firebase.default)();
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
},{"./firebase":"firebase.js","./library/Component":"library/Component.js","./Router":"Router.js"}],"library/Elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  createIcon: function createIcon(_ref2) {
    var _icon$classList;

    var _ref2$classNames = _ref2.classNames,
        classNames = _ref2$classNames === void 0 ? [] : _ref2$classNames;
    var icon = document.createElement('i');
    if (classNames.length) (_icon$classList = icon.classList).add.apply(_icon$classList, _toConsumableArray(classNames));
    return icon;
  },
  createHeader: function createHeader(_ref3) {
    var _ref3$textContent = _ref3.textContent,
        textContent = _ref3$textContent === void 0 ? ' ' : _ref3$textContent,
        className = _ref3.className;
    var header = document.createElement('h1');
    header.textContent = textContent;
    header.classList.add(className);
    return header;
  },
  createText: function createText(_ref4) {
    var _ref4$textContent = _ref4.textContent,
        textContent = _ref4$textContent === void 0 ? ' ' : _ref4$textContent,
        className = _ref4.className;
    var text = document.createElement('p');
    text.textContent = textContent;
    text.classList.add(className);
    return text;
  },
  createImage: function createImage(_ref5) {
    var newSource = _ref5.newSource,
        className = _ref5.className;
    var picture = document.createElement('img');
    picture.src = newSource;
    picture.classList.add(className);
    return picture;
  },
  createInputField: function createInputField(_ref6) {
    var className = _ref6.className,
        type = _ref6.type,
        text = _ref6.text,
        placeholder = _ref6.placeholder;
    var inputField = document.createElement('input');
    inputField.classList.add(className);
    inputField.setAttribute(type, text);
    inputField.placeholder = placeholder;
    return inputField;
  },
  createContainer: function createContainer(_ref7) {
    var _ref7$className = _ref7.className,
        className = _ref7$className === void 0 ? '' : _ref7$className,
        _ref7$id = _ref7.id,
        id = _ref7$id === void 0 ? '' : _ref7$id,
        _ref7$children = _ref7.children,
        children = _ref7$children === void 0 ? [] : _ref7$children;
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
},{"../library/Component":"library/Component.js","../library/Elements":"library/Elements.js","../images/backgroundImages2.png":"images/backgroundImages2.png","../images/logo.png":"images/logo.png"}],"components/registerPage.js":[function(require,module,exports) {
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
        textContent: 'Already have an account? ',
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
        textContent: 'Register'
      }); // btn Register


      var registerButton = _Elements.default.createButton({
        className: 'welcomeBackContainer__btnRegister',
        textContent: 'Login here'
      }); // wrapper inputfields


      var wrapperInputFields = _Elements.default.createContainer({
        className: 'welcomeBackContainer__wrapperFields',
        children: [inputFieldOne, inputFieldTwo]
      }); // wrapper Two


      var homePageWrapperTwo = _Elements.default.createContainer({
        className: 'welcomeBackContainer',
        children: [headerContainerTwo, wrapperInputFields, loginButton, textContainerTwo, registerButton]
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
},{"../library/Component":"library/Component.js","../library/Elements":"library/Elements.js","../images/backgroundImages2.png":"images/backgroundImages2.png","../images/logo.png":"images/logo.png"}],"components/dashboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../library/Component"));

var _Elements = _interopRequireDefault(require("../library/Elements"));

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

var DashboardComponent = /*#__PURE__*/function (_Component) {
  _inherits(DashboardComponent, _Component);

  var _super = _createSuper(DashboardComponent);

  function DashboardComponent() {
    _classCallCheck(this, DashboardComponent);

    return _super.call(this, {
      name: 'dashboard',
      routerPath: '/dashboard'
    });
  }

  _createClass(DashboardComponent, [{
    key: "render",
    value: function render() {
      // content wrapper One
      var dashboardContainer = document.createElement('div');

      var header = _Elements.default.createImage({
        newSource: _logo.default,
        className: 'dashboard__logo'
      });

      var logOutBtn = _Elements.default.createButton({
        className: 'dashboard__btnLogOut',
        textContent: 'Log out'
      }); // wrapper One


      var homePageWrapperOne = _Elements.default.createContainer({
        className: 'dashboard',
        children: [header, logOutBtn]
      }); // content wrapper Two


      var headerContainerTwo = _Elements.default.createHeader({
        textContent: 'Hello,',
        className: 'dashboardContainer__sloganOne'
      });

      var textContainerTwo = _Elements.default.createText({
        textContent: 'Nice to have you back! ',
        className: 'dashboardContainer__text'
      }); // wrapper Two


      var homePageWrapperTwo = _Elements.default.createContainer({
        className: 'dashboardContainer',
        children: [headerContainerTwo, textContainerTwo]
      }); // content for the containers


      var contentForContainerEvents = _Elements.default.createButton({
        textContent: ' VIEW EVENTS',
        className: 'AllContainers__divOne--text'
      });

      var icon = _Elements.default.createIcon({
        classNames: ['fas', 'fa-street-view', 'input-icon']
      });

      var btnAndIcon = _Elements.default.createContainer({
        className: 'AllContainers__divOne--content',
        children: [icon, contentForContainerEvents]
      }); // all eventsButtons and Containers


      var containerOne = _Elements.default.createContainer({
        className: 'AllContainers__divOne',
        children: [btnAndIcon]
      });

      var contentForContainerEventsTwo = _Elements.default.createButton({
        textContent: ' CHANGE YOUR EVENT',
        className: 'AllContainers__divTwo--text'
      });

      var iconTwo = _Elements.default.createIcon({
        classNames: ['fas', 'fa-cog', 'input-icon']
      });

      var btnAndIconTwo = _Elements.default.createContainer({
        className: 'AllContainers__divTwo--content',
        children: [iconTwo, contentForContainerEventsTwo]
      });

      var containerTwo = _Elements.default.createContainer({
        className: 'AllContainers__divTwo',
        children: [btnAndIconTwo]
      });

      var containerThree = _Elements.default.createContainer({
        className: 'AllContainers__divThree'
      });

      var containerFour = _Elements.default.createContainer({
        className: 'AllContainers__divFour'
      });

      var containerFive = _Elements.default.createContainer({
        className: 'AllContainers__divFive'
      });

      var containerSix = _Elements.default.createContainer({
        className: 'AllContainers__divSix'
      }); // content wrapper Three


      var dashboardEvents = _Elements.default.createContainer({
        className: 'AllContainers',
        children: [containerOne, containerTwo, containerThree, containerFour, containerFive, containerSix]
      }); // combine two wrappers


      var createContainer = _Elements.default.createContainer({
        className: 'togheter',
        children: [homePageWrapperOne, homePageWrapperTwo, dashboardEvents]
      });

      dashboardContainer.appendChild(createContainer);
      return dashboardContainer;
    }
  }]);

  return DashboardComponent;
}(_Component2.default);

var _default = DashboardComponent;
exports.default = _default;
},{"../library/Component":"library/Component.js","../library/Elements":"library/Elements.js","../images/logo.png":"images/logo.png"}],"components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DashboardComponent", {
  enumerable: true,
  get: function () {
    return _dashboard.default;
  }
});
Object.defineProperty(exports, "HomePageComponent", {
  enumerable: true,
  get: function () {
    return _HomePage.default;
  }
});
Object.defineProperty(exports, "ReigsterPageComponent", {
  enumerable: true,
  get: function () {
    return _registerPage.default;
  }
});

var _HomePage = _interopRequireDefault(require("./HomePage"));

var _registerPage = _interopRequireDefault(require("./registerPage"));

var _dashboard = _interopRequireDefault(require("./dashboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./HomePage":"components/HomePage.js","./registerPage":"components/registerPage.js","./dashboard":"components/dashboard.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./App"));

var _components = require("./components");

var _dashboard = _interopRequireDefault(require("./components/dashboard"));

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
  app.addComponent(new _dashboard.default());
};

window.addEventListener('load', initApp);
},{"./App":"App.js","./components":"components/index.js","./components/dashboard":"components/dashboard.js","./components/registerPage":"components/registerPage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61614" + '/');

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