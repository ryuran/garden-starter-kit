const HtmlWebpackPlugin = require('html-webpack-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');
const mdReplaceLink = require('markdown-it-replace-link');
const Twig = require('twig');
const path = require('path');
const glob = require('glob');

module.exports = function doc({
  basePath,
  pagesList,
  kssConfig,
}) {
  const docsPath = path.join(basePath, 'docs');

  const config = {
    plugins: [],
    rules: [],
  };
  const docsList = [];

  // twig template for documentation
  const docTemplate = Twig.twig({
    path: path.resolve(__dirname, '../tools/doc/md.twig'),
    async: false,
    allowInlineIncludes: true,
  });

  // docs
  // doc index
  config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../tools/doc/index.twig'),
    filename: path.join('docs', 'index.html'),
    inject: false,
  }));

  // docs markdown
  const docs = glob.sync(path.join(docsPath, '**', '!(_)*.md'));
  docs.forEach((md) => {
    docsList.push(md);
    config.plugins.push(new HtmlWebpackPlugin({
      template: md,
      filename: path.join(path.relative(basePath, path.dirname(md)), `${path.basename(md, '.md')}.html`),
      inject: false,
    }));
  });

  function extractData(filename) {
    const parsed = path.parse(filename)
    const out = {
      filename: parsed.name,
      url: path.join(path.relative(docsPath, parsed.dir), `${parsed.name}.html`),
      toc: [],
    };

    docsList
      .map((item) => path.relative(docsPath, item).replace(/\.md$/, '.html'))
      .sort((a, b) => a.localeCompare(b))
      .forEach((currentValue) => {
        const p = path.parse(currentValue);
        const dir = p.dir;

        let branch = out.toc;
        let folder = null;

        const name = p.name;

        if (dir !== '') {
          dir.split('/').forEach((part) => {
            const found = branch.findIndex((e) => e.name === part);
            if (found < 0) {
              folder = {
                name: part,
                children:[]
              };
              branch.push(folder);
            } else {
              folder = branch[found];
            }

            branch = folder.children;
          });
        }

        const url = path.relative(parsed.dir, path.resolve(docsPath, currentValue));

        if (name !== 'index') {
          branch.push({
            name,
            url,
          });
        } else if (folder !== null) {
          folder.url = url;
        }
      });

    return out;
  }

  config.rules.push(...[
    {
      test: /tools\/doc\/.*\.twig$/,
      use: [
        'html-loader',
        {
          loader: 'twig-html-loader',
          options: {
            data: {
              pages: pagesList,
            },
          },
        },
      ],
    },
    {
      test: /docs\/.*\.md$/,
      use: [
        'html-loader',
        'extract-loader',
        {
          loader: 'render-template-loader',
          options: {
            engine: function render(md, locals, options) {
              return docTemplate.render({
                body: md,
                ...extractData(options.filename)
              });
            },
            engineOptions: function (info) {
              // Ejs wants the template filename for partials rendering.
              // (Configuring a "views" option can also be done.)
              return { filename: info.filename }
            }
          },
        },
        {
          loader: 'markdown-it-loader',
          options: {
            replaceLink: function (link) {
              return link.replace(/\.md$/, '.html');
            },
            use: [mdReplaceLink],
          }
        },
      ],
    },
  ]);

  // KSS
  config.plugins.push(new KssWebpackPlugin(kssConfig));

  return config;
}
