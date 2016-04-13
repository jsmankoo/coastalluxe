'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactScroll = require('react-scroll');

var _reactMotion = require('react-motion');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');
var MediaQuery = require('react-responsive');
var ReactBGVideo = require('react-background-video');
var Markdown = require('react-remarkable');
var A = require('react-router').Link;


var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

var Home = React.createClass({
  displayName: 'Home',
  getInitialState: function getInitialState() {
    return {
      items: [],
      options: {
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: true
      }
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/18').then(function (_ref) {
      var acf = _ref.acf;

      store.dispatch({
        type: 'HOME_INIT',
        data: acf
      });
      var links = ['' + (acf.featured !== '0' ? 'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured?per_page=' + acf.featured : ''), '' + (acf.azzurraa !== '0' ? 'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr?per_page=' + acf.azzurraa : ''), '' + (acf.regatta !== '0' ? 'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr?per_page=' + acf.regatta : ''), '' + (acf.cove !== '0' ? 'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr?per_page=' + acf.cove : '')];
      links.map(function (link) {
        if (link === '') return;
        $.get(link).then(function (properties) {
          _this.setState(_extends({}, _this.state, {
            items: [].concat(_toConsumableArray(_this.state.items), _toConsumableArray(properties))
          }));
        });
      });
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Home' },
      React.createElement(_reactHelmet2.default, {
        title: 'Coastal Luxe Living - Specializing in luxury Coastal properties - Home Page'
      }),
      React.createElement(Top, {
        headline: store.getState().Home.headline,
        subheadline: store.getState().Home.subheadline }),
      React.createElement(
        _reactScroll.Element,
        { name: 'featured' },
        React.createElement(Featured, {
          items: this.state.items,
          options: this.state.options })
      ),
      React.createElement(Ryan, null),
      React.createElement(Explore, {
        title: store.getState().Home.title,
        subtitle: store.getState().Home.subtitle,
        links: store.getState().Home.links })
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
        { maxDeviceWidth: 1024 },
        React.createElement('div', { className: 'BGVideo', style: {
            backgroundImage: "url('/img/home-mobile-photo.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            WebkitBackgroundSize: 'cover',
            position: 'absolute',
            minHeight: '100%',
            minWidth: '100%',
            zIndex: '-9999'
          } }),
        React.createElement(
          'div',
          { className: 'BGContent' },
          React.createElement(
            'div',
            { className: 'scrollDown' },
            React.createElement(
              _reactScroll.Link,
              { to: 'featured', className: 'button', smooth: true, offset: 50, duration: 500 },
              React.createElement('i', { className: 'fa fa-chevron-down' })
            )
          )
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1025 },
        React.createElement(
          ReactBGVideo,
          {
            className: 'BGVideo',
            videos: [{
              src: '/img/azzura.mp4'
            }, {
              src: '/img/azzura.webm'
            }],
            poster: '/img/azzura.jpg',
            loop: true },
          React.createElement(
            'div',
            { className: 'BGContent' },
            React.createElement(
              'div',
              { className: 'scrollDown' },
              React.createElement(
                _reactScroll.Link,
                { to: 'featured', className: 'button', smooth: true, offset: 50, duration: 500 },
                React.createElement('i', { className: 'fa fa-chevron-down' })
              )
            )
          )
        )
      )
    );
  }
});

