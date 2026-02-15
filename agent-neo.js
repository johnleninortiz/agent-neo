import { jsx as T, Fragment as xo, jsxs as W } from "react/jsx-runtime";
import * as Ie from "react";
import Ae, { createContext as Ut, useRef as G, useLayoutEffect as bo, useEffect as pt, useId as Mn, useContext as Z, useInsertionEffect as Dn, useMemo as Dt, useCallback as Ot, Children as wo, isValidElement as To, useState as q, Fragment as Ms, createElement as Pe, forwardRef as Rn, Component as So } from "react";
import { createRoot as Ao } from "react-dom/client";
const In = Ut({});
function Ln(t) {
  const e = G(null);
  return e.current === null && (e.current = t()), e.current;
}
const Ds = typeof window < "u", Rs = Ds ? bo : pt, Le = /* @__PURE__ */ Ut(null);
function On(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Bn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const dt = (t, e, n) => n > e ? e : n < t ? t : n;
let Fn = () => {
};
const gt = {}, Is = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function Ls(t) {
  return typeof t == "object" && t !== null;
}
const Os = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Nn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const lt = /* @__NO_SIDE_EFFECTS__ */ (t) => t, Po = (t, e) => (n) => e(t(n)), ce = (...t) => t.reduce(Po), ie = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class jn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return On(this.subscriptions, e), () => Bn(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let o = 0; o < s; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const mt = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, at = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function Bs(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Fs = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Co = 1e-7, ko = 12;
function Vo(t, e, n, i, s) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = Fs(r, i, s) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > Co && ++a < ko);
  return r;
}
function ue(t, e, n, i) {
  if (t === e && n === i)
    return lt;
  const s = (o) => Vo(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : Fs(s(o), e, i);
}
const Ns = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, js = (t) => (e) => 1 - t(1 - e), _s = /* @__PURE__ */ ue(0.33, 1.53, 0.69, 0.99), _n = /* @__PURE__ */ js(_s), $s = /* @__PURE__ */ Ns(_n), Us = (t) => (t *= 2) < 1 ? 0.5 * _n(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), $n = (t) => 1 - Math.sin(Math.acos(t)), Ks = js($n), Ws = Ns($n), Eo = /* @__PURE__ */ ue(0.42, 0, 1, 1), Mo = /* @__PURE__ */ ue(0, 0, 0.58, 1), zs = /* @__PURE__ */ ue(0.42, 0, 0.58, 1), Do = (t) => Array.isArray(t) && typeof t[0] != "number", Gs = (t) => Array.isArray(t) && typeof t[0] == "number", Ro = {
  linear: lt,
  easeIn: Eo,
  easeInOut: zs,
  easeOut: Mo,
  circIn: $n,
  circInOut: Ws,
  circOut: Ks,
  backIn: _n,
  backInOut: $s,
  backOut: _s,
  anticipate: Us
}, Io = (t) => typeof t == "string", di = (t) => {
  if (Gs(t)) {
    Fn(t.length === 4);
    const [e, n, i, s] = t;
    return ue(e, n, i, s);
  } else if (Io(t))
    return Ro[t];
  return t;
}, pe = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Lo(t, e) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    r.has(c) && (u.schedule(c), t()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, h = !1, d = !1) => {
      const p = d && s ? n : i;
      return h && r.add(c), p.has(c) || p.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      i.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, s) {
        o = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(l), n.clear(), s = !1, o && (o = !1, u.process(c));
    }
  };
  return u;
}
const Oo = 40;
function Ys(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = pe.reduce((y, S) => (y[S] = Lo(o), y), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: d, render: f, postRender: p } = r, g = () => {
    const y = gt.useManualTiming ? s.timestamp : performance.now();
    n = !1, gt.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(y - s.timestamp, Oo), 1)), s.timestamp = y, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), h.process(s), d.process(s), f.process(s), p.process(s), s.isProcessing = !1, n && e && (i = !1, t(g));
  }, v = () => {
    n = !0, i = !0, s.isProcessing || t(g);
  };
  return { schedule: pe.reduce((y, S) => {
    const P = r[S];
    return y[S] = (D, B = !1, A = !1) => (n || v(), P.schedule(D, B, A)), y;
  }, {}), cancel: (y) => {
    for (let S = 0; S < pe.length; S++)
      r[pe[S]].cancel(y);
  }, state: s, steps: r };
}
const { schedule: O, cancel: bt, state: H, steps: _e } = /* @__PURE__ */ Ys(typeof requestAnimationFrame < "u" ? requestAnimationFrame : lt, !0);
let be;
function Bo() {
  be = void 0;
}
const Q = {
  now: () => (be === void 0 && Q.set(H.isProcessing || gt.useManualTiming ? H.timestamp : performance.now()), be),
  set: (t) => {
    be = t, queueMicrotask(Bo);
  }
}, Hs = (t) => (e) => typeof e == "string" && e.startsWith(t), Xs = /* @__PURE__ */ Hs("--"), Fo = /* @__PURE__ */ Hs("var(--"), Un = (t) => Fo(t) ? No.test(t.split("/*")[0].trim()) : !1, No = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function fi(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const Kt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, se = {
  ...Kt,
  transform: (t) => dt(0, 1, t)
}, me = {
  ...Kt,
  default: 1
}, Qt = (t) => Math.round(t * 1e5) / 1e5, Kn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function jo(t) {
  return t == null;
}
const _o = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Wn = (t, e) => (n) => !!(typeof n == "string" && _o.test(n) && n.startsWith(t) || e && !jo(n) && Object.prototype.hasOwnProperty.call(n, e)), qs = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, o, r, a] = i.match(Kn);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, $o = (t) => dt(0, 255, t), $e = {
  ...Kt,
  transform: (t) => Math.round($o(t))
}, Vt = {
  test: /* @__PURE__ */ Wn("rgb", "red"),
  parse: /* @__PURE__ */ qs("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + $e.transform(t) + ", " + $e.transform(e) + ", " + $e.transform(n) + ", " + Qt(se.transform(i)) + ")"
};
function Uo(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const rn = {
  test: /* @__PURE__ */ Wn("#"),
  parse: Uo,
  transform: Vt.transform
}, he = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), vt = /* @__PURE__ */ he("deg"), ht = /* @__PURE__ */ he("%"), w = /* @__PURE__ */ he("px"), Ko = /* @__PURE__ */ he("vh"), Wo = /* @__PURE__ */ he("vw"), pi = {
  ...ht,
  parse: (t) => ht.parse(t) / 100,
  transform: (t) => ht.transform(t * 100)
}, Bt = {
  test: /* @__PURE__ */ Wn("hsl", "hue"),
  parse: /* @__PURE__ */ qs("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + ht.transform(Qt(e)) + ", " + ht.transform(Qt(n)) + ", " + Qt(se.transform(i)) + ")"
}, K = {
  test: (t) => Vt.test(t) || rn.test(t) || Bt.test(t),
  parse: (t) => Vt.test(t) ? Vt.parse(t) : Bt.test(t) ? Bt.parse(t) : rn.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Vt.transform(t) : Bt.transform(t),
  getAnimatableNone: (t) => {
    const e = K.parse(t);
    return e.alpha = 0, K.transform(e);
  }
}, zo = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Go(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Kn)?.length || 0) + (t.match(zo)?.length || 0) > 0;
}
const Zs = "number", Js = "color", Yo = "var", Ho = "var(", mi = "${}", Xo = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function re(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let o = 0;
  const a = e.replace(Xo, (l) => (K.test(l) ? (i.color.push(o), s.push(Js), n.push(K.parse(l))) : l.startsWith(Ho) ? (i.var.push(o), s.push(Yo), n.push(l)) : (i.number.push(o), s.push(Zs), n.push(parseFloat(l))), ++o, mi)).split(mi);
  return { values: n, split: a, indexes: i, types: s };
}
function Qs(t) {
  return re(t).values;
}
function tr(t) {
  const { split: e, types: n } = re(t), i = e.length;
  return (s) => {
    let o = "";
    for (let r = 0; r < i; r++)
      if (o += e[r], s[r] !== void 0) {
        const a = n[r];
        a === Zs ? o += Qt(s[r]) : a === Js ? o += K.transform(s[r]) : o += s[r];
      }
    return o;
  };
}
const qo = (t) => typeof t == "number" ? 0 : K.test(t) ? K.getAnimatableNone(t) : t;
function Zo(t) {
  const e = Qs(t);
  return tr(t)(e.map(qo));
}
const wt = {
  test: Go,
  parse: Qs,
  createTransformer: tr,
  getAnimatableNone: Zo
};
function Ue(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Jo({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, o = 0, r = 0;
  if (!e)
    s = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    s = Ue(l, a, t + 1 / 3), o = Ue(l, a, t), r = Ue(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: i
  };
}
function Ce(t, e) {
  return (n) => n > 0 ? e : t;
}
const j = (t, e, n) => t + (e - t) * n, Ke = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, Qo = [rn, Vt, Bt], ta = (t) => Qo.find((e) => e.test(t));
function gi(t) {
  const e = ta(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === Bt && (n = Jo(n)), n;
}
const yi = (t, e) => {
  const n = gi(t), i = gi(e);
  if (!n || !i)
    return Ce(t, e);
  const s = { ...n };
  return (o) => (s.red = Ke(n.red, i.red, o), s.green = Ke(n.green, i.green, o), s.blue = Ke(n.blue, i.blue, o), s.alpha = j(n.alpha, i.alpha, o), Vt.transform(s));
}, on = /* @__PURE__ */ new Set(["none", "hidden"]);
function ea(t, e) {
  return on.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function na(t, e) {
  return (n) => j(t, e, n);
}
function zn(t) {
  return typeof t == "number" ? na : typeof t == "string" ? Un(t) ? Ce : K.test(t) ? yi : ra : Array.isArray(t) ? er : typeof t == "object" ? K.test(t) ? yi : ia : Ce;
}
function er(t, e) {
  const n = [...t], i = n.length, s = t.map((o, r) => zn(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < i; r++)
      n[r] = s[r](o);
    return n;
  };
}
function ia(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = zn(t[s])(t[s], e[s]));
  return (s) => {
    for (const o in i)
      n[o] = i[o](s);
    return n;
  };
}
function sa(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const o = e.types[s], r = t.indexes[o][i[o]], a = t.values[r] ?? 0;
    n[s] = a, i[o]++;
  }
  return n;
}
const ra = (t, e) => {
  const n = wt.createTransformer(e), i = re(t), s = re(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? on.has(t) && !s.values.length || on.has(e) && !i.values.length ? ea(t, e) : ce(er(sa(i, s), s.values), n) : Ce(t, e);
};
function nr(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? j(t, e, n) : zn(t)(t, e);
}
const oa = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => O.update(e, n),
    stop: () => bt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => H.isProcessing ? H.timestamp : Q.now()
  };
}, ir = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < s; o++)
    i += Math.round(t(o / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, ke = 2e4;
function Gn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < ke; )
    e += n, i = t.next(e);
  return e >= ke ? 1 / 0 : e;
}
function aa(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(Gn(i), ke);
  return {
    type: "keyframes",
    ease: (o) => i.next(s * o).value / e,
    duration: /* @__PURE__ */ at(s)
  };
}
const la = 5;
function sr(t, e, n) {
  const i = Math.max(e - la, 0);
  return Bs(n - t(i), e - i);
}
const $ = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, We = 1e-3;
function ca({ duration: t = $.duration, bounce: e = $.bounce, velocity: n = $.velocity, mass: i = $.mass }) {
  let s, o, r = 1 - e;
  r = dt($.minDamping, $.maxDamping, r), t = dt($.minDuration, $.maxDuration, /* @__PURE__ */ at(t)), r < 1 ? (s = (u) => {
    const c = u * r, h = c * t, d = c - n, f = an(u, r), p = Math.exp(-h);
    return We - d / f * p;
  }, o = (u) => {
    const h = u * r * t, d = h * n + n, f = Math.pow(r, 2) * Math.pow(u, 2) * t, p = Math.exp(-h), g = an(Math.pow(u, 2), r);
    return (-s(u) + We > 0 ? -1 : 1) * ((d - f) * p) / g;
  }) : (s = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -We + c * h;
  }, o = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = ha(s, o, a);
  if (t = /* @__PURE__ */ mt(t), isNaN(l))
    return {
      stiffness: $.stiffness,
      damping: $.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(i * u),
      duration: t
    };
  }
}
const ua = 12;
function ha(t, e, n) {
  let i = n;
  for (let s = 1; s < ua; s++)
    i = i - t(i) / e(i);
  return i;
}
function an(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const da = ["duration", "bounce"], fa = ["stiffness", "damping", "mass"];
function vi(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function pa(t) {
  let e = {
    velocity: $.velocity,
    stiffness: $.stiffness,
    damping: $.damping,
    mass: $.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!vi(t, fa) && vi(t, da))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, o = 2 * dt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: $.mass,
        stiffness: s,
        damping: o
      };
    } else {
      const n = ca(t);
      e = {
        ...e,
        ...n,
        mass: $.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function Ve(t = $.visualDuration, e = $.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: h, velocity: d, isResolvedFromDuration: f } = pa({
    ...n,
    velocity: -/* @__PURE__ */ at(n.velocity || 0)
  }), p = d || 0, g = u / (2 * Math.sqrt(l * c)), v = r - o, m = /* @__PURE__ */ at(Math.sqrt(l / c)), x = Math.abs(v) < 5;
  i || (i = x ? $.restSpeed.granular : $.restSpeed.default), s || (s = x ? $.restDelta.granular : $.restDelta.default);
  let y;
  if (g < 1) {
    const P = an(m, g);
    y = (D) => {
      const B = Math.exp(-g * m * D);
      return r - B * ((p + g * m * v) / P * Math.sin(P * D) + v * Math.cos(P * D));
    };
  } else if (g === 1)
    y = (P) => r - Math.exp(-m * P) * (v + (p + m * v) * P);
  else {
    const P = m * Math.sqrt(g * g - 1);
    y = (D) => {
      const B = Math.exp(-g * m * D), A = Math.min(P * D, 300);
      return r - B * ((p + g * m * v) * Math.sinh(A) + P * v * Math.cosh(A)) / P;
    };
  }
  const S = {
    calculatedDuration: f && h || null,
    next: (P) => {
      const D = y(P);
      if (f)
        a.done = P >= h;
      else {
        let B = P === 0 ? p : 0;
        g < 1 && (B = P === 0 ? /* @__PURE__ */ mt(p) : sr(y, P, D));
        const A = Math.abs(B) <= i, M = Math.abs(r - D) <= s;
        a.done = A && M;
      }
      return a.value = a.done ? r : D, a;
    },
    toString: () => {
      const P = Math.min(Gn(S), ke), D = ir((B) => S.next(P * B).value, P, 30);
      return P + "ms " + D;
    },
    toTransition: () => {
    }
  };
  return S;
}
Ve.applyToOptions = (t) => {
  const e = aa(t, 100, Ve);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ mt(e.duration), t.type = "keyframes", t;
};
function ln({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, f = (A) => a !== void 0 && A < a || l !== void 0 && A > l, p = (A) => a === void 0 ? l : l === void 0 || Math.abs(a - A) < Math.abs(l - A) ? a : l;
  let g = n * e;
  const v = h + g, m = r === void 0 ? v : r(v);
  m !== v && (g = m - h);
  const x = (A) => -g * Math.exp(-A / i), y = (A) => m + x(A), S = (A) => {
    const M = x(A), U = y(A);
    d.done = Math.abs(M) <= u, d.value = d.done ? m : U;
  };
  let P, D;
  const B = (A) => {
    f(d.value) && (P = A, D = Ve({
      keyframes: [d.value, p(d.value)],
      velocity: sr(y, A, d.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return B(0), {
    calculatedDuration: null,
    next: (A) => {
      let M = !1;
      return !D && P === void 0 && (M = !0, S(A), B(A)), P !== void 0 && A >= P ? D.next(A - P) : (!M && S(A), d);
    }
  };
}
function ma(t, e, n) {
  const i = [], s = n || gt.mix || nr, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = s(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || lt : e;
      a = ce(l, a);
    }
    i.push(a);
  }
  return i;
}
function ga(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const o = t.length;
  if (Fn(o === e.length), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = ma(e, i, s), l = a.length, u = (c) => {
    if (r && c < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(c < t[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ ie(t[h], t[h + 1], c);
    return a[h](d);
  };
  return n ? (c) => u(dt(t[0], t[o - 1], c)) : u;
}
function ya(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ ie(0, e, i);
    t.push(j(n, 1, s));
  }
}
function va(t) {
  const e = [0];
  return ya(e, t.length - 1), e;
}
function xa(t, e) {
  return t.map((n) => n * e);
}
function ba(t, e) {
  return t.map(() => e || zs).splice(0, t.length - 1);
}
function te({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = Do(i) ? i.map(di) : di(i), o = {
    done: !1,
    value: e[0]
  }, r = xa(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : va(e),
    t
  ), a = ga(r, e, {
    ease: Array.isArray(s) ? s : ba(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
const wa = (t) => t !== null;
function Yn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const o = t.filter(wa), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || i === void 0 ? o[a] : i;
}
const Ta = {
  decay: ln,
  inertia: ln,
  tween: te,
  keyframes: te,
  spring: Ve
};
function rr(t) {
  typeof t.type == "string" && (t.type = Ta[t.type]);
}
class Hn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const Sa = (t) => t / 100;
class Xn extends Hn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== Q.now() && this.tick(Q.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    rr(e);
    const { type: n = te, repeat: i = 0, repeatDelay: s = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const l = n || te;
    l !== te && typeof a[0] != "number" && (this.mixKeyframes = ce(Sa, nr(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = Gn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: d, repeatDelay: f, type: p, onUpdate: g, finalKeyframe: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const m = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), x = this.playbackSpeed >= 0 ? m < 0 : m > s;
    this.currentTime = Math.max(m, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let y = this.currentTime, S = i;
    if (h) {
      const A = Math.min(this.currentTime, s) / a;
      let M = Math.floor(A), U = A % 1;
      !U && A >= 1 && (U = 1), U === 1 && M--, M = Math.min(M, h + 1), M % 2 && (d === "reverse" ? (U = 1 - U, f && (U -= f / a)) : d === "mirror" && (S = r)), y = dt(0, 1, U) * a;
    }
    const P = x ? { done: !1, value: c[0] } : S.next(y);
    o && (P.value = o(P.value));
    let { done: D } = P;
    !x && l !== null && (D = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const B = this.holdTime === null && (this.state === "finished" || this.state === "running" && D);
    return B && p !== ln && (P.value = Yn(c, this.options, v, this.speed)), g && g(P.value), B && this.finish(), P;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ at(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ at(e);
  }
  get time() {
    return /* @__PURE__ */ at(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ mt(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(Q.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ at(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = oa, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Q.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function Aa(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const Et = (t) => t * 180 / Math.PI, cn = (t) => {
  const e = Et(Math.atan2(t[1], t[0]));
  return un(e);
}, Pa = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: cn,
  rotateZ: cn,
  skewX: (t) => Et(Math.atan(t[1])),
  skewY: (t) => Et(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, un = (t) => (t = t % 360, t < 0 && (t += 360), t), xi = cn, bi = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), wi = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Ca = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: bi,
  scaleY: wi,
  scale: (t) => (bi(t) + wi(t)) / 2,
  rotateX: (t) => un(Et(Math.atan2(t[6], t[5]))),
  rotateY: (t) => un(Et(Math.atan2(-t[2], t[0]))),
  rotateZ: xi,
  rotate: xi,
  skewX: (t) => Et(Math.atan(t[4])),
  skewY: (t) => Et(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function hn(t) {
  return t.includes("scale") ? 1 : 0;
}
function dn(t, e) {
  if (!t || t === "none")
    return hn(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Ca, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = Pa, s = a;
  }
  if (!s)
    return hn(e);
  const o = i[e], r = s[1].split(",").map(Va);
  return typeof o == "function" ? o(r) : r[o];
}
const ka = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return dn(n, e);
};
function Va(t) {
  return parseFloat(t.trim());
}
const Wt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], zt = new Set(Wt), Ti = (t) => t === Kt || t === w, Ea = /* @__PURE__ */ new Set(["x", "y", "z"]), Ma = Wt.filter((t) => !Ea.has(t));
function Da(t) {
  const e = [];
  return Ma.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const xt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => dn(e, "x"),
  y: (t, { transform: e }) => dn(e, "y")
};
xt.translateX = xt.x;
xt.translateY = xt.y;
const Mt = /* @__PURE__ */ new Set();
let fn = !1, pn = !1, mn = !1;
function or() {
  if (pn) {
    const t = Array.from(Mt).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = Da(i);
      s.length && (n.set(i, s), i.render());
    }), t.forEach((i) => i.measureInitialState()), e.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([o, r]) => {
        i.getValue(o)?.set(r);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  pn = !1, fn = !1, Mt.forEach((t) => t.complete(mn)), Mt.clear();
}
function ar() {
  Mt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (pn = !0);
  });
}
function Ra() {
  mn = !0, ar(), or(), mn = !1;
}
class qn {
  constructor(e, n, i, s, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Mt.add(this), fn || (fn = !0, O.read(ar), O.resolveKeyframes(or))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const o = s?.get(), r = e[e.length - 1];
      if (o !== void 0)
        e[0] = o;
      else if (i && n) {
        const a = i.readValue(n, r);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = r), s && o === void 0 && s.set(e[0]);
    }
    Aa(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Mt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Mt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Ia = (t) => t.startsWith("--");
function La(t, e, n) {
  Ia(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const Oa = /* @__PURE__ */ Nn(() => window.ScrollTimeline !== void 0), Ba = {};
function Fa(t, e) {
  const n = /* @__PURE__ */ Nn(t);
  return () => Ba[e] ?? n();
}
const lr = /* @__PURE__ */ Fa(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Zt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Si = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Zt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Zt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Zt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Zt([0.33, 1.53, 0.69, 0.99])
};
function cr(t, e) {
  if (t)
    return typeof t == "function" ? lr() ? ir(t, e) : "ease-out" : Gs(t) ? Zt(t) : Array.isArray(t) ? t.map((n) => cr(n, e) || Si.easeOut) : Si[t];
}
function Na(t, e, n, { delay: i = 0, duration: s = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const h = cr(a, s);
  Array.isArray(h) && (c.easing = h);
  const d = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), t.animate(c, d);
}
function ur(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function ja({ type: t, ...e }) {
  return ur(t) && lr() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class _a extends Hn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, Fn(typeof e.type != "string");
    const u = ja(e);
    this.animation = Na(n, i, s, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = Yn(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : La(n, i, c), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const e = this.options?.element;
    !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ at(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ at(e);
  }
  get time() {
    return /* @__PURE__ */ at(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ mt(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Oa() ? (this.animation.timeline = e, lt) : n(this);
  }
}
const hr = {
  anticipate: Us,
  backInOut: $s,
  circInOut: Ws
};
function $a(t) {
  return t in hr;
}
function Ua(t) {
  typeof t.ease == "string" && $a(t.ease) && (t.ease = hr[t.ease]);
}
const ze = 10;
class Ka extends _a {
  constructor(e) {
    Ua(e), rr(e), super(e), e.startTime !== void 0 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: o, ...r } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Xn({
      ...r,
      autoplay: !1
    }), l = Math.max(ze, Q.now() - this.startTime), u = dt(0, ze, l - ze);
    n.setWithVelocity(a.sample(Math.max(0, l - u)).value, a.sample(l).value, u), a.stop();
  }
}
const Ai = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(wt.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Wa(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function za(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = Ai(s, e), a = Ai(o, e);
  return !r || !a ? !1 : Wa(t) || (n === "spring" || ur(n)) && i;
}
function gn(t) {
  t.duration = 0, t.type = "keyframes";
}
const Ga = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Ya = /* @__PURE__ */ Nn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Ha(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return Ya() && n && Ga.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && o !== 0 && r !== "inertia";
}
const Xa = 40;
class qa extends Hn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Q.now();
    const d = {
      autoplay: e,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: o,
      repeatType: r,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, f = c?.KeyframeResolver || qn;
    this.keyframeResolver = new f(a, (p, g, v) => this.onKeyframesResolved(p, g, d, !v), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = Q.now(), za(e, o, r, a) || ((gt.instantAnimations || !l) && c?.(Yn(e, i, n)), e[0] = e[e.length - 1], gn(i), i.repeat = 0);
    const d = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > Xa ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, f = !u && Ha(d), p = d.motionValue?.owner?.current, g = f ? new Ka({
      ...d,
      element: p
    }) : new Xn(d);
    g.finished.then(() => {
      this.notifyFinished();
    }).catch(lt), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Ra()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function dr(t, e, n, i = 0, s = 1) {
  const o = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), r = t.size, a = (r - 1) * i;
  return typeof n == "function" ? n(o, r) : s === 1 ? o * i : a - o * i;
}
const Za = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ja(t) {
  const e = Za.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function fr(t, e, n = 1) {
  const [i, s] = Ja(t);
  if (!i)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(i);
  if (o) {
    const r = o.trim();
    return Is(r) ? parseFloat(r) : r;
  }
  return Un(s) ? fr(s, e, n + 1) : s;
}
const Qa = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, tl = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), el = {
  type: "keyframes",
  duration: 0.8
}, nl = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, il = (t, { keyframes: e }) => e.length > 2 ? el : zt.has(t) ? t.startsWith("scale") ? tl(e[1]) : Qa : nl, sl = (t) => t !== null;
function rl(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter(sl), o = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[o];
}
function Zn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
function ol({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const Jn = (t, e, n, i = {}, s, o) => (r) => {
  const a = Zn(i, t) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ mt(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: o ? void 0 : s
  };
  ol(a) || Object.assign(c, il(t, c)), c.duration && (c.duration = /* @__PURE__ */ mt(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ mt(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (gn(c), c.delay === 0 && (h = !0)), (gt.instantAnimations || gt.skipAnimations || s?.shouldSkipAnimations) && (h = !0, gn(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !o && e.get() !== void 0) {
    const d = rl(c.keyframes, a);
    if (d !== void 0) {
      O.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Xn(c) : new qa(c);
};
function Pi(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Qn(t, e, n, i) {
  if (typeof e == "function") {
    const [s, o] = Pi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, o] = Pi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  return e;
}
function _t(t, e, n) {
  const i = t.getProps();
  return Qn(i, e, n !== void 0 ? n : i.custom, t);
}
const pr = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Wt
]), Ci = 30, al = (t) => !isNaN(parseFloat(t));
class ll {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = Q.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = Q.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = al(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new jn());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), O.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = Q.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Ci)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ci);
    return Bs(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function $t(t, e) {
  return new ll(t, e);
}
const yn = (t) => Array.isArray(t);
function cl(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, $t(n));
}
function ul(t) {
  return yn(t) ? t[t.length - 1] || 0 : t;
}
function hl(t, e) {
  const n = _t(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...o } = n || {};
  o = { ...o, ...i };
  for (const r in o) {
    const a = ul(o[r]);
    cl(t, r, a);
  }
}
const J = (t) => !!(t && t.getVelocity);
function dl(t) {
  return !!(J(t) && t.add);
}
function vn(t, e) {
  const n = t.getValue("willChange");
  if (dl(n))
    return n.add(e);
  if (!n && gt.WillChange) {
    const i = new gt.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function ti(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const fl = "framerAppearId", mr = "data-" + ti(fl);
function gr(t) {
  return t.props[mr];
}
function pl({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function yr(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  const l = o?.reduceMotion;
  i && (o = i);
  const u = [], c = s && t.animationState && t.animationState.getState()[s];
  for (const h in a) {
    const d = t.getValue(h, t.latestValues[h] ?? null), f = a[h];
    if (f === void 0 || c && pl(c, h))
      continue;
    const p = {
      delay: n,
      ...Zn(o || {}, h)
    }, g = d.get();
    if (g !== void 0 && !d.isAnimating && !Array.isArray(f) && f === g && !p.velocity)
      continue;
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const y = gr(t);
      if (y) {
        const S = window.MotionHandoffAnimation(y, h, O);
        S !== null && (p.startTime = S, v = !0);
      }
    }
    vn(t, h);
    const m = l ?? t.shouldReduceMotion;
    d.start(Jn(h, d, f, m && pr.has(h) ? { type: !1 } : p, t, v));
    const x = d.animation;
    x && u.push(x);
  }
  return r && Promise.all(u).then(() => {
    O.update(() => {
      r && hl(t, r);
    });
  }), u;
}
function xn(t, e, n = {}) {
  const i = _t(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(yr(t, i, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = s;
    return ml(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function ml(t, e, n = 0, i = 0, s = 0, o = 1, r) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(xn(l, e, {
      ...r,
      delay: n + (typeof i == "function" ? 0 : i) + dr(t.variantChildren, l, i, s, o)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function gl(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((o) => xn(t, o, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = xn(t, e, n);
  else {
    const s = typeof e == "function" ? _t(t, e, n.custom) : e;
    i = Promise.all(yr(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const yl = {
  test: (t) => t === "auto",
  parse: (t) => t
}, vr = (t) => (e) => e.test(t), xr = [Kt, w, ht, vt, Wo, Ko, yl], ki = (t) => xr.find(vr(t));
function vl(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Os(t) : !0;
}
const xl = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function bl(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(Kn) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let o = xl.has(e) ? 1 : 0;
  return i !== n && (o *= 100), e + "(" + o + s + ")";
}
const wl = /\b([a-z-]*)\(.*?\)/gu, bn = {
  ...wt,
  getAnimatableNone: (t) => {
    const e = t.match(wl);
    return e ? e.map(bl).join(" ") : t;
  }
}, Vi = {
  ...Kt,
  transform: Math.round
}, Tl = {
  rotate: vt,
  rotateX: vt,
  rotateY: vt,
  rotateZ: vt,
  scale: me,
  scaleX: me,
  scaleY: me,
  scaleZ: me,
  skew: vt,
  skewX: vt,
  skewY: vt,
  distance: w,
  translateX: w,
  translateY: w,
  translateZ: w,
  x: w,
  y: w,
  z: w,
  perspective: w,
  transformPerspective: w,
  opacity: se,
  originX: pi,
  originY: pi,
  originZ: w
}, ei = {
  // Border props
  borderWidth: w,
  borderTopWidth: w,
  borderRightWidth: w,
  borderBottomWidth: w,
  borderLeftWidth: w,
  borderRadius: w,
  borderTopLeftRadius: w,
  borderTopRightRadius: w,
  borderBottomRightRadius: w,
  borderBottomLeftRadius: w,
  // Positioning props
  width: w,
  maxWidth: w,
  height: w,
  maxHeight: w,
  top: w,
  right: w,
  bottom: w,
  left: w,
  inset: w,
  insetBlock: w,
  insetBlockStart: w,
  insetBlockEnd: w,
  insetInline: w,
  insetInlineStart: w,
  insetInlineEnd: w,
  // Spacing props
  padding: w,
  paddingTop: w,
  paddingRight: w,
  paddingBottom: w,
  paddingLeft: w,
  paddingBlock: w,
  paddingBlockStart: w,
  paddingBlockEnd: w,
  paddingInline: w,
  paddingInlineStart: w,
  paddingInlineEnd: w,
  margin: w,
  marginTop: w,
  marginRight: w,
  marginBottom: w,
  marginLeft: w,
  marginBlock: w,
  marginBlockStart: w,
  marginBlockEnd: w,
  marginInline: w,
  marginInlineStart: w,
  marginInlineEnd: w,
  // Typography
  fontSize: w,
  // Misc
  backgroundPositionX: w,
  backgroundPositionY: w,
  ...Tl,
  zIndex: Vi,
  // SVG
  fillOpacity: se,
  strokeOpacity: se,
  numOctaves: Vi
}, Sl = {
  ...ei,
  // Color props
  color: K,
  backgroundColor: K,
  outlineColor: K,
  fill: K,
  stroke: K,
  // Border props
  borderColor: K,
  borderTopColor: K,
  borderRightColor: K,
  borderBottomColor: K,
  borderLeftColor: K,
  filter: bn,
  WebkitFilter: bn
}, br = (t) => Sl[t];
function wr(t, e) {
  let n = br(t);
  return n !== bn && (n = wt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Al = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Pl(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const o = t[i];
    typeof o == "string" && !Al.has(o) && re(o).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const o of e)
      t[o] = wr(n, s);
}
class Cl extends qn {
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < e.length; c++) {
      let h = e[c];
      if (typeof h == "string" && (h = h.trim(), Un(h))) {
        const d = fr(h, n.current);
        d !== void 0 && (e[c] = d), c === e.length - 1 && (this.finalKeyframe = h);
      }
    }
    if (this.resolveNoneKeyframes(), !pr.has(i) || e.length !== 2)
      return;
    const [s, o] = e, r = ki(s), a = ki(o), l = fi(s), u = fi(o);
    if (l !== u && xt[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (r !== a)
      if (Ti(r) && Ti(a))
        for (let c = 0; c < e.length; c++) {
          const h = e[c];
          typeof h == "string" && (e[c] = parseFloat(h));
        }
      else xt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || vl(e[s])) && i.push(s);
    i.length && Pl(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = xt[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && e.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: i } = this;
    if (!e || !e.current)
      return;
    const s = e.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1, r = i[o];
    i[o] = xt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function kl(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const s = n?.[t] ?? i.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t).filter((i) => i != null);
}
const Tr = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function wn(t) {
  return Ls(t) && "offsetHeight" in t;
}
const { schedule: ni } = /* @__PURE__ */ Ys(queueMicrotask, !1), ut = {
  x: !1,
  y: !1
};
function Sr() {
  return ut.x || ut.y;
}
function Vl(t) {
  return t === "x" || t === "y" ? ut[t] ? null : (ut[t] = !0, () => {
    ut[t] = !1;
  }) : ut.x || ut.y ? null : (ut.x = ut.y = !0, () => {
    ut.x = ut.y = !1;
  });
}
function Ar(t, e) {
  const n = kl(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function Ei(t) {
  return !(t.pointerType === "touch" || Sr());
}
function El(t, e, n = {}) {
  const [i, s, o] = Ar(t, n), r = (a) => {
    if (!Ei(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      Ei(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", r, s);
  }), o;
}
const Pr = (t, e) => e ? t === e ? !0 : Pr(t, e.parentElement) : !1, ii = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Ml = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Dl(t) {
  return Ml.has(t.tagName) || t.isContentEditable === !0;
}
const Rl = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Il(t) {
  return Rl.has(t.tagName) || t.isContentEditable === !0;
}
const we = /* @__PURE__ */ new WeakSet();
function Mi(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Ge(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Ll = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = Mi(() => {
    if (we.has(n))
      return;
    Ge(n, "down");
    const s = Mi(() => {
      Ge(n, "up");
    }), o = () => Ge(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function Di(t) {
  return ii(t) && !Sr();
}
function Ol(t, e, n = {}) {
  const [i, s, o] = Ar(t, n), r = (a) => {
    const l = a.currentTarget;
    if (!Di(a))
      return;
    we.add(l);
    const u = e(l, a), c = (f, p) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", d), we.has(l) && we.delete(l), Di(f) && typeof u == "function" && u(f, { success: p });
    }, h = (f) => {
      c(f, l === window || l === document || n.useGlobalTarget || Pr(l, f.target));
    }, d = (f) => {
      c(f, !1);
    };
    window.addEventListener("pointerup", h, s), window.addEventListener("pointercancel", d, s);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, s), wn(a) && (a.addEventListener("focus", (u) => Ll(u, s)), !Dl(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function Cr(t) {
  return Ls(t) && "ownerSVGElement" in t;
}
function Bl(t) {
  return Cr(t) && t.tagName === "svg";
}
const Fl = [...xr, K, wt], Nl = (t) => Fl.find(vr(t)), Ri = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ft = () => ({
  x: Ri(),
  y: Ri()
}), Ii = () => ({ min: 0, max: 0 }), z = () => ({
  x: Ii(),
  y: Ii()
}), Tn = { current: null }, kr = { current: !1 }, jl = typeof window < "u";
function _l() {
  if (kr.current = !0, !!jl)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => Tn.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      Tn.current = !1;
}
const $l = /* @__PURE__ */ new WeakMap();
function Oe(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function oe(t) {
  return typeof t == "string" || Array.isArray(t);
}
const si = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], ri = ["initial", ...si];
function Be(t) {
  return Oe(t.animate) || ri.some((e) => oe(t[e]));
}
function Vr(t) {
  return !!(Be(t) || t.variants);
}
function Ul(t, e, n) {
  for (const i in e) {
    const s = e[i], o = n[i];
    if (J(s))
      t.addValue(i, s);
    else if (J(o))
      t.addValue(i, $t(s, { owner: t }));
    else if (o !== s)
      if (t.hasValue(i)) {
        const r = t.getValue(i);
        r.liveStyle === !0 ? r.jump(s) : r.hasAnimated || r.set(s);
      } else {
        const r = t.getStaticValue(i);
        t.addValue(i, $t(r !== void 0 ? r : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const Li = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Ee = {};
function Er(t) {
  Ee = t;
}
function Kl() {
  return Ee;
}
class Wl {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, skipAnimations: o, blockInitialAnimation: r, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = qn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = Q.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, O.render(this.render, !1, !0));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = { ...u }, this.initialValues = n.initial ? { ...u } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.skipAnimationsConfig = o, this.options = l, this.blockInitialAnimation = !!r, this.isControllingVariants = Be(n), this.isVariantNode = Vr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: h, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in d) {
      const p = d[f];
      u[f] !== void 0 && J(p) && p.set(u[f]);
    }
  }
  mount(e) {
    this.current = e, $l.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (kr.current || _l(), this.shouldReduceMotion = Tn.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), bt(this.notifyUpdate), bt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const i = zt.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && O.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    typeof window < "u" && window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in Ee) {
      const n = Ee[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
        const o = this.features[e];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : z();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < Li.length; i++) {
      const s = Li[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const o = "on" + s, r = e[o];
      r && (this.propEventSubscriptions[s] = this.on(s, r));
    }
    this.prevMotionValues = Ul(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const i = this.values.get(e);
    n !== i && (i && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let i = this.values.get(e);
    return i === void 0 && n !== void 0 && (i = $t(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (Is(i) || Os(i)) ? i = parseFloat(i) : !Nl(i) && wt.test(n) && (i = wr(e, n)), this.setBaseTarget(e, J(i) ? i.get() : i)), J(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const o = Qn(this.props, n, this.presenceContext?.custom);
      o && (i = o[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !J(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new jn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    ni.render(this.render);
  }
}
class Mr extends Wl {
  constructor() {
    super(...arguments), this.KeyframeResolver = Cl;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const i = e.style;
    return i ? i[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    delete n[e], delete i[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    J(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class Tt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function Dr({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function zl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Gl(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), i = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function Ye(t) {
  return t === void 0 || t === 1;
}
function Sn({ scale: t, scaleX: e, scaleY: n }) {
  return !Ye(t) || !Ye(e) || !Ye(n);
}
function kt(t) {
  return Sn(t) || Rr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function Rr(t) {
  return Oi(t.x) || Oi(t.y);
}
function Oi(t) {
  return t && t !== "0%";
}
function Me(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function Bi(t, e, n, i, s) {
  return s !== void 0 && (t = Me(t, s, i)), Me(t, n, i) + e;
}
function An(t, e = 0, n = 1, i, s) {
  t.min = Bi(t.min, e, n, i, s), t.max = Bi(t.max, e, n, i, s);
}
function Ir(t, { x: e, y: n }) {
  An(t.x, e.translate, e.scale, e.originPoint), An(t.y, n.translate, n.scale, n.originPoint);
}
const Fi = 0.999999999999, Ni = 1.0000000000001;
function Yl(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < s; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (i && o.options.layoutScroll && o.scroll && o !== o.root && jt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, Ir(t, r)), i && kt(o.latestValues) && jt(t, o.latestValues));
  }
  e.x < Ni && e.x > Fi && (e.x = 1), e.y < Ni && e.y > Fi && (e.y = 1);
}
function Nt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function ji(t, e, n, i, s = 0.5) {
  const o = j(t.min, t.max, s);
  An(t, e, n, o, i);
}
function jt(t, e) {
  ji(t.x, e.x, e.scaleX, e.scale, e.originX), ji(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function Lr(t, e) {
  return Dr(Gl(t.getBoundingClientRect(), e));
}
function Hl(t, e, n) {
  const i = Lr(t, n), { scroll: s } = e;
  return s && (Nt(i.x, s.offset.x), Nt(i.y, s.offset.y)), i;
}
const Xl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, ql = Wt.length;
function Zl(t, e, n) {
  let i = "", s = !0;
  for (let o = 0; o < ql; o++) {
    const r = Wt[o], a = t[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number")
      l = a === (r.startsWith("scale") ? 1 : 0);
    else {
      const u = parseFloat(a);
      l = r.startsWith("scale") ? u === 1 : u === 0;
    }
    if (!l || n) {
      const u = Tr(a, ei[r]);
      if (!l) {
        s = !1;
        const c = Xl[r] || r;
        i += `${c}(${u}) `;
      }
      n && (e[r] = u);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function oi(t, e, n) {
  const { style: i, vars: s, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (zt.has(l)) {
      r = !0;
      continue;
    } else if (Xs(l)) {
      s[l] = u;
      continue;
    } else {
      const c = Tr(u, ei[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : i[l] = c;
    }
  }
  if (e.transform || (r || n ? i.transform = Zl(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
function Or(t, { style: e, vars: n }, i, s) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  s?.applyProjectionStyles(o, i);
  for (r in n)
    o.setProperty(r, n[r]);
}
function _i(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Xt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (w.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = _i(t, e.target.x), i = _i(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, Jl = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = wt.parse(t);
    if (s.length > 5)
      return i;
    const o = wt.createTransformer(t), r = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + r] /= a, s[1 + r] /= l;
    const u = j(a, l, 0.5);
    return typeof s[2 + r] == "number" && (s[2 + r] /= u), typeof s[3 + r] == "number" && (s[3 + r] /= u), o(s);
  }
}, Pn = {
  borderRadius: {
    ...Xt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Xt,
  borderTopRightRadius: Xt,
  borderBottomLeftRadius: Xt,
  borderBottomRightRadius: Xt,
  boxShadow: Jl
};
function Br(t, { layout: e, layoutId: n }) {
  return zt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Pn[t] || t === "opacity");
}
function ai(t, e, n) {
  const i = t.style, s = e?.style, o = {};
  if (!i)
    return o;
  for (const r in i)
    (J(i[r]) || s && J(s[r]) || Br(r, t) || n?.getValue(r)?.liveStyle !== void 0) && (o[r] = i[r]);
  return o;
}
function Ql(t) {
  return window.getComputedStyle(t);
}
class tc extends Mr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Or;
  }
  readValueFromInstance(e, n) {
    if (zt.has(n))
      return this.projection?.isProjecting ? hn(n) : ka(e, n);
    {
      const i = Ql(e), s = (Xs(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Lr(e, n);
  }
  build(e, n, i) {
    oi(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return ai(e, n, i);
  }
}
const ec = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, nc = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ic(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const o = s ? ec : nc;
  t[o.offset] = `${-i}`, t[o.array] = `${e} ${n}`;
}
const sc = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Fr(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (oi(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: d } = t;
  h.transform && (d.transform = h.transform, delete h.transform), (d.transform || h.transformOrigin) && (d.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), d.transform && (d.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox);
  for (const f of sc)
    h[f] !== void 0 && (d[f] = h[f], delete h[f]);
  e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && ic(h, s, o, r, !1);
}
const Nr = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), jr = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function rc(t, e, n, i) {
  Or(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(Nr.has(s) ? s : ti(s), e.attrs[s]);
}
function _r(t, e, n) {
  const i = ai(t, e, n);
  for (const s in t)
    if (J(t[s]) || J(e[s])) {
      const o = Wt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[o] = t[s];
    }
  return i;
}
class oc extends Mr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = z;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (zt.has(n)) {
      const i = br(n);
      return i && i.default || 0;
    }
    return n = Nr.has(n) ? n : ti(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return _r(e, n, i);
  }
  build(e, n, i) {
    Fr(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    rc(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = jr(e.tagName), super.mount(e);
  }
}
const ac = ri.length;
function $r(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? $r(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < ac; n++) {
    const i = ri[n], s = t.props[i];
    (oe(s) || s === !1) && (e[i] = s);
  }
  return e;
}
function Ur(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
const lc = [...si].reverse(), cc = si.length;
function uc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => gl(t, n, i)));
}
function hc(t) {
  let e = uc(t), n = $i(), i = !0;
  const s = (l) => (u, c) => {
    const h = _t(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: d, transitionEnd: f, ...p } = h;
      u = { ...u, ...p, ...f };
    }
    return u;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: u } = t, c = $r(t.parent) || {}, h = [], d = /* @__PURE__ */ new Set();
    let f = {}, p = 1 / 0;
    for (let v = 0; v < cc; v++) {
      const m = lc[v], x = n[m], y = u[m] !== void 0 ? u[m] : c[m], S = oe(y), P = m === l ? x.isActive : null;
      P === !1 && (p = v);
      let D = y === c[m] && y !== u[m] && S;
      if (D && i && t.manuallyAnimateOnMount && (D = !1), x.protectedKeys = { ...f }, // If it isn't active and hasn't *just* been set as inactive
      !x.isActive && P === null || // If we didn't and don't have any defined prop for this animation type
      !y && !x.prevProp || // Or if the prop doesn't define an animation
      Oe(y) || typeof y == "boolean")
        continue;
      const B = dc(x.prevProp, y);
      let A = B || // If we're making this variant active, we want to always make it active
      m === l && x.isActive && !D && S || // If we removed a higher-priority variant (i is in reverse order)
      v > p && S, M = !1;
      const U = Array.isArray(y) ? y : [y];
      let it = U.reduce(s(m), {});
      P === !1 && (it = {});
      const { prevResolvedValues: yt = {} } = x, Gt = {
        ...yt,
        ...it
      }, Rt = (_) => {
        A = !0, d.has(_) && (M = !0, d.delete(_)), x.needsAnimating[_] = !0;
        const F = t.getValue(_);
        F && (F.liveStyle = !1);
      };
      for (const _ in Gt) {
        const F = it[_], rt = yt[_];
        if (f.hasOwnProperty(_))
          continue;
        let X = !1;
        yn(F) && yn(rt) ? X = !Ur(F, rt) : X = F !== rt, X ? F != null ? Rt(_) : d.add(_) : F !== void 0 && d.has(_) ? Rt(_) : x.protectedKeys[_] = !0;
      }
      x.prevProp = y, x.prevResolvedValues = it, x.isActive && (f = { ...f, ...it }), i && t.blockInitialAnimation && (A = !1);
      const It = D && B;
      A && (!It || M) && h.push(...U.map((_) => {
        const F = { type: m };
        if (typeof _ == "string" && i && !It && t.manuallyAnimateOnMount && t.parent) {
          const { parent: rt } = t, X = _t(rt, _);
          if (rt.enteringChildren && X) {
            const { delayChildren: et } = X.transition || {};
            F.delay = dr(rt.enteringChildren, t, et);
          }
        }
        return {
          animation: _,
          options: F
        };
      }));
    }
    if (d.size) {
      const v = {};
      if (typeof u.initial != "boolean") {
        const m = _t(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        m && m.transition && (v.transition = m.transition);
      }
      d.forEach((m) => {
        const x = t.getBaseTarget(m), y = t.getValue(m);
        y && (y.liveStyle = !0), v[m] = x ?? null;
      }), h.push({ animation: v });
    }
    let g = !!h.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (g = !1), i = !1, g ? e(h) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    t.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = r(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = $i();
    }
  };
}
function dc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Ur(e, t) : !1;
}
function Pt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function $i() {
  return {
    animate: Pt(!0),
    whileInView: Pt(),
    whileHover: Pt(),
    whileTap: Pt(),
    whileDrag: Pt(),
    whileFocus: Pt(),
    exit: Pt()
  };
}
function Ui(t, e) {
  t.min = e.min, t.max = e.max;
}
function ct(t, e) {
  Ui(t.x, e.x), Ui(t.y, e.y);
}
function Ki(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
const Kr = 1e-4, fc = 1 - Kr, pc = 1 + Kr, Wr = 0.01, mc = 0 - Wr, gc = 0 + Wr;
function tt(t) {
  return t.max - t.min;
}
function yc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Wi(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = j(e.min, e.max, t.origin), t.scale = tt(n) / tt(e), t.translate = j(n.min, n.max, t.origin) - t.originPoint, (t.scale >= fc && t.scale <= pc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= mc && t.translate <= gc || isNaN(t.translate)) && (t.translate = 0);
}
function ee(t, e, n, i) {
  Wi(t.x, e.x, n.x, i ? i.originX : void 0), Wi(t.y, e.y, n.y, i ? i.originY : void 0);
}
function zi(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + tt(e);
}
function vc(t, e, n) {
  zi(t.x, e.x, n.x), zi(t.y, e.y, n.y);
}
function Gi(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + tt(e);
}
function De(t, e, n) {
  Gi(t.x, e.x, n.x), Gi(t.y, e.y, n.y);
}
function Yi(t, e, n, i, s) {
  return t -= e, t = Me(t, 1 / n, i), s !== void 0 && (t = Me(t, 1 / s, i)), t;
}
function xc(t, e = 0, n = 1, i = 0.5, s, o = t, r = t) {
  if (ht.test(e) && (e = parseFloat(e), e = j(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = j(o.min, o.max, i);
  t === o && (a -= e), t.min = Yi(t.min, e, n, a, s), t.max = Yi(t.max, e, n, a, s);
}
function Hi(t, e, [n, i, s], o, r) {
  xc(t, e[n], e[i], e[s], e.scale, o, r);
}
const bc = ["x", "scaleX", "originX"], wc = ["y", "scaleY", "originY"];
function Xi(t, e, n, i) {
  Hi(t.x, e, bc, n ? n.x : void 0, i ? i.x : void 0), Hi(t.y, e, wc, n ? n.y : void 0, i ? i.y : void 0);
}
function qi(t) {
  return t.translate === 0 && t.scale === 1;
}
function zr(t) {
  return qi(t.x) && qi(t.y);
}
function Zi(t, e) {
  return t.min === e.min && t.max === e.max;
}
function Tc(t, e) {
  return Zi(t.x, e.x) && Zi(t.y, e.y);
}
function Ji(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function Gr(t, e) {
  return Ji(t.x, e.x) && Ji(t.y, e.y);
}
function Qi(t) {
  return tt(t.x) / tt(t.y);
}
function ts(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
function ot(t) {
  return [t("x"), t("y")];
}
function Sc(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((s || o || r) && (i = `translate3d(${s}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: d, skewX: f, skewY: p } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), h && (i += `rotateX(${h}deg) `), d && (i += `rotateY(${d}deg) `), f && (i += `skewX(${f}deg) `), p && (i += `skewY(${p}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const Yr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Ac = Yr.length, es = (t) => typeof t == "string" ? parseFloat(t) : t, ns = (t) => typeof t == "number" || w.test(t);
function Pc(t, e, n, i, s, o) {
  s ? (t.opacity = j(0, n.opacity ?? 1, Cc(i)), t.opacityExit = j(e.opacity ?? 1, 0, kc(i))) : o && (t.opacity = j(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let r = 0; r < Ac; r++) {
    const a = `border${Yr[r]}Radius`;
    let l = is(e, a), u = is(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || ns(l) === ns(u) ? (t[a] = Math.max(j(es(l), es(u), i), 0), (ht.test(u) || ht.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = j(e.rotate || 0, n.rotate || 0, i));
}
function is(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Cc = /* @__PURE__ */ Hr(0, 0.5, Ks), kc = /* @__PURE__ */ Hr(0.5, 0.95, lt);
function Hr(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ ie(t, e, i));
}
function Vc(t, e, n) {
  const i = J(t) ? t : $t(t);
  return i.start(Jn("", i, e, n)), i.animation;
}
function ae(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
const Ec = (t, e) => t.depth - e.depth;
class Mc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    On(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    Bn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Ec), this.isDirty = !1, this.children.forEach(e);
  }
}
function Dc(t, e) {
  const n = Q.now(), i = ({ timestamp: s }) => {
    const o = s - n;
    o >= e && (bt(i), t(o - e));
  };
  return O.setup(i, !0), () => bt(i);
}
function Te(t) {
  return J(t) ? t.get() : t;
}
class Rc {
  constructor() {
    this.members = [];
  }
  add(e) {
    On(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (Bn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((s) => e === s);
    if (n === 0)
      return !1;
    let i;
    for (let s = n; s >= 0; s--) {
      const o = this.members[s];
      if (o.isPresent !== !1) {
        i = o;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && (this.prevLead = i, this.lead = e, e.show(), i)) {
      i.instance && i.scheduleRender(), e.scheduleRender();
      const s = i.options.layoutDependency, o = e.options.layoutDependency;
      s !== void 0 && o !== void 0 && s === o || (e.resumeFrom = i, n && (e.resumeFrom.preserveOpacity = !0), i.snapshot && (e.snapshot = i.snapshot, e.snapshot.latestValues = i.animationValues || i.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      const { crossfade: a } = e.options;
      a === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: i } = e;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const Se = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, He = ["", "X", "Y", "Z"], Ic = 1e3;
let Lc = 0;
function Xe(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Xr(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = gr(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", O, !(s || o));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Xr(i);
}
function qr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = Lc++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Fc), this.nodes.forEach($c), this.nodes.forEach(Uc), this.nodes.forEach(Nc);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Mc());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new jn()), this.eventHandlers.get(r).add(a);
    }
    notifyListeners(r, ...a) {
      const l = this.eventHandlers.get(r);
      l && l.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r) {
      if (this.instance)
        return;
      this.isSVG = Cr(r) && !Bl(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, h = 0;
        const d = () => this.root.updateBlockedByResize = !1;
        O.read(() => {
          h = window.innerWidth;
        }), t(r, () => {
          const f = window.innerWidth;
          f !== h && (h = f, this.root.updateBlockedByResize = !0, c && c(), c = Dc(d, 250), Se.hasAnimatedSinceResize && (Se.hasAnimatedSinceResize = !1, this.nodes.forEach(os)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: d, layout: f }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const p = this.options.transition || u.getDefaultTransition() || Yc, { onLayoutAnimationStart: g, onLayoutAnimationComplete: v } = u.getProps(), m = !this.targetLayout || !Gr(this.targetLayout, f), x = !h && d;
        if (this.options.layoutRoot || this.resumeFrom || x || h && (m || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const y = {
            ...Zn(p, "layout"),
            onPlay: g,
            onComplete: v
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (y.delay = 0, y.type = !1), this.startAnimation(y), this.setAnimationOrigin(c, x);
        } else
          h || os(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = f;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), bt(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Kc), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Xr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ss);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(rs);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(_c), this.nodes.forEach(Oc), this.nodes.forEach(Bc)) : this.nodes.forEach(rs), this.clearAllSnapshots();
      const a = Q.now();
      H.delta = dt(0, 1e3 / 60, a - H.timestamp), H.timestamp = a, H.isProcessing = !0, _e.update.process(H), _e.preRender.process(H), _e.render.process(H), H.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, ni.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(jc), this.sharedNodes.forEach(Wc);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, O.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      O.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !tt(this.snapshot.measuredBox.x) && !tt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = z(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && this.instance) {
        const l = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !zr(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || kt(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), Hc(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return z();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Xc))) {
        const { scroll: u } = this.root;
        u && (Nt(a.x, u.offset.x), Nt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = z();
      if (ct(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && ct(a, r), Nt(a.x, c.offset.x), Nt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = z();
      ct(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && jt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), kt(c.latestValues) && jt(l, c.latestValues);
      }
      return kt(this.latestValues) && jt(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = z();
      ct(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !kt(u.latestValues))
          continue;
        Sn(u.latestValues) && u.updateSnapshot();
        const c = z(), h = u.measurePageBox();
        ct(c, h), Xi(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return kt(this.latestValues) && Xi(a, this.latestValues), a;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== H.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: h } = this.options;
      if (!this.layout || !(c || h))
        return;
      this.resolvedRelativeTargetAt = H.timestamp;
      const d = this.getClosestProjectingParent();
      d && this.linkedParentVersion !== d.layoutVersion && !d.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (d && d.layout ? this.createRelativeTarget(d, this.layout.layoutBox, d.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = z(), this.targetWithTransforms = z()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), vc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : ct(this.target, this.layout.layoutBox), Ir(this.target, this.targetDelta)) : ct(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? this.createRelativeTarget(d, this.target, d.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Sn(this.parent.latestValues) || Rr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(r, a, l) {
      this.relativeParent = r, this.linkedParentVersion = r.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = z(), this.relativeTargetOrigin = z(), De(this.relativeTargetOrigin, a, l), ct(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const r = this.getLead(), a = !!this.resumingFrom || this !== r;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === H.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      ct(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, d = this.treeScale.y;
      Yl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = z());
      const { target: f } = r;
      if (!f) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ki(this.prevProjectionDelta.x, this.projectionDelta.x), Ki(this.prevProjectionDelta.y, this.projectionDelta.y)), ee(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== d || !ts(this.projectionDelta.x, this.prevProjectionDelta.x) || !ts(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.visualElement?.scheduleRender(), r) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Ft(), this.projectionDelta = Ft(), this.projectionDeltaWithTransform = Ft();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = Ft();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = z(), f = l ? l.source : void 0, p = this.layout ? this.layout.source : void 0, g = f !== p, v = this.getStack(), m = !v || v.members.length <= 1, x = !!(g && !m && this.options.crossfade === !0 && !this.path.some(Gc));
      this.animationProgress = 0;
      let y;
      this.mixTargetDelta = (S) => {
        const P = S / 1e3;
        as(h.x, r.x, P), as(h.y, r.y, P), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (De(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), zc(this.relativeTarget, this.relativeTargetOrigin, d, P), y && Tc(this.relativeTarget, y) && (this.isProjectionDirty = !1), y || (y = z()), ct(y, this.relativeTarget)), g && (this.animationValues = c, Pc(c, u, this.latestValues, P, x, m)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = P;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (bt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = O.update(() => {
        Se.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = $t(0)), this.currentAnimation = Vc(this.motionValue, [0, 1e3], {
          ...r,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Ic), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && Zr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || z();
          const h = tt(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const d = tt(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + d;
        }
        ct(a, l), jt(a, c), ee(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new Rc()), this.sharedNodes.get(r).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), r && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let a = !1;
      const { latestValues: l } = r;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && Xe("z", r, u, this.animationValues);
      for (let c = 0; c < He.length; c++)
        Xe(`rotate${He[c]}`, r, u, this.animationValues), Xe(`skew${He[c]}`, r, u, this.animationValues);
      r.render();
      for (const c in u)
        r.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      r.scheduleRender();
    }
    applyProjectionStyles(r, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = Te(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = Te(a?.pointerEvents) || ""), this.hasProjected && !kt(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = Sc(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), r.transform = h;
      const { x: d, y: f } = this.projectionDelta;
      r.transformOrigin = `${d.origin * 100}% ${f.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const p in Pn) {
        if (c[p] === void 0)
          continue;
        const { correct: g, applyTo: v, isCSSVariable: m } = Pn[p], x = h === "none" ? c[p] : g(c[p], u);
        if (v) {
          const y = v.length;
          for (let S = 0; S < y; S++)
            r[v[S]] = x;
        } else
          m ? this.options.visualElement.renderState.vars[p] = x : r[p] = x;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? Te(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(ss), this.root.sharedNodes.clear();
    }
  };
}
function Oc(t) {
  t.updateLayout();
}
function Bc(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, o = e.source !== t.layout.source;
    s === "size" ? ot((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], d = tt(h);
      h.min = n[c].min, h.max = h.min + d;
    }) : Zr(s, e.layoutBox, n) && ot((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], d = tt(n[c]);
      h.max = h.min + d, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + d);
    });
    const r = Ft();
    ee(r, n, e.layoutBox);
    const a = Ft();
    o ? ee(a, t.applyTransform(i, !0), e.measuredBox) : ee(a, n, e.layoutBox);
    const l = !zr(r);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: d } = c;
        if (h && d) {
          const f = z();
          De(f, e.layoutBox, h.layoutBox);
          const p = z();
          De(p, n, d.layoutBox), Gr(f, p) || (u = !0), c.options.layoutRoot && (t.relativeTarget = p, t.relativeTargetOrigin = f, t.relativeParent = c);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function Fc(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Nc(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function jc(t) {
  t.clearSnapshot();
}
function ss(t) {
  t.clearMeasurements();
}
function rs(t) {
  t.isLayoutDirty = !1;
}
function _c(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function os(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function $c(t) {
  t.resolveTargetDelta();
}
function Uc(t) {
  t.calcProjection();
}
function Kc(t) {
  t.resetSkewAndRotation();
}
function Wc(t) {
  t.removeLeadSnapshot();
}
function as(t, e, n) {
  t.translate = j(e.translate, 0, n), t.scale = j(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function ls(t, e, n, i) {
  t.min = j(e.min, n.min, i), t.max = j(e.max, n.max, i);
}
function zc(t, e, n, i) {
  ls(t.x, e.x, n.x, i), ls(t.y, e.y, n.y, i);
}
function Gc(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Yc = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, cs = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), us = cs("applewebkit/") && !cs("chrome/") ? Math.round : lt;
function hs(t) {
  t.min = us(t.min), t.max = us(t.max);
}
function Hc(t) {
  hs(t.x), hs(t.y);
}
function Zr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !yc(Qi(e), Qi(n), 0.2);
}
function Xc(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const qc = qr({
  attachResizeListener: (t, e) => ae(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), qe = {
  current: void 0
}, Jr = qr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!qe.current) {
      const t = new qc({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), qe.current = t;
    }
    return qe.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), li = Ut({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function ds(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function Zc(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const o = ds(s, e);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const o = i[s];
          typeof o == "function" ? o() : ds(t[s], null);
        }
      };
  };
}
function Jc(...t) {
  return Ie.useCallback(Zc(...t), t);
}
class Qc extends Ie.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = wn(i) && i.offsetWidth || 0, o = wn(i) && i.offsetHeight || 0, r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft, r.right = s - r.width - r.left, r.bottom = o - r.height - r.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function tu({ children: t, isPresent: e, anchorX: n, anchorY: i, root: s }) {
  const o = Mn(), r = G(null), a = G({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: l } = Z(li), u = t.props?.ref ?? t?.ref, c = Jc(r, u);
  return Dn(() => {
    const { width: h, height: d, top: f, left: p, right: g, bottom: v } = a.current;
    if (e || !r.current || !h || !d)
      return;
    const m = n === "left" ? `left: ${p}` : `right: ${g}`, x = i === "bottom" ? `bottom: ${v}` : `top: ${f}`;
    r.current.dataset.motionPopId = o;
    const y = document.createElement("style");
    l && (y.nonce = l);
    const S = s ?? document.head;
    return S.appendChild(y), y.sheet && y.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${h}px !important;
            height: ${d}px !important;
            ${m}px !important;
            ${x}px !important;
          }
        `), () => {
      S.contains(y) && S.removeChild(y);
    };
  }, [e]), T(Qc, { isPresent: e, childRef: r, sizeRef: a, children: Ie.cloneElement(t, { ref: c }) });
}
const eu = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: o, mode: r, anchorX: a, anchorY: l, root: u }) => {
  const c = Ln(nu), h = Mn();
  let d = !0, f = Dt(() => (d = !1, {
    id: h,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (p) => {
      c.set(p, !0);
      for (const g of c.values())
        if (!g)
          return;
      i && i();
    },
    register: (p) => (c.set(p, !1), () => c.delete(p))
  }), [n, c, i]);
  return o && d && (f = { ...f }), Dt(() => {
    c.forEach((p, g) => c.set(g, !1));
  }, [n]), Ie.useEffect(() => {
    !n && !c.size && i && i();
  }, [n]), r === "popLayout" && (t = T(tu, { isPresent: n, anchorX: a, anchorY: l, root: u, children: t })), T(Le.Provider, { value: f, children: t });
};
function nu() {
  return /* @__PURE__ */ new Map();
}
function Qr(t = !0) {
  const e = Z(Le);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, o = Mn();
  pt(() => {
    if (t)
      return s(o);
  }, [t]);
  const r = Ot(() => t && i && i(o), [o, i, t]);
  return !n && i ? [!1, r] : [!0];
}
const ge = (t) => t.key || "";
function fs(t) {
  const e = [];
  return wo.forEach(t, (n) => {
    To(n) && e.push(n);
  }), e;
}
const Cn = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: o = "sync", propagate: r = !1, anchorX: a = "left", anchorY: l = "top", root: u }) => {
  const [c, h] = Qr(r), d = Dt(() => fs(t), [t]), f = r && !c ? [] : d.map(ge), p = G(!0), g = G(d), v = Ln(() => /* @__PURE__ */ new Map()), m = G(/* @__PURE__ */ new Set()), [x, y] = q(d), [S, P] = q(d);
  Rs(() => {
    p.current = !1, g.current = d;
    for (let A = 0; A < S.length; A++) {
      const M = ge(S[A]);
      f.includes(M) ? (v.delete(M), m.current.delete(M)) : v.get(M) !== !0 && v.set(M, !1);
    }
  }, [S, f.length, f.join("-")]);
  const D = [];
  if (d !== x) {
    let A = [...d];
    for (let M = 0; M < S.length; M++) {
      const U = S[M], it = ge(U);
      f.includes(it) || (A.splice(M, 0, U), D.push(U));
    }
    return o === "wait" && D.length && (A = D), P(fs(A)), y(d), null;
  }
  const { forceRender: B } = Z(In);
  return T(xo, { children: S.map((A) => {
    const M = ge(A), U = r && !c ? !1 : d === S || f.includes(M), it = () => {
      if (m.current.has(M))
        return;
      if (m.current.add(M), v.has(M))
        v.set(M, !0);
      else
        return;
      let yt = !0;
      v.forEach((Gt) => {
        Gt || (yt = !1);
      }), yt && (B?.(), P(g.current), r && h?.(), i && i());
    };
    return T(eu, { isPresent: U, initial: !p.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: o, root: u, onExitComplete: U ? void 0 : it, anchorX: a, anchorY: l, children: A }, M);
  }) });
}, to = Ut({ strict: !1 }), ps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let ms = !1;
function iu() {
  if (ms)
    return;
  const t = {};
  for (const e in ps)
    t[e] = {
      isEnabled: (n) => ps[e].some((i) => !!n[i])
    };
  Er(t), ms = !0;
}
function eo() {
  return iu(), Kl();
}
function su(t) {
  const e = eo();
  for (const n in t)
    e[n] = {
      ...e[n],
      ...t[n]
    };
  Er(e);
}
const ru = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function Re(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || ru.has(t);
}
let no = (t) => !Re(t);
function ou(t) {
  typeof t == "function" && (no = (e) => e.startsWith("on") ? !Re(e) : t(e));
}
try {
  ou(require("@emotion/is-prop-valid").default);
} catch {
}
function au(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (no(s) || n === !0 && Re(s) || !e && !Re(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const Fe = /* @__PURE__ */ Ut({});
function lu(t, e) {
  if (Be(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || oe(n) ? n : void 0,
      animate: oe(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function cu(t) {
  const { initial: e, animate: n } = lu(t, Z(Fe));
  return Dt(() => ({ initial: e, animate: n }), [gs(e), gs(n)]);
}
function gs(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const ci = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function io(t, e, n) {
  for (const i in e)
    !J(e[i]) && !Br(i, n) && (t[i] = e[i]);
}
function uu({ transformTemplate: t }, e) {
  return Dt(() => {
    const n = ci();
    return oi(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function hu(t, e) {
  const n = t.style || {}, i = {};
  return io(i, n, t), Object.assign(i, uu(t, e)), i;
}
function du(t, e) {
  const n = {}, i = hu(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const so = () => ({
  ...ci(),
  attrs: {}
});
function fu(t, e, n, i) {
  const s = Dt(() => {
    const o = so();
    return Fr(o, e, jr(i), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    io(o, t.style, t), s.style = { ...o, ...s.style };
  }
  return s;
}
const pu = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function ui(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(pu.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function mu(t, e, n, { latestValues: i }, s, o = !1, r) {
  const l = (r ?? ui(t) ? fu : du)(e, i, s, t), u = au(e, typeof t == "string", o), c = t !== Ms ? { ...u, ...l, ref: n } : {}, { children: h } = e, d = Dt(() => J(h) ? h.get() : h, [h]);
  return Pe(t, {
    ...c,
    children: d
  });
}
function gu({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: yu(n, i, s, t),
    renderState: e()
  };
}
function yu(t, e, n, i) {
  const s = {}, o = i(t, {});
  for (const d in o)
    s[d] = Te(o[d]);
  let { initial: r, animate: a } = t;
  const l = Be(t), u = Vr(t);
  e && u && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const h = c ? a : r;
  if (h && typeof h != "boolean" && !Oe(h)) {
    const d = Array.isArray(h) ? h : [h];
    for (let f = 0; f < d.length; f++) {
      const p = Qn(t, d[f]);
      if (p) {
        const { transitionEnd: g, transition: v, ...m } = p;
        for (const x in m) {
          let y = m[x];
          if (Array.isArray(y)) {
            const S = c ? y.length - 1 : 0;
            y = y[S];
          }
          y !== null && (s[x] = y);
        }
        for (const x in g)
          s[x] = g[x];
      }
    }
  }
  return s;
}
const ro = (t) => (e, n) => {
  const i = Z(Fe), s = Z(Le), o = () => gu(t, e, i, s);
  return n ? o() : Ln(o);
}, vu = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: ai,
  createRenderState: ci
}), xu = /* @__PURE__ */ ro({
  scrapeMotionValuesFromProps: _r,
  createRenderState: so
}), bu = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function wu(t, e, n) {
  const i = G(n);
  Dn(() => {
    i.current = n;
  });
  const s = G(null);
  return Ot((o) => {
    o && t.onMount?.(o), e && (o ? e.mount(o) : e.unmount());
    const r = i.current;
    if (typeof r == "function")
      if (o) {
        const a = r(o);
        typeof a == "function" && (s.current = a);
      } else s.current ? (s.current(), s.current = null) : r(o);
    else r && (r.current = o);
  }, [e]);
}
const oo = Ut({});
function Jt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Tu(t, e, n, i, s, o) {
  const { visualElement: r } = Z(Fe), a = Z(to), l = Z(Le), u = Z(li), c = u.reducedMotion, h = u.skipAnimations, d = G(null), f = G(!1);
  i = i || a.renderer, !d.current && i && (d.current = i(t, {
    visualState: e,
    parent: r,
    props: n,
    presenceContext: l,
    blockInitialAnimation: l ? l.initial === !1 : !1,
    reducedMotionConfig: c,
    skipAnimations: h,
    isSVG: o
  }), f.current && d.current && (d.current.manuallyAnimateOnMount = !0));
  const p = d.current, g = Z(oo);
  p && !p.projection && s && (p.type === "html" || p.type === "svg") && Su(d.current, n, s, g);
  const v = G(!1);
  Dn(() => {
    p && v.current && p.update(n, l);
  });
  const m = n[mr], x = G(!!m && !window.MotionHandoffIsComplete?.(m) && window.MotionHasOptimisedAnimation?.(m));
  return Rs(() => {
    f.current = !0, p && (v.current = !0, window.MotionIsMounted = !0, p.updateFeatures(), p.scheduleRenderMicrotask(), x.current && p.animationState && p.animationState.animateChanges());
  }), pt(() => {
    p && (!x.current && p.animationState && p.animationState.animateChanges(), x.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(m);
    }), x.current = !1), p.enteringChildren = void 0);
  }), p;
}
function Su(t, e, n, i) {
  const { layoutId: s, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : ao(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: o,
    alwaysMeasureLayout: !!r || a && Jt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: i,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function ao(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : ao(t.parent);
}
function Ze(t, { forwardMotionProps: e = !1, type: n } = {}, i, s) {
  i && su(i);
  const o = n ? n === "svg" : ui(t), r = o ? xu : vu;
  function a(u, c) {
    let h;
    const d = {
      ...Z(li),
      ...u,
      layoutId: Au(u)
    }, { isStatic: f } = d, p = cu(u), g = r(u, f);
    if (!f && Ds) {
      Pu();
      const v = Cu(d);
      h = v.MeasureLayout, p.visualElement = Tu(t, g, d, s, v.ProjectionNode, o);
    }
    return W(Fe.Provider, { value: p, children: [h && p.visualElement ? T(h, { visualElement: p.visualElement, ...d }) : null, mu(t, u, wu(g, p.visualElement, c), g, f, e, o)] });
  }
  a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const l = Rn(a);
  return l[bu] = t, l;
}
function Au({ layoutId: t }) {
  const e = Z(In).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Pu(t, e) {
  Z(to).strict;
}
function Cu(t) {
  const e = eo(), { drag: n, layout: i } = e;
  if (!n && !i)
    return {};
  const s = { ...n, ...i };
  return {
    MeasureLayout: n?.isEnabled(t) || i?.isEnabled(t) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
function ku(t, e) {
  if (typeof Proxy > "u")
    return Ze;
  const n = /* @__PURE__ */ new Map(), i = (o, r) => Ze(o, r, t, e), s = (o, r) => i(o, r);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? i : (n.has(r) || n.set(r, Ze(r, void 0, t, e)), n.get(r))
  });
}
const Vu = (t, e) => e.isSVG ?? ui(t) ? new oc(e) : new tc(e, {
  allowProjection: t !== Ms
});
class Eu extends Tt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = hc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Oe(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Mu = 0;
class Du extends Tt {
  constructor() {
    super(...arguments), this.id = Mu++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    const s = this.node.animationState.setActive("exit", !e);
    n && !e && s.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const Ru = {
  animation: {
    Feature: Eu
  },
  exit: {
    Feature: Du
  }
};
function de(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const Iu = (t) => (e) => ii(e) && t(e, de(e));
function ne(t, e, n, i) {
  return ae(t, e, Iu(n), i);
}
const lo = ({ current: t }) => t ? t.ownerDocument.defaultView : null, ys = (t, e) => Math.abs(t - e);
function Lu(t, e) {
  const n = ys(t.x, e.x), i = ys(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
const vs = /* @__PURE__ */ new Set(["auto", "scroll"]);
class co {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (f) => {
      this.handleScroll(f.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = Qe(this.lastMoveEventInfo, this.history), p = this.startEvent !== null, g = Lu(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!p && !g)
        return;
      const { point: v } = f, { timestamp: m } = H;
      this.history.push({ ...v, timestamp: m });
      const { onStart: x, onMove: y } = this.handlers;
      p || (x && x(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), y && y(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, p) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Je(p, this.transformPagePoint), O.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, p) => {
      this.end();
      const { onEnd: g, onSessionEnd: v, resumeAnimation: m } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && m && m(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const x = Qe(f.type === "pointercancel" ? this.lastMoveEventInfo : Je(p, this.transformPagePoint), this.history);
      this.startEvent && g && g(f, x), v && v(f, x);
    }, !ii(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = s || window;
    const l = de(e), u = Je(l, this.transformPagePoint), { point: c } = u, { timestamp: h } = H;
    this.history = [{ ...c, timestamp: h }];
    const { onSessionStart: d } = n;
    d && d(e, Qe(u, this.history)), this.removeListeners = ce(ne(this.contextWindow, "pointermove", this.handlePointerMove), ne(this.contextWindow, "pointerup", this.handlePointerUp), ne(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let n = e.parentElement;
    for (; n; ) {
      const i = getComputedStyle(n);
      (vs.has(i.overflowX) || vs.has(i.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0,
      passive: !0
    }), window.addEventListener("scroll", this.onWindowScroll, {
      passive: !0
    }), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const n = this.scrollPositions.get(e);
    if (!n)
      return;
    const i = e === window, s = i ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, o = { x: s.x - n.x, y: s.y - n.y };
    o.x === 0 && o.y === 0 || (i ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += o.x, this.lastMoveEventInfo.point.y += o.y) : this.history.length > 0 && (this.history[0].x -= o.x, this.history[0].y -= o.y), this.scrollPositions.set(e, s), O.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), bt(this.updatePoint);
  }
}
function Je(t, e) {
  return e ? { point: e(t.point) } : t;
}
function xs(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Qe({ point: t }, e) {
  return {
    point: t,
    delta: xs(t, uo(e)),
    offset: xs(t, Ou(e)),
    velocity: Bu(e, 0.1)
  };
}
function Ou(t) {
  return t[0];
}
function uo(t) {
  return t[t.length - 1];
}
function Bu(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = uo(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ mt(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ at(s.timestamp - i.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (s.x - i.x) / o,
    y: (s.y - i.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function Fu(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? j(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? j(n, t, i.max) : Math.min(t, n)), t;
}
function bs(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function Nu(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: bs(t.x, n, s),
    y: bs(t.y, e, i)
  };
}
function ws(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function ju(t, e) {
  return {
    x: ws(t.x, e.x),
    y: ws(t.y, e.y)
  };
}
function _u(t, e) {
  let n = 0.5;
  const i = tt(t), s = tt(e);
  return s > i ? n = /* @__PURE__ */ ie(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ ie(t.min, t.max - s, e.min)), dt(0, 1, n);
}
function $u(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const kn = 0.35;
function Uu(t = kn) {
  return t === !1 ? t = 0 : t === !0 && (t = kn), {
    x: Ts(t, "left", "right"),
    y: Ts(t, "top", "bottom")
  };
}
function Ts(t, e, n) {
  return {
    min: Ss(t, e),
    max: Ss(t, n)
  };
}
function Ss(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Ku = /* @__PURE__ */ new WeakMap();
class Wu {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = z(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const o = (h) => {
      n ? (this.stopAnimation(), this.snapToCursor(de(h).point)) : this.pauseAnimation();
    }, r = (h, d) => {
      this.stopAnimation();
      const { drag: f, dragPropagation: p, onDragStart: g } = this.getProps();
      if (f && !p && (this.openDragLock && this.openDragLock(), this.openDragLock = Vl(f), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = d, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), ot((m) => {
        let x = this.getAxisMotionValue(m).get() || 0;
        if (ht.test(x)) {
          const { projection: y } = this.visualElement;
          if (y && y.layout) {
            const S = y.layout.layoutBox[m];
            S && (x = tt(S) * (parseFloat(x) / 100));
          }
        }
        this.originPoint[m] = x;
      }), g && O.update(() => g(h, d), !1, !0), vn(this.visualElement, "transform");
      const { animationState: v } = this.visualElement;
      v && v.setActive("whileDrag", !0);
    }, a = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d;
      const { dragPropagation: f, dragDirectionLock: p, onDirectionLock: g, onDrag: v } = this.getProps();
      if (!f && !this.openDragLock)
        return;
      const { offset: m } = d;
      if (p && this.currentDirection === null) {
        this.currentDirection = zu(m), this.currentDirection !== null && g && g(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, m), this.updateAxis("y", d.point, m), this.visualElement.render(), v && O.update(() => v(h, d), !1, !0);
    }, l = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d, this.stop(h, d), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => ot((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new co(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: lo(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !s || !i)
      return;
    const { velocity: r } = s;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && O.postRender(() => a(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !ye(e, s, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (r = Fu(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && Jt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = Nu(i.layoutBox, e) : this.constraints = !1, this.elastic = Uu(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && ot((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = $u(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !Jt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const o = Hl(i, s.root, this.visualElement.getTransformPagePoint());
    let r = ju(s.layout.layoutBox, o);
    if (n) {
      const a = n(zl(r));
      this.hasMutatedConstraints = !!a, a && (r = Dr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = ot((c) => {
      if (!ye(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      r && (h = { min: 0, max: 0 });
      const d = s ? 200 : 1e6, f = s ? 40 : 1e7, p = {
        type: "inertia",
        velocity: i ? e[c] : 0,
        bounceStiffness: d,
        bounceDamping: f,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(c, p);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return vn(this.visualElement, e), i.start(Jn(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    ot((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    ot((e) => this.getAxisMotionValue(e).animation?.pause());
  }
  getAnimationState(e) {
    return this.getAxisMotionValue(e).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    ot((n) => {
      const { drag: i } = this.getProps();
      if (!ye(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, o = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: r, max: a } = s.layout.layoutBox[n], l = o.get() || 0;
        o.set(e[n] - j(r, a, 0.5) + l);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!Jt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    ot((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[r] = _u({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), ot((r) => {
      if (!ye(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(j(l, u, s[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Ku.set(this.visualElement, this);
    const e = this.visualElement.current, n = ne(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps(), h = l.target, d = h !== e && Il(h);
      u && c && !d && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      Jt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, o = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), O.read(i);
    const r = ae(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (ot((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: o = !1, dragElastic: r = kn, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function ye(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function zu(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Gu extends Tt {
  constructor(e) {
    super(e), this.removeGroupControls = lt, this.removeListeners = lt, this.controls = new Wu(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || lt;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const tn = (t) => (e, n) => {
  t && O.update(() => t(e, n), !1, !0);
};
class Yu extends Tt {
  constructor() {
    super(...arguments), this.removePointerDownListener = lt;
  }
  onPointerDown(e) {
    this.session = new co(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: lo(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: tn(e),
      onStart: tn(n),
      onMove: tn(i),
      onEnd: (o, r) => {
        delete this.session, s && O.postRender(() => s(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = ne(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let en = !1;
class Hu extends So {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: o } = e;
    o && (n.group && n.group.add(o), i && i.register && s && i.register(o), en && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Se.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: o } = this.props, { projection: r } = i;
    return r && (r.isPresent = o, e.layoutDependency !== n && r.setOptions({
      ...r.options,
      layoutDependency: n
    }), en = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || O.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), ni.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    en = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ho(t) {
  const [e, n] = Qr(), i = Z(In);
  return T(Hu, { ...t, layoutGroup: i, switchLayoutGroup: Z(oo), isPresent: e, safeToRemove: n });
}
const Xu = {
  pan: {
    Feature: Yu
  },
  drag: {
    Feature: Gu,
    ProjectionNode: Jr,
    MeasureLayout: ho
  }
};
function As(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, o = i[s];
  o && O.postRender(() => o(e, de(e)));
}
class qu extends Tt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = El(e, (n, i) => (As(this.node, i, "Start"), (s) => As(this.node, s, "End"))));
  }
  unmount() {
  }
}
class Zu extends Tt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = ce(ae(this.node.current, "focus", () => this.onFocus()), ae(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ps(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), o = i[s];
  o && O.postRender(() => o(e, de(e)));
}
class Ju extends Tt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Ol(e, (n, i) => (Ps(this.node, i, "Start"), (s, { success: o }) => Ps(this.node, s, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Vn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), Qu = (t) => {
  const e = Vn.get(t.target);
  e && e(t);
}, th = (t) => {
  t.forEach(Qu);
};
function eh({ root: t, ...e }) {
  const n = t || document;
  nn.has(n) || nn.set(n, {});
  const i = nn.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(th, { root: t, ...e })), i[s];
}
function nh(t, e, n) {
  const i = eh(e);
  return Vn.set(t, n), i.observe(t), () => {
    Vn.delete(t), i.unobserve(t);
  };
}
const ih = {
  some: 0,
  all: 1
};
class sh extends Tt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : ih[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), d = u ? c : h;
      d && d(l);
    };
    return nh(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(rh(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function rh({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const oh = {
  inView: {
    Feature: sh
  },
  tap: {
    Feature: Ju
  },
  focus: {
    Feature: Zu
  },
  hover: {
    Feature: qu
  }
}, ah = {
  layout: {
    ProjectionNode: Jr,
    MeasureLayout: ho
  }
}, lh = {
  ...Ru,
  ...oh,
  ...Xu,
  ...ah
}, le = /* @__PURE__ */ ku(lh, Vu);
function ch({ state: t = "idle" }) {
  const e = Array.from({ length: 6 }).map((o, r) => ({
    id: r,
    size: 90 - r * 14,
    // Decreasing size, max radius around 90
    duration: 10 + r * 2,
    reverse: r % 2 === 0
  })), n = (o) => t === "idle" ? "#9CA3AF" : t === "active" && o % 2 === 0 ? "#06B6D4" : "#3B82F6", i = () => t === "idle" ? 3 : 4, s = (o, r, a) => {
    const l = Array.from({ length: 6 }).map((f, p) => {
      const g = Math.PI / 3 * p - Math.PI / 2;
      return {
        x: o + a * Math.cos(g),
        y: r + a * Math.sin(g)
      };
    }), u = (f) => l[(f + 6) % 6], c = (f, p, g) => ({
      x: f.x + (p.x - f.x) * g,
      y: f.y + (p.y - f.y) * g
    }), h = 0.15;
    let d = "";
    for (let f = 0; f < 6; f++) {
      const p = u(f), g = u(f + 1);
      if (f === 0) {
        const x = c(p, g, h);
        d += `M ${x.x},${x.y} `;
      }
      const v = c(p, g, 1 - h);
      d += `L ${v.x},${v.y} `;
      const m = c(g, u(f + 2), h);
      d += `Q ${g.x},${g.y} ${m.x},${m.y} `;
    }
    return d + "Z";
  };
  return /* @__PURE__ */ T("div", { className: "relative w-full h-full flex items-center justify-center bg-white rounded-full overflow-hidden", style: { background: "transparent", width: "100%", height: "100%" }, children: /* @__PURE__ */ T("svg", { viewBox: "0 0 200 200", className: "w-full h-full p-1", children: e.map((o) => /* @__PURE__ */ T(
    le.path,
    {
      d: s(100, 100, o.size),
      fill: "none",
      stroke: n(o.id),
      strokeWidth: i(),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      initial: { rotate: 0, scale: 1 },
      animate: {
        rotate: t === "thinking" || t === "idle" ? o.reverse ? 360 : -360 : 0,
        // Thinking: Sinusoidal wave effect on scale and strokeWidth
        scale: t === "thinking" ? [1, 1.15, 0.9, 1] : 1,
        strokeWidth: t === "thinking" ? [4, 6, 2, 4] : i(),
        // Thinking: Dynamic color cycle blue -> green
        stroke: t === "thinking" ? ["#3B82F6", "#2DD4BF", "#10B981", "#2DD4BF", "#3B82F6"] : n(o.id)
      },
      transition: {
        rotate: {
          duration: t === "idle" ? o.duration * 5 : o.duration,
          // Even slower for gray idle
          repeat: 1 / 0,
          ease: "linear"
        },
        scale: {
          duration: 2,
          repeat: 1 / 0,
          ease: "easeInOut",
          // (5 - hex.id) staggers from inner (5) to outer (0) like a drop ripple
          delay: (5 - o.id) * 0.15
        },
        strokeWidth: {
          duration: 2,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: (5 - o.id) * 0.15
        },
        stroke: {
          duration: 4,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: o.id * 0.2
        }
      },
      style: { originX: "50%", originY: "50%" }
    },
    `${o.id}-${t}`
  )) }) });
}
const uh = ({ onClick: t, isOpen: e, userName: n, state: i, isMaximized: s, config: o }) => {
  const [r, a] = q(!1);
  return pt(() => {
    if (!e && i === "idle") {
      const l = setTimeout(() => {
        a(!0);
      }, 2e3);
      return () => clearTimeout(l);
    } else
      a(!1);
  }, [e, i]), /* @__PURE__ */ W("div", { className: "agent-neo-font", children: [
    /* @__PURE__ */ T(Cn, { children: r && !e && !s && /* @__PURE__ */ T(
      le.div,
      {
        initial: { opacity: 0, x: 20, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        className: "greeting-bubble glass-morphism",
        children: o?.greeting || `Hello there, ${n || "there"}! I'm your assistant. How can I help you today?`
      }
    ) }),
    /* @__PURE__ */ T(
      le.div,
      {
        className: `floating-avatar glass-morphism ${s ? "maximized" : ""}`,
        onClick: t,
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: s ? "90px" : "70px",
          height: s ? "90px" : "70px",
          overflow: "hidden",
          background: o?.avatar?.type === "video" ? "black" : "transparent",
          // Black bg for video to blend better if mask fails
          ...o?.avatar?.styles
        },
        children: o?.avatar?.type === "video" && o.avatar.source ? /* @__PURE__ */ T(
          "video",
          {
            src: o.avatar.source,
            autoPlay: !0,
            loop: !0,
            muted: !0,
            playsInline: !0,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // Seamless gradient mask
              maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)"
            }
          }
        ) : o?.avatar?.type === "image" && o.avatar.source ? /* @__PURE__ */ T(
          "img",
          {
            src: o.avatar.source,
            alt: n || "Agent",
            style: { width: "100%", height: "100%", objectFit: "cover" }
          }
        ) : /* @__PURE__ */ T(ch, { state: i })
      }
    )
  ] });
};
const fo = (...t) => t.filter((e, n, i) => !!e && e.trim() !== "" && i.indexOf(e) === n).join(" ").trim();
const hh = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const dh = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, n, i) => i ? i.toUpperCase() : n.toLowerCase()
);
const Cs = (t) => {
  const e = dh(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
};
var fh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const ph = (t) => {
  for (const e in t)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
  return !1;
};
const mh = Rn(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: s = "",
    children: o,
    iconNode: r,
    ...a
  }, l) => Pe(
    "svg",
    {
      ref: l,
      ...fh,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: i ? Number(n) * 24 / Number(e) : n,
      className: fo("lucide", s),
      ...!o && !ph(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...r.map(([u, c]) => Pe(u, c)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
const Ne = (t, e) => {
  const n = Rn(
    ({ className: i, ...s }, o) => Pe(mh, {
      ref: o,
      iconNode: e,
      className: fo(
        `lucide-${hh(Cs(t))}`,
        `lucide-${t}`,
        i
      ),
      ...s
    })
  );
  return n.displayName = Cs(t), n;
};
const gh = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], yh = Ne("maximize", gh);
const vh = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], xh = Ne("minimize", vh);
const bh = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], wh = Ne("palette", bh);
const Th = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Sh = Ne("square", Th), En = {}, po = (t, e) => {
  if (!e) return t;
  for (const n in e)
    e[n] instanceof Object && n in t && t[n] instanceof Object && !Array.isArray(t[n]) ? po(t[n], e[n]) : t[n] = e[n];
  return t;
}, Ah = async (t, e, n = {}) => {
  const i = e.endpoints?.find((l) => l.name === t);
  if (!i)
    throw new Error(`Endpoint ${t} not found in configuration.`);
  const s = po({ ...i.payloadTemplate }, n);
  if (i.handler) {
    console.log(`Executing local handler for ${t}`, s);
    try {
      let l = i.handler;
      if (typeof l == "string" && typeof window < "u") {
        const u = l.split(".");
        let c = window;
        for (const h of u)
          c = c?.[h];
        if (typeof c == "function")
          l = c;
        else
          throw new Error(`Handler string "${i.handler}" did not resolve to a function.`);
      }
      if (typeof l == "function")
        return await l(s);
      throw new Error(`Handler for ${t} is not a function.`);
    } catch (l) {
      throw new Error(`Local handler for ${t} failed: ${l.message}`);
    }
  }
  if (!i.url)
    return console.log(`Executing virtual endpoint for ${t}`, s), s;
  let o = i.url;
  for (const l in s)
    o = o.replace(`{{${l}}}`, s[l]), o = o.replace(`:${l}`, s[l]);
  const r = {
    method: i.method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: i.withCredentials ? "include" : void 0
  };
  i.method !== "GET" && i.method !== "DELETE" && (r.body = JSON.stringify(s));
  const a = await fetch(o, r);
  if (!a.ok)
    throw new Error(`API call to ${i.name} failed: ${a.statusText}`);
  return a.json();
}, Ph = (t, e, n, i, s) => {
  const o = (e.endpoints || []).map(
    (c) => `- Tool Name: "${c.name}"
  Description: ${c.description}
  Payload Template: ${JSON.stringify(c.payloadTemplate)}`
  ).join(`

`);
  let r = "";
  s && (r = `
DYNAMIC APPLICATION CONTEXT:
${s}
`), e.contextBindings && (r += `
Application Context Bindings:
` + e.contextBindings.map((c) => `${c.key}: ${JSON.stringify(c.data)}`).join(`
`)), n && (r += `

[CRITICAL] PREVIOUS TOOL EXECUTION RESULT:
${JSON.stringify(n, null, 2)}

        The action requested in the last turn HAS ALREADY BEEN COMPLETED. 
        Your task now is to SUMMARIZE the result for the user. 
        DO NOT call the same tool again in the "action" field unless the user explicitly asked for a secondary operation.`);
  const a = i.map((c) => `${c.sender.toUpperCase()}: ${c.text}`).join(`
`), l = e.agentName || "Neo Agent", u = e.systemRole || "a sophisticated AI assistant";
  return `You are ${l}, ${u}.
    
AVAILABLE TOOLS (API Endpoints):
${o}

CONTEXT DATA:
${r}

CONVERSATION HISTORY:
${a}

USER INPUT: "${t}"

INSTRUCTIONS:
1. Analyze the user's request using the provided Context Data and tool results.
2. If toolResult is present above, the action is ALREADY DONE. Summarize it naturally.
3. If no toolResult is present and the user asks for an action that matches a tool, you MUST request that action.
4. You MUST return your response as a valid JSON object. Do not include markdown formatting.
5. JSON Structure:
{
  "message": "Your expert response",
  "action": {
    "name": "The Tool Name to call",
    "payload": { "key": "value" } 
  }
}
6. If no NEW tool is needed, omit the "action" field.
7. Be concise but helpful.
8. IMPORTANT: If the "PREVIOUS TOOL EXECUTION RESULT" indicates success, do not blindly repeat the same action unless progressive logic (like "twice") requires another step.`;
}, Ch = (t) => {
  try {
    let e = t.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(e);
  } catch {
    return console.error("Failed to parse LLM JSON:", t), { message: t };
  }
}, kh = async (t, e) => {
  const n = e.apiKey || En?.VITE_GEMINI_API_KEY;
  if (!n && !e.baseUrl)
    throw new Error("Gemini API key is missing. Please provide it in the config or set VITE_GEMINI_API_KEY.");
  let i = e.baseUrl ? `${e.baseUrl}/${e.model || "gemini-1.5-flash"}:generateContent?key=${n}` : `https://generativelanguage.googleapis.com/v1beta/models/${e.model || "gemini-1.5-flash"}:generateContent?key=${n}`;
  const o = await fetch(i, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: t }] }]
    })
  });
  if (!o.ok) {
    const a = new Error(`Gemini API error: ${o.statusText}`);
    throw a.status = o.status, a;
  }
  return (await o.json()).candidates[0]?.content?.parts[0]?.text || "{}";
}, Vh = async (t, e) => {
  const n = e.baseUrl || "https://api.anthropic.com/v1/messages", i = e.apiKey || En?.VITE_CLAUDE_API_KEY;
  if (!i)
    throw new Error("Claude API key is missing. Please provide it in the config or set VITE_CLAUDE_API_KEY.");
  const s = await fetch(n, {
    method: "POST",
    headers: {
      "x-api-key": i,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: e.model || En?.VITE_CLAUDE_MODEL || "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: t }]
    })
  });
  if (!s.ok) {
    const r = new Error(`Claude API error: ${s.statusText}`);
    throw r.status = s.status, r;
  }
  return (await s.json()).content[0]?.text || "{}";
}, Eh = async (t, e) => {
  const n = e.baseUrl || "http://localhost:3000/ask", i = await fetch(n, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: t })
  });
  if (!i.ok)
    throw new Error(`ApiLlm error: ${i.statusText}`);
  const s = await i.json();
  if (!s.success)
    throw new Error(`ApiLlm returned failure: ${JSON.stringify(s)}`);
  return s.data?.answer || "{}";
}, ks = async (t, e, n, i = [], s) => {
  (!e.llms || e.llms.length === 0) && (console.warn("No LLM providers configured. Defaulting to local api-llm."), e.llms = [{
    name: "Local API Agent",
    provider: "api-llm",
    apiKey: "",
    // Not needed for local
    baseUrl: "http://localhost:3000/ask"
  }]);
  const o = Ph(t, e, n, i, s);
  let r;
  for (const a of e.llms)
    try {
      let l = "";
      if (a.provider === "gemini")
        l = await kh(o, a);
      else if (a.provider === "claude")
        l = await Vh(o, a);
      else if (a.provider === "api-llm")
        l = await Eh(o, a);
      else
        continue;
      return Ch(l);
    } catch (l) {
      console.error(`Provider ${a.provider} failed:`, l), console.warn(`Provider ${a.provider} failed:`, l), r = l;
      continue;
    }
  throw new Error(`All LLM providers failed. Last error: ${r?.message || "Unknown"}`);
}, Vs = (t, e) => {
  const n = t.length < e.length ? e : t, i = t.length < e.length ? t : e;
  if (n.length === 0) return 1;
  const s = (o, r) => {
    const a = [];
    for (let l = 0; l <= o.length; l++) {
      let u = l;
      for (let c = 0; c <= r.length; c++)
        if (l === 0) a[c] = c;
        else if (c > 0) {
          let h = a[c - 1];
          o.charAt(l - 1) !== r.charAt(c - 1) && (h = Math.min(Math.min(h, u), a[c]) + 1), a[c - 1] = u, u = h;
        }
      l > 0 && (a[r.length] = u);
    }
    return a[r.length];
  };
  return (n.length - s(n.toLowerCase(), i.toLowerCase())) / n.length;
}, Mh = ({ onClose: t, config: e, context: n, user: i, onStateChange: s, onAction: o, isMaximized: r, onToggleMaximize: a }) => {
  const l = G(!1), [u, c] = q(() => e.initialStepId ? [] : [{
    id: "msg-initial",
    text: `Hey ${i?.name || "there"}! I'm ready to assist you.`,
    sender: "agent",
    timestamp: Date.now()
  }]), [h, d] = q(""), [f, p] = q(!1), [g, v] = q(!1);
  pt(() => {
    s && s(f || g ? "thinking" : "active");
  }, [f, g, s]);
  const [m, x] = q(), [y, S] = q({}), [P, D] = q(null), [B, A] = q(!0), [M, U] = q(() => localStorage.getItem("neo-theme") || "dark"), [it, yt] = q(!1), Gt = (b) => {
    U(b), localStorage.setItem("neo-theme", b), yt(!1);
  }, Rt = G(void 0), It = G(null), St = G(null), _ = G(null), F = G(!1), rt = G(null), X = Ot((b, L) => {
    if (!b) return b;
    let k = b;
    k = k.replace(/\{\{\s*userName\s*\}\}/g, i?.name || "there"), k = k.replace(/\{\{\s*agentName\s*\}\}/g, e.agentName || "Neo");
    for (const R in L)
      k = k.replace(new RegExp(`\\{\\{\\s*${R}\\s*\\}\\}`, "g"), L[R]);
    const C = It.current;
    return C && (Array.isArray(C) ? (k = k.replace(/\{\{\s*result\.length\s*\}\}/g, C.length.toString()), k = k.replace(/\{\{\s*result\[(\d+)\]\.(\w+)\s*\}\}/g, (R, E, V) => C[parseInt(E)] && C[parseInt(E)][V] || "")) : k = k.replace(/\{\{\s*result\.(\w+)\s*\}\}/g, (R, E) => C[E] || "")), k;
  }, [i]), et = Ot((b, L) => {
    c((k) => [
      ...k,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: b,
        sender: L,
        timestamp: Date.now()
      }
    ]);
  }, []), go = (b, L, k) => {
    const C = L.split(".");
    let R = b;
    for (let E = 0; E < C.length - 1; E++)
      R[C[E]] || (R[C[E]] = {}), R = R[C[E]];
    R[C[C.length - 1]] = k;
  }, Lt = Ot(async (b, L, k, C, R, E = []) => {
    if (F.current)
      return console.warn("Execution stopped by user."), null;
    if (E.includes(b)) {
      console.warn(`Tool recursion detected for ${b}. Skipping.`);
      return;
    }
    const V = [...E, b];
    p(!0);
    try {
      let I = C ? JSON.parse(JSON.stringify(C)) : {};
      const N = (nt) => {
        if (typeof nt == "string") return X(nt, y);
        if (typeof nt == "object" && nt !== null)
          for (const At in nt)
            nt[At] = N(nt[At]);
        return nt;
      };
      I = N(I), k && L !== void 0 ? go(I, k, L) : L !== void 0 && !k && (I = { ...I, type: L });
      const Y = await Ah(b, e, I);
      if (D(Y), It.current = Y, o && o(b, Y || I), R) {
        const nt = n ? `${n}
Result Context: ${JSON.stringify(Y).substring(0, 1e3)}...` : void 0, At = await ks(R, e, Y, u, nt);
        if (et(At.message, "agent"), At.action && await Lt(At.action.name, void 0, void 0, At.action.payload, R, V), b === "generateReportPdf" && (x({
          id: "activity_log_suggestion",
          message: "",
          options: [
            { label: "Show activity log", actionType: "link", externalLink: "/settings/activity-log" }
          ]
        }), A(!0)), b === "createReport") {
          const hi = Y?.id || Y?.reportId;
          x({
            id: "post_create_suggestion",
            message: "",
            options: [
              { label: "Open Report", triggerAction: "openReport", actionType: "api", value: hi, payloadKey: "id" },
              { label: "Manage Access/Permissions", triggerAction: "manageAccess", actionType: "api", value: hi, payloadKey: "id" }
            ]
          }), A(!0);
        }
      } else
        et("✅ Action completed successfully!", "agent");
      return Y;
    } catch (I) {
      return et(`❌ Action failed: ${I.message}`, "agent"), null;
    } finally {
      p(!1);
    }
  }, [e, u, y, et, X, o, n]), ft = Ot((b, L = {}) => {
    b === "stop_flow" ? (F.current = !0, v(!1)) : (b === "win_start" || b === "assist_start") && (F.current = !1);
    const k = { ...y, ...L };
    S(k);
    const C = e.workflow?.find((R) => R.id === b);
    if (C) {
      if (C.skipIf)
        try {
          if (!!k[C.skipIf.replace("workflowState.", "")]) {
            console.log(`Skipping step ${b} because ${C.skipIf} is present.`);
            const I = C.options?.[0]?.nextStepId;
            if (I) {
              ft(I, k);
              return;
            }
          }
        } catch (V) {
          console.warn("Skip evaluation failed:", V);
        }
      const R = JSON.parse(JSON.stringify(C)), E = It.current;
      if (R.useResultsAsOptions && Array.isArray(E)) {
        const V = R.dynamicOptionsConfig;
        if (V) {
          const I = E.map((N) => ({
            label: N[V.labelKey],
            value: N[V.valueKey],
            nextStepId: V.nextStepId,
            triggerAction: V.triggerAction,
            actionType: V.actionType,
            payloadKey: V.payloadKey,
            fixedPayload: V.fixedPayload
          }));
          R.options = [...R.options || [], ...I];
        }
      }
      R.options && (R.options = R.options.map((V) => ({
        ...V,
        label: X(V.label, k),
        value: typeof V.value == "string" ? X(V.value, k) : V.value,
        externalLink: V.externalLink ? X(V.externalLink, k) : void 0
      }))), x(R), Rt.current = R, A(!0), et(X(C.message, k), "agent");
    }
  }, [e.workflow, y, et, X]);
  pt(() => {
    e.initialStepId && !l.current && (l.current = !0, ft(e.initialStepId));
  }, [e.initialStepId, ft]), pt(() => {
    if (m) {
      if (St.current !== m.id && (St.current = null), m.triggerAction && !m.inputTarget && m.actionType === "api") {
        if (St.current === m.id)
          return;
        St.current = m.id, (async () => {
          if (F.current || (m.delay && await new Promise((k) => setTimeout(k, m.delay)), F.current)) return;
          const L = await Lt(m.triggerAction, void 0, m.payloadKey, m.fixedPayload);
          if (F.current) {
            console.log("Stop signal detected after execution. Aborting auto-advance.");
            return;
          }
          L && L.nextStepId ? fe(L.nextStepId, 500) : m.nextStepId && fe(m.nextStepId, 500);
        })();
      } else if (!m.triggerAction && !m.inputTarget && m.nextStepId && (!m.options || m.options.length === 0)) {
        if (St.current === m.id)
          return;
        St.current = m.id;
        const b = m.delay || 1e3;
        if (F.current) return;
        fe(m.nextStepId, b);
      }
    }
  }, [m, Lt, ft]), pt(() => {
    rt.current && (rt.current.scrollTop = rt.current.scrollHeight);
  }, [u, f, B, r]);
  const Yt = () => {
    _.current && (clearTimeout(_.current), _.current = null), v(!1);
  }, fe = (b, L = 500, k = {}) => {
    if (F.current) {
      console.log("Attempted to schedule auto-advance while stopped. Ignoring.");
      return;
    }
    Yt(), v(!0), _.current = setTimeout(() => {
      F.current || ft(b, k);
    }, L);
  }, yo = async () => {
    console.log("Stopping auto-play..."), F.current = !0, Yt(), v(!1), p(!1), await Ht("stop");
  }, je = async (b, L = !1) => {
    if (Yt(), F.current = !1, (Rt.current || m)?.inputTarget) {
      const C = b.value !== void 0 ? b.value : b.label;
      await Ht(C);
      return;
    }
    if (L || et(b.label, "user"), A(!1), b.triggerAction && b.actionType === "api" ? await Lt(b.triggerAction, b.value, b.payloadKey, b.fixedPayload) : b.actionType === "whatsapp" ? (window.open(`https://wa.me/${b.externalLink || "573025688681"}`, "_blank"), et("Opening WhatsApp to connect you with our help desk... 🚀", "agent")) : b.actionType === "link" && b.externalLink && window.open(b.externalLink, "_blank"), b.nextStepId) {
      const C = {};
      if (b.payloadKey && b.value !== void 0 && (C[b.payloadKey] = typeof b.value == "string" ? X(b.value, y) : b.value), b.stateUpdate)
        for (const R in b.stateUpdate) {
          const E = b.stateUpdate[R];
          C[R] = typeof E == "string" ? X(E, y) : E;
        }
      fe(b.nextStepId, 400, C);
    }
  }, vo = () => {
    if (Yt(), e.frequentAction) {
      je(e.frequentAction);
      return;
    }
    const b = e.actionLabel || "Create Report";
    d(b), Ht(b);
  }, Ht = async (b) => {
    Yt();
    const L = b || h;
    if (!L.trim()) return;
    const k = L.trim();
    et(k, "user"), b || d(""), p(!0);
    try {
      const C = Rt.current || m;
      if (console.log("Checking input capture:", {
        currentStepId: C?.id,
        inputTarget: C?.inputTarget,
        userInput: k
      }), C && C.inputTarget) {
        const E = { ...y, [C.inputTarget]: k };
        if (S(E), console.log("Input saved, checking actions...", C.triggerAction), C.triggerAction && C.actionType === "api") {
          const V = k;
          await Lt(
            C.triggerAction,
            V,
            C.payloadKey,
            C.fixedPayload,
            void 0
            // No LLM feedback loop for deterministic steps typically
          );
        }
        p(!1), C.nextStepId && ft(C.nextStepId, { [C.inputTarget]: k });
        return;
      }
      const R = k.toLowerCase();
      if (C?.options) {
        for (const E of C.options)
          if (Vs(R, E.label.toLowerCase()) >= 0.95) {
            p(!1), je(E, !0);
            return;
          }
      }
      if (e.intents) {
        let E = { intent: null, score: 0 };
        for (const V of e.intents) {
          if (V.extractors && V.extractors.length > 0 && V.extractors.every((N) => new RegExp(N.regex, "i").test(k))) {
            E = { intent: V, score: 1.1 };
            break;
          }
          for (const I of V.keywords) {
            const N = Vs(R, I.toLowerCase());
            N >= 0.95 && N > E.score && (E = { intent: V, score: N });
          }
        }
        if (E.intent) {
          const V = E.intent;
          let I = {};
          V.extractors && V.extractors.forEach((N) => {
            const Y = k.match(new RegExp(N.regex, "i"));
            Y && Y[1] && (I[N.key] = Y[1].trim());
          }), p(!1), ft(V.nextStepId, I);
          return;
        }
      }
      if (e.llms && e.llms.length > 0) {
        const E = n ? `${n}
${Object.entries(y).map(([I, N]) => `${I}: ${N}`).join(`
`)}` : void 0, V = await ks(k, e, P, u, E);
        p(!1), et(V.message, "agent"), V.action && Lt(V.action.name, void 0, void 0, V.action.payload, k, []);
        return;
      }
      if (e.intents) {
        let E = { intent: null, score: 0 };
        const V = k.toLowerCase();
        for (const I of e.intents) {
          let N = 0;
          for (const Y of I.keywords)
            V.includes(Y.toLowerCase()) && N++;
          N > E.score && (E = { intent: I, score: N });
        }
        if (E.score > 0 && E.intent) {
          const I = E.intent;
          let N = {};
          I.extractors && I.extractors.forEach((Y) => {
            const nt = k.match(new RegExp(Y.regex, "i"));
            nt && nt[1] && (N[Y.key] = nt[1].trim());
          }), p(!1), ft(I.nextStepId, N);
          return;
        }
      }
      p(!1), e.fallbackStepId ? ft(e.fallbackStepId) : et("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", "agent");
    } catch (C) {
      console.error(C), p(!1), et("I encountered an error while processing your request. Please try again later.", "agent");
    }
  };
  return /* @__PURE__ */ W("div", { className: `chat-container glass-morphism-dark agent-neo-font ${r ? "maximized" : ""}`, "data-theme": M, children: [
    /* @__PURE__ */ W("div", { className: "chat-header", children: [
      /* @__PURE__ */ W("div", { className: "header-info", children: [
        /* @__PURE__ */ T("div", { className: "status-indicator" }),
        /* @__PURE__ */ T("span", { className: "header-title", children: e.agentName || "Neo Agent" })
      ] }),
      /* @__PURE__ */ W("div", { className: "header-controls", children: [
        (g || f) && e.showStopButton && /* @__PURE__ */ T(
          "button",
          {
            onClick: yo,
            className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors",
            title: "Stop Auto-Play / Cancel",
            children: /* @__PURE__ */ T(Sh, { size: 18, fill: "currentColor" })
          }
        ),
        a && /* @__PURE__ */ T(
          "button",
          {
            onClick: a,
            className: "close-btn",
            title: r ? "Restore" : "Maximize",
            style: { marginRight: "4px" },
            children: r ? /* @__PURE__ */ T(xh, { size: 18 }) : /* @__PURE__ */ T(yh, { size: 18 })
          }
        ),
        /* @__PURE__ */ W("div", { className: "theme-selector-container", children: [
          /* @__PURE__ */ T(
            "button",
            {
              onClick: () => yt(!it),
              className: "close-btn",
              title: "Change Theme",
              children: /* @__PURE__ */ T(wh, { size: 18 })
            }
          ),
          /* @__PURE__ */ T(Cn, { children: it && /* @__PURE__ */ W(
            le.div,
            {
              initial: { opacity: 0, y: -5, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: -5, scale: 0.95 },
              className: "theme-dropdown",
              children: [
                /* @__PURE__ */ T("span", { className: "theme-label", children: "Theme" }),
                [
                  { id: "dark", label: "Dark Moon", color: "#1f2937" },
                  { id: "light", label: "Light Day", color: "#ffffff" },
                  { id: "glass", label: "Pure Glass", color: "#e5e7eb" }
                ].map((b) => /* @__PURE__ */ W(
                  "button",
                  {
                    onClick: () => Gt(b.id),
                    className: "theme-option",
                    children: [
                      /* @__PURE__ */ T(
                        "div",
                        {
                          className: "theme-color-indicator",
                          style: { background: b.color }
                        }
                      ),
                      /* @__PURE__ */ T("span", { children: b.label })
                    ]
                  },
                  b.id
                ))
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ T("button", { onClick: t, className: "close-btn", children: /* @__PURE__ */ W("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ T("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ T("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ W("div", { ref: rt, className: "messages-container", children: [
      u.map((b) => /* @__PURE__ */ T(
        "div",
        {
          className: `message ${b.sender === "user" ? "user-message" : "agent-message"}`,
          children: b.text
        },
        b.id
      )),
      f && /* @__PURE__ */ W("div", { className: "typing-indicator", children: [
        /* @__PURE__ */ W("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: [
          /* @__PURE__ */ T("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
          /* @__PURE__ */ T("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
          /* @__PURE__ */ T("line", { x1: "4.93", y1: "4.93", x2: "7.76", y2: "7.76" }),
          /* @__PURE__ */ T("line", { x1: "16.24", y1: "16.24", x2: "19.07", y2: "19.07" }),
          /* @__PURE__ */ T("line", { x1: "2", y1: "12", x2: "6", y2: "12" }),
          /* @__PURE__ */ T("line", { x1: "18", y1: "12", x2: "22", y2: "12" }),
          /* @__PURE__ */ T("line", { x1: "4.93", y1: "19.07", x2: "7.76", y2: "16.24" }),
          /* @__PURE__ */ T("line", { x1: "16.24", y1: "7.76", x2: "19.07", y2: "4.93" })
        ] }),
        /* @__PURE__ */ W("span", { children: [
          e.agentName || "Neo ",
          " is thinking..."
        ] })
      ] }),
      /* @__PURE__ */ T(Cn, { children: m?.options && B && !f && /* @__PURE__ */ T(
        le.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          className: "options-container",
          children: m.options.map((b, L) => /* @__PURE__ */ T(
            "button",
            {
              className: "option-pill",
              onClick: () => je(b),
              children: b.label
            },
            L
          ))
        }
      ) }),
      e.showFrequentActions && /* @__PURE__ */ W("div", { className: "actions-suggestion", children: [
        /* @__PURE__ */ T("span", { className: "actions-label", children: "Frequent Actions" }),
        /* @__PURE__ */ W("button", { className: "action-button", onClick: vo, children: [
          /* @__PURE__ */ T("span", { style: { marginRight: "8px" }, children: "⚡" }),
          e.frequentAction?.label || e.actionLabel || "Create Report"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ W("div", { className: "input-area", children: [
      /* @__PURE__ */ T(
        "input",
        {
          type: "text",
          value: h,
          onChange: (b) => d(b.target.value),
          onKeyPress: (b) => b.key === "Enter" && Ht(),
          placeholder: "Type a message...",
          className: "chat-input"
        }
      ),
      /* @__PURE__ */ T(
        "button",
        {
          onClick: () => Ht(),
          className: "send-btn",
          disabled: f,
          children: /* @__PURE__ */ W("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ T("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
            /* @__PURE__ */ T("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
          ] })
        }
      )
    ] })
  ] });
}, Dh = '@import"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap";:root{--agent-primary: #6366f1;--agent-primary-hover: #4f46e5;--agent-bg: rgba(17, 24, 39, .8);--agent-text: #ffffff;--agent-text-secondary: #9ca3af;--agent-border: rgba(255, 255, 255, .1);--agent-shadow: 0 8px 32px 0 rgba(31, 38, 135, .37);--agent-msg-bg: rgba(255, 255, 255, .05);--agent-input-bg: rgba(255, 255, 255, .05);--agent-pill-bg: rgba(99, 102, 241, .1);--agent-pill-text: #818cf8;--agent-pill-border: rgba(99, 102, 241, .3)}[data-theme=light]{--agent-primary: #4f46e5;--agent-primary-hover: #4338ca;--agent-bg: rgba(255, 255, 255, .85);--agent-text: #1f2937;--agent-text-secondary: #6b7280;--agent-border: rgba(0, 0, 0, .1);--agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, .1);--agent-msg-bg: rgba(0, 0, 0, .05);--agent-input-bg: rgba(0, 0, 0, .05);--agent-pill-bg: rgba(79, 70, 229, .1);--agent-pill-text: #4f46e5;--agent-pill-border: rgba(79, 70, 229, .2)}[data-theme=glass]{--agent-primary: #2563eb;--agent-primary-hover: #1d4ed8;--agent-bg: rgba(255, 255, 255, .3);--agent-text: #111827;--agent-text-secondary: #4b5563;--agent-border: rgba(255, 255, 255, .3);--agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, .1);--agent-msg-bg: rgba(255, 255, 255, .4);--agent-input-bg: rgba(255, 255, 255, .4);--agent-pill-bg: rgba(37, 99, 235, .1);--agent-pill-text: #2563eb;--agent-pill-border: rgba(37, 99, 235, .2)}.agent-neo-font{font-family:Outfit,sans-serif}.glass-morphism-dark{background:var(--agent-bg);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid var(--agent-border);box-shadow:var(--agent-shadow);border-radius:16px;color:var(--agent-text)}.send-btn{background-color:var(--agent-primary);border:none;border-radius:12px;width:40px;height:40px;flex:0 0 40px;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;color:#fff;cursor:pointer;transition:background-color .2s}.chat-container{position:fixed;bottom:100px;right:24px;width:380px;height:500px;display:flex;flex-direction:column;z-index:9998;overflow:hidden;transition:all .3s ease}.chat-container.maximized{width:600px;max-width:90vw;height:80vh;top:110px;bottom:auto;right:24px}.chat-header{padding:16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--agent-border)}.header-info{display:flex;align-items:center;gap:8px}.status-indicator{width:8px;height:8px;border-radius:50%;background:#10b981}.header-title{color:var(--agent-text);font-weight:600}.close-btn{background:none;border:none;color:var(--agent-text-secondary);cursor:pointer;transition:color .2s;padding:4px;border-radius:50%;display:flex;align-items:center;justify-content:center}.close-btn:hover{color:var(--agent-text);background:#ffffff1a}.header-controls{display:flex!important;flex-direction:row!important;align-items:center!important;gap:8px!important}.theme-selector-container{position:relative}.theme-dropdown{position:absolute;top:100%;right:0;margin-top:8px;min-width:150px;display:flex;flex-direction:column;gap:4px;padding:8px;border-radius:12px;background:var(--agent-bg);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--agent-border);box-shadow:0 10px 25px #0003;z-index:10000;transform-origin:top right}.theme-label{font-size:10px;text-transform:uppercase;letter-spacing:.05em;opacity:.6;margin-bottom:4px;padding-left:8px;color:var(--agent-text)}.theme-option{display:flex;align-items:center;gap:12px;padding:8px 12px;width:100%;border:none;background:none;color:var(--agent-text);font-size:13px;font-weight:500;cursor:pointer;border-radius:8px;text-align:left;transition:background .2s}.theme-option:hover{background:#7d7d7d26}.theme-color-indicator{width:16px;height:16px;border-radius:50%;border:1px solid rgba(0,0,0,.1);flex-shrink:0}.messages-container{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}.message{max-width:80%;padding:10px 14px;border-radius:12px;color:var(--agent-text);font-size:14px;box-shadow:0 2px 4px #0000000d;white-space:pre-wrap}.user-message{align-self:flex-end;background-color:var(--agent-primary);color:#fff}.agent-message{align-self:flex-start;background-color:var(--agent-msg-bg)}.typing-indicator{align-self:flex-start;color:var(--agent-text-secondary);font-size:12px;display:flex;align-items:center;gap:8px}.options-container{display:flex;flex-wrap:wrap;gap:8px;padding:4px 0}.option-pill{background:var(--agent-pill-bg);border:1px solid var(--agent-pill-border);color:var(--agent-pill-text);padding:6px 14px;border-radius:20px;font-size:13px;cursor:pointer;transition:all .2s ease}.option-pill:hover{filter:brightness(1.1);transform:translateY(-1px)}.input-area{padding:16px;display:flex;gap:8px}.chat-input{flex:1;background-color:var(--agent-input-bg);border:1px solid var(--agent-border);border-radius:12px;padding:10px 16px;color:var(--agent-text);outline:none;transition:border-color .2s}.chat-input:focus{border-color:var(--agent-primary)}.send-btn:hover{background-color:var(--agent-primary-hover)}.send-btn:disabled{opacity:.5;cursor:not-allowed}.floating-avatar{position:fixed;bottom:24px;right:24px;width:64px;height:64px;cursor:pointer;z-index:9999;transition:all .3s ease}.floating-avatar.maximized{bottom:auto;top:24px;right:24px}.floating-avatar:hover{transform:scale(1.1)}.glass-morphism{background:#ffffffb3;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px #1f26875e;border-radius:16px}.greeting-bubble{position:fixed!important;bottom:100px!important;right:24px!important;max-width:250px;padding:12px 16px;border-radius:12px 12px 4px;color:#1f2937;font-size:14px;z-index:9998;pointer-events:none}.actions-suggestion{margin-top:16px;padding:0 4px}.actions-label{display:block;font-size:12px;color:var(--agent-text-secondary);font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em}.action-button{width:100%;background:linear-gradient(90deg,var(--agent-primary) 0%,#a855f7 100%);border:none;border-radius:12px;padding:12px;color:#fff;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s,transform .2s;font-size:15px}.action-button:hover{opacity:.9;transform:translateY(-1px)}', Es = {
  reporting: {
    actionLabel: "Create ACFR Report",
    systemRole: "a financial reporting expert assistant. You assist users in creating Annual Comprehensive Financial Reports (ACFR) and Budget Books.",
    initialStepId: "welcome",
    intents: [
      { keywords: ["ACFR", "comprehensive", "financial"], nextStepId: "acfr_confirm" },
      { keywords: ["Budget", "Book", "budgetary"], nextStepId: "budget_confirm" },
      { keywords: ["templates", "themes", "show me", "list"], nextStepId: "help" },
      { keywords: ["open", "last", "report"], nextStepId: "open_last_report_flow" },
      { keywords: ["permissions", "Please give edit permissions for Guilad", "edit permissions"], nextStepId: "update_permissions_demo" }
    ],
    endpoints: [
      {
        name: "openReport",
        url: "",
        // Client-side handled
        method: "GET",
        description: "Usage: Call this to OPEN a report given its ID. Useful when user asks to open/view a report.",
        payloadTemplate: { id: "" }
      },
      {
        name: "manageAccess",
        url: "",
        // Client-side handled
        method: "GET",
        description: "Usage: Call this to manage access/permissions for a report.",
        payloadTemplate: { id: "" }
      }
    ],
    workflow: [
      {
        id: "welcome",
        message: "Hello {{ userName }}! I'm your assistant. What kind of report to do want to do today?",
        options: [
          { label: "ACFR", nextStepId: "acfr_confirm" },
          { label: "Budget Book", nextStepId: "budget_confirm" },
          { label: "Im not sure", nextStepId: "help" }
        ]
      },
      {
        id: "fallback_sorry",
        message: `Sorry, I still can't help you with that, but looking forward to improve! 

Is there anything else I can help you with?`,
        options: [
          { label: "Create ACFR Report", nextStepId: "acfr_confirm" },
          { label: "Create Budget Book", nextStepId: "budget_confirm" }
        ]
      },
      {
        id: "acfr_confirm",
        message: "Alright! I can help you with the ACFR report. Would you like to use the default template?",
        options: [
          // Option 1: Default Template -> Ask Name -> Create
          {
            label: "Ok, let's do it",
            // Save type=ACFR to state
            payloadKey: "type",
            value: "ACFR",
            // Set default themeId for the "fast path"
            stateUpdate: { themeId: "697b977d5f3a5717430c12b8" },
            nextStepId: "ask_report_name_acfr"
          },
          { label: "Show me the templates", actionType: "api", triggerAction: "getThemes", nextStepId: "select_theme_acfr" },
          { label: "Im not sure", nextStepId: "help" }
        ]
      },
      {
        id: "budget_confirm",
        message: "Alright! I can help you with the Budget Book report. Would you like to use the default template?",
        options: [
          {
            label: "Ok, let's do it",
            payloadKey: "type",
            value: "BUDGET_BOOK",
            nextStepId: "ask_report_name_budget"
          },
          { label: "Show me the templates", actionType: "api", triggerAction: "getThemes", nextStepId: "select_theme_budget" },
          { label: "Im not sure", nextStepId: "help" }
        ]
      },
      {
        id: "ask_report_name_acfr",
        message: "What should be the name of your ACFR report?",
        inputTarget: "reportName",
        nextStepId: "ask_fiscal_year_acfr"
      },
      {
        id: "ask_fiscal_year_acfr",
        message: "Please enter the fiscal year for this report (YYYY-MM-DD):",
        inputTarget: "fiscalYear",
        triggerAction: "createReport",
        actionType: "api",
        payloadKey: "initialReportFields.fiscalYear",
        fixedPayload: {
          type: "ACFR",
          name: "{{reportName}}",
          initialReportFields: {
            themeId: "{{themeId}}",
            themeColors: {
              primaryColor: "#DC143C",
              headingColor: "#0D0E1C",
              secondaryColor: "#FFE4E8",
              tertiaryColor: "#8B0A1E"
            }
          }
        },
        nextStepId: "done"
      },
      {
        id: "ask_report_name_budget",
        message: "What should be the name of your Budget Book?",
        inputTarget: "reportName",
        nextStepId: "ask_fiscal_year_budget"
      },
      {
        id: "ask_fiscal_year_budget",
        message: "Please enter the fiscal year for this report (YYYY-MM-DD):",
        inputTarget: "fiscalYear",
        triggerAction: "createReport",
        actionType: "api",
        payloadKey: "initialReportFields.fiscalYear",
        fixedPayload: {
          type: "BUDGET_BOOK",
          name: "{{reportName}}",
          initialReportFields: {
            themeId: "{{themeId}}",
            themeColors: {
              primaryColor: "#DC143C",
              headingColor: "#0D0E1C",
              secondaryColor: "#FFE4E8",
              tertiaryColor: "#8B0A1E"
            }
          }
        },
        nextStepId: "done"
      },
      {
        id: "select_theme_acfr",
        message: "I've found {{ result.length }} templates. Which theme would you like for your ACFR report?",
        useResultsAsOptions: !0,
        dynamicOptionsConfig: {
          labelKey: "name",
          valueKey: "id",
          // Save themeId to state
          payloadKey: "themeId",
          // Go to ask name
          nextStepId: "ask_report_name_acfr",
          fixedPayload: { type: "ACFR" }
        }
      },
      {
        id: "select_theme_budget",
        message: "I've found {{ result.length }} templates. Which theme would you like for your Budget Book?",
        useResultsAsOptions: !0,
        dynamicOptionsConfig: {
          labelKey: "name",
          valueKey: "id",
          payloadKey: "themeId",
          nextStepId: "ask_report_name_budget",
          fixedPayload: { type: "BUDGET_BOOK" }
        }
      },
      {
        id: "help",
        message: "Don't know what to do? Want to talk to a real human?",
        options: [
          { label: "Show me the templates", actionType: "api", triggerAction: "getThemes", nextStepId: "select_theme_general" },
          { label: "Talk to a human", actionType: "whatsapp", nextStepId: "whatsapp_done" }
        ]
      },
      {
        id: "select_theme_general",
        message: "I've found {{ result.length }} templates. You can pick one and I'll start a general report for you:",
        useResultsAsOptions: !0,
        dynamicOptionsConfig: {
          labelKey: "name",
          valueKey: "id",
          payloadKey: "themeId",
          nextStepId: "ask_report_name_acfr",
          // Defaulting to ACFR flow for general?
          fixedPayload: { type: "ACFR" }
        }
      },
      {
        id: "done",
        message: "✅ Perfect! Your report request has been sent.",
        options: [
          { label: "Open Report", triggerAction: "openReport", actionType: "api", value: "{{result.id}}", payloadKey: "id" },
          { label: "Manage Access/Permissions", triggerAction: "manageAccess", actionType: "api", value: "{{result.id}}", payloadKey: "id" }
        ]
      },
      {
        id: "whatsapp_done",
        message: "Opening WhatsApp to connect you with our help desk... 🚀"
      },
      {
        id: "open_last_report_flow",
        message: "Finding your last report...",
        triggerAction: "getAllReports",
        actionType: "api",
        nextStepId: "display_last_report"
      },
      {
        id: "display_last_report",
        message: "Here is the last report I found: '{{result[0].name}}'.",
        options: [
          { label: "Open Report", triggerAction: "openReport", actionType: "api", value: "{{result[0].id}}", payloadKey: "id" },
          { label: "Check Activity Log", actionType: "link", externalLink: "/settings/activity-log" }
        ]
      },
      {
        id: "update_permissions_demo",
        message: "Report permissions have been updated for the user gholender@cleargov.com",
        triggerAction: "manageAccess",
        actionType: "api",
        fixedPayload: { userEmail: "gholender@cleargov.com" }
      }
    ]
  },
  health: {
    actionLabel: "Check Vitals",
    systemRole: "a personal health tracking assistant.",
    initialStepId: "welcome",
    workflow: [
      {
        id: "welcome",
        message: "Health Assistant here. I can help you track vitals or schedule appointments.",
        options: [
          { label: "Log Vitals", nextStepId: "log_vitals" },
          { label: "Schedule Appointment", nextStepId: "schedule" }
        ]
      }
    ]
  }
}, Rh = ({ config: t, preset: e, context: n, user: i, onAction: s }) => {
  const [o, r] = q(!1), a = Ae.useRef(null), l = Ae.useMemo(() => {
    if (e && Es[e]) {
      const g = Es[e];
      return {
        ...g,
        ...t,
        // Merge arrays instead of overwriting
        endpoints: [...g.endpoints || [], ...t.endpoints || []],
        intents: [...g.intents || [], ...t.intents || []]
        // Workflows are usually custom, so keep overwrite behavior or merge?
        // Let's overwrite workflow for now as it's complex to merge graph steps
      };
    }
    return t;
  }, [t, e]), [u, c] = q("idle"), [h, d] = q(!1);
  pt(() => {
    o ? c((g) => g === "thinking" ? "thinking" : "active") : u !== "thinking" && c("idle");
  }, [o]);
  const f = (g, v) => {
    if (s && s(g, v), a.current) {
      const m = new CustomEvent("onAction", {
        detail: { name: g, data: v },
        bubbles: !0,
        composed: !0
        // Required to cross Shadow DOM/Web Component boundary
      });
      a.current.dispatchEvent(m);
    }
  }, p = l.keepAlive || o;
  return /* @__PURE__ */ W("div", { ref: a, className: "agent-neo-root", children: [
    /* @__PURE__ */ T("style", { children: Dh }),
    /* @__PURE__ */ T(
      uh,
      {
        onClick: () => r(!o),
        isOpen: o,
        userName: i?.name,
        state: u,
        isMaximized: h,
        config: l
      }
    ),
    p && /* @__PURE__ */ T("div", { style: { display: o ? "block" : "none" }, children: /* @__PURE__ */ T(
      Mh,
      {
        onClose: () => r(!1),
        config: l,
        context: n,
        user: i,
        onStateChange: c,
        onAction: f,
        isMaximized: h,
        onToggleMaximize: () => d(!h)
      }
    ) })
  ] });
};
var Ih = Object.defineProperty, Lh = (t, e, n) => e in t ? Ih(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, ve = (t, e, n) => Lh(t, typeof e != "symbol" ? e + "" : e, n);
const Oh = {
  stringify: (t) => t ? "true" : "false",
  parse: (t) => /^[ty1-9]/i.test(t)
}, Bh = {
  stringify: (t) => t.name,
  parse: (t, e, n) => {
    const i = (() => {
      if (typeof window < "u" && t in window)
        return window[t];
      if (typeof global < "u" && t in global)
        return global[t];
    })();
    return typeof i == "function" ? i.bind(n) : void 0;
  }
}, Fh = {
  stringify: (t) => JSON.stringify(t),
  parse: (t) => JSON.parse(t)
};
function Nh(t) {
  return t.replace(
    /([a-z0-9])([A-Z])/g,
    (e, n, i) => `${n}-${i.toLowerCase()}`
  );
}
function mo(t) {
  return t.replace(/[-:]([a-z])/g, (e, n) => `${n.toUpperCase()}`);
}
const jh = {
  stringify: (t) => t.name,
  parse: (t, e, n) => {
    const i = (() => {
      const s = mo(e);
      if (typeof n < "u" && s in n.container)
        return n.container[s];
    })();
    return typeof i == "function" ? i.bind(n) : void 0;
  }
}, _h = {
  stringify: (t) => `${t}`,
  parse: (t) => parseFloat(t)
}, $h = {
  stringify: (t) => t,
  parse: (t) => t
}, sn = {
  string: $h,
  number: _h,
  boolean: Oh,
  function: Bh,
  method: jh,
  json: Fh
}, qt = /* @__PURE__ */ Symbol.for("r2wc.render"), xe = /* @__PURE__ */ Symbol.for("r2wc.connected"), Ct = /* @__PURE__ */ Symbol.for("r2wc.context"), st = /* @__PURE__ */ Symbol.for("r2wc.props");
function Uh(t, e, n) {
  var i, s, o;
  e.props || (e.props = t.propTypes ? Object.keys(t.propTypes) : []), e.events || (e.events = []);
  const r = Array.isArray(e.props) ? e.props.slice() : Object.keys(e.props), a = Array.isArray(e.events) ? e.events.slice() : Object.keys(e.events), l = {}, u = {}, c = {}, h = {};
  for (const f of r) {
    l[f] = Array.isArray(e.props) ? "string" : e.props[f];
    const p = Nh(f);
    c[f] = p, h[p] = f;
  }
  for (const f of a)
    u[f] = Array.isArray(e.events) ? {} : e.events[f];
  class d extends HTMLElement {
    constructor() {
      super(), ve(this, o, !0), ve(this, s), ve(this, i, {}), ve(this, "container"), e.shadow ? this.container = this.attachShadow({
        mode: e.shadow
      }) : this.container = this, this[st].container = this.container;
      for (const p of r) {
        const g = c[p], v = this.getAttribute(g), m = l[p], x = m ? sn[m] : null;
        if (m === "method") {
          const y = mo(g);
          Object.defineProperty(this[st].container, y, {
            enumerable: !0,
            configurable: !0,
            get() {
              return this[st][y];
            },
            set(S) {
              this[st][y] = S, this[qt]();
            }
          }), this[st][p] = x.parse(v, g, this);
        }
        x != null && x.parse && v && (this[st][p] = x.parse(v, g, this));
      }
      for (const p of a)
        this[st][p] = (g) => {
          const v = p.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(v, { detail: g, ...u[p] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(h);
    }
    connectedCallback() {
      this[xe] = !0, this[qt]();
    }
    disconnectedCallback() {
      this[xe] = !1, this[Ct] && n.unmount(this[Ct]), delete this[Ct];
    }
    attributeChangedCallback(p, g, v) {
      const m = h[p], x = l[m], y = x ? sn[x] : null;
      m in l && y != null && y.parse && v && (this[st][m] = y.parse(v, p, this), this[qt]());
    }
    [(o = xe, s = Ct, i = st, qt)]() {
      this[xe] && (this[Ct] ? n.update(this[Ct], this[st]) : this[Ct] = n.mount(
        this.container,
        t,
        this[st]
      ));
    }
  }
  for (const f of r) {
    const p = c[f], g = l[f];
    Object.defineProperty(d.prototype, f, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[st][f];
      },
      set(v) {
        this[st][f] = v;
        const m = g ? sn[g] : null;
        if (m != null && m.stringify) {
          const x = m.stringify(v, p, this);
          this.getAttribute(p) !== x && this.setAttribute(p, x);
        } else
          this[qt]();
      }
    });
  }
  return d;
}
function Kh(t, e, n) {
  const i = Ao(t), s = Ae.createElement(e, n);
  return i.render(s), {
    root: i,
    ReactComponent: e
  };
}
function Wh({ root: t, ReactComponent: e }, n) {
  const i = Ae.createElement(e, n);
  t.render(i);
}
function zh({ root: t }) {
  t.unmount();
}
function Gh(t, e = {}) {
  return Uh(t, e, { mount: Kh, update: Wh, unmount: zh });
}
const Zh = () => {
  if (typeof window < "u" && !customElements.get("agent-neo")) {
    const t = Gh(Rh, {
      props: {
        config: "json",
        preset: "string",
        context: "string",
        user: "json",
        onAction: "function"
      }
    });
    customElements.define("agent-neo", t), console.log("Agent Neo: <agent-neo> custom element registered."), console.log("Version 1.0.2");
  }
};
export {
  Ph as buildSystemPrompt,
  Ah as callEndpoint,
  ks as callLLM,
  po as deepMerge,
  Rh as default,
  Ch as parseLLMResponse,
  Zh as registerAgentNeo
};
