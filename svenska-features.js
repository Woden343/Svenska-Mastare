// Stubs (remplis plus tard)
function setApiStatus(ok, label) {
  const dot = document.getElementById("ui-api-dot");
  const dotM = document.getElementById("ui-api-dot-mobile");
  const txt = document.getElementById("ui-api-status");
  const txtM = document.getElementById("ui-api-status-mobile");

  const color = ok ? "bg-green-400" : "bg-slate-300";
  dot.className = `inline-block w-2.5 h-2.5 rounded-full ${color}`;
  dotM.className = `inline-block w-2.5 h-2.5 rounded-full ${color}`;
  txt.textContent = label;
  txtM.textContent = label;
}

// Test API bouton (appelle /health sur ton Worker)
async function testApi() {
  const base = (appState.settings.apiBase || "").replace(/\/+$/, "");
  if (!base) return alert("Ajoute l'URL de ton Worker dans les paramètres.");

  try {
    const res = await fetch(`${base}/health`);
    if (!res.ok) throw new Error("health not ok");
    setApiStatus(true, "Connectée");
    alert("✅ API OK (health)");
  } catch (e) {
    setApiStatus(false, "Erreur");
    alert("❌ Impossible de joindre l'API. Vérifie l'URL et le CORS.");
  }
}

window.addEventListener("load", () => {
  document.getElementById("btn-test-api").onclick = testApi;

  // Status initial
  if (appState.settings.apiBase) setApiStatus(false, "À tester");
  else setApiStatus(false, "Non configurée");
});
