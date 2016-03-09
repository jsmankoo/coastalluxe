var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');
var Select = require('react-select');

var store = require('./store');

const FeaturedProperties = React.createClass({
  getInitialState(){
    return {
      index: {
        "title": "Loading ...",
        "jumbotron": ""
      },
      buildings: {
        properties: [],
        building13700: [],
        building13750: [],
        building13800: []
      }
    };
  },
  componentDidMount(){
    window.scrollTo(0, 0);
    store.dispatch({
      type: 'NAV_AFFIX_RESET'
    });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/81')
      .then(({acf})=>{
        this.setState({...this.state,
          index: acf
        });
      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            properties: list
          }
        });

      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            building13700: list
          }
        });
      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            building13750: list
          }
        });
      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            building13800: list
          }
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
      <div className="FeaturedProperties">
        <MediaQuery minDeviceWidth={1281}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Jumbotron {...this.state.index} saleType={this.props.saleType} building={this.props.building} />
        <Properties {...this.state.buildings} saleType={this.props.saleType} building={this.props.building} />
      </div>
    );
  }
});

const Jumbotron = React.createClass({
  saleOnChange({value}){
    store.dispatch({
      type: 'FeaturedProperties_SALETYPE',
      saleType: value
    });
  },
  buildingOnChange({value}){
    store.dispatch({
      type: 'FeaturedProperties_BUILDING',
      building: value
    });
  },
  render(){
    return (
      <div className="Jumbotron" style={{backgroundImage: `url(${this.props.jumbotron})`}}>
        <div className="bgTint">
          <div className="jumbotron-wrapper">
            <div className="title">
              {this.props.title}
            </div>
            <div className="select">
              <div className="SaleType-wrapper">
                <div className="SaleType">
                  <Select
                    name="Sale Type"
                    value={this.props.saleType}
                    options={[
                      { value: 'all', label: 'For Sale & Lease' },
                      { value: 'sale', label: 'For Sale' },
                      { value: 'lease', label: 'For Lease' }
                    ]}
                    onChange={this.saleOnChange}
                  />
                </div>
              </div>
              <div className="Building-wrapper">
                <div className="Building">
                  <Select
                    name="Building"
                    value={this.props.building}
                    options={[
                      { value: 'featured', label: 'Featured Properties' },
                      { value: '13700marinapointedr', label: 'Azzurra' },
                      { value: '13750marinapointedr', label: 'Regatta' },
                      { value: '13800marinapointedr', label: 'Cove' },
                    ]}
                    onChange={this.buildingOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const Properties = React.createClass({
  pickProperty(){
    switch (this.props.building) {
      case 'featured':
        return this.filterProperty(this.props.properties);
      case '13700marinapointedr':
        return this.filterProperty(this.props.building13700);
      case '13750marinapointedr':
        return this.filterProperty(this.props.building13750);
      case '13800marinapointedr':
        return this.filterProperty(this.props.building13800);
      default:
        return this.filterProperty(this.props.properties);
    }
  },
  filterProperty(list){
    switch (this.props.saleType) {
      case 'all':
        return list.filter(({forSale, lease})=>{
          return forSale !== '' || lease !== '';
        });
      case 'sale':
        return list.filter(({forSale, lease})=>{
          return forSale !== '';
        });
      case 'lease':
        return list.filter(({forSale, lease})=>{
          return lease !== '';
        });
      default:
        return list;
    }
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
      <div className="Properties">
        <div className="wrap">
          {
            this.pickProperty().map( ({id, name, image, forSale, lease, text}, index)=>{
              return (
                <div className="property" key={index}>
                  <a href={`/#/featured/${this.props.building}/${name}/${id}`} className="img-wrapper" style={{backgroundImage: `url(${image})`}}>
                    {
                      text !== '' ?
                      <div className="specialText">
                        {text}
                      </div> :
                      <div />
                    }
                  </a>
                  <div className="info">
                    <div className="name">
                      {name}
                    </div>
                    {this.handleSale(forSale, lease)}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = FeaturedProperties;
