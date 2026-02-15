function Py(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var nl = { exports: {} }, mi = {}, rl = { exports: {} }, he = {};
var xd;
function Ay() {
  if (xd) return he;
  xd = 1;
  var n = /* @__PURE__ */ Symbol.for("react.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.provider"), f = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), y = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), x = Symbol.iterator;
  function S(T) {
    return T === null || typeof T != "object" ? null : (T = x && T[x] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var C = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, P = Object.assign, M = {};
  function L(T, I, le) {
    this.props = T, this.context = I, this.refs = M, this.updater = le || C;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(T, I) {
    if (typeof T != "object" && typeof T != "function" && T != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, T, I, "setState");
  }, L.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function D() {
  }
  D.prototype = L.prototype;
  function z(T, I, le) {
    this.props = T, this.context = I, this.refs = M, this.updater = le || C;
  }
  var _ = z.prototype = new D();
  _.constructor = z, P(_, L.prototype), _.isPureReactComponent = !0;
  var K = Array.isArray, Q = Object.prototype.hasOwnProperty, ie = { current: null }, de = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Y(T, I, le) {
    var oe, pe = {}, me = null, Ce = null;
    if (I != null) for (oe in I.ref !== void 0 && (Ce = I.ref), I.key !== void 0 && (me = "" + I.key), I) Q.call(I, oe) && !de.hasOwnProperty(oe) && (pe[oe] = I[oe]);
    var ye = arguments.length - 2;
    if (ye === 1) pe.children = le;
    else if (1 < ye) {
      for (var Pe = Array(ye), Ye = 0; Ye < ye; Ye++) Pe[Ye] = arguments[Ye + 2];
      pe.children = Pe;
    }
    if (T && T.defaultProps) for (oe in ye = T.defaultProps, ye) pe[oe] === void 0 && (pe[oe] = ye[oe]);
    return { $$typeof: n, type: T, key: me, ref: Ce, props: pe, _owner: ie.current };
  }
  function ce(T, I) {
    return { $$typeof: n, type: T.type, key: I, ref: T.ref, props: T.props, _owner: T._owner };
  }
  function Se(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function ze(T) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(le) {
      return I[le];
    });
  }
  var be = /\/+/g;
  function He(T, I) {
    return typeof T == "object" && T !== null && T.key != null ? ze("" + T.key) : I.toString(36);
  }
  function Ze(T, I, le, oe, pe) {
    var me = typeof T;
    (me === "undefined" || me === "boolean") && (T = null);
    var Ce = !1;
    if (T === null) Ce = !0;
    else switch (me) {
      case "string":
      case "number":
        Ce = !0;
        break;
      case "object":
        switch (T.$$typeof) {
          case n:
          case r:
            Ce = !0;
        }
    }
    if (Ce) return Ce = T, pe = pe(Ce), T = oe === "" ? "." + He(Ce, 0) : oe, K(pe) ? (le = "", T != null && (le = T.replace(be, "$&/") + "/"), Ze(pe, I, le, "", function(Ye) {
      return Ye;
    })) : pe != null && (Se(pe) && (pe = ce(pe, le + (!pe.key || Ce && Ce.key === pe.key ? "" : ("" + pe.key).replace(be, "$&/") + "/") + T)), I.push(pe)), 1;
    if (Ce = 0, oe = oe === "" ? "." : oe + ":", K(T)) for (var ye = 0; ye < T.length; ye++) {
      me = T[ye];
      var Pe = oe + He(me, ye);
      Ce += Ze(me, I, le, Pe, pe);
    }
    else if (Pe = S(T), typeof Pe == "function") for (T = Pe.call(T), ye = 0; !(me = T.next()).done; ) me = me.value, Pe = oe + He(me, ye++), Ce += Ze(me, I, le, Pe, pe);
    else if (me === "object") throw I = String(T), Error("Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead.");
    return Ce;
  }
  function tt(T, I, le) {
    if (T == null) return T;
    var oe = [], pe = 0;
    return Ze(T, oe, "", "", function(me) {
      return I.call(le, me, pe++);
    }), oe;
  }
  function Oe(T) {
    if (T._status === -1) {
      var I = T._result;
      I = I(), I.then(function(le) {
        (T._status === 0 || T._status === -1) && (T._status = 1, T._result = le);
      }, function(le) {
        (T._status === 0 || T._status === -1) && (T._status = 2, T._result = le);
      }), T._status === -1 && (T._status = 0, T._result = I);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var ue = { current: null }, j = { transition: null }, Z = { ReactCurrentDispatcher: ue, ReactCurrentBatchConfig: j, ReactCurrentOwner: ie };
  function $() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return he.Children = { map: tt, forEach: function(T, I, le) {
    tt(T, function() {
      I.apply(this, arguments);
    }, le);
  }, count: function(T) {
    var I = 0;
    return tt(T, function() {
      I++;
    }), I;
  }, toArray: function(T) {
    return tt(T, function(I) {
      return I;
    }) || [];
  }, only: function(T) {
    if (!Se(T)) throw Error("React.Children.only expected to receive a single React element child.");
    return T;
  } }, he.Component = L, he.Fragment = s, he.Profiler = c, he.PureComponent = z, he.StrictMode = a, he.Suspense = m, he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z, he.act = $, he.cloneElement = function(T, I, le) {
    if (T == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + T + ".");
    var oe = P({}, T.props), pe = T.key, me = T.ref, Ce = T._owner;
    if (I != null) {
      if (I.ref !== void 0 && (me = I.ref, Ce = ie.current), I.key !== void 0 && (pe = "" + I.key), T.type && T.type.defaultProps) var ye = T.type.defaultProps;
      for (Pe in I) Q.call(I, Pe) && !de.hasOwnProperty(Pe) && (oe[Pe] = I[Pe] === void 0 && ye !== void 0 ? ye[Pe] : I[Pe]);
    }
    var Pe = arguments.length - 2;
    if (Pe === 1) oe.children = le;
    else if (1 < Pe) {
      ye = Array(Pe);
      for (var Ye = 0; Ye < Pe; Ye++) ye[Ye] = arguments[Ye + 2];
      oe.children = ye;
    }
    return { $$typeof: n, type: T.type, key: pe, ref: me, props: oe, _owner: Ce };
  }, he.createContext = function(T) {
    return T = { $$typeof: f, _currentValue: T, _currentValue2: T, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, T.Provider = { $$typeof: d, _context: T }, T.Consumer = T;
  }, he.createElement = Y, he.createFactory = function(T) {
    var I = Y.bind(null, T);
    return I.type = T, I;
  }, he.createRef = function() {
    return { current: null };
  }, he.forwardRef = function(T) {
    return { $$typeof: h, render: T };
  }, he.isValidElement = Se, he.lazy = function(T) {
    return { $$typeof: g, _payload: { _status: -1, _result: T }, _init: Oe };
  }, he.memo = function(T, I) {
    return { $$typeof: y, type: T, compare: I === void 0 ? null : I };
  }, he.startTransition = function(T) {
    var I = j.transition;
    j.transition = {};
    try {
      T();
    } finally {
      j.transition = I;
    }
  }, he.unstable_act = $, he.useCallback = function(T, I) {
    return ue.current.useCallback(T, I);
  }, he.useContext = function(T) {
    return ue.current.useContext(T);
  }, he.useDebugValue = function() {
  }, he.useDeferredValue = function(T) {
    return ue.current.useDeferredValue(T);
  }, he.useEffect = function(T, I) {
    return ue.current.useEffect(T, I);
  }, he.useId = function() {
    return ue.current.useId();
  }, he.useImperativeHandle = function(T, I, le) {
    return ue.current.useImperativeHandle(T, I, le);
  }, he.useInsertionEffect = function(T, I) {
    return ue.current.useInsertionEffect(T, I);
  }, he.useLayoutEffect = function(T, I) {
    return ue.current.useLayoutEffect(T, I);
  }, he.useMemo = function(T, I) {
    return ue.current.useMemo(T, I);
  }, he.useReducer = function(T, I, le) {
    return ue.current.useReducer(T, I, le);
  }, he.useRef = function(T) {
    return ue.current.useRef(T);
  }, he.useState = function(T) {
    return ue.current.useState(T);
  }, he.useSyncExternalStore = function(T, I, le) {
    return ue.current.useSyncExternalStore(T, I, le);
  }, he.useTransition = function() {
    return ue.current.useTransition();
  }, he.version = "18.3.1", he;
}
var wd;
function Ql() {
  return wd || (wd = 1, rl.exports = Ay()), rl.exports;
}
var Sd;
function Ry() {
  if (Sd) return mi;
  Sd = 1;
  var n = Ql(), r = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(h, m, y) {
    var g, x = {}, S = null, C = null;
    y !== void 0 && (S = "" + y), m.key !== void 0 && (S = "" + m.key), m.ref !== void 0 && (C = m.ref);
    for (g in m) a.call(m, g) && !d.hasOwnProperty(g) && (x[g] = m[g]);
    if (h && h.defaultProps) for (g in m = h.defaultProps, m) x[g] === void 0 && (x[g] = m[g]);
    return { $$typeof: r, type: h, key: S, ref: C, props: x, _owner: c.current };
  }
  return mi.Fragment = s, mi.jsx = f, mi.jsxs = f, mi;
}
var kd;
function My() {
  return kd || (kd = 1, nl.exports = Ry()), nl.exports;
}
var W = My(), N = Ql();
const Js = /* @__PURE__ */ Py(N), Zl = N.createContext({});
function ql(n) {
  const r = N.useRef(null);
  return r.current === null && (r.current = n()), r.current;
}
const Hp = typeof window < "u", Yp = Hp ? N.useLayoutEffect : N.useEffect, ao = /* @__PURE__ */ N.createContext(null);
function Jl(n, r) {
  n.indexOf(r) === -1 && n.push(r);
}
function eu(n, r) {
  const s = n.indexOf(r);
  s > -1 && n.splice(s, 1);
}
const Qt = (n, r, s) => s > r ? r : s < n ? n : s;
let tu = () => {
};
const an = {}, Gp = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Xp(n) {
  return typeof n == "object" && n !== null;
}
const Qp = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function nu(n) {
  let r;
  return () => (r === void 0 && (r = n()), r);
}
const It = /* @__NO_SIDE_EFFECTS__ */ (n) => n, Dy = (n, r) => (s) => r(n(s)), Di = (...n) => n.reduce(Dy), Ci = /* @__NO_SIDE_EFFECTS__ */ (n, r, s) => {
  const a = r - n;
  return a === 0 ? 1 : (s - n) / a;
};
class ru {
  constructor() {
    this.subscriptions = [];
  }
  add(r) {
    return Jl(this.subscriptions, r), () => eu(this.subscriptions, r);
  }
  notify(r, s, a) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1)
        this.subscriptions[0](r, s, a);
      else
        for (let d = 0; d < c; d++) {
          const f = this.subscriptions[d];
          f && f(r, s, a);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const on = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, _t = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Zp(n, r) {
  return r ? n * (1e3 / r) : 0;
}
const qp = (n, r, s) => (((1 - 3 * s + 3 * r) * n + (3 * s - 6 * r)) * n + 3 * r) * n, Ly = 1e-7, _y = 12;
function Iy(n, r, s, a, c) {
  let d, f, h = 0;
  do
    f = r + (s - r) / 2, d = qp(f, a, c) - n, d > 0 ? s = f : r = f;
  while (Math.abs(d) > Ly && ++h < _y);
  return f;
}
function Li(n, r, s, a) {
  if (n === r && s === a)
    return It;
  const c = (d) => Iy(d, 0, 1, n, s);
  return (d) => d === 0 || d === 1 ? d : qp(c(d), r, a);
}
const Jp = (n) => (r) => r <= 0.5 ? n(2 * r) / 2 : (2 - n(2 * (1 - r))) / 2, eh = (n) => (r) => 1 - n(1 - r), th = /* @__PURE__ */ Li(0.33, 1.53, 0.69, 0.99), iu = /* @__PURE__ */ eh(th), nh = /* @__PURE__ */ Jp(iu), rh = (n) => (n *= 2) < 1 ? 0.5 * iu(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), su = (n) => 1 - Math.sin(Math.acos(n)), ih = eh(su), sh = Jp(su), Vy = /* @__PURE__ */ Li(0.42, 0, 1, 1), Ny = /* @__PURE__ */ Li(0, 0, 0.58, 1), oh = /* @__PURE__ */ Li(0.42, 0, 0.58, 1), Oy = (n) => Array.isArray(n) && typeof n[0] != "number", ah = (n) => Array.isArray(n) && typeof n[0] == "number", jy = {
  linear: It,
  easeIn: Vy,
  easeInOut: oh,
  easeOut: Ny,
  circIn: su,
  circInOut: sh,
  circOut: ih,
  backIn: iu,
  backInOut: nh,
  backOut: th,
  anticipate: rh
}, Fy = (n) => typeof n == "string", Td = (n) => {
  if (ah(n)) {
    tu(n.length === 4);
    const [r, s, a, c] = n;
    return Li(r, s, a, c);
  } else if (Fy(n))
    return jy[n];
  return n;
}, $s = [
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
function zy(n, r) {
  let s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), c = !1, d = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function m(g) {
    f.has(g) && (y.schedule(g), n()), g(h);
  }
  const y = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, x = !1, S = !1) => {
      const P = S && c ? s : a;
      return x && f.add(g), P.has(g) || P.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      a.delete(g), f.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (h = g, c) {
        d = !0;
        return;
      }
      c = !0, [s, a] = [a, s], s.forEach(m), s.clear(), c = !1, d && (d = !1, y.process(g));
    }
  };
  return y;
}
const By = 40;
function lh(n, r) {
  let s = !1, a = !0;
  const c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => s = !0, f = $s.reduce((_, K) => (_[K] = zy(d), _), {}), { setup: h, read: m, resolveKeyframes: y, preUpdate: g, update: x, preRender: S, render: C, postRender: P } = f, M = () => {
    const _ = an.useManualTiming ? c.timestamp : performance.now();
    s = !1, an.useManualTiming || (c.delta = a ? 1e3 / 60 : Math.max(Math.min(_ - c.timestamp, By), 1)), c.timestamp = _, c.isProcessing = !0, h.process(c), m.process(c), y.process(c), g.process(c), x.process(c), S.process(c), C.process(c), P.process(c), c.isProcessing = !1, s && r && (a = !1, n(M));
  }, L = () => {
    s = !0, a = !0, c.isProcessing || n(M);
  };
  return { schedule: $s.reduce((_, K) => {
    const Q = f[K];
    return _[K] = (ie, de = !1, Y = !1) => (s || L(), Q.schedule(ie, de, Y)), _;
  }, {}), cancel: (_) => {
    for (let K = 0; K < $s.length; K++)
      f[$s[K]].cancel(_);
  }, state: c, steps: f };
}
const { schedule: Re, cancel: Mn, state: it, steps: il } = /* @__PURE__ */ lh(typeof requestAnimationFrame < "u" ? requestAnimationFrame : It, !0);
let Xs;
function Uy() {
  Xs = void 0;
}
const dt = {
  now: () => (Xs === void 0 && dt.set(it.isProcessing || an.useManualTiming ? it.timestamp : performance.now()), Xs),
  set: (n) => {
    Xs = n, queueMicrotask(Uy);
  }
}, uh = (n) => (r) => typeof r == "string" && r.startsWith(n), ch = /* @__PURE__ */ uh("--"), $y = /* @__PURE__ */ uh("var(--"), ou = (n) => $y(n) ? Wy.test(n.split("/*")[0].trim()) : !1, Wy = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Cd(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Ar = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Ei = {
  ...Ar,
  transform: (n) => Qt(0, 1, n)
}, Ws = {
  ...Ar,
  default: 1
}, wi = (n) => Math.round(n * 1e5) / 1e5, au = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Ky(n) {
  return n == null;
}
const by = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, lu = (n, r) => (s) => !!(typeof s == "string" && by.test(s) && s.startsWith(n) || r && !Ky(s) && Object.prototype.hasOwnProperty.call(s, r)), fh = (n, r, s) => (a) => {
  if (typeof a != "string")
    return a;
  const [c, d, f, h] = a.match(au);
  return {
    [n]: parseFloat(c),
    [r]: parseFloat(d),
    [s]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, Hy = (n) => Qt(0, 255, n), sl = {
  ...Ar,
  transform: (n) => Math.round(Hy(n))
}, Gn = {
  test: /* @__PURE__ */ lu("rgb", "red"),
  parse: /* @__PURE__ */ fh("red", "green", "blue"),
  transform: ({ red: n, green: r, blue: s, alpha: a = 1 }) => "rgba(" + sl.transform(n) + ", " + sl.transform(r) + ", " + sl.transform(s) + ", " + wi(Ei.transform(a)) + ")"
};
function Yy(n) {
  let r = "", s = "", a = "", c = "";
  return n.length > 5 ? (r = n.substring(1, 3), s = n.substring(3, 5), a = n.substring(5, 7), c = n.substring(7, 9)) : (r = n.substring(1, 2), s = n.substring(2, 3), a = n.substring(3, 4), c = n.substring(4, 5), r += r, s += s, a += a, c += c), {
    red: parseInt(r, 16),
    green: parseInt(s, 16),
    blue: parseInt(a, 16),
    alpha: c ? parseInt(c, 16) / 255 : 1
  };
}
const El = {
  test: /* @__PURE__ */ lu("#"),
  parse: Yy,
  transform: Gn.transform
}, _i = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (r) => typeof r == "string" && r.endsWith(n) && r.split(" ").length === 1,
  parse: parseFloat,
  transform: (r) => `${r}${n}`
}), An = /* @__PURE__ */ _i("deg"), Xt = /* @__PURE__ */ _i("%"), X = /* @__PURE__ */ _i("px"), Gy = /* @__PURE__ */ _i("vh"), Xy = /* @__PURE__ */ _i("vw"), Ed = {
  ...Xt,
  parse: (n) => Xt.parse(n) / 100,
  transform: (n) => Xt.transform(n * 100)
}, Sr = {
  test: /* @__PURE__ */ lu("hsl", "hue"),
  parse: /* @__PURE__ */ fh("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: r, lightness: s, alpha: a = 1 }) => "hsla(" + Math.round(n) + ", " + Xt.transform(wi(r)) + ", " + Xt.transform(wi(s)) + ", " + wi(Ei.transform(a)) + ")"
}, Ke = {
  test: (n) => Gn.test(n) || El.test(n) || Sr.test(n),
  parse: (n) => Gn.test(n) ? Gn.parse(n) : Sr.test(n) ? Sr.parse(n) : El.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Gn.transform(n) : Sr.transform(n),
  getAnimatableNone: (n) => {
    const r = Ke.parse(n);
    return r.alpha = 0, Ke.transform(r);
  }
}, Qy = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Zy(n) {
  return isNaN(n) && typeof n == "string" && (n.match(au)?.length || 0) + (n.match(Qy)?.length || 0) > 0;
}
const dh = "number", ph = "color", qy = "var", Jy = "var(", Pd = "${}", ev = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Pi(n) {
  const r = n.toString(), s = [], a = {
    color: [],
    number: [],
    var: []
  }, c = [];
  let d = 0;
  const h = r.replace(ev, (m) => (Ke.test(m) ? (a.color.push(d), c.push(ph), s.push(Ke.parse(m))) : m.startsWith(Jy) ? (a.var.push(d), c.push(qy), s.push(m)) : (a.number.push(d), c.push(dh), s.push(parseFloat(m))), ++d, Pd)).split(Pd);
  return { values: s, split: h, indexes: a, types: c };
}
function hh(n) {
  return Pi(n).values;
}
function mh(n) {
  const { split: r, types: s } = Pi(n), a = r.length;
  return (c) => {
    let d = "";
    for (let f = 0; f < a; f++)
      if (d += r[f], c[f] !== void 0) {
        const h = s[f];
        h === dh ? d += wi(c[f]) : h === ph ? d += Ke.transform(c[f]) : d += c[f];
      }
    return d;
  };
}
const tv = (n) => typeof n == "number" ? 0 : Ke.test(n) ? Ke.getAnimatableNone(n) : n;
function nv(n) {
  const r = hh(n);
  return mh(n)(r.map(tv));
}
const Dn = {
  test: Zy,
  parse: hh,
  createTransformer: mh,
  getAnimatableNone: nv
};
function ol(n, r, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? n + (r - n) * 6 * s : s < 1 / 2 ? r : s < 2 / 3 ? n + (r - n) * (2 / 3 - s) * 6 : n;
}
function rv({ hue: n, saturation: r, lightness: s, alpha: a }) {
  n /= 360, r /= 100, s /= 100;
  let c = 0, d = 0, f = 0;
  if (!r)
    c = d = f = s;
  else {
    const h = s < 0.5 ? s * (1 + r) : s + r - s * r, m = 2 * s - h;
    c = ol(m, h, n + 1 / 3), d = ol(m, h, n), f = ol(m, h, n - 1 / 3);
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(d * 255),
    blue: Math.round(f * 255),
    alpha: a
  };
}
function eo(n, r) {
  return (s) => s > 0 ? r : n;
}
const Ne = (n, r, s) => n + (r - n) * s, al = (n, r, s) => {
  const a = n * n, c = s * (r * r - a) + a;
  return c < 0 ? 0 : Math.sqrt(c);
}, iv = [El, Gn, Sr], sv = (n) => iv.find((r) => r.test(n));
function Ad(n) {
  const r = sv(n);
  if (!r)
    return !1;
  let s = r.parse(n);
  return r === Sr && (s = rv(s)), s;
}
const Rd = (n, r) => {
  const s = Ad(n), a = Ad(r);
  if (!s || !a)
    return eo(n, r);
  const c = { ...s };
  return (d) => (c.red = al(s.red, a.red, d), c.green = al(s.green, a.green, d), c.blue = al(s.blue, a.blue, d), c.alpha = Ne(s.alpha, a.alpha, d), Gn.transform(c));
}, Pl = /* @__PURE__ */ new Set(["none", "hidden"]);
function ov(n, r) {
  return Pl.has(n) ? (s) => s <= 0 ? n : r : (s) => s >= 1 ? r : n;
}
function av(n, r) {
  return (s) => Ne(n, r, s);
}
function uu(n) {
  return typeof n == "number" ? av : typeof n == "string" ? ou(n) ? eo : Ke.test(n) ? Rd : cv : Array.isArray(n) ? gh : typeof n == "object" ? Ke.test(n) ? Rd : lv : eo;
}
function gh(n, r) {
  const s = [...n], a = s.length, c = n.map((d, f) => uu(d)(d, r[f]));
  return (d) => {
    for (let f = 0; f < a; f++)
      s[f] = c[f](d);
    return s;
  };
}
function lv(n, r) {
  const s = { ...n, ...r }, a = {};
  for (const c in s)
    n[c] !== void 0 && r[c] !== void 0 && (a[c] = uu(n[c])(n[c], r[c]));
  return (c) => {
    for (const d in a)
      s[d] = a[d](c);
    return s;
  };
}
function uv(n, r) {
  const s = [], a = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < r.values.length; c++) {
    const d = r.types[c], f = n.indexes[d][a[d]], h = n.values[f] ?? 0;
    s[c] = h, a[d]++;
  }
  return s;
}
const cv = (n, r) => {
  const s = Dn.createTransformer(r), a = Pi(n), c = Pi(r);
  return a.indexes.var.length === c.indexes.var.length && a.indexes.color.length === c.indexes.color.length && a.indexes.number.length >= c.indexes.number.length ? Pl.has(n) && !c.values.length || Pl.has(r) && !a.values.length ? ov(n, r) : Di(gh(uv(a, c), c.values), s) : eo(n, r);
};
function yh(n, r, s) {
  return typeof n == "number" && typeof r == "number" && typeof s == "number" ? Ne(n, r, s) : uu(n)(n, r);
}
const fv = (n) => {
  const r = ({ timestamp: s }) => n(s);
  return {
    start: (s = !0) => Re.update(r, s),
    stop: () => Mn(r),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => it.isProcessing ? it.timestamp : dt.now()
  };
}, vh = (n, r, s = 10) => {
  let a = "";
  const c = Math.max(Math.round(r / s), 2);
  for (let d = 0; d < c; d++)
    a += Math.round(n(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${a.substring(0, a.length - 2)})`;
}, to = 2e4;
function cu(n) {
  let r = 0;
  const s = 50;
  let a = n.next(r);
  for (; !a.done && r < to; )
    r += s, a = n.next(r);
  return r >= to ? 1 / 0 : r;
}
function dv(n, r = 100, s) {
  const a = s({ ...n, keyframes: [0, r] }), c = Math.min(cu(a), to);
  return {
    type: "keyframes",
    ease: (d) => a.next(c * d).value / r,
    duration: /* @__PURE__ */ _t(c)
  };
}
const pv = 5;
function xh(n, r, s) {
  const a = Math.max(r - pv, 0);
  return Zp(s - n(a), r - a);
}
const Fe = {
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
}, ll = 1e-3;
function hv({ duration: n = Fe.duration, bounce: r = Fe.bounce, velocity: s = Fe.velocity, mass: a = Fe.mass }) {
  let c, d, f = 1 - r;
  f = Qt(Fe.minDamping, Fe.maxDamping, f), n = Qt(Fe.minDuration, Fe.maxDuration, /* @__PURE__ */ _t(n)), f < 1 ? (c = (y) => {
    const g = y * f, x = g * n, S = g - s, C = Al(y, f), P = Math.exp(-x);
    return ll - S / C * P;
  }, d = (y) => {
    const x = y * f * n, S = x * s + s, C = Math.pow(f, 2) * Math.pow(y, 2) * n, P = Math.exp(-x), M = Al(Math.pow(y, 2), f);
    return (-c(y) + ll > 0 ? -1 : 1) * ((S - C) * P) / M;
  }) : (c = (y) => {
    const g = Math.exp(-y * n), x = (y - s) * n + 1;
    return -ll + g * x;
  }, d = (y) => {
    const g = Math.exp(-y * n), x = (s - y) * (n * n);
    return g * x;
  });
  const h = 5 / n, m = gv(c, d, h);
  if (n = /* @__PURE__ */ on(n), isNaN(m))
    return {
      stiffness: Fe.stiffness,
      damping: Fe.damping,
      duration: n
    };
  {
    const y = Math.pow(m, 2) * a;
    return {
      stiffness: y,
      damping: f * 2 * Math.sqrt(a * y),
      duration: n
    };
  }
}
const mv = 12;
function gv(n, r, s) {
  let a = s;
  for (let c = 1; c < mv; c++)
    a = a - n(a) / r(a);
  return a;
}
function Al(n, r) {
  return n * Math.sqrt(1 - r * r);
}
const yv = ["duration", "bounce"], vv = ["stiffness", "damping", "mass"];
function Md(n, r) {
  return r.some((s) => n[s] !== void 0);
}
function xv(n) {
  let r = {
    velocity: Fe.velocity,
    stiffness: Fe.stiffness,
    damping: Fe.damping,
    mass: Fe.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Md(n, vv) && Md(n, yv))
    if (n.visualDuration) {
      const s = n.visualDuration, a = 2 * Math.PI / (s * 1.2), c = a * a, d = 2 * Qt(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(c);
      r = {
        ...r,
        mass: Fe.mass,
        stiffness: c,
        damping: d
      };
    } else {
      const s = hv(n);
      r = {
        ...r,
        ...s,
        mass: Fe.mass
      }, r.isResolvedFromDuration = !0;
    }
  return r;
}
function no(n = Fe.visualDuration, r = Fe.bounce) {
  const s = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: r
  } : n;
  let { restSpeed: a, restDelta: c } = s;
  const d = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], h = { done: !1, value: d }, { stiffness: m, damping: y, mass: g, duration: x, velocity: S, isResolvedFromDuration: C } = xv({
    ...s,
    velocity: -/* @__PURE__ */ _t(s.velocity || 0)
  }), P = S || 0, M = y / (2 * Math.sqrt(m * g)), L = f - d, D = /* @__PURE__ */ _t(Math.sqrt(m / g)), z = Math.abs(L) < 5;
  a || (a = z ? Fe.restSpeed.granular : Fe.restSpeed.default), c || (c = z ? Fe.restDelta.granular : Fe.restDelta.default);
  let _;
  if (M < 1) {
    const Q = Al(D, M);
    _ = (ie) => {
      const de = Math.exp(-M * D * ie);
      return f - de * ((P + M * D * L) / Q * Math.sin(Q * ie) + L * Math.cos(Q * ie));
    };
  } else if (M === 1)
    _ = (Q) => f - Math.exp(-D * Q) * (L + (P + D * L) * Q);
  else {
    const Q = D * Math.sqrt(M * M - 1);
    _ = (ie) => {
      const de = Math.exp(-M * D * ie), Y = Math.min(Q * ie, 300);
      return f - de * ((P + M * D * L) * Math.sinh(Y) + Q * L * Math.cosh(Y)) / Q;
    };
  }
  const K = {
    calculatedDuration: C && x || null,
    next: (Q) => {
      const ie = _(Q);
      if (C)
        h.done = Q >= x;
      else {
        let de = Q === 0 ? P : 0;
        M < 1 && (de = Q === 0 ? /* @__PURE__ */ on(P) : xh(_, Q, ie));
        const Y = Math.abs(de) <= a, ce = Math.abs(f - ie) <= c;
        h.done = Y && ce;
      }
      return h.value = h.done ? f : ie, h;
    },
    toString: () => {
      const Q = Math.min(cu(K), to), ie = vh((de) => K.next(Q * de).value, Q, 30);
      return Q + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return K;
}
no.applyToOptions = (n) => {
  const r = dv(n, 100, no);
  return n.ease = r.ease, n.duration = /* @__PURE__ */ on(r.duration), n.type = "keyframes", n;
};
function Rl({ keyframes: n, velocity: r = 0, power: s = 0.8, timeConstant: a = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: f, min: h, max: m, restDelta: y = 0.5, restSpeed: g }) {
  const x = n[0], S = {
    done: !1,
    value: x
  }, C = (Y) => h !== void 0 && Y < h || m !== void 0 && Y > m, P = (Y) => h === void 0 ? m : m === void 0 || Math.abs(h - Y) < Math.abs(m - Y) ? h : m;
  let M = s * r;
  const L = x + M, D = f === void 0 ? L : f(L);
  D !== L && (M = D - x);
  const z = (Y) => -M * Math.exp(-Y / a), _ = (Y) => D + z(Y), K = (Y) => {
    const ce = z(Y), Se = _(Y);
    S.done = Math.abs(ce) <= y, S.value = S.done ? D : Se;
  };
  let Q, ie;
  const de = (Y) => {
    C(S.value) && (Q = Y, ie = no({
      keyframes: [S.value, P(S.value)],
      velocity: xh(_, Y, S.value),
      // TODO: This should be passing * 1000
      damping: c,
      stiffness: d,
      restDelta: y,
      restSpeed: g
    }));
  };
  return de(0), {
    calculatedDuration: null,
    next: (Y) => {
      let ce = !1;
      return !ie && Q === void 0 && (ce = !0, K(Y), de(Y)), Q !== void 0 && Y >= Q ? ie.next(Y - Q) : (!ce && K(Y), S);
    }
  };
}
function wv(n, r, s) {
  const a = [], c = s || an.mix || yh, d = n.length - 1;
  for (let f = 0; f < d; f++) {
    let h = c(n[f], n[f + 1]);
    if (r) {
      const m = Array.isArray(r) ? r[f] || It : r;
      h = Di(m, h);
    }
    a.push(h);
  }
  return a;
}
function Sv(n, r, { clamp: s = !0, ease: a, mixer: c } = {}) {
  const d = n.length;
  if (tu(d === r.length), d === 1)
    return () => r[0];
  if (d === 2 && r[0] === r[1])
    return () => r[1];
  const f = n[0] === n[1];
  n[0] > n[d - 1] && (n = [...n].reverse(), r = [...r].reverse());
  const h = wv(r, a, c), m = h.length, y = (g) => {
    if (f && g < n[0])
      return r[0];
    let x = 0;
    if (m > 1)
      for (; x < n.length - 2 && !(g < n[x + 1]); x++)
        ;
    const S = /* @__PURE__ */ Ci(n[x], n[x + 1], g);
    return h[x](S);
  };
  return s ? (g) => y(Qt(n[0], n[d - 1], g)) : y;
}
function kv(n, r) {
  const s = n[n.length - 1];
  for (let a = 1; a <= r; a++) {
    const c = /* @__PURE__ */ Ci(0, r, a);
    n.push(Ne(s, 1, c));
  }
}
function Tv(n) {
  const r = [0];
  return kv(r, n.length - 1), r;
}
function Cv(n, r) {
  return n.map((s) => s * r);
}
function Ev(n, r) {
  return n.map(() => r || oh).splice(0, n.length - 1);
}
function Si({ duration: n = 300, keyframes: r, times: s, ease: a = "easeInOut" }) {
  const c = Oy(a) ? a.map(Td) : Td(a), d = {
    done: !1,
    value: r[0]
  }, f = Cv(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === r.length ? s : Tv(r),
    n
  ), h = Sv(f, r, {
    ease: Array.isArray(c) ? c : Ev(r, c)
  });
  return {
    calculatedDuration: n,
    next: (m) => (d.value = h(m), d.done = m >= n, d)
  };
}
const Pv = (n) => n !== null;
function fu(n, { repeat: r, repeatType: s = "loop" }, a, c = 1) {
  const d = n.filter(Pv), h = c < 0 || r && s !== "loop" && r % 2 === 1 ? 0 : d.length - 1;
  return !h || a === void 0 ? d[h] : a;
}
const Av = {
  decay: Rl,
  inertia: Rl,
  tween: Si,
  keyframes: Si,
  spring: no
};
function wh(n) {
  typeof n.type == "string" && (n.type = Av[n.type]);
}
class du {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((r) => {
      this.resolve = r;
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
  then(r, s) {
    return this.finished.then(r, s);
  }
}
const Rv = (n) => n / 100;
class pu extends du {
  constructor(r) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== dt.now() && this.tick(dt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = r, this.initAnimation(), this.play(), r.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: r } = this;
    wh(r);
    const { type: s = Si, repeat: a = 0, repeatDelay: c = 0, repeatType: d, velocity: f = 0 } = r;
    let { keyframes: h } = r;
    const m = s || Si;
    m !== Si && typeof h[0] != "number" && (this.mixKeyframes = Di(Rv, yh(h[0], h[1])), h = [0, 100]);
    const y = m({ ...r, keyframes: h });
    d === "mirror" && (this.mirroredGenerator = m({
      ...r,
      keyframes: [...h].reverse(),
      velocity: -f
    })), y.calculatedDuration === null && (y.calculatedDuration = cu(y));
    const { calculatedDuration: g } = y;
    this.calculatedDuration = g, this.resolvedDuration = g + c, this.totalDuration = this.resolvedDuration * (a + 1) - c, this.generator = y;
  }
  updateTime(r) {
    const s = Math.round(r - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(r, s = !1) {
    const { generator: a, totalDuration: c, mixKeyframes: d, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: m } = this;
    if (this.startTime === null)
      return a.next(0);
    const { delay: y = 0, keyframes: g, repeat: x, repeatType: S, repeatDelay: C, type: P, onUpdate: M, finalKeyframe: L } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, r) : this.speed < 0 && (this.startTime = Math.min(r - c / this.speed, this.startTime)), s ? this.currentTime = r : this.updateTime(r);
    const D = this.currentTime - y * (this.playbackSpeed >= 0 ? 1 : -1), z = this.playbackSpeed >= 0 ? D < 0 : D > c;
    this.currentTime = Math.max(D, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let _ = this.currentTime, K = a;
    if (x) {
      const Y = Math.min(this.currentTime, c) / h;
      let ce = Math.floor(Y), Se = Y % 1;
      !Se && Y >= 1 && (Se = 1), Se === 1 && ce--, ce = Math.min(ce, x + 1), ce % 2 && (S === "reverse" ? (Se = 1 - Se, C && (Se -= C / h)) : S === "mirror" && (K = f)), _ = Qt(0, 1, Se) * h;
    }
    const Q = z ? { done: !1, value: g[0] } : K.next(_);
    d && (Q.value = d(Q.value));
    let { done: ie } = Q;
    !z && m !== null && (ie = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const de = this.holdTime === null && (this.state === "finished" || this.state === "running" && ie);
    return de && P !== Rl && (Q.value = fu(g, this.options, L, this.speed)), M && M(Q.value), de && this.finish(), Q;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(r, s) {
    return this.finished.then(r, s);
  }
  get duration() {
    return /* @__PURE__ */ _t(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: r = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ _t(r);
  }
  get time() {
    return /* @__PURE__ */ _t(this.currentTime);
  }
  set time(r) {
    r = /* @__PURE__ */ on(r), this.currentTime = r, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = r : this.driver && (this.startTime = this.driver.now() - r / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(r) {
    this.updateTime(dt.now());
    const s = this.playbackSpeed !== r;
    this.playbackSpeed = r, s && (this.time = /* @__PURE__ */ _t(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: r = fv, startTime: s } = this.options;
    this.driver || (this.driver = r((c) => this.tick(c))), this.options.onPlay?.();
    const a = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = a) : this.holdTime !== null ? this.startTime = a - this.holdTime : this.startTime || (this.startTime = s ?? a), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(dt.now()), this.holdTime = this.currentTime;
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
  sample(r) {
    return this.startTime = 0, this.tick(r, !0);
  }
  attachTimeline(r) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), r.observe(this);
  }
}
function Mv(n) {
  for (let r = 1; r < n.length; r++)
    n[r] ?? (n[r] = n[r - 1]);
}
const Xn = (n) => n * 180 / Math.PI, Ml = (n) => {
  const r = Xn(Math.atan2(n[1], n[0]));
  return Dl(r);
}, Dv = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Ml,
  rotateZ: Ml,
  skewX: (n) => Xn(Math.atan(n[1])),
  skewY: (n) => Xn(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Dl = (n) => (n = n % 360, n < 0 && (n += 360), n), Dd = Ml, Ld = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), _d = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), Lv = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Ld,
  scaleY: _d,
  scale: (n) => (Ld(n) + _d(n)) / 2,
  rotateX: (n) => Dl(Xn(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Dl(Xn(Math.atan2(-n[2], n[0]))),
  rotateZ: Dd,
  rotate: Dd,
  skewX: (n) => Xn(Math.atan(n[4])),
  skewY: (n) => Xn(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Ll(n) {
  return n.includes("scale") ? 1 : 0;
}
function _l(n, r) {
  if (!n || n === "none")
    return Ll(r);
  const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let a, c;
  if (s)
    a = Lv, c = s;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    a = Dv, c = h;
  }
  if (!c)
    return Ll(r);
  const d = a[r], f = c[1].split(",").map(Iv);
  return typeof d == "function" ? d(f) : f[d];
}
const _v = (n, r) => {
  const { transform: s = "none" } = getComputedStyle(n);
  return _l(s, r);
};
function Iv(n) {
  return parseFloat(n.trim());
}
const Rr = [
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
], Mr = new Set(Rr), Id = (n) => n === Ar || n === X, Vv = /* @__PURE__ */ new Set(["x", "y", "z"]), Nv = Rr.filter((n) => !Vv.has(n));
function Ov(n) {
  const r = [];
  return Nv.forEach((s) => {
    const a = n.getValue(s);
    a !== void 0 && (r.push([s, a.get()]), a.set(s.startsWith("scale") ? 1 : 0));
  }), r;
}
const Rn = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: r = "0", paddingRight: s = "0" }) => n.max - n.min - parseFloat(r) - parseFloat(s),
  height: ({ y: n }, { paddingTop: r = "0", paddingBottom: s = "0" }) => n.max - n.min - parseFloat(r) - parseFloat(s),
  top: (n, { top: r }) => parseFloat(r),
  left: (n, { left: r }) => parseFloat(r),
  bottom: ({ y: n }, { top: r }) => parseFloat(r) + (n.max - n.min),
  right: ({ x: n }, { left: r }) => parseFloat(r) + (n.max - n.min),
  // Transform
  x: (n, { transform: r }) => _l(r, "x"),
  y: (n, { transform: r }) => _l(r, "y")
};
Rn.translateX = Rn.x;
Rn.translateY = Rn.y;
const Qn = /* @__PURE__ */ new Set();
let Il = !1, Vl = !1, Nl = !1;
function Sh() {
  if (Vl) {
    const n = Array.from(Qn).filter((a) => a.needsMeasurement), r = new Set(n.map((a) => a.element)), s = /* @__PURE__ */ new Map();
    r.forEach((a) => {
      const c = Ov(a);
      c.length && (s.set(a, c), a.render());
    }), n.forEach((a) => a.measureInitialState()), r.forEach((a) => {
      a.render();
      const c = s.get(a);
      c && c.forEach(([d, f]) => {
        a.getValue(d)?.set(f);
      });
    }), n.forEach((a) => a.measureEndState()), n.forEach((a) => {
      a.suspendedScrollY !== void 0 && window.scrollTo(0, a.suspendedScrollY);
    });
  }
  Vl = !1, Il = !1, Qn.forEach((n) => n.complete(Nl)), Qn.clear();
}
function kh() {
  Qn.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Vl = !0);
  });
}
function jv() {
  Nl = !0, kh(), Sh(), Nl = !1;
}
class hu {
  constructor(r, s, a, c, d, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...r], this.onComplete = s, this.name = a, this.motionValue = c, this.element = d, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qn.add(this), Il || (Il = !0, Re.read(kh), Re.resolveKeyframes(Sh))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, name: s, element: a, motionValue: c } = this;
    if (r[0] === null) {
      const d = c?.get(), f = r[r.length - 1];
      if (d !== void 0)
        r[0] = d;
      else if (a && s) {
        const h = a.readValue(s, f);
        h != null && (r[0] = h);
      }
      r[0] === void 0 && (r[0] = f), c && d === void 0 && c.set(r[0]);
    }
    Mv(r);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(r = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, r), Qn.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Qn.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Fv = (n) => n.startsWith("--");
function zv(n, r, s) {
  Fv(r) ? n.style.setProperty(r, s) : n.style[r] = s;
}
const Bv = /* @__PURE__ */ nu(() => window.ScrollTimeline !== void 0), Uv = {};
function $v(n, r) {
  const s = /* @__PURE__ */ nu(n);
  return () => Uv[r] ?? s();
}
const Th = /* @__PURE__ */ $v(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), vi = ([n, r, s, a]) => `cubic-bezier(${n}, ${r}, ${s}, ${a})`, Vd = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ vi([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ vi([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ vi([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ vi([0.33, 1.53, 0.69, 0.99])
};
function Ch(n, r) {
  if (n)
    return typeof n == "function" ? Th() ? vh(n, r) : "ease-out" : ah(n) ? vi(n) : Array.isArray(n) ? n.map((s) => Ch(s, r) || Vd.easeOut) : Vd[n];
}
function Wv(n, r, s, { delay: a = 0, duration: c = 300, repeat: d = 0, repeatType: f = "loop", ease: h = "easeOut", times: m } = {}, y = void 0) {
  const g = {
    [r]: s
  };
  m && (g.offset = m);
  const x = Ch(h, c);
  Array.isArray(x) && (g.easing = x);
  const S = {
    delay: a,
    duration: c,
    easing: Array.isArray(x) ? "linear" : x,
    fill: "both",
    iterations: d + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return y && (S.pseudoElement = y), n.animate(g, S);
}
function Eh(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function Kv({ type: n, ...r }) {
  return Eh(n) && Th() ? n.applyToOptions(r) : (r.duration ?? (r.duration = 300), r.ease ?? (r.ease = "easeOut"), r);
}
class bv extends du {
  constructor(r) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !r)
      return;
    const { element: s, name: a, keyframes: c, pseudoElement: d, allowFlatten: f = !1, finalKeyframe: h, onComplete: m } = r;
    this.isPseudoElement = !!d, this.allowFlatten = f, this.options = r, tu(typeof r.type != "string");
    const y = Kv(r);
    this.animation = Wv(s, a, c, y, d), y.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const g = fu(c, this.options, h, this.speed);
        this.updateMotionValue ? this.updateMotionValue(g) : zv(s, a, g), this.animation.cancel();
      }
      m?.(), this.notifyFinished();
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
    const { state: r } = this;
    r === "idle" || r === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
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
    const r = this.options?.element;
    !this.isPseudoElement && r?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const r = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ _t(Number(r));
  }
  get iterationDuration() {
    const { delay: r = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ _t(r);
  }
  get time() {
    return /* @__PURE__ */ _t(Number(this.animation.currentTime) || 0);
  }
  set time(r) {
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ on(r);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(r) {
    r < 0 && (this.finishedTime = null), this.animation.playbackRate = r;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(r) {
    this.manualStartTime = this.animation.startTime = r;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: r, observe: s }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, r && Bv() ? (this.animation.timeline = r, It) : s(this);
  }
}
const Ph = {
  anticipate: rh,
  backInOut: nh,
  circInOut: sh
};
function Hv(n) {
  return n in Ph;
}
function Yv(n) {
  typeof n.ease == "string" && Hv(n.ease) && (n.ease = Ph[n.ease]);
}
const ul = 10;
class Gv extends bv {
  constructor(r) {
    Yv(r), wh(r), super(r), r.startTime !== void 0 && (this.startTime = r.startTime), this.options = r;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(r) {
    const { motionValue: s, onUpdate: a, onComplete: c, element: d, ...f } = this.options;
    if (!s)
      return;
    if (r !== void 0) {
      s.set(r);
      return;
    }
    const h = new pu({
      ...f,
      autoplay: !1
    }), m = Math.max(ul, dt.now() - this.startTime), y = Qt(0, ul, m - ul);
    s.setWithVelocity(h.sample(Math.max(0, m - y)).value, h.sample(m).value, y), h.stop();
  }
}
const Nd = (n, r) => r === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Dn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function Xv(n) {
  const r = n[0];
  if (n.length === 1)
    return !0;
  for (let s = 0; s < n.length; s++)
    if (n[s] !== r)
      return !0;
}
function Qv(n, r, s, a) {
  const c = n[0];
  if (c === null)
    return !1;
  if (r === "display" || r === "visibility")
    return !0;
  const d = n[n.length - 1], f = Nd(c, r), h = Nd(d, r);
  return !f || !h ? !1 : Xv(n) || (s === "spring" || Eh(s)) && a;
}
function Ol(n) {
  n.duration = 0, n.type = "keyframes";
}
const Zv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), qv = /* @__PURE__ */ nu(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Jv(n) {
  const { motionValue: r, name: s, repeatDelay: a, repeatType: c, damping: d, type: f } = n;
  if (!(r?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = r.owner.getProps();
  return qv() && s && Zv.has(s) && (s !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !a && c !== "mirror" && d !== 0 && f !== "inertia";
}
const e0 = 40;
class t0 extends du {
  constructor({ autoplay: r = !0, delay: s = 0, type: a = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: f = "loop", keyframes: h, name: m, motionValue: y, element: g, ...x }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = dt.now();
    const S = {
      autoplay: r,
      delay: s,
      type: a,
      repeat: c,
      repeatDelay: d,
      repeatType: f,
      name: m,
      motionValue: y,
      element: g,
      ...x
    }, C = g?.KeyframeResolver || hu;
    this.keyframeResolver = new C(h, (P, M, L) => this.onKeyframesResolved(P, M, S, !L), m, y, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(r, s, a, c) {
    this.keyframeResolver = void 0;
    const { name: d, type: f, velocity: h, delay: m, isHandoff: y, onUpdate: g } = a;
    this.resolvedAt = dt.now(), Qv(r, d, f, h) || ((an.instantAnimations || !m) && g?.(fu(r, a, s)), r[0] = r[r.length - 1], Ol(a), a.repeat = 0);
    const S = {
      startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > e0 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...a,
      keyframes: r
    }, C = !y && Jv(S), P = S.motionValue?.owner?.current, M = C ? new Gv({
      ...S,
      element: P
    }) : new pu(S);
    M.finished.then(() => {
      this.notifyFinished();
    }).catch(It), this.pendingTimeline && (this.stopTimeline = M.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = M;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(r, s) {
    return this.finished.finally(r).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), jv()), this._animation;
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
  set time(r) {
    this.animation.time = r;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(r) {
    this.animation.speed = r;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(r) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(r) : this.pendingTimeline = r, () => this.stop();
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
function Ah(n, r, s, a = 0, c = 1) {
  const d = Array.from(n).sort((y, g) => y.sortNodePosition(g)).indexOf(r), f = n.size, h = (f - 1) * a;
  return typeof s == "function" ? s(d, f) : c === 1 ? d * a : h - d * a;
}
const n0 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function r0(n) {
  const r = n0.exec(n);
  if (!r)
    return [,];
  const [, s, a, c] = r;
  return [`--${s ?? a}`, c];
}
function Rh(n, r, s = 1) {
  const [a, c] = r0(n);
  if (!a)
    return;
  const d = window.getComputedStyle(r).getPropertyValue(a);
  if (d) {
    const f = d.trim();
    return Gp(f) ? parseFloat(f) : f;
  }
  return ou(c) ? Rh(c, r, s + 1) : c;
}
const i0 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, s0 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), o0 = {
  type: "keyframes",
  duration: 0.8
}, a0 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, l0 = (n, { keyframes: r }) => r.length > 2 ? o0 : Mr.has(n) ? n.startsWith("scale") ? s0(r[1]) : i0 : a0, u0 = (n) => n !== null;
function c0(n, { repeat: r, repeatType: s = "loop" }, a) {
  const c = n.filter(u0), d = r && s !== "loop" && r % 2 === 1 ? 0 : c.length - 1;
  return c[d];
}
function mu(n, r) {
  return n?.[r] ?? n?.default ?? n;
}
function f0({ when: n, delay: r, delayChildren: s, staggerChildren: a, staggerDirection: c, repeat: d, repeatType: f, repeatDelay: h, from: m, elapsed: y, ...g }) {
  return !!Object.keys(g).length;
}
const gu = (n, r, s, a = {}, c, d) => (f) => {
  const h = mu(a, n) || {}, m = h.delay || a.delay || 0;
  let { elapsed: y = 0 } = a;
  y = y - /* @__PURE__ */ on(m);
  const g = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: r.getVelocity(),
    ...h,
    delay: -y,
    onUpdate: (S) => {
      r.set(S), h.onUpdate && h.onUpdate(S);
    },
    onComplete: () => {
      f(), h.onComplete && h.onComplete();
    },
    name: n,
    motionValue: r,
    element: d ? void 0 : c
  };
  f0(h) || Object.assign(g, l0(n, g)), g.duration && (g.duration = /* @__PURE__ */ on(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ on(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let x = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Ol(g), g.delay === 0 && (x = !0)), (an.instantAnimations || an.skipAnimations || c?.shouldSkipAnimations) && (x = !0, Ol(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, x && !d && r.get() !== void 0) {
    const S = c0(g.keyframes, h);
    if (S !== void 0) {
      Re.update(() => {
        g.onUpdate(S), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new pu(g) : new t0(g);
};
function Od(n) {
  const r = [{}, {}];
  return n?.values.forEach((s, a) => {
    r[0][a] = s.get(), r[1][a] = s.getVelocity();
  }), r;
}
function yu(n, r, s, a) {
  if (typeof r == "function") {
    const [c, d] = Od(a);
    r = r(s !== void 0 ? s : n.custom, c, d);
  }
  if (typeof r == "string" && (r = n.variants && n.variants[r]), typeof r == "function") {
    const [c, d] = Od(a);
    r = r(s !== void 0 ? s : n.custom, c, d);
  }
  return r;
}
function Er(n, r, s) {
  const a = n.getProps();
  return yu(a, r, s !== void 0 ? s : a.custom, n);
}
const Mh = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Rr
]), jd = 30, d0 = (n) => !isNaN(parseFloat(n));
class p0 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(r, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (a) => {
      const c = dt.now();
      if (this.updatedAt !== c && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(a), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(r), this.owner = s.owner;
  }
  setCurrent(r) {
    this.current = r, this.updatedAt = dt.now(), this.canTrackVelocity === null && r !== void 0 && (this.canTrackVelocity = d0(this.current));
  }
  setPrevFrameValue(r = this.current) {
    this.prevFrameValue = r, this.prevUpdatedAt = this.updatedAt;
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
  onChange(r) {
    return this.on("change", r);
  }
  on(r, s) {
    this.events[r] || (this.events[r] = new ru());
    const a = this.events[r].add(s);
    return r === "change" ? () => {
      a(), Re.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : a;
  }
  clearListeners() {
    for (const r in this.events)
      this.events[r].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(r, s) {
    this.passiveEffect = r, this.stopPassiveEffect = s;
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
  set(r) {
    this.passiveEffect ? this.passiveEffect(r, this.updateAndNotify) : this.updateAndNotify(r);
  }
  setWithVelocity(r, s, a) {
    this.set(s), this.prev = void 0, this.prevFrameValue = r, this.prevUpdatedAt = this.updatedAt - a;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(r, s = !0) {
    this.updateAndNotify(r), this.prev = r, this.prevUpdatedAt = this.prevFrameValue = void 0, s && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(r) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(r);
  }
  removeDependent(r) {
    this.dependents && this.dependents.delete(r);
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
    const r = dt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || r - this.updatedAt > jd)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, jd);
    return Zp(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
  start(r) {
    return this.stop(), new Promise((s) => {
      this.hasAnimated = !0, this.animation = r(s), this.events.animationStart && this.events.animationStart.notify();
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
function Pr(n, r) {
  return new p0(n, r);
}
const jl = (n) => Array.isArray(n);
function h0(n, r, s) {
  n.hasValue(r) ? n.getValue(r).set(s) : n.addValue(r, Pr(s));
}
function m0(n) {
  return jl(n) ? n[n.length - 1] || 0 : n;
}
function g0(n, r) {
  const s = Er(n, r);
  let { transitionEnd: a = {}, transition: c = {}, ...d } = s || {};
  d = { ...d, ...a };
  for (const f in d) {
    const h = m0(d[f]);
    h0(n, f, h);
  }
}
const ut = (n) => !!(n && n.getVelocity);
function y0(n) {
  return !!(ut(n) && n.add);
}
function Fl(n, r) {
  const s = n.getValue("willChange");
  if (y0(s))
    return s.add(r);
  if (!s && an.WillChange) {
    const a = new an.WillChange("auto");
    n.addValue("willChange", a), a.add(r);
  }
}
function vu(n) {
  return n.replace(/([A-Z])/g, (r) => `-${r.toLowerCase()}`);
}
const v0 = "framerAppearId", Dh = "data-" + vu(v0);
function Lh(n) {
  return n.props[Dh];
}
function x0({ protectedKeys: n, needsAnimating: r }, s) {
  const a = n.hasOwnProperty(s) && r[s] !== !0;
  return r[s] = !1, a;
}
function _h(n, r, { delay: s = 0, transitionOverride: a, type: c } = {}) {
  let { transition: d = n.getDefaultTransition(), transitionEnd: f, ...h } = r;
  const m = d?.reduceMotion;
  a && (d = a);
  const y = [], g = c && n.animationState && n.animationState.getState()[c];
  for (const x in h) {
    const S = n.getValue(x, n.latestValues[x] ?? null), C = h[x];
    if (C === void 0 || g && x0(g, x))
      continue;
    const P = {
      delay: s,
      ...mu(d || {}, x)
    }, M = S.get();
    if (M !== void 0 && !S.isAnimating && !Array.isArray(C) && C === M && !P.velocity)
      continue;
    let L = !1;
    if (window.MotionHandoffAnimation) {
      const _ = Lh(n);
      if (_) {
        const K = window.MotionHandoffAnimation(_, x, Re);
        K !== null && (P.startTime = K, L = !0);
      }
    }
    Fl(n, x);
    const D = m ?? n.shouldReduceMotion;
    S.start(gu(x, S, C, D && Mh.has(x) ? { type: !1 } : P, n, L));
    const z = S.animation;
    z && y.push(z);
  }
  return f && Promise.all(y).then(() => {
    Re.update(() => {
      f && g0(n, f);
    });
  }), y;
}
function zl(n, r, s = {}) {
  const a = Er(n, r, s.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: c = n.getDefaultTransition() || {} } = a || {};
  s.transitionOverride && (c = s.transitionOverride);
  const d = a ? () => Promise.all(_h(n, a, s)) : () => Promise.resolve(), f = n.variantChildren && n.variantChildren.size ? (m = 0) => {
    const { delayChildren: y = 0, staggerChildren: g, staggerDirection: x } = c;
    return w0(n, r, m, y, g, x, s);
  } : () => Promise.resolve(), { when: h } = c;
  if (h) {
    const [m, y] = h === "beforeChildren" ? [d, f] : [f, d];
    return m().then(() => y());
  } else
    return Promise.all([d(), f(s.delay)]);
}
function w0(n, r, s = 0, a = 0, c = 0, d = 1, f) {
  const h = [];
  for (const m of n.variantChildren)
    m.notify("AnimationStart", r), h.push(zl(m, r, {
      ...f,
      delay: s + (typeof a == "function" ? 0 : a) + Ah(n.variantChildren, m, a, c, d)
    }).then(() => m.notify("AnimationComplete", r)));
  return Promise.all(h);
}
function S0(n, r, s = {}) {
  n.notify("AnimationStart", r);
  let a;
  if (Array.isArray(r)) {
    const c = r.map((d) => zl(n, d, s));
    a = Promise.all(c);
  } else if (typeof r == "string")
    a = zl(n, r, s);
  else {
    const c = typeof r == "function" ? Er(n, r, s.custom) : r;
    a = Promise.all(_h(n, c, s));
  }
  return a.then(() => {
    n.notify("AnimationComplete", r);
  });
}
const k0 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, Ih = (n) => (r) => r.test(n), Vh = [Ar, X, Xt, An, Xy, Gy, k0], Fd = (n) => Vh.find(Ih(n));
function T0(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Qp(n) : !0;
}
const C0 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function E0(n) {
  const [r, s] = n.slice(0, -1).split("(");
  if (r === "drop-shadow")
    return n;
  const [a] = s.match(au) || [];
  if (!a)
    return n;
  const c = s.replace(a, "");
  let d = C0.has(r) ? 1 : 0;
  return a !== s && (d *= 100), r + "(" + d + c + ")";
}
const P0 = /\b([a-z-]*)\(.*?\)/gu, Bl = {
  ...Dn,
  getAnimatableNone: (n) => {
    const r = n.match(P0);
    return r ? r.map(E0).join(" ") : n;
  }
}, zd = {
  ...Ar,
  transform: Math.round
}, A0 = {
  rotate: An,
  rotateX: An,
  rotateY: An,
  rotateZ: An,
  scale: Ws,
  scaleX: Ws,
  scaleY: Ws,
  scaleZ: Ws,
  skew: An,
  skewX: An,
  skewY: An,
  distance: X,
  translateX: X,
  translateY: X,
  translateZ: X,
  x: X,
  y: X,
  z: X,
  perspective: X,
  transformPerspective: X,
  opacity: Ei,
  originX: Ed,
  originY: Ed,
  originZ: X
}, xu = {
  // Border props
  borderWidth: X,
  borderTopWidth: X,
  borderRightWidth: X,
  borderBottomWidth: X,
  borderLeftWidth: X,
  borderRadius: X,
  borderTopLeftRadius: X,
  borderTopRightRadius: X,
  borderBottomRightRadius: X,
  borderBottomLeftRadius: X,
  // Positioning props
  width: X,
  maxWidth: X,
  height: X,
  maxHeight: X,
  top: X,
  right: X,
  bottom: X,
  left: X,
  inset: X,
  insetBlock: X,
  insetBlockStart: X,
  insetBlockEnd: X,
  insetInline: X,
  insetInlineStart: X,
  insetInlineEnd: X,
  // Spacing props
  padding: X,
  paddingTop: X,
  paddingRight: X,
  paddingBottom: X,
  paddingLeft: X,
  paddingBlock: X,
  paddingBlockStart: X,
  paddingBlockEnd: X,
  paddingInline: X,
  paddingInlineStart: X,
  paddingInlineEnd: X,
  margin: X,
  marginTop: X,
  marginRight: X,
  marginBottom: X,
  marginLeft: X,
  marginBlock: X,
  marginBlockStart: X,
  marginBlockEnd: X,
  marginInline: X,
  marginInlineStart: X,
  marginInlineEnd: X,
  // Typography
  fontSize: X,
  // Misc
  backgroundPositionX: X,
  backgroundPositionY: X,
  ...A0,
  zIndex: zd,
  // SVG
  fillOpacity: Ei,
  strokeOpacity: Ei,
  numOctaves: zd
}, R0 = {
  ...xu,
  // Color props
  color: Ke,
  backgroundColor: Ke,
  outlineColor: Ke,
  fill: Ke,
  stroke: Ke,
  // Border props
  borderColor: Ke,
  borderTopColor: Ke,
  borderRightColor: Ke,
  borderBottomColor: Ke,
  borderLeftColor: Ke,
  filter: Bl,
  WebkitFilter: Bl
}, Nh = (n) => R0[n];
function Oh(n, r) {
  let s = Nh(n);
  return s !== Bl && (s = Dn), s.getAnimatableNone ? s.getAnimatableNone(r) : void 0;
}
const M0 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function D0(n, r, s) {
  let a = 0, c;
  for (; a < n.length && !c; ) {
    const d = n[a];
    typeof d == "string" && !M0.has(d) && Pi(d).values.length && (c = n[a]), a++;
  }
  if (c && s)
    for (const d of r)
      n[d] = Oh(s, c);
}
class L0 extends hu {
  constructor(r, s, a, c, d) {
    super(r, s, a, c, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: r, element: s, name: a } = this;
    if (!s || !s.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < r.length; g++) {
      let x = r[g];
      if (typeof x == "string" && (x = x.trim(), ou(x))) {
        const S = Rh(x, s.current);
        S !== void 0 && (r[g] = S), g === r.length - 1 && (this.finalKeyframe = x);
      }
    }
    if (this.resolveNoneKeyframes(), !Mh.has(a) || r.length !== 2)
      return;
    const [c, d] = r, f = Fd(c), h = Fd(d), m = Cd(c), y = Cd(d);
    if (m !== y && Rn[a]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (Id(f) && Id(h))
        for (let g = 0; g < r.length; g++) {
          const x = r[g];
          typeof x == "string" && (r[g] = parseFloat(x));
        }
      else Rn[a] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: r, name: s } = this, a = [];
    for (let c = 0; c < r.length; c++)
      (r[c] === null || T0(r[c])) && a.push(c);
    a.length && D0(r, a, s);
  }
  measureInitialState() {
    const { element: r, unresolvedKeyframes: s, name: a } = this;
    if (!r || !r.current)
      return;
    a === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Rn[a](r.measureViewportBox(), window.getComputedStyle(r.current)), s[0] = this.measuredOrigin;
    const c = s[s.length - 1];
    c !== void 0 && r.getValue(a, c).jump(c, !1);
  }
  measureEndState() {
    const { element: r, name: s, unresolvedKeyframes: a } = this;
    if (!r || !r.current)
      return;
    const c = r.getValue(s);
    c && c.jump(this.measuredOrigin, !1);
    const d = a.length - 1, f = a[d];
    a[d] = Rn[s](r.measureViewportBox(), window.getComputedStyle(r.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, m]) => {
      r.getValue(h).set(m);
    }), this.resolveNoneKeyframes();
  }
}
function _0(n, r, s) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let a = document;
    const c = s?.[n] ?? a.querySelectorAll(n);
    return c ? Array.from(c) : [];
  }
  return Array.from(n).filter((a) => a != null);
}
const jh = (n, r) => r && typeof n == "number" ? r.transform(n) : n;
function Ul(n) {
  return Xp(n) && "offsetHeight" in n;
}
const { schedule: wu } = /* @__PURE__ */ lh(queueMicrotask, !1), Wt = {
  x: !1,
  y: !1
};
function Fh() {
  return Wt.x || Wt.y;
}
function I0(n) {
  return n === "x" || n === "y" ? Wt[n] ? null : (Wt[n] = !0, () => {
    Wt[n] = !1;
  }) : Wt.x || Wt.y ? null : (Wt.x = Wt.y = !0, () => {
    Wt.x = Wt.y = !1;
  });
}
function zh(n, r) {
  const s = _0(n), a = new AbortController(), c = {
    passive: !0,
    ...r,
    signal: a.signal
  };
  return [s, c, () => a.abort()];
}
function Bd(n) {
  return !(n.pointerType === "touch" || Fh());
}
function V0(n, r, s = {}) {
  const [a, c, d] = zh(n, s), f = (h) => {
    if (!Bd(h))
      return;
    const { target: m } = h, y = r(m, h);
    if (typeof y != "function" || !m)
      return;
    const g = (x) => {
      Bd(x) && (y(x), m.removeEventListener("pointerleave", g));
    };
    m.addEventListener("pointerleave", g, c);
  };
  return a.forEach((h) => {
    h.addEventListener("pointerenter", f, c);
  }), d;
}
const Bh = (n, r) => r ? n === r ? !0 : Bh(n, r.parentElement) : !1, Su = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, N0 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function O0(n) {
  return N0.has(n.tagName) || n.isContentEditable === !0;
}
const j0 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function F0(n) {
  return j0.has(n.tagName) || n.isContentEditable === !0;
}
const Qs = /* @__PURE__ */ new WeakSet();
function Ud(n) {
  return (r) => {
    r.key === "Enter" && n(r);
  };
}
function cl(n, r) {
  n.dispatchEvent(new PointerEvent("pointer" + r, { isPrimary: !0, bubbles: !0 }));
}
const z0 = (n, r) => {
  const s = n.currentTarget;
  if (!s)
    return;
  const a = Ud(() => {
    if (Qs.has(s))
      return;
    cl(s, "down");
    const c = Ud(() => {
      cl(s, "up");
    }), d = () => cl(s, "cancel");
    s.addEventListener("keyup", c, r), s.addEventListener("blur", d, r);
  });
  s.addEventListener("keydown", a, r), s.addEventListener("blur", () => s.removeEventListener("keydown", a), r);
};
function $d(n) {
  return Su(n) && !Fh();
}
function B0(n, r, s = {}) {
  const [a, c, d] = zh(n, s), f = (h) => {
    const m = h.currentTarget;
    if (!$d(h))
      return;
    Qs.add(m);
    const y = r(m, h), g = (C, P) => {
      window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", S), Qs.has(m) && Qs.delete(m), $d(C) && typeof y == "function" && y(C, { success: P });
    }, x = (C) => {
      g(C, m === window || m === document || s.useGlobalTarget || Bh(m, C.target));
    }, S = (C) => {
      g(C, !1);
    };
    window.addEventListener("pointerup", x, c), window.addEventListener("pointercancel", S, c);
  };
  return a.forEach((h) => {
    (s.useGlobalTarget ? window : h).addEventListener("pointerdown", f, c), Ul(h) && (h.addEventListener("focus", (y) => z0(y, c)), !O0(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), d;
}
function Uh(n) {
  return Xp(n) && "ownerSVGElement" in n;
}
function U0(n) {
  return Uh(n) && n.tagName === "svg";
}
const $0 = [...Vh, Ke, Dn], W0 = (n) => $0.find(Ih(n)), Wd = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), kr = () => ({
  x: Wd(),
  y: Wd()
}), Kd = () => ({ min: 0, max: 0 }), Qe = () => ({
  x: Kd(),
  y: Kd()
}), $l = { current: null }, $h = { current: !1 }, K0 = typeof window < "u";
function b0() {
  if ($h.current = !0, !!K0)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), r = () => $l.current = n.matches;
      n.addEventListener("change", r), r();
    } else
      $l.current = !1;
}
const H0 = /* @__PURE__ */ new WeakMap();
function lo(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Ai(n) {
  return typeof n == "string" || Array.isArray(n);
}
const ku = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Tu = ["initial", ...ku];
function uo(n) {
  return lo(n.animate) || Tu.some((r) => Ai(n[r]));
}
function Wh(n) {
  return !!(uo(n) || n.variants);
}
function Y0(n, r, s) {
  for (const a in r) {
    const c = r[a], d = s[a];
    if (ut(c))
      n.addValue(a, c);
    else if (ut(d))
      n.addValue(a, Pr(c, { owner: n }));
    else if (d !== c)
      if (n.hasValue(a)) {
        const f = n.getValue(a);
        f.liveStyle === !0 ? f.jump(c) : f.hasAnimated || f.set(c);
      } else {
        const f = n.getStaticValue(a);
        n.addValue(a, Pr(f !== void 0 ? f : c, { owner: n }));
      }
  }
  for (const a in s)
    r[a] === void 0 && n.removeValue(a);
  return r;
}
const bd = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ro = {};
function Kh(n) {
  ro = n;
}
function G0() {
  return ro;
}
class X0 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(r, s, a) {
    return {};
  }
  constructor({ parent: r, props: s, presenceContext: a, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: f, visualState: h }, m = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = hu, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const C = dt.now();
      this.renderScheduledAt < C && (this.renderScheduledAt = C, Re.render(this.render, !1, !0));
    };
    const { latestValues: y, renderState: g } = h;
    this.latestValues = y, this.baseTarget = { ...y }, this.initialValues = s.initial ? { ...y } : {}, this.renderState = g, this.parent = r, this.props = s, this.presenceContext = a, this.depth = r ? r.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = m, this.blockInitialAnimation = !!f, this.isControllingVariants = uo(s), this.isVariantNode = Wh(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(r && r.current);
    const { willChange: x, ...S } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const C in S) {
      const P = S[C];
      y[C] !== void 0 && ut(P) && P.set(y[C]);
    }
  }
  mount(r) {
    this.current = r, H0.set(r, this), this.projection && !this.projection.instance && this.projection.mount(r), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, a) => this.bindToMotionValue(a, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : ($h.current || b0(), this.shouldReduceMotion = $l.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), Mn(this.notifyUpdate), Mn(this.render), this.valueSubscriptions.forEach((r) => r()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const r in this.events)
      this.events[r].clear();
    for (const r in this.features) {
      const s = this.features[r];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(r) {
    this.children.add(r), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(r);
  }
  removeChild(r) {
    this.children.delete(r), this.enteringChildren && this.enteringChildren.delete(r);
  }
  bindToMotionValue(r, s) {
    this.valueSubscriptions.has(r) && this.valueSubscriptions.get(r)();
    const a = Mr.has(r);
    a && this.onBindTransform && this.onBindTransform();
    const c = s.on("change", (f) => {
      this.latestValues[r] = f, this.props.onUpdate && Re.preRender(this.notifyUpdate), a && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, r, s)), this.valueSubscriptions.set(r, () => {
      c(), d && d(), s.owner && s.stop();
    });
  }
  sortNodePosition(r) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== r.type ? 0 : this.sortInstanceNodePosition(this.current, r.current);
  }
  updateFeatures() {
    let r = "animation";
    for (r in ro) {
      const s = ro[r];
      if (!s)
        continue;
      const { isEnabled: a, Feature: c } = s;
      if (!this.features[r] && c && a(this.props) && (this.features[r] = new c(this)), this.features[r]) {
        const d = this.features[r];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Qe();
  }
  getStaticValue(r) {
    return this.latestValues[r];
  }
  setStaticValue(r, s) {
    this.latestValues[r] = s;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(r, s) {
    (r.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = r, this.prevPresenceContext = this.presenceContext, this.presenceContext = s;
    for (let a = 0; a < bd.length; a++) {
      const c = bd[a];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, f = r[d];
      f && (this.propEventSubscriptions[c] = this.on(c, f));
    }
    this.prevMotionValues = Y0(this, this.scrapeMotionValuesFromProps(r, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(r) {
    return this.props.variants ? this.props.variants[r] : void 0;
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
  addVariantChild(r) {
    const s = this.getClosestVariantNode();
    if (s)
      return s.variantChildren && s.variantChildren.add(r), () => s.variantChildren.delete(r);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(r, s) {
    const a = this.values.get(r);
    s !== a && (a && this.removeValue(r), this.bindToMotionValue(r, s), this.values.set(r, s), this.latestValues[r] = s.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(r) {
    this.values.delete(r);
    const s = this.valueSubscriptions.get(r);
    s && (s(), this.valueSubscriptions.delete(r)), delete this.latestValues[r], this.removeValueFromRenderState(r, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(r) {
    return this.values.has(r);
  }
  getValue(r, s) {
    if (this.props.values && this.props.values[r])
      return this.props.values[r];
    let a = this.values.get(r);
    return a === void 0 && s !== void 0 && (a = Pr(s === null ? void 0 : s, { owner: this }), this.addValue(r, a)), a;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(r, s) {
    let a = this.latestValues[r] !== void 0 || !this.current ? this.latestValues[r] : this.getBaseTargetFromProps(this.props, r) ?? this.readValueFromInstance(this.current, r, this.options);
    return a != null && (typeof a == "string" && (Gp(a) || Qp(a)) ? a = parseFloat(a) : !W0(a) && Dn.test(s) && (a = Oh(r, s)), this.setBaseTarget(r, ut(a) ? a.get() : a)), ut(a) ? a.get() : a;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(r, s) {
    this.baseTarget[r] = s;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(r) {
    const { initial: s } = this.props;
    let a;
    if (typeof s == "string" || typeof s == "object") {
      const d = yu(this.props, s, this.presenceContext?.custom);
      d && (a = d[r]);
    }
    if (s && a !== void 0)
      return a;
    const c = this.getBaseTargetFromProps(this.props, r);
    return c !== void 0 && !ut(c) ? c : this.initialValues[r] !== void 0 && a === void 0 ? void 0 : this.baseTarget[r];
  }
  on(r, s) {
    return this.events[r] || (this.events[r] = new ru()), this.events[r].add(s);
  }
  notify(r, ...s) {
    this.events[r] && this.events[r].notify(...s);
  }
  scheduleRenderMicrotask() {
    wu.render(this.render);
  }
}
class bh extends X0 {
  constructor() {
    super(...arguments), this.KeyframeResolver = L0;
  }
  sortInstanceNodePosition(r, s) {
    return r.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(r, s) {
    const a = r.style;
    return a ? a[s] : void 0;
  }
  removeValueFromRenderState(r, { vars: s, style: a }) {
    delete s[r], delete a[r];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: r } = this.props;
    ut(r) && (this.childSubscription = r.on("change", (s) => {
      this.current && (this.current.textContent = `${s}`);
    }));
  }
}
class Ln {
  constructor(r) {
    this.isMounted = !1, this.node = r;
  }
  update() {
  }
}
function Hh({ top: n, left: r, right: s, bottom: a }) {
  return {
    x: { min: r, max: s },
    y: { min: n, max: a }
  };
}
function Q0({ x: n, y: r }) {
  return { top: r.min, right: n.max, bottom: r.max, left: n.min };
}
function Z0(n, r) {
  if (!r)
    return n;
  const s = r({ x: n.left, y: n.top }), a = r({ x: n.right, y: n.bottom });
  return {
    top: s.y,
    left: s.x,
    bottom: a.y,
    right: a.x
  };
}
function fl(n) {
  return n === void 0 || n === 1;
}
function Wl({ scale: n, scaleX: r, scaleY: s }) {
  return !fl(n) || !fl(r) || !fl(s);
}
function Yn(n) {
  return Wl(n) || Yh(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function Yh(n) {
  return Hd(n.x) || Hd(n.y);
}
function Hd(n) {
  return n && n !== "0%";
}
function io(n, r, s) {
  const a = n - s, c = r * a;
  return s + c;
}
function Yd(n, r, s, a, c) {
  return c !== void 0 && (n = io(n, c, a)), io(n, s, a) + r;
}
function Kl(n, r = 0, s = 1, a, c) {
  n.min = Yd(n.min, r, s, a, c), n.max = Yd(n.max, r, s, a, c);
}
function Gh(n, { x: r, y: s }) {
  Kl(n.x, r.translate, r.scale, r.originPoint), Kl(n.y, s.translate, s.scale, s.originPoint);
}
const Gd = 0.999999999999, Xd = 1.0000000000001;
function q0(n, r, s, a = !1) {
  const c = s.length;
  if (!c)
    return;
  r.x = r.y = 1;
  let d, f;
  for (let h = 0; h < c; h++) {
    d = s[h], f = d.projectionDelta;
    const { visualElement: m } = d.options;
    m && m.props.style && m.props.style.display === "contents" || (a && d.options.layoutScroll && d.scroll && d !== d.root && Cr(n, {
      x: -d.scroll.offset.x,
      y: -d.scroll.offset.y
    }), f && (r.x *= f.x.scale, r.y *= f.y.scale, Gh(n, f)), a && Yn(d.latestValues) && Cr(n, d.latestValues));
  }
  r.x < Xd && r.x > Gd && (r.x = 1), r.y < Xd && r.y > Gd && (r.y = 1);
}
function Tr(n, r) {
  n.min = n.min + r, n.max = n.max + r;
}
function Qd(n, r, s, a, c = 0.5) {
  const d = Ne(n.min, n.max, c);
  Kl(n, r, s, d, a);
}
function Cr(n, r) {
  Qd(n.x, r.x, r.scaleX, r.scale, r.originX), Qd(n.y, r.y, r.scaleY, r.scale, r.originY);
}
function Xh(n, r) {
  return Hh(Z0(n.getBoundingClientRect(), r));
}
function J0(n, r, s) {
  const a = Xh(n, s), { scroll: c } = r;
  return c && (Tr(a.x, c.offset.x), Tr(a.y, c.offset.y)), a;
}
const e1 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, t1 = Rr.length;
function n1(n, r, s) {
  let a = "", c = !0;
  for (let d = 0; d < t1; d++) {
    const f = Rr[d], h = n[f];
    if (h === void 0)
      continue;
    let m = !0;
    if (typeof h == "number")
      m = h === (f.startsWith("scale") ? 1 : 0);
    else {
      const y = parseFloat(h);
      m = f.startsWith("scale") ? y === 1 : y === 0;
    }
    if (!m || s) {
      const y = jh(h, xu[f]);
      if (!m) {
        c = !1;
        const g = e1[f] || f;
        a += `${g}(${y}) `;
      }
      s && (r[f] = y);
    }
  }
  return a = a.trim(), s ? a = s(r, c ? "" : a) : c && (a = "none"), a;
}
function Cu(n, r, s) {
  const { style: a, vars: c, transformOrigin: d } = n;
  let f = !1, h = !1;
  for (const m in r) {
    const y = r[m];
    if (Mr.has(m)) {
      f = !0;
      continue;
    } else if (ch(m)) {
      c[m] = y;
      continue;
    } else {
      const g = jh(y, xu[m]);
      m.startsWith("origin") ? (h = !0, d[m] = g) : a[m] = g;
    }
  }
  if (r.transform || (f || s ? a.transform = n1(r, n.transform, s) : a.transform && (a.transform = "none")), h) {
    const { originX: m = "50%", originY: y = "50%", originZ: g = 0 } = d;
    a.transformOrigin = `${m} ${y} ${g}`;
  }
}
function Qh(n, { style: r, vars: s }, a, c) {
  const d = n.style;
  let f;
  for (f in r)
    d[f] = r[f];
  c?.applyProjectionStyles(d, a);
  for (f in s)
    d.setProperty(f, s[f]);
}
function Zd(n, r) {
  return r.max === r.min ? 0 : n / (r.max - r.min) * 100;
}
const gi = {
  correct: (n, r) => {
    if (!r.target)
      return n;
    if (typeof n == "string")
      if (X.test(n))
        n = parseFloat(n);
      else
        return n;
    const s = Zd(n, r.target.x), a = Zd(n, r.target.y);
    return `${s}% ${a}%`;
  }
}, r1 = {
  correct: (n, { treeScale: r, projectionDelta: s }) => {
    const a = n, c = Dn.parse(n);
    if (c.length > 5)
      return a;
    const d = Dn.createTransformer(n), f = typeof c[0] != "number" ? 1 : 0, h = s.x.scale * r.x, m = s.y.scale * r.y;
    c[0 + f] /= h, c[1 + f] /= m;
    const y = Ne(h, m, 0.5);
    return typeof c[2 + f] == "number" && (c[2 + f] /= y), typeof c[3 + f] == "number" && (c[3 + f] /= y), d(c);
  }
}, bl = {
  borderRadius: {
    ...gi,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: gi,
  borderTopRightRadius: gi,
  borderBottomLeftRadius: gi,
  borderBottomRightRadius: gi,
  boxShadow: r1
};
function Zh(n, { layout: r, layoutId: s }) {
  return Mr.has(n) || n.startsWith("origin") || (r || s !== void 0) && (!!bl[n] || n === "opacity");
}
function Eu(n, r, s) {
  const a = n.style, c = r?.style, d = {};
  if (!a)
    return d;
  for (const f in a)
    (ut(a[f]) || c && ut(c[f]) || Zh(f, n) || s?.getValue(f)?.liveStyle !== void 0) && (d[f] = a[f]);
  return d;
}
function i1(n) {
  return window.getComputedStyle(n);
}
class s1 extends bh {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Qh;
  }
  readValueFromInstance(r, s) {
    if (Mr.has(s))
      return this.projection?.isProjecting ? Ll(s) : _v(r, s);
    {
      const a = i1(r), c = (ch(s) ? a.getPropertyValue(s) : a[s]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(r, { transformPagePoint: s }) {
    return Xh(r, s);
  }
  build(r, s, a) {
    Cu(r, s, a.transformTemplate);
  }
  scrapeMotionValuesFromProps(r, s, a) {
    return Eu(r, s, a);
  }
}
const o1 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, a1 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function l1(n, r, s = 1, a = 0, c = !0) {
  n.pathLength = 1;
  const d = c ? o1 : a1;
  n[d.offset] = `${-a}`, n[d.array] = `${r} ${s}`;
}
const u1 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function qh(n, {
  attrX: r,
  attrY: s,
  attrScale: a,
  pathLength: c,
  pathSpacing: d = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, m, y, g) {
  if (Cu(n, h, y), m) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: x, style: S } = n;
  x.transform && (S.transform = x.transform, delete x.transform), (S.transform || x.transformOrigin) && (S.transformOrigin = x.transformOrigin ?? "50% 50%", delete x.transformOrigin), S.transform && (S.transformBox = g?.transformBox ?? "fill-box", delete x.transformBox);
  for (const C of u1)
    x[C] !== void 0 && (S[C] = x[C], delete x[C]);
  r !== void 0 && (x.x = r), s !== void 0 && (x.y = s), a !== void 0 && (x.scale = a), c !== void 0 && l1(x, c, d, f, !1);
}
const Jh = /* @__PURE__ */ new Set([
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
]), em = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function c1(n, r, s, a) {
  Qh(n, r, void 0, a);
  for (const c in r.attrs)
    n.setAttribute(Jh.has(c) ? c : vu(c), r.attrs[c]);
}
function tm(n, r, s) {
  const a = Eu(n, r, s);
  for (const c in n)
    if (ut(n[c]) || ut(r[c])) {
      const d = Rr.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
      a[d] = n[c];
    }
  return a;
}
class f1 extends bh {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Qe;
  }
  getBaseTargetFromProps(r, s) {
    return r[s];
  }
  readValueFromInstance(r, s) {
    if (Mr.has(s)) {
      const a = Nh(s);
      return a && a.default || 0;
    }
    return s = Jh.has(s) ? s : vu(s), r.getAttribute(s);
  }
  scrapeMotionValuesFromProps(r, s, a) {
    return tm(r, s, a);
  }
  build(r, s, a) {
    qh(r, s, this.isSVGTag, a.transformTemplate, a.style);
  }
  renderInstance(r, s, a, c) {
    c1(r, s, a, c);
  }
  mount(r) {
    this.isSVGTag = em(r.tagName), super.mount(r);
  }
}
const d1 = Tu.length;
function nm(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const s = n.parent ? nm(n.parent) || {} : {};
    return n.props.initial !== void 0 && (s.initial = n.props.initial), s;
  }
  const r = {};
  for (let s = 0; s < d1; s++) {
    const a = Tu[s], c = n.props[a];
    (Ai(c) || c === !1) && (r[a] = c);
  }
  return r;
}
function rm(n, r) {
  if (!Array.isArray(r))
    return !1;
  const s = r.length;
  if (s !== n.length)
    return !1;
  for (let a = 0; a < s; a++)
    if (r[a] !== n[a])
      return !1;
  return !0;
}
const p1 = [...ku].reverse(), h1 = ku.length;
function m1(n) {
  return (r) => Promise.all(r.map(({ animation: s, options: a }) => S0(n, s, a)));
}
function g1(n) {
  let r = m1(n), s = qd(), a = !0;
  const c = (m) => (y, g) => {
    const x = Er(n, g, m === "exit" ? n.presenceContext?.custom : void 0);
    if (x) {
      const { transition: S, transitionEnd: C, ...P } = x;
      y = { ...y, ...P, ...C };
    }
    return y;
  };
  function d(m) {
    r = m(n);
  }
  function f(m) {
    const { props: y } = n, g = nm(n.parent) || {}, x = [], S = /* @__PURE__ */ new Set();
    let C = {}, P = 1 / 0;
    for (let L = 0; L < h1; L++) {
      const D = p1[L], z = s[D], _ = y[D] !== void 0 ? y[D] : g[D], K = Ai(_), Q = D === m ? z.isActive : null;
      Q === !1 && (P = L);
      let ie = _ === g[D] && _ !== y[D] && K;
      if (ie && a && n.manuallyAnimateOnMount && (ie = !1), z.protectedKeys = { ...C }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !z.prevProp || // Or if the prop doesn't define an animation
      lo(_) || typeof _ == "boolean")
        continue;
      const de = y1(z.prevProp, _);
      let Y = de || // If we're making this variant active, we want to always make it active
      D === m && z.isActive && !ie && K || // If we removed a higher-priority variant (i is in reverse order)
      L > P && K, ce = !1;
      const Se = Array.isArray(_) ? _ : [_];
      let ze = Se.reduce(c(D), {});
      Q === !1 && (ze = {});
      const { prevResolvedValues: be = {} } = z, He = {
        ...be,
        ...ze
      }, Ze = (ue) => {
        Y = !0, S.has(ue) && (ce = !0, S.delete(ue)), z.needsAnimating[ue] = !0;
        const j = n.getValue(ue);
        j && (j.liveStyle = !1);
      };
      for (const ue in He) {
        const j = ze[ue], Z = be[ue];
        if (C.hasOwnProperty(ue))
          continue;
        let $ = !1;
        jl(j) && jl(Z) ? $ = !rm(j, Z) : $ = j !== Z, $ ? j != null ? Ze(ue) : S.add(ue) : j !== void 0 && S.has(ue) ? Ze(ue) : z.protectedKeys[ue] = !0;
      }
      z.prevProp = _, z.prevResolvedValues = ze, z.isActive && (C = { ...C, ...ze }), a && n.blockInitialAnimation && (Y = !1);
      const tt = ie && de;
      Y && (!tt || ce) && x.push(...Se.map((ue) => {
        const j = { type: D };
        if (typeof ue == "string" && a && !tt && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Z } = n, $ = Er(Z, ue);
          if (Z.enteringChildren && $) {
            const { delayChildren: T } = $.transition || {};
            j.delay = Ah(Z.enteringChildren, n, T);
          }
        }
        return {
          animation: ue,
          options: j
        };
      }));
    }
    if (S.size) {
      const L = {};
      if (typeof y.initial != "boolean") {
        const D = Er(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        D && D.transition && (L.transition = D.transition);
      }
      S.forEach((D) => {
        const z = n.getBaseTarget(D), _ = n.getValue(D);
        _ && (_.liveStyle = !0), L[D] = z ?? null;
      }), x.push({ animation: L });
    }
    let M = !!x.length;
    return a && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (M = !1), a = !1, M ? r(x) : Promise.resolve();
  }
  function h(m, y) {
    if (s[m].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((x) => x.animationState?.setActive(m, y)), s[m].isActive = y;
    const g = f(m);
    for (const x in s)
      s[x].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: f,
    setActive: h,
    setAnimateFunction: d,
    getState: () => s,
    reset: () => {
      s = qd();
    }
  };
}
function y1(n, r) {
  return typeof r == "string" ? r !== n : Array.isArray(r) ? !rm(r, n) : !1;
}
function bn(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function qd() {
  return {
    animate: bn(!0),
    whileInView: bn(),
    whileHover: bn(),
    whileTap: bn(),
    whileDrag: bn(),
    whileFocus: bn(),
    exit: bn()
  };
}
function Jd(n, r) {
  n.min = r.min, n.max = r.max;
}
function $t(n, r) {
  Jd(n.x, r.x), Jd(n.y, r.y);
}
function ep(n, r) {
  n.translate = r.translate, n.scale = r.scale, n.originPoint = r.originPoint, n.origin = r.origin;
}
const im = 1e-4, v1 = 1 - im, x1 = 1 + im, sm = 0.01, w1 = 0 - sm, S1 = 0 + sm;
function pt(n) {
  return n.max - n.min;
}
function k1(n, r, s) {
  return Math.abs(n - r) <= s;
}
function tp(n, r, s, a = 0.5) {
  n.origin = a, n.originPoint = Ne(r.min, r.max, n.origin), n.scale = pt(s) / pt(r), n.translate = Ne(s.min, s.max, n.origin) - n.originPoint, (n.scale >= v1 && n.scale <= x1 || isNaN(n.scale)) && (n.scale = 1), (n.translate >= w1 && n.translate <= S1 || isNaN(n.translate)) && (n.translate = 0);
}
function ki(n, r, s, a) {
  tp(n.x, r.x, s.x, a ? a.originX : void 0), tp(n.y, r.y, s.y, a ? a.originY : void 0);
}
function np(n, r, s) {
  n.min = s.min + r.min, n.max = n.min + pt(r);
}
function T1(n, r, s) {
  np(n.x, r.x, s.x), np(n.y, r.y, s.y);
}
function rp(n, r, s) {
  n.min = r.min - s.min, n.max = n.min + pt(r);
}
function so(n, r, s) {
  rp(n.x, r.x, s.x), rp(n.y, r.y, s.y);
}
function ip(n, r, s, a, c) {
  return n -= r, n = io(n, 1 / s, a), c !== void 0 && (n = io(n, 1 / c, a)), n;
}
function C1(n, r = 0, s = 1, a = 0.5, c, d = n, f = n) {
  if (Xt.test(r) && (r = parseFloat(r), r = Ne(f.min, f.max, r / 100) - f.min), typeof r != "number")
    return;
  let h = Ne(d.min, d.max, a);
  n === d && (h -= r), n.min = ip(n.min, r, s, h, c), n.max = ip(n.max, r, s, h, c);
}
function sp(n, r, [s, a, c], d, f) {
  C1(n, r[s], r[a], r[c], r.scale, d, f);
}
const E1 = ["x", "scaleX", "originX"], P1 = ["y", "scaleY", "originY"];
function op(n, r, s, a) {
  sp(n.x, r, E1, s ? s.x : void 0, a ? a.x : void 0), sp(n.y, r, P1, s ? s.y : void 0, a ? a.y : void 0);
}
function ap(n) {
  return n.translate === 0 && n.scale === 1;
}
function om(n) {
  return ap(n.x) && ap(n.y);
}
function lp(n, r) {
  return n.min === r.min && n.max === r.max;
}
function A1(n, r) {
  return lp(n.x, r.x) && lp(n.y, r.y);
}
function up(n, r) {
  return Math.round(n.min) === Math.round(r.min) && Math.round(n.max) === Math.round(r.max);
}
function am(n, r) {
  return up(n.x, r.x) && up(n.y, r.y);
}
function cp(n) {
  return pt(n.x) / pt(n.y);
}
function fp(n, r) {
  return n.translate === r.translate && n.scale === r.scale && n.originPoint === r.originPoint;
}
function Lt(n) {
  return [n("x"), n("y")];
}
function R1(n, r, s) {
  let a = "";
  const c = n.x.translate / r.x, d = n.y.translate / r.y, f = s?.z || 0;
  if ((c || d || f) && (a = `translate3d(${c}px, ${d}px, ${f}px) `), (r.x !== 1 || r.y !== 1) && (a += `scale(${1 / r.x}, ${1 / r.y}) `), s) {
    const { transformPerspective: y, rotate: g, rotateX: x, rotateY: S, skewX: C, skewY: P } = s;
    y && (a = `perspective(${y}px) ${a}`), g && (a += `rotate(${g}deg) `), x && (a += `rotateX(${x}deg) `), S && (a += `rotateY(${S}deg) `), C && (a += `skewX(${C}deg) `), P && (a += `skewY(${P}deg) `);
  }
  const h = n.x.scale * r.x, m = n.y.scale * r.y;
  return (h !== 1 || m !== 1) && (a += `scale(${h}, ${m})`), a || "none";
}
const lm = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], M1 = lm.length, dp = (n) => typeof n == "string" ? parseFloat(n) : n, pp = (n) => typeof n == "number" || X.test(n);
function D1(n, r, s, a, c, d) {
  c ? (n.opacity = Ne(0, s.opacity ?? 1, L1(a)), n.opacityExit = Ne(r.opacity ?? 1, 0, _1(a))) : d && (n.opacity = Ne(r.opacity ?? 1, s.opacity ?? 1, a));
  for (let f = 0; f < M1; f++) {
    const h = `border${lm[f]}Radius`;
    let m = hp(r, h), y = hp(s, h);
    if (m === void 0 && y === void 0)
      continue;
    m || (m = 0), y || (y = 0), m === 0 || y === 0 || pp(m) === pp(y) ? (n[h] = Math.max(Ne(dp(m), dp(y), a), 0), (Xt.test(y) || Xt.test(m)) && (n[h] += "%")) : n[h] = y;
  }
  (r.rotate || s.rotate) && (n.rotate = Ne(r.rotate || 0, s.rotate || 0, a));
}
function hp(n, r) {
  return n[r] !== void 0 ? n[r] : n.borderRadius;
}
const L1 = /* @__PURE__ */ um(0, 0.5, ih), _1 = /* @__PURE__ */ um(0.5, 0.95, It);
function um(n, r, s) {
  return (a) => a < n ? 0 : a > r ? 1 : s(/* @__PURE__ */ Ci(n, r, a));
}
function I1(n, r, s) {
  const a = ut(n) ? n : Pr(n);
  return a.start(gu("", a, r, s)), a.animation;
}
function Ri(n, r, s, a = { passive: !0 }) {
  return n.addEventListener(r, s, a), () => n.removeEventListener(r, s);
}
const V1 = (n, r) => n.depth - r.depth;
class N1 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(r) {
    Jl(this.children, r), this.isDirty = !0;
  }
  remove(r) {
    eu(this.children, r), this.isDirty = !0;
  }
  forEach(r) {
    this.isDirty && this.children.sort(V1), this.isDirty = !1, this.children.forEach(r);
  }
}
function O1(n, r) {
  const s = dt.now(), a = ({ timestamp: c }) => {
    const d = c - s;
    d >= r && (Mn(a), n(d - r));
  };
  return Re.setup(a, !0), () => Mn(a);
}
function Zs(n) {
  return ut(n) ? n.get() : n;
}
class j1 {
  constructor() {
    this.members = [];
  }
  add(r) {
    Jl(this.members, r), r.scheduleRender();
  }
  remove(r) {
    if (eu(this.members, r), r === this.prevLead && (this.prevLead = void 0), r === this.lead) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(r) {
    const s = this.members.findIndex((c) => r === c);
    if (s === 0)
      return !1;
    let a;
    for (let c = s; c >= 0; c--) {
      const d = this.members[c];
      if (d.isPresent !== !1) {
        a = d;
        break;
      }
    }
    return a ? (this.promote(a), !0) : !1;
  }
  promote(r, s) {
    const a = this.lead;
    if (r !== a && (this.prevLead = a, this.lead = r, r.show(), a)) {
      a.instance && a.scheduleRender(), r.scheduleRender();
      const c = a.options.layoutDependency, d = r.options.layoutDependency;
      c !== void 0 && d !== void 0 && c === d || (r.resumeFrom = a, s && (r.resumeFrom.preserveOpacity = !0), a.snapshot && (r.snapshot = a.snapshot, r.snapshot.latestValues = a.animationValues || a.latestValues), r.root && r.root.isUpdating && (r.isLayoutDirty = !0));
      const { crossfade: h } = r.options;
      h === !1 && a.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((r) => {
      const { options: s, resumingFrom: a } = r;
      s.onExitComplete && s.onExitComplete(), a && a.options.onExitComplete && a.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((r) => {
      r.instance && r.scheduleRender(!1);
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
const qs = {
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
}, dl = ["", "X", "Y", "Z"], F1 = 1e3;
let z1 = 0;
function pl(n, r, s, a) {
  const { latestValues: c } = r;
  c[n] && (s[n] = c[n], r.setStaticValue(n, 0), a && (a[n] = 0));
}
function cm(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: r } = n.options;
  if (!r)
    return;
  const s = Lh(r);
  if (window.MotionHasOptimisedAnimation(s, "transform")) {
    const { layout: c, layoutId: d } = n.options;
    window.MotionCancelOptimisedAnimation(s, "transform", Re, !(c || d));
  }
  const { parent: a } = n;
  a && !a.hasCheckedOptimisedAppear && cm(a);
}
function fm({ attachResizeListener: n, defaultParent: r, measureScroll: s, checkIsScrollRoot: a, resetTransform: c }) {
  return class {
    constructor(f = {}, h = r?.()) {
      this.id = z1++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach($1), this.nodes.forEach(H1), this.nodes.forEach(Y1), this.nodes.forEach(W1);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let m = 0; m < this.path.length; m++)
        this.path[m].shouldResetTransform = !0;
      this.root === this && (this.nodes = new N1());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new ru()), this.eventHandlers.get(f).add(h);
    }
    notifyListeners(f, ...h) {
      const m = this.eventHandlers.get(f);
      m && m.notify(...h);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = Uh(f) && !U0(f), this.instance = f;
      const { layoutId: h, layout: m, visualElement: y } = this.options;
      if (y && !y.current && y.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (m || h) && (this.isLayoutDirty = !0), n) {
        let g, x = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Re.read(() => {
          x = window.innerWidth;
        }), n(f, () => {
          const C = window.innerWidth;
          C !== x && (x = C, this.root.updateBlockedByResize = !0, g && g(), g = O1(S, 250), qs.hasAnimatedSinceResize && (qs.hasAnimatedSinceResize = !1, this.nodes.forEach(yp)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && y && (h || m) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: x, hasRelativeLayoutChanged: S, layout: C }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const P = this.options.transition || y.getDefaultTransition() || q1, { onLayoutAnimationStart: M, onLayoutAnimationComplete: L } = y.getProps(), D = !this.targetLayout || !am(this.targetLayout, C), z = !x && S;
        if (this.options.layoutRoot || this.resumeFrom || z || x && (D || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const _ = {
            ...mu(P, "layout"),
            onPlay: M,
            onComplete: L
          };
          (y.shouldReduceMotion || this.options.layoutRoot) && (_.delay = 0, _.type = !1), this.startAnimation(_), this.setAnimationOrigin(g, z);
        } else
          x || yp(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = C;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Mn(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(G1), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && cm(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const x = this.path[g];
        x.shouldResetTransform = !0, x.updateScroll("snapshot"), x.options.layoutRoot && x.willUpdate(!1);
      }
      const { layoutId: h, layout: m } = this.options;
      if (h === void 0 && !m)
        return;
      const y = this.getTransformTemplate();
      this.prevTransformTemplateValue = y ? y(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(mp);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(gp);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(b1), this.nodes.forEach(B1), this.nodes.forEach(U1)) : this.nodes.forEach(gp), this.clearAllSnapshots();
      const h = dt.now();
      it.delta = Qt(0, 1e3 / 60, h - it.timestamp), it.timestamp = h, it.isProcessing = !0, il.update.process(it), il.preRender.process(it), il.render.process(it), it.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, wu.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(K1), this.sharedNodes.forEach(X1);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Re.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Re.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !pt(this.snapshot.measuredBox.x) && !pt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let m = 0; m < this.path.length; m++)
          this.path[m].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = Qe(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (h = !1), h && this.instance) {
        const m = a(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: m,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : m
        };
      }
    }
    resetTransform() {
      if (!c)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !om(this.projectionDelta), m = this.getTransformTemplate(), y = m ? m(this.latestValues, "") : void 0, g = y !== this.prevTransformTemplateValue;
      f && this.instance && (h || Yn(this.latestValues) || g) && (c(this.instance, y), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let m = this.removeElementScroll(h);
      return f && (m = this.removeTransform(m)), J1(m), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: m,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f)
        return Qe();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(ex))) {
        const { scroll: y } = this.root;
        y && (Tr(h.x, y.offset.x), Tr(h.y, y.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = Qe();
      if ($t(h, f), this.scroll?.wasRoot)
        return h;
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m], { scroll: g, options: x } = y;
        y !== this.root && g && x.layoutScroll && (g.wasRoot && $t(h, f), Tr(h.x, g.offset.x), Tr(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1) {
      const m = Qe();
      $t(m, f);
      for (let y = 0; y < this.path.length; y++) {
        const g = this.path[y];
        !h && g.options.layoutScroll && g.scroll && g !== g.root && Cr(m, {
          x: -g.scroll.offset.x,
          y: -g.scroll.offset.y
        }), Yn(g.latestValues) && Cr(m, g.latestValues);
      }
      return Yn(this.latestValues) && Cr(m, this.latestValues), m;
    }
    removeTransform(f) {
      const h = Qe();
      $t(h, f);
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m];
        if (!y.instance || !Yn(y.latestValues))
          continue;
        Wl(y.latestValues) && y.updateSnapshot();
        const g = Qe(), x = y.measurePageBox();
        $t(g, x), op(h, y.latestValues, y.snapshot ? y.snapshot.layoutBox : void 0, g);
      }
      return Yn(this.latestValues) && op(h, this.latestValues), h;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== it.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const m = !!this.resumingFrom || this !== h;
      if (!(f || m && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: x } = this.options;
      if (!this.layout || !(g || x))
        return;
      this.resolvedRelativeTargetAt = it.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Qe(), this.targetWithTransforms = Qe()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), T1(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : $t(this.target, this.layout.layoutBox), Gh(this.target, this.targetDelta)) : $t(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Wl(this.parent.latestValues) || Yh(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, m) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Qe(), this.relativeTargetOrigin = Qe(), so(this.relativeTargetOrigin, h, m), $t(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let m = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (m = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (m = !1), this.resolvedRelativeTargetAt === it.timestamp && (m = !1), m)
        return;
      const { layout: y, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(y || g))
        return;
      $t(this.layoutCorrected, this.layout.layoutBox);
      const x = this.treeScale.x, S = this.treeScale.y;
      q0(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = Qe());
      const { target: C } = f;
      if (!C) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (ep(this.prevProjectionDelta.x, this.projectionDelta.x), ep(this.prevProjectionDelta.y, this.projectionDelta.y)), ki(this.projectionDelta, this.layoutCorrected, C, this.latestValues), (this.treeScale.x !== x || this.treeScale.y !== S || !fp(this.projectionDelta.x, this.prevProjectionDelta.x) || !fp(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", C));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      if (this.options.visualElement?.scheduleRender(), f) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = kr(), this.projectionDelta = kr(), this.projectionDeltaWithTransform = kr();
    }
    setAnimationOrigin(f, h = !1) {
      const m = this.snapshot, y = m ? m.latestValues : {}, g = { ...this.latestValues }, x = kr();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = Qe(), C = m ? m.source : void 0, P = this.layout ? this.layout.source : void 0, M = C !== P, L = this.getStack(), D = !L || L.members.length <= 1, z = !!(M && !D && this.options.crossfade === !0 && !this.path.some(Z1));
      this.animationProgress = 0;
      let _;
      this.mixTargetDelta = (K) => {
        const Q = K / 1e3;
        vp(x.x, f.x, Q), vp(x.y, f.y, Q), this.setTargetDelta(x), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (so(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Q1(this.relativeTarget, this.relativeTargetOrigin, S, Q), _ && A1(this.relativeTarget, _) && (this.isProjectionDirty = !1), _ || (_ = Qe()), $t(_, this.relativeTarget)), M && (this.animationValues = g, D1(g, y, this.latestValues, Q, z, D)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = Q;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Mn(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Re.update(() => {
        qs.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Pr(0)), this.currentAnimation = I1(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), f.onUpdate && f.onUpdate(h);
          },
          onStop: () => {
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(F1), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: m, layout: y, latestValues: g } = f;
      if (!(!h || !m || !y)) {
        if (this !== f && this.layout && y && dm(this.options.animationType, this.layout.layoutBox, y.layoutBox)) {
          m = this.target || Qe();
          const x = pt(this.layout.layoutBox.x);
          m.x.min = f.target.x.min, m.x.max = m.x.min + x;
          const S = pt(this.layout.layoutBox.y);
          m.y.min = f.target.y.min, m.y.max = m.y.min + S;
        }
        $t(h, m), Cr(h, g), ki(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new j1()), this.sharedNodes.get(f).add(h);
      const y = h.options.initialPromotionConfig;
      h.promote({
        transition: y ? y.transition : void 0,
        preserveFollowOpacity: y && y.shouldPreserveFollowOpacity ? y.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: h, preserveFollowOpacity: m } = {}) {
      const y = this.getStack();
      y && y.promote(this, m), f && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let h = !1;
      const { latestValues: m } = f;
      if ((m.z || m.rotate || m.rotateX || m.rotateY || m.rotateZ || m.skewX || m.skewY) && (h = !0), !h)
        return;
      const y = {};
      m.z && pl("z", f, y, this.animationValues);
      for (let g = 0; g < dl.length; g++)
        pl(`rotate${dl[g]}`, f, y, this.animationValues), pl(`skew${dl[g]}`, f, y, this.animationValues);
      f.render();
      for (const g in y)
        f.setStaticValue(g, y[g]), this.animationValues && (this.animationValues[g] = y[g]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const m = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = Zs(h?.pointerEvents) || "", f.transform = m ? m(this.latestValues, "") : "none";
        return;
      }
      const y = this.getLead();
      if (!this.projectionDelta || !this.layout || !y.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = Zs(h?.pointerEvents) || ""), this.hasProjected && !Yn(this.latestValues) && (f.transform = m ? m({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = y.animationValues || y.latestValues;
      this.applyTransformsToTarget();
      let x = R1(this.projectionDeltaWithTransform, this.treeScale, g);
      m && (x = m(g, x)), f.transform = x;
      const { x: S, y: C } = this.projectionDelta;
      f.transformOrigin = `${S.origin * 100}% ${C.origin * 100}% 0`, y.animationValues ? f.opacity = y === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = y === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const P in bl) {
        if (g[P] === void 0)
          continue;
        const { correct: M, applyTo: L, isCSSVariable: D } = bl[P], z = x === "none" ? g[P] : M(g[P], y);
        if (L) {
          const _ = L.length;
          for (let K = 0; K < _; K++)
            f[L[K]] = z;
        } else
          D ? this.options.visualElement.renderState.vars[P] = z : f[P] = z;
      }
      this.options.layoutId && (f.pointerEvents = y === this ? Zs(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(mp), this.root.sharedNodes.clear();
    }
  };
}
function B1(n) {
  n.updateLayout();
}
function U1(n) {
  const r = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && r && n.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: a } = n.layout, { animationType: c } = n.options, d = r.source !== n.layout.source;
    c === "size" ? Lt((g) => {
      const x = d ? r.measuredBox[g] : r.layoutBox[g], S = pt(x);
      x.min = s[g].min, x.max = x.min + S;
    }) : dm(c, r.layoutBox, s) && Lt((g) => {
      const x = d ? r.measuredBox[g] : r.layoutBox[g], S = pt(s[g]);
      x.max = x.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + S);
    });
    const f = kr();
    ki(f, s, r.layoutBox);
    const h = kr();
    d ? ki(h, n.applyTransform(a, !0), r.measuredBox) : ki(h, s, r.layoutBox);
    const m = !om(f);
    let y = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: x, layout: S } = g;
        if (x && S) {
          const C = Qe();
          so(C, r.layoutBox, x.layoutBox);
          const P = Qe();
          so(P, s, S.layoutBox), am(C, P) || (y = !0), g.options.layoutRoot && (n.relativeTarget = P, n.relativeTargetOrigin = C, n.relativeParent = g);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: s,
      snapshot: r,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: m,
      hasRelativeLayoutChanged: y
    });
  } else if (n.isLead()) {
    const { onExitComplete: s } = n.options;
    s && s();
  }
  n.options.transition = void 0;
}
function $1(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function W1(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function K1(n) {
  n.clearSnapshot();
}
function mp(n) {
  n.clearMeasurements();
}
function gp(n) {
  n.isLayoutDirty = !1;
}
function b1(n) {
  const { visualElement: r } = n.options;
  r && r.getProps().onBeforeLayoutMeasure && r.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function yp(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function H1(n) {
  n.resolveTargetDelta();
}
function Y1(n) {
  n.calcProjection();
}
function G1(n) {
  n.resetSkewAndRotation();
}
function X1(n) {
  n.removeLeadSnapshot();
}
function vp(n, r, s) {
  n.translate = Ne(r.translate, 0, s), n.scale = Ne(r.scale, 1, s), n.origin = r.origin, n.originPoint = r.originPoint;
}
function xp(n, r, s, a) {
  n.min = Ne(r.min, s.min, a), n.max = Ne(r.max, s.max, a);
}
function Q1(n, r, s, a) {
  xp(n.x, r.x, s.x, a), xp(n.y, r.y, s.y, a);
}
function Z1(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const q1 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, wp = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), Sp = wp("applewebkit/") && !wp("chrome/") ? Math.round : It;
function kp(n) {
  n.min = Sp(n.min), n.max = Sp(n.max);
}
function J1(n) {
  kp(n.x), kp(n.y);
}
function dm(n, r, s) {
  return n === "position" || n === "preserve-aspect" && !k1(cp(r), cp(s), 0.2);
}
function ex(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const tx = fm({
  attachResizeListener: (n, r) => Ri(n, "resize", r),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), hl = {
  current: void 0
}, pm = fm({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!hl.current) {
      const n = new tx({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), hl.current = n;
    }
    return hl.current;
  },
  resetTransform: (n, r) => {
    n.style.transform = r !== void 0 ? r : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), Pu = N.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function Tp(n, r) {
  if (typeof n == "function")
    return n(r);
  n != null && (n.current = r);
}
function nx(...n) {
  return (r) => {
    let s = !1;
    const a = n.map((c) => {
      const d = Tp(c, r);
      return !s && typeof d == "function" && (s = !0), d;
    });
    if (s)
      return () => {
        for (let c = 0; c < a.length; c++) {
          const d = a[c];
          typeof d == "function" ? d() : Tp(n[c], null);
        }
      };
  };
}
function rx(...n) {
  return N.useCallback(nx(...n), n);
}
class ix extends N.Component {
  getSnapshotBeforeUpdate(r) {
    const s = this.props.childRef.current;
    if (s && r.isPresent && !this.props.isPresent) {
      const a = s.offsetParent, c = Ul(a) && a.offsetWidth || 0, d = Ul(a) && a.offsetHeight || 0, f = this.props.sizeRef.current;
      f.height = s.offsetHeight || 0, f.width = s.offsetWidth || 0, f.top = s.offsetTop, f.left = s.offsetLeft, f.right = c - f.width - f.left, f.bottom = d - f.height - f.top;
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
function sx({ children: n, isPresent: r, anchorX: s, anchorY: a, root: c }) {
  const d = N.useId(), f = N.useRef(null), h = N.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = N.useContext(Pu), y = n.props?.ref ?? n?.ref, g = rx(f, y);
  return N.useInsertionEffect(() => {
    const { width: x, height: S, top: C, left: P, right: M, bottom: L } = h.current;
    if (r || !f.current || !x || !S)
      return;
    const D = s === "left" ? `left: ${P}` : `right: ${M}`, z = a === "bottom" ? `bottom: ${L}` : `top: ${C}`;
    f.current.dataset.motionPopId = d;
    const _ = document.createElement("style");
    m && (_.nonce = m);
    const K = c ?? document.head;
    return K.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${S}px !important;
            ${D}px !important;
            ${z}px !important;
          }
        `), () => {
      K.contains(_) && K.removeChild(_);
    };
  }, [r]), W.jsx(ix, { isPresent: r, childRef: f, sizeRef: h, children: N.cloneElement(n, { ref: g }) });
}
const ox = ({ children: n, initial: r, isPresent: s, onExitComplete: a, custom: c, presenceAffectsLayout: d, mode: f, anchorX: h, anchorY: m, root: y }) => {
  const g = ql(ax), x = N.useId();
  let S = !0, C = N.useMemo(() => (S = !1, {
    id: x,
    initial: r,
    isPresent: s,
    custom: c,
    onExitComplete: (P) => {
      g.set(P, !0);
      for (const M of g.values())
        if (!M)
          return;
      a && a();
    },
    register: (P) => (g.set(P, !1), () => g.delete(P))
  }), [s, g, a]);
  return d && S && (C = { ...C }), N.useMemo(() => {
    g.forEach((P, M) => g.set(M, !1));
  }, [s]), N.useEffect(() => {
    !s && !g.size && a && a();
  }, [s]), f === "popLayout" && (n = W.jsx(sx, { isPresent: s, anchorX: h, anchorY: m, root: y, children: n })), W.jsx(ao.Provider, { value: C, children: n });
};
function ax() {
  return /* @__PURE__ */ new Map();
}
function hm(n = !0) {
  const r = N.useContext(ao);
  if (r === null)
    return [!0, null];
  const { isPresent: s, onExitComplete: a, register: c } = r, d = N.useId();
  N.useEffect(() => {
    if (n)
      return c(d);
  }, [n]);
  const f = N.useCallback(() => n && a && a(d), [d, a, n]);
  return !s && a ? [!1, f] : [!0];
}
const Ks = (n) => n.key || "";
function Cp(n) {
  const r = [];
  return N.Children.forEach(n, (s) => {
    N.isValidElement(s) && r.push(s);
  }), r;
}
const Hl = ({ children: n, custom: r, initial: s = !0, onExitComplete: a, presenceAffectsLayout: c = !0, mode: d = "sync", propagate: f = !1, anchorX: h = "left", anchorY: m = "top", root: y }) => {
  const [g, x] = hm(f), S = N.useMemo(() => Cp(n), [n]), C = f && !g ? [] : S.map(Ks), P = N.useRef(!0), M = N.useRef(S), L = ql(() => /* @__PURE__ */ new Map()), D = N.useRef(/* @__PURE__ */ new Set()), [z, _] = N.useState(S), [K, Q] = N.useState(S);
  Yp(() => {
    P.current = !1, M.current = S;
    for (let Y = 0; Y < K.length; Y++) {
      const ce = Ks(K[Y]);
      C.includes(ce) ? (L.delete(ce), D.current.delete(ce)) : L.get(ce) !== !0 && L.set(ce, !1);
    }
  }, [K, C.length, C.join("-")]);
  const ie = [];
  if (S !== z) {
    let Y = [...S];
    for (let ce = 0; ce < K.length; ce++) {
      const Se = K[ce], ze = Ks(Se);
      C.includes(ze) || (Y.splice(ce, 0, Se), ie.push(Se));
    }
    return d === "wait" && ie.length && (Y = ie), Q(Cp(Y)), _(S), null;
  }
  const { forceRender: de } = N.useContext(Zl);
  return W.jsx(W.Fragment, { children: K.map((Y) => {
    const ce = Ks(Y), Se = f && !g ? !1 : S === K || C.includes(ce), ze = () => {
      if (D.current.has(ce))
        return;
      if (D.current.add(ce), L.has(ce))
        L.set(ce, !0);
      else
        return;
      let be = !0;
      L.forEach((He) => {
        He || (be = !1);
      }), be && (de?.(), Q(M.current), f && x?.(), a && a());
    };
    return W.jsx(ox, { isPresent: Se, initial: !P.current || s ? void 0 : !1, custom: r, presenceAffectsLayout: c, mode: d, root: y, onExitComplete: Se ? void 0 : ze, anchorX: h, anchorY: m, children: Y }, ce);
  }) });
}, mm = N.createContext({ strict: !1 }), Ep = {
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
let Pp = !1;
function lx() {
  if (Pp)
    return;
  const n = {};
  for (const r in Ep)
    n[r] = {
      isEnabled: (s) => Ep[r].some((a) => !!s[a])
    };
  Kh(n), Pp = !0;
}
function gm() {
  return lx(), G0();
}
function ux(n) {
  const r = gm();
  for (const s in n)
    r[s] = {
      ...r[s],
      ...n[s]
    };
  Kh(r);
}
const cx = /* @__PURE__ */ new Set([
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
function oo(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || cx.has(n);
}
let ym = (n) => !oo(n);
function fx(n) {
  typeof n == "function" && (ym = (r) => r.startsWith("on") ? !oo(r) : n(r));
}
try {
  fx(require("@emotion/is-prop-valid").default);
} catch {
}
function dx(n, r, s) {
  const a = {};
  for (const c in n)
    c === "values" && typeof n.values == "object" || (ym(c) || s === !0 && oo(c) || !r && !oo(c) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && c.startsWith("onDrag")) && (a[c] = n[c]);
  return a;
}
const co = /* @__PURE__ */ N.createContext({});
function px(n, r) {
  if (uo(n)) {
    const { initial: s, animate: a } = n;
    return {
      initial: s === !1 || Ai(s) ? s : void 0,
      animate: Ai(a) ? a : void 0
    };
  }
  return n.inherit !== !1 ? r : {};
}
function hx(n) {
  const { initial: r, animate: s } = px(n, N.useContext(co));
  return N.useMemo(() => ({ initial: r, animate: s }), [Ap(r), Ap(s)]);
}
function Ap(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Au = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function vm(n, r, s) {
  for (const a in r)
    !ut(r[a]) && !Zh(a, s) && (n[a] = r[a]);
}
function mx({ transformTemplate: n }, r) {
  return N.useMemo(() => {
    const s = Au();
    return Cu(s, r, n), Object.assign({}, s.vars, s.style);
  }, [r]);
}
function gx(n, r) {
  const s = n.style || {}, a = {};
  return vm(a, s, n), Object.assign(a, mx(n, r)), a;
}
function yx(n, r) {
  const s = {}, a = gx(n, r);
  return n.drag && n.dragListener !== !1 && (s.draggable = !1, a.userSelect = a.WebkitUserSelect = a.WebkitTouchCallout = "none", a.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (s.tabIndex = 0), s.style = a, s;
}
const xm = () => ({
  ...Au(),
  attrs: {}
});
function vx(n, r, s, a) {
  const c = N.useMemo(() => {
    const d = xm();
    return qh(d, r, em(a), n.transformTemplate, n.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [r]);
  if (n.style) {
    const d = {};
    vm(d, n.style, n), c.style = { ...d, ...c.style };
  }
  return c;
}
const xx = [
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
function Ru(n) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof n != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    n.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(xx.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function wx(n, r, s, { latestValues: a }, c, d = !1, f) {
  const m = (f ?? Ru(n) ? vx : yx)(r, a, c, n), y = dx(r, typeof n == "string", d), g = n !== N.Fragment ? { ...y, ...m, ref: s } : {}, { children: x } = r, S = N.useMemo(() => ut(x) ? x.get() : x, [x]);
  return N.createElement(n, {
    ...g,
    children: S
  });
}
function Sx({ scrapeMotionValuesFromProps: n, createRenderState: r }, s, a, c) {
  return {
    latestValues: kx(s, a, c, n),
    renderState: r()
  };
}
function kx(n, r, s, a) {
  const c = {}, d = a(n, {});
  for (const S in d)
    c[S] = Zs(d[S]);
  let { initial: f, animate: h } = n;
  const m = uo(n), y = Wh(n);
  r && y && !m && n.inherit !== !1 && (f === void 0 && (f = r.initial), h === void 0 && (h = r.animate));
  let g = s ? s.initial === !1 : !1;
  g = g || f === !1;
  const x = g ? h : f;
  if (x && typeof x != "boolean" && !lo(x)) {
    const S = Array.isArray(x) ? x : [x];
    for (let C = 0; C < S.length; C++) {
      const P = yu(n, S[C]);
      if (P) {
        const { transitionEnd: M, transition: L, ...D } = P;
        for (const z in D) {
          let _ = D[z];
          if (Array.isArray(_)) {
            const K = g ? _.length - 1 : 0;
            _ = _[K];
          }
          _ !== null && (c[z] = _);
        }
        for (const z in M)
          c[z] = M[z];
      }
    }
  }
  return c;
}
const wm = (n) => (r, s) => {
  const a = N.useContext(co), c = N.useContext(ao), d = () => Sx(n, r, a, c);
  return s ? d() : ql(d);
}, Tx = /* @__PURE__ */ wm({
  scrapeMotionValuesFromProps: Eu,
  createRenderState: Au
}), Cx = /* @__PURE__ */ wm({
  scrapeMotionValuesFromProps: tm,
  createRenderState: xm
}), Ex = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function Px(n, r, s) {
  const a = N.useRef(s);
  N.useInsertionEffect(() => {
    a.current = s;
  });
  const c = N.useRef(null);
  return N.useCallback((d) => {
    d && n.onMount?.(d), r && (d ? r.mount(d) : r.unmount());
    const f = a.current;
    if (typeof f == "function")
      if (d) {
        const h = f(d);
        typeof h == "function" && (c.current = h);
      } else c.current ? (c.current(), c.current = null) : f(d);
    else f && (f.current = d);
  }, [r]);
}
const Sm = N.createContext({});
function xi(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function Ax(n, r, s, a, c, d) {
  const { visualElement: f } = N.useContext(co), h = N.useContext(mm), m = N.useContext(ao), y = N.useContext(Pu), g = y.reducedMotion, x = y.skipAnimations, S = N.useRef(null), C = N.useRef(!1);
  a = a || h.renderer, !S.current && a && (S.current = a(n, {
    visualState: r,
    parent: f,
    props: s,
    presenceContext: m,
    blockInitialAnimation: m ? m.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: x,
    isSVG: d
  }), C.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const P = S.current, M = N.useContext(Sm);
  P && !P.projection && c && (P.type === "html" || P.type === "svg") && Rx(S.current, s, c, M);
  const L = N.useRef(!1);
  N.useInsertionEffect(() => {
    P && L.current && P.update(s, m);
  });
  const D = s[Dh], z = N.useRef(!!D && !window.MotionHandoffIsComplete?.(D) && window.MotionHasOptimisedAnimation?.(D));
  return Yp(() => {
    C.current = !0, P && (L.current = !0, window.MotionIsMounted = !0, P.updateFeatures(), P.scheduleRenderMicrotask(), z.current && P.animationState && P.animationState.animateChanges());
  }), N.useEffect(() => {
    P && (!z.current && P.animationState && P.animationState.animateChanges(), z.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(D);
    }), z.current = !1), P.enteringChildren = void 0);
  }), P;
}
function Rx(n, r, s, a) {
  const { layoutId: c, layout: d, drag: f, dragConstraints: h, layoutScroll: m, layoutRoot: y, layoutCrossfade: g } = r;
  n.projection = new s(n.latestValues, r["data-framer-portal-id"] ? void 0 : km(n.parent)), n.projection.setOptions({
    layoutId: c,
    layout: d,
    alwaysMeasureLayout: !!f || h && xi(h),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: a,
    crossfade: g,
    layoutScroll: m,
    layoutRoot: y
  });
}
function km(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : km(n.parent);
}
function ml(n, { forwardMotionProps: r = !1, type: s } = {}, a, c) {
  a && ux(a);
  const d = s ? s === "svg" : Ru(n), f = d ? Cx : Tx;
  function h(y, g) {
    let x;
    const S = {
      ...N.useContext(Pu),
      ...y,
      layoutId: Mx(y)
    }, { isStatic: C } = S, P = hx(y), M = f(y, C);
    if (!C && Hp) {
      Dx();
      const L = Lx(S);
      x = L.MeasureLayout, P.visualElement = Ax(n, M, S, c, L.ProjectionNode, d);
    }
    return W.jsxs(co.Provider, { value: P, children: [x && P.visualElement ? W.jsx(x, { visualElement: P.visualElement, ...S }) : null, wx(n, y, Px(M, P.visualElement, g), M, C, r, d)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const m = N.forwardRef(h);
  return m[Ex] = n, m;
}
function Mx({ layoutId: n }) {
  const r = N.useContext(Zl).id;
  return r && n !== void 0 ? r + "-" + n : n;
}
function Dx(n, r) {
  N.useContext(mm).strict;
}
function Lx(n) {
  const r = gm(), { drag: s, layout: a } = r;
  if (!s && !a)
    return {};
  const c = { ...s, ...a };
  return {
    MeasureLayout: s?.isEnabled(n) || a?.isEnabled(n) ? c.MeasureLayout : void 0,
    ProjectionNode: c.ProjectionNode
  };
}
function _x(n, r) {
  if (typeof Proxy > "u")
    return ml;
  const s = /* @__PURE__ */ new Map(), a = (d, f) => ml(d, f, n, r), c = (d, f) => a(d, f);
  return new Proxy(c, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, f) => f === "create" ? a : (s.has(f) || s.set(f, ml(f, void 0, n, r)), s.get(f))
  });
}
const Ix = (n, r) => r.isSVG ?? Ru(n) ? new f1(r) : new s1(r, {
  allowProjection: n !== N.Fragment
});
class Vx extends Ln {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(r) {
    super(r), r.animationState || (r.animationState = g1(r));
  }
  updateAnimationControlsSubscription() {
    const { animate: r } = this.node.getProps();
    lo(r) && (this.unmountControls = r.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: r } = this.node.getProps(), { animate: s } = this.node.prevProps || {};
    r !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Nx = 0;
class Ox extends Ln {
  constructor() {
    super(...arguments), this.id = Nx++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: r, onExitComplete: s } = this.node.presenceContext, { isPresent: a } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || r === a)
      return;
    const c = this.node.animationState.setActive("exit", !r);
    s && !r && c.then(() => {
      s(this.id);
    });
  }
  mount() {
    const { register: r, onExitComplete: s } = this.node.presenceContext || {};
    s && s(this.id), r && (this.unmount = r(this.id));
  }
  unmount() {
  }
}
const jx = {
  animation: {
    Feature: Vx
  },
  exit: {
    Feature: Ox
  }
};
function Ii(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const Fx = (n) => (r) => Su(r) && n(r, Ii(r));
function Ti(n, r, s, a) {
  return Ri(n, r, Fx(s), a);
}
const Tm = ({ current: n }) => n ? n.ownerDocument.defaultView : null, Rp = (n, r) => Math.abs(n - r);
function zx(n, r) {
  const s = Rp(n.x, r.x), a = Rp(n.y, r.y);
  return Math.sqrt(s ** 2 + a ** 2);
}
const Mp = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Cm {
  constructor(r, s, { transformPagePoint: a, contextWindow: c = window, dragSnapToOrigin: d = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (C) => {
      this.handleScroll(C.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const C = yl(this.lastMoveEventInfo, this.history), P = this.startEvent !== null, M = zx(C.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!P && !M)
        return;
      const { point: L } = C, { timestamp: D } = it;
      this.history.push({ ...L, timestamp: D });
      const { onStart: z, onMove: _ } = this.handlers;
      P || (z && z(this.lastMoveEvent, C), this.startEvent = this.lastMoveEvent), _ && _(this.lastMoveEvent, C);
    }, this.handlePointerMove = (C, P) => {
      this.lastMoveEvent = C, this.lastMoveEventInfo = gl(P, this.transformPagePoint), Re.update(this.updatePoint, !0);
    }, this.handlePointerUp = (C, P) => {
      this.end();
      const { onEnd: M, onSessionEnd: L, resumeAnimation: D } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && D && D(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const z = yl(C.type === "pointercancel" ? this.lastMoveEventInfo : gl(P, this.transformPagePoint), this.history);
      this.startEvent && M && M(C, z), L && L(C, z);
    }, !Su(r))
      return;
    this.dragSnapToOrigin = d, this.handlers = s, this.transformPagePoint = a, this.distanceThreshold = f, this.contextWindow = c || window;
    const m = Ii(r), y = gl(m, this.transformPagePoint), { point: g } = y, { timestamp: x } = it;
    this.history = [{ ...g, timestamp: x }];
    const { onSessionStart: S } = s;
    S && S(r, yl(y, this.history)), this.removeListeners = Di(Ti(this.contextWindow, "pointermove", this.handlePointerMove), Ti(this.contextWindow, "pointerup", this.handlePointerUp), Ti(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(r) {
    let s = r.parentElement;
    for (; s; ) {
      const a = getComputedStyle(s);
      (Mp.has(a.overflowX) || Mp.has(a.overflowY)) && this.scrollPositions.set(s, {
        x: s.scrollLeft,
        y: s.scrollTop
      }), s = s.parentElement;
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
  handleScroll(r) {
    const s = this.scrollPositions.get(r);
    if (!s)
      return;
    const a = r === window, c = a ? { x: window.scrollX, y: window.scrollY } : {
      x: r.scrollLeft,
      y: r.scrollTop
    }, d = { x: c.x - s.x, y: c.y - s.y };
    d.x === 0 && d.y === 0 || (a ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(r, c), Re.update(this.updatePoint, !0));
  }
  updateHandlers(r) {
    this.handlers = r;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Mn(this.updatePoint);
  }
}
function gl(n, r) {
  return r ? { point: r(n.point) } : n;
}
function Dp(n, r) {
  return { x: n.x - r.x, y: n.y - r.y };
}
function yl({ point: n }, r) {
  return {
    point: n,
    delta: Dp(n, Em(r)),
    offset: Dp(n, Bx(r)),
    velocity: Ux(r, 0.1)
  };
}
function Bx(n) {
  return n[0];
}
function Em(n) {
  return n[n.length - 1];
}
function Ux(n, r) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let s = n.length - 1, a = null;
  const c = Em(n);
  for (; s >= 0 && (a = n[s], !(c.timestamp - a.timestamp > /* @__PURE__ */ on(r))); )
    s--;
  if (!a)
    return { x: 0, y: 0 };
  const d = /* @__PURE__ */ _t(c.timestamp - a.timestamp);
  if (d === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (c.x - a.x) / d,
    y: (c.y - a.y) / d
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function $x(n, { min: r, max: s }, a) {
  return r !== void 0 && n < r ? n = a ? Ne(r, n, a.min) : Math.max(n, r) : s !== void 0 && n > s && (n = a ? Ne(s, n, a.max) : Math.min(n, s)), n;
}
function Lp(n, r, s) {
  return {
    min: r !== void 0 ? n.min + r : void 0,
    max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0
  };
}
function Wx(n, { top: r, left: s, bottom: a, right: c }) {
  return {
    x: Lp(n.x, s, c),
    y: Lp(n.y, r, a)
  };
}
function _p(n, r) {
  let s = r.min - n.min, a = r.max - n.max;
  return r.max - r.min < n.max - n.min && ([s, a] = [a, s]), { min: s, max: a };
}
function Kx(n, r) {
  return {
    x: _p(n.x, r.x),
    y: _p(n.y, r.y)
  };
}
function bx(n, r) {
  let s = 0.5;
  const a = pt(n), c = pt(r);
  return c > a ? s = /* @__PURE__ */ Ci(r.min, r.max - a, n.min) : a > c && (s = /* @__PURE__ */ Ci(n.min, n.max - c, r.min)), Qt(0, 1, s);
}
function Hx(n, r) {
  const s = {};
  return r.min !== void 0 && (s.min = r.min - n.min), r.max !== void 0 && (s.max = r.max - n.min), s;
}
const Yl = 0.35;
function Yx(n = Yl) {
  return n === !1 ? n = 0 : n === !0 && (n = Yl), {
    x: Ip(n, "left", "right"),
    y: Ip(n, "top", "bottom")
  };
}
function Ip(n, r, s) {
  return {
    min: Vp(n, r),
    max: Vp(n, s)
  };
}
function Vp(n, r) {
  return typeof n == "number" ? n : n[r] || 0;
}
const Gx = /* @__PURE__ */ new WeakMap();
class Xx {
  constructor(r) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Qe(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = r;
  }
  start(r, { snapToCursor: s = !1, distanceThreshold: a } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1)
      return;
    const d = (x) => {
      s ? (this.stopAnimation(), this.snapToCursor(Ii(x).point)) : this.pauseAnimation();
    }, f = (x, S) => {
      this.stopAnimation();
      const { drag: C, dragPropagation: P, onDragStart: M } = this.getProps();
      if (C && !P && (this.openDragLock && this.openDragLock(), this.openDragLock = I0(C), !this.openDragLock))
        return;
      this.latestPointerEvent = x, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Lt((D) => {
        let z = this.getAxisMotionValue(D).get() || 0;
        if (Xt.test(z)) {
          const { projection: _ } = this.visualElement;
          if (_ && _.layout) {
            const K = _.layout.layoutBox[D];
            K && (z = pt(K) * (parseFloat(z) / 100));
          }
        }
        this.originPoint[D] = z;
      }), M && Re.update(() => M(x, S), !1, !0), Fl(this.visualElement, "transform");
      const { animationState: L } = this.visualElement;
      L && L.setActive("whileDrag", !0);
    }, h = (x, S) => {
      this.latestPointerEvent = x, this.latestPanInfo = S;
      const { dragPropagation: C, dragDirectionLock: P, onDirectionLock: M, onDrag: L } = this.getProps();
      if (!C && !this.openDragLock)
        return;
      const { offset: D } = S;
      if (P && this.currentDirection === null) {
        this.currentDirection = Qx(D), this.currentDirection !== null && M && M(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, D), this.updateAxis("y", S.point, D), this.visualElement.render(), L && Re.update(() => L(x, S), !1, !0);
    }, m = (x, S) => {
      this.latestPointerEvent = x, this.latestPanInfo = S, this.stop(x, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, y = () => Lt((x) => this.getAnimationState(x) === "paused" && this.getAxisMotionValue(x).animation?.play()), { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new Cm(r, {
      onSessionStart: d,
      onStart: f,
      onMove: h,
      onSessionEnd: m,
      resumeAnimation: y
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: a,
      contextWindow: Tm(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(r, s) {
    const a = r || this.latestPointerEvent, c = s || this.latestPanInfo, d = this.isDragging;
    if (this.cancel(), !d || !c || !a)
      return;
    const { velocity: f } = c;
    this.startAnimation(f);
    const { onDragEnd: h } = this.getProps();
    h && Re.postRender(() => h(a, c));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: r, animationState: s } = this.visualElement;
    r && (r.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: a } = this.getProps();
    !a && this.openDragLock && (this.openDragLock(), this.openDragLock = null), s && s.setActive("whileDrag", !1);
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
  updateAxis(r, s, a) {
    const { drag: c } = this.getProps();
    if (!a || !bs(r, c, this.currentDirection))
      return;
    const d = this.getAxisMotionValue(r);
    let f = this.originPoint[r] + a[r];
    this.constraints && this.constraints[r] && (f = $x(f, this.constraints[r], this.elastic[r])), d.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: r, dragElastic: s } = this.getProps(), a = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, c = this.constraints;
    r && xi(r) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : r && a ? this.constraints = Wx(a.layoutBox, r) : this.constraints = !1, this.elastic = Yx(s), c !== this.constraints && a && this.constraints && !this.hasMutatedConstraints && Lt((d) => {
      this.constraints !== !1 && this.getAxisMotionValue(d) && (this.constraints[d] = Hx(a.layoutBox[d], this.constraints[d]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: r, onMeasureDragConstraints: s } = this.getProps();
    if (!r || !xi(r))
      return !1;
    const a = r.current, { projection: c } = this.visualElement;
    if (!c || !c.layout)
      return !1;
    const d = J0(a, c.root, this.visualElement.getTransformPagePoint());
    let f = Kx(c.layout.layoutBox, d);
    if (s) {
      const h = s(Q0(f));
      this.hasMutatedConstraints = !!h, h && (f = Hh(h));
    }
    return f;
  }
  startAnimation(r) {
    const { drag: s, dragMomentum: a, dragElastic: c, dragTransition: d, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), m = this.constraints || {}, y = Lt((g) => {
      if (!bs(g, s, this.currentDirection))
        return;
      let x = m && m[g] || {};
      f && (x = { min: 0, max: 0 });
      const S = c ? 200 : 1e6, C = c ? 40 : 1e7, P = {
        type: "inertia",
        velocity: a ? r[g] : 0,
        bounceStiffness: S,
        bounceDamping: C,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...d,
        ...x
      };
      return this.startAxisValueAnimation(g, P);
    });
    return Promise.all(y).then(h);
  }
  startAxisValueAnimation(r, s) {
    const a = this.getAxisMotionValue(r);
    return Fl(this.visualElement, r), a.start(gu(r, a, 0, s, this.visualElement, !1));
  }
  stopAnimation() {
    Lt((r) => this.getAxisMotionValue(r).stop());
  }
  pauseAnimation() {
    Lt((r) => this.getAxisMotionValue(r).animation?.pause());
  }
  getAnimationState(r) {
    return this.getAxisMotionValue(r).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(r) {
    const s = `_drag${r.toUpperCase()}`, a = this.visualElement.getProps(), c = a[s];
    return c || this.visualElement.getValue(r, (a.initial ? a.initial[r] : void 0) || 0);
  }
  snapToCursor(r) {
    Lt((s) => {
      const { drag: a } = this.getProps();
      if (!bs(s, a, this.currentDirection))
        return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(s);
      if (c && c.layout) {
        const { min: f, max: h } = c.layout.layoutBox[s], m = d.get() || 0;
        d.set(r[s] - Ne(f, h, 0.5) + m);
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
    const { drag: r, dragConstraints: s } = this.getProps(), { projection: a } = this.visualElement;
    if (!xi(s) || !a || !this.constraints)
      return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    Lt((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const m = h.get();
        c[f] = bx({ min: m, max: m }, this.constraints[f]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", a.root && a.root.updateScroll(), a.updateLayout(), this.resolveConstraints(), Lt((f) => {
      if (!bs(f, r, null))
        return;
      const h = this.getAxisMotionValue(f), { min: m, max: y } = this.constraints[f];
      h.set(Ne(m, y, c[f]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Gx.set(this.visualElement, this);
    const r = this.visualElement.current, s = Ti(r, "pointerdown", (m) => {
      const { drag: y, dragListener: g = !0 } = this.getProps(), x = m.target, S = x !== r && F0(x);
      y && g && !S && this.start(m);
    }), a = () => {
      const { dragConstraints: m } = this.getProps();
      xi(m) && m.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", a);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Re.read(a);
    const f = Ri(window, "resize", () => this.scalePositionWithinConstraints()), h = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Lt((g) => {
        const x = this.getAxisMotionValue(g);
        x && (this.originPoint[g] += m[g].translate, x.set(x.get() + m[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      f(), s(), d(), h && h();
    };
  }
  getProps() {
    const r = this.visualElement.getProps(), { drag: s = !1, dragDirectionLock: a = !1, dragPropagation: c = !1, dragConstraints: d = !1, dragElastic: f = Yl, dragMomentum: h = !0 } = r;
    return {
      ...r,
      drag: s,
      dragDirectionLock: a,
      dragPropagation: c,
      dragConstraints: d,
      dragElastic: f,
      dragMomentum: h
    };
  }
}
function bs(n, r, s) {
  return (r === !0 || r === n) && (s === null || s === n);
}
function Qx(n, r = 10) {
  let s = null;
  return Math.abs(n.y) > r ? s = "y" : Math.abs(n.x) > r && (s = "x"), s;
}
class Zx extends Ln {
  constructor(r) {
    super(r), this.removeGroupControls = It, this.removeListeners = It, this.controls = new Xx(r);
  }
  mount() {
    const { dragControls: r } = this.node.getProps();
    r && (this.removeGroupControls = r.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || It;
  }
  update() {
    const { dragControls: r } = this.node.getProps(), { dragControls: s } = this.node.prevProps || {};
    r !== s && (this.removeGroupControls(), r && (this.removeGroupControls = r.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const vl = (n) => (r, s) => {
  n && Re.update(() => n(r, s), !1, !0);
};
class qx extends Ln {
  constructor() {
    super(...arguments), this.removePointerDownListener = It;
  }
  onPointerDown(r) {
    this.session = new Cm(r, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Tm(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: r, onPanStart: s, onPan: a, onPanEnd: c } = this.node.getProps();
    return {
      onSessionStart: vl(r),
      onStart: vl(s),
      onMove: vl(a),
      onEnd: (d, f) => {
        delete this.session, c && Re.postRender(() => c(d, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ti(this.node.current, "pointerdown", (r) => this.onPointerDown(r));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let xl = !1;
class Jx extends N.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: r, layoutGroup: s, switchLayoutGroup: a, layoutId: c } = this.props, { projection: d } = r;
    d && (s.group && s.group.add(d), a && a.register && c && a.register(d), xl && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({
      ...d.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), qs.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(r) {
    const { layoutDependency: s, visualElement: a, drag: c, isPresent: d } = this.props, { projection: f } = a;
    return f && (f.isPresent = d, r.layoutDependency !== s && f.setOptions({
      ...f.options,
      layoutDependency: s
    }), xl = !0, c || r.layoutDependency !== s || s === void 0 || r.isPresent !== d ? f.willUpdate() : this.safeToRemove(), r.isPresent !== d && (d ? f.promote() : f.relegate() || Re.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: r } = this.props.visualElement;
    r && (r.root.didUpdate(), wu.postRender(() => {
      !r.currentAnimation && r.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: r, layoutGroup: s, switchLayoutGroup: a } = this.props, { projection: c } = r;
    xl = !0, c && (c.scheduleCheckAfterUnmount(), s && s.group && s.group.remove(c), a && a.deregister && a.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: r } = this.props;
    r && r();
  }
  render() {
    return null;
  }
}
function Pm(n) {
  const [r, s] = hm(), a = N.useContext(Zl);
  return W.jsx(Jx, { ...n, layoutGroup: a, switchLayoutGroup: N.useContext(Sm), isPresent: r, safeToRemove: s });
}
const ew = {
  pan: {
    Feature: qx
  },
  drag: {
    Feature: Zx,
    ProjectionNode: pm,
    MeasureLayout: Pm
  }
};
function Np(n, r, s) {
  const { props: a } = n;
  n.animationState && a.whileHover && n.animationState.setActive("whileHover", s === "Start");
  const c = "onHover" + s, d = a[c];
  d && Re.postRender(() => d(r, Ii(r)));
}
class tw extends Ln {
  mount() {
    const { current: r } = this.node;
    r && (this.unmount = V0(r, (s, a) => (Np(this.node, a, "Start"), (c) => Np(this.node, c, "End"))));
  }
  unmount() {
  }
}
class nw extends Ln {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let r = !1;
    try {
      r = this.node.current.matches(":focus-visible");
    } catch {
      r = !0;
    }
    !r || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Di(Ri(this.node.current, "focus", () => this.onFocus()), Ri(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Op(n, r, s) {
  const { props: a } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && a.whileTap && n.animationState.setActive("whileTap", s === "Start");
  const c = "onTap" + (s === "End" ? "" : s), d = a[c];
  d && Re.postRender(() => d(r, Ii(r)));
}
class rw extends Ln {
  mount() {
    const { current: r } = this.node;
    r && (this.unmount = B0(r, (s, a) => (Op(this.node, a, "Start"), (c, { success: d }) => Op(this.node, c, d ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Gl = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap(), iw = (n) => {
  const r = Gl.get(n.target);
  r && r(n);
}, sw = (n) => {
  n.forEach(iw);
};
function ow({ root: n, ...r }) {
  const s = n || document;
  wl.has(s) || wl.set(s, {});
  const a = wl.get(s), c = JSON.stringify(r);
  return a[c] || (a[c] = new IntersectionObserver(sw, { root: n, ...r })), a[c];
}
function aw(n, r, s) {
  const a = ow(r);
  return Gl.set(n, s), a.observe(n), () => {
    Gl.delete(n), a.unobserve(n);
  };
}
const lw = {
  some: 0,
  all: 1
};
class uw extends Ln {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: r = {} } = this.node.getProps(), { root: s, margin: a, amount: c = "some", once: d } = r, f = {
      root: s ? s.current : void 0,
      rootMargin: a,
      threshold: typeof c == "number" ? c : lw[c]
    }, h = (m) => {
      const { isIntersecting: y } = m;
      if (this.isInView === y || (this.isInView = y, d && !y && this.hasEnteredView))
        return;
      y && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", y);
      const { onViewportEnter: g, onViewportLeave: x } = this.node.getProps(), S = y ? g : x;
      S && S(m);
    };
    return aw(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: r, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(cw(r, s)) && this.startObserver();
  }
  unmount() {
  }
}
function cw({ viewport: n = {} }, { viewport: r = {} } = {}) {
  return (s) => n[s] !== r[s];
}
const fw = {
  inView: {
    Feature: uw
  },
  tap: {
    Feature: rw
  },
  focus: {
    Feature: nw
  },
  hover: {
    Feature: tw
  }
}, dw = {
  layout: {
    ProjectionNode: pm,
    MeasureLayout: Pm
  }
}, pw = {
  ...jx,
  ...fw,
  ...ew,
  ...dw
}, Mi = /* @__PURE__ */ _x(pw, Ix);
function hw({ state: n = "idle" }) {
  const r = Array.from({ length: 6 }).map((d, f) => ({
    id: f,
    size: 90 - f * 14,
    // Decreasing size, max radius around 90
    duration: 10 + f * 2,
    reverse: f % 2 === 0
  })), s = (d) => n === "idle" ? "#9CA3AF" : n === "active" && d % 2 === 0 ? "#06B6D4" : "#3B82F6", a = () => n === "idle" ? 3 : 4, c = (d, f, h) => {
    const m = Array.from({ length: 6 }).map((C, P) => {
      const M = Math.PI / 3 * P - Math.PI / 2;
      return {
        x: d + h * Math.cos(M),
        y: f + h * Math.sin(M)
      };
    }), y = (C) => m[(C + 6) % 6], g = (C, P, M) => ({
      x: C.x + (P.x - C.x) * M,
      y: C.y + (P.y - C.y) * M
    }), x = 0.15;
    let S = "";
    for (let C = 0; C < 6; C++) {
      const P = y(C), M = y(C + 1);
      if (C === 0) {
        const z = g(P, M, x);
        S += `M ${z.x},${z.y} `;
      }
      const L = g(P, M, 1 - x);
      S += `L ${L.x},${L.y} `;
      const D = g(M, y(C + 2), x);
      S += `Q ${M.x},${M.y} ${D.x},${D.y} `;
    }
    return S + "Z";
  };
  return /* @__PURE__ */ W.jsx("div", { className: "relative w-full h-full flex items-center justify-center bg-white rounded-full overflow-hidden", style: { background: "transparent", width: "100%", height: "100%" }, children: /* @__PURE__ */ W.jsx("svg", { viewBox: "0 0 200 200", className: "w-full h-full p-1", children: r.map((d) => /* @__PURE__ */ W.jsx(
    Mi.path,
    {
      d: c(100, 100, d.size),
      fill: "none",
      stroke: s(d.id),
      strokeWidth: a(),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      initial: { rotate: 0, scale: 1 },
      animate: {
        rotate: n === "thinking" || n === "idle" ? d.reverse ? 360 : -360 : 0,
        // Thinking: Sinusoidal wave effect on scale and strokeWidth
        scale: n === "thinking" ? [1, 1.15, 0.9, 1] : 1,
        strokeWidth: n === "thinking" ? [4, 6, 2, 4] : a(),
        // Thinking: Dynamic color cycle blue -> green
        stroke: n === "thinking" ? ["#3B82F6", "#2DD4BF", "#10B981", "#2DD4BF", "#3B82F6"] : s(d.id)
      },
      transition: {
        rotate: {
          duration: n === "idle" ? d.duration * 5 : d.duration,
          // Even slower for gray idle
          repeat: 1 / 0,
          ease: "linear"
        },
        scale: {
          duration: 2,
          repeat: 1 / 0,
          ease: "easeInOut",
          // (5 - hex.id) staggers from inner (5) to outer (0) like a drop ripple
          delay: (5 - d.id) * 0.15
        },
        strokeWidth: {
          duration: 2,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: (5 - d.id) * 0.15
        },
        stroke: {
          duration: 4,
          repeat: 1 / 0,
          ease: "easeInOut",
          delay: d.id * 0.2
        }
      },
      style: { originX: "50%", originY: "50%" }
    },
    `${d.id}-${n}`
  )) }) });
}
const mw = ({ onClick: n, isOpen: r, userName: s, state: a, isMaximized: c, config: d }) => {
  const [f, h] = N.useState(!1);
  return N.useEffect(() => {
    if (!r && a === "idle") {
      const m = setTimeout(() => {
        h(!0);
      }, 2e3);
      return () => clearTimeout(m);
    } else
      h(!1);
  }, [r, a]), /* @__PURE__ */ W.jsxs("div", { className: "agent-neo-font", children: [
    /* @__PURE__ */ W.jsx(Hl, { children: f && !r && !c && /* @__PURE__ */ W.jsx(
      Mi.div,
      {
        initial: { opacity: 0, x: 20, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        className: "greeting-bubble glass-morphism",
        children: d?.greeting || `Hello there, ${s || "there"}! I'm your assistant. How can I help you today?`
      }
    ) }),
    /* @__PURE__ */ W.jsx(
      Mi.div,
      {
        className: `floating-avatar glass-morphism ${c ? "maximized" : ""}`,
        onClick: n,
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: c ? "90px" : "70px",
          height: c ? "90px" : "70px",
          overflow: "hidden",
          background: d?.avatar?.type === "video" ? "black" : "transparent",
          // Black bg for video to blend better if mask fails
          ...d?.avatar?.styles
        },
        children: d?.avatar?.type === "video" && d.avatar.source ? /* @__PURE__ */ W.jsx(
          "video",
          {
            src: d.avatar.source,
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
        ) : d?.avatar?.type === "image" && d.avatar.source ? /* @__PURE__ */ W.jsx(
          "img",
          {
            src: d.avatar.source,
            alt: s || "Agent",
            style: { width: "100%", height: "100%", objectFit: "cover" }
          }
        ) : /* @__PURE__ */ W.jsx(hw, { state: a })
      }
    )
  ] });
};
const Am = (...n) => n.filter((r, s, a) => !!r && r.trim() !== "" && a.indexOf(r) === s).join(" ").trim();
const gw = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const yw = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, s, a) => a ? a.toUpperCase() : s.toLowerCase()
);
const jp = (n) => {
  const r = yw(n);
  return r.charAt(0).toUpperCase() + r.slice(1);
};
var vw = {
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
const xw = (n) => {
  for (const r in n)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
  return !1;
};
const ww = N.forwardRef(
  ({
    color: n = "currentColor",
    size: r = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: a,
    className: c = "",
    children: d,
    iconNode: f,
    ...h
  }, m) => N.createElement(
    "svg",
    {
      ref: m,
      ...vw,
      width: r,
      height: r,
      stroke: n,
      strokeWidth: a ? Number(s) * 24 / Number(r) : s,
      className: Am("lucide", c),
      ...!d && !xw(h) && { "aria-hidden": "true" },
      ...h
    },
    [
      ...f.map(([y, g]) => N.createElement(y, g)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
const fo = (n, r) => {
  const s = N.forwardRef(
    ({ className: a, ...c }, d) => N.createElement(ww, {
      ref: d,
      iconNode: r,
      className: Am(
        `lucide-${gw(jp(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return s.displayName = jp(n), s;
};
const Sw = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], kw = fo("maximize", Sw);
const Tw = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
], Cw = fo("minimize", Tw);
const Ew = [
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
], Pw = fo("palette", Ew);
const Aw = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Rw = fo("square", Aw), Xl = {}, Rm = (n, r) => {
  if (!r) return n;
  for (const s in r)
    r[s] instanceof Object && s in n && n[s] instanceof Object && !Array.isArray(n[s]) ? Rm(n[s], r[s]) : n[s] = r[s];
  return n;
}, Mw = async (n, r, s = {}) => {
  const a = r.endpoints?.find((m) => m.name === n);
  if (!a)
    throw new Error(`Endpoint ${n} not found in configuration.`);
  const c = Rm({ ...a.payloadTemplate }, s);
  if (a.handler) {
    console.log(`Executing local handler for ${n}`, c);
    try {
      let m = a.handler;
      if (typeof m == "string" && typeof window < "u") {
        const y = m.split(".");
        let g = window;
        for (const x of y)
          g = g?.[x];
        if (typeof g == "function")
          m = g;
        else
          throw new Error(`Handler string "${a.handler}" did not resolve to a function.`);
      }
      if (typeof m == "function")
        return await m(c);
      throw new Error(`Handler for ${n} is not a function.`);
    } catch (m) {
      throw new Error(`Local handler for ${n} failed: ${m.message}`);
    }
  }
  if (!a.url)
    return console.log(`Executing virtual endpoint for ${n}`, c), c;
  let d = a.url;
  for (const m in c)
    d = d.replace(`{{${m}}}`, c[m]), d = d.replace(`:${m}`, c[m]);
  const f = {
    method: a.method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: a.withCredentials ? "include" : void 0
  };
  a.method !== "GET" && a.method !== "DELETE" && (f.body = JSON.stringify(c));
  const h = await fetch(d, f);
  if (!h.ok)
    throw new Error(`API call to ${a.name} failed: ${h.statusText}`);
  return h.json();
}, Dw = (n, r, s, a, c) => {
  const d = (r.endpoints || []).map(
    (g) => `- Tool Name: "${g.name}"
  Description: ${g.description}
  Payload Template: ${JSON.stringify(g.payloadTemplate)}`
  ).join(`

`);
  let f = "";
  c && (f = `
DYNAMIC APPLICATION CONTEXT:
${c}
`), r.contextBindings && (f += `
Application Context Bindings:
` + r.contextBindings.map((g) => `${g.key}: ${JSON.stringify(g.data)}`).join(`
`)), s && (f += `

[CRITICAL] PREVIOUS TOOL EXECUTION RESULT:
${JSON.stringify(s, null, 2)}

        The action requested in the last turn HAS ALREADY BEEN COMPLETED. 
        Your task now is to SUMMARIZE the result for the user. 
        DO NOT call the same tool again in the "action" field unless the user explicitly asked for a secondary operation.`);
  const h = a.map((g) => `${g.sender.toUpperCase()}: ${g.text}`).join(`
`), m = r.agentName || "Neo Agent", y = r.systemRole || "a sophisticated AI assistant";
  return `You are ${m}, ${y}.
    
AVAILABLE TOOLS (API Endpoints):
${d}

CONTEXT DATA:
${f}

CONVERSATION HISTORY:
${h}

USER INPUT: "${n}"

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
}, Lw = (n) => {
  try {
    let r = n.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(r);
  } catch {
    return console.error("Failed to parse LLM JSON:", n), { message: n };
  }
}, _w = async (n, r) => {
  const s = r.apiKey || Xl?.VITE_GEMINI_API_KEY;
  if (!s && !r.baseUrl)
    throw new Error("Gemini API key is missing. Please provide it in the config or set VITE_GEMINI_API_KEY.");
  let a = r.baseUrl ? `${r.baseUrl}/${r.model || "gemini-1.5-flash"}:generateContent?key=${s}` : `https://generativelanguage.googleapis.com/v1beta/models/${r.model || "gemini-1.5-flash"}:generateContent?key=${s}`;
  const d = await fetch(a, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: n }] }]
    })
  });
  if (!d.ok) {
    const h = new Error(`Gemini API error: ${d.statusText}`);
    throw h.status = d.status, h;
  }
  return (await d.json()).candidates[0]?.content?.parts[0]?.text || "{}";
}, Iw = async (n, r) => {
  const s = r.baseUrl || "https://api.anthropic.com/v1/messages", a = r.apiKey || Xl?.VITE_CLAUDE_API_KEY;
  if (!a)
    throw new Error("Claude API key is missing. Please provide it in the config or set VITE_CLAUDE_API_KEY.");
  const c = await fetch(s, {
    method: "POST",
    headers: {
      "x-api-key": a,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: r.model || Xl?.VITE_CLAUDE_MODEL || "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: n }]
    })
  });
  if (!c.ok) {
    const f = new Error(`Claude API error: ${c.statusText}`);
    throw f.status = c.status, f;
  }
  return (await c.json()).content[0]?.text || "{}";
}, Vw = async (n, r) => {
  const s = r.baseUrl || "http://localhost:3000/ask", a = await fetch(s, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: n })
  });
  if (!a.ok)
    throw new Error(`ApiLlm error: ${a.statusText}`);
  const c = await a.json();
  if (!c.success)
    throw new Error(`ApiLlm returned failure: ${JSON.stringify(c)}`);
  return c.data?.answer || "{}";
}, Fp = async (n, r, s, a = [], c) => {
  (!r.llms || r.llms.length === 0) && (console.warn("No LLM providers configured. Defaulting to local api-llm."), r.llms = [{
    name: "Local API Agent",
    provider: "api-llm",
    apiKey: "",
    // Not needed for local
    baseUrl: "http://localhost:3000/ask"
  }]);
  const d = Dw(n, r, s, a, c);
  let f;
  for (const h of r.llms)
    try {
      let m = "";
      if (h.provider === "gemini")
        m = await _w(d, h);
      else if (h.provider === "claude")
        m = await Iw(d, h);
      else if (h.provider === "api-llm")
        m = await Vw(d, h);
      else
        continue;
      return Lw(m);
    } catch (m) {
      console.error(`Provider ${h.provider} failed:`, m), console.warn(`Provider ${h.provider} failed:`, m), f = m;
      continue;
    }
  throw new Error(`All LLM providers failed. Last error: ${f?.message || "Unknown"}`);
}, zp = (n, r) => {
  const s = n.length < r.length ? r : n, a = n.length < r.length ? n : r;
  if (s.length === 0) return 1;
  const c = (d, f) => {
    const h = [];
    for (let m = 0; m <= d.length; m++) {
      let y = m;
      for (let g = 0; g <= f.length; g++)
        if (m === 0) h[g] = g;
        else if (g > 0) {
          let x = h[g - 1];
          d.charAt(m - 1) !== f.charAt(g - 1) && (x = Math.min(Math.min(x, y), h[g]) + 1), h[g - 1] = y, y = x;
        }
      m > 0 && (h[f.length] = y);
    }
    return h[f.length];
  };
  return (s.length - c(s.toLowerCase(), a.toLowerCase())) / s.length;
}, Nw = ({ onClose: n, config: r, context: s, user: a, onStateChange: c, onAction: d, isMaximized: f, onToggleMaximize: h }) => {
  const m = N.useRef(!1), [y, g] = N.useState(() => r.initialStepId ? [] : [{
    id: "msg-initial",
    text: `Hey ${a?.name || "there"}! I'm ready to assist you.`,
    sender: "agent",
    timestamp: Date.now()
  }]), [x, S] = N.useState(""), [C, P] = N.useState(!1), [M, L] = N.useState(!1);
  N.useEffect(() => {
    c && c(C || M ? "thinking" : "active");
  }, [C, M, c]);
  const [D, z] = N.useState(), [_, K] = N.useState({}), [Q, ie] = N.useState(null), [de, Y] = N.useState(!0), [ce, Se] = N.useState(() => localStorage.getItem("neo-theme") || "dark"), [ze, be] = N.useState(!1), He = (U) => {
    Se(U), localStorage.setItem("neo-theme", U), be(!1);
  }, Ze = N.useRef(void 0), tt = N.useRef(null), Oe = N.useRef(null), ue = N.useRef(null), j = N.useRef(!1), Z = N.useRef(null), $ = N.useCallback((U, ke) => {
    if (!U) return U;
    let te = U;
    te = te.replace(/\{\{\s*userName\s*\}\}/g, a?.name || "there"), te = te.replace(/\{\{\s*agentName\s*\}\}/g, r.agentName || "Neo");
    for (const ge in ke)
      te = te.replace(new RegExp(`\\{\\{\\s*${ge}\\s*\\}\\}`, "g"), ke[ge]);
    const ee = tt.current;
    return ee && (Array.isArray(ee) ? (te = te.replace(/\{\{\s*result\.length\s*\}\}/g, ee.length.toString()), te = te.replace(/\{\{\s*result\[(\d+)\]\.(\w+)\s*\}\}/g, (ge, fe, se) => ee[parseInt(fe)] && ee[parseInt(fe)][se] || "")) : te = te.replace(/\{\{\s*result\.(\w+)\s*\}\}/g, (ge, fe) => ee[fe] || "")), te;
  }, [a]), T = N.useCallback((U, ke) => {
    g((te) => [
      ...te,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: U,
        sender: ke,
        timestamp: Date.now()
      }
    ]);
  }, []), I = (U, ke, te) => {
    const ee = ke.split(".");
    let ge = U;
    for (let fe = 0; fe < ee.length - 1; fe++)
      ge[ee[fe]] || (ge[ee[fe]] = {}), ge = ge[ee[fe]];
    ge[ee[ee.length - 1]] = te;
  }, le = N.useCallback(async (U, ke, te, ee, ge, fe = []) => {
    if (j.current)
      return console.warn("Execution stopped by user."), null;
    if (fe.includes(U)) {
      console.warn(`Tool recursion detected for ${U}. Skipping.`);
      return;
    }
    const se = [...fe, U];
    P(!0);
    try {
      let xe = ee ? JSON.parse(JSON.stringify(ee)) : {};
      const Ee = (Be) => {
        if (typeof Be == "string") return $(Be, _);
        if (typeof Be == "object" && Be !== null)
          for (const Vt in Be)
            Be[Vt] = Ee(Be[Vt]);
        return Be;
      };
      xe = Ee(xe), te && ke !== void 0 ? I(xe, te, ke) : ke !== void 0 && !te && (xe = { ...xe, type: ke });
      const _e = await Mw(U, r, xe);
      if (ie(_e), tt.current = _e, d && d(U, _e || xe), ge) {
        const Be = s ? `${s}
Result Context: ${JSON.stringify(_e).substring(0, 1e3)}...` : void 0, Vt = await Fp(ge, r, _e, y, Be);
        if (T(Vt.message, "agent"), Vt.action && await le(Vt.action.name, void 0, void 0, Vt.action.payload, ge, se), U === "generateReportPdf" && (z({
          id: "activity_log_suggestion",
          message: "",
          options: [
            { label: "Show activity log", actionType: "link", externalLink: "/settings/activity-log" }
          ]
        }), Y(!0)), U === "createReport") {
          const Dr = _e?.id || _e?.reportId;
          z({
            id: "post_create_suggestion",
            message: "",
            options: [
              { label: "Open Report", triggerAction: "openReport", actionType: "api", value: Dr, payloadKey: "id" },
              { label: "Manage Access/Permissions", triggerAction: "manageAccess", actionType: "api", value: Dr, payloadKey: "id" }
            ]
          }), Y(!0);
        }
      } else
        T("✅ Action completed successfully!", "agent");
      return _e;
    } catch (xe) {
      return T(`❌ Action failed: ${xe.message}`, "agent"), null;
    } finally {
      P(!1);
    }
  }, [r, y, _, T, $, d, s]), oe = N.useCallback((U, ke = {}) => {
    U === "stop_flow" ? (j.current = !0, L(!1)) : (U === "win_start" || U === "assist_start") && (j.current = !1);
    const te = { ..._, ...ke };
    K(te);
    const ee = r.workflow?.find((ge) => ge.id === U);
    if (ee) {
      if (ee.skipIf)
        try {
          if (!!te[ee.skipIf.replace("workflowState.", "")]) {
            console.log(`Skipping step ${U} because ${ee.skipIf} is present.`);
            const xe = ee.options?.[0]?.nextStepId;
            if (xe) {
              oe(xe, te);
              return;
            }
          }
        } catch (se) {
          console.warn("Skip evaluation failed:", se);
        }
      const ge = JSON.parse(JSON.stringify(ee)), fe = tt.current;
      if (ge.useResultsAsOptions && Array.isArray(fe)) {
        const se = ge.dynamicOptionsConfig;
        if (se) {
          const xe = fe.map((Ee) => ({
            label: Ee[se.labelKey],
            value: Ee[se.valueKey],
            nextStepId: se.nextStepId,
            triggerAction: se.triggerAction,
            actionType: se.actionType,
            payloadKey: se.payloadKey,
            fixedPayload: se.fixedPayload
          }));
          ge.options = [...ge.options || [], ...xe];
        }
      }
      ge.options && (ge.options = ge.options.map((se) => ({
        ...se,
        label: $(se.label, te),
        value: typeof se.value == "string" ? $(se.value, te) : se.value,
        externalLink: se.externalLink ? $(se.externalLink, te) : void 0
      }))), z(ge), Ze.current = ge, Y(!0), T($(ee.message, te), "agent");
    }
  }, [r.workflow, _, T, $]);
  N.useEffect(() => {
    r.initialStepId && !m.current && (m.current = !0, oe(r.initialStepId));
  }, [r.initialStepId, oe]), N.useEffect(() => {
    if (D) {
      if (Oe.current !== D.id && (Oe.current = null), D.triggerAction && !D.inputTarget && D.actionType === "api") {
        if (Oe.current === D.id)
          return;
        Oe.current = D.id, (async () => {
          if (j.current || (D.delay && await new Promise((te) => setTimeout(te, D.delay)), j.current)) return;
          const ke = await le(D.triggerAction, void 0, D.payloadKey, D.fixedPayload);
          if (j.current) {
            console.log("Stop signal detected after execution. Aborting auto-advance.");
            return;
          }
          ke && ke.nextStepId ? me(ke.nextStepId, 500) : D.nextStepId && me(D.nextStepId, 500);
        })();
      } else if (!D.triggerAction && !D.inputTarget && D.nextStepId && (!D.options || D.options.length === 0)) {
        if (Oe.current === D.id)
          return;
        Oe.current = D.id;
        const U = D.delay || 1e3;
        if (j.current) return;
        me(D.nextStepId, U);
      }
    }
  }, [D, le, oe]), N.useEffect(() => {
    Z.current && (Z.current.scrollTop = Z.current.scrollHeight);
  }, [y, C, de, f]);
  const pe = () => {
    ue.current && (clearTimeout(ue.current), ue.current = null), L(!1);
  }, me = (U, ke = 500, te = {}) => {
    if (j.current) {
      console.log("Attempted to schedule auto-advance while stopped. Ignoring.");
      return;
    }
    pe(), L(!0), ue.current = setTimeout(() => {
      j.current || oe(U, te);
    }, ke);
  }, Ce = async () => {
    console.log("Stopping auto-play..."), j.current = !0, pe(), L(!1), P(!1), await Ye("stop");
  }, ye = async (U, ke = !1) => {
    if (pe(), j.current = !1, (Ze.current || D)?.inputTarget) {
      const ee = U.value !== void 0 ? U.value : U.label;
      await Ye(ee);
      return;
    }
    if (ke || T(U.label, "user"), Y(!1), U.triggerAction && U.actionType === "api" ? await le(U.triggerAction, U.value, U.payloadKey, U.fixedPayload) : U.actionType === "whatsapp" ? (window.open(`https://wa.me/${U.externalLink || "573025688681"}`, "_blank"), T("Opening WhatsApp to connect you with our help desk... 🚀", "agent")) : U.actionType === "link" && U.externalLink && window.open(U.externalLink, "_blank"), U.nextStepId) {
      const ee = {};
      if (U.payloadKey && U.value !== void 0 && (ee[U.payloadKey] = typeof U.value == "string" ? $(U.value, _) : U.value), U.stateUpdate)
        for (const ge in U.stateUpdate) {
          const fe = U.stateUpdate[ge];
          ee[ge] = typeof fe == "string" ? $(fe, _) : fe;
        }
      me(U.nextStepId, 400, ee);
    }
  }, Pe = () => {
    if (pe(), r.frequentAction) {
      ye(r.frequentAction);
      return;
    }
    const U = r.actionLabel || "Create Report";
    S(U), Ye(U);
  }, Ye = async (U) => {
    pe();
    const ke = U || x;
    if (!ke.trim()) return;
    const te = ke.trim();
    T(te, "user"), U || S(""), P(!0);
    try {
      const ee = Ze.current || D;
      if (console.log("Checking input capture:", {
        currentStepId: ee?.id,
        inputTarget: ee?.inputTarget,
        userInput: te
      }), ee && ee.inputTarget) {
        const fe = { ..._, [ee.inputTarget]: te };
        if (K(fe), console.log("Input saved, checking actions...", ee.triggerAction), ee.triggerAction && ee.actionType === "api") {
          const se = te;
          await le(
            ee.triggerAction,
            se,
            ee.payloadKey,
            ee.fixedPayload,
            void 0
            // No LLM feedback loop for deterministic steps typically
          );
        }
        P(!1), ee.nextStepId && oe(ee.nextStepId, { [ee.inputTarget]: te });
        return;
      }
      const ge = te.toLowerCase();
      if (ee?.options) {
        for (const fe of ee.options)
          if (zp(ge, fe.label.toLowerCase()) >= 0.95) {
            P(!1), ye(fe, !0);
            return;
          }
      }
      if (r.intents) {
        let fe = { intent: null, score: 0 };
        for (const se of r.intents) {
          if (se.extractors && se.extractors.length > 0 && se.extractors.every((Ee) => new RegExp(Ee.regex, "i").test(te))) {
            fe = { intent: se, score: 1.1 };
            break;
          }
          for (const xe of se.keywords) {
            const Ee = zp(ge, xe.toLowerCase());
            Ee >= 0.95 && Ee > fe.score && (fe = { intent: se, score: Ee });
          }
        }
        if (fe.intent) {
          const se = fe.intent;
          let xe = {};
          se.extractors && se.extractors.forEach((Ee) => {
            const _e = te.match(new RegExp(Ee.regex, "i"));
            _e && _e[1] && (xe[Ee.key] = _e[1].trim());
          }), P(!1), oe(se.nextStepId, xe);
          return;
        }
      }
      if (r.llms && r.llms.length > 0) {
        const fe = s ? `${s}
${Object.entries(_).map(([xe, Ee]) => `${xe}: ${Ee}`).join(`
`)}` : void 0, se = await Fp(te, r, Q, y, fe);
        P(!1), T(se.message, "agent"), se.action && le(se.action.name, void 0, void 0, se.action.payload, te, []);
        return;
      }
      if (r.intents) {
        let fe = { intent: null, score: 0 };
        const se = te.toLowerCase();
        for (const xe of r.intents) {
          let Ee = 0;
          for (const _e of xe.keywords)
            se.includes(_e.toLowerCase()) && Ee++;
          Ee > fe.score && (fe = { intent: xe, score: Ee });
        }
        if (fe.score > 0 && fe.intent) {
          const xe = fe.intent;
          let Ee = {};
          xe.extractors && xe.extractors.forEach((_e) => {
            const Be = te.match(new RegExp(_e.regex, "i"));
            Be && Be[1] && (Ee[_e.key] = Be[1].trim());
          }), P(!1), oe(xe.nextStepId, Ee);
          return;
        }
      }
      P(!1), r.fallbackStepId ? oe(r.fallbackStepId) : T("I'm sorry, I couldn't find a specific action for that. Can you try rephrasing?", "agent");
    } catch (ee) {
      console.error(ee), P(!1), T("I encountered an error while processing your request. Please try again later.", "agent");
    }
  };
  return /* @__PURE__ */ W.jsxs("div", { className: `chat-container glass-morphism-dark agent-neo-font ${f ? "maximized" : ""}`, "data-theme": ce, children: [
    /* @__PURE__ */ W.jsxs("div", { className: "chat-header", children: [
      /* @__PURE__ */ W.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ W.jsx("div", { className: "status-indicator" }),
        /* @__PURE__ */ W.jsx("span", { className: "header-title", children: r.agentName || "Neo Agent" })
      ] }),
      /* @__PURE__ */ W.jsxs("div", { className: "header-controls", children: [
        (M || C) && r.showStopButton && /* @__PURE__ */ W.jsx(
          "button",
          {
            onClick: Ce,
            className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors",
            title: "Stop Auto-Play / Cancel",
            children: /* @__PURE__ */ W.jsx(Rw, { size: 18, fill: "currentColor" })
          }
        ),
        h && /* @__PURE__ */ W.jsx(
          "button",
          {
            onClick: h,
            className: "close-btn",
            title: f ? "Restore" : "Maximize",
            style: { marginRight: "4px" },
            children: f ? /* @__PURE__ */ W.jsx(Cw, { size: 18 }) : /* @__PURE__ */ W.jsx(kw, { size: 18 })
          }
        ),
        /* @__PURE__ */ W.jsxs("div", { className: "theme-selector-container", children: [
          /* @__PURE__ */ W.jsx(
            "button",
            {
              onClick: () => be(!ze),
              className: "close-btn",
              title: "Change Theme",
              children: /* @__PURE__ */ W.jsx(Pw, { size: 18 })
            }
          ),
          /* @__PURE__ */ W.jsx(Hl, { children: ze && /* @__PURE__ */ W.jsxs(
            Mi.div,
            {
              initial: { opacity: 0, y: -5, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: -5, scale: 0.95 },
              className: "theme-dropdown",
              children: [
                /* @__PURE__ */ W.jsx("span", { className: "theme-label", children: "Theme" }),
                [
                  { id: "dark", label: "Dark Moon", color: "#1f2937" },
                  { id: "light", label: "Light Day", color: "#ffffff" },
                  { id: "glass", label: "Pure Glass", color: "#e5e7eb" }
                ].map((U) => /* @__PURE__ */ W.jsxs(
                  "button",
                  {
                    onClick: () => He(U.id),
                    className: "theme-option",
                    children: [
                      /* @__PURE__ */ W.jsx(
                        "div",
                        {
                          className: "theme-color-indicator",
                          style: { background: U.color }
                        }
                      ),
                      /* @__PURE__ */ W.jsx("span", { children: U.label })
                    ]
                  },
                  U.id
                ))
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ W.jsx("button", { onClick: n, className: "close-btn", children: /* @__PURE__ */ W.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ W.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ W.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ W.jsxs("div", { ref: Z, className: "messages-container", children: [
      y.map((U) => /* @__PURE__ */ W.jsx(
        "div",
        {
          className: `message ${U.sender === "user" ? "user-message" : "agent-message"}`,
          children: U.text
        },
        U.id
      )),
      C && /* @__PURE__ */ W.jsxs("div", { className: "typing-indicator", children: [
        /* @__PURE__ */ W.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-spin", children: [
          /* @__PURE__ */ W.jsx("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
          /* @__PURE__ */ W.jsx("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
          /* @__PURE__ */ W.jsx("line", { x1: "4.93", y1: "4.93", x2: "7.76", y2: "7.76" }),
          /* @__PURE__ */ W.jsx("line", { x1: "16.24", y1: "16.24", x2: "19.07", y2: "19.07" }),
          /* @__PURE__ */ W.jsx("line", { x1: "2", y1: "12", x2: "6", y2: "12" }),
          /* @__PURE__ */ W.jsx("line", { x1: "18", y1: "12", x2: "22", y2: "12" }),
          /* @__PURE__ */ W.jsx("line", { x1: "4.93", y1: "19.07", x2: "7.76", y2: "16.24" }),
          /* @__PURE__ */ W.jsx("line", { x1: "16.24", y1: "7.76", x2: "19.07", y2: "4.93" })
        ] }),
        /* @__PURE__ */ W.jsxs("span", { children: [
          r.agentName || "Neo ",
          " is thinking..."
        ] })
      ] }),
      /* @__PURE__ */ W.jsx(Hl, { children: D?.options && de && !C && /* @__PURE__ */ W.jsx(
        Mi.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          className: "options-container",
          children: D.options.map((U, ke) => /* @__PURE__ */ W.jsx(
            "button",
            {
              className: "option-pill",
              onClick: () => ye(U),
              children: U.label
            },
            ke
          ))
        }
      ) }),
      r.showFrequentActions && /* @__PURE__ */ W.jsxs("div", { className: "actions-suggestion", children: [
        /* @__PURE__ */ W.jsx("span", { className: "actions-label", children: "Frequent Actions" }),
        /* @__PURE__ */ W.jsxs("button", { className: "action-button", onClick: Pe, children: [
          /* @__PURE__ */ W.jsx("span", { style: { marginRight: "8px" }, children: "⚡" }),
          r.frequentAction?.label || r.actionLabel || "Create Report"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ W.jsxs("div", { className: "input-area", children: [
      /* @__PURE__ */ W.jsx(
        "input",
        {
          type: "text",
          value: x,
          onChange: (U) => S(U.target.value),
          onKeyPress: (U) => U.key === "Enter" && Ye(),
          placeholder: "Type a message...",
          className: "chat-input"
        }
      ),
      /* @__PURE__ */ W.jsx(
        "button",
        {
          onClick: () => Ye(),
          className: "send-btn",
          disabled: C,
          children: /* @__PURE__ */ W.jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ W.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
            /* @__PURE__ */ W.jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
          ] })
        }
      )
    ] })
  ] });
}, Ow = '@import"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap";:root{--agent-primary: #6366f1;--agent-primary-hover: #4f46e5;--agent-bg: rgba(17, 24, 39, .8);--agent-text: #ffffff;--agent-text-secondary: #9ca3af;--agent-border: rgba(255, 255, 255, .1);--agent-shadow: 0 8px 32px 0 rgba(31, 38, 135, .37);--agent-msg-bg: rgba(255, 255, 255, .05);--agent-input-bg: rgba(255, 255, 255, .05);--agent-pill-bg: rgba(99, 102, 241, .1);--agent-pill-text: #818cf8;--agent-pill-border: rgba(99, 102, 241, .3)}[data-theme=light]{--agent-primary: #4f46e5;--agent-primary-hover: #4338ca;--agent-bg: rgba(255, 255, 255, .85);--agent-text: #1f2937;--agent-text-secondary: #6b7280;--agent-border: rgba(0, 0, 0, .1);--agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, .1);--agent-msg-bg: rgba(0, 0, 0, .05);--agent-input-bg: rgba(0, 0, 0, .05);--agent-pill-bg: rgba(79, 70, 229, .1);--agent-pill-text: #4f46e5;--agent-pill-border: rgba(79, 70, 229, .2)}[data-theme=glass]{--agent-primary: #2563eb;--agent-primary-hover: #1d4ed8;--agent-bg: rgba(255, 255, 255, .3);--agent-text: #111827;--agent-text-secondary: #4b5563;--agent-border: rgba(255, 255, 255, .3);--agent-shadow: 0 8px 32px 0 rgba(0, 0, 0, .1);--agent-msg-bg: rgba(255, 255, 255, .4);--agent-input-bg: rgba(255, 255, 255, .4);--agent-pill-bg: rgba(37, 99, 235, .1);--agent-pill-text: #2563eb;--agent-pill-border: rgba(37, 99, 235, .2)}.agent-neo-font{font-family:Outfit,sans-serif}.glass-morphism-dark{background:var(--agent-bg);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border:1px solid var(--agent-border);box-shadow:var(--agent-shadow);border-radius:16px;color:var(--agent-text)}.send-btn{background-color:var(--agent-primary);border:none;border-radius:12px;width:40px;height:40px;flex:0 0 40px;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;color:#fff;cursor:pointer;transition:background-color .2s}.chat-container{position:fixed;bottom:100px;right:24px;width:380px;height:500px;display:flex;flex-direction:column;z-index:9998;overflow:hidden;transition:all .3s ease}.chat-container.maximized{width:600px;max-width:90vw;height:80vh;top:110px;bottom:auto;right:24px}.chat-header{padding:16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--agent-border)}.header-info{display:flex;align-items:center;gap:8px}.status-indicator{width:8px;height:8px;border-radius:50%;background:#10b981}.header-title{color:var(--agent-text);font-weight:600}.close-btn{background:none;border:none;color:var(--agent-text-secondary);cursor:pointer;transition:color .2s;padding:4px;border-radius:50%;display:flex;align-items:center;justify-content:center}.close-btn:hover{color:var(--agent-text);background:#ffffff1a}.header-controls{display:flex!important;flex-direction:row!important;align-items:center!important;gap:8px!important}.theme-selector-container{position:relative}.theme-dropdown{position:absolute;top:100%;right:0;margin-top:8px;min-width:150px;display:flex;flex-direction:column;gap:4px;padding:8px;border-radius:12px;background:var(--agent-bg);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--agent-border);box-shadow:0 10px 25px #0003;z-index:10000;transform-origin:top right}.theme-label{font-size:10px;text-transform:uppercase;letter-spacing:.05em;opacity:.6;margin-bottom:4px;padding-left:8px;color:var(--agent-text)}.theme-option{display:flex;align-items:center;gap:12px;padding:8px 12px;width:100%;border:none;background:none;color:var(--agent-text);font-size:13px;font-weight:500;cursor:pointer;border-radius:8px;text-align:left;transition:background .2s}.theme-option:hover{background:#7d7d7d26}.theme-color-indicator{width:16px;height:16px;border-radius:50%;border:1px solid rgba(0,0,0,.1);flex-shrink:0}.messages-container{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}.message{max-width:80%;padding:10px 14px;border-radius:12px;color:var(--agent-text);font-size:14px;box-shadow:0 2px 4px #0000000d;white-space:pre-wrap}.user-message{align-self:flex-end;background-color:var(--agent-primary);color:#fff}.agent-message{align-self:flex-start;background-color:var(--agent-msg-bg)}.typing-indicator{align-self:flex-start;color:var(--agent-text-secondary);font-size:12px;display:flex;align-items:center;gap:8px}.options-container{display:flex;flex-wrap:wrap;gap:8px;padding:4px 0}.option-pill{background:var(--agent-pill-bg);border:1px solid var(--agent-pill-border);color:var(--agent-pill-text);padding:6px 14px;border-radius:20px;font-size:13px;cursor:pointer;transition:all .2s ease}.option-pill:hover{filter:brightness(1.1);transform:translateY(-1px)}.input-area{padding:16px;display:flex;gap:8px}.chat-input{flex:1;background-color:var(--agent-input-bg);border:1px solid var(--agent-border);border-radius:12px;padding:10px 16px;color:var(--agent-text);outline:none;transition:border-color .2s}.chat-input:focus{border-color:var(--agent-primary)}.send-btn:hover{background-color:var(--agent-primary-hover)}.send-btn:disabled{opacity:.5;cursor:not-allowed}.floating-avatar{position:fixed;bottom:24px;right:24px;width:64px;height:64px;cursor:pointer;z-index:9999;transition:all .3s ease}.floating-avatar.maximized{bottom:auto;top:24px;right:24px}.floating-avatar:hover{transform:scale(1.1)}.glass-morphism{background:#ffffffb3;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 32px #1f26875e;border-radius:16px}.greeting-bubble{position:fixed!important;bottom:100px!important;right:24px!important;max-width:250px;padding:12px 16px;border-radius:12px 12px 4px;color:#1f2937;font-size:14px;z-index:9998;pointer-events:none}.actions-suggestion{margin-top:16px;padding:0 4px}.actions-label{display:block;font-size:12px;color:var(--agent-text-secondary);font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em}.action-button{width:100%;background:linear-gradient(90deg,var(--agent-primary) 0%,#a855f7 100%);border:none;border-radius:12px;padding:12px;color:#fff;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s,transform .2s;font-size:15px}.action-button:hover{opacity:.9;transform:translateY(-1px)}', Bp = {
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
}, jw = ({ config: n, preset: r, context: s, user: a, onAction: c }) => {
  const [d, f] = N.useState(!1), h = Js.useRef(null), m = Js.useMemo(() => {
    if (r && Bp[r]) {
      const M = Bp[r];
      return {
        ...M,
        ...n,
        // Merge arrays instead of overwriting
        endpoints: [...M.endpoints || [], ...n.endpoints || []],
        intents: [...M.intents || [], ...n.intents || []]
        // Workflows are usually custom, so keep overwrite behavior or merge?
        // Let's overwrite workflow for now as it's complex to merge graph steps
      };
    }
    return n;
  }, [n, r]), [y, g] = N.useState("idle"), [x, S] = N.useState(!1);
  N.useEffect(() => {
    d ? g((M) => M === "thinking" ? "thinking" : "active") : y !== "thinking" && g("idle");
  }, [d]);
  const C = (M, L) => {
    if (c && c(M, L), h.current) {
      const D = new CustomEvent("onAction", {
        detail: { name: M, data: L },
        bubbles: !0,
        composed: !0
        // Required to cross Shadow DOM/Web Component boundary
      });
      h.current.dispatchEvent(D);
    }
  }, P = m.keepAlive || d;
  return /* @__PURE__ */ W.jsxs("div", { ref: h, className: "agent-neo-root", children: [
    /* @__PURE__ */ W.jsx("style", { children: Ow }),
    /* @__PURE__ */ W.jsx(
      mw,
      {
        onClick: () => f(!d),
        isOpen: d,
        userName: a?.name,
        state: y,
        isMaximized: x,
        config: m
      }
    ),
    P && /* @__PURE__ */ W.jsx("div", { style: { display: d ? "block" : "none" }, children: /* @__PURE__ */ W.jsx(
      Nw,
      {
        onClose: () => f(!1),
        config: m,
        context: s,
        user: a,
        onStateChange: g,
        onAction: C,
        isMaximized: x,
        onToggleMaximize: () => S(!x)
      }
    ) })
  ] });
};
var Hs = {}, Sl = { exports: {} }, xt = {}, kl = { exports: {} }, Tl = {};
var Up;
function Fw() {
  return Up || (Up = 1, (function(n) {
    function r(j, Z) {
      var $ = j.length;
      j.push(Z);
      e: for (; 0 < $; ) {
        var T = $ - 1 >>> 1, I = j[T];
        if (0 < c(I, Z)) j[T] = Z, j[$] = I, $ = T;
        else break e;
      }
    }
    function s(j) {
      return j.length === 0 ? null : j[0];
    }
    function a(j) {
      if (j.length === 0) return null;
      var Z = j[0], $ = j.pop();
      if ($ !== Z) {
        j[0] = $;
        e: for (var T = 0, I = j.length, le = I >>> 1; T < le; ) {
          var oe = 2 * (T + 1) - 1, pe = j[oe], me = oe + 1, Ce = j[me];
          if (0 > c(pe, $)) me < I && 0 > c(Ce, pe) ? (j[T] = Ce, j[me] = $, T = me) : (j[T] = pe, j[oe] = $, T = oe);
          else if (me < I && 0 > c(Ce, $)) j[T] = Ce, j[me] = $, T = me;
          else break e;
        }
      }
      return Z;
    }
    function c(j, Z) {
      var $ = j.sortIndex - Z.sortIndex;
      return $ !== 0 ? $ : j.id - Z.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      n.unstable_now = function() {
        return d.now();
      };
    } else {
      var f = Date, h = f.now();
      n.unstable_now = function() {
        return f.now() - h;
      };
    }
    var m = [], y = [], g = 1, x = null, S = 3, C = !1, P = !1, M = !1, L = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function _(j) {
      for (var Z = s(y); Z !== null; ) {
        if (Z.callback === null) a(y);
        else if (Z.startTime <= j) a(y), Z.sortIndex = Z.expirationTime, r(m, Z);
        else break;
        Z = s(y);
      }
    }
    function K(j) {
      if (M = !1, _(j), !P) if (s(m) !== null) P = !0, Oe(Q);
      else {
        var Z = s(y);
        Z !== null && ue(K, Z.startTime - j);
      }
    }
    function Q(j, Z) {
      P = !1, M && (M = !1, D(Y), Y = -1), C = !0;
      var $ = S;
      try {
        for (_(Z), x = s(m); x !== null && (!(x.expirationTime > Z) || j && !ze()); ) {
          var T = x.callback;
          if (typeof T == "function") {
            x.callback = null, S = x.priorityLevel;
            var I = T(x.expirationTime <= Z);
            Z = n.unstable_now(), typeof I == "function" ? x.callback = I : x === s(m) && a(m), _(Z);
          } else a(m);
          x = s(m);
        }
        if (x !== null) var le = !0;
        else {
          var oe = s(y);
          oe !== null && ue(K, oe.startTime - Z), le = !1;
        }
        return le;
      } finally {
        x = null, S = $, C = !1;
      }
    }
    var ie = !1, de = null, Y = -1, ce = 5, Se = -1;
    function ze() {
      return !(n.unstable_now() - Se < ce);
    }
    function be() {
      if (de !== null) {
        var j = n.unstable_now();
        Se = j;
        var Z = !0;
        try {
          Z = de(!0, j);
        } finally {
          Z ? He() : (ie = !1, de = null);
        }
      } else ie = !1;
    }
    var He;
    if (typeof z == "function") He = function() {
      z(be);
    };
    else if (typeof MessageChannel < "u") {
      var Ze = new MessageChannel(), tt = Ze.port2;
      Ze.port1.onmessage = be, He = function() {
        tt.postMessage(null);
      };
    } else He = function() {
      L(be, 0);
    };
    function Oe(j) {
      de = j, ie || (ie = !0, He());
    }
    function ue(j, Z) {
      Y = L(function() {
        j(n.unstable_now());
      }, Z);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, n.unstable_continueExecution = function() {
      P || C || (P = !0, Oe(Q));
    }, n.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ce = 0 < j ? Math.floor(1e3 / j) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_getFirstCallbackNode = function() {
      return s(m);
    }, n.unstable_next = function(j) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = S;
      }
      var $ = S;
      S = Z;
      try {
        return j();
      } finally {
        S = $;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(j, Z) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var $ = S;
      S = j;
      try {
        return Z();
      } finally {
        S = $;
      }
    }, n.unstable_scheduleCallback = function(j, Z, $) {
      var T = n.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? T + $ : T) : $ = T, j) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return I = $ + I, j = { id: g++, callback: Z, priorityLevel: j, startTime: $, expirationTime: I, sortIndex: -1 }, $ > T ? (j.sortIndex = $, r(y, j), s(m) === null && j === s(y) && (M ? (D(Y), Y = -1) : M = !0, ue(K, $ - T))) : (j.sortIndex = I, r(m, j), P || C || (P = !0, Oe(Q))), j;
    }, n.unstable_shouldYield = ze, n.unstable_wrapCallback = function(j) {
      var Z = S;
      return function() {
        var $ = S;
        S = Z;
        try {
          return j.apply(this, arguments);
        } finally {
          S = $;
        }
      };
    };
  })(Tl)), Tl;
}
var $p;
function zw() {
  return $p || ($p = 1, kl.exports = Fw()), kl.exports;
}
var Wp;
function Bw() {
  if (Wp) return xt;
  Wp = 1;
  var n = Ql(), r = zw();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, i = 1; i < arguments.length; i++) t += "&args[]=" + encodeURIComponent(arguments[i]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var a = /* @__PURE__ */ new Set(), c = {};
  function d(e, t) {
    f(e, t), f(e + "Capture", t);
  }
  function f(e, t) {
    for (c[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
  }
  var h = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), m = Object.prototype.hasOwnProperty, y = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, g = {}, x = {};
  function S(e) {
    return m.call(x, e) ? !0 : m.call(g, e) ? !1 : y.test(e) ? x[e] = !0 : (g[e] = !0, !1);
  }
  function C(e, t, i, o) {
    if (i !== null && i.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : i !== null ? !i.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function P(e, t, i, o) {
    if (t === null || typeof t > "u" || C(e, t, i, o)) return !0;
    if (o) return !1;
    if (i !== null) switch (i.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function M(e, t, i, o, l, u, p) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = l, this.mustUseProperty = i, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = p;
  }
  var L = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    L[e] = new M(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    L[t] = new M(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    L[e] = new M(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    L[e] = new M(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    L[e] = new M(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    L[e] = new M(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    L[e] = new M(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    L[e] = new M(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    L[e] = new M(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var D = /[\-:]([a-z])/g;
  function z(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      D,
      z
    );
    L[t] = new M(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(D, z);
    L[t] = new M(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(D, z);
    L[t] = new M(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    L[e] = new M(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), L.xlinkHref = new M("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    L[e] = new M(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function _(e, t, i, o) {
    var l = L.hasOwnProperty(t) ? L[t] : null;
    (l !== null ? l.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (P(t, i, l, o) && (i = null), o || l === null ? S(t) && (i === null ? e.removeAttribute(t) : e.setAttribute(t, "" + i)) : l.mustUseProperty ? e[l.propertyName] = i === null ? l.type === 3 ? !1 : "" : i : (t = l.attributeName, o = l.attributeNamespace, i === null ? e.removeAttribute(t) : (l = l.type, i = l === 3 || l === 4 && i === !0 ? "" : "" + i, o ? e.setAttributeNS(o, t, i) : e.setAttribute(t, i))));
  }
  var K = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Q = /* @__PURE__ */ Symbol.for("react.element"), ie = /* @__PURE__ */ Symbol.for("react.portal"), de = /* @__PURE__ */ Symbol.for("react.fragment"), Y = /* @__PURE__ */ Symbol.for("react.strict_mode"), ce = /* @__PURE__ */ Symbol.for("react.profiler"), Se = /* @__PURE__ */ Symbol.for("react.provider"), ze = /* @__PURE__ */ Symbol.for("react.context"), be = /* @__PURE__ */ Symbol.for("react.forward_ref"), He = /* @__PURE__ */ Symbol.for("react.suspense"), Ze = /* @__PURE__ */ Symbol.for("react.suspense_list"), tt = /* @__PURE__ */ Symbol.for("react.memo"), Oe = /* @__PURE__ */ Symbol.for("react.lazy"), ue = /* @__PURE__ */ Symbol.for("react.offscreen"), j = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var $ = Object.assign, T;
  function I(e) {
    if (T === void 0) try {
      throw Error();
    } catch (i) {
      var t = i.stack.trim().match(/\n( *(at )?)/);
      T = t && t[1] || "";
    }
    return `
` + T + e;
  }
  var le = !1;
  function oe(e, t) {
    if (!e || le) return "";
    le = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (R) {
          var o = R;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (R) {
          o = R;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (R) {
          o = R;
        }
        e();
      }
    } catch (R) {
      if (R && o && typeof R.stack == "string") {
        for (var l = R.stack.split(`
`), u = o.stack.split(`
`), p = l.length - 1, v = u.length - 1; 1 <= p && 0 <= v && l[p] !== u[v]; ) v--;
        for (; 1 <= p && 0 <= v; p--, v--) if (l[p] !== u[v]) {
          if (p !== 1 || v !== 1)
            do
              if (p--, v--, 0 > v || l[p] !== u[v]) {
                var w = `
` + l[p].replace(" at new ", " at ");
                return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
              }
            while (1 <= p && 0 <= v);
          break;
        }
      }
    } finally {
      le = !1, Error.prepareStackTrace = i;
    }
    return (e = e ? e.displayName || e.name : "") ? I(e) : "";
  }
  function pe(e) {
    switch (e.tag) {
      case 5:
        return I(e.type);
      case 16:
        return I("Lazy");
      case 13:
        return I("Suspense");
      case 19:
        return I("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = oe(e.type, !1), e;
      case 11:
        return e = oe(e.type.render, !1), e;
      case 1:
        return e = oe(e.type, !0), e;
      default:
        return "";
    }
  }
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case de:
        return "Fragment";
      case ie:
        return "Portal";
      case ce:
        return "Profiler";
      case Y:
        return "StrictMode";
      case He:
        return "Suspense";
      case Ze:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case ze:
        return (e.displayName || "Context") + ".Consumer";
      case Se:
        return (e._context.displayName || "Context") + ".Provider";
      case be:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case tt:
        return t = e.displayName || null, t !== null ? t : me(e.type) || "Memo";
      case Oe:
        t = e._payload, e = e._init;
        try {
          return me(e(t));
        } catch {
        }
    }
    return null;
  }
  function Ce(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return me(t);
      case 8:
        return t === Y ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ye(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Pe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ye(e) {
    var t = Pe(e) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var l = i.get, u = i.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(p) {
        o = "" + p, u.call(this, p);
      } }), Object.defineProperty(e, t, { enumerable: i.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(p) {
        o = "" + p;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function U(e) {
    e._valueTracker || (e._valueTracker = Ye(e));
  }
  function ke(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), o = "";
    return e && (o = Pe(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== i ? (t.setValue(e), !0) : !1;
  }
  function te(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function ee(e, t) {
    var i = t.checked;
    return $({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: i ?? e._wrapperState.initialChecked });
  }
  function ge(e, t) {
    var i = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
    i = ye(t.value != null ? t.value : i), e._wrapperState = { initialChecked: o, initialValue: i, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function fe(e, t) {
    t = t.checked, t != null && _(e, "checked", t, !1);
  }
  function se(e, t) {
    fe(e, t);
    var i = ye(t.value), o = t.type;
    if (i != null) o === "number" ? (i === 0 && e.value === "" || e.value != i) && (e.value = "" + i) : e.value !== "" + i && (e.value = "" + i);
    else if (o === "submit" || o === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ee(e, t.type, i) : t.hasOwnProperty("defaultValue") && Ee(e, t.type, ye(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function xe(e, t, i) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var o = t.type;
      if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, i || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = e.name, i !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, i !== "" && (e.name = i);
  }
  function Ee(e, t, i) {
    (t !== "number" || te(e.ownerDocument) !== e) && (i == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + i && (e.defaultValue = "" + i));
  }
  var _e = Array.isArray;
  function Be(e, t, i, o) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < i.length; l++) t["$" + i[l]] = !0;
      for (i = 0; i < e.length; i++) l = t.hasOwnProperty("$" + e[i].value), e[i].selected !== l && (e[i].selected = l), l && o && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + ye(i), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === i) {
          e[l].selected = !0, o && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vt(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return $({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Dr(e, t) {
    var i = t.value;
    if (i == null) {
      if (i = t.children, t = t.defaultValue, i != null) {
        if (t != null) throw Error(s(92));
        if (_e(i)) {
          if (1 < i.length) throw Error(s(93));
          i = i[0];
        }
        t = i;
      }
      t == null && (t = ""), i = t;
    }
    e._wrapperState = { initialValue: ye(i) };
  }
  function Mu(e, t) {
    var i = ye(t.value), o = ye(t.defaultValue);
    i != null && (i = "" + i, i !== e.value && (e.value = i), t.defaultValue == null && e.defaultValue !== i && (e.defaultValue = i)), o != null && (e.defaultValue = "" + o);
  }
  function Du(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function Lu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function po(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Lu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Vi, _u = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, i, o, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, i, o, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Vi = Vi || document.createElement("div"), Vi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Vi.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Lr(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var _r = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Dm = ["Webkit", "ms", "Moz", "O"];
  Object.keys(_r).forEach(function(e) {
    Dm.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), _r[t] = _r[e];
    });
  });
  function Iu(e, t, i) {
    return t == null || typeof t == "boolean" || t === "" ? "" : i || typeof t != "number" || t === 0 || _r.hasOwnProperty(e) && _r[e] ? ("" + t).trim() : t + "px";
  }
  function Vu(e, t) {
    e = e.style;
    for (var i in t) if (t.hasOwnProperty(i)) {
      var o = i.indexOf("--") === 0, l = Iu(i, t[i], o);
      i === "float" && (i = "cssFloat"), o ? e.setProperty(i, l) : e[i] = l;
    }
  }
  var Lm = $({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ho(e, t) {
    if (t) {
      if (Lm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function mo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var go = null;
  function yo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var vo = null, Zn = null, qn = null;
  function Nu(e) {
    if (e = ei(e)) {
      if (typeof vo != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = rs(t), vo(e.stateNode, e.type, t));
    }
  }
  function Ou(e) {
    Zn ? qn ? qn.push(e) : qn = [e] : Zn = e;
  }
  function ju() {
    if (Zn) {
      var e = Zn, t = qn;
      if (qn = Zn = null, Nu(e), t) for (e = 0; e < t.length; e++) Nu(t[e]);
    }
  }
  function Fu(e, t) {
    return e(t);
  }
  function zu() {
  }
  var xo = !1;
  function Bu(e, t, i) {
    if (xo) return e(t, i);
    xo = !0;
    try {
      return Fu(e, t, i);
    } finally {
      xo = !1, (Zn !== null || qn !== null) && (zu(), ju());
    }
  }
  function Ir(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var o = rs(i);
    if (o === null) return null;
    i = o[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function") throw Error(s(231, t, typeof i));
    return i;
  }
  var wo = !1;
  if (h) try {
    var Vr = {};
    Object.defineProperty(Vr, "passive", { get: function() {
      wo = !0;
    } }), window.addEventListener("test", Vr, Vr), window.removeEventListener("test", Vr, Vr);
  } catch {
    wo = !1;
  }
  function _m(e, t, i, o, l, u, p, v, w) {
    var R = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(i, R);
    } catch (O) {
      this.onError(O);
    }
  }
  var Nr = !1, Ni = null, Oi = !1, So = null, Im = { onError: function(e) {
    Nr = !0, Ni = e;
  } };
  function Vm(e, t, i, o, l, u, p, v, w) {
    Nr = !1, Ni = null, _m.apply(Im, arguments);
  }
  function Nm(e, t, i, o, l, u, p, v, w) {
    if (Vm.apply(this, arguments), Nr) {
      if (Nr) {
        var R = Ni;
        Nr = !1, Ni = null;
      } else throw Error(s(198));
      Oi || (Oi = !0, So = R);
    }
  }
  function _n(e) {
    var t = e, i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (i = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function Uu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function $u(e) {
    if (_n(e) !== e) throw Error(s(188));
  }
  function Om(e) {
    var t = e.alternate;
    if (!t) {
      if (t = _n(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var i = e, o = t; ; ) {
      var l = i.return;
      if (l === null) break;
      var u = l.alternate;
      if (u === null) {
        if (o = l.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (l.child === u.child) {
        for (u = l.child; u; ) {
          if (u === i) return $u(l), e;
          if (u === o) return $u(l), t;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== o.return) i = l, o = u;
      else {
        for (var p = !1, v = l.child; v; ) {
          if (v === i) {
            p = !0, i = l, o = u;
            break;
          }
          if (v === o) {
            p = !0, o = l, i = u;
            break;
          }
          v = v.sibling;
        }
        if (!p) {
          for (v = u.child; v; ) {
            if (v === i) {
              p = !0, i = u, o = l;
              break;
            }
            if (v === o) {
              p = !0, o = u, i = l;
              break;
            }
            v = v.sibling;
          }
          if (!p) throw Error(s(189));
        }
      }
      if (i.alternate !== o) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? e : t;
  }
  function Wu(e) {
    return e = Om(e), e !== null ? Ku(e) : null;
  }
  function Ku(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Ku(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var bu = r.unstable_scheduleCallback, Hu = r.unstable_cancelCallback, jm = r.unstable_shouldYield, Fm = r.unstable_requestPaint, Ue = r.unstable_now, zm = r.unstable_getCurrentPriorityLevel, ko = r.unstable_ImmediatePriority, Yu = r.unstable_UserBlockingPriority, ji = r.unstable_NormalPriority, Bm = r.unstable_LowPriority, Gu = r.unstable_IdlePriority, Fi = null, Kt = null;
  function Um(e) {
    if (Kt && typeof Kt.onCommitFiberRoot == "function") try {
      Kt.onCommitFiberRoot(Fi, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Nt = Math.clz32 ? Math.clz32 : Km, $m = Math.log, Wm = Math.LN2;
  function Km(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - ($m(e) / Wm | 0) | 0;
  }
  var zi = 64, Bi = 4194304;
  function Or(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Ui(e, t) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0, l = e.suspendedLanes, u = e.pingedLanes, p = i & 268435455;
    if (p !== 0) {
      var v = p & ~l;
      v !== 0 ? o = Or(v) : (u &= p, u !== 0 && (o = Or(u)));
    } else p = i & ~l, p !== 0 ? o = Or(p) : u !== 0 && (o = Or(u));
    if (o === 0) return 0;
    if (t !== 0 && t !== o && (t & l) === 0 && (l = o & -o, u = t & -t, l >= u || l === 16 && (u & 4194240) !== 0)) return t;
    if ((o & 4) !== 0 && (o |= i & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) i = 31 - Nt(t), l = 1 << i, o |= e[i], t &= ~l;
    return o;
  }
  function bm(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Hm(e, t) {
    for (var i = e.suspendedLanes, o = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
      var p = 31 - Nt(u), v = 1 << p, w = l[p];
      w === -1 ? ((v & i) === 0 || (v & o) !== 0) && (l[p] = bm(v, t)) : w <= t && (e.expiredLanes |= v), u &= ~v;
    }
  }
  function To(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Xu() {
    var e = zi;
    return zi <<= 1, (zi & 4194240) === 0 && (zi = 64), e;
  }
  function Co(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function jr(e, t, i) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Nt(t), e[t] = i;
  }
  function Ym(e, t) {
    var i = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var o = e.eventTimes;
    for (e = e.expirationTimes; 0 < i; ) {
      var l = 31 - Nt(i), u = 1 << l;
      t[l] = 0, o[l] = -1, e[l] = -1, i &= ~u;
    }
  }
  function Eo(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var o = 31 - Nt(i), l = 1 << o;
      l & t | e[o] & t && (e[o] |= t), i &= ~l;
    }
  }
  var Te = 0;
  function Qu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Zu, Po, qu, Ju, ec, Ao = !1, $i = [], ln = null, un = null, cn = null, Fr = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map(), fn = [], Gm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function tc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ln = null;
        break;
      case "dragenter":
      case "dragleave":
        un = null;
        break;
      case "mouseover":
      case "mouseout":
        cn = null;
        break;
      case "pointerover":
      case "pointerout":
        Fr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zr.delete(t.pointerId);
    }
  }
  function Br(e, t, i, o, l, u) {
    return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: i, eventSystemFlags: o, nativeEvent: u, targetContainers: [l] }, t !== null && (t = ei(t), t !== null && Po(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Xm(e, t, i, o, l) {
    switch (t) {
      case "focusin":
        return ln = Br(ln, e, t, i, o, l), !0;
      case "dragenter":
        return un = Br(un, e, t, i, o, l), !0;
      case "mouseover":
        return cn = Br(cn, e, t, i, o, l), !0;
      case "pointerover":
        var u = l.pointerId;
        return Fr.set(u, Br(Fr.get(u) || null, e, t, i, o, l)), !0;
      case "gotpointercapture":
        return u = l.pointerId, zr.set(u, Br(zr.get(u) || null, e, t, i, o, l)), !0;
    }
    return !1;
  }
  function nc(e) {
    var t = In(e.target);
    if (t !== null) {
      var i = _n(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = Uu(i), t !== null) {
            e.blockedOn = t, ec(e.priority, function() {
              qu(i);
            });
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Wi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var o = new i.constructor(i.type, i);
        go = o, i.target.dispatchEvent(o), go = null;
      } else return t = ei(i), t !== null && Po(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function rc(e, t, i) {
    Wi(e) && i.delete(t);
  }
  function Qm() {
    Ao = !1, ln !== null && Wi(ln) && (ln = null), un !== null && Wi(un) && (un = null), cn !== null && Wi(cn) && (cn = null), Fr.forEach(rc), zr.forEach(rc);
  }
  function Ur(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ao || (Ao = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Qm)));
  }
  function $r(e) {
    function t(l) {
      return Ur(l, e);
    }
    if (0 < $i.length) {
      Ur($i[0], e);
      for (var i = 1; i < $i.length; i++) {
        var o = $i[i];
        o.blockedOn === e && (o.blockedOn = null);
      }
    }
    for (ln !== null && Ur(ln, e), un !== null && Ur(un, e), cn !== null && Ur(cn, e), Fr.forEach(t), zr.forEach(t), i = 0; i < fn.length; i++) o = fn[i], o.blockedOn === e && (o.blockedOn = null);
    for (; 0 < fn.length && (i = fn[0], i.blockedOn === null); ) nc(i), i.blockedOn === null && fn.shift();
  }
  var Jn = K.ReactCurrentBatchConfig, Ki = !0;
  function Zm(e, t, i, o) {
    var l = Te, u = Jn.transition;
    Jn.transition = null;
    try {
      Te = 1, Ro(e, t, i, o);
    } finally {
      Te = l, Jn.transition = u;
    }
  }
  function qm(e, t, i, o) {
    var l = Te, u = Jn.transition;
    Jn.transition = null;
    try {
      Te = 4, Ro(e, t, i, o);
    } finally {
      Te = l, Jn.transition = u;
    }
  }
  function Ro(e, t, i, o) {
    if (Ki) {
      var l = Mo(e, t, i, o);
      if (l === null) Ho(e, t, o, bi, i), tc(e, o);
      else if (Xm(l, e, t, i, o)) o.stopPropagation();
      else if (tc(e, o), t & 4 && -1 < Gm.indexOf(e)) {
        for (; l !== null; ) {
          var u = ei(l);
          if (u !== null && Zu(u), u = Mo(e, t, i, o), u === null && Ho(e, t, o, bi, i), u === l) break;
          l = u;
        }
        l !== null && o.stopPropagation();
      } else Ho(e, t, o, null, i);
    }
  }
  var bi = null;
  function Mo(e, t, i, o) {
    if (bi = null, e = yo(o), e = In(e), e !== null) if (t = _n(e), t === null) e = null;
    else if (i = t.tag, i === 13) {
      if (e = Uu(t), e !== null) return e;
      e = null;
    } else if (i === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return bi = e, null;
  }
  function ic(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (zm()) {
          case ko:
            return 1;
          case Yu:
            return 4;
          case ji:
          case Bm:
            return 16;
          case Gu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var dn = null, Do = null, Hi = null;
  function sc() {
    if (Hi) return Hi;
    var e, t = Do, i = t.length, o, l = "value" in dn ? dn.value : dn.textContent, u = l.length;
    for (e = 0; e < i && t[e] === l[e]; e++) ;
    var p = i - e;
    for (o = 1; o <= p && t[i - o] === l[u - o]; o++) ;
    return Hi = l.slice(e, 1 < o ? 1 - o : void 0);
  }
  function Yi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Gi() {
    return !0;
  }
  function oc() {
    return !1;
  }
  function wt(e) {
    function t(i, o, l, u, p) {
      this._reactName = i, this._targetInst = l, this.type = o, this.nativeEvent = u, this.target = p, this.currentTarget = null;
      for (var v in e) e.hasOwnProperty(v) && (i = e[v], this[v] = i ? i(u) : u[v]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Gi : oc, this.isPropagationStopped = oc, this;
    }
    return $(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var i = this.nativeEvent;
      i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Gi);
    }, stopPropagation: function() {
      var i = this.nativeEvent;
      i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Gi);
    }, persist: function() {
    }, isPersistent: Gi }), t;
  }
  var er = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Lo = wt(er), Wr = $({}, er, { view: 0, detail: 0 }), Jm = wt(Wr), _o, Io, Kr, Xi = $({}, Wr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: No, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Kr && (Kr && e.type === "mousemove" ? (_o = e.screenX - Kr.screenX, Io = e.screenY - Kr.screenY) : Io = _o = 0, Kr = e), _o);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : Io;
  } }), ac = wt(Xi), eg = $({}, Xi, { dataTransfer: 0 }), tg = wt(eg), ng = $({}, Wr, { relatedTarget: 0 }), Vo = wt(ng), rg = $({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ig = wt(rg), sg = $({}, er, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), og = wt(sg), ag = $({}, er, { data: 0 }), lc = wt(ag), lg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, ug = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, cg = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function fg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = cg[e]) ? !!t[e] : !1;
  }
  function No() {
    return fg;
  }
  var dg = $({}, Wr, { key: function(e) {
    if (e.key) {
      var t = lg[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Yi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ug[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: No, charCode: function(e) {
    return e.type === "keypress" ? Yi(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Yi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), pg = wt(dg), hg = $({}, Xi, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), uc = wt(hg), mg = $({}, Wr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: No }), gg = wt(mg), yg = $({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), vg = wt(yg), xg = $({}, Xi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), wg = wt(xg), Sg = [9, 13, 27, 32], Oo = h && "CompositionEvent" in window, br = null;
  h && "documentMode" in document && (br = document.documentMode);
  var kg = h && "TextEvent" in window && !br, cc = h && (!Oo || br && 8 < br && 11 >= br), fc = " ", dc = !1;
  function pc(e, t) {
    switch (e) {
      case "keyup":
        return Sg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var tr = !1;
  function Tg(e, t) {
    switch (e) {
      case "compositionend":
        return hc(t);
      case "keypress":
        return t.which !== 32 ? null : (dc = !0, fc);
      case "textInput":
        return e = t.data, e === fc && dc ? null : e;
      default:
        return null;
    }
  }
  function Cg(e, t) {
    if (tr) return e === "compositionend" || !Oo && pc(e, t) ? (e = sc(), Hi = Do = dn = null, tr = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return cc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Eg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function mc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Eg[e.type] : t === "textarea";
  }
  function gc(e, t, i, o) {
    Ou(o), t = es(t, "onChange"), 0 < t.length && (i = new Lo("onChange", "change", null, i, o), e.push({ event: i, listeners: t }));
  }
  var Hr = null, Yr = null;
  function Pg(e) {
    Vc(e, 0);
  }
  function Qi(e) {
    var t = or(e);
    if (ke(t)) return e;
  }
  function Ag(e, t) {
    if (e === "change") return t;
  }
  var yc = !1;
  if (h) {
    var jo;
    if (h) {
      var Fo = "oninput" in document;
      if (!Fo) {
        var vc = document.createElement("div");
        vc.setAttribute("oninput", "return;"), Fo = typeof vc.oninput == "function";
      }
      jo = Fo;
    } else jo = !1;
    yc = jo && (!document.documentMode || 9 < document.documentMode);
  }
  function xc() {
    Hr && (Hr.detachEvent("onpropertychange", wc), Yr = Hr = null);
  }
  function wc(e) {
    if (e.propertyName === "value" && Qi(Yr)) {
      var t = [];
      gc(t, Yr, e, yo(e)), Bu(Pg, t);
    }
  }
  function Rg(e, t, i) {
    e === "focusin" ? (xc(), Hr = t, Yr = i, Hr.attachEvent("onpropertychange", wc)) : e === "focusout" && xc();
  }
  function Mg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Qi(Yr);
  }
  function Dg(e, t) {
    if (e === "click") return Qi(t);
  }
  function Lg(e, t) {
    if (e === "input" || e === "change") return Qi(t);
  }
  function _g(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ot = typeof Object.is == "function" ? Object.is : _g;
  function Gr(e, t) {
    if (Ot(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var i = Object.keys(e), o = Object.keys(t);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var l = i[o];
      if (!m.call(t, l) || !Ot(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Sc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function kc(e, t) {
    var i = Sc(e);
    e = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = e + i.textContent.length, e <= t && o >= t) return { node: i, offset: t - e };
        e = o;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = Sc(i);
    }
  }
  function Tc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Tc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Cc() {
    for (var e = window, t = te(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = te(e.document);
    }
    return t;
  }
  function zo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Ig(e) {
    var t = Cc(), i = e.focusedElem, o = e.selectionRange;
    if (t !== i && i && i.ownerDocument && Tc(i.ownerDocument.documentElement, i)) {
      if (o !== null && zo(i)) {
        if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in i) i.selectionStart = t, i.selectionEnd = Math.min(e, i.value.length);
        else if (e = (t = i.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = i.textContent.length, u = Math.min(o.start, l);
          o = o.end === void 0 ? u : Math.min(o.end, l), !e.extend && u > o && (l = o, o = u, u = l), l = kc(i, u);
          var p = kc(
            i,
            o
          );
          l && p && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== p.node || e.focusOffset !== p.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(p.node, p.offset)) : (t.setEnd(p.node, p.offset), e.addRange(t)));
        }
      }
      for (t = [], e = i; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof i.focus == "function" && i.focus(), i = 0; i < t.length; i++) e = t[i], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Vg = h && "documentMode" in document && 11 >= document.documentMode, nr = null, Bo = null, Xr = null, Uo = !1;
  function Ec(e, t, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Uo || nr == null || nr !== te(o) || (o = nr, "selectionStart" in o && zo(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Xr && Gr(Xr, o) || (Xr = o, o = es(Bo, "onSelect"), 0 < o.length && (t = new Lo("onSelect", "select", null, t, i), e.push({ event: t, listeners: o }), t.target = nr)));
  }
  function Zi(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var rr = { animationend: Zi("Animation", "AnimationEnd"), animationiteration: Zi("Animation", "AnimationIteration"), animationstart: Zi("Animation", "AnimationStart"), transitionend: Zi("Transition", "TransitionEnd") }, $o = {}, Pc = {};
  h && (Pc = document.createElement("div").style, "AnimationEvent" in window || (delete rr.animationend.animation, delete rr.animationiteration.animation, delete rr.animationstart.animation), "TransitionEvent" in window || delete rr.transitionend.transition);
  function qi(e) {
    if ($o[e]) return $o[e];
    if (!rr[e]) return e;
    var t = rr[e], i;
    for (i in t) if (t.hasOwnProperty(i) && i in Pc) return $o[e] = t[i];
    return e;
  }
  var Ac = qi("animationend"), Rc = qi("animationiteration"), Mc = qi("animationstart"), Dc = qi("transitionend"), Lc = /* @__PURE__ */ new Map(), _c = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function pn(e, t) {
    Lc.set(e, t), d(t, [e]);
  }
  for (var Wo = 0; Wo < _c.length; Wo++) {
    var Ko = _c[Wo], Ng = Ko.toLowerCase(), Og = Ko[0].toUpperCase() + Ko.slice(1);
    pn(Ng, "on" + Og);
  }
  pn(Ac, "onAnimationEnd"), pn(Rc, "onAnimationIteration"), pn(Mc, "onAnimationStart"), pn("dblclick", "onDoubleClick"), pn("focusin", "onFocus"), pn("focusout", "onBlur"), pn(Dc, "onTransitionEnd"), f("onMouseEnter", ["mouseout", "mouseover"]), f("onMouseLeave", ["mouseout", "mouseover"]), f("onPointerEnter", ["pointerout", "pointerover"]), f("onPointerLeave", ["pointerout", "pointerover"]), d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Qr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));
  function Ic(e, t, i) {
    var o = e.type || "unknown-event";
    e.currentTarget = i, Nm(o, t, void 0, e), e.currentTarget = null;
  }
  function Vc(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i], l = o.event;
      o = o.listeners;
      e: {
        var u = void 0;
        if (t) for (var p = o.length - 1; 0 <= p; p--) {
          var v = o[p], w = v.instance, R = v.currentTarget;
          if (v = v.listener, w !== u && l.isPropagationStopped()) break e;
          Ic(l, v, R), u = w;
        }
        else for (p = 0; p < o.length; p++) {
          if (v = o[p], w = v.instance, R = v.currentTarget, v = v.listener, w !== u && l.isPropagationStopped()) break e;
          Ic(l, v, R), u = w;
        }
      }
    }
    if (Oi) throw e = So, Oi = !1, So = null, e;
  }
  function Me(e, t) {
    var i = t[qo];
    i === void 0 && (i = t[qo] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    i.has(o) || (Nc(t, e, 2, !1), i.add(o));
  }
  function bo(e, t, i) {
    var o = 0;
    t && (o |= 4), Nc(i, e, o, t);
  }
  var Ji = "_reactListening" + Math.random().toString(36).slice(2);
  function Zr(e) {
    if (!e[Ji]) {
      e[Ji] = !0, a.forEach(function(i) {
        i !== "selectionchange" && (jg.has(i) || bo(i, !1, e), bo(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ji] || (t[Ji] = !0, bo("selectionchange", !1, t));
    }
  }
  function Nc(e, t, i, o) {
    switch (ic(t)) {
      case 1:
        var l = Zm;
        break;
      case 4:
        l = qm;
        break;
      default:
        l = Ro;
    }
    i = l.bind(null, t, i, e), l = void 0, !wo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), o ? l !== void 0 ? e.addEventListener(t, i, { capture: !0, passive: l }) : e.addEventListener(t, i, !0) : l !== void 0 ? e.addEventListener(t, i, { passive: l }) : e.addEventListener(t, i, !1);
  }
  function Ho(e, t, i, o, l) {
    var u = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var p = o.tag;
      if (p === 3 || p === 4) {
        var v = o.stateNode.containerInfo;
        if (v === l || v.nodeType === 8 && v.parentNode === l) break;
        if (p === 4) for (p = o.return; p !== null; ) {
          var w = p.tag;
          if ((w === 3 || w === 4) && (w = p.stateNode.containerInfo, w === l || w.nodeType === 8 && w.parentNode === l)) return;
          p = p.return;
        }
        for (; v !== null; ) {
          if (p = In(v), p === null) return;
          if (w = p.tag, w === 5 || w === 6) {
            o = u = p;
            continue e;
          }
          v = v.parentNode;
        }
      }
      o = o.return;
    }
    Bu(function() {
      var R = u, O = yo(i), F = [];
      e: {
        var V = Lc.get(e);
        if (V !== void 0) {
          var b = Lo, G = e;
          switch (e) {
            case "keypress":
              if (Yi(i) === 0) break e;
            case "keydown":
            case "keyup":
              b = pg;
              break;
            case "focusin":
              G = "focus", b = Vo;
              break;
            case "focusout":
              G = "blur", b = Vo;
              break;
            case "beforeblur":
            case "afterblur":
              b = Vo;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = ac;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = tg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = gg;
              break;
            case Ac:
            case Rc:
            case Mc:
              b = ig;
              break;
            case Dc:
              b = vg;
              break;
            case "scroll":
              b = Jm;
              break;
            case "wheel":
              b = wg;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = og;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = uc;
          }
          var q = (t & 4) !== 0, $e = !q && e === "scroll", E = q ? V !== null ? V + "Capture" : null : V;
          q = [];
          for (var k = R, A; k !== null; ) {
            A = k;
            var B = A.stateNode;
            if (A.tag === 5 && B !== null && (A = B, E !== null && (B = Ir(k, E), B != null && q.push(qr(k, B, A)))), $e) break;
            k = k.return;
          }
          0 < q.length && (V = new b(V, G, null, i, O), F.push({ event: V, listeners: q }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (V = e === "mouseover" || e === "pointerover", b = e === "mouseout" || e === "pointerout", V && i !== go && (G = i.relatedTarget || i.fromElement) && (In(G) || G[Zt])) break e;
          if ((b || V) && (V = O.window === O ? O : (V = O.ownerDocument) ? V.defaultView || V.parentWindow : window, b ? (G = i.relatedTarget || i.toElement, b = R, G = G ? In(G) : null, G !== null && ($e = _n(G), G !== $e || G.tag !== 5 && G.tag !== 6) && (G = null)) : (b = null, G = R), b !== G)) {
            if (q = ac, B = "onMouseLeave", E = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (q = uc, B = "onPointerLeave", E = "onPointerEnter", k = "pointer"), $e = b == null ? V : or(b), A = G == null ? V : or(G), V = new q(B, k + "leave", b, i, O), V.target = $e, V.relatedTarget = A, B = null, In(O) === R && (q = new q(E, k + "enter", G, i, O), q.target = A, q.relatedTarget = $e, B = q), $e = B, b && G) t: {
              for (q = b, E = G, k = 0, A = q; A; A = ir(A)) k++;
              for (A = 0, B = E; B; B = ir(B)) A++;
              for (; 0 < k - A; ) q = ir(q), k--;
              for (; 0 < A - k; ) E = ir(E), A--;
              for (; k--; ) {
                if (q === E || E !== null && q === E.alternate) break t;
                q = ir(q), E = ir(E);
              }
              q = null;
            }
            else q = null;
            b !== null && Oc(F, V, b, q, !1), G !== null && $e !== null && Oc(F, $e, G, q, !0);
          }
        }
        e: {
          if (V = R ? or(R) : window, b = V.nodeName && V.nodeName.toLowerCase(), b === "select" || b === "input" && V.type === "file") var J = Ag;
          else if (mc(V)) if (yc) J = Lg;
          else {
            J = Mg;
            var ne = Rg;
          }
          else (b = V.nodeName) && b.toLowerCase() === "input" && (V.type === "checkbox" || V.type === "radio") && (J = Dg);
          if (J && (J = J(e, R))) {
            gc(F, J, i, O);
            break e;
          }
          ne && ne(e, V, R), e === "focusout" && (ne = V._wrapperState) && ne.controlled && V.type === "number" && Ee(V, "number", V.value);
        }
        switch (ne = R ? or(R) : window, e) {
          case "focusin":
            (mc(ne) || ne.contentEditable === "true") && (nr = ne, Bo = R, Xr = null);
            break;
          case "focusout":
            Xr = Bo = nr = null;
            break;
          case "mousedown":
            Uo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uo = !1, Ec(F, i, O);
            break;
          case "selectionchange":
            if (Vg) break;
          case "keydown":
          case "keyup":
            Ec(F, i, O);
        }
        var re;
        if (Oo) e: {
          switch (e) {
            case "compositionstart":
              var ae = "onCompositionStart";
              break e;
            case "compositionend":
              ae = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ae = "onCompositionUpdate";
              break e;
          }
          ae = void 0;
        }
        else tr ? pc(e, i) && (ae = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (ae = "onCompositionStart");
        ae && (cc && i.locale !== "ko" && (tr || ae !== "onCompositionStart" ? ae === "onCompositionEnd" && tr && (re = sc()) : (dn = O, Do = "value" in dn ? dn.value : dn.textContent, tr = !0)), ne = es(R, ae), 0 < ne.length && (ae = new lc(ae, e, null, i, O), F.push({ event: ae, listeners: ne }), re ? ae.data = re : (re = hc(i), re !== null && (ae.data = re)))), (re = kg ? Tg(e, i) : Cg(e, i)) && (R = es(R, "onBeforeInput"), 0 < R.length && (O = new lc("onBeforeInput", "beforeinput", null, i, O), F.push({ event: O, listeners: R }), O.data = re));
      }
      Vc(F, t);
    });
  }
  function qr(e, t, i) {
    return { instance: e, listener: t, currentTarget: i };
  }
  function es(e, t) {
    for (var i = t + "Capture", o = []; e !== null; ) {
      var l = e, u = l.stateNode;
      l.tag === 5 && u !== null && (l = u, u = Ir(e, i), u != null && o.unshift(qr(e, u, l)), u = Ir(e, t), u != null && o.push(qr(e, u, l))), e = e.return;
    }
    return o;
  }
  function ir(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Oc(e, t, i, o, l) {
    for (var u = t._reactName, p = []; i !== null && i !== o; ) {
      var v = i, w = v.alternate, R = v.stateNode;
      if (w !== null && w === o) break;
      v.tag === 5 && R !== null && (v = R, l ? (w = Ir(i, u), w != null && p.unshift(qr(i, w, v))) : l || (w = Ir(i, u), w != null && p.push(qr(i, w, v)))), i = i.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var Fg = /\r\n?/g, zg = /\u0000|\uFFFD/g;
  function jc(e) {
    return (typeof e == "string" ? e : "" + e).replace(Fg, `
`).replace(zg, "");
  }
  function ts(e, t, i) {
    if (t = jc(t), jc(e) !== t && i) throw Error(s(425));
  }
  function ns() {
  }
  var Yo = null, Go = null;
  function Xo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qo = typeof setTimeout == "function" ? setTimeout : void 0, Bg = typeof clearTimeout == "function" ? clearTimeout : void 0, Fc = typeof Promise == "function" ? Promise : void 0, Ug = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fc < "u" ? function(e) {
    return Fc.resolve(null).then(e).catch($g);
  } : Qo;
  function $g(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Zo(e, t) {
    var i = t, o = 0;
    do {
      var l = i.nextSibling;
      if (e.removeChild(i), l && l.nodeType === 8) if (i = l.data, i === "/$") {
        if (o === 0) {
          e.removeChild(l), $r(t);
          return;
        }
        o--;
      } else i !== "$" && i !== "$?" && i !== "$!" || o++;
      i = l;
    } while (i);
    $r(t);
  }
  function hn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function zc(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?") {
          if (t === 0) return e;
          t--;
        } else i === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var sr = Math.random().toString(36).slice(2), bt = "__reactFiber$" + sr, Jr = "__reactProps$" + sr, Zt = "__reactContainer$" + sr, qo = "__reactEvents$" + sr, Wg = "__reactListeners$" + sr, Kg = "__reactHandles$" + sr;
  function In(e) {
    var t = e[bt];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[Zt] || i[bt]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null) for (e = zc(e); e !== null; ) {
          if (i = e[bt]) return i;
          e = zc(e);
        }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function ei(e) {
    return e = e[bt] || e[Zt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function or(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function rs(e) {
    return e[Jr] || null;
  }
  var Jo = [], ar = -1;
  function mn(e) {
    return { current: e };
  }
  function De(e) {
    0 > ar || (e.current = Jo[ar], Jo[ar] = null, ar--);
  }
  function Ae(e, t) {
    ar++, Jo[ar] = e.current, e.current = t;
  }
  var gn = {}, st = mn(gn), ht = mn(!1), Vn = gn;
  function lr(e, t) {
    var i = e.type.contextTypes;
    if (!i) return gn;
    var o = e.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
    var l = {}, u;
    for (u in i) l[u] = t[u];
    return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function mt(e) {
    return e = e.childContextTypes, e != null;
  }
  function is() {
    De(ht), De(st);
  }
  function Bc(e, t, i) {
    if (st.current !== gn) throw Error(s(168));
    Ae(st, t), Ae(ht, i);
  }
  function Uc(e, t, i) {
    var o = e.stateNode;
    if (t = t.childContextTypes, typeof o.getChildContext != "function") return i;
    o = o.getChildContext();
    for (var l in o) if (!(l in t)) throw Error(s(108, Ce(e) || "Unknown", l));
    return $({}, i, o);
  }
  function ss(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gn, Vn = st.current, Ae(st, e), Ae(ht, ht.current), !0;
  }
  function $c(e, t, i) {
    var o = e.stateNode;
    if (!o) throw Error(s(169));
    i ? (e = Uc(e, t, Vn), o.__reactInternalMemoizedMergedChildContext = e, De(ht), De(st), Ae(st, e)) : De(ht), Ae(ht, i);
  }
  var qt = null, os = !1, ea = !1;
  function Wc(e) {
    qt === null ? qt = [e] : qt.push(e);
  }
  function bg(e) {
    os = !0, Wc(e);
  }
  function yn() {
    if (!ea && qt !== null) {
      ea = !0;
      var e = 0, t = Te;
      try {
        var i = qt;
        for (Te = 1; e < i.length; e++) {
          var o = i[e];
          do
            o = o(!0);
          while (o !== null);
        }
        qt = null, os = !1;
      } catch (l) {
        throw qt !== null && (qt = qt.slice(e + 1)), bu(ko, yn), l;
      } finally {
        Te = t, ea = !1;
      }
    }
    return null;
  }
  var ur = [], cr = 0, as = null, ls = 0, Et = [], Pt = 0, Nn = null, Jt = 1, en = "";
  function On(e, t) {
    ur[cr++] = ls, ur[cr++] = as, as = e, ls = t;
  }
  function Kc(e, t, i) {
    Et[Pt++] = Jt, Et[Pt++] = en, Et[Pt++] = Nn, Nn = e;
    var o = Jt;
    e = en;
    var l = 32 - Nt(o) - 1;
    o &= ~(1 << l), i += 1;
    var u = 32 - Nt(t) + l;
    if (30 < u) {
      var p = l - l % 5;
      u = (o & (1 << p) - 1).toString(32), o >>= p, l -= p, Jt = 1 << 32 - Nt(t) + l | i << l | o, en = u + e;
    } else Jt = 1 << u | i << l | o, en = e;
  }
  function ta(e) {
    e.return !== null && (On(e, 1), Kc(e, 1, 0));
  }
  function na(e) {
    for (; e === as; ) as = ur[--cr], ur[cr] = null, ls = ur[--cr], ur[cr] = null;
    for (; e === Nn; ) Nn = Et[--Pt], Et[Pt] = null, en = Et[--Pt], Et[Pt] = null, Jt = Et[--Pt], Et[Pt] = null;
  }
  var St = null, kt = null, Le = !1, jt = null;
  function bc(e, t) {
    var i = Dt(5, null, null, 0);
    i.elementType = "DELETED", i.stateNode = t, i.return = e, t = e.deletions, t === null ? (e.deletions = [i], e.flags |= 16) : t.push(i);
  }
  function Hc(e, t) {
    switch (e.tag) {
      case 5:
        var i = e.type;
        return t = t.nodeType !== 1 || i.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, St = e, kt = hn(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, St = e, kt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (i = Nn !== null ? { id: Jt, overflow: en } : null, e.memoizedState = { dehydrated: t, treeContext: i, retryLane: 1073741824 }, i = Dt(18, null, null, 0), i.stateNode = t, i.return = e, e.child = i, St = e, kt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function ra(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ia(e) {
    if (Le) {
      var t = kt;
      if (t) {
        var i = t;
        if (!Hc(e, t)) {
          if (ra(e)) throw Error(s(418));
          t = hn(i.nextSibling);
          var o = St;
          t && Hc(e, t) ? bc(o, i) : (e.flags = e.flags & -4097 | 2, Le = !1, St = e);
        }
      } else {
        if (ra(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, Le = !1, St = e;
      }
    }
  }
  function Yc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    St = e;
  }
  function us(e) {
    if (e !== St) return !1;
    if (!Le) return Yc(e), Le = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Xo(e.type, e.memoizedProps)), t && (t = kt)) {
      if (ra(e)) throw Gc(), Error(s(418));
      for (; t; ) bc(e, t), t = hn(t.nextSibling);
    }
    if (Yc(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var i = e.data;
            if (i === "/$") {
              if (t === 0) {
                kt = hn(e.nextSibling);
                break e;
              }
              t--;
            } else i !== "$" && i !== "$!" && i !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        kt = null;
      }
    } else kt = St ? hn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Gc() {
    for (var e = kt; e; ) e = hn(e.nextSibling);
  }
  function fr() {
    kt = St = null, Le = !1;
  }
  function sa(e) {
    jt === null ? jt = [e] : jt.push(e);
  }
  var Hg = K.ReactCurrentBatchConfig;
  function ti(e, t, i) {
    if (e = i.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (i._owner) {
        if (i = i._owner, i) {
          if (i.tag !== 1) throw Error(s(309));
          var o = i.stateNode;
        }
        if (!o) throw Error(s(147, e));
        var l = o, u = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(p) {
          var v = l.refs;
          p === null ? delete v[u] : v[u] = p;
        }, t._stringRef = u, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!i._owner) throw Error(s(290, e));
    }
    return e;
  }
  function cs(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Xc(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Qc(e) {
    function t(E, k) {
      if (e) {
        var A = E.deletions;
        A === null ? (E.deletions = [k], E.flags |= 16) : A.push(k);
      }
    }
    function i(E, k) {
      if (!e) return null;
      for (; k !== null; ) t(E, k), k = k.sibling;
      return null;
    }
    function o(E, k) {
      for (E = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? E.set(k.key, k) : E.set(k.index, k), k = k.sibling;
      return E;
    }
    function l(E, k) {
      return E = En(E, k), E.index = 0, E.sibling = null, E;
    }
    function u(E, k, A) {
      return E.index = A, e ? (A = E.alternate, A !== null ? (A = A.index, A < k ? (E.flags |= 2, k) : A) : (E.flags |= 2, k)) : (E.flags |= 1048576, k);
    }
    function p(E) {
      return e && E.alternate === null && (E.flags |= 2), E;
    }
    function v(E, k, A, B) {
      return k === null || k.tag !== 6 ? (k = Qa(A, E.mode, B), k.return = E, k) : (k = l(k, A), k.return = E, k);
    }
    function w(E, k, A, B) {
      var J = A.type;
      return J === de ? O(E, k, A.props.children, B, A.key) : k !== null && (k.elementType === J || typeof J == "object" && J !== null && J.$$typeof === Oe && Xc(J) === k.type) ? (B = l(k, A.props), B.ref = ti(E, k, A), B.return = E, B) : (B = Vs(A.type, A.key, A.props, null, E.mode, B), B.ref = ti(E, k, A), B.return = E, B);
    }
    function R(E, k, A, B) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== A.containerInfo || k.stateNode.implementation !== A.implementation ? (k = Za(A, E.mode, B), k.return = E, k) : (k = l(k, A.children || []), k.return = E, k);
    }
    function O(E, k, A, B, J) {
      return k === null || k.tag !== 7 ? (k = Kn(A, E.mode, B, J), k.return = E, k) : (k = l(k, A), k.return = E, k);
    }
    function F(E, k, A) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = Qa("" + k, E.mode, A), k.return = E, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Q:
            return A = Vs(k.type, k.key, k.props, null, E.mode, A), A.ref = ti(E, null, k), A.return = E, A;
          case ie:
            return k = Za(k, E.mode, A), k.return = E, k;
          case Oe:
            var B = k._init;
            return F(E, B(k._payload), A);
        }
        if (_e(k) || Z(k)) return k = Kn(k, E.mode, A, null), k.return = E, k;
        cs(E, k);
      }
      return null;
    }
    function V(E, k, A, B) {
      var J = k !== null ? k.key : null;
      if (typeof A == "string" && A !== "" || typeof A == "number") return J !== null ? null : v(E, k, "" + A, B);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Q:
            return A.key === J ? w(E, k, A, B) : null;
          case ie:
            return A.key === J ? R(E, k, A, B) : null;
          case Oe:
            return J = A._init, V(
              E,
              k,
              J(A._payload),
              B
            );
        }
        if (_e(A) || Z(A)) return J !== null ? null : O(E, k, A, B, null);
        cs(E, A);
      }
      return null;
    }
    function b(E, k, A, B, J) {
      if (typeof B == "string" && B !== "" || typeof B == "number") return E = E.get(A) || null, v(k, E, "" + B, J);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case Q:
            return E = E.get(B.key === null ? A : B.key) || null, w(k, E, B, J);
          case ie:
            return E = E.get(B.key === null ? A : B.key) || null, R(k, E, B, J);
          case Oe:
            var ne = B._init;
            return b(E, k, A, ne(B._payload), J);
        }
        if (_e(B) || Z(B)) return E = E.get(A) || null, O(k, E, B, J, null);
        cs(k, B);
      }
      return null;
    }
    function G(E, k, A, B) {
      for (var J = null, ne = null, re = k, ae = k = 0, et = null; re !== null && ae < A.length; ae++) {
        re.index > ae ? (et = re, re = null) : et = re.sibling;
        var we = V(E, re, A[ae], B);
        if (we === null) {
          re === null && (re = et);
          break;
        }
        e && re && we.alternate === null && t(E, re), k = u(we, k, ae), ne === null ? J = we : ne.sibling = we, ne = we, re = et;
      }
      if (ae === A.length) return i(E, re), Le && On(E, ae), J;
      if (re === null) {
        for (; ae < A.length; ae++) re = F(E, A[ae], B), re !== null && (k = u(re, k, ae), ne === null ? J = re : ne.sibling = re, ne = re);
        return Le && On(E, ae), J;
      }
      for (re = o(E, re); ae < A.length; ae++) et = b(re, E, ae, A[ae], B), et !== null && (e && et.alternate !== null && re.delete(et.key === null ? ae : et.key), k = u(et, k, ae), ne === null ? J = et : ne.sibling = et, ne = et);
      return e && re.forEach(function(Pn) {
        return t(E, Pn);
      }), Le && On(E, ae), J;
    }
    function q(E, k, A, B) {
      var J = Z(A);
      if (typeof J != "function") throw Error(s(150));
      if (A = J.call(A), A == null) throw Error(s(151));
      for (var ne = J = null, re = k, ae = k = 0, et = null, we = A.next(); re !== null && !we.done; ae++, we = A.next()) {
        re.index > ae ? (et = re, re = null) : et = re.sibling;
        var Pn = V(E, re, we.value, B);
        if (Pn === null) {
          re === null && (re = et);
          break;
        }
        e && re && Pn.alternate === null && t(E, re), k = u(Pn, k, ae), ne === null ? J = Pn : ne.sibling = Pn, ne = Pn, re = et;
      }
      if (we.done) return i(
        E,
        re
      ), Le && On(E, ae), J;
      if (re === null) {
        for (; !we.done; ae++, we = A.next()) we = F(E, we.value, B), we !== null && (k = u(we, k, ae), ne === null ? J = we : ne.sibling = we, ne = we);
        return Le && On(E, ae), J;
      }
      for (re = o(E, re); !we.done; ae++, we = A.next()) we = b(re, E, ae, we.value, B), we !== null && (e && we.alternate !== null && re.delete(we.key === null ? ae : we.key), k = u(we, k, ae), ne === null ? J = we : ne.sibling = we, ne = we);
      return e && re.forEach(function(Ey) {
        return t(E, Ey);
      }), Le && On(E, ae), J;
    }
    function $e(E, k, A, B) {
      if (typeof A == "object" && A !== null && A.type === de && A.key === null && (A = A.props.children), typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Q:
            e: {
              for (var J = A.key, ne = k; ne !== null; ) {
                if (ne.key === J) {
                  if (J = A.type, J === de) {
                    if (ne.tag === 7) {
                      i(E, ne.sibling), k = l(ne, A.props.children), k.return = E, E = k;
                      break e;
                    }
                  } else if (ne.elementType === J || typeof J == "object" && J !== null && J.$$typeof === Oe && Xc(J) === ne.type) {
                    i(E, ne.sibling), k = l(ne, A.props), k.ref = ti(E, ne, A), k.return = E, E = k;
                    break e;
                  }
                  i(E, ne);
                  break;
                } else t(E, ne);
                ne = ne.sibling;
              }
              A.type === de ? (k = Kn(A.props.children, E.mode, B, A.key), k.return = E, E = k) : (B = Vs(A.type, A.key, A.props, null, E.mode, B), B.ref = ti(E, k, A), B.return = E, E = B);
            }
            return p(E);
          case ie:
            e: {
              for (ne = A.key; k !== null; ) {
                if (k.key === ne) if (k.tag === 4 && k.stateNode.containerInfo === A.containerInfo && k.stateNode.implementation === A.implementation) {
                  i(E, k.sibling), k = l(k, A.children || []), k.return = E, E = k;
                  break e;
                } else {
                  i(E, k);
                  break;
                }
                else t(E, k);
                k = k.sibling;
              }
              k = Za(A, E.mode, B), k.return = E, E = k;
            }
            return p(E);
          case Oe:
            return ne = A._init, $e(E, k, ne(A._payload), B);
        }
        if (_e(A)) return G(E, k, A, B);
        if (Z(A)) return q(E, k, A, B);
        cs(E, A);
      }
      return typeof A == "string" && A !== "" || typeof A == "number" ? (A = "" + A, k !== null && k.tag === 6 ? (i(E, k.sibling), k = l(k, A), k.return = E, E = k) : (i(E, k), k = Qa(A, E.mode, B), k.return = E, E = k), p(E)) : i(E, k);
    }
    return $e;
  }
  var dr = Qc(!0), Zc = Qc(!1), fs = mn(null), ds = null, pr = null, oa = null;
  function aa() {
    oa = pr = ds = null;
  }
  function la(e) {
    var t = fs.current;
    De(fs), e._currentValue = t;
  }
  function ua(e, t, i) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function hr(e, t) {
    ds = e, oa = pr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (gt = !0), e.firstContext = null);
  }
  function At(e) {
    var t = e._currentValue;
    if (oa !== e) if (e = { context: e, memoizedValue: t, next: null }, pr === null) {
      if (ds === null) throw Error(s(308));
      pr = e, ds.dependencies = { lanes: 0, firstContext: e };
    } else pr = pr.next = e;
    return t;
  }
  var jn = null;
  function ca(e) {
    jn === null ? jn = [e] : jn.push(e);
  }
  function qc(e, t, i, o) {
    var l = t.interleaved;
    return l === null ? (i.next = i, ca(t)) : (i.next = l.next, l.next = i), t.interleaved = i, tn(e, o);
  }
  function tn(e, t) {
    e.lanes |= t;
    var i = e.alternate;
    for (i !== null && (i.lanes |= t), i = e, e = e.return; e !== null; ) e.childLanes |= t, i = e.alternate, i !== null && (i.childLanes |= t), i = e, e = e.return;
    return i.tag === 3 ? i.stateNode : null;
  }
  var vn = !1;
  function fa(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Jc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function nn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xn(e, t, i) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ve & 2) !== 0) {
      var l = o.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), o.pending = t, tn(e, i);
    }
    return l = o.interleaved, l === null ? (t.next = t, ca(o)) : (t.next = l.next, l.next = t), o.interleaved = t, tn(e, i);
  }
  function ps(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194240) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, i |= o, t.lanes = i, Eo(e, i);
    }
  }
  function ef(e, t) {
    var i = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var l = null, u = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var p = { eventTime: i.eventTime, lane: i.lane, tag: i.tag, payload: i.payload, callback: i.callback, next: null };
          u === null ? l = u = p : u = u.next = p, i = i.next;
        } while (i !== null);
        u === null ? l = u = t : u = u.next = t;
      } else l = u = t;
      i = { baseState: o.baseState, firstBaseUpdate: l, lastBaseUpdate: u, shared: o.shared, effects: o.effects }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  function hs(e, t, i, o) {
    var l = e.updateQueue;
    vn = !1;
    var u = l.firstBaseUpdate, p = l.lastBaseUpdate, v = l.shared.pending;
    if (v !== null) {
      l.shared.pending = null;
      var w = v, R = w.next;
      w.next = null, p === null ? u = R : p.next = R, p = w;
      var O = e.alternate;
      O !== null && (O = O.updateQueue, v = O.lastBaseUpdate, v !== p && (v === null ? O.firstBaseUpdate = R : v.next = R, O.lastBaseUpdate = w));
    }
    if (u !== null) {
      var F = l.baseState;
      p = 0, O = R = w = null, v = u;
      do {
        var V = v.lane, b = v.eventTime;
        if ((o & V) === V) {
          O !== null && (O = O.next = {
            eventTime: b,
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          });
          e: {
            var G = e, q = v;
            switch (V = t, b = i, q.tag) {
              case 1:
                if (G = q.payload, typeof G == "function") {
                  F = G.call(b, F, V);
                  break e;
                }
                F = G;
                break e;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = q.payload, V = typeof G == "function" ? G.call(b, F, V) : G, V == null) break e;
                F = $({}, F, V);
                break e;
              case 2:
                vn = !0;
            }
          }
          v.callback !== null && v.lane !== 0 && (e.flags |= 64, V = l.effects, V === null ? l.effects = [v] : V.push(v));
        } else b = { eventTime: b, lane: V, tag: v.tag, payload: v.payload, callback: v.callback, next: null }, O === null ? (R = O = b, w = F) : O = O.next = b, p |= V;
        if (v = v.next, v === null) {
          if (v = l.shared.pending, v === null) break;
          V = v, v = V.next, V.next = null, l.lastBaseUpdate = V, l.shared.pending = null;
        }
      } while (!0);
      if (O === null && (w = F), l.baseState = w, l.firstBaseUpdate = R, l.lastBaseUpdate = O, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          p |= l.lane, l = l.next;
        while (l !== t);
      } else u === null && (l.shared.lanes = 0);
      Bn |= p, e.lanes = p, e.memoizedState = F;
    }
  }
  function tf(e, t, i) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var o = e[t], l = o.callback;
      if (l !== null) {
        if (o.callback = null, o = i, typeof l != "function") throw Error(s(191, l));
        l.call(o);
      }
    }
  }
  var ni = {}, Ht = mn(ni), ri = mn(ni), ii = mn(ni);
  function Fn(e) {
    if (e === ni) throw Error(s(174));
    return e;
  }
  function da(e, t) {
    switch (Ae(ii, t), Ae(ri, e), Ae(Ht, ni), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : po(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = po(t, e);
    }
    De(Ht), Ae(Ht, t);
  }
  function mr() {
    De(Ht), De(ri), De(ii);
  }
  function nf(e) {
    Fn(ii.current);
    var t = Fn(Ht.current), i = po(t, e.type);
    t !== i && (Ae(ri, e), Ae(Ht, i));
  }
  function pa(e) {
    ri.current === e && (De(Ht), De(ri));
  }
  var Ie = mn(0);
  function ms(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || i.data === "$?" || i.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var ha = [];
  function ma() {
    for (var e = 0; e < ha.length; e++) ha[e]._workInProgressVersionPrimary = null;
    ha.length = 0;
  }
  var gs = K.ReactCurrentDispatcher, ga = K.ReactCurrentBatchConfig, zn = 0, Ve = null, Ge = null, qe = null, ys = !1, si = !1, oi = 0, Yg = 0;
  function ot() {
    throw Error(s(321));
  }
  function ya(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++) if (!Ot(e[i], t[i])) return !1;
    return !0;
  }
  function va(e, t, i, o, l, u) {
    if (zn = u, Ve = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, gs.current = e === null || e.memoizedState === null ? Zg : qg, e = i(o, l), si) {
      u = 0;
      do {
        if (si = !1, oi = 0, 25 <= u) throw Error(s(301));
        u += 1, qe = Ge = null, t.updateQueue = null, gs.current = Jg, e = i(o, l);
      } while (si);
    }
    if (gs.current = ws, t = Ge !== null && Ge.next !== null, zn = 0, qe = Ge = Ve = null, ys = !1, t) throw Error(s(300));
    return e;
  }
  function xa() {
    var e = oi !== 0;
    return oi = 0, e;
  }
  function Yt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return qe === null ? Ve.memoizedState = qe = e : qe = qe.next = e, qe;
  }
  function Rt() {
    if (Ge === null) {
      var e = Ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ge.next;
    var t = qe === null ? Ve.memoizedState : qe.next;
    if (t !== null) qe = t, Ge = e;
    else {
      if (e === null) throw Error(s(310));
      Ge = e, e = { memoizedState: Ge.memoizedState, baseState: Ge.baseState, baseQueue: Ge.baseQueue, queue: Ge.queue, next: null }, qe === null ? Ve.memoizedState = qe = e : qe = qe.next = e;
    }
    return qe;
  }
  function ai(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function wa(e) {
    var t = Rt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var o = Ge, l = o.baseQueue, u = i.pending;
    if (u !== null) {
      if (l !== null) {
        var p = l.next;
        l.next = u.next, u.next = p;
      }
      o.baseQueue = l = u, i.pending = null;
    }
    if (l !== null) {
      u = l.next, o = o.baseState;
      var v = p = null, w = null, R = u;
      do {
        var O = R.lane;
        if ((zn & O) === O) w !== null && (w = w.next = { lane: 0, action: R.action, hasEagerState: R.hasEagerState, eagerState: R.eagerState, next: null }), o = R.hasEagerState ? R.eagerState : e(o, R.action);
        else {
          var F = {
            lane: O,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          };
          w === null ? (v = w = F, p = o) : w = w.next = F, Ve.lanes |= O, Bn |= O;
        }
        R = R.next;
      } while (R !== null && R !== u);
      w === null ? p = o : w.next = v, Ot(o, t.memoizedState) || (gt = !0), t.memoizedState = o, t.baseState = p, t.baseQueue = w, i.lastRenderedState = o;
    }
    if (e = i.interleaved, e !== null) {
      l = e;
      do
        u = l.lane, Ve.lanes |= u, Bn |= u, l = l.next;
      while (l !== e);
    } else l === null && (i.lanes = 0);
    return [t.memoizedState, i.dispatch];
  }
  function Sa(e) {
    var t = Rt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var o = i.dispatch, l = i.pending, u = t.memoizedState;
    if (l !== null) {
      i.pending = null;
      var p = l = l.next;
      do
        u = e(u, p.action), p = p.next;
      while (p !== l);
      Ot(u, t.memoizedState) || (gt = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), i.lastRenderedState = u;
    }
    return [u, o];
  }
  function rf() {
  }
  function sf(e, t) {
    var i = Ve, o = Rt(), l = t(), u = !Ot(o.memoizedState, l);
    if (u && (o.memoizedState = l, gt = !0), o = o.queue, ka(lf.bind(null, i, o, e), [e]), o.getSnapshot !== t || u || qe !== null && qe.memoizedState.tag & 1) {
      if (i.flags |= 2048, li(9, af.bind(null, i, o, l, t), void 0, null), Je === null) throw Error(s(349));
      (zn & 30) !== 0 || of(i, t, l);
    }
    return l;
  }
  function of(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ve.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ve.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function af(e, t, i, o) {
    t.value = i, t.getSnapshot = o, uf(t) && cf(e);
  }
  function lf(e, t, i) {
    return i(function() {
      uf(t) && cf(e);
    });
  }
  function uf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Ot(e, i);
    } catch {
      return !0;
    }
  }
  function cf(e) {
    var t = tn(e, 1);
    t !== null && Ut(t, e, 1, -1);
  }
  function ff(e) {
    var t = Yt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ai, lastRenderedState: e }, t.queue = e, e = e.dispatch = Qg.bind(null, Ve, e), [t.memoizedState, e];
  }
  function li(e, t, i, o) {
    return e = { tag: e, create: t, destroy: i, deps: o, next: null }, t = Ve.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ve.updateQueue = t, t.lastEffect = e.next = e) : (i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (o = i.next, i.next = e, e.next = o, t.lastEffect = e)), e;
  }
  function df() {
    return Rt().memoizedState;
  }
  function vs(e, t, i, o) {
    var l = Yt();
    Ve.flags |= e, l.memoizedState = li(1 | t, i, void 0, o === void 0 ? null : o);
  }
  function xs(e, t, i, o) {
    var l = Rt();
    o = o === void 0 ? null : o;
    var u = void 0;
    if (Ge !== null) {
      var p = Ge.memoizedState;
      if (u = p.destroy, o !== null && ya(o, p.deps)) {
        l.memoizedState = li(t, i, u, o);
        return;
      }
    }
    Ve.flags |= e, l.memoizedState = li(1 | t, i, u, o);
  }
  function pf(e, t) {
    return vs(8390656, 8, e, t);
  }
  function ka(e, t) {
    return xs(2048, 8, e, t);
  }
  function hf(e, t) {
    return xs(4, 2, e, t);
  }
  function mf(e, t) {
    return xs(4, 4, e, t);
  }
  function gf(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function yf(e, t, i) {
    return i = i != null ? i.concat([e]) : null, xs(4, 4, gf.bind(null, t, e), i);
  }
  function Ta() {
  }
  function vf(e, t) {
    var i = Rt();
    t = t === void 0 ? null : t;
    var o = i.memoizedState;
    return o !== null && t !== null && ya(t, o[1]) ? o[0] : (i.memoizedState = [e, t], e);
  }
  function xf(e, t) {
    var i = Rt();
    t = t === void 0 ? null : t;
    var o = i.memoizedState;
    return o !== null && t !== null && ya(t, o[1]) ? o[0] : (e = e(), i.memoizedState = [e, t], e);
  }
  function wf(e, t, i) {
    return (zn & 21) === 0 ? (e.baseState && (e.baseState = !1, gt = !0), e.memoizedState = i) : (Ot(i, t) || (i = Xu(), Ve.lanes |= i, Bn |= i, e.baseState = !0), t);
  }
  function Gg(e, t) {
    var i = Te;
    Te = i !== 0 && 4 > i ? i : 4, e(!0);
    var o = ga.transition;
    ga.transition = {};
    try {
      e(!1), t();
    } finally {
      Te = i, ga.transition = o;
    }
  }
  function Sf() {
    return Rt().memoizedState;
  }
  function Xg(e, t, i) {
    var o = Tn(e);
    if (i = { lane: o, action: i, hasEagerState: !1, eagerState: null, next: null }, kf(e)) Tf(t, i);
    else if (i = qc(e, t, i, o), i !== null) {
      var l = ft();
      Ut(i, e, o, l), Cf(i, t, o);
    }
  }
  function Qg(e, t, i) {
    var o = Tn(e), l = { lane: o, action: i, hasEagerState: !1, eagerState: null, next: null };
    if (kf(e)) Tf(t, l);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
        var p = t.lastRenderedState, v = u(p, i);
        if (l.hasEagerState = !0, l.eagerState = v, Ot(v, p)) {
          var w = t.interleaved;
          w === null ? (l.next = l, ca(t)) : (l.next = w.next, w.next = l), t.interleaved = l;
          return;
        }
      } catch {
      }
      i = qc(e, t, l, o), i !== null && (l = ft(), Ut(i, e, o, l), Cf(i, t, o));
    }
  }
  function kf(e) {
    var t = e.alternate;
    return e === Ve || t !== null && t === Ve;
  }
  function Tf(e, t) {
    si = ys = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Cf(e, t, i) {
    if ((i & 4194240) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, i |= o, t.lanes = i, Eo(e, i);
    }
  }
  var ws = { readContext: At, useCallback: ot, useContext: ot, useEffect: ot, useImperativeHandle: ot, useInsertionEffect: ot, useLayoutEffect: ot, useMemo: ot, useReducer: ot, useRef: ot, useState: ot, useDebugValue: ot, useDeferredValue: ot, useTransition: ot, useMutableSource: ot, useSyncExternalStore: ot, useId: ot, unstable_isNewReconciler: !1 }, Zg = { readContext: At, useCallback: function(e, t) {
    return Yt().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: At, useEffect: pf, useImperativeHandle: function(e, t, i) {
    return i = i != null ? i.concat([e]) : null, vs(
      4194308,
      4,
      gf.bind(null, t, e),
      i
    );
  }, useLayoutEffect: function(e, t) {
    return vs(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return vs(4, 2, e, t);
  }, useMemo: function(e, t) {
    var i = Yt();
    return t = t === void 0 ? null : t, e = e(), i.memoizedState = [e, t], e;
  }, useReducer: function(e, t, i) {
    var o = Yt();
    return t = i !== void 0 ? i(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Xg.bind(null, Ve, e), [o.memoizedState, e];
  }, useRef: function(e) {
    var t = Yt();
    return e = { current: e }, t.memoizedState = e;
  }, useState: ff, useDebugValue: Ta, useDeferredValue: function(e) {
    return Yt().memoizedState = e;
  }, useTransition: function() {
    var e = ff(!1), t = e[0];
    return e = Gg.bind(null, e[1]), Yt().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, i) {
    var o = Ve, l = Yt();
    if (Le) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else {
      if (i = t(), Je === null) throw Error(s(349));
      (zn & 30) !== 0 || of(o, t, i);
    }
    l.memoizedState = i;
    var u = { value: i, getSnapshot: t };
    return l.queue = u, pf(lf.bind(
      null,
      o,
      u,
      e
    ), [e]), o.flags |= 2048, li(9, af.bind(null, o, u, i, t), void 0, null), i;
  }, useId: function() {
    var e = Yt(), t = Je.identifierPrefix;
    if (Le) {
      var i = en, o = Jt;
      i = (o & ~(1 << 32 - Nt(o) - 1)).toString(32) + i, t = ":" + t + "R" + i, i = oi++, 0 < i && (t += "H" + i.toString(32)), t += ":";
    } else i = Yg++, t = ":" + t + "r" + i.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, qg = {
    readContext: At,
    useCallback: vf,
    useContext: At,
    useEffect: ka,
    useImperativeHandle: yf,
    useInsertionEffect: hf,
    useLayoutEffect: mf,
    useMemo: xf,
    useReducer: wa,
    useRef: df,
    useState: function() {
      return wa(ai);
    },
    useDebugValue: Ta,
    useDeferredValue: function(e) {
      var t = Rt();
      return wf(t, Ge.memoizedState, e);
    },
    useTransition: function() {
      var e = wa(ai)[0], t = Rt().memoizedState;
      return [e, t];
    },
    useMutableSource: rf,
    useSyncExternalStore: sf,
    useId: Sf,
    unstable_isNewReconciler: !1
  }, Jg = { readContext: At, useCallback: vf, useContext: At, useEffect: ka, useImperativeHandle: yf, useInsertionEffect: hf, useLayoutEffect: mf, useMemo: xf, useReducer: Sa, useRef: df, useState: function() {
    return Sa(ai);
  }, useDebugValue: Ta, useDeferredValue: function(e) {
    var t = Rt();
    return Ge === null ? t.memoizedState = e : wf(t, Ge.memoizedState, e);
  }, useTransition: function() {
    var e = Sa(ai)[0], t = Rt().memoizedState;
    return [e, t];
  }, useMutableSource: rf, useSyncExternalStore: sf, useId: Sf, unstable_isNewReconciler: !1 };
  function Ft(e, t) {
    if (e && e.defaultProps) {
      t = $({}, t), e = e.defaultProps;
      for (var i in e) t[i] === void 0 && (t[i] = e[i]);
      return t;
    }
    return t;
  }
  function Ca(e, t, i, o) {
    t = e.memoizedState, i = i(o, t), i = i == null ? t : $({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Ss = { isMounted: function(e) {
    return (e = e._reactInternals) ? _n(e) === e : !1;
  }, enqueueSetState: function(e, t, i) {
    e = e._reactInternals;
    var o = ft(), l = Tn(e), u = nn(o, l);
    u.payload = t, i != null && (u.callback = i), t = xn(e, u, l), t !== null && (Ut(t, e, l, o), ps(t, e, l));
  }, enqueueReplaceState: function(e, t, i) {
    e = e._reactInternals;
    var o = ft(), l = Tn(e), u = nn(o, l);
    u.tag = 1, u.payload = t, i != null && (u.callback = i), t = xn(e, u, l), t !== null && (Ut(t, e, l, o), ps(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var i = ft(), o = Tn(e), l = nn(i, o);
    l.tag = 2, t != null && (l.callback = t), t = xn(e, l, o), t !== null && (Ut(t, e, o, i), ps(t, e, o));
  } };
  function Ef(e, t, i, o, l, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Gr(i, o) || !Gr(l, u) : !0;
  }
  function Pf(e, t, i) {
    var o = !1, l = gn, u = t.contextType;
    return typeof u == "object" && u !== null ? u = At(u) : (l = mt(t) ? Vn : st.current, o = t.contextTypes, u = (o = o != null) ? lr(e, l) : gn), t = new t(i, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ss, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = u), t;
  }
  function Af(e, t, i, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o), t.state !== e && Ss.enqueueReplaceState(t, t.state, null);
  }
  function Ea(e, t, i, o) {
    var l = e.stateNode;
    l.props = i, l.state = e.memoizedState, l.refs = {}, fa(e);
    var u = t.contextType;
    typeof u == "object" && u !== null ? l.context = At(u) : (u = mt(t) ? Vn : st.current, l.context = lr(e, u)), l.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (Ca(e, t, u, i), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Ss.enqueueReplaceState(l, l.state, null), hs(e, i, l, o), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function gr(e, t) {
    try {
      var i = "", o = t;
      do
        i += pe(o), o = o.return;
      while (o);
      var l = i;
    } catch (u) {
      l = `
Error generating stack: ` + u.message + `
` + u.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Pa(e, t, i) {
    return { value: e, source: null, stack: i ?? null, digest: t ?? null };
  }
  function Aa(e, t) {
    try {
      console.error(t.value);
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  var ey = typeof WeakMap == "function" ? WeakMap : Map;
  function Rf(e, t, i) {
    i = nn(-1, i), i.tag = 3, i.payload = { element: null };
    var o = t.value;
    return i.callback = function() {
      Rs || (Rs = !0, $a = o), Aa(e, t);
    }, i;
  }
  function Mf(e, t, i) {
    i = nn(-1, i), i.tag = 3;
    var o = e.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var l = t.value;
      i.payload = function() {
        return o(l);
      }, i.callback = function() {
        Aa(e, t);
      };
    }
    var u = e.stateNode;
    return u !== null && typeof u.componentDidCatch == "function" && (i.callback = function() {
      Aa(e, t), typeof o != "function" && (Sn === null ? Sn = /* @__PURE__ */ new Set([this]) : Sn.add(this));
      var p = t.stack;
      this.componentDidCatch(t.value, { componentStack: p !== null ? p : "" });
    }), i;
  }
  function Df(e, t, i) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new ey();
      var l = /* @__PURE__ */ new Set();
      o.set(t, l);
    } else l = o.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), o.set(t, l));
    l.has(i) || (l.add(i), e = hy.bind(null, e, t, i), t.then(e, e));
  }
  function Lf(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function _f(e, t, i, o, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, i.flags |= 131072, i.flags &= -52805, i.tag === 1 && (i.alternate === null ? i.tag = 17 : (t = nn(-1, 1), t.tag = 2, xn(i, t, 1))), i.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var ty = K.ReactCurrentOwner, gt = !1;
  function ct(e, t, i, o) {
    t.child = e === null ? Zc(t, null, i, o) : dr(t, e.child, i, o);
  }
  function If(e, t, i, o, l) {
    i = i.render;
    var u = t.ref;
    return hr(t, l), o = va(e, t, i, o, u, l), i = xa(), e !== null && !gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rn(e, t, l)) : (Le && i && ta(t), t.flags |= 1, ct(e, t, o, l), t.child);
  }
  function Vf(e, t, i, o, l) {
    if (e === null) {
      var u = i.type;
      return typeof u == "function" && !Xa(u) && u.defaultProps === void 0 && i.compare === null && i.defaultProps === void 0 ? (t.tag = 15, t.type = u, Nf(e, t, u, o, l)) : (e = Vs(i.type, null, o, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, (e.lanes & l) === 0) {
      var p = u.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Gr, i(p, o) && e.ref === t.ref) return rn(e, t, l);
    }
    return t.flags |= 1, e = En(u, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Nf(e, t, i, o, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Gr(u, o) && e.ref === t.ref) if (gt = !1, t.pendingProps = o = u, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (gt = !0);
      else return t.lanes = e.lanes, rn(e, t, l);
    }
    return Ra(e, t, i, o, l);
  }
  function Of(e, t, i) {
    var o = t.pendingProps, l = o.children, u = e !== null ? e.memoizedState : null;
    if (o.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ae(vr, Tt), Tt |= i;
    else {
      if ((i & 1073741824) === 0) return e = u !== null ? u.baseLanes | i : i, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ae(vr, Tt), Tt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : i, Ae(vr, Tt), Tt |= o;
    }
    else u !== null ? (o = u.baseLanes | i, t.memoizedState = null) : o = i, Ae(vr, Tt), Tt |= o;
    return ct(e, t, l, i), t.child;
  }
  function jf(e, t) {
    var i = t.ref;
    (e === null && i !== null || e !== null && e.ref !== i) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Ra(e, t, i, o, l) {
    var u = mt(i) ? Vn : st.current;
    return u = lr(t, u), hr(t, l), i = va(e, t, i, o, u, l), o = xa(), e !== null && !gt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rn(e, t, l)) : (Le && o && ta(t), t.flags |= 1, ct(e, t, i, l), t.child);
  }
  function Ff(e, t, i, o, l) {
    if (mt(i)) {
      var u = !0;
      ss(t);
    } else u = !1;
    if (hr(t, l), t.stateNode === null) Ts(e, t), Pf(t, i, o), Ea(t, i, o, l), o = !0;
    else if (e === null) {
      var p = t.stateNode, v = t.memoizedProps;
      p.props = v;
      var w = p.context, R = i.contextType;
      typeof R == "object" && R !== null ? R = At(R) : (R = mt(i) ? Vn : st.current, R = lr(t, R));
      var O = i.getDerivedStateFromProps, F = typeof O == "function" || typeof p.getSnapshotBeforeUpdate == "function";
      F || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (v !== o || w !== R) && Af(t, p, o, R), vn = !1;
      var V = t.memoizedState;
      p.state = V, hs(t, o, p, l), w = t.memoizedState, v !== o || V !== w || ht.current || vn ? (typeof O == "function" && (Ca(t, i, O, o), w = t.memoizedState), (v = vn || Ef(t, i, v, o, V, w, R)) ? (F || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount()), typeof p.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof p.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = w), p.props = o, p.state = w, p.context = R, o = v) : (typeof p.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      p = t.stateNode, Jc(e, t), v = t.memoizedProps, R = t.type === t.elementType ? v : Ft(t.type, v), p.props = R, F = t.pendingProps, V = p.context, w = i.contextType, typeof w == "object" && w !== null ? w = At(w) : (w = mt(i) ? Vn : st.current, w = lr(t, w));
      var b = i.getDerivedStateFromProps;
      (O = typeof b == "function" || typeof p.getSnapshotBeforeUpdate == "function") || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (v !== F || V !== w) && Af(t, p, o, w), vn = !1, V = t.memoizedState, p.state = V, hs(t, o, p, l);
      var G = t.memoizedState;
      v !== F || V !== G || ht.current || vn ? (typeof b == "function" && (Ca(t, i, b, o), G = t.memoizedState), (R = vn || Ef(t, i, R, o, V, G, w) || !1) ? (O || typeof p.UNSAFE_componentWillUpdate != "function" && typeof p.componentWillUpdate != "function" || (typeof p.componentWillUpdate == "function" && p.componentWillUpdate(o, G, w), typeof p.UNSAFE_componentWillUpdate == "function" && p.UNSAFE_componentWillUpdate(o, G, w)), typeof p.componentDidUpdate == "function" && (t.flags |= 4), typeof p.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof p.componentDidUpdate != "function" || v === e.memoizedProps && V === e.memoizedState || (t.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && V === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = G), p.props = o, p.state = G, p.context = w, o = R) : (typeof p.componentDidUpdate != "function" || v === e.memoizedProps && V === e.memoizedState || (t.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || v === e.memoizedProps && V === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return Ma(e, t, i, o, u, l);
  }
  function Ma(e, t, i, o, l, u) {
    jf(e, t);
    var p = (t.flags & 128) !== 0;
    if (!o && !p) return l && $c(t, i, !1), rn(e, t, u);
    o = t.stateNode, ty.current = t;
    var v = p && typeof i.getDerivedStateFromError != "function" ? null : o.render();
    return t.flags |= 1, e !== null && p ? (t.child = dr(t, e.child, null, u), t.child = dr(t, null, v, u)) : ct(e, t, v, u), t.memoizedState = o.state, l && $c(t, i, !0), t.child;
  }
  function zf(e) {
    var t = e.stateNode;
    t.pendingContext ? Bc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Bc(e, t.context, !1), da(e, t.containerInfo);
  }
  function Bf(e, t, i, o, l) {
    return fr(), sa(l), t.flags |= 256, ct(e, t, i, o), t.child;
  }
  var Da = { dehydrated: null, treeContext: null, retryLane: 0 };
  function La(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Uf(e, t, i) {
    var o = t.pendingProps, l = Ie.current, u = !1, p = (t.flags & 128) !== 0, v;
    if ((v = p) || (v = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), v ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ae(Ie, l & 1), e === null)
      return ia(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (p = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, p = { mode: "hidden", children: p }, (o & 1) === 0 && u !== null ? (u.childLanes = 0, u.pendingProps = p) : u = Ns(p, o, 0, null), e = Kn(e, o, i, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = La(i), t.memoizedState = Da, e) : _a(t, p));
    if (l = e.memoizedState, l !== null && (v = l.dehydrated, v !== null)) return ny(e, t, p, o, v, l, i);
    if (u) {
      u = o.fallback, p = t.mode, l = e.child, v = l.sibling;
      var w = { mode: "hidden", children: o.children };
      return (p & 1) === 0 && t.child !== l ? (o = t.child, o.childLanes = 0, o.pendingProps = w, t.deletions = null) : (o = En(l, w), o.subtreeFlags = l.subtreeFlags & 14680064), v !== null ? u = En(v, u) : (u = Kn(u, p, i, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, p = e.child.memoizedState, p = p === null ? La(i) : { baseLanes: p.baseLanes | i, cachePool: null, transitions: p.transitions }, u.memoizedState = p, u.childLanes = e.childLanes & ~i, t.memoizedState = Da, o;
    }
    return u = e.child, e = u.sibling, o = En(u, { mode: "visible", children: o.children }), (t.mode & 1) === 0 && (o.lanes = i), o.return = t, o.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = o, t.memoizedState = null, o;
  }
  function _a(e, t) {
    return t = Ns({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function ks(e, t, i, o) {
    return o !== null && sa(o), dr(t, e.child, null, i), e = _a(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function ny(e, t, i, o, l, u, p) {
    if (i)
      return t.flags & 256 ? (t.flags &= -257, o = Pa(Error(s(422))), ks(e, t, p, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, l = t.mode, o = Ns({ mode: "visible", children: o.children }, l, 0, null), u = Kn(u, l, p, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & 1) !== 0 && dr(t, e.child, null, p), t.child.memoizedState = La(p), t.memoizedState = Da, u);
    if ((t.mode & 1) === 0) return ks(e, t, p, null);
    if (l.data === "$!") {
      if (o = l.nextSibling && l.nextSibling.dataset, o) var v = o.dgst;
      return o = v, u = Error(s(419)), o = Pa(u, o, void 0), ks(e, t, p, o);
    }
    if (v = (p & e.childLanes) !== 0, gt || v) {
      if (o = Je, o !== null) {
        switch (p & -p) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (o.suspendedLanes | p)) !== 0 ? 0 : l, l !== 0 && l !== u.retryLane && (u.retryLane = l, tn(e, l), Ut(o, e, l, -1));
      }
      return Ga(), o = Pa(Error(s(421))), ks(e, t, p, o);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = my.bind(null, e), l._reactRetry = t, null) : (e = u.treeContext, kt = hn(l.nextSibling), St = t, Le = !0, jt = null, e !== null && (Et[Pt++] = Jt, Et[Pt++] = en, Et[Pt++] = Nn, Jt = e.id, en = e.overflow, Nn = t), t = _a(t, o.children), t.flags |= 4096, t);
  }
  function $f(e, t, i) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ua(e.return, t, i);
  }
  function Ia(e, t, i, o, l) {
    var u = e.memoizedState;
    u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: i, tailMode: l } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = i, u.tailMode = l);
  }
  function Wf(e, t, i) {
    var o = t.pendingProps, l = o.revealOrder, u = o.tail;
    if (ct(e, t, o.children, i), o = Ie.current, (o & 2) !== 0) o = o & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && $f(e, i, t);
        else if (e.tag === 19) $f(e, i, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      o &= 1;
    }
    if (Ae(Ie, o), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (i = t.child, l = null; i !== null; ) e = i.alternate, e !== null && ms(e) === null && (l = i), i = i.sibling;
        i = l, i === null ? (l = t.child, t.child = null) : (l = i.sibling, i.sibling = null), Ia(t, !1, l, i, u);
        break;
      case "backwards":
        for (i = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ms(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = i, i = l, l = e;
        }
        Ia(t, !0, i, null, u);
        break;
      case "together":
        Ia(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ts(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function rn(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Bn |= t.lanes, (i & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, i = En(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; ) e = e.sibling, i = i.sibling = En(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function ry(e, t, i) {
    switch (t.tag) {
      case 3:
        zf(t), fr();
        break;
      case 5:
        nf(t);
        break;
      case 1:
        mt(t.type) && ss(t);
        break;
      case 4:
        da(t, t.stateNode.containerInfo);
        break;
      case 10:
        var o = t.type._context, l = t.memoizedProps.value;
        Ae(fs, o._currentValue), o._currentValue = l;
        break;
      case 13:
        if (o = t.memoizedState, o !== null)
          return o.dehydrated !== null ? (Ae(Ie, Ie.current & 1), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Uf(e, t, i) : (Ae(Ie, Ie.current & 1), e = rn(e, t, i), e !== null ? e.sibling : null);
        Ae(Ie, Ie.current & 1);
        break;
      case 19:
        if (o = (i & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (o) return Wf(e, t, i);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ae(Ie, Ie.current), o) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Of(e, t, i);
    }
    return rn(e, t, i);
  }
  var Kf, Va, bf, Hf;
  Kf = function(e, t) {
    for (var i = t.child; i !== null; ) {
      if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
      else if (i.tag !== 4 && i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === t) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === t) return;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
  }, Va = function() {
  }, bf = function(e, t, i, o) {
    var l = e.memoizedProps;
    if (l !== o) {
      e = t.stateNode, Fn(Ht.current);
      var u = null;
      switch (i) {
        case "input":
          l = ee(e, l), o = ee(e, o), u = [];
          break;
        case "select":
          l = $({}, l, { value: void 0 }), o = $({}, o, { value: void 0 }), u = [];
          break;
        case "textarea":
          l = Vt(e, l), o = Vt(e, o), u = [];
          break;
        default:
          typeof l.onClick != "function" && typeof o.onClick == "function" && (e.onclick = ns);
      }
      ho(i, o);
      var p;
      i = null;
      for (R in l) if (!o.hasOwnProperty(R) && l.hasOwnProperty(R) && l[R] != null) if (R === "style") {
        var v = l[R];
        for (p in v) v.hasOwnProperty(p) && (i || (i = {}), i[p] = "");
      } else R !== "dangerouslySetInnerHTML" && R !== "children" && R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && R !== "autoFocus" && (c.hasOwnProperty(R) ? u || (u = []) : (u = u || []).push(R, null));
      for (R in o) {
        var w = o[R];
        if (v = l?.[R], o.hasOwnProperty(R) && w !== v && (w != null || v != null)) if (R === "style") if (v) {
          for (p in v) !v.hasOwnProperty(p) || w && w.hasOwnProperty(p) || (i || (i = {}), i[p] = "");
          for (p in w) w.hasOwnProperty(p) && v[p] !== w[p] && (i || (i = {}), i[p] = w[p]);
        } else i || (u || (u = []), u.push(
          R,
          i
        )), i = w;
        else R === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, v = v ? v.__html : void 0, w != null && v !== w && (u = u || []).push(R, w)) : R === "children" ? typeof w != "string" && typeof w != "number" || (u = u || []).push(R, "" + w) : R !== "suppressContentEditableWarning" && R !== "suppressHydrationWarning" && (c.hasOwnProperty(R) ? (w != null && R === "onScroll" && Me("scroll", e), u || v === w || (u = [])) : (u = u || []).push(R, w));
      }
      i && (u = u || []).push("style", i);
      var R = u;
      (t.updateQueue = R) && (t.flags |= 4);
    }
  }, Hf = function(e, t, i, o) {
    i !== o && (t.flags |= 4);
  };
  function ui(e, t) {
    if (!Le) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var i = null; t !== null; ) t.alternate !== null && (i = t), t = t.sibling;
        i === null ? e.tail = null : i.sibling = null;
        break;
      case "collapsed":
        i = e.tail;
        for (var o = null; i !== null; ) i.alternate !== null && (o = i), i = i.sibling;
        o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
    }
  }
  function at(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, o = 0;
    if (t) for (var l = e.child; l !== null; ) i |= l.lanes | l.childLanes, o |= l.subtreeFlags & 14680064, o |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) i |= l.lanes | l.childLanes, o |= l.subtreeFlags, o |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= o, e.childLanes = i, t;
  }
  function iy(e, t, i) {
    var o = t.pendingProps;
    switch (na(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return at(t), null;
      case 1:
        return mt(t.type) && is(), at(t), null;
      case 3:
        return o = t.stateNode, mr(), De(ht), De(st), ma(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (us(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, jt !== null && (ba(jt), jt = null))), Va(e, t), at(t), null;
      case 5:
        pa(t);
        var l = Fn(ii.current);
        if (i = t.type, e !== null && t.stateNode != null) bf(e, t, i, o, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!o) {
            if (t.stateNode === null) throw Error(s(166));
            return at(t), null;
          }
          if (e = Fn(Ht.current), us(t)) {
            o = t.stateNode, i = t.type;
            var u = t.memoizedProps;
            switch (o[bt] = t, o[Jr] = u, e = (t.mode & 1) !== 0, i) {
              case "dialog":
                Me("cancel", o), Me("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Me("load", o);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Qr.length; l++) Me(Qr[l], o);
                break;
              case "source":
                Me("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Me(
                  "error",
                  o
                ), Me("load", o);
                break;
              case "details":
                Me("toggle", o);
                break;
              case "input":
                ge(o, u), Me("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!u.multiple }, Me("invalid", o);
                break;
              case "textarea":
                Dr(o, u), Me("invalid", o);
            }
            ho(i, u), l = null;
            for (var p in u) if (u.hasOwnProperty(p)) {
              var v = u[p];
              p === "children" ? typeof v == "string" ? o.textContent !== v && (u.suppressHydrationWarning !== !0 && ts(o.textContent, v, e), l = ["children", v]) : typeof v == "number" && o.textContent !== "" + v && (u.suppressHydrationWarning !== !0 && ts(
                o.textContent,
                v,
                e
              ), l = ["children", "" + v]) : c.hasOwnProperty(p) && v != null && p === "onScroll" && Me("scroll", o);
            }
            switch (i) {
              case "input":
                U(o), xe(o, u, !0);
                break;
              case "textarea":
                U(o), Du(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof u.onClick == "function" && (o.onclick = ns);
            }
            o = l, t.updateQueue = o, o !== null && (t.flags |= 4);
          } else {
            p = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Lu(i)), e === "http://www.w3.org/1999/xhtml" ? i === "script" ? (e = p.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = p.createElement(i, { is: o.is }) : (e = p.createElement(i), i === "select" && (p = e, o.multiple ? p.multiple = !0 : o.size && (p.size = o.size))) : e = p.createElementNS(e, i), e[bt] = t, e[Jr] = o, Kf(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (p = mo(i, o), i) {
                case "dialog":
                  Me("cancel", e), Me("close", e), l = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Me("load", e), l = o;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < Qr.length; l++) Me(Qr[l], e);
                  l = o;
                  break;
                case "source":
                  Me("error", e), l = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Me(
                    "error",
                    e
                  ), Me("load", e), l = o;
                  break;
                case "details":
                  Me("toggle", e), l = o;
                  break;
                case "input":
                  ge(e, o), l = ee(e, o), Me("invalid", e);
                  break;
                case "option":
                  l = o;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!o.multiple }, l = $({}, o, { value: void 0 }), Me("invalid", e);
                  break;
                case "textarea":
                  Dr(e, o), l = Vt(e, o), Me("invalid", e);
                  break;
                default:
                  l = o;
              }
              ho(i, l), v = l;
              for (u in v) if (v.hasOwnProperty(u)) {
                var w = v[u];
                u === "style" ? Vu(e, w) : u === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && _u(e, w)) : u === "children" ? typeof w == "string" ? (i !== "textarea" || w !== "") && Lr(e, w) : typeof w == "number" && Lr(e, "" + w) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (c.hasOwnProperty(u) ? w != null && u === "onScroll" && Me("scroll", e) : w != null && _(e, u, w, p));
              }
              switch (i) {
                case "input":
                  U(e), xe(e, o, !1);
                  break;
                case "textarea":
                  U(e), Du(e);
                  break;
                case "option":
                  o.value != null && e.setAttribute("value", "" + ye(o.value));
                  break;
                case "select":
                  e.multiple = !!o.multiple, u = o.value, u != null ? Be(e, !!o.multiple, u, !1) : o.defaultValue != null && Be(
                    e,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = ns);
              }
              switch (i) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return at(t), null;
      case 6:
        if (e && t.stateNode != null) Hf(e, t, e.memoizedProps, o);
        else {
          if (typeof o != "string" && t.stateNode === null) throw Error(s(166));
          if (i = Fn(ii.current), Fn(Ht.current), us(t)) {
            if (o = t.stateNode, i = t.memoizedProps, o[bt] = t, (u = o.nodeValue !== i) && (e = St, e !== null)) switch (e.tag) {
              case 3:
                ts(o.nodeValue, i, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && ts(o.nodeValue, i, (e.mode & 1) !== 0);
            }
            u && (t.flags |= 4);
          } else o = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(o), o[bt] = t, t.stateNode = o;
        }
        return at(t), null;
      case 13:
        if (De(Ie), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Le && kt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Gc(), fr(), t.flags |= 98560, u = !1;
          else if (u = us(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[bt] = t;
            } else fr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            at(t), u = !1;
          } else jt !== null && (ba(jt), jt = null), u = !0;
          if (!u) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = i, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (Ie.current & 1) !== 0 ? Xe === 0 && (Xe = 3) : Ga())), t.updateQueue !== null && (t.flags |= 4), at(t), null);
      case 4:
        return mr(), Va(e, t), e === null && Zr(t.stateNode.containerInfo), at(t), null;
      case 10:
        return la(t.type._context), at(t), null;
      case 17:
        return mt(t.type) && is(), at(t), null;
      case 19:
        if (De(Ie), u = t.memoizedState, u === null) return at(t), null;
        if (o = (t.flags & 128) !== 0, p = u.rendering, p === null) if (o) ui(u, !1);
        else {
          if (Xe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (p = ms(e), p !== null) {
              for (t.flags |= 128, ui(u, !1), o = p.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = i, i = t.child; i !== null; ) u = i, e = o, u.flags &= 14680066, p = u.alternate, p === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = p.childLanes, u.lanes = p.lanes, u.child = p.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = p.memoizedProps, u.memoizedState = p.memoizedState, u.updateQueue = p.updateQueue, u.type = p.type, e = p.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), i = i.sibling;
              return Ae(Ie, Ie.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          u.tail !== null && Ue() > xr && (t.flags |= 128, o = !0, ui(u, !1), t.lanes = 4194304);
        }
        else {
          if (!o) if (e = ms(p), e !== null) {
            if (t.flags |= 128, o = !0, i = e.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), ui(u, !0), u.tail === null && u.tailMode === "hidden" && !p.alternate && !Le) return at(t), null;
          } else 2 * Ue() - u.renderingStartTime > xr && i !== 1073741824 && (t.flags |= 128, o = !0, ui(u, !1), t.lanes = 4194304);
          u.isBackwards ? (p.sibling = t.child, t.child = p) : (i = u.last, i !== null ? i.sibling = p : t.child = p, u.last = p);
        }
        return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = Ue(), t.sibling = null, i = Ie.current, Ae(Ie, o ? i & 1 | 2 : i & 1), t) : (at(t), null);
      case 22:
      case 23:
        return Ya(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && (t.mode & 1) !== 0 ? (Tt & 1073741824) !== 0 && (at(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : at(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function sy(e, t) {
    switch (na(t), t.tag) {
      case 1:
        return mt(t.type) && is(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return mr(), De(ht), De(st), ma(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return pa(t), null;
      case 13:
        if (De(Ie), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          fr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return De(Ie), null;
      case 4:
        return mr(), null;
      case 10:
        return la(t.type._context), null;
      case 22:
      case 23:
        return Ya(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Cs = !1, lt = !1, oy = typeof WeakSet == "function" ? WeakSet : Set, H = null;
  function yr(e, t) {
    var i = e.ref;
    if (i !== null) if (typeof i == "function") try {
      i(null);
    } catch (o) {
      je(e, t, o);
    }
    else i.current = null;
  }
  function Na(e, t, i) {
    try {
      i();
    } catch (o) {
      je(e, t, o);
    }
  }
  var Yf = !1;
  function ay(e, t) {
    if (Yo = Ki, e = Cc(), zo(e)) {
      if ("selectionStart" in e) var i = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        i = (i = e.ownerDocument) && i.defaultView || window;
        var o = i.getSelection && i.getSelection();
        if (o && o.rangeCount !== 0) {
          i = o.anchorNode;
          var l = o.anchorOffset, u = o.focusNode;
          o = o.focusOffset;
          try {
            i.nodeType, u.nodeType;
          } catch {
            i = null;
            break e;
          }
          var p = 0, v = -1, w = -1, R = 0, O = 0, F = e, V = null;
          t: for (; ; ) {
            for (var b; F !== i || l !== 0 && F.nodeType !== 3 || (v = p + l), F !== u || o !== 0 && F.nodeType !== 3 || (w = p + o), F.nodeType === 3 && (p += F.nodeValue.length), (b = F.firstChild) !== null; )
              V = F, F = b;
            for (; ; ) {
              if (F === e) break t;
              if (V === i && ++R === l && (v = p), V === u && ++O === o && (w = p), (b = F.nextSibling) !== null) break;
              F = V, V = F.parentNode;
            }
            F = b;
          }
          i = v === -1 || w === -1 ? null : { start: v, end: w };
        } else i = null;
      }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Go = { focusedElem: e, selectionRange: i }, Ki = !1, H = t; H !== null; ) if (t = H, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, H = e;
    else for (; H !== null; ) {
      t = H;
      try {
        var G = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (G !== null) {
              var q = G.memoizedProps, $e = G.memoizedState, E = t.stateNode, k = E.getSnapshotBeforeUpdate(t.elementType === t.type ? q : Ft(t.type, q), $e);
              E.__reactInternalSnapshotBeforeUpdate = k;
            }
            break;
          case 3:
            var A = t.stateNode.containerInfo;
            A.nodeType === 1 ? A.textContent = "" : A.nodeType === 9 && A.documentElement && A.removeChild(A.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (B) {
        je(t, t.return, B);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, H = e;
        break;
      }
      H = t.return;
    }
    return G = Yf, Yf = !1, G;
  }
  function ci(e, t, i) {
    var o = t.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var l = o = o.next;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && Na(t, i, u);
        }
        l = l.next;
      } while (l !== o);
    }
  }
  function Es(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var i = t = t.next;
      do {
        if ((i.tag & e) === e) {
          var o = i.create;
          i.destroy = o();
        }
        i = i.next;
      } while (i !== t);
    }
  }
  function Oa(e) {
    var t = e.ref;
    if (t !== null) {
      var i = e.stateNode;
      e.tag, e = i, typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Gf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Gf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[bt], delete t[Jr], delete t[qo], delete t[Wg], delete t[Kg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Xf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Qf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Xf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ja(e, t, i) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? i.nodeType === 8 ? i.parentNode.insertBefore(e, t) : i.insertBefore(e, t) : (i.nodeType === 8 ? (t = i.parentNode, t.insertBefore(e, i)) : (t = i, t.appendChild(e)), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = ns));
    else if (o !== 4 && (e = e.child, e !== null)) for (ja(e, t, i), e = e.sibling; e !== null; ) ja(e, t, i), e = e.sibling;
  }
  function Fa(e, t, i) {
    var o = e.tag;
    if (o === 5 || o === 6) e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (o !== 4 && (e = e.child, e !== null)) for (Fa(e, t, i), e = e.sibling; e !== null; ) Fa(e, t, i), e = e.sibling;
  }
  var nt = null, zt = !1;
  function wn(e, t, i) {
    for (i = i.child; i !== null; ) Zf(e, t, i), i = i.sibling;
  }
  function Zf(e, t, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function") try {
      Kt.onCommitFiberUnmount(Fi, i);
    } catch {
    }
    switch (i.tag) {
      case 5:
        lt || yr(i, t);
      case 6:
        var o = nt, l = zt;
        nt = null, wn(e, t, i), nt = o, zt = l, nt !== null && (zt ? (e = nt, i = i.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(i) : e.removeChild(i)) : nt.removeChild(i.stateNode));
        break;
      case 18:
        nt !== null && (zt ? (e = nt, i = i.stateNode, e.nodeType === 8 ? Zo(e.parentNode, i) : e.nodeType === 1 && Zo(e, i), $r(e)) : Zo(nt, i.stateNode));
        break;
      case 4:
        o = nt, l = zt, nt = i.stateNode.containerInfo, zt = !0, wn(e, t, i), nt = o, zt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!lt && (o = i.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          l = o = o.next;
          do {
            var u = l, p = u.destroy;
            u = u.tag, p !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && Na(i, t, p), l = l.next;
          } while (l !== o);
        }
        wn(e, t, i);
        break;
      case 1:
        if (!lt && (yr(i, t), o = i.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = i.memoizedProps, o.state = i.memoizedState, o.componentWillUnmount();
        } catch (v) {
          je(i, t, v);
        }
        wn(e, t, i);
        break;
      case 21:
        wn(e, t, i);
        break;
      case 22:
        i.mode & 1 ? (lt = (o = lt) || i.memoizedState !== null, wn(e, t, i), lt = o) : wn(e, t, i);
        break;
      default:
        wn(e, t, i);
    }
  }
  function qf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var i = e.stateNode;
      i === null && (i = e.stateNode = new oy()), t.forEach(function(o) {
        var l = gy.bind(null, e, o);
        i.has(o) || (i.add(o), o.then(l, l));
      });
    }
  }
  function Bt(e, t) {
    var i = t.deletions;
    if (i !== null) for (var o = 0; o < i.length; o++) {
      var l = i[o];
      try {
        var u = e, p = t, v = p;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 5:
              nt = v.stateNode, zt = !1;
              break e;
            case 3:
              nt = v.stateNode.containerInfo, zt = !0;
              break e;
            case 4:
              nt = v.stateNode.containerInfo, zt = !0;
              break e;
          }
          v = v.return;
        }
        if (nt === null) throw Error(s(160));
        Zf(u, p, l), nt = null, zt = !1;
        var w = l.alternate;
        w !== null && (w.return = null), l.return = null;
      } catch (R) {
        je(l, t, R);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Jf(t, e), t = t.sibling;
  }
  function Jf(e, t) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Bt(t, e), Gt(e), o & 4) {
          try {
            ci(3, e, e.return), Es(3, e);
          } catch (q) {
            je(e, e.return, q);
          }
          try {
            ci(5, e, e.return);
          } catch (q) {
            je(e, e.return, q);
          }
        }
        break;
      case 1:
        Bt(t, e), Gt(e), o & 512 && i !== null && yr(i, i.return);
        break;
      case 5:
        if (Bt(t, e), Gt(e), o & 512 && i !== null && yr(i, i.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Lr(l, "");
          } catch (q) {
            je(e, e.return, q);
          }
        }
        if (o & 4 && (l = e.stateNode, l != null)) {
          var u = e.memoizedProps, p = i !== null ? i.memoizedProps : u, v = e.type, w = e.updateQueue;
          if (e.updateQueue = null, w !== null) try {
            v === "input" && u.type === "radio" && u.name != null && fe(l, u), mo(v, p);
            var R = mo(v, u);
            for (p = 0; p < w.length; p += 2) {
              var O = w[p], F = w[p + 1];
              O === "style" ? Vu(l, F) : O === "dangerouslySetInnerHTML" ? _u(l, F) : O === "children" ? Lr(l, F) : _(l, O, F, R);
            }
            switch (v) {
              case "input":
                se(l, u);
                break;
              case "textarea":
                Mu(l, u);
                break;
              case "select":
                var V = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!u.multiple;
                var b = u.value;
                b != null ? Be(l, !!u.multiple, b, !1) : V !== !!u.multiple && (u.defaultValue != null ? Be(
                  l,
                  !!u.multiple,
                  u.defaultValue,
                  !0
                ) : Be(l, !!u.multiple, u.multiple ? [] : "", !1));
            }
            l[Jr] = u;
          } catch (q) {
            je(e, e.return, q);
          }
        }
        break;
      case 6:
        if (Bt(t, e), Gt(e), o & 4) {
          if (e.stateNode === null) throw Error(s(162));
          l = e.stateNode, u = e.memoizedProps;
          try {
            l.nodeValue = u;
          } catch (q) {
            je(e, e.return, q);
          }
        }
        break;
      case 3:
        if (Bt(t, e), Gt(e), o & 4 && i !== null && i.memoizedState.isDehydrated) try {
          $r(t.containerInfo);
        } catch (q) {
          je(e, e.return, q);
        }
        break;
      case 4:
        Bt(t, e), Gt(e);
        break;
      case 13:
        Bt(t, e), Gt(e), l = e.child, l.flags & 8192 && (u = l.memoizedState !== null, l.stateNode.isHidden = u, !u || l.alternate !== null && l.alternate.memoizedState !== null || (Ua = Ue())), o & 4 && qf(e);
        break;
      case 22:
        if (O = i !== null && i.memoizedState !== null, e.mode & 1 ? (lt = (R = lt) || O, Bt(t, e), lt = R) : Bt(t, e), Gt(e), o & 8192) {
          if (R = e.memoizedState !== null, (e.stateNode.isHidden = R) && !O && (e.mode & 1) !== 0) for (H = e, O = e.child; O !== null; ) {
            for (F = H = O; H !== null; ) {
              switch (V = H, b = V.child, V.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ci(4, V, V.return);
                  break;
                case 1:
                  yr(V, V.return);
                  var G = V.stateNode;
                  if (typeof G.componentWillUnmount == "function") {
                    o = V, i = V.return;
                    try {
                      t = o, G.props = t.memoizedProps, G.state = t.memoizedState, G.componentWillUnmount();
                    } catch (q) {
                      je(o, i, q);
                    }
                  }
                  break;
                case 5:
                  yr(V, V.return);
                  break;
                case 22:
                  if (V.memoizedState !== null) {
                    nd(F);
                    continue;
                  }
              }
              b !== null ? (b.return = V, H = b) : nd(F);
            }
            O = O.sibling;
          }
          e: for (O = null, F = e; ; ) {
            if (F.tag === 5) {
              if (O === null) {
                O = F;
                try {
                  l = F.stateNode, R ? (u = l.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (v = F.stateNode, w = F.memoizedProps.style, p = w != null && w.hasOwnProperty("display") ? w.display : null, v.style.display = Iu("display", p));
                } catch (q) {
                  je(e, e.return, q);
                }
              }
            } else if (F.tag === 6) {
              if (O === null) try {
                F.stateNode.nodeValue = R ? "" : F.memoizedProps;
              } catch (q) {
                je(e, e.return, q);
              }
            } else if ((F.tag !== 22 && F.tag !== 23 || F.memoizedState === null || F === e) && F.child !== null) {
              F.child.return = F, F = F.child;
              continue;
            }
            if (F === e) break e;
            for (; F.sibling === null; ) {
              if (F.return === null || F.return === e) break e;
              O === F && (O = null), F = F.return;
            }
            O === F && (O = null), F.sibling.return = F.return, F = F.sibling;
          }
        }
        break;
      case 19:
        Bt(t, e), Gt(e), o & 4 && qf(e);
        break;
      case 21:
        break;
      default:
        Bt(
          t,
          e
        ), Gt(e);
    }
  }
  function Gt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var i = e.return; i !== null; ) {
            if (Xf(i)) {
              var o = i;
              break e;
            }
            i = i.return;
          }
          throw Error(s(160));
        }
        switch (o.tag) {
          case 5:
            var l = o.stateNode;
            o.flags & 32 && (Lr(l, ""), o.flags &= -33);
            var u = Qf(e);
            Fa(e, u, l);
            break;
          case 3:
          case 4:
            var p = o.stateNode.containerInfo, v = Qf(e);
            ja(e, v, p);
            break;
          default:
            throw Error(s(161));
        }
      } catch (w) {
        je(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ly(e, t, i) {
    H = e, ed(e);
  }
  function ed(e, t, i) {
    for (var o = (e.mode & 1) !== 0; H !== null; ) {
      var l = H, u = l.child;
      if (l.tag === 22 && o) {
        var p = l.memoizedState !== null || Cs;
        if (!p) {
          var v = l.alternate, w = v !== null && v.memoizedState !== null || lt;
          v = Cs;
          var R = lt;
          if (Cs = p, (lt = w) && !R) for (H = l; H !== null; ) p = H, w = p.child, p.tag === 22 && p.memoizedState !== null ? rd(l) : w !== null ? (w.return = p, H = w) : rd(l);
          for (; u !== null; ) H = u, ed(u), u = u.sibling;
          H = l, Cs = v, lt = R;
        }
        td(e);
      } else (l.subtreeFlags & 8772) !== 0 && u !== null ? (u.return = l, H = u) : td(e);
    }
  }
  function td(e) {
    for (; H !== null; ) {
      var t = H;
      if ((t.flags & 8772) !== 0) {
        var i = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              lt || Es(5, t);
              break;
            case 1:
              var o = t.stateNode;
              if (t.flags & 4 && !lt) if (i === null) o.componentDidMount();
              else {
                var l = t.elementType === t.type ? i.memoizedProps : Ft(t.type, i.memoizedProps);
                o.componentDidUpdate(l, i.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var u = t.updateQueue;
              u !== null && tf(t, u, o);
              break;
            case 3:
              var p = t.updateQueue;
              if (p !== null) {
                if (i = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    i = t.child.stateNode;
                    break;
                  case 1:
                    i = t.child.stateNode;
                }
                tf(t, p, i);
              }
              break;
            case 5:
              var v = t.stateNode;
              if (i === null && t.flags & 4) {
                i = v;
                var w = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    w.autoFocus && i.focus();
                    break;
                  case "img":
                    w.src && (i.src = w.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var R = t.alternate;
                if (R !== null) {
                  var O = R.memoizedState;
                  if (O !== null) {
                    var F = O.dehydrated;
                    F !== null && $r(F);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          lt || t.flags & 512 && Oa(t);
        } catch (V) {
          je(t, t.return, V);
        }
      }
      if (t === e) {
        H = null;
        break;
      }
      if (i = t.sibling, i !== null) {
        i.return = t.return, H = i;
        break;
      }
      H = t.return;
    }
  }
  function nd(e) {
    for (; H !== null; ) {
      var t = H;
      if (t === e) {
        H = null;
        break;
      }
      var i = t.sibling;
      if (i !== null) {
        i.return = t.return, H = i;
        break;
      }
      H = t.return;
    }
  }
  function rd(e) {
    for (; H !== null; ) {
      var t = H;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var i = t.return;
            try {
              Es(4, t);
            } catch (w) {
              je(t, i, w);
            }
            break;
          case 1:
            var o = t.stateNode;
            if (typeof o.componentDidMount == "function") {
              var l = t.return;
              try {
                o.componentDidMount();
              } catch (w) {
                je(t, l, w);
              }
            }
            var u = t.return;
            try {
              Oa(t);
            } catch (w) {
              je(t, u, w);
            }
            break;
          case 5:
            var p = t.return;
            try {
              Oa(t);
            } catch (w) {
              je(t, p, w);
            }
        }
      } catch (w) {
        je(t, t.return, w);
      }
      if (t === e) {
        H = null;
        break;
      }
      var v = t.sibling;
      if (v !== null) {
        v.return = t.return, H = v;
        break;
      }
      H = t.return;
    }
  }
  var uy = Math.ceil, Ps = K.ReactCurrentDispatcher, za = K.ReactCurrentOwner, Mt = K.ReactCurrentBatchConfig, ve = 0, Je = null, We = null, rt = 0, Tt = 0, vr = mn(0), Xe = 0, fi = null, Bn = 0, As = 0, Ba = 0, di = null, yt = null, Ua = 0, xr = 1 / 0, sn = null, Rs = !1, $a = null, Sn = null, Ms = !1, kn = null, Ds = 0, pi = 0, Wa = null, Ls = -1, _s = 0;
  function ft() {
    return (ve & 6) !== 0 ? Ue() : Ls !== -1 ? Ls : Ls = Ue();
  }
  function Tn(e) {
    return (e.mode & 1) === 0 ? 1 : (ve & 2) !== 0 && rt !== 0 ? rt & -rt : Hg.transition !== null ? (_s === 0 && (_s = Xu()), _s) : (e = Te, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ic(e.type)), e);
  }
  function Ut(e, t, i, o) {
    if (50 < pi) throw pi = 0, Wa = null, Error(s(185));
    jr(e, i, o), ((ve & 2) === 0 || e !== Je) && (e === Je && ((ve & 2) === 0 && (As |= i), Xe === 4 && Cn(e, rt)), vt(e, o), i === 1 && ve === 0 && (t.mode & 1) === 0 && (xr = Ue() + 500, os && yn()));
  }
  function vt(e, t) {
    var i = e.callbackNode;
    Hm(e, t);
    var o = Ui(e, e === Je ? rt : 0);
    if (o === 0) i !== null && Hu(i), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = o & -o, e.callbackPriority !== t) {
      if (i != null && Hu(i), t === 1) e.tag === 0 ? bg(sd.bind(null, e)) : Wc(sd.bind(null, e)), Ug(function() {
        (ve & 6) === 0 && yn();
      }), i = null;
      else {
        switch (Qu(o)) {
          case 1:
            i = ko;
            break;
          case 4:
            i = Yu;
            break;
          case 16:
            i = ji;
            break;
          case 536870912:
            i = Gu;
            break;
          default:
            i = ji;
        }
        i = pd(i, id.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = i;
    }
  }
  function id(e, t) {
    if (Ls = -1, _s = 0, (ve & 6) !== 0) throw Error(s(327));
    var i = e.callbackNode;
    if (wr() && e.callbackNode !== i) return null;
    var o = Ui(e, e === Je ? rt : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t) t = Is(e, o);
    else {
      t = o;
      var l = ve;
      ve |= 2;
      var u = ad();
      (Je !== e || rt !== t) && (sn = null, xr = Ue() + 500, $n(e, t));
      do
        try {
          dy();
          break;
        } catch (v) {
          od(e, v);
        }
      while (!0);
      aa(), Ps.current = u, ve = l, We !== null ? t = 0 : (Je = null, rt = 0, t = Xe);
    }
    if (t !== 0) {
      if (t === 2 && (l = To(e), l !== 0 && (o = l, t = Ka(e, l))), t === 1) throw i = fi, $n(e, 0), Cn(e, o), vt(e, Ue()), i;
      if (t === 6) Cn(e, o);
      else {
        if (l = e.current.alternate, (o & 30) === 0 && !cy(l) && (t = Is(e, o), t === 2 && (u = To(e), u !== 0 && (o = u, t = Ka(e, u))), t === 1)) throw i = fi, $n(e, 0), Cn(e, o), vt(e, Ue()), i;
        switch (e.finishedWork = l, e.finishedLanes = o, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            Wn(e, yt, sn);
            break;
          case 3:
            if (Cn(e, o), (o & 130023424) === o && (t = Ua + 500 - Ue(), 10 < t)) {
              if (Ui(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & o) !== o) {
                ft(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Qo(Wn.bind(null, e, yt, sn), t);
              break;
            }
            Wn(e, yt, sn);
            break;
          case 4:
            if (Cn(e, o), (o & 4194240) === o) break;
            for (t = e.eventTimes, l = -1; 0 < o; ) {
              var p = 31 - Nt(o);
              u = 1 << p, p = t[p], p > l && (l = p), o &= ~u;
            }
            if (o = l, o = Ue() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * uy(o / 1960)) - o, 10 < o) {
              e.timeoutHandle = Qo(Wn.bind(null, e, yt, sn), o);
              break;
            }
            Wn(e, yt, sn);
            break;
          case 5:
            Wn(e, yt, sn);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return vt(e, Ue()), e.callbackNode === i ? id.bind(null, e) : null;
  }
  function Ka(e, t) {
    var i = di;
    return e.current.memoizedState.isDehydrated && ($n(e, t).flags |= 256), e = Is(e, t), e !== 2 && (t = yt, yt = i, t !== null && ba(t)), e;
  }
  function ba(e) {
    yt === null ? yt = e : yt.push.apply(yt, e);
  }
  function cy(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var i = t.updateQueue;
        if (i !== null && (i = i.stores, i !== null)) for (var o = 0; o < i.length; o++) {
          var l = i[o], u = l.getSnapshot;
          l = l.value;
          try {
            if (!Ot(u(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (i = t.child, t.subtreeFlags & 16384 && i !== null) i.return = t, t = i;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Cn(e, t) {
    for (t &= ~Ba, t &= ~As, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var i = 31 - Nt(t), o = 1 << i;
      e[i] = -1, t &= ~o;
    }
  }
  function sd(e) {
    if ((ve & 6) !== 0) throw Error(s(327));
    wr();
    var t = Ui(e, 0);
    if ((t & 1) === 0) return vt(e, Ue()), null;
    var i = Is(e, t);
    if (e.tag !== 0 && i === 2) {
      var o = To(e);
      o !== 0 && (t = o, i = Ka(e, o));
    }
    if (i === 1) throw i = fi, $n(e, 0), Cn(e, t), vt(e, Ue()), i;
    if (i === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wn(e, yt, sn), vt(e, Ue()), null;
  }
  function Ha(e, t) {
    var i = ve;
    ve |= 1;
    try {
      return e(t);
    } finally {
      ve = i, ve === 0 && (xr = Ue() + 500, os && yn());
    }
  }
  function Un(e) {
    kn !== null && kn.tag === 0 && (ve & 6) === 0 && wr();
    var t = ve;
    ve |= 1;
    var i = Mt.transition, o = Te;
    try {
      if (Mt.transition = null, Te = 1, e) return e();
    } finally {
      Te = o, Mt.transition = i, ve = t, (ve & 6) === 0 && yn();
    }
  }
  function Ya() {
    Tt = vr.current, De(vr);
  }
  function $n(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var i = e.timeoutHandle;
    if (i !== -1 && (e.timeoutHandle = -1, Bg(i)), We !== null) for (i = We.return; i !== null; ) {
      var o = i;
      switch (na(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && is();
          break;
        case 3:
          mr(), De(ht), De(st), ma();
          break;
        case 5:
          pa(o);
          break;
        case 4:
          mr();
          break;
        case 13:
          De(Ie);
          break;
        case 19:
          De(Ie);
          break;
        case 10:
          la(o.type._context);
          break;
        case 22:
        case 23:
          Ya();
      }
      i = i.return;
    }
    if (Je = e, We = e = En(e.current, null), rt = Tt = t, Xe = 0, fi = null, Ba = As = Bn = 0, yt = di = null, jn !== null) {
      for (t = 0; t < jn.length; t++) if (i = jn[t], o = i.interleaved, o !== null) {
        i.interleaved = null;
        var l = o.next, u = i.pending;
        if (u !== null) {
          var p = u.next;
          u.next = l, o.next = p;
        }
        i.pending = o;
      }
      jn = null;
    }
    return e;
  }
  function od(e, t) {
    do {
      var i = We;
      try {
        if (aa(), gs.current = ws, ys) {
          for (var o = Ve.memoizedState; o !== null; ) {
            var l = o.queue;
            l !== null && (l.pending = null), o = o.next;
          }
          ys = !1;
        }
        if (zn = 0, qe = Ge = Ve = null, si = !1, oi = 0, za.current = null, i === null || i.return === null) {
          Xe = 1, fi = t, We = null;
          break;
        }
        e: {
          var u = e, p = i.return, v = i, w = t;
          if (t = rt, v.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var R = w, O = v, F = O.tag;
            if ((O.mode & 1) === 0 && (F === 0 || F === 11 || F === 15)) {
              var V = O.alternate;
              V ? (O.updateQueue = V.updateQueue, O.memoizedState = V.memoizedState, O.lanes = V.lanes) : (O.updateQueue = null, O.memoizedState = null);
            }
            var b = Lf(p);
            if (b !== null) {
              b.flags &= -257, _f(b, p, v, u, t), b.mode & 1 && Df(u, R, t), t = b, w = R;
              var G = t.updateQueue;
              if (G === null) {
                var q = /* @__PURE__ */ new Set();
                q.add(w), t.updateQueue = q;
              } else G.add(w);
              break e;
            } else {
              if ((t & 1) === 0) {
                Df(u, R, t), Ga();
                break e;
              }
              w = Error(s(426));
            }
          } else if (Le && v.mode & 1) {
            var $e = Lf(p);
            if ($e !== null) {
              ($e.flags & 65536) === 0 && ($e.flags |= 256), _f($e, p, v, u, t), sa(gr(w, v));
              break e;
            }
          }
          u = w = gr(w, v), Xe !== 4 && (Xe = 2), di === null ? di = [u] : di.push(u), u = p;
          do {
            switch (u.tag) {
              case 3:
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var E = Rf(u, w, t);
                ef(u, E);
                break e;
              case 1:
                v = w;
                var k = u.type, A = u.stateNode;
                if ((u.flags & 128) === 0 && (typeof k.getDerivedStateFromError == "function" || A !== null && typeof A.componentDidCatch == "function" && (Sn === null || !Sn.has(A)))) {
                  u.flags |= 65536, t &= -t, u.lanes |= t;
                  var B = Mf(u, v, t);
                  ef(u, B);
                  break e;
                }
            }
            u = u.return;
          } while (u !== null);
        }
        ud(i);
      } catch (J) {
        t = J, We === i && i !== null && (We = i = i.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ad() {
    var e = Ps.current;
    return Ps.current = ws, e === null ? ws : e;
  }
  function Ga() {
    (Xe === 0 || Xe === 3 || Xe === 2) && (Xe = 4), Je === null || (Bn & 268435455) === 0 && (As & 268435455) === 0 || Cn(Je, rt);
  }
  function Is(e, t) {
    var i = ve;
    ve |= 2;
    var o = ad();
    (Je !== e || rt !== t) && (sn = null, $n(e, t));
    do
      try {
        fy();
        break;
      } catch (l) {
        od(e, l);
      }
    while (!0);
    if (aa(), ve = i, Ps.current = o, We !== null) throw Error(s(261));
    return Je = null, rt = 0, Xe;
  }
  function fy() {
    for (; We !== null; ) ld(We);
  }
  function dy() {
    for (; We !== null && !jm(); ) ld(We);
  }
  function ld(e) {
    var t = dd(e.alternate, e, Tt);
    e.memoizedProps = e.pendingProps, t === null ? ud(e) : We = t, za.current = null;
  }
  function ud(e) {
    var t = e;
    do {
      var i = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (i = iy(i, t, Tt), i !== null) {
          We = i;
          return;
        }
      } else {
        if (i = sy(i, t), i !== null) {
          i.flags &= 32767, We = i;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Xe = 6, We = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        We = t;
        return;
      }
      We = t = e;
    } while (t !== null);
    Xe === 0 && (Xe = 5);
  }
  function Wn(e, t, i) {
    var o = Te, l = Mt.transition;
    try {
      Mt.transition = null, Te = 1, py(e, t, i, o);
    } finally {
      Mt.transition = l, Te = o;
    }
    return null;
  }
  function py(e, t, i, o) {
    do
      wr();
    while (kn !== null);
    if ((ve & 6) !== 0) throw Error(s(327));
    i = e.finishedWork;
    var l = e.finishedLanes;
    if (i === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, i === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var u = i.lanes | i.childLanes;
    if (Ym(e, u), e === Je && (We = Je = null, rt = 0), (i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0 || Ms || (Ms = !0, pd(ji, function() {
      return wr(), null;
    })), u = (i.flags & 15990) !== 0, (i.subtreeFlags & 15990) !== 0 || u) {
      u = Mt.transition, Mt.transition = null;
      var p = Te;
      Te = 1;
      var v = ve;
      ve |= 4, za.current = null, ay(e, i), Jf(i, e), Ig(Go), Ki = !!Yo, Go = Yo = null, e.current = i, ly(i), Fm(), ve = v, Te = p, Mt.transition = u;
    } else e.current = i;
    if (Ms && (Ms = !1, kn = e, Ds = l), u = e.pendingLanes, u === 0 && (Sn = null), Um(i.stateNode), vt(e, Ue()), t !== null) for (o = e.onRecoverableError, i = 0; i < t.length; i++) l = t[i], o(l.value, { componentStack: l.stack, digest: l.digest });
    if (Rs) throw Rs = !1, e = $a, $a = null, e;
    return (Ds & 1) !== 0 && e.tag !== 0 && wr(), u = e.pendingLanes, (u & 1) !== 0 ? e === Wa ? pi++ : (pi = 0, Wa = e) : pi = 0, yn(), null;
  }
  function wr() {
    if (kn !== null) {
      var e = Qu(Ds), t = Mt.transition, i = Te;
      try {
        if (Mt.transition = null, Te = 16 > e ? 16 : e, kn === null) var o = !1;
        else {
          if (e = kn, kn = null, Ds = 0, (ve & 6) !== 0) throw Error(s(331));
          var l = ve;
          for (ve |= 4, H = e.current; H !== null; ) {
            var u = H, p = u.child;
            if ((H.flags & 16) !== 0) {
              var v = u.deletions;
              if (v !== null) {
                for (var w = 0; w < v.length; w++) {
                  var R = v[w];
                  for (H = R; H !== null; ) {
                    var O = H;
                    switch (O.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ci(8, O, u);
                    }
                    var F = O.child;
                    if (F !== null) F.return = O, H = F;
                    else for (; H !== null; ) {
                      O = H;
                      var V = O.sibling, b = O.return;
                      if (Gf(O), O === R) {
                        H = null;
                        break;
                      }
                      if (V !== null) {
                        V.return = b, H = V;
                        break;
                      }
                      H = b;
                    }
                  }
                }
                var G = u.alternate;
                if (G !== null) {
                  var q = G.child;
                  if (q !== null) {
                    G.child = null;
                    do {
                      var $e = q.sibling;
                      q.sibling = null, q = $e;
                    } while (q !== null);
                  }
                }
                H = u;
              }
            }
            if ((u.subtreeFlags & 2064) !== 0 && p !== null) p.return = u, H = p;
            else e: for (; H !== null; ) {
              if (u = H, (u.flags & 2048) !== 0) switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  ci(9, u, u.return);
              }
              var E = u.sibling;
              if (E !== null) {
                E.return = u.return, H = E;
                break e;
              }
              H = u.return;
            }
          }
          var k = e.current;
          for (H = k; H !== null; ) {
            p = H;
            var A = p.child;
            if ((p.subtreeFlags & 2064) !== 0 && A !== null) A.return = p, H = A;
            else e: for (p = k; H !== null; ) {
              if (v = H, (v.flags & 2048) !== 0) try {
                switch (v.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Es(9, v);
                }
              } catch (J) {
                je(v, v.return, J);
              }
              if (v === p) {
                H = null;
                break e;
              }
              var B = v.sibling;
              if (B !== null) {
                B.return = v.return, H = B;
                break e;
              }
              H = v.return;
            }
          }
          if (ve = l, yn(), Kt && typeof Kt.onPostCommitFiberRoot == "function") try {
            Kt.onPostCommitFiberRoot(Fi, e);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Te = i, Mt.transition = t;
      }
    }
    return !1;
  }
  function cd(e, t, i) {
    t = gr(i, t), t = Rf(e, t, 1), e = xn(e, t, 1), t = ft(), e !== null && (jr(e, 1, t), vt(e, t));
  }
  function je(e, t, i) {
    if (e.tag === 3) cd(e, e, i);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        cd(t, e, i);
        break;
      } else if (t.tag === 1) {
        var o = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Sn === null || !Sn.has(o))) {
          e = gr(i, e), e = Mf(t, e, 1), t = xn(t, e, 1), e = ft(), t !== null && (jr(t, 1, e), vt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function hy(e, t, i) {
    var o = e.pingCache;
    o !== null && o.delete(t), t = ft(), e.pingedLanes |= e.suspendedLanes & i, Je === e && (rt & i) === i && (Xe === 4 || Xe === 3 && (rt & 130023424) === rt && 500 > Ue() - Ua ? $n(e, 0) : Ba |= i), vt(e, t);
  }
  function fd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Bi, Bi <<= 1, (Bi & 130023424) === 0 && (Bi = 4194304)));
    var i = ft();
    e = tn(e, t), e !== null && (jr(e, t, i), vt(e, i));
  }
  function my(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), fd(e, i);
  }
  function gy(e, t) {
    var i = 0;
    switch (e.tag) {
      case 13:
        var o = e.stateNode, l = e.memoizedState;
        l !== null && (i = l.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    o !== null && o.delete(t), fd(e, i);
  }
  var dd;
  dd = function(e, t, i) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || ht.current) gt = !0;
    else {
      if ((e.lanes & i) === 0 && (t.flags & 128) === 0) return gt = !1, ry(e, t, i);
      gt = (e.flags & 131072) !== 0;
    }
    else gt = !1, Le && (t.flags & 1048576) !== 0 && Kc(t, ls, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var o = t.type;
        Ts(e, t), e = t.pendingProps;
        var l = lr(t, st.current);
        hr(t, i), l = va(null, t, o, e, l, i);
        var u = xa();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, mt(o) ? (u = !0, ss(t)) : u = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fa(t), l.updater = Ss, t.stateNode = l, l._reactInternals = t, Ea(t, o, e, i), t = Ma(null, t, o, !0, u, i)) : (t.tag = 0, Le && u && ta(t), ct(null, t, l, i), t = t.child), t;
      case 16:
        o = t.elementType;
        e: {
          switch (Ts(e, t), e = t.pendingProps, l = o._init, o = l(o._payload), t.type = o, l = t.tag = vy(o), e = Ft(o, e), l) {
            case 0:
              t = Ra(null, t, o, e, i);
              break e;
            case 1:
              t = Ff(null, t, o, e, i);
              break e;
            case 11:
              t = If(null, t, o, e, i);
              break e;
            case 14:
              t = Vf(null, t, o, Ft(o.type, e), i);
              break e;
          }
          throw Error(s(
            306,
            o,
            ""
          ));
        }
        return t;
      case 0:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ft(o, l), Ra(e, t, o, l, i);
      case 1:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ft(o, l), Ff(e, t, o, l, i);
      case 3:
        e: {
          if (zf(t), e === null) throw Error(s(387));
          o = t.pendingProps, u = t.memoizedState, l = u.element, Jc(e, t), hs(t, o, null, i);
          var p = t.memoizedState;
          if (o = p.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: p.cache, pendingSuspenseBoundaries: p.pendingSuspenseBoundaries, transitions: p.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
            l = gr(Error(s(423)), t), t = Bf(e, t, o, i, l);
            break e;
          } else if (o !== l) {
            l = gr(Error(s(424)), t), t = Bf(e, t, o, i, l);
            break e;
          } else for (kt = hn(t.stateNode.containerInfo.firstChild), St = t, Le = !0, jt = null, i = Zc(t, null, o, i), t.child = i; i; ) i.flags = i.flags & -3 | 4096, i = i.sibling;
          else {
            if (fr(), o === l) {
              t = rn(e, t, i);
              break e;
            }
            ct(e, t, o, i);
          }
          t = t.child;
        }
        return t;
      case 5:
        return nf(t), e === null && ia(t), o = t.type, l = t.pendingProps, u = e !== null ? e.memoizedProps : null, p = l.children, Xo(o, l) ? p = null : u !== null && Xo(o, u) && (t.flags |= 32), jf(e, t), ct(e, t, p, i), t.child;
      case 6:
        return e === null && ia(t), null;
      case 13:
        return Uf(e, t, i);
      case 4:
        return da(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = dr(t, null, o, i) : ct(e, t, o, i), t.child;
      case 11:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ft(o, l), If(e, t, o, l, i);
      case 7:
        return ct(e, t, t.pendingProps, i), t.child;
      case 8:
        return ct(e, t, t.pendingProps.children, i), t.child;
      case 12:
        return ct(e, t, t.pendingProps.children, i), t.child;
      case 10:
        e: {
          if (o = t.type._context, l = t.pendingProps, u = t.memoizedProps, p = l.value, Ae(fs, o._currentValue), o._currentValue = p, u !== null) if (Ot(u.value, p)) {
            if (u.children === l.children && !ht.current) {
              t = rn(e, t, i);
              break e;
            }
          } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
            var v = u.dependencies;
            if (v !== null) {
              p = u.child;
              for (var w = v.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (u.tag === 1) {
                    w = nn(-1, i & -i), w.tag = 2;
                    var R = u.updateQueue;
                    if (R !== null) {
                      R = R.shared;
                      var O = R.pending;
                      O === null ? w.next = w : (w.next = O.next, O.next = w), R.pending = w;
                    }
                  }
                  u.lanes |= i, w = u.alternate, w !== null && (w.lanes |= i), ua(
                    u.return,
                    i,
                    t
                  ), v.lanes |= i;
                  break;
                }
                w = w.next;
              }
            } else if (u.tag === 10) p = u.type === t.type ? null : u.child;
            else if (u.tag === 18) {
              if (p = u.return, p === null) throw Error(s(341));
              p.lanes |= i, v = p.alternate, v !== null && (v.lanes |= i), ua(p, i, t), p = u.sibling;
            } else p = u.child;
            if (p !== null) p.return = u;
            else for (p = u; p !== null; ) {
              if (p === t) {
                p = null;
                break;
              }
              if (u = p.sibling, u !== null) {
                u.return = p.return, p = u;
                break;
              }
              p = p.return;
            }
            u = p;
          }
          ct(e, t, l.children, i), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, o = t.pendingProps.children, hr(t, i), l = At(l), o = o(l), t.flags |= 1, ct(e, t, o, i), t.child;
      case 14:
        return o = t.type, l = Ft(o, t.pendingProps), l = Ft(o.type, l), Vf(e, t, o, l, i);
      case 15:
        return Nf(e, t, t.type, t.pendingProps, i);
      case 17:
        return o = t.type, l = t.pendingProps, l = t.elementType === o ? l : Ft(o, l), Ts(e, t), t.tag = 1, mt(o) ? (e = !0, ss(t)) : e = !1, hr(t, i), Pf(t, o, l), Ea(t, o, l, i), Ma(null, t, o, !0, e, i);
      case 19:
        return Wf(e, t, i);
      case 22:
        return Of(e, t, i);
    }
    throw Error(s(156, t.tag));
  };
  function pd(e, t) {
    return bu(e, t);
  }
  function yy(e, t, i, o) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Dt(e, t, i, o) {
    return new yy(e, t, i, o);
  }
  function Xa(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function vy(e) {
    if (typeof e == "function") return Xa(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === be) return 11;
      if (e === tt) return 14;
    }
    return 2;
  }
  function En(e, t) {
    var i = e.alternate;
    return i === null ? (i = Dt(e.tag, t, e.key, e.mode), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 14680064, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i;
  }
  function Vs(e, t, i, o, l, u) {
    var p = 2;
    if (o = e, typeof e == "function") Xa(e) && (p = 1);
    else if (typeof e == "string") p = 5;
    else e: switch (e) {
      case de:
        return Kn(i.children, l, u, t);
      case Y:
        p = 8, l |= 8;
        break;
      case ce:
        return e = Dt(12, i, t, l | 2), e.elementType = ce, e.lanes = u, e;
      case He:
        return e = Dt(13, i, t, l), e.elementType = He, e.lanes = u, e;
      case Ze:
        return e = Dt(19, i, t, l), e.elementType = Ze, e.lanes = u, e;
      case ue:
        return Ns(i, l, u, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Se:
            p = 10;
            break e;
          case ze:
            p = 9;
            break e;
          case be:
            p = 11;
            break e;
          case tt:
            p = 14;
            break e;
          case Oe:
            p = 16, o = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = Dt(p, i, t, l), t.elementType = e, t.type = o, t.lanes = u, t;
  }
  function Kn(e, t, i, o) {
    return e = Dt(7, e, o, t), e.lanes = i, e;
  }
  function Ns(e, t, i, o) {
    return e = Dt(22, e, o, t), e.elementType = ue, e.lanes = i, e.stateNode = { isHidden: !1 }, e;
  }
  function Qa(e, t, i) {
    return e = Dt(6, e, null, t), e.lanes = i, e;
  }
  function Za(e, t, i) {
    return t = Dt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = i, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function xy(e, t, i, o, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Co(0), this.expirationTimes = Co(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Co(0), this.identifierPrefix = o, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function qa(e, t, i, o, l, u, p, v, w) {
    return e = new xy(e, t, i, v, w), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = Dt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: i, cache: null, transitions: null, pendingSuspenseBoundaries: null }, fa(u), e;
  }
  function wy(e, t, i) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ie, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: i };
  }
  function hd(e) {
    if (!e) return gn;
    e = e._reactInternals;
    e: {
      if (_n(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (mt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var i = e.type;
      if (mt(i)) return Uc(e, i, t);
    }
    return t;
  }
  function md(e, t, i, o, l, u, p, v, w) {
    return e = qa(i, o, !0, e, l, u, p, v, w), e.context = hd(null), i = e.current, o = ft(), l = Tn(i), u = nn(o, l), u.callback = t ?? null, xn(i, u, l), e.current.lanes = l, jr(e, l, o), vt(e, o), e;
  }
  function Os(e, t, i, o) {
    var l = t.current, u = ft(), p = Tn(l);
    return i = hd(i), t.context === null ? t.context = i : t.pendingContext = i, t = nn(u, p), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = xn(l, t, p), e !== null && (Ut(e, l, p, u), ps(e, l, p)), p;
  }
  function js(e) {
    return e = e.current, e.child ? (e.child.tag === 5, e.child.stateNode) : null;
  }
  function gd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Ja(e, t) {
    gd(e, t), (e = e.alternate) && gd(e, t);
  }
  function Sy() {
    return null;
  }
  var yd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function el(e) {
    this._internalRoot = e;
  }
  Fs.prototype.render = el.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    Os(e, t, null, null);
  }, Fs.prototype.unmount = el.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Un(function() {
        Os(null, e, null, null);
      }), t[Zt] = null;
    }
  };
  function Fs(e) {
    this._internalRoot = e;
  }
  Fs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ju();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < fn.length && t !== 0 && t < fn[i].priority; i++) ;
      fn.splice(i, 0, e), i === 0 && nc(e);
    }
  };
  function tl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function zs(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function vd() {
  }
  function ky(e, t, i, o, l) {
    if (l) {
      if (typeof o == "function") {
        var u = o;
        o = function() {
          var R = js(p);
          u.call(R);
        };
      }
      var p = md(t, o, e, 0, null, !1, !1, "", vd);
      return e._reactRootContainer = p, e[Zt] = p.current, Zr(e.nodeType === 8 ? e.parentNode : e), Un(), p;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof o == "function") {
      var v = o;
      o = function() {
        var R = js(w);
        v.call(R);
      };
    }
    var w = qa(e, 0, !1, null, null, !1, !1, "", vd);
    return e._reactRootContainer = w, e[Zt] = w.current, Zr(e.nodeType === 8 ? e.parentNode : e), Un(function() {
      Os(t, w, i, o);
    }), w;
  }
  function Bs(e, t, i, o, l) {
    var u = i._reactRootContainer;
    if (u) {
      var p = u;
      if (typeof l == "function") {
        var v = l;
        l = function() {
          var w = js(p);
          v.call(w);
        };
      }
      Os(t, p, e, l);
    } else p = ky(i, t, e, l, o);
    return js(p);
  }
  Zu = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var i = Or(t.pendingLanes);
          i !== 0 && (Eo(t, i | 1), vt(t, Ue()), (ve & 6) === 0 && (xr = Ue() + 500, yn()));
        }
        break;
      case 13:
        Un(function() {
          var o = tn(e, 1);
          if (o !== null) {
            var l = ft();
            Ut(o, e, 1, l);
          }
        }), Ja(e, 1);
    }
  }, Po = function(e) {
    if (e.tag === 13) {
      var t = tn(e, 134217728);
      if (t !== null) {
        var i = ft();
        Ut(t, e, 134217728, i);
      }
      Ja(e, 134217728);
    }
  }, qu = function(e) {
    if (e.tag === 13) {
      var t = Tn(e), i = tn(e, t);
      if (i !== null) {
        var o = ft();
        Ut(i, e, t, o);
      }
      Ja(e, t);
    }
  }, Ju = function() {
    return Te;
  }, ec = function(e, t) {
    var i = Te;
    try {
      return Te = e, t();
    } finally {
      Te = i;
    }
  }, vo = function(e, t, i) {
    switch (t) {
      case "input":
        if (se(e, i), t = i.name, i.type === "radio" && t != null) {
          for (i = e; i.parentNode; ) i = i.parentNode;
          for (i = i.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < i.length; t++) {
            var o = i[t];
            if (o !== e && o.form === e.form) {
              var l = rs(o);
              if (!l) throw Error(s(90));
              ke(o), se(o, l);
            }
          }
        }
        break;
      case "textarea":
        Mu(e, i);
        break;
      case "select":
        t = i.value, t != null && Be(e, !!i.multiple, t, !1);
    }
  }, Fu = Ha, zu = Un;
  var Ty = { usingClientEntryPoint: !1, Events: [ei, or, rs, Ou, ju, Ha] }, hi = { findFiberByHostInstance: In, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Cy = { bundleType: hi.bundleType, version: hi.version, rendererPackageName: hi.rendererPackageName, rendererConfig: hi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: K.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Wu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: hi.findFiberByHostInstance || Sy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Us = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Us.isDisabled && Us.supportsFiber) try {
      Fi = Us.inject(Cy), Kt = Us;
    } catch {
    }
  }
  return xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ty, xt.createPortal = function(e, t) {
    var i = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!tl(t)) throw Error(s(200));
    return wy(e, t, null, i);
  }, xt.createRoot = function(e, t) {
    if (!tl(e)) throw Error(s(299));
    var i = !1, o = "", l = yd;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = qa(e, 1, !1, null, null, i, !1, o, l), e[Zt] = t.current, Zr(e.nodeType === 8 ? e.parentNode : e), new el(t);
  }, xt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = Wu(t), e = e === null ? null : e.stateNode, e;
  }, xt.flushSync = function(e) {
    return Un(e);
  }, xt.hydrate = function(e, t, i) {
    if (!zs(t)) throw Error(s(200));
    return Bs(null, e, t, !0, i);
  }, xt.hydrateRoot = function(e, t, i) {
    if (!tl(e)) throw Error(s(405));
    var o = i != null && i.hydratedSources || null, l = !1, u = "", p = yd;
    if (i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onRecoverableError !== void 0 && (p = i.onRecoverableError)), t = md(t, null, e, 1, i ?? null, l, !1, u, p), e[Zt] = t.current, Zr(e), o) for (e = 0; e < o.length; e++) i = o[e], l = i._getVersion, l = l(i._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [i, l] : t.mutableSourceEagerHydrationData.push(
      i,
      l
    );
    return new Fs(t);
  }, xt.render = function(e, t, i) {
    if (!zs(t)) throw Error(s(200));
    return Bs(null, e, t, !1, i);
  }, xt.unmountComponentAtNode = function(e) {
    if (!zs(e)) throw Error(s(40));
    return e._reactRootContainer ? (Un(function() {
      Bs(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Zt] = null;
      });
    }), !0) : !1;
  }, xt.unstable_batchedUpdates = Ha, xt.unstable_renderSubtreeIntoContainer = function(e, t, i, o) {
    if (!zs(i)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return Bs(e, t, i, !1, o);
  }, xt.version = "18.3.1-next-f1338f8080-20240426", xt;
}
var Kp;
function Uw() {
  if (Kp) return Sl.exports;
  Kp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Sl.exports = Bw(), Sl.exports;
}
var bp;
function $w() {
  if (bp) return Hs;
  bp = 1;
  var n = Uw();
  return Hs.createRoot = n.createRoot, Hs.hydrateRoot = n.hydrateRoot, Hs;
}
var Ww = $w(), Kw = Object.defineProperty, bw = (n, r, s) => r in n ? Kw(n, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[r] = s, Ys = (n, r, s) => bw(n, typeof r != "symbol" ? r + "" : r, s);
const Hw = {
  stringify: (n) => n ? "true" : "false",
  parse: (n) => /^[ty1-9]/i.test(n)
}, Yw = {
  stringify: (n) => n.name,
  parse: (n, r, s) => {
    const a = (() => {
      if (typeof window < "u" && n in window)
        return window[n];
      if (typeof global < "u" && n in global)
        return global[n];
    })();
    return typeof a == "function" ? a.bind(s) : void 0;
  }
}, Gw = {
  stringify: (n) => JSON.stringify(n),
  parse: (n) => JSON.parse(n)
};
function Xw(n) {
  return n.replace(
    /([a-z0-9])([A-Z])/g,
    (r, s, a) => `${s}-${a.toLowerCase()}`
  );
}
function Mm(n) {
  return n.replace(/[-:]([a-z])/g, (r, s) => `${s.toUpperCase()}`);
}
const Qw = {
  stringify: (n) => n.name,
  parse: (n, r, s) => {
    const a = (() => {
      const c = Mm(r);
      if (typeof s < "u" && c in s.container)
        return s.container[c];
    })();
    return typeof a == "function" ? a.bind(s) : void 0;
  }
}, Zw = {
  stringify: (n) => `${n}`,
  parse: (n) => parseFloat(n)
}, qw = {
  stringify: (n) => n,
  parse: (n) => n
}, Cl = {
  string: qw,
  number: Zw,
  boolean: Hw,
  function: Yw,
  method: Qw,
  json: Gw
}, yi = /* @__PURE__ */ Symbol.for("r2wc.render"), Gs = /* @__PURE__ */ Symbol.for("r2wc.connected"), Hn = /* @__PURE__ */ Symbol.for("r2wc.context"), Ct = /* @__PURE__ */ Symbol.for("r2wc.props");
function Jw(n, r, s) {
  var a, c, d;
  r.props || (r.props = n.propTypes ? Object.keys(n.propTypes) : []), r.events || (r.events = []);
  const f = Array.isArray(r.props) ? r.props.slice() : Object.keys(r.props), h = Array.isArray(r.events) ? r.events.slice() : Object.keys(r.events), m = {}, y = {}, g = {}, x = {};
  for (const C of f) {
    m[C] = Array.isArray(r.props) ? "string" : r.props[C];
    const P = Xw(C);
    g[C] = P, x[P] = C;
  }
  for (const C of h)
    y[C] = Array.isArray(r.events) ? {} : r.events[C];
  class S extends HTMLElement {
    constructor() {
      super(), Ys(this, d, !0), Ys(this, c), Ys(this, a, {}), Ys(this, "container"), r.shadow ? this.container = this.attachShadow({
        mode: r.shadow
      }) : this.container = this, this[Ct].container = this.container;
      for (const P of f) {
        const M = g[P], L = this.getAttribute(M), D = m[P], z = D ? Cl[D] : null;
        if (D === "method") {
          const _ = Mm(M);
          Object.defineProperty(this[Ct].container, _, {
            enumerable: !0,
            configurable: !0,
            get() {
              return this[Ct][_];
            },
            set(K) {
              this[Ct][_] = K, this[yi]();
            }
          }), this[Ct][P] = z.parse(L, M, this);
        }
        z != null && z.parse && L && (this[Ct][P] = z.parse(L, M, this));
      }
      for (const P of h)
        this[Ct][P] = (M) => {
          const L = P.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(L, { detail: M, ...y[P] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(x);
    }
    connectedCallback() {
      this[Gs] = !0, this[yi]();
    }
    disconnectedCallback() {
      this[Gs] = !1, this[Hn] && s.unmount(this[Hn]), delete this[Hn];
    }
    attributeChangedCallback(P, M, L) {
      const D = x[P], z = m[D], _ = z ? Cl[z] : null;
      D in m && _ != null && _.parse && L && (this[Ct][D] = _.parse(L, P, this), this[yi]());
    }
    [(d = Gs, c = Hn, a = Ct, yi)]() {
      this[Gs] && (this[Hn] ? s.update(this[Hn], this[Ct]) : this[Hn] = s.mount(
        this.container,
        n,
        this[Ct]
      ));
    }
  }
  for (const C of f) {
    const P = g[C], M = m[C];
    Object.defineProperty(S.prototype, C, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Ct][C];
      },
      set(L) {
        this[Ct][C] = L;
        const D = M ? Cl[M] : null;
        if (D != null && D.stringify) {
          const z = D.stringify(L, P, this);
          this.getAttribute(P) !== z && this.setAttribute(P, z);
        } else
          this[yi]();
      }
    });
  }
  return S;
}
function eS(n, r, s) {
  const a = Ww.createRoot(n), c = Js.createElement(r, s);
  return a.render(c), {
    root: a,
    ReactComponent: r
  };
}
function tS({ root: n, ReactComponent: r }, s) {
  const a = Js.createElement(r, s);
  n.render(a);
}
function nS({ root: n }) {
  n.unmount();
}
function rS(n, r = {}) {
  return Jw(n, r, { mount: eS, update: tS, unmount: nS });
}
const sS = () => {
  if (typeof window < "u" && !customElements.get("agent-neo")) {
    const n = rS(jw, {
      props: {
        config: "json",
        preset: "string",
        context: "string",
        user: "json",
        onAction: "function"
      }
    });
    customElements.define("agent-neo", n), console.log("Agent Neo: <agent-neo> custom element registered."), console.log("Version 1.0.2");
  }
};
export {
  Dw as buildSystemPrompt,
  Mw as callEndpoint,
  Fp as callLLM,
  Rm as deepMerge,
  jw as default,
  Lw as parseLLMResponse,
  sS as registerAgentNeo
};
