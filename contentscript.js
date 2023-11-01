chrome.storage.local.get("courses", function (data) {
  let courses = data.courses || [];
  let currentURL = window.location.href;

  function closeCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.remove(tabs[0].id);
    });
  }

  // 현재 페이지의 URL이 사용자가 추가한 강의 URL 목록에 포함되어 있는지 확인
  if (!courses.includes(currentURL)) {
    return; // 포함되어 있지 않다면 스크립트 종료
  }

  let discountEl = document.querySelector(".cd-price__discount-rate");
  if (discountEl) {
    let titleEl = document.querySelector(".cd-header__title");
    let hiddenTitle = titleEl.querySelector(".visually_hidden");
    let titleText = titleEl.textContent;

    // .visually_hidden 클래스의 텍스트를 제거
    if (hiddenTitle) {
      titleText = titleText.replace(hiddenTitle.textContent, "").trim();
    }

    let originalPriceEl = document.querySelector(".cd-price__reg-price");
    let discountPriceEl = document.querySelector(".cd-price__pay-price");

    // Background script로 데이터 전송
    chrome.runtime.sendMessage(
      {
        type: "DISCOUNT_FOUND",
        data: {
          title: titleText,
          discount: discountEl.textContent,
          originalPrice: originalPriceEl.textContent,
          discountPrice: discountPriceEl.textContent,
        },
      },
      (response) => {
        if (response && response.closeTab) {
          closeCurrentTab();
        }
      }
    );
  } else {
    chrome.runtime.sendMessage({ type: "CHECK_FINISHED" }, (response) => {
      if (response && response.closeTab) {
        closeCurrentTab();
      }
    });
  }
});
