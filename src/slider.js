import $ from "jquery";
import "slick-carousel";

export function initSlider() {
  $(document).ready(function () {
    $('.slider').slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  });
}
