const PASSWORD = "OSM2026";
const STORAGE_KEY = "atplAcademyProgress";
const AUTH_KEY = "atplAcademyAuthenticated";
const THEME_KEY = "atplAcademyTheme";
const DAILY_GOAL = 3;
const XP_PER_CORRECT_LESSON = 10;

const subjects = window.ATPL_LESSONS;

const state = {
  view: "dashboard",
  subjectKey: null,
  lessonIndex: 0,
  reviewMode: false,
  answered: false,
  progress: loadProgress()
};

const elements = {
  loginScreen: document.getElementById("loginScreen"),
  appShell: document.getElementById("appShell"),
  loginForm: document.getElementById("loginForm"),
  passwordInput: document.getElementById("passwordInput"),
  loginError: document.getElementById("loginError"),
  subjectGrid: document.getElementById("subjectGrid"),
  xpValue: document.getElementById("xpValue"),
  streakValue: document.getElementById("streakValue"),
  completedValue: document.getElementById("completedValue"),
  dailyGoalValue: document.getElementById("dailyGoalValue"),
  dailyGoalBar: document.getElementById("dailyGoalBar"),
  continueButton: document.getElementById("continueButton"),
  mobileMenu: document.getElementById("mobileMenu"),
  menuButton: document.getElementById("menuButton"),
  themeToggle: document.getElementById("themeToggle"),
  settingsThemeToggle: document.getElementById("settingsThemeToggle"),
  resetProgressButton: document.getElementById("resetProgressButton"),
  signOutButton: document.getElementById("signOutButton"),
  backToDashboard: document.getElementById("backToDashboard"),
  lessonSubject: document.getElementById("lessonSubject"),
  lessonCounter: document.getElementById("lessonCounter"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonProgressBar: document.getElementById("lessonProgressBar"),
  lessonExplanation: document.getElementById("lessonExplanation"),
  lessonRelevance: document.getElementById("lessonRelevance"),
  lessonExample: document.getElementById("lessonExample"),
  quizQuestion: document.getElementById("quizQuestion"),
  answerOptions: document.getElementById("answerOptions"),
  answerFeedback: document.getElementById("answerFeedback"),
  continueLessonButton: document.getElementById("continueLessonButton"),
  statsGrid: document.getElementById("statsGrid"),
  subjectProgressList: document.getElementById("subjectProgressList")
};

init();

function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  bindEvents();
  if (localStorage.getItem(AUTH_KEY) === "true") {
    showApp();
  } else {
    elements.loginScreen.hidden = false;
    elements.appShell.hidden = true;
  }
}

function bindEvents() {
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.settingsThemeToggle.addEventListener("click", toggleTheme);
  elements.menuButton.addEventListener("click", () => {
    elements.mobileMenu.hidden = !elements.mobileMenu.hidden;
  });
  elements.backToDashboard.addEventListener("click", () => showView("dashboard"));
  elements.continueButton.addEventListener("click", continueLatest);
  elements.continueLessonButton.addEventListener("click", moveToNextLesson);
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.signOutButton.addEventListener("click", signOut);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
      elements.mobileMenu.hidden = true;
    });
  });
}

function handleLogin(event) {
  event.preventDefault();
  if (elements.passwordInput.value.trim() === PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    elements.loginError.textContent = "";
    showApp();
    return;
  }
  elements.loginError.textContent = "Incorrect password. Try again.";
  elements.passwordInput.select();
}

function showApp() {
  elements.loginScreen.hidden = true;
  elements.appShell.hidden = false;
  renderAll();
  showView("dashboard");
}

