let sentNotifications = {};
let openedTabs = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "DISCOUNT_FOUND") {
    const { title, discount, originalPrice, discountPrice } = message.data;

    // 이미 알림을 전송했는지 확인
    if (!sentNotifications[title]) {
      sendNotification(title, discount, originalPrice, discountPrice);
      sentNotifications[title] = true; // 알림을 전송한 강의 정보를 저장
    }

    sendResponse({ closeTab: true });
  } else if (message.type === "CHECK_FINISHED") {
    sendResponse({ closeTab: true });
  }
});

chrome.alarms.create("dailyCheck", {
  periodInMinutes: 24 * 60,
  when: Date.now() + (new Date().setHours(0, 30, 0, 0) - Date.now()),
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "dailyCheck") {
    checkCoursesForDiscount();
  }
});

function checkCoursesForDiscount() {
  chrome.storage.local.get("courses", function (data) {
    let courses = data.courses || [];
    courses.forEach((courseObj) => {
      chrome.tabs.create({ url: courseObj.url, active: false }, function (tab) {
        openedTabs[tab.id] = setTimeout(() => {
          chrome.tabs.remove(tab.id);
          delete openedTabs[tab.id];
        }, 2000); // 탭은 2초 후에 닫힙니다.
      });
    });
  });
}

function sendNotification(title, discount, originalPrice, discountPrice) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "인프런 강의 할인 알림!",
    message: `${title} 강의가 ${discount} 할인되었습니다! ${originalPrice} → ${discountPrice}`,
  });
}
