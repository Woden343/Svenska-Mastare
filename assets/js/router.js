// assets/js/router.js
// Router hash: #/path?x=1  (fonctionne local + GitHub Pages)

const Router = (() => {
  const routes = [];

  const parseHash = () => {
    const h = (location.hash || "#/").replace(/^#/, "");
    const [pathPart, queryPart] = h.split("?");
    const path = pathPart || "/";
    const params = {};

    if (queryPart) {
      for (const part of queryPart.split("&")) {
        if (!part) continue;
        const [k, v] = part.split("=");
        params[decodeURIComponent(k)] = decodeURIComponent(v || "");
      }
    }

    return { path, params };
  };

  const match = (pattern, path) => {
    // pattern ex: "/lesson"  (params via query)
    // On reste simple: match exact
    return pattern === path;
  };

  const render = () => {
    const { path, params } = parseHash();

    for (const r of routes) {
      if (match(r.pattern, path)) {
        r.handler(params);
        return;
      }
    }

    // fallback -> home
    go("/");
  };

  const on = (pattern, handler) => {
    routes.push({ pattern, handler });
  };

  const go = (path, params = null) => {
    let hash = `#${path}`;
    if (params && typeof params === "object") {
      const qs = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&");
      if (qs) hash += `?${qs}`;
    }
    if (location.hash !== hash) location.hash = hash;
    else render(); // si même hash, on force le render
  };

  const start = (defaultPath = "/") => {
    window.addEventListener("hashchange", render);
    if (!location.hash) location.hash = `#${defaultPath}`;
    render();
  };

  return { on, go, start };
})();