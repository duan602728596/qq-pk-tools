import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../modules/Index/Layout';
import Options from '../modules/Options/Layout';

/* 路由模块 */
class Routers extends Component {
  render() {
    return (
      <Switch>
        {/* 首页 */}
        <Route path="/" component={ Index } exact={ true } />
        {/* 配置 */}
        <Route path="/Options" component={ Options } exact={ true } />
      </Switch>
    );
  }
}

export default Routers;