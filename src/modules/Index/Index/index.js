import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import moment from 'moment/moment';
import style from './style.sass';
import { setCoolQ } from '../reducer/reducer';
import ECharts from '../../../components/Echarts/index';
import CoolQ from '../../../components/coolQ/CoolQ';
import { requestModianInformation } from './request';
const path = global.require('path');
const nunjucks = global.require('nunjucks');
const fse = global.require('fs-extra');

/* 初始化数据 */
const state = createStructuredSelector({
  coolQ: createSelector( // 登录信息
    ($$state) => $$state.get('index'),
    ($$data) => $$data.get('coolQ')
  )
});

/* actions */
const actions = (dispatch) => ({
  action: bindActionCreators({
    setCoolQ
  }, dispatch)
});

@connect(state, actions)
class Index extends Component {
  static propTypes = {
    coolQ: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  chart = createRef();

  constructor() {
    super(...arguments);

    const value = localStorage.getItem('qq-charts-tools-schema-form-value');

    this.state = {
      schemaFormValue: value ? JSON.parse(value) : {}
    };
  }

  // pk命令
  async pkCallback(coolQ, dataJson) {
    try {
      const queen = [];
      const { modianId } = coolQ.options;

      for (const item of modianId) {
        queen.push(item.id);
      }

      // 请求数据
      const res = await requestModianInformation(queen.join(','));
      const { data } = await res.json();
      const result = [];

      for (let i = 0, j = data.length; i < j; i++) {
        const resItem = data[i];

        resItem.title = modianId[i].title;
        result.push(resItem);
      }

      // 渲染图表并将图表写入文件夹
      this.renderChart(result, coolQ.options.colorFrom, coolQ.options.colorTo);

      const time = moment().valueOf();
      const filePath = path.join(coolQ.options.savePath, 'qq-pk-tools', `${ time }.jpg`);
      const buffer = this.getBase64Url();

      await this.writeChart(filePath, buffer);

      const text = nunjucks.renderString(coolQ.options.template, {
        modian: result,
        chart: `[CQ:image,file=${ path.normalize(filePath) }]`
      });

      // 构建发送模板
      coolQ.sendMessage(text);
    } catch (err) {
      console.error(err);
    }
  }

  // 渲染图表
  renderChart(result, colorFrom, colorTo) {
    // 渲染图表
    const source = [];
    let max = 0;

    for (let i = result.length - 1; i >= 0; i--) {
      const item = result[i];

      if (item.already_raised > max) {
        max = item.already_raised;
      }

      source.push([
        item.already_raised,
        item.title
      ]);
    }

    this.chart.current.state.chart.setOption({
      dataset: { source },
      visualMap: {
        min: 10,
        max,
        inRange: {
          color: [colorFrom, colorTo]
        }
      }
    });
  }

  // 将图表转换成buffer
  getBase64Url() {
    const chart = this.chart.current.state.chart;
    const base64url = chart.getDataURL({
      type: 'jpeg',
      backgroundColor: '#fff'
    }).replace('data:image/jpeg;base64,', '');

    return Buffer.from(base64url, 'base64');
  }

  // 将图表写入文件夹
  writeChart(filePath, buffer) {
    return new Promise((resolve, reject) => {
      fse.outputFile(filePath, buffer, (err) => {
        err ? reject(err) : resolve();
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  // login
  loginCoolQ() {
    const { schemaFormValue } = this.state;
    const callback = this.pkCallback.bind(this);
    const coolQ = new CoolQ(schemaFormValue, {
      pk: callback
    });

    this.props.action.setCoolQ(coolQ);
  }

  // 点击启动程序
  handleStartingProgramClick(event) {
    const value = localStorage.getItem('qq-charts-tools-schema-form-value');

    if (!value) {
      message.warn('请先去配置！');

      return void 0;
    }

    this.loginCoolQ();
  }

  // 停止程序
  handleEndProgramClick(event) {
    const { coolQ } = this.props;

    coolQ.close();
    this.props.action.setCoolQ(null);
  }

  // 删除缓存图片
  handleDeleteImageClick = (event) => {
    const value = localStorage.getItem('qq-charts-tools-schema-form-value');

    if (!value) {
      message.warn('请先去配置！');

      return void 0;
    }
    const json = JSON.parse(value);
    const filePath = path.join(json.savePath, 'qq-pk-tools');

    fse.remove(filePath, (err) => {
      if (err) {
        console.error(err);
        message.error('删除文件夹失败！');
      } else {
        message.success('删除文件夹成功！');
      }
    });
  };

  render() {
    const { coolQ } = this.props;
    const { schemaFormValue } = this.state;

    return (
      <div className={ style.box }>
        <div className={ style.tools }>
          {
            coolQ ? (
              <Button type="danger" icon="play-circle" onClick={ this.handleEndProgramClick.bind(this) }>停止程序</Button>
            ) : (
              <Button type="primary" icon="close-square" onClick={ this.handleStartingProgramClick.bind(this) }>启动程序</Button>
            )
          }
          <Link to="/Options">
            <Button className={ style.options } icon="edit">配置程序</Button>
          </Link>
          <Button className={ style.delete } icon="delete" onClick={ this.handleDeleteImageClick }>清除缓存图片</Button>
        </div>
        <ECharts ref={ this.chart } width={ schemaFormValue.width } height={ schemaFormValue.height } />
      </div>
    );
  }
}

export default Index;