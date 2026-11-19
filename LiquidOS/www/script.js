// تحديث الساعة تلقائياً
function updateClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  clockEl.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

// التبديل بين الأنظمة من الشريط العلوي
const osButtons = document.querySelectorAll(".os-btn");
const currentOsName = document.getElementById("current-os-name");
const statusMsg = document.getElementById("status-msg");

osButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    osButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedOs = btn.dataset.os || btn.textContent.trim();
    if (currentOsName) {
      currentOsName.textContent = selectedOs;
    }
    document.body.dataset.os = selectedOs;

    if (statusMsg) {
      statusMsg.textContent = `تم التبديل إلى: ${selectedOs}`;
    }
  });
});

// سحب النافذة بالماوس أو باللمس (Pointer Events)
const win = document.getElementById("window-1");
const handle = document.getElementById("window-drag-handle");

if (win && handle) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener("pointerdown", (e) => {
    isDragging = true;
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const maxX = window.innerWidth - win.offsetWidth;
    const maxY = window.innerHeight - win.offsetHeight;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    newX = Math.max(8, Math.min(newX, Math.max(8, maxX - 8)));
    newY = Math.max(8, Math.min(newY, Math.max(8, maxY - 8)));

    win.style.left = `${newX}px`;
    win.style.top = `${newY}px`;
    win.style.transform = "none";
  });

  function stopDragging(e) {
    if (!isDragging) return;
    isDragging = false;
    if (e && handle.hasPointerCapture(e.pointerId)) {
      handle.releasePointerCapture(e.pointerId);
    }
  }

  handle.addEventListener("pointerup", stopDragging);
  handle.addEventListener("pointercancel", stopDragging);
}

// زر اختبار استجابة النظام داخل النافذة
const actionBtn = document.getElementById("action-btn");
if (actionBtn && statusMsg) {
  let counter = 0;
  actionBtn.addEventListener("click", () => {
    counter += 1;
    const activeOs = document.body.dataset.os || "LiquidOS";
    statusMsg.textContent = `[${activeOs}] النواة مستقرة — نبضة الاختبار رقم #${counter}`;
  });
}

// تفاعل أزرار شريط التطبيقات السفلي (Dock)
const dockItems = document.querySelectorAll(".dock-item");
const windowTitle = document.querySelector(".window-title");

dockItems.forEach((item) => {
  item.addEventListener("click", () => {
    const appName = item.dataset.app || "تطبيق";

    dockItems.forEach((d) => d.classList.remove("active"));
    item.classList.add("active");

    if (win) {
      win.style.display = "block";
    }
    if (windowTitle) {
      windowTitle.textContent = `${appName} — Liquid Glass`;
    }
    if (statusMsg) {
      statusMsg.textContent = `تم فتح: ${appName}`;
    }
  });
});