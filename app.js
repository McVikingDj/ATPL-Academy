const PASSWORD = "OSM2026";
const STORAGE_KEY = "atplAcademyProgress";
const AUTH_KEY = "atplAcademyAuthenticated";
const THEME_KEY = "atplAcademyTheme";
const DAILY_GOAL = 3;
const XP_PER_CORRECT_LESSON = 10;
const LIVE_COURSE_KEYS = ["principlesOfFlight"];
const SUBJECT_CODES = {
  airLaw: "ALW",
  operationalProcedures: "OPS",
  humanPerformance: "HPL",
  meteorology: "MET",
  communications: "COM",
  principlesOfFlight: "POF",
  instrumentation: "INS",
  massAndBalance: "M&B",
  performance: "PER",
  flightPlanning: "FPM",
  generalNavigation: "GNAV"
};
const CHALLENGE_TYPES = [
  {
    label: "Concept",
    short: "C",
    tone: "concept",
    description: "Build the idea"
  },
  {
    label: "Check",
    short: "Q",
    tone: "check",
    description: "Choose the answer"
  },
  {
    label: "Scenario",
    short: "S",
    tone: "scenario",
    description: "Apply it like crew"
  },
  {
    label: "Mastery",
    short: "M",
    tone: "mastery",
    description: "Lock it in"
  }
];
const MOTIVATION_MESSAGES = {
  correct: [
    {
      title: "Sharp work",
      body: "That is the kind of quick recall ATPL questions reward. Keep the rhythm going."
    },
    {
      title: "Nice climb",
      body: "One more concept is moving from vague to automatic. That is real exam prep."
    },
    {
      title: "Clean answer",
      body: "You are building the mental shortcuts that make the big syllabus feel smaller."
    }
  ],
  incorrect: [
    {
      title: "Good training rep",
      body: "A miss here is useful. Read the correction once, then carry it into the next one."
    },
    {
      title: "Still progress",
      body: "This is where recall gets stronger. The right answer is easier to spot next time."
    },
    {
      title: "Reset and continue",
      body: "ATPL theory is won by steady repeats, not perfect first tries. You are still moving."
    }
  ]
};
const LESSON_TRIVIA = {
  "pof-angle-of-attack": "A stall is an angle-of-attack problem. Airspeed only changes where that angle is reached in a specific configuration.",
  "pof-induced-drag": "Induced drag is the price of lift. It grows during slow flight because the wing needs a higher lift coefficient.",
  "pof-load-factor": "At 60 degrees of bank in level flight, load factor is about 2 g, so stall speed rises by roughly 41 percent."
};
const LESSON_VISUALS = {
  "pof-angle-of-attack": {
    type: "aoa",
    title: "The wing meets the airflow at an angle",
    caption: "Angle of attack is the angle between the chord line and the relative airflow. Increase it too far and airflow separates.",
    points: ["Chord line", "Relative airflow", "Critical angle"]
  },
  "pof-induced-drag": {
    type: "drag",
    title: "Lift creates a backward drag component",
    caption: "At low speed the wing works harder for lift. That stronger lift demand increases induced drag.",
    points: ["Low speed", "High lift", "More induced drag"]
  },
  "pof-load-factor": {
    type: "load",
    title: "A level turn asks the wing for more lift",
    caption: "Banking splits lift between holding altitude and turning. More bank means more load factor and a higher stall speed.",
    points: ["Bank angle", "Load factor", "Stall speed rises"]
  }
};

const subjects = window.ATPL_LESSONS;
let audioContext = null;

