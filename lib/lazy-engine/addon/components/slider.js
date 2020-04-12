import Component from "@glimmer/component";
import { action } from "@ember/object";
import noUiSlider from "noUiSlider";

export default class SliderComponent extends Component {
  _slider;

  @action
  async setupSlider(element) {
    this._slider = noUiSlider.create(element, {
      range: {
        min: 1,
        max: 10,
      },
      start: [3, 7],
      step: 1,
      connect: true,
    });
  }

  @action
  teardownSlider() {
    if (this._slider) {
      this._slider.destroy();
    }
  }
}
