window.EVA = window.EVA || {};
window.EVA.plugin = window.EVA.plugin || {};

var _EVA_IIFE_transition = function (exports, eva_js) {
  'use strict';

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function next() {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }

  var Easing = {
    Linear: {
      None: function None(amount) {
        return amount;
      }
    },
    Quadratic: {
      In: function In(amount) {
        return amount * amount;
      },
      Out: function Out(amount) {
        return amount * (2 - amount);
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount;
        }

        return -0.5 * (--amount * (amount - 2) - 1);
      }
    },
    Cubic: {
      In: function In(amount) {
        return amount * amount * amount;
      },
      Out: function Out(amount) {
        return --amount * amount * amount + 1;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount;
        }

        return 0.5 * ((amount -= 2) * amount * amount + 2);
      }
    },
    Quartic: {
      In: function In(amount) {
        return amount * amount * amount * amount;
      },
      Out: function Out(amount) {
        return 1 - --amount * amount * amount * amount;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount;
        }

        return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
      }
    },
    Quintic: {
      In: function In(amount) {
        return amount * amount * amount * amount * amount;
      },
      Out: function Out(amount) {
        return --amount * amount * amount * amount * amount + 1;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount * amount;
        }

        return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
      }
    },
    Sinusoidal: {
      In: function In(amount) {
        return 1 - Math.cos(amount * Math.PI / 2);
      },
      Out: function Out(amount) {
        return Math.sin(amount * Math.PI / 2);
      },
      InOut: function InOut(amount) {
        return 0.5 * (1 - Math.cos(Math.PI * amount));
      }
    },
    Exponential: {
      In: function In(amount) {
        return amount === 0 ? 0 : Math.pow(1024, amount - 1);
      },
      Out: function Out(amount) {
        return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
      },
      InOut: function InOut(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        if ((amount *= 2) < 1) {
          return 0.5 * Math.pow(1024, amount - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
      }
    },
    Circular: {
      In: function In(amount) {
        return 1 - Math.sqrt(1 - amount * amount);
      },
      Out: function Out(amount) {
        return Math.sqrt(1 - --amount * amount);
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
      }
    },
    Elastic: {
      In: function In(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      },
      Out: function Out(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function InOut(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        amount *= 2;

        if (amount < 1) {
          return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        }

        return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
      }
    },
    Back: {
      In: function In(amount) {
        var s = 1.70158;
        return amount * amount * ((s + 1) * amount - s);
      },
      Out: function Out(amount) {
        var s = 1.70158;
        return --amount * amount * ((s + 1) * amount + s) + 1;
      },
      InOut: function InOut(amount) {
        var s = 1.70158 * 1.525;

        if ((amount *= 2) < 1) {
          return 0.5 * (amount * amount * ((s + 1) * amount - s));
        }

        return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
      }
    },
    Bounce: {
      In: function In(amount) {
        return 1 - Easing.Bounce.Out(1 - amount);
      },
      Out: function Out(amount) {
        if (amount < 1 / 2.75) {
          return 7.5625 * amount * amount;
        } else if (amount < 2 / 2.75) {
          return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
        } else if (amount < 2.5 / 2.75) {
          return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
        } else {
          return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
        }
      },
      InOut: function InOut(amount) {
        if (amount < 0.5) {
          return Easing.Bounce.In(amount * 2) * 0.5;
        }

        return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
      }
    }
  };
  var now;

  if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
    now = function now() {
      var time = process.hrtime();
      return time[0] * 1000 + time[1] / 1000000;
    };
  } else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    now = self.performance.now.bind(self.performance);
  } else if (Date.now !== undefined) {
    now = Date.now;
  } else {
    now = function now() {
      return new Date().getTime();
    };
  }

  var now$1 = now;

  var Group = function () {
    function Group() {
      this._tweens = {};
      this._tweensAddedDuringUpdate = {};
    }

    Group.prototype.getAll = function () {
      var _this = this;

      return Object.keys(this._tweens).map(function (tweenId) {
        return _this._tweens[tweenId];
      });
    };

    Group.prototype.removeAll = function () {
      this._tweens = {};
    };

    Group.prototype.add = function (tween) {
      this._tweens[tween.getId()] = tween;
      this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };

    Group.prototype.remove = function (tween) {
      delete this._tweens[tween.getId()];
      delete this._tweensAddedDuringUpdate[tween.getId()];
    };

    Group.prototype.update = function (time, preserve) {
      if (time === void 0) {
        time = now$1();
      }

      if (preserve === void 0) {
        preserve = false;
      }

      var tweenIds = Object.keys(this._tweens);

      if (tweenIds.length === 0) {
        return false;
      }

      while (tweenIds.length > 0) {
        this._tweensAddedDuringUpdate = {};

        for (var i = 0; i < tweenIds.length; i++) {
          var tween = this._tweens[tweenIds[i]];
          var autoStart = !preserve;

          if (tween && tween.update(time, autoStart) === false && !preserve) {
            delete this._tweens[tweenIds[i]];
          }
        }

        tweenIds = Object.keys(this._tweensAddedDuringUpdate);
      }

      return true;
    };

    return Group;
  }();

  var Interpolation = {
    Linear: function Linear(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = Interpolation.Utils.Linear;

      if (k < 0) {
        return fn(v[0], v[1], f);
      }

      if (k > 1) {
        return fn(v[m], v[m - 1], m - f);
      }

      return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function Bezier(v, k) {
      var b = 0;
      var n = v.length - 1;
      var pw = Math.pow;
      var bn = Interpolation.Utils.Bernstein;

      for (var i = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
      }

      return b;
    },
    CatmullRom: function CatmullRom(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = Interpolation.Utils.CatmullRom;

      if (v[0] === v[m]) {
        if (k < 0) {
          i = Math.floor(f = m * (1 + k));
        }

        return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
      } else {
        if (k < 0) {
          return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
        }

        if (k > 1) {
          return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
        }

        return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
      }
    },
    Utils: {
      Linear: function Linear(p0, p1, t) {
        return (p1 - p0) * t + p0;
      },
      Bernstein: function Bernstein(n, i) {
        var fc = Interpolation.Utils.Factorial;
        return fc(n) / fc(i) / fc(n - i);
      },
      Factorial: function () {
        var a = [1];
        return function (n) {
          var s = 1;

          if (a[n]) {
            return a[n];
          }

          for (var i = n; i > 1; i--) {
            s *= i;
          }

          a[n] = s;
          return s;
        };
      }(),
      CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
      }
    }
  };

  var Sequence = function () {
    function Sequence() {}

    Sequence.nextId = function () {
      return Sequence._nextId++;
    };

    Sequence._nextId = 0;
    return Sequence;
  }();

  var mainGroup = new Group();

  var Tween = function () {
    function Tween(_object, _group) {
      if (_group === void 0) {
        _group = mainGroup;
      }

      this._object = _object;
      this._group = _group;
      this._isPaused = false;
      this._pauseStart = 0;
      this._valuesStart = {};
      this._valuesEnd = {};
      this._valuesStartRepeat = {};
      this._duration = 1000;
      this._initialRepeat = 0;
      this._repeat = 0;
      this._yoyo = false;
      this._isPlaying = false;
      this._reversed = false;
      this._delayTime = 0;
      this._startTime = 0;
      this._easingFunction = Easing.Linear.None;
      this._interpolationFunction = Interpolation.Linear;
      this._chainedTweens = [];
      this._onStartCallbackFired = false;
      this._id = Sequence.nextId();
      this._isChainStopped = false;
      this._goToEnd = false;
    }

    Tween.prototype.getId = function () {
      return this._id;
    };

    Tween.prototype.isPlaying = function () {
      return this._isPlaying;
    };

    Tween.prototype.isPaused = function () {
      return this._isPaused;
    };

    Tween.prototype.to = function (properties, duration) {
      this._valuesEnd = Object.create(properties);

      if (duration !== undefined) {
        this._duration = duration;
      }

      return this;
    };

    Tween.prototype.duration = function (d) {
      this._duration = d;
      return this;
    };

    Tween.prototype.start = function (time) {
      if (this._isPlaying) {
        return this;
      }

      this._group && this._group.add(this);
      this._repeat = this._initialRepeat;

      if (this._reversed) {
        this._reversed = false;

        for (var property in this._valuesStartRepeat) {
          this._swapEndStartRepeatValues(property);

          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
      }

      this._isPlaying = true;
      this._isPaused = false;
      this._onStartCallbackFired = false;
      this._isChainStopped = false;
      this._startTime = time !== undefined ? typeof time === 'string' ? now$1() + parseFloat(time) : time : now$1();
      this._startTime += this._delayTime;

      this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);

      return this;
    };

    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
      for (var property in _valuesEnd) {
        var startValue = _object[property];
        var startValueIsArray = Array.isArray(startValue);
        var propType = startValueIsArray ? 'array' : typeof startValue;
        var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);

        if (propType === 'undefined' || propType === 'function') {
          continue;
        }

        if (isInterpolationList) {
          var endValues = _valuesEnd[property];

          if (endValues.length === 0) {
            continue;
          }

          endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
          _valuesEnd[property] = [startValue].concat(endValues);
        }

        if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
          _valuesStart[property] = startValueIsArray ? [] : {};

          for (var prop in startValue) {
            _valuesStart[property][prop] = startValue[prop];
          }

          _valuesStartRepeat[property] = startValueIsArray ? [] : {};

          this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
        } else {
          if (typeof _valuesStart[property] === 'undefined') {
            _valuesStart[property] = startValue;
          }

          if (!startValueIsArray) {
            _valuesStart[property] *= 1.0;
          }

          if (isInterpolationList) {
            _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
          } else {
            _valuesStartRepeat[property] = _valuesStart[property] || 0;
          }
        }
      }
    };

    Tween.prototype.stop = function () {
      if (!this._isChainStopped) {
        this._isChainStopped = true;
        this.stopChainedTweens();
      }

      if (!this._isPlaying) {
        return this;
      }

      this._group && this._group.remove(this);
      this._isPlaying = false;
      this._isPaused = false;

      if (this._onStopCallback) {
        this._onStopCallback(this._object);
      }

      return this;
    };

    Tween.prototype.end = function () {
      this._goToEnd = true;
      this.update(Infinity);
      return this;
    };

    Tween.prototype.pause = function (time) {
      if (time === void 0) {
        time = now$1();
      }

      if (this._isPaused || !this._isPlaying) {
        return this;
      }

      this._isPaused = true;
      this._pauseStart = time;
      this._group && this._group.remove(this);
      return this;
    };

    Tween.prototype.resume = function (time) {
      if (time === void 0) {
        time = now$1();
      }

      if (!this._isPaused || !this._isPlaying) {
        return this;
      }

      this._isPaused = false;
      this._startTime += time - this._pauseStart;
      this._pauseStart = 0;
      this._group && this._group.add(this);
      return this;
    };

    Tween.prototype.stopChainedTweens = function () {
      for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
        this._chainedTweens[i].stop();
      }

      return this;
    };

    Tween.prototype.group = function (group) {
      this._group = group;
      return this;
    };

    Tween.prototype.delay = function (amount) {
      this._delayTime = amount;
      return this;
    };

    Tween.prototype.repeat = function (times) {
      this._initialRepeat = times;
      this._repeat = times;
      return this;
    };

    Tween.prototype.repeatDelay = function (amount) {
      this._repeatDelayTime = amount;
      return this;
    };

    Tween.prototype.yoyo = function (yoyo) {
      this._yoyo = yoyo;
      return this;
    };

    Tween.prototype.easing = function (easingFunction) {
      this._easingFunction = easingFunction;
      return this;
    };

    Tween.prototype.interpolation = function (interpolationFunction) {
      this._interpolationFunction = interpolationFunction;
      return this;
    };

    Tween.prototype.chain = function () {
      var tweens = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        tweens[_i] = arguments[_i];
      }

      this._chainedTweens = tweens;
      return this;
    };

    Tween.prototype.onStart = function (callback) {
      this._onStartCallback = callback;
      return this;
    };

    Tween.prototype.onUpdate = function (callback) {
      this._onUpdateCallback = callback;
      return this;
    };

    Tween.prototype.onRepeat = function (callback) {
      this._onRepeatCallback = callback;
      return this;
    };

    Tween.prototype.onComplete = function (callback) {
      this._onCompleteCallback = callback;
      return this;
    };

    Tween.prototype.onStop = function (callback) {
      this._onStopCallback = callback;
      return this;
    };

    Tween.prototype.update = function (time, autoStart) {
      if (time === void 0) {
        time = now$1();
      }

      if (autoStart === void 0) {
        autoStart = true;
      }

      if (this._isPaused) return true;
      var property;
      var elapsed;
      var endTime = this._startTime + this._duration;

      if (!this._goToEnd && !this._isPlaying) {
        if (time > endTime) return false;
        if (autoStart) this.start(time);
      }

      this._goToEnd = false;

      if (time < this._startTime) {
        return true;
      }

      if (this._onStartCallbackFired === false) {
        if (this._onStartCallback) {
          this._onStartCallback(this._object);
        }

        this._onStartCallbackFired = true;
      }

      elapsed = (time - this._startTime) / this._duration;
      elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;

      var value = this._easingFunction(elapsed);

      this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);

      if (this._onUpdateCallback) {
        this._onUpdateCallback(this._object, elapsed);
      }

      if (elapsed === 1) {
        if (this._repeat > 0) {
          if (isFinite(this._repeat)) {
            this._repeat--;
          }

          for (property in this._valuesStartRepeat) {
            if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
              this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
            }

            if (this._yoyo) {
              this._swapEndStartRepeatValues(property);
            }

            this._valuesStart[property] = this._valuesStartRepeat[property];
          }

          if (this._yoyo) {
            this._reversed = !this._reversed;
          }

          if (this._repeatDelayTime !== undefined) {
            this._startTime = time + this._repeatDelayTime;
          } else {
            this._startTime = time + this._delayTime;
          }

          if (this._onRepeatCallback) {
            this._onRepeatCallback(this._object);
          }

          return true;
        } else {
          if (this._onCompleteCallback) {
            this._onCompleteCallback(this._object);
          }

          for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].start(this._startTime + this._duration);
          }

          this._isPlaying = false;
          return false;
        }
      }

      return true;
    };

    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
      for (var property in _valuesEnd) {
        if (_valuesStart[property] === undefined) {
          continue;
        }

        var start = _valuesStart[property] || 0;
        var end = _valuesEnd[property];
        var startIsArray = Array.isArray(_object[property]);
        var endIsArray = Array.isArray(end);
        var isInterpolationList = !startIsArray && endIsArray;

        if (isInterpolationList) {
          _object[property] = this._interpolationFunction(end, value);
        } else if (typeof end === 'object' && end) {
          this._updateProperties(_object[property], start, end, value);
        } else {
          end = this._handleRelativeValue(start, end);

          if (typeof end === 'number') {
            _object[property] = start + (end - start) * value;
          }
        }
      }
    };

    Tween.prototype._handleRelativeValue = function (start, end) {
      if (typeof end !== 'string') {
        return end;
      }

      if (end.charAt(0) === '+' || end.charAt(0) === '-') {
        return start + parseFloat(end);
      } else {
        return parseFloat(end);
      }
    };

    Tween.prototype._swapEndStartRepeatValues = function (property) {
      var tmp = this._valuesStartRepeat[property];
      var endValue = this._valuesEnd[property];

      if (typeof endValue === 'string') {
        this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
      } else {
        this._valuesStartRepeat[property] = this._valuesEnd[property];
      }

      this._valuesEnd[property] = tmp;
    };

    return Tween;
  }();

  var TWEEN = mainGroup;
  TWEEN.getAll.bind(TWEEN);
  TWEEN.removeAll.bind(TWEEN);
  TWEEN.add.bind(TWEEN);
  TWEEN.remove.bind(TWEEN);
  TWEEN.update.bind(TWEEN);
  var easingMap = {
    linear: Easing.Linear.None,
    'ease-in': Easing.Quadratic.In,
    'ease-out': Easing.Quadratic.Out,
    'ease-in-out': Easing.Quadratic.InOut,
    'bounce-in': Easing.Bounce.In,
    'bounce-out': Easing.Bounce.Out,
    'bounce-in-out': Easing.Bounce.InOut,
    none: function none(p) {
      return ~~p;
    }
  };

  var Animation = function () {
    function Animation(timelines, tweenGroup) {
      this.tweens = [];
      this.timelines = [];
      this.finishCount = 0;
      this.callbacks = new Map();
      this.objectCache = {};
      this.currIteration = 0;
      this.timelines = timelines;
      this.tweenGroup = tweenGroup;
    }

    Animation.prototype.on = function (eventName, callback) {
      if (!this.callbacks[eventName]) {
        this.callbacks.set(eventName, []);
      }

      this.callbacks.get(eventName).push(callback);
    };

    Animation.prototype.emit = function (eventName) {
      var callbacks = this.callbacks.get(eventName);
      if (!callbacks || !callbacks.length) return;
      callbacks.forEach(function (fn) {
        return fn();
      });
    };

    Animation.prototype.checkFinish = function () {
      if (++this.finishCount == this.tweens.length) {
        if (++this.currIteration == this.iteration) {
          this.emit('finish');
        } else {
          if (this.stoped) return;
          this.start();
        }
      }
    };

    Animation.prototype.getObjectCache = function (component, name) {
      var key = "" + component.gameObject.id + component.name;

      if (!this.objectCache[key]) {
        this.objectCache[key] = {};
      }

      if (this.objectCache[key][name]) {
        return this.objectCache[key][name];
      }

      var keys = name.split('.');
      var keyIndex = keys.length - 1;
      var property = component;

      for (var i = 0; i < keyIndex; i++) {
        property = property[keys[i]];
      }

      this.objectCache[key][name] = {
        property: property,
        key: keys[keyIndex]
      };
      return this.objectCache[key][name];
    };

    Animation.prototype.doAnim = function (_a) {
      var component = _a.component,
          name = _a.name,
          value = _a.value;

      var _b = this.getObjectCache(component, name),
          property = _b.property,
          key = _b.key;

      property[key] = value;
    };

    Animation.prototype.init = function () {
      var _this = this;

      this.checkFinishFunc = this.checkFinish.bind(this);
      var lastTween;
      this.timelines.forEach(function (timeline, i) {
        for (var j = 0; j < timeline.values.length - 1; j++) {
          var frame = timeline.values[j];
          var nextFrame = timeline.values[j + 1];
          var tween = new Tween({
            value: frame.value
          }, _this.tweenGroup).to({
            value: nextFrame.value
          }).duration(nextFrame.time - frame.time).easing(easingMap[frame.tween]).onUpdate(function (props) {
            _this.doAnim({
              component: timeline.component,
              name: timeline.name,
              value: props.value
            });
          });

          if (j === 0) {
            _this.tweens[i] = tween;
          } else {
            lastTween.chain(tween);
          }

          lastTween = tween;
        }

        lastTween && lastTween.onComplete(function () {
          return _this.checkFinishFunc();
        });
      });
    };

    Animation.prototype.play = function (iteration, currentTime) {
      if (iteration === void 0) {
        iteration = 1;
      }

      this.currentTime = currentTime;
      this.stoped = false;
      this.start();
      this.currIteration = 0;
      this.iteration = iteration;
    };

    Animation.prototype.start = function () {
      var _this = this;

      this.finishCount = 0;
      this.tweens.length = 0;
      this.init();
      this.tweens.forEach(function (tween) {
        return tween.start(_this.currentTime);
      });
    };

    Animation.prototype.pause = function () {
      var _this = this;

      this.tweens.forEach(function (tween) {
        return tween.pause(_this.currentTime);
      });
    };

    Animation.prototype.resume = function () {
      var _this = this;

      this.tweens.forEach(function (tween) {
        return tween.resume(_this.currentTime);
      });
    };

    Animation.prototype.stop = function () {
      this.stoped = true;
      this.tweens.forEach(function (tween) {
        return tween.stop();
      });
    };

    Animation.prototype.destroy = function () {
      this.stop();
      this.tweens = null;
      this.timelines = null;
      this.objectCache = null;
      this.callbacks.clear();
      this.callbacks = null;
    };

    return Animation;
  }();

  var Animation$1 = Animation;

  var Transition = function (_super) {
    __extends(Transition, _super);

    function Transition() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.animations = {};
      _this.group = {};
      _this.currentTime = 0;
      _this.needPlay = [];
      return _this;
    }

    Transition.prototype.init = function (_a) {
      var group = (_a === void 0 ? {
        group: {}
      } : _a).group;
      this.group = group;
      this.tweenGroup = new Group();
    };

    Transition.prototype.awake = function () {
      for (var name_1 in this.group) {
        this.newAnimation(name_1);
      }
    };

    Transition.prototype.play = function (name, iteration) {
      if (!name) {
        name = Object.keys(this.group)[0];
      }

      if (name && !this.animations[name] && this.group[name]) {
        this.newAnimation(name);
      }

      if (name && this.animations[name]) {
        this.needPlay.push({
          name: name,
          iteration: iteration
        });
      }
    };

    Transition.prototype.stop = function (name) {
      var _a, _b;

      if (!name) {
        for (var key in this.animations) {
          (_a = this.animations[key]) === null || _a === void 0 ? void 0 : _a.stop();
        }
      } else {
        (_b = this.animations[name]) === null || _b === void 0 ? void 0 : _b.stop();
      }
    };

    Transition.prototype.onPause = function () {
      var _a;

      for (var key in this.animations) {
        (_a = this.animations[key]) === null || _a === void 0 ? void 0 : _a.pause();
      }
    };

    Transition.prototype.onResume = function () {
      var _a;

      for (var key in this.animations) {
        (_a = this.animations[key]) === null || _a === void 0 ? void 0 : _a.resume();
      }
    };

    Transition.prototype.onDestroy = function () {
      var _a;

      for (var key in this.animations) {
        (_a = this.animations[key]) === null || _a === void 0 ? void 0 : _a.destroy();
      }

      this.tweenGroup.removeAll();
      this.tweenGroup = null;
      this.group = null;
      this.animations = null;
      this.removeAllListeners();
    };

    Transition.prototype.update = function (e) {
      var e_1, _a;

      var _b;

      this.currentTime = e.time;

      for (var key in this.animations) {
        this.animations[key].currentTime = e.time;
      }

      this.tweenGroup.update(e.time);

      try {
        for (var _c = __values(this.needPlay), _d = _c.next(); !_d.done; _d = _c.next()) {
          var play = _d.value;
          (_b = this.animations[play.name]) === null || _b === void 0 ? void 0 : _b.play(play.iteration, this.currentTime);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      this.needPlay.length = 0;
    };

    Transition.prototype.newAnimation = function (name) {
      var _this = this;

      var animation = new Animation$1(this.group[name], this.tweenGroup);
      animation.on('finish', function () {
        return _this.emit('finish', name);
      });
      this.animations[name] = animation;
    };

    Transition.componentName = 'Transition';
    return Transition;
  }(eva_js.Component);

  var Transition$1 = Transition;

  var TransitionSystem = function (_super) {
    __extends(TransitionSystem, _super);

    function TransitionSystem() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.name = 'transition';
      return _this;
    }

    TransitionSystem.systemName = 'transition';
    return TransitionSystem;
  }(eva_js.System);

  var TransitionSystem$1 = TransitionSystem;
  exports.Transition = Transition$1;
  exports.TransitionSystem = TransitionSystem$1;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  return exports;
}({}, EVA);

window.EVA.plugin.transition = window.EVA.plugin.transition || _EVA_IIFE_transition;
