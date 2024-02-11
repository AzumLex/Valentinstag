const eventDate = new Date('2024-07-12T00:00:00');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = formatTime(days);
  document.getElementById('hours').innerHTML = formatTime(hours);
  document.getElementById('minutes').innerHTML = formatTime(minutes);
  document.getElementById('seconds').innerHTML = formatTime(seconds);

  setTimeout(updateCountdown, 1000);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

updateCountdown();