var Featured = React.createClass({
  displayName: 'Featured',
  handleSale: function handleSale(item) {
    if (item.acf.forSale !== '' && item.acf.lease !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Sale: $',
      item.acf.forSale,
      ' / For Lease: $',
      item.acf.lease
    );else if (item.acf.forSale !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Sale: $',
      item.acf.forSale
    );else if (item.acf.lease !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Lease: $',
      item.acf.lease
    );
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { id: 'Featured', className: 'Featured' },
      React.createElement(
        _reactMotion.Motion,
        { defaultStyle: { y: 50, opacity: 0 },
          style: {
            y: (0, _reactMotion.spring)(0, { stiffness: 100, damping: 40 }),
            opacity: (0, _reactMotion.spring)(1, { stiffness: 100, damping: 40 })
          } },
        function (style) {
          return React.createElement(
            'div',
            { className: 'Heading', style: {
                opacity: style.opacity,
                position: 'relative',
                top: style.y
              } },
            React.createElement(
              'div',
              { className: 'title' },
              React.createElement(
                A,
                { to: '/featured' },
                'Featured'
              )
            ),
            React.createElement(
              'div',
              { className: 'Row' },
              React.createElement(
                'div',
                { className: 'all' },
                React.createElement(
                  MediaQuery,
                  { minDeviceWidth: 768 },
                  React.createElement(
                    A,
                    { to: '/featured' },
                    'All Properties ',
                    React.createElement('i', { className: 'fa fa-th' })
                  )
                )
              )
            )
          );
        }
      ),
      React.createElement(
        OwlCarousel,
        { id: 'featuredSlide', options: this.props.options },
        this.props.items.map(function (item, index) {
          return React.createElement(
            _reactMotion.Motion,
            { defaultStyle: { opacity: 0 },
              style: {
                opacity: (0, _reactMotion.spring)(1, { stiffness: 150, damping: 40 })
              } },
            function (style) {
              return React.createElement(
                'div',
                { className: 'item', key: index, style: {
                    opacity: style.opacity
                  } },
                React.createElement(
                  A,
                  { to: '/featured/' + item.type + '/' + item.acf.name + '/' + item.id, className: 'img-wrapper', style: { backgroundImage: 'url(' + item.acf.image + ')' } },
                  item.acf.text !== '' ? React.createElement(
                    'div',
                    { className: 'specialText' },
                    item.acf.text
                  ) : React.createElement('div', null)
                ),
                React.createElement(
                  'div',
                  { className: 'info' },
                  React.createElement(
                    'div',
                    { className: 'name' },
                    item.acf.name
                  ),
                  _this2.handleSale(item)
                )
              );
            }
          );
        })
      )
    );
  }
});

