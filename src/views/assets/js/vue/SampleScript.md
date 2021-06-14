**Sample Script for VueJS**

```javascript

var VueInit = {};
VueInit["el"] = ".vue-el";

$(document).ready(function () {
  const vueTarget = document.querySelectorAll(VueInit.el);
  const each = Array.prototype.forEach;

  // Data
  const data = {};

  // Functions
  const methods = {};

  // Created
  const created = () => {};

  // For DataTable Refresh
  each.call(vueTarget, (el, index) => {
    el.classList.remove("vue-el");
    new Vue({ el, created, data, methods });
  });

  $("#target-table").on("draw.dt", function () {
    let renderedTable = document.querySelectorAll(VueInit.el);
    each.call(renderedTable, (el, index) => {
      el.classList.remove("vue-el");
      new Vue({ el, created, data, methods });
    });
  });
});

```
