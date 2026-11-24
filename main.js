/* =========================================================
   Landing page — aluguel de computadores
   Animações em JavaScript puro (sem bibliotecas)
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };

  /* ---------- 1. Tela de carregamento (contador 000 → 100) ---------- */
  var preloader = $('preloader');
  if (reduce) {
    preloader.classList.add('is-done');
  } else {
    var n = 0;
    var iv = setInterval(function () {
      n = Math.min(100, n + 2 + Math.floor(Math.random() * 6));
      $('preloaderCount').textContent = String(n).padStart(3, '0');
      $('preloaderBar').style.width = n + '%';
      if (n >= 100) {
        clearInterval(iv);
        setTimeout(function () { preloader.classList.add('is-done'); }, 250);
      }
    }, 32);
  }

  /* ---------- 2. Faixa que corre ---------- */
  var words = ['Notebooks', 'Desktops', 'Workstations', 'Monitores', 'Manutenção inclusa', 'Troca rápida', 'Suporte técnico', 'Contratos flexíveis'];
  var marquee = $('marquee');
  words.concat(words, words).forEach(function (w) {
    var s = document.createElement('span');
    s.innerHTML = w + ' <i>✦</i>';
    marquee.appendChild(s);
  });

  /* ---------- 3. Configurador ---------- */
  var rows = [
    { k: 'Processador', v: '[MODELO]', tip: 'Escolhido pela função do cargo' },
    { k: 'Memória', v: '[X] GB', tip: 'Folga para multitarefa' },
    { k: 'Armazenamento', v: 'SSD [X] GB', tip: 'Liga em segundos' },
    { k: 'Sistema e programas', v: 'Windows + Office', tip: 'Instalado e configurado' },
    { k: 'Entrega', v: 'Agendada', tip: 'Chega pronto para usar' }
  ];
  var stepNames = ['Processador', 'Memória', 'Armazenamento', 'Programas', 'Entrega', 'Pronto'];
  var specRows = $('specRows'), chips = $('chips');
  var rowEls = [], chipEls = [];

  rows.forEach(function (r) {
    var row = document.createElement('div');
    row.className = 'spec__row';
    row.innerHTML = '<span class="spec__k"></span><span class="spec__v">—</span>' +
      '<div class="spec__tip"><b>Técnico</b><span></span></div>';
    row.querySelector('.spec__k').textContent = r.k;
    row.querySelector('.spec__tip span').textContent = r.tip;
    specRows.appendChild(row);
    rowEls.push(row);

    var chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = '✓ ' + r.k;
    chips.appendChild(chip);
    chipEls.push(chip);
  });

  var lastDone = -1;
  function setConfig(done) {
    if (done === lastDone) return;
    lastDone = done;
    rowEls.forEach(function (row, i) {
      var isDone = i < done, active = i === done;
      row.classList.toggle('is-done', isDone);
      row.classList.toggle('is-active', active);
      row.querySelector('.spec__v').textContent = isDone ? rows[i].v : (active ? '···' : '—');
    });
    chipEls.forEach(function (c, i) { c.classList.toggle('is-on', i < done); });
    $('ready').classList.toggle('is-on', done >= 5);
    $('stepLabel').textContent = '0' + Math.min(done + 1, 5) + '/05';
    $('stepName').textContent = stepNames[done];
    $('cfgPct').textContent = Math.round(done / 5 * 100) + '%';
    $('cfgBar').style.transform = 'scaleX(' + done / 5 + ')';
  }

  /* ---------- 4. Tudo que depende da rolagem ---------- */
  var config = $('config'), split = $('split'), equip = $('equipamentos'), timeline = $('timeline');
  var device = $('device'), splitL = $('splitL'), splitR = $('splitR'), scribble = $('scribble');
  var tlFill = $('tlFill'), tlSteps = document.querySelectorAll('.tl-step');
  var progressBar = $('progressBar');
  var reveals = document.querySelectorAll('.reveal');

  // atraso em cascata para itens lado a lado
  ['.plans', '.perks__grid', '.faq__list'].forEach(function (sel) {
    var group = document.querySelector(sel);
    if (!group) return;
    group.querySelectorAll('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i * 0.12) + 's'; });
  });

  function onScroll() {
    var vh = window.innerHeight;
    var doc = document.documentElement;

    // barra de progresso
    progressBar.style.transform = 'scaleX(' + clamp(window.scrollY / (doc.scrollHeight - vh)) + ')';

    // configurador fixo
    var c = config.getBoundingClientRect();
    var p = clamp(-c.top / Math.max(1, c.height - vh));
    setConfig(Math.min(5, Math.floor(p * 6)));
    device.style.transform = 'rotateY(' + (-16 + p * 22).toFixed(2) + 'deg) rotateX(' + (10 - p * 10).toFixed(2) + 'deg)';

    // frase dividida
    var s = split.getBoundingClientRect();
    var off = (1 - clamp((vh - s.top) / (vh + s.height * 0.4))) * 45;
    splitL.style.transform = 'translateX(-' + off.toFixed(2) + '%)';
    splitR.style.transform = 'translateX(' + off.toFixed(2) + '%)';

    // rabisco que se desenha
    var e = equip.getBoundingClientRect();
    scribble.style.strokeDashoffset = Math.round(520 * (1 - clamp((vh * 0.85 - e.top) / (vh * 0.45))));

    // linha do tempo
    var t = timeline.getBoundingClientRect();
    var tp = clamp((vh * 0.65 - t.top) / (t.height * 0.75));
    tlFill.style.height = Math.round(tp * 100) + '%';
    tlSteps.forEach(function (el, i) { el.classList.toggle('is-on', tp > i / tlSteps.length + 0.02); });

    // entradas ao rolar
    reveals.forEach(function (el) {
      if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < vh * 0.88) el.classList.add('is-in');
    });
  }

  if (reduce) {
    setConfig(5);
    scribble.style.strokeDashoffset = 0;
    tlFill.style.height = '100%';
    tlSteps.forEach(function (el) { el.classList.add('is-on'); });
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var ticking = false;
    var request = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; onScroll(); });
    };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    onScroll();
  }

  /* ---------- 5. Cartões 3D que seguem o mouse ---------- */
  if (!reduce) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var glare = card.querySelector('.plan__glare');
      card.addEventListener('mousemove', function (ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 10).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 12).toFixed(2) + 'deg) translateY(-6px)';
        glare.style.background = 'radial-gradient(420px circle at ' + Math.round(x * 100) + '% ' + Math.round(y * 100) + '%, rgba(0,186,249,.14), transparent 60%)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });

    /* ---------- 6. Botão magnético ---------- */
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (ev) {
        var r = btn.getBoundingClientRect();
        var x = (ev.clientX - r.left - r.width / 2) * 0.25;
        var y = (ev.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- 7. Perguntas frequentes ---------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    item.querySelector('.faq__q').addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item').forEach(function (o) {
        o.classList.remove('is-open');
        o.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        item.querySelector('.faq__q').setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- 8. Formulário ---------- */
  // Por enquanto só mostra a mensagem de sucesso.
  // Para receber os pedidos de verdade, ligue o formulário a um serviço
  // como Formspree ou a um backend próprio (veja o README).
  $('quoteForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    $('quoteBox').classList.add('is-sent');
  });
})();
