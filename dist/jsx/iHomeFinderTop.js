'use strict';

var _reactRouter = require('react-router');

var ReactDom = require('react-dom');
var React = require('react');


var store = require('./store');

var Home = require('./Home');
var FeaturedProperties = require('./Featured');
var Property = require('./Property');
var Building = require('./Building');
var Contact = require('./Contact');
var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

var renderDom = function renderDom() {
  ReactDom.render(React.createElement(App, null), document.getElementById('Head'));
};

var App = React.createClass({
  displayName: 'App',
  componentDidMount: function componentDidMount() {},
  render: function render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(Nav, store.getState().Nav),
      store.getState().Menu.show ? React.createElement(Menu, store.getState().Menu) : React.createElement('div', null)
    );
  }
});

var Featured = React.createClass({
  displayName: 'Featured',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: 'featured'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var ForSale = React.createClass({
  displayName: 'ForSale',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'sale',
      building: this.props.params.building
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var ForLease = React.createClass({
  displayName: 'ForLease',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'lease',
      building: this.props.params.building
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

store.subscribe(renderDom);
store.subscribe(function () {
  return console.log(store.getState().Nav.affix);
});
renderDom();