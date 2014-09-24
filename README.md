# react-dom-events

**DO NOT USE THIS**

Backbone.View-like DOM event delegation for React components. Use as a mixin for
your components:

    var DOMEvents = require('react-dom-events');
    App = React.createClass({
      mixins: [DOMEvents],
      events: {
        'click a': 'handleClickLink'
      },
      handleClickLink: function(e) {
        e.preventDefault();
        ...
      },
      ...
    });