function loadProgress() {
  const fallback = {
    xp: 0,
    streak: 0,
    lastActiveDate: "",
    dailyCountDate: todayString(),
    dailyLessons: 0,
    completedLessons: {},
    lastSubjectKey: "",
    lastLessonIndex: 0
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function todayString() {
  const date = new Date();
  return localDateString(date);
}

function yesterdayString() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return localDateString(date);
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeDailyGoal() {
  const today = todayString();
  if (state.progress.dailyCountDate !== today) {
    state.progress.dailyCountDate = today;
    state.progress.dailyLessons = 0;
    saveProgress();
  }
}

function subjectKeys() {
  return Object.keys(subjects);
}

function completedSet(subjectKey) {
  return new Set(state.progress.completedLessons[subjectKey] || []);
}

function completedCount(subjectKey) {
  return completedSet(subjectKey).size;
}

function totalLessonCount() {
  return subjectKeys().reduce((sum, key) => sum + subjects[key].lessons.length, 0);
}

function totalCompletedCount() {
  return subjectKeys().reduce((sum, key) => sum + completedCount(key), 0);
}

function subjectPercent(subjectKey) {
  const total = subjects[subjectKey].lessons.length;
  return Math.round((completedCount(subjectKey) / total) * 100);
}

function firstUncompletedLessonIndex(subjectKey) {
  const completed = completedSet(subjectKey);
  const lessons = subjects[subjectKey].lessons;
  const index = lessons.findIndex((lesson) => !completed.has(lesson.id));
  return index === -1 ? 0 : index;
}

function renderAll() {
  normalizeDailyGoal();
  renderSummary();
  renderSubjects();
  renderStats();
}

function renderSummary() {
  elements.xpValue.textContent = state.progress.xp;
  elements.streakValue.textContent = state.progress.streak;
  elements.completedValue.textContent = totalCompletedCount();
  elements.dailyGoalValue.textContent = Math.min(state.progress.dailyLessons, DAILY_GOAL);
  elements.dailyGoalBar.style.width = `${Math.min(state.progress.dailyLessons / DAILY_GOAL, 1) * 100}%`;
}

function renderSubjects() {
  elements.subjectGrid.innerHTML = "";

  subjectKeys().forEach((subjectKey) => {
    const subject = subjects[subjectKey];
    const completed = completedCount(subjectKey);
    const total = subject.lessons.length;
    const percent = subjectPercent(subjectKey);
    const isComplete = completed === total;

    const card = document.createElement("article");
    card.className = "subject-card";
    card.style.setProperty("--subject-color", subject.accent);
    card.innerHTML = `
      <h3>${subject.title}</h3>
      <p>${completed} of ${total} lessons completed</p>
      <div class="progress-meta">
        <span>${percent}% complete</span>
        <span>${total - completed} new left</span>
      </div>
      <div class="progress-bar" aria-hidden="true"><span style="width: ${percent}%"></span></div>
      <div class="subject-card-actions">
        <button class="primary-button" type="button" data-start="${subjectKey}">${isComplete ? "Review subject" : "Start learning"}</button>
        ${completed > 0 && !isComplete ? `<button class="secondary-button" type="button" data-review="${subjectKey}">Review</button>` : ""}
      </div>
    `;
    elements.subjectGrid.appendChild(card);
  });

  elements.subjectGrid.querySelectorAll("[data-start]").forEach((button) => {
    button.addEventListener("click", () => {
      const subjectKey = button.dataset.start;
      const isComplete = completedCount(subjectKey) === subjects[subjectKey].lessons.length;
      startLesson(subjectKey, firstUncompletedLessonIndex(subjectKey), isComplete);
    });
  });

  elements.subjectGrid.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => startLesson(button.dataset.review, 0, true));
  });
}

function renderStats() {
  const totalLessons = totalLessonCount();
  const completedLessons = totalCompletedCount();
  const completion = Math.round((completedLessons / totalLessons) * 100);

  elements.statsGrid.innerHTML = `
    <article class="stat-card"><span>Total XP</span><strong>${state.progress.xp}</strong></article>
    <article class="stat-card"><span>Current streak</span><strong>${state.progress.streak} days</strong></article>
    <article class="stat-card"><span>Lessons completed</span><strong>${completedLessons}</strong></article>
    <article class="stat-card"><span>Overall completion</span><strong>${completion}%</strong></article>
  `;

  elements.subjectProgressList.innerHTML = subjectKeys().map((subjectKey) => {
    const subject = subjects[subjectKey];
    const percent = subjectPercent(subjectKey);
    return `
      <div class="subject-progress-row">
        <div class="subject-progress-top">
          <span>${subject.title}</span>
          <span>${percent}%</span>
        </div>
        <div class="progress-bar" aria-hidden="true"><span style="width: ${percent}%; background: ${subject.accent};"></span></div>
      </div>
    `;
  }).join("");
}

function showView(viewName) {
  state.view = viewName;
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  document.getElementById(`${viewName}View`).classList.add("active-view");
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  renderAll();
}

function continueLatest() {
  const preferredSubject = state.progress.lastSubjectKey && subjects[state.progress.lastSubjectKey]
    ? state.progress.lastSubjectKey
    : subjectKeys().find((key) => completedCount(key) < subjects[key].lessons.length);

  if (!preferredSubject) {
    startLesson(subjectKeys()[0], 0, true);
    return;
  }

  startLesson(preferredSubject, firstUncompletedLessonIndex(preferredSubject), false);
}

