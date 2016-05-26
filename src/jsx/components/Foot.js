var React = require('react');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');

var store = require('../store');

const Foot = React.createClass({
  componentDidMount(){

  },
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
        <div className="col">
          <div className="brandLogo">
            <a href='http://coastalluxeliving.com/'>
              <img src={this.props.footerLogo} />
            </a>
          </div>
        </div>
        <div className="col">
          <div className="socialMedia">
            <a href={`mailto:${this.props.email}`} target='_blank'><i className='fa fa-envelope' /></a>
            <a href={this.props.facebook} target='_blank'><i className='fa fa-facebook-f' /></a>
            <a href={this.props.twitter} target='_blank'><i className='fa fa-twitter' /></a>
            <a href={this.props.instagram} target='_blank'><i className='fa fa-instagram' /></a>
          </div>
        </div>
        <div className="col">
          <div className="footer" dangerouslySetInnerHTML={{__html: this.props.copyright}}>
          </div>
        </div>
        <div className="col">
          <div className="bhhs">
            <a target='_blank' href='http://www.berkshirehathawayhs.com/' target="_blank">
              <img src={this.props.berkshireLogo} />
            </a>
          </div>
        </div>
        <div className="col">
          <div className="footer" dangerouslySetInnerHTML={{__html: this.props.information}}>
          </div>
        </div>
        <div className="col">
          <div className="equalIcon">
            <img src={this.props.equalIcon} />
          </div>
        </div>
        <div className="col">
          <div className="dev" dangerouslySetInnerHTML={{__html: this.props.dev}}>
          </div>
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
          <a href='http://coastalluxeliving.com/'>
            <img src={this.props.footerLogo} />
          </a>
        </div>
        <div className="midContent">
          <div className="socialMedia">
            <a href={`mailto:${this.props.email}`} target='_blank' ><i className='fa fa-envelope' /></a>
            <a href={this.props.facebook} target='_blank' ><i className='fa fa-facebook-f' /></a>
            <a href={this.props.twitter} target='_blank' ><i className='fa fa-twitter' /></a>
            <a href={this.props.instagram} target='_blank' ><i className='fa fa-instagram' /></a>
          </div>
          <div className="footer" dangerouslySetInnerHTML={{__html: `${this.props.copyright}\n${this.props.information}`}}>
          </div>
          <div className="equalIcon">
            <img src={this.props.equalIcon} />
          </div>
          <div className="dev" dangerouslySetInnerHTML={{__html: this.props.dev}}>
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
