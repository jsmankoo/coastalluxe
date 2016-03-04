var React = require('react');
var store = require('./store');

var Nav = require('./components/Nav');
var Menu = require('./components/Menu');
var Foot = require('./components/Foot');

const App = React.createClass({
  componentDidMount(){
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
        {this.props.children}
        <Foot {...store.getState().Foot} />
      </div>
    );
  }
});

module.exports = App;
