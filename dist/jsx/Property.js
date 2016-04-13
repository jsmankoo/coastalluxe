'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');


var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

var Property = React.createClass({
  displayName: 'Property',
  getInitialState: function getInitialState() {
    return {
      building: {
        "name": "Loading ...",
        "content": "",
        "image": "",
        "moreContent": "",
        "jumbotron": "",
        "facilities": []
      },
      property: {
        "name": "Loading ...",
        "number": "",
        "streetname": "",
        "city": "",
        "zip": "",
        "bed": "",
        "bath": "",
        "area": "",
        "mls": "",
        "title": "",
        "paragraph": "",
        "forSale": "",
        "lease": "",
        "text": "",
        "image": "",
        "slide_show": [],
        "facilities": []
      },
      featured: [],
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
    console.log(this.props.params.building);
    switch (this.props.params.building) {
      case 'Azzurra':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/137').then(function (_ref) {
          var acf = _ref.acf;

          _this.setState(_extends({}, _this.state, {
            building: _extends({}, _this.state.building, {
              facilities: acf.facilities
            })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr/' + this.props.params.id).then(function (_ref2) {
          var acf = _ref2.acf;

          _this.setState(_extends({}, _this.state, {
            property: _extends({}, _this.state.property, acf),
            building: _extends({}, _this.state.building, { jumbotron: acf.image })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr').then(function (data) {
          _this.setState(_extends({}, _this.state, {
            featured: data.map(function (_ref3) {
              var id = _ref3.id;
              var acf = _ref3.acf;

              return _extends({}, acf, { id: id });
            })
          }));
        });
        break;
      case 'Regatta':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/139').then(function (_ref4) {
          var acf = _ref4.acf;

          _this.setState(_extends({}, _this.state, {
            building: _extends({}, _this.state.building, {
              facilities: acf.facilities
            })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr/' + this.props.params.id).then(function (_ref5) {
          var acf = _ref5.acf;

          _this.setState(_extends({}, _this.state, {
            property: _extends({}, _this.state.property, acf),
            building: _extends({}, _this.state.building, { jumbotron: acf.image })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr').then(function (data) {
          _this.setState(_extends({}, _this.state, {
            featured: data.map(function (_ref6) {
              var id = _ref6.id;
              var acf = _ref6.acf;

              return _extends({}, acf, { id: id });
            })
          }));
        });
        break;
      case 'Cove':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/140').then(function (_ref7) {
          var acf = _ref7.acf;

          _this.setState(_extends({}, _this.state, {
            building: _extends({}, _this.state.building, {
              facilities: acf.facilities
            })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr/' + this.props.params.id).then(function (_ref8) {
          var acf = _ref8.acf;

          _this.setState(_extends({}, _this.state, {
            property: _extends({}, _this.state.property, acf),
            building: _extends({}, _this.state.building, { jumbotron: acf.image })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr').then(function (data) {
          _this.setState(_extends({}, _this.state, {
            featured: data.map(function (_ref9) {
              var id = _ref9.id;
              var acf = _ref9.acf;

              return _extends({}, acf, { id: id });
            })
          }));
        });
        break;
      default:
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured/' + this.props.params.id).then(function (_ref10) {
          var acf = _ref10.acf;

          _this.setState(_extends({}, _this.state, {
            property: _extends({}, _this.state.property, acf),
            building: _extends({}, _this.state.building, { jumbotron: acf.image })
          }));
        });
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured').then(function (data) {
          _this.setState(_extends({}, _this.state, {
            featured: data.map(function (_ref11) {
              var id = _ref11.id;
              var acf = _ref11.acf;

              return _extends({}, acf, { id: id });
            })
          }));
        });
        break;
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Property' },
      React.createElement(_reactHelmet2.default, {
        title: 'Coastal Luxe Living - Specializing in luxury Coastal properties - ' + this.state.property.name,
        script: [{ "src": "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57056071f6b81438", "type": "text/javascript" }]
      }),
      React.createElement(Jumbotron, this.state),
      React.createElement(Details, _extends({}, this.state.property, { options: this.state.options })),
      this.state.building.facilities.length === 0 ? React.createElement('div', null) : React.createElement(Facilities, this.state.building),
      this.state.property.facilities.length ? React.createElement(Facilities, { facilities: this.state.property.facilities }) : React.createElement('div', null)
    );
  }
});

var Jumbotron = React.createClass({
  displayName: 'Jumbotron',
  saleOnChange: function saleOnChange(event) {
    store.dispatch({
      type: 'FeaturedProperties_SALETYPE',
      saleType: event.target.value
    });
  },
  buildingOnChange: function buildingOnChange(event) {
    store.dispatch({
      type: 'FeaturedProperties_BUILDING',
      building: event.target.value
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Jumbotron', style: { backgroundImage: 'url(' + this.props.building.jumbotron + ')' } },
      React.createElement(
        'div',
        { className: 'bgTint' },
        React.createElement(
          'div',
          { className: 'jumbotron-wrapper' },
          React.createElement(
            'div',
            { className: 'title' },
            this.props.property.name
          ),
          React.createElement('div', { className: 'border' }),
          React.createElement(
            'div',
            { className: 'info' },
            React.createElement(
              'div',
              { className: 'address' },
              this.props.property.number + ' ' + this.props.property.streetname,
              ' ',
              React.createElement('br', null),
              ' ',
              '' + this.props.property.city
            ),
            React.createElement(
              'a',
              { target: '_blank', href: 'https://www.google.ca/maps/place/' + this.props.property.number + ' ' + this.props.property.streetname + ' ' + this.props.property.city },
              React.createElement('i', { className: 'fa fa-map-marker' })
            )
          )
        )
      )
    );
  }
});

var Details = React.createClass({
  displayName: 'Details',
  handlePrice: function handlePrice(sale, lease) {
    if (sale !== '' && lease !== '') {
      return React.createElement(
        'div',
        { className: 'price' },
        '$',
        this.props.forSale,
        React.createElement('br', null),
        '$',
        this.props.lease,
        '/mo.'
      );
    } else if (sale !== '') {
      return React.createElement(
        'div',
        { className: 'price' },
        'FOR SALE',
        React.createElement('br', null),
        '$',
        this.props.forSale
      );
    } else if (lease !== '') {
      return React.createElement(
        'div',
        { className: 'price' },
        'FOR LEASE',
        React.createElement('br', null),
        '$',
        this.props.lease,
        '/mo.'
      );
    }
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'Details' },
      React.createElement(
        'div',
        { className: 'slideShow' },
        React.createElement(
          OwlCarousel,
          { id: 'slideShow', options: this.props.options },
          this.props.slide_show.map(function (_ref12, index) {
            var img = _ref12.img;

            return React.createElement(
              'div',
              { key: index, className: 'item img-wrapper', style: { backgroundImage: 'url(' + img + ')' } },
              _this2.props.text === '' ? React.createElement('div', null) : React.createElement(
                'div',
                { className: 'specialText' },
                _this2.props.text
              )
            );
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'info' },
        React.createElement(
          'div',
          { className: 'info-wrapper' },
          this.handlePrice(this.props.forSale, this.props.lease)
        ),
        React.createElement(
          'div',
          { className: 'info-wrapper' },
          React.createElement(
            'div',
            { className: 'bedBath' },
            'BATH: ',
            this.props.bath,
            React.createElement('br', null),
            'BED: ',
            this.props.bed
          )
        ),
        React.createElement(
          'div',
          { className: 'info-wrapper' },
          React.createElement(
            'div',
            { className: 'area' },
            'APPROX. SQ.FT. ',
            React.createElement('br', null),
            ' ',
            this.props.area
          )
        ),
        React.createElement(
          'div',
          { className: 'info-wrapper' },
          React.createElement(
            'div',
            { className: 'mls' },
            'MLS# ',
            React.createElement('br', null),
            ' ',
            this.props.mls
          )
        )
      ),
      React.createElement('div', { className: 'paragraph', dangerouslySetInnerHTML: { __html: this.props.paragraph } })
    );
  }
});

var Featured = React.createClass({
  displayName: 'Featured',
  getInitialState: function getInitialState() {
    return {
      options: {
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 2,
        itemsDesktop: [1280, 2],
        itemsMobile: [767, 1],
        autoPlay: true
      }
    };
  },
  handleSale: function handleSale(forSale, lease) {
    if (forSale !== '' && lease !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Sale: $',
      forSale,
      ' / For Lease: $',
      lease
    );else if (forSale !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Sale: $',
      forSale
    );else if (lease !== '') return React.createElement(
      'div',
      { className: 'price' },
      'For Lease: $',
      lease
    );
  },
  render: function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      { className: 'Featured' },
      React.createElement(
        'div',
        { className: 'title' },
        'Featured Listings'
      ),
      React.createElement(
        OwlCarousel,
        { id: 'featuredSlide', options: this.state.options },
        this.props.featured.map(function (item, index) {
          return React.createElement(
            'div',
            { className: 'item', key: index },
            React.createElement(
              _reactRouter.Link,
              { to: '/featured/' + _this3.props.building + '/' + item.name + '/' + item.id, className: 'img-wrapper', style: { backgroundImage: 'url(' + item.image + ')' } },
              item.text !== '' ? React.createElement(
                'div',
                { className: 'specialText' },
                item.text
              ) : React.createElement('div', null)
            ),
            React.createElement(
              'div',
              { className: 'info' },
              React.createElement(
                'div',
                { className: 'name' },
                item.name
              ),
              _this3.handleSale(item.forSale, item.lease)
            )
          );
        })
      )
    );
  }
});

var Facilities = React.createClass({
  displayName: 'Facilities',
  getInitialState: function getInitialState() {
    return {
      options: {
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: true
      }
    };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Facilities' },
      React.createElement(
        'div',
        { className: 'title' },
        'Building Amenities'
      ),
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 1280 },
        React.createElement(
          'div',
          { className: 'Tablet' },
          React.createElement(
            OwlCarousel,
            { id: 'facilitiesSlide', options: this.state.options },
            this.props.facilities.map(function (item, index) {
              return React.createElement(
                'div',
                { className: 'item', key: index },
                React.createElement(
                  'div',
                  { className: 'img-wrapper', style: { backgroundImage: 'url(' + item.img + ')' } },
                  item.text !== '' ? React.createElement(
                    'div',
                    { className: 'specialText' },
                    item.text
                  ) : React.createElement('div', null)
                )
              );
            })
          )
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1281 },
        React.createElement(
          'div',
          { className: 'Desktop' },
          React.createElement(
            OwlCarousel,
            { id: 'facilitiesSlide', options: this.state.options },
            this.props.facilities.map(function (item, index) {
              return React.createElement(
                'div',
                { className: 'item', key: index },
                React.createElement(
                  'div',
                  { className: 'img-wrapper', style: { backgroundImage: 'url(' + item.img + ')' } },
                  item.text !== '' ? React.createElement(
                    'div',
                    { className: 'specialText' },
                    item.text
                  ) : React.createElement('div', null)
                )
              );
            })
          )
        )
      )
    );
  }
});

module.exports = Property;