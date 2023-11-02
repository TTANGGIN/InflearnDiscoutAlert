document.getElementById("addUrl").addEventListener("click", function () {
  const url = document.getElementById("courseUrl").value;
  const alias = document.getElementById("courseAlias").value;

  if (url.startsWith("https://www.inflearn.com/course/") && alias) {
    chrome.storage.local.get("courses", function (data) {
      let courses = data.courses || [];
      let courseObj = { url: url, alias: alias };
      if (!courses.some((course) => course.url === url)) {
        courses.push(courseObj);
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
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.onclick = function () {
        deleteCourse(course.url);
      };
      li.textContent = course.alias;
      li.appendChild(deleteBtn);
      listEl.appendChild(li);
    });
  });
}

function deleteCourse(url) {
  chrome.storage.local.get("courses", function (data) {
    let courses = data.courses || [];
    courses = courses.filter((course) => course.url !== url);
    chrome.storage.local.set({ courses: courses }, function () {
      populateCourseList();
    });
  });
}

populateCourseList();
