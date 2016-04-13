'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouter = require('react-router');

var React = require('react');
var MediaQuery = require('react-responsive');


var store = require('../store');

var Menu = React.createClass({
  displayName: 'Menu',
  render: function render() {
    var height = $(window).height();
    var width = $(window).width();

    return React.createElement(
      'div',
      { className: 'Menu', style: width < 768 ? { height: height - 50 } : {} },
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        React.createElement(Mobile, this.props)
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768 },
        React.createElement(Tablet, this.props)
      )
    );
  }
});

var Mobile = React.createClass({
  displayName: 'Mobile',
  getInitialState: function getInitialState() {
    return {
      properties: false,
      buildings: false
    };
  },
  onClickHandler: function onClickHandler(event) {
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
    var _this = this;

    var _state = this.state;
    var properties = _state.properties;
    var buildings = _state.buildings;

    return React.createElement(
      'div',
      { className: 'View Mobile' },
      React.createElement(
        'div',
        { className: 'wrap' },
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement(
            'div',
            { className: 'categoryName' },
            React.createElement(
              _reactRouter.Link,
              { to: '/', onClick: this.onClickHandler },
              'HOME'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            {
              onClick: function onClick() {
                return _this.setState(_extends({}, _this.state, { properties: !properties }));
              },
              className: 'categoryName' },
            'PROPERTIES',
            React.createElement('i', { className: 'fa fa-chevron-' + (properties ? 'up' : 'down') })
          ),
          properties ? React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/forSale', onClick: this.onClickHandler },
                'FOR SALE'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/lease', onClick: this.onClickHandler },
                'FOR LEASE'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/sold', onClick: this.onClickHandler },
                'SOLD'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                'a',
                { target: '_blank', href: 'http://idx.coastalluxeliving.com/homesearch/89398', onClick: this.onClickHandler },
                'SEARCH'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                'a',
                { target: '_blank', href: 'http://idx.coastalluxeliving.com/openhomes/89398', onClick: this.onClickHandler },
                'OPEN HOMES'
              )
            )
          ) : React.createElement('div', null)
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            {
              onClick: function onClick() {
                return _this.setState(_extends({}, _this.state, { buildings: !buildings }));
              },
              className: 'categoryName' },
            'BUILDINGS',
            React.createElement('i', { className: 'fa fa-chevron-' + (buildings ? 'up' : 'down') })
          ),
          buildings ? React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/Azzurra', onClick: this.onClickHandler },
                'AZZURRA'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/Regatta', onClick: this.onClickHandler },
                'REGATTA'
              )
            ),
            React.createElement(
              'div',
              { className: 'submenu' },
              React.createElement(
                _reactRouter.Link,
                { to: '/Cove', onClick: this.onClickHandler },
                'COVE'
              )
            )
          ) : React.createElement('div', null)
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            { className: 'categoryName' },
            React.createElement(
              _reactRouter.Link,
              { to: '/contact', onClick: this.onClickHandler },
              'CONTACT'
            )
          )
        )
      )
    );
  }
});

var Tablet = React.createClass({
  displayName: 'Tablet',
  onClickHandler: function onClickHandler(event) {
    store.dispatch({ type: 'MENU_TOGGLE' });
  },
  closeMenu: function closeMenu(event) {
    event.preventDefault();
    store.dispatch({ type: 'MENU_TOGGLE' });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'View Tablet' },
      React.createElement(
        'div',
        { className: 'wrap' },
        React.createElement(
          'div',
          { className: 'menuClose' },
          React.createElement('i', { onClick: this.closeMenu, className: 'fa fa-times' })
        ),
        React.createElement(
          'div',
          { className: 'category', style: { paddingBottom: 0 } },
          React.createElement(
            'div',
            { className: 'categoryName' },
            React.createElement(
              _reactRouter.Link,
              { to: '/', onClick: this.onClickHandler },
              'HOME'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            { className: 'categoryName' },
            'PROPERTIES'
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/forSale', onClick: this.onClickHandler },
              'FOR SALE'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/lease', onClick: this.onClickHandler },
              'FOR LEASE'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/sold', onClick: this.onClickHandler },
              'SOLD'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              'a',
              { target: '_blank', href: 'http://idx.coastalluxeliving.com/homesearch/89398', onClick: this.onClickHandler },
              'SEARCH'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              'a',
              { target: '_blank', href: 'http://idx.coastalluxeliving.com/openhomes/89398', onClick: this.onClickHandler },
              'OPEN HOMES'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            { className: 'categoryName' },
            'BUILDINGS'
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/Azzurra', onClick: this.onClickHandler },
              'AZZURRA'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/Regatta', onClick: this.onClickHandler },
              'REGATTA'
            )
          ),
          React.createElement(
            'div',
            { className: 'submenu' },
            React.createElement(
              _reactRouter.Link,
              { to: '/Cove', onClick: this.onClickHandler },
              'COVE'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'category' },
          React.createElement('div', { className: 'menuBorder' }),
          React.createElement(
            'div',
            { className: 'categoryName' },
            React.createElement(
              _reactRouter.Link,
              { to: '/contact', onClick: this.onClickHandler },
              'CONTACT'
            )
          )
        )
      )
    );
  }
});

module.exports = Menu;