## What is it?
**remove-markdown** is a node.js module that will remove (strip) Markdown formatting from a text. "Markdown formatting" means pretty much anything that doesn’t look like regular text, like square brackets, asterisks etc.

## When do I need it?
The typical use case is to display an excerpt of a Markdown text, without the actual Markdown (or rendered HTML, for that matter), for example in a list of posts.

## Installation

```
npm install remove-markdown
```

## Usage
```js
var removeMd = require('remove-markdown');
var markdown = '# This is a heading\n\nThis is a paragraph with [a link](http://www.disney.com/) in it.';
var plainText = removeMd(markdown); // plainText is now 'This is a heading\n\nThis is a paragraph with a link in it.'
```

You can also supply an options object to the function. Currently, the only two options are for stripping list headers and supporting Github Flavored Markdown:

```js
var plainText = removeMd(markdown, {
  stripListLeaders: false,
  gfm: false
}); // The default for both is true
```

Stripping list headers will retain any list characters (`*, -, +, (digit).`).

## Credits
The code is based on [Markdown Service Tools - Strip Markdown](http://brettterpstra.com/2013/10/18/a-markdown-service-to-strip-markdown/) by Brett Terpstra.

## Author
Stian Grytøyr
