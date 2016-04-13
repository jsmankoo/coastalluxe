'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');
var MediaQuery = require('react-responsive');
var Select = require('react-select');


var store = require('./store');

var FeaturedProperties = React.createClass({
  displayName: 'FeaturedProperties',
  getInitialState: function getInitialState() {
    return {
      index: {
        "title": "Loading ...",
        "jumbotron": ""
      },
      buildings: {
        done: false,
        page: 2,
        all: [],
        properties: [],
        building13700: [],
        building13750: [],
        building13800: []
      }
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/81').then(function (_ref) {
      var acf = _ref.acf;

      _this.setState(_extends({}, _this.state, {
        index: acf
      }));
    });
    var featured = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured').then(function (data) {
      var list = data.map(function (_ref2) {
        var id = _ref2.id;
        var acf = _ref2.acf;

        return _extends({}, acf, { id: id });
      });
      _this.setState(_extends({}, _this.state, {
        buildings: _extends({}, _this.state.buildings, {
          all: [].concat(_toConsumableArray(_this.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: 'featured' });
          }))),
          properties: list.map(function (acf) {
            return _extends({}, acf, { building: 'featured' });
          })
        })
      }));
      return data.length;
    });
    var building13700 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr').then(function (data) {
      var list = data.map(function (_ref3) {
        var id = _ref3.id;
        var acf = _ref3.acf;

        return _extends({}, acf, { id: id });
      });
      _this.setState(_extends({}, _this.state, {
        buildings: _extends({}, _this.state.buildings, {
          all: [].concat(_toConsumableArray(_this.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13700marinapointedr' });
          }))),
          building13700: list.map(function (acf) {
            return _extends({}, acf, { building: '13700marinapointedr' });
          })
        })
      }));
      return data.length;
    });
    var building13750 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr').then(function (data) {
      var list = data.map(function (_ref4) {
        var id = _ref4.id;
        var acf = _ref4.acf;

        return _extends({}, acf, { id: id });
      });
      _this.setState(_extends({}, _this.state, {
        buildings: _extends({}, _this.state.buildings, {
          all: [].concat(_toConsumableArray(_this.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13750marinapointedr' });
          }))),
          building13750: list.map(function (acf) {
            return _extends({}, acf, { building: '13750marinapointedr' });
          })
        })
      }));
      return data.length;
    });
    var building13800 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr').then(function (data) {
      var list = data.map(function (_ref5) {
        var id = _ref5.id;
        var acf = _ref5.acf;

        return _extends({}, acf, { id: id });
      });
      _this.setState(_extends({}, _this.state, {
        buildings: _extends({}, _this.state.buildings, {
          all: [].concat(_toConsumableArray(_this.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13800marinapointedr' });
          }))),
          building13800: list.map(function (acf) {
            return _extends({}, acf, { building: '13800marinapointedr' });
          })
        })
      }));
      return data.length;
    });
    $.when(featured, building13700, building13750, building13800).done(function (v1, v2, v3, v4) {
      if (v1 !== 10 && v2 !== 10 && v3 !== 10 && v4 !== 10) {
        _this.setState(_extends({}, _this.state, {
          buildings: _extends({}, _this.state.buildings, {
            done: true
          })
        }));
      }
    });
  },
  loadProperties: function loadProperties() {
    var _this2 = this;

    var promise = 0;
    var featured = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured?page=' + this.state.buildings.page).then(function (data) {
      var list = data.map(function (_ref6) {
        var id = _ref6.id;
        var acf = _ref6.acf;

        return _extends({}, acf, { id: id });
      });
      _this2.setState(_extends({}, _this2.state, {
        buildings: _extends({}, _this2.state.buildings, {
          all: [].concat(_toConsumableArray(_this2.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: 'featured' });
          }))),
          properties: [].concat(_toConsumableArray(_this2.state.buildings.properties), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: 'featured' });
          })))
        })
      }));
      return data.length;
    });
    var building13700 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr?page=' + this.state.buildings.page).then(function (data) {
      var list = data.map(function (_ref7) {
        var id = _ref7.id;
        var acf = _ref7.acf;

        return _extends({}, acf, { id: id });
      });
      _this2.setState(_extends({}, _this2.state, {
        buildings: _extends({}, _this2.state.buildings, {
          all: [].concat(_toConsumableArray(_this2.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13700marinapointedr' });
          }))),
          building13700: [].concat(_toConsumableArray(_this2.state.buildings.building13700), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13700marinapointedr' });
          })))
        })
      }));
      return data.length;
    });
    var building13750 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr?page=' + this.state.buildings.page).then(function (data) {
      var list = data.map(function (_ref8) {
        var id = _ref8.id;
        var acf = _ref8.acf;

        return _extends({}, acf, { id: id });
      });
      _this2.setState(_extends({}, _this2.state, {
        buildings: _extends({}, _this2.state.buildings, {
          all: [].concat(_toConsumableArray(_this2.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13750marinapointedr' });
          }))),
          building13750: [].concat(_toConsumableArray(_this2.state.buildings.building13750), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13750marinapointedr' });
          })))
        })
      }));
      return data.length;
    });
    var building13800 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr?page=' + this.state.buildings.page).then(function (data) {
      var list = data.map(function (_ref9) {
        var id = _ref9.id;
        var acf = _ref9.acf;

        return _extends({}, acf, { id: id });
      });
      _this2.setState(_extends({}, _this2.state, {
        buildings: _extends({}, _this2.state.buildings, {
          all: [].concat(_toConsumableArray(_this2.state.buildings.all), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13800marinapointedr' });
          }))),
          building13800: [].concat(_toConsumableArray(_this2.state.buildings.building13800), _toConsumableArray(list.map(function (acf) {
            return _extends({}, acf, { building: '13800marinapointedr' });
          })))
        })
      }));
      return data.length;
    });
    $.when(featured, building13700, building13750, building13800).done(function (v1, v2, v3, v4) {
      if (v1 === 0 && v2 === 0 && v3 === 0 && v4 === 0) {
        _this2.setState(_extends({}, _this2.state, {
          buildings: _extends({}, _this2.state.buildings, {
            done: true
          })
        }));
      }
      _this2.setState(_extends({}, _this2.state, {
        buildings: _extends({}, _this2.state.buildings, {
          page: _this2.state.buildings.page + 1
        })
      }));
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'FeaturedProperties' },
      React.createElement(_reactHelmet2.default, {
        title: 'Coastal Luxe Living - Specializing in luxury Coastal properties - Featured Properties'
      }),
      React.createElement(Jumbotron, _extends({}, this.state.index, { saleType: this.props.saleType, building: this.props.building })),
      React.createElement(Properties, _extends({}, this.state.buildings, {
        saleType: this.props.saleType,
        building: this.props.building,
        loadProperties: this.loadProperties }))
    );
  }
});

