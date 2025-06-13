AOS.init({
  duration: 1200, // Animation duration in ms
  once: false, // Animation only occurs once
});

function openFullscreen(id) {
  const img = document.getElementById(id);
  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) {
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) {
    img.msRequestFullscreen();
  }
}
