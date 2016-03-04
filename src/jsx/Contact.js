var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var ReactBGVideo = require('react-background-video');
var Markdown = require('react-remarkable');

var store = require('./store');

const Contact = React.createClass({
  getInitialState(){
    return {
      "image": "",
      "facebook": "",
      "twitter": "",
      "email": "",
      "instagram": "",
      "name": "Loading ...",
      "content": 'Loading ...',
      "mobileimage": "",
      "bgImage": "",
      "Mobile": "Loading ...",
      "Office": "Loading ...",
      "City": "Loading ...",
      map: '',
      details: 'Loading ...'
    };
  },
  componentDidMount(){
    store.dispatch({
      type: 'NAV_AFFIX_RESET'
    });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/28')
      .then(({acf})=>{
        this.setState(acf);
      });
  },
  handleWaypoint(){
    store.dispatch({
      type: 'NAV_AFFIX_TOGGLE'
    });
  },
  render(){
    return (
      <div className="Contact">
        <MediaQuery minDeviceWidth={1024}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Top
          name={this.state.name}
          email={this.state.email}
          Mobile={this.state.Mobile}
          Office={this.state.Office}
          City={this.state.City}
          url={this.state.map}/>
        <Ryan
          mobileimage={this.state.mobileimage}
          image={this.state.image}
          content={this.state.content}
          details={this.state.details}/>
      </div>
    );
  }
});

const Top = React.createClass({
  render(){
    return (
      <div className="Top">
        <MediaQuery maxDeviceWidth={767}>
          {this.Mobile()}
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          {this.Tablet()}
        </MediaQuery>
      </div>
    );
  },
  Tablet(){
    return (
      <div className="Tablet">
        <ReactBGVideo
          className='BGVideo'
          videos={[{
            src: '/img/ryan.mp4'
          },{
            src: '/img/ryan.webm'
          },{
            src: '/img/ryan.ogv'
          }]}
          poster='/img/ryan.jpg'
          loop={true}>
          <div className="BGContent">
            <div className="name">
              {this.props.name}
            </div>
            <div className="hidden">
            </div>
            <div className="info">
              <div className="mobile wrapper">
                <div className="icon">
                  <i className='fa fa-mobile' />
                </div>
                <div className="content">
                  {this.props.Mobile}
                </div>
              </div>
              <a href={this.props.url} className="office wrapper">
                <div className="icon">
                  <i className='fa fa-map-marker' />
                </div>
                <div className="content">
                  {this.props.Office} <br/> {this.props.City}
                </div>
              </a>
              <a href={`mailto:${this.props.email}`} className="email wrapper">
                <div className="icon">
                  <i className='fa fa-paper-plane' />
                </div>
                <div className="content">
                  {this.props.email}
                </div>
              </a>
            </div>
          </div>
        </ReactBGVideo>
      </div>
    );
  },
  Mobile(){
    return (
      <div className=" Mobile">
        <ReactBGVideo
          className='BGVideo'
          videos={[{
            src: '/img/ryan.mp4'
          },{
            src: '/img/ryan.webm'
          },{
            src: '/img/ryan.ogv'
          }]}
          poster='/img/ryan.jpg'
          loop={true}>
          <div className="BGContent">
            <div className="name">
              {this.props.name}
            </div>
            <div className="hidden">
            </div>
            <div className="info">
              <div className="mobile wrapper">
                <div className="icon">
                  <i className='fa fa-mobile' />
                </div>
                <div className="content">
                  {this.props.Mobile}
                </div>
              </div>
              <a href={this.props.url} className="office wrapper">
                <div className="icon">
                  <i className='fa fa-map-marker' />
                </div>
                <div className="content">
                  {this.props.Office} <br/> {this.props.City}
                </div>
              </a>
              <a href={`mailto:${this.props.email}`} className="email wrapper">
                <div className="icon">
                  <i className='fa fa-paper-plane' />
                </div>
                <div className="content">
                  {this.props.email}
                </div>
              </a>
            </div>
          </div>
        </ReactBGVideo>
      </div>
    );
  }
});

const Ryan = React.createClass({
  render(){
    return (
      <div className="Ryan">
        <MediaQuery maxDeviceWidth={767}>
          {this.Mobile()}
        </MediaQuery>
        <MediaQuery minDeviceWidth={768}>
          {this.Tablet()}
        </MediaQuery>
      </div>
    );
  },
  Mobile(){
    return (
      <div className="Mobile">
        <div className="image">
          <img src={this.props.mobileimage} />
        </div>
        <div className="content">
          <Markdown>
            {this.props.content}
          </Markdown>
        </div>
        <div className="details">
          <Markdown>
            {this.props.details}
          </Markdown>
        </div>
      </div>
    );
  },
  Tablet(){
    return (
      <div className="Tablet">
        <div className="wrap">
          <div className="image">
            <img src={this.props.image} />
          </div>
          <div className="content">
            <Markdown>
              {this.props.content}
            </Markdown>
          </div>
        </div>
        <div className="details">
          <Markdown>
            {this.props.details}
          </Markdown>
        </div>
      </div>
    );
  }
});

module.exports = Contact;
