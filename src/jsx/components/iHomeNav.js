var React = require('react');
var MediaQuery = require('react-responsive');
var CSSTransition = require('react-addons-css-transition-group');
import {Link} from 'react-router';

var store = require('../store');

const Nav = React.createClass({
  componentDidMount(){
  },
  render(){
    return (
      <div className="Nav">
        <MediaQuery maxDeviceWidth={767}>
          <Mobile {...this.props} logo={this.props.mobileLogo} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1280}>
          <Tablet {...this.props} logo={this.props.mobileLogo} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1281}>
          <Desktop {...this.props} />
        </MediaQuery>
      </div>
    );
  }
});

const Mobile = React.createClass({
  clickHandler(event){
    event.preventDefault();
    store.dispatch({type:'MENU_TOGGLE'});
    switch (this.props.menuLogo) {
      case 'fa-bars':
        return store.dispatch({
          type: 'NAV_MENU',
          logo: 'fa-times'
        });
      case 'fa-times':
        return store.dispatch({
          type: 'NAV_MENU',
          logo: 'fa-bars'
        });
      default:
        console.log('Mobile nav: clickHandler default case');
        console.log(this.props.menuLogo);
    }
  },
  render(){
    return (
      <div className="Mobile wrap">
        <i onClick={this.clickHandler} className={`fa ${this.props.menuLogo} menuScroll`} />
        <div className="col logo">
          <a href='http://coastalluxeliving.com/'>
            <img src={this.props.logo} />
          </a>
        </div>
      </div>
    );
  }
});

const Tablet = React.createClass({
  clickHandler(event){
    event.preventDefault();
    store.dispatch({type:'MENU_TOGGLE'});
  },
  render(){
    return (
      <div className="Tablet wrap">
        { !this.props.MenuShow ?
          <i onClick={this.clickHandler} className={`fa ${this.props.menuLogo} menuScroll`} /> :
          <div>{this.props.MenuShow}</div>
        }
        <div className="col logo">
          <a href='http://coastalluxeliving.com/'>
            <img src={this.props.logo} />
          </a>
        </div>
      </div>
    );
  }
});

const Desktop = React.createClass({
  clickHandler(event){
    event.preventDefault();
    store.dispatch({type:'MENU_TOGGLE'});
  },
  render(){
    return (
      <div className={`Desktop wrap`}>
        <div className="col contact">
          <a href='http://coastalluxeliving.com/contact'>
            <i className={`fa ${this.props.contactLogo}`} />
            <div className="linkName">
              CONTACT
            </div>
          </a>
        </div>
        <div className="col logo">
          <a href='http://coastalluxeliving.com/'>
            <img src={this.props.desktopLogo}/>
          </a>
        </div>
        <div className="col menu">
          <a onClick={this.clickHandler} >
            <div className="linkName">
              MENU
            </div>
            <i className={`fa ${this.props.menuLogo}`} />
          </a>
        </div>
      </div>
    );
  }
});


module.exports = Nav;
