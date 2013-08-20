var delegateEventSplitter = /^(\S+)\s*(.*)$/;

module.exports = {
  delegateDOMEvents: function(events) {
    if (events === undefined) {
      if (typeof this.events === 'function') {
        events = this.events();
      } else {
        events = this.events;
      }
    }
    if (events === undefined) return;

    var key, method;
    for (key in events) {
      method = events[key];
      if (typeof method === 'function') {
        method = method.bind(this);
      } else {
        method = this[method];
      }

      if (!method) continue

      var m = key.match(delegateEventSplitter);
      var name = m[1], selector = m[2];
      name += '.delegateEvents.' + this._rootNodeID;
      var $el = window.$(this.getDOMNode())
      selector === '' ?  $el.on(name, method) : $el.on(name, selector, method);
    }
  },
  undelegateDOMEvents: function() {
    window.$(this.getDOMNode()).off('.delegateEvents.' + this._rootNodeID);
  },
  componentDidMount: function() {
    this.delegateDOMEvents();
  },
  componentWillUnmount: function() {
    this.undelegateDOMEvents();
  }
}
