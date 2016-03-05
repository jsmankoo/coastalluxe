var React = require('react');
var MediaQuery = require('react-responsive');
var CSSTransition = require('react-addons-css-transition-group');

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
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
          <Tablet {...this.props} logo={this.props.mobileLogo} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={1025}>
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
      <div className="wrap">
        <div className="col logo">
          <a href='/' >
            <img src={this.props.logo} />
          </a>
        </div>
        <div className="col menu">
          <a onClick={this.clickHandler} >
            <i className={`fa ${this.props.menuLogo}`} />
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
      <div className="wrap">
        <div className="col contact">
          <a href='/#/contact' >
            <i className={`fa ${this.props.contactLogo}`} />
            <div className="linkName">
              Contact
            </div>
          </a>
        </div>
        <div className="col logo">
          <a href='/' >
            <img src={this.props.logo} />
          </a>
        </div>
        <div className="col menu">
          <a onClick={this.clickHandler}>
            <div className="linkName">
              Menu
            </div>
            <i className={`fa ${this.props.menuLogo}`} />
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
      <div className={`wrap ${this.props.affix}`}>
        <div className="col contact">
          <a href='/#/contact' >
            <i className={`fa ${this.props.contactLogo}`} />
            <div className="linkName">
              Contact
            </div>
          </a>
        </div>
        <div className="col logo">
          <a href='/' >
            <img src={
              this.props.affix
              ? this.props.mobileLogo
              : this.props.desktopLogo
            }/>
          </a>
        </div>
        <div className="col menu">
          <a onClick={this.clickHandler} >
            <div className="linkName">
              Menu
            </div>
            <i className={`fa ${this.props.menuLogo}`} />
          </a>
        </div>
      </div>
    );
  }
});


module.exports = Nav;
