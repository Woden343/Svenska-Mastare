// assets/js/router.js
// Hash Router robuste: "#/path?key=value"

const Router = {
  routes: new Map(),
  started: false,

  on(path, handler) {
    this.routes.set(path, handler);
  },

  go(path, params = {}) {
    const qs = new URLSearchParams(params).toString();
    const target = `#${path}${qs ? `?${qs}` : ""}`;

    // Même hash -> force render
    if (location.hash === target) {
      this.dispatch();
      return;
    }

    location.hash = target;
    // sécurité (certains navigateurs)
    setTimeout(() => this.dispatch(), 0);
  },

  start(fallback = "/") {
    if (this.started) return;
    this.started = true;

    window.addEventListener("hashchange", () => this.dispatch());

    if (!location.hash || location.hash === "#") {
      location.hash = `#${fallback}`;
    }

    this.dispatch();
  },

  parse() {
    const raw = (location.hash || "").replace(/^#/, "");
    if (!raw) return { path: "/", params: {} };

    const [pathPart, queryPart] = raw.split("?");
    const path = pathPart || "/";

    const params = {};
    const sp = new URLSearchParams(queryPart || "");
    for (const [k, v] of sp.entries()) params[k] = v;

    return { path, params };
  },

  dispatch() {
    const { path, params } = this.parse();
    const handler = this.routes.get(path) || this.routes.get("/") || null;
    if (handler) handler(params);
  }
};