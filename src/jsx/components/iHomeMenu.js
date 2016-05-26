var React = require('react');
var MediaQuery = require('react-responsive');
import {Link} from 'react-router';

var store = require('../store');

const Menu = React.createClass({
  render(){
    const height = $(window).height();
    const width = $(window).width();

    return (
      <div className="Menu" style={width < 768 ? {height: height-50} : {} }>
        <MediaQuery maxDeviceWidth={767}>
          <Mobile {...this.props} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          <Tablet {...this.props} />
        </MediaQuery>
      </div>
    );
  }
});

const Mobile = React.createClass({
  getInitialState(){
    return {
      properties: false,
      buildings: false
    }
  },
  onClickHandler(event){
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
    const {properties, buildings} = this.state;
    return (
      <div className="View Mobile">
        <div className="wrap">
          <div className="category">
            <div className="categoryName">
              <a href='http://coastalluxeliving.com/'>
                HOME
              </a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder" />
            <div
              onClick={()=>(this.setState({...this.state, properties: !properties}))}
              className="categoryName">
              PROPERTIES
              <i className={`fa fa-chevron-${properties ? 'up' : 'down' }`} />
            </div>
            {
              properties ? (
                <div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/forSale'>FOR SALE</a>
                  </div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/lease'>FOR LEASE</a>
                  </div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/sold'>SOLD</a>
                  </div>
                  <div className="submenu">
                    <a href='http://idx.coastalluxeliving.com/homesearch/89398'>SEARCH</a>
                  </div>
                  <div className="submenu">
                    <a href='http://idx.coastalluxeliving.com/openhomes/89398'>OPEN HOMES</a>
                  </div>
                </div>
              ) : <div />
            }
          </div>
          <div className="category">
            <div className="menuBorder" />
            <div
              onClick={()=>(this.setState({...this.state, buildings: !buildings}))}
              className="categoryName">
              BUILDINGS
              <i className={`fa fa-chevron-${buildings ? 'up' : 'down' }`} />
            </div>
            {
              buildings ? (
                <div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/Azzurra'>AZZURRA</a>
                  </div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/Regatta'>REGATTA</a>
                  </div>
                  <div className="submenu">
                    <a href='http://coastalluxeliving.com/Cove'>COVE</a>
                  </div>
                </div>
              ) : <div />
            }
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <a href='http://coastalluxeliving.com/contact'>CONTACT</a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <a target='_blank' href='https://www.zumper.com/tenant-screening?agentId=616264' onClick={this.onClickHandler}>LEASE APPLICATION</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const Tablet = React.createClass({
  onClickHandler(event){
    store.dispatch({type:'MENU_TOGGLE'});
  },
  closeMenu(event){
    event.preventDefault();
    store.dispatch({type:'MENU_TOGGLE'});
  },
  render(){
    return (
      <div className="View Tablet">
        <div className="wrap">
          <div className="menuClose">
            <i onClick={this.closeMenu} className='fa fa-times' />
          </div>
          <div className="category" style={{paddingBottom: 0}}>
            <div className="categoryName">
              <a href='http://coastalluxeliving.com/'>HOME</a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">PROPERTIES</div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/forSale'>FOR SALE</a>
            </div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/lease'>FOR LEASE</a>
            </div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/sold'>SOLD</a>
            </div>
            <div className="submenu">
              <a href='http://idx.coastalluxeliving.com/homesearch/89398' onClick={this.onClickHandler}>SEARCH</a>
            </div>
            <div className="submenu">
              <a href='http://idx.coastalluxeliving.com/openhomes/89398' onClick={this.onClickHandler}>OPEN HOMES</a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">BUILDINGS</div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/Azzurra'>AZZURRA</a>
            </div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/Regatta'>REGATTA</a>
            </div>
            <div className="submenu">
              <a href='http://coastalluxeliving.com/Cove'>COVE</a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <a href='http://coastalluxeliving.com/contact'>CONTACT</a>
            </div>
          </div>
          <div className="LeaseApplication">
            <a target='_blank' href='https://www.zumper.com/tenant-screening?agentId=616264' onClick={this.onClickHandler}>LEASE APPLICATION</a>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Menu;
