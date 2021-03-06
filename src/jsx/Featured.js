var React = require('react');
var MediaQuery = require('react-responsive');
var Select = require('react-select');
import Helmet from 'react-helmet';
import {Link} from 'react-router';

var store = require('./store');

const FeaturedProperties = React.createClass({
  getInitialState(){
    return {
      index: {
        "title": "Loading ...",
        "jumbotron": ""
      },
      buildings: {
        done: false,
        featuredDone: false,
        building13700Done: false,
        building13750Done: false,
        building13800Done: false,
        page: 2,
        all: [],
        properties: [],
        building13700: [],
        building13750: [],
        building13800: []
      }
    };
  },
  componentDidMount(){
    $(window).scrollTop(0);
    $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/pages/81')
      .then(({acf})=>{
        this.setState({...this.state,
          index: acf
        });
        window.prerenderReady = true;
      });
    const featured = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{return {...acf, building: 'featured'};})],
            properties: list.map((acf)=>{return {...acf, building: 'featured'};})
          }
        });
        return data.length;
      });
    const building13700 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{return {...acf, building: '13700marinapointedr'};})],
            building13700: list.map((acf)=>{return {...acf, building: '13700marinapointedr'};})
          }
        });
        return data.length;
      });
    const building13750 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{return {...acf, building: '13750marinapointedr'};})],
            building13750: list.map((acf)=>{return {...acf, building: '13750marinapointedr'};})
          }
        });
        return data.length;
      });
    const building13800 = $.get('http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr')
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{return {...acf, building: '13800marinapointedr'};})],
            building13800: list.map((acf)=>{return {...acf, building: '13800marinapointedr'};})
          }
        });
        return data.length;
      });
    $.when(featured, building13700, building13750, building13800).done((v1, v2, v3, v4)=>{
      if(v1 !== 10 && v2 !== 10 && v3 !== 10 && v4 !== 10){
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            done: true
          }
        });
      }
    });
  },
  loadProperties(){
    let promise = 0;
    const featured = $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/featured?page=${this.state.buildings.page}`)
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{
              return {...acf, building: 'featured'};
            })],
            properties: [...this.state.buildings.properties, ...list.map((acf)=>{
              return {...acf, building: 'featured'};
            })]
          }
        });
        if(data.length < 10){
          this.setState({...this.state,
            buildings: {...this.state.buildings,
              featuredDone: true
            }
          });
        }
        return data.length;
      });
    const building13700 = $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13700marinapointedr?page=${this.state.buildings.page}`)
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{
              return {...acf, building: '13700marinapointedr'};
            })],
            building13700: [...this.state.buildings.building13700, ...list.map((acf)=>{
              return {...acf, building: '13700marinapointedr'};
            })]
          }
        });
        if(data.length < 10){
          this.setState({...this.state,
            buildings: {...this.state.buildings,
              building13700Done: true
            }
          });
        }
        return data.length;
      });
    const building13750 = $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13750marinapointedr?page=${this.state.buildings.page}`)
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{
              return {...acf, building: '13750marinapointedr'};
            })],
            building13750: [...this.state.buildings.building13750, ...list.map((acf)=>{
              return {...acf, building: '13750marinapointedr'};
            })]
          }
        });
        if(data.length < 10){
          this.setState({...this.state,
            buildings: {...this.state.buildings,
              building13750Done: true
            }
          });
        }
        return data.length;
      });
    const building13800 = $.get(`http://luxe.uptowncreativeinc.com/wp-json/wp/v2/13800marinapointedr?page=${this.state.buildings.page}`)
      .then((data)=>{
        const list = data.map(({id, acf})=>{
          return {...acf, id: id};
        });
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            all: [...this.state.buildings.all, ...list.map((acf)=>{
              return {...acf, building: '13800marinapointedr'};
            })],
            building13800: [...this.state.buildings.building13800, ...list.map((acf)=>{
              return {...acf, building: '13800marinapointedr'};
            })]
          }
        });
        if(data.length < 10){
          this.setState({...this.state,
            buildings: {...this.state.buildings,
              building13800Done: true
            }
          });
        }
        return data.length;
      });
    $.when(featured, building13700, building13750, building13800).done((v1, v2, v3, v4)=>{
      if(v1 < 10 && v2 < 10 && v3 < 10 && v4 < 10){
        this.setState({...this.state,
          buildings: {...this.state.buildings,
            done: true
          }
        });
      }
      this.setState({...this.state,
        buildings: {...this.state.buildings,
          page: this.state.buildings.page + 1
        }
      });
    });
  },
  render(){
    return (
      <div className="FeaturedProperties">
        <Helmet
            title={`Coastal Luxe Living - Specializing in luxury Coastal properties - Featured Properties`}
            meta={[
              {"name": "description", "content": `Featured Listings`},
              {"property": "og:type", "content": "article"},
              {"property": "og:title", "content": `Coastal Luxe Living - Specializing in luxury Coastal properties - Featured Properties`},
              {"property": "og:url", "content": `http://coastalluxeliving.com/featured`},
              {"property": "og:description", "content": `Featured Listings`},
              {"property": "og:image", "content": this.state.index.jumbotron}
            ]}
          />
        <Jumbotron {...this.state.index} saleType={this.props.saleType} building={this.props.building} />
        <Properties
          {...this.state.buildings}
          saleType={this.props.saleType}
          building={this.props.building}
          loadProperties={this.loadProperties}/>
      </div>
    );
  }
});