var Ryan = React.createClass({
  displayName: 'Ryan',
  getInitialState: function getInitialState() {
    return {
      "image": "/img/transparent.png",
      "facebook": "",
      "twitter": "",
      "email": "",
      "instagram": "",
      "name": "Loading ...",
      "content": "Loading ...",
      "mobileimage": "/img/transparent.png",
      "bgImage": ""
    };
  },
  componentDidMount: function componentDidMount() {
    var _this3 = this;

    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/28').then(function (_ref2) {
      var acf = _ref2.acf;

      _this3.setState(acf);
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Ryan', style: { backgroundImage: 'url(' + this.state.bgImage + ')' } },
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        React.createElement(
          'div',
          { className: 'bgTint' },
          this.Mobile()
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768, maxDeviceWidth: 1280 },
        React.createElement(
          'div',
          { className: 'bgTint' },
          this.Tablet()
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1281 },
        React.createElement(
          'div',
          { className: 'bgTint' },
          this.Desktop()
        )
      )
    );
  },
  Mobile: function Mobile() {
    return React.createElement(
      'div',
      { className: 'wrap Mobile' },
      React.createElement(
        'div',
        { className: 'name' },
        this.state.name
      ),
      React.createElement(
        'div',
        { className: 'image' },
        React.createElement('img', { src: this.state.mobileimage })
      ),
      React.createElement('div', { className: 'info', dangerouslySetInnerHTML: { __html: this.state.content } }),
      React.createElement(
        A,
        { to: '/contact', className: 'more' },
        React.createElement(
          'div',
          { className: 'linkName' },
          'More'
        ),
        React.createElement('i', { className: 'fa fa-chevron-right' })
      )
    );
  },
  Tablet: function Tablet() {
    return React.createElement(
      'div',
      { className: 'wrap Tablet' },
      React.createElement(
        'div',
        { className: 'name' },
        this.state.name
      ),
      React.createElement(
        'div',
        { className: 'Row' },
        React.createElement(
          'div',
          { className: 'image' },
          React.createElement('img', { src: this.state.image })
        ),
        React.createElement('div', { className: 'info', dangerouslySetInnerHTML: { __html: this.state.content } })
      ),
      React.createElement(
        'div',
        { className: 'Row' },
        React.createElement(
          'div',
          { className: 'socialMedia' },
          React.createElement(
            'a',
            { target: '_blank', href: 'mailto:' + this.state.email },
            React.createElement('i', { className: 'fa fa-envelope' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.facebook },
            React.createElement('i', { className: 'fa fa-facebook-f' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.twitter },
            React.createElement('i', { className: 'fa fa-twitter' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.instagram },
            React.createElement('i', { className: 'fa fa-instagram' })
          )
        ),
        React.createElement('div', { className: 'hidden half' }),
        React.createElement(
          'div',
          { className: 'more' },
          React.createElement(
            A,
            { to: '/contact' },
            'More ',
            React.createElement('i', { className: 'fa fa-chevron-right' })
          )
        )
      )
    );
  },
  Desktop: function Desktop() {
    return React.createElement(
      'div',
      { className: 'wrap Desktop' },
      React.createElement(
        'div',
        { className: 'name' },
        this.state.name
      ),
      React.createElement(
        'div',
        { className: 'Row' },
        React.createElement(
          'div',
          { className: 'image' },
          React.createElement('img', { src: this.state.image })
        ),
        React.createElement('div', { className: 'info', dangerouslySetInnerHTML: { __html: this.state.content } })
      ),
      React.createElement(
        'div',
        { className: 'Row' },
        React.createElement(
          'div',
          { className: 'socialMedia' },
          React.createElement(
            'a',
            { target: '_blank', href: 'mailto:' + this.state.email },
            React.createElement('i', { className: 'fa fa-envelope' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.facebook },
            React.createElement('i', { className: 'fa fa-facebook-f' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.twitter },
            React.createElement('i', { className: 'fa fa-twitter' })
          ),
          React.createElement(
            'a',
            { target: '_blank', href: this.state.instagram },
            React.createElement('i', { className: 'fa fa-instagram' })
          )
        ),
        React.createElement('div', { className: 'hidden half' }),
        React.createElement(
          'div',
          { className: 'more' },
          React.createElement(
            A,
            { to: '/contact' },
            'More ',
            React.createElement('i', { className: 'fa fa-chevron-right' })
          )
        )
      )
    );
  }
});

var Explore = React.createClass({
  displayName: 'Explore',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Explore' },
      React.createElement(
        'div',
        { className: 'wrap' },
        React.createElement(
          'div',
          { className: 'title' },
          this.props.title
        ),
        React.createElement('div', { className: 'exploreBorder' }),
        React.createElement(
          'div',
          { className: 'subtitle' },
          this.props.subtitle
        ),
        React.createElement(
          'div',
          { className: 'links' },
          this.props.links.map(function (item, index) {
            return React.createElement(
              'div',
              { className: 'link-wrap', key: index },
              React.createElement(
                'a',
                { href: item.link, className: 'link', style: {
                    backgroundImage: 'url(' + item.Image + ')'
                  } },
                React.createElement(
                  'div',
                  { className: 'exploreTint' },
                  React.createElement(
                    'div',
                    { className: 'titleWrapper' },
                    React.createElement(
                      'div',
                      { className: 'linkTitle' },
                      item.title
                    ),
                    React.createElement(
                      'div',
                      { className: 'linkSubtitle' },
                      item.subtitle
                    )
                  )
                )
              )
            );
          })
        )
      )
    );
  }
});

module.exports = Home;