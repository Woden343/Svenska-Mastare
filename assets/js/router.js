// assets/js/router.js
// Router hash simple: "#/path?key=value"

const Router = {
  routes: new Map(),
  started: false,

  on(path, handler) {
    this.routes.set(path, handler);
  },

  go(path, params = {}) {
    const qs = this._toQuery(params);
    const hash = `#${path}${qs ? "?" + qs : ""}`;
    if (location.hash === hash) {
      // Force dispatch si même hash
      this._dispatch();
    } else {
      location.hash = hash;
    }
  },

  start(fallbackPath = "/") {
    if (this.started) return;
    this.started = true;

    window.addEventListener("hashchange", () => this._dispatch());
    // Premier rendu
    if (!location.hash || location.hash === "#") {
      location.hash = `#${fallbackPath}`;
      return;
    }
    this._dispatch();
  },

  _dispatch() {
    const { path, params } = this._parse(location.hash);

    const handler = this.routes.get(path);
    if (!handler) {
      // fallback si route inconnue
      const root = this.routes.get("/");
      if (root) return root({});
      return;
    }
    handler(params);
  },

  _parse(hash) {
    const raw = (hash || "").replace(/^#/, "");
    const [pathPart, queryPart] = raw.split("?");
    const path = pathPart || "/";
    const params = this._fromQuery(queryPart || "");
    return { path, params };
  },

  _toQuery(params) {
    const sp = new URLSearchParams();
    Object.entries(params || {}).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      sp.set(k, String(v));
    });
    return sp.toString();
  },

  _fromQuery(qs) {
    const sp = new URLSearchParams(qs);
    const obj = {};
    for (const [k, v] of sp.entries()) obj[k] = v;
    return obj;
  }
};