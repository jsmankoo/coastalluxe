var ReactDom = require('react-dom');
var React = require('react');

var store = require('./store');

var Styles = require('../stylus/ihomefinder.styl');

var Nav = require('./components/iHomeNav');
var Menu = require('./components/iHomeMenu');

const App = React.createClass({
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

const renderDom = ()=>{
  ReactDom.render(
    <App />,
    document.getElementById('Head')
  );
}

store.subscribe(renderDom);
renderDom();