var Jumbotron = React.createClass({
  displayName: 'Jumbotron',
  saleOnChange: function saleOnChange(_ref10) {
    var value = _ref10.value;

    store.dispatch({
      type: 'FeaturedProperties_SALETYPE',
      saleType: value
    });
  },
  buildingOnChange: function buildingOnChange(_ref11) {
    var value = _ref11.value;

    store.dispatch({
      type: 'FeaturedProperties_BUILDING',
      building: value
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Jumbotron', style: { backgroundImage: 'url(' + this.props.jumbotron + ')' } },
      React.createElement(
        'div',
        { className: 'bgTint' },
        React.createElement(
          'div',
          { className: 'jumbotron-wrapper' },
          React.createElement(
            'div',
            { className: 'title' },
            this.props.title
          ),
          React.createElement(
            'div',
            { className: 'select' },
            React.createElement(
              'div',
              { className: 'SaleType-wrapper' },
              React.createElement(
                'div',
                { className: 'SaleType' },
                React.createElement(
                  'div',
                  { className: 'filterType' },
                  'Status:'
                ),
                React.createElement(Select, {
                  name: 'Sale Type',
                  value: this.props.saleType,
                  options: [{ value: 'all', label: 'All' }, { value: 'sale', label: 'For Sale' }, { value: 'lease', label: 'For Lease' }, { value: 'sold', label: 'Sold' }],
                  onChange: this.saleOnChange
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'Building-wrapper' },
              React.createElement(
                'div',
                { className: 'Building' },
                React.createElement(
                  'div',
                  { className: 'filterType' },
                  'Property:'
                ),
                React.createElement(Select, {
                  name: 'Building',
                  value: this.props.building,
                  options: [{ value: 'all', label: 'All' }, { value: '13700marinapointedr', label: 'Azzurra' }, { value: '13750marinapointedr', label: 'Regatta' }, { value: '13800marinapointedr', label: 'Cove' }, { value: 'featured', label: 'Other' }],
                  onChange: this.buildingOnChange
                })
              )
            )
          )
        )
      )
    );
  }
});

var Properties = React.createClass({
  displayName: 'Properties',
  pickProperty: function pickProperty() {
    switch (this.props.building) {
      case 'all':
        return this.filterProperty(this.props.all);
      case 'featured':
        return this.filterProperty(this.props.properties);
      case '13700marinapointedr':
        return this.filterProperty(this.props.building13700);
      case '13750marinapointedr':
        return this.filterProperty(this.props.building13750);
      case '13800marinapointedr':
        return this.filterProperty(this.props.building13800);
      default:
        return this.filterProperty(this.props.properties);
    }
  },
  filterProperty: function filterProperty(list) {
    switch (this.props.saleType) {
      case 'all':
        return list;
      case 'sale':
        return list.filter(function (_ref12) {
          var forSale = _ref12.forSale;
          var lease = _ref12.lease;
          var status = _ref12.status;

          return forSale !== '' && status !== 'sold';
        });
      case 'lease':
        return list.filter(function (_ref13) {
          var forSale = _ref13.forSale;
          var lease = _ref13.lease;
          var status = _ref13.status;

          return lease !== '' && status !== 'sold';
        });
      case 'sold':
        return list.filter(function (_ref14) {
          var status = _ref14.status;

          return status === 'sold';
        });
      default:
        return list;
    }
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
      { className: 'Properties' },
      React.createElement(
        'div',
        { className: 'wrap' },
        this.pickProperty().map(function (_ref15, index) {
          var building = _ref15.building;
          var id = _ref15.id;
          var name = _ref15.name;
          var image = _ref15.image;
          var forSale = _ref15.forSale;
          var lease = _ref15.lease;
          var text = _ref15.text;

          return React.createElement(
            'div',
            { className: 'property', key: index },
            React.createElement(
              _reactRouter.Link,
              { className: 'img-wrapper', style: { backgroundImage: 'url(' + image + ')' },
                to: function () {
                  switch (building) {
                    case '13700marinapointedr':
                      return '/featured/Azzurra/' + name.split(' ').join('-') + '/' + id;
                    case '13750marinapointedr':
                      return '/featured/Regatta/' + name.split(' ').join('-') + '/' + id;
                    case '13800marinapointedr':
                      return '/featured/Cove/' + name.split(' ').join('-') + '/' + id;
                    default:
                      return '/featured/featured/' + name.split(' ').join('-') + '/' + id;
                  }
                }() },
              text !== '' ? React.createElement(
                'div',
                { className: 'specialText' },
                text
              ) : React.createElement('div', null)
            ),
            React.createElement(
              'div',
              { className: 'info' },
              React.createElement(
                'div',
                { className: 'name' },
                name
              ),
              _this3.handleSale(forSale, lease)
            )
          );
        })
      ),
      this.props.done ? React.createElement('div', null) : React.createElement(
        'div',
        { className: 'moreProperties' },
        React.createElement(
          'a',
          { onClick: this.props.loadProperties },
          'Load more'
        )
      )
    );
  }
});

module.exports = FeaturedProperties;