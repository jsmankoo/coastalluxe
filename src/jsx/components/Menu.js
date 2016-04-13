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
              <Link to='/' onClick={this.onClickHandler}>
                HOME
              </Link>
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
                    <Link to='/forSale' onClick={this.onClickHandler}>FOR SALE</Link>
                  </div>
                  <div className="submenu">
                    <Link to='/lease' onClick={this.onClickHandler}>FOR LEASE</Link>
                  </div>
                  <div className="submenu">
                    <Link to='/sold' onClick={this.onClickHandler}>SOLD</Link>
                  </div>
                  <div className="submenu">
                    <a target='_blank' href='http://idx.coastalluxeliving.com/homesearch/89398' onClick={this.onClickHandler}>SEARCH</a>
                  </div>
                  <div className="submenu">
                    <a target='_blank' href='http://idx.coastalluxeliving.com/openhomes/89398' onClick={this.onClickHandler}>OPEN HOMES</a>
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
                    <Link to='/Azzurra' onClick={this.onClickHandler}>AZZURRA</Link>
                  </div>
                  <div className="submenu">
                    <Link to='/Regatta' onClick={this.onClickHandler}>REGATTA</Link>
                  </div>
                  <div className="submenu">
                    <Link to='/Cove' onClick={this.onClickHandler}>COVE</Link>
                  </div>
                </div>
              ) : <div />
            }
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <Link to='/contact' onClick={this.onClickHandler}>CONTACT</Link>
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
              <Link to='/' onClick={this.onClickHandler}>HOME</Link>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">PROPERTIES</div>
            <div className="submenu">
              <Link to='/forSale' onClick={this.onClickHandler}>FOR SALE</Link>
            </div>
            <div className="submenu">
              <Link to='/lease' onClick={this.onClickHandler}>FOR LEASE</Link>
            </div>
            <div className="submenu">
              <Link to='/sold' onClick={this.onClickHandler}>SOLD</Link>
            </div>
            <div className="submenu">
              <a target='_blank' href='http://idx.coastalluxeliving.com/homesearch/89398' onClick={this.onClickHandler}>SEARCH</a>
            </div>
            <div className="submenu">
              <a target='_blank' href='http://idx.coastalluxeliving.com/openhomes/89398' onClick={this.onClickHandler}>OPEN HOMES</a>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">BUILDINGS</div>
            <div className="submenu">
              <Link to='/Azzurra' onClick={this.onClickHandler}>AZZURRA</Link>
            </div>
            <div className="submenu">
              <Link to='/Regatta' onClick={this.onClickHandler}>REGATTA</Link>
            </div>
            <div className="submenu">
              <Link to='/Cove' onClick={this.onClickHandler}>COVE</Link>
            </div>
          </div>
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <Link to='/contact' onClick={this.onClickHandler}>CONTACT</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Menu;
