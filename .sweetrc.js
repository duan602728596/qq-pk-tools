const path = require('path');
const process = require('process');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'immutable',
    'redux-immutable',
    'reselect',
    'moment/moment'
  ],
  entry: {
    index: [path.join(__dirname, 'src/index.js')]
  },
  js: {
    ecmascript: true,
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ],
      [
        'import-components-style',
        {
          components: {
            'antd-schema-form': 'style/antd-schema-form.css'
          }
        }
      ]
    ],
    exclude: /node_modules[\\/](?!_?antd-schema-form)/
  },
  sass: { include: /src/ },
  css: {
    modules: false,
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#fadb14'
    },
    include: /node_modules[\\/]_?antd/
  },
  html: [
    { template: path.join(__dirname, 'src/index.pug') }
  ]
};
