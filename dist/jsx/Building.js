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
        "facilities": [],
        "streetAddress": "",
        "city": "",
        floor_plans: []
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
    switch (this.props.buildingName) {
      case '13700marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/137').then(function (_ref) {
          var acf = _ref.acf;

          _this.setState(_extends({}, _this.state, { building: acf }));
        });
        break;
      case '13750marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/139').then(function (_ref2) {
          var acf = _ref2.acf;

          _this.setState(_extends({}, _this.state, { building: acf }));
        });
        break;
      case '13800marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/140').then(function (_ref3) {
          var acf = _ref3.acf;

          _this.setState(_extends({}, _this.state, { building: acf }));
        });
        break;
      default:
        break;
    }
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/' + this.props.buildingName).then(function (data) {
      _this.setState(_extends({}, _this.state, {
        featured: data.map(function (_ref4) {
          var id = _ref4.id;
          var acf = _ref4.acf;

          return _extends({}, acf, { id: id });
        })
      }));
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Building' },
      React.createElement(_reactHelmet2.default, {
        title: 'Coastal Luxe Living - Specializing in luxury Coastal properties - ' + this.state.building.name
      }),
      React.createElement(Jumbotron, this.state),
      React.createElement(Featured, {
        building: this.props.buildingName,
        featured: this.state.featured,
        options: this.state.options }),
      React.createElement(Details, this.state.building),
      this.state.building.facilities.length === 0 ? React.createElement('div', null) : React.createElement(Facilities, this.state.building),
      React.createElement(Floorplans, this.state.building)
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
            this.props.building.name
          ),
          React.createElement('div', { className: 'border' }),
          React.createElement(
            'div',
            { className: 'info' },
            React.createElement(
              'div',
              { className: 'address' },
              '' + this.props.building.streetAddress,
              ' ',
              React.createElement('br', null),
              ' ',
              '' + this.props.building.city
            ),
            React.createElement(
              'a',
              { target: '_blank', href: 'https://www.google.ca/maps/place/' + this.props.building.streetAddress + ' ' + this.props.building.city },
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
  getInitialState: function getInitialState() {
    return {
      moreContentShow: false
    };
  },
  showContent: function showContent() {
    this.setState(_extends({}, this.state, {
      moreContentShow: !this.state.moreContentShow
    }));
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Details' },
      React.createElement(
        'div',
        { className: 'intro' },
        React.createElement('div', { className: 'img-wrapper', style: { backgroundImage: 'url(' + this.props.image + ')' } }),
        React.createElement('div', { className: 'paragraph', dangerouslySetInnerHTML: { __html: this.props.content } })
      ),
      this.state.moreContentShow ? React.createElement(
        'div',
        { className: 'rest' },
        React.createElement('div', { className: 'paragraph', dangerouslySetInnerHTML: { __html: this.props.moreContent } })
      ) : React.createElement('div', null)
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
        itemsDesktop: [1200, 2],
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
  handleMore: function handleMore(building) {
    switch (building) {
      case '13700marinapointedr':
        return React.createElement(
          'div',
          { className: 'More' },
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Azzurra-For-Lease/89398/314340' },
            'More listings for LEASE'
          ),
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Azzurra-For-Sale/89398/314339' },
            'More listings for SALE'
          )
        );
      case '13750marinapointedr':
        return React.createElement(
          'div',
          { className: 'More' },
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Regatta-For-Lease/89398/314414' },
            'More listings for LEASE'
          ),
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Regatta-For-Sale/89398/314413' },
            'More listings for SALE'
          )
        );
      case '13800marinapointedr':
        return React.createElement(
          'div',
          { className: 'More' },
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Cove-For-Lease/89398/314347' },
            'More listings for LEASE'
          ),
          React.createElement(
            'a',
            { href: 'http://idx.coastalluxeliving.com/report/listing-report/Cove-For-Sale/89398/314346' },
            'More listings for SALE'
          )
        );
      default:
        return React.createElement('div', null);
    }
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'Featured' },
      React.createElement(
        'div',
        { className: 'title' },
        'Properties'
      ),
      React.createElement(
        OwlCarousel,
        { id: 'featuredSlide', options: this.state.options },
        this.props.featured.filter(function (_ref5) {
          var status = _ref5.status;
          return status !== 'sold';
        }).map(function (item, index) {
          return React.createElement(
            'div',
            { className: 'item', key: index },
            React.createElement(
              _reactRouter.Link,
              { className: 'img-wrapper', style: { backgroundImage: 'url(' + item.image + ')' },
                to: function () {
                  switch (_this2.props.building) {
                    case '13700marinapointedr':
                      return '/featured/Azzurra/' + item.name.split(' ').join('-') + '/' + item.id;
                    case '13750marinapointedr':
                      return '/featured/Regatta/' + item.name.split(' ').join('-') + '/' + item.id;
                    case '13800marinapointedr':
                      return '/featured/Cove/' + item.name.split(' ').join('-') + '/' + item.id;
                    default:
                      return '/featured/featured/' + item.name.split(' ').join('-') + '/' + item.id;
                  }
                }() },
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
              _this2.handleSale(item.forSale, item.lease)
            )
          );
        })
      ),
      React.createElement(
        'div',
        { className: 'more' },
        this.handleMore(this.props.building)
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
    );
  }
});

