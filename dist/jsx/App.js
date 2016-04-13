'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var store = require('./store');

var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

var App = React.createClass({
  displayName: 'App',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(Nav, _extends({}, store.getState().Nav, { MenuShow: store.getState().Menu.show, buttonShow: store.getState().Menu.buttonShow })),
      store.getState().Menu.show ? React.createElement(Menu, _extends({}, store.getState().Menu, { menuLogo: store.getState().Nav.menuLogo })) : React.createElement('div', null),
      this.props.children,
      React.createElement(Foot, store.getState().Foot)
    );
  }
});

module.exports = App;