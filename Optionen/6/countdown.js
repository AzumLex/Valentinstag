function getEventDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const targetDate = new Date(currentYear, 6, 12); // Monat 0-indexiert: 6 = Juli
  
  // Wenn heute nach dem 12.7. ist, nimm nächstes Jahr
  if (now > targetDate) {
    targetDate.setFullYear(currentYear + 1);
  }
  
  return targetDate;
}

function updateCountdown() {
  const now = new Date().getTime();
  const eventDate = getEventDate();
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
