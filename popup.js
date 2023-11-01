document.getElementById("addUrl").addEventListener("click", function () {
  const url = document.getElementById("courseUrl").value;
  if (url.startsWith("https://www.inflearn.com/course/")) {
    chrome.storage.local.get("courses", function (data) {
      let courses = data.courses || [];
      if (courses.indexOf(url) === -1) {
        courses.push(url);
        chrome.storage.local.set({ courses: courses }, function () {
          populateCourseList();
        });
      }
    });
  }
});

function populateCourseList() {
  chrome.storage.local.get("courses", function (data) {
    let courses = data.courses || [];
    let listEl = document.getElementById("courseList");
    listEl.innerHTML = "";
    courses.forEach((course) => {
      let li = document.createElement("li");
      li.textContent = course;
      listEl.appendChild(li);
    });
  });
}

populateCourseList();
