/* eslint-disable camelcase */

const { resolve } = require('path');

module.exports = function() {
  return {
    views: [resolve(__dirname, 'views')],
    assets: [
      {
        name: 'ui',
        src: resolve(__dirname, 'assets'),
        mount: '/assets/_ui/core',
        watch: false
      },
      {
        name: 'src',
        src: '.',
        mount: '/src',
        watch: false
      }
    ],
    routes: [
      {
        url: '/preview/:component(/:variant)',
        name: 'preview',
        view: 'preview',
        handler: 'preview'
      },
      {
        url: '/',
        name: 'index',
        view: 'index'
      },
      {
        name: 'error',
        view: 'error'
      },
      {
        name: '404',
        handler: async function() {
          try {
            return await this.render('404');
          } catch (err) {
            return this.render('error');
          }
        }
      },
      {
        url: '/state.json',
        name: 'state',
        view: 'ui/state'
      }
    ],
    theme: null,
    preview: {
      view: null,
      contents: '{% for variant in variants %}{{ variant | render }}{% endfor %}',
      head: null,
      foot: null,
      stylesheets: [],
      scripts: []
    },
    stylesheets: [],
    scripts: [],
    globals: {
      site: {
        title: 'Component library'
      },
      theme: {
        name: 'default',
        version: require('./package.json').version
      }
    },
    markdown: {
      opts: {}
    },
    filters: {
      render: require('./src/engine/filters/render'),
      collect: require('./src/engine/filters/collect'),
      view: require('./src/engine/filters/view'),
      json: require('./src/engine/filters/json'),
      pluralize: require('./src/engine/filters/pluralize'),
      prettify: require('./src/engine/filters/prettify'),
      tree: require('./src/engine/filters/tree'),
      markdown: require('./src/engine/filters/markdown')
    },
    helpers: {
      url: require('./src/engine/helpers/url'),
      route: require('./src/engine/helpers/route'),
      asset: require('./src/engine/helpers/asset')
    },
    extensions: {
      markdown: require('./src/engine/extensions/markdown')
    },
    parser: {
      plugins: [
        require(`./src/plugins/file-urls`),
        require(`./src/plugins/asset-refs`),
        require(`./src/plugins/preview`)
      ]
    },
    opts: {
      filters: {
        prettify: {
          indent_size: 2,
          preserve_newlines: false
        }
      }
    },
    develop: {
      hostname: 'localhost',
      port: 3000,
      indexes: false,
      ext: false
    },
    build: {
      prefix: null,
      dest: null,
      indexes: true,
      ext: '.html',
      clean: false,
      gitignore: false,
      server: {
        port: 3001
      }
    }
  };
};
