var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var store = require('./store');

var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

const App = React.createClass({
  render(){
    return (
      <div className="App">
        <Nav {...store.getState().Nav} MenuShow={store.getState().Menu.show} buttonShow={store.getState().Menu.buttonShow} />
        {
          store.getState().Menu.show ?
           <Menu {...store.getState().Menu} menuLogo={store.getState().Nav.menuLogo} />
          : <div />
        }
        {/*<MediaQuery minDeviceWidth={1281}>
          <Waypoint onEnter={this.handleEnter} onLeave={this.handleLeave} />
        </MediaQuery>*/}
        {this.props.children}
        <Foot {...store.getState().Foot} />
      </div>
    );
  }
});

module.exports = App;
