var Redux = require('redux');

const reducer = (state, action)=>{
  switch (action.type) {
    case 'TEST':
      return state;
    case 'NAV_INIT':
      return {...state,
        Nav: {...state.Nav,
          desktopLogo: action.desktopLogo,
          mobileLogo: action.mobileLogo
        }
      };
    case 'NAV_AFFIX_TOGGLE':
      return {...state,
        Nav: {...state.Nav,
          affix: !state.Nav.affix
        }
      };
    case 'NAV_AFFIX_TRUE':
      return {...state,
        Nav: {...state.Nav,
          affix: true
        }
      };
    case 'NAV_AFFIX_FALSE':
      return {...state,
        Nav: {...state.Nav,
          affix: false
        }
      };
    case 'NAV_AFFIX_RESET':
      return {...state,
        Nav: {...state.Nav,
          affix: false
        }
      };
    case 'NAV_LOGO':
      return {...state,
        Nav: {...state.Nav,
          logo: action.logo
        }
      };
    case 'NAV_MENU':
      return {...state,
        Nav: {...state.Nav,
          menuLogo: action.logo
        }
      };
    case 'NAV_AFFIX_TOGGLE':
      return {...state,
        Nav: {...state.Nav,
          affix: !state.Nav.affix
        }
      };
    case 'MENU_TOGGLE':
      return {...state,
        Menu: {...state.Menu,
          show: !state.Menu.show
        }
      };
    case 'MENU_BUTTON_TOGGLE':
      return {...state,
        Menu: {...state.Menu,
          buttonShow: !state.Menu.buttonShow
        }
      };
    case 'MENU_LIST':
      return {...state,
        Menu: {...state.Menu,
          list: action.list.map((item)=>{
            return {...item,
              show: false
            };
          })
        }
      };
    case 'MENU_LIST_TOGGLE':
      return {...state,
        Menu: {...state.Menu,
          list: state.Menu.list.map((item, index)=>{
            if( index == action.index )
              return {...item, show: !item.show };
            return item;
          })
        }
      };
    case 'FOOT_INIT':
      return {...state,
        Foot: {...state.Foot, ...action.data}
      };
    case 'HOME_INIT':
      return {...state,
        Home: {...state.Home, ...action.data}
      };
    case 'FeaturedProperties_INIT':
      return {...state,
        FeaturedProperties: {
          saleType: action.saleType,
          building: action.building,
        }
      };
    case 'FeaturedProperties_SALETYPE':
      return {...state,
        FeaturedProperties: {...state.FeaturedProperties,
          saleType: action.saleType
        }
      };
    case 'FeaturedProperties_BUILDING':
      console.log(`store: ${action.building}`);
      return {...state,
        FeaturedProperties: {...state.FeaturedProperties,
          building: action.building
        }
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer, {
  Nav: {
    contactLogo: 'fa-paper-plane',
    logo: '/img/transparent.png',
    menuLogo: 'fa-bars',
    affix: false,
    desktopLogo: '/img/transparent.png',
    mobileLogo: '/img/transparent.png',
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
    "equalIcon": '/img/transparent.png',
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
  FeaturedProperties :{
    saleType: 'all',
    building: 'all'
  }
});

$.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/5')
  .then(({acf})=>{
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
$.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/38')
  .then(({acf})=>{
    store.dispatch({
      type: 'FOOT_INIT',
      data: acf
    });
  });

module.exports = store;
