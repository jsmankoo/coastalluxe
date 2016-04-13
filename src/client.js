import React from 'react';
import {render} from 'react-dom';

import Routes from './jsx/Routes';
var store = require('./jsx/store');

const RenderDom = ()=>{
  render(
    <Routes />,
    document.getElementById('Main')
  );
}

store.subscribe(RenderDom);
RenderDom();
