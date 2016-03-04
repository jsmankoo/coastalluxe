var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var ReactBGVideo = require('react-background-video');
var Markdown = require('react-remarkable');

var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

const Home = React.createClass({
  componentDidMount(){
    store.dispatch({
      type: 'NAV_AFFIX_RESET'
    });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/18')
      .then(({acf})=>{
        store.dispatch({
          type: 'HOME_INIT',
          data: acf
        });
      });
  },
  handleWaypoint(){
    store.dispatch({
      type: 'NAV_AFFIX_TOGGLE'
    });
  },
  render(){
    return (
      <div className="Home">
        <MediaQuery minDeviceWidth={1024}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Top
          headline={store.getState().Home.headline}
          subheadline={store.getState().Home.subheadline}/>
        <Featured />
        <Ryan />
        <Explore
          title={store.getState().Home.title}
          subtitle={store.getState().Home.subtitle}
          links={store.getState().Home.links} />
      </div>
    );
  }
});

const Top = React.createClass({
  render(){
    return (
      <div className="Top">
        <ReactBGVideo
          className='BGVideo'
          videos={[{
            src: '/img/azzura.mp4'
          },{
            src: '/img/azzura.webm'
          },{
            src: '/img/azzura.ogv'
          }]}
          poster='/img/azzura.jpg'
          loop={true}>
          <div className="BGContent">
            <div className="headline">
              {this.props.headline}
            </div>
            <div className="bgBorder">
            </div>
            <div className="subheadline">
              {this.props.subheadline}
            </div>
          </div>
        </ReactBGVideo>
      </div>
    );
  }
});

const Featured = React.createClass({
  getInitialState(){
    return {
      items : [],
      options : {
				navigation : false, // Show next and prev buttons
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				autoPlay : true,
			},
    };
  },
  componentDidMount(){
    const pullList = [
      'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured',
      'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr',
      'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr',
      'http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr'
    ];
    pullList.map((link)=>{
      $.get(link).then((properties)=>{
          this.setState({...this.state,
            items: [...this.state.items, ...[properties[0], properties[1], properties[2]]]
          });
      });
    });
  },
  render(){
    return (
      <div className="Featured">
        <div className="Heading">
          <div className="title">
            <a href='/#/featured'>Featured</a>
          </div>
          <div className="Row">
            <div className="all">
              <MediaQuery minDeviceWidth={768}>
                <a href='/#/featured'>
                  All Properties <i className='fa fa-th' />
                </a>
              </MediaQuery>
            </div>
          </div>
        </div>
        <OwlCarousel id='featuredSlide' options={this.state.options}>
          {
            this.state.items.map((item, index)=>{
              return (
                <div className="item" key={index}>
                  <div className="img-wrapper" style={{backgroundImage: `url(${item.acf.image})`}}>
                    <div className="specialText">
                      {item.acf.text}
                    </div>
                  </div>
                  <div className="info">
                    <div className="name">
                      {item.acf.name}
                    </div>
                    <div className="price">
                      {item.acf.forSale == '' ? '~' : `For Sale: $${item.acf.forSale}`}
                      {`\t\t/\t\t`}
                      {item.acf.lease == '' ? '~' : `For Sale: $${item.acf.lease}`}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </OwlCarousel>
      </div>
    );
  }
});

const Ryan = React.createClass({
  getInitialState(){
    return {
      "image": "/img/loader.gif",
      "facebook": "",
      "twitter": "",
      "email": "",
      "instagram": "",
      "name": "Loading ...",
      "content": "Loading ...",
      "mobileimage": "/img/loader.gif",
      "bgImage": "/img/loader.gif"
    };
  },
  componentDidMount(){
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/28')
      .then(({acf})=>{
        this.setState(acf);
      });
  },
  render(){
    return (
      <div className="Ryan" style={{backgroundImage:`url(${this.state.bgImage})`}}>
        <MediaQuery maxDeviceWidth={767}>
          <div className="bgTint">
            {this.Mobile()}
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
          <div className="bgTint">
            {this.Tablet()}
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024}>
          <div className="bgTint">
            {this.Desktop()}
          </div>
        </MediaQuery>
      </div>
    );
  },
  Mobile(){
    return (
      <div className="wrap Mobile">
        <div className="name">
          {this.state.name}
        </div>
        <div className="image">
          <img src={this.state.mobileimage} />
        </div>
        <div className="info">
          <Markdown className="paragraph">
            {this.state.content}
          </Markdown>
        </div>
        <a href='/#/contact' className="more">
          More <i className='fa fa-chevron-right' />
        </a>
      </div>
    );
  },
  Tablet(){
    return (
      <div className="wrap Tablet">
        <div className="name">
          {this.state.name}
        </div>
        <div className="Row">
          <div className="image">
            <img src={this.state.image} />
          </div>
          <div className="info">
            <Markdown className="paragraph">
              {this.state.content}
            </Markdown>
          </div>
        </div>
        <div className="Row">
          <div className="socialMedia">
            <a href={this.state.email}><i className='fa fa-envelope' /></a>
            <a href={this.state.facebook}><i className='fa fa-facebook-f' /></a>
            <a href={this.state.twitter}><i className='fa fa-twitter' /></a>
            <a href={this.state.instagram}><i className='fa fa-instagram' /></a>
          </div>
          <div className="hidden half"></div>
          <div className="more">
            <a href='/#/contact'>MORE <i className='fa fa-chevron-right' /></a>
          </div>
        </div>
      </div>
    );
  },
  Desktop(){
    return (
      <div className="wrap Desktop">
        <div className="name">
          {this.state.name}
        </div>
        <div className="Row">
          <div className="image">
            <img src={this.state.image} />
          </div>
          <div className="info">
            <Markdown className="paragraph">
              {this.state.content}
            </Markdown>
          </div>
        </div>
        <div className="Row">
          <div className="socialMedia">
            <a href={this.state.email}><i className='fa fa-envelope' /></a>
            <a href={this.state.facebook}><i className='fa fa-facebook-f' /></a>
            <a href={this.state.twitter}><i className='fa fa-twitter' /></a>
            <a href={this.state.instagram}><i className='fa fa-instagram' /></a>
          </div>
          <div className="hidden half"></div>
          <div className="more">
            <a href='/#/contact'>MORE <i className='fa fa-chevron-right' /></a>
          </div>
        </div>
      </div>
    );
  }
});

const Explore = React.createClass({
  render(){
    return (
      <div className="Explore">
        <div className="wrap">
          <div className="title">
            {this.props.title}
          </div>
          <div className="exploreBorder">
          </div>
          <div className="subtitle">
            {this.props.subtitle}
          </div>
          <div className="links">
            {
              this.props.links.map((item, index)=>{
                return (
                  <div className="link-wrap" key={index} >
                    <a href={item.link} className="link" style={{
                      backgroundImage: `url(${item.Image})`
                    }}>
                      <div className="linkTitle">
                        {item.title}
                      </div>
                      <div className="linkSubtitle">
                        {item.subtitle}
                      </div>
                    </a>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Home;
