'use strict';

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var MediaQuery = require('react-responsive');
var ReactBGVideo = require('react-background-video');
var Markdown = require('react-remarkable');


var store = require('./store');

var Contact = React.createClass({
  displayName: 'Contact',
  getInitialState: function getInitialState() {
    return {
      "image": "",
      "facebook": "",
      "twitter": "",
      "email": "",
      "instagram": "",
      "name": "Loading ...",
      "content": 'Loading ...',
      "mobileimage": "",
      "bgImage": "",
      "Mobile": "Loading ...",
      "Office": "Loading ...",
      "City": "Loading ...",
      map: '',
      details: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/28').then(function (_ref) {
      var acf = _ref.acf;

      _this.setState(acf);
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Contact' },
      React.createElement(_reactHelmet2.default, {
        title: 'Coastal Luxe Living - Specializing in luxury Coastal properties - ' + this.state.name
      }),
      React.createElement(Top, {
        name: this.state.name,
        email: this.state.email,
        Mobile: this.state.Mobile,
        Office: this.state.Office,
        City: this.state.City,
        url: this.state.map }),
      React.createElement(Ryan, {
        mobileimage: this.state.mobileimage,
        image: this.state.image,
        content: this.state.content,
        details: this.state.details })
    );
  }
});

var Top = React.createClass({
  displayName: 'Top',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Top' },
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        this.Mobile()
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768, maxDeviceWidth: 1024 },
        this.Tablet()
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1025 },
        this.Desktop()
      )
    );
  },
  Desktop: function Desktop() {
    return React.createElement(
      'div',
      { className: 'Tablet' },
      React.createElement(
        ReactBGVideo,
        {
          className: 'BGVideo',
          videos: [{
            src: '/img/ryan.mp4'
          }, {
            src: '/img/ryan.webm'
          }],
          poster: '/img/ryan.jpg',
          loop: true,
          autoPlay: true,
          preload: true },
        React.createElement(
          'div',
          { className: 'BGContent' },
          React.createElement(
            'div',
            { className: 'name' },
            React.createElement(
              'div',
              { className: 'text' },
              this.props.name
            )
          ),
          React.createElement('div', { className: 'hidden' })
        )
      ),
      React.createElement(
        'div',
        { className: 'infoWrapper' },
        React.createElement(
          'div',
          { className: 'info' },
          React.createElement(
            'div',
            { className: 'mobile col' },
            React.createElement(
              'a',
              { target: '_blank', href: 'tel:310-344-0898', className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-mobile' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.Mobile
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'office col' },
            React.createElement(
              'a',
              { target: '_blank', href: this.props.url, className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-map-marker' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.Office,
                ' ',
                React.createElement('br', null),
                ' ',
                this.props.City
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'email col' },
            React.createElement(
              'a',
              { target: '_blank', href: 'mailto:' + this.props.email, className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-paper-plane' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.email
              )
            )
          )
        )
      )
    );
  },
  Tablet: function Tablet() {
    return React.createElement(
      'div',
      { className: 'Tablet' },
      React.createElement('div', { className: 'BGVideo', style: {
          backgroundImage: "url('/img/ryan.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          WebkitBackgroundSize: 'cover',
          position: 'absolute',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: '-10000'
        } }),
      React.createElement(
        'div',
        { className: 'BGContent' },
        React.createElement(
          'div',
          { className: 'name' },
          React.createElement(
            'div',
            { className: 'text' },
            this.props.name
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'infoWrapper' },
        React.createElement(
          'div',
          { className: 'info' },
          React.createElement(
            'div',
            { className: 'mobile col' },
            React.createElement(
              'a',
              { target: '_blank', href: 'tel:310-344-0898', className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-mobile' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.Mobile
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'office col' },
            React.createElement(
              'a',
              { target: '_blank', href: this.props.url, className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-map-marker' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.Office,
                ' ',
                React.createElement('br', null),
                ' ',
                this.props.City
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'email col' },
            React.createElement(
              'a',
              { target: '_blank', href: 'mailto:' + this.props.email, className: 'wrapper' },
              React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('i', { className: 'fa fa-paper-plane' })
              ),
              React.createElement(
                'div',
                { className: 'content' },
                this.props.email
              )
            )
          )
        )
      )
    );
  },
  Mobile: function Mobile() {
    return React.createElement(
      'div',
      { className: ' Mobile' },
      React.createElement('div', { className: 'BGVideo', style: {
          backgroundImage: "url('/img/ryan.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundSize: 'cover',
          position: 'absolute',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: '-10000'
        } }),
      React.createElement(
        'div',
        { className: 'BGContent' },
        React.createElement(
          'div',
          { className: 'name' },
          React.createElement(
            'div',
            { className: 'text' },
            this.props.name
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'info-wrapper' },
        React.createElement(
          'div',
          { className: 'info' },
          React.createElement(
            'a',
            { target: '_blank', href: 'tel:310-344-0898', className: 'mobile wrapper' },
            React.createElement(
              'div',
              { className: 'icon' },
              React.createElement('i', { className: 'fa fa-mobile' })
            ),
            React.createElement(
              'div',
              { className: 'content' },
              React.createElement(
                'div',
                { className: 'text' },
                this.props.Mobile
              )
            )
          ),
          React.createElement('div', { className: 'border' }),
          React.createElement(
            'a',
            { target: '_blank', href: this.props.url, className: 'office wrapper' },
            React.createElement(
              'div',
              { className: 'icon' },
              React.createElement('i', { className: 'fa fa-map-marker' })
            ),
            React.createElement(
              'div',
              { className: 'content' },
              React.createElement(
                'div',
                { className: 'text' },
                this.props.Office,
                ' ',
                React.createElement('br', null),
                ' ',
                this.props.City
              )
            )
          ),
          React.createElement('div', { className: 'border' }),
          React.createElement(
            'a',
            { target: '_blank', href: 'mailto:' + this.props.email, className: 'email wrapper' },
            React.createElement(
              'div',
              { className: 'icon' },
              React.createElement('i', { className: 'fa fa-paper-plane' })
            ),
            React.createElement(
              'div',
              { className: 'content' },
              React.createElement(
                'div',
                { className: 'text' },
                this.props.email
              )
            )
          )
        )
      )
    );
  }
});

var Ryan = React.createClass({
  displayName: 'Ryan',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Ryan' },
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        this.Mobile()
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768 },
        this.Tablet()
      )
    );
  },
  Mobile: function Mobile() {
    return React.createElement(
      'div',
      { className: 'Mobile' },
      React.createElement(
        'div',
        { className: 'image' },
        React.createElement('img', { src: this.props.mobileimage })
      ),
      React.createElement('div', { className: 'content', dangerouslySetInnerHTML: { __html: this.props.content } }),
      React.createElement('div', { className: 'details', dangerouslySetInnerHTML: { __html: this.props.details } })
    );
  },
  Tablet: function Tablet() {
    return React.createElement(
      'div',
      { className: 'Tablet' },
      React.createElement(
        'div',
        { className: 'wrap' },
        React.createElement(
          'div',
          { className: 'image' },
          React.createElement('img', { src: this.props.image })
        ),
        React.createElement('div', { className: 'content', dangerouslySetInnerHTML: { __html: this.props.content } })
      ),
      React.createElement('div', { className: 'details', dangerouslySetInnerHTML: { __html: this.props.details } })
    );
  }
});

module.exports = Contact;