"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* GET users listing. */
_router["default"].get('/', function (req, res, next) {
  res.send('respond with a resource');
});

var _default = _router["default"];
exports["default"] = _default;