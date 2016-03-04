var React = require('react');
var Waypoint = require('react-waypoint');
var MediaQuery = require('react-responsive');

var store = require('./store');

const FeaturedProperties = React.createClass({
  getInitialState(){
    return {
      index: {
        "title": "Loading ...",
        "image": ""
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
        const list = data.map(({acf})=>{
          return acf;
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            properties: list
          }
        });

      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr')
      .then((data)=>{
        const list = data.map(({acf})=>{
          return acf;
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            building13700: list
          }
        });
      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr')
      .then((data)=>{
        const list = data.map(({acf})=>{
          return acf;
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            building13750: list
          }
        });
      });
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr')
      .then((data)=>{
        const list = data.map(({acf})=>{
          return acf;
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
        <MediaQuery minDeviceWidth={1024}>
          <Waypoint onEnter={this.handleWaypoint} onLeave={this.handleWaypoint}/>
        </MediaQuery>
        <Jumbotron {...this.state.index} saleType={this.props.saleType} building={this.props.building} />
        <Properties {...this.state.buildings} saleType={this.props.saleType} building={this.props.building} />
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
      <div className="Jumbotron" style={{backgroundImage: `url(${this.props.image})`}}>
        <div className="title">
          {this.props.title}
        </div>
        <div className="select">
          <div className="select-wrapper">
            <div className="SaleType">
              <select value={this.props.saleType} onChange={this.saleOnChange}>
                <option value={'all'}>
                  For Sale & Lease
                </option>
                <option value={'sale'}>
                  For Sale
                </option>
                <option value={'lease'}>
                  For Lease
                </option>
              </select>
            </div>
            <div className="Building">
              <select value={this.props.building} onChange={this.buildingOnChange}>
                <option value={'properties'}>
                  Properties
                </option>
                <option value={'13700marinapointedr'}>
                  13700 Marina Pointe Dr
                </option>
                <option value={'13750marinapointedr'}>
                  13750 Marina Pointe Dr
                </option>
                <option value={'13800marinapointedr'}>
                  13800 Marina Pointe Dr
                </option>
              </select>
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
      case 'properties':
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
          return forSale !== '' && lease !== '';
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
  render(){
    return (
      <div className="Properties">
        <div className="wrap">
          {
            this.pickProperty().map( ({name, image, forSale, lease, text}, index)=>{
              return (
                <div className="property" key={index}>
                  <div className="img-wrapper" style={{backgroundImage: `url(${image})`}}>
                    <div className="specialText">
                      {text}
                    </div>
                  </div>
                  <div className="info">
                    <div className="name">
                      {name}
                    </div>
                    <div className="price">
                      {forSale == '' ? '~' : `For Sale: $${forSale}`}
                      {`\t\t/\t\t`}
                      {lease == '' ? '~' : `For Sale: $${lease}`}
                    </div>
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
