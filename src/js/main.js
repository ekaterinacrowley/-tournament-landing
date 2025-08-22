// Счетчик с рандомным числом
function startRandomCounter() {
  const el = document.getElementById('random-counter');
  if (!el) return;
  function update() {
    el.textContent = Math.floor(Math.random() * (22000 - 18000 + 1)) + 18000;
  }
  update();
  setInterval(update, 5000);
}

document.addEventListener('DOMContentLoaded', startRandomCounter);


// filepath: /workspaces/tournament-landing/src/components/main-block.html
// ...existing code...

/**
 * Таймер обратного отсчёта до заданной даты окончания.
 * @param {string} selector - CSS-селектор контейнера таймера.
 * @param {string|Date} endDate - Дата окончания (например, '2025-08-20T18:00:00').
 */
function startCountdown(selector, endDate) {
  const timer = document.querySelector(selector);
  if (!timer) return;

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function update() {
    const now = new Date();
    const end = new Date(endDate);
    let diff = Math.max(0, end - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    const items = timer.querySelectorAll('.timer__item');
    if (items.length === 4) {
      items[0].querySelector('.timer__number').textContent = pad(days);
      items[1].querySelector('.timer__number').textContent = pad(hours);
      items[2].querySelector('.timer__number').textContent = pad(minutes);
      items[3].querySelector('.timer__number').textContent = pad(seconds);
    }

    if (end - now <= 0) clearInterval(interval);
  }

  update();
  const interval = setInterval(update, 1000);
}


document.addEventListener('DOMContentLoaded', function() {
  startCountdown('.timer', '2025-08-30T18:00:00');
});


// Список дат и времени для отображения (отсортируем и используем)
const dateStrings = [
  '23.08 20.30',
  '24.08 20.30',
  '27.08 21.00',
  '30.08 20.30',
  '31.08 19.00',
  '18.00 19.00',
  '14.09 19.00',
  '21.09 19.00',
  '28.09 19.00',
  '05.10 19.00',
  '19.10 19.00',
  '26.10 19.00',
  '02.11 19.00',
  '09.11 19.00',
  '23.11 19.00',
  '30.11 19.00',
  '07.12 19.00',
  '14.12 19.00',
  '21.12 19.00',
  '18.01 19.00',
  '25.01 19.00',
  '01.02 19.00',
  '08.02 19.00',
  '15.02 19.00',
  '22.02 19.00',
  '01.03 19.00',
  '08.03 19.00',
  '15.03 19.00',
  '22.03 19.00',
  '05.04 19.00',
  '12.04 19.00',
  '19.04 19.00',
  '26.04 19.00'
];

// Функция для преобразования строки в объект Date (год берём текущий или следующий, если дата уже прошла)
function parseDate(str) {
  const [date, time] = str.split(' ');
  const [day, month] = date.split('.').map(Number);
  const [hour, minute] = time.split('.').map(Number);
  const now = new Date();
  let year = now.getFullYear();

  // Если месяц < текущего месяца, значит это уже следующий год
  if (month < (now.getMonth() + 1) || (month === (now.getMonth() + 1) && day < now.getDate())) {
    year += 1;
  }
  return new Date(year, month - 1, day, hour, minute);
}

// Сортируем даты по возрастанию
const sortedDates = dateStrings
  .map(str => ({ str, date: parseDate(str) }))
  .sort((a, b) => a.date - b.date);

// Функция для поиска ближайшей будущей даты
function getNextDate() {
  const now = new Date();
  for (const item of sortedDates) {
    if (item.date > now) return item;
  }
  // Если все даты прошли, возвращаем последнюю
  return sortedDates[sortedDates.length - 1];
}

// Таймер с автоматическим переключением на следующую дату
function startAutoCountdown(selector) {
  let currentIdx = sortedDates.findIndex(item => item.date > new Date());
  if (currentIdx === -1) currentIdx = sortedDates.length - 1;

  function runTimer(idx) {
    const endDate = sortedDates[idx].date;
    startCountdown(selector, endDate);

    // Проверяем каждую секунду, не пора ли переключиться на следующую дату
    const checkInterval = setInterval(() => {
      if (new Date() >= endDate) {
        clearInterval(checkInterval);
        if (idx + 1 < sortedDates.length) {
          runTimer(idx + 1);
        }
      }
    }, 1000);
  }

  runTimer(currentIdx);
}

document.addEventListener('DOMContentLoaded', function() {
  startRandomCounter();
  startAutoCountdown('.timer');
});

