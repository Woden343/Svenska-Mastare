// État minimal + navigation
const STORAGE_KEY = "svenska-mastare-state";

const appState = {
  currentTab: "learn",
  user: { xp: 0, level: "A1", streak: 0 },
  settings: { sound: true, autoNext: false, dailyGoal: 20, apiBase: "" }
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) Object.assign(appState, JSON.parse(saved));
}

function setActiveTab(tabId) {
  // cacher tous les contenus
  document.getElementById("content-learn").classList.add("hidden");
  document.getElementById("content-practice").classList.add("hidden");
  document.getElementById("content-flashcards").classList.add("hidden");
  document.getElementById("content-dialogue").classList.add("hidden");
  document.getElementById("content-progress").classList.add("hidden");

  // afficher le bon
  document.getElementById(`content-${tabId}`).classList.remove("hidden");
  appState.currentTab = tabId;
  saveState();
  updateHeaderUI();
}

function updateHeaderUI() {
  document.getElementById("ui-xp").textContent = String(appState.user.xp);
  document.getElementById("ui-level").textContent = appState.user.level;
  document.getElementById("ui-streak").textContent = `${appState.user.streak} jour`;
  document.getElementById("ui-goal").textContent = String(appState.settings.dailyGoal);
  document.getElementById("ui-progress").textContent = "0%";
}

function initTabs() {
  document.getElementById("tab-learn").onclick = () => setActiveTab("learn");
  document.getElementById("tab-practice").onclick = () => setActiveTab("practice");
  document.getElementById("tab-flashcards").onclick = () => setActiveTab("flashcards");
  document.getElementById("tab-dialogue").onclick = () => setActiveTab("dialogue");
  document.getElementById("tab-progress").onclick = () => setActiveTab("progress");
}

function initSettingsModal() {
  const modal = document.getElementById("settings-modal");
  document.getElementById("btn-open-settings").onclick = () => {
    // pré-remplir
    document.getElementById("toggle-sound").checked = !!appState.settings.sound;
    document.getElementById("toggle-auto-next").checked = !!appState.settings.autoNext;
    document.getElementById("select-goal").value = String(appState.settings.dailyGoal);
    document.getElementById("input-api-base").value = appState.settings.apiBase || "";
    modal.classList.remove("hidden");
  };
  document.getElementById("btn-close-settings").onclick = () => modal.classList.add("hidden");

  document.getElementById("btn-save-settings").onclick = () => {
    appState.settings.sound = document.getElementById("toggle-sound").checked;
    appState.settings.autoNext = document.getElementById("toggle-auto-next").checked;
    appState.settings.dailyGoal = Number(document.getElementById("select-goal").value);
    appState.settings.apiBase = document.getElementById("input-api-base").value.trim();
    saveState();
    updateHeaderUI();
    modal.classList.add("hidden");
    toast("✅ Paramètres enregistrés");
  };

  document.getElementById("btn-reset-settings").onclick = () => {
    if (!confirm("Réinitialiser toute la progression ?")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };
}

function toast(msg) {
  const t = document.getElementById("toast");
  const tt = document.getElementById("toast-text");
  tt.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 1800);
}

window.addEventListener("load", () => {
  loadState();
  initTabs();
  initSettingsModal();
  setActiveTab(appState.currentTab || "learn");
});