function startLesson(subjectKey, lessonIndex, reviewMode) {
  state.subjectKey = subjectKey;
  state.lessonIndex = lessonIndex;
  state.reviewMode = reviewMode;
  state.answered = false;
  state.progress.lastSubjectKey = subjectKey;
  state.progress.lastLessonIndex = lessonIndex;
  saveProgress();
  renderLesson();
  showView("lesson");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderLesson() {
  const subject = subjects[state.subjectKey];
  const lesson = subject.lessons[state.lessonIndex];
  const percent = ((state.lessonIndex + 1) / subject.lessons.length) * 100;

  elements.lessonSubject.textContent = state.reviewMode ? `${subject.title} review` : subject.title;
  elements.lessonCounter.textContent = `Lesson ${state.lessonIndex + 1} of ${subject.lessons.length}`;
  elements.lessonTitle.textContent = lesson.title;
  elements.lessonExplanation.textContent = lesson.explanation;
  elements.lessonRelevance.textContent = lesson.relevance;
  elements.lessonExample.textContent = lesson.example;
  elements.quizQuestion.textContent = lesson.question;
  elements.lessonProgressBar.style.width = `${percent}%`;
  elements.answerFeedback.hidden = true;
  elements.answerFeedback.innerHTML = "";
  elements.continueLessonButton.disabled = true;
  elements.answerOptions.innerHTML = "";

  lesson.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(index));
    elements.answerOptions.appendChild(button);
  });
}

function handleAnswer(selectedIndex) {
  if (state.answered) {
    return;
  }

  state.answered = true;
  const subject = subjects[state.subjectKey];
  const lesson = subject.lessons[state.lessonIndex];
  const correct = selectedIndex === lesson.correctIndex;
  const buttons = Array.from(elements.answerOptions.children);

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === lesson.correctIndex) {
      button.classList.add("correct");
    }
    if (index === selectedIndex && !correct) {
      button.classList.add("incorrect");
    }
  });

  if (!state.reviewMode) {
    completeLesson(lesson, correct);
  }

  elements.answerFeedback.hidden = false;
  elements.answerFeedback.innerHTML = `
    <strong>${correct ? "Correct. +" + (state.reviewMode ? 0 : XP_PER_CORRECT_LESSON) + " XP" : "Not quite."}</strong>
    ${lesson.quizExplanation}
  `;
  elements.continueLessonButton.disabled = false;
  renderAll();
}

function completeLesson(lesson, correct) {
  const completed = completedSet(state.subjectKey);
  if (completed.has(lesson.id)) {
    return;
  }

  completed.add(lesson.id);
  state.progress.completedLessons[state.subjectKey] = Array.from(completed);
  if (correct) {
    state.progress.xp += XP_PER_CORRECT_LESSON;
  }

  updateDailyStreak();
  state.progress.lastLessonIndex = state.lessonIndex + 1;
  saveProgress();
}

function updateDailyStreak() {
  const today = todayString();
  normalizeDailyGoal();

  if (state.progress.lastActiveDate !== today) {
    state.progress.streak = state.progress.lastActiveDate === yesterdayString()
      ? state.progress.streak + 1
      : 1;
    state.progress.lastActiveDate = today;
  }

  state.progress.dailyLessons += 1;
}

function moveToNextLesson() {
  const subject = subjects[state.subjectKey];
  const nextIndex = state.lessonIndex + 1;

  if (nextIndex < subject.lessons.length) {
    if (state.reviewMode || !completedSet(state.subjectKey).has(subject.lessons[nextIndex].id)) {
      state.lessonIndex = nextIndex;
      state.answered = false;
      renderLesson();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  }

  const nextUncompleted = firstUncompletedLessonIndex(state.subjectKey);
  const subjectComplete = completedCount(state.subjectKey) === subject.lessons.length;

  if (!subjectComplete && nextUncompleted !== state.lessonIndex) {
    state.lessonIndex = nextUncompleted;
    state.answered = false;
    renderLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  showView("dashboard");
}

function resetProgress() {
  const confirmed = window.confirm("Reset all ATPL Academy progress on this device?");
  if (!confirmed) {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  state.progress = loadProgress();
  renderAll();
  showView("dashboard");
}

function signOut() {
  localStorage.removeItem(AUTH_KEY);
  elements.appShell.hidden = true;
  elements.loginScreen.hidden = false;
  elements.passwordInput.value = "";
  elements.passwordInput.focus();
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);
  elements.themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
  elements.themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}
