/* eslint-disable multiline-ternary */
import path from 'path';

import DataURI from 'datauri';

const datauri = new DataURI();

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath
    ? JSON.stringify(options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;

  if (options.inline) {
    const useBase64 = options.inline === 'base64';

    const InlineWorkerPath = JSON.stringify(
      `!!${path.join(__dirname, 'InlineWorker.js')}`
    );
    const fallbackWorkerPath =
      options.fallback === false ? 'null' : publicWorkerPath;

    const opts = { type: useBase64 ? 'base64' : 'blob' };
    const fileContent = useBase64
      ? datauri.format('.js', content).content
      : content;

    return `require(${InlineWorkerPath})(${JSON.stringify(
      fileContent
    )}, ${fallbackWorkerPath}, ${JSON.stringify(opts)})`;
  }

  return `new Worker(${publicWorkerPath})`;
};

export default getWorker;
