var ReactDom = require('react-dom');
var React = require('react');
import {Router, Route, hashHistory } from "react-router";

var store = require('./store');

var App = require('./App');
var Home = require('./Home');
var FeaturedProperties = require('./Featured');
var Property = require('./Property');
var Contact = require('./Contact');

const renderDom = ()=>{
  ReactDom.render(
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path='/index' component={Home} />
        <Route path='/featured' component={Featured} />
        <Route path='/forSale' component={ForSale} />
        <Route path='/lease' component={ForLease} />
        <Route path='/featured/:building/:name' component={Property} />
        <Route path='/contact' component={Contact} />
        <Route path='*' component={Home} />
      </Route>
    </Router>,
    document.getElementById('Main')
  );
}

const Featured = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: 'all'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

const ForSale = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'sale',
      building: 'all'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

const ForLease = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'lease',
      building: 'all'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});


store.subscribe(renderDom);
store.subscribe(()=>console.log(store.getState()));
renderDom();
