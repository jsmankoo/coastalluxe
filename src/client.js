import React from 'react';
import {render} from 'react-dom';

import Routes from './jsx/Routes';
var store = require('./jsx/store');

var Styles = require('./stylus/bundle.styl');

const RenderDom = ()=>{
  render(
    <Routes />,
    document.getElementById('Main')
  );
}

store.subscribe(RenderDom);
RenderDom();
