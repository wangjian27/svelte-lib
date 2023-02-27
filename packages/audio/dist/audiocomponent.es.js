(function(){ try {var elementStyle = document.createElement('style'); elementStyle.appendChild(document.createTextNode(".voice.svelte-s4ai01{width:90vw;margin:.3rem .15rem;line-height:.33rem}.voice-btn.svelte-s4ai01{display:flex;align-items:center;flex-shrink:0;padding:.02rem .08rem;margin-right:.08rem}.voice-btn-img.svelte-s4ai01{height:.33rem!important;width:.33rem!important;margin:0 .08rem}.voice-btn-text.svelte-s4ai01{font-size:.24rem}.voice-canvas.svelte-s4ai01{position:relative;display:flex;height:.33rem;overflow:hidden;margin:.06rem 0;flex:1}.voice-time.svelte-s4ai01{flex-shrink:0;padding:0 .2rem}.container.svelte-s4ai01{display:flex;align-items:center;justify-content:space-between;border-radius:.3rem;border-width:.01rem;-webkit-box-pack:justify;border-style:solid;height:.6rem}.light-bd.svelte-s4ai01{border-color:#f5f5f5}[theme-mode=black] .light-bd.svelte-s4ai01{border-color:#202022}")); document.head.appendChild(elementStyle);} catch(e) {console.error('vite-plugin-css-injected-by-js', e);} })();function M() {
}
function ie(e) {
  return e();
}
function U() {
  return /* @__PURE__ */ Object.create(null);
}
function q(e) {
  e.forEach(ie);
}
function se(e) {
  return typeof e == "function";
}
function pe(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
let F;
function _e(e, t) {
  return F || (F = document.createElement("a")), F.href = t, e === F.href;
}
function ve(e) {
  return Object.keys(e).length === 0;
}
function b(e, t) {
  e.appendChild(t);
}
function we(e, t, n) {
  const i = be(e);
  if (!i.getElementById(t)) {
    const s = N("style");
    s.id = t, s.textContent = n, ye(i, s);
  }
}
function be(e) {
  if (!e)
    return document;
  const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
  return t && t.host ? t : e.ownerDocument;
}
function ye(e, t) {
  return b(e.head || e, t), t.sheet;
}
function le(e, t, n) {
  e.insertBefore(t, n || null);
}
function A(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function N(e) {
  return document.createElement(e);
}
function H(e) {
  return document.createTextNode(e);
}
function L() {
  return H(" ");
}
function ke(e, t, n, i) {
  return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
}
function x(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function xe(e) {
  return Array.from(e.childNodes);
}
function Z(e, t) {
  t = "" + t, e.wholeText !== t && (e.data = t);
}
function Se(e, t, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  const s = document.createEvent("CustomEvent");
  return s.initCustomEvent(e, n, i, t), s;
}
let j;
function z(e) {
  j = e;
}
function ae() {
  if (!j)
    throw new Error("Function called outside component initialization");
  return j;
}
function Ce(e) {
  ae().$$.on_mount.push(e);
}
function Ee() {
  const e = ae();
  return (t, n, { cancelable: i = !1 } = {}) => {
    const s = e.$$.callbacks[t];
    if (s) {
      const r = Se(t, n, { cancelable: i });
      return s.slice().forEach((a) => {
        a.call(e, r);
      }), !r.defaultPrevented;
    }
    return !0;
  };
}
const D = [], W = [], O = [], $ = [], Ne = Promise.resolve();
let X = !1;
function Pe() {
  X || (X = !0, Ne.then(oe));
}
function Y(e) {
  O.push(e);
}
const V = /* @__PURE__ */ new Set();
let I = 0;
function oe() {
  if (I !== 0)
    return;
  const e = j;
  do {
    try {
      for (; I < D.length; ) {
        const t = D[I];
        I++, z(t), Te(t.$$);
      }
    } catch (t) {
      throw D.length = 0, I = 0, t;
    }
    for (z(null), D.length = 0, I = 0; W.length; )
      W.pop()();
    for (let t = 0; t < O.length; t += 1) {
      const n = O[t];
      V.has(n) || (V.add(n), n());
    }
    O.length = 0;
  } while (D.length);
  for (; $.length; )
    $.pop()();
  X = !1, V.clear(), z(e);
}
function Te(e) {
  if (e.fragment !== null) {
    e.update(), q(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(Y);
  }
}
const Be = /* @__PURE__ */ new Set();
function ce(e, t) {
  e && e.i && (Be.delete(e), e.i(t));
}
function Ie(e, t) {
  e.d(1), t.delete(e.key);
}
function De(e, t, n, i, s, r, a, f, y, h, w, _) {
  let g = e.length, o = r.length, u = g;
  const P = {};
  for (; u--; )
    P[e[u].key] = u;
  const v = [], T = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
  for (u = o; u--; ) {
    const l = _(s, r, u), d = n(l);
    let m = a.get(d);
    m ? i && m.p(l, t) : (m = h(d, l), m.c()), T.set(d, v[u] = m), d in P && k.set(d, Math.abs(u - P[d]));
  }
  const C = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set();
  function S(l) {
    ce(l, 1), l.m(f, w), a.set(l.key, l), w = l.first, o--;
  }
  for (; g && o; ) {
    const l = v[o - 1], d = e[g - 1], m = l.key, B = d.key;
    l === d ? (w = l.first, g--, o--) : T.has(B) ? !a.has(m) || C.has(m) ? S(l) : E.has(B) ? g-- : k.get(m) > k.get(B) ? (E.add(m), S(l)) : (C.add(B), g--) : (y(d, a), g--);
  }
  for (; g--; ) {
    const l = e[g];
    T.has(l.key) || y(l, a);
  }
  for (; o; )
    S(v[o - 1]);
  return v;
}
function He(e, t, n, i) {
  const { fragment: s, after_update: r } = e.$$;
  s && s.m(t, n), i || Y(() => {
    const a = e.$$.on_mount.map(ie).filter(se);
    e.$$.on_destroy ? e.$$.on_destroy.push(...a) : q(a), e.$$.on_mount = [];
  }), r.forEach(Y);
}
function ze(e, t) {
  const n = e.$$;
  n.fragment !== null && (q(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Me(e, t) {
  e.$$.dirty[0] === -1 && (D.push(e), Pe(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function je(e, t, n, i, s, r, a, f = [-1]) {
  const y = j;
  z(e);
  const h = e.$$ = {
    fragment: null,
    ctx: [],
    props: r,
    update: M,
    not_equal: s,
    bound: U(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (y ? y.$$.context : [])),
    callbacks: U(),
    dirty: f,
    skip_bound: !1,
    root: t.target || y.$$.root
  };
  a && a(h.root);
  let w = !1;
  if (h.ctx = n ? n(e, t.props || {}, (_, g, ...o) => {
    const u = o.length ? o[0] : g;
    return h.ctx && s(h.ctx[_], h.ctx[_] = u) && (!h.skip_bound && h.bound[_] && h.bound[_](u), w && Me(e, _)), g;
  }) : [], h.update(), w = !0, q(h.before_update), h.fragment = i ? i(h.ctx) : !1, t.target) {
    if (t.hydrate) {
      const _ = xe(t.target);
      h.fragment && h.fragment.l(_), _.forEach(A);
    } else
      h.fragment && h.fragment.c();
    t.intro && ce(e.$$.fragment), He(e, t.target, t.anchor, t.customElement), oe();
  }
  z(y);
}
class Fe {
  $destroy() {
    ze(this, 1), this.$destroy = M;
  }
  $on(t, n) {
    if (!se(n))
      return M;
    const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return i.push(n), () => {
      const s = i.indexOf(n);
      s !== -1 && i.splice(s, 1);
    };
  }
  $set(t) {
    this.$$set && !ve(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const Oe = (e) => e.replace(/<span class="sp-parent(.*?)><span class="sp-robot(.*?)<\/span><\/span>/g, "").replace(/<script\b[^>]*>[\s\S]*<\/script>/g, "").replace(/\s{2,}/g, "").replace(/[\r\n]/g, "").replace(/<img[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp/g, "&").replace(/&;/g, "&").replace(/<table(.*?)<\/table>/g, "").replace(/<style(.*?)<\/style>/g, "").replace(/表格支持左右滑动/g, "").replace(/<[^>]*[^/]>/gi, "").replace(/>{1,}/g, "").replace(/&gt;/g, "").replace(/_{2,}/g, ""), ee = (e, t) => {
  const n = [];
  let i = e.indexOf(t);
  for (; i > -1; )
    n.push(e.slice(0, i + 1)), e = e.slice(i + 1), i = e.indexOf(t);
  return e && n.push(e), n;
}, We = (e, t) => ee(e, "\u3002").map((n) => (n.indexOf("\uFF1B") > -1 && (n = ee(n, "\uFF1B")), n)).reduce((n, i) => (t(i) === "array" ? n = [...n, ...i] : n.push(i), n), []), qe = ({ strArr: e, clientNum: t, result: n, i }) => {
  let s = "";
  for (; e[i].length > t; )
    s = e[i].slice(0, t - 1), e[i] = e[i].slice(t - 1), s && n.push(s), s = "";
  return e[i + 1] ? e[i + 1] = e[i] + e[i + 1] : (s = e[i], s && n.push(s)), { strArr: e, result: n };
}, Re = ({ strArr: e, i: t, clientNum: n, result: i }) => {
  let s = "";
  if (s = e[t], (s + e[t + 1]).length < n)
    for (; s.length < n && e[t + 1]; )
      s = s + e[t + 1], t++;
  return s && i.push(s), { result: i, strArr: e, i: t };
}, Le = (e) => {
  const n = (a) => Object.prototype.toString.call(a).slice(8, -1).toLowerCase();
  let i = [], s = We(e, n);
  const r = 512;
  for (let a = 0; a < s.length; a++)
    if (s[a].length > r) {
      const f = qe({ strArr: s, clientNum: r, result: i, i: a });
      s = f.strArr, i = f.result;
    } else {
      const f = Re({ strArr: s, i: a, clientNum: r, result: i });
      s = f.strArr, i = f.result, a = f.i;
    }
  return i;
}, Ve = (e) => {
  const t = Oe(e);
  return {
    origniformatData: Le(t),
    dataLength: t.length
  };
};
function Xe(e) {
  we(e, "svelte-s4ai01", ".voice.svelte-s4ai01{width:90vw;margin:0.3rem 0.15rem;line-height:0.33rem}.voice-btn.svelte-s4ai01{display:flex;align-items:center;flex-shrink:0;padding:0.02rem 0.08rem;margin-right:0.08rem}.voice-btn-img.svelte-s4ai01{height:0.33rem !important;width:0.33rem !important;margin:0 0.08rem}.voice-btn-text.svelte-s4ai01{font-size:0.24rem}.voice-canvas.svelte-s4ai01{position:relative;display:flex;height:0.33rem;overflow:hidden;margin:0.06rem 0;flex:1}.voice-time.svelte-s4ai01{flex-shrink:0;padding:0 0.2rem}.container.svelte-s4ai01{display:flex;align-items:center;justify-content:space-between;border-radius:0.3rem;border-width:0.01rem;-webkit-box-pack:justify;border-style:solid;height:0.6rem}.light-bd.svelte-s4ai01{border-color:#f5f5f5}[theme-mode='black'] .light-bd.svelte-s4ai01{border-color:#202022}");
}
function te(e, t, n) {
  const i = e.slice();
  return i[30] = t[n], i[32] = n, i;
}
function ne(e, t) {
  let n, i, s;
  return {
    key: e,
    first: null,
    c() {
      n = N("img"), x(n, "class", "voice-btn-img svelte-s4ai01"), _e(n.src, i = t[30]) || x(n, "src", i), x(n, "alt", ""), x(n, "style", s = `display:${t[1] === t[32] ? "inline" : "none"}`), this.first = n;
    },
    m(r, a) {
      le(r, n, a);
    },
    p(r, a) {
      t = r, a[0] & 2 && s !== (s = `display:${t[1] === t[32] ? "inline" : "none"}`) && x(n, "style", s);
    },
    d(r) {
      r && A(n);
    }
  };
}
function Ye(e) {
  let t, n, i, s = [], r = /* @__PURE__ */ new Map(), a, f, y, h, w, _, g, o, u, P, v, T, k, C, E = e[5];
  const S = (l) => l[30];
  for (let l = 0; l < E.length; l += 1) {
    let d = te(e, E, l), m = S(d);
    r.set(m, s[l] = ne(m, d));
  }
  return {
    c() {
      t = N("div"), n = N("div"), i = N("div");
      for (let l = 0; l < s.length; l += 1)
        s[l].c();
      a = L(), f = N("div"), y = H(e[0]), h = L(), w = N("div"), _ = N("canvas"), g = L(), o = N("div"), u = N("div"), P = H("\u7EA6"), v = H(e[2]), T = H("\u5206\u949F"), x(f, "class", "voice-btn-text sub-text-gray svelte-s4ai01"), x(i, "class", "voice-btn svelte-s4ai01"), x(_, "id", "canvas"), x(w, "class", "voice-canvas svelte-s4ai01"), x(u, "class", "voice-btn-text sub-text-gray svelte-s4ai01"), x(o, "class", "voice-time svelte-s4ai01"), x(n, "class", "container light-bd svelte-s4ai01"), x(t, "class", "voice svelte-s4ai01");
    },
    m(l, d) {
      le(l, t, d), b(t, n), b(n, i);
      for (let m = 0; m < s.length; m += 1)
        s[m].m(i, null);
      b(i, a), b(i, f), b(f, y), b(n, h), b(n, w), b(w, _), e[12](_), e[13](w), b(n, g), b(n, o), b(o, u), b(u, P), b(u, v), b(u, T), k || (C = ke(t, "click", e[6]), k = !0);
    },
    p(l, d) {
      d[0] & 34 && (E = l[5], s = De(s, d, S, 1, l, E, r, i, Ie, ne, a, te)), d[0] & 1 && Z(y, l[0]), d[0] & 4 && Z(v, l[2]);
    },
    i: M,
    o: M,
    d(l) {
      l && A(t);
      for (let d = 0; d < s.length; d += 1)
        s[d].d();
      e[12](null), e[13](null), k = !1, C();
    }
  };
}
function Ae(e, t, n) {
  const i = Ee();
  let { seq: s = "" } = t, { title: r = "" } = t, { content: a = "" } = t, { statPageId: f = "" } = t, { btnText: y = "\u542C\u8D22\u7ECF" } = t;
  const h = [
    "//i.thsi.cn/webprivate/voicebroadcast/play.png",
    "//i.thsi.cn/webprivate/voicebroadcast/playN.png",
    "//i.thsi.cn/webprivate/voicebroadcast/pause.png",
    "//i.thsi.cn/webprivate/voicebroadcast/pauseN.png"
  ];
  let w = 2, _ = 1, g, o, u, P, v = !1, T, k = [
    5,
    7,
    5,
    11,
    7,
    5,
    7,
    9,
    11,
    7,
    9,
    5,
    7,
    5,
    3,
    7,
    5,
    7,
    3,
    9,
    7,
    11,
    7,
    5,
    7,
    3,
    9,
    7,
    5,
    9
  ], C = 0, E = 0, S = !1, l = 0;
  const d = () => {
    const c = window.devicePixelRatio || 1;
    u = o.getContext("2d"), n(4, o.style.width = `${g.offsetWidth}px`, o), n(4, o.style.height = `${g.offsetHeight}px`, o), n(4, o.width = g.offsetWidth * c, o), n(4, o.height = g.offsetHeight * c, o), C = o.width * (2 / (30 * 2 + 29 * 5)), E = o.width * (5 / (30 * 2 + 29 * 5.05)), k = k.map((p) => ({ volume: p, increase: p <= 7 })), m(!0);
  }, m = (c) => {
    u.clearRect(0, 0, o.width, o.height), k.forEach((p, R) => {
      const { volume: me } = p, J = o.height * (me / 17), K = R * (C + E) + C / 2 + 1, Q = (o.height - J) / 2;
      u.beginPath(), u.arc(K, Q, C / 2, 0, Math.PI, !0), u.arc(K, Q + J, C / 2, -Math.PI, 0, !0), u.fillStyle = window.getCssStyle() === "black" ? "rgba(253, 67, 50, .5)" : "rgba(233, 48, 48, .5)", u.fill();
    }), c || (k = k.map((p) => (p.increase ? p.volume += 0.3 : p.volume -= 0.3, p.volume >= 11 ? p.increase = !1 : p.volume <= 2 && (p.increase = !0), p)), T = window.requestAnimationFrame(m.bind(this, !1)));
  }, B = () => {
    window.cancelAnimationFrame(T);
  }, re = () => {
    v ? ue() : S ? de() : fe();
  }, fe = () => {
    window.callNativeHandler("zxVoiceBroadcast", {
      seq: s,
      title: r,
      state: 1,
      content: P
    });
  }, ue = () => {
    window.callNativeHandler("zxVoiceBroadcast", { seq: s, state: 2 });
  }, de = () => {
    window.callNativeHandler("zxVoiceBroadcast", { seq: s, state: 3 });
  }, G = (c) => {
    const p = () => (l || (l = +(window.localStorage.getItem(s) || 0)), { targid: `bt_${l}` });
    switch (c) {
      case 0:
        S = !1, v && (n(11, v = !1), i("onplayover"), B()), f && window.hxmClickStat(`${f}.over`, p());
        break;
      case 1:
        n(11, v = !0), S = !0, m(!1), i("ondisplay"), l = new Date().getTime(), window.localStorage.setItem(s, String(l)), f && window.hxmClickStat(`${f}.start`, p());
        break;
      case 2:
        n(11, v = !1), S = !0, B(), i("onpause"), f && window.hxmClickStat(`${f}.pause`, p());
        break;
      case 3:
        n(11, v = !0), S = !0, m(!1), i("oncontinue"), f && window.hxmClickStat(`${f}.continue`, p());
        break;
    }
  };
  Ce(() => {
    window.callNativeHandler("NotifyNativeEventToWeb", ""), window.registerWebHandler("NotifyNativeEventToWeb", (c) => {
      c.key === "zx_tts_stop" && G(+c.result.code);
    }), window.registerWebHandler("zxVoiceBroadcast", (c) => {
      G(+c.state);
    }), setTimeout(() => {
      d(), window.callNativeHandler("zxVoiceBroadcast", { seq: s, state: 4 }, () => {
      });
    });
  });
  function he(c) {
    W[c ? "unshift" : "push"](() => {
      o = c, n(4, o);
    });
  }
  function ge(c) {
    W[c ? "unshift" : "push"](() => {
      g = c, n(3, g);
    });
  }
  return e.$$set = (c) => {
    "seq" in c && n(7, s = c.seq), "title" in c && n(8, r = c.title), "content" in c && n(9, a = c.content), "statPageId" in c && n(10, f = c.statPageId), "btnText" in c && n(0, y = c.btnText);
  }, e.$$.update = () => {
    if (e.$$.dirty[0] & 2048 && (window.getCssStyle() === "black" ? n(1, w = v ? 3 : 1) : n(1, w = v ? 2 : 0)), e.$$.dirty[0] & 512) {
      const { dataLength: p, origniformatData: R } = Ve(a);
      P = R, n(2, _ = Math.ceil(p / 300));
    }
  }, [
    y,
    w,
    _,
    g,
    o,
    h,
    re,
    s,
    r,
    a,
    f,
    v,
    he,
    ge
  ];
}
class Ge extends Fe {
  constructor(t) {
    super(), je(
      this,
      t,
      Ae,
      Ye,
      pe,
      {
        seq: 7,
        title: 8,
        content: 9,
        statPageId: 10,
        btnText: 0
      },
      Xe,
      [-1, -1]
    );
  }
}
export {
  Ge as AudioComponent
};
