var React = require('react');
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
      details: []
    };
  },
  componentDidMount(){
    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/28')
      .then(({acf})=>{
        this.setState(acf);
      });
  },
  render(){
    return (
      <div className="Contact">
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
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
          {this.Tablet()}
        </MediaQuery>
        <MediaQuery minDeviceWidth={1025}>
          {this.Desktop()}
        </MediaQuery>
      </div>
    );
  },
  Desktop(){
    return (
      <div className="Tablet">
        <ReactBGVideo
          className='BGVideo'
          videos={[{
            src: '/img/ryan.mp4'
          },{
            src: '/img/ryan.webm'
          }]}
          loop={true}
          autoPlay={true}
          preload={true}>
          <div className="BGContent">
            <div className="name">
              <div className="text">
                {this.props.name}
              </div>
            </div>
            <div className="hidden">
            </div>
            <div className="info">
              <div className="mobile col">
                <a href='tel:310-344-0898' className="wrapper">
                  <div className="icon">
                    <i className='fa fa-mobile' />
                  </div>
                  <div className="content">
                    {this.props.Mobile}
                  </div>
                </a>
              </div>
              <div className="office col">
                <a href={this.props.url} className="wrapper">
                  <div className="icon">
                    <i className='fa fa-map-marker' />
                  </div>
                  <div className="content">
                    {this.props.Office} <br/> {this.props.City}
                  </div>
                </a>
              </div>
              <div className="email col">
                <a href={`mailto:${this.props.email}`} className="wrapper">
                  <div className="icon">
                    <i className='fa fa-paper-plane' />
                  </div>
                  <div className="content">
                    {this.props.email}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </ReactBGVideo>
      </div>
    );
  },
  Tablet(){
    return (
      <div className="Tablet">
        <div className="BGVideo" style={{
          backgroundImage: "url('/img/ryan.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          WebkitBackgroundSize: 'cover',
          position: 'absolute',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: '-10000'
        }}>
        </div>
        <div className="BGContent">
          <div className="name">
            <div className="text">
              {this.props.name}
            </div>
          </div>
          <div className="hidden">
          </div>
          <div className="info">
            <div className='mobile col'>
              <a href='tel:310-344-0898' className="wrapper">
                <div className="icon">
                  <i className='fa fa-mobile' />
                </div>
                <div className="content">
                  {this.props.Mobile}
                </div>
              </a>
            </div>
            <div className="office col">
              <a href={this.props.url} className="wrapper">
                <div className="icon">
                  <i className='fa fa-map-marker' />
                </div>
                <div className="content">
                  {this.props.Office} <br/> {this.props.City}
                </div>
              </a>
            </div>
            <div className="email col">
              <a href={`mailto:${this.props.email}`} className="wrapper">
                <div className="icon">
                  <i className='fa fa-paper-plane' />
                </div>
                <div className="content">
                  {this.props.email}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
  Mobile(){
    return (
      <div className=" Mobile">
        <div className="BGVideo" style={{
          backgroundImage: "url('/img/ryan.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundSize: 'cover',
          position: 'absolute',
          minHeight: '100%',
          minWidth: '100%',
          zIndex: '-10000'
        }}>
        </div>
        <div className="BGContent">
          <div className="name">
            <div className="text">
              {this.props.name}
            </div>
          </div>
          <div className="info-wrapper">
            <div className="info">
              <a href='tel:310-344-0898' className="mobile wrapper">
                <div className="icon">
                  <i className='fa fa-mobile' />
                </div>
                <div className="content">
                  <div className="text">
                    {this.props.Mobile}
                  </div>
                </div>
              </a>
              <div className="border" />
              <a href={this.props.url} className="office wrapper">
                <div className="icon">
                  <i className='fa fa-map-marker' />
                </div>
                <div className="content">
                  <div className="text">
                    {this.props.Office} <br/> {this.props.City}
                  </div>
                </div>
              </a>
              <div className="border" />
              <a href={`mailto:${this.props.email}`} className="email wrapper">
                <div className="icon">
                  <i className='fa fa-paper-plane' />
                </div>
                <div className="content">
                  <div className="text">
                    {this.props.email}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
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
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}>
        </div>
        <div className="details" dangerouslySetInnerHTML={{__html: this.props.details}}>
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
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}>
          </div>
        </div>
        <div className="details" dangerouslySetInnerHTML={{__html: this.props.details}}>
        </div>
      </div>
    );
  }
});

module.exports = Contact;
