var React = require('react');
var MediaQuery = require('react-responsive');

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
    return (
      <div className="View Mobile">
        <div className="wrap">
          <div className="category">
            <div className="categoryName">
              <a href='/#/' onClick={this.onClickHandler}>HOME</a>
            </div>
          </div>
          {
            this.props.list.map(({category, submenu, show}, index)=>{
              return (
                <div className="category" key={index} >
                  <div className="menuBorder"/>
                  <div
                    onClick={()=>store.dispatch({type: 'MENU_LIST_TOGGLE', index: index})}
                    className="categoryName">
                    {category}
                    <i className={`fa fa-chevron-${show ? 'up' : 'down' }`} />
                  </div>
                  {
                    show ?
                      submenu.map(({link, name}, index)=>{
                        return (
                          <div className="submenu" key={index}>
                            <a href={link} onClick={this.onClickHandler}>{name}</a>
                          </div>
                        );
                      })
                      : <div />
                  }
                </div>
              );
            })
          }
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <a href='/#/contact' onClick={this.onClickHandler}>CONTACT</a>
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
          <div className="category">
            <div className="categoryName">
              <a href='/#/' onClick={this.onClickHandler}>HOME</a>
            </div>
          </div>
          {
            this.props.list.map(({category, submenu}, index)=>{
              return (
                <div className="category" key={index}>
                  <div className="menuBorder"/>
                  <div className="categoryName">{category}</div>
                  {
                    submenu.map(({link, name}, index)=>{
                      return (
                        <div className="submenu" key={index}>
                          <a href={link} onClick={this.onClickHandler} >{name}</a>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
          <div className="category">
            <div className="menuBorder"/>
            <div className="categoryName">
              <a href='/#/contact' onClick={this.onClickHandler}>CONTACT</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Menu;
