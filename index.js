const stopmotionWrapper = document.querySelector('.stop-motion_animation')
const slides = Array.from(stopmotionWrapper.querySelectorAll('img:not(.fallback)'))
let slidesRemaining = slides.length

const slideLoaded = () => {
  slidesRemaining = slidesRemaining - 1

  console.log(`Loaded. ${slidesRemaining} remaining. ${slidesRemaining === 0 ? 'Can' : 'Can\'t'} start the animation.`)

  if (slidesRemaining === 0 && document.body.dataset.active === 'true') {
    startTheAnimation()
  }

}

const startTheAnimation = () => {
  const fallbackImage = stopmotionWrapper.querySelector(`.fallback`)
  fallbackImage.style.transition = 'opacity ease 300ms'
  fallbackImage.style.opacity = 0
  setTimeout(() => {
    fallbackImage.outerHTML = ''
    const twentyFiveFramesPerSecond = 40
    setInterval(() => {
      const el = stopmotionWrapper.querySelector(`img`)
      stopmotionWrapper.insertAdjacentElement('beforeend', el)
    }, twentyFiveFramesPerSecond)
    
  }, 300)
}

slides.map(slide => {
  if (slide.complete) {
    slideLoaded()
  } else {
    slide.addEventListener('load', slideLoaded)
  }
})