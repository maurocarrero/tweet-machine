// API
var mcmApi = (function () {
  return {
    init: function () {

      var splice = Array.prototype.splice,
        map = Array.prototype.map;

      // METHOD METHOD
      if (typeof Function.prototype.method !== 'function') {
        Function.prototype.method = function (name, fn) {
          if (!this.prototype[name] || typeof this.prototype[name] !== 'function') {
            this.prototype[name] = fn;
          }
          return this;
        };
      }

      // REMOVES TEXT NODES FROM NODE LIST
      if (!Object.prototype.removeTextNodes || typeof Object.prototype.removeTextNodes !== 'function') {
        Object.prototype.removeTextNodes = function () {
          var that = this;
          if (that.children instanceof window.HTMLCollection) {
            map.apply(that.childNodes, [ function (node, idx, collection) {
              if (node.nodeType !== Node.ELEMENT_NODE) {
                that.removeChild(node);
              }
            }]);

            // IT IS NECESSARY TO CHECK THE FIRST AND LAST ELEMENTS BECAUSE
            // FOR SOME REASON THEY ARE NOT REMOVED FROM THE HTML COLLECTION 
            // IN THE LAST RUN
            if (that.firstChild.nodeType !== Node.ELEMENT_NODE) {
              that.removeChild(that.firstChild);
            }
            if (that.lastChild.nodeType !== Node.ELEMENT_NODE) {
              that.removeChild(that.lastChild);
            }
          }
        };
      }
    }
  };
})();