var React = require('react');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');

var store = require('../store');

const Foot = React.createClass({
  render(){
    return (
      <div className="Foot">
        <MediaQuery maxDeviceWidth={767}>
          <Mobile {...this.props} />
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} >
          <Tablet {...this.props} />
        </MediaQuery>
      </div>
    );
  }
});

const Mobile = React.createClass({
  render(){
    return (
      <div className="Mobile View">
        <div className="col brandLogo">
          <a href='/'>
            <img src={this.props.footerLogo} />
          </a>
        </div>
        <div className="col socialMedia">
          <a href={this.props.email} ><i className='fa fa-envelope' /></a>
          <a href={this.props.facebook} ><i className='fa fa-facebook-f' /></a>
          <a href={this.props.twitter} ><i className='fa fa-twitter' /></a>
          <a href={this.props.instagram} ><i className='fa fa-instagram' /></a>
        </div>
        <div className="col footer">
          <Markdown>{this.props.copyright}</Markdown>
        </div>
        <div className="col bhhs">
          <a href='http://www.berkshirehathawayhs.com/' target="_blank">
            <img src={this.props.berkshireLogo} />
          </a>
        </div>
        <div className="col footer">
          <Markdown>{this.props.information}</Markdown>
        </div>
        <div className="col dev">
          <Markdown>{this.props.dev}</Markdown>
        </div>
      </div>
    );
  }
});

const Tablet = React.createClass({
  render(){
    return (
      <div className="Tablet View">
        <div className="brandLogo">
          <a href='/'>
            <img src={this.props.footerLogo} />
          </a>
        </div>
        <div className="midContent">
          <div className="socialMedia">
            <a href={this.props.email} ><i className='fa fa-envelope' /></a>
            <a href={this.props.facebook} ><i className='fa fa-facebook-f' /></a>
            <a href={this.props.twitter} ><i className='fa fa-twitter' /></a>
            <a href={this.props.instagram} ><i className='fa fa-instagram' /></a>
          </div>
          <div className="footer">
            <Markdown>
              {`${this.props.copyright}\n${this.props.information}`}
            </Markdown>
          </div>
          <div className="dev">
          <Markdown>
            {this.props.dev}
          </Markdown>
          </div>
        </div>
        <div className="bhhs">
          <a href='http://www.berkshirehathawayhs.com/' target="_blank">
            <img src={this.props.berkshireLogo} />
          </a>
        </div>
      </div>
    );
  }
});


module.exports = Foot;
