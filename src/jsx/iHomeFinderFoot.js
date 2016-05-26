var ReactDom = require('react-dom');
var React = require('react');

var store = require('./store');

var Foot = require('./components/Foot');

const App = React.createClass({
  render(){
    return (
      <div className="App">
        <Foot {...store.getState().Foot} />
      </div>
    );
  }
});

const renderDom = ()=>{
  ReactDom.render(
    <App />,
    document.getElementById('Foot')
  );
}

store.subscribe(renderDom);
// store.subscribe(()=>console.log(store.getState().Nav.affix));
renderDom();
