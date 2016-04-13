'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Redux = require('redux');

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'TEST':
      return state;
    case 'NAV_INIT':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          desktopLogo: action.desktopLogo,
          mobileLogo: action.mobileLogo
        })
      });
    case 'NAV_AFFIX_TOGGLE':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          affix: !state.Nav.affix
        })
      });
    case 'NAV_AFFIX_TRUE':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          affix: true
        })
      });
    case 'NAV_AFFIX_FALSE':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          affix: false
        })
      });
    case 'NAV_AFFIX_RESET':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          affix: false
        })
      });
    case 'NAV_LOGO':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          logo: action.logo
        })
      });
    case 'NAV_MENU':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          menuLogo: action.logo
        })
      });
    case 'NAV_AFFIX_TOGGLE':
      return _extends({}, state, {
        Nav: _extends({}, state.Nav, {
          affix: !state.Nav.affix
        })
      });
    case 'MENU_TOGGLE':
      return _extends({}, state, {
        Menu: _extends({}, state.Menu, {
          show: !state.Menu.show
        })
      });
    case 'MENU_BUTTON_TOGGLE':
      return _extends({}, state, {
        Menu: _extends({}, state.Menu, {
          buttonShow: !state.Menu.buttonShow
        })
      });
    case 'MENU_LIST':
      return _extends({}, state, {
        Menu: _extends({}, state.Menu, {
          list: action.list.map(function (item) {
            return _extends({}, item, {
              show: false
            });
          })
        })
      });
    case 'MENU_LIST_TOGGLE':
      return _extends({}, state, {
        Menu: _extends({}, state.Menu, {
          list: state.Menu.list.map(function (item, index) {
            if (index == action.index) return _extends({}, item, { show: !item.show });
            return item;
          })
        })
      });
    case 'FOOT_INIT':
      return _extends({}, state, {
        Foot: _extends({}, state.Foot, action.data)
      });
    case 'HOME_INIT':
      return _extends({}, state, {
        Home: _extends({}, state.Home, action.data)
      });
    case 'FeaturedProperties_INIT':
      return _extends({}, state, {
        FeaturedProperties: {
          saleType: action.saleType,
          building: action.building
        }
      });
    case 'FeaturedProperties_SALETYPE':
      return _extends({}, state, {
        FeaturedProperties: _extends({}, state.FeaturedProperties, {
          saleType: action.saleType
        })
      });
    case 'FeaturedProperties_BUILDING':
      return _extends({}, state, {
        FeaturedProperties: _extends({}, state.FeaturedProperties, {
          building: action.building
        })
      });
    default:
      return state;
  }
};

var store = Redux.createStore(reducer, {
  Nav: {
    contactLogo: 'fa-paper-plane',
    logo: '/img/transparent.png',
    menuLogo: 'fa-bars',
    affix: false,
    desktopLogo: '/img/transparent.png',
    mobileLogo: '/img/transparent.png'
  },
  Menu: {
    buttonShow: true,
    show: false,
    list: []
  },
  Foot: {
    "footerLogo": '/img/transparent.png',
    "berkshireLogo": '/img/transparent.png',
    "email": "",
    "facebook": "",
    "twitter": "",
    "instagram": "",
    "copyright": "Loading ...",
    "information": "Loading ...",
    "dev": "Loading ...",
    "equalIcon": '/img/transparent.png'
  },
  Home: {
    "headline": "Loading ...",
    "subheadline": "Loading ...",
    "title": "Loading ...",
    "subtitle": "Loading ...",
    "links": [],
    "featured": "0",
    "azzurraa": "0",
    "regatta": "0",
    "cove": "0"
  },
  FeaturedProperties: {
    saleType: 'all',
    building: 'all'
  }
});

$.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/5').then(function (_ref) {
  var acf = _ref.acf;

  store.dispatch({
    type: 'NAV_INIT',
    desktopLogo: acf.desktopLogo,
    mobileLogo: acf.mobileLogo
  });
  store.dispatch({
    type: 'MENU_LIST',
    list: acf.menu
  });
});
$.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/38').then(function (_ref2) {
  var acf = _ref2.acf;

  store.dispatch({
    type: 'FOOT_INIT',
    data: acf
  });
});

module.exports = store;