document.addEventListener("DOMContentLoaded", function () {
  let lazyloadImages = document.querySelectorAll('img.lazy');
  let lazyloadThrottleTimeout;
  let loadedCount = 0;
  const totalImages = lazyloadImages.length;
  const imgNum = document.getElementById('img-num');
  const imgCount = document.getElementById('img-count');
  const textBox = document.getElementById('text');
  const label = document.getElementById('label');
  
  imgCount.textContent = totalImages;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      let scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          loadedCount++;
          imgNum.textContent = loadedCount;
        }
      });

      lazyloadImages = document.querySelectorAll('img.lazy');
      
      if (loadedCount === totalImages) {
        label.style.backgroundColor = '#90ed91'; 
      }

      if (lazyloadImages.length === 0) {
        document.removeEventListener('scroll', lazyload);
        window.removeEventListener('resize', lazyload);
        window.removeEventListener('orientationChange', lazyload);
        
        setTimeout(() => {
          textBox.style.display = 'none';
        }, 3000);
      }
    }, 20);
  }

  lazyload();

  document.addEventListener('scroll', lazyload);
  window.addEventListener('resize', lazyload);
  window.addEventListener('orientationChange', lazyload);
});