const Jumbotron = React.createClass({
  saleOnChange(value){
    store.dispatch({
      type: 'FeaturedProperties_SALETYPE',
      saleType: value
    });
  },
  buildingOnChange(value){
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
                  <div className="filterType">
                    Status:
                  </div>
                  <Select
                    name="Sale Type"
                    value={this.props.saleType}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'sale', label: 'For Sale' },
                      { value: 'lease', label: 'For Lease' },
                      { value: 'sold', label: 'Sold' }
                    ]}
                    onChange={this.saleOnChange}
                  />
                </div>
              </div>
              <div className="Building-wrapper">
                <div className="Building">
                  <div className="filterType">
                    Property:
                  </div>
                  <Select
                    name="Building"
                    value={this.props.building}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: '13700marinapointedr', label: 'Azzurra' },
                      { value: '13750marinapointedr', label: 'Regatta' },
                      { value: '13800marinapointedr', label: 'Cove' },
                      { value: 'featured', label: 'Other' }
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
      case 'all':
        return this.filterProperty(this.props.all);
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
        return list.sort(({forSale: aforSale, lease: aLease}, {forSale: bforSale, lease: bLease})=>{
          const a = (aforSale === "" ? 0 : parseInt(aforSale.split(",").join(""))) + (aLease === "" ? 0 : parseInt(aLease.split(",").join("")));
          const b = (bforSale === "" ? 0 : parseInt(bforSale.split(",").join(""))) + (bLease === "" ? 0 : parseInt(bLease.split(",").join("")));
          return (b - a);
        });
      case 'sale':
        return list.filter(({forSale, lease, status})=>{
          return forSale !== '' && status !== 'sold';
        }).sort(({forSale: aforSale, lease: aLease}, {forSale: bforSale, lease: bLease})=>{
          const a = (aforSale === "" ? 0 : parseInt(aforSale.split(",").join(""))) + (aLease === "" ? 0 : parseInt(aLease.split(",").join("")));
          const b = (bforSale === "" ? 0 : parseInt(bforSale.split(",").join(""))) + (bLease === "" ? 0 : parseInt(bLease.split(",").join("")));
          return (b - a);
        });
      case 'lease':
        return list.filter(({forSale, lease, status})=>{
          return lease !== '' && status !== 'sold';
        }).sort(({forSale: aforSale, lease: aLease}, {forSale: bforSale, lease: bLease})=>{
          const a = (aforSale === "" ? 0 : parseInt(aforSale.split(",").join(""))) + (aLease === "" ? 0 : parseInt(aLease.split(",").join("")));
          const b = (bforSale === "" ? 0 : parseInt(bforSale.split(",").join(""))) + (bLease === "" ? 0 : parseInt(bLease.split(",").join("")));
          return (b - a);
        });
      case 'sold':
        return list.filter(({status})=>{
          return status === 'sold';
        }).sort(({forSale: aforSale, lease: aLease}, {forSale: bforSale, lease: bLease})=>{
          const a = (aforSale === "" ? 0 : parseInt(aforSale.split(",").join(""))) + (aLease === "" ? 0 : parseInt(aLease.split(",").join("")));
          const b = (bforSale === "" ? 0 : parseInt(bforSale.split(",").join(""))) + (bLease === "" ? 0 : parseInt(bLease.split(",").join("")));
          return (b - a);
        });
      default:
        return list.sort(({forSale: aforSale, lease: aLease}, {forSale: bforSale, lease: bLease})=>{
          const a = (aforSale === "" ? 0 : parseInt(aforSale.split(",").join(""))) + (aLease === "" ? 0 : parseInt(aLease.split(",").join("")));
          const b = (bforSale === "" ? 0 : parseInt(bforSale.split(",").join(""))) + (bLease === "" ? 0 : parseInt(bLease.split(",").join("")));
          return (b - a);
        });
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
            this.pickProperty().map( ({building, id, name, image, forSale, lease, text}, index)=>{
              return (
                <div className="property" key={index}>
                  <Link className="img-wrapper" style={{backgroundImage: `url(${image})`}}
                    to={
                      (()=>{
                        switch (building) {
                          case '13700marinapointedr':
                            return `/featured/Azzurra/${name.split(' ').join('-')}/${id}`;
                          case '13750marinapointedr':
                            return `/featured/Regatta/${name.split(' ').join('-')}/${id}`;
                          case '13800marinapointedr':
                            return `/featured/Cove/${name.split(' ').join('-')}/${id}`;
                          default:
                            return `/featured/featured/${name.split(' ').join('-')}/${id}`;
                        }
                      })()
                    }>
                    {
                      text !== '' ?
                      <div className="specialText">
                        {text}
                      </div> :
                      <div />
                    }
                  </Link>
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
        {
          (()=>{
            switch (this.props.building) {
              case 'all':
                if(this.props.done){
                  return <div />;
                } else {
                  return (
                    <div className="moreProperties">
                      <a onClick={this.props.loadProperties}>
                        Load more
                      </a>
                    </div>
                  );
                }
              case '13700marinapointedr':
                if(this.props.building13700Done){
                  return <div />;
                } else {
                  return (
                    <div className="moreProperties">
                      <a onClick={this.props.loadProperties}>
                        Load more
                      </a>
                    </div>
                  );
                }
              case '13750marinapointedr':
                if(this.props.building13750Done){
                  return <div />;
                } else {
                  return (
                    <div className="moreProperties">
                      <a onClick={this.props.loadProperties}>
                        Load more
                      </a>
                    </div>
                  );
                }
              case '13800marinapointedr':
                if(this.props.building13800Done){
                  return <div />;
                } else {
                  return (
                    <div className="moreProperties">
                      <a onClick={this.props.loadProperties}>
                        Load more
                      </a>
                    </div>
                  );
                }
              case 'featured':
                if(this.props.featuredDone){
                  return <div />;
                } else {
                  return (
                    <div className="moreProperties">
                      <a onClick={this.props.loadProperties}>
                        Load more
                      </a>
                    </div>
                  );
                }
              default:
                console.log(`Error: filterType undefined: ${this.props.building}`)
                return <div />;
            }
          })()
        }
      </div>
    );
  }
});

module.exports = FeaturedProperties;