const state = {
  view: "dashboard",
  courseKey: null,
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
  dashboardEyebrow: document.getElementById("dashboardEyebrow"),
  dashboardTitle: document.getElementById("dashboardTitle"),
  dashboardCopy: document.getElementById("dashboardCopy"),
  coursePicker: document.getElementById("coursePicker"),
  courseTrail: document.getElementById("courseTrail"),
  selectedCourseTitle: document.getElementById("selectedCourseTitle"),
  selectedCourseMeta: document.getElementById("selectedCourseMeta"),
  backToCoursesButton: document.getElementById("backToCoursesButton"),
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
  lessonVisual: document.getElementById("lessonVisual"),
  lessonVisualTitle: document.getElementById("lessonVisualTitle"),
  lessonVisualCaption: document.getElementById("lessonVisualCaption"),
  lessonKeyPoints: document.getElementById("lessonKeyPoints"),
  lessonTrivia: document.getElementById("lessonTrivia"),
  quizQuestion: document.getElementById("quizQuestion"),
  answerOptions: document.getElementById("answerOptions"),
  answerFeedback: document.getElementById("answerFeedback"),
  continueLessonButton: document.getElementById("continueLessonButton"),
  feedbackPopup: document.getElementById("feedbackPopup"),
  popupResultBadge: document.getElementById("popupResultBadge"),
  popupKicker: document.getElementById("popupKicker"),
  popupTitle: document.getElementById("popupTitle"),
  popupText: document.getElementById("popupText"),
  popupMotivationTitle: document.getElementById("popupMotivationTitle"),
  popupMotivationText: document.getElementById("popupMotivationText"),
  popupProgress: document.getElementById("popupProgress"),
  popupCloseButton: document.getElementById("popupCloseButton"),
  popupContinueButton: document.getElementById("popupContinueButton"),
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
  elements.backToCoursesButton.addEventListener("click", showCoursePicker);
  elements.continueButton.addEventListener("click", continueLatest);
  elements.continueLessonButton.addEventListener("click", moveToNextLesson);
  elements.popupCloseButton.addEventListener("click", hideFeedbackPopup);
  elements.popupContinueButton.addEventListener("click", moveToNextLesson);
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.signOutButton.addEventListener("click", signOut);

  document.querySelectorAll("[data-close-popup]").forEach((element) => {
    element.addEventListener("click", hideFeedbackPopup);
  });

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
    deferredLessons: {},
    currentCourseKey: "",
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

function isCourseAvailable(subjectKey) {
  return LIVE_COURSE_KEYS.includes(subjectKey);
}

function subjectCode(subjectKey) {
  return SUBJECT_CODES[subjectKey] || subjectKey.slice(0, 3).toUpperCase();
}

function subjectDisplayName(subjectKey) {
  return `${subjectCode(subjectKey)} - ${subjects[subjectKey].title}`;
}

function completedSet(subjectKey) {
  return new Set(state.progress.completedLessons[subjectKey] || []);
}

function deferredSet(subjectKey) {
  return new Set(state.progress.deferredLessons[subjectKey] || []);
}

function completedCount(subjectKey) {
  return completedSet(subjectKey).size;
}

function totalLessonCount() {
  return LIVE_COURSE_KEYS.reduce((sum, key) => sum + subjects[key].lessons.length, 0);
}

function totalCompletedCount() {
  return LIVE_COURSE_KEYS.reduce((sum, key) => sum + completedCount(key), 0);
}

function learningPath(courseKey = state.courseKey) {
  if (!courseKey || !subjects[courseKey]) {
    return [];
  }

  const subject = subjects[courseKey];
  return subject.lessons.map((lesson, lessonIndex) => {
    return {
      subjectKey: courseKey,
      subject,
      lesson,
      lessonIndex,
      pathIndex: lessonIndex,
      challenge: CHALLENGE_TYPES[lessonIndex % CHALLENGE_TYPES.length]
    };
  });
}

function firstUncompletedPathIndex() {
  const path = learningPath();
  const index = path.findIndex((item) => {
    const completed = completedSet(item.subjectKey);
    const deferred = deferredSet(item.subjectKey);
    return !completed.has(item.lesson.id) && !deferred.has(item.lesson.id);
  });
  if (index !== -1) {
    return index;
  }

  const retryIndex = path.findIndex((item) => {
    const completed = completedSet(item.subjectKey);
    const deferred = deferredSet(item.subjectKey);
    return !completed.has(item.lesson.id) && deferred.has(item.lesson.id);
  });
  if (retryIndex !== -1) {
    return retryIndex;
  }

  return index === -1 ? path.length : index;
}

function currentPathItem() {
  return learningPath(state.subjectKey).find((item) => (
    item.subjectKey === state.subjectKey && item.lessonIndex === state.lessonIndex
  ));
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
  renderDashboardState();
  elements.subjectGrid.innerHTML = "";
  elements.coursePicker.innerHTML = "";

  if (!state.courseKey) {
    renderCourses();
    return;
  }

  const path = learningPath();
  const activeIndex = firstUncompletedPathIndex();

  path.forEach((item) => {
    const completed = completedSet(item.subjectKey).has(item.lesson.id);
    const deferred = deferredSet(item.subjectKey).has(item.lesson.id);
    const active = item.pathIndex === activeIndex;
    const locked = !completed && !active && (deferred || item.pathIndex > activeIndex);
    const node = document.createElement("button");
    node.className = `path-node ${item.pathIndex % 2 ? "is-right" : "is-left"} ${completed ? "is-complete" : ""} ${active ? "is-active" : ""} ${deferred ? "is-deferred" : ""} ${locked ? "is-locked" : ""}`;
    node.type = "button";
    node.disabled = locked;
    node.style.setProperty("--subject-color", item.subject.accent);
    node.innerHTML = `
      <span class="node-orbit ${item.challenge.tone}">
        <span class="node-icon">${locked ? "L" : item.challenge.short}</span>
      </span>
      <span class="node-copy">
        <span class="node-kicker">${item.challenge.label} - ${subjectDisplayName(item.subjectKey)}</span>
        <strong>${item.lesson.title}</strong>
        <span>${completed ? "Completed - review unlocked" : deferred ? "Queued for retry" : active ? item.challenge.description : "Complete earlier steps first"}</span>
      </span>
    `;
    node.addEventListener("click", () => {
      if (!locked) {
        startLesson(item.subjectKey, item.lessonIndex, completed);
      }
    });
    elements.subjectGrid.appendChild(node);
  });
}

function renderDashboardState() {
  const subject = state.courseKey ? subjects[state.courseKey] : null;
  elements.coursePicker.hidden = Boolean(subject);
  elements.courseTrail.hidden = !subject;
  elements.continueButton.hidden = !subject;

  if (!subject) {
    elements.dashboardEyebrow.textContent = "Course hangar";
    elements.dashboardTitle.textContent = "Choose your ATPL course";
    elements.dashboardCopy.textContent = "Start with one subject, finish its trail, then add more courses as the app grows.";
    return;
  }

  const completed = completedCount(state.courseKey);
  const total = subject.lessons.length;
  elements.dashboardEyebrow.textContent = "Active course";
  elements.dashboardTitle.textContent = subjectDisplayName(state.courseKey);
  elements.dashboardCopy.textContent = "Follow the trail from first concept to mastery. Each stop adds one exam-ready idea.";
  elements.selectedCourseTitle.textContent = subjectDisplayName(state.courseKey);
  elements.selectedCourseMeta.textContent = `${completed} of ${total} tasks complete`;
}

function renderCourses() {
  const sortedCourseKeys = subjectKeys().sort((firstKey, secondKey) => {
    const firstAvailable = isCourseAvailable(firstKey);
    const secondAvailable = isCourseAvailable(secondKey);
    if (firstAvailable === secondAvailable) {
      return subjects[firstKey].title.localeCompare(subjects[secondKey].title);
    }
    return firstAvailable ? -1 : 1;
  });

  sortedCourseKeys.forEach((subjectKey) => {
    const subject = subjects[subjectKey];
    const available = isCourseAvailable(subjectKey);
    const completed = completedCount(subjectKey);
    const total = subject.lessons.length;
    const percent = subjectPercent(subjectKey);
    const card = document.createElement("button");
    card.className = `course-card ${available ? "is-live" : "is-locked"}`;
    card.type = "button";
    card.disabled = !available;
    card.style.setProperty("--subject-color", subject.accent);
    card.innerHTML = `
      <span class="course-badge">${available ? "Live" : "Soon"}</span>
      <span class="course-icon">${subjectCode(subjectKey)}</span>
      <span class="course-copy">
        <strong>${subjectDisplayName(subjectKey)}</strong>
        <span>${available ? `${completed} of ${total} tasks complete` : "Course trail coming later"}</span>
      </span>
      <span class="course-progress" aria-hidden="true"><span style="width: ${available ? percent : 0}%"></span></span>
    `;
    card.addEventListener("click", () => selectCourse(subjectKey));
    elements.coursePicker.appendChild(card);
  });
}

function selectCourse(subjectKey) {
  if (!isCourseAvailable(subjectKey)) {
    return;
  }

  state.courseKey = subjectKey;
  state.progress.currentCourseKey = subjectKey;
  saveProgress();
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCoursePicker() {
  state.courseKey = null;
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
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

  elements.subjectProgressList.innerHTML = LIVE_COURSE_KEYS.map((subjectKey) => {
    const subject = subjects[subjectKey];
    const percent = subjectPercent(subjectKey);
    return `
      <div class="subject-progress-row">
        <div class="subject-progress-top">
          <span>${subjectDisplayName(subjectKey)}</span>
          <span>${percent}%</span>
        </div>
        <div class="progress-bar" aria-hidden="true"><span style="width: ${percent}%; background: ${subject.accent};"></span></div>
      </div>
    `;
  }).join("");
}

function showView(viewName) {
  hideFeedbackPopup();
  state.view = viewName;
  elements.appShell.classList.toggle("is-lesson-mode", viewName === "lesson");
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  document.getElementById(`${viewName}View`).classList.add("active-view");
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  renderAll();
}

function continueLatest() {
  const path = learningPath();
  const activeIndex = firstUncompletedPathIndex();
  const activeItem = path[activeIndex] || path[0];

  if (!activeItem) {
    return;
  }

  startLesson(activeItem.subjectKey, activeItem.lessonIndex, activeIndex >= path.length);
}

function startLesson(subjectKey, lessonIndex, reviewMode) {
  state.courseKey = subjectKey;
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
  const pathItem = currentPathItem();
  elements.lessonSubject.textContent = pathItem
    ? `${pathItem.challenge.label} - ${subjectDisplayName(state.subjectKey)}`
    : subjectDisplayName(state.subjectKey);
  elements.lessonCounter.textContent = pathItem
    ? `Step ${pathItem.pathIndex + 1} of ${learningPath(state.subjectKey).length}`
    : `Lesson ${state.lessonIndex + 1} of ${subject.lessons.length}`;
  elements.lessonTitle.textContent = lesson.title;
  renderLessonVisual(lesson);
  elements.lessonTrivia.textContent = LESSON_TRIVIA[lesson.id] || "Keep the rule tied to the aircraft state, not just the memorized phrase.";
  elements.quizQuestion.textContent = lesson.question;
  elements.lessonProgressBar.style.width = `${percent}%`;
  elements.answerFeedback.hidden = true;
  elements.answerFeedback.innerHTML = "";
  hideFeedbackPopup();
  elements.continueLessonButton.disabled = true;
  elements.continueLessonButton.textContent = getContinueLabel();
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

function renderLessonVisual(lesson) {
  const fallback = {
    type: "default",
    title: lesson.title,
    caption: lesson.explanation,
    points: [lesson.relevance, lesson.example].filter(Boolean).slice(0, 2)
  };
  const visual = LESSON_VISUALS[lesson.id] || fallback;

  elements.lessonVisual.className = `flight-visual visual-${visual.type}`;
  elements.lessonVisual.innerHTML = buildVisualMarkup(visual.type);
  elements.lessonVisualTitle.textContent = visual.title;
  elements.lessonVisualCaption.textContent = visual.caption;
  elements.lessonKeyPoints.innerHTML = visual.points.map((point) => `<span>${point}</span>`).join("");
}

function buildVisualMarkup(type) {
  if (type === "aoa") {
    return `
      <span class="airflow-line one"></span>
      <span class="airflow-line two"></span>
      <span class="airflow-label">Relative airflow</span>
      <span class="wing-section"></span>
      <span class="chord-line"></span>
      <span class="angle-arc"></span>
      <span class="angle-label">alpha</span>
    `;
  }

  if (type === "drag") {
    return `
      <span class="demo-aircraft"></span>
      <span class="lift-arrow">Lift</span>
      <span class="drag-arrow">Induced drag</span>
      <span class="speed-tag">Low speed</span>
      <span class="vortex left"></span>
      <span class="vortex right"></span>
    `;
  }

  if (type === "load") {
    return `
      <span class="turn-circle"></span>
      <span class="banked-aircraft"></span>
      <span class="lift-vector">Lift</span>
      <span class="weight-vector">Weight</span>
      <span class="bank-tag">60 deg bank</span>
      <span class="load-tag">about 2 g</span>
    `;
  }

  return `
    <span class="demo-aircraft"></span>
    <span class="airflow-line one"></span>
    <span class="airflow-line two"></span>
  `;
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

  if (!state.reviewMode && correct) {
    completeLesson(lesson, correct);
  } else if (!state.reviewMode) {
    deferLesson(lesson);
  }

  const feedback = getFeedbackData(correct, lesson);
  playFeedbackSound(correct);
  showFeedbackPopup(feedback);
  elements.answerFeedback.hidden = true;
  elements.answerFeedback.innerHTML = "";
  elements.continueLessonButton.disabled = false;
  elements.continueLessonButton.textContent = getContinueLabel();
  renderAll();
}

function getFeedbackData(correct, lesson) {
  const messages = correct ? MOTIVATION_MESSAGES.correct : MOTIVATION_MESSAGES.incorrect;
  const message = messages[(state.lessonIndex + (correct ? 0 : 1)) % messages.length];
  const dailyProgress = Math.min(state.progress.dailyLessons, DAILY_GOAL);
  const xpLabel = state.reviewMode ? "Review rep" : `+${correct ? XP_PER_CORRECT_LESSON : 0} XP`;

  return {
    correct,
    result: correct ? "Correct" : "Not quite",
    xpLabel,
    kicker: correct ? "Momentum" : "Learning moment",
    title: message.title,
    explanation: lesson.quizExplanation,
    motivation: message.body,
    progress: `${dailyProgress}/${DAILY_GOAL}`,
    continueLabel: getContinueLabel()
  };
}

function showFeedbackPopup(feedback) {
  elements.feedbackPopup.classList.toggle("is-correct", feedback.correct);
  elements.feedbackPopup.classList.toggle("is-incorrect", !feedback.correct);
  elements.popupResultBadge.textContent = feedback.xpLabel;
  elements.popupKicker.textContent = feedback.kicker;
  elements.popupTitle.textContent = feedback.title;
  elements.popupText.textContent = feedback.explanation;
  elements.popupMotivationTitle.textContent = feedback.result;
  elements.popupMotivationText.textContent = feedback.motivation;
  elements.popupProgress.textContent = feedback.progress;
  elements.popupContinueButton.textContent = feedback.continueLabel;
  elements.feedbackPopup.hidden = false;
  window.setTimeout(() => {
    elements.feedbackPopup.classList.add("is-visible");
  }, 20);
}

function hideFeedbackPopup() {
  if (elements.feedbackPopup.hidden) {
    return;
  }

  elements.feedbackPopup.classList.remove("is-visible");
  window.setTimeout(() => {
    if (!elements.feedbackPopup.classList.contains("is-visible")) {
      elements.feedbackPopup.hidden = true;
    }
  }, 180);
}

function playFeedbackSound(correct) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  try {
    audioContext = audioContext || new AudioContext();
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (correct) {
      playToneSequence([523.25, 659.25, 783.99], 0.08, "triangle", 0.11);
      return;
    }

    playToneSequence([220, 174.61, 146.83], 0.13, "sawtooth", 0.12);
  } catch {
    audioContext = null;
  }
}

function playToneSequence(frequencies, duration, type, gainValue) {
  const now = audioContext.currentTime;
  frequencies.forEach((frequency, index) => {
    const start = now + index * (duration * 0.82);
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  });
}

function getContinueLabel() {
  const pathItem = currentPathItem();
  if (!pathItem) {
    return "Continue";
  }

  if (state.answered && !state.reviewMode) {
    const path = learningPath();
    const nextItem = path[firstUncompletedPathIndex()];
    if (!nextItem) {
      return "Finish path";
    }
    return nextItem.lesson.id === pathItem.lesson.id ? "Retry challenge" : "Next challenge";
  }

  return pathItem.pathIndex < learningPath().length - 1 ? "Next challenge" : "Finish path";
}

function completeLesson(lesson, correct) {
  const completed = completedSet(state.subjectKey);
  if (completed.has(lesson.id)) {
    return;
  }

  completed.add(lesson.id);
  state.progress.completedLessons[state.subjectKey] = Array.from(completed);
  removeDeferredLesson(lesson);
  if (correct) {
    state.progress.xp += XP_PER_CORRECT_LESSON;
  }

  updateDailyStreak();
  state.progress.lastLessonIndex = state.lessonIndex + 1;
  saveProgress();
}

function deferLesson(lesson) {
  const deferred = deferredSet(state.subjectKey);
  deferred.add(lesson.id);
  state.progress.deferredLessons[state.subjectKey] = Array.from(deferred);
  saveProgress();
}

function removeDeferredLesson(lesson) {
  const deferred = deferredSet(state.subjectKey);
  if (!deferred.has(lesson.id)) {
    return;
  }

  deferred.delete(lesson.id);
  state.progress.deferredLessons[state.subjectKey] = Array.from(deferred);
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
  if (state.reviewMode) {
    showView("dashboard");
    return;
  }

  const path = learningPath();
  const activeIndex = firstUncompletedPathIndex();
  const nextItem = path[activeIndex];

  if (nextItem) {
    startLesson(nextItem.subjectKey, nextItem.lessonIndex, false);
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
