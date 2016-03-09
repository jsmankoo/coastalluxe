var React = require('react');
var store = require('./store');

var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

const App = React.createClass({
  componentDidMount(){
  },
  render(){
    return (
      <div className="App">
        <Nav {...store.getState().Nav} MenuShow={store.getState().Menu.show} />
        {
          store.getState().Menu.show ?
           <Menu {...store.getState().Menu} />
          : <div />
        }
        {this.props.children}
        <Foot {...store.getState().Foot} />
      </div>
    );
  }
});

module.exports = App;
