(function () {
  const API_BASE = "http://localhost:3000";
  const lista = document.getElementById("lista");
  const status = document.getElementById("status");
  const input = document.getElementById("q");
  const btnBuscar = document.getElementById("btnBuscar");

  function setStatus(msg, cls) {
    status.textContent = msg;
    status.className = "status " + (cls || "");
  }

  // Renderização simples
  function renderProdutos(items) {
    lista.innerHTML = "";
    if (!Array.isArray(items) || items.length === 0) {
      lista.innerHTML = "<li class='card'><div class='meta'>Nenhum resultado.</div></li>";
      return;
    }
    for (const p of items) {
      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `
        <h3>${escapeHtml(p.name)}</h3>
        <div class="meta">#${p.id} · ${escapeHtml(p.category || "geral")}</div>
        <div class="meta">R$ ${Number(p.price).toFixed(2)}</div>
      `;
      lista.appendChild(li);
    }
  }

  // Skeletons
  function renderLoading(count = 6) {
    lista.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `<div class="skeleton"></div>`;
      lista.appendChild(li);
    }
  }

  // Utilitário simples para evitar XSS ao inserir texto
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // XHR GET com tratamento de erros, timeout e JSON parse
  function xhrGet(url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // assíncrono
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 8000;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            onSuccess && onSuccess(data);
          } catch (e) {
            onError && onError(new Error("Falha ao parsear JSON: " + e.message));
          }
        } else {
          onError && onError(new Error("Erro HTTP " + xhr.status + " - " + xhr.statusText));
        }
      }
    };

    xhr.onerror = function () {
      onError && onError(new Error("Falha de rede"));
    };

    xhr.ontimeout = function () {
      onError && onError(new Error("Tempo de requisição excedido"));
    };

    try {
      xhr.send();
    } catch (e) {
      onError && onError(e);
    }
  }

  // Debounce
  function debounce(fn, delay) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Carrega todos os produtos
  function carregarTodos() {
    setStatus("Carregando produtos...", "loading");
    renderLoading();
    xhrGet(`${API_BASE}/products`, (data) => {
      renderProdutos(data);
      setStatus("Produtos carregados.", "ok");
    }, (err) => {
      console.error(err);
      lista.innerHTML = "";
      setStatus("Não foi possível carregar os dados. Tente novamente.", "error");
    });
  }

  // Busca por nome com filtro do json-server: /products?name_like=...
  function buscarPorNome(q) {
    const url = q ? `${API_BASE}/products?name_like=${encodeURIComponent(q)}` : `${API_BASE}/products`;
    setStatus(q ? `Buscando por "${q}"...` : "Carregando produtos...", "loading");
    renderLoading(4);
    xhrGet(url, (data) => {
      renderProdutos(data);
      setStatus(q ? `Resultados para "${q}".` : "Produtos carregados.", "ok");
    }, (err) => {
      console.error(err);
      lista.innerHTML = "";
      setStatus("Erro na busca. Verifique sua conexão e tente novamente.", "error");
    });
  }

  // Eventos
  btnBuscar.addEventListener("click", () => buscarPorNome(input.value.trim()));
  input.addEventListener("input", debounce(() => buscarPorNome(input.value.trim()), 400));
  window.addEventListener("DOMContentLoaded", carregarTodos);
})();