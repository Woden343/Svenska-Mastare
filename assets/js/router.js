// assets/js/router.js
const Router = {
  routes: {},

  on(path, handler) {
    this.routes[path] = handler;
  },

  go(path, params = {}) {
    const qs = new URLSearchParams(params).toString();
    const url = "#" + path + (qs ? ("?" + qs) : "");
    location.hash = url;
  },

  parseHash() {
    const hash = location.hash || "#/";
    const [rawPath, rawQuery] = hash.slice(1).split("?");
    const path = rawPath || "/";
    const params = Object.fromEntries(new URLSearchParams(rawQuery || ""));
    return { path, params };
  },

  dispatch() {
    const { path, params } = this.parseHash();
    const handler = this.routes[path];
    if (handler) handler(params);
    else {
      // fallback
      if (this.routes["/"]) this.routes["/"]({});
    }
  },

  start(defaultPath = "/") {
    if (!location.hash) location.hash = "#" + defaultPath;
    window.addEventListener("hashchange", () => this.dispatch());
    this.dispatch();
  }
};