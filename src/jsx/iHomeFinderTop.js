var ReactDom = require('react-dom');
var React = require('react');
import {Router, Route, hashHistory, IndexRoute } from "react-router";

var store = require('./store');

var Home = require('./Home');
var FeaturedProperties = require('./Featured');
var Property = require('./Property');
var Building = require('./Building');
var Contact = require('./Contact');
var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

const renderDom = ()=>{
  ReactDom.render(
    <App />,
    document.getElementById('Head')
  );
}

const App = React.createClass({
  componentDidMount(){
  },
  render(){
    return (
      <div className="App">
        <Nav {...store.getState().Nav} />
        {
          store.getState().Menu.show ?
           <Menu {...store.getState().Menu} />
          : <div />
        }
      </div>
    );
  }
});

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


store.subscribe(renderDom);
store.subscribe(()=>console.log(store.getState().Nav.affix));
renderDom();
