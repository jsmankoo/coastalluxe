'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');

var store = require('../store');

var Foot = React.createClass({
  displayName: 'Foot',
  componentDidMount: function componentDidMount() {},
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Foot' },
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
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Mobile View' },
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement(
          'div',
          { className: 'brandLogo' },
          React.createElement(
            'a',
            { href: '/' },
            React.createElement('img', { src: this.props.footerLogo })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement(
          'div',
          { className: 'socialMedia' },
          React.createElement(
            'a',
            { href: 'mailto:' + this.props.email, target: '_blank' },
            React.createElement('i', { className: 'fa fa-envelope' })
          ),
          React.createElement(
            'a',
            { href: this.props.facebook, target: '_blank' },
            React.createElement('i', { className: 'fa fa-facebook-f' })
          ),
          React.createElement(
            'a',
            { href: this.props.twitter, target: '_blank' },
            React.createElement('i', { className: 'fa fa-twitter' })
          ),
          React.createElement(
            'a',
            { href: this.props.instagram, target: '_blank' },
            React.createElement('i', { className: 'fa fa-instagram' })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement('div', { className: 'footer', dangerouslySetInnerHTML: { __html: this.props.copyright } })
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement(
          'div',
          { className: 'bhhs' },
          React.createElement(
            'a',
            _defineProperty({ target: '_blank', href: 'http://www.berkshirehathawayhs.com/' }, 'target', '_blank'),
            React.createElement('img', { src: this.props.berkshireLogo })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement('div', { className: 'footer', dangerouslySetInnerHTML: { __html: this.props.information } })
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement(
          'div',
          { className: 'equalIcon' },
          React.createElement('img', { src: this.props.equalIcon })
        )
      ),
      React.createElement(
        'div',
        { className: 'col' },
        React.createElement('div', { className: 'dev', dangerouslySetInnerHTML: { __html: this.props.dev } })
      )
    );
  }
});

var Tablet = React.createClass({
  displayName: 'Tablet',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Tablet View' },
      React.createElement(
        'div',
        { className: 'brandLogo' },
        React.createElement(
          'a',
          { href: '/' },
          React.createElement('img', { src: this.props.footerLogo })
        )
      ),
      React.createElement(
        'div',
        { className: 'midContent' },
        React.createElement(
          'div',
          { className: 'socialMedia' },
          React.createElement(
            'a',
            { href: 'mailto:' + this.props.email, target: '_blank' },
            React.createElement('i', { className: 'fa fa-envelope' })
          ),
          React.createElement(
            'a',
            { href: this.props.facebook, target: '_blank' },
            React.createElement('i', { className: 'fa fa-facebook-f' })
          ),
          React.createElement(
            'a',
            { href: this.props.twitter, target: '_blank' },
            React.createElement('i', { className: 'fa fa-twitter' })
          ),
          React.createElement(
            'a',
            { href: this.props.instagram, target: '_blank' },
            React.createElement('i', { className: 'fa fa-instagram' })
          )
        ),
        React.createElement('div', { className: 'footer', dangerouslySetInnerHTML: { __html: this.props.copyright + '\n' + this.props.information } }),
        React.createElement(
          'div',
          { className: 'equalIcon' },
          React.createElement('img', { src: this.props.equalIcon })
        ),
        React.createElement('div', { className: 'dev', dangerouslySetInnerHTML: { __html: this.props.dev } })
      ),
      React.createElement(
        'div',
        { className: 'bhhs' },
        React.createElement(
          'a',
          { href: 'http://www.berkshirehathawayhs.com/', target: '_blank' },
          React.createElement('img', { src: this.props.berkshireLogo })
        )
      )
    );
  }
});

module.exports = Foot;