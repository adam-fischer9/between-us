const STORAGE_KEYS = {
  LANG: "betweenus_lang",
  SEEN: "betweenus_seen_ids"
};

let currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || "en";
let seenIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.SEEN) || "[]"));
let activeTopicId = null;
let currentQuestion = null;
let isCleanView = false;

// DOM Elements
const topicsView = document.getElementById("topics-view");
const deckView = document.getElementById("deck-view");
const topicsGrid = document.getElementById("topics-grid");
const langToggleBtn = document.getElementById("lang-toggle");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const copyBtn = document.getElementById("copy-btn");
const exploreTopicsBtn = document.getElementById("explore-topics-btn");
const cleanViewBtn = document.getElementById("clean-view-btn");
const resetTopicBtn = document.getElementById("reset-topic-btn");
const questionCard = document.getElementById("question-card");
const questionTextEl = document.getElementById("question-text");
const cardTopicTag = document.getElementById("card-topic-tag");
const deckProgressEl = document.getElementById("deck-progress");
const toastEl = document.getElementById("toast");

function saveSeen() {
  localStorage.setItem(STORAGE_KEYS.SEEN, JSON.stringify([...seenIds]));
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toastEl.classList.add("hidden");
  }, 2000);
}

function getTopicQuestions(topicId) {
  return QUESTIONS.filter((q) => q.topic === topicId);
}

function getSeenCount(topicId) {
  return getTopicQuestions(topicId).filter((q) => seenIds.has(q.id)).length;
}

function goToTopicsHome() {
  activeTopicId = null;
  currentQuestion = null;
  deckView.classList.add("hidden");
  topicsView.classList.remove("hidden");
  renderTopicsGrid();
}

function applyLanguageUI() {
  const t = UI_DATA[currentLang];
  document.body.className = `lang-${currentLang}`;
  document.documentElement.lang = currentLang;

  document.getElementById("app-title").textContent = t.appTitle;
  document.getElementById("app-subtitle").textContent = t.appSubtitle;
  langToggleBtn.textContent = currentLang === "en" ? "EN | မြန်မာ" : "မြန်မာ | EN";

  backBtn.textContent = t.backBtn;
  nextBtn.textContent = t.nextBtn;
  copyBtn.textContent = t.copyBtn;
  exploreTopicsBtn.textContent = t.exploreTopicsBtn;
  resetTopicBtn.textContent = t.resetTopicBtn;
  cleanViewBtn.textContent = isCleanView ? t.cleanViewOff : t.cleanViewOn;

  if (activeTopicId) {
    renderDeckView(false);
  } else {
    renderTopicsGrid();
  }
}

function renderTopicsGrid() {
  const t = UI_DATA[currentLang];
  topicsGrid.innerHTML = "";

  TOPICS.forEach((topic) => {
    const total = getTopicQuestions(topic.id).length;
    const seen = getSeenCount(topic.id);
    const info = topic[currentLang];

    const card = document.createElement("button");
    card.type = "button";
    card.className = "topic-card";
    card.innerHTML = `
      <div>
        <h2>${info.title}</h2>
        <p>${info.description}</p>
      </div>
      <div class="topic-meta">
        <span>${t.seenLabel.replace("{seen}", seen).replace("{total}", total)}</span>
        <span>${t.openDeckLabel}</span>
      </div>
    `;
    card.addEventListener("click", () => openTopic(topic.id));
    topicsGrid.appendChild(card);
  });
}

function openTopic(topicId) {
  activeTopicId = topicId;
  isCleanView = false;
  questionCard.classList.remove("clean-mode");
  topicsView.classList.add("hidden");
  deckView.classList.remove("hidden");
  renderDeckView(true);
}

function pickNextQuestion() {
  const allInTopic = getTopicQuestions(activeTopicId);
  const unseen = allInTopic.filter((q) => !seenIds.has(q.id));

  if (unseen.length === 0) {
    currentQuestion = null;
    return;
  }

  const candidates =
    unseen.length > 1 && currentQuestion
      ? unseen.filter((q) => q.id !== currentQuestion.id)
      : unseen;

  const randomIndex = Math.floor(Math.random() * candidates.length);
  currentQuestion = candidates[randomIndex];
  seenIds.add(currentQuestion.id);
  saveSeen();
}

function renderDeckView(pickNew = true) {
  const t = UI_DATA[currentLang];
  const topic = TOPICS.find((item) => item.id === activeTopicId);

  if (pickNew) {
    pickNextQuestion();
  }

  const total = getTopicQuestions(activeTopicId).length;
  const seen = getSeenCount(activeTopicId);

  cardTopicTag.textContent = topic[currentLang].title;
  deckProgressEl.textContent = t.seenLabel.replace("{seen}", seen).replace("{total}", total);
  cleanViewBtn.textContent = isCleanView ? t.cleanViewOff : t.cleanViewOn;

  if (currentQuestion) {
    questionTextEl.textContent = currentQuestion[currentLang];
    copyBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    exploreTopicsBtn.classList.add("hidden");
  } else {
    questionTextEl.textContent = t.allSeenMessage;
    copyBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    exploreTopicsBtn.classList.remove("hidden");
  }
}

// Event Listeners
langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "my" : "en";
  localStorage.setItem(STORAGE_KEYS.LANG, currentLang);
  applyLanguageUI();
});

backBtn.addEventListener("click", goToTopicsHome);
exploreTopicsBtn.addEventListener("click", goToTopicsHome);

nextBtn.addEventListener("click", () => {
  renderDeckView(true);
});

copyBtn.addEventListener("click", async () => {
  if (!currentQuestion) return;
  const topic = TOPICS.find((item) => item.id === activeTopicId);
  const formatted = `💬 [${topic[currentLang].title}] ${currentQuestion[currentLang]}`;
  try {
    await navigator.clipboard.writeText(formatted);
    showToast(UI_DATA[currentLang].copiedToast);
  } catch {
    showToast(formatted);
  }
});

cleanViewBtn.addEventListener("click", () => {
  isCleanView = !isCleanView;
  questionCard.classList.toggle("clean-mode", isCleanView);
  cleanViewBtn.textContent = isCleanView
    ? UI_DATA[currentLang].cleanViewOff
    : UI_DATA[currentLang].cleanViewOn;
});

resetTopicBtn.addEventListener("click", () => {
  const allInTopic = getTopicQuestions(activeTopicId);
  allInTopic.forEach((q) => seenIds.delete(q.id));
  saveSeen();
  showToast(UI_DATA[currentLang].resetToast);
  renderDeckView(true);
});

// Initialize
applyLanguageUI();
