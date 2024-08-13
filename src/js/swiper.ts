import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination, Thumbs, EffectCreative } from 'swiper/modules'
// import { register } from 'swiper/element/bundle'

Swiper.use([Autoplay, Navigation, Pagination, Thumbs, EffectCreative])
// @ts-ignore
window.Swiper = Swiper

function init() {
  // register()
}

export default { init }