var Floorplans = React.createClass({
  displayName: 'Floorplans',
  render: function render() {
    console.log(this.props.floor_plans);
    return React.createElement(
      'div',
      { className: 'Floorplans' },
      React.createElement(
        'div',
        { className: 'Title' },
        'Floor Plans'
      ),
      React.createElement(
        MediaQuery,
        { maxDeviceWidth: 767 },
        React.createElement(
          'div',
          { className: 'Mobile' },
          this.props.floor_plans.map(function (_ref6, index) {
            var floor_name = _ref6.floor_name;
            var floor_plan = _ref6.floor_plan;

            return React.createElement(
              'div',
              { className: 'FloorPlan', key: index },
              React.createElement(
                'a',
                { href: floor_plan, target: '_blank' },
                React.createElement(
                  'div',
                  { className: 'icon' },
                  React.createElement('i', { className: 'fa fa-file' })
                ),
                React.createElement(
                  'div',
                  { className: 'text-wrapper' },
                  React.createElement(
                    'div',
                    { className: 'text' },
                    floor_name
                  )
                )
              )
            );
          })
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 768, maxDeviceWidth: 1279 },
        React.createElement(
          'div',
          { className: 'Tablet' },
          this.props.floor_plans.map(function (_ref7, index) {
            var floor_name = _ref7.floor_name;
            var floor_plan = _ref7.floor_plan;

            return React.createElement(
              'div',
              { className: 'FloorPlan', key: index },
              React.createElement(
                'a',
                { href: floor_plan, target: '_blank' },
                React.createElement(
                  'div',
                  { className: 'icon' },
                  React.createElement('i', { className: 'fa fa-file' })
                ),
                React.createElement(
                  'div',
                  { className: 'text-wrapper' },
                  React.createElement(
                    'div',
                    { className: 'text' },
                    floor_name
                  )
                )
              )
            );
          })
        )
      ),
      React.createElement(
        MediaQuery,
        { minDeviceWidth: 1280 },
        React.createElement(
          'div',
          { className: 'Desktop' },
          this.props.floor_plans.map(function (_ref8, index) {
            var floor_name = _ref8.floor_name;
            var floor_plan = _ref8.floor_plan;

            return React.createElement(
              'div',
              { className: 'FloorPlan', key: index },
              React.createElement(
                'a',
                { href: floor_plan, target: '_blank' },
                React.createElement(
                  'div',
                  { className: 'icon' },
                  React.createElement('i', { className: 'fa fa-file' })
                ),
                React.createElement(
                  'div',
                  { className: 'text-wrapper' },
                  React.createElement(
                    'div',
                    { className: 'text' },
                    floor_name
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

module.exports = Property;