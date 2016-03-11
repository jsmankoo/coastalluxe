var ReactDom = require('react-dom');
var React = require('react');
import {Router, Route, hashHistory, browserHistory, IndexRoute } from "react-router";

var store = require('./store');

var App = require('./App');
var Home = require('./Home');
var FeaturedProperties = require('./Featured');
var Property = require('./Property');
var Building = require('./Building');
var Contact = require('./Contact');

const renderDom = ()=>{
  ReactDom.render(
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='index' component={Home} />
        <Route path='/featured' component={Featured}></Route>
        <Route path='/Azzurra' component={Azzurra} />
        <Route path='/featured/Azzurra' component={FeaturedAzzurra} />
        <Route path='/Regatta' component={Regatta} />
        <Route path='/featured/Regatta' component={FeaturedRegatta} />
        <Route path='/Cove' component={Cove} />
        <Route path='/featured/Cove' component={FeaturedCove} />
        <Route path='/featured/:building/:name/:id' component={Property} />
        <Route path='forSale/:building' component={ForSale} />
        <Route path='lease/:building' component={ForLease} />
        <Route path='/contact' component={Contact} />
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
      building: 'featured'
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
      building: this.props.params.building
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
      building: this.props.params.building
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

const Azzurra = React.createClass({
  render(){
    return <Building  buildingName='13700marinapointedr' />;
  }
});

const Regatta = React.createClass({
  render(){
    return <Building  buildingName='13750marinapointedr' />;
  }
});

const Cove = React.createClass({
  render(){
    return <Building buildingName='13800marinapointedr' />;
  }
});

const FeaturedAzzurra = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13700marinapointedr'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

const FeaturedRegatta = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13750marinapointedr'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

const FeaturedCove = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'FeaturedProperties_INIT',
      saleType: 'all',
      building: '13800marinapointedr'
    });
  },
  render(){
    return <FeaturedProperties {...store.getState().FeaturedProperties} />;
  }
});

store.subscribe(renderDom);
store.subscribe(()=>console.log(store.getState().Nav.affix));
renderDom();
