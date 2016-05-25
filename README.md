# Reactions ⟶ Emissions

[React Native] Components used by [Eigen].

[React Native]: http://facebook.github.io/react-native/
[Eigen]: https://github.com/artsy/eigen

### Installation

1. Install Node.js and type checking tool: `$ brew install node flow`
2. Install file watcher used by React Native:
   * `$ brew install pcre`
   * `$ brew link pcre`
   * `$ brew install watchman --HEAD`

### Development

1. If this is the first time you clone this repo, you will have to install a dependency that we cannot include in this
   repository, which are the fonts that the example app needs. Run `$ cd Example && pod install`.

2. Run `$ npm start` from the top directory, which will:
   - Clean the example app’s Xcode build dir.
   - Clean the emission package from the example app’s `node_modules` dir.
   - Clear the example app’s React Native packager cache.
   - Start syncing the emission package to the example app’s `node_modules` dir.
   - Start the example app’s React Native packager.

3. Now from Xcode you can run the app in `Example/Emission.xcworkspace`.

4. We vendor some data from other repositories that you will sometimes need to update. You can either update all of them
   with `$ npm run sync-externals` or individually:
   - The GraphQL schema of metaphysics that Relay uses to generate queries from: `$ npm run sync-schema`
   - The colors defined in Artsy’s style-guide: `$ npm run sync-colors`

### Using Relay

Some helpful Relay documentation is listed below, but the general workflow is:

1. Build a fragment for each child component that specifies only the attributes used by the component itself (no
   extraneous information).
2. Ensure the parent component calls `getFragment` for each child component that uses Relay.
3. Make sure to supply every child component’s `props` upon instantiation in the parent.

----

Another gotcha is around fragments that use variables. For this it is important to understand that whenever a Relay
backed hierarchy is used, 2 trees will be rendered.

1. A tree of all Relay query fragments is rendered into a single query.
2. Once the query has been performed, the view component tree is rendered.

What this means in practice, is that you will need to pass variables down _both_ those trees.
1. Once from the [Relay route](https://facebook.github.io/relay/docs/api-reference-relay-route.html) down through all
   `getFragment(name, variables)` calls.
2. Second down through the props of all components.

See:
* https://github.com/artsy/emission/commit/e84940b8360b8c5b838045a619be5b8558d5fad7
* https://github.com/facebook/relay/issues/309#issuecomment-140485321

----

Try quitting and restarting your node instance if you change something Relay-related and you run into this error:

```
Unhandled JS Exception: RelayQL: Unexpected invocation at runtime. Either the Babel transform was not set up, or it
failed to identify this call site. Make sure it is being used verbatim as `Relay.QL`
```

### Resources

* React Native:
  - http://makeitopen.com
  - https://github.com/fbsamples/f8app/
  - http://facebook.github.io/react-native/docs/getting-started.html
  - http://beginning-mobile-app-development-with-react-native.com/book-preview.html

* Relay:
  - https://facebook.github.io/relay/docs/getting-started.html
  - https://github.com/facebook/relay/tree/master/examples
  - https://github.com/fbsamples/f8app/

* Testing:
  - https://mochajs.org
  - http://chaijs.com/guide/styles/#expect
  - https://github.com/airbnb/enzyme

* Flow:
  - http://flowtype.org/docs/type-annotations.html
  - http://flowtype.org/docs/react.html
  - http://flowtype.org/docs/quick-reference.html (and the rest of the language reference)

* Flexbox:
  - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
  - http://blog.krawaller.se/posts/a-react-app-demonstrating-css3-flexbox/
