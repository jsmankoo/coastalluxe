var React = require('react');
var MediaQuery = require('react-responsive');
var ReactBGVideo = require('react-background-video');
var Markdown = require('react-remarkable');
import {Link, Element, Events} from 'react-scroll';

var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

const Home = React.createClass({
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
    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/18')
      .then(({acf})=>{
        store.dispatch({
          type: 'HOME_INIT',
          data: acf
        });
        const links = [
          `${acf.featured !== '0' ? `http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured?per_page=${acf.featured}` : ''}`,
          `${acf.azzurraa !== '0' ? `http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr?per_page=${acf.azzurraa}` : ''}`,
          `${acf.regatta !== '0' ? `http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr?per_page=${acf.regatta}` : ''}`,
          `${acf.cove !== '0' ? `http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr?per_page=${acf.cove}` : ''}`,
        ];
        links.map((link)=>{
          if(link === '') return;
          $.get(link).then((properties)=>{
            this.setState({...this.state,
              items: [...this.state.items, ...properties]
            });
          });
        });

      });
  },
  render(){
    return (
      <div className="Home">
        <Top
          headline={store.getState().Home.headline}
          subheadline={store.getState().Home.subheadline}/>
        <Element name='featured'>
          <Featured
            items={this.state.items}
            options={this.state.options}/>
        </Element>
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
        <MediaQuery maxDeviceWidth={1024}>
          <div className="BGVideo" style={{
            backgroundImage: "url('/img/azzura.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            WebkitBackgroundSize: 'cover',
            position: 'absolute',
            minHeight: '100%',
            minWidth: '100%',
            zIndex: '-9999'
          }}>
          </div>
          <div className="BGContent">
            <div className="headline">
              {this.props.headline}
            </div>
            <div className="bgBorder">
            </div>
            <div className="subheadline">
              {this.props.subheadline}
            </div>
            <div className="scrollDown">
              <Link to='featured' className='button' smooth={true} offset={50} duration={500}>
                <i className='fa fa-chevron-down' />
              </Link>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1025}>
          <ReactBGVideo
            className='BGVideo'
            videos={[{
              src: '/img/azzura.mp4'
            },{
              src: '/img/azzura.webm'
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
              <div className="scrollDown">
                <Link to='featured' className='button' smooth={true} offset={50} duration={500}>
                  <i className='fa fa-chevron-down' />
                </Link>
              </div>
            </div>
          </ReactBGVideo>
        </MediaQuery>
      </div>
    );
  }
});

const Featured = React.createClass({
  handleSale(item){
    if (item.acf.forSale !== '' && item.acf.lease !== '')
      return (
        <div className="price">
          For Sale: ${item.acf.forSale} / For Lease: ${item.acf.lease}
        </div>
      );
    else if(item.acf.forSale !== '')
      return (
        <div className="price">
          For Sale: ${item.acf.forSale}
        </div>
      );
    else if(item.acf.lease !== '')
      return (
        <div className="price">
          For Lease: ${item.acf.lease}
        </div>
      );
  },
  render(){
    return (
      <div id='Featured' className="Featured">
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
        <OwlCarousel id='featuredSlide' options={this.props.options}>
          {
            this.props.items.map((item, index)=>{
              return (
                <div className="item" key={index}>
                  <a href={`/#/featured/${item.type}/${item.acf.name}/${item.id}`} className="img-wrapper" style={{backgroundImage: `url(${item.acf.image})`}}>
                    {
                      item.acf.text !== '' ?
                      <div className="specialText">
                        {item.acf.text}
                      </div> :
                      <div />
                    }
                  </a>
                  <div className="info">
                    <div className="name">
                      {item.acf.name}
                    </div>
                    {this.handleSale(item)}
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
      "image": "/img/transparent.png",
      "facebook": "",
      "twitter": "",
      "email": "",
      "instagram": "",
      "name": "Loading ...",
      "content": "Loading ...",
      "mobileimage": "/img/transparent.png",
      "bgImage": ""
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
        <MediaQuery minDeviceWidth={768} maxDeviceWidth={1280}>
          <div className="bgTint">
            {this.Tablet()}
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1281}>
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
        <div className="info" dangerouslySetInnerHTML={{__html: this.state.content}}>
        </div>
        <a href='/#/contact' className="more">
          <div className="linkName">
            More
          </div>
          <i className='fa fa-chevron-right' />
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
          <div className="info" dangerouslySetInnerHTML={{__html: this.state.content}}>
          </div>
        </div>
        <div className="Row">
          <div className="socialMedia">
            <a href={`mailto:${this.state.email}`}><i className='fa fa-envelope' /></a>
            <a href={this.state.facebook}><i className='fa fa-facebook-f' /></a>
            <a href={this.state.twitter}><i className='fa fa-twitter' /></a>
            <a href={this.state.instagram}><i className='fa fa-instagram' /></a>
          </div>
          <div className="hidden half"></div>
          <div className="more">
            <a href='/#/contact'>More <i className='fa fa-chevron-right' /></a>
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
          <div className="info" dangerouslySetInnerHTML={{__html: this.state.content}}>
          </div>
        </div>
        <div className="Row">
          <div className="socialMedia">
            <a href={`mailto:${this.state.email}`}><i className='fa fa-envelope' /></a>
            <a href={this.state.facebook}><i className='fa fa-facebook-f' /></a>
            <a href={this.state.twitter}><i className='fa fa-twitter' /></a>
            <a href={this.state.instagram}><i className='fa fa-instagram' /></a>
          </div>
          <div className="hidden half"></div>
          <div className="more">
            <a href='/#/contact'>More <i className='fa fa-chevron-right' /></a>
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
                      <div className="exploreTint">
                        <div className="titleWrapper">
                          <div className="linkTitle">
                            {item.title}
                          </div>
                          <div className="linkSubtitle">
                            {item.subtitle}
                          </div>
                        </div>
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
