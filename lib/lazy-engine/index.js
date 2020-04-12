/* eslint-env node */
"use strict";

const EngineAddon = require("ember-engines/lib/engine-addon");
const path = require("path");
const Funnel = require("broccoli-funnel");
const MergeTrees = require("broccoli-merge-trees");

module.exports = EngineAddon.extend({
  name: "lazy-engine",

  lazyLoading: Object.freeze({
    enabled: true,
  }),

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      // this works in host app, but prevents the lazy loading feature of vendor
      // WARNING: `app.import` should be avoided and `this.import` should be used instead
      app.import("vendor/nouislider.js");
      app.import("vendor/nouislider.min.css");
      app.import("vendor/shims/nouislider.js");

      // this does not work, throws
      // `ENOENT: no such file or directory, open '/.../out-231-broccoli_debug_debug_6_engine_vendor_js/vendor/nouislider.js'`
      // this.import("vendor/nouislider.js");
      // this.import("vendor/nouislider.min.css");
      // this.import("vendor/shims/nouislider.js");
    }
  },

  treeForVendor(vendorTree) {
    // @ts-ignore
    var nouisliderTree = new Funnel(
      path.dirname(require.resolve("nouislider/distribute/nouislider.js")),
      {
        files: ["nouislider.js", "nouislider.min.css"],
      }
    );

    // @ts-ignore
    return new MergeTrees([vendorTree, nouisliderTree]);
  },
});
