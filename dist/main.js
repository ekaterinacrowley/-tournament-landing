(() => {
  // src/js/main.js
  function startRandomCounter() {
    const el = document.getElementById("random-counter");
    if (!el)
      return;
    function update() {
      el.textContent = Math.floor(Math.random() * (22e3 - 18e3 + 1)) + 18e3;
    }
    update();
    setInterval(update, 5e3);
  }
  document.addEventListener("DOMContentLoaded", startRandomCounter);
  function startCountdown(selector, endDate) {
    const timer = document.querySelector(selector);
    if (!timer)
      return;
    function pad(num) {
      return String(num).padStart(2, "0");
    }
    function update() {
      const now = /* @__PURE__ */ new Date();
      const end = new Date(endDate);
      let diff = Math.max(0, end - now);
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      diff -= days * (1e3 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1e3 * 60 * 60));
      diff -= hours * (1e3 * 60 * 60);
      const minutes = Math.floor(diff / (1e3 * 60));
      diff -= minutes * (1e3 * 60);
      const seconds = Math.floor(diff / 1e3);
      const items = timer.querySelectorAll(".timer__item");
      if (items.length === 4) {
        items[0].querySelector(".timer__number").textContent = pad(days);
        items[1].querySelector(".timer__number").textContent = pad(hours);
        items[2].querySelector(".timer__number").textContent = pad(minutes);
        items[3].querySelector(".timer__number").textContent = pad(seconds);
      }
      if (end - now <= 0)
        clearInterval(interval);
    }
    update();
    const interval = setInterval(update, 1e3);
  }
  document.addEventListener("DOMContentLoaded", function() {
    startCountdown(".timer", "2025-08-30T18:00:00");
  });
  var dateStrings = [
    "23.08 20.30",
    "24.08 20.30",
    "27.08 21.00",
    "30.08 20.30",
    "31.08 19.00",
    "18.00 19.00",
    "14.09 19.00",
    "21.09 19.00",
    "28.09 19.00",
    "05.10 19.00",
    "19.10 19.00",
    "26.10 19.00",
    "02.11 19.00",
    "09.11 19.00",
    "23.11 19.00",
    "30.11 19.00",
    "07.12 19.00",
    "14.12 19.00",
    "21.12 19.00",
    "18.01 19.00",
    "25.01 19.00",
    "01.02 19.00",
    "08.02 19.00",
    "15.02 19.00",
    "22.02 19.00",
    "01.03 19.00",
    "08.03 19.00",
    "15.03 19.00",
    "22.03 19.00",
    "05.04 19.00",
    "12.04 19.00",
    "19.04 19.00",
    "26.04 19.00"
  ];
  function parseDate(str) {
    const [date, time] = str.split(" ");
    const [day, month] = date.split(".").map(Number);
    const [hour, minute] = time.split(".").map(Number);
    const now = /* @__PURE__ */ new Date();
    let year = now.getFullYear();
    if (month < now.getMonth() + 1 || month === now.getMonth() + 1 && day < now.getDate()) {
      year += 1;
    }
    return new Date(year, month - 1, day, hour, minute);
  }
  var sortedDates = dateStrings.map((str) => ({ str, date: parseDate(str) })).sort((a, b) => a.date - b.date);
  function startAutoCountdown(selector) {
    let currentIdx = sortedDates.findIndex((item) => item.date > /* @__PURE__ */ new Date());
    if (currentIdx === -1)
      currentIdx = sortedDates.length - 1;
    function runTimer(idx) {
      const endDate = sortedDates[idx].date;
      startCountdown(selector, endDate);
      const checkInterval = setInterval(() => {
        if (/* @__PURE__ */ new Date() >= endDate) {
          clearInterval(checkInterval);
          if (idx + 1 < sortedDates.length) {
            runTimer(idx + 1);
          }
        }
      }, 1e3);
    }
    runTimer(currentIdx);
  }
  document.addEventListener("DOMContentLoaded", function() {
    startRandomCounter();
    startAutoCountdown(".timer");
  });
})();
