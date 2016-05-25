babel-relay-plugin-loader
=========================

Versions
========
The current `babel-relay-plugin-loader` version `0.8.1` is loading the `babel-relay-plugin` version `0.8.1`.

Overview
========
This workaround enables us to use the Babel Relay Plugin in `.babelrc` without breaking `babel-node`.

Description
===========
The Babel Relay Plugin needs to be configured with a GraphQL schema. Usually you would do this locally in your project.
Unfortunately there is an issue that does not allow local plugins to be used within `.babelrc` without breaking `babel-node`.
You can find all the details here in [#454](https://github.com/facebook/relay/issues/454).

Usage
=====
Just `npm install --save-dev babel-relay-plugin-loader` and add the path to your `schema.json` to your projects `package.json` like this:

    ...
    "metadata": {
      "graphql": {
        "schema": "./data/schema.json"
      }
    },
    ...

This path should be relative to the location of your `package.json`.

Then you can add this plugin to your `.babelrc` file like this:

Babel 5

    {
      "stage": 0,
      "env": {
        "development": {
          "plugins": ["babel-relay-plugin-loader", "react-transform"],
          "sourceMaps": "inline",
          "optional": [
              "runtime",
              "es7.decorators",
              "es7.classProperties"
            ],
          "extra": {
            "react-transform": {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }
          }
        }
      }
    }

Babel 6

    {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "env": {
        "development": {
          "plugins": [
            "babel-relay-plugin-loader",
            [
              "react-transform",
              {
                "transforms": [
                  {
                    "transform": "react-transform-hmr",
                    "imports": [
                      "react"
                    ],
                    "locals": [
                      "module"
                    ]
                  },
                  {
                    "transform": "react-transform-catch-errors",
                    "imports": [
                      "react",
                      "redbox-react"
                    ]
                  }
                ]
              }
            ]
          ]
        },
        "production": {
          "plugins": [
            "babel-relay-plugin-loader"
          ]
        }
      }
    }

And you are ready to go ;)

Contributions
=============
Please contribute and let me know once this workaround is not needed anymore.
