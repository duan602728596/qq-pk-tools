import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, message } from 'antd';
import SchemaForm from 'antd-schema-form';
import style from './style.sass';
import formJson from './form';

@withRouter
class Index extends Component {
  // 自定义组件
  customComponent = {
    savePath(item, option, form, required) {
      const { getFieldDecorator, setFieldsValue } = form;

      // 点击选择文件
      function handleSearchClick(event) {
        document.getElementById('inputFile').click();
      }

      // change事件
      function handleInputFileChange(event) {
        const file = event.target.files[0].path;

        setFieldsValue({ [item.id]: file });
      }

      return (
        <div>
          {
            getFieldDecorator(item.id, option)(
              <Input.Search required={ required } enterButton="选择保存路径" onSearch={ handleSearchClick } />
            )
          }
          <input className={ style.inputFile }
            id="inputFile"
            type="file"
            webkitdirectory="true"
            onChange={ handleInputFileChange }
          />
        </div>
      );
    }
  };

  constructor() {
    super(...arguments);

    const value = localStorage.getItem('qq-charts-tools-schema-form-value');

    this.state = {
      schemaFormValue: value ? JSON.parse(value) : {}
    };
  }

  // 表单确认
  handleFormOkClick = (form, value, keys) => {
    localStorage.setItem('qq-charts-tools-schema-form-value', JSON.stringify(value.$root));
    message.success('保存成功');
  };

  // 表单取消
  handleFormCancelClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { schemaFormValue } = this.state;

    return (
      <div className={ style.box }>
        <SchemaForm json={ formJson }
          value={{ $root: schemaFormValue }}
          customComponent={ this.customComponent }
          cancelText="返回"
          onOk={ this.handleFormOkClick }
          onCancel={ this.handleFormCancelClick }
        />
      </div>
    );
  }
}

export default Index;