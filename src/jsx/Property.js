var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');

var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

const Property = React.createClass({
  getInitialState(){
    return {
      featuredImage: '',
      "name": "Loading ...",
      "number": "",
      "streetname": "",
      "city": "",
      "zip": "",
      "bed": "",
      "bath": "",
      "area": "",
      "mls": "",
      "title": "Loading",
      "paragraph": "Loading ...",
      "forSale": "",
      "lease": "",
      "text": "",
      "image": "",
      "slide_show": [],
      "options": {
				navigation : false, // Show next and prev buttons
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				autoPlay : true,
			}
    };
  },
  componentDidMount(){
    store.dispatch({
      type: 'NAV_AFFIX_RESET'
    });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/133')
      .then(({acf})=>{
        this.setState({...this.state,
          featuredImage: acf.image
        });
      });
    switch (this.props.params.building) {
      case 'properties':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured')
          .then((data)=>{
            for(var {acf} of data){
              if(acf.name == this.props.params.name){
                console.log({...this.state, ...acf});
                return this.setState({...this.state, ...acf});
              }
            }
          });
        break;
      case '13700marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr')
          .then((data)=>{
            for(var {acf} of data){
              if(acf.name == this.props.params.name){
                return this.setState({...this.state,
                  ...acf
                });
              }
            }
          });
        break;
      case '13750marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr')
          .then((data)=>{
            for(var {acf} of data){
              if(acf.name == this.props.params.name){
                return this.setState({...this.state,
                  ...acf
                });
              }
            }
          });
        break;
      case '13800marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr')
          .then((data)=>{
            for(var {acf} of data){
              if(acf.name == this.props.params.name){
                return this.setState({...this.state,
                  ...acf
                });
              }
            }
          });
        break;
      default:
        console.log('default case');
    }
  },
  handleWaypoint(){
    store.dispatch({
      type: 'NAV_AFFIX_TOGGLE'
    });
  },
  render(){
    return (
      <div className="Property">
        <MediaQuery minDeviceWidth={1024}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Jumbotron {...this.state} />
        <Details {...this.state} />
      </div>
    );
  }
});

const Jumbotron = React.createClass({
  saleOnChange(event){
    store.dispatch({
      type: 'FeaturedProperties_SALETYPE',
      saleType: event.target.value
    });
  },
  buildingOnChange(event){
    store.dispatch({
      type: 'FeaturedProperties_BUILDING',
      building: event.target.value
    });
  },
  render(){
    return (
      <div className="Jumbotron" style={{backgroundImage: `url(${this.props.featuredImage})`}}>
        <div className="title">
          {this.props.title}
        </div>
        <div className="border"></div>
        <div className="info">
          <div className="address">
            {`${this.props.number} ${this.props.streetname}`} <br /> {`${this.props.city}`}
          </div>
          <i className='fa fa-map-marker' />
        </div>
      </div>
    );
  }
});

const Details = React.createClass({
  render(){
    return (
      <div className="Details">
        <div className="slideShow">
          <OwlCarousel id='slideShow' options={this.props.options}>
            {}
          </OwlCarousel>
        </div>
        <div className="info">
          <div className="bed">
            BED <br /> {this.props.bed}
          </div>
          <div className="bath">
            BATH <br /> {this.props.bath}
          </div>
          <div className="area">
            APPROX. SQ.FT. <br /> {this.props.area}
          </div>
          <div className="mls">
            MLS# <br /> {this.props.mls}
          </div>
        </div>
        <div className="paragraph">
          <Markdown>
            {this.props.paragraph}
          </Markdown>
        </div>
        <Featured />
      </div>
    );
  }
});

const Featured = React.createClass({
  render(){
    return (
      <h1>Featured</h1>
    );
  }
});

module.exports = Property;
