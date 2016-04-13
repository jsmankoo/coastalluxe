'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouter = require('react-router');

var React = require('react');
var MediaQuery = require('react-responsive');
var CSSTransition = require('react-addons-css-transition-group');


var store = require('../store');

var Nav = React.createClass({
  displayName: 'Nav',
  componentDidMount: function componentDidMount() {},
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Nav' },
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        React.createElement(Mobile, _extends({}, this.props, { logo: this.props.mobileLogo }))
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768, maxDeviceWidth: 1280 },
        React.createElement(Tablet, _extends({}, this.props, { logo: this.props.mobileLogo }))
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1281 },
        React.createElement(Desktop, this.props)
      )
    );
  }
});

var Mobile = React.createClass({
  displayName: 'Mobile',
  clickHandler: function clickHandler(event) {
    event.preventDefault();
    store.dispatch({ type: 'MENU_TOGGLE' });
    switch (this.props.menuLogo) {
      case 'fa-bars':
        return store.dispatch({
          type: 'NAV_MENU',
          logo: 'fa-times'
        });
      case 'fa-times':
        return store.dispatch({
          type: 'NAV_MENU',
          logo: 'fa-bars'
        });
      default:
        console.log('Mobile nav: clickHandler default case');
        console.log(this.props.menuLogo);
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Mobile wrap' },
      React.createElement('i', { onClick: this.clickHandler, className: 'fa ' + this.props.menuLogo + ' menuScroll' }),
      React.createElement(
        'div',
        { className: 'col logo' },
        React.createElement(
          _reactRouter.Link,
          { to: '/' },
          React.createElement('img', { src: this.props.logo })
        )
      )
    );
  }
});

var Tablet = React.createClass({
  displayName: 'Tablet',
  clickHandler: function clickHandler(event) {
    event.preventDefault();
    store.dispatch({ type: 'MENU_TOGGLE' });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Tablet wrap' },
      !this.props.MenuShow ? React.createElement('i', { onClick: this.clickHandler, className: 'fa ' + this.props.menuLogo + ' menuScroll' }) : React.createElement(
        'div',
        null,
        this.props.MenuShow
      ),
      React.createElement(
        'div',
        { className: 'col logo' },
        React.createElement(
          _reactRouter.Link,
          { to: '/' },
          React.createElement('img', { src: this.props.logo })
        )
      )
    );
  }
});

var Desktop = React.createClass({
  displayName: 'Desktop',
  clickHandler: function clickHandler(event) {
    event.preventDefault();
    store.dispatch({ type: 'MENU_TOGGLE' });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Desktop wrap' },
      React.createElement(
        'div',
        { className: 'col contact' },
        React.createElement(
          _reactRouter.Link,
          { to: '/contact' },
          React.createElement('i', { className: 'fa ' + this.props.contactLogo }),
          React.createElement(
            'div',
            { className: 'linkName' },
            'CONTACT'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col logo' },
        React.createElement(
          _reactRouter.Link,
          { to: '/' },
          React.createElement('img', { src: this.props.desktopLogo })
        )
      ),
      React.createElement(
        'div',
        { className: 'col menu' },
        React.createElement(
          'a',
          { onClick: this.clickHandler },
          React.createElement(
            'div',
            { className: 'linkName' },
            'MENU'
          ),
          React.createElement('i', { className: 'fa ' + this.props.menuLogo })
        )
      )
    );
  }
});

module.exports = Nav;