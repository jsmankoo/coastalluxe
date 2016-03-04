var React = require('react');
var MediaQuery = require('react-responsive');

var store = require('../store');

const Menu = React.createClass({
  render(){
    return (
      <div className="Menu">
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
  render(){
    return (
      <div className="View Mobile">
        <div className="wrap">
          {
            this.props.list.map(({category, submenu, show}, index)=>{
              return (
                <div className="category" key={index} >
                  { index != 0 ? <div className="menuBorder"/> : <div />}
                  <div
                    onClick={()=>store.dispatch({type: 'MENU_LIST_TOGGLE', index: index})}
                    className="categoryName">
                    {category}
                    <i className={`fa fa-chevron-${show ? 'up' : 'down' }`} />
                  </div>
                  {
                    show ?
                      submenu.map(({link, name})=>{
                        return (
                          <div className="submenu">
                            <a href={link}>{name}</a>
                          </div>
                        );
                      })
                      : <div />
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});

const Tablet = React.createClass({
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
          {
            this.props.list.map(({category, submenu}, index)=>{
              return (
                <div className="category" key={index}>
                  { index != 0 ? <div className="menuBorder"/> : <div />}
                  <div className="categoryName">{category}</div>
                  {
                    submenu.map(({link, name}, index)=>{
                      return (
                        <div className="submenu" key={index}>
                          <a href={link}>{name}</a>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});


module.exports = Menu;
