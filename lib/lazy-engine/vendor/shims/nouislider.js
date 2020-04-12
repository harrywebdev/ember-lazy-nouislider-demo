(function () {
  function vendorModule() {
    "use strict";

    return {
      default: self["noUiSlider"],
      __esModule: true,
    };
  }

  define("noUiSlider", [], vendorModule);
})();
