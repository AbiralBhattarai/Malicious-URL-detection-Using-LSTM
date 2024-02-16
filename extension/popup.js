document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('toggle');
  
    slider.addEventListener('change', function () {
      const sliderState = this.checked ? 'on' : 'off';
      chrome.runtime.sendMessage({ sliderState });
    });
  });
  