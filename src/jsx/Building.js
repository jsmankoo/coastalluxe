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
        "facilities": [],
        "streetAddress": "",
        "city": ""
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
    window.scrollTo(0, 0);
    store.dispatch({
      type: 'NAV_AFFIX_RESET'
    });
    switch (this.props.buildingName) {
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
    $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/${this.props.buildingName}`)
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
      <div className="Building">
        <MediaQuery minDeviceWidth={1281}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Jumbotron {...this.state} />
        <Featured
          building={this.props.buildingName}
          featured={this.state.featured}
          options={this.state.options} />
        <Details {...this.state.building} />
        {
          this.state.building.facilities.length === 0
          ? <div />
          : <Facilities {...this.state.building} />
        }
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
        <div className="bgTint">
          <div className="jumbotron-wrapper">
            <div className="title">
              {this.props.building.name}
            </div>
            <div className="border"></div>
            <div className="info">
              <div className="address">
                {`${this.props.building.streetAddress}`} <br /> {`${this.props.building.city}`}
              </div>
              <a target='_blank' href={`https://www.google.ca/maps/place/${this.props.building.streetAddress} ${this.props.building.city}`}>
                <i className='fa fa-map-marker' />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const Details = React.createClass({
  getInitialState(){
    return {
      moreContentShow: false
    };
  },
  showContent(){
    this.setState({...this.state,
      moreContentShow: !this.state.moreContentShow
    });
  },
  render(){
    return (
      <div className="Details">
        <div className="intro">
          <div className="img-wrapper" style={{backgroundImage: `url(${this.props.image})`}}>
          </div>
          <div className="paragraph">
            <Markdown>{this.props.content}</Markdown>
          </div>
        </div>
        {
          this.state.moreContentShow
          ? <div className="rest">
              <div className="paragraph">
                <Markdown>{this.props.moreContent}</Markdown>
              </div>
            </div>
          : <div />
        }
        <div className="arrow">
          <i
            className={`fa fa-chevron-${this.state.moreContentShow ? 'up' : 'down'}`}
            onClick={this.showContent}/>
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
  handleSale(forSale, lease){
    if (forSale !== '' && lease !== '')
      return (
        <div className="price">
          For Sale: ${forSale} / For Lease: ${lease}
        </div>
      );
    else if(forSale !== '')
      return (
        <div className="price">
          For Sale: ${forSale}
        </div>
      );
    else if(lease !== '')
      return (
        <div className="price">
          For Lease: ${lease}
        </div>
      );
  },
  handleMore(building){
    switch (building) {
      case '13700marinapointedr':
        return <a href={`/#/featured/Azzurra`}>More</a>;
      case '13750marinapointedr':
        return <a href={`/#/featured/Regatta`}>More</a>;
      case '13800marinapointedr':
        return <a href={`/#/featured/Cove`}>More</a>;
      default:
        return <div />;
    }
  },
  render(){
    return (
      <div className="Featured">
        {/*<div className="title">
          Featured Listings
        </div>*/}
        <OwlCarousel id='featuredSlide' options={this.state.options}>
          {
            this.props.featured.map((item, index)=>{
              return (
                <div className="item" key={index}>
                  <a href={`/#/featured/${this.props.building}/${item.name}/${item.id}`} className="img-wrapper" style={{backgroundImage: `url(${item.image})`}}>
                    {
                      item.text !== '' ?
                      <div className="specialText">
                        {item.text}
                      </div> :
                      <div />
                    }
                  </a>
                  <div className="info">
                    <div className="name">
                      {item.name}
                    </div>
                    {this.handleSale(item.forSale, item.lease)}
                  </div>
                </div>
              );
            })
          }
        </OwlCarousel>
        <div className="more">
          {this.handleMore(this.props.building)}
        </div>
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
                    {
                      item.text !== '' ?
                      <div className="specialText">
                        {item.text}
                      </div> :
                      <div />
                    }
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
