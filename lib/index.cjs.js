"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var r =
    " \t\r\n~!@#$%^&*()_+-=【】、{}|;':\"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄",
  o = (function() {
    function o(t) {
      void 0 === t && (t = {}),
        (this.map = {}),
        (this.noiseWordMap = o.generateNoiseWordMap(r));
      var e = t.wordList,
        a = void 0 === e ? [] : e,
        i = t.noiseWords,
        s = void 0 === i ? "" : i;
      s && this.setNoiseWords(s), this.addWords(a);
    }
    return (
      (o.generateNoiseWordMap = function(r) {
        for (var o = {}, t = 0, e = r.length; t < e; t++)
          o[r.charCodeAt(t)] = !0;
        return o;
      }),
      (o.isWordEnd = function(r) {
        return Reflect.has(r, o.WordEndTag);
      }),
      (o.prototype.filterNoiseChar = function(r) {
        for (var o = "", t = 0, e = r.length; t < e; t++)
          this.noiseWordMap[r.charCodeAt(t)] || (o += r.charAt(t));
        return o;
      }),
      (o.prototype.setNoiseWords = function(r) {
        this.noiseWordMap = o.generateNoiseWordMap(r);
      }),
      (o.prototype.clearWords = function() {
        this.map = {};
      }),
      (o.prototype.addWords = function(r) {
        for (var t = 0, e = r.length; t < e; t++)
          for (
            var a = this.map,
              i = this.filterNoiseChar(r[t]),
              s = 0,
              n = i.length;
            s < n;
            s++
          ) {
            var d = i.charAt(s).toLowerCase(),
              h = (a[d] = a[d] || {});
            s === n - 1 && (h[o.WordEndTag] = !0), (a = h);
          }
      }),
      (o.prototype.match = function(r) {
        for (var t = new Set(), e = this.map, a = r.length, i = 0; i < a; i++) {
          var s = r.charCodeAt(i);
          if (!this.noiseWordMap[s])
            for (var n = i; n < a; n++) {
              var d = r.charCodeAt(n);
              if (!this.noiseWordMap[d]) {
                if (!(e = e[r.charAt(n).toLowerCase()])) {
                  e = this.map;
                  break;
                }
                if (o.isWordEnd(e)) {
                  var h = this.filterNoiseChar(r.substring(i, n + 1));
                  t.add(h);
                }
              }
            }
        }
        return Array.from(t);
      }),
      (o.prototype.verify = function(r) {
        for (var t = this.map, e = r.length, a = 0; a < e; a++) {
          var i = r.charCodeAt(a);
          if (!this.noiseWordMap[i])
            for (var s = a; s < e; s++) {
              var n = r.charCodeAt(s);
              if (!this.noiseWordMap[n]) {
                if (!(t = t[r.charAt(s).toLowerCase()])) {
                  t = this.map;
                  break;
                }
                if (o.isWordEnd(t)) return !0;
              }
            }
        }
        return !1;
      }),
      (o.prototype.filter = function(r, t) {
        void 0 === t && (t = "*");
        for (var e = "", a = 0, i = this.map, s = r.length, n = 0; n < s; n++) {
          var d = r.charCodeAt(n);
          if (this.noiseWordMap[d])
            (e += r.charAt(n)), (a = Math.max(a - 1, 0));
          else
            for (var h = !1, f = n; f < s; f++) {
              var p = r.charCodeAt(f);
              if (!this.noiseWordMap[p])
                if ((i = i[r.charAt(f).toLowerCase()]) && o.isWordEnd(i))
                  h || (e += t), (a = Math.max(a - 1, f - n)), (h = !0);
                else if (!i || f === s - 1) {
                  h ||
                    ((e += a > 0 ? t : r.charAt(n)), (a = Math.max(a - 1, 0))),
                    (i = this.map);
                  break;
                }
            }
        }
        return e;
      }),
      (o.WordEndTag = "__endTag__"),
      o
    );
  })();
(exports.SensitiveWordTool = o), (exports.default = o);
