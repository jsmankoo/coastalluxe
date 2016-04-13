'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Routes = require('./jsx/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = require('./jsx/store');

var RenderDom = function RenderDom() {
  (0, _reactDom.render)(_react2.default.createElement(_Routes2.default, null), document.getElementById('Main'));
};

store.subscribe(RenderDom);
RenderDom();