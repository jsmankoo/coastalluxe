'use strict';

var _reactRouter = require('react-router');

var React = require('react');


var store = require('./jsx/store');

var App = require('./jsx/App');
var Home = require('./jsx/Home');
var FeaturedProperties = require('./jsx/Featured');
var Property = require('./jsx/Property');
var Building = require('./jsx/Building');
var Contact = require('./jsx/Contact');

var Routes = createClass({
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        _reactRouter.Router,
        { history: _reactRouter.hashHistory },
        React.createElement(
          _reactRouter.Route,
          { path: '/', component: App },
          React.createElement(_reactRouter.IndexRoute, { component: Home }),
          React.createElement(_reactRouter.Route, { path: 'index', component: Home }),
          React.createElement(_reactRouter.Route, { path: '/featured', component: Featured }),
          React.createElement(_reactRouter.Route, { path: '/Azzurra', component: Azzurra }),
          React.createElement(_reactRouter.Route, { path: '/featured/Azzurra', component: FeaturedAzzurra }),
          React.createElement(_reactRouter.Route, { path: '/Regatta', component: Regatta }),
          React.createElement(_reactRouter.Route, { path: '/featured/Regatta', component: FeaturedRegatta }),
          React.createElement(_reactRouter.Route, { path: '/Cove', component: Cove }),
          React.createElement(_reactRouter.Route, { path: '/featured/Cove', component: FeaturedCove }),
          React.createElement(_reactRouter.Route, { path: '/featured/:building/:name/:id', component: Property }),
          React.createElement(_reactRouter.Route, { path: '/forSale', component: ForSale }),
          React.createElement(_reactRouter.Route, { path: '/lease', component: ForLease }),
          React.createElement(_reactRouter.Route, { path: '/sold', component: Sold }),
          React.createElement(_reactRouter.Route, { path: '/contact', component: Contact })
        )
      )
    );
  }
});

module.exports = Routes;

// const renderDom = ()=>{
//   ReactDom.render(
//     <Router history={hashHistory}>
//       <Route path='/' component={App}>
//         <IndexRoute component={Home} />
//         <Route path='index' component={Home} />
//         <Route path='/featured' component={Featured}></Route>
//         <Route path='/Azzurra' component={Azzurra} />
//         <Route path='/featured/Azzurra' component={FeaturedAzzurra} />
//         <Route path='/Regatta' component={Regatta} />
//         <Route path='/featured/Regatta' component={FeaturedRegatta} />
//         <Route path='/Cove' component={Cove} />
//         <Route path='/featured/Cove' component={FeaturedCove} />
//         <Route path='/featured/:building/:name/:id' component={Property} />
//         <Route path='/forSale' component={ForSale} />
//         <Route path='/lease' component={ForLease} />
//         <Route path='/sold' component={Sold} />
//         <Route path='/contact' component={Contact} />
//       </Route>
//     </Router>,
//     document.getElementById('Main')
//   );
// }
//
// store.subscribe(renderDom);
// renderDom();

var Featured = React.createClass({
  displayName: 'Featured',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: 'all'
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
      building: 'all'
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
      building: 'all'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var Sold = React.createClass({
  displayName: 'Sold',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'sold',
      building: 'all'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var Azzurra = React.createClass({
  displayName: 'Azzurra',
  render: function render() {
    return React.createElement(Building, { buildingName: '13700marinapointedr' });
  }
});

var Regatta = React.createClass({
  displayName: 'Regatta',
  render: function render() {
    return React.createElement(Building, { buildingName: '13750marinapointedr' });
  }
});

var Cove = React.createClass({
  displayName: 'Cove',
  render: function render() {
    return React.createElement(Building, { buildingName: '13800marinapointedr' });
  }
});

var FeaturedAzzurra = React.createClass({
  displayName: 'FeaturedAzzurra',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13700marinapointedr'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var FeaturedRegatta = React.createClass({
  displayName: 'FeaturedRegatta',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13750marinapointedr'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});

var FeaturedCove = React.createClass({
  displayName: 'FeaturedCove',
  componentDidMount: function componentDidMount() {
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13800marinapointedr'
    });
  },
  render: function render() {
    return React.createElement(FeaturedProperties, store.getState().FeaturedProperties);
  }
});