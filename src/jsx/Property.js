var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');

var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

const Property = React.createClass({
  getInitialState(){
    return {
      building: {
        "name": "Loading ...",
        "content": "",
        "image": "",
        "moreContent": "",
        "jumbotron": "",
        "facilities": []
      },
      property: {
        "name": "Loading ...",
        "number": "",
        "streetname": "",
        "city": "",
        "zip": "",
        "bed": "",
        "bath": "",
        "area": "",
        "mls": "",
        "title": "",
        "paragraph": "",
        "forSale": "",
        "lease": "",
        "text": "",
        "image": "",
        "slide_show": []
      },
      featured: [],
      options : {
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
    switch (this.props.params.building) {
      case 'featured':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/81')
          .then(({acf})=>{
            this.setState({...this.state, building: acf});
          });
        break;
      case '13700marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/137')
          .then(({acf})=>{
            this.setState({...this.state, building: acf});
          });
        break;
      case '13750marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/139')
          .then(({acf})=>{
            this.setState({...this.state, building: acf});
          });
        break;
      case '13800marinapointedr':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/140')
          .then(({acf})=>{
            this.setState({...this.state, building: acf});
          });
        break ;
      default:
        break;
    }
    $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/${this.props.params.building}/${this.props.params.id}`)
      .then(({acf})=>{
        this.setState({...this.state,
          property: acf
        });
      });
    $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/${this.props.params.building}`)
      .then((data)=>{
        this.setState({...this.state,
          featured: data.map(({id, acf})=>{
            return {...acf, id: id};
          })
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
      <div className="Property">
        <MediaQuery minDeviceWidth={1024}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Jumbotron {...this.state} />
        <Details {...this.state.property} options={this.state.options} />
        <Facilities {...this.state.building} />
        <Featured
          building={this.props.params.building}
          featured={this.state.featured}
          options={this.state.options} />

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
      <div className="Jumbotron" style={{backgroundImage: `url(${this.props.building.jumbotron})`}}>
        <div className="title">
          {this.props.property.title}
        </div>
        <div className="border"></div>
        <div className="info">
          <div className="address">
            {`${this.props.property.number} ${this.props.property.streetname}`} <br /> {`${this.props.property.city}`}
          </div>
          <a href={`https://www.google.ca/maps/place/${this.props.property.number} ${this.props.property.streetname} ${this.props.property.city}`}>
            <i className='fa fa-map-marker' />
          </a>
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
            {
              this.props.slide_show.map(({img}, index)=>{
                return (
                  <div key={index} className="item img-wrapper" style={{backgroundImage: `url(${img})`}}>
                  </div>
                );
              })
            }
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
            SQ.FT. <br /> {this.props.area}
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
      </div>
    );
  }
});

const Featured = React.createClass({
  getInitialState(){
    return {
      options: {
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 2,
        itemsDesktop : [1200,2],
        itemsMobile : [767,1],
        autoPlay : true
      }
    };
  },
  render(){
    return (
      <div className="Featured">
        <div className="title">
          Featured Listings
        </div>
        <OwlCarousel id='featuredSlide' options={this.state.options}>
          {
            this.props.featured.map((item, index)=>{
              return (
                <div className="item" key={index}>
                  <a href={`/#/featured/${this.props.building}/${item.name}/${item.id}`} className="img-wrapper" style={{backgroundImage: `url(${item.image})`}}>
                    <div className="specialText">
                      {item.text}
                    </div>
                  </a>
                  <div className="info">
                    <div className="name">
                      {item.name}
                    </div>
                    <div className="price">
                      {item.forSale == '' ? '~' : `For Sale: $${item.forSale}`}
                      {`\t\t/\t\t`}
                      {item.lease == '' ? '~' : `For Sale: $${item.lease}`}
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

const Facilities = React.createClass({
  getInitialState(){
    return {
      options: {
				navigation : false, // Show next and prev buttons
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				autoPlay : true,
			}
    };
  },
  render(){
    return (
      <div className="Facilities">
        <div className="title">
          Building Amenities
        </div>
        <OwlCarousel id='facilitiesSlide' options={this.state.options}>
          {
            this.props.facilities.map((item, index)=>{
              return (
                <div className="item" key={index}>
                  <div className="img-wrapper" style={{backgroundImage: `url(${item.img})`}}>
                    <div className="specialText">
                      {item.text}
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

module.exports = Property;
