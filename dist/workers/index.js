'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _datauri = require('datauri');

var _datauri2 = _interopRequireDefault(_datauri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable multiline-ternary */
const datauri = new _datauri2.default();

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath ? JSON.stringify(options.publicPath) : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;

  if (options.inline) {
    const useBase64 = options.inline === 'base64';

    const InlineWorkerPath = JSON.stringify(`!!${_path2.default.join(__dirname, 'InlineWorker.js')}`);
    const fallbackWorkerPath = options.fallback === false ? 'null' : publicWorkerPath;

    const opts = { type: useBase64 ? 'base64' : 'blob' };
    const fileContent = useBase64 ? datauri.format('.js', content).content : content;

    return `require(${InlineWorkerPath})(${JSON.stringify(fileContent)}, ${fallbackWorkerPath}, ${JSON.stringify(opts)})`;
  }

  return `new Worker(${publicWorkerPath})`;
};

exports.default = getWorker;