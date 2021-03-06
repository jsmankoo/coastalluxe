var React = require('react');
var MediaQuery = require('react-responsive');
var Markdown = require('react-remarkable');
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {fromString} from 'html-to-text';

var OwlCarousel = require('./components/OwlCarousel');
var store = require('./store');

const Property = React.createClass({
  getInitialState(){
    return {
      building: {
        "name": "",
        "content": "",
        "image": "",
        "moreContent": "",
        "jumbotron": "",
        "facilities": []
      },
      property: {
        "name": "",
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
        "slide_show": [],
        "facilities": []
      },
      featured: [],
      options : {
        navigation: true,
        navigationText: ['<img src="/img/ArrowLeft.svg" />', '<img src="/img/ArrowRight.svg" />'],
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				autoPlay : true,
			}
    };
  },
  componentDidMount(){
    $(window).scrollTop(0);
    switch (this.props.params.building) {
      case 'Azzurra':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/137')
          .then(({acf})=>{
            this.setState({...this.state,
              building: {...this.state.building,
                facilities: acf.facilities
              }
            });
          });
          $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr/${this.props.params.id}`)
            .then(({acf})=>{
              this.setState({...this.state,
                property: {...this.state.property, ...acf},
                building: {...this.state.building, jumbotron: acf.image}
              });
              window.prerenderReady = true;
            });
            $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr`)
              .then((data)=>{
                this.setState({...this.state,
                  featured: data.map(({id, acf})=>{
                    return {...acf, id: id};
                  })
                });
              });
        break;
      case 'Regatta':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/139')
          .then(({acf})=>{
            this.setState({...this.state,
              building: {...this.state.building,
                facilities: acf.facilities
              }
            });
          });
          $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr/${this.props.params.id}`)
            .then(({acf})=>{
              this.setState({...this.state,
                property: {...this.state.property, ...acf},
                building: {...this.state.building, jumbotron: acf.image}
              });
              window.prerenderReady = true;
            });
            $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr`)
              .then((data)=>{
                this.setState({...this.state,
                  featured: data.map(({id, acf})=>{
                    return {...acf, id: id};
                  })
                });
              });
        break;
      case 'Cove':
        $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/140')
          .then(({acf})=>{
            this.setState({...this.state,
              building: {...this.state.building,
                facilities: acf.facilities
              }
            });
          });
          $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr/${this.props.params.id}`)
            .then(({acf})=>{
              this.setState({...this.state,
                property: {...this.state.property, ...acf},
                building: {...this.state.building, jumbotron: acf.image}
              });
              window.prerenderReady = true;
            });
            $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr`)
              .then((data)=>{
                this.setState({...this.state,
                  featured: data.map(({id, acf})=>{
                    return {...acf, id: id};
                  })
                });
              });
        break ;
      default:
        $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured/${this.props.params.id}`)
          .then(({acf})=>{
            this.setState({...this.state,
              property: {...this.state.property, ...acf},
              building: {...this.state.building, jumbotron: acf.image}
            });
            window.prerenderReady = true;
          });
          $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured`)
            .then((data)=>{
              this.setState({...this.state,
                featured: data.map(({id, acf})=>{
                  return {...acf, id: id};
                })
              });
            });
        break;
    }
  },
  render(){
    // console.log(this.state);
    // console.log(window.prerenderReady);
    // script={[
    //   {
    //     type:"text/javascript",
    //     src:"//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-57056071f6b81438"
    //   }
    // ]}
    return (
      <div className="Property">
        <Helmet
            title={`${this.state.property.name} - Coastal Luxe Living - Specializing in luxury Coastal properties`}
            meta={[
              {"name": "description", "content": fromString(this.state.property.paragraph)},
              {"property": "og:type", "content": "article"},
              {"property": "og:title", "content": `${this.state.property.name} - Coastal Luxe Living - Specializing in luxury Coastal properties`},
              {"property": "og:url", "content": `http://coastalluxeliving.com/featured/${this.props.routeParams.building}/${this.props.routeParams.name}/${this.props.routeParams.id}`},
              {"property": "og:description", "content": fromString(this.state.property.paragraph)},
              {"property": "og:image", "content": this.state.property.image }
            ]}
          />
        <Jumbotron {...this.state} />
        <Details routeParams={this.props.routeParams} {...this.state.property} options={this.state.options} />
        <div className="Share">

        </div>
        {
          this.state.building.facilities.length === 0 ?
          <div /> :
          <Facilities {...this.state.building} />
        }
        {
          this.state.property.facilities.length ?
          <Facilities facilities={this.state.property.facilities} /> :
          <div />
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
              {this.props.property.name}
            </div>
            <div className="border"></div>
            <div className="info">
              <div className="address">
                {`${this.props.property.number} ${this.props.property.streetname}`} <br /> {`${this.props.property.city}`}
              </div>
              <a target='_blank' href={`https://www.google.ca/maps/place/${this.props.property.number} ${this.props.property.streetname} ${this.props.property.city}`}>
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
  handlePrice(sale, lease){
    if(sale !== '' && lease !== ''){
      return (
        <div className="price">
          ${this.props.forSale}
          <br />
          ${this.props.lease}/mo.
        </div>
      );
    } else if( sale !== ''){
      return (
        <div className="price">
          FOR SALE
          <br />
          ${this.props.forSale}
        </div>
      );
    } else if( lease !== ''){
      return (
        <div className="price">
          FOR LEASE
          <br />
          ${this.props.lease}/mo.
        </div>
      );
    }
  },
  render(){
    const {routeParams, image, name} = this.props;
    return (
      <div className="Details">
        <div className="slideShow">
          <OwlCarousel id='slideShow' options={this.props.options}>
            {
              this.props.slide_show.map(({img}, index)=>{
                return (
                  <div key={index} className="item img-wrapper" style={{backgroundImage: `url(${img})`}}>
                    {
                      this.props.text === '' ?
                      <div /> :
                      <div className="specialText">{this.props.text}</div>
                    }
                  </div>
                );
              })
            }
          </OwlCarousel>
          <div id='ShareButton' className="addthis_sharing_toolbox">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://coastalluxeliving.com/featured/${routeParams.building}/${routeParams.name}/${routeParams.id}`)}`} target="_blank">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`http://coastalluxeliving.com/featured/${routeParams.building}/${routeParams.name}/${routeParams.id}`)}`} target="_blank">
              <i className="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
            {/*<a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/">
              <i className="fa fa-pinterest-square" aria-hidden="true"></i>
            </a>*/}
          </div>
        </div>
        <div className="info">
          <div className="info-wrapper">
            {this.handlePrice(this.props.forSale, this.props.lease)}
          </div>
          <div className="info-wrapper">
            <div className="bedBath">
              BATH: {this.props.bath}
              <br />
              BED: {this.props.bed}
            </div>
            {/*<div className="bed">
            </div>*/}
          </div>
          <div className="info-wrapper">
            <div className="area">
              APPROX. SQ.FT. <br /> {this.props.area}
            </div>
          </div>
          <div className="info-wrapper">
            <div className="mls">
              MLS# <br /> {this.props.mls}
            </div>
          </div>
        </div>
        <div className="paragraph" dangerouslySetInnerHTML={{__html: this.props.paragraph}}>
        </div>
      </div>
    );
  }
});

const Featured = React.createClass({
  getInitialState(){
    return {
      options: {
        navigation: true,
        navigationText: ['<img src="/img/ArrowLeft.svg" />', '<img src="/img/ArrowRight.svg" />'],
        slideSpeed : 300,
        paginationSpeed : 400,
        items : 2,
        itemsDesktop : [1280,2],
        itemsTablet : [1024,2],
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
                  <Link to={`/featured/${this.props.building}/${item.name}/${item.id}`} className="img-wrapper" style={{backgroundImage: `url(${item.image})`}}>
                    {
                      item.text !== '' ?
                      <div className="specialText">
                        {item.text}
                      </div> :
                      <div />
                    }
                  </Link>
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
      </div>
    );
  }
});

const Facilities = React.createClass({
  getInitialState(){
    return {
      options: {
        navigation: true,
        navigationText: ['<img src="/img/ArrowLeft.svg" />', '<img src="/img/ArrowRight.svg" />'],
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
        <MediaQuery maxDeviceWidth={1280}>
          <div className="Tablet">
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
        </MediaQuery>
        <MediaQuery minDeviceWidth={1281}>
          <div className="Desktop">
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
        </MediaQuery>
      </div>
    );
  }
});

module.exports = Property;
