$(document).ready(function() {
  $(".track-group").data("wt1", {
    category: "WT.cg_n",
    dynamicEvent: '$("meta[name=\'WT.cg_n\']").attr("content")'
  });
  $(".track-group").data("wt2", {
    category: "WT.dl",
    event: "50"
  });
  $(".track-group").data("wt3", {
    category: "WT.z_cur",
    dynamicEvent: '$("meta[name=\'WT.z_cur\']").attr("content")'
  });
  $(".track-group").data("wt4", {
    category: "WT.z_mod",
    dynamicEvent: '$obj.attr("id")'
  });
  $(".track-group").data("wt5", {
    category: "WT.z_tgturl",
    dynamicEvent: "event.target.id"
  });
  $(".track-group").data("wt6", {
    category: "WT.dcsvid",
    dynamicEvent: 'WebtrendsAsync.prototype.dcsGetCookie("PID")'
  });
  $(".track-group").data("ga3", {
    category: "WT.cg_n",
    dynamicEvent: '$("meta[name=\'WT.cg_n\']").attr("content")'
  });
  $(".track-group").data("ga1", {
    category: "WT.z_mod",
    dynamicEvent: '$obj.attr("id")'
  });
  $(".track-group").data("ga2", {
    category: "WT.z_tgturl",
    dynamicEvent: "event.target.id"
  });
  $(".track,.track-group").bind("click",
  function(a) {
    doTracking($(this), a)
  })
});
function doTracking($obj, event) {
  if (($(event.target).parents("a").length <= 0) && ($(event.target).css("cursor") != "pointer") && ($(event.target).parents().css("cursor") != "pointer")) {
    trace("No need to fire!");
    return
  }
  var dynEvent = "";
  var i = 0;
  var key = "ga";
  var wtkeyValPair = "";
  var gakeyValPair = "";
  var gaGroup = "";
  for (i = 1; i <= 6; i++) {
    dynEvent = "";
    theEvent = "";
    key = "ga" + i;
    if ($obj.data(key) != null) {
      theCategory = $obj.data(key).category;
      if ($obj.data(key).event != null) {
        theEvent = $obj.data(key).event;
        if (gakeyValPair != "") {
          gakeyValPair += ","
        }
        gakeyValPair += "'" + theEvent + "'"
      }
      if ($obj.data(key).dynamicEvent != null) {
        try {
          if (theCategory == "WT.z_tgturl") {
            dynEvent = unescape($(event.target).parents("a").attr("href"));
            if (dynEvent == null || dynEvent == "" || dynEvent == "undefined") {
              var $target = $(event.target);
              if ($target.is("A")) {
                dynEvent = $target.attr("href")
              }
            }
            if (dynEvent == null || dynEvent == "" || dynEvent == "undefined") {
              var str = $target.attr("onclick");
              dynEvent = str.substring(1 + str.indexOf("'"), str.lastIndexOf("'"))
            }
          }
          if (dynEvent == null || dynEvent == "" || dynEvent == "undefined") {
            dynEvent = eval($obj.data(key).dynamicEvent)
          }
          if (dynEvent == null) {
            dynEvent = ""
          }
          if (theCategory == "WT.cg_n") {
            gaGroup = dynEvent
          } else {
            if (gakeyValPair != "") {
              gakeyValPair += ","
            }
            gakeyValPair += "'" + dynEvent + "'"
          }
        } catch(err) {
          dynEvent = ""
        }
      }
    }
    key = "wt" + i;
    dynEvent = "";
    theEvent = "";
    if ($obj.data(key) != null) {
      theCategory = $obj.data(key).category;
      if ($obj.data(key).event != null) {
        theEvent = $obj.data(key).event;
        if (wtkeyValPair != "") {
          wtkeyValPair += ","
        }
        wtkeyValPair += "'" + theCategory + "','" + theEvent + "'"
      }
      if ($obj.data(key).dynamicEvent != null) {
        try {
          if (theCategory == "WT.z_tgturl") {
            dynEvent = unescape($(event.target).parents("a").attr("href"));
            if (dynEvent == null || dynEvent == "" || dynEvent == "undefined") {
              var $target = $(event.target);
              if ($target.is("A")) {
                dynEvent = $target.attr("href")
              }
              if (dynEvent == null || dynEvent == "" || dynEvent == "undefined") {
                var str = $target.attr("onclick");
                dynEvent = str.substring(1 + str.indexOf("'"), str.lastIndexOf("'"))
              }
            }
          }
          if (dynEvent == null || dynEvent == "") {
            dynEvent = eval($obj.data(key).dynamicEvent)
          }
          if (dynEvent == null) {
            dynEvent = ""
          }
          if (wtkeyValPair != "") {
            wtkeyValPair += ","
          }
          wtkeyValPair += "'" + theCategory + "','" + dynEvent + "'"
        } catch(err) {
          dynEvent = ""
        }
      }
    }
  }
  trace("webtrendsparams: " + wtkeyValPair);
  trace("gaparams: " + gakeyValPair);
  if (typeof dcsMultiTrack != "undefined") {
    if (wtkeyValPair != "") {
      eval("dcsMultiTrack(" + wtkeyValPair + ")")
    }
  }
  if (gakeyValPair != "") {
    var ga = new com.art.core.tracking.GoogleAnalytics(gaGroup);
    if (typeof ga != "undefined") {
      eval("ga.trackEventWithCategory(" + gakeyValPair + ")")
    }
  }
}
function trace(a) {
  var b = true;
  if (typeof showDebugTrace != "undefined") {
    b = art.core.utils.boolparse(showDebugTrace)
  }
  if (b) {
    if ((window.console !== undefined)) {
      console.log(a)
    }
  }
}
function link(a) {
  document.location = a
}; (function() {
  var m = {},
  n = window,
  a = n.document,
  h = "localStorage",
  c = "globalStorage",
  i = "__storejs__",
  j;
  m.disabled = false;
  m.set = function(e, p) {};
  m.get = function(e) {};
  m.remove = function(e) {};
  m.clear = function() {};
  m.transact = function(p, e, q) {
    var r = m.get(p);
    if (q == null) {
      q = e;
      e = null
    }
    if (typeof r == "undefined") {
      r = e || {}
    }
    q(r);
    m.set(p, r)
  };
  m.getAll = function() {};
  m.serialize = function(e) {
    return JSON.stringify(e)
  };
  m.deserialize = function(e) {
    if (typeof e != "string") {
      return undefined
    }
    return JSON.parse(e)
  };
  function g() {
    try {
      return (h in n && n[h])
    } catch(e) {
      return false
    }
  }
  function f() {
    try {
      return (c in n && n[c] && n[c][n.location.hostname])
    } catch(e) {
      return false
    }
  }
  if (g()) {
    j = n[h];
    m.set = function(e, p) {
      if (p === undefined) {
        return m.remove(e)
      }
      j.setItem(e, m.serialize(p))
    };
    m.get = function(e) {
      return m.deserialize(j.getItem(e))
    };
    m.remove = function(e) {
      j.removeItem(e)
    };
    m.clear = function() {
      j.clear()
    };
    m.getAll = function() {
      var q = {};
      for (var e = 0; e < j.length; ++e) {
        var p = j.key(e);
        q[p] = m.get(p)
      }
      return q
    }
  } else {
    if (f()) {
      j = n[c][n.location.hostname];
      m.set = function(e, p) {
        if (p === undefined) {
          return m.remove(e)
        }
        j[e] = m.serialize(p)
      };
      m.get = function(e) {
        return m.deserialize(j[e] && j[e].value)
      };
      m.remove = function(e) {
        delete j[e]
      };
      m.clear = function() {
        for (var e in j) {
          delete j[e]
        }
      };
      m.getAll = function() {
        var q = {};
        for (var e = 0; e < j.length; ++e) {
          var p = j.key(e);
          q[p] = m.get(p)
        }
        return q
      }
    } else {
      if (a.documentElement.addBehavior) {
        var l, k;
        /*
        try {
          k = new ActiveXObject("htmlfile");
          k.open();
          k.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>');
          k.close();
          l = k.w.frames[0].document;
          j = l.createElement("div")
        } catch(b) {
          j = a.createElement("div");
          l = a.body
        }
        */
        function o(e) {
          return function() {
            var p = Array.prototype.slice.call(arguments, 0);
            p.unshift(j);
            l.appendChild(j);
            j.addBehavior("#default#userData");
            j.load(h);
            var q = e.apply(m, p);
            l.removeChild(j);
            return q
          }
        }
        function d(e) {
          return "_" + e
        }
        m.set = o(function(p, e, q) {
          e = d(e);
          if (q === undefined) {
            return m.remove(e)
          }
          p.setAttribute(e, m.serialize(q));
          p.save(h)
        });
        m.get = o(function(p, e) {
          e = d(e);
          return m.deserialize(p.getAttribute(e))
        });
        m.remove = o(function(p, e) {
          e = d(e);
          p.removeAttribute(e);
          p.save(h)
        });
        m.clear = o(function(r) {
          var p = r.XMLDocument.documentElement.attributes;
          r.load(h);
          for (var q = 0,
          e; e = p[q]; q++) {
            r.removeAttribute(e.name)
          }
          r.save(h)
        });
        m.getAll = o(function(s) {
          var p = s.XMLDocument.documentElement.attributes;
          s.load(h);
          var r = {};
          for (var q = 0,
          e; e = p[q]; ++q) {
            r[e] = m.get(e)
          }
          return r
        })
      }
    }
  }
  try {
    m.set(i, i);
    if (m.get(i) != i) {
      m.disabled = true
    }
    m.remove(i)
  } catch(b) {
    m.disabled = true
  }
  if (typeof module != "undefined") {
    module.exports = m
  } else {
    if (typeof define === "function" && define.amd) {
      define(m)
    } else {
      this.store = m
    }
  }
})();
var htmlString;
var autoSuggestDiv = null;
var lastSearchTerm = null;
var userSearchTerm = null;
var howmanycharsearch = 3;
var isImage = 1;
var wt_EnabledSearchAhead = "false";
var setMouseMoveFlag = false;
$(document).ready(function() {
  var c = GetCookieDictionary("arts", "IsMuseumMode");
  if (c.length == 0) {
    AutoSuggest(document.getElementById("Search_String"), "#Search_String");
    $("body").click(function() {
      $(".searchSuggest").hide();
      setMouseMoveFlag = false
    });
    $(".ssgItem").live("click",
    function() {
      goToCategory($(this))
    });
    $("#Search_String").keydown(function(d) {
      if (d.keyCode == "13") {
        if ($(".ssg_Selected").length) {
          d.preventDefault();
          goToCategory($(".ssg_Selected"))
        }
      }
    });
    $("#Search_String").live("mouseover",
    function() {
      if ($("#Search_String").val().length > 0 && userSearchTerm != null) {
        $("#Search_String").val(userSearchTerm)
      }
    });
    $(".visualsearchsymbol").live("click",
    function() {
      $(".VisualSearchUL").slideToggle("slow")
    })
  }
  $(window).resize(function() {
    if ($("#autoSuggestDiv").is(":visible")) {
      global_ssg.positionSearchSuggest()
    }
  });
  var a = 0,
  b = 0;
  $("body").mousemove(function(d) {
    if (a != d.pageX || b != d.pageY) {
      setMouseMoveFlag = true;
      a = d.pageX;
      b = d.pageY
    }
  })
});
function fnMouseOver(b) {
  if (setMouseMoveFlag) {
    var a = $(b);
    applyItemStyle(a, "over", "focus")
  }
}
function fnMouseOut(b) {
  var a = $(b);
  applyItemStyle(a, "out", "focus")
}
var global_ssg;
function AutoSuggest(elem, jqueryobj) {
  var me = this;
  global_ssg = me;
  this.elem = elem;
  var oElem = elem;
  this.div = null;
  this.highlighted = -1;
  var searchBox = $(jqueryobj);
  var KEYUP = 38;
  var KEYDN = 40;
  var ESC = 27;
  var BACKSPACE = 8;
  elem.setAttribute("autocomplete", "off");
  elem.onkeydown = function(ev) {
    var key = me.getKeyCode(ev);
    switch (key) {
    case KEYUP:
      if (me.highlighted > 0) {
        me.highlighted--
      } else {
        $("#Search_String").val(userSearchTerm);
        me.highlighted = -1
      }
      if ($(".searchSuggest").css("display") != "none") {
        me.changeHighlight(key)
      }
      break;
    case KEYDN:
      if (me.highlighted < $(".ssg_results .ssgItem").length - 1) {
        me.highlighted++
      }
      if ($(".searchSuggest").css("display") != "none") {
        me.changeHighlight(key)
      }
      break
    }
  };
  elem.onkeyup = function(ev) {
    var key = me.getKeyCode(ev);
    switch (key) {
    case ESC:
      me.hideDiv();
      break;
    case 40:
      break;
    case 38:
      break;
    case 37:
      break;
    case 39:
      break;
    case 13:
      break;
    default:
      if (this.value.length > 0) {
        me.createDiv()
      } else {
        $(".searchSuggest").hide();
        setMouseMoveFlag = false;
        me.hideDiv()
      }
      break
    }
  };
  this.createDiv = function() {
    var url = "/ADC.NET/root/Pages/Gallery/SearchSuggest.aspx?SearchValue=";
    var inputLength = oElem.value.length;
    userInput = oElem.value;
    var isItNumeric = false;
    if (inputLength < 0) {
      this.highlighted = -1;
      $(".searchSuggest").hide();
      setMouseMoveFlag = false;
      me.hideDiv();
      return
    }
    if (inputLength > 0) {
      this.highlighted = -1;
      userInput = RemoveNonAlphaNumericTerms(userInput);
      inputLength = userInput.length;
      var customerZoneIDStr = "&CustomerZoneID=" + GetCustomerZoneID() + "&endecagroup=2&LanguageID=" + GetLanguageID() + "&sby=" + GetSearhByIfAvailable();
      var searchSuggestURL = url + userInput + customerZoneIDStr;
      isItNumeric = isnumeric(userInput);
      if (howmanycharsearch > 1) {
        if (autoSuggestDiv == null || autoSuggestDiv == " ") {
          if (inputLength == howmanycharsearch || inputLength > howmanycharsearch + 1 && ajaxCallNotMade(userInput)) {
            userSearchTerm = userInput;
            if (!isItNumeric) {
              me.callAjaxAutoSuggest(searchSuggestURL);
              lastSearchTerm = userInput.substring(0, howmanycharsearch)
            }
          }
        } else {
          if (inputLength == howmanycharsearch && (!isItNumeric)) {
            userSearchTerm = userInput;
            me.callAjaxAutoSuggest(searchSuggestURL);
            me.refineResults(userInput)
          }
        }
        if (inputLength < howmanycharsearch) {
          $(".searchSuggest").hide();
          setMouseMoveFlag = false;
          me.hideDiv()
        }
        if (inputLength > howmanycharsearch && (!isItNumeric)) {
          userSearchTerm = userInput;
          me.callAjaxAutoSuggest(searchSuggestURL)
        }
      } else {
        if (!isItNumeric) {
          userSearchTerm = userInput;
          me.callAjaxAutoSuggest(searchSuggestURL)
        }
      }
    }
  };
  this.hideDiv = function() {
    if (autoSuggestDiv) {
      document.body.removeChild(autoSuggestDiv);
      autoSuggestDiv = null;
      this.highlighted = -1;
      setMouseMoveFlag = false
    }
  };
  this.changeHighlight = function(key) {
    $(".ssg_results").find(".ssgItem").each(function(i) {
      if (i == highlighted) {
        applyItemStyle($(this), "over", "focus")
      } else {
        if ($(this).hasClass("ssg_Selected")) {
          applyItemStyle($(this), "out", "nofocus")
        }
      }
      if (key == 13) {
        goToCategory($(this))
      }
    })
  };
  this.callAjaxAutoSuggest = function(searchSuggestURL) {
    makeAjaxCallToTealeafSS("Request");
    $.ajax({
      url: searchSuggestURL,
      processData: false,
      cache: false,
      type: "GET",
      beforeSend: function() {},
      success: function(callback) {
        var flag = me.callBackAutoSuggest(callback);
        if (flag && searchBox.val().length > 0) {
          makeAjaxCallToTealeafSS("Results");
          if (autoSuggestDiv == null || autoSuggestDiv == " ") {
            autoSuggestDiv = me.fnDOMElementCreate("DIV", "autoSuggestDiv", "searchSuggest");
            this.div = autoSuggestDiv;
            autoSuggestDiv.innerHTML = htmlString;
            document.body.appendChild(autoSuggestDiv)
          } else {
            autoSuggestDiv.innerHTML = htmlString
          }
          var temp = me.fnDOMElementCreate("UL", "ssgmani", "ssgmani");
          temp.innerHTML = $(".ssg_results").html();
          autoSuggestDiv.appendChild(temp);
          $(".ssgmani").hide();
          var oText = document.getElementById("Search_String");
          if (oText.value.length > howmanycharsearch) {
            if ($(".ssgmani").length < 0) {
              me.callAjaxAutoSuggest(searchSuggestURL)
            }
          }
          if (htmlString.length > 1) {
            me.positionSearchSuggest();
            if ($(".ssg_results").html().length > 0) {
              $(".searchSuggest").slideDown("normal")
            }
          }
        }
      },
      error: function(textStatus, errorThrown) {}
    })
  };
  this.callBackAutoSuggest = function(data) {
    htmlString = "";
    var temp = data;
    var startpos = temp.indexOf("<div", 0);
    var endpos = temp.indexOf(">", startpos);
    var startpos = temp.indexOf("</div>", endpos);
    var tempstr = temp.substring(startpos, endpos + 1);
    var tempboldcnt = searchBox.val().length;
    if (tempstr != "nodata") {
      var jsonobj = eval("(" + tempstr + ")");
      htmlString = '<ul class="ssg_results">';
      for (var i = 0; i < jsonobj.searchsuggest.items.item.length; i++) {
        if (jsonobj.searchsuggest.items.item[i].itemcount != "0") {
          htmlString += '<li class="ssgItem ssgCurrent" onmouseover="fnMouseOver(this);" onmouseout="fnMouseOut(this);">';
          if (isImage == 1) {
            htmlString += '<div class="ssg_galleryThumb floatLeft" style="background-image:url(' + jsonobj.searchsuggest.items.item[i].imagelocation + ');"></div>'
          }
          htmlString += '<div class="ssgTextBox floatLeft">';
          var temp = jsonobj.searchsuggest.items.item[i].categoryname;
          var result = GetHighlightedString(temp, searchBox.val());
          htmlString += '<div class="ssg_heading_hide" n="' + temp + '">' + result + "</div>";
          result = autoEllipseText(temp, "35");
          var result = GetHighlightedString(result, searchBox.val());
          htmlString += '<div class="ssg_heading" n="' + temp + '">' + result + "</div>";
          var txt = jsonobj.searchsuggest.items.item[i].itemcount;
          var itemCount = txt;
          var re1 = ".*?";
          var re2 = "(\\d+)";
          var p = new RegExp(re1 + re2, ["i"]);
          var m = p.exec(txt);
          if (m != null) {
            var int1 = m[1];
            itemCount = int1
          }
          if (itemCount == "1") {
            itemCount = me.insertCommaToCategoryCount(itemCount) + " item"
          } else {
            itemCount = me.insertCommaToCategoryCount(itemCount) + " items"
          }
          htmlString += '<div class="ssg_byline">' + itemCount + "</div>";
          var sessionID = me.getCookie("CustSessionID");
          var ui = "?ui=" + sessionID;
          var t = jsonobj.searchsuggest.items.item[i].galleryurl;
          var t1 = t.indexOf("?", 0);
          var gUrl = t.substring(0, t1) + ui;
          if (wt_EnabledSearchAhead == "true") {
            var wt_OSS = "";
            wt_OSS = temp.replace(" / ", "/");
            wt_OSS = wt_OSS.replace("& ", "");
            wt_OSS = wt_OSS.replace(/ /g, "+");
            var wt_Search = "Search+Ahead";
            gUrl = gUrl + "&WT.cg_n=" + wt_Search + "&WT.oss=" + wt_OSS + "&SSK=" + wt_OSS
          }
          htmlString += '<div class="ssgURL">' + gUrl + "</div>";
          htmlString += '</div><div class="clear" style="font-size:0;line-height:0;margin:0;font-weight:normal;height:0px;"></div></li>'
        }
      }
      htmlString += "</ul>";
      return true
    } else {
      $(".searchSuggest").hide();
      setMouseMoveFlag = false;
      me.hideDiv()
    }
  };
  this.getKeyCode = function(ev) {
    if (ev) {
      return ev.keyCode
    }
    if (window.event) {
      return window.event.keyCode
    }
  };
  this.getEventSource = function(ev) {
    if (ev) {
      return ev.target
    }
    if (window.event) {
      return window.event.srcElement
    }
  };
  this.cancelEvent = function(ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation()
    }
    if (window.event) {
      window.event.returnValue = false
    }
  };
  this.fnDOMElementCreate = function(tag, id, classname) {
    var robj = null;
    robj = document.createElement(tag);
    if (id) {
      robj.id = id
    }
    if (classname) {
      robj.className = classname
    }
    return robj
  };
  this.insertCommaToCategoryCount = function(number) {
    number = "" + number;
    if (number.length > 3) {
      var mod = number.length % 3;
      var output = (mod > 0 ? (number.substring(0, mod)) : "");
      for (i = 0; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0)) {
          output += number.substring(mod + 3 * i, mod + 3 * i + 3)
        } else {
          output += "," + number.substring(mod + 3 * i, mod + 3 * i + 3)
        }
      }
      return (output)
    } else {
      return number
    }
  };
  this.positionSearchSuggest = function() {
    searchBoxOffset = $(".hdr-nav-search").offset();
    searchBoxTopPos = searchBoxOffset.top;
    searchBoxLeftPos = searchBoxOffset.left;
    searchBoxHeight = $("#Search_String").height();
    searchSuggestTopPos = searchBoxTopPos + searchBoxHeight + 10;
    searchSuggestLeftPos = searchBoxLeftPos;
    $(".searchSuggest").css("top", searchSuggestTopPos - 7);
    $(".searchSuggest").css("left", searchSuggestLeftPos - 8)
  };
  this.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length
        }
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  };
  this.refineResults = function(userInput) {
    if ($(".ssgmani").length > 0) {
      $(".ssg_results").empty();
      $(".ssgmani").find(".ssg_heading").each(function() {
        var headingText = $(this).attr("n");
        if (headingText.toLowerCase().indexOf(userInput.toLowerCase()) > 0) {
          $(this).parents("li").addClass("ssgCurrent");
          $(this).parents("li").show();
          var boldText = headingText;
          var boldHtml = "<b>" + boldText.substring(0, userInput.length) + "</b>" + boldText.substring(userInput.length, boldText.length);
          var result = GetHighlightedString(boldText, userInput);
          $(this).html(result);
          var temp = "<li class='ssgItem ssgCurrent'>" + $(this).parents("li").html() + "</li>";
          $(".ssg_results").append(temp)
        } else {
          $(this).parents("li").removeClass("ssgCurrent");
          $(this).parents("li").fadeOut("fast")
        }
      });
      if ($(".ssg_results").html().length > 0) {
        $(".searchSuggest").slideDown("normal")
      }
    }
  }
}
function applyItemStyle(a, b, c) {
  if (b == "over") {
    a.addClass("ssg_Selected");
    a.find(".ssg_byline").addClass("ssgTextHover");
    a.find(".ssgTextBox").addClass("ssgTextBoxSelected");
    a.find(".ssg_heading").hide();
    a.find(".ssg_heading_hide").show();
    if (c == "focus") {
      $("#Search_String").val(a.find(".ssg_heading_hide").attr("n"))
    }
  } else {
    if (b == "out") {
      a.removeClass("ssg_Selected");
      a.find(".ssg_byline").removeClass("ssgTextHover");
      a.find(".ssgTextBox").removeClass("ssgTextBoxSelected");
      if (document.all) {
        a.find(".ssg_heading").css("width", "203px");
        a.find(".ssg_heading_hide").css("width", "203px")
      } else {
        a.find(".ssg_heading").css("width", "206px");
        a.find(".ssg_heading_hide").css("width", "206px")
      }
      a.find(".ssg_heading").show();
      a.find(".ssg_heading_hide").hide()
    }
  }
}
function goToCategory(a) {
  theCategory = a.find(".ssg_heading").text();
  theURL = a.find(".ssgURL").text();
  $("#Search_String").val(theCategory);
  $(".searchSuggest").slideUp("normal",
  function() {
    location.href = theURL
  });
  makeAjaxCallToEndecaLogging();
  makeAjaxCallToTealeafSS(theCategory)
}
function autoEllipseText(c, a) {
  var b;
  if (c.length - 1 > a) {
    b = c.substring(0, a - 3) + "..."
  } else {
    b = c
  }
  return b
}
function ajaxCallNotMade(b) {
  retval = false;
  var a = b.substring(0, howmanycharsearch);
  if (lastSearchTerm != a) {
    retval = true
  }
  return retval
}
function GetHighlightedString(a, j) {
  j = TrimSS(j);
  var h = a.toLowerCase();
  var c = j;
  var d = h.indexOf(c.toLowerCase());
  var b = a;
  var e, f, g;
  e = h.substring(0, d);
  f = h.substring(d, d + j.length);
  if (j.toLowerCase() == f) {
    b = e + "<b>";
    b = b + f + "</b>"
  } else {
    b = e + f
  }
  g = h.substring(d + j.length);
  b = b + g;
  return b
}
function LTrimSS(d) {
  var e = new String(" \t\n\r");
  var c = new String(d);
  if (e.indexOf(c.charAt(0)) != -1) {
    var b = 0,
    a = c.length;
    while (b < a && e.indexOf(c.charAt(b)) != -1) {
      b++
    }
    c = c.substring(b, a)
  }
  return c
}
function RTrimSS(c) {
  var d = new String(" \t\n\r");
  var b = new String(c);
  if (d.indexOf(b.charAt(b.length - 1)) != -1) {
    var a = b.length - 1;
    while (a >= 0 && d.indexOf(b.charAt(a)) != -1) {
      a--
    }
    b = b.substring(0, a + 1)
  }
  return b
}
function TrimSS(a) {
  return RTrimSS(LTrimSS(a))
}
function makeAjaxCallToTealeafSS(a) {
  if (a == "Request") {
    a = a + "=SearchRequest"
  } else {
    if (a == "Results") {
      a = a + "=SearchResults"
    } else {
      a = "Action=SearchSuggestClicked" + a
    }
  }
  $.ajax({
    url: "/ADC.NET/Root/Pages/Checkout/tealeaf.aspx",
    processData: false,
    data: a,
    type: "GET"
  })
}
function RemoveNonAlphaNumericTerms(a) {
  a = a.replace(/[^a-zA-Z 0-9]+/g, "");
  return a
}
function isnumeric(b) {
  var a = /^[0-9]+$/;
  if (b.match(a)) {
    return true
  } else {
    return false
  }
}
function setUserSearchString(a) {
  var b = a.find(".itemPosition").text();
  if (b == "1") {
    $("#Search_String").val(userSearchTerm)
  }
}
function makeAjaxCallToEndecaLogging() {
  var b = getCookie("CustSessionID");
  var a = "&CustomerZoneID=" + GetCustomerZoneID();
  dataToSend = "SearchStringForLog=" + userSearchTerm + "&UI=" + b + a + "&endecagroup=2&LanguageID=" + GetLanguageID();
  $.ajax({
    url: "/ADC.NET/root/Pages/Gallery/SearchSuggest.aspx",
    processData: false,
    data: dataToSend,
    type: "GET"
  })
}
function GetCustomerZoneID() {
  var a = "3";
  a = MyGalleriesCore.getModel().environment.customerZoneId || a;
  return a
}
function GetLanguageID() {
  var a = "1";
  a = MyGalleriesCore.getModel().environment.languageId || a;
  return a
}
function GetSearhByIfAvailable() {
  var a = "";
  if ($("#headerSearchDropdown")) {
    a = $("#headerSearchDropdown").val()
  }
  return a
};
function disablefilter() {
  if (document.SearchForm.rbSearchOriginal.checked == false) {
    document.SearchForm.filteroptions.disabled = false
  } else {
    document.SearchForm.filteroptions.disabled = true
  }
}
function popOpen(c, b, a) {
  windowHandle = window.open(c, b, a)
}
function HideDiv(a) {
  if (document.getElementById(a)) { (document.getElementById(a)).style.display = "none"
  }
}
function ShowDiv(a) {
  if (document.getElementById(a)) { (document.getElementById(a)).style.display = ""
  }
}
function SwapDivs(b, a) {
  HideDiv(b);
  ShowDiv(a)
}
function SizeRadioChanged() {
  sizeradio = document.filterform.size;
  if (sizeradio[0].checked) {
    ChangeSizeForm(false)
  } else {
    if (sizeradio[1].checked) {
      ChangeSizeForm(false)
    } else {
      if (sizeradio[2].checked) {
        ChangeSizeForm(false)
      } else {
        if (sizeradio[3].checked) {
          ChangeSizeForm(true)
        }
      }
    }
  }
}
function ChangeSizeForm(a) {
  if (a) {
    document.filterform.width_from.disabled = false;
    document.filterform.width_to.disabled = false;
    document.filterform.height_from.disabled = false;
    document.filterform.height_to.disabled = false;
    document.getElementById("width_from").style.backgroundColor = "#ffffff";
    document.getElementById("width_to").style.backgroundColor = "#ffffff";
    document.getElementById("height_from").style.backgroundColor = "#ffffff";
    document.getElementById("height_to").style.backgroundColor = "#ffffff"
  } else {
    document.filterform.width_from.disabled = true;
    document.filterform.width_to.disabled = true;
    document.filterform.height_from.disabled = true;
    document.filterform.height_to.disabled = true;
    document.getElementById("width_from").style.backgroundColor = "#ededed";
    document.getElementById("width_to").style.backgroundColor = "#ededed";
    document.getElementById("height_from").style.backgroundColor = "#ededed";
    document.getElementById("height_to").style.backgroundColor = "#ededed"
  }
}
function PriceRadioChanged() {
  priceradio = document.filterform.price;
  if (priceradio[0].checked) {
    ChangePriceForm(false)
  } else {
    if (priceradio[1].checked) {
      ChangePriceForm(true)
    }
  }
}
function ChangePriceForm(a) {
  if (a) {
    document.filterform.price_from.disabled = false;
    document.filterform.price_to.disabled = false;
    document.getElementById("price_from").style.backgroundColor = "#ffffff";
    document.getElementById("price_to").style.backgroundColor = "#ffffff"
  } else {
    document.getElementById("price_from").style.backgroundColor = "#ededed";
    document.getElementById("price_to").style.backgroundColor = "#ededed";
    document.filterform.price_from.disabled = true;
    document.filterform.price_to.disabled = true
  }
}
function ClearFilters() {
  document.filter.clrfilters.value = "Y";
  document.filter.action = top.location.href;
  document.filter.submit()
}
function ShowFilter() {
  ShowDiv("FilterFormPrice");
  HideDiv("applySort");
  SizeRadioChanged();
  PriceRadioChanged()
}
function pickerSelectWallColor(newColor) {
  if (navigator.appName != "Netscape") {
    for (var i = 0; i < bgItemArray.length; i++) {
      var objColor = document.getElementById(eval('"' + bgItemArray[i] + '"'));
      var objColorsub = document.getElementById(eval('"' + bgItemArray[i] + 'sub"'));
      objColor.style.backgroundColor = newColor;
      objColorsub.style.backgroundColor = newColor
    }
  }
  document.displayform.gridWallColor.value = newColor;
  document.displayform.submit()
}
function resetColor(resetColor) {
  for (var i = 0; i < bgItemArray.length; i++) {
    var objColor = document.getElementById(eval('"' + bgItemArray[i] + '"'));
    objColor.style.backgroundColor = resetColor
  }
}
function isnumeric(b) {
  var a = /^[0-9]+$/;
  if (b.match(a)) {
    return true
  } else {
    return false
  }
}
function isurl(a) {
  if (a.match("http")) {
    return true
  } else {
    return false
  }
}
function SFchangeAction(g) {
  var d;
  var e;
  var a;
  var b;
  var c;
  var f;
  if (!isnumeric(g) && isurl(g)) {
    top.location.href = g
  } else {
    a = parseFloat(document.filterform.currPageNum.value);
    b = parseFloat(document.filterform.currProdPerPageNum.value);
    c = top.location.href;
    d = parseFloat(g);
    if (d != b) {
      if (a == 1) {
        e = 1
      } else {
        e = ((((a - 1) * b) + 1) / d)
      }
      e = Math.ceil(e);
      f = "PG--" + a;
      c = c.replace(f, "PG--" + e)
    }
    document.filterform.method = "post";
    if (c.indexOf("isAdvanced--Y") <= 0) {
      document.filterform.action = c
    }
    document.filterform.submit()
  }
}
function onCustomizeDisplay() {
  document.filterform.action = top.location.href;
  document.filterform.submit()
}
function VC_expand(a) {
  if (document.getElementById) {
    document.getElementById(a).style.display = ""
  }
}
function VC_close(a) {
  if (document.getElementById) {
    document.getElementById(a).style.display = "none"
  }
};
function onImgOver(a, b) {
  document.images[a].src = b
}
function onImgOut(a, b) {
  document.images[a].src = b
}
function onButOver(a, b) {
  document.getElementById(a).src = b
}
function onButOut(a, b) {
  document.getElementById(a).src = b
}
function ShipSameDayWindow(a, b) {
  ShipWindow = window.open("", "ShipTime", "height=320,width=430,resizable=yes,top=100,left=500");
  var d = ShipWindow.document;
  d.write("<html><head>");
  d.write('<link rel="stylesheet" href="/adc.net/css/art/main/global.css" type="text/css"/>');
  d.write("<title>Ship Time</title>");
  d.write("</head>");
  d.write('<body style="text-align:left">');
  d.write('<div class="tts-block">');
  d.write('<div class="tts-keyline"></div>');
  d.write('<div class="floatLeft tts-title gCustomFont">Ship Time</div>');
  d.write('<div class="clear"></div>');
  if (!a) {
    var c = '<div class="tts-text">Items that are designated by "Usually ships within 24 hours" normally leave our facilities on the same business day if the order is placed before 16:00GMT.</div>';
    if (b == 3) {
      c = '<div class="tts-text">Items that are designated by "Usually ships within 24 hours" normally leave our facilities on the same business day if the order is placed before 5:00pm EST.</div>'
    }
    d.write(c)
  }
  d.write('<div class="tts-text">Ship time indicates the typical number of business days it takes for your item(s) to leave our facilities but does not include transit time from our facilities to the final destination.</div>');
  d.write('<div class="tts-text">Orders that contain multiple items with different ship times will be shipped out based on the item with the longest ship time.</div>');
  d.write('<div class="tts-text tts-text-bold">Please note: Ship time is determined based on the method of payment chosen.</div>');
  d.write('<div class="tts-links-block">');
  d.write("<div class=\"tts-links-link\" onmouseover=\"this.className='tts-links-hover'\" onmouseout=\"this.className='tts-links-link'\" onclick=\"javascript:window.open('/asp/customerservice/shipping.asp','','height=678,width=1110,left=125,top=180,scrollbars=yes,resizable=yes,titlebar=yes,toolbar=yes,menubar=yes')\">Shipping FAQ</div>");
  d.write("<div class=\"tts-links-link\" onmouseover=\"this.className='tts-links-hover'\" onmouseout=\"this.className='tts-links-link'\" onclick=\"javascript:window.open('/asp/ship_rates.asp','','height=678,width=1110,left=125,top=180,scrollbars=yes,resizable=yes,titlebar=yes,toolbar=yes,menubar=yes')\">Shipping Rates</div>");
  d.write("</div>");
  d.write("</div>");
  d.write("</body></html>");
  d.close()
}
function DisplayMaxBanner() {
  var c;
  var b;
  var d;
  var f;
  var e;
  f = "this.className='formLinkHover'";
  e = "this.className='formLink'";
  b = getRandomNumber();
  d = getRandomNumber();
  var a = GetCookieDictionary("arts", "CountryCode");
  if (GetCookieDictionary("arts", "ImagesPath").length > 0) {
    c = replaceAll(GetCookieDictionary("arts", "ImagesPath"), [["%3A", ":"], ["%2F", "/"], ["%2E", "."]])
  }
  if (a == "JP") {
    document.getElementById("DivBanner").innerHTML = "<table id='Table_01' width='779'   border='0' cellpadding='0' cellspacing='0' valign='top'><tr><td width='4' height='26' background='" + c + "/images/art_intl/left_border.gif'></td><td width='43' height='26' background='" + c + "/images/art_intl/center.gif' valign='middle' align='center'><Form name='A" + b + "' style = 'margin:0px;padding:0px;display:inline;' id = 'A" + b + "' action='http://affiliates.allposters.com/link/redirect.asp' method='get'><input type='hidden' name='AID' value='2017617078'><input type='hidden' name='LANG' value='6'><div class='formLink' onclick=document.forms['A" + b + "'].submit() style='display:inline;'><img src='" + c + "/images/art_intl/japan.gif' width='24' height='14' border='0'></div></form></td><td width='620' height='26' background='" + c + "/images/art_intl/center.gif' class='TopNavMenuItem'><img src='" + c + "/images/art_intl/jp_image1.gif' width='168' height='14' border='0'> <form name='A" + d + "' style='margin:0px;padding:0px;display:inline;' id = 'A" + d + "' + action='http://affiliates.allposters.com/link/redirect.asp' method='get'><input type='hidden' name='AID' value='2017617078'><input type='hidden' name='LANG' value='6'><div class='formLink' onmouseover = " + f + " onmouseout = " + e + " onclick=document.forms['A" + d + "'].submit() style='display:inline;'>allposters.fr</div></form> <img src='" + c + "/images/art_intl/jp_image2.gif' width='60' height='14' border='0'></b></td><td width='36' height='26' background='" + c + "/images/art_intl/center.gif' valign='middle' align='right'>&nbsp;</td><td width='5' height='26' background='" + c + "/images/art_intl/right_border.gif'></td></tr></table>"
  }
}
function readCookie(e) {
  var f = e + "=";
  var b = document.cookie.split(";");
  for (var d = 0; d < b.length; d++) {
    var a = b[d];
    while (a.charAt(0) == " ") {
      a = a.substring(1, a.length)
    }
    if (a.indexOf(f) == 0) {
      return a.substring(f.length, a.length)
    }
  }
  return null
}
function replaceAll(c, b) {
  for (i = 0; i < b.length; i++) {
    var a = c.indexOf(b[i][0]);
    while (a > -1) {
      c = c.replace(b[i][0], b[i][1]);
      a = c.indexOf(b[i][0])
    }
  }
  return c
}
function getRandomNumber() {
  var a;
  a = Math.round(100000 * Math.random());
  return a
}
function launchStudio(f, e, g, a, h) {
  var k;
  var d = false;
  var c = 10;
  var b = 10;
  if (screen.width >= 1024) {
    var j = "FrameStudio" + new Date().getTime();
    k = window.open(f + "?" + e + "&ui=" + g + "&customerzoneid=" + a, j, "toolbar=no,location=no,status=no,statusbar=no,menubar=no,height=678,width=900,scrollbars=no,resizable=no,top=" + c + ",left=" + b);
    if (k) {
      if (k.focus) {
        k.focus()
      }
    } else {
      window.location.href = "/FrameStudio/error.asp?error=popup&" + e + "&ui=" + g
    }
  } else {
    document.location.href = h
  }
}
function launchInlineStudio(c, b, d, a, e) {
  var f = "/frameStep/?";
  f = f + b + "&ui=" + d + "&customerzoneid=" + a;
  window.location.href = f
}
function makeAjaxCallToAddToCart(a, d, b) {
  var e = a;
  var c = d;
  if (isiOSDevice()) {
    if (b != "undefined") {
      c = b
    }
  }
  $.ajax({
    url: e,
    processData: false,
    cache: false,
    type: "GET",
    dataType: "text",
    success: function(f) {
      if ((f.indexOf("added#") > -1)) {
        theStatusSplit = f.split("#");
        theCartCount = theStatusSplit[1];
        cartItemId = theStatusSplit[2];
        c += "&cartCount=" + theCartCount;
        c += "&IID=" + cartItemId;
        location.href = c
      } else {
        alert("error: ajax response OK, but no added text found.")
      }
    },
    error: function(h, g) {
      try {
        console.log("error in ajax response")
      } catch(f) {}
    }
  })
}
function FrameStudioInline(c, b, d, a, e) {
  var f;
  f = c + "?" + b + "&ui=" + d + "&customerzoneid=" + a;
  window.location.href = f
}
function showFramingVideo() {
  window.open("/asp/landing/Framing_Video/showFramingVideo.html", "Video", "height=270,width=480,left=200,top=200,resizable=no,titlebar=no");
  return false
}
function showFramingVideo_homepage() {
  showFramingVideo()
};
var hasPurchased = false;
var itemsInCart = false;
var newsc = adjustCookieDictionaryValue("art", "sc", -1);
function handleExit(d) {
  var a = itemsInCart && !hasPurchased;
  var f = d || window.event;
  var c = userInitiateAppExit(d);
  if (c) {
    updatesurveycookies()
  }
  if (c && a) {
    var b = isessionpicked;
    if (b) {
      var g = "";
      g = popSurveyWindow();
      g.focus()
    } else {
      var g = "";
      g = popSaveCartWindow();
      g.focus()
    }
  }
}
function updatesurveycookies() {
  eraseCookie("art");
  createCookie("art", newsc, 1)
}
function popSaveCartWindow() {
  var a;
  var c = 400;
  var b = 250;
  var d;
  var e;
  e = (window.screen.availHeight / 2) - (b / 2);
  d = (window.screen.availWidth / 2) - (c / 2);
  a = window.open("/asp/ViewCart_savecartpop.asp?ui=" + SaveCartOnExistSessionID, "savecartpop", "width=" + c + ",height=" + b + ",menu=no,address=no,status=no,location=no,top=" + e + ",left=" + d);
  return a
}
function popSurveyWindow() {
  var a;
  var c = 700;
  var b = 550;
  var d;
  var e;
  e = (window.screen.availHeight / 2) - (b / 2);
  d = (window.screen.availWidth / 2) - (c / 2);
  a = window.open("/asp/view_surveypop.asp", "surveypop", "width=" + c + ",height=" + b + ",menu=no,address=no,status=no,location=no,top=" + e + ",left=" + d);
  return a
}
function userInitiateAppExit(a) {
  var b = false;
  if (exitBy_ClickExitButton(a) || exitBy_HotKey(a)) {
    b = true
  }
  return b
}
function exitBy_ClickExitButton(a) {
  var d = false;
  var b = a || window.event;
  var c = 50;
  if (((returnWindowWidth() - b.clientX) <= c) && (returnWindowWidth() - b.clientX > -50) && b.clientY < -87 && b.clientY > -170) {
    d = true
  }
  return d
}
function exitBy_HotKey(a) {
  var b = a || window.event;
  var c = false;
  if (b.altKey) {
    c = true
  }
  return c
}
function returnWindowWidth() {
  var b;
  var a;
  if (parseInt(navigator.appVersion) > 3) {
    if (navigator.appName == "Netscape") {
      b = window.innerWidth;
      a = window.innerHeight
    }
    if (navigator.appName.indexOf("Microsoft") != -1) {
      b = top.document.body.offsetWidth;
      a = top.document.body.offsetHeight
    }
  }
  return b
}
function adjustCookieDictionaryValue(m, l, q) {
  var g = document.cookie.split(";");
  for (var h = 0; h < g.length; h++) {
    var f = g[h];
    if (f.indexOf(l) >= 0 && f.indexOf(m) >= 0) {
      var e = f.replace(m + "=", "");
      var a = e.split("&");
      var n;
      for (var k = 0; k < a.length; k++) {
        var b = a[k];
        if (b.indexOf(l) >= 0 && b.indexOf(l) <= 1) {
          var d = b.split("=");
          if (isNaN(d[1])) {
            d[1] = d[1] + q + ""
          } else {
            d[1] = parseInt(d[1]) + q + ""
          }
          a[k] = d.join("=")
        }
      }
      var p = a.join("&").replace(" ", "");
      g[h] = n
    }
  }
  return p
}
function createCookie(d, e, b) {
  if (b) {
    var a = new Date();
    a.setTime(a.getTime() + (b * 24 * 60 * 60 * 1000));
    var c = "; expires=" + a.toGMTString()
  } else {
    var c = ""
  }
  document.cookie = d + "=" + e + c + "; path=/"
}
function eraseCookie(a) {
  createCookie(a, "", -1)
}
if (window.addEventListener) {
  window.addEventListener("unload", handleExit, false)
} else {
  if (document.addEventListener) {
    document.addEventListener("unload", handleExit, false)
  } else {
    if (window.attachEvent) {
      window.attachEvent("onunload", handleExit)
    }
  }
}
$(document).ready(function() {
  if (typeof GetproductString == "function") {
    sProductString = GetproductString();
    LoadAdchemy(sProductString)
  }
}); (function($) {
  $.extend({
    metadata: {
      defaults: {
        type: "class",
        name: "metadata",
        cre: /({.*})/,
        single: "metadata"
      },
      setType: function(type, name) {
        this.defaults.type = type;
        this.defaults.name = name
      },
      get: function(elem, opts) {
        var settings = $.extend({},
        this.defaults, opts);
        if (!settings.single.length) {
          settings.single = "metadata"
        }
        var data = $.data(elem, settings.single);
        if (data) {
          return data
        }
        data = "{}";
        var getData = function(data) {
          if (typeof data != "string") {
            return data
          }
          if (data.indexOf("{") < 0) {
            data = eval("(" + data + ")")
          }
        };
        var getObject = function(data) {
          if (typeof data != "string") {
            return data
          }
          data = eval("(" + data + ")");
          return data
        };
        if (settings.type == "html5") {
          var object = {};
          $(elem.attributes).each(function() {
            var name = this.nodeName;
            if (name.match(/^data-/)) {
              name = name.replace(/^data-/, "")
            } else {
              return true
            }
            object[name] = getObject(this.nodeValue)
          })
        } else {
          if (settings.type == "class") {
            var m = settings.cre.exec(elem.className);
            if (m) {
              data = m[1]
            }
          } else {
            if (settings.type == "elem") {
              if (!elem.getElementsByTagName) {
                return
              }
              var e = elem.getElementsByTagName(settings.name);
              if (e.length) {
                data = $.trim(e[0].innerHTML)
              }
            } else {
              if (elem.getAttribute != undefined) {
                var attr = elem.getAttribute(settings.name);
                if (attr) {
                  data = attr
                }
              }
            }
          }
          object = getObject(data.indexOf("{") < 0 ? "{" + data + "}": data)
        }
        $.data(elem, settings.single, object);
        return object
      }
    }
  });
  $.fn.metadata = function(opts) {
    return $.metadata.get(this[0], opts)
  }
})(jQuery); (function(a) {
  var b = a.scrollTo = function(d, g, f) {
    a(window).scrollTo(d, g, f)
  };
  b.defaults = {
    axis: "xy",
    duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1
  };
  b.window = function(d) {
    return a(window)._scrollable()
  };
  a.fn._scrollable = function() {
    return this.map(function() {
      var d = this,
      g = !d.nodeName || a.inArray(d.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
      if (!g) {
        return d
      }
      var f = (d.contentWindow || d).document || d.ownerDocument || d;
      return a.browser.safari || f.compatMode == "BackCompat" ? f.body: f.documentElement
    })
  };
  a.fn.scrollTo = function(f, e, d) {
    if (typeof e == "object") {
      d = e;
      e = 0
    }
    if (typeof d == "function") {
      d = {
        onAfter: d
      }
    }
    if (f == "max") {
      f = 9000000000
    }
    d = a.extend({},
    b.defaults, d);
    e = e || d.speed || d.duration;
    d.queue = d.queue && d.axis.length > 1;
    if (d.queue) {
      e /= 2
    }
    d.offset = c(d.offset);
    d.over = c(d.over);
    return this._scrollable().each(function() {
      var k = this,
      l = a(k),
      h = f,
      m,
      j = {},
      o = l.is("html,body");
      switch (typeof h) {
      case "number":
      case "string":
        if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(h)) {
          h = c(h);
          break
        }
        h = a(h, this);
      case "object":
        if (h.is || h.style) {
          m = (h = a(h)).offset()
        }
      }
      a.each(d.axis.split(""),
      function(g, s) {
        var q = s == "x" ? "Left": "Top",
        r = q.toLowerCase(),
        p = "scroll" + q,
        t = k[p],
        u = b.max(k, s);
        if (m) {
          j[p] = m[r] + (o ? 0 : t - l.offset()[r]);
          if (d.margin) {
            j[p] -= parseInt(h.css("margin" + q)) || 0;
            j[p] -= parseInt(h.css("border" + q + "Width")) || 0
          }
          j[p] += d.offset[r] || 0;
          if (d.over[r]) {
            j[p] += h[s == "x" ? "width": "height"]() * d.over[r]
          }
        } else {
          var v = h[r];
          j[p] = v.slice && v.slice( - 1) == "%" ? parseFloat(v) / 100 * u: v
        }
        if (/^\d+$/.test(j[p])) {
          j[p] = j[p] <= 0 ? 0 : Math.min(j[p], u)
        }
        if (!g && d.queue) {
          if (t != j[p]) {
            n(d.onAfterFirst)
          }
          delete j[p]
        }
      });
      n(d.onAfter);
      function n(g) {
        l.animate(j, e, d.easing, g &&
        function() {
          g.call(this, f, d)
        })
      }
    }).end()
  };
  b.max = function(d, k) {
    var g = k == "x" ? "Width": "Height",
    j = "scroll" + g;
    if (!a(d).is("html,body")) {
      return d[j] - a(d)[g.toLowerCase()]()
    }
    var f = "client" + g,
    n = d.ownerDocument.documentElement,
    o = d.ownerDocument.body;
    return Math.max(n[j], o[j]) - Math.min(n[f], o[f])
  };
  function c(d) {
    return typeof d == "object" ? d: {
      top: d,
      left: d
    }
  }
})(jQuery); (function(a) {
  a.fn.hoverIntent = function(j, k) {
    var b = {
      sensitivity: 7,
      interval: 100,
      timeout: 0
    };
    b = a.extend(b, k ? {
      over: j,
      out: k
    }: j);
    var d, e, m, n;
    var o = function(f) {
      d = f.pageX;
      e = f.pageY
    };
    var c = function(f, g) {
      g.hoverIntent_t = clearTimeout(g.hoverIntent_t);
      if ((Math.abs(m - d) + Math.abs(n - e)) < b.sensitivity) {
        a(g).unbind("mousemove", o);
        g.hoverIntent_s = 1;
        return b.over.apply(g, [f])
      } else {
        m = d;
        n = e;
        g.hoverIntent_t = setTimeout(function() {
          c(f, g)
        },
        b.interval)
      }
    };
    var h = function(f, g) {
      g.hoverIntent_t = clearTimeout(g.hoverIntent_t);
      g.hoverIntent_s = 0;
      return b.out.apply(g, [f])
    };
    var l = function(f) {
      var r = (f.type == "mouseover" ? f.fromElement: f.toElement) || f.relatedTarget;
      while (r && r != this) {
        try {
          r = r.parentNode
        } catch(f) {
          r = this
        }
      }
      if (r == this) {
        return false
      }
      var g = jQuery.extend({},
      f);
      var q = this;
      if (q.hoverIntent_t) {
        q.hoverIntent_t = clearTimeout(q.hoverIntent_t)
      }
      if (f.type == "mouseover") {
        m = g.pageX;
        n = g.pageY;
        a(q).bind("mousemove", o);
        if (q.hoverIntent_s != 1) {
          q.hoverIntent_t = setTimeout(function() {
            c(g, q)
          },
          b.interval)
        }
      } else {
        a(q).unbind("mousemove", o);
        if (q.hoverIntent_s == 1) {
          q.hoverIntent_t = setTimeout(function() {
            h(g, q)
          },
          b.timeout)
        }
      }
    };
    return this.mouseover(l).mouseout(l)
  }
})(jQuery);
function openLCCustomerForm(c, d, a) {
  var b = window.open(c, d, a);
  if (window.focus) {
    b.focus()
  }
  return true
}
function LogIt(b) {
  try {
    console.info(b)
  } catch(a) {}
}
function trackLiveChat(b, c, d) {
  var a = "LiveChat";
  var e = "GA: Category: [" + a + "] EventAction: [" + b + "] EventLabel: [" + c + "]";
  if (typeof(_gaq) != "undefined") {
    LogIt(e);
    _gaq.push(["t1._trackEvent", a, b, c, undefined, d])
  }
}
function track_lc_invite(a) {
  trackLiveChat("Invitation", a, false)
}
function track_lc_customer_form(b, a) {
  trackLiveChat("CustomerForm - " + a, b, false)
}
function track_chat_button(e, c, a, d) {
  if (a.toString() == " ") {
    var b = e
  } else {
    var b = e + " - " + a.toString()
  }
  trackLiveChat(b, c, d)
}
function agents_available(d, g, b, k, e, c) {
  var l = "";
  if (b.indexOf("newdesign=1", 0) > 0) {
    var j = (screen.width - 425) / 2;
    var m = (screen.height - 314) / 2;
    l = "top=" + m + ",left=" + j + ","
  }
  track_chat_button(k, "Available Chat Link Presented", c.toString(), true);
  var h = "";
  if (g.toString().length > 0) {
    h = '<img src="' + g + '" style="border-width: 0px;">'
  }
  var a = "";
  try {
    if (className.toString().length > 0) {
      a = className
    }
  } catch(f) {
    a = ""
  }
  if (k.toString().length > 0) {
    if (a.length > 0) {
      document.getElementById(d).innerHTML = '<a href="" style="outline: none;" class="standardLinkNoUnderline livechat ' + a + '" onclick="track_chat_button(\'' + k + "','" + e + "','" + c + "');openLCCustomerForm('" + b + "','custclient','width=600,height=498," + l + "status=no,toolbar=no,titlebar=no,location=no,menubar=no');return false;\"></a>"
    } else {
      document.getElementById(d).innerHTML = '<a href="" style="outline: none;" class="standardLinkNoUnderline livechat ' + a + '" onclick="track_chat_button(\'' + k + "','" + e + "','" + c + "');openLCCustomerForm('" + b + "','custclient','width=600,height=498," + l + "status=no,toolbar=no,titlebar=no,location=no,menubar=no');return false;\">" + h + "</a>"
    }
  }
  document.getElementById(d).innerHTML = '<a href="" style="outline: none;" class="standardLinkNoUnderline livechat" onclick="track_chat_button(\'' + k + "','" + e + "','" + c + "',false);openLCCustomerForm('" + b + "','custclient','width=610,height=535," + l + "status=no,toolbar=no,titlebar=no,location=no,menubar=no');return false;\">" + h + "</a>";
  return true
}
function agents_not_available(b, d, f, c, a) {
  track_chat_button(f, "Unavailable Chat Link Presented", a.toString(), true);
  var e = "";
  if ((d.toString().length > 0) && (d.toString().indexOf(".gif", 0) != -1)) {
    e = '<img src="' + d + '" style="border-width: 0px;">'
  } else {
    e = d
  }
  document.getElementById(b).innerHTML = e;
  return true
}
function LC_GetCookieVal(b) {
  var a = document.cookie.indexOf(";", b);
  if (a == -1) {
    a = document.cookie.length
  }
  return unescape(document.cookie.substring(b, a))
}
function LC_GetCookieBase(f) {
  var b = f + "=";
  var a = b.length;
  var c = document.cookie.length;
  var d = 0;
  while (d < c) {
    var e = d + a;
    if (document.cookie.substring(d, e) == b) {
      return LC_GetCookieVal(e)
    }
    d = document.cookie.indexOf(" ", d) + 1;
    if (d == 0) {
      break
    }
  }
  return null
}
function LC_GetPersistantCookie(c) {
  var e = "";
  var f = String(LC_GetCookieBase("ap"));
  var b;
  var a;
  if (f != null) {
    b = f.split("&");
    for (var d = 0; d < b.length; d++) {
      a = b[d].split("=");
      if (a[0] == c) {
        e = a[1];
        return e
      }
    }
  }
  return e
}
$(document).ready(function() {
  agentscheck();
  $(".live-chat-icon").live("mouseover",
  function() {
    if (!$(this).hasClass("live-chat-icon-hover")) {
      $(this).addClass("live-chat-icon-hover")
    }
  });
  $(".live-chat-icon").live("mouseout",
  function() {
    if ($(this).hasClass("live-chat-icon-hover")) {
      $(this).removeClass("live-chat-icon-hover")
    }
  })
});
function isAgentAvailable() {
  try {
    return document.getElementById("agentdetect").innerHTML
  } catch(a) {
    return "false"
  }
}
function agentscheck() {
  var a = isAgentAvailable();
  $(".params").each(function(h) {
    var l = $(this).text();
    var k = l.split("|");
    var c = k[0];
    var e = k[1];
    var m = k[2];
    var j = k[3];
    var d = k[4];
    var b = k[5];
    var g = k[6];
    var f = k[7];
    if (a == "true") {
      agents_available(c, e, m, j, d, b)
    } else {
      agents_not_available(c, g, j, f, b)
    }
  })
}
function setLiveChatJavascriptVariables() {
  try {
    atgLCCartCount = parseInt(LC_GetPersistantCookie("ct"));
    atgLCCartTotal = parseFloat(LC_GetPersistantCookie("lcot"));
    atgLCCartLastItemType = "'" + LC_GetPersistantCookie("lcit") + "'"
  } catch(a) {}
};
if (typeof String.prototype.trim !== "function") {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
  }
}
jQuery.fn.scaleObjectToFitOrFill = {
  Calculate: function(d) {
    var e, f, h, c, a;
    if (typeof d.srcWidth !== "number" || typeof d.srcHeight !== "number" || typeof d.destWidth !== "number" || typeof d.destHeight !== "number" || typeof d.method !== "string") {
      return
    }
    e = d.destWidth / d.srcWidth;
    f = d.destHeight / d.srcHeight;
    if (d.method === "fit") {
      h = e < f ? e: f
    } else {
      if (d.method === "fill") {
        h = e > f ? e: f
      }
    }
    c = parseInt(d.srcWidth * h, 10);
    a = parseInt(d.srcHeight * h, 10);
    return {
      width: c,
      height: a,
      offset: {
        x: parseInt((d.destWidth - c) / 2, 10),
        y: parseInt((d.destHeight - a) / 2, 10)
      },
      fits: d.srcWidth >= d.destWidth && d.srcHeight >= d.destHeight ? true: false
    }
  }
};
jQuery.fn.resizeToParent = function(e, f) {
  var d = $(this).parent();
  var j = d.width();
  var a = d.height();
  if (this.width() > this.height()) {
    j = j - e
  } else {
    a = a - f
  }
  var c = this.scaleObjectToFitOrFill.Calculate({
    srcWidth: this.width(),
    srcHeight: this.height(),
    destWidth: j,
    destHeight: a,
    method: "fit"
  });
  this.css({
    width: c.width,
    height: c.height
  });
  return this
};
jQuery.fn.centerNoDropShadow = function(c) {
  var d = c ? "fixed": "absolute";
  d = "absolute";
  var e = $(window);
  this.css({
    position: d,
    top: ((e.height() - this.height()) / 2 + e.scrollTop()).toString() + "px",
    left: ((e.width() - this.width()) / 2 + e.scrollLeft()).toString() + "px"
  });
  if (c) {
    var a = this;
    e.bind("resize",
    function() {
      a.center(false)
    })
  }
  return this
};
jQuery.fn.center = function(c) {
  var h = $(window);
  var f = (h.height() - this.height()) / 2 + h.scrollTop();
  if (f < 0) {
    f = 0
  }
  var d = (h.width() - this.width()) / 2 + h.scrollLeft();
  var e = c ? "fixed": "absolute";
  e = "absolute";
  this.css({
    position: e,
    top: f + "px",
    left: d + "px"
  });
  $(this).addCenterOuterShadow();
  if (c) {
    var a = this;
    h.bind("resize",
    function() {
      a.center(false)
    })
  }
  return this
};
jQuery.fn.centerWithHeight = function(d, c) {
  var j = $(window);
  var h = (j.height() - c) / 2 + j.scrollTop();
  var e = (j.width() - this.width()) / 2 + j.scrollLeft();
  if (h < 0) {
    h = 0
  }
  var f = d ? "fixed": "absolute";
  f = "absolute";
  this.css({
    position: f,
    top: h + "px",
    left: e + "px"
  });
  $(this).addCenterOuterShadow();
  if (d) {
    var a = this;
    j.bind("resize",
    function() {
      a.center(false)
    })
  }
  return this
};
jQuery.fn.centerElement = function() {
  this.css("position", "relative");
  var a = $(this).parent();
  this.css("top", (a.height() - this.height()) / 2 + "px");
  this.css("left", (a.width() - this.width()) / 2 + "px");
  return this
};
jQuery.fn.addDropShadow = function(a) {
  if (a != undefined) {
    switch (a.toLowerCase()) {
    case "none":
      break;
    case "angle":
      $(this).addAngleShadow();
      break;
    case "center":
      $(this).addCenterOuterShadow();
      break;
    default:
      $(this).addCenterOuterShadow()
    }
  } else {
    $(this).addCenterOuterShadow()
  }
  return this
};
jQuery.fn.addOuterGlow = function(a, d, c) {
  this.css("-moz-box-shadow", "0px 0px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  this.css("-webkit-box-shadow", "0px 0px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  this.css("box-shadow", "0px 0px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  return this
};
jQuery.fn.addCenterOuterShadow = function() {
  var e = 0,
  a = 0,
  d = 20,
  c = 0.5;
  this.addDropShadowByValue(e, a, d, c);
  return this
};
jQuery.fn.addAngleShadow = function() {
  var e = 3,
  a = 3,
  d = 7,
  c = 0.6;
  this.addDropShadowByValue(e, a, d, c);
  return this
};
jQuery.fn.addDropShadowByValue = function(e, a, d, c) {
  this.css("-moz-box-shadow", e + "px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  this.css("-webkit-box-shadow", e + "px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  this.css("box-shadow", e + "px " + a + "px " + d + "px rgba(0,0,0," + c + ")");
  return this
};
jQuery.fn.centerOnResize = function() {
  $(window).resize(function(a) {
    $($(this).attr("id")).center()
  });
  return this
};
jQuery.fn.replaceClass = function(a) {
  this.removeClass();
  this.addClass(a)
};
jQuery.fn.imagesLoaded = function(a) {
  var c = this.filter("img"),
  d = c.length;
  c.bind("load",
  function() {
    if (--d <= 0) {
      a.call(c, this)
    }
  }).each(function() {
    if (this.complete || this.complete === undefined) {
      var e = this.src;
      this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      this.src = e
    }
  });
  return this
};
jQuery.updateObject = function(a, c) {
  if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(c) && typeof(c) != "string") {
    jQuery.each(c,
    function(d, e) {
      a[d] = e
    })
  }
};
jQuery.copyObject = function(a) {
  return jQuery.extend(true, {},
  a)
};
jQuery.hasProperties = function(a) {
  var d = false;
  for (var c in a) {
    if (a.hasOwnProperty(c)) {
      d = true;
      break
    }
  }
  return d
};
jQuery.cachedScript = function(c, a) {
  a = $.extend(a || {},
  {
    dataType: "script",
    cache: true,
    url: c
  });
  return jQuery.ajax(a)
};
var JSON;
if (!JSON) {
  JSON = {}
} (function() {
  function f(n) {
    return n < 10 ? "0" + n: n
  }
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function(key) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
      return this.valueOf()
    }
  }
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  gap, indent, meta = {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  },
  rep;
  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable,
    function(a) {
      var c = meta[a];
      return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
    }) + '"': '"' + string + '"'
  }
  function str(key, holder) {
    var i, k, v, length, mind = gap,
    partial, value = holder[key];
    if (value && typeof value === "object" && typeof value.toJSON === "function") {
      value = value.toJSON(key)
    }
    if (typeof rep === "function") {
      value = rep.call(holder, key, value)
    }
    switch (typeof value) {
    case "string":
      return quote(value);
    case "number":
      return isFinite(value) ? String(value) : "null";
    case "boolean":
    case "null":
      return String(value);
    case "object":
      if (!value) {
        return "null"
      }
      gap += indent;
      partial = [];
      if (Object.prototype.toString.apply(value) === "[object Array]") {
        length = value.length;
        for (i = 0; i < length; i += 1) {
          partial[i] = str(i, value) || "null"
        }
        v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
        gap = mind;
        return v
      }
      if (rep && typeof rep === "object") {
        length = rep.length;
        for (i = 0; i < length; i += 1) {
          if (typeof rep[i] === "string") {
            k = rep[i];
            v = str(k, value);
            if (v) {
              partial.push(quote(k) + (gap ? ": ": ":") + v)
            }
          }
        }
      } else {
        for (k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            v = str(k, value);
            if (v) {
              partial.push(quote(k) + (gap ? ": ": ":") + v)
            }
          }
        }
      }
      v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
      gap = mind;
      return v
    }
  }
  if (typeof JSON.stringify !== "function") {
    JSON.stringify = function(value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " "
        }
      } else {
        if (typeof space === "string") {
          indent = space
        }
      }
      rep = replacer;
      if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
        throw new Error("JSON.stringify")
      }
      return str("", {
        "": value
      })
    }
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function(text, reviver) {
      var j;
      function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v
              } else {
                delete value[k]
              }
            }
          }
        }
        return reviver.call(holder, key, value)
      }
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx,
        function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        })
      }
      if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({
          "": j
        },
        "") : j
      }
      throw new SyntaxError("JSON.parse")
    }
  }
} ());
var com = {};
com.art = {};
com.art.core = {};
com.art.core.VERSION = "246";
com.art.core.vos = {};
com.art.core.utils = {};
com.art.core.tracking = {};
com.art.core.services = {};
com.art.core.cookie = {};
com.art.core.constants = {};
com.art.core.constants.ART = "art";
com.art.core.constants.APC = "apc";
com.art.core.components = {};
com.art.core.components.oldComponents = {};
com.art.core.components.SECURE_HOST = "";
com.art.core.constants.SECURE_HOST = "";
com.art.core.constants.ART_HOST = "http://cache1.artprintimages.com";
com.art.core.constants.APC_HOST = "http://cache1.allpostersimages.com";
com.art.core.components.jvml = {};
com.art.core.controller = {};
com.art.core.jvml = {};
$art = {};
$art.jvml = {};
var art = function() {};
art.library = function() {};
art.model = function() {};
art.commands = function() {};
art.view = function(a) {
  if (a && art.jvml) {
    return art.jvml.getComponentById(a)
  }
};
art.jvml = function() {};
com.art.core.components.BaseComponent = function() {};
com.art.core.components.BaseComponent.states = {
  enabled: "enabled",
  disabled: "disabled",
  error: "error",
  loading: "loading"
};
com.art.core.components.BaseComponent.events = {
  focus: "focus",
  blur: "blur",
  hover: "hover",
  keypress: {
    enter: "enter"
  }
};
com.art.core.components.BaseComponent.extend = function(c) {
  for (var a in this) {
    c[a] = this[a]
  }
};
com.art.core.components.BaseComponent.init = function() {
  this.callbacks = {};
  this.zindex = 0;
  this.uid = com.art.core.utils.StringUtil.generateUID(15);
  this.states = com.art.core.components.BaseComponent.states;
  this.events = com.art.core.components.BaseComponent.events;
  this.validators = [];
  this.validatorsDisabled = [];
  this.cssClass = {
    enabled: {
      blur: {
        field: "field-enabled-blur",
        label: "label-enabled-blur",
        error: "error-enabled-blur"
      },
      focus: {
        field: "field-enabled-focus",
        label: "label-enabled-focus",
        error: "error-enabled-focus"
      },
      hover: {
        field: "field-enabled-hover",
        label: "label-enabled-hover",
        error: "error-enabled-hover"
      }
    },
    disabled: {
      blur: {
        field: "field-disabled-blur",
        label: "label-disabled-blur",
        error: "error-disabled-blur"
      },
      focus: {
        field: "field-disabled-focus",
        label: "label-disabled-focus",
        error: "error-disabled-focus"
      },
      hover: {
        field: "field-disabled-hover",
        label: "label-disabled-hover",
        error: "error-disabled-hover"
      }
    },
    error: {
      blur: {
        field: "field-error-blur",
        label: "label-error-blur",
        error: "error-error-blur"
      },
      focus: {
        field: "field-error-focus",
        label: "label-error-focus",
        error: "error-error-focus"
      },
      hover: {
        field: "field-error-hover",
        label: "label-error-hover",
        error: "error-error-hover"
      }
    }
  }
};
com.art.core.components.BaseComponent.getImageHost = function(a) {
  var c = a == com.art.core.constants.APC ? com.art.core.constants.APC_HOST: com.art.core.constants.ART_HOST;
  return com.art.core.components.SECURE_HOST != "" ? com.art.core.constants.SECURE_HOST: c
};
com.art.core.components.BaseComponent.registerCallback = function(c, a) {
  this["callbacks"][c] = a
};
com.art.core.components.BaseComponent.setZIndex = function(a) {
  this["zindex"] = a
};
com.art.core.components.BaseComponent.getUID = function() {
  return this.uid
};
com.art.core.components.BaseComponent.setValidators = function(a) {
  this.validators = a;
  this.validatorsDisabled = a
};
var traceLevel = 3;
if ("localStorage" in window && window.localStorage !== null && window.localStorage != undefined) {
  var storedTraceLevel = localStorage.getItem("traceLevel");
  if (storedTraceLevel != undefined) {
    traceLevel = storedTraceLevel
  }
}
function setTraceLevel(c) {
  try {
    localStorage.setItem("traceLevel", c);
    traceLevel = c
  } catch(a) {}
}
var ieCache = "";
if (typeof(console) == "undefined") {
  console = {};
  console.log = function(c) {
    return;
    ieCache += c + "<br/>";
    if (document.getElementById("consoleDisplay") == null) {
      var a = document.createElement("div");
      a.id = "consoleDisplay";
      a.style.position = "fixed";
      a.style.top = "0";
      a.style.right = "0";
      a.style.backgroundColor = "black";
      a.style.color = "white";
      a.style.maxHeight = "100%";
      a.style.overflow = "auto";
      document.body.appendChild(a)
    }
    document.getElementById("consoleDisplay").innerHTML = ieCache
  };
  console.error = console.log;
  console.warn = console.log;
  console.info = console.log
}
function trace(a) {
  warn("What is this, ActionScript? Don't use trace(). Use info(), warn(), and error().");
  if (!console) {
    return
  }
  console.log(a)
}
function error(a) {
  if (traceLevel < 1) {
    return
  }
  if (!console) {
    return
  }
  if (console.error) {
    console.error(a)
  }
}
function warning(a) {
  return warn(a)
}
function warn(a) {
  if (traceLevel < 2) {
    return
  }
  if (!console) {
    return
  }
  if (console.warn) {
    console.warn(a)
  }
}
function info(a) {
  if (traceLevel < 3) {
    return
  }
  if (console == null) {
    return
  }
  if (console.info) {
    console.info(a)
  }
}
function verbose(a) {
  if (traceLevel < 4) {
    return
  }
  if (!console) {
    return
  }
  if (console.info) {
    console.info(a)
  }
}
function superVerbose(a) {
  if (traceLevel < 5) {
    return
  }
  if (!console) {
    return
  }
  if (console.info) {
    console.info(a)
  }
}
function die(a) {
  throw new Error(a)
}
com.art.core.utils.StringUtil = function() {};
var _x_ = com.art.core.utils.StringUtil;
var _x_p = _x_.prototype;
_x_.substitute = function(c, a) {
  for (var d = 0; d < a.length; d++) {
    c = c.replace("$" + d, a[d])
  }
  return c
};
_x_.formatDimensions = function(j, e, d) {
  var a = 2.54;
  var h = j;
  var f = e;
  if (d) {
    h = Math.round(j * a, 2);
    f = Math.round(e * a, 2);
    return h + " x " + f + " cm"
  }
  return Math.round(h * 2) / 2 + '" x ' + Math.round(f * 2) / 2 + '"'
};
_x_.formatDimension = function(e, d) {
  var a = 2.54;
  var f = e;
  if (d) {
    f = Math.round(e * a, 2);
    return f + " cm"
  }
  return Math.round(e * 2) / 2 + '"'
};
_x_.generateUID = function(h) {
  var a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var c = a.length - 1;
  var j = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var l = j.length - 1;
  var f = (h != undefined && h >= 10) ? h: 10;
  var o = "";
  for (var d = 0; d < f; d++) {
    var n = Math.round(Math.random() * 1);
    var m = Math.random();
    if (n == 1) {
      var e = Math.floor(m * c);
      o += a[e]
    } else {
      var e = Math.floor(m * l);
      o += j[e]
    }
    o = d % 5 == 0 && d > 0 ? o += "-": o
  }
  return o
};
_x_.autoEllipseText = function(d, a) {
  if (!d) {
    d = ""
  }
  var c;
  if (d.length - 1 > a) {
    c = d.substring(0, a) + "..."
  } else {
    c = d
  }
  return c
};
_x_.getQueryStringFromHash = function(c) {
  var e = "";
  var a = true;
  for (var d in c) {
    if (c.hasOwnProperty(d)) {
      if (!a) {
        e += "&"
      } else {
        a = false
      }
      e += d + "=" + c[d]
    }
  }
  return e
};
_x_.isValidEmailAddress = function(a) {
  if (a == undefined || a == "") {
    return false
  }
  var c = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return c.test(a)
};
_x_.isAlphaNumeric = function(c) {
  if (c == undefined || c == "") {
    return false
  }
  var a = /^[a-zA-Z0-9_\-]+$/;
  return a.test(c)
};
_x_.newLineToBr = function(a) {
  return a.replace(/[\n|\r]/g, "<br />")
};
_x_.brToNewLine = function(a) {
  return a.replace(/\<br \/\>/g, "\n")
};
_x_.replaceKeys = function(h, c, e) {
  var d = h;
  for (var a = 0; a < c.length; a++) {
    var f = c[a].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    d = d.replace(new RegExp(f, "gi"), e[a])
  }
  return d
};
_x_.findInvalidChars = function(a, l, o, p) {
  var k = l;
  if (typeof(l) == "string") {
    k = l.split("")
  }
  var m = "(";
  for (var c = 0; c < k.length; c++) {
    m += k[c].replace(/(\[|\\|\^|\$|\.|\||\?|\*|\+|\(|\))/g, "\\$1");
    if (c + 1 < k.length) {
      m += "|"
    }
  }
  m += ")";
  var q = new RegExp(m, "g");
  var h = a.match(q);
  if (h == null || h.length < 1) {
    if (p) {
      return p
    } else {
      if (o) {
        return ""
      } else {
        return []
      }
    }
  } else {
    var r = [];
    for (var c = 0; c < h.length; c++) {
      var d = false;
      for (var e = 0; e < r.length; e++) {
        if (r[e].chr == h[c]) {
          r[e].count++;
          d = true;
          break
        }
      }
      if (!d) {
        r.push({
          chr: h[c],
          count: 1
        })
      }
    }
    if (!o) {
      return r
    } else {
      if (o.indexOf("{~listOfInvalidChars~}") > -1) {
        var f = "";
        for (var c = 0; c < r.length; c++) {
          f += r[c].chr;
          if (c + 1 < r.length) {
            f += ", "
          }
        }
        return o.replace("{~listOfInvalidChars~}", f)
      } else {
        return r
      }
    }
  }
  return h[1]
};
_x_.trimLeft = function(d, a) {
  if (!a) {
    a = "\\s"
  }
  var c = new RegExp("^" + a + "+", "g");
  return d.replace(c, "")
};
_x_.trimRight = function(d, a) {
  if (!a) {
    a = "\\s"
  }
  var c = new RegExp(a + "+$", "g");
  return d.replace(c, "")
};
_x_.trim = function(e, a) {
  if (!a) {
    a = "\\s"
  }
  var c = new RegExp("^" + a + "+", "g");
  var d = new RegExp(a + "+$", "g");
  return e.replace(c, "").replace(d, "")
};
_x_.generateRandomNumber = function() {
  return Math.floor((Math.random() * 1000000) + 1)
};
_x_.queryStringChr = function(a) {
  if (a.indexOf("?") > -1) {
    return "&"
  } else {
    return "?"
  }
};
String.prototype.trimLeft = function(a) {
  return com.art.core.utils.StringUtil.trimLeft(this, a)
};
String.prototype.trimRight = function(a) {
  return com.art.core.utils.StringUtil.trimRight(this, a)
};
String.prototype.trim = function(a) {
  return com.art.core.utils.StringUtil.trim(this, a)
};
String.prototype.left = function(a) {
  if (!a) {
    a = this.length
  }
  if (a < 0) {
    return this.substr(0, this.length + a)
  } else {
    return this.substr(0, a)
  }
};
String.prototype.right = function(a) {
  if (!a) {
    a = this.length
  }
  if (a < 0) {
    return this.substr( - a)
  } else {
    return this.substr(this.length - a)
  }
};
String.prototype.matchOnce = function(d, a) {
  if (typeof(a) == "undefined") {
    a = null
  }
  var c = this.match(d);
  if (c && c.length && c.length > 0 && c[0] != null && typeof(c[0]) != "undefined") {
    return c[0]
  } else {
    return a
  }
};
_x_.generateRandomNumber = function() {
  return Math.floor((Math.random() * 1000000) + 1)
};
_x_.queryStringChr = function(a) {
  if (a.indexOf("?") > -1) {
    return "&"
  } else {
    return "?"
  }
};
_x_.parseBool = function(a) {
  switch (a.toLowerCase()) {
  case "true":
    return true;
  case "false":
    return false;
  default:
    throw new Error("Boolean.parse: Cannot convert string to boolean.")
  }
};
delete _x_;
delete _x_p;
com.art.core.utils.BrowserUtil = function() {};
var _x_ = com.art.core.utils.BrowserUtil;
_x_.cropperModes = {};
_x_.cropperModes.NONE = "none";
_x_.cropperModes.SQUARE = "square";
_x_.getQueryString = function(a) {
  a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var d = "[\\?&]" + a + "=([^&#]*)";
  var c = new RegExp(d);
  var f = location.href;
  var e = c.exec(f);
  if (e == null) {
    return ""
  } else {
    return decodeURIComponent(e[1].replace(/\+/g, " "))
  }
};
_x_.getRESTParameter = function(e, c) {
  var d = new RegExp("/" + c + "/([^/?$]+)");
  var a = e.match(d);
  if (a == null) {
    return ""
  }
  if (a.length < 1) {
    return ""
  }
  return a[1]
};
_x_.getCroppedImageUrl = function(k, f, e, j, m, d) {
  var l = m == undefined ? 1000 : m;
  var c = d == undefined ? 1000 : d;
  var a = "";
  if (k.indexOf("frameimage") > -1) {
    a = k.replace(/MXW:[0-9]+/, "MXW:" + f).replace(/MXH:[0-9]+/, "MXH:" + e)
  } else {
    var j = j == com.art.core.utils.BrowserUtil.cropperModes.NONE ? "": "mode=sq&";
    a = k.replace(/x=[0-9]+/, "x=0").replace(/y=[0-9]+/, "y=0").replace(/w=[0-9]+/, "w=" + l).replace(/h=[0-9]+/, "h=" + c).replace(/maxw=[0-9]+/, "maxw=" + (f)).replace(/maxh=[0-9]+/, "maxh=" + (e)).replace("mode=sq&", j)
  }
  return a
};
_x_.getNextHighestZIndex = function() {
  var a = 1;
  $("*").each(function() {
    var c = parseInt($(this).css("z-index"));
    if (c >= a && c != Number.NaN) {
      a = c + 1
    }
  });
  return a
};
_x_.removehashfromurl = function(a) {
  var c = a;
  var d = c.indexOf("#");
  if (d > -1) {
    c = c.substring(0, d)
  }
  return c
};
_x_.checkIfRemoteImageExists = function(f, k, h, c, a) {
  var j = com.art.core.utils.StringUtil.generateUID(32);
  var d = "_" + j;
  $("body").append("<img id='" + d + "'/>");
  var e = $("#" + d);
  e.css("opacity", "0");
  e.css({
    width: "0px",
    height: "0px"
  });
  e.imagesLoaded(function() {
    e.remove();
    a[h](f, k)
  }).error(function() {
    e.remove();
    a[c](f, k)
  });
  e.attr("src", k)
};
_x_.hideLiveChatBasedonTimer = function() {
  if (typeof commonSiteVarFlags != "undefined" && typeof commonSiteVarFlags.isLiveChatAvailable != "undefined") {
    if (commonSiteVarFlags.isLiveChatAvailable == "False") {
      $(".live-chat").hide()
    }
  }
};
_x_.determineToshowCssToolBar = function() {
  if (typeof commonSiteVarFlags != "undefined" && typeof commonSiteVarFlags.showCssToolBarOnJavaPages != "undefined") {
    if (commonSiteVarFlags.showCssToolBarOnJavaPages == "True") {
      return true
    }
  }
  return false
};
delete _x_;
com.art.core.utils.Flash = function() {};
com.art.core.utils.Flash.getMovie = function(a) {
  var c = swfobject.getObjectById(a);
  if (c) {
    return c
  } else {
    if (navigator.appName.indexOf("Microsoft") != -1) {
      return swfobject.getObjectById[a]
    } else {
      return document[a]
    }
  }
};
com.art.core.utils.LocalizationManager = function(c, d) {
  this.init();
  this.suffix = d != undefined ? d: "";
  this.environment = c;
  this.serviceProvider = new com.art.core.services.ServiceProvider(this.environment);
  this.apiKey = "";
  this.sessionId = "";
  this.localizationAppId = "";
  this.dictionary = {};
  this.culture = this.environment.languageIso;
  this.defaultPattern = "[LANG]";
  this.isLoaded = false;
  this.countryListActive = {
    data: {},
    loaded: false
  };
  this.statesList = [];
  this.statesList.US = {
    data: {},
    loaded: false
  };
  var a = com.art.core.utils.LocalizationManager;
  this.events = a.events;
  this.LOADED = a.LOADED;
  this.ERROR = a.ERROR
};
var _x_ = com.art.core.utils.LocalizationManager;
var _x_p = _x_.prototype;
_x_.LOADED = "loaded";
_x_.ERROR = "error";
_x_.events = {
  loadCountry: {
    loaded: "cload",
    error: "cerr"
  },
  loadState: {
    loaded: "sload",
    error: "serr"
  }
};
_x_p.setLanguageDictionary = function(a, d, c) {
  this.apiKey = a;
  this.sessionId = d;
  this.localizationAppId = (c == undefined) ? "16": c
};
_x_p.load = function() {
  this.getDictionaryData(this.apiKey, this.sessionId, this.localizationAppId)
};
_x_p.getString = function(a) {
  var d = a.replace(/ /gi, "_");
  var c = this.dictionary[d + this.suffix];
  if (c === undefined) {
    c = this.dictionary[d]
  }
  if (c === undefined) {
    c = a.replace(/_/gi, " ")
  }
  return c
};
_x_p.getImageSrcByPattern = function(a, c) {
  return a.replace(c, this.culture)
};
_x_p.getImageSrc = function(a) {
  return this.getImageSrcByPattern(a, this.defaultPattern)
};
_x_.convertLanguageIsoToLanguageId = function(a) {
  var c = "1";
  switch (a.toLowerCase()) {
  case "en":
    c = "1";
    break;
  case "fr":
    c = "2";
    break;
  case "de":
    c = "3";
    break;
  case "es":
    c = "4";
    break;
  case "it":
    c = "5";
    break;
  case "ja":
    c = "6";
    break;
  case "nl":
    c = "7";
    break;
  case "se":
    c = "8";
    break;
  case "da":
    c = "9";
    break;
  case "no":
    c = "10";
    break;
  case "fi":
    c = "11";
    break;
  case "pt":
    c = "12";
    break;
  case "pl":
    c = "13";
    break;
  case "zh":
    c = "14";
    break;
  case "tr":
    c = "15";
    break;
  case "cs":
    c = "16";
    break
  }
  return c
};
_x_.getTimeToShipString = function(h, c) {
  h = h.toLowerCase();
  c = c.toLowerCase();
  var f = h;
  if (c.length > 0 && c != "en") {
    var a = {
      "10-12 days": {
        fr: "10 &#224; 12 jours",
        de: "10 bis 12 tage"
      },
      "10-14 days": {
        fr: "10 &#224; 14 jours",
        de: "10 bis 14 tage"
      },
      "1-2 days": {
        fr: "1 &#224; 2 ours",
        de: "1 bis 2 tage"
      },
      "12-17 days": {
        fr: "12 &#224; 17 jours",
        de: "12 bis 17 tage"
      },
      "14-19 days": {
        fr: "14 &#224; 19 jours",
        de: "14 bis 19 tage"
      },
      "2-3 days": {
        fr: "2 &#224; 3 jours",
        de: "2 bis 3 tage"
      },
      "2-3 weeks": {
        fr: "2 &#224; 3 semaines",
        de: "2 bis 3 wochen"
      },
      "24 hours": {
        fr: "24 heures",
        de: "24 stunden"
      },
      "3-4 weeks": {
        fr: "3 &#224; 4 semaines",
        de: "3 bis 4 wochen"
      },
      "3-5 days": {
        fr: "3 &#224; 5 jours",
        de: "3 bis 5 werktage"
      },
      "4-5 weeks": {
        fr: "4 &#224; 5 semaines",
        de: "4 bis 5 wochen"
      },
      "4-6 days": {
        fr: "4 &#224; 6 jours",
        de: "4 bis 6 tage"
      },
      "5+ weeks": {
        fr: "plus de 5 semaines",
        de: "ca. 5 wochen"
      },
      "5-10 days": {
        fr: "5 &#224; 10 jours",
        de: "5 bis 10 tage"
      },
      "5-6 days": {
        fr: "5 &#224; 6 jours",
        de: "5 bis 6 tage"
      },
      "5-7 days": {
        fr: "5 &#224; 7 jours",
        de: "5 bis 7 tage"
      },
      "7-9 days": {
        fr: "7 &#224; 9 jours",
        de: "7 bis 9 tage"
      }
    };
    var e = a[h];
    if (e != undefined) {
      var d = e[c];
      if (d != undefined) {
        f = d
      }
    }
  }
  return f
};
_x_p.getCountryList = function() {
  if (jQuery.isEmptyObject(this.countryListActive.data)) {
    this.getCountriesData()
  } else {
    return this.countryListActive.data
  }
};
_x_p.getStateList = function(a) {
  var c = false;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(this.statesList[a])) {
    c = true
  } else {
    if (com.art.core.utils.ObjectUtil.isNullOrEmpty(this.statesList[a].data)) {
      c = true
    }
  }
  if (c) {
    this.getStatesDataGivenCountry(a)
  } else {
    return this.statesList[a].data
  }
};
_x_.convertCountryIsoA2ToCountryIsoNumber = function(a) {
  var c = "840";
  switch (a.toUpperCase()) {
  case "AD":
    c = "20";
    break;
  case "AE":
    c = "784";
    break;
  case "AF":
    c = "4";
    break;
  case "AG":
    c = "28";
    break;
  case "AI":
    c = "660";
    break;
  case "AL":
    c = "8";
    break;
  case "AM":
    c = "51";
    break;
  case "AN":
    c = "530";
    break;
  case "AO":
    c = "24";
    break;
  case "AQ":
    c = "10";
    break;
  case "AR":
    c = "32";
    break;
  case "AS":
    c = "16";
    break;
  case "AT":
    c = "40";
    break;
  case "AU":
    c = "36";
    break;
  case "AW":
    c = "533";
    break;
  case "AZ":
    c = "31";
    break;
  case "BA":
    c = "70";
    break;
  case "BB":
    c = "52";
    break;
  case "BD":
    c = "50";
    break;
  case "BE":
    c = "56";
    break;
  case "BF":
    c = "854";
    break;
  case "BG":
    c = "100";
    break;
  case "BH":
    c = "48";
    break;
  case "BI":
    c = "108";
    break;
  case "BJ":
    c = "204";
    break;
  case "BM":
    c = "60";
    break;
  case "BN":
    c = "96";
    break;
  case "BO":
    c = "68";
    break;
  case "BR":
    c = "76";
    break;
  case "BS":
    c = "44";
    break;
  case "BT":
    c = "64";
    break;
  case "BV":
    c = "74";
    break;
  case "BW":
    c = "72";
    break;
  case "BY":
    c = "112";
    break;
  case "BZ":
    c = "84";
    break;
  case "CA":
    c = "124";
    break;
  case "CC":
    c = "166";
    break;
  case "CD":
    c = "180";
    break;
  case "CF":
    c = "140";
    break;
  case "CG":
    c = "178";
    break;
  case "CH":
    c = "756";
    break;
  case "CI":
    c = "384";
    break;
  case "CK":
    c = "184";
    break;
  case "CL":
    c = "152";
    break;
  case "CM":
    c = "120";
    break;
  case "CN":
    c = "156";
    break;
  case "CO":
    c = "170";
    break;
  case "CR":
    c = "188";
    break;
  case "CS":
    c = "891";
    break;
  case "CU":
    c = "192";
    break;
  case "CV":
    c = "132";
    break;
  case "CX":
    c = "162";
    break;
  case "CY":
    c = "196";
    break;
  case "CZ":
    c = "203";
    break;
  case "DE":
    c = "276";
    break;
  case "DJ":
    c = "262";
    break;
  case "DK":
    c = "208";
    break;
  case "DM":
    c = "212";
    break;
  case "DO":
    c = "214";
    break;
  case "DZ":
    c = "12";
    break;
  case "EC":
    c = "218";
    break;
  case "EE":
    c = "233";
    break;
  case "EG":
    c = "818";
    break;
  case "EH":
    c = "732";
    break;
  case "ER":
    c = "232";
    break;
  case "ES":
    c = "724";
    break;
  case "ET":
    c = "231";
    break;
  case "EU":
    c = "*";
    break;
  case "FI":
    c = "246";
    break;
  case "FJ":
    c = "242";
    break;
  case "FK":
    c = "238";
    break;
  case "FM":
    c = "583";
    break;
  case "FO":
    c = "234";
    break;
  case "FR":
    c = "250";
    break;
  case "FX":
    c = "249";
    break;
  case "GA":
    c = "266";
    break;
  case "GB":
    c = "826";
    break;
  case "GD":
    c = "308";
    break;
  case "GE":
    c = "268";
    break;
  case "GF":
    c = "254";
    break;
  case "GH":
    c = "288";
    break;
  case "GI":
    c = "292";
    break;
  case "GL":
    c = "304";
    break;
  case "GM":
    c = "270";
    break;
  case "GN":
    c = "324";
    break;
  case "GP":
    c = "312";
    break;
  case "GQ":
    c = "226";
    break;
  case "GR":
    c = "300";
    break;
  case "GS":
    c = "239";
    break;
  case "GT":
    c = "320";
    break;
  case "GU":
    c = "316";
    break;
  case "GW":
    c = "624";
    break;
  case "GY":
    c = "328";
    break;
  case "HK":
    c = "344";
    break;
  case "HM":
    c = "334";
    break;
  case "HN":
    c = "340";
    break;
  case "HR":
    c = "191";
    break;
  case "HT":
    c = "332";
    break;
  case "HU":
    c = "348";
    break;
  case "ID":
    c = "360";
    break;
  case "IE":
    c = "372";
    break;
  case "IL":
    c = "376";
    break;
  case "IN":
    c = "356";
    break;
  case "IO":
    c = "86";
    break;
  case "IQ":
    c = "368";
    break;
  case "IR":
    c = "364";
    break;
  case "IS":
    c = "352";
    break;
  case "IT":
    c = "380";
    break;
  case "JM":
    c = "388";
    break;
  case "JO":
    c = "400";
    break;
  case "JP":
    c = "392";
    break;
  case "KE":
    c = "404";
    break;
  case "KG":
    c = "417";
    break;
  case "KH":
    c = "116";
    break;
  case "KI":
    c = "296";
    break;
  case "KM":
    c = "174";
    break;
  case "KN":
    c = "659";
    break;
  case "KP":
    c = "408";
    break;
  case "KR":
    c = "410";
    break;
  case "KW":
    c = "414";
    break;
  case "KY":
    c = "136";
    break;
  case "KZ":
    c = "398";
    break;
  case "LA":
    c = "418";
    break;
  case "LB":
    c = "422";
    break;
  case "LC":
    c = "662";
    break;
  case "LI":
    c = "438";
    break;
  case "LK":
    c = "144";
    break;
  case "LR":
    c = "430";
    break;
  case "LS":
    c = "426";
    break;
  case "LT":
    c = "440";
    break;
  case "LU":
    c = "442";
    break;
  case "LV":
    c = "428";
    break;
  case "LY":
    c = "434";
    break;
  case "MA":
    c = "504";
    break;
  case "MC":
    c = "492";
    break;
  case "MD":
    c = "498";
    break;
  case "MG":
    c = "450";
    break;
  case "MH":
    c = "584";
    break;
  case "MK":
    c = "807";
    break;
  case "ML":
    c = "466";
    break;
  case "MM":
    c = "104";
    break;
  case "MN":
    c = "496";
    break;
  case "MO":
    c = "446";
    break;
  case "MP":
    c = "580";
    break;
  case "MQ":
    c = "474";
    break;
  case "MR":
    c = "478";
    break;
  case "MS":
    c = "500";
    break;
  case "MT":
    c = "470";
    break;
  case "MU":
    c = "480";
    break;
  case "MV":
    c = "462";
    break;
  case "MW":
    c = "454";
    break;
  case "MX":
    c = "484";
    break;
  case "MY":
    c = "458";
    break;
  case "MZ":
    c = "508";
    break;
  case "NA":
    c = "516";
    break;
  case "NC":
    c = "540";
    break;
  case "NE":
    c = "562";
    break;
  case "NF":
    c = "574";
    break;
  case "NG":
    c = "566";
    break;
  case "NI":
    c = "558";
    break;
  case "NL":
    c = "528";
    break;
  case "NO":
    c = "578";
    break;
  case "NP":
    c = "524";
    break;
  case "NR":
    c = "520";
    break;
  case "NU":
    c = "570";
    break;
  case "NZ":
    c = "554";
    break;
  case "OM":
    c = "512";
    break;
  case "PA":
    c = "591";
    break;
  case "PE":
    c = "604";
    break;
  case "PF":
    c = "258";
    break;
  case "PG":
    c = "598";
    break;
  case "PH":
    c = "608";
    break;
  case "PK":
    c = "586";
    break;
  case "PL":
    c = "616";
    break;
  case "PM":
    c = "666";
    break;
  case "PN":
    c = "612";
    break;
  case "PR":
    c = "630";
    break;
  case "PT":
    c = "620";
    break;
  case "PW":
    c = "585";
    break;
  case "PY":
    c = "600";
    break;
  case "QA":
    c = "634";
    break;
  case "RE":
    c = "638";
    break;
  case "RO":
    c = "642";
    break;
  case "RU":
    c = "643";
    break;
  case "RW":
    c = "646";
    break;
  case "SA":
    c = "682";
    break;
  case "SB":
    c = "90";
    break;
  case "SC":
    c = "690";
    break;
  case "SD":
    c = "736";
    break;
  case "SE":
    c = "752";
    break;
  case "SG":
    c = "702";
    break;
  case "SH":
    c = "654";
    break;
  case "SI":
    c = "705";
    break;
  case "SJ":
    c = "744";
    break;
  case "SK":
    c = "703";
    break;
  case "SL":
    c = "694";
    break;
  case "SM":
    c = "674";
    break;
  case "SN":
    c = "686";
    break;
  case "SO":
    c = "706";
    break;
  case "SR":
    c = "740";
    break;
  case "ST":
    c = "678";
    break;
  case "SV":
    c = "222";
    break;
  case "SY":
    c = "760";
    break;
  case "SZ":
    c = "748";
    break;
  case "TC":
    c = "796";
    break;
  case "TD":
    c = "148";
    break;
  case "TF":
    c = "260";
    break;
  case "TG":
    c = "768";
    break;
  case "TH":
    c = "764";
    break;
  case "TJ":
    c = "762";
    break;
  case "TK":
    c = "772";
    break;
  case "TM":
    c = "795";
    break;
  case "TN":
    c = "788";
    break;
  case "TO":
    c = "776";
    break;
  case "TP":
    c = "626";
    break;
  case "TR":
    c = "792";
    break;
  case "TT":
    c = "780";
    break;
  case "TV":
    c = "798";
    break;
  case "TW":
    c = "158";
    break;
  case "TZ":
    c = "834";
    break;
  case "UA":
    c = "804";
    break;
  case "UG":
    c = "800";
    break;
  case "UM":
    c = "581";
    break;
  case "US":
    c = "840";
    break;
  case "UY":
    c = "858";
    break;
  case "UZ":
    c = "860";
    break;
  case "VA":
    c = "336";
    break;
  case "VC":
    c = "670";
    break;
  case "VE":
    c = "862";
    break;
  case "VG":
    c = "92";
    break;
  case "VI":
    c = "850";
    break;
  case "VN":
    c = "704";
    break;
  case "VU":
    c = "548";
    break;
  case "WF":
    c = "876";
    break;
  case "WS":
    c = "882";
    break;
  case "YE":
    c = "887";
    break;
  case "YT":
    c = "175";
    break;
  case "ZA":
    c = "710";
    break;
  case "ZM":
    c = "894";
    break;
  case "ZW":
    c = "716";
    break
  }
  return c
};
_x_.determineConvertToCm = function(c, d, e) {
  var a = true;
  if (d.toLowerCase() == "usd") {
    a = false
  }
  return a
};
_x_p.getCountriesData = function() {
  var a = this.serviceProvider.createHandlers(this.getCountriesDataSuccess, this.getCountriesDataFailure,
  function() {});
  a.localizationManager = this;
  this.serviceProvider.ecommerceAPIService.cartGetActiveCountryList(a, this.apiKey, this.sessionId)
};
_x_p.getCountriesDataFailure = function(c) {
  var a;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(this.localizationManager)) {
    a = this
  } else {
    a = this.localizationManager
  }
  a.countryListActive.data = {
    CA: {
      a2: "CA",
      a3: "CAN",
      name: "Canada"
    },
    US: {
      a2: "US",
      a3: "USA",
      name: "United States"
    },
    UK: {
      a2: "GB",
      a3: "GBR",
      name: "United Kingdom"
    }
  };
  a.countryListActive.loaded = false;
  if (a.callbacks[a.events.loadCountry.error] != undefined) {
    a.callbacks[a.events.loadCountry.error](c)
  }
};
_x_p.getCountriesDataSuccess = function(e) {
  var d = this.localizationManager;
  try {
    for (var c = 0; c < e.Countries.length; c++) {
      var f = e.Countries[c];
      d.countryListActive.data[f.IsoA2] = {
        a2: f.IsoA2,
        a3: f.IsoA3,
        name: f.Name
      }
    }
    d.countryListActive.loaded = true;
    if (d.callbacks[d.events.loadCountry.loaded] != undefined) {
      d.callbacks[d.events.loadCountry.loaded]()
    }
  } catch(a) {
    d.getCountriesDataFailure(e)
  }
};
_x_p.getStatesDataGivenCountry = function(a) {
  var c = this.serviceProvider.createHandlers(this.getStatesDataGivenCountrySuccess, this.getStatesDataGivenCountryFailure,
  function() {});
  c.localizationManager = this;
  c.fromCountry = a;
  this.serviceProvider.ecommerceAPIService.cartGetActiveStateListByCountryCode(c, this.apiKey, this.sessionId, a)
};
_x_p.getStatesDataGivenCountryFailure = function(f, d) {
  var e, a;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(this.localizationManager)) {
    e = this;
    a = d
  } else {
    e = this.localizationManager;
    a = this.fromCountry
  }
  if (a == "US") {
    e.statesList[a].data = {
      AL: {
        a2: "AL",
        name: "Alabama"
      },
      CA: {
        a2: "CA",
        name: "California"
      }
    }
  }
  e.statesList[a].loaded = false;
  if (e.callbacks[e.events.loadState.error] != undefined) {
    e.callbacks[e.events.loadState.error](f)
  }
};
_x_p.getStatesDataGivenCountrySuccess = function(f) {
  var c = this.fromCountry;
  var e = this.localizationManager;
  try {
    for (var d = 0; d < f.States.length; d++) {
      var h = f.States[d];
      e.statesList[c].data[h.StateCode] = {
        a2: h.StateCode,
        name: h.Name
      }
    }
    e.statesList[c].loaded = true;
    if (e.callbacks[e.events.loadState.loaded] != undefined) {
      e.callbacks[e.events.loadState.loaded]()
    }
  } catch(a) {
    e.getStatesDataGivenCountryFailure(f, c)
  }
};
_x_p.getDictionaryData = function(a, e, c) {
  var d = this.serviceProvider.createHandlers(this.getLanguageTranslationsSuccess, this.getLanguageTranslationsFailure,
  function() {});
  d.localizationManager = this;
  this.serviceProvider.ecommerceAPIService.getLanguageTranslations(d, a, e, c)
};
_x_p.getLanguageTranslationsFailure = function(c) {
  var a = this.localizationManager;
  if (a.callbacks[a.ERROR] != undefined) {
    a.callbacks[a.ERROR](c)
  }
};
_x_p.getLanguageTranslationsSuccess = function(e) {
  var d = this.localizationManager;
  try {
    for (var c = 0; c < e.LanguageKeyValuePairs.length; c++) {
      var f = e.LanguageKeyValuePairs[c];
      d.dictionary[f.Key] = f.Value
    }
    if (d.callbacks[d.LOADED] != undefined) {
      d.callbacks[d.LOADED]()
    }
  } catch(a) {
    if (d.callbacks[d.ERROR] != undefined) {
      d.callbacks[d.ERROR](e)
    }
  }
};
_x_.getLocale = function(h) {
  var e = location.host;
  var c = [{
    locale: "cs_CZ",
    domain: "cz",
    zoneID: "2",
    currencyCode: "CZK",
    currencyID: "203",
    langID: "16",
    system: "metric"
  },
  {
    locale: "da_DK",
    domain: "dk",
    zoneID: "2",
    currencyCode: "DKK",
    currencyID: "208",
    langID: "9",
    system: "metric"
  },
  {
    locale: "de_AT",
    domain: "at",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "3",
    system: "metric"
  },
  {
    locale: "de_CH",
    domain: "ch",
    zoneID: "2",
    currencyCode: "CHF",
    currencyID: "978",
    langID: "3",
    system: "metric"
  },
  {
    locale: "de_DE",
    domain: "de",
    zoneID: "13",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "3",
    system: "metric"
  },
  {
    locale: "en_AU",
    domain: "com.au",
    zoneID: "1",
    currencyCode: "AUD",
    currencyID: "36",
    langID: "1",
    system: "metric"
  },
  {
    locale: "en_CA",
    domain: "ca",
    zoneID: "1",
    currencyCode: "CAD",
    currencyID: "124",
    langID: "1",
    system: "metric"
  },
  {
    locale: "en_IE",
    domain: "ie",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "1",
    system: "metric"
  },
  {
    locale: "en_GB",
    domain: "co.uk",
    zoneID: "2",
    currencyCode: "GBP",
    currencyID: "826",
    langID: "1",
    system: "metric"
  },
  {
    locale: "en_US",
    domain: "com",
    zoneID: "1",
    currencyCode: "USD",
    currencyID: "840",
    langID: "1",
    system: "imperial"
  },
  {
    locale: "es_AR",
    domain: "com.ar",
    zoneID: "1",
    currencyCode: "ARS",
    currencyID: "32",
    langID: "4",
    system: "metric"
  },
  {
    locale: "es_ES",
    domain: "es",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "4",
    system: "metric"
  },
  {
    locale: "es_MX",
    domain: "com.mx",
    zoneID: "1",
    currencyCode: "MXN",
    currencyID: "484",
    langID: "4",
    system: "metric"
  },
  {
    locale: "es_US",
    domain: "com",
    zoneID: "1",
    currencyCode: "USD",
    currencyID: "840",
    langID: "4",
    system: "metric"
  },
  {
    locale: "fi_FI",
    domain: "fi",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "11",
    system: "metric"
  },
  {
    locale: "fr_BE",
    domain: "be",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "2",
    system: "metric"
  },
  {
    locale: "fr_CA",
    domain: "ca",
    zoneID: "1",
    currencyCode: "CAD",
    currencyID: "124",
    langID: "2",
    system: "metric"
  },
  {
    locale: "fr_CH",
    domain: "ch",
    zoneID: "2",
    currencyCode: "CHF",
    currencyID: "756",
    langID: "2",
    system: "metric"
  },
  {
    locale: "fr_FR",
    domain: "fr",
    zoneID: "12",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "2",
    system: "metric"
  },
  {
    locale: "it_CH",
    domain: "ch",
    zoneID: "2",
    currencyCode: "CHF",
    currencyID: "756",
    langID: "5",
    system: "metric"
  },
  {
    locale: "it_IT",
    domain: "it",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "5",
    system: "metric"
  },
  {
    locale: "ja_JP",
    domain: "co.jp",
    zoneID: "5",
    currencyCode: "JPY",
    currencyID: "392",
    langID: "6",
    system: "metric"
  },
  {
    locale: "nl_BE",
    domain: "be",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "7",
    system: "metric"
  },
  {
    locale: "nl_NL",
    domain: "nl",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "7",
    system: "metric"
  },
  {
    locale: "no_NO",
    domain: "no",
    zoneID: "2",
    currencyCode: "NOK",
    currencyID: "578",
    langID: "10",
    system: "metric"
  },
  {
    locale: "pl_PL",
    domain: "pl",
    zoneID: "2",
    currencyCode: "PLN",
    currencyID: "985",
    langID: "13",
    system: "metric"
  },
  {
    locale: "pt_BR",
    domain: "com.br",
    zoneID: "1",
    currencyCode: "BRL",
    currencyID: "986",
    langID: "12",
    system: "metric"
  },
  {
    locale: "pt_PT",
    domain: "pt",
    zoneID: "2",
    currencyCode: "EUR",
    currencyID: "978",
    langID: "12",
    system: "metric"
  },
  {
    locale: "sv_SE",
    domain: "se",
    zoneID: "2",
    currencyCode: "SEK",
    currencyID: "752",
    langID: "8",
    system: "metric"
  },
  {
    locale: "tr_TR",
    domain: "com.tr",
    zoneID: "2",
    currencyCode: "TRY",
    currencyID: "949",
    langID: "15",
    system: "metric"
  },
  {
    locale: "zh_CN",
    domain: "cn",
    zoneID: "?",
    currencyCode: "CNY",
    currencyID: "000",
    langID: "",
    system: "metric"
  },
  {
    locale: "en_GB_art",
    domain: "co.uk",
    zoneID: "4",
    currencyCode: "GBP",
    currencyID: "826",
    langID: "1",
    system: "metric"
  },
  {
    locale: "en_US_art",
    domain: "com",
    zoneID: "3",
    currencyCode: "USD",
    currencyID: "840",
    langID: "1",
    system: "imperial"
  }];
  for (var f = 0; f < c.length; f++) {
    var a = "." + c[f].domain;
    if (e.indexOf(a) > -1) {
      var j = c[f].locale;
      if (h) {
        return (j == "es_AR" || j == "es_MX" || j == "es_US") ? "es_LA": j
      } else {
        return j
      }
    }
  }
  return "en_US"
};
com.art.core.components.BaseComponent.extend(_x_p);
delete _x_;
delete _x_p;
com.art.core.utils.LoggingManager = function(a) {
  this.environment = a;
  this.serviceProvider = new com.art.core.services.ServiceProvider(this.environment);
  this.apiKey = (a.apiKey == undefined) ? "": a.apiKey;
  this.sessionId = ""
};
var _x_ = com.art.core.utils.LoggingManager;
var _x_p = _x_.prototype;
_x_p.logError = function(c, a, f) {
  var e = this.errorObjToInputs(c);
  if (a == undefined) {
    a = this.apiKey
  }
  if (f == undefined) {
    f = this.sessionId
  }
  var d = this.serviceProvider.createHandlers(function() {},
  function() {},
  function() {});
  info(this.errorObjToString(c));
  this.serviceProvider.loggingAPIService.logError(d, a, f, e.errorMessage, e.errorSource, e.errorName, e.errorLocation, e.errorObjectAsString)
};
_x_p.apiKeySet = function(a) {
  this.apiKey = a
};
_x_p.sessionIdSet = function(a) {
  this.sessionId = a
};
_x_p.errorObjToString = function(c) {
  var a = this.errorObjValidate(c);
  return "fileName: " + a.fileName + "\nlineNumber: " + a.lineNumber + "\nmessage: " + a.message + "\nname: " + a.name + "\nstack: " + a.stack
};
_x_p.errorObjValidate = function(c) {
  var d = {};
  var a = c; (a.fileName === undefined) ? d.fileName = "": d.fileName = a.fileName; (a.lineNumber === undefined) ? d.lineNumber = "": d.lineNumber = a.lineNumber; (a.message === undefined) ? d.message = "": d.message = a.message; (a.name === undefined) ? d.name = "": d.name = a.name; (a.stack === undefined) ? d.stack = "": d.stack = a.stack;
  return d
};
_x_p.errorObjToInputs = function(c) {
  var d = {
    errorMessage: "",
    errorSource: "",
    errorName: "",
    errorLocation: "",
    errorObjectAsString: ""
  };
  var a = this.errorObjValidate(c);
  d.errorName = a.name;
  d.errorSource = location.host;
  d.errorLocation = a.fileName + " | lineNumber: " + a.lineNumber;
  d.errorObjectAsString = a.message;
  d.errorMessage = a.stack;
  return d
};
_x_p.createError = function(c, a) {
  var d = new Error();
  d.message = a;
  d.name = c;
  return d
};
delete _x_;
delete _x_p;
com.art.core.utils.MarkupUtil = function(a) {
  this.prefix = a;
  this.ButtonStates = {
    ACTIVE: "1",
    INACTIVE: "2",
    OVER: "3",
    SELECTED: "4",
    HIDDEN: "5"
  }
};
var _x_ = com.art.core.utils.MarkupUtil;
var _x_p = _x_.prototype;
_x_p.getClassName = function(d, c, f) {
  var e = this.getPrefix(c) + d;
  var a = this.ButtonStates;
  switch (f) {
  case a.HIDDEN:
    e += "_hide";
    break;
  case a.INACTIVE:
    e += "_inactive";
    break;
  case a.OVER:
    e += "_over";
    break;
  case a.SELECTED:
    e += "_select";
    break;
  case a.ACTIVE:
  default:
    break
  }
  return e
};
_x_p.getIdName = function(c, a) {
  var d = this.getPrefix(a) + c;
  return d
};
_x_p.getPrefix = function(a) {
  var d = "x";
  if (a) {
    if (a.NAME) {
      d = a.NAME.replace(/([a-z])/g, "").toLowerCase()
    } else {
      if (typeof a === "string" && a.length > 0) {
        d = a.replace(/([a-z])/g, "").toLowerCase()
      }
    }
  }
  var c = this.prefix + "_" + d + "_";
  return c
};
_x_p.getInstance = function(c) {
  var a = this;
  return {
    getName: function(d, e) {
      if (e && e.length > 0) {
        return (a.getClassName(d, c, e))
      } else {
        return (a.getIdName(d, c))
      }
    },
    buttonStates: a.ButtonStates,
    getPrefix: function() {
      return a.getPrefix(c)
    },
    getGenericClassName: function(d, e) {
      if (e && e.length > 0) {
        return (a.getClassName(d, "", e))
      } else {
        return (a.getIdName(d, ""))
      }
    },
    getModuleId: function() {
      return a.getPrefix(c) + "container"
    }
  }
};
delete _x_;
delete _x_p;
com.art.core.utils.Note = function(c, a, d) {
  this.name = c;
  this.body = a;
  this.type = d
};
com.art.core.utils.XMLUtil = function() {};
$art.XMLUtil = com.art.core.utils.XMLUtil;
$art.XMLUtil.getXMLFromString = function(e, a) {
  e = e.trim();
  if (a && a.wrap) {
    e = "<rootNode>" + e + "</rootNode>"
  }
  var d = null;
  if (window.DOMParser) {
    var c = new DOMParser();
    d = c.parseFromString(e, "text/xml")
  } else {
    if (window.ActiveXObject) {
      d = new ActiveXObject("Microsoft.XMLDOM");
      d.async = false;
      d.loadXML(e)
    }
  }
  if (a && a.wrap) {
    d = d.childNodes[0]
  }
  return d
};
$art.XMLUtil.getTextFromUniqueNodeInXml = function(d, c) {
  if (isNullOrEmpty(d)) {
    return ""
  }
  var a = d.getElementsByTagName(c);
  if (a.length < 1) {
    return ""
  }
  if (!a[0].textContent) {
    if (a[0].text) {
      return a[0].text
    } else {
      return ""
    }
  }
  return a[0].textContent
};
$art.XMLUtil.getXML = function(a) {
  error("XMLUtil > getXML > this method is disabled. Please review use case and transfer use to getXMLFromString. Code will be deleted soon.")
};
$art.XMLUtil.XMLToString = function(f, e) {
  if (f == null) {
    return ""
  }
  var l = f;
  if (e == "bodyOnly") {
    if (l.xml) {
      return l.xml
    } else {
      var d = f.nodeType == Node.DOCUMENT_NODE ? f.documentElement.childNodes: f.childNodes;
      if (!d || !d.length) {
        warn("XMLUtil > XMLToString > error; childNodes not present in DOM node. DOM node to follow.");
        warn(f);
        return ""
      }
      var j = "";
      if (typeof(XMLSerializer) != "undefined") {
        var h = new XMLSerializer();
        for (var c = 0; c < d.length; c++) {
          j += h.serializeToString(d[c])
        }
      } else {
        for (var c = 0; c < d.length; c++) {
          j += d[c].xml.toString()
        }
      }
      return j
    }
  } else {
    if (e == "innerXML") {
      var a = f.childNodes;
      if (!a || !a.length) {
        return ""
      }
      var k = "";
      if (typeof(XMLSerializer) != "undefined") {
        var h = new XMLSerializer();
        for (var c = 0; c < a.length; c++) {
          k += h.serializeToString(a[c])
        }
      } else {
        for (var c = 0; c < a.length; c++) {
          k += a[c].xml.toString()
        }
      }
      return k
    } else {
      if (l.xml) {
        return l.xml
      } else {
        return (new XMLSerializer()).serializeToString(l)
      }
    }
  }
};
$art.XMLUtil.insertAdjacentXML = function(f, a, c, d) {
  var e = $art.XMLUtil.convertRawXmlToDocument(f);
  $art.XMLUtil.insertDocumentFragmentIntoDocument(e, a, "replace", c)
};
$art.XMLUtil.convertRawXmlToDocument = function(c) {
  c = "<DocumentFragment>" + c + "</DocumentFragment>";
  var a = $art.XMLUtil.getXMLFromString(c);
  return a
};
$art.XMLUtil.insertDocumentFragmentIntoDocument = function(j, a, e, h) {
  var f = j.documentElement.childNodes;
  var c = a.createDocumentFragment();
  for (var d = 0; d < f.length; d++) {
    c.appendChild(f[d])
  }
  switch (e) {
  case "append":
    break;
  case "replace":
  default:
    h.parentNode.replaceChild(c, h)
  }
};
$art.XMLUtil.findNodeByNameAndIDRecursively = function(d, a, f) {
  info("looking for name=" + d + ", id=" + a);
  if (f.nodeName == d && $art.XMLUtil.getAttribute("id", f) == a) {
    return f
  } else {
    info("failed: name=" + f.nodeName + ", id=" + $art.XMLUtil.getAttribute("id", f))
  }
  for (var c = 0; c < f.childNodes.length; c++) {
    if (f.childNodes[c].nodeName == d && $art.XMLUtil.getAttribute("id", f.childNodes[c]) == a) {
      return f.childNodes[c]
    } else {
      info("failed: name=" + f.childNodes[c].nodeName + ", id=" + $art.XMLUtil.getAttribute("id", f.childNodes[c]))
    }
    if (f.childNodes[c].childNodes.length > 0) {
      var e = $art.XMLUtil.findNodeByNameAndIDRecursively(d, a, f.childNodes[c]);
      if (e) {
        return e
      }
    }
  }
};
$art.XMLUtil.getAttribute = function(c, d) {
  if (!d.attributes) {
    return
  }
  for (var a = 0; a < d.attributes.length; a++) {
    if (d.attributes[a].nodeName == c) {
      return d.attributes[a].nodeValue
    }
  }
};
$art.XMLUtil.xmlToJson = function(e, c) {
  if (typeof(e) == "string") {
    e = "<rootNode>" + e + "</rootNode>";
    e = $art.XMLUtil.getXMLFromString(e)
  }
  var a = null;
  var d = "object";
  if (c && c.returnType) {
    d = c.returnType
  }
  switch (d) {
  case "array":
    a = [];
    a = $art.XMLUtil.xmlToJson_array(e, a);
    if (a[0].nodeName == "#document") {
      a = a[0].childNodes
    }
    if (a[0].nodeName == "rootNode") {
      a = a[0].childNodes
    }
    break;
  case "object":
    a = {};
    a = $art.XMLUtil.xmlToJson_object(e, a);
    if (a["#document"]) {
      a = a["#document"]
    }
    if (a.rootNode) {
      a = a.rootNode
    }
    break
  }
  return a
};
$art.XMLUtil.xmlToJson_object = function(k, c) {
  var h = {};
  h.nodeName = k.nodeName;
  if (k.nodeType == 1) {
    for (var d = 0; d < k.attributes.length; d++) {
      var a = k.attributes.item(d);
      h[a.nodeName] = a.nodeValue
    }
  } else {
    if (k.nodeType == 3) {
      h = k.nodeValue
    }
  }
  if (k.hasChildNodes()) {
    for (var d = 0; d < k.childNodes.length; d++) {
      var e = k.childNodes.item(d);
      var f = e.nodeName;
      if (e.hasChildNodes() && e.childNodes.length == 1 && e.childNodes.item(0).nodeType == 3) {
        h[f] = e.childNodes.item(0).nodeValue;
        continue
      }
      var j = $art.XMLUtil.xmlToJson_object(e, h)
    }
  }
  if (typeof(c[h.nodeName]) == "undefined") {
    c[h.nodeName] = h
  } else {
    if (!c[h.nodeName].push) {
      c[h.nodeName] = [c[h.nodeName]]
    }
    c[h.nodeName].push(h)
  }
  return c
};
$art.XMLUtil.xmlToJson_array = function(k, c) {
  var h = {};
  h.nodeName = k.nodeName;
  h.attributes = {};
  if (k.nodeType == 1) {
    for (var d = 0; d < k.attributes.length; d++) {
      var a = k.attributes.item(d);
      h.attributes[a.nodeName] = a.nodeValue
    }
  } else {
    if (k.nodeType == 3) {
      h = k.nodeValue
    }
  }
  if (k.hasChildNodes()) {
    h.childNodes = [];
    for (var d = 0; d < k.childNodes.length; d++) {
      var e = k.childNodes.item(d);
      var f = e.nodeName;
      if (e.hasChildNodes() && e.childNodes.length == 1 && e.childNodes.item(0).nodeType == 3) {
        h.attributes[e.childNodes.item(0).nodeName] = e.childNodes.item(0).nodeValue;
        continue
      }
      var j = $art.XMLUtil.xmlToJson_array(e, h.childNodes)
    }
  }
  c.push(h);
  return c
};
com.art.core.utils.ObjectUtil = function() {};
$art.ObjectUtil = com.art.core.utils.ObjectUtil;
com.art.core.utils.ObjectUtil.isNull = function(e, d) {
  var a = false;
  if (!a && e == null) {
    a = true
  }
  if (!a && typeof(e) == "undefined") {
    a = true
  }
  var c = false;
  if (d == null) {
    c = true
  }
  if (typeof(d) == "undefined") {
    c = true
  }
  if (c) {
    return a
  } else {
    return a ? d: e
  }
};
com.art.core.utils.ObjectUtil.isNullOrEmpty = function(h, f) {
  var c = com.art.core.utils.ObjectUtil.isNull(h);
  if (!c && typeof(h) == "string" && h == "") {
    c = true
  }
  try {
    if (!c && typeof(h) == "object" && !isNaN(h) && h.length == 0) {
      c = true
    }
  } catch(a) {}
  if (!c && typeof(h) == "object" && com.art.core.utils.ObjectUtil.isEmptyObject(h)) {
    c = true
  }
  var d = false;
  if (f == null) {
    d = true
  }
  if (typeof(f) == "undefined") {
    d = true
  }
  if (d) {
    return c
  } else {
    return c ? f: h
  }
};
com.art.core.utils.ObjectUtil.isEmptyObject = function(c) {
  if (c instanceof Object == false) {
    return false
  }
  for (var a in c) {
    return false
  }
  return true
};
function isNull(c, a) {
  return com.art.core.utils.ObjectUtil.isNull(c, a)
}
function isNullOrEmpty(c, a) {
  return com.art.core.utils.ObjectUtil.isNullOrEmpty(c, a)
}
com.art.core.utils.ObjectUtil.addEventSimple = function(d, a, c) {
  if (d.addEventListener) {
    d.addEventListener(a, c, false)
  } else {
    if (d.attachEvent) {
      d.attachEvent("on" + a, c)
    }
  }
};
com.art.core.utils.ObjectUtil.removeEventSimple = function(d, a, c) {
  if (d.removeEventListener) {
    d.removeEventListener(a, c, false)
  } else {
    if (d.detachEvent) {
      d.detachEvent("on" + a, c)
    }
  }
};
com.art.core.utils.ObjectUtil.cloneObject = function(f, c, a) {
  var d = [];
  if (a) {
    d = []
  }
  for (var e in f) {
    if (c && typeof(f[e]) == "object") {
      d[e] = com.art.core.utils.ObjectUtil.cloneObject(f[e], true, f[e] instanceof Array)
    } else {
      d[e] = f[e]
    }
  }
  return d
};
com.art.core.utils.ObjectUtil.inheritArray = function(c, a, d) {
  c[a] = com.art.core.utils.ObjectUtil.copyArray(d)
};
com.art.core.utils.ObjectUtil.copyArray = function(d) {
  var a = [];
  for (var c = 0; c < d.length; c++) {
    a.push(d[c])
  }
  return a
};
com.art.core.utils.ObjectUtil.isArray = function(c) {
  return Object.prototype.toString.apply(c) === "[object Array]"
};
com.art.core.utils.ObjectUtil.each = function(c, a) {
  if (!c) {
    error("each > collection is not valid. collection to follow.");
    error(c);
    return c
  }
  if (!c.length) {
    for (var d in c) {
      if (!c.hasOwnProperty(d)) {
        continue
      }
      a(c[d], d)
    }
    return c
  } else {
    for (var d = 0; d < c.length; d++) {
      a(c[d])
    }
    return c
  }
};
com.art.core.utils.ObjectUtil.introspect = function(c) {
  for (var a in c) {
    info(a + "=" + c)
  }
};
if (!Array.prototype.filter) {
  Array.prototype.filter = function(a) {
    if (this === void 0 || this === null) {
      throw new TypeError()
    }
    var f = Object(this);
    var d = f.length >>> 0;
    if (typeof a !== "function") {
      throw new TypeError()
    }
    var e = [];
    var h = arguments[1];
    for (var c = 0; c < d; c++) {
      if (c in f) {
        var j = f[c];
        if (a.call(h, j, c, f)) {
          e.push(j)
        }
      }
    }
    return e
  }
}
com.art.core.utils.DateUtil = function() {};
var _x_ = com.art.core.utils.DateUtil;
_x_.getMonthsFromNow = function(a) {
  if (typeof a == undefined || isNaN(a)) {
    a = 0
  }
  var c = new Date();
  return new Date(c.getFullYear(), c.getMonth() + a, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds(), c.getMilliseconds())
};
delete _x_;
com.art.core.utils.SuperZoom = function() {};
com.art.core.utils.SuperZoom.prototype.show = function(j) {
  var d = Math.ceil(Math.random() * 1000);
  var a = '<img id="zoomImgClose' + d + '" class="zoomImgClose" src="http://cache1.artprintimages.com/images/photostoart/closebox.png" style="display:none;z-index:2001" onmouseover="this.style.cursor=\'-moz-zoom-out\'" onmouseout="this.style.cursor=\'hand\'" />';
  var k = Math.floor($(window).width() * 0.9);
  var h = Math.floor($(window).height() * 0.9);
  var c = "";
  $("body").append(c + a + '<img id="zoomImg' + d + '" class="zoomImg" src="' + j + '" style="display:none;z-index:2000" onmouseover="this.style.cursor=\'-moz-zoom-out\'" onmouseout="this.style.cursor=\'hand\'" />');
  var e = new com.art.core.components.LightBox("superzoomlb", "body", "0.7");
  e.show();
  var f = e.getLightBoxZIndex() + 1;
  $("#zoomImg" + d).load(function() {
    $("#zoomImgBlock").show();
    var n = $(this).scaleObjectToFitOrFill.Calculate({
      srcWidth: $(this).width(),
      srcHeight: $(this).height(),
      destWidth: k,
      destHeight: h,
      method: "fit"
    });
    $(this).css({
      position: "absolute",
      "z-index": f,
      width: n.width,
      height: n.height
    });
    $(this).center(true);
    var l = this;
    var m = function() {
      var o = {
        top: Math.ceil((($(window).height() - $("#zoomImgClose" + d).height()) / 2 + $(window).scrollTop()) - ($(l).height() / 2)),
        left: Math.ceil((($(window).width() - $("#zoomImgClose" + d).width()) / 2 + $(window).scrollLeft()) + ($(l).width() / 2))
      };
      $("#zoomImgClose" + d).css({
        position: "absolute",
        top: o.top,
        left: o.left,
        "z-index": f + 1
      })
    };
    m();
    $(window).bind("resize",
    function() {
      m()
    });
    $(this).fadeIn(300);
    $("#zoomImgClose" + d).fadeIn(300);
    $("#zoomImg" + d + ",#zoomImgClose" + d + ",#superzoomlb").bind("click",
    function() {
      $(this).fadeOut(300);
      e.close();
      $("#zoomImgBlock").hide();
      $("#zoomImg" + d).unbind("click");
      $("#zoomImgClose" + d).unbind("click");
      $(".zoomImg").remove();
      $(".zoomImgClose").remove()
    })
  })
};
com.art.core.utils.SuperZoom.prototype.showWithWaterMark = function(k) {
  var e = Math.ceil(Math.random() * 1000);
  var a = '<img id="zoomImgClose' + e + '" class="zoomImgClose" src="http://cache1.artprintimages.com/images/photostoart/closebox.png" style="display:none;z-index:2001" onmouseover="this.style.cursor=\'-moz-zoom-out\'" onmouseout="this.style.cursor=\'hand\'" />';
  var l = Math.floor($(window).width() * 0.9);
  var j = Math.floor($(window).height() * 0.9);
  var c = "";
  var d = '<div id="watermark' + e + '" class="watermarknote">Note - The watermark below ("ART.COM") will not appear on the artwork itself.</div>';
  $("body").append(c + a + d + '<img id="zoomImg' + e + '" class="zoomImg" src="' + k + '" style="display:none;z-index:2000" onmouseover="this.style.cursor=\'-moz-zoom-out\'" onmouseout="this.style.cursor=\'hand\'" />');
  var f = new com.art.core.components.LightBox("superzoomlb", "body", "0.7");
  f.show();
  var h = f.getLightBoxZIndex() + 1;
  $("#zoomImg" + e).load(function() {
    $("#zoomImgBlock").show();
    var p = $(this).scaleObjectToFitOrFill.Calculate({
      srcWidth: $(this).width(),
      srcHeight: $(this).height(),
      destWidth: l,
      destHeight: j,
      method: "fit"
    });
    $(this).css({
      position: "absolute",
      "z-index": h,
      width: p.width,
      height: p.height
    });
    $(this).center(true);
    var n = function() {
      var q = {
        top: (($(window).height() - $(m).height()) / 2 + $(window).scrollTop()),
        left: (($(window).width() - $(m).width()) / 2 + $(window).scrollLeft() + "px")
      };
      $("#watermark" + e).css({
        position: "absolute",
        "z-index": h + 1,
        width: ((p.width)),
        top: (q.top - 20) + "px",
        left: q.left
      })
    };
    var m = this;
    var o = function() {
      var q = {
        top: Math.ceil((($(window).height() - $("#zoomImgClose" + e).height()) / 2 + $(window).scrollTop()) - ($(m).height() / 2)),
        left: Math.ceil((($(window).width() - $("#zoomImgClose" + e).width()) / 2 + $(window).scrollLeft()) + ($(m).width() / 2))
      };
      $("#zoomImgClose" + e).css({
        position: "absolute",
        top: q.top,
        left: q.left,
        "z-index": h + 2
      })
    };
    o();
    n();
    $(window).bind("resize",
    function() {
      o();
      n()
    });
    $(this).fadeIn(300);
    $("#zoomImgClose" + e).fadeIn(300);
    $("#zoomImg" + e + ",#zoomImgClose" + e + ",#watermark" + e + ",#superzoomlb").bind("click",
    function() {
      $(this).fadeOut(300);
      f.close();
      $("#zoomImgBlock").hide();
      $("#zoomImg" + e).unbind("click");
      $("#zoomImgClose" + e).unbind("click");
      $("#watermark" + e).unbind("click");
      $(".zoomImg").remove();
      $(".zoomImgClose").remove();
      $(".watermarknote").remove()
    })
  })
};
com.art.core.utils.BusinessUtil = function() {};
var _x_ = com.art.core.utils.BusinessUtil;
_x_.getFramedItemAddToCartUrl = function(c, a, d) {
  return "/asp/place_order.asp/_/posters.htm?CREATE_BSK=Y&MasterNum=" + a + "&ui=" + d + "&FrameID=" + c
};
_x_.getSimpleAddToCartUrl = function(h, c, j, f) {
  var d = "";
  if (c != undefined && c > 0) {
    d = "&PODConfigID=" + c
  } else {
    d = "&PODConfigID=0"
  }
  var e = "";
  switch (j) {
  case 2:
    e = "M";
    break;
  case 6:
    e = "L";
    break
  }
  if (h != null && h.trim().length > 0) {
    var a = h.substring(0, h.length - 1);
    var k = h.substring(h.length - 1, h.length);
    var l = "/asp/place_order.asp/_/pdta--" + a + "/sp--" + k + "/posters.htm?add_to_cart=Y&ui=" + f + "&IID=" + d;
    if (e.trim().length > 0) {
      l += "&ServiceType=" + e + ""
    }
    return l
  } else {
    return "/asp/place_order.asp"
  }
};
_x_.GetApnumFromFrameSku = function(d) {
  var f = "";
  if (d.length > 0) {
    var c = d.split("-");
    var e = c[0];
    if (e.indexOf("_") > -1) {
      f = e.split("_")[0]
    } else {
      f = c[0]
    }
  }
  return f
};
_x_.doShowLoginLink = function(a) {
  var c = new com.art.core.vos.User(a);
  if (c.isLoggedIn() == false) {
    return true
  }
  if (c.isAccountTypeAnonymous() == true) {
    return true
  }
  return false
};
_x_.isAnonymousAccount = function(c) {
  if (c.getAccountType() == com.art.core.vos.User.accountTypes.Anonymous) {
    return true
  } else {
    if (c.getAccountType() == "") {
      return false
    } else {
      var a = c.getUserName().length > 0 ? c.getUserName() : c.getEmail();
      return com.art.core.utils.BusinessUtil.isAnonymousUsername(a, c.getPersistentId)
    }
  }
};
_x_.isAnonymousUsername = function(d, e) {
  var f = "@art.com";
  if (d.length == 0) {
    return false
  }
  if (d.indexOf(f, 0) > 0) {
    if (e != undefined && e.length > 0 && d.indexOf(e) == 0) {
      return true
    }
    var c = d.replace(f, "");
    if (!isNaN(c)) {
      return true
    }
    if (d.length == 32 + f.length) {
      return true
    }
  }
  return false
};
_x_.isCountryForStateDropDown = function(a) {
  if (a && a.length && a.toUpperCase() == "US") {
    return true
  } else {
    return false
  }
};
_x_.showMessage = function(c, d, a, e) {
  c.hide();
  c.removeClass();
  c.html(d);
  c.addClass(a);
  c.fadeIn();
  if (e && !isNaN(e)) {
    setTimeout(function() {
      c.fadeOut()
    },
    e)
  }
};
delete _x_;
com.art.core.utils.Facebook = function(e, d, a, c) {
  this.onSuccessCallback;
  this.onShareSuccessCallback = [];
  this.service = e;
  this.apiKey;
  this.sessionId;
  this.FB_LOGIN_SCOPE = com.art.core.utils.Facebook.FB_LOGIN_SCOPE;
  this.config = {
    defaultFacebookAccountId: "133465040008099",
    defaultFBMissingBehavior: "load"
  };
  $.updateObject(this.config, a);
  this.cookieNames = {};
  $.updateObject(this.cookieNames, c);
  this.config.facebookAppId = this.getFacebookAppId();
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(window.artfb)) {
    window.artfb = {};
    window.artfb.connectCalled = true;
    this.getConnectScript()
  }
};
var _x_ = com.art.core.utils.Facebook;
var _x_p = _x_.prototype;
_x_p.userdata = {};
_x_.FB_LOGIN_SCOPE = "email,publish_stream,offline_access,user_about_me,user_birthday,user_education_history,user_photos";
_x_.STANDARD = "standard";
_x_.BUTTON_COUNT = "button_count";
_x_.BOX_COUNT = "box_count";
_x_p.getFacebookAppId = function() {
  try {
    var c = $('meta[name="fb:app_id"]').attr("content");
    if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(c)) {
      return c
    }
    if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(window.FacebookAppID)) {
      return window.FacebookAppID
    }
  } catch(a) {}
  return this.config.defaultFacebookAccountId
};
_x_p.getConnectScript = function() {
  var d = document.getElementById("fb-root");
  if (d == undefined || d == null) {
    d = document.createElement("div");
    d.setAttribute("id", "fb-root");
    $("body").prepend(d)
  }
  var a = this;
  if (typeof window.fbAsyncInit != "function" && this.config.defaultFBMissingBehavior == "load") {
    window.fbAsyncInit = function() {
      FB.init({
        appId: a.config.facebookAppId,
        status: true,
        cookie: true,
        xfbml: true,
        oauth: true
      })
    }
  }
  if (d.children.length == 0) {
    var c = com.art.core.utils.LocalizationManager.getLocale(true); (function(e) {
      var h, f = "facebook-jssdk",
      j = e.getElementsByTagName("script")[0];
      if (e.getElementById(f)) {
        return
      }
      h = e.createElement("script");
      h.id = f;
      h.async = true;
      h.src = "//connect.facebook.net/" + c + "/all.js";
      j.parentNode.insertBefore(h, j)
    } (document))
  }
};
_x_p.setLoginLink = function(c, j, k, l, n) {
  var a = this;
  try {
    if (!a.isFbObjectLoaded()) {
      FB.init({
        appId: a.config.facebookAppId,
        status: true,
        cookie: true,
        xfbml: true,
        oauth: true
      })
    }
  } catch(d) {}
  if (c == undefined || j == undefined) {
    throw new Error("Facebook.setLoginLink failed! missing required params apiKey and/or sessionId.")
  }
  this.apiKey = c;
  this.sessionId = j;
  var o = !($.browser.msie && !jQuery.support.boxModel);
  if (n && o) {
    var m = "";
    $(k).html("<fb:login-button size='medium' width='200' height='25' " + m + " max-rows='1' id='" + k + "_fb' scope='" + this.FB_LOGIN_SCOPE + "' onlogin='com.art.core.utils.Facebook.handleLogin()'>" + l + "</fb:login-button>");
    var h = false;
    var f = setInterval(function() {
      if (a.isFbObjectLoaded() && !h) {
        clearInterval(f);
        h = true;
        FB.XFBML.parse();
        FB.getLoginStatus(function(p) {
          if (p.status == "connected") {
            var e = p.authResponse.accessToken;
            FB.api("/me",
            function(q) {
              if (a.onSuccessCallback.length > 0) {
                a.facebookResponse = q;
                a.facebookResponse.accessToken = e;
                FB.Event.custom = function() {
                  a.authenticate(a)
                }
              }
            })
          } else {
            FB.Event.subscribe("auth.login",
            function(r) {
              var q = r.authResponse.accessToken;
              FB.api("/me",
              function(s) {
                if (a.onSuccessCallback.length > 0) {
                  a.facebookResponse = s;
                  a.facebookResponse.accessToken = q;
                  a.authenticate(a)
                }
              })
            })
          }
        })
      }
    },
    400)
  } else {
    $(k).html(l);
    $(k).css({
      textDecoration: "underline",
      color: "blue",
      cursor: "pointer"
    });
    $(k).die("click");
    $(k).unbind("click");
    $(k).bind("click",
    function() {
      a.login()
    })
  }
};
_x_.handleLogin = function() {
  FB.getLoginStatus(function(a) {
    if (a.status == "connected") {
      if (FB.Event.custom != null) {
        FB.Event.custom()
      }
    }
  })
};
_x_p.onLoginSuccess = function(a) {
  this.onSuccessCallback = a
};
_x_p.login = function() {
  var a = this;
  FB.login(function(d) {
    var c = d.authResponse.accessToken;
    if (d.authResponse == undefined) {
      throw new Error("Unable to retrieve user details.")
    }
    FB.api("/me",
    function(e) {
      if (a.onSuccessCallback.length > 0) {
        a.facebookResponse = e;
        a.facebookResponse.accessToken = c;
        a.authenticate(a)
      }
    })
  },
  {
    scope: a.FB_LOGIN_SCOPE
  })
};
_x_p.authenticate = function(c) {
  var a = this.service.createHandlers(this.authenticateResponse, this.authenticateResponse,
  function() {});
  a.fb = this;
  this.service.accountAuthorizationAPIService.accountAuthenticateWithFacebookUID(a, c.apiKey, c.sessionId, c.facebookResponse.id, c.facebookResponse.email, c.facebookResponse.first_name, c.facebookResponse.last_name, c.facebookResponse.accessToken)
};
_x_p.authenticateResponse = function(f) {
  var c = f;
  if (c.Account != undefined && c.Account.ProfileInfo != undefined) {
    c.Account.ProfileInfo.UserName = this.fb.facebookResponse.email
  }
  var e = {
    facebookResponse: this.fb.facebookResponse,
    artComResponse: c
  };
  var d = new com.art.core.cookie.Cookie(this.cookieNames);
  d.cookieSetLogin(f);
  com.art.core.vos.Environment.logIn();
  this.fb.mapFbToArt(e.artComResponse, e.facebookResponse);
  this.fb.onSuccessCallback(e)
};
_x_p.mapFbToArt = function(a, c) {
  a.Account.ProfileInfo.EmailAddress = c.email;
  a.Account.ProfileInfo.UserName = c.email;
  a.Account.ProfileInfo.FirstName = this.normalizeEmpty(c.first_name);
  a.Account.ProfileInfo.LastName = this.normalizeEmpty(c.last_name);
  if (typeof c.hometown == "object" && c.hometown.name != undefined && c.hometown.name.indexOf(", ") > 0) {
    var d = c.hometown.name.split(", ");
    if (a.Account.CuratorInfo == undefined) {
      a.Account.CuratorInfo = {}
    }
    if (a.Account.CuratorInfo.Location == undefined) {
      a.Account.CuratorInfo.Location = {}
    }
    a.Account.CuratorInfo.City = d[0];
    a.Account.CuratorInfo.State = d[1]
  }
};
_x_p.normalizeEmpty = function(a) {
  return (a == undefined || a == null ? "": a)
};
_x_p.isFbObjectLoaded = function() {
  var c = false;
  try {
    if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(FB)) {
      c = true
    }
  } catch(a) {}
  return c
};
_x_p.logout = function(c) {
  var a = this;
  var d = setInterval(function() {
    if (a.isFbObjectLoaded()) {
      clearInterval(d);
      FB.getLoginStatus(function(h) {
        try {
          if (h.status === "connected") {
            FB.logout(function(e) {
              c()
            })
          } else {
            c()
          }
        } catch(f) {}
      })
    }
  },
  400)
};
_x_p.shareButton = function(c, a) {
  var d = com.art.core.utils.StringUtil.generateUID(10);
  $(c).html("<div id='" + d + "' style='cursor:pointer;width:20px;height:19px;background-image:url(http://cache1.artprintimages.com/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-542px -14px;'></div>");
  $("#" + d).mouseover(function() {
    $(this).css("backgroundPosition", "-562px -14px")
  });
  $("#" + d).mouseout(function() {
    $(this).css("backgroundPosition", "-542px -14px")
  });
  $("#" + d).bind("click",
  function() {
    a()
  })
};
_x_p.share = function(k, h, d, j, f, l, e) {
  var a = this;
  var c = {
    app_id: a.config.facebookAppId,
    display: "popup",
    method: "feed",
    name: k,
    link: h,
    caption: d,
    picture: j,
    description: f
  };
  FB.ui(c,
  function(m) {
    if (m && m.post_id) {
      if (l) {
        e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
        e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_SHARED);
        a.callGraphService(m, e)
      }
    } else {}
  })
};
_x_p.shareSuccess = function(a) {
  this.onShareSuccessCallback[0] = a
};
_x_p.like = function(n, c, p, h, j, m) {
  var e = com.art.core.services.GraphAPIService;
  var a = this;
  var k = "false";
  var l = "150";
  var d = com.art.core.utils.Facebook.BUTTON_COUNT;
  if (h) {
    k = "true";
    l = "450"
  }
  if ($("#fb-like-width-override").length > 0) {
    l = $("#fb-like-width-override").text()
  }
  if (m) {
    d = m
  }
  if (j) {
    hrefogurl = j
  } else {
    hrefogurl = location.href
  }
  var o = n.replace("#", "");
  k = '<fb:like id="' + o + '-module" send="' + k + '" href="' + hrefogurl + '" width="' + l + '" show_faces="false" layout="' + d + '"/>';
  $(n).html(k);
  var f = setInterval(function() {
    var r = false;
    try {
      if (FB) {
        r = true
      }
    } catch(q) {}
    if (!r) {
      return
    }
    FB.XFBML.parse();
    clearInterval(f);
    try {
      $(n + "-module > span > iframe").addClass(o + "-override")
    } catch(q) {}
    FB.Event.subscribe("edge.create",
    function(t) {
      if (a.service == undefined) {
        throw new Error("Facebook.like() callback failed! ServiceProvider is not defined.")
      }
      if (p) {
        _gaq.push(["_trackSocial", "facebook", "like", "My Galleries"]);
        var s = JSON.stringify(c);
        s = s.replace("placeholder1", e.RelationshipChangeAction_ADD);
        s = s.replace("placeholder2", e.UserRelationshipType_LIKED);
        a.callGraphService(t, JSON.parse(s))
      }
    });
    FB.Event.subscribe("edge.remove",
    function(t) {
      if (a.service == undefined) {
        throw new Error("Facebook.like() callback failed! ServiceProvider is not defined.")
      }
      if (p) {
        _gaq.push(["_trackSocial", "facebook", "unlike", "My Galleries"]);
        var s = JSON.stringify(c);
        s = s.replace("placeholder1", e.RelationshipChangeAction_ADD);
        s = s.replace("placeholder2", e.UserRelationshipType_UNLIKED);
        a.callGraphService(t, JSON.parse(s))
      }
    });
    if (h) {
      FB.Event.subscribe("message.send",
      function(t) {
        if (a.service == undefined) {
          throw new Error("Facebook.like() callback failed! ServiceProvider is not defined.")
        }
        if (p) {
          _gaq.push(["_trackSocial", "facebook", "share", "My Galleries"]);
          var s = JSON.stringify(c);
          s = s.replace("placeholder1", e.RelationshipChangeAction_ADD);
          s = s.replace("placeholder2", e.UserRelationshipType_SHARED);
          a.callGraphService(t, JSON.parse(s))
        }
      })
    }
  },
  200)
};
_x_p.comment = function(j, c, k, l, d) {
  var a = this;
  var f = "10";
  var h = '<fb:comments candelete="false" href="' + d + '" num_posts="' + f + '" width="' + l + '" migrated=1></fb:comments>';
  $(j).html(h);
  var e = setInterval(function() {
    var n = false;
    try {
      if (FB) {
        n = true
      }
    } catch(m) {}
    if (!n) {
      return
    }
    FB.XFBML.parse();
    clearInterval(e);
    FB.Event.subscribe("comment.create",
    function(o) {
      if (a.service == undefined) {
        throw new Error("Facebook.like() callback failed! ServiceProvider is not defined.")
      }
      if (k) {
        _gaq.push(["_trackSocial", "facebook", "comment", "My Galleries"]);
        c = c.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
        c = c.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_COMMENTED);
        a.callGraphService(o, c)
      }
    })
  },
  200)
};
_x_p.comments = function(k, l, o, h, c, m) {
  var a = this;
  var f = "10";
  var n = "752";
  var e = "http://www.art.com";
  try {
    f = (h.length > 0) ? h: "10";
    n = (o.length > 0) ? o: "752";
    e = (l.length > 0) ? l: "http://www.art.com"
  } catch(d) {}
  var j = '<fb:comments candelete="false" href="' + e + '" num_posts="' + f + '" width="' + n + '" migrated=1></fb:comments>';
  $(k).html(j);
  setTimeout(function() {
    FB.Event.subscribe("comment.create",
    function(q) {
      if (a.service == undefined) {
        throw new d("Facebook.like() callback failed! ServiceProvider is not defined.")
      }
      if (m) {
        _gaq.push(["_trackSocial", "facebook", "comments", "My Galleries"]);
        var p = JSON.stringify(c);
        p = p.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
        p = p.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_COMMENTED);
        a.callGraphService(q, JSON.parse(p))
      }
    })
  },
  250)
};
_x_p.callGraphService = function(c, a) {
  this.service.graphServiceAPI.UpdateUserRelationship(a)
};
_x_.getLocale = function() {
  var f = [{
    domain: "fr",
    locale: "fr_FR"
  },
  {
    domain: "de",
    locale: "de_DE"
  },
  {
    domain: "co.uk",
    locale: "en_GB"
  },
  {
    domain: "dk",
    locale: "dk_DK"
  }];
  var h = "art.de_DE";
  for (var c = 0; c < f.length; c++) {
    var a = "." + f[c].domain;
    if (h.indexOf(a) > -1) {
      var e = f[c].locale;
      return e
    }
  }
  return "en_US"
};
delete _x_;
delete _x_p;
com.art.core.utils.Google = function() {
  this.scriptLoaded = false;
  this.loadScript()
};
com.art.core.utils.Google.prototype.loadScript = function() {
  var a = true;
  if (typeof window.gapi != "undefined") {
    a = false
  }
  if (a) { (function() {
      var c = document.createElement("script");
      c.type = "text/javascript";
      c.async = true;
      c.src = "https://apis.google.com/js/plusone.js";
      var d = document.getElementsByTagName("script")[0];
      d.parentNode.insertBefore(c, d)
    })()
  } else {
    this.scriptLoaded = true
  }
};
com.art.core.utils.Google.prototype.GooglePlus = function(c, d) {
  var a = '<div class="g-plusone" data-size="medium" data-annotation="none"></div>';
  $(c).html(a)
};
com.art.core.utils.InputValidation = function() {
  this.NAME = _x_.NAME
};
var _x_ = com.art.core.utils.InputValidation;
var _x_p = _x_.prototype;
_x_.NAME = "InputValidation";
_x_p.getValidationObject = function(c, a, d) {
  return {
    func: c,
    criteria: a,
    msg: d
  }
};
_x_p.getRequired = function(a) {
  return this.getValidationObject(this.required, "", a)
};
_x_p.required = function(a, c) {
  if (c && c.length != undefined) {
    if (c.length > 0) {
      return true
    }
  }
  return false
};
_x_p.getIsEqual = function(a, c) {
  return this.getValidationObject(this.isEqual, a, c)
};
_x_p.isEqual = function(c, d) {
  var a = typeof c == "string" ? c: c.getValue();
  if (d) {
    if (d == a) {
      return true
    }
  }
  return false
};
_x_p.getMinLength = function(c, a) {
  return this.getValidationObject(this.minLength, c, a)
};
_x_p.minLength = function(a, c) {
  if (c != undefined && c.length != undefined) {
    if (c.length >= a) {
      return true
    }
  }
  return false
};
_x_p.getMaxLength = function(c, a) {
  return this.getValidationObject(this.maxLength, c, a)
};
_x_p.maxLength = function(a, c) {
  if (c != undefined && c.length != undefined) {
    if (c.length <= a) {
      return true
    }
  }
  return false
};
_x_p.getValidEmail = function(a) {
  return this.getValidationObject(this.validEmail, "", a)
};
_x_p.validEmail = function(a, c) {
  return com.art.core.utils.StringUtil.isValidEmailAddress(c)
};
_x_p.getAlphaNumeric = function(a) {
  return this.getValidationObject(this.alphaNumeric, "", a)
};
_x_p.alphaNumeric = function(a, c) {
  return com.art.core.utils.StringUtil.isAlphaNumeric(c)
};
_x_p.getNotEqual = function(a, c) {
  return this.getValidationObject(this.notEqual, a, c)
};
_x_p.notEqual = function(c, d) {
  var a = typeof c == "string" ? c: c.getValue();
  if (d) {
    if (d != a) {
      return true
    }
  }
  return false
};
_x_p.getCustom = function(a, c) {
  return this.getValidationObject(this.custom, a, c)
};
_x_p.custom = function(c, d) {
  var a = new RegExp(c);
  if (d != undefined && d.length != undefined) {
    return a.test(d)
  }
  return false
};
delete _x_;
delete _x_p;
com.art.core.components.BaseButton = function() {
  this.init();
  this.CLICK = com.art.core.components.BaseButton.CLICK;
  this.HOVER = com.art.core.components.BaseButton.HOVER;
  this.MOUSEDOWN = com.art.core.components.BaseButton.MOUSEDOWN;
  this.MOUSEUP = com.art.core.components.BaseButton.MOUSEUP;
  this.DISABLED = com.art.core.components.BaseButton.DISABLED
};
com.art.core.components.BaseButton.extend = function(d) {
  var a = new com.art.core.components.BaseButton();
  for (var c in a) {
    d[c] = a[c]
  }
};
com.art.core.components.BaseButton.CLICK = "click";
com.art.core.components.BaseButton.HOVER = "hover";
com.art.core.components.BaseButton.MOUSEDOWN = "down";
com.art.core.components.BaseButton.MOUSEUP = "default";
com.art.core.components.BaseButton.DISABLED = "disabled";
com.art.core.components.BaseComponent.extend(com.art.core.components.BaseButton.prototype);
com.art.core.components.BaseModal = function(d, h, a, f, c, e) {
  this.init();
  this.id = d;
  this.width = h;
  this.useButtonBar = f;
  this.disableDropShadow = c != undefined ? c: false;
  this.translatedContent = {
    title: ""
  };
  $.updateObject(this.translatedContent, e);
  this.cssClass = {
    bgcolor: "#f1f1f1",
    headerAndFooter: "modal_hdrftr",
    header: "modal_header",
    headerText: "modal_header_text",
    close: "baseModalCloseBtn",
    closeHover: "modal_close_hover",
    closeClick: "modal_close_click"
  };
  if (typeof a == "string") {
    this.cssClass.bgcolor = a
  } else {
    $.updateObject(this.cssClass, a)
  }
  this.CLOSE_CLICKED = com.art.core.components.BaseModal.CLOSE_CLICKED;
  this.BODY_CLICKED = com.art.core.components.BaseModal.BODY_CLICKED;
  com.art.core.components.BaseComponent.extend(this);
  this.zindex = -1;
  this.skin = com.art.core.components.BaseModal.ART_SKIN;
  this.ART_SKIN = com.art.core.components.BaseModal.ART_SKIN;
  this.APC_SKIN = com.art.core.components.BaseModal.APC_SKIN;
  this.buttons = {}
};
com.art.core.components.BaseModal.APC_SKIN = "apc_skin";
com.art.core.components.BaseModal.ART_SKIN = "art_skin";
com.art.core.components.BaseModal.CLOSE_CLICKED = "BaseModalCloseClicked";
com.art.core.components.BaseModal.BODY_CLICKED = "BaseModalBodyClicked";
com.art.core.components.BaseModal.extend = function(e) {
  var c = new com.art.core.components.BaseModal(e.id, e.width);
  for (var d in e) {
    if (d == "template") {
      e[d] = c.getTemplate().replace("$EXTEND", e[d])
    }
  }
  for (var a in c) {
    if (a != "render" && a != "getTemplate" && a != "template") {
      e[a] = c[a]
    }
  }
};
com.art.core.components.BaseModal.prototype.getButtonById = function(a) {
  return this.buttons[a]
};
com.art.core.components.BaseModal.prototype.removeButtonById = function(c) {
  var a = this.buttons[c];
  if (a != null) {
    this.buttons[c].destroy();
    delete this.buttons[c];
    $("#" + c).remove()
  }
};
com.art.core.components.BaseModal.prototype.setContents = function(a) {
  if ($("#" + this.id).attr("id") == this.id) {
    $("#baseExtend").html(a)
  } else {
    this.template = this.template.replace("$EXTEND", a)
  }
};
com.art.core.components.BaseModal.prototype.render = function(c) {
  var a = this.getTemplate(c);
  return a
};
com.art.core.components.BaseModal.prototype.registerEvents = function() {
  var a = this;
  $("#baseModalCloseBtn_" + this.id).mouseenter(function() {
    $(this).addClass(a.cssClass.closeHover)
  });
  $("#baseModalCloseBtn_" + this.id).mouseleave(function() {
    $(this).removeClass(a.cssClass.closeHover)
  });
  $("#baseModalCloseBtn_" + this.id).mousedown(function() {
    $(this).addClass(a.cssClass.closeClick)
  });
  $("#baseModalCloseBtn_" + this.id).mouseup(function() {
    $(this).removeClass(a.cssClass.closeClick);
    if (a.callbacks[a.CLOSE_CLICKED] != undefined) {
      a.callbacks[a.CLOSE_CLICKED]()
    }
    a.close()
  });
  $("#" + a.id).live("click",
  function(c) {
    if (a.callbacks[a.BODY_CLICKED] != undefined) {
      c.stopPropagation();
      a.callbacks[a.BODY_CLICKED]()
    }
  });
  if (this.disableDropShadow) {
    $("#" + this.id).centerNoDropShadow(true)
  } else {
    $("#" + this.id).addDropShadow().center(true)
  }
};
com.art.core.components.BaseModal.prototype.removeCloseButton = function() {
  $("#baseModalCloseBtn_" + this.id).remove()
};
com.art.core.components.BaseModal.prototype.draggable = function(a, c) {
  var d = com.art.core.utils.ObjectUtil;
  dD = {
    iMX: undefined,
    iMY: undefined,
    startX: undefined,
    startY: undefined,
    dObj: undefined,
    initElement: function(e) {
      if (typeof e == "string") {
        e = document.getElementById(e)
      }
      e.style.position = "relative";
      e.style.cursor = "pointer";
      e.onmousedown = dD.startDragMouse
    },
    startDragMouse: function(f) {
      var h = this;
      if (!d.isNullOrEmpty(c)) {
        h = document.getElementById(c)
      }
      dD.startDrag(h);
      var j = f || window.event;
      dD.iMX = j.clientX;
      dD.iMY = j.clientY;
      d.addEventSimple(document, "mousemove", dD.dragMouse);
      d.addEventSimple(document, "mouseup", dD.releaseElement);
      return false
    },
    startDrag: function(e) {
      if (dD.dObj) {
        dD.releaseElement()
      }
      dD.startX = e.offsetLeft;
      dD.startY = e.offsetTop;
      dD.dObj = e;
      e.className += " dragged"
    },
    dragMouse: function(j) {
      var k = j || window.event;
      var f = k.clientX - dD.iMX;
      var h = k.clientY - dD.iMY;
      dD.setPosition(f, h);
      return false
    },
    setPosition: function(e, f) {
      var l = dD.startX + e;
      var m = dD.startY + f;
      var k = $(window).width();
      var j = $(window).height();
      if (m < 1) {
        m = 1
      }
      if (l < 1) {
        l = 1
      }
      if (m > j) {
        m = j - 20
      }
      if (l > k) {
        l = k - 20
      }
      dD.dObj.style.left = l + "px";
      dD.dObj.style.top = m + "px"
    },
    releaseElement: function() {
      d.removeEventSimple(document, "mousemove", dD.dragMouse);
      d.removeEventSimple(document, "mouseup", dD.releaseElement);
      dD.dObj.className = dD.dObj.className.replace(/dragged/, "");
      dD.dObj = null
    }
  };
  dD.initElement(a)
};
com.art.core.components.BaseModal.prototype.close = function() {
  $("#" + this.id).die();
  $("#" + this.id).unbind("click");
  $("#" + this.id).remove()
};
com.art.core.components.BaseModal.prototype.registerButton = function(f, j, h, e, c) {
  var d = (c != undefined) ? c: undefined;
  var a = this;
  this.buttons[f] = new com.art.core.components.ArtButton(f, j, h, d);
  $("#btnBarClear").before("<div style='float:right'>" + this.buttons[f].render() + "</div>");
  this.buttons[f].registerEvents();
  this.buttons[f].registerCallback(com.art.core.components.BaseButton.CLICK,
  function() {
    e(a.buttons[f])
  });
  $("#baseModalButtonBarRight_" + this.id + " > div").css("margin-left", "5px")
};
com.art.core.components.BaseModal.prototype.getButtonById = function(a) {
  return this.buttons[a]
};
com.art.core.components.BaseModal.prototype.setDefaultButtons = function() {
  var a = new com.art.core.components.ArtButton("someID", com.art.core.components.ArtButton.ART_BLUE, "Submit");
  $("#baseModalButtonBarRight_" + this.id).html(a.render())
};
com.art.core.components.BaseModal.prototype.setLeftButtonBarContent = function(a) {
  $("#baseModalButtonBarLeft_" + this.id).html(a)
};
com.art.core.components.BaseModal.prototype.getTemplate = function(f) {
  var e = f != undefined ? "z-index:" + f + ";": "z-index:1000";
  var c = this.skin == this.ART_SKIN ? com.art.core.constants.ART: com.art.core.constants.APC;
  var a = this.useButtonBar ? this.buttonBarTemplate.replace(/\$ID/g, this.id) : "";
  var d = this.template.replace(/\$title/gi, this.translatedContent.title).replace(/\$ID/g, this.id).replace("$W", this.width).replace("[WW]", this.width - 28).replace("$BGC", this.cssClass.bgcolor).replace("$BTN_BAR", a).replace("$ZNDX", e).replace("[HDRCLS]", this.cssClass.header).replace("[HDRFTRCLS]", this.cssClass.headerAndFooter).replace("[HDRTXT]", this.cssClass.headerText).replace("[CLOSECLS]", this.cssClass.close).replace(/\$IMAGE_HOST/g, this.getImageHost(c));
  return d
};
com.art.core.components.BaseModal.prototype.buttonBarTemplate = "<div class='buttonBarTemplate' style='padding:5px;'><div id='baseModalButtonBarLeft_$ID' style='float:left;margin-top: 7px;'></div><div id='baseModalButtonBarRight_$ID' style='float:right;width:70%'><div id='btnBarClear' style='clear:both'></div></div><div style='clear:both;font-size:0px;'></div></div>";
com.art.core.components.BaseModal.prototype.template = "<div id='$ID' style='width:$Wpx;background-color:$BGC;position:absolute;$ZNDX;' class='[HDRFTRCLS]'><div id='baseModalTitleBar_$ID' class='[HDRCLS]'><div id='baseModalTitleBar_$ID_text' style='float:left;width:[WW]px' class='[HDRTXT]'>$title</div><span id='baseModalCloseBtn_$ID' class='[CLOSECLS]' style='margin-right:10px;margin-top:15px;float:right;cursor:pointer;'></span></div><div style='clear:both;font-size:0px;'></div><div id='baseExtend' style='width:100%;#width:100%;height:100%;'>$EXTEND</div><div style='clear:both;font-size:0px;'></div>$BTN_BAR</div>";
com.art.core.components.BaseComponent.extend(com.art.core.components.BaseModal.prototype);
com.art.core.components.LoginModal = function(j, k, l, d, h, m, f, e) {
  this.init();
  this.id = j;
  this.loginTitle = k;
  this.registerTitle = l;
  if (typeof d == "string") {
    this.brand = d
  } else {
    this.brand = d.brand != undefined ? d.brand: com.art.core.components.LoginModal.ART_BRAND
  }
  this.cssClass = {
    closeButton: "modal_close_button",
    link: "link",
    linkHover: "linkHover"
  };
  $.updateObject(this.cssClass, d);
  this.config = {
    defaultFacebookAccountId: "133465040008099",
    defaultFBMissingBehavior: "load"
  };
  $.updateObject(this.config, e);
  this.selectedTab = h;
  this.startPassword = false;
  if (h == com.art.core.components.LoginModal.PASSWORD) {
    this.selectedTab = com.art.core.components.LoginModal.LOGIN;
    this.startPassword = true
  }
  this.base = new com.art.core.components.BaseModal(j, 320, {
    bgcolor: "#FFFFFF",
    headerAndFooter: "",
    header: "",
    headerText: ""
  },
  true);
  this.CLOSE_CLICKED = com.art.core.components.LoginModal.CLOSE_CLICKED;
  this.REGISTER_CLICKED = com.art.core.components.LoginModal.REGISTER_CLICKED;
  this.LOGIN_CLICKED = com.art.core.components.LoginModal.LOGIN_CLICKED;
  this.ON_FACEBOOK_LOGIN_SUCCESS = com.art.core.components.LoginModal.ON_FACEBOOK_LOGIN_SUCCESS;
  this.FORGOT_PASSWORD_CLICKED = com.art.core.components.LoginModal.FORGOT_PASSWORD_CLICKED;
  this.translatedContent = com.art.core.components.LoginModal.prototype.translatedContent;
  $.updateObject(this.translatedContent, m);
  this.loginCallback;
  this.regCallback;
  this.serviceDetails;
  this.fb;
  this.renderedLoginForm;
  this.mainActionButton;
  this.service;
  this.LOGIN = com.art.core.components.LoginModal.LOGIN;
  this.REGISTER = com.art.core.components.LoginModal.REGISTER;
  this.ART_BRAND = com.art.core.components.LoginModal.ART_BRAND;
  this.APC_BRAND = com.art.core.components.LoginModal.APC_BRAND;
  this.OTHER_BRAND = com.art.core.components.LoginModal.OTHER_BRAND;
  this.actionButtonName = this.id + "ActionBtn";
  this.cancelButtonName = this.id + "CancelBtn";
  this.selectedButtonLabel = "";
  this.closeCallback;
  this.fields = {};
  var c = [];
  c.id = "loginEmail";
  c.cssClass = "";
  c.label = this.translatedContent.EmailAddressHint;
  c.labelPosition = "inside";
  c.defaultValue = "";
  this.fields.loginEmail = new com.art.core.components.Email(c);
  c.id = "loginPassword";
  c.label = this.translatedContent.PasswordHint;
  this.fields.loginPassword = new com.art.core.components.Password(c);
  c.id = "createEmail";
  c.label = this.translatedContent.EmailAddressHint;
  this.fields.createEmail = new com.art.core.components.Text(c);
  c.id = "createPassword";
  c.label = this.translatedContent.PasswordHint;
  this.fields.createPassword = new com.art.core.components.Password(c);
  c.id = "createPasswordConfirm";
  c.label = this.translatedContent.ConfirmPasswordHint;
  this.fields.createPasswordConfirm = new com.art.core.components.Password(c);
  c.id = "forgotEmail";
  c.label = this.translatedContent.EmailAddressHint;
  this.fields.forgotEmail = new com.art.core.components.Text(c);
  this.cookieNames = {};
  if (f == undefined || typeof f == "string") {
    f = {}
  }
  $.updateObject(this.cookieNames, f)
};
com.art.core.components.LoginModal.LOGIN = "LOGIN";
com.art.core.components.LoginModal.REGISTER = "REGISTER";
com.art.core.components.LoginModal.PASSWORD = "PASSWORD";
com.art.core.components.LoginModal.ART_BRAND = "ART";
com.art.core.components.LoginModal.APC_BRAND = "APC";
com.art.core.components.LoginModal.OTHER_BRAND = "OTHER";
com.art.core.components.LoginModal.CLOSE_CLICKED = "LoginModalCloseClicked";
com.art.core.components.LoginModal.REGISTER_CLICKED = "RegisterButtonClicked";
com.art.core.components.LoginModal.LOGIN_CLICKED = "LoginButtonClicked";
com.art.core.components.LoginModal.ON_FACEBOOK_LOGIN_SUCCESS = "onFaceBookLoginSuccess";
com.art.core.components.LoginModal.FORGOT_PASSWORD_CLICKED = "LoginModalForgotPasswordClicked";
com.art.core.components.LoginModal.prototype.translatedContent = {
  SubmitText: "Submit",
  BackText: "Go Back",
  LoginButtonText: "Log in",
  RegisterButtonText: "Sign up",
  EmailAddressHint: "Email address",
  PasswordHint: "Password",
  CancelButtonText: "Cancel",
  ProcessingText: "Processing...",
  ConfirmPasswordHint: "Confirm password",
  ValidateEmailAndPasswordMissing: "Email and Password are blank.",
  ValidateEmailMissing: "Please enter an email address.",
  ValidateInvalidEmail: "Please enter a valid email address.",
  ValidatePasswordMissing: "Please enter a password.",
  ValidateConfirmMissing: "Please enter and confirm password",
  ValidatePasswordsDontMatch: "The passwords do not match",
  LoginToFacebook: "",
  PrivacyPolicy: "Privacy Policy",
  PasswordMissingText: "Forgot your password?",
  LogInText: "Log in",
  forgotPasswordTitle: "Retrieve your password",
  loginWithFacebook: "Log in with Facebook",
  RegWithFacebook: "Sign up using Facebook",
  locationPrivacyPolicy: "/asp/customerservice/privacy_policy.asp",
  tabLogin: "Log in",
  tabSignup: "Sign up",
  loginTitle: "Log in with an Art.com account",
  registerTitle: "Sign up using your email address"
};
com.art.core.components.LoginModal.prototype.setServiceDetails = function(a) {
  this.serviceDetails = a;
  this.service = new com.art.core.services.ServiceProvider(this.serviceDetails)
};
com.art.core.components.LoginModal.prototype.isInDOM = function() {
  if ($("#" + this.id).length > 0) {
    return true
  } else {
    return false
  }
};
com.art.core.components.LoginModal.prototype.render = function(a) {
  this.base.setContents(this.getTemplate(a));
  return this.base.render(a + 1)
};
com.art.core.components.LoginModal.prototype.initSubmitButtons = function() {
  var a = this;
  $("#" + this.id + this.actionButtonName).unbind().die();
  $("#" + this.id + this.cancelButtonName).unbind().die();
  this.base.registerButton(this.actionButtonName, com.art.core.components.ArtButton.ART_ORANGE, this.translatedContent.LoginButtonText,
  function(c) {
    var c = a.base.getButtonById(a.actionButtonName)
  });
  this.base.registerButton(this.cancelButtonName, com.art.core.components.ArtButton.ART_BLUE, this.translatedContent.CancelButtonText,
  function() {})
};
com.art.core.components.LoginModal.prototype.register = function(a) {
  this.regCallback = a
};
com.art.core.components.LoginModal.prototype.doRegister = function(d, c) {
  var a = this.service.createHandlers(this.doRegisterSuccess, this.doRegisterFailure,
  function() {});
  a.comp = this;
  this.service.accountAuthorizationAPIService.accountCreate(a, this.serviceDetails.apiKey, this.serviceDetails.sessionId, d, c)
};
com.art.core.components.LoginModal.prototype.doRegisterSuccess = function(c) {
  if (c.OperationResponse.ResponseCode == 200) {
    if (this.comp.regCallback != undefined) {
      var a = new com.art.core.cookie.Cookie(this.cookieNames);
      a.cookieSetLogin(c);
      com.art.core.vos.Environment.logIn();
      this.comp.regCallback(c);
      this.comp.doClose()
    }
  } else {
    var d = c.OperationResponse.ResponseMessage;
    this.comp.setErrorMessage(d)
  }
};
com.art.core.components.LoginModal.prototype.doRegisterFailure = function(a) {};
com.art.core.components.LoginModal.prototype.retrievePassword = function(a) {
  if (this.serviceDetails.serviceUrlAccountAuthenticationApi == null || this.serviceDetails.sessionId == null || this.serviceDetails.apiKey == null || a == null) {
    throw new Error("LoginModal retrievePassword failed! missing required arguments.")
  }
  var c = this.service.createHandlers(this.retrievePasswordSuccess, this.retrievePasswordFailure,
  function() {});
  c.comp = this;
  this.service.accountAuthorizationAPIService.accountRetrievePassword(c, this.serviceDetails.apiKey, this.serviceDetails.sessionId, a)
};
com.art.core.components.LoginModal.prototype.retrievePasswordSuccess = function(a) {
  if (a.ResponseCode == 200) {
    this.comp.setSuccessMessage("Your password has been sent")
  } else {
    this.comp.setErrorMessage(a.ResponseMessage)
  }
};
com.art.core.components.LoginModal.prototype.retrievePasswordFailure = function(a) {};
com.art.core.components.LoginModal.prototype.authenticate = function(a, d) {
  var e = new com.art.core.services.ServiceProvider(this.serviceDetails);
  var c = e.createHandlers(this.authenticateSuccess, this.authenticateFailure,
  function() {});
  c.comp = this;
  if (this.serviceDetails.serviceUrlAccountAuthenticationApi == null || this.serviceDetails.serviceUrlAccountAuthenticationApi == "" || this.serviceDetails.sessionId == null || this.serviceDetails.sessionId == "" || this.serviceDetails.apiKey == null || this.serviceDetails.apiKey == "" || a == null || a == "" || d == null || d == "") {
    throw new Error("LoginModal authenticate failed! missing required arguments.")
  } else {
    e.accountAuthorizationAPIService.accountAuthenticate(c, this.serviceDetails.apiKey, this.serviceDetails.sessionId, a, d)
  }
};
com.art.core.components.LoginModal.prototype.authenticateSuccess = function(d) {
  var a = this;
  if (d.OperationResponse.ResponseCode == 200) {
    d.success = true;
    setTimeout(function() {
      a.comp.doClose()
    },
    250);
    var c = new com.art.core.cookie.Cookie(this.cookieNames);
    c.cookieSetLogin(d);
    com.art.core.vos.Environment.logIn();
    this.comp.loginCallback(d)
  } else {
    this.comp.setErrorMessage(d.OperationResponse.ResponseMessage)
  }
};
com.art.core.components.LoginModal.prototype.authenticateFailure = function(a) {
  _this.setErrorMessage(a.OperationResponse.ResponseMessage)
};
com.art.core.components.LoginModal.prototype.bindInputs = function() {
  var a = this;
  this.bindValidation();
  var d = com.art.core.components.BaseComponent.events.keypress.enter;
  this.fields.loginEmail.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.loginPassword.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.createEmail.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.createPassword.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.createPasswordConfirm.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.forgotEmail.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  var c = this.base.getButtonById(this.actionButtonName);
  c.registerCallback(d,
  function() {
    a.clickActionButton()
  });
  this.fields.loginEmail.registerEvents();
  this.fields.loginPassword.registerEvents();
  this.fields.createEmail.registerEvents();
  this.fields.createPassword.registerEvents();
  this.fields.createPasswordConfirm.registerEvents();
  this.fields.forgotEmail.registerEvents()
};
com.art.core.components.LoginModal.prototype.clickActionButton = function() {
  var a = this.base.getButtonById(this.actionButtonName);
  a.click()
};
com.art.core.components.LoginModal.prototype.tabToggle = function(e) {
  this.selectedTab = e;
  $("#" + this.id + "_tabs li[id!=" + this.id + "_close]").replaceClass(this.styles.activeTab + " " + this.styles.tabs);
  $("#" + this.id + "_tabs li").find("a").css("cursor", "pointer");
  var d = this.selectedTab == this.LOGIN ? $("#" + this.id + "_tabs li:first") : $("#" + this.id + "_tabs li:nth-child(2)");
  var c = this.selectedTab == this.LOGIN ? $("#" + this.id + "_loginTabContent") : $("#" + this.id + "_registerTabContent");
  var a = this.selectedTab == this.LOGIN ? $("#" + this.id + "_registerTabContent") : $("#" + this.id + "_loginTabContent");
  $("#" + this.id + "_tabs li a").unbind("mouseenter mouseleave");
  d.find("a").css("cursor", "default");
  d.replaceClass(this.styles.selectedTab + " " + this.styles.tabs);
  c.show();
  a.hide();
  this.updateActionButton();
  this.getErrorMsgSelector().hide()
};
com.art.core.components.LoginModal.prototype.enableButtons = function() {
  var d = this.base.getButtonById(this.cancelButtonName);
  d.enable();
  var a = this.base.getButtonById(this.actionButtonName);
  a.enable(this.selectedButtonLabel)
};
com.art.core.components.LoginModal.prototype.updateActionButton = function(f) {
  this.bindInputs();
  if (this.renderedLoginForm != "" && !f) {
    $("#" + this.id + "_MainContent").html(this.renderedLoginForm);
    this.renderedLoginForm = ""
  }
  var a = this;
  var d = this.base.getButtonById(this.actionButtonName);
  d.label = f ? this.translatedContent.SubmitText: this.selectedTab == this.LOGIN ? this.translatedContent.LoginButtonText: this.translatedContent.RegisterButtonText;
  this.selectedButtonLabel = d.label;
  d.enable(this.selectedButtonLabel);
  var e = this.base.getButtonById(this.cancelButtonName);
  e.enable(this.translatedContent.CancelButtonText);
  e.registerCallback(com.art.core.components.BaseButton.CLICK,
  function(c) {
    a.doClose()
  });
  e.hide();
  if (f) {
    d.registerCallback(com.art.core.components.BaseButton.CLICK,
    function(c) {
      d.disable(a.translatedContent.ProcessingText);
      e.disable();
      if (a.forgotValidation()) {
        a.retrievePassword(a.fields.forgotEmail.getValue())
      } else {
        a.enableButtons()
      }
    });
    e.enable(this.translatedContent.BackText);
    e.show();
    e.registerCallback(com.art.core.components.BaseButton.CLICK,
    function() {
      $("#" + a.id + "_MainContent").html(a.renderedLoginForm);
      a.renderedLoginForm = "";
      a.getErrorMsgSelector().hide();
      a.updateActionButton()
    })
  } else {
    if (this.selectedTab == this.LOGIN) {
      d.registerCallback(com.art.core.components.BaseButton.CLICK,
      function(c) {
        d.disable(a.translatedContent.ProcessingText);
        e.disable();
        if (a.loginValidation()) {
          a.authenticate(a.fields.loginEmail.getValue(), a.fields.loginPassword.getValue())
        } else {
          a.enableButtons()
        }
      })
    } else {
      d.registerCallback(com.art.core.components.BaseButton.CLICK,
      function(c) {
        d.disable(a.translatedContent.ProcessingText);
        e.disable();
        if (a.createValidation()) {
          a.doRegister(a.fields.createEmail.getValue(), a.fields.createPassword.getValue())
        } else {
          a.enableButtons()
        }
      })
    }
  }
};
com.art.core.components.LoginModal.prototype.validateAndTransmit = function(d, e, c) {
  var a = this;
  if (d.which == 13 || d.keyCode == 13) {
    if (a.loginValidation(e)) {
      if (a.callbacks[c] != undefined) {
        a.callbacks[c]()
      }
    }
  }
};
com.art.core.components.LoginModal.prototype.bindKeyDowns = function() {
  var a = this;
  $("#" + a.id + "_password").bind("keydown",
  function(c) {
    a.validateAndTransmit(c, {
      username: $("#" + a.id + "_username").val(),
      pass1: $("#" + a.id + "_password").val(),
      pass2: false
    },
    a.LOGIN_CLICKED)
  });
  $("#" + a.id + "_regconfirmpassword").bind("keydown",
  function(c) {
    a.validateAndTransmit(c, {
      username: $("#" + a.id + "_username").val(),
      pass1: $("#" + a.id + "_password").val(),
      pass2: $("#" + a.id + "_regconfirmpassword").val()
    },
    a.REGISTER_CLICKED)
  })
};
com.art.core.components.LoginModal.prototype.forgotPasswordServiceResponse = function(a) {
  $("#" + this.id + "_forgetPassResponse").show();
  $("#" + this.id + "_forgetpasswordresponse").text(a)
};
com.art.core.components.LoginModal.prototype.registerEvents = function() {
  var a = this;
  this.getErrorMsgSelector().hide();
  this.initStyles();
  this.tabToggle(this.selectedTab);
  this.bindKeyDowns();
  $("#" + this.id + "_loginTab").live("click",
  function() {
    a.tabToggle(a.LOGIN)
  });
  $("#" + this.id + "_registerTab").live("click",
  function() {
    a.tabToggle(a.REGISTER)
  });
  $(document).bind("keydown",
  function(d) {
    if (d.which == 27 || d.keyCode == 27) {
      a.doClose()
    }
  });
  $("#" + this.id + "_forgetPassLink").live("click",
  function() {
    a.renderedLoginForm = $("#" + a.id + "_MainContent").html();
    setTimeout(function() {
      var d = a.getForgotPasswordFormTemplate();
      $("#" + a.id + "_MainContent").html(d);
      $(".LoginModalTitle").addClass(a.styles.title);
      a.updateActionButton(true);
      a.getErrorMsgSelector().hide()
    },
    200)
  });
  $("#" + this.id + "_viewTerm").click(function() {
    window.open(a.translatedContent.locationPrivacyPolicy, "", "left=20,top=20,width=800,height=500,toolbar=0,resizable=0,menubar=0,scrollbars=1")
  });
  $("." + this.styles.tabs).bind("mouseover",
  function() {
    if (!$(this).hasClass(a.styles.selectedTab)) {
      $(this).addClass(a.styles.activeTabHover)
    }
  });
  $("." + this.styles.tabs).bind("mouseout",
  function() {
    if (!$(this).hasClass(a.styles.selectedTab)) {
      $(this).removeClass(a.styles.activeTabHover)
    }
  });
  this.base.registerEvents();
  this.fb = new com.art.core.utils.Facebook(this.service, "fb", this.config);
  this.fb.setLoginLink(this.serviceDetails.apiKey, this.serviceDetails.sessionId, "#facebookBtn", this.translatedContent.loginWithFacebook, true);
  this.fb.setLoginLink(this.serviceDetails.apiKey, this.serviceDetails.sessionId, "#regFacebookBtn", this.translatedContent.loginWithFacebook, true);
  this.fb.onLoginSuccess(function(e) {
    e.success = e.artComResponse.OperationResponse.ResponseCode == 200;
    setTimeout(function() {
      a.doClose()
    },
    250);
    var d = new com.art.core.cookie.Cookie(a.cookieNames);
    d.cookieSetLogin(e.artComResponse);
    com.art.core.vos.Environment.logIn();
    a.loginCallback(e)
  });
  $("#" + this.id + "_tabs li:nth-child(3)").css("cursor", "pointer");
  $("#" + this.id + "_tabs li:nth-child(3)").unbind("click");
  $("#" + this.id + "_tabs li:nth-child(3)").bind("click",
  function() {
    a.doClose()
  });
  var c = $.browser.msie && !jQuery.support.boxModel;
  if (c) {
    $("input[name$='EmailAddressHint']").css("height", "28px");
    $("input[name$='PasswordHint']").css("height", "28px")
  }
  if (this.startPassword) {
    $("#" + this.id + "_forgetPassLink").trigger("click")
  }
};
com.art.core.components.LoginModal.prototype.initStyles = function() {
  this.base.removeCloseButton();
  $("#" + this.id + "_tabs").replaceClass(this.styles.tabBar);
  $("#" + this.id + "_registerTab").replaceClass(this.styles.tabs);
  $("#" + this.id + "_registerTab a").replaceClass(this.styles.tabLinks);
  $("#" + this.id + "_loginTab").replaceClass(this.styles.tabs);
  $("#" + this.id + "_loginTab a").replaceClass(this.styles.tabLinks);
  $("#" + this.id + "_loginTabContent").replaceClass(this.styles.container);
  $("#" + this.id + "_registerTabContent").replaceClass(this.styles.container);
  $(".LoginModalTitle").addClass(this.styles.title);
  $("#" + this.id + "_loginTabContainer").css("margin-top", $.browser.msie ? "-9px": "0px");
  $(".buttonBarTemplate").css({
    "padding-right": "20px",
    "padding-bottom": "20px"
  })
};
com.art.core.components.LoginModal.prototype.restoreLoginForm = function() {
  $("#" + this.id + "_MainContent").html(this.renderedLoginForm);
  this.mainActionButton.label = this.translatedContent.LogInText;
  this.mainActionButton.enable();
  this.base.removeButtonById(this.id + "_cancelbutton")
};
com.art.core.components.LoginModal.prototype.bindValidation = function() {
  var a = new com.art.core.utils.InputValidation();
  var e = a.getRequired(this.translatedContent.ValidateEmailMissing);
  var d = a.getValidEmail(this.translatedContent.ValidateInvalidEmail);
  this.fields.loginEmail.setValidators([e, d]);
  this.fields.createEmail.setValidators([e, d]);
  this.fields.forgotEmail.setValidators([e, d]);
  e = a.getRequired(this.translatedContent.ValidatePasswordMissing);
  this.fields.loginPassword.setValidators([e]);
  this.fields.createPassword.setValidators([e]);
  e = a.getRequired(this.translatedContent.ValidateConfirmMissing);
  var c = a.getIsEqual(this.fields.createPassword, this.translatedContent.ValidatePasswordsDontMatch);
  this.fields.createPasswordConfirm.setValidators([e, c])
};
com.art.core.components.LoginModal.prototype.clearErrorMessage = function() {
  this.getErrorMsgSelector().text("");
  this.fields.loginEmail.clearError();
  this.fields.loginPassword.clearError()
};
com.art.core.components.LoginModal.prototype.setSuccessMessage = function(a) {
  this.getErrorMsgSelector().css({
    backgroundColor: "#8ac184",
    color: "#FFFFFF"
  }).show().html('<div style="background-image:url(http://cache1.artprintimages.com/images/coreimages/greenCheckCircle.png);background-repeat:no-repeat;padding-left: 20px;height: 15px;padding-top: 1px;">' + a + "</div>");
  this.enableButtons()
};
com.art.core.components.LoginModal.prototype.setErrorMessage = function(a) {
  this.getErrorMsgSelector().css({
    backgroundColor: "#F7D7C6",
    color: "#000000"
  }).show().text(a);
  this.enableButtons()
};
com.art.core.components.LoginModal.prototype.forgotValidation = function() {
  this.getErrorMsgSelector().hide();
  this.clearErrorMessage("");
  var a = this.fields.forgotEmail.inputValidation();
  if (a) {
    return true
  } else {
    return false
  }
};
com.art.core.components.LoginModal.prototype.createValidation = function() {
  this.getErrorMsgSelector().hide();
  this.clearErrorMessage("");
  var e = this.fields.createEmail.inputValidation();
  var d = this.fields.createPassword.inputValidation();
  var a = this.fields.createPasswordConfirm.inputValidation();
  if (e && d && a) {
    return true
  } else {
    return false
  }
};
com.art.core.components.LoginModal.prototype.loginValidation = function() {
  this.getErrorMsgSelector().hide();
  this.clearErrorMessage("");
  var c = this.fields.loginEmail.inputValidation();
  var a = this.fields.loginPassword.inputValidation();
  if (c && a) {
    return true
  } else {
    return false
  }
};
com.art.core.components.LoginModal.prototype.setColor = function(a) {
  return "color:" + a
};
com.art.core.components.LoginModal.prototype.getForgotPasswordFormTemplate = function() {
  return this.forgotPasswordFormTemplate.replace(/\$NAME/g, this.id).replace("$LOGINTITLE", this.translatedContent.forgotPasswordTitle).replace(/\[EMAILHINT]/gi, this.translatedContent.EmailAddressHint).replace(/\$FIELD1/gi, this.fields.forgotEmail.getTemplate())
};
com.art.core.components.LoginModal.prototype.getTemplate = function(h) {
  var f = h != undefined ? "z-index:" + h + ";": "z-index:1000";
  var a = "<div id='contentDivider' style='border-bottom: 1px solid #CECECE;left: -20px;margin-bottom: 15px;margin-top: 15px;overflow: visible;position: relative;width: 320px;'></div>";
  var d = this.loginTemplate.replace(/\$NAME/g, this.id).replace("$LOGINTITLE", this.translatedContent.loginTitle).replace(/\[EMAILHINT]/gi, this.translatedContent.EmailAddressHint).replace(/\[PASSWORDHINT\]/gi, this.translatedContent.PasswordHint).replace(/\[PASSWORDMISSINGHINT\]/gi, this.translatedContent.PasswordMissingText).replace(/\[DIVLINE\]/gi, a).replace(/\[LOGINTOFACEBOOK\]/gi, this.translatedContent.LoginToFacebook).replace("[FLDEMAIL]", this.fields.loginEmail.getTemplate()).replace("[FLDPWD]", this.fields.loginPassword.getTemplate()).replace(/\[CLSPWDHINT\]/gi, this.cssClass.link).replace("[CLSPWDHINTHOVER]", this.cssClass.linkHover);
  var e = this.registerTemplate.replace(/\$NAME/g, this.id).replace("$REGISTERTITLE", this.translatedContent.registerTitle).replace(/\[EMAILHINT]/gi, this.translatedContent.EmailAddressHint).replace(/\[PASSWORDHINT\]/gi, this.translatedContent.PasswordHint).replace(/\[PASSWORDMISSINGHINT\]/gi, this.translatedContent.PasswordMissingText).replace(/\[DIVLINE\]/gi, a).replace(/\[REGFB\]/gi, this.translatedContent.RegWithFacebook).replace(/\[PRIVACYPOLICY\]/gi, this.translatedContent.PrivacyPolicy).replace(/\[CONFIRMPASSWORDHINT\]/gi, this.translatedContent.ConfirmPasswordHint).replace(/\$FIELD1/gi, this.fields.createEmail.getTemplate()).replace(/\$FIELD2/gi, this.fields.createPassword.getTemplate()).replace(/\$FIELD3/gi, this.fields.createPasswordConfirm.getTemplate()).replace(/\[CLSPWDHINT\]/gi, this.cssClass.link).replace("[CLSPWDHINTHOVER]", this.cssClass.linkHover);
  var c = this.template.replace(/\$NAME/g, this.id).replace("$loginContent", d).replace("$registerContent", e).replace("$ZNDX", f).replace("$CLOSECLS", this.cssClass.closeButton).replace("[TABSIGNUP]", this.translatedContent.tabSignup).replace("[TABLOGIN]", this.translatedContent.tabLogin).replace("$CLOSECLS", this.cssClass.closeButton).replace(/\$IMAGE_HOST/g, this.getImageHost());
  return c
};
com.art.core.components.LoginModal.prototype.setStyle = function(a, c) {
  this.styles[a] = c
};
com.art.core.components.LoginModal.prototype.styles = {
  tabBar: "login_tabbar",
  tabs: "login_tabs",
  tabLinks: "login_tablinks",
  tabLinksOver: "login_tablinksover",
  tabLinksOff: "login_tablinksoff",
  container: "login_container",
  title: "login_title",
  selectedTab: "login_selectedtab",
  activeTab: "login_activetab",
  activeTabHover: "login_activetabhover"
};
com.art.core.components.LoginModal.prototype.template = "<ul id='$NAME_tabs'><li id='$NAME_loginTab'><a href='#tab1'>[TABLOGIN]</a></li><li id='$NAME_registerTab'><a href='#tab2'>[TABSIGNUP]</a></li><li id='$NAME_close'><div class='$CLOSECLS'></div></li></ul><div style='clear:both;font-size:0px;'></div><div id='$NAME_loginTabContainer' class='tab_container' style='$ZNDX;min-height:320px;'><div id='$NAME_loginTabContent' class='logintab_content'>$loginContent</div><div id='$NAME_registerTabContent' class='registertab_content'>$registerContent</div></div>";
com.art.core.components.LoginModal.prototype.loginTemplate = "<div id='$NAME_ErrorMsg' style='background-color:#F7D7C6;font-family:arial,sans-serif;font-size:12px;padding:5px;margin-bottom:5px;display:none;'></div><div id='$NAME_MainContent'><div id='$NAME_facebookTitle' class='LoginModalTitle'>[LOGINTOFACEBOOK]</div><div id='facebookBtn' style='margin-top:5px;text-align:left;'></div>[DIVLINE]<div style='clear:both'></div><div id='$NAME_Title' class='LoginModalTitle'>$LOGINTITLE</div><div id='$NAME_loginfields'>   [FLDEMAIL]   [FLDPWD]</div><div id='$NAME_forgetPassLink' style='float:left;cursor:pointer;font-size:13px;' class='[CLSPWDHINT]' onmouseover='this.className=\"[CLSPWDHINTHOVER]\"' onmouseout='this.className=\"[CLSPWDHINT]\"'>[PASSWORDMISSINGHINT]</div><div style='clear:both'></div></div>";
com.art.core.components.LoginModal.prototype.forgotPasswordFormTemplate = "<div id='$NAME_Title' class='LoginModalTitle'>$LOGINTITLE</div><div id='$NAME_forgetPassForm' class='loginModalForgetPassword'>     <div style='margin-top:10px;margin-bottom:10px;'>         $FIELD1         <div style='margin: 5px;float:right;' id='$NAME_forgetPasswordButton' ></div>     </div></div><div id='$NAME_forgetPassResponse' class='loginModalForgetPassword'>     <div style='margin-top:10px;margin-bottom:10px;'>         <span id='$NAME_forgetpasswordresponse' style='float:left;#padding-top:8px;' ></span>         <div style='margin: 5px;float:right;' id='$NAME_forgetpasswordok' ></div>     </div></div>";
com.art.core.components.LoginModal.prototype.registerTemplate = "<div id='$NAME_RegisterErrorMsg' style='background-color:#F7D7C6;font-family:arial,sans-serif;font-size:12px;padding:5px;margin-bottom:5px;display:none;'></div><div id='$NAME_MainContent_reg'>    <div id='$NAME_regFacebookTitle' class='LoginModalTitle'>[REGFB]</div>    <div id='regFacebookBtn' style='margin-top:5px;text-align:left'></div>    [DIVLINE]    <div id='$NAME_Title' class='LoginModalTitle'>$REGISTERTITLE</div>    $FIELD1    $FIELD2    $FIELD3    <div class='clear'></div>    <div id=\"$NAME_viewTerm\" style=\"float:left;cursor:pointer;font-size:13px;margin-top:47px;\" class=\"[CLSPWDHINT]\" onmouseover=\"this.className='[CLSPWDHINTHOVER]'\" onmouseout=\"this.className='[CLSPWDHINT]'\">[PRIVACYPOLICY]    </div>    <div class='clear'></div></div>";
com.art.core.components.LoginModal.prototype.getErrorMsgSelector = function() {
  return this.selectedTab == this.LOGIN ? $("#" + this.id + "_ErrorMsg") : $("#" + this.id + "_RegisterErrorMsg")
};
com.art.core.components.LoginModal.prototype.close = function(c) {
  var a = this;
  this.closeCallback = c;
  this.base.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
  function() {
    a.doClose()
  })
};
com.art.core.components.LoginModal.prototype.getLoginAccountData = function() {
  return {
    username: this.fields.loginEmail.getValue(),
    password: this.fields.loginPassword.getValue()
  }
};
com.art.core.components.LoginModal.prototype.doClose = function() {
  $("#" + this.id).unbind("keypress");
  $("#" + this.id).die();
  $("#" + this.id).remove();
  if (this.closeCallback != undefined) {
    this.closeCallback()
  }
};
com.art.core.components.LoginModal.displayLoginPopupStatic = function(a, h, f, c, l, j) {
  if (j == undefined) {
    j = com.art.core.components.LoginModal.LOGIN
  }
  var k = {
    loginTitle: "Login with an Art.com Account",
    registerTitle: "Signup Using Your Email"
  };
  $.updateObject(k, l);
  if (c == undefined || typeof c == "string") {
    c = {}
  }
  var e = "art_x_lb";
  if ($("#" + e).attr("id") != e) {
    var d = new com.art.core.components.LightBox(e, "body", 0.4)
  }
  d.zindex = 20;
  d.show();
  loginComponent = {};
  loginComponent = new com.art.core.components.LoginModal("art_x_login", k.loginTitle, k.registerTitle, c, j);
  loginComponent.setServiceDetails({
    serviceUrlAccountAuthenticationApi: f,
    sessionId: h,
    apiKey: a
  });
  $("body").append(loginComponent.render(21));
  loginComponent.initSubmitButtons();
  loginComponent.registerEvents();
  loginComponent.lightbox = d;
  loginComponent.close(function() {
    d.close()
  });
  return loginComponent
};
com.art.core.components.LoginModal.prototype.login = function(a) {
  this.loginCallback = a
};
com.art.core.components.BaseComponent.extend(com.art.core.components.LoginModal.prototype);
com.art.core.components.Logout = function(e, d, f, c, a) {
  this.init();
  this.id = e;
  this.cssClass = com.art.core.components.Logout.cssClass;
  $.updateObject(this.cssClass, d);
  this.translatedContent = com.art.core.components.Logout.translatedContent;
  $.updateObject(this.translatedContent, f);
  this.cookieNames = {};
  $.updateObject(this.cookieNames, c);
  com.art.core.components.Logout.cookieNames = this.cookieNames;
  this.nullValue = com.art.core.components.Logout.nullValue;
  this.cookieHelper = new com.art.core.cookie.Cookie(this.cookieNames);
  this.config = {
    defaultFacebookAccountId: "133465040008099",
    defaultFBMissingBehavior: "load"
  };
  $.updateObject(this.config, a)
};
com.art.core.components.Logout.cssClass = {};
com.art.core.components.Logout.translatedContent = {};
com.art.core.components.Logout.cookieNames = {};
com.art.core.components.Logout.nullValue = "";
com.art.core.components.Logout.events = {
  LOGOUT: "LOGOUT"
};
com.art.core.components.Logout.logOutStatic = function(c, a) {
  if (c == undefined || typeof c == "string") {
    c = {}
  }
  var d = new com.art.core.components.Logout("lg", {},
  {},
  c);
  d.registerCallback(com.art.core.components.Logout.events.LOGOUT,
  function() {
    d.reloadPage()
  });
  d.logOut()
};
com.art.core.components.Logout.prototype.logOut = function() {
  var a = this;
  this.cookieHelper.cookieSetLogout();
  com.art.core.vos.Environment.logOut();
  try {
    var d = new com.art.core.utils.Facebook("", "fb", this.config);
    d.logout(function() {
      a.logoutCallback()
    })
  } catch(c) {
    this.logoutCallback()
  }
};
com.art.core.components.Logout.prototype.logoutCallback = function() {
  if (this["callbacks"][com.art.core.components.Logout.events.LOGOUT] != undefined) {
    this["callbacks"][com.art.core.components.Logout.events.LOGOUT]()
  }
};
com.art.core.components.Logout.prototype.reloadPage = function() {
  var j = ["pagetype=ep", "pagetype=ac", "ac=true", "logout=y"];
  var f = ["/settings", "/profile"];
  var e = window.location;
  var d = com.art.core.utils.StringUtil.replaceKeys(e.pathname, f, ["", ""]);
  var k = com.art.core.utils.StringUtil.replaceKeys(e.search, j, ["", "", "", ""]);
  var c = e.hash;
  var m = d + k + (k.indexOf("logout=y") < 0 ? (k.length > 0 ? "&": "?") + "logout=y" + c: "" + c);
  m = com.art.core.utils.StringUtil.replaceKeys(m, ["&&", "?&"], ["&", "?"]);
  window.location = m
};
com.art.core.components.BaseComponent.extend(com.art.core.components.Logout.prototype);
com.art.core.components.ArtButton = function(f, d, h, a) {
  var c = com.art.core.components;
  if (typeof f != "string") {
    throw new Error("ArtButton Failed! id param is NOT a string.")
  }
  if ((d != c.ArtButton.ART_ORANGE) && (d != c.ArtButton.ART_BLUE) && (d != c.ArtButton.ART_SILVER) && (d != c.ArtButton.APC_RED) && (d != c.ArtButton.APC_BLUE)) {
    throw new Error("ArtButton Failed! buttonColor specified is not supported.")
  }
  var e;
  switch (d) {
  case c.ART_ORANGE:
  case c.ArtButton.APC_RED:
    e = c.Button.Flavors.PRIMARY;
    break;
  case c.ArtButton.APC_BLUE:
  case c.ArtButton.ART_BLUE:
    e = c.Button.Flavors.SECONDARY;
    break
  }
  return new c.Button(f, h, c.Button.Sizes.MEDIUM, e, {})
};
com.art.core.components.ArtButton.ART_ORANGE = "art_orange";
com.art.core.components.ArtButton.ART_BLUE = "art_blue";
com.art.core.components.ArtButton.APC_RED = "apc_red";
com.art.core.components.ArtButton.APC_BLUE = "apc_blue";
com.art.core.components.Button = function(e, f, h, d, a, c) {
  if (typeof e != "string") {
    throw new Error("Button Failed! id param is NOT a string.")
  }
  this.NAME = com.art.core.components.Button.NAME;
  this.sizes = {};
  this.sizes.SMALL = com.art.core.components.Button.Sizes.SMALL;
  this.sizes.MEDIUM = com.art.core.components.Button.Sizes.MEDIUM;
  this.sizes.LARGE = com.art.core.components.Button.Sizes.LARGE;
  this.flavors = {};
  this.flavors.PRIMARY = com.art.core.components.Button.Flavors.PRIMARY;
  this.flavors.SECONDARY = com.art.core.components.Button.Flavors.SECONDARY;
  this.init();
  this.id = e;
  this.label = f;
  this.stateCurrent = this.states.enabled;
  this.eventCurrent = this.events.blur;
  this.label = f;
  if (c != undefined && !isNaN(c)) {
    this.fixedWidth = c
  } else {
    this.fixedWidth = 0
  }
  if (h != undefined) {
    this.size = h
  } else {
    this.size = this.sizes.MEDIUM
  }
  if (d != undefined) {
    this.flavor = d
  } else {
    this.flavor = this.flavors.PRIMARY
  }
  this.cssClass = this.initializeCss();
  $.updateObject(this.cssClass, a)
};
com.art.core.components.Button.NAME = "Button";
com.art.core.components.Button.Sizes = {};
com.art.core.components.Button.Sizes.SMALL = "small";
com.art.core.components.Button.Sizes.MEDIUM = "medium";
com.art.core.components.Button.Sizes.LARGE = "large";
com.art.core.components.Button.Flavors = {};
com.art.core.components.Button.Flavors.PRIMARY = "primary";
com.art.core.components.Button.Flavors.SECONDARY = "secondary";
com.art.core.components.Button.prototype.template = "";
com.art.core.components.Button.prototype.render = function(a) {
  return this.getTemplate(a)
};
com.art.core.components.Button.prototype.loading = function(a) {
  this.disable();
  this.updateStyle(this.states.loading, this.eventCurrent)
};
com.art.core.components.Button.prototype.hide = function() {
  $("#" + this.id).hide()
};
com.art.core.components.Button.prototype.click = function() {
  $("#" + this.id).trigger("mouseup")
};
com.art.core.components.Button.prototype.show = function(a) {
  if (a != undefined) {
    $("#" + this.id).attr("value", a)
  }
  $("#" + this.id).show()
};
com.art.core.components.Button.prototype.disable = function(a) {
  this.updateStyle(this.states.disabled, this.eventCurrent);
  $("#" + this.id).attr("disabled", "disabled");
  if (a != undefined) {
    $("#" + this.id).attr("value", a)
  }
};
com.art.core.components.Button.prototype.enable = function(a) {
  this.updateStyle(this.states.enabled, this.eventCurrent);
  $("#" + this.id).removeAttr("disabled");
  if (a != undefined) {
    $("#" + this.id).attr("value", a)
  }
};
com.art.core.components.Button.prototype.getPosition = function(c) {
  var a = this.states[this.color][c];
  return a
};
com.art.core.components.Button.prototype.getTemplate = function(d) {
  var a = this.label;
  var c = d != undefined ? "z-index:" + d + ";": "";
  return this.template.replace(/\[ID]/g, this.id).replace("[LABEL]", a).replace(/\[ZNDX]/g, c).replace("[CSSFIELD]", this.cssClass.enabled.blur.field).replace("[CSSLABEL]", this.cssClass.enabled.blur.label).replace("[FXWDTH]", (this.fixedWidth > 0 ? "width: " + this.fixedWidth + "px;": ""))
};
com.art.core.components.Button.prototype.getImageFile = function() {
  var a = this.color.indexOf("art") > -1 ? this.ART_SPRITE: this.APC_SPRITE;
  return a
};
com.art.core.components.Button.prototype.template = '<input type="button" id="[ID]" class="[CSSFIELD]" value="[LABEL]" style="[ZNDX][FXWDTH]"/>';
com.art.core.components.Button.prototype.updateStyle = function(f, a) {
  var c = $("#" + this.id);
  var e = $("#" + this.id + "_label");
  var d = $("#" + this.id + "_err");
  var h = {};
  switch (f) {
  case this.states.error:
    h = this.cssClass.error;
    break;
  case this.states.disabled:
    h = this.cssClass.disabled;
    break;
  case this.states.loading:
    h = this.cssClass.loading;
    break;
  default:
    h = this.cssClass.enabled;
    break
  }
  switch (a) {
  case this.events.focus:
    h = h.focus;
    break;
  case this.events.hover:
    h = h.hover;
    break;
  default:
    h = h.blur;
    break
  }
  c.removeClass();
  e.removeClass();
  c.addClass(h.field);
  e.addClass(h.label)
};
com.art.core.components.Button.prototype.registerEvents = function() {
  var a = this;
  var c = "#" + this.id;
  $(c).unbind("mouseover");
  $(c).mouseover(function() {
    a.updateStyle(a.stateCurrent, a.events.hover)
  });
  $(c).unbind("mouseout");
  $(c).mouseout(function() {
    a.updateStyle(a.stateCurrent, a.events.blur)
  });
  $(c).mousedown(function() {});
  $(c).unbind("mouseup");
  $(c).mouseup(function() {
    this.blur();
    if (a.callbacks[a.CLICK] != undefined) {
      a.callbacks[a.CLICK]()
    }
  });
  $(c).die("click");
  $(c).live("click",
  function(f) {
    f.stopPropagation();
    f.preventDefault()
  });
  $(c).bind("keydown",
  function(f) {
    if (f.keyCode == 13) {
      if (a.callbacks[a.events.keypress.enter] != undefined) {
        a.callbacks[a.events.keypress.enter]()
      }
    }
  });
  var d = $.browser.msie && !jQuery.support.boxModel;
  if (d) {
    $(c + "_label").css("height", "31px");
    $(c + "_rightcap").css("height", "31px")
  }
};
com.art.core.components.Button.prototype.initializeCss = function() {
  return {
    enabled: {
      blur: {
        field: this.flavor + " " + this.size
      },
      hover: {
        field: this.flavor + "hover " + this.size
      }
    },
    disabled: {
      blur: {
        field: this.flavor + " " + this.size + " disabled"
      },
      hover: {
        field: this.flavor + "hover " + this.size + " disabled"
      }
    },
    loading: {
      blur: {
        field: this.flavor + " " + this.size + " loading"
      },
      hover: {
        field: this.flavor + "hover " + this.size + " loading"
      }
    }
  }
};
com.art.core.components.Button.prototype.destroy = function() {
  $("#" + this.id).die();
  $("#" + this.id).remove()
};
com.art.core.components.BaseButton.extend(com.art.core.components.Button.prototype);
com.art.core.components.SlideShow = function(c, f, a, d, e) {
  this.init();
  this.id = c;
  this.width = f;
  this.height = a;
  this.margin = 40;
  this.backgroundColor = "#FFFFFF";
  this.bottomControlsPadding = 30;
  this.ADD_TO_CART_CLICKED = com.art.core.components.SlideShow.ADD_TO_CART_CLICKED;
  this.CLOSE_BUTTON_CLICKED = com.art.core.components.SlideShow.CLOSE_BUTTON_CLICKED;
  this.ESC_KEY_CLICKED = com.art.core.components.SlideShow.ESC_KEY_CLICKED;
  this.delayTimerID;
  this.requestTimeoutDuration = 10 * 1000;
  this.shareBtn;
  this.controlsTimer;
  this.slideShowTimerID;
  this.mouseX = 0;
  this.mouseY = 0;
  this.images = d;
  this.slideShowToggle = true;
  this.slideShowControlsIsPaused = false;
  this.slideShowControls = {
    play: {
      enabled: "-385px -157px",
      disabled: "-45px -565px",
      width: "17px",
      height: "20px"
    },
    pause: {
      enabled: "-450px -158px",
      disabled: "0px -565px",
      width: "14px",
      height: "18px"
    },
    previous: {
      enabled: "-348px -161px",
      disabled: "-90px -565px",
      width: "16px",
      height: "15px"
    },
    next: {
      enabled: "-419px -161px",
      disabled: "-120px -565px",
      width: "15px",
      height: "15px"
    }
  };
  this.slideShowCursor = e == undefined ? -1 : e - 1;
  this.ssScrollDirectionOptions = {
    LEFT: "left",
    RIGHT: "right"
  };
  this.ssScrollDirection = this.ssScrollDirectionOptions.LEFT;
  this.controlsInit = false;
  this.ssCurrentCursor = 0;
  this.ssIsPaused = false;
  this.ssProcessing = false;
  this.ssCurrent;
  this.SlideShowNext;
  this.playPause = false;
  this.ssContainerWidth;
  this.ssContainerHeight;
  this.ssW = 58;
  this.ssH = 70;
  this.newImages;
  this.addToCartBtn;
  this.closeBtn;
  this.imageInfo
};
com.art.core.components.SlideShow.ADD_TO_CART_CLICKED = "slideShowAddToCart";
com.art.core.components.SlideShow.CLOSE_BUTTON_CLICKED = "slideShowCloseButtonClicked";
com.art.core.components.SlideShow.ESC_KEY_CLICKED = "escKeyClicked";
com.art.core.components.SlideShow.prototype.getTotalImages = function() {
  return this.images.length
};
com.art.core.components.SlideShow.prototype.registerEvents = function() {
  var d = setTimeout("");
  for (var c = 0; c <= d; c++) {
    clearTimeout(c)
  }
  var a = this;
  $("#" + this.id).bind("contextmenu",
  function(f) {
    f.preventDefault()
  });
  this.centerControls();
  $("body").mousemove(function(f) {
    if (f.pageX != a.mouseX && f.pageY != a.mouseY) {
      a.mouseX = f.pageX;
      a.mouseY = f.pageY;
      a.hideShowMainControl()
    }
  });
  $("#" + this.id + "_CONTROL_BAR").live("click",
  function(f) {
    f.preventDefault();
    f.stopPropagation()
  });
  $(window).resize(function() {
    if (typeof window.innerWidth != "undefined") {
      a.width = window.innerWidth - a.ssW;
      a.height = window.innerHeight - a.ssH
    } else {
      if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        a.width = document.documentElement.clientWidth - a.ssW;
        a.height = document.documentElement.clientHeight - a.ssH
      }
    }
    $("#" + a.id).css("width", a.width);
    $("#" + a.id).css("height", a.height);
    a.centerControls()
  });
  $("#ssCloseSlideshow").live("click",
  function() {
    a.close()
  });
  $(".imgClip").live("click",
  function(e) {
    e.stopPropagation()
  });
  $(document).bind("keydown",
  function(e) {
    if (e.which == 27 || e.keyCode == 27) {
      a.close();
      if (a.callbacks[a.ESC_KEY_CLICKED] != null) {
        a.callbacks[a.ESC_KEY_CLICKED]()
      }
    }
  });
  this.slideShowStartupMainControls();
  this.addToCartBtn.registerEvents();
  this.addToCartBtn.registerCallback(com.art.core.components.BaseButton.CLICK,
  function() {
    a.callbacks[a.ADD_TO_CART_CLICKED]()
  });
  this.closeBtn.registerEvents();
  this.closeBtn.registerCallback(com.art.core.components.BaseButton.CLICK,
  function() {
    a.callbacks[a.CLOSE_BUTTON_CLICKED]()
  })
};
com.art.core.components.SlideShow.prototype.close = function() {
  clearTimeout(this.slideShowTimerID);
  $("body").unbind("mousemove");
  $("#" + this.id + "_CONTROL_BAR").die("click");
  $("#ssCloseSlideshow").die("click");
  $("#" + this.id).die();
  $("#" + this.id + "_CONTROL_BAR").remove();
  $("#" + this.id).remove();
  var c = setTimeout("");
  for (var a = 0; a <= c; a++) {
    clearTimeout(a)
  }
};
com.art.core.components.SlideShow.prototype.start = function() {
  this.loadImage()
};
com.art.core.components.SlideShow.prototype.appendImages = function(a) {
  this.newImages = a
};
com.art.core.components.SlideShow.prototype.loadImage = function() {
  clearTimeout(this.slideShowTimerID);
  var a = this;
  if (this.ssProcessing) {
    return
  }
  this.ssProcessing = true;
  var a = this;
  var d = "id_" + Math.round(Math.random() * 10000);
  this.SlideShowNext = d;
  if (this.ssScrollDirection == this.ssScrollDirectionOptions.LEFT) {
    this.slideShowCursor = this.slideShowCursor == this.images.length - 1 ? 0 : this.slideShowCursor + 1
  } else {
    this.slideShowCursor = (this.slideShowCursor <= 0) ? this.images.length - 1 : this.slideShowCursor - 1
  }
  $("#" + this.id + "_CLIP").append('<img id="' + d + '" class="imgClip" src="' + this.images[this.slideShowCursor].url + '" style="position:absolute;left:0px"/>');
  var c = this.ssScrollDirection == this.ssScrollDirectionOptions.LEFT ? $("#" + this.id + "_CLIP").width() + 10 : -($("#" + this.id + "_CLIP").width() + 10);
  if (this.ssScrollDirection == this.ssScrollDirectionOptions.LEFT) {
    if ($("#" + d).width() > c) {
      c = $("#" + d).width()
    }
  } else {
    if ( - $("#" + d).width() < c) {
      c = -$("#" + d).width()
    }
  }
  $("#" + d).css("left", c + "px");
  $("#" + d).live("click",
  function() {
    a.playPauseToggle()
  });
  $("#" + d).imagesLoaded(function(e) {
    var j = Math.round(($("#" + a.id + "_CLIP").height() - $("#" + d).height()) / 2);
    $(this).unbind("load");
    $("#" + d).css("top", j + "px");
    $(a).addCenterOuterShadow();
    if (a.controlsInit == false) {
      a.slideShowStartupMainControls("mySlideShow_CONTROL_BAR");
      a.controlsInit = true
    }
    if (a.images[a.slideShowCursor].showMarkDownPrice == false || a.images[a.slideShowCursor].showMarkDownPrice == undefined) {
      $("#ssImagePrice").css("margin-right", "35px");
      var m = a.images[a.slideShowCursor].price;
      $("#ssImagePrice").css("color", "#000000");
      $("#ssImagePrice").css("font-weight", "normal");
      $("#ssImagePrice").html(m);
      $("#ssDiscountImagePrice").text("")
    } else {
      $("#ssImagePrice").css("margin-right", "15px");
      $("#ssImagePrice").css("font-weight", "bold");
      var k = a.images[a.slideShowCursor].DisplayMSRP;
      $("#ssDiscountImagePrice").html(k);
      var l = a.images[a.slideShowCursor].price;
      $("#ssImagePrice").css("color", "#EF4523");
      $("#ssImagePrice").html(l)
    }
    $("#mySlideShow_AddToCartBtn").show();
    $("#addToCart").show();
    $("#mg-ooscontainer").html("");
    if (a.images[a.slideShowCursor].ItemStatus != 2) {
      $("#ssImagePrice").html("");
      $("#ssDiscountImagePrice").text("");
      $("#addToCart").hide();
      $("#mySlideShow_AddToCartBtn").hide();
      if (a.images[a.slideShowCursor].ItemStatus == 4) {
        $("#mg-ooscontainer").html("Print temporarily out of stock")
      } else {
        if (a.images[a.slideShowCursor].ItemStatus == 5) {
          $("#mg-ooscontainer").html("Print no longer available")
        }
      }
    }
    var n = a.ssCurrent;
    if (a.ssCurrent != undefined && !a.ssIsPaused) {
      var f = a.ssScrollDirection == a.ssScrollDirectionOptions.LEFT ? -$("#" + a.id + "_CLIP").width() : $("#" + a.id + "_CLIP").width();
      $("#" + n).animate({
        left: f + "px"
      },
      2000,
      function() {
        $("#" + n).die();
        $("#" + n).remove()
      })
    }
    if (!a.ssIsPaused) {
      var h = Math.round(($("#" + a.id + "_CLIP").width() - $("#" + d).width()) / 2);
      $("#" + a.SlideShowNext).animate({
        left: h
      },
      2000,
      function() {
        $("#" + a.ssCurrent).remove();
        a.ssCurrent = a.SlideShowNext;
        a.SlideShowNext = "";
        a.ssScrollDirection = a.ssScrollDirectionOptions.LEFT;
        a.continueSlideShow()
      })
    }
  })
};
com.art.core.components.SlideShow.prototype.getCurrentImageIndex = function() {
  return this.slideShowCursor
};
com.art.core.components.SlideShow.prototype.continueSlideShow = function() {
  this.ssProcessing = false;
  var a = this;
  if (this.slideShowToggle && !this.ssIsPaused) {
    this.slideShowTimerID = setTimeout(function() {
      a.loadImage()
    },
    4000)
  }
};
com.art.core.components.SlideShow.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.SlideShow.prototype.centerControls = function() {
  var c = $("#" + this.id + "_CONTROL_BAR").width();
  var h = $("#" + this.id).width() - 10;
  var d = Math.round((h - c) / 2);
  $("#" + this.id + "_CONTROL_BAR").css("left", d);
  var a = $("#" + this.id + "_CONTROL_BAR").height();
  var f = $("#" + this.id).height();
  var e = Math.round(f - (a + this.bottomControlsPadding));
  $("#" + this.id + "_CONTROL_BAR").css("top", e)
};
com.art.core.components.SlideShow.prototype.hideShowMainControl = function() {
  var a = this;
  clearTimeout(this.controlsTimer);
  if ($("#" + a.id + "_CONTROL_BAR").is(":hidden")) {
    $("#" + a.id + "_CONTROL_BAR").fadeIn()
  }
  this.controlsTimer = setTimeout(function() {
    $("#" + a.id + "_CONTROL_BAR").fadeOut()
  },
  1500)
};
com.art.core.components.SlideShow.prototype.getTemplate = function() {
  this.addToCartBtn = new com.art.core.components.ArtButton(this.id + "_AddToCartBtn", com.art.core.components.ArtButton.ART_ORANGE, "Add To Cart");
  this.closeBtn = new com.art.core.components.ArtButton(this.id + "_CloseBtn", com.art.core.components.ArtButton.ART_BLUE, "Close Slideshow");
  var c = this.shellTemplate.replace("$CLIP", this.clipTemplate) + this.controlsTemplate.replace("$CONTROL_BAR", this.populateControlBar()).replace(/\$IMAGE_HOST/g, this.getImageHost());
  var a = c.replace("$SSW", this.width).replace("$SSH", this.height).replace(/\$ID/g, this.id).replace("$ADD_BTN", this.addToCartBtn.render()).replace("$CLOSE_BTN", this.closeBtn.render()).replace(/\$IMAGE_HOST/g, this.getImageHost());
  return a
};
com.art.core.components.SlideShow.prototype.slideShowStartupMainControls = function() {
  var a = this;
  var d = $("#SlideShowPrev");
  this.setSlideShowHover(d, "previous");
  d.live("click",
  function() {
    a.resetPlayPause();
    clearTimeout(a.slideShowTimerID);
    a.ssScrollDirection = a.ssScrollDirectionOptions.RIGHT;
    a.loadImage()
  });
  var e = $("#SlideShowPlayPause");
  this.setSlideShowHover(e, "pause");
  e.live("click",
  function() {
    a.playPauseToggle()
  });
  var c = $("#SlideShowNext");
  this.setSlideShowHover(c, "next");
  c.live("click",
  function() {
    a.resetPlayPause();
    clearTimeout(a.slideShowTimerID);
    a.ssScrollDirection = a.ssScrollDirectionOptions.LEFT;
    a.loadImage()
  })
};
com.art.core.components.SlideShow.prototype.attachExternalComponent = function(a) {
  $("#externalButtonContainer").html(a)
};
com.art.core.components.SlideShow.prototype.resetPlayPause = function() {
  if (this.ssIsPaused) {
    this.ssIsPaused = false;
    this.setSlideShowHover($("#SlideShowPlayPause"), "pause");
    var a = this;
    $("#SlideShowPlayPause").die();
    $("#SlideShowPlayPause").live("click",
    function() {
      a.playPauseToggle()
    });
    a.resetPlayPause()
  }
};
com.art.core.components.SlideShow.prototype.playPauseToggle = function() {
  this.ssIsPaused = !this.ssIsPaused;
  if (this.ssIsPaused) {
    clearTimeout(this.slideShowTimerID)
  } else {
    this.loadImage()
  }
  var c = this.ssIsPaused ? "play": "pause";
  var a = this;
  this.setSlideShowHover($("#SlideShowPlayPause"), c);
  $("#SlideShowPlayPause").live("click",
  function() {
    a.playPauseToggle()
  })
};
com.art.core.components.SlideShow.prototype.setSlideShowHover = function(d, c) {
  var a = this;
  d.css("backgroundPosition", this.slideShowControls[c].enabled);
  d.unbind("mousedown");
  d.unbind("mouseup");
  d.die();
  d.mousedown(function() {
    d.css("backgroundPosition", a.slideShowControls[c].disabled)
  });
  d.mouseup(function() {
    d.css("backgroundPosition", a.slideShowControls[c].enabled)
  })
};
com.art.core.components.SlideShow.prototype.shellTemplate = "<div id='$ID' style='height:$SSHpx;'>$CLIP</div>";
com.art.core.components.SlideShow.prototype.clipTemplate = "<div id='$ID_CLIP' style='height:100%;overflow:hidden;position:relative;'></div>";
com.art.core.components.SlideShow.prototype.getControlButtons = function() {
  var a = "<div id='SlideShowButtons'><div id='SlideShowPrev' style='background-image:url($IMAGE_HOST/images/mygallery/mygalleries_sprite_branding.png);'></div><div id='SlideShowPlayPause' style='background-image:url($IMAGE_HOST/images/mygallery/mygalleries_sprite_branding.png);'></div><div id='SlideShowNext' style='background-image:url($IMAGE_HOST/images/mygallery/mygalleries_sprite_branding.png);'></div></div>";
  return a
};
com.art.core.components.SlideShow.prototype.populateControlBar = function() {
  var e = "<div id='ssImagePrice'></div><div id='mg-ooscontainer'></div><div id='ssDiscountImagePrice'></div>";
  var c = "<div id='closeSlideShow'>$CLOSE_BTN</div>";
  var a = "<div id='addToCart'>$ADD_BTN</div>";
  var d = "<div id='controlbar'>" + this.getControlButtons() + c + a + e + "<div style='clear:both;'></div></div>";
  return d
};
com.art.core.components.SlideShow.prototype.controlsTemplate = "<div id='$ID_CONTROL_BAR'>$CONTROL_BAR</div>";
com.art.core.components.BaseComponent.extend(com.art.core.components.SlideShow.prototype);
com.art.core.components.LightBox = function(a, d, c) {
  this.init();
  this.id = a;
  this.target = d;
  this.opacity = c;
  this.CLICK = com.art.core.components.LightBox.CLICK;
  this.zindex = -1
};
com.art.core.components.LightBox.CLICK = "LightBoxClicked";
com.art.core.components.LightBox.NAME = "LightBox";
com.art.core.components.LightBox.prototype.opacity = 0.4;
com.art.core.components.LightBox.prototype.getTemplate = function() {
  return this.template.replace("$ID", this.id).replace("$CONTENTS", "").replace(/\$IMAGE_HOST/g, this.getImageHost())
};
com.art.core.components.LightBox.prototype.close = function() {
  $("#" + this.id).die("click");
  $("#" + this.id).unbind("click");
  $("#" + this.id).remove();
  $("#" + this.id).empty()
};
com.art.core.components.LightBox.prototype.getDocHeight = function() {
  var a = Math.max($(document).height(), $(window).height(), document.documentElement.clientHeight);
  if ($.browser.msie && parseInt($.browser.version) == 7 && (a > 3000)) {
    a = 3000
  }
  return a
};
com.art.core.components.LightBox.prototype.getDocWidth = function() {
  return Math.max($(document).width(), $(window).width(), document.documentElement.clientWidth)
};
com.art.core.components.LightBox.prototype.render = function() {
  this.show()
};
com.art.core.components.LightBox.prototype.show = function() {
  var e = this.target == "body" ? this.target: "#" + this.target;
  if ($("#" + this.id).width() == null) {
    $(e).append(this.getTemplate())
  }
  var a = this;
  var d = (this.target == "body") ? this.getDocWidth() : parseInt($(this.target).width()) + "px";
  var c = (this.target == "body") ? this.getDocHeight() : parseInt($(this.target).height()) + "px";
  $("#" + this.id).css({
    position: "absolute",
    top: "0px",
    left: "0px",
    "background-color": "#000000",
    "z-index": a.getLightBoxZIndex(),
    height: c,
    width: d,
    filter: "alpha (opacity=" + this.opacity + ")",
    filter: "progid:DXImageTransform.Microsoft.Alpha(style=0, opacity=" + (this.opacity * 100) + ")",
    "-moz-opacity": this.opacity,
    opacity: this.opacity,
    "-khtml-opacity": this.opacity
  });
  var a = this;
  if (this.target == "body") {
    $(window).resize(function() {
      $("#" + a.id).css({
        height: a.getDocHeight(),
        width: a.getDocWidth()
      })
    })
  }
};
com.art.core.components.LightBox.prototype.changeOpacity = function(a) {
  this.opacity = a;
  $("#" + this.id).css({
    filter: "alpha (opacity=" + this.opacity + ")",
    filter: "progid:DXImageTransform.Microsoft.Alpha(style=0, opacity=" + (this.opacity * 100) + ")",
    "-moz-opacity": this.opacity,
    opacity: this.opacity,
    "-khtml-opacity": this.opacity
  })
};
com.art.core.components.LightBox.prototype.setLightBoxZIndex = function(d) {
  if (d != undefined) {
    this.zindex = d
  } else {
    var a = this;
    var c = 0;
    $("*:visible").each(function() {
      if ($(this).attr("id") != a.id) {
        var e = parseInt($(this).css("z-index"));
        if (e >= a.zindex && e != Number.NaN) {
          a.zindex = e + 1
        }
      }
      c++
    });
    if (this.zindex == -1) {
      this.zindex = 1
    }
  }
};
com.art.core.components.LightBox.prototype.getLightBoxZIndex = function() {
  if (this.zindex == -1) {
    this.setLightBoxZIndex()
  }
  return this.zindex
};
com.art.core.components.LightBox.prototype.registerEvents = function() {
  var a = this;
  $("#" + this.id).unbind("click");
  $("#" + this.id).click(function() {
    a.close();
    if (a.callbacks[a.CLICK] != undefined) {
      a.callbacks[a.CLICK]()
    }
  })
};
com.art.core.components.LightBox.prototype.template = '<div id="$ID" class="core_lightbox"></div>';
com.art.core.components.BaseComponent.extend(com.art.core.components.LightBox.prototype);
com.art.core.components.CheckBox = function(a, e, d, c) {
  this.init();
  this.id = a;
  this.value = e;
  this.label = d;
  this.NAME = com.art.core.components.CheckBox.NAME;
  this.selected = c == true;
  this.CHECKED = com.art.core.components.CheckBox.CHECKED;
  this.enabled = true
};
com.art.core.components.CheckBox.NAME = "CheckBox";
com.art.core.components.CheckBox.CHECKED = "CheckBoxChecked";
com.art.core.components.CheckBox.prototype.registerEvents = function() {
  if (!this.enabled) {
    return
  }
  var a = this;
  $("#" + this.id).mouseover(function() {
    var c = a.selected ? "-412px -44px": "-358px -44px";
    $(this).css("background-position", c)
  });
  $("#" + this.id).mouseout(function() {
    var c = a.selected ? "-394px -44px": "-340px -44px";
    $(this).css("background-position", c)
  });
  $("#" + this.id).mousedown(function() {
    var c = a.selected ? "-430px -44px": "-376px -44px";
    $(this).css("background-position", c)
  });
  $("#" + this.id).mouseup(function(c) {
    a.toggle()
  });
  $("#" + this.id).live("click",
  function(c) {
    c.stopPropagation();
    c.preventDefault()
  })
};
com.art.core.components.CheckBox.prototype.toggle = function() {
  this.selected = !this.selected;
  var a = this.selected ? "-394px -44px": "-340px -44px";
  $("#" + this.id).css("background-position", a);
  if (this.callbacks[this.CHECKED] != undefined) {
    this.callbacks[this.CHECKED](this)
  }
};
com.art.core.components.CheckBox.prototype.enable = function(a) {
  this.enabled = a;
  var c = a ? 1 : 0.3;
  $("#" + this.id).css("opacity", c);
  $("#" + this.id).unbind("mouseup");
  $("#" + this.id).unbind("mousedown");
  $("#" + this.id).unbind("mouseout");
  $("#" + this.id).unbind("mouseover");
  $("#" + this.id).unbind("click");
  this.registerEvents()
};
com.art.core.components.CheckBox.prototype.getTemplate = function() {
  var a = this.selected ? "-394px -44px": "-340px -44px";
  return this.template.replace("$ID", this.id).replace("$POS", a).replace(/\$IMAGE_HOST/g, this.getImageHost())
};
com.art.core.components.CheckBox.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.CheckBox.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.core.components.CheckBox.prototype.template = '<div id="$ID" style="width:18px;height:19px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png); background-repeat:no-repeat;background-position:$POS"></div>';
com.art.core.components.BaseComponent.extend(com.art.core.components.CheckBox.prototype);
com.art.core.components.OptionButton = function(d, e, j, a, f, c) {
  this.init();
  this.id = d;
  this.label = e;
  this.width = j;
  this.height = a;
  this.options = f;
  this.icon = c;
  this.menuIsOpen = false;
  this.hovers = {
    tl: {
      position: "-340px -88px"
    },
    tm: {
      position: "-341px -88px"
    },
    tr: {
      position: "-556px -88px"
    },
    ml: {
      position: "-340px -90px"
    },
    mm: {
      position: "-341px -90px"
    },
    mr: {
      position: "-556px -90px"
    },
    bl: {
      position: "-340px -214px"
    },
    bm: {
      position: "-341px -214px"
    },
    br: {
      position: "-556px -214px"
    }
  };
  this.generateUIDs();
  this.offsetObject;
  this.menuWidth = 100;
  this.optionsSelectedMap = {};
  this.closeTimer;
  this.MENU_OPENED = com.art.core.components.OptionButton.MENU_OPENED;
  this.MENU_CLOSED = com.art.core.components.OptionButton.MENU_CLOSED
};
com.art.core.components.OptionButton.NAME = "OptionButton";
com.art.core.components.OptionButton.MENU_OPENED = "optionButtonOpened";
com.art.core.components.OptionButton.MENU_CLOSED = "optionButtonClosed";
com.art.core.components.OptionButton.HOVER = "hover";
com.art.core.components.OptionButton.FLYOUT_ITEM_CLICK = "flyoutItemClicked";
com.art.core.components.OptionButton.COLOR_PICKER_CLICK = "colorPickerItemClicked";
com.art.core.components.OptionButton.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.OptionButton.prototype.generateUIDs = function() {
  for (var a in this.hovers) {
    this.hovers[a]["uid"] = com.art.core.utils.StringUtil.generateUID()
  }
};
com.art.core.components.OptionButton.prototype.registerEvents = function() {
  var a = this;
  $("#" + this.id).live("click",
  function() {
    if (this.id != null && this.id != undefined) {
      $("#" + this.id + "_toggle").show()
    }
  });
  $("#" + this.id).mouseleave(function() {
    if (this.id != null && this.id != undefined) {
      switch (this.id) {
      case "background":
      case "sortby":
      case "privacy":
      case "share":
        $("#" + this.id).removeClass("dynamicRightMenuContainer");
        $("#" + this.id + "_toggle").hide();
        break;
      default:
      }
    }
  });
  $("#" + this.id).mouseenter(function() {
    if (this.id != null && this.id != undefined) {
      switch (this.id) {
      case "background":
      case "sortby":
      case "privacy":
      case "share":
        $("#" + this.id).addClass("dynamicRightMenuContainer");
        break;
      default:
      }
    }
    var e = {
      typeOfData: "FlyoutLinkClicked"
    };
    if (a.callbacks[com.art.core.components.OptionButton.CLICK] != undefined) {
      a.callbacks[com.art.core.components.OptionButton.CLICK](e)
    }
  });
  var d = "";
  var c = false;
  $("#" + this.id + "_toggle li").live("click",
  function() {
    if (a.callbacks[com.art.core.components.OptionButton.COLOR_PICKER_CLICK] != null && a.callbacks[com.art.core.components.OptionButton.COLOR_PICKER_CLICK] != undefined) {
      if (c == true) {
        $("#" + d).add(document.getElementById("a")).css("border", "1px solid White");
        $("#" + this.id).add(document.getElementById("a")).css("border", "1px solid Red");
        d = this.id;
        c = true
      }
      if (c == false) {
        d = this.id;
        $("#" + d).add(document.getElementById("a")).css("border", "1px solid Red");
        c = true
      }
      a.callbacks[com.art.core.components.OptionButton.COLOR_PICKER_CLICK](this)
    }
  });
  $("#" + this.id + "_toggle a").live("click",
  function() {
    if (a.callbacks[com.art.core.components.OptionButton.FLYOUT_ITEM_CLICK] != null && a.callbacks[com.art.core.components.OptionButton.FLYOUT_ITEM_CLICK] != undefined) {
      $(".imgTick").css("visibility", "hidden");
      $("#img" + this.id).css("visibility", "visible");
      a.callbacks[com.art.core.components.OptionButton.FLYOUT_ITEM_CLICK](this)
    }
  })
};
com.art.core.components.OptionButton.prototype.registerEvents = function() {
  var a = this;
  $("#" + this.id).mouseenter(function() {
    if (a.menuIsOpen) {
      clearTimeout(a.closeTimer)
    } else {
      $(this).css("cursor", "pointer");
      for (var c in a.hovers) {
        $("#" + a.hovers[c].uid).css("background-position", a.hovers[c].position)
      }
    }
  });
  $("#" + this.id).mouseleave(function() {
    if (!a.menuIsOpen) {
      $(this).css("cursor", "default");
      $(this).find("td").css("background-position", "1000px 1000px")
    }
  });
  $("#" + this.id).unbind("click");
  $("#" + this.id).click(function(c) {
    a.menuIsOpen = !a.menuIsOpen;
    if (a.menuIsOpen) {
      a.offsetObject = $(this).offset();
      var d = a.getMenuContainerTemplate();
      $("body").append(d);
      a.positionMenu();
      a.registerOptionEvents();
      if (a.callbacks[a.MENU_OPENED]) {
        a.callbacks[a.MENU_OPENED]()
      }
    } else {
      $("#" + this.id + "_menuContainer").remove();
      if (a.callbacks[a.MENU_CLOSED]) {
        a.callbacks[a.MENU_CLOSED]()
      }
    }
  })
};
com.art.core.components.OptionButton.prototype.positionMenu = function() {
  var a = this;
  $("#" + this.id + "_menuContainer").mouseleave(function() {
    a.initiateClose()
  });
  var d = Math.round(this.offsetObject.top) + this.height;
  var c = Math.round(this.offsetObject.left);
  $("#" + this.id + "_menuContainer").css("top", d);
  $("#" + this.id + "_menuContainer").css("left", c)
};
com.art.core.components.OptionButton.prototype.initiateClose = function() {
  var a = this;
  this.closeTimer = setTimeout(function() {
    a.closeMenu()
  },
  100)
};
com.art.core.components.OptionButton.prototype.closeMenu = function() {
  if (this.menuIsOpen) {
    this.menuIsOpen = false;
    $("#" + this.id).find("td").css("background-position", "1000px 1000px");
    $("#" + this.id).css("cursor", "default");
    $("#" + this.id + "_menuContainer").remove();
    if (this.callbacks[this.MENU_CLOSED]) {
      this.callbacks[this.MENU_CLOSED]()
    }
  }
};
com.art.core.components.OptionButton.prototype.registerOptionEvents = function() {
  var a = $("#" + this.id + "_menuContainer");
  a.addDropShadow();
  this.bindAllEvents(a)
};
com.art.core.components.OptionButton.prototype.onMouseEnter = function(a) {
  a.css("cursor", "pointer");
  a.css("background-color", "#DDDDDD")
};
com.art.core.components.OptionButton.prototype.onMouseLeave = function(a) {
  a.css("background-color", "#FFFFFF")
};
com.art.core.components.OptionButton.prototype.onMouseDown = function(c) {
  c.parent().find("li").css("background-color", "#FFFFFF");
  c.parent().find("li").css("text-shadow", "0px 0px #FFFFFF");
  c.parent().find("li>div").css("background-position", "1000px 1000px");
  c.parent().find("li").css("font-weight", "normal");
  c.css("background-color", "#5E5F5F");
  c.find("div").css("background-position", "-58px -76px");
  c.css("color", "#FFFFFF");
  var a = c.attr("id");
  this.markAsSelected(a)
};
com.art.core.components.OptionButton.prototype.onMouseUp = function(a) {
  this.bindAllEvents(a.parent());
  this.unbindAllEvents(a);
  this.setSelectedIcon(a);
  this.closeMenu()
};
com.art.core.components.OptionButton.prototype.setSelectedIcon = function(a) {
  if (a != undefined) {
    a.css("background-color", "#FFFFFF");
    a.css("color", "#333333");
    a.css("font-weight", "bold");
    a.css("cursor", "default");
    a.css("text-shadow", "0px 1px #FFFFFF");
    a.find("div").css("background-position", "-58px -92px")
  }
};
com.art.core.components.OptionButton.prototype.bindAllEvents = function(c) {
  var a = this;
  c.find("li").unbind("mouseenter");
  c.find("li").unbind("mouseleave");
  c.find("li").unbind("mousedown");
  c.find("li").unbind("mouseup");
  c.find("li").mouseenter(function() {
    a.onMouseEnter($(this))
  });
  c.find("li").mouseleave(function() {
    a.onMouseLeave($(this))
  });
  c.find("li").mousedown(function() {
    a.onMouseDown($(this))
  });
  c.find("li").mouseup(function() {
    a.onMouseUp($(this))
  })
};
com.art.core.components.OptionButton.prototype.unbindAllEvents = function(a) {
  a.unbind("mouseenter");
  a.unbind("mouseleave");
  a.unbind("mousedown");
  a.unbind("mouseup")
};
com.art.core.components.OptionButton.prototype.markAsSelected = function(c) {
  if (this.optionsSelectedMap[c] == undefined) {
    throw new Error("OptionButton failed! Selected item has invalid value!")
  }
  for (var a in this.optionsSelectedMap) {
    this.optionsSelectedMap[a] = false
  }
  this.optionsSelectedMap[c] = true
};
com.art.core.components.OptionButton.prototype.getMenuContainerTemplate = function() {
  var h = "<ul style='margin-top:1px;'>";
  for (var d = 0; d < this.options.length; d++) {
    var f = this.options[d];
    if (f.uid == undefined) {
      f.uid = com.art.core.utils.StringUtil.generateUID(10);
      this.optionsSelectedMap[f.uid] = f.selected
    }
    this.menuWidth = f.label.length > 10 ? f.label.length * 10 : this.menuWidth;
    var c = this.optionsSelectedMap[f.uid] ? "bold;": "normal;";
    var a = this.optionsSelectedMap[f.uid] ? "-58px -92px;": "1000px 1000px;";
    h += "<li id='" + f.uid + "' style='font-weight:" + c + "px;list-style: none outside none;background-color:#FFFFFF;padding-top:2px;padding-bottom:3px;margin-bottom:1px;margin-left:-39px;padding-left:3px;'><div style='margin-right:8px;display:inline-block;background-image: url($IMAGE_HOST/images/MyGallery/my_galleries_sprite.png);background-position:" + a + "background-repeat: no-repeat;height:16px;width:16px;'/>" + f.label + "</li>"
  }
  h += "</ul>";
  var e = this.options.length * 26;
  return this.menuContainer.replace("$ID", this.id).replace("$MENU", h).replace("$MW", this.menuWidth).replace("$MH", e).replace("$ZINDEX", this.zindex)
};
com.art.core.components.OptionButton.prototype.getTemplate = function() {
  var c = this.width - 4;
  var a = this.height - 4;
  var e = this.template.replace("$ID", this.id).replace("$W", this.width).replace("$H", this.height).replace("$LABEL", this.label).replace(/\$ADJ_W/g, c).replace(/\$ADJ_H/g, a).replace(/\$IMAGE_HOST/g, this.getImageHost());
  for (var d in this.hovers) {
    e = e.replace("$" + d, this.hovers[d].uid)
  }
  return e
};
com.art.core.components.OptionButton.prototype.menuContainer = "<div id='$ID_menuContainer' style='position:absolute; background-color:#FFFFFF;border:1px solid #999999; width:$MWpx;height:$MHpx;z-index:$ZINDEX;top:100px;left:100px;padding-right:1px;'>$MENU</div>";
com.art.core.components.OptionButton.prototype.template = "<table id='$ID' style='width:$Wpx;height:$Hpx;padding:0px;margin:0px;' cellspacing='0'><tr><td id='$tl' style='padding:0px;width:2px;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-340px 1000px;'></td><td id='$tm' style='padding:0px;width:$ADJ_Wpx;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-341px 1000px;'></td><td id='$tr' style='padding:0px;width:2px;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-556px 1000px;'></td></tr><tr><td id='$ml' style='padding:0px;width:2px;height:$ADJ_Hpx; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-340px 1000px;'></td><td id='$mm' style='padding:0px;width:$ADJ_Wpx;height:$ADJ_Hpx; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-341px 1000px;text-align:center;'>$LABEL</td><td id='$mr' style='padding:0px;width:2px;height:$ADJ_Hpx; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-556px 1000px;'></td></tr><tr><td id='$bl' style='padding:0px;width:2px;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-340px 1000px;'></td><td id='$bm' style='padding:0px;width:$ADJ_Wpx;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-341px 1000px;'></td><td id='$br' style='padding:0px;width:2px;height:2px; background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-repeat:no-repeat;background-position:-556px 1000px;'></td></tr></table>";
com.art.core.components.BaseComponent.extend(com.art.core.components.OptionButton.prototype);
com.art.core.components.DualOptionToggleButton = function(a, c, e, d, f, h) {
  this.id = a;
  this.rightLabel = e;
  this.leftLabel = c;
  this.rightValue = f;
  this.leftValue = d;
  this.sideSelected = h == undefined || h == com.art.core.components.DualOptionToggleButton.LEFT_SIDE ? com.art.core.components.DualOptionToggleButton.LEFT_SIDE: com.art.core.components.DualOptionToggleButton.RIGHT_SIDE;
  this.callbacks = {};
  this.CLICK = com.art.core.components.DualOptionToggleButton.CLICK;
  this.LEFT_SIDE = com.art.core.components.DualOptionToggleButton.LEFT_SIDE;
  this.RIGHT_SIDE = com.art.core.components.DualOptionToggleButton.RIGHT_SIDE;
  this.NAME = com.art.core.components.DualOptionToggleButton.NAME;
  this.toggle = {};
  this.toggle[this.LEFT_SIDE] = {
    selected: "0px -322px",
    active: "0px -380px",
    over: "0px -409px",
    down: "0px -438px"
  };
  this.toggle[this.RIGHT_SIDE] = {
    selected: "-5px -322px",
    active: "-5px -380px",
    over: "-5px -409px",
    down: "-5px -438px"
  };
  com.art.core.components.BaseComponent.extend(this)
};
com.art.core.components.DualOptionToggleButton.NAME = "DualOptionToggleButton";
com.art.core.components.DualOptionToggleButton.LEFT_SIDE = "DualOptionToggleButtonLeftSide";
com.art.core.components.DualOptionToggleButton.RIGHT_SIDE = "DualOptionToggleButtonRightSide";
com.art.core.components.DualOptionToggleButton.CLICK = "DualOptionToggleButtonCLICK";
com.art.core.components.DualOptionToggleButton.prototype.getValue = function() {
  return this.sideSelected == this.LEFT_SIDE ? this.leftValue: this.rightValue
};
com.art.core.components.DualOptionToggleButton.prototype.getActiveSide = function() {
  return this.sideSelected == this.LEFT_SIDE ? $("#rightButton_" + this.id) : $("#leftButton_" + this.id)
};
com.art.core.components.DualOptionToggleButton.prototype.getDeactiveSide = function() {
  return this.sideSelected == this.LEFT_SIDE ? $("#leftButton_" + this.id) : $("#rightButton_" + this.id)
};
com.art.core.components.DualOptionToggleButton.prototype.getState = function(c) {
  var a = this.sideSelected == this.LEFT_SIDE ? this.RIGHT_SIDE: this.LEFT_SIDE;
  return this.toggle[a][c]
};
com.art.core.components.DualOptionToggleButton.prototype.getDeactiveState = function(c) {
  var a = this.sideSelected == this.LEFT_SIDE ? this.LEFT_SIDE: this.RIGHT_SIDE;
  return this.toggle[a][c]
};
com.art.core.components.DualOptionToggleButton.prototype.setTextColors = function() {
  var c = this.sideSelected == this.LEFT_SIDE ? $("#leftButton_" + this.id) : $("#rightButton_" + this.id);
  c.css("color", "#FFFFFF");
  var a = this.sideSelected == this.LEFT_SIDE ? $("#rightButton_" + this.id) : $("#leftButton_" + this.id);
  a.css("color", "#000000")
};
com.art.core.components.DualOptionToggleButton.prototype.resetButtons = function() {
  $("#rightButton_" + this.id).unbind("mouseover");
  $("#rightButton_" + this.id).unbind("mouseout");
  $("#rightButton_" + this.id).unbind("mousedown");
  $("#rightButton_" + this.id).unbind("mouseup");
  $("#rightButton_" + this.id).die();
  $("#leftButton_" + this.id).unbind("mouseover");
  $("#leftButton_" + this.id).unbind("mouseout");
  $("#leftButton_" + this.id).unbind("mousedown");
  $("#leftButton_" + this.id).unbind("mouseup");
  $("#leftButton_" + this.id).die()
};
com.art.core.components.DualOptionToggleButton.prototype.registerEvents = function() {
  this.resetButtons();
  this.setTextColors();
  var a = this;
  var c = this.getActiveSide();
  var d = this.getDeactiveSide();
  c.css("cursor", "pointer");
  c.css("background-position", a.getState("active"));
  d.css("background-position", a.getDeactiveState("selected"));
  d.css("cursor", "default");
  c.mouseover(function() {
    c.css("background-position", a.getState("over"))
  });
  c.mouseout(function() {
    c.css("background-position", a.getState("active"))
  });
  c.mousedown(function() {
    c.css("background-position", a.getState("down"))
  });
  c.mouseup(function() {
    a.sideSelected = a.sideSelected == a.LEFT_SIDE ? a.RIGHT_SIDE: a.LEFT_SIDE;
    if (a.callbacks[a.CLICK] != undefined) {
      a.callbacks[a.CLICK](a.getValue())
    }
    a.registerEvents()
  })
};
com.art.core.components.DualOptionToggleButton.prototype.getTemplate = function() {
  var a = this.getActiveSide();
  var c = this.getDeactiveSide();
  var e = this.sideSelected == this.LEFT_SIDE ? "0px -322px": "0px -380px";
  var j = this.sideSelected == this.LEFT_SIDE ? "-5px -380px": "-5px -322px";
  var f = this.sideSelected == this.LEFT_SIDE ? "-306px -380px": "-306px -264px";
  var h = this.sideSelected == this.LEFT_SIDE ? "#000000": "#FFFFFF";
  var d = this.sideSelected == this.LEFT_SIDE ? "#FFFFFF": "#000000";
  return this.template.replace(/\$ID/g, this.id).replace("$LEFT_LABEL", this.leftLabel).replace("$RIGHT_LABEL", this.rightLabel).replace("$RCAP", f).replace("$LPOS", e).replace("$RPOS", j).replace("$RCOLOR", h).replace("$LCOLOR", d).replace(/\$IMAGE_HOST/g, this.getImageHost())
};
com.art.core.components.DualOptionToggleButton.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.DualOptionToggleButton.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.core.components.DualOptionToggleButton.prototype.template = "<div id='$ID' style='display:inline-block;'><div id='leftButton_$ID' style='padding-left:15px; padding-top:5px; padding-right:10px;float:left;height:24px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:$LPOS;background-repeat:no-repeat; color:$LCOLOR;'>$LEFT_LABEL</div><div id='centerDivider_$ID' style='float:left;width:1px;height:29px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:0px -351px;'></div><div id='rightButton_$ID' style='padding-top:5px; padding-left:10px;padding-right:15px;float:left;height:24px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:$RPOS;background-repeat:no-repeat; color:$RCOLOR;'>$RIGHT_LABEL</div><div id='rightButtonCap_$ID' style='padding-top:5px;float:left;height:24px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:$RCAP;background-repeat:no-repeat; width:5px;'></div><div style='clear:both'></div></div>";
com.art.core.components.BaseButton.extend(com.art.core.components.DualOptionToggleButton.prototype);
com.art.core.components.SingleOptionToggleButton = function(c, d, e, a) {
  this.id = c;
  this.label = d;
  this.value = e;
  this.callbacks = {};
  this.CLICK = com.art.core.components.SingleOptionToggleButton.CLICK;
  this.color = a == undefined || a == com.art.core.components.SingleOptionToggleButton.DARK ? com.art.core.components.SingleOptionToggleButton.DARK: com.art.core.components.SingleOptionToggleButton.LIGHT;
  this.DARK = com.art.core.components.SingleOptionToggleButton.DARK;
  this.LIGHT = com.art.core.components.SingleOptionToggleButton.LIGHT;
  this.NAME = com.art.core.components.SingleOptionToggleButton.NAME;
  this.toggle = {};
  this.toggle[this.DARK] = {
    selected: "0px -322px",
    active: "0px -264px",
    over: "0px -293px",
    down: "0px -322px"
  };
  this.toggle[this.LIGHT] = {
    selected: "0px -438px",
    active: "0px -380px",
    over: "0px -409px",
    down: "0px -438px"
  };
  com.art.core.components.BaseComponent.extend(this)
};
com.art.core.components.SingleOptionToggleButton.NAME = "SingleOptionToggleButton";
com.art.core.components.SingleOptionToggleButton.CLICK = "SingleOptionToggleButtonCLICK";
com.art.core.components.SingleOptionToggleButton.DARK = "SingleOptionToggleButtonDark";
com.art.core.components.SingleOptionToggleButton.LIGHT = "SingleOptionToggleButtonLight";
com.art.core.components.SingleOptionToggleButton.prototype.getState = function(a) {
  return this.toggle[this.color][a]
};
com.art.core.components.SingleOptionToggleButton.prototype.resetButtons = function() {
  $("#singleOptionToggleButton_" + this.id).unbind("mouseover");
  $("#singleOptionToggleButton_" + this.id).unbind("mouseout");
  $("#singleOptionToggleButton_" + this.id).unbind("mousedown");
  $("#singleOptionToggleButton_" + this.id).unbind("mouseup");
  $("#singleOptionToggleButton_" + this.id).die()
};
com.art.core.components.SingleOptionToggleButton.prototype.getColor = function() {
  return this.color == this.DARK ? "#FFFFFF": "#000000"
};
com.art.core.components.SingleOptionToggleButton.prototype.registerEvents = function() {
  this.resetButtons();
  var a = this;
  var c = $("#singleOptionToggleButton_" + this.id + ">div:first-child");
  c.css("border:1px solid red");
  c.mouseover(function() {
    c.css("background-position", a.getState("over"))
  });
  c.mouseout(function() {
    c.css("background-position", a.getState("active"))
  });
  c.mousedown(function() {
    c.css("background-position", a.getState("down"))
  });
  c.mouseup(function() {
    c.css("background-position", a.getState("active"));
    if (a.callbacks[a.CLICK] != undefined) {
      a.callbacks[a.CLICK](a.value)
    }
  })
};
com.art.core.components.SingleOptionToggleButton.prototype.getTemplate = function() {
  var a = this.toggle[this.color]["active"];
  return this.template.replace(/\$ID/g, this.id).replace("$LABEL", this.label).replace("$COLOR", this.getColor()).replace("$POS", a).replace(/\$IMAGE_HOST/g, this.getImageHost())
};
com.art.core.components.SingleOptionToggleButton.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.SingleOptionToggleButton.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.core.components.SingleOptionToggleButton.prototype.template = "<div id='singleOptionToggleButton_$ID' style='display:inline-block'><div style='cursor:pointer;padding-left:15px; padding-top:5px; padding-right:10px;float:left;height:24px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:$POS;background-repeat:no-repeat; color:$COLOR;'>$LABEL</div><div style='float:left;width:1px;height:24px;padding-top:5px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:-306px -264px;background-repeat:no-repeat;'></div><div style='clear:both'></div>";
com.art.core.components.BaseButton.extend(com.art.core.components.SingleOptionToggleButton.prototype);
com.art.core.components.FixedContainer = function(d, h, a, f, c, e) {
  this.init();
  this.id = d;
  this.xAlignment = h;
  this.bottomBoundaryElementID = a;
  this.sideMargin = e;
  this.width = f;
  this.height = c;
  this.scrollTop = 0;
  this.ypos = 0;
  this.bottomBoundary = -1;
  this.boundaryOffset;
  this.timeoutID;
  this.scrollDirection;
  this.content = "";
  this.fixedXPos = -1;
  this.fixedYPos = -1;
  this.scrollTop;
  this.xBoundary = false;
  this.LEFT = com.art.core.components.FixedContainer.LEFT
};
com.art.core.components.FixedContainer.RIGHT = "fixedContainerRight";
com.art.core.components.FixedContainer.LEFT = "fixedContainerLeft";
com.art.core.components.FixedContainer.UP = "scrollDirectionUp";
com.art.core.components.FixedContainer.DOWN = "scrollDirectionDown";
com.art.core.components.FixedContainer.prototype.registerEvents = function() {
  this.setBottomBoundary();
  var a = this;
  this.setXPos();
  this.checkYPos($(window).scrollTop());
  $(window).scroll(function() {
    a.checkYPos();
    a.checkXPos();
    a.checkXPos($(window).scrollLeft())
  })
};
com.art.core.components.FixedContainer.prototype.setContent = function(a) {
  this.content = a
};
com.art.core.components.FixedContainer.prototype.checkYPos = function() {
  var c = $(window).scrollTop();
  if (this.boundaryOffset != null) {
    if (this.bottomBoundary != Math.round(this.boundaryOffset.top) + parseInt($("#" + this.bottomBoundaryElementID).height())) {
      this.setBottomBoundary()
    }
    var a = this;
    this.scrollTop = Math.round(c);
    this.ypos = parseInt(this.scrollTop + $(window).height()) - (this.height);
    if (this.fixedYPos == -1) {
      this.fixedYPos = $(window).height() - (this.height - 5)
    }
    if (this.ypos >= (this.bottomBoundary - (this.height + 5))) {
      $("#" + this.id).css("position", "absolute");
      $("#" + this.id).css("top", (this.bottomBoundary - this.height - 5) + "px");
      $("#" + this.id).css("bottom", "5px")
    } else {
      $("#" + this.id).css("position", "fixed");
      $("#" + this.id).css("top", this.fixedYPos + "px")
    }
  }
};
com.art.core.components.FixedContainer.prototype.checkXPos = function(a) {};
com.art.core.components.FixedContainer.prototype.setBoundaryOffset = function() {
  this.boundaryOffset = $("#" + this.bottomBoundaryElementID).offset()
};
com.art.core.components.FixedContainer.prototype.setBottomBoundary = function() {
  this.setBoundaryOffset();
  if (this.boundaryOffset != null) {
    this.bottomBoundary = Math.round(this.boundaryOffset.top) + parseInt($("#" + this.bottomBoundaryElementID).height())
  }
};
com.art.core.components.FixedContainer.prototype.setXPos = function() {
  var a = this.xAlignment == com.art.core.components.FixedContainer.LEFT ? this.sideMargin: parseInt($(window).width()) - (this.width + this.sideMargin);
  $("#" + this.id).css("left", a + "px");
  this.fixedXPos = a
};
com.art.core.components.FixedContainer.prototype.render = function() {
  return this.template.replace("$ID", this.id).replace("$W", this.width).replace("$H", this.height).replace("$C", this.content).replace(/\$IMAGE_HOST/g, this.getImageHost())
};
com.art.core.components.FixedContainer.prototype.template = "<div id='$ID' style='position:absolute;width:$Wpx;height:$Hpx;border:1px solid #999999;background-color:#DDDDDD;'>$C</div>";
com.art.core.components.BaseComponent.extend(com.art.core.components.FixedContainer.prototype);
com.art.core.components.StandardControlBar = function(a, e, c, d) {
  this.init();
  this.id = a;
  this.usePlayControls = e;
  this.leftActionButton = new com.art.core.components.ArtButton(a + "_leftButton", com.art.core.components.ArtButton.ART_ORANGE, c);
  this.rightActionButton = new com.art.core.components.ArtButton(a + "_RightButton", com.art.core.components.ArtButton.ART_BLUE, d);
  this.centerToParentFlag = false;
  this.externalComponent = "";
  this.price = "";
  this.salePrice = ""
};
com.art.core.components.StandardControlBar.prototype.render = function(a) {
  this.centerToParentFlag = a;
  var d = this.usePlayControls ? this.playControlsTemplate: "";
  var f = this.usePlayControls ? 567 : 400;
  var c = this.externalComponent == "" ? "": this.externalComponent;
  var e = this.template.replace("$PLAY_CONTROLS", d).replace(/\$ID/g, this.id).replace("$RIGHT_ACTION_BTN", this.rightActionButton.render()).replace("$LEFT_ACTION_BTN", this.leftActionButton.render()).replace("$W", f).replace("$EXT_BTN", c).replace("$ZINDEX", this.zindex).replace("$PRICE", this.price).replace("$SALE_PRICE", this.salePrice).replace(/\$IMAGE_HOST/g, this.getImageHost());
  return e
};
com.art.core.components.StandardControlBar.prototype.centerToParent = function() {
  $("#" + this.id + "_CONTROL_BAR").centerNoDropShadow()
};
com.art.core.components.StandardControlBar.prototype.position = function(a) {
  $("#" + this.id + "_CONTROL_BAR").css("position", a)
};
com.art.core.components.StandardControlBar.prototype.height = function() {
  return $("#" + this.id + "_CONTROL_BAR").height()
};
com.art.core.components.StandardControlBar.prototype.width = function() {
  return $("#" + this.id + "_CONTROL_BAR").width()
};
com.art.core.components.StandardControlBar.prototype.isHidden = function() {
  return $("#" + this.id + "_CONTROL_BAR").is(":hidden")
};
com.art.core.components.StandardControlBar.prototype.top = function(a) {
  $("#" + this.id + "_CONTROL_BAR").css("top", a + "px")
};
com.art.core.components.StandardControlBar.prototype.fadeIn = function(a) {
  $("#" + this.id + "_CONTROL_BAR").fadeIn()
};
com.art.core.components.StandardControlBar.prototype.fadeOut = function(a) {
  $("#" + this.id + "_CONTROL_BAR").fadeOut()
};
com.art.core.components.StandardControlBar.prototype.left = function(a) {
  $("#" + this.id + "_CONTROL_BAR").css("left", a + "px")
};
com.art.core.components.StandardControlBar.prototype.setPrice = function(c) {
  var a = $("#" + this.id + "_price").attr("id");
  this.price = c;
  if (a != null) {
    $("#" + a).html(c)
  }
};
com.art.core.components.StandardControlBar.prototype.setSalePrice = function(c) {
  var a = $("#" + this.id + "_salePrice").attr("id");
  this.salePrice = c;
  if (a != null) {
    $("#" + a).html(c)
  }
};
com.art.core.components.StandardControlBar.prototype.attachExternalComponent = function(a) {
  var c = $("#" + this.id + "_externalButtonContainer").width();
  if (c == null) {
    this.externalComponent = a
  } else {
    $("#" + this.id + "_externalButtonContainer").html(a)
  }
};
com.art.core.components.StandardControlBar.prototype.close = function() {
  this.leftActionButton.destroy();
  this.rightActionButton.destroy();
  $("#" + this.id + "_CONTROL_BAR").remove()
};
com.art.core.components.StandardControlBar.prototype.registerEvents = function() {
  this.leftActionButton.registerEvents();
  this.rightActionButton.registerEvents();
  if (this.centerToParentFlag) {
    this.centerToParent()
  }
};
com.art.core.components.StandardControlBar.prototype.playControlsTemplate = "<div id='$ID_previousButton' style='cursor:pointer;float:left;margin-top:26px;width:26px; height:25px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:-90px -606px;background-repeat:no-repeat;'></div><div id='$ID_playPauseButton' style='cursor:pointer;float:left;margin-top:20px;margin-left:3px;width:38px; height:38px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:0px -606px;background-repeat:no-repeat;'></div><div id='$ID_nextButton' style='cursor:pointer;float:left;margin-top:26px;margin-left:3px;width:26px; height:25px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:-120px -606px;background-repeat:no-repeat;'></div><div style='margin-top:20px;width:1px;height:38px;display:inline-block;float:left;margin-left:5px;background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:-637px 0px;background-repeat:no-repeat;'></div>";
com.art.core.components.StandardControlBar.prototype.template = "<div id='$ID_CONTROL_BAR' style='background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:0px -493px;z-index:$ZINDEX;background-repeat:no-repeat;width:$Wpx;height:73px;padding-left:20px;'>$PLAY_CONTROLS<div id='$ID_externalButtonContainer' style='margin-top:12px; margin-left:2px; float:left;display:inline-block;'>$EXT_BTN</div><div style='background-image:url($IMAGE_HOST/images/coreimages/core-components-sprites.png);background-position:-599px -493px;height:73px; width:9px;display:inline-block;float:right;margin-right:-9px;'/><div id='controlButtonLeft' style='margin-top:23px;margin-right:15px;float:right;display:inline-block;'>$RIGHT_ACTION_BTN</div><div id='controlButtonRight' style='margin-top:23px;float:right;display:inline-block;'>$LEFT_ACTION_BTN</div><div id='$ID_salePrice' style='text-shadow:0 1px #FFFFFF;font-family: Verdana,Arial,sans-serif;font-size: 11px;font-style: italic;font-weight: bold;color: #EC2127;display:inline-block;margin-top:29px;margin-right:10px;float:right;'>$SALE_PRICE</div><div id='$ID_price' style='text-shadow:0 1px #FFFFFF;color: #666;font-family: Verdana,Arial,sans-serif;text-decoration: line-through;font-size: 11px;display:inline-block;margin-top:29px;margin-right:10px;float:right;'>$PRICE</div><div style='clear:both;'></div></div>";
com.art.core.components.BaseComponent.extend(com.art.core.components.StandardControlBar.prototype);
com.art.core.components.ArtCarousel = function(d, e, c, a) {
  this.init();
  this.id = d;
  this.width = e;
  this.itemWidths = 0;
  this.height = c;
  this.totalItems = 0;
  this.currentlySelectedIndex = 0;
  this.currentlySelectedObject = {};
  this.currentHoverObject = {};
  this.itemCollection = [];
  this.customHashKeyLabel = a ? a: "";
  this.itemHash = {};
  this.SCROLL_INTERVAL = 150;
  this.SCROLL_RATE = 0.5;
  this.SCROLL_AREA_WIDTH = 150;
  this.SCROLL_MIN = this.SCROLL_AREA_WIDTH;
  this.SCROLL_MAX = this.width - (this.SCROLL_AREA_WIDTH + 35);
  this.scrollDirection;
  this.scrollTimerID;
  this.scrollMouseXPosition = 0;
  this.NAME = com.art.core.components.ArtCarousel.NAME;
  this.LEFT = "scrollLeft";
  this.RIGHT = "scrollRight";
  this.currentlySelectedItemRendererIndex = -1;
  this.MOUSE_OVER = com.art.core.components.ArtCarousel.MOUSE_OVER;
  this.MOUSE_OUT = com.art.core.components.ArtCarousel.MOUSE_OUT;
  this.CLICK = com.art.core.components.ArtCarousel.CLICK
};
com.art.core.components.ArtCarousel.NAME = "ArtCarousel.NAME";
com.art.core.components.ArtCarousel.MOUSE_OVER = "ArtCarousel_mouseover";
com.art.core.components.ArtCarousel.MOUSE_OUT = "ArtCarousel_mouseout";
com.art.core.components.ArtCarousel.CLICK = "ArtCarousel_click";
com.art.core.components.ArtCarousel.prototype.setCustomHashKey = function(a) {
  this.customHashKeyLabel = a;
  this.itemHash = new Object()
};
com.art.core.components.ArtCarousel.prototype.isRendered = function() {
  var a = parseInt($("#" + this.id).width());
  return (a > 0)
};
com.art.core.components.ArtCarousel.prototype.stopIntervals = function() {
  window.clearInterval(this.scrollTimerID)
};
com.art.core.components.ArtCarousel.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.ArtCarousel.prototype.clearCallbacks = function() {
  this.callbacks = {}
};
com.art.core.components.ArtCarousel.prototype.getItemsCount = function() {
  return this.totalItems
};
com.art.core.components.ArtCarousel.prototype.getCarousel = function() {
  return $("#" + this.id + "_jcarousel")
};
com.art.core.components.ArtCarousel.prototype.addItems = function(c) {
  this.removeEvents();
  this.totalItems = c.length;
  this.itemCollection = c;
  this.selectedIndex = 0;
  this.itemWidths = 0;
  this.selectedObject = c[0];
  this.clearEvents();
  this.removeEvents();
  this.clearCallbacks();
  if (this.getCarousel().data("jcarousel") != undefined) {
    this.getCarousel().data("jcarousel").reset()
  }
  this.getCarousel().jcarousel({
    size: c.length,
    scroll: 1,
    itemFallbackDimension: this.width
  });
  for (var f = 0; f < c.length; f++) {
    this.indexItemByCustomKey(c[f]);
    if (c[f].itemRenderer.render() == undefined || c[f].itemRenderer.render() == "") {
      throw new Error("ArtCarousel failed! Item does not have markup property.")
    }
    try {
      var h = c[f].itemRenderer.render();
      this.getCarousel().jcarousel("add", f + 1, h)
    } catch(d) {
      throw new Error("ArtCarousel failed! Unable to add item[error:" + d.message + "].")
    }
    $("#" + c[f].itemRenderer.id).addClass(this.getCommonClassName());
    this.itemWidths += $("#" + c[f].itemRenderer.id).width()
  }
  var a = this;
  $("." + this.getCommonClassName()).mouseover(function(k) {
    var l = $(this).attr("id");
    var j = parseInt($(this).attr("index"));
    if (a.currentHoverObject.NAME == undefined) {
      a.currentHoverObject = a.itemCollection[j]
    } else {}
    if (a.callbacks[a.MOUSE_OVER] != null) {
      var m = a.itemCollection[j];
      a.callbacks[a.MOUSE_OVER](m)
    }
    a.startScroll()
  });
  $("." + this.getCommonClassName()).mouseout(function(k) {
    var l = $(this).attr("id");
    var j = parseInt($(this).attr("index"));
    if (a.callbacks[a.MOUSE_OUT] != null) {
      var m = a.itemCollection[j];
      a.callbacks[a.MOUSE_OUT](m)
    }
    a.stopScroll()
  });
  $("." + this.getCommonClassName()).bind("click",
  function() {
    a.currentlySelectedObject = a.itemCollection[parseInt($(this).attr("index"))];
    if (a.callbacks[a.CLICK] != null) {
      a.callbacks[a.CLICK](a.itemCollection[parseInt($(this).attr("index"))])
    }
  });
  $("." + this.getCommonClassName()).bind("mousemove",
  function(j) {
    a.scrollMouseXPosition = j.pageX
  });
  this.getCarousel().css("width", "0px");
  this.getCarousel().css("width", (this.itemWidths + 2) + "px")
};
com.art.core.components.ArtCarousel.prototype.clearEvents = function() {
  this.getCarousel().unbind("mouseover");
  this.getCarousel().unbind("mouseout");
  this.getCarousel().unbind("mousemove");
  this.getCarousel().unbind("click")
};
com.art.core.components.ArtCarousel.prototype.indexItemByCustomKey = function(c) {
  if (this.customHashKeyLabel != "") {
    if (c[this.customHashKeyLabel] == undefined) {
      throw new Error("ArtCarousel.addItems failed! customHashKeyLabel is undefined.")
    }
    var a = c[this.customHashKeyLabel];
    this.itemHash[a] = c
  }
};
com.art.core.components.ArtCarousel.prototype.getItemByCustomKey = function(a) {
  if (this.itemHash[a] == undefined) {
    return
  }
  return this.itemHash[a]
};
com.art.core.components.ArtCarousel.prototype.removeEvents = function() {
  $("." + this.getCommonClassName()).unbind("mouseover");
  $("." + this.getCommonClassName()).unbind("mouseout");
  $("." + this.getCommonClassName()).unbind("click")
};
com.art.core.components.ArtCarousel.prototype.startScroll = function() {
  var a = this;
  this.scrollTimerID = window.setInterval(function() {
    var k = $("#" + a.id + "_jcarousel");
    var l = k.position().left;
    var m = k.width();
    var h = k.parent().offset().left;
    var c = k.parent().width();
    var e = a.scrollMouseXPosition - h;
    var d = a.SCROLL_INTERVAL * a.SCROLL_RATE;
    var f;
    if (((e < a.SCROLL_MIN) || (e > a.SCROLL_MAX)) && (m > c)) {
      var j = (e < a.SCROLL_MIN);
      if (l > 0) {
        k.css("left", "0px")
      }
      if (l < (c - m)) {
        k.css("left", (c - m) + "px")
      }
      if (j) {
        k.jcarousel("prev")
      } else {
        k.jcarousel("next")
      }
    }
  },
  this.SCROLL_INTERVAL)
};
com.art.core.components.ArtCarousel.prototype.stopScroll = function(a) {
  window.clearInterval(this.scrollTimerID)
};
com.art.core.components.ArtCarousel.prototype.doScroll = function(a) {};
com.art.core.components.ArtCarousel.prototype.getCommonClassName = function() {
  return this.id + "_klass"
};
com.art.core.components.ArtCarousel.prototype.selectItemByIndex = function(c, f) {
  if (f) {
    var j = $("#" + this.id + "_jcarousel");
    var k = j.width();
    var d = Math.round(this.itemWidths / this.itemCollection.length);
    var a = j.parent().width();
    var e = Math.floor(a / d);
    var h = c > (this.itemCollection.length - e) ? this.itemCollection.length - e: c;
    this.getCarousel().jcarousel("scroll", h)
  }
  this.deSelectItemByIndex();
  this.currentlySelectedItemRendererIndex = c;
  this.itemCollection[this.currentlySelectedItemRendererIndex].itemRenderer.select();
  this.currentlySelectedObject = this.itemCollection[this.currentlySelectedItemRendererIndex]
};
com.art.core.components.ArtCarousel.prototype.deSelectItemByIndex = function() {
  if (this.currentlySelectedItemRendererIndex == -1 || this.currentlySelectedItemRendererIndex > (this.itemCollection.length - 1)) {
    return
  }
  this.itemCollection[this.currentlySelectedItemRendererIndex].itemRenderer.deselect()
};
com.art.core.components.ArtCarousel.prototype.show = function() {
  $("#" + this.id).css("display", "block")
};
com.art.core.components.ArtCarousel.prototype.hide = function() {
  $("#" + this.id).css("display", "none")
};
com.art.core.components.ArtCarousel.prototype.getTemplate = function() {
  var a = this;
  setTimeout(function() {
    a.update()
  },
  250);
  return this.template.replace(/\$ID/g, this.id).replace("$W", this.width).replace("$H", this.height)
};
com.art.core.components.ArtCarousel.prototype.update = function() {
  $(".jcarousel-skin-jc2 jcarousel-clip jcarousel-clip-horizontal").css("width", this.width - 50 + "px")
};
com.art.core.components.ArtCarousel.prototype.template = '<div id="$ID" style="border:1px solid #DCDDDE; padding:3px;display:inline-block;background-color:#ffffff;"><div id="$ID_jcarousel_container"  style="display:block; width:$Wpx; height:$Hpx;"><ul id="$ID_jcarousel" class="jcarousel-skin-jc2"></ul></div></div>';
com.art.core.components.BaseComponent.extend(com.art.core.components.ArtCarousel.prototype);
com.art.core.components.TabBar = function(c, a) {
  this.init();
  this.RIGHT = "right";
  this.id = c;
  this.firstControlTabID;
  this.guids = {};
  this.tabsById = {};
  this.tabs = [];
  this.controlTabs = [];
  this.gradients = {
    webkit: "-webkit-gradient(linear, left top, left bottom, from(white), to(#F0F0F0))",
    mozilla: "-moz-linear-gradient(center top , #FFFFFF, #F0F0F0) repeat scroll 0 0 transparent",
    "default": "#DDDDDD"
  };
  this.browser = $.browser;
  this.gradient = this.browser.webkit ? "webkit": this.browser.mozilla ? "mozilla": "default";
  this.cssClass = {
    tab: {
      focus: "",
      hover: "",
      blur: ""
    }
  };
  $.updateObject(this.cssClass, a);
  this.useCssClass = false;
  if (this.cssClass.tab.hover != "") {
    this.useCssClass = true
  }
  this.tabStyleActive = {
    display: "inline-block",
    background: this.gradients[this.gradient],
    filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFF', endColorstr='#F0F0F0')",
    borderRight: "1px solid #DCDDDE",
    borderTop: "1px solid #DCDDDE",
    borderLeft: "1px solid #DCDDDE",
    display: "inline-block",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    padding: "9px 3px 8px",
    "text-shadow": "0 1px #FFFFFF",
    marginRight: "1px",
    cursor: "pointer",
    color: "#3A261E",
    "float": "left",
    "list-style-type": "none"
  };
  this.tabStyleSelected = {
    display: "inline-block",
    background: "",
    backgroundColor: "#757D8D",
    borderRight: "1px solid #D4D4D4",
    borderTop: "1px solid #D4D4D4",
    borderLeft: "1px solid #D4D4D4",
    display: "inline-block",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    padding: "9px 3px 8px",
    marginRight: "1px",
    textShadow: "",
    textDecoration: "none",
    color: "#FFFFFF",
    cursor: "default",
    filter: "",
    "float": "left",
    "list-style-type": "none"
  }
};
com.art.core.components.TabBar.prototype.hasTabById = function(a) {
  return this.tabsById[a] != undefined
};
com.art.core.components.TabBar.prototype.render = function() {
  return this.template.replace(/\$ID/g, this.id).replace("$W", this.width)
};
com.art.core.components.TabBar.prototype.template = "<ul id='$ID' style='padding:0px;margin:0px;border-bottom:0px solid; width:$Wpx;height:34px;'><li id='$ID_end' style='list-style-type:none;clear:all;'/></ul>";
com.art.core.components.TabBar.prototype.addTab = function(d, h, c, e) {
  var e = e != undefined;
  var a = this;
  var f = "str_" + com.art.core.utils.StringUtil.generateUID();
  this.guids[f] = {
    id: d,
    label: h,
    callback: c,
    isActive: true,
    isControlTab: e,
    key: f
  };
  this.tabsById[d] = {
    id: d,
    label: h,
    callback: c,
    isActive: true,
    isControlTab: e,
    key: f
  };
  if (e) {
    $("#" + this.id + "_end").before("<li id='" + f + "'>" + h + "</li>");
    $("#" + f).css({
      display: "inline-block",
      padding: "10px 10px 5px",
      cursor: "pointer",
      "list-style-type": "none",
      "float": "left"
    });
    if (this.firstControlTabID == null) {
      this.firstControlTabID = f
    }
    this.controlTabs.push(f)
  } else {
    if (this.firstControlTabID != null) {
      $("#" + this.firstControlTabID).before("<li id='" + f + "'>" + h + "</li>")
    } else {
      $("#" + this.id + "_end").before("<li id='" + f + "'>" + h + "</li>")
    }
    if (this.useCssClass) {
      this.changeToCssClass($("#" + f), this.cssClass.tab.hover)
    } else {
      $("#" + f).css(this.tabStyleActive)
    }
    this.tabs.push(f)
  }
  $("#" + f).click(function() {
    var j = $(this).attr("id");
    var l = a.guids[j];
    if (!l.isControlTab) {
      a.resetAllTabs();
      if (a.useCssClass) {
        a.changeToCssClass($(this), a.cssClass.tab.focus)
      } else {
        $(this).css(a.tabStyleSelected)
      }
      a.guids[j].isActive = false
    }
    if (a.guids[j].callback != null) {
      a.guids[j].callback(l)
    }
  });
  $("#" + f).mouseover(function() {
    var j = $(this).attr("id");
    if (a.guids[j].isActive) {
      $(this).css("text-decoration", "underline")
    }
  });
  $("#" + f).mouseout(function() {
    var j = $(this).attr("id");
    if (a.guids[j].isActive) {
      $(this).css("text-decoration", "none")
    }
  })
};
com.art.core.components.TabBar.prototype.clearAllTabs = function() {
  $("#" + this.id).html("");
  this.tabs = [];
  this.controlTabs = [];
  this.tabsById = {};
  this.guids = {};
  this.firstControlTabID = null
};
com.art.core.components.TabBar.prototype.resetAllTabs = function() {
  for (var a = 0; a < this.tabs.length; a++) {
    if (this.useCssClass) {
      this.changeToCssClass($("#" + this.tabs[a]), this.cssClass.tab.hover)
    } else {
      $("#" + this.tabs[a]).css(this.tabStyleActive)
    }
    this.guids[this.tabs[a]].isActive = true
  }
};
com.art.core.components.TabBar.prototype.changeToCssClass = function(c, a) {
  c.removeClass();
  c.addClass(a)
};
com.art.core.components.TabBar.prototype.removeTabById = function(d) {
  var f = [];
  for (var a in this.tabsById) {
    if (a == d) {
      var e = this.tabsById[d].key;
      delete this.tabsById[d];
      delete this.guids[e];
      for (var c = 0; c < this.tabs.length; c++) {
        if (this.tabs[c] != e) {
          f.push(this.tabs[c])
        }
      }
      $("#" + e).unbind("click");
      $("#" + e).unbind("mouseover");
      $("#" + e).unbind("mouseout");
      $("#" + e).remove();
      $("#" + e).empty()
    }
  }
  this.tabs = f;
  delete f
};
com.art.core.components.TabBar.prototype.removeTab = function() {
  if (this.hasTabs()) {
    var a = this.tabs.pop();
    $("#" + a).remove()
  }
};
com.art.core.components.TabBar.prototype.getControlTabByIndex = function(a) {
  if (this.controlTabs[a] == undefined) {
    throw new Error("com.art.core.components.TabBar failed! ControlTab index is undefined.")
  }
  return this.controlTabs[a]
};
com.art.core.components.TabBar.prototype.selectTabByIndex = function(c) {
  if (this.tabs[c] == undefined) {
    throw new Error("com.art.core.components.TabBar.selectTabByIndex failed! No index given tabs[" + c + "].")
  }
  var a = this.tabs[c];
  if (this.useCssClass) {
    this.changeToCssClass($("#" + a), this.cssClass.tab.focus)
  } else {
    $("#" + a).css(this.tabStyleSelected)
  }
  this.guids[a].isActive = false
};
com.art.core.components.TabBar.prototype.isInitialized = function() {
  return this.tabs.length > 0 && this.controlTabs.length > 0
};
com.art.core.components.TabBar.prototype.isRendered = function() {
  var a = $("#" + this.id).width();
  return a > 0
};
com.art.core.components.TabBar.prototype.show = function() {
  $("#" + this.id).css("display", "block")
};
com.art.core.components.TabBar.prototype.hide = function() {
  $("#" + this.id).css("display", "none")
};
com.art.core.components.TabBar.prototype.hasTabs = function() {
  return this.tabs.length > 0
};
com.art.core.components.BaseComponent.extend(com.art.core.components.TabBar.prototype);
com.art.core.components.SuperZoom = function(a, d, c) {
  this.init();
  this.useControlBar = c != undefined ? c: false;
  this.id = a;
  this.controlBar = new com.art.core.components.StandardControlBar("szCB", false, "Buy Now", "Add To My Gallery");
  this.optionButton;
  this.uid = com.art.core.utils.StringUtil.generateUID(12);
  this.lightbox = new com.art.core.components.LightBox(a + "_LightBox", "body", 0.7);
  this.windowWidth = $(window).width();
  this.windowHeight = $(window).height();
  this.loadFired = false;
  this.zoomWidth = Math.floor(this.windowWidth * 0.9);
  this.zoomHeight = Math.floor(this.windowHeight * 0.9);
  this.zindex = d;
  this.controlBar.zindex = d + 1;
  this.IMAGE_LOADED = com.art.core.components.SuperZoom.IMAGE_LOADED;
  this.controlsTimer;
  this._disableAutoClose = false;
  this.ESC_KEY_CLICKED = com.art.core.components.SuperZoom.ESC_KEY_CLICKED
};
com.art.core.components.SuperZoom.IMAGE_LOADED = "superZoomImageLoaded";
com.art.core.components.SuperZoom.ESC_KEY_CLICKED = "escKeyClicked";
com.art.core.components.SuperZoom.prototype.disableAutoClose = function() {
  clearTimeout(this.controlsTimer);
  this._disableAutoClose = true
};
com.art.core.components.SuperZoom.prototype.enableAutoClose = function() {
  this._disableAutoClose = false
};
com.art.core.components.SuperZoom.prototype.show = function(c) {
  this.loadFired = false;
  this.lightbox.setLightBoxZIndex(this.zindex);
  this.lightbox.show();
  if ($("#" + this.uid).width() == null) {
    $("body").append('<img id="' + this.uid + '" src="' + c + '"/>')
  } else {
    $("#" + this.uid).attr("src", c)
  }
  var a = this;
  $("#" + this.uid).imagesLoaded(function() {
    if (!a.loadFired) {
      a.loadFired = true;
      var d = $(this).scaleObjectToFitOrFill.Calculate({
        srcWidth: $(this).width(),
        srcHeight: $(this).height(),
        destWidth: a.zoomWidth,
        destHeight: a.zoomHeight,
        method: "fit"
      });
      $(this).css({
        position: "absolute",
        "z-index": a.zindex + 1,
        width: d.width,
        height: d.height
      });
      $(this).center(true);
      a.attachCloseButton();
      a.positionCloseButton();
      if (a.useControlBar) {
        a.attachControls();
        a.positionControls()
      }
      a.registerEvents();
      if (a.callbacks[a.IMAGE_LOADED] != null) {
        a.callbacks[a.IMAGE_LOADED]()
      }
    }
  })
};
com.art.core.components.SuperZoom.prototype.attachCloseButton = function() {
  var a = this.closeButtonTemplate.replace("$ID", this.id).replace("$ZINDEX", this.zindex + 2).replace(/\$IMAGE_HOST/g, this.getImageHost());
  $("body").append(a)
};
com.art.core.components.SuperZoom.prototype.positionCloseButton = function() {
  var c = $("#" + this.uid);
  var a = this;
  setTimeout(function() {
    a.checkSuperZoomSize(c.width(), c.height())
  },
  250)
};
com.art.core.components.SuperZoom.prototype.attachControls = function() {
  $("body").append(this.controlBar.render())
};
com.art.core.components.SuperZoom.prototype.setPrice = function(a) {
  this.controlBar.setPrice(a)
};
com.art.core.components.SuperZoom.prototype.setSalePrice = function(a) {
  this.controlBar.setSalePrice(a)
};
com.art.core.components.SuperZoom.prototype.attachExternalComponent = function(a) {
  this.optionButton = a;
  this.controlBar.attachExternalComponent(this.optionButton.render())
};
com.art.core.components.SuperZoom.prototype.positionControls = function() {
  var d = $("#" + this.uid);
  var a = this.controlBar;
  a.registerEvents();
  a.position("absolute");
  var f = (Math.round(d.offset().top) + d.height()) - (a.height() + 50);
  var e = (Math.round(d.offset().left) + Math.round(d.width() - a.width()) / 2);
  a.top(f);
  a.left(e)
};
com.art.core.components.SuperZoom.prototype.checkSuperZoomSize = function(l, e) {
  var f = $("#" + this.uid);
  if (f.width() == l && f.height() == e) {
    var d = $("#closeButton" + this.id);
    var k = $(window);
    var j = Math.ceil(((k.height() - d.height()) / 2 + k.scrollTop()) - (f.height() / 2));
    var h = Math.ceil(((k.width() - d.width()) / 2 + k.scrollLeft()) + (f.width() / 2));
    $("#closeButton" + this.id).css({
      position: "absolute",
      top: j,
      left: h
    })
  } else {
    var a = this;
    setTimeout(function() {
      a.checkSuperZoomSize(f, f.width(), f.height())
    },
    150)
  }
};
com.art.core.components.SuperZoom.prototype.closeButtonTemplate = '<img id="closeButton$ID" src="$IMAGE_HOST/images/photostoart/closebox.png" style="z-index:$ZINDEX;cursor:pointer;"/>';
com.art.core.components.SuperZoom.prototype.registerEvents = function() {
  var a = this;
  $(document).bind("contextmenu",
  function(c) {
    c.preventDefault()
  });
  if (this.useControlBar) {
    $("#" + this.uid).mousemove(function() {
      if (!a._disableAutoClose) {
        a.hideShowControl()
      }
    })
  }
  $(window).bind("resize",
  function() {
    if (a.useControlBar) {
      a.positionControls()
    }
    a.positionCloseButton()
  });
  $("#closeButton" + a.id + ",.core_lightbox").bind("click",
  function() {
    a.close()
  });
  this.lightbox.registerCallback(com.art.core.components.LightBox.CLICK,
  function() {
    a.close()
  });
  $(document).bind("keydown",
  function(c) {
    if (c.which == 27 || c.keyCode == 27) {
      a.close()
    }
  });
  this.controlBar.registerEvents();
  if (this.optionButton != undefined) {
    this.optionButton.registerEvents()
  }
};
com.art.core.components.SuperZoom.prototype.close = function() {
  $("#" + this.uid).unbind("load");
  $("#" + this.uid).die("load");
  $("#" + this.uid).unbind("click");
  $("#" + this.uid).remove();
  $("#" + this.uid).empty();
  $("#closeButton" + this.id).unbind("click");
  $("#closeButton" + this.id).remove();
  $("#closeButton" + this.id).empty();
  this.lightbox.close();
  if (this.useControlBar) {
    this.controlBar.close()
  }
};
com.art.core.components.SuperZoom.prototype.getNextHighestZIndex = function() {
  return this.controlBar.zindex + 1
};
com.art.core.components.SuperZoom.prototype.hideShowControl = function() {
  var a = this;
  clearTimeout(this.controlsTimer);
  if (this.controlBar.isHidden()) {
    this.controlBar.fadeIn()
  }
  this.controlsTimer = setTimeout(function() {
    a.controlBar.fadeOut()
  },
  5000)
};
com.art.core.components.BaseComponent.extend(com.art.core.components.SuperZoom.prototype);
com.art.core.components.Spinner = function(a) {
  this.init();
  this.id = com.art.core.utils.StringUtil.generateUID();
  this.target = a;
  this.message = "";
  this.ellipse = "";
  this.intervalID;
  this.width = 30;
  this.height = 30
};
com.art.core.components.Spinner.prototype.show = function(c) {
  var a = this;
  $(this.target).append(this.getTemplate(c));
  $("#" + this.id).css("top", ($(window).height() - $("#" + this.id).height()) / 2 + $(window).scrollTop() + "px");
  $("#" + this.id).css("left", ($(window).width() - $("#" + this.id).width()) / 2 + $(window).scrollLeft() + "px");
  if (this.message.length > 0) {
    $("#" + a.id + "-message").html(this.message);
    this.intervalID = setInterval(function() {
      a.ellipse += ".";
      $("#" + a.id + "-message").html(a.message + a.ellipse);
      if (a.ellipse.length > 15) {
        a.ellipse = "";
        clearInterval(this.intervalID)
      }
    },
    800)
  }
  $("#" + this.id + "_img").centerElement();
  if ($.browser.msie) {
    $("#" + this.id).css({
      border: "1px solid #999999"
    })
  }
};
com.art.core.components.Spinner.prototype.getTemplate = function(d) {
  var c = d != undefined ? d: 1;
  var a = "<div id='$ID' class='core_spinner' style='text-align:left;padding:15px;position:absolute;z-index:$ZINDEX;width:$WIDTHpx;height:$HEIGHTpx;background-color:#FFFFFF;-moz-border-radius: 3px;border-radius: 3px;background-position:-339px -88px;background-repeat:no-repeat;position:absolute; left:50px;top:20px;'><img id='$ID_img' style='width:32px;height:32px;' src='$IMAGE_HOST/images/photostoart/loading.gif'/>";
  if (this.message.length > 0) {
    a += "<div style='margin-top:60px;color:#666666;text-align:center;' id='$ID-message'></div>"
  }
  a += "</div>";
  return a.replace(/\$ID/g, this.id).replace("$ZINDEX", c).replace(/\$IMAGE_HOST/g, this.getImageHost()).replace(/\$WIDTH/g, this.width).replace(/\$HEIGHT/g, this.height)
};
com.art.core.components.Spinner.prototype.hide = function() {
  clearInterval(this.intervalID);
  this.ellipse = "";
  $("#" + this.id).remove();
  $("#" + this.id).empty()
};
com.art.core.components.Spinner.prototype.setMessage = function(a) {
  this.message = a
};
com.art.core.components.Spinner.prototype.alterDefaultSize = function(c, a) {
  this.width = c;
  this.height = a
};
com.art.core.components.Spinner.prototype.appendOuterShadow = function() {
  $("#" + this.id).addDropShadow("center")
};
com.art.core.components.BaseComponent.extend(com.art.core.components.Spinner.prototype);
com.art.core.components.GridDisplay = function(a, d, c) {
  this.init();
  this.id = a;
  this.width = d;
  this.numberOfColumns = c;
  this.PADDING = 5
};
com.art.core.components.GridDisplay.prototype.render = function() {
  return this.template.replace(/\$ID/g, this.id).replace("$W", this.width)
};
com.art.core.components.GridDisplay.prototype.template = "<div id='$ID' style='width:$Wpx;'>$TABLE</div>";
com.art.core.components.GridDisplay.prototype.getRowTemplate = function(c, h) {
  var f = "";
  var e = "margin-bottom:1px;";
  var d = (c != undefined) ? c: "";
  e += "background-color:" + d + ";";
  for (var a = 0; a < this.numberOfColumns; a++) {
    f += "<div style='$STYLE_" + a + "'><span style='background-color:" + d + "'>$VALUE_" + a + "</span></div>"
  }
  f += "<div style='clear:both;'></div>";
  if (h) {
    e += "background-image: url(http://cache1.artprintimages.com/images/pub/pid/UI_elipse.gif);";
    e += "background-repeat:repeat-x;";
    e += "background-position:0px 4px;"
  }
  return "<div style='" + e + "'>" + f + "</div>"
};
com.art.core.components.GridDisplay.prototype.addRow = function(a) {
  if (a.columns == undefined) {
    throw new Error("GridDisplay.getRowTemplate failed! Required values and/or styles property is undefined.")
  }
  if ($("#" + this.id).width() == 0) {
    throw new Error("GridDisplay.getRowTemplate failed! GridDisplay.render() has not yet been called.")
  }
  if (a.columns.length != this.numberOfColumns) {
    throw new Error("GridDisplay.getRowTemplate failed! GridDisplay.addRow() has incorrect number of column objects.")
  }
  var e = this.getRowTemplate(a.rowBackgroundColor, a.useEllipse);
  for (var c = 0; c < a.columns.length; c++) {
    var d = a.columns[c];
    var f = this.getColumnStyle(d);
    e = e.replace("$STYLE_" + c, f).replace("$VALUE_" + c, d.value)
  }
  $("#" + this.id).append(e)
};
com.art.core.components.GridDisplay.prototype.getColumnStyle = function(a) {
  var c = "";
  c += "text-align:" + ((a.textAlign == "right") ? "right;": "left;");
  c += "font-weight:" + ((a.bold) ? "bold;": "normal;");
  c += "float:" + ((a["float"] == "right") ? "right;": "left;");
  c += "color:" + ((a.color == undefined) ? "#000000;": a.color + ";");
  c += "width:" + (Math.round(this.width / this.numberOfColumns)) + "px;";
  c += "padding-left:0px;padding-top:5px;padding-bottom:5px;padding-right:0px;";
  return c
};
com.art.core.components.GridDisplay.prototype.getTemplate = function() {
  return this.template.replace("$TABLE", "").replace("$W", this.width).replace("$ID", this.id)
};
com.art.core.components.GridDisplay.prototype.render = function() {
  return this.getTemplate()
};
com.art.core.components.BaseComponent.extend(com.art.core.components.GridDisplay.prototype);
com.art.core.components.DropDown = function(c, a, d, f, e) {
  throw new Error("This Control is deprecated, please use version 2")
};
com.art.core.components.TextAreaField = function(e, c, f, d, a, h) {
  throw new Error("This Control is deprecated, please use version 2")
};
com.art.core.components.TextField = function(d, a, e, c) {
  throw new Error("This Control is deprecated, please use version 2")
};
com.art.core.components.PasswordField = function(d, a, e, c) {
  throw new Error("This Control is deprecated, please use version 2")
};
com.art.core.components.UploadModal = function(d, f, a, e, c) {
  this.id = d;
  this.service;
  this.serviceDetails;
  this.translatedContent = {
    title: "Upload",
    flashRequired: "Flash Is Required",
    flashReqText: "It does not look like you have the <b>version 10.3</b> or higher Flash Player plug-in installed.",
    errorMessage1: "We are sorry, but an error occurred while uploading this image.",
    errorMessage2: "Please try again later."
  };
  $.updateObject(this.translatedContent, f);
  this.config = {
    serviceUrlImageUpload: "http://dev3-ws-api.art.com/ImageUpload/default.aspx",
    languageIso: "en",
    fileCountMaximum: 5,
    minImageSizeMessage: "Files must be at least <MINFILESIZE> in size to ensure a high quality print. <COUNTINVALIDFILES> of your files do not meet this requirement.",
    maxImageSize: undefined,
    minImageSize: undefined,
    imagePath: "http://cache1.artprintimages.com",
    loadingText: "loading",
    persistentId: "",
    sessionId: "",
    apiKey: "",
    uploaderTranslationFileLocation: "http://cache1.artprintimages.com/images/js/core/upload/eit_lang/",
    swfFullFileLocation: "http://cache1.artprintimages.com/images/js/core/upload/ElementITMultiPowUpload.swf",
    supportInstall: "http://cache1.artprintimages.com/images/js/core/expressInstall.swf",
    imageFilterByType: "*.jpg:*.jpeg:*.tif:*.tiff:",
    defaultView: "thumbnails",
    javaScriptEventsPrefix: "com.art.core.components.UploadModal.MultiPowUpload",
    flashWidth: "580",
    flashHeight: "460",
    modalWidth: "600",
    clearButtonVisible: true,
    listViewButtonVisible: true,
    thumbViewButtonVisible: true,
    sortButtonVisible: true,
    statusLabelTextReady: "Number of files: <FILESCOUNT> (<TOTALSIZE>)",
    windowWarningCaption: "",
    messagesFilesCountExceeded: "Only <MAXFILECOUNT> files are allowed to upload! <COUNTINVALIDFILES> files were ignored!"
  };
  $.updateObject(this.config, a);
  this.controls = {
    uploadModal: this.id,
    baseModal: this.id + "_base"
  };
  this.base = new com.art.core.components.BaseModal(this.controls.baseModal, this.config.modalWidth, {
    bgcolor: "#f1f1f1"
  },
  false, false, this.translatedContent);
  com.art.core.components.UploadModal.containerId = this.controls.baseModal;
  this.CLOSE_CLICKED = com.art.core.components.UploadModal.CLOSE_CLICKED;
  com.art.core.components.UploadModal.apiKey = this.config.apiKey;
  com.art.core.components.UploadModal.persistentId = this.config.persistentId;
  com.art.core.components.UploadModal.uploadObject = this.id + "uploader";
  if (c != undefined) {
    com.art.core.components.UploadModal.googleAnalytics = c
  }
  if (e != undefined) {
    com.art.core.components.UploadModal.notification = e
  }
  this.closeCallBack
};
com.art.core.components.UploadModal.CLOSE_CLICKED = "close";
com.art.core.components.UploadModal.totalFilesCount = 0;
com.art.core.components.UploadModal.apiKey = "";
com.art.core.components.UploadModal.persistentId = "";
com.art.core.components.UploadModal.uploadObject = "";
com.art.core.components.UploadModal.notification = {};
com.art.core.components.UploadModal.containerId = "";
com.art.core.components.UploadModal.callbacks = [];
com.art.core.components.UploadModal.prototype.setServiceDetails = function(a) {
  this.serviceDetails = a;
  this.service = new com.art.core.services.ServiceProvider(this.serviceDetails)
};
com.art.core.components.UploadModal.prototype.registerEvents = function(c) {
  var a = this;
  this.base.registerEvents();
  this.base.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
  function() {
    a.doClose()
  })
};
com.art.core.components.UploadModal.prototype.render = function(a) {
  this.base.setContents(this.getTemplate(a));
  return this.base.render(a + 1)
};
com.art.core.components.UploadModal.prototype.close = function(c) {
  var a = this;
  this.closeCallback = c
};
com.art.core.components.UploadModal.prototype.renderUploader = function(d) {
  var c = swfobject.getFlashPlayerVersion();
  if (c.major < 10 || (c.major == 10 && c.min < 3)) {
    this.renderNoFlash(d);
    var a = com.art.core.utils.BrowserUtil.getNextHighestZIndex();
    $("#uploader_noFlashPopup").css("z-index", a)
  } else {
    this.renderUploaderFlash(d)
  }
};
com.art.core.components.UploadModal.prototype.renderNoFlash = function(c) {
  var a = '<div id="uploader_noFlashPopup" style="height: 275px; background: white; text-align: center; width: 100%;"><div style="padding-top:20px;font-size:22px;color:#B51821;">[NEEDFLASH]</div><div style="margin: 9px 9px 0px 9px">[FLASHMSG]</div><div style="margin-top: 30px;"><a href="http://get.adobe.com/flashplayer" target="_blank"><img src="http://www.adobe.com/images/shared/download_buttons/get_adobe_flash_player.png" /></a></div></div>';
  a = a.replace(/\[NEEDFLASH\]/gi, this.translatedContent.flashRequired);
  a = a.replace(/\[FLASHMSG\]/gi, this.translatedContent.flashReqText);
  $("#" + this.controls.uploadModal).html(a)
};
com.art.core.components.UploadModal.prototype.renderUploaderFlash = function(k) {
  var a = this;
  var d = com.art.core.components.ArtButton.ART_ORANGE;
  var h = {
    wmode: "transparent"
  };
  var c = {
    id: com.art.core.components.UploadModal.uploadObject,
    name: com.art.core.components.UploadModal.uploadObject
  };
  var e = this.config;
  var f = {
    method: "post",
    postTo: e.serviceUrlImageUpload,
    uploadUrl: e.serviceUrlImageUpload,
    "messages.fileSizeNotEnough": e.minImageSizeMessage,
    "fileFilter.maxCount": e.fileCountMaximum,
    "fileFilter.maxSize": e.maxImageSize !== undefined ? e.maxImageSize: 20480000,
    "fileFilter.minSize": e.minImageSize !== undefined ? e.minImageSize: 512000,
    "fileFilter.types": "Images|" + this.config.imageFilterByType,
    defaultView: "grid",
    onCompleteUrl: this.onCompleteUrl,
    imageRoot: e.imagePath,
    "postFields.file": "ImageXml",
    useExternalInterface: "true",
    javaScriptEventsPrefix: e.javaScriptEventsPrefix,
    clearListOnAddNewFiles: "false",
    removeUploadedFilesFromList: "true",
    dateFormatString: "m/d/Y H:i",
    "constant.decimalSeparator": ".",
    "thumbnail.loadFromExif": "false",
    "language.autoDetect": "false",
    "language.source": this.getLanguagePath(),
    "listViewButton.x": 250,
    loadingText: e.loadingText,
    "fileView.defaultView": e.defaultView,
    "clearButton.visible": e.clearButtonVisible,
    "listViewButton.visible": e.listViewButtonVisible,
    "thumbViewButton.visible": e.thumbViewButtonVisible,
    "sortButton.visible": e.sortButtonVisible,
    "statusLabel.text.ready": e.statusLabelTextReady,
    "window.warningCaption": e.windowWarningCaption,
    "messages.filesCountExceeded": e.messagesFilesCountExceeded
  };
  var j = e.swfFullFileLocation;
  f.serialNumber = "00826431142282254711118525282576169286728410211";
  swfobject.embedSWF(j, this.id, e.flashWidth, e.flashHeight, "10.0.0", e.supportInstall, f, h, c)
};
com.art.core.components.UploadModal.notify = function(c, a) {
  var d = com.art.core.components.UploadModal.notification;
  if (d.func != undefined) {
    d.func(new com.art.core.utils.Note(c, a, ""))
  }
};
com.art.core.components.UploadModal.logError = function(a) {
  var c = com.art.core.components.UploadModal.notification;
  if (c.logError != undefined) {
    c.logError(a)
  }
};
com.art.core.components.UploadModal.googleEvent = function(a) {
  var c = com.art.core.components.UploadModal.googleAnalytics;
  if (c.func != undefined) {
    c.func(a)
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onMovieLoad = function() {
  $("#" + com.art.core.components.UploadModal.containerId).center()
};
com.art.core.components.UploadModal.googleAnalytics = {
  photoAdded: "",
  uploadInitiated: "/upload-photos/initiated",
  uploadCompleted: "/upload-photos/completed",
  imageLoaded: "",
  photoRemoved: "",
  error: ""
};
com.art.core.components.UploadModal.events = {
  movieLoad: "movieLoad",
  serverResponse: "serverResponse",
  addFiles: "addFiles",
  removeFiles: "removeFiles",
  error: "error",
  imageLoaded: "imageLoaded",
  start: "start",
  complete: "complete"
};
com.art.core.components.UploadModal.prototype.registerCallbackStatic = function(c, a) {
  com.art.core.components.UploadModal.callbacks[c] = a
};
com.art.core.components.UploadModal.MultiPowUpload_onCancel = function() {
  com.art.core.components.UploadModal.prototype.destroy()
};
com.art.core.components.UploadModal.MultiPowUpload_onServerResponse = function(a) {
  var c = com.art.core.components.UploadModal.notification;
  com.art.core.components.UploadModal.notify(c.onServerResponse, a.serverResponse)
};
com.art.core.components.UploadModal.MultiPowUpload_onAddFiles = function(files) {
  var o = com.art.core.components.UploadModal;
  for (var i = 0; i < files.length; i++) {
    eval(o.uploadObject.toString()).generateThumbnail(files[i].id);
    o.totalFilesCount += 1
  }
  eval(o.uploadObject.toString()).addPostField("persistentid", o.persistentId);
  eval(o.uploadObject.toString()).addPostField("apikey", o.apiKey);
  o.googleEvent(o.googleAnalytics.photoAdded);
  if (o.callbacks[o.events.addFiles] != undefined) {
    o.callbacks[o.events.addFiles]()
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onRemoveFiles = function(a) {
  var d = com.art.core.components.UploadModal;
  for (var c = 0; c < a.length; c++) {
    d.totalFilesCount -= 1
  }
  d.googleEvent(d.googleAnalytics.photoRemoved);
  if (d.callbacks[d.events.removeFiles] != undefined) {
    d.callbacks[d.events.removeFiles]()
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onError = function(c, d) {
  if (d.indexOf("#2049") > -1) {
    d = "Cross-domain upload not permitted without crossdomain.xml on server directory root"
  }
  var a = com.art.core.utils.LoggingManager.prototype.createError("FileUploadError", "Uploading file " + c.name + " caused error: " + d);
  var e = com.art.core.components.UploadModal;
  e.logError(a);
  e.googleEvent(e.googleAnalytics.error);
  if (e.callbacks[e.events.error] != undefined) {
    e.callbacks[e.events.error]()
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onDebug = function(a) {};
com.art.core.components.UploadModal.MultiPowUpload_onImageLoaded = function(a) {
  var c = com.art.core.components.UploadModal;
  c.googleEvent(c.googleAnalytics.imageLoaded);
  if (c.callbacks[c.events.imageLoaded] != undefined) {
    c.callbacks[c.events.imageLoaded]()
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onStart = function() {
  var a = com.art.core.components.UploadModal;
  a.googleEvent(a.googleAnalytics.uploadInitiated);
  if (a.callbacks[a.events.start] != undefined) {
    a.callbacks[a.events.start]()
  }
};
com.art.core.components.UploadModal.MultiPowUpload_onComplete = function() {
  var a = com.art.core.components.UploadModal;
  a.googleEvent(a.googleAnalytics.uploadCompleted);
  if (a.callbacks[a.events.complete] != undefined) {
    a.callbacks[a.events.complete]()
  }
};
com.art.core.components.UploadModal.prototype.getLanguagePath = function() {
  return this.config.uploaderTranslationFileLocation + "Language_" + this.config.languageIso + ".xml"
};
com.art.core.components.UploadModal.prototype.doClose = function() {
  var a = this;
  $("#" + this.base.id).unbind("keypress");
  $("#" + this.base.id).die();
  $("#" + this.base.id).remove();
  if (this.closeCallback != undefined) {
    this.closeCallback()
  }
};
com.art.core.components.UploadModal.prototype.getTemplate = function() {
  return this.template.replace("$ID", this.controls.uploadModal).replace("$ERRMSG1", this.translatedContent.errorMessage1).replace("$ERRMSG2", this.translatedContent.errorMessage2)
};
com.art.core.components.UploadModal.prototype.template = '             <div id="$ID"></div>             <div style="display:none;font-family: verdana, sans-serif;color:red;text-align:center;font-size:16px;height:140px;margin-top:110px;clear:right;" id="uploaderror">$ERRMSG1                 <br />$ERRMSG2             </div>';
com.art.core.components.BaseComponent.extend(com.art.core.components.UploadModal.prototype);
com.art.core.components.PrintImage = function(a, d, c) {
  this.init();
  this.id = a;
  this.target = d;
  this.src = c;
  this.translatedContent = {
    optional: "(optional)",
    title: "Page Title",
    desc: "Description",
    submit: "Open Print Page",
    cancel: "Cancel"
  };
  this.fields = {
    title: new com.art.core.components.TextField("printtitle", {},
    this.translatedContent.title, this.translatedContent.optional),
    desc: new com.art.core.components.TextAreaField("printdesc", {},
    this.translatedContent.desc, this.translatedContent.optional),
    submit: new com.art.core.components.Button("printsubmit", this.translatedContent.submit),
    cancel: new com.art.core.components.Button("printcancel", this.translatedContent.cancel, com.art.core.components.Button.Sizes.MEDIUM, com.art.core.components.Button.Flavors.SECONDARY)
  };
  this.lightbox
};
com.art.core.components.PrintImage.prototype.registerEvents = function() {
  this.fields.title.registerEvents();
  this.fields.desc.registerEvents();
  this.fields.submit.registerEvents();
  this.fields.cancel.registerEvents()
};
com.art.core.components.PrintImage.prototype.render = function() {
  var a = this;
  var e = "print_lightbox";
  if ($("#" + e).attr("id") != e) {
    this.lightbox = new com.art.core.components.LightBox(e, "body", 0.4)
  }
  this.lightbox.zindex = 20;
  this.lightbox.show();
  $("body").append("<div id='" + this.id + "' style='width:300px;height:250px;z-index:" + this.lightbox.zindex + ";background:#ffffff;border:solid 1px black; margin: 10px;padding:10px;'>Enter optional text that will be printed with your image" + this.fields.title.getTemplate() + this.fields.desc.getTemplate() + "<div align=right>" + this.fields.cancel.getTemplate() + "&nbsp;&nbsp;&nbsp;" + this.fields.submit.getTemplate() + "</div></div>");
  $("#" + this.id).center(true);
  this.registerEvents();
  var d = com.art.core.components.BaseButton.CLICK;
  this.fields.submit.registerCallback(d,
  function() {
    var f = a.fields.title.getValue() != a.fields.title.defaultValue ? a.fields.title.getValue() : "";
    var c = a.fields.desc.getValue() != a.fields.desc.defaultValue ? a.fields.desc.getValue() : "";
    $("#" + a.id).empty();
    $("#" + a.id).remove();
    a.lightbox.close();
    a.popWindow(f, c)
  });
  this.fields.cancel.registerCallback(d,
  function() {
    $("#" + a.id).empty();
    $("#" + a.id).remove();
    a.lightbox.close()
  })
};
com.art.core.components.PrintImage.prototype.popWindow = function(c, a) {
  popup = window.open("", "popup", "toolbar=no,menubar=no,width=800,height=800");
  popup.document.open();
  popup.document.write("<html><head></head><body onload='print()'>");
  popup.document.write("<h1>Art.com</h1>");
  popup.document.write("<input type='text' style='width:100%;border:0px #ffffff; font-size:14px' value='" + c + "'/>");
  popup.document.write("<img src='" + this.src + "' width='100%'>");
  popup.document.write("<textarea style='width:100%;border:0px #ffffff; font-size:14px'>" + a + "</textarea>");
  popup.document.write("</body></html>");
  this.fields.title.setValue(c);
  this.fields.desc.setValue(a);
  popup.document.close()
};
com.art.core.components.BaseComponent.extend(com.art.core.components.PrintImage.prototype);
com.art.core.components.Social = function(d, e, c, f, a) {
  this.init();
  this.id = d;
  this.target = e;
  this.scriptLoaded = false;
  this.scriptLoadAttempts = 0;
  this.cssClass = com.art.core.components.Social.cssClass;
  $.updateObject(this.cssClass, c);
  this.translatedContent = com.art.core.components.Social.translatedContent;
  $.updateObject(this.translatedContent, f);
  this.cookieNames = {};
  $.updateObject(this.cookieNames, a);
  com.art.core.components.Social.cookieNames = this.cookieNames;
  this.nullValue = com.art.core.components.Social.nullValue;
  this.cookieHelper = new com.art.core.cookie.Cookie(this.cookieNames);
  this.socialButtons = {
    flags: {
      pinterest: false,
      tweet: false,
      googlePlusShare: false,
      facebookShare: false,
      expanded: false
    },
    data: {
      pinterest: {},
      tweet: {},
      googlePlusShare: {},
      facebookShare: {},
      expanded: {}
    }
  };
  this.customData = {
    url: "",
    title: "",
    description: "",
    media: ""
  };
  this.loadScript()
};
com.art.core.components.Social.translatedContent = {};
com.art.core.components.Social.prototype.setCustomData = function(e, d, a, c) {
  this.customData = {
    url: e,
    title: d,
    description: a,
    media: c
  };
  window.addthis_share = this.customData
};
com.art.core.components.Social.prototype.render = function() {
  var a = this.socialButtons.flags;
  $("#" + this.target).html(this.getTemplate(a.pinterest, a.tweet, a.googlePlusShare, a.facebookShare));
  this.loadButtons()
};
com.art.core.components.Social.prototype.loadButtons = function() {
  var a = this;
  if (this.scriptLoaded) {
    addthis.toolbox("#prd-addthis-block")
  } else {
    if (this.scriptLoadAttempts < 5) {
      setTimeout(function() {
        a.scriptLoadAttempts++;
        a.loadButtons()
      },
      2000)
    } else {}
  }
};
com.art.core.components.Social.prototype.turnOnPinterest = function(a) {
  this.socialButtons.flags.pinterest = true;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(a)) {
    this.socialButtons.data.pinterest = a
  }
};
com.art.core.components.Social.prototype.turnOnTweet = function(a) {
  this.socialButtons.flags.tweet = true;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(a)) {
    this.socialButtons.data.tweet = a
  }
};
com.art.core.components.Social.prototype.turnOnGooglePlusShare = function(a) {
  this.socialButtons.flags.googlePlusShare = true;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(a)) {
    this.socialButtons.data.googlePlusShare = a
  }
};
com.art.core.components.Social.prototype.turnOnFacebookShare = function(a) {
  this.socialButtons.flags.facebookShare = true;
  if (com.art.core.utils.ObjectUtil.isNullOrEmpty(a)) {
    this.socialButtons.data.facebookShare = a
  }
};
com.art.core.components.Social.prototype.loadScript = function() {
  var d = false;
  var a = this;
  try {
    if (com.art.core.utils.ObjectUtil.isNullOrEmpty(addthis)) {
      d = true
    }
  } catch(c) {
    d = true
  }
  if (d) {
    $.cachedScript("//s7.addthis.com/js/250/addthis_widget.js#pub=artdotcom&domready=1").done(function(e, f) {
      a.scriptLoaded = true
    })
  } else {
    this.scriptLoaded = true
  }
};
com.art.core.components.Social.prototype.getTurnedOnServices = function() {
  var a = this.socialButtons.flags;
  var c = {};
  if (a.pinterest) {
    c.pinterest = "Pin it"
  }
  if (a.print) {
    c.print = "Print"
  }
  if (a.facebookShare) {
    c.facebook = "Facebook"
  }
  if (a.expanded) {
    c.expanded = "More"
  }
  if (a.tweet) {
    c.twitter = "Tweet"
  }
  if (a.googlePlusShare) {
    c.google_plusone_share = "Google +"
  }
  return c
};
com.art.core.components.Social.prototype.getCustomAttr = function(c) {
  var a = "";
  switch (c.toLowerCase()) {
  case "pinterest":
    a = " pi:pinit:media='" + this.customData.media + "'";
    break
  }
  return a
};
com.art.core.components.Social.prototype.getTemplate = function(f, h, e, d) {
  var j = "",
  c = "";
  var l = this.getTurnedOnServices();
  for (var k in l) {
    var a = '<a class="addthis_button_' + k + '" alt="' + l[k] + '"[CUSTOM]></a>';
    a = a.replace("[CUSTOM]", this.getCustomAttr(k));
    j += a
  }
  return j
};
com.art.core.components.BaseComponent.extend(com.art.core.components.Social.prototype);
com.art.core.components.oldComponents.ToolTip = function(a) {
  com.art.core.components.BaseComponent.extend(this);
  this.NAME = com.art.core.components.oldComponents.ToolTip.NAME;
  this.callbacks = [];
  this.title = "";
  this.message = "";
  this.markupId = a + (Math.ceil(Math.random() * 1000)).toString();
  this.toolTipContent = {
    title: "",
    message: ""
  }
};
var _x_ = com.art.core.components.oldComponents.ToolTip;
var _x_p = _x_.prototype;
_x_.NAME = "ToolTip";
_x_p.init = function(a) {
  this.registerEvents(a);
  return this.getTemplate()
};
_x_p.setToolTip = function(c, a) {
  this.toolTipContent.title = c;
  this.toolTipContent.message = a
};
_x_p.render = function(d, e, c) {
  var a = this.getTemplate();
  $("body").append(a);
  $("#" + this.markupId).css({
    position: "absolute",
    background: "#F5F5DC",
    width: c,
    top: e,
    left: d,
    padding: "10px",
    "z-index": "10000",
    border: "1px solid #DCD4CD",
    font: "Times New Roman",
    color: "#000000",
    "text-align": "left"
  });
  $("#" + this.markupId).addDropShadow("angle")
};
_x_p.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
_x_p.destroy = function() {
  $("#" + this.markupId).empty();
  $("#" + this.markupId).remove()
};
_x_p.registerEvents = function(c) {
  var a = this;
  $("#" + this.markupId).live("click",
  function() {});
  $("#" + this.markupId).live("mouseover",
  function() {
    a.getToolTip()
  });
  $("#" + this.markupId).live("mouseout",
  function() {
    a.destroy()
  })
};
_x_p.getTemplate = function() {
  var a = "";
  a += '<div class="toolTipComponent" id="' + this.markupId + '">' + this.toolTipContent.message + "</div>";
  return a
};
com.art.core.cookie.Cookie = function(a) {
  this.cookieNames = com.art.core.cookie.Cookie.cookieNames;
  if (a == undefined || typeof a == "string") {
    a = {}
  }
  $.updateObject(this.cookieNames, a);
  this.nullVal = ""
};
com.art.core.cookie.Cookie.cookieNames = {
  cdAuthToken: "ap",
  cAuthToken: "authtoken",
  cdSitePersistentId: "",
  cSitePersistentId: "persistentID",
  cdAppPersistentId: "p2a",
  cAppPersistentId: "p2akey",
  cdSiteSessionId: "",
  cSiteSessionId: "sessionid",
  cdAppSessionId: "p2a",
  cAppSessionId: "sessionid",
  cdAccountType: "ap",
  cAccountType: "accounttype",
  cdProfileUrl: "ap",
  cProfileUrl: "profileURL",
  cdAccountId: "ap",
  cAccountId: "accountid"
};
com.art.core.cookie.Cookie.prototype.resetCookie = function(h, e, j) {
  var a = this;
  var l = h.length > 0;
  var k = e;
  var f = h;
  l ? a.setCookieDictionary(f, k, this.nullVal, "/", a.getCookieDomain(""), j, false) : a.setCookie(k, this.nullVal, "/", a.getCookieDomain(""), j, false)
};
com.art.core.cookie.Cookie.prototype.setCookieDynamic = function(h, e, j, m) {
  var a = this;
  var l = h.length > 0;
  var k = e;
  var f = h;
  l ? a.setCookieDictionary(f, k, m, "/", a.getCookieDomain(""), j, false) : a.setCookie(k, m, "/", a.getCookieDomain(""), j, false)
};
com.art.core.cookie.Cookie.prototype.getCookieDynamic = function(h, e) {
  var a = this;
  var k = h.length > 0;
  var j = e;
  var f = h;
  return k ? a.getCookieDictionary(f, j) : a.getCookie(j)
};
com.art.core.cookie.Cookie.prototype.cookieGetStateData = function() {
  var a = this.cookieNames;
  return {
    authToken: this.getCookieDynamic(a.cdAuthToken, a.cAuthToken),
    accountType: this.getCookieDynamic(a.cdAccountType, a.cAccountType),
    sessionId: this.getCookieDynamic(a.cdSiteSessionId, a.cSiteSessionId),
    persistentId: this.getCookieDynamic(a.cdSitePersistentId, a.cSitePersistentId),
    profileUrl: this.getCookieDynamic(a.cdProfileUrl, a.cProfileUrl),
    accountId: this.getCookieDynamic(a.cdAccountId, a.cAccountId)
  }
};
com.art.core.cookie.Cookie.prototype.cookieSetLogin = function(e) {
  var h = new com.art.core.vos.User();
  h.updateUserProfileFromServer(e);
  var a = this.cookieNames;
  var f = new Date();
  var c = new Date(f.getFullYear(), f.getMonth(), f.getDate(), f.getHours(), f.getMinutes(), f.getSeconds(), f.getMilliseconds());
  var d = new Date(f.getFullYear(), f.getMonth(), f.getDate(), f.getHours(), f.getMinutes(), f.getSeconds(), f.getMilliseconds());
  c.setDate(c.getDate() + 60);
  d.setDate(d.getDate() + 10);
  if (h.getAuthenticationToken().length > 0) {
    this.setCookieDynamic(a.cdAuthToken, a.cAuthToken, d, h.getAuthenticationToken())
  }
  if (h.getPersistentId().length > 0) {
    this.setCookieDynamic(a.cdAppPersistentId, a.cAppPersistentId, c, h.getPersistentId())
  }
  if (h.getPersistentId().length > 0) {
    this.setCookieDynamic(a.cdSitePersistentId, a.cSitePersistentId, c, h.getPersistentId())
  }
  if (h.getSessionId().length > 0) {
    this.setCookieDynamic(a.cdAppSessionId, a.cAppSessionId, "", h.getSessionId())
  }
  if (h.getSessionId().length > 0) {
    this.setCookieDynamic(a.cdSiteSessionId, a.cSiteSessionId, "", h.getSessionId())
  }
  if (h.getAccountType().length > 0) {
    this.setCookieDynamic(a.cdAccountType, a.cAccountType, c, h.getAccountType())
  }
  if (h.getProfileUrl().length > 0) {
    this.setCookieDynamic(a.cdProfileUrl, a.cProfileUrl, c, h.getProfileUrl())
  }
  if (h.getAccountId().toString().length > 0) {
    this.setCookieDynamic(a.cdAccountId, a.cAccountId, c, h.getAccountId())
  }
};
com.art.core.cookie.Cookie.prototype.cookieSetLogout = function() {
  var a = this.cookieNames;
  var e = new Date();
  var c = new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
  var d = new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
  c.setDate(c.getDate() + 60);
  d.setDate(d.getDate() + 10);
  this.resetCookie(a.cdAuthToken, a.cAuthToken, c);
  this.resetCookie(a.cdAccountType, a.cAccountType, c);
  this.resetCookie(a.cdProfileUrl, a.cProfileUrl, c);
  this.resetCookie(a.cdAccountId, a.cAccountId, "")
};
com.art.core.cookie.Cookie.prototype.getCookieDomain = function(a) {
  var c = "." + a + ".com";
  var d;
  d = location.host;
  if (d.indexOf(".", d.indexOf(".", 0) + 1)) {
    c = d.indexOf(".", 0) > 0 ? d.substring(d.indexOf(".", 0)) : d
  }
  return c
};
com.art.core.cookie.Cookie.prototype.getCookieDictionary = function(f, e) {
  var j = "";
  var c = String(this.getCookieBase(f));
  var a;
  var d;
  if (c != null) {
    a = c.split("&");
    for (var h = 0; h < a.length; h++) {
      d = a[h].split("=");
      if (d[0] == e) {
        j = d[1];
        return j
      }
    }
  }
  return j
};
com.art.core.cookie.Cookie.prototype.setCookieDictionary = function(f, e, h, o, j, k, p) {
  var d = String(this.getCookieBase(f));
  var n = new String();
  if (d != "null") {
    if (d.indexOf("=") > 0) {
      if (d.indexOf(e + "=") >= 0) {
        var a = d.split("&");
        var c = new Array();
        var m;
        for (var l = 0; l < a.length; l++) {
          m = String(a[l]).indexOf("=");
          c[0] = String(a[l]).substring(0, m);
          c[1] = String(a[l]).substring(m + 1);
          if (n.length != 0) {
            n += "&"
          }
          if (c[0] == e) {
            n += c[0] + "=" + escape(h)
          } else {
            n += c[0] + "=" + escape(c[1])
          }
        }
        this.setCookie(f, n, o, j, k, p)
      } else {
        n = d + "&" + e + "=" + h;
        this.setCookie(f, n, o, j, k, p)
      }
    } else {}
  } else {
    n = e + "=" + h;
    this.setCookie(f, n, o, j, k, p)
  }
};
com.art.core.cookie.Cookie.prototype.setCookie = function(e, j, f, c, d, h) {
  var a = e + "=" + (j) + ((f) ? "; path=" + f: "") + ((c) ? "; domain=" + c: "") + ((d) ? "; expires=" + d.toGMTString() : "") + ((h) ? "; secure": "");
  document.cookie = a
};
com.art.core.cookie.Cookie.prototype.deleteCookie = function(c) {
  var a = new Date();
  a.setTime(a.getTime() - 1);
  document.cookie = c + "=; expires=" + a.toGMTString()
};
com.art.core.cookie.Cookie.prototype.getCookie = function(a) {
  return this.getCookieBase(a)
};
com.art.core.cookie.Cookie.prototype.getCookieBase = function(o) {
  var h = document.cookie.split("; ");
  var e = [];
  var m = 0;
  var l = 0;
  var p = o.length;
  var d = h.length;
  for (l = 0; l < d; l++) {
    var a = h[l];
    if ((a.substring(0, p + 1)) == (o + "=")) {
      e[m++] = a
    }
  }
  var f = e.length;
  if (f > 0) {
    m = 0;
    if ((f > 1) && (o == this.fpc)) {
      var j = new Date(0);
      for (l = 0; l < f; l++) {
        var n = parseInt(this.dcsGetCrumb(e[l], "lv"));
        var k = new Date(n);
        if (k > j) {
          j.setTime(k.getTime());
          m = l
        }
      }
    }
    return unescape(e[m].substring(p + 1))
  } else {
    return null
  }
};
com.art.core.cookie.Cookie.prototype.getCookieVal = function(c) {
  var a = document.cookie.indexOf(";", c);
  if (a == -1) {
    a = document.cookie.length
  }
  return unescape(document.cookie.substring(c, a))
};
com.art.core.cookie.Cookie.prototype.setCookiePersistent = function(c, a, d) {
  this.setCookieDynamic(c, a, com.art.core.utils.DateUtil.getMonthsFromNow(2), d)
};
com.art.core.cookie.Cookie.prototype.setCookieSession = function(c, a, d) {
  this.setCookieDynamic(c, a, "", d)
};
com.art.core.services.AccountAuthorizationAPIService = function(a) {
  this.base = a;
  this.serviceUrl = this.base.environment.serviceUrlAccountAuthenticationApi;
  this.constants = {
    profileImageType: {
      icon: "Icon",
      signature: "Signature"
    }
  }
};
var _x_ = com.art.core.services.AccountAuthorizationAPIService;
var _x_p = _x_.prototype;
_x_p.accountAuthenticate = function(c, a, j, d, h) {
  var e = "AccountAuthenticate";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", j];
  f[2] = ["emailAddress", d];
  f[3] = ["password", h];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, e, f);
  this.base.doRequest(k, c)
};
_x_p.accountGet = function(d, a, h, c) {
  var e = "AccountGet";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["authToken", c];
  var j = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, e, f);
  this.base.doRequest(j, d)
};
_x_p.accountAuthenticateWithFacebookUID = function(d, c, m, f, e, h, j, a) {
  var k = "AccountAuthenticateWithFacebookUID";
  var l = [];
  l[0] = ["apiKey", c];
  l[1] = ["sessionId", m];
  l[2] = ["facebookUID", f];
  l[3] = ["emailAddress", e];
  l[4] = ["firstName", h];
  l[5] = ["lastName", j];
  l[6] = ["facebookToken", a];
  var n = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, k, l);
  this.base.doRequest(n, d)
};
_x_p.accountCreate = function(c, a, j, d, h) {
  var e = "AccountCreate";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", j];
  f[2] = ["emailAddress", d];
  f[3] = ["password", h];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, e, f);
  this.base.doRequest(k, c)
};
_x_p.accountCreateAnonymous = function(c, a, f) {
  var d = "AccountCreateAnonymous";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", f];
  var h = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, d, e);
  this.base.doRequest(h, c)
};
_x_p.accountRetrievePassword = function(c, a, h, d) {
  var e = "AccountRetrievePassword";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["emailAddress", d];
  var j = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, e, f);
  this.base.doRequest(j, c)
};
_x_p.accountMerge = function(c, a, h, d, j) {
  var e = "AccountMerge";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["fromAuthToken", d];
  f[3] = ["toAuthToken", j];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, e, f);
  this.base.doRequest(k, c)
};
_x_p.accountUpdateLocation = function(f, d, o, e, a, c, j, h, q, r, t, m, n) {
  var k = "AccountUpdateLocation";
  var l = [];
  l[0] = ["apiKey", d];
  l[1] = ["sessionId", o];
  l[2] = ["authToken", e];
  l[3] = ["addressLine1", a];
  l[4] = ["addressLine2", c];
  l[5] = ["companyName", j];
  l[6] = ["city", h];
  l[7] = ["state", q];
  l[8] = ["twoDigitIsoCountryCode", r];
  l[9] = ["zipCode", t];
  l[10] = ["primaryPhone", m];
  l[11] = ["secondaryPhone", n];
  var s = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, k, l);
  this.base.doRequest(s, f)
};
_x_p.accountUpdateProfile = function(d, a, l, c, f, h, m, e) {
  var j = "AccountUpdateProfile";
  var k = [];
  k[0] = ["apiKey", a];
  k[1] = ["sessionId", l];
  k[2] = ["authToken", c];
  k[3] = ["firstName", f];
  k[4] = ["lastName", h];
  k[5] = ["title", m];
  k[6] = ["companyName", e];
  var n = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, j, k);
  this.base.doRequest(n, d)
};
_x_p.accountUpdateProfileBiography = function(e, a, j, c, d) {
  var f = "AccountUpdateProfile";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["biography", d];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, f, h);
  this.base.doRequest(k, e)
};
_x_p.accountUpdateProfileInspiration = function(d, a, j, c, e) {
  var f = "AccountUpdateProfile";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["inspiration", e];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, f, h);
  this.base.doRequest(k, d)
};
_x_p.accountAddProfileLink = function(d, a, j, c, k, e) {
  var f = "AccountAddProfileLink";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["url", k];
  h[4] = ["linkType", e];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, f, h);
  this.base.doRequest(k, d)
};
_x_p.accountUpdateProfileImage = function(d, a, k, c, e, f) {
  var h = "AccountUpdateProfileImage";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["imageGuid", e];
  j[4] = ["type", f];
  var l = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, h, j);
  this.base.doRequest(l, d)
};
_x_p.accountChangePassword = function(d, a, k, c, e, f) {
  var h = "AccountChangePassword";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["currentPassword", e];
  j[4] = ["newPassword", f];
  var l = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, h, j);
  this.base.doRequest(l, d)
};
_x_p.accountUpdateSettings = function(d, a, k, c, e, f) {
  var h = "AccountUpdateSettings";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["emailAddress", e];
  j[4] = ["emailFormat", f];
  var l = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, h, j);
  this.base.doRequest(l, d)
};
_x_p.accountUpdateNickname = function(d, a, j, c, e) {
  var f = "AccountUpdateNickname";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["nickname", e];
  var k = this.base.getUrl(this.base.environment.serviceUrlAccountAuthenticationApi, f, h);
  this.base.doRequest(k, d)
};
delete _x_;
delete _x_p;
com.art.core.services.AdcNetService = function(a) {
  this.base = a;
  this.serviceUrlAddToCart = this.base.environment.serviceUrlAddToCart;
  this.serviceUrlGetEventMessage = this.base.environment.serviceUrlGetEventMessage
};
var _x_ = com.art.core.services.AdcNetService;
var _x_p = _x_.prototype;
_x_p.addToCart = function(a, c) {
  var d = this.base.getUrlSimple(this.base.environment.serviceUrlAddToCart, c);
  this.base.doRequest(d, a, com.art.core.services.ServiceProvider.XML)
};
_x_p.getEventMessageForProduct = function(e, h, k, f, a, n, q, j) {
  this.serviceUrlGetEventMessage;
  HolidayShippingPriorityID = 1;
  var m = [];
  var l = [];
  var d = com.art.core;
  m.UserDate = j;
  m.customerZoneId = h;
  m.languageId = d.utils.LocalizationManager.convertLanguageIsoToLanguageId(k);
  m.countryIsoA2 = f;
  m.ItemCount = 1;
  l.apnum = a;
  l.podconfigid = n;
  l.S = q;
  l.ZoneProductID = a + "A";
  m.item0 = escape(d.utils.StringUtil.getQueryStringFromHash(l));
  var o = d.utils.StringUtil.getQueryStringFromHash(m);
  var r = this.base.getUrlSimple(this.base.environment.serviceUrlGetEventMessage, o);
  this.base.doRequest(r, e, d.services.ServiceProvider.HTML)
};
delete _x_;
delete _x_p;
com.art.core.services.EcommerceAPIService = function(a) {
  this.base = a;
  this.serviceUrl = this.base.environment.serviceUrlEcommerceApi
};
var _xeps = com.art.core.services.EcommerceAPIService;
var _xepsp = _xeps.prototype;
_xepsp.cartAddItem = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.cartGetActiveCountryList = function(c, a, f) {
  var d = "CartGetActiveCountryList";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", f];
  var h = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(h, c)
};
_xepsp.cartGetActiveStateListByCountryCode = function(c, a, f, h) {
  var d = "CartGetActiveStateListByCountryCode";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", f];
  e[2] = ["twoDigitIsoCountryCode", h];
  var j = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(j, c)
};
_xepsp.galleryGetItemShareInformation = function(d, a, k, c, e, f) {
  var h = "GalleryGetItemShareInformation";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["galleryId", e];
  j[4] = ["galleryItemId", f];
  var l = this.base.getUrl(this.serviceUrl, h, j);
  this.base.doRequest(l, d)
};
_xepsp.galleryGetItem = function(c, a, j, d, e) {
  var f = "GalleryGetItem";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["galleryId", d];
  h[3] = ["galleryItemId", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.cartGetShippingOptions = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.cartSubmitForOrder = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.cartUpdateCartItemQuantity = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.cartUpdateShippingAddress = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.cartUpdateShipmentPriority = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.catalogItemGet = function(c, a, j, d, e) {
  var f = "CatalogItemGet";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["itemId", d];
  h[3] = ["lookupType", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.catalogItemGetFrameRecommendations = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.catalogItemSearch = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.catalogItemSearchByImage = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.catalogGetContentBlock = function(c, a, h, d) {
  var e = "CatalogGetContentBlock";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["contentBlockName", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.catalogGetContentBlockString = function(c, a, h, d) {
  var e = "CatalogGetContentBlockString";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["contentBlockName", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.catalogGetFeaturedCategories = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.catalogItemGetVariations = function(c, a, j, d, e) {
  var f = "ImageGetVariations";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["itemId", d];
  h[3] = ["lookupType", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.catalogItemVariationsGetMaster = function(c, a, h, d) {
  var e = "ImageGetMasterVariations";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["lookupType", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.galleryAddItem = function(d, a, l, c, e, f, h, n) {
  var j = "GalleryAddItem";
  var k = [];
  k[0] = ["apiKey", a];
  k[1] = ["sessionId", l];
  k[2] = ["authToken", c];
  k[3] = ["galleryId", e];
  k[4] = ["itemId", f];
  k[5] = ["lookupType", h];
  k[6] = ["userImageTitle", n];
  var m = this.base.getUrl(this.serviceUrl, j, k);
  this.base.doRequest(m, d)
};
_xepsp.galleryAddItemFromGallery = function(d, a, j, c, k, l, e) {
  var f = "GalleryAddItemFromGallery";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["sourceGalleryId", k];
  h[4] = ["sourceGalleryItemId", l];
  h[5] = ["destinationGalleryId", e];
  var m = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(m, d)
};
_xepsp.galleryAddForUser = function(d, a, k, c, e, f) {
  var h = "GalleryAddForUser";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["galleryName", e];
  j[4] = ["galleryVisibility", f];
  var l = this.base.getUrl(this.serviceUrl, h, j);
  this.base.doRequest(l, d)
};
_xepsp.galleryAddWallByImageGUID = function(c, a) {
  var d = "GalleryAddWallByImageGUID";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.galleryGet = function(c, a, h, d) {
  var e = "GalleryGet";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["galleryId", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.galleryGetByUser = function(d, a, h, c) {
  var e = "GalleryGetByUser";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["authToken", c];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, d)
};
_xepsp.galleryGetUserDefaultGallery = function(d, a, j, c, e) {
  var f = "GalleryGetUserDefaultGallery";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["authToken", c];
  h[3] = ["defaultGalleryType", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, d)
};
_xepsp.galleryGetUserDefaultMobileGallery = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.galleryGetUserDefaultWallGallery = function(c, a) {
  var d = "";
  var e = [];
  e[0] = ["apiKey", a];
  var f = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(f, c)
};
_xepsp.galleryRemoveItem = function(d, a, k, c, e, f) {
  var h = "GalleryRemoveItem";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", k];
  j[2] = ["authToken", c];
  j[3] = ["galleryId", e];
  j[4] = ["galleryItemId", f];
  var l = this.base.getUrl(this.serviceUrl, h, j);
  this.base.doRequest(l, d)
};
_xepsp.CatalogGetSession = function(c, a, d) {
  this.catalogGetSession(c, a, d)
};
_xepsp.catalogGetSession = function(c, a, f) {
  var d = "CatalogGetSession";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", f];
  var h = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(h, c)
};
_xepsp.ApplicationGetForSession = function(c, a, d) {
  this.applicationGetForSession(c, a, d)
};
_xepsp.applicationGetForSession = function(c, a, f) {
  var d = "ApplicationGetForSession";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", f];
  var h = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(h, c)
};
_xepsp.initializeApi = function(d, a, c, j, k, h) {
  var e = "InitializeAPI";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["applicationId", c];
  f[2] = ["twoDigitISOCountryCode", j];
  f[3] = ["twoDigitISOLanguageCode", k];
  f[4] = ["persistentId", h];
  var l = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(l, d)
};
_xepsp.getLanguageTranslations = function(c, a, h, d) {
  var e = "LocalizationGetLanguageTranslations";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["appId", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.imageUpdate = function(d, a, c, v, m, l, k, h, j, f, e, s, t, u, o, n) {
  var q = "ImageUpdate";
  var r = [];
  r[0] = ["apiKey", a];
  r[1] = ["authToken", c];
  r[2] = ["sessionId", v];
  r[3] = ["imageId", m];
  r[4] = ["imageGuid", l];
  r[5] = ["ImageCropId", k];
  r[6] = ["cropX", h];
  r[7] = ["cropY", j];
  r[8] = ["cropW", f];
  r[9] = ["cropH", e];
  r[10] = ["podConfigId", s];
  r[11] = ["selectedService", t];
  r[12] = ["selectedServiceSubType", u];
  r[13] = ["maxImageAreaWidth", o];
  r[14] = ["maxImageAreaHeight", n];
  var w = this.base.getUrl(this.serviceUrl, q, r);
  this.base.doRequest(w, d)
};
_xepsp.frameCreateForUserImage = function(d, a, l, c, f, k, e) {
  var h = "FrameCreateForUserImage";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", l];
  j[2] = ["authToken", c];
  j[3] = ["imageGuid", f];
  j[4] = ["podConfigId", k];
  j[5] = ["imageCropId", e];
  var m = this.base.getUrl(this.serviceUrl, h, j);
  this.base.doRequest(m, d)
};
_xepsp.frameUpdateCrop = function(c, a, n, j, k, f, h, e, d) {
  var l = "FrameUpdateCrop";
  var m = [];
  m[0] = ["apiKey", a];
  m[1] = ["sessionId", n];
  m[2] = ["frameIdentifier", j];
  m[3] = ["imageCropIdentifier", k];
  m[4] = ["cropX", f];
  m[5] = ["cropY", h];
  m[6] = ["cropWidth", e];
  m[7] = ["cropHeight", d];
  var o = this.base.getUrl(this.serviceUrl, l, m);
  this.base.doRequest(o, c)
};
_xepsp.frameCreate = function(d, a, l, c, h, e, f) {
  var j = "FrameCreate";
  var k = [];
  k[0] = ["apiKey", a];
  k[1] = ["authToken", c];
  k[2] = ["sessionId", l];
  k[3] = ["itemId", itemId];
  k[4] = ["podConfigId", podConfigId];
  k[5] = ["imageCropId", imageCropId];
  var m = this.base.getUrl(this.serviceUrl, j, k);
  this.base.doRequest(m, d)
};
_xepsp.frameGetMoldingPriceByFrameId = function(c, a, j, d, e) {
  var f = "FrameGetMoldingPriceByFrameId";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["frameIdentifier", d];
  h[3] = ["moldingItemNumber", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.frameDuplicateForCart = function(c, a, h, d) {
  var e = "FrameDuplicateForCart";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", h];
  f[2] = ["frameIdentifier", d];
  var j = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(j, c)
};
_xepsp.frameGetMoldingPriceByDimensions = function(c, a, j, e, l, d) {
  var f = "FrameGetMoldingPriceByDimensions";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["moldingItemNumber", e];
  h[3] = ["innerDimensionWidth", l];
  h[4] = ["innerDimensionHeight", d];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.frameUpdateMolding = function(c, a, k, d, e, j) {
  var f = "FrameUpdateMolding";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", k];
  h[2] = ["frameIdentifier", d];
  h[3] = ["moldingItemNumber", e];
  h[4] = ["position", j];
  var l = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(l, c)
};
_xepsp.frameUpdateMatCount = function(c, a, j, d, e) {
  var f = "FrameUpdateMatCount";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["frameIdentifier", d];
  h[3] = ["matCount", e];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.frameUpdateMat = function(c, a, k, d, e, j) {
  var f = "FrameUpdateMat";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", k];
  h[2] = ["frameIdentifier", d];
  h[3] = ["matItemNumber", e];
  h[4] = ["position", j];
  var l = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(l, c)
};
_xepsp.frameCreateForUserImage = function(d, a, l, c, n, f, k, e) {
  var h = "FrameCreateForUserImage";
  var j = [];
  j[0] = ["apiKey", a];
  j[1] = ["sessionId", l];
  j[2] = ["authToken", c];
  j[3] = ["userIdentifier", n];
  j[4] = ["imageGuid", f];
  j[5] = ["podConfigId", k];
  j[6] = ["imageCropId", e];
  var m = this.base.getUrl(this.serviceUrl, h, j);
  this.base.doRequest(m, d)
};
_xepsp.frameUpdateCrop = function(c, a, n, j, k, f, h, e, d) {
  var l = "FrameUpdateCrop";
  var m = [];
  m[0] = ["apiKey", a];
  m[1] = ["sessionId", n];
  m[2] = ["frameIdentifier", j];
  m[3] = ["imageCropid", k];
  m[4] = ["cropX", f];
  m[5] = ["cropY", h];
  m[6] = ["cropWidth", e];
  m[7] = ["cropHeight", d];
  var o = this.base.getUrl(this.serviceUrl, l, m);
  this.base.doRequest(o, c)
};
_xepsp.frameUpdateImageSize = function(c, a, j, d, h) {
  var e = "FrameUpdateImageSize";
  var f = [];
  f[0] = ["apiKey", a];
  f[1] = ["sessionId", j];
  f[2] = ["frameIdentifier", d];
  f[3] = ["podConfigId", h];
  var k = this.base.getUrl(this.serviceUrl, e, f);
  this.base.doRequest(k, c)
};
_xepsp.frameGetComponentsForUserImage = function(c, a, j, e, d) {
  var f = "FrameGetComponentsForUserImage";
  var h = [];
  h[0] = ["apiKey", a];
  h[1] = ["sessionId", j];
  h[2] = ["podConfigId", e];
  h[3] = ["itemLookupType", d];
  var k = this.base.getUrl(this.serviceUrl, f, h);
  this.base.doRequest(k, c)
};
_xepsp.catalogItemGetFrameComponents = function(c, a, h, f) {
  var d = "CatalogItemGetFramingComponentsForUserImage";
  var e = [];
  e[0] = ["apiKey", a];
  e[1] = ["sessionId", h];
  e[2] = ["podConfigId", f];
  var j = this.base.getUrl(this.serviceUrl, d, e);
  this.base.doRequest(j, c)
};
_xepsp.imageUpdateFrame = function(d, a, c, v, u, k, w, f, j, e, h, r, o, q, l, m, n) {
  var s = "ImageUpdateFrame";
  var t = [];
  t[0] = ["apiKey", a];
  t[1] = ["authToken", c];
  t[2] = ["sessionId", v];
  t[3] = ["podConfigId", u];
  t[4] = ["imageId", k];
  t[5] = ["unitOfMeasure", w];
  t[6] = ["frameId", f];
  t[7] = ["imageCropId", j];
  t[8] = ["fixToFixedFrame", e];
  t[9] = ["glassId", h];
  t[10] = ["moldingId", r];
  t[11] = ["matCount", o];
  t[12] = ["matOversized", q];
  t[13] = ["mat1Id", l];
  t[14] = ["mat2Id", m];
  t[15] = ["mat3Id", n];
  var x = this.base.getUrl(this.serviceUrl, s, t);
  this.base.doRequest(x, d)
};
delete _xeps;
delete _xepsp;
com.art.core.services.GalleryAPIService = function(d, a, c) {
  this.base = d;
  this.serviceUrl = this.base.environment.galleryServiceUrl;
  this.domainUrl = this.base.environment.domain;
  this.JSONP = com.art.core.services.ServiceProvider.JSONP
};
var _x_ = com.art.core.services.GalleryAPIService;
var _x_p = _x_.prototype;
_x_p.getUserGalleries = function(a, c) {
  var d = "getUserGalleries";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getGalleryWithItems = function(a, c) {
  var d = "getGalleryWithItems";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getUserDefaultGallery = function(a, c) {
  var d = "getUserDefaultGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getGalleryDetailswithResultFilter = function(a, c) {
  var d = "getGalleryDetailswithResultFilter";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.updateGallery = function(a, c) {
  var d = "updateGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.createGallery = function(a, c) {
  var d = "createGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getUserLibrary = function(a, c) {
  var d = "getUserLibrary";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getSystemLibrary = function(a, c) {
  var d = "getSystemLibrary";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.addItemsToGallery = function(a, c) {
  var d = "addItemsToGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.addItemsToDefaultGallery = function(a, c) {
  var d = "addItemsToDefaultGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.moveGalleryItem = function(a, c) {
  var d = "moveGalleryItem";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.addBareWalls = function(a, c) {
  var d = "addBareWalls";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.updateBareWall = function(a, c) {
  var d = "updateBareWall";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.deleteGalleryItem = function(a, c) {
  var d = "removeGalleryItem";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.deleteGallery = function(a, c) {
  var d = "deleteGallery";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.removeWall = function(a, c) {
  var d = "removeWall";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.createWall = function(a, c) {
  var d = "createWall";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.updateWall = function(a, c) {
  var d = "updateWall";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.updateWallItems = function(a, c) {
  var d = "updateWallItems";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getWalls = function(a, c) {
  var d = "getWalls";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.shareWall = function(a, c) {
  var d = "shareaWall";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getWallByWallId = function(a, c) {
  var d = "getWallByWallId";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getWallByProfileKey = function(a, c) {
  var d = "getWallByProfileKey";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.getUserLibraryByProfileKey = function(a, c) {
  var d = "getUserLibraryByProfileKey";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.callAccountProxy = function(a, c) {
  this.AccountProxyUrl = "http://" + this.domainUrl + "/ADC.NET/Root/Pages/MyGalleries/AccountProxy.aspx";
  this.base.doRequest(this.AccountProxyUrl, a, "text/html", c)
};
_x_p.callMyAccountProxy = function(a, c) {
  var d = "http://" + this.domainUrl + "/asp/functions/myAccountProxy.asp";
  this.base.doRequest(d, a, "text/html", c)
};
_x_p.copyWallWithItems = function(a, c) {
  var d = "copyWallWithItems";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_p.shareGalleryItem = function(a, c) {
  var d = "shareGalleryItem";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, this.JSONP, c)
};
_x_.SORT_BY_DATE_ADDED = 1;
_x_.SORT_BY_ARTIST_NAME = 2;
_x_.SORT_BY_PRICE = 3;
_x_.SORT_BY_TITLE = 4;
_x_.SORT_DIRECTION_DESC = 1;
_x_.SORT_DIRECTION_ASC = 0;
delete _x_;
delete _x_p;
com.art.core.services.GraphAPIService = function(d, a, c) {
  this.base = d;
  this.serviceUrl = this.base.environment.graphAPIServiceUrl;
  this.domainUrl = this.base.environment.domain
};
var _x_ = com.art.core.services.GraphAPIService;
var _x_p = _x_.prototype;
_x_p.UpdateUserRelationship = function(c) {
  var d = "UpdateUserRelationship";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  var a = {
    successHandler: function() {},
    errorHandler: function() {},
    beforeSendHandler: function() {}
  };
  this.base.doRequest(e, a, com.art.core.services.ServiceProvider.JSONP, c)
};
_x_p.UpdateUserRelationshipForFollowsAndBookmark = function(a, c) {
  var d = "UpdateUserRelationship";
  var e = this.base.getJSONUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, com.art.core.services.ServiceProvider.JSONP, c)
};
_x_.RelationshipChangeAction_ADD = 0;
_x_.RelationshipChangeAction_REMOVE = 1;
_x_.RelationshipChangeAction_UPDATE = 2;
_x_.UserRelationshipType_LIKED = 0;
_x_.UserRelationshipType_DISLIKED = 1;
_x_.UserRelationshipType_SUBSCRIBED = 2;
_x_.UserRelationshipType_UNSUBSCRIBED = 3;
_x_.UserRelationshipType_COMMENTED = 4;
_x_.UserRelationshipType_CREATED = 5;
_x_.UserRelationshipType_SHARED = 6;
_x_.UserRelationshipType_VIEWED = 7;
_x_.UserRelationshipType_FRIENDSWITH = 8;
_x_.UserRelationshipType_FOLLOWS = 9;
_x_.UserRelationshipType_BOOKMARK = 10;
delete _x_;
delete _x_p;
com.art.core.services.LoggingAPIService = function(a) {
  this.base = a;
  this.serviceUrl = this.base.environment.serviceUrlLoggingApi
};
com.art.core.services.LoggingAPIService.prototype.logError = function(c, a, m, e, j, f, d, h) {
  var k = "LogError";
  var l = [];
  l[0] = ["apiKey", a];
  l[1] = ["sessionId", m];
  l[2] = ["errorMessage", e];
  l[3] = ["errorSource", j];
  l[4] = ["errorName", f];
  l[5] = ["errorLocation", d];
  l[6] = ["errorObjectAsString", h];
  var n = this.base.getUrl(this.serviceUrl, k, l);
  this.base.doRequest(n, c)
};
com.art.core.services.DFEAPIService = function(d, a, c) {
  this.base = d;
  this.serviceUrl = this.base.environment.dfeAPIServiceUrl;
  this.domainUrl = this.base.environment.domain
};
com.art.core.services.DFEAPIService.prototype.GetFrameSkuForFrameConfiguration = function(a, c) {
  var d = "GetFrameSkuForFrameConfiguration";
  var e = this.base.getAJAXUrl(this.serviceUrl, d);
  this.base.doRequest(e, a, com.art.core.services.ServiceProvider.JSONP, c)
};
com.art.core.services.SearchAPIService = function(d, a, c) {
  this.base = d;
  this.serviceUrl = this.base.environment.searchServiceUrl;
  this.domainUrl = this.base.environment.domain
};
com.art.core.services.SearchAPIService.prototype.getSimilarImagesForImage = function(a, c) {
  var d = "GetSimilarImagesForImage";
  var e = this.serviceUrl;
  e += "/ajax/" + d;
  e += "?method=?&Apnum=" + c.Apnum;
  e += "&RecordsPerPage=24";
  e += "&PageNumber=1";
  e += "&CustomerZoneId=" + this.base.environment.customerZoneId;
  e += "&CurrencyCode=" + this.base.environment.currencyCode;
  e += "&ImageFilePath=" + c.ImageFilePath;
  e += "&ArtistCategoryId=";
  e += "&ImageId=";
  e += "&Refinements=";
  e += "&ImageIdList=";
  e += "&apnumlist=";
  e += "&imagefilelist=";
  e += "&SearchType=";
  e += "&NumberOfResults=";
  e += "&DominantColorId=";
  e += "&RefinementId=";
  e += "&ArtistCategoryIdList=";
  e += "&SortBy=P_SiteRank";
  e += "&domain=com";
  e += "&FilterBlackListItems=false";
  this.base.doRequest(e, a, "json")
};
com.art.core.services.ServiceProvider = function(a) {
  this.name = "ServiceProvider";
  this.environment = a;
  var c = com.art.core.services;
  this.ecommerceAPIService = new c.EcommerceAPIService(this);
  this.galleryAPIService = new c.GalleryAPIService(this);
  this.accountAuthorizationAPIService = new c.AccountAuthorizationAPIService(this);
  this.adcNetService = new c.AdcNetService(this);
  this.loggingAPIService = new c.LoggingAPIService(this);
  this.searchAPIService = new c.SearchAPIService(this);
  this.dfeAPIService = new c.DFEAPIService(this);
  this.framingServiceAPI = new c.FramingServiceAPI(this);
  this.graphServiceAPI = new c.GraphAPIService(this);
  this.productServiceAPI = new c.ProductAPIService(this);
  this.contentType = c.ServiceProvider.JSON_CONTENT_TYPE;
  this.TEXT_CONTENT_TYPE = c.ServiceProvider.TEXT_CONTENT_TYPE;
  this.dataType = c.ServiceProvider.JSONP;
  this.type = c.ServiceProvider.GET
};
var _x_ = com.art.core.services.ServiceProvider;
var _x_p = _x_.prototype;
_x_.XML_CONTENT_TYPE = "application/xml; charset=utf-8";
_x_.XML = "xml";
_x_.JSON_CONTENT_TYPE = "application/json; charset=utf-8";
_x_.JSON = "json";
_x_.JSONP = "jsonp";
_x_.TEXT_CONTENT_TYPE = "text/plain; charset=utf-8";
_x_.GET = "get";
_x_.POST = "post";
_x_.HTML = "html";
_x_p.ecommerceAPIService;
_x_p.galleryAPIService;
_x_p.accountAuthorizationAPIService;
_x_p.adcNetService;
_x_p.loggingAPIService;
_x_p.FramingServiceAPI;
_x_p.doRequest = function(h, c, e, d) {
  var a = com.art.core.services.ServiceProvider;
  if (e) {
    switch (e) {
    case a.XML:
    case a.JSON:
    case a.TEXT_CONTENT_TYPE:
    case a.JSONP:
    case a.HTML:
      this.dataType = e;
      break
    }
  } else {
    this.dataType = a.JSONP
  }
  var f = {};
  f.url = h;
  f.dataType = this.dataType;
  if (this.dataType == this.JSON || this.dataType == this.JSONP) {
    f.jsonp = "callback";
    f.jsonpCallback = "jsonpCallback"
  }
  f.beforeSend = function() {
    c.beforeSendHandler()
  };
  f.success = function(j) {
    c.successHandler(j)
  };
  f.error = function(j) {
    c.errorHandler(j)
  };
  if (d != undefined) {
    f.data = d
  }
  if (d != undefined) {
    f.data = d + "&X-Art-Request-Id=" + com.art.core.utils.StringUtil.generateRandomNumber()
  } else {
    f.url = f.url + com.art.core.utils.StringUtil.queryStringChr(f.url) + "X-Art-Request-Id=" + com.art.core.utils.StringUtil.generateRandomNumber()
  }
  $.ajax(f)
};
_x_p.createHandlers = function(d, c, a) {
  return {
    successHandler: d,
    errorHandler: c,
    beforeSendHandler: a
  }
};
_x_p.getUrl = function(f, c, d, e) {
  var h = f;
  if (e) {
    if (e == this.JSON) {
      h += "/jsonp"
    }
  } else {
    h += "/jsonp"
  }
  if (c.length) {
    h += "/" + c
  }
  h += "?";
  for (var a = 0; a < d.length; a++) {
    if (a > 0) {
      h += "&"
    }
    h += d[a][0] + "=" + d[a][1]
  }
  return h
};
_x_p.getUrlSimple = function(c, a) {
  return c + "?" + a
};
_x_p.getJSONUrl = function(d, c, a) {
  var e = d;
  e += "/json";
  e += "/" + c;
  return e
};
_x_p.getAJAXUrl = function(d, c, a) {
  var e = d;
  e += "/ajax";
  e += "/" + c;
  return e
};
_x_p.doSyncRequest = function(d, a) {
  var c = {};
  c.url = d;
  c.processData = false;
  c.cache = false;
  c.success = function(e) {
    a.successHandler(e)
  };
  c.error = function(e) {
    a.errorHandler(e)
  };
  $.ajax(c)
};
_x_.normalizeServiceUrlCollection = function(a) {
  var d = {};
  var c = "";
  jQuery.each(a,
  function(e, f) {
    c = e.toLowerCase();
    if (c.toLowerCase().indexOf("serviceurl") >= 0) {
      if (c.indexOf("search") >= 0) {
        d.searchServiceUrl = f
      } else {
        if (c.indexOf("graph") >= 0) {
          d.graphAPIServiceUrl = f
        } else {
          if (c.indexOf("gallery") >= 0) {
            d.galleryServiceUrl = f
          } else {
            if (c.indexOf("dfeapi") >= 0) {
              d.dfeAPIServiceUrl = f
            } else {
              if (e == "domain") {
                d.domain = f
              } else {
                if (c.indexOf("accountauth") >= 0) {
                  d.serviceUrlAccountAuthenticationApi = f
                } else {
                  if (c.indexOf("log") >= 0) {
                    d.serviceUrlLoggingApi = f
                  } else {
                    if (c.indexOf("framing") >= 0) {
                      d.framingWebServiceURL = f
                    } else {
                      if (c.indexOf("ecommerce") >= 0) {
                        d.serviceUrlEcommerceApi = f
                      } else {
                        if (c.indexOf("addtocart") >= 0) {
                          d.serviceUrlAddToCart = f
                        } else {
                          if (c.indexOf("eventmessage") >= 0) {
                            d.serviceUrlGetEventMessage = f
                          } else {
                            if (c.indexOf("environment") >= 0) {
                              d.serviceUrlGetEnvironment = f
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  return d
};
delete _x_;
delete _x_p;
com.art.core.services.FramingServiceAPI = function(a) {
  this.base = a;
  this.serviceUrl = this.base.environment.framingWebServiceURL
};
com.art.core.services.FramingServiceAPI.prototype.getFrameIdForDFE = function(a, c) {
  this.serviceUrl = "/asp/DFEHelper.asp";
  var d = this.base.getUrlSimple(this.serviceUrl, c);
  this.base.doSyncRequest(d, a)
};
com.art.core.services.ProductAPIService = function(d, a, c) {
  this.base = d;
  this.serviceUrl = this.base.environment.productAPIServiceUrl;
  this.domainUrl = this.base.environment.domain;
  this.type = com.art.core.services.ServiceProvider.GET;
  this.contentType = com.art.core.services.ServiceProvider.JSON_CONTENT_TYPE;
  this.dataType = com.art.core.services.ServiceProvider.JSONP;
  this.methodname = "GetProductInformationByParams"
};
com.art.core.services.ProductAPIService.prototype.GetProductInformation = function(d, a) {
  var c = this.serviceUrl;
  c += "/ajax/" + String(this.methodname).replace(/\-tag[\d]*/gi, "");
  c += "?method=?&" + d;
  $.ajax({
    url: c,
    type: this.type,
    cache: true,
    contentType: this.contentType,
    dataType: this.dataType,
    beforeSend: function() {
      a.getProductInfoBeforeSend()
    },
    success: function(e) {
      a.getProductInfoSuccess(e)
    },
    error: function(e) {
      a.getProductInfoError(e)
    }
  })
};
var _gaq = _gaq || [];
com.art.core.tracking.GoogleAnalytics = function(a) {
  this.groupName = a
};
com.art.core.tracking.GoogleAnalytics.prototype.init = function() {
  var a = location.host;
  this.setup(this.getAccountId(a))
};
com.art.core.tracking.GoogleAnalytics.prototype.setup = function(a) {
  if (!navigator.userAgent.match(/.*(KHTE|KTXN|GomezAgent|AlertSite|Pingdom|YottaMonitor).*/gi)) {
    _gaq.push(["_setAccount", a])
  } (function() {
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.async = true;
    c.src = ("https:" == document.location.protocol ? "https://ssl": "http://www") + ".google-analytics.com/ga.js";
    var d = document.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(c, d);
    return true
  })();
  return false
};
com.art.core.tracking.GoogleAnalytics.prototype.accounts = {
  "art.com": "UA-15714084-1",
  "art.co.uk": "UA-15714093-1",
  "eu.art.com": "UA-15715374-1",
  "potterybarn-photos.com": "UA-15714084-2",
  "allposters.com": "UA-15715175-1",
  "allposters.co.uk": "UA-15715653-1",
  "allposters.fr": "UA-15714863-1",
  "allposters.de": "UA-15714098-1"
};
com.art.core.tracking.GoogleAnalytics.prototype.globalAccounts = {
  art: "UA-15715646-1",
  apc: "UA-15715169-1"
};
com.art.core.tracking.GoogleAnalytics.prototype.getGlobalAccountId = function(c) {
  var a = c || location.host;
  if (a.indexOf("art.") >= -1) {
    return this.globalAccounts.art
  } else {
    return this.globalAccounts.apc
  }
};
com.art.core.tracking.GoogleAnalytics.prototype.getAccountId = function(a) {
  var c = this.accounts["art.com"];
  var d = "eu.art.com";
  if (a.indexOf("www.") >= 0) {
    d = a.substring(a.indexOf(".") + 1, a.length)
  } else {
    if (a.indexOf(d) < 0) {
      d = a
    }
  }
  c = this.accounts[d];
  return c
};
com.art.core.tracking.GoogleAnalytics.prototype.trackPageView = function(a) {
  if (typeof(_gaq) != "undefined") {
    if (typeof(a) != "undefined") {
      this.debugMessage("GA Group Name : " + this.groupName + ", GA Event Name : trackPageView, GA PageViewName : " + a);
      _gaq.push(["_trackPageview", a])
    } else {
      this.debugMessage("GA Group Name : " + this.groupName + ", GA Event Name : trackPageView, GA PageViewName : [not specified]");
      _gaq.push(["_trackPageview"])
    }
    return true
  } else {
    throw Error("GA is not setup; com.art.core.GoogleAnalytics")
  }
  return false
};
com.art.core.tracking.GoogleAnalytics.prototype.trackEvent = function(a) {
  if (typeof(_gaq) != "undefined") {
    this.debugMessage("GA Group Name : " + this.groupName + ", GA Event Name : " + a);
    _gaq.push(["_trackEvent", this.groupName, a, a]);
    return true
  } else {
    throw Error("GA is not setup; com.art.core.GoogleAnalytics")
  }
  return false
};
com.art.core.tracking.GoogleAnalytics.prototype.trackEventWithCategory = function(a, c) {
  if (typeof(_gaq) != "undefined") {
    this.debugMessage("GA Group Name : " + this.groupName + ", GA Category Name : " + a + ", GA Event Name : " + c);
    _gaq.push(["_trackEvent", this.groupName, a, c]);
    return true
  } else {
    throw Error("GA is not setup; com.art.core.GoogleAnalytics")
  }
  return false
};
com.art.core.tracking.GoogleAnalytics.prototype.setCustomVar = function(a, c, f, e) {
  if (typeof(_gaq) != "undefined") {
    var d = 1;
    if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(e)) {
      d = e
    }
    this.debugMessage("GA Group Name : " + this.groupName + ", GA SetCustomVar : index = " + a + ", name = " + c + ", value = " + f + ", opt_scope = " + d + " ,gaq=" + _gaq);
    _gaq.push(["_setCustomVar", a, c, f, d])
  } else {
    throw Error("GA is not setup; com.art.core.GoogleAnalytics")
  }
};
com.art.core.tracking.GoogleAnalytics.prototype.debugMessage = function(a) {
  info("AccountId: " + this.getAccountId(location.host) + " " + this.getDelimiter() + " " + a)
};
com.art.core.tracking.GoogleAnalytics.prototype.getDelimiter = function() {
  return "-"
};
com.art.core.vos.ImageVO = function(a) {
  this.NAME = com.art.core.vos.ImageVO.NAME;
  this.Title = a
};
com.art.core.vos.ImageVO.NAME = "ImageVO";
com.art.core.vos.ImageVO.prototype.Title = "";
com.art.core.vos.ImageVO.prototype.ImageUrl = "";
com.art.core.vos.ImageVO.prototype.ZoomImageUrl = "";
com.art.core.vos.ImageVO.prototype.NoWatermarkImageUrl = "";
com.art.core.vos.ImageVO.prototype.FileName = "";
com.art.core.vos.ImageVO.prototype.UploadedImageUrl = "";
com.art.core.vos.ImageVO.prototype.ArtistName = "";
com.art.core.vos.ImageVO.prototype.Price = "";
com.art.core.vos.ImageVO.prototype.MasterDisplayPrice = "";
com.art.core.vos.ImageVO.prototype.LargeImageWidth = "";
com.art.core.vos.ImageVO.prototype.LargeImageHeight = "";
com.art.core.vos.ImageVO.prototype.Position = "";
com.art.core.vos.ImageVO.prototype.ImageId = 0;
com.art.core.vos.ImageVO.prototype.ImageGuid = "";
com.art.core.vos.ImageVO.prototype.ArtistCategoryId = 0;
com.art.core.vos.ImageVO.prototype.CategoryID = 0;
com.art.core.vos.ImageVO.prototype.ProductPageUrl = "";
com.art.core.vos.ImageVO.prototype.MasterProductID = 0;
com.art.core.vos.ImageVO.prototype.MasterSpecID = "";
com.art.core.vos.ImageVO.prototype.Apnum = 0;
com.art.core.vos.ImageVO.prototype.OtherSizes = "";
com.art.core.vos.ImageVO.prototype.ImageMedWidth = "";
com.art.core.vos.ImageVO.prototype.ImageMedHeight = "";
com.art.core.vos.ImageVO.prototype.ArtistUrl = "";
com.art.core.vos.ImageVO.prototype.ShowMarkDown = "";
com.art.core.vos.ImageVO.prototype.MarkDownPrice = "";
com.art.core.vos.ImageVO.prototype.ItemGroupTypeID = "";
com.art.core.vos.ImageVO.prototype.Type = "";
com.art.core.vos.ImageVO.prototype.MasterZoneProductId = "";
com.art.core.vos.ImageVO.prototype.IsCustomerUpload = false;
com.art.core.vos.ImageVO.prototype.ItemDisplayedType = "";
com.art.core.vos.ImageVO.prototype.PhysicalInchWidth = "";
com.art.core.vos.ImageVO.prototype.PhysicalInchHeight = "";
com.art.core.vos.ImageVO.prototype.TimeToShipDisplayText = "";
com.art.core.vos.ImageVO.prototype.AppendDropShadow = true;
com.art.core.vos.ImageVO.prototype.MasterPodConfigId = "";
com.art.core.vos.ImageVO.imageType = {
  CATALOG: "catalog",
  UPLOADED: "uploaded",
  SEARCH: "search",
  WALL: "wall"
};
com.art.core.vos.ImageVO.itemTypes = {
  CatalogItem: "CatalogItem",
  CustomFramedItem: "CustomFramedItem",
  FramedItemRecommendation: "FramedItemRecommendation",
  UserUploadedItem: "UserUploadedItem",
  CompositeSKU: "CompositeSKU"
};
com.art.core.vos.ImageVO.itemTypeCollection = [{
  name: null,
  id: 0
},
{
  name: com.art.core.vos.ImageVO.itemTypes.CatalogItem,
  id: 1
},
{
  name: com.art.core.vos.ImageVO.itemTypes.CustomFramedItem,
  id: 2
},
{
  name: com.art.core.vos.ImageVO.itemTypes.FramedItemRecommendation,
  id: 3
},
{
  name: com.art.core.vos.ImageVO.itemTypes.UserUploadedItem,
  id: 4
},
{
  name: com.art.core.vos.ImageVO.itemTypes.CompositeSKU,
  id: 5
}];
com.art.core.vos.ImageVO.prototype.getTestImage = function(a) {
  this.Title = "Customer Photo";
  this.ImageUrl = "http://cache2.artprintimages.com/p/MED/21/2190/U4GAD00Z/art-print/ron-burns-i-wanna-go.jpg";
  this.Type = com.art.core.vos.ImageVO.imageType.UPLOADED;
  this.Price = "";
  this.MasterDisplayPrice = "";
  this.Apnum = "";
  this.IsCustomerUpload = true;
  this.ItemDisplayedType = "Customer Photo";
  this.PhysicalInchWidth = 0;
  this.PhysicalInchHeight = 0;
  this.TimeToShipDisplayText = ""
};
com.art.core.vos.ImageVO.prototype.getTestCatalogImage = function() {
  throw Error("development function, please remove")
};
com.art.core.vos.ImageVO.prototype.parseCatalogImageDetail = function(a, x, f, c, k, m, u, o, d, p, q, r, n, l, j, h, e, t, s, w, v) {
  this.LrgImageUrl = String(m).replace("/MED", "/MED");
  this.ImageUrl = k;
  this.ArtistCategoryId = c;
  this.ImageId = f;
  this.Apnum = a;
  this.Title = x;
  this.Type = com.art.core.vos.ImageVO.imageType.CATALOG;
  this.Price = u;
  this.MasterDisplayPrice = o;
  this.ArtistName = d;
  this.MasterProductID = p;
  this.MasterSpecID = q;
  this.MasterZoneProductId = r;
  this.LargeImageWidth = n;
  this.LargeImageHeight = l;
  this.ImageMedWidth = j;
  this.ImageMedHeight = h;
  this.ArtistUrl = e;
  this.PhysicalInchWidth = t;
  this.PhysicalInchHeight = s;
  this.TimeToShipDisplayText = w;
  this.ProductPageUrl = v
};
com.art.core.vos.ImageVO.prototype.parseUploadCustomerPhotoData = function(a) {
  this.ImageId = a.ImageID;
  this.ImageGuid = a.ImageGUID;
  this.Title = "Customer Photo";
  this.ImageUrl = a.MedImageUrl;
  this.LrgImageUrl = a.LrgImageUrl;
  this.ZoomImageUrl = a.ZoomImageUrl;
  this.FileName = a.fileName;
  this.UploadedImageUrl = a.UploadedImageUrl;
  this.Type = com.art.core.vos.ImageVO.imageType.UPLOADED;
  this.Price = "";
  this.MasterDisplayPrice = "";
  this.Apnum = 0;
  this.ArtistCategoryId = 0;
  this.MasterZoneProductId = "";
  this.IsCustomerUpload = true;
  this.ItemDisplayedType = "Customer Photo";
  this.PhysicalInchWidth = 0;
  this.PhysicalInchHeight = 0;
  this.TimeToShipDisplayText = ""
};
com.art.core.vos.ImageVO.prototype.parseImageUploadData = function(a) {
  this.Title = "Customer Photo";
  this.ImageUrl = a.SrchMedImageUrl;
  this.LrgImageUrl = a.SrchImageUrl;
  this.FileName = a.fileName;
  this.UploadedImageUrl = a.UploadedImageUrl;
  this.Type = com.art.core.vos.ImageVO.imageType.UPLOADED;
  this.Price = "";
  this.MasterDisplayPrice = "";
  this.Apnum = 0;
  this.ArtistCategoryId = 0;
  this.MasterZoneProductId = "";
  this.IsCustomerUpload = true;
  this.ItemDisplayedType = "Customer Photo";
  this.PhysicalInchWidth = 0;
  this.PhysicalInchHeight = 0;
  this.TimeToShipDisplayText = ""
};
com.art.core.vos.ImageVO.prototype.parseSearchServiceImageDetail = function(a) {
  this.Title = a.Title;
  this.ImageUrl = a.UrlInfo.ImageUrl;
  this.LrgImageUrl = String(a.UrlInfo.ImageUrl).replace("/MED", "/LRG");
  this.ZoomImageUrl = a.UrlInfo.ZoomUrl;
  this.NoWatermarkImageUrl = a.UrlInfo.ZoomUrlWithoutWatermark;
  this.FileName = "";
  this.Type = com.art.core.vos.ImageVO.imageType.CATALOG;
  this.Price = a.ItemPrice.Price;
  this.MasterDisplayPrice = a.ItemPrice.DisplayPriceMaster;
  this.Apnum = a.APNum;
  if (a.Artist != null) {
    if (a.Artist.FirstName || a.Artist.LastName) {
      this.ArtistName = a.Artist.FirstName + a.Artist.LastName
    } else {
      this.ArtistName = ""
    }
    this.ArtistCategoryId = a.Artist.ArtistCategoryId;
    this.ArtistUrl = a.Artist.ArtistUrl
  }
  this.MasterZoneProductId = a.ZoneProductID;
  this.ImageId = a.ImageId;
  this.IsCustomerUpload = false;
  this.ItemDisplayedType = a.ItemDisplayedType;
  this.PhysicalInchWidth = a.PhysicalDimensions.Width;
  this.PhysicalInchHeight = a.PhysicalDimensions.Height;
  if (a.FulfillmentInformation) {
    this.TimeToShipDisplayText = a.FulfillmentInformation.TimeToShip.DisplayText
  }
  this.ProductPageUrl = a.UrlInfo.ProductPageUrl;
  this.AppendDropShadow = a.AppendShadow == 1;
  this.CroppedSquareImageUrl = a.UrlInfo.CroppedSquareImageUrl;
  if (a.PodInfo !== null && a.PodInfo !== undefined && a.PodInfo.MasterPodConfigId !== null && a.PodInfo.MasterPodConfigId !== undefined) {
    this.MasterPodConfigId = a.PodInfo.MasterPodConfigId
  }
};
com.art.core.vos.ImageVO.prototype.isSameAs = function(a) {
  if (this.Apnum == a.Apnum && this.ImageId == a.ImageId) {
    return true
  } else {
    return false
  }
};
com.art.core.vos.RequestBaseVO = function(a) {
  this.countryCode = a.countryCode;
  this.currencyCode = a.currencyCode;
  this.currencyId = a.currencyId;
  this.customerZoneId = a.customerZoneId;
  this.languageId = a.languageId;
  this.languageIso = a.languageIso;
  this.searchServiceUrl = a.searchServiceUrl;
  this.sessionid = a.sessionid;
  this.domain = a.domain;
  this.productServiceUrl = a.productServiceUrl
};
com.art.core.vos.MouldingVO = function(c, a) {
  this.NAME = com.art.core.vos.MouldingVO.NAME;
  this.apNum = c.ApNum;
  this.mouldingId = c.MouldingId;
  this.Name = c.Name;
  this.color = c.Color;
  this.style = c.Style;
  this.finish = c.Finish;
  this.material = c.Material;
  this.width = c.Width;
  this.height = c.Height;
  this.isPopular = c.IsPopular;
  this.description = c.Description;
  this.baseThumbImageUrl = a + "/images/framing/hires/$ID/thumb/$ID.jpg";
  this.getThumbImageUrl = function() {
    return this.baseThumbImageUrl.replace(/\$ID/g, this.apNum)
  }
};
com.art.core.vos.MouldingVO.NAME = "MouldingVO";
com.art.core.vos.MouldingVO.prototype.apNum = "";
com.art.core.vos.MouldingVO.prototype.mouldingId = "";
com.art.core.vos.MouldingVO.prototype.name = "";
com.art.core.vos.MouldingVO.prototype.color = "";
com.art.core.vos.MouldingVO.prototype.style = "";
com.art.core.vos.MouldingVO.prototype.finish = "";
com.art.core.vos.MouldingVO.prototype.material = "";
com.art.core.vos.MouldingVO.prototype.width = "";
com.art.core.vos.MouldingVO.prototype.height = "";
com.art.core.vos.MouldingVO.prototype.isPopular = "";
com.art.core.vos.MouldingVO.prototype.description = "";
com.art.core.vos.MouldingVO.filterByUniqueApNum = function(f, h) {
  var l = {};
  var j = [];
  for (var d = 0; d < f.length; d++) {
    var a = f[d];
    for (var c = 0; c < a.length; c++) {
      var e = a[c];
      if (l[e.ApNum] == undefined) {
        l[e.ApNum] = true;
        j.push(new com.art.core.vos.MouldingVO(e, h))
      }
    }
  }
  return j
};
com.art.core.vos.MouldingVO.filterByUniqueApNum = function(f, h) {
  var l = {};
  var j = [];
  for (var d = 0; d < f.length; d++) {
    var a = f[d].Mouldings;
    for (var c = 0; c < a.length; c++) {
      var e = a[c];
      if (l[e.ApNum] == undefined) {
        l[e.ApNum] = true;
        j.push(new com.art.core.vos.MouldingVO(e, h))
      }
    }
  }
  return j
};
com.art.core.vos.MouldingVO.ConvertToMouldingVOArray = function(f, a) {
  var e = [];
  for (var c = 0; c < f.length; c++) {
    for (var d = 0; d < f[c].Mouldings.length; d++) {
      e.push(new com.art.core.vos.MouldingVO(f[c].Mouldings[d], a))
    }
  }
  return e
};
com.art.core.vos.MatVO = function(c, a) {
  this.Name = c.Name;
  this.apNum = c.ApNum;
  this.MatId = c.MatId;
  this.frameType = c.FrameType;
  this.hexColor = c.HexColor;
  this.maxWidth = c.MaxWidth;
  this.maxHeight = c.MaxHeight;
  this.isOverSized = c.IsOverSized;
  this.isAcidFree = c.IsAcidFree;
  this.imageFile = c.ImageFile;
  this.imagePath = a;
  this.fallbackImageURL = "/images/framing/mats/transparent_mat_template_100x100.png";
  this.thumbBaseUrl = this.imagePath + "/images/framing/mats/hires/$ID/swatch/$ID_b.jpg";
  this.medBaseUrl = this.imagePath + "/images/framing/mats/hires/$ID/swatch/$ID_a.jpg";
  this.lrgBaseUrl = this.imagePath + "/images/framing/mats/hires/$ID/swatch/$ID.jpg"
};
com.art.core.vos.MatVO.prototype.getThumbImageUrl = function() {
  return this.getImageUrl(this.thumbBaseUrl)
};
com.art.core.vos.MatVO.prototype.getMedImageUrl = function() {
  return this.getImageUrl(this.medBaseUrl)
};
com.art.core.vos.MatVO.prototype.getLrgImageUrl = function() {
  return this.getImageUrl(this.lrgBaseUrl)
};
com.art.core.vos.MatVO.prototype.getFallbackImage = function() {
  return this.imagePath + this.fallbackImageURL
};
com.art.core.vos.MatVO.prototype.getImageUrl = function(a) {
  if (this.MatId == undefined) {
    throw new Error("MatVO.getImageUrl() failed! MatId is undefined.")
  }
  return a.replace(/\$ID/g, this.MatId)
};
com.art.core.vos.MatVO.NAME = "MatVO";
com.art.core.vos.MatVO.prototype.apNum = "";
com.art.core.vos.MatVO.prototype.matId = "";
com.art.core.vos.MatVO.prototype.frameType = "";
com.art.core.vos.MatVO.prototype.hexColor = "";
com.art.core.vos.MatVO.prototype.maxWidth = "";
com.art.core.vos.MatVO.prototype.maxHeight = "";
com.art.core.vos.MatVO.prototype.isOverSized = "";
com.art.core.vos.MatVO.prototype.isAcidFree = "";
com.art.core.vos.MatVO.prototype.yiq;
com.art.core.vos.MatVO.prototype.imageFile = "";
com.art.core.vos.MatVO.prototype.vendorID = "";
com.art.core.vos.MatVO.prototype.legacyImageFile = "";
com.art.core.vos.MatVO.ConvertToMatVOArray = function(e, c) {
  var d = [];
  for (var a = 0; a < e.length; a++) {
    d.push(new com.art.core.vos.MatVO(e[a], c))
  }
  return d
};
com.art.core.vos.User = function(a) {
  this.constants = {};
  this.constants.emailFormat = {
    html: "1",
    text: "0"
  };
  this.state = {
    initialized: {
      session: false,
      profile: false,
      curator: false
    }
  };
  this.accountTypes = com.art.core.vos.User.accountTypes;
  this.cookie = new com.art.core.cookie.Cookie(a);
  this.session = {
    sessionId: "",
    persistentId: "",
    countryIso: "",
    countryIsoGeoLocation: "",
    languageIso: "",
    currencyIso: "",
    authenticationToken: "",
    cartKey: ""
  };
  this.profile = {
    accountId: "",
    accountType: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    emailFormat: this.constants.emailFormat.html,
    profileKey: "",
    publicAlias: "",
    socialPartner: {
      userId: "",
      token: ""
    }
  };
  this.curator = {
    title: "",
    biography: "",
    inspiration: "",
    links: [{
      httpUrl: "",
      linkType: ""
    }],
    location: {
      firstName: "",
      lastName: "",
      companyName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      countryIsoA2: "",
      countryIsoA3: "",
      county: "",
      phone: ""
    },
    profileImage: {
      zoom: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      large: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      medium: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      small: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      thumb: {
        width: "",
        height: "",
        http: "",
        https: ""
      }
    },
    signatureImage: {
      zoom: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      large: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      medium: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      small: {
        width: "",
        height: "",
        http: "",
        https: ""
      },
      thumb: {
        width: "",
        height: "",
        http: "",
        https: ""
      }
    }
  }
};
com.art.core.vos.User.accountTypes = {
  Unknown: "0",
  Anonymous: "1",
  Default: "2",
  Facebook: "3"
};
com.art.core.vos.User.prototype.setAuthenticationToken = function(a) {
  this.session.authenticationToken = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getAuthenticationToken = function() {
  if (this.state.initialized.session) {
    return this.session.authenticationToken
  } else {
    return this.cookie.cookieGetStateData().authToken
  }
};
com.art.core.vos.User.prototype.setSessionId = function(a) {
  this.session.sessionId = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getSessionId = function() {
  return this.session.sessionId
};
com.art.core.vos.User.prototype.setPersistentId = function(a) {
  this.session.persistentId = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getPersistentId = function() {
  return this.session.persistentId
};
com.art.core.vos.User.prototype.setCountryIso = function(a) {
  this.session.countryIso = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getCountryIso = function() {
  return this.session.countryIso
};
com.art.core.vos.User.prototype.setCountryIsoGeoLocation = function(a) {
  this.session.countryIsoGeoLocation = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getCountryIsoGeoLocation = function() {
  return this.session.countryIsoGeoLocation
};
com.art.core.vos.User.prototype.setLanguageIso = function(a) {
  this.session.languageIso = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getLanguageIso = function() {
  return this.session.languageIso
};
com.art.core.vos.User.prototype.setCurrencyIso = function(a) {
  this.session.currencyIso = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getCurrencyIso = function() {
  return this.session.currencyIso
};
com.art.core.vos.User.prototype.setCartKey = function(a) {
  this.session.cartKey = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getCartKey = function() {
  return this.session.cartKey
};
com.art.core.vos.User.prototype.setAccountId = function(a) {
  this.profile.accountId = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getAccountId = function() {
  return this.profile.accountId
};
com.art.core.vos.User.prototype.setAccountType = function(a) {
  this.profile.accountType = this.normalizeAccountType(a)
};
com.art.core.vos.User.prototype.getAccountType = function() {
  if (this.state.initialized.profile) {
    return this.profile.accountType
  } else {
    return this.cookie.cookieGetStateData().accountType
  }
};
com.art.core.vos.User.prototype.setUserName = function(a) {
  this.profile.username = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getUserName = function() {
  return this.profile.username
};
com.art.core.vos.User.prototype.setFirstName = function(a) {
  this.profile.firstName = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getFirstName = function() {
  return this.profile.firstName
};
com.art.core.vos.User.prototype.setLastName = function(a) {
  this.profile.lastName = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getLastName = function() {
  return this.profile.lastName
};
com.art.core.vos.User.prototype.setEmail = function(a) {
  this.profile.email = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getEmail = function() {
  return this.profile.email
};
com.art.core.vos.User.prototype.setEmailFormat = function(a) {
  if (a == this.constants.emailFormat.html || a == this.constants.emailFormat.text) {
    this.profile.emailFormat = this.normalizeEmpty(a)
  }
};
com.art.core.vos.User.prototype.getEmailFormat = function() {
  return this.profile.emailFormat
};
com.art.core.vos.User.prototype.setProfileKey = function(a) {
  this.profile.profileKey = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getProfileKey = function() {
  return this.profile.profileKey
};
com.art.core.vos.User.prototype.getProfileUrl = function() {
  return this.profile.profileKey
};
com.art.core.vos.User.prototype.setPublicAlias = function(a) {
  this.profile.publicAlias = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getPublicAlias = function() {
  return this.profile.publicAlias
};
com.art.core.vos.User.prototype.setSocialPartner = function(c) {
  try {
    if (typeof c != "null" && typeof c != "undefined") {
      this.profile.socialPartner.userId = c.UserID;
      this.profile.socialPartner.token = c.token
    }
  } catch(a) {}
};
com.art.core.vos.User.prototype.getSocialPartner = function() {
  return this.profile.socialPartner
};
com.art.core.vos.User.prototype.setTitle = function(a) {
  this.curator.title = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getTitle = function() {
  return this.curator.title
};
com.art.core.vos.User.prototype.setBiography = function(a) {
  this.curator.biography = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getBiography = function() {
  return this.curator.biography
};
com.art.core.vos.User.prototype.setInspiration = function(a) {
  this.curator.inspiration = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getInspiration = function() {
  return this.curator.inspiration
};
com.art.core.vos.User.prototype.setLocation = function(a, d, f, m, n, h, j, k, l) {
  var e = this.curator.location;
  e.address1 = a;
  e.address2 = d;
  e.city = f;
  e.state = m;
  e.country = h;
  e.countryIsoA2 = j;
  e.countryIsoA3 = k;
  e.county = l;
  e.zip = n
};
com.art.core.vos.User.prototype.getLocation = function() {
  return this.curator.location
};
com.art.core.vos.User.prototype.setLinks = function(c) {
  var a;
  if (c != undefined) {
    for (a = 0; a < c.length; a++) {
      this.curator.links[a] = {
        httpUrl: c[a].HttpUrl,
        linkType: c[a].LinkType
      }
    }
  }
};
com.art.core.vos.User.prototype.getLinks = function() {
  return this.curator.links
};
com.art.core.vos.User.prototype.setCompanyName = function(a) {
  this.curator.location.companyName = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getCompanyName = function() {
  return this.curator.location.companyName
};
com.art.core.vos.User.prototype.setPhoneNumbers = function(a) {
  this.curator.location.phone = this.normalizeEmpty(a)
};
com.art.core.vos.User.prototype.getPhoneNumbers = function() {
  return {
    primary: this.curator.location.phone,
    secondary: ""
  }
};
com.art.core.vos.User.prototype.setProfileImageZoom = function(e, a, d, c) {
  this.curator.profileImage.zoom.width = e;
  this.curator.profileImage.zoom.height = a;
  this.curator.profileImage.zoom.http = d;
  this.curator.profileImage.zoom.https = c
};
com.art.core.vos.User.prototype.getProfileImageZoom = function() {
  return this.curator.profileImage.zoom
};
com.art.core.vos.User.prototype.setProfileImageLarge = function(e, a, d, c) {
  this.curator.profileImage.large.width = e;
  this.curator.profileImage.large.height = a;
  this.curator.profileImage.large.http = d;
  this.curator.profileImage.large.https = c
};
com.art.core.vos.User.prototype.getProfileImageLarge = function() {
  return this.curator.profileImage.large
};
com.art.core.vos.User.prototype.setProfileImageMedium = function(e, a, d, c) {
  this.curator.profileImage.medium.width = e;
  this.curator.profileImage.medium.height = a;
  this.curator.profileImage.medium.http = d;
  this.curator.profileImage.medium.https = c
};
com.art.core.vos.User.prototype.getProfileImageMedium = function() {
  return this.curator.profileImage.medium
};
com.art.core.vos.User.prototype.setProfileImageSmall = function(e, a, d, c) {
  this.curator.profileImage.small.width = e;
  this.curator.profileImage.small.height = a;
  this.curator.profileImage.small.http = d;
  this.curator.profileImage.small.https = c
};
com.art.core.vos.User.prototype.getProfileImageSmall = function() {
  return this.curator.profileImage.small
};
com.art.core.vos.User.prototype.setProfileImageThumb = function(e, a, d, c) {
  this.curator.profileImage.thumb.width = e;
  this.curator.profileImage.thumb.height = a;
  this.curator.profileImage.thumb.http = d;
  this.curator.profileImage.thumb.https = c
};
com.art.core.vos.User.prototype.getProfileImageThumb = function() {
  return this.curator.profileImage.thumb
};
com.art.core.vos.User.prototype.updateUserProfileFromServer = function(e) {
  if (e.AuthenticationToken != undefined) {
    this.setAuthenticationToken(e.AuthenticationToken);
    this.state.initialized.session = true
  }
  if (e.Account != null && e.Account != undefined) {
    var a = e.Account.ProfileInfo;
    this.setAccountId(a.AccountId);
    this.setAccountType(a.AccountType);
    this.setEmail(a.EmailAddress);
    this.setEmailFormat(a.EmailFormat);
    this.setUserName(a.UserName);
    this.setFirstName(a.FirstName);
    this.setLastName(a.LastName);
    this.setProfileKey(a.ProfileKey);
    this.setPublicAlias(a.PublicAlias);
    this.setSocialPartner(a.SocialPartner);
    this.state.initialized.profile = true;
    var c = e.Account.CuratorInfo;
    if (c != null && c != undefined) {
      this.setTitle(c.Title);
      this.setBiography(c.Biography);
      this.setInspiration(c.Inspiration);
      if (c.Location != undefined && c.Location != null) {
        this.setLocation(c.Location.Address1, c.Location.Address2, c.Location.City, c.Location.State, c.Location.ZipCode, c.Location.Country, c.Location.CountryIsoA2, c.Location.CountryIsoA3, c.Location.County);
        this.setPhoneNumbers(c.Location.Phone)
      }
      this.setLinks(c.Links);
      if (c.ProfileImage != undefined && c.ProfileImage != null) {
        var d = c.ProfileImage.LargeImage;
        if (d != null) {
          this.setProfileImageZoom(d.Dimensions.Width, d.Dimensions.Height, d.HttpImageURL, d.HttpsImageURL)
        }
        d = c.ProfileImage.LargeImage;
        if (d != null) {
          this.setProfileImageLarge(d.Dimensions.Width, d.Dimensions.Height, d.HttpImageURL, d.HttpsImageURL)
        }
        d = c.ProfileImage.MediumImage;
        if (d != null) {
          this.setProfileImageMedium(d.Dimensions.Width, d.Dimensions.Height, d.HttpImageURL, d.HttpsImageURL)
        }
        d = c.ProfileImage.SmallImage;
        if (d != null) {
          this.setProfileImageSmall(d.Dimensions.Width, d.Dimensions.Height, d.HttpImageURL, d.HttpsImageURL)
        }
        d = c.ProfileImage.ThumbnailImage;
        if (d != null) {
          this.setProfileImageThumb(d.Dimensions.Width, d.Dimensions.Height, d.HttpImageURL, d.HttpsImageURL)
        }
      }
      this.state.initialized.curator = true
    }
  }
};
com.art.core.vos.User.prototype.isPublicAliasChosen = function() {
  if (this.profile.publicAlias == null || this.profile.publicAlias == undefined || this.profile.publicAlias == "") {
    return false
  } else {
    return true
  }
};
com.art.core.vos.User.prototype.isFacebookUser = function() {
  var c = false;
  try {
    c = this.isAccountTypeFacebook()
  } catch(a) {}
  return c
};
com.art.core.vos.User.prototype.normalizeAccountType = function(f) {
  var d = this.accountTypes;
  var c = d.Unknown;
  try {
    if (f == undefined) {
      return c
    }
  } catch(a) {
    return c
  }
  switch (f.toString()) {
  case d.Anonymous:
  case d.Default:
  case d.Facebook:
    return f.toString();
    break;
  default:
    return c;
    break
  }
};
com.art.core.vos.User.prototype.normalizeEmpty = function(a) {
  return a == undefined || a == null ? "": a
};
com.art.core.vos.User.prototype.isLoggedIn = function() {
  var a = this.cookie.cookieGetStateData();
  if (a.authToken.length > 0) {
    return true
  } else {
    return false
  }
};
com.art.core.vos.User.prototype.isAccountTypeAnonymous = function() {
  var a = this.cookie.cookieGetStateData();
  if (a.accountType == this.accountTypes.Anonymous) {
    return true
  } else {
    return false
  }
};
com.art.core.vos.User.prototype.isAccountTypeDefault = function() {
  var a = this.cookie.cookieGetStateData();
  if (a.accountType == this.accountTypes.Default) {
    return true
  } else {
    return false
  }
};
com.art.core.vos.User.prototype.isAccountTypeFacebook = function() {
  var a = this.cookie.cookieGetStateData();
  if (a.accountType == this.accountTypes.Facebook) {
    return true
  } else {
    return false
  }
};
com.art.core.vos.User.prototype.getDisplayName = function() {
  var a = this.getPublicAlias();
  if (a.length == 0) {
    a = this.getFirstName()
  }
  if (a.length == 0) {
    a = this.getEmail()
  }
  return a
};
com.art.core.vos.Application = function() {
  this.apiKey = "";
  this.applicationId = "";
  this.customerZoneId = "";
  this.imageDomain = "";
  this.translationApplicationId = "";
  this.servicePriceBucketId = "";
  this.photosToArtApnum = "";
  this.serviceUrls = {};
  this.serviceUrls.ecommerceApi = "";
  this.serviceUrls.authenticationApi = "";
  this.serviceUrls.logApi = ""
};
com.art.core.vos.Application.prototype.setApiKey = function(a) {
  this.apiKey = a
};
com.art.core.vos.Application.prototype.getApiKey = function() {
  return this.apiKey
};
com.art.core.vos.Application.prototype.setApplicationId = function(a) {
  this.applicationId = a
};
com.art.core.vos.Application.prototype.getApplicationId = function() {
  return this.applicationId
};
com.art.core.vos.Application.prototype.setCustomerZoneId = function(a) {
  this.customerZoneId = a
};
com.art.core.vos.Application.prototype.getCustomerZoneId = function() {
  return this.customerZoneId
};
com.art.core.vos.Application.prototype.setImageDomain = function(a) {
  this.imageDomain = a
};
com.art.core.vos.Application.prototype.getImageDomain = function() {
  return this.imageDomain
};
com.art.core.vos.Application.prototype.setTranslationApplicationId = function(a) {
  this.translationApplicationId = a
};
com.art.core.vos.Application.prototype.getTranslationApplicationId = function() {
  return this.translationApplicationId
};
com.art.core.vos.Application.prototype.setServiceUrlEcommerceApi = function(a) {
  this.serviceUrls.ecommerceApi = a
};
com.art.core.vos.Application.prototype.getServiceUrlEcommerceApi = function() {
  return this.serviceUrls.ecommerceApi
};
com.art.core.vos.Application.prototype.setServiceUrlAuthenticationApi = function(a) {
  this.serviceUrls.authenticationApi = a
};
com.art.core.vos.Application.prototype.getServiceUrlAuthenticationApi = function() {
  return this.serviceUrls.authenticationApi
};
com.art.core.vos.Application.prototype.setServiceUrlLogApi = function(a) {
  this.serviceUrls.logApi = a
};
com.art.core.vos.Application.prototype.getServiceUrlLogApi = function() {
  return this.serviceUrls.logApi
};
com.art.core.vos.Environment = function(c, a) {
  this.properties = {};
  this.name = com.art.core.vos.Environment.NAME;
  this.initialized = false;
  this.isError = false;
  this.loadInterval = null;
  this.timeoutSeconds = 10;
  this.knownAppVars = com.art.core.vos.Environment.knownAppVars;
  this.cookieNames = {
    cdEnvLoaded: "arts",
    cEnvLoaded: "EnviromentLoaded"
  };
  $.updateObject(this.cookieName, c);
  this.config = {
    serviceUrlGetEnvironment: "/asp/include/global/environment.asp"
  };
  $.updateObject(this.config, a)
};
com.art.core.vos.Environment.NAME = "Environment";
com.art.core.vos.Environment.knownAppVars = {
  visualSearch: "visualSearchCoreEnvironment",
  myGalleries: "MyGalleriesEnvironmentVariables",
  photosToArt: "photosToArtCoreEnvironment",
  defaultName: "javascriptEnvironment"
};
com.art.core.vos.Environment.prototype.init = function(a) {
  this.getFromLocalStorage();
  if ($.hasProperties(this.properties)) {
    this.initialized = true
  }
  if (a !== undefined && typeof a == "object" && $.hasProperties(a)) {
    $.updateObject(this.properties, a);
    this.setToLocalStorage();
    this.initialized = true
  }
  if (!this.initialized) {
    this.getFromService()
  }
  this.overrideStateValues();
  window.MyGalleriesEnvironmentVariables = this.properties;
  window.visualSearchCoreEnvironment = this.properties
};
com.art.core.vos.Environment.prototype.overrideStateValues = function() {
  var a = new com.art.core.cookie.Cookie(this.cookieNames);
  var e = a.cookieGetStateData();
  var d = {
    authToken: e.authToken,
    accountType: e.accountType,
    profileURL: e.profileUrl,
    sessionId: e.sessionId,
    persistentId: e.persistentId
  };
  $.updateObject(this.properties, d);
  this.setToLocalStorage()
};
com.art.core.vos.Environment.prototype.getFromLocalStorage = function() {
  try {
    if (store.get(this.name) != undefined) {
      this.properties = store.get(this.name);
      return true
    }
  } catch(a) {
    return false
  }
  return false
};
com.art.core.vos.Environment.prototype.setToLocalStorage = function() {
  try {
    store.set(this.name, this.properties);
    if (store.get(this.name)) {
      var a = new com.art.core.cookie.Cookie();
      a.setCookieDynamic(this.cookieNames.cdEnvLoaded, this.cookieNames.cEnvLoaded, "", "true")
    }
  } catch(c) {}
};
com.art.core.vos.Environment.prototype.deleteFromLocalStorage = function() {
  try {
    store.remove(this.NAME);
    var a = new com.art.core.cookie.Cookie();
    var e = new Date();
    var d = new Date(e.getFullYear() + 2, e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
    a.setCookieDynamic(this.cookieNames.cdEnvLoaded, this.cookieNames.cEnvLoaded, d, "false")
  } catch(c) {}
};
com.art.core.vos.Environment.prototype.updateEnvironment = function(a) {
  $.updateObject(this.properties, a);
  this.setToLocalStorage()
};
com.art.core.vos.Environment.prototype.getFromService = function() {
  var a = this;
  a.getFromServiceSuccess.environmentObject = this;
  $.ajax({
    type: "GET",
    url: a.config.serviceUrlGetEnvironment + "?forceload=true",
    cache: false,
    async: false,
    success: a.getFromServiceSuccess,
    failure: a.getFromServiceFailure
  })
};
com.art.core.vos.Environment.prototype.getFromServiceSuccess = function(response) {
  var o = this.success.environmentObject;
  eval(response);
  jQuery.each(o.knownAppVars,
  function(j, valj) {
    try {
      o.updateEnvironment(eval(valj))
    } catch(err) {}
  });
  o.initialized = true
};
com.art.core.vos.Environment.prototype.getFromServiceFailure = function(a) {
  if (!this.environmentObject.isError) {
    this.environmentObject.getFromService()
  }
};
com.art.core.vos.Environment.logIn = function(c, a) {
  var d = new com.art.core.vos.Environment(c, a);
  d.deleteFromLocalStorage();
  window.MyGalleriesEnvironmentVariables = {}
};
com.art.core.vos.Environment.logOut = function(c, a) {
  var d = new com.art.core.vos.Environment(c, a);
  d.deleteFromLocalStorage();
  window.MyGalleriesEnvironmentVariables = {}
};
com.art.core.vos.Environment.updateKey = function(c, d) {
  var a = new com.art.core.vos.Environment();
  a.getFromLocalStorage();
  $.updateObject(a.properties, {
    key: d
  });
  a.setToLocalStorage()
};
com.art.core.controller.Controller = {};
com.art.core.controller.Controller.registeredObjects;
com.art.core.controller.Controller.register = function(d, a, e) {
  if (com.art.core.controller.Controller.registeredObjects == null) {
    com.art.core.controller.Controller.registeredObjects = new Array()
  }
  for (var c = 0; c < com.art.core.controller.Controller.registeredObjects.length; c++) {
    if (com.art.core.controller.Controller.registeredObjects[c].notification == d && com.art.core.controller.Controller.registeredObjects[c].handler == a && com.art.core.controller.Controller.registeredObjects[c].thisObj == e) {
      warning("Controller > register > Duplicate registration detected. notification=" + d + ", obj to follow.");
      warning(e);
      return
    }
  }
  com.art.core.controller.Controller.registeredObjects.push({
    notification: d,
    handler: a,
    thisObj: e
  })
};
com.art.core.controller.Controller.notify = function(d, a) {
  verbose('Controller > notify > received notification "' + d + '". args=' + a);
  if (com.art.core.controller.Controller.registeredObjects == null) {
    com.art.core.controller.Controller.registeredObjects = new Array()
  }
  for (var c = 0; c < com.art.core.controller.Controller.registeredObjects.length; c++) {
    var e = com.art.core.controller.Controller.registeredObjects[c];
    if (e.notification == d) {
      superVerbose("Controller > notify > calling handler. notification=" + d + ", thisObj=" + e.thisObj + ", args=" + a + ", handler=" + e.handler);
      e.handler.call(e.thisObj, a)
    }
  }
};
com.art.core.controller.Controller.dump = function() {
  for (var c = 0; c < com.art.core.controller.Controller.registeredObjects.length; c++) {
    var e = com.art.core.controller.Controller.registeredObjects[c];
    var d = e.notification;
    var a = e.handler;
    var f = e.thisObj;
    if (f instanceof JMVC_Component) {
      f = "[Component: " + f.tagName + "#" + f.id + "]"
    }
    info("Controller > dump > #" + c + ": \n\tnotification=" + e.notification + " \n\tthisObj=" + f + " \n\thandler=" + a)
  }
};
var Controller = com.art.core.controller.Controller;
com.art.core.jvml.TagFinder = function(a) {
  this.componentLibrary = a.getComponentLibrary();
  this.methods = {
    attribute: "attribute",
    tagName: "tagName",
    tagNameWithPrefix: "tagNameWithPrefix",
    xmlNamespace: "xmlNamespace"
  };
  this.method = this.methods.attribute;
  this.parms = {
    attribute: "data-tagName",
    prefix: "jvml_",
    namespace: "http://www.art.com/jvml"
  }
};
$art.p = com.art.core.jvml.TagFinder.prototype;
$art.p.setMethod = function(a) {
  this.method = a
};
$art.p.findTags = function(c, a) {
  var d = this.method;
  if (a && a.method) {
    d = a.method
  }
  switch (d) {
  case this.methods.attribute:
    return this.getTagsByAttribute(c, a);
  case this.methods.xmlNamespace:
    return this.getTagsByXMLNamespace(c, a);
  case this.methods.tagNameWithPrefix:
    a.usePrefix = true;
  case this.methods.tagName:
    return this.getTagsByTagName(c, a);
  default:
    error('com.art.core.jvml.TagFinder > findTags > unknown method: "' + d + '".')
  }
};
$art.p.getTagsByAttribute = function(f, a) {
  var c = this.parms.attribute;
  if (!a) {
    a = {}
  }
  var e = a.componentName;
  var q = [];
  var r = ($ == true) && (f == document || f == document.body);
  var m = "";
  var d = c + (e ? "=" + e: "");
  if (r) {
    m = "[data-" + c + (e ? "=" + e: "") + "]";
    q = $(m)
  } else {
    var o = f.getElementsByTagName("*");
    for (var h = 0; h < o.length; h++) {
      if (o[h].hasAttribute(d)) {
        q.push(o[h])
      }
    }
  }
  if (a.returnConstructors) {
    var n = [];
    for (var h = 0; h < q.length; h++) {
      var l = this.getNodeWithFactory(q[h], q[h].getAttribute(c));
      l.method = "attribute";
      l.attribute = c;
      n.push(l)
    }
    return n
  } else {
    if (a.findComponents) {
      var n = [];
      if (!a.components || !a.components.length) {
        error("com.art.core.jvml.TagFinder > getTagsByAttribute > failed! args.components was not supplied.");
        return
      }
      for (var h = 0; h < q.length; h++) {
        var p = q[h];
        for (var k = 0; k < a.components.length; k++) {}
      }
      return n
    } else {
      return q
    }
  }
};
$art.p.getTagsByTagName = function(e, a) {
  if (!a) {
    a = {}
  }
  var j = this.parms.prefix;
  var n = (a && a.usePrefix) ? a.usePrefix: false;
  var c = (a && a.componentName) ? a.componentName: false;
  var d = (a && a.componentsOnly) ? a.componentsOnly: false;
  var k = c ? c: "*";
  var m = e.getElementsByTagName(k);
  if (a.returnConstructors) {
    var l = [];
    for (var f = 0; f < m.length; f++) {
      var h = this.getNodeWithFactory(m[f], m[f].tagName);
      if (!h) {
        continue
      }
      h.method = "tagName";
      if (n) {
        h.method += "WithPrefix"
      }
      h.prefix = j;
      l.push(h)
    }
    return l
  } else {
    if (d) {
      var l = [];
      for (var f = 0; f < m.length; f++) {
        if (this.findRawComponent(m[f].tagName) == null) {
          continue
        }
        l.push(m[f])
      }
      return l
    } else {
      return m
    }
  }
};
$art.p.getTagsByXMLNamespace = function(e, a) {
  if (!a) {
    a = {}
  }
  var j = this.parms.prefix;
  var n = (a && a.usePrefix) ? a.usePrefix: false;
  var c = (a && a.componentName) ? a.componentName: false;
  var d = (a && a.componentsOnly) ? a.componentsOnly: false;
  var k = c ? c: "*";
  var m = e.getElementsByTagNameNS("http://www.art.com/jvml", k);
  if (a.returnConstructors) {
    var l = [];
    for (var f = 0; f < m.length; f++) {
      var h = this.getNodeWithFactory(m[f], m[f].localName);
      if (!h) {
        continue
      }
      h.method = "tagName";
      if (n) {
        h.method += "WithPrefix"
      }
      h.prefix = j;
      l.push(h)
    }
    return l
  } else {
    if (d) {
      var l = [];
      for (var f = 0; f < m.length; f++) {
        if (this.findRawComponent(m[f].localName) == null) {
          continue
        }
        l.push(m[f])
      }
      return l
    } else {
      return m
    }
  }
};
$art.p.getNodeWithFactory = function(d, e) {
  var a = this.findRawComponent(e);
  if (!a) {
    return null
  }
  var c = {};
  c.tag = d;
  c.compConstructor = a.compConstructor;
  c.compPrototype = a.compPrototype;
  return c
};
$art.p.findRawComponent = function(f) {
  var c = this.componentLibrary;
  var a = null;
  var d = null;
  for (var e = 0; e < c.length; e++) {
    if (c[e].prototype.tagName && c[e].prototype.tagName.toUpperCase() == f.toUpperCase()) {
      a = c[e];
      d = c[e].prototype;
      break
    }
  }
  if (d == null) {
    verbose('JMVC_Parser > parse > could not find component for tag "' + f + '". Tag is assumed to be HTML, not a JMVC_Component.');
    return null
  }
  return {
    compPrototype: d,
    compConstructor: a
  }
};
delete $art.p;
com.art.core.jvml.Parser = function(a) {
  this.renderer = a.renderer;
  this.tagFinder = a.tagFinder;
  this.componentLibrary = a.getComponentLibrary();
  this.components = [];
  this.itemRenderers = []
};
$art.p = com.art.core.jvml.Parser.prototype;
$art.p.parse = function(f, a) {
  var e = f;
  var l = (a && a.method) ? a.method: null;
  var p = this.tagFinder.findTags(e, {
    componentName: "itemRenderer",
    returnConstructors: true,
    method: l
  });
  var k = [];
  var s = (a && a.skipItemRenderers) ? true: false;
  for (var h = p.length - 1; h >= 0; h--) {
    var o = $art.ObjectUtil.cloneObject(p[h]);
    o.tag = o.tag.cloneNode(true);
    var j = this.parseNode(o, null, a);
    if (j && !s) {
      k.push(j)
    }
    p[h].tag.parentNode.setAttribute("itemRendererId", j.id);
    p[h].tag.parentNode.removeChild(p[h].tag)
  }
  if (!s && k.length > 0) {
    this.itemRenderers = k
  } else {
    k = this.itemRenderers
  }
  p = this.tagFinder.findTags(e, {
    returnConstructors: true,
    method: l
  });
  var d = [];
  for (var h = 0; h < p.length; h++) {
    var o = $art.ObjectUtil.cloneObject(p[h]);
    var q = o.tag;
    o.tag = q.cloneNode(true);
    var c = this.parseNode(o, k, a);
    d.push(c);
    if (q.getAttribute("id") == null) {
      q.setAttribute("id", c.id);
      q.setAttribute("data-hasAnonymousId", "true")
    }
  }
  for (var h = 0; h < d.length; h++) {
    var c = d[h];
    var m = c.originalTag;
    var r = null;
    do {
      m = m.parentNode;
      if (m == document.body || m == document || m == null) {
        break
      }
      if (m.isComponent) {
        r = m;
        break
      }
    } while ( true );
    c.parentNode = r
  }
  return d
};
$art.p.parseNode = function(q, n, a) {
  var t = q.tag;
  var l = q.compPrototype;
  var f = q.compConstructor;
  var c = {};
  if (!l.publicProperties || !l.publicProperties.length) {
    error('com.art.core.jvml.Parser > parseNode > component prototype does not have a "publicProperties" property. This must exist, and be populated with an array of strings representing which properties of the component are exposed as JVML attributes.');
    return
  }
  for (var o = 0; o < l.publicProperties.length; o++) {
    var r = l.publicProperties[o];
    var s = t.getAttribute(r.name);
    if (s == null || typeof(s) == "undefined") {
      s = t.getAttribute(r.name.toLowerCase())
    }
    if (r.useIfNull || !isNullOrEmpty(s)) {
      c[r.name] = s
    }
    for (var p = 0; p < t.childNodes.length; p++) {
      var d = t.childNodes[p];
      if (d.tagName && d.tagName.toUpperCase() == r.name.toUpperCase()) {
        var e = d.innerHTML ? d.innerHTML: $art.XMLUtil.XMLToString(d, "innerXML");
        if (r.useIfNull || !isNullOrEmpty(e)) {
          c[r.name] = e;
          t.childNodes[p].parentNode.removeChild(d)
        }
      }
    }
  }
  if (!c.id || (a && a.forceReissueAnonymousId)) {
    c.id = this.generateUniqueId(q);
    t.setAttribute("id", c.id);
    t.setAttribute("data-hasAnonymousId", "true")
  }
  var m = {};
  for (var o = 0; o < t.attributes.length; o++) {
    if (! (t.attributes[o].name in c)) {
      m[t.attributes[o].name] = t.attributes[o].value
    }
  }
  var h = new f(c);
  h.id = c.id;
  h.htmlAttributes = m;
  h.innerHTML = isNull(t.innerHTML) ? $art.XMLUtil.XMLToString(t, "innerXML") : t.innerHTML;
  h.tag = t.cloneNode(true);
  h.originalTag = t;
  if (c.itemRendererId) {
    for (var o = 0; o < n.length; o++) {
      if (n[o].id.toUpperCase() == c.itemRendererId.toUpperCase()) {
        h.itemRenderer = n[o];
        break
      }
    }
    if (!h.itemRenderer) {
      error('com.art.core.jvml.Parser > parseNode > could not find itemRenderer with id "' + c.itemRendererId + '" for component "' + h.tagName + "#" + h.id + '".')
    }
  }
  return h
};
$art.p._uniqueIds = {};
$art.p.generateUniqueId = function(c, a) {
  var d = c.tag;
  var e;
  switch (c.method) {
  case "attribute":
    e = d.getAttribute(c.attribute);
    break;
  case "tagName":
    e = d.tagName;
    break;
  case "tagNameWithPrefix":
    e = c.prefix + d.tagName;
    break;
  default:
    error('com.art.core.jvml.Parser > generateUniqueId > unknown method "' + c.method + '". Aborting.');
    return
  }
  if (a) {
    e += a
  }
  if (typeof(this._uniqueIds[e]) == "undefined") {
    this._uniqueIds[e] = 0
  } else {
    this._uniqueIds[e]++
  }
  return e + this._uniqueIds[e]
};
delete $art.p;
com.art.core.jvml.Renderer = function(a) {
  this.parser = a.parser;
  this.tagFinder = a.tagFinder
};
$art.p = com.art.core.jvml.Renderer.prototype;
$art.p.render = function(d, e, a) {
  var l = (a && a.method) ? a.method: this.tagFinder.method;
  var p = this.tagFinder.findTags(e, {
    componentsOnly: true,
    method: l
  });
  for (var f = 0; f < p.length; f++) {
    var o = p[f];
    var h = o.getAttribute("id");
    if (!this.parser.idWatchList) {
      this.parser.idWatchList = []
    }
    var q = true;
    for (var k = 0; k < this.parser.idWatchList.length; k++) {
      if (this.parser.idWatchList[k] == h) {
        q = false;
        break
      }
    }
    if (!q) {
      continue
    }
    var c = null;
    if (!h) {
      warn("this > render > component has no ID! should never see this")
    } else {
      for (var k = 0; k < d.length; k++) {
        if (d[k].id == h) {
          c = d[k];
          break
        }
      }
    }
    if (!c) {
      error('this > render > error! Could not find component for tag with id "' + h + '". Tag to follow.');
      error(o);
      return
    }
    if (o.getAttribute("data-hasAnonymousId") == "true") {
      var m = this.generateUniqueId(o, l, "_anon");
      o.setAttribute("id", m);
      c.id = m;
      c.idIsImmune = true
    }
    var n = c.render();
    if (o.insertAdjacentHTML) {
      o.insertAdjacentHTML("afterEnd", n);
      o.parentNode.removeChild(o)
    } else {
      $art.XMLUtil.insertAdjacentXML(n, o.ownerDocument, o, "afterEnd")
    }
    if (e == document || e.parentNode) {
      c.onDOMInsertion(c)
    }
  }
  return e
};
$art.p._uniqueIds = {};
$art.p.generateUniqueId = function(d, c, a) {
  var e;
  if (!c) {
    c = this.tagFinder.parms.method
  }
  switch (c) {
  case "attribute":
    e = d.getAttribute(this.tagFinder.parms.attribute);
    break;
  case "tagName":
  case "xmlNamespace":
    e = d.tagName;
    break;
  case "tagNameWithPrefix":
    e = node.prefix + d.tagName;
    break;
  default:
    error('com.art.core.jvml.Renderer > generateUniqueId > unknown method "' + c + '". Aborting.');
    return
  }
  if (a) {
    e += a
  }
  if (typeof(this._uniqueIds[e]) == "undefined") {
    this._uniqueIds[e] = 0
  } else {
    this._uniqueIds[e]++
  }
  return e + this._uniqueIds[e]
};
delete $art.p;
com.art.core.jvml.Databinding = {};
com.art.core.jvml.Databinding.bind = function(f, h, c) {
  if (!isNull(f[h])) {
    if (typeof(f["_" + h]) != "undefined" && !c) {
      verbose('JMVC_Databinding > bind > ERROR: cannot bind property "' + h + '", as property "_' + h + '" already exists in parent object. Object to follow.');
      verbose(f);
      return
    }
    f["_" + h] = f[h]
  }
  var k = f["_" + h];
  var j = true;
  f.dataBindingTag = j;
  if (typeof(k) == "object") {
    for (var d in k) {
      if (typeof(k[d]) == "function") {
        continue
      }
      if (!k.hasOwnProperty(d)) {
        continue
      }
      if (d.substr(0, 1) == "_") {
        continue
      }
      com.art.core.jvml.Databinding.bind(k, d, "_" + d)
    }
  }
  try {
    Object.defineProperty(f, h, {
      get: function() {
        return f["_" + h]
      },
      set: function(e) {
        f["_" + h] = e;
        com.art.core.jvml.Databinding.requestUpdate({
          object: f,
          propertyName: h,
          value: e
        })
      },
      enumerable: false
    })
  } catch(a) {
    try {
      f.__defineGetter__(h,
      function() {
        return k
      });
      f.__defineSetter__(h,
      function(e) {
        k = e;
        com.art.core.jvml.Databinding.requestUpdate({
          object: f,
          value: e
        })
      })
    } catch(a) {
      try {
        f.get = function() {
          return k
        };
        f.set = function(e) {
          k = e;
          com.art.core.jvml.Databinding.requestUpdate({
            object: f,
            value: e
          })
        }
      } catch(a) {
        error("JMVC_Databinding > bind > ERROR: Browser does not support either method of assigning getters.")
      }
    }
  }
};
com.art.core.jvml.Databinding.timer;
com.art.core.jvml.Databinding.timeWindow = 50;
com.art.core.jvml.Databinding.requestUpdate = function(a) {
  if (com.art.core.jvml.Databinding.timer) {
    window.clearTimeout(com.art.core.jvml.Databinding.timer)
  }
  com.art.core.jvml.Databinding.timer = window.setTimeout(function() {
    com.art.core.controller.Controller.notify("DataBoundValueChanged", a)
  },
  com.art.core.jvml.Databinding.timeWindow)
};
$art.update = com.art.core.jvml.Databinding.requestUpdate;
if (Object.prototype.__defineGetter__ && !Object.defineProperty) {
  Object.defineProperty = function(c, d, a) {
    if ("get" in a) {
      c.__defineGetter__(d, a.get)
    }
    if ("set" in a) {
      c.__defineSetter__(d, a.set)
    }
  }
}
com.art.core.jvml.Databinding.evaluate = function(strToEval, thisObj) {
  superVerbose('Databinding > evaluate > evaluating "' + strToEval + '". thisObj to follow...');
  superVerbose(thisObj);
  if (typeof(strToEval) != "string") {
    return "(?)"
  }
  if (strToEval.substr(0, 1) == "{" && strToEval.substr( - 1, 1) == "}") {
    strToEval = strToEval.substr(1, strToEval.length - 2)
  }
  try {
    return eval("thisObj." + strToEval)
  } catch(e) {
    try {
      return eval(strToEval)
    } catch(e) {
      error('Databinding > evaluate > could not evaluate string "' + strToEval + '" in either context. thisObj to follow...');
      error(thisObj)
    }
  }
  return "(?)"
};
$art.databind = com.art.core.jvml.Databinding.bind;
$art.g = function(a) {
  return document.getElementById(a)
};
$art.gv = function(c, a) {
  return $art.getValue(c, a)
};
$art.getValue = function(c, a) {
  var d = g(c);
  if (d == null) {
    return a != null ? a: ""
  }
  switch (d.tagName) {
  case "DIV":
  case "P":
  case "SPAN":
  case "TEXTAREA":
    return d.innerHTML;
  case "INPUT":
  case "SELECT":
    return d.value;
  default:
    warn('getValue > failed to anticipate tagName "' + d.tagName + '".');
    return a
  }
};
$art.sv = function(a, c) {
  return $art.setValue(a, c)
};
$art.setValue = function(a, c) {
  if (typeof(a) == "string") {
    a = g(a)
  }
  if (a != null) {
    switch (a.tagName) {
    case "DIV":
    case "P":
    case "SPAN":
    case "TEXTAREA":
    case "TD":
    case "TH":
      a.innerHTML = c;
      break;
    case "INPUT":
    case "SELECT":
      a.value = c;
      break;
    default:
      error('setValue > failed to anticipate tagName "' + a.tagName + '".');
      return
    }
  } else {
    warn('setValue > could not set value for "' + id + '" as the element was null.')
  }
};
$art.addClass = function(c, a) {
  if (c.className == "") {
    c.className = a
  } else {
    c.className += " " + a
  }
};
$art.removeClass = function(c, a) {
  c.className = c.className.replace(a, "");
  c.className = c.className.trim()
};
$art.q = function(c, a) {
  return $art.query(c, a)
};
$art.qs = function(c, a) {
  return $art.querySingle(c, a)
};
$art.querySingle = function(d, a) {
  var c = $art.query(d, a);
  if (c.length > 0) {
    return c[0]
  } else {
    return null
  }
};
$art.query = function(h, c) {
  if (typeof(h) == "undefined" || h == null) {
    return null
  }
  if (c == null) {
    c = document
  }
  var d = function(j) {
    switch (j) {
    case "core":
      return "http://www.diluvian.net/jmvc";
    case "app":
      return "js/app";
    default:
      die('unknown namespace prefix "' + j + '"')
    }
  };
  var e = c.evaluate(h, c, d, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var a = 0;
  var f = [];
  var c = e.iterateNext();
  if (c) {
    f.push(c)
  }
  while (c) {
    c = e.iterateNext();
    if (c) {
      f.push(c)
    }
  }
  return f
};
function b(a, c, d) {
  error("Utils > b > this function is obsolete. Use UIUtil.bind() instead.")
}
var getComponentById = function(a) {
  error("getComponentById > this function is disabled. please use $art.jvml.getComponentById.")
};
$art.getComponentById = function(a) {
  warn("$art.getComponentById > deprecated. Please use $art.jvml.getComponentById.");
  return $art.jvml.getComponentById(a)
};
$art.isNumeric = function(a) {
  return ! isNaN(parseInt(a))
};
$art.ieGet = function(e, a, d) {
  var f = new XDomainRequest();
  f.open("GET", e);
  f.onload = function() {
    d(f.responseText)
  };
  if (a) {
    for (var c in a) {
      f.setRequestHeader(c, a[c])
    }
  }
  f.send()
};
$art.get = function(f, c, e) {
  var h = new XMLHttpRequest();
  var a = typeof(e) == "function";
  h.open("GET", f, a);
  if (c) {
    for (var d in c) {
      h.setRequestHeader(d, c[d])
    }
  }
  if (a) {
    h.onreadystatechange = function() {
      if (h.readyState == 4 && h.status == 200) {
        e(h.responseText);
        h.onreadystatechange = function() {}
      }
    }
  }
  h.send();
  if (!a) {
    return h.responseText
  }
};
$art.post = function(h, c, f, e) {
  var j = new XMLHttpRequest();
  var a = typeof(e) == "function";
  var d = "POST";
  if (f && f.proxyUrl) {
    h = f.proxyUrl + "?url=" + escape(h);
    h += "&method=POST";
    h += "&body=" + escape(c);
    c = null;
    d = "GET"
  }
  j.open(d, h, a);
  if (f && f.contentType) {
    j.setRequestHeader("Content-type", f.contentType)
  } else {
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  }
  if (a) {
    j.onreadystatechange = function() {
      if (j.status == 200) {
        e(j.responseText, j.responseXml)
      }
    }
  }
  j.send(c);
  if (!a) {
    return j.responseText
  }
};
com.art.core.utils.UIUtil = function() {};
UIUtil = com.art.core.utils.UIUtil;
UIUtil.bind = function(element, event, handler, forceClear) {
  if (!element) {
    return
  }
  if (!element._handlers) {
    element._handlers = []
  }
  element._handlers.push({
    event: event,
    handler: handler
  });
  if (element.addEventListener) {
    element.removeEventListener(event, handler);
    if (forceClear) {
      for (var i = 0; i < element._handlers.length; i++) {
        var h = element._handlers[i];
        if (h.event == event) {
          element.removeEventListener(event, h.handler)
        }
      }
    }
    return element.addEventListener(event, handler)
  } else {
    try {
      eval("element.on" + event + "=handler")
    } catch(e) {
      error("UIUtil > bind > yeah, didn't expect that to work.")
    }
  }
};
UIUtil.makeDraggable = function(c, d, e, a, f) {
  warn("UIUtil > makeDraggable > deprecated! Use draggable() instead.");
  UIUtil.draggable({
    element: c,
    handle: d,
    moveStop: e,
    container: a,
    onMove: f
  })
};
UIUtil.draggable = function(a) {
  if (!a || typeof(a) != "object") {
    error("UIUtil > draggable > required input: one object, container args. Not found. Aborting.");
    return
  }
  var e = a.element;
  var f = a.handle;
  var h = a.moveStop;
  var j = a.onMove;
  var d = a.container;
  var c = a.axis;
  UIUtil.addTouch(e);
  if (e.style.position != "absolute") {
    e.style.position = "absolute"
  }
  if (f) {
    e._UIUtil_makeDraggable_handle = f
  }
  var k = f ? f: e;
  if (k.addEventListener) {
    k.addEventListener("mousedown",
    function(l) {
      UIUtilPrivate.makeDraggable_handleMouseDown(l, e, f)
    })
  } else {
    k.onmousedown = function(l) {
      info("mousdown");
      UIUtilPrivate.makeDraggable_handleMouseDown(l, e, f)
    }
  }
  UIUtilPrivate.makeDraggable_currentTarget = e;
  k._UIUtil_container = d;
  k._UIUtil_axis = c;
  k._UIUtil_moveStop = h;
  k._UIUtil_onMove = j
};
UIUtil.fadeOut = function(d, c, h) {
  window.clearInterval(d.__currentFadeInterval);
  d.__originalDisplay = d.style.display;
  if (!c) {
    c = 1000
  }
  var a = d.style.opacity;
  if (a == "") {
    a = 1
  } else {
    a = Number(a)
  }
  d.__originalOpacity = a;
  var e = 24;
  var j = a / e;
  d.style.opacity = a;
  var f = window.setInterval(function() {
    var k = Number(d.style.opacity);
    var l = k - j;
    if (l < 0.01) {
      l = 0
    }
    d.style.opacity = l;
    if (Number(d.style.opacity) <= 0) {
      window.clearInterval(f);
      d.style.display = "none";
      delete d.__currentFadeInterval;
      d.style.opacity = 0
    }
  },
  c / e);
  d.__currentFadeInterval = f
};
UIUtil.fadeIn = function(c, a, f) {
  window.clearInterval(c.__currentFadeInterval);
  if (!a) {
    a = 1000
  }
  var k = c.__originalOpacity;
  if (!k) {
    k = 1
  }
  if (k) {
    var d = 24
  }
  var h = k / d;
  c.style.opacity = 0;
  var j = c.__originalDisplay;
  if (j == "none") {
    j = "block"
  }
  if (!j) {
    j = "block"
  }
  c.style.display = j;
  var e = window.setInterval(function() {
    c.style.opacity = Number(c.style.opacity) + h;
    if (Number(c.style.opacity) >= k) {
      window.clearInterval(e);
      delete c.__currentFadeInterval;
      if (k == 1) {
        c.style.opacity = 1
      }
    }
  },
  1 / d);
  c.__currentFadeInterval = e
};
UIUtil.animate = function(l, h, c, d) {
  if (!l) {
    error("UIUtil > animate > element is null. Aborting...");
    return
  }
  try {
    clearInterval(l.__UIUtil_animateBufferInterval)
  } catch(j) {}
  if (d) {
    l.__UIUtil_animateBufferInterval = setTimeout(function() {
      UIUtil.animate(l, h, c)
    },
    d);
    return
  }
  clearInterval(l.__UIUtil_animateInterval);
  var a = function(e) {
    this.startValue = e.startValue;
    this.value = this.startValue;
    this.endValue = e.endValue;
    this.setValueProp = e.setValueProp;
    this.style = e.style;
    this.duration = e.duration;
    this.suffix = e.suffix;
    this.getDelta = function() {
      return (this.endValue - this.startValue) / (this.duration / 1000 * UIUtil.fps)
    };
    this.getEasedValue = function() {
      var x = k.easeInOutQuad(f / q);
      return this.endValue * x + this.startValue * (1 - x)
    }
  };
  var k = {
    easeInOutQuad: function(e) {
      return e < 0.5 ? 2 * e * e: -1 + (4 - 2 * e) * e
    }
  };
  if (!h) {
    h = 1000
  }
  var s = [];
  var r = {};
  for (var n in c) {
    switch (n) {
    case "done":
      r.done = c[n];
      continue
    }
    var u;
    var m;
    var t;
    var v;
    t = n;
    v = true;
    if (typeof(c[n]) == "object") {
      u = c[n].start;
      m = c[n].end
    } else {
      u = null;
      m = c[n]
    }
    var w = "";
    if (typeof(u) == "string") {
      if (u.right(2) == "px") {
        u = parseFloat(u.left( - 2));
        w = "px"
      } else {
        if (u.right(1) == "%") {
          u = parseFloat(u.left( - 1));
          w = "%"
        }
      }
    }
    if (typeof(m) == "string") {
      if (m.right(2) == "px") {
        m = parseFloat(m.left( - 2));
        w = "px"
      } else {
        if (m.right(1) == "%") {
          m = parseFloat(m.left( - 1));
          w = "%"
        }
      }
    }
    if (w == "") {
      w = "px"
    }
    if (u == null) {
      if (w == "px") {
        switch (n) {
        case "width":
          u = l.offsetWidth;
          break;
        case "height":
          u = l.offsetHeight;
          break;
        case "top":
          u = l.offsetTop;
          break;
        case "left":
          u = l.offsetLeft;
          break;
        case "right":
          u = l.offsetLeft + l.offsetWidth;
          break;
        case "bottom":
          u = l.offsetParent.offsetHeight - (l.offsetTop + l.offsetHeight);
          break;
        case "opacity":
          u = isNullOrEmpty(l.style.opacity) ? 1 : parseFloat(l.style.opacity);
          w = "";
          break;
        case "paddingLeft":
          u = 0;
          break
        }
      } else {
        switch (n) {
        case "width":
          u = (l.offsetWidth / l.offsetParent.offsetWidth) * 100;
          break;
        case "height":
          u = (l.offsetHeight / l.offsetParent.offsetHeight) * 100;
          break;
        case "top":
          u = (l.offsetTop / l.offsetParent.offsetHeight) * 100;
          break;
        case "left":
          u = (l.offsetLeft / l.offsetParent.offsetWidth) * 100;
          break;
        case "paddingLeft":
          u = 0;
          break
        }
      }
    }
    if (u == null) {
      error("UIUtil > animate > startValue was not provided, and it was not possible to guess. Aborting...");
      return
    }
    if (n == "opacity") {
      w = ""
    }
    s.push(new a({
      startValue: u,
      endValue: m,
      setValueProp: t,
      style: v,
      duration: h,
      suffix: w
    }));
    verbose("Core > UIUtil > animate > property i: startValue=" + u + ", endValue=" + m + ", suffix=" + w)
  }
  var f = 0;
  var q = (h / 1000) * UIUtil.fps;
  var p = 1 / UIUtil.fps * 1000;
  var o = window.setInterval(function() {
    l._animationInProgress = true;
    for (var e = 0; e < s.length; e++) {
      s[e].value = s[e].getEasedValue();
      if (s[e].style) {
        l.style[s[e].setValueProp] = s[e].value + s[e].suffix
      } else {
        l[s[e].setValueProp] = s[e].value
      }
      verbose('UIUtil > animate > interval > setting property "' + s[e].setValueProp + '" to "' + s[e].value + '".')
    }
    if (++f >= q) {
      window.clearInterval(o);
      l._animationInProgress = false;
      for (var e = 0; e < s.length; e++) {
        s[e].value = s[e].endValue;
        if (s[e].style) {
          l.style[s[e].setValueProp] = s[e].value + s[e].suffix
        } else {
          l[s[e].setValueProp] = s[e].value
        }
      }
      if (r.done) {
        r.done()
      }
    }
  },
  p);
  l.__UIUtil_animateInterval = o
};
UIUtil.getPageOffset = function(c) {
  var a, d;
  a = d = 0;
  if (c.offsetParent) {
    do {
      a += c.offsetLeft;
      d += c.offsetTop
    } while ( c = c . offsetParent )
  }
  return {
    x: a,
    y: d
  }
};
UIUtil.getWindowOffset = function(f) {
  var d = document.documentElement,
  a = document.body;
  var e = (d && d.scrollLeft || a && a.scrollLeft || 0);
  var h = (d && d.scrollTop || a && a.scrollTop || 0);
  var c = UIUtil.getPageOffset(f);
  c.x -= e;
  c.y -= h;
  return c
};
UIUtil.fps = 30;
com.art.core.utils.UIUtilPrivate = function() {};
UIUtilPrivate = com.art.core.utils.UIUtilPrivate;
UIUtilPrivate.makeDraggable_handleMouseDown = function(a, c, d) {
  if (!a && event) {
    a = event
  }
  var l = c;
  UIUtilPrivate.makeDraggable_currentTarget = l;
  var j = l.offsetLeft;
  var k = l.offsetTop;
  var f = a.clientX - j;
  var h = a.clientY - k;
  l._UIUtil_makeDraggable_handleX = f;
  l._UIUtil_makeDraggable_handleY = h;
  if (document.body.addEventListener) {
    document.body.removeEventListener("mousemove", UIUtilPrivate.makeDraggable_handleMouseMove);
    document.body.addEventListener("mousemove", UIUtilPrivate.makeDraggable_handleMouseMove);
    document.body.removeEventListener("mouseup", UIUtilPrivate.makeDraggable_handleMouseUp);
    document.body.addEventListener("mouseup", UIUtilPrivate.makeDraggable_handleMouseUp)
  } else {
    document.body.onmousemove = UIUtilPrivate.makeDraggable_handleMouseMove;
    document.body.onmouseup = UIUtilPrivate.makeDraggable_handleMouseUp
  }
  l.setAttribute("unselectable", "on")
};
UIUtilPrivate.makeDraggable_handleMouseMove = function(j) {
  if (!j && event) {
    j = event
  }
  var q = UIUtilPrivate.makeDraggable_currentTarget;
  var k = j.clientX;
  var l = j.clientY;
  var m = q._UIUtil_makeDraggable_handleX;
  var n = q._UIUtil_makeDraggable_handleY;
  var s = k - m;
  var u = l - n;
  if (q._UIUtil_container) {
    var h = q._UIUtil_container;
    var r = 0;
    var o = 0;
    var p = h.offsetWidth;
    var f = h.offsetHeight;
    if (s < o) {
      s = o
    }
    if (s + q.offsetWidth > p) {
      s = p - q.offsetWidth
    }
    if (u < r) {
      u = r
    }
    if (u + q.offsetHeight > f) {
      u = f - q.offsetHeight
    }
  }
  var d = q._UIUtil_axis;
  if (d != "y") {
    q.style.left = s + "px"
  }
  if (d != "x") {
    q.style.top = u + "px"
  }
  if (q._UIUtil_onMove && typeof(q._UIUtil_onMove) == "function") {
    q._UIUtil_onMove.call(q, j)
  }
};
UIUtilPrivate.makeDraggable_handleMouseUp = function(a) {
  var c = UIUtilPrivate.makeDraggable_currentTarget;
  if (c._UIUtil_moveStop && typeof(c._UIUtil_moveStop) == "function") {
    c._UIUtil_moveStop.call(c, a)
  }
  if (document.body.addEventListener) {
    document.body.removeEventListener("mouseup", UIUtilPrivate.makeDraggable_handleMouseUp);
    document.body.removeEventListener("mousemove", UIUtilPrivate.makeDraggable_handleMouseMove)
  } else {
    document.body.onmouseup = null;
    document.body.onmousemove = null
  }
  c.setAttribute("unselectable", "off")
};
UIUtil.addTouch = function(a) {
  if (!a.addEventListener) {
    return
  }
  a.addEventListener("touchstart", iPadTouchHandler, false);
  a.addEventListener("touchmove", iPadTouchHandler, false);
  a.addEventListener("touchend", iPadTouchHandler, false);
  a.addEventListener("touchcancel", iPadTouchHandler, false)
};
var lastTap = null;
var tapValid = false;
var tapTimeout = null;
function cancelTap() {
  tapValid = false
}
var rightClickPending = false;
var rightClickEvent = null;
var holdTimeout = null;
var cancelMouseUp = false;
function cancelHold() {
  if (rightClickPending) {
    window.clearTimeout(holdTimeout);
    rightClickPending = false;
    rightClickEvent = null
  }
}
function startHold(a) {
  if (rightClickPending) {
    return
  }
  rightClickPending = true;
  rightClickEvent = (a.changedTouches)[0];
  holdTimeout = window.setTimeout("doRightClick();", 800)
}
function doRightClick() {
  rightClickPending = false;
  var a = rightClickEvent,
  c = document.createEvent("MouseEvent");
  c.initMouseEvent("mouseup", true, true, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, false, false, false, false, 0, null);
  a.target.dispatchEvent(c);
  c = document.createEvent("MouseEvent");
  c.initMouseEvent("mousedown", true, true, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, false, false, false, false, 2, null);
  a.target.dispatchEvent(c);
  c = document.createEvent("MouseEvent");
  c.initMouseEvent("contextmenu", true, true, window, 1, a.screenX + 50, a.screenY + 5, a.clientX + 50, a.clientY + 5, false, false, false, false, 2, null);
  a.target.dispatchEvent(c);
  cancelMouseUp = true;
  rightClickEvent = null
}
function iPadTouchStart(a) {
  var e = a.changedTouches,
  c = e[0],
  f = "mouseover",
  d = document.createEvent("MouseEvent");
  d.initMouseEvent(f, true, true, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, false, false, false, false, 0, null);
  c.target.dispatchEvent(d);
  f = "mousedown";
  d = document.createEvent("MouseEvent");
  d.initMouseEvent(f, true, true, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, false, false, false, false, 0, null);
  c.target.dispatchEvent(d);
  if (!tapValid) {
    lastTap = c.target;
    tapValid = true;
    tapTimeout = window.setTimeout("cancelTap();", 600);
    startHold(a)
  } else {
    window.clearTimeout(tapTimeout);
    if (c.target == lastTap) {
      lastTap = null;
      tapValid = false;
      f = "click";
      d = document.createEvent("MouseEvent");
      d.initMouseEvent(f, true, true, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, false, false, false, false, 0, null);
      c.target.dispatchEvent(d);
      f = "dblclick";
      d = document.createEvent("MouseEvent");
      d.initMouseEvent(f, true, true, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, false, false, false, false, 0, null);
      c.target.dispatchEvent(d)
    } else {
      lastTap = c.target;
      tapValid = true;
      tapTimeout = window.setTimeout("cancelTap();", 600);
      startHold(a)
    }
  }
}
function iPadTouchHandler(c) {
  var h = "",
  a = 0;
  if (c.touches.length > 1) {
    return
  }
  switch (c.type) {
  case "touchstart":
    if ($(c.changedTouches[0].target).is("select")) {
      return
    }
    iPadTouchStart(c);
    c.preventDefault();
    return false;
    break;
  case "touchmove":
    cancelHold();
    h = "mousemove";
    c.preventDefault();
    break;
  case "touchend":
    if (cancelMouseUp) {
      cancelMouseUp = false;
      c.preventDefault();
      return false
    }
    cancelHold();
    h = "mouseup";
    break;
  default:
    return
  }
  var f = c.changedTouches,
  d = f[0],
  e = document.createEvent("MouseEvent");
  e.initMouseEvent(h, true, true, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, false, false, false, false, a, null);
  d.target.dispatchEvent(e);
  if (h == "mouseup" && tapValid && d.target == lastTap) {
    e = document.createEvent("MouseEvent");
    e.initMouseEvent("click", true, true, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, false, false, false, false, a, null);
    d.target.dispatchEvent(e)
  }
}
com.art.core.components.Component = function() {};
var _x_c = com.art.core.components.Component;
var _x_p = _x_c.prototype;
_x_p.tagName = "Component";
_x_p.id = null;
_x_p.className = "core_component";
_x_p.extraClasses = "";
_x_p.htmlAttributes = {};
_x_p.tag = null;
_x_p.template = null;
_x_p.publicProperties = [{
  name: "id",
  defaultValue: null,
  useIfNull: true
},
{
  name: "class",
  defaultValue: "",
  useIfNull: false
},
{
  name: "update",
  defaultValue: "",
  useIfNull: false,
  type: "function"
},
{
  name: "isVisible",
  defaultValue: true,
  useIfNull: false,
  type: "Boolean"
},
{
  name: "isEnabled",
  defaultValue: true,
  useIfNull: false,
  type: "Boolean"
}];
_x_p.preEvaluateCallbacks = [];
_x_p.preRenderCallbacks = [];
_x_p.postRenderCallbacks = [];
_x_p.postDOMInsertionCallbacks = [];
_x_p.callbacks = [];
_x_c.addProperty = function(a, e, c, h, j) {
  var d = a.prototype;
  var k = typeof(c) != "undefined" ? c: null;
  var f = isNull(h) ? "property": h;
  if (typeof(j) == "undefined") {
    j = false
  }
  d[e] = k;
  if (!d.__hasHadPublicPropertiesCopied) {
    d.publicProperties = $art.ObjectUtil.copyArray(d.publicProperties);
    d.__hasHadPublicPropertiesCopied = 1
  }
  d.publicProperties.push({
    name: e,
    defaultValue: c,
    useIfNull: j,
    type: f
  })
};
_x_p.bind = function(a, c) {
  return com.art.core.jvml.Databinding.bind(a, c)
};
_x_p.creationComplete = function() {
  error("Component > creationComplete > error! This is deprecated! Track down the component that called this and start using onDOMInsertion hooks instead!")
};
_x_p.eval = function(str, options) {
  if (options && options.stripBraces) {
    if (str.substr(0, 1) == "{" && str.substr( - 1, 1) == "}") {
      str = str.substr(1, str.length - 2)
    }
  }
  if (str.substr(0, 1) == "~" && str.substr( - 1, 1) == "~") {
    str = str.substr(1, str.length - 2)
  }
  try {
    if (str == "class") {
      return eval('this["class"]')
    }
    var val = eval("this." + str);
    if (typeof(val) == "undefined") {
      return eval(str)
    } else {
      return val
    }
  } catch(e) {
    try {
      return eval(str)
    } catch(e) {
      warn("Component(" + this.tagName + "#" + this.id + ') > eval > could not eval "' + str + '" in either global or local scope. Error message: ' + e.message);
      return str
    }
  }
};
_x_p.eval2 = function(str, options) {
  var __this = this;
  function singleEval(strToEval) {
    try {
      var val = eval(strToEval);
      if (typeof(val) == "undefined") {
        return "!UNDEFINED!"
      } else {
        return val
      }
    } catch(e) {
      return "!UNDEFINED!"
    }
  }
  var globalScope = singleEval(str);
  var localScope = singleEval("__this" + str);
  var customScope = "!UNDEFINED!";
  if (options.scope) {
    customScope = singleEval(options.scope + "." + str)
  }
  switch (true) {
  case(customScope != "!UNDEFINED!") : return customScope;
  case(globalScope != "!UNDEFINED!") : return globalScope;
  case(localScope != "!UNDEFINED!") : return localScope;
  default:
    error('Component > eval2 > could not evaluate "' + str + '" in either scope.');
    return null
  }
};
_x_p.evaluateProperties = function() {
  for (var i = 0; i < this.publicProperties.length; i++) {
    var propName = this.publicProperties[i].name;
    var propType = this.publicProperties[i].type;
    var propValue = this.factory[propName];
    if (propName == "id") {
      if (this.idIsImmune) {
        continue
      }
    }
    var notAString = typeof(propValue) != "string";
    var evalAsFunction = propType == "function";
    var evalAsJS = false,
    evalAsID = false,
    evalAsXML = false;
    if (!notAString) {
      evalAsJS = propValue.substr(0, 1) == "{";
      evalAsID = propValue.substr(0, 2) == "{#";
      evalAsXML = propValue.trim().substr(0, 1) == "<"
    }
    switch (true) {
    case evalAsFunction:
      if (!isNull(propValue)) {
        eval("this[propName]=function(arg1,arg2,arg3) {" + propValue + "}")
      }
      continue;
    case notAString:
      break;
    case evalAsXML:
      propValue = propValue.trim();
      propValue = propValue.trimLeft("{");
      propValue = propValue.trimRight("}");
      propValue = propValue.trim();
      propValue = $art.XMLUtil.xmlToJson(propValue, {
        returnType: "object"
      });
      break;
    case evalAsID:
      propValue = propValue.trimLeft("#");
      var dataNode = $art.jvml.getDataNode(propValue);
      propValue = dataNode.value;
      break;
    case evalAsJS:
      if (propValue.substr(0, 1) == "{") {
        propValue = propValue.substr(1)
      }
      if (propValue.substr(propValue.length - 1, 1) == "}") {
        propValue = propValue.substr(0, propValue.length - 1)
      }
      if (propValue.substr(0, 1) == "@") {
        propValue = propValue.substr(1);
        this.outbound = true
      }
      if (propValue.matchOnce(/function\s*\w*\s*\([^)]*\)\s*\{/)) {
        eval("this[propName]=" + propValue);
        continue
      }
      if (propValue.left(1) == "{" && propValue.right(1) == "}") {
        eval("propValue=" + propValue)
      } else {
        propValue = this.eval(propValue)
      }
      break;
    default:
      var _this = this;
      propValue = propValue.replace(/\{([^\}]*)\}/g,
      function(entireMatch, strToEval) {
        var ret = _this.eval(strToEval);
        return ret
      });
      break
    }
    var defaultValue = this.publicProperties[i].defaultValue;
    var useIfNull = this.publicProperties[i].useIfNull;
    if (isNull(useIfNull)) {
      useIfNull = true
    }
    if (!isNull(defaultValue) && isNull(propValue)) {
      propValue = defaultValue
    }
    if (isNull(propValue) && !useIfNull) {
      continue
    }
    switch (propType) {
    case "Boolean":
      if (typeof(propValue) == "string") {
        propValue = propValue.toLowerCase() == "true"
      }
      break
    }
    this[propName] = propValue
  }
};
_x_p.getProperty = function(propName, options) {
  var fromFactory = options ? isNull(options.fromFactory, true) : true;
  var eval = options ? isNull(options.eval, false) : false;
  var val;
  if (fromFactory) {
    if (!this.factory) {
      this.factory = {}
    }
    if (!this.factory[propName]) {
      this.factory[propName] = this[propName]
    }
    val = this.factory[propName]
  } else {
    val = this[propName]
  }
  if (eval) {
    if (typeof(val) == "string") {
      val = this.eval(val, {
        stripBraces: true
      })
    }
  }
  return val
};
_x_p.handleDataBoundValueChanged = function(payload) {
  var _this = this;
  if (typeof(this.validateUpdate) == "string") {
    this.factory.validateUpdate = this.validateUpdate;
    eval("var tempFn = function(payload){" + _this.factory.validateUpdate + "}");
    this.validateUpdate = tempFn
  }
  var valid = false;
  if (typeof(this.validateUpdate) != "function") {
    valid = true
  } else {
    valid = this.validateUpdate(payload)
  }
  if (valid) {
    this.update(payload)
  }
};
_x_p.getHTMLNode = function(a) {
  var d = com.art.core.utils.ObjectUtil.isNullOrEmpty;
  var j = d(this.id) ? d(this.factory.id) ? "": this.factory.id: this.id;
  var h = d(a) ? j: j + a;
  var c = document.getElementById(h);
  if (!c) {
    error("Component > getHTMLNode > could not find HTML element matching this component. ID=" + j)
  }
  return c
};
_x_p.inheritArrays = function() {
  var a = com.art.core.utils.ObjectUtil;
  a.inheritArray(this, "publicProperties", this.publicProperties);
  a.inheritArray(this, "preRenderCallbacks", this.preRenderCallbacks);
  a.inheritArray(this, "postRenderCallbacks", this.postRenderCallbacks);
  a.inheritArray(this, "postDOMInsertionCallbacks", this.postDOMInsertionCallbacks);
  a.inheritArray(this, "callbacks", this.callbacks)
};
_x_p.preEvaluate = function() {
  for (var a = 0; a < this.preEvaluateCallbacks.length; a++) {
    this.preEvaluateCallbacks[a].call(this)
  }
};
_x_p.preRender = function() {
  for (var a = 0; a < this.preRenderCallbacks.length; a++) {
    this.preRenderCallbacks[a].call(this)
  }
};
_x_p.postRender = function() {
  for (var a = 0; a < this.postRenderCallbacks.length; a++) {
    this.postRenderCallbacks[a].call(this)
  }
};
_x_p.onDOMInsertion = function(a) {
  for (var c = 0; c < this.postDOMInsertionCallbacks.length; c++) {
    this.postDOMInsertionCallbacks[c].call(a)
  }
  if (!this.inserted) {
    com.art.core.controller.Controller.register("DataBoundValueChanged", this.handleDataBoundValueChanged, this);
    this.inserted = true
  }
  var d = this.getHTMLNode();
  if (d) {
    d.setAttribute("data-show", this.show);
    if (d.className.indexOf("core_Component") < 0) {
      d.className += " core_Component"
    }
  }
};
_x_p.registerEvents = function() {};
_x_p.render = function() {
  var _this = this;
  this.preEvaluate();
  this.evaluateProperties();
  this.preRender();
  var html = this.template;
  html = html.replace(/\{([^\}]*)\}/g,
  function(entireMatch, strToEval) {
    return _this.eval(strToEval)
  });
  this.renderedHtml = html;
  this.postRender();
  return html
};
_x_p.renderHtmlAttributes = function() {
  var _this = this;
  var str = "";
  for (var i in this.htmlAttributes) {
    var a = this.htmlAttributes[i];
    a = a.replace(/\{([^\}]*)\}/g,
    function(entireMatch, strToEval) {
      return _this.eval(strToEval)
    });
    str += i + '="' + a + '" '
  }
  return str
};
_x_p.renderToTarget = function(a) {
  if (typeof(a) == "string") {
    a = g(a)
  }
  if (this.id == null) {
    this.id = JMVC_Parser.generateUniqueId("button")
  }
  $(a).append(this.render());
  this.onDOMInsertion(this)
};
_x_p.setProperties = function(a) {
  this.factory = {};
  for (var c in a) {
    this.factory[c] = a[c]
  }
  for (var c in this.__defaultValues) {
    if (isNull(this.factory[c])) {
      this.factory[c] = this.__defaultValues[c]
    }
  }
  delete this.__defaultValues
};
_x_p.update = function(d) {
  if (this.show == false) {
    return
  }
  if (this.isItemRenderer) {
    return
  }
  var e = this.getHTMLNode();
  if (!e) {
    error("Component > update > target is null. This shouldn't happen. thisObj to follow. Aborting...");
    error(this);
    return
  }
  var c = this.renderedHtml;
  var a = this.render();
  if (c == a) {
    return
  }
  e.insertAdjacentHTML("afterEnd", a);
  e.parentNode.removeChild(e);
  this.onDOMInsertion(this)
};
_x_p.validateUpdate = function(a) {
  return true
};
_x_c.extend = function(c) {
  for (var a in this.prototype) {
    c[a] = this.prototype[a]
  }
};
_x_p.registerCallback = function(c, a) {
  this["callbacks"][c] = a
};
com.art.core.components.Image = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.verifySource);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.Image.prototype = new com.art.core.components.Component();
com.art.core.components.Image.prototype.tagName = "ArtImage";
com.art.core.components.Image.prototype.className = "core_Image";
com.art.core.components.Component.addProperty(com.art.core.components.Image, "source", "");
com.art.core.components.Component.addProperty(com.art.core.components.Image, "moveable", false);
com.art.core.components.Component.addProperty(com.art.core.components.Image, "moveContainer", null);
com.art.core.components.Component.addProperty(com.art.core.components.Image, "moveStop", "");
com.art.core.components.Component.addProperty(com.art.core.components.Image, "load", null, "function");
com.art.core.components.Image.prototype.registerEvents = function() {
  var moveStop;
  if (!this.getHTMLNode()) {
    error("core > Image > error: image has not rendered. Aborting post-DOM hooks...");
    return
  }
  if (this.moveable) {
    if (this.moveStop != "" && this.moveStop != null) {
      eval("moveStop = function(e) { " + this.moveStop + "}")
    }
    this.getHTMLNode().style.cursor = "pointer";
    var mc = this.moveContainer ? $art.g(this.moveContainer) : null;
    UIUtil.draggable({
      element: this.getHTMLNode(),
      moveStop: moveStop,
      container: mc
    });
    this.getHTMLNode().setAttribute("draggable", false);
    if (this.getHTMLNode().addEventListener) {
      this.getHTMLNode().addEventListener("dragstart",
      function(e) {
        e.preventDefault()
      })
    } else {
      this.getHTMLNode().dragstart = function(e) {
        e.preventDefault()
      }
    }
    warn("Image > registerEvents > should be using UIUtil to bind!")
  }
  if (this.load) {
    var _this = this;
    this.getHTMLNode().onload = function() {
      info("com.art.core.components.Image > this is a real, honest-to-god image load.");
      info("com.art.core.components.Image > image.complete=" + this.complete);
      _this.imageLoaded = true;
      _this.load()
    }
  }
};
com.art.core.components.Image.prototype.verifySource = function() {
  if (typeof(this.factory.source) == "string" && this.factory.source.left(1) == "{") {
    try {
      if (typeof(eval(this.factory.source)) != "string") {
        this.source = "";
        warn("core > Image > source is not valid, not injecting src attribute in this pass. Value=" + this.factory.source + ", evalled=" + eval(this.factory.source))
      }
    } catch(e) {
      this.source = "";
      warn("core > Image > source is not valid, not injecting src attribute in this pass. Value=" + this.factory.source + ", cannot eval.")
    }
  }
};
com.art.core.components.Image.prototype.template = '<img id="{~id~}" class="{~className~} {~class~}" src="{source}" {~renderHtmlAttributes()~} />';
com.art.core.components.ItemRenderer = function(a) {
  if (a) {
    this.id = a.id
  }
  this.inheritArrays()
};
com.art.core.components.ItemRenderer.prototype = new com.art.core.components.Component();
com.art.core.components.ItemRenderer.prototype.tagName = "ItemRenderer";
com.art.core.components.ItemRenderer.prototype.className = "JMVC_ItemRenderer";
com.art.core.components.Label = function(a) {
  this.setProperties(a);
  this.inheritArrays()
};
com.art.core.components.Label.prototype = new com.art.core.components.Component();
com.art.core.components.Label.prototype.tagName = "Label";
com.art.core.components.Label.prototype.className = "core_Label";
com.art.core.components.Component.addProperty(com.art.core.components.Label, "text", "");
com.art.core.components.Label.prototype.template = '<span id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}>{~text~}</span>';
com.art.core.components.Menu = function(c) {
  this.setProperties(c);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.registerEvents);
  this.dropDown = {};
  this.items = c.data;
  var a = this;
  this.preRenderCallbacks.push(this.renderContents);
  this.preRenderCallbacks.push(function() {})
};
com.art.core.components.Menu.prototype = new com.art.core.components.Component();
com.art.core.components.Menu.prototype.tagName = "Menu";
com.art.core.components.Menu.prototype.className = "core_Menu";
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "label", "");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "labelPosition", "top");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "cssClass", "");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "translatedContent", {});
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "itemChangeHandler", "");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "size", "medium");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "flavor", "primary");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "selectedIndex", null);
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "selectedLabel", "");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "selectedValue", "");
com.art.core.components.Component.addProperty(com.art.core.components.Menu, "data", []);
com.art.core.components.Menu.prototype.registerEvents = function() {
  var a = this
};
com.art.core.components.Menu.prototype.renderContents = function() {
  if (!this.data) {
    return
  }
  var c = this.data.item ? this.data.item: this.data.Item;
  if (!c) {
    error("Menu > renderContents > error: no items found.");
    return
  }
  var a = d(c);
  function d(e) {
    var f = "<ul>";
    if (!e.push) {
      e = [e]
    }
    for (var h = 0; h < e.length; h++) {
      if (e[h].item || e[h].Item) {
        f += '<li data-hasChildren="true">'
      } else {
        f += "<li>"
      }
      if (typeof(e[h]) != "object") {
        f += e[h]
      } else {
        if (e[h].href) {
          f += '<a href="' + e[h].href + '">'
        }
        f += e[h].label;
        if (e[h].item) {
          f += d(e[h].item)
        }
        if (e[h].Item) {
          f += d(e[h].Item)
        }
        if (e[h].href) {
          f += "</a>"
        }
      }
      f += "</li>"
    }
    f += "</ul>";
    return f
  }
  this.renderedContent = a
};
com.art.core.components.Menu.prototype.template = '<div class="{~className~}" id="{~id~}" {~renderHtmlAttributes()~}>{~renderedContent~}</div>';
com.art.core.components.Module = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.handleAutoLoad)
};
com.art.core.components.Module.prototype = new com.art.core.components.Component();
com.art.core.components.Module.prototype.tagName = "Module";
com.art.core.components.Module.prototype.className = "core_Module";
com.art.core.components.Component.addProperty(com.art.core.components.Module, "src", "");
com.art.core.components.Component.addProperty(com.art.core.components.Module, "autoLoad", "false");
com.art.core.components.Component.addProperty(com.art.core.components.Module, "args", []);
com.art.core.components.Component.addProperty(com.art.core.components.Module, "tagFinderMethod", null);
com.art.core.components.Component.addProperty(com.art.core.components.Module, "enclose", false);
com.art.core.components.Module.prototype.components = [];
com.art.core.components.Module.prototype.text;
com.art.core.components.Module.prototype.xml;
com.art.core.components.Module.prototype.finalizeLoad = function() {
  var c = this.tagFinderMethod ? {
    method: this.tagFinderMethod
  }: null;
  this.components = $art.jvml.parser.parse(this.xml, c);
  var a = this;
  $art.ObjectUtil.each(this.components,
  function(f) {
    f.parent = a
  });
  var d = $art.XMLUtil.XMLToString(this.xml, "innerXML");
  var e = this.getHTMLNode();
  if (!e) {
    error("Module > finalizeLoad > something went dreadfully wrong! Node to follow.");
    error(e);
    return
  }
  e.innerHTML = d;
  $art.jvml.renderer.render(this.components, this.getHTMLNode(), c);
  this.loaded = true;
  com.art.core.controller.Controller.notify("moduleLoaded", this)
};
com.art.core.components.Module.prototype.handleAutoLoad = function() {
  var a = this;
  if (this.autoLoad == "true") {
    this.load()
  }
};
com.art.core.components.Module.prototype.reload = function() {
  warn("Module > reload > not fully implemented...errors may occur");
  this.loaded = false;
  this.load()
};
com.art.core.components.Module.prototype.load = function(h) {
  var a = this;
  if (this.loaded) {
    error("Module > load > module already loaded. To force reload, use the reload() method.");
    return
  }
  if (!h) {
    var h;
    if (false) {
      h = new XDomainRequest();
      h.open("GET", this.src, false);
      h.onload = function() {
        a.load(h)
      };
      h.onprogress = function() {};
      h.timeout = 5000;
      h.send();
      return
    }
    h = new XMLHttpRequest();
    h.open("GET", this.src, false);
    h.send()
  }
  this.text = this.populateArgs(h.responseText);
  this.text = this.text.replace(/></g, "> <");
  this.text = this.text.replace(/<script([^>]*)>([\d\D]*?)<\/script>/gi, "<script$1><![CDATA[$2]]></script>");
  if (this.enclose) {
    this.xml = $art.XMLUtil.getXMLFromString(this.text);
    this.encloseScriptTags(this.xml)
  } else {
    this.xml = $art.XMLUtil.getXMLFromString(this.text, {
      wrap: true
    });
    this.runScriptTags(this.xml)
  }
  if (document.createStyleSheet) {
    var d = this.xml.getElementsByTagName("link");
    for (var c = 0; c < d.length; c++) {
      var e = d[c];
      var f = e.getAttribute("href");
      document.createStyleSheet(f)
    }
  }
};
com.art.core.components.Module.prototype.populateArgs = function(text) {
  for (var i = 0; i < this.args.length; i++) {
    for (var j in this.args[i]) {
      this[j] = this.args[i][j]
    }
  }
  this["_this"] = this;
  var _this = this;
  text = text.replace(/{{{([^}]*)}}}/gi,
  function(entireMatch, strToEval) {
    return _this.eval(strToEval, _this)
  });
  text = text.replace(/\$([^$\n]+)\$/gi,
  function(entireMatch, strToEval) {
    var val = _this.args[strToEval];
    if (isNull(val)) {
      val = ""
    }
    return val
  });
  return text
};
com.art.core.components.Module.prototype.encloseScriptTags = function(xml) {
  var script = "";
  var tags = xml.getElementsByTagName("script");
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var src = tag.getAttribute("src");
    var isInternal = isNullOrEmpty(src) || src.right(4) == "null" || src == window.location;
    if (isInternal) {
      script += tag.textContent ? tag.textContent: tag.text
    } else {
      if (src.indexOf("?") < 0) {
        src += "?.txt"
      } else {
        src += "&.txt"
      }
      script += $art.get(src)
    }
    script += "\n";
    tag.parentNode.removeChild(tag)
  }
  var fname = "module_" + this.id + "_script";
  script = "function " + fname + "() {\n" + script + "\n};";
  eval(script);
  eval(fname + ".call(this)");
  this.finalizeLoad()
};
com.art.core.components.Module.prototype.runScriptTags = function(d) {
  var a = this;
  this._tagsToLoad = 0;
  this._tagsLoaded = 0;
  var c = d.getElementsByTagName("script");
  if (c.length > 0) {
    this.runScriptTag(c, 0)
  } else {
    this.finalizeLoad()
  }
};
com.art.core.components.Module.prototype.runScriptTag = function(n, f) {
  var a = this;
  info("Module > runScriptTag > running script tag #" + f);
  var m = n[f];
  var k = m.getAttribute("src");
  var h = isNullOrEmpty(k) || k.right(4) == "null" || k == window.location;
  info("Module > runScriptTag > script tag #" + f + " " + (h ? " is not external ": "is external, src=" + k));
  var l = document.createElement("script");
  if (h) {
    l.src = null;
    info("Module > runScriptTag > setting innerHTML of tag #" + f);
    var o = m.textContent ? m.textContent: m.text;
    var c = o.replace(/\$([^$\n]+)\$/gi,
    function(e, p) {
      var q = a[p];
      if (isNull(q)) {
        q = ""
      }
      return q
    });
    try {
      c = "with(this){" + c + "}"; (new Function(c)).call(a)
    } catch(d) {
      error("Module > runScriptTag > ERROR during inline script evaluation. e=" + d);
      info(d)
    }
    info("Module > runScriptTag > script tag #" + f + " has finished injecting. Now invoking tag #" + (f + 1));
    if (n.length > f + 1) {
      a.runScriptTag(n, ++f)
    } else {
      a.finalizeLoad()
    }
  } else {
    if (!l.addEventListener) {
      var j = false;
      l.onreadystatechange = function() {
        if (this.readyState == "loaded" || this.readyState == "complete") {
          if (j) {
            return
          }
          j = true;
          info("Module > runScriptTag > script tag #" + f + " has finished loading. Now invoking tag #" + (f + 1));
          if (n.length > f + 1) {
            a.runScriptTag(n, ++f)
          } else {
            a.finalizeLoad()
          }
        }
      }
    } else {
      l.onload = function() {
        info("Module > runScriptTag > script tag #" + f + " has finished loading. Now invoking tag #" + (f + 1));
        if (n.length > f + 1) {
          a.runScriptTag(n, ++f)
        } else {
          a.finalizeLoad()
        }
      }
    }
    l.src = k;
    document.getElementsByTagName("head")[0].appendChild(l);
    info("Module > runScriptTag > tag #" + f + " inserted into DOM, src has been set. Awaiting load...")
  }
};
com.art.core.components.Module.prototype.update = function() {
  return
};
com.art.core.components.Module.prototype.template = '<div id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}></div>';
com.art.core.components.NumericStepper = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.positionLabel);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.NumericStepper.prototype = new com.art.core.components.Component();
com.art.core.components.NumericStepper.prototype.tagName = "NumericStepper";
com.art.core.components.NumericStepper.prototype.className = "core_NumericStepper";
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "min", 0);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "max", 10);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "value", 0);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "display", null);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "step", 1);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "showLabel", true);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "liveUpdate", true);
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "labelFormat", "");
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "labelPosition", "left");
com.art.core.components.Component.addProperty(com.art.core.components.NumericStepper, "change", null, "function");
com.art.core.components.NumericStepper.prototype.positionLabel = function() {
  var a = "";
  var c = "";
  switch (this.labelPosition) {
  case "left":
    a = this.labelTemplate;
    break;
  case "right":
    c = this.labelTemplate;
    break;
  case "none":
    break
  }
  a = a.replace("{~lr~}", "core_NumericStepper_labelLeft");
  c = c.replace("{~lr~}", "core_NumericStepper_labelRight");
  this.template = this.template.replace("{~labelLeft~}", a);
  this.template = this.template.replace("{~labelRight~}", c)
};
com.art.core.components.NumericStepper.prototype.registerEvents = function() {
  var a = this;
  UIUtil.bind($art.g(this.id + "_up"), "click",
  function() {
    a.up()
  });
  UIUtil.bind($art.g(this.id + "_down"), "click",
  function() {
    a.down()
  });
  this.setLabel()
};
com.art.core.components.NumericStepper.prototype.setLabel = function() {
  var a = this.value;
  var d = $art.g(this.id + "_label");
  var c = this.value;
  if (!d) {
    return
  }
  if (this.display != null) {
    d.innerHTML = this.display
  } else {
    d.innerHTML = c
  }
};
com.art.core.components.NumericStepper.prototype.getValue = function() {
  return this.value
};
com.art.core.components.NumericStepper.prototype.setValue = function(a) {
  this.value = a;
  this.setLabel();
  if (this.change) {
    this.change()
  }
};
com.art.core.components.NumericStepper.prototype.up = function() {
  var a = this.getValue();
  this.setValue(++a);
  this.handleOutbound()
};
com.art.core.components.NumericStepper.prototype.down = function() {
  var a = this.getValue();
  this.setValue(--a);
  this.handleOutbound()
};
com.art.core.components.NumericStepper.prototype.handleOutbound = function() {
  if (this.outbound) {
    var targetText = this.factory.value;
    targetText = targetText.substr(2, targetText.length - 3);
    var targetText2 = "this." + targetText;
    try {
      eval(targetText2 + " = this.value")
    } catch(e) {
      try {} catch(e) {
        eval(targetText + " = this.value")
      }
    }
  }
};
com.art.core.components.NumericStepper.prototype.template = '<span id="{~id~}" class="{~className~} {~class~}" data-min="{~min~}" data-max="{~max~}" data-value="{~value~}" data-step="{~step~}">{~labelLeft~}<span class="core_NumericStepper_tweaker"><span id="{~id~}_down" class="core_NumericStepper_down">-</span><span id="{~id~}_up" class="core_NumericStepper_up">+</span></span>{~labelRight~}</span>';
com.art.core.components.NumericStepper.prototype.labelTemplate = '<span id="{~id~}_label" class="core_NumericStepper_label {~lr~}"> </span>';
com.art.core.components.Slider = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.parseValues);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.Slider.prototype = new com.art.core.components.Component();
com.art.core.components.Slider.prototype.tagName = "Slider";
com.art.core.components.Slider.prototype.className = "core_Slider";
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "min", 0);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "max", 100);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "value", 50);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "step", 0);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "showLabel", true);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "liveUpdate", true);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "range", false);
com.art.core.components.Component.addProperty(com.art.core.components.Slider, "labelFormat", "");
com.art.core.components.Slider.prototype.parseValues = function() {
  this.min = Number(this.min);
  this.max = Number(this.max);
  this.value = Number(this.value);
  this.step = Number(this.step);
  this.range = this.range && this.range.toUpperCase() == "TRUE"
};
com.art.core.components.Slider.prototype.registerEvents = function() {
  this.setValue(this.value);
  this.setLabel();
  var a = this;
  UIUtil.draggable({
    element: $art.g(this.id + "_nub"),
    onMove: null,
    container: $art.g(this.id + "_bar"),
    axis: "x",
    onMove: function(c) {
      var d = a.getValue().absolute;
      a.setValue(d, false);
      a.setActive();
      a.setLabel()
    }
  })
};
com.art.core.components.Slider.prototype.getValue = function() {
  var a = $art.g(this.id + "_bar").offsetWidth;
  var c = $art.g(this.id + "_nub").offsetLeft;
  var e = c / a;
  var d = e * (this.max - this.min) + this.min;
  return {
    relative: e,
    absolute: d
  }
};
com.art.core.components.Slider.prototype.setValue = function(f, e) {
  if (f >= this.min && f <= this.max) {
    this.value = f
  } else {
    error("Slider > setValue > attempted to set value of " + f + ", but that is out of bounds. Aborting.");
    return
  }
  if (!isNull(e) && e == false) {
    return
  }
  var a = $art.g(this.id + "_bar").offsetWidth;
  var d = f / (this.max - this.min);
  var c = a * d;
  $art.g(this.id + "_nub").style.left = c + "px";
  this.setActive()
};
com.art.core.components.Slider.prototype.setActive = function() {
  var a;
  var c;
  if (this.range) {} else {
    a = $art.g(this.id + "_bar").offsetLeft;
    c = this.getValue().relative * $art.g(this.id + "_bar").offsetWidth
  }
  $art.g(this.id + "_active").style.left = a + "px";
  $art.g(this.id + "_active").style.width = c + "px"
};
com.art.core.components.Slider.prototype.setLabel = function() {
  var d = this.value;
  var a = this.format;
  var c = (this.max - this.min) / 100;
  d = Math.floor(d / c) * c;
  $art.g(this.id + "_label").innerHTML = d
};
com.art.core.components.Slider.prototype.template = '<span id="{~id~}" class="{~className~} {~extraClasses~}" data-min="{~min~}" data-max="{~max~}" data-value="{~value~}" data-step="{~step~}"><span class="core_Slider_area"><div id="{~id~}_bar" class="core_Slider_bar"><div id="{~id~}_active" class="core_Slider_bar_active"></div></div><div id="{~id~}_nub" class="core_Slider_nub"></div></span><span id="{~id~}_label" class="core_Slider_label"></span></span>';
com.art.core.components.Container = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.renderContents);
  this.postDOMInsertionCallbacks.push(this.sendDOMInsertionToChildren)
};
com.art.core.components.Container.prototype = new com.art.core.components.Component();
com.art.core.components.Container.prototype.tagName = "Container";
com.art.core.components.Container.prototype.className = "core_container";
com.art.core.components.Container.prototype.components = [];
com.art.core.components.Container.prototype.renderContents = function() {
  var itemHtml = "";
  var doc;
  var DOMObject;
  doc = $art.XMLUtil.convertRawXmlToDocument(this.innerHTML);
  DOMObject = doc.documentElement;
  this.components = [];
  var components = $art.jvml.parser.parse(DOMObject);
  for (var j = 0; j < components.length; j++) {
    components[j].item = this.data
  }
  this.components = components;
  var clone = DOMObject.cloneNode(true);
  var newDOMObject = $art.jvml.renderer.render(components, clone);
  itemHtml = $art.XMLUtil.XMLToString(newDOMObject, "bodyOnly");
  var _this = this;
  _this.item = this.data;
  itemHtml = itemHtml.replace(/{([^}]*)}/gi,
  function(entireMatch, strToEval) {
    return _this.eval(strToEval, _this)
  });
  this.renderedInnerHTML = itemHtml;
  for (var i = 0; i < this.components.length; i++) {
    this.components[i].parent = this;
    if (!$art.jvml.parser.idWatchList) {
      $art.jvml.parser.idWatchList = []
    }
    $art.jvml.parser.idWatchList.push(this.components[i].id)
  }
};
com.art.core.components.Container.prototype.sendDOMInsertionToChildren = function() {
  if (!this.components || !this.components.length) {
    verbose("Container > sendDOMInsertionToChildren > warning: container has no components property!");
    return
  }
  for (var c = 0; c < this.components.length; c++) {
    var a = this.components[c];
    a.onDOMInsertion(a)
  }
};
com.art.core.components.Container.prototype.template = '<div id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}>{~renderedInnerHTML~}</div>';
com.art.core.components.Modal = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.registerCloseButton)
};
com.art.core.components.Modal.prototype = new com.art.core.components.Container();
com.art.core.components.Modal.prototype.tagName = "Modal";
com.art.core.components.Modal.prototype.className = "core_modal";
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "title", "error: please provide title");
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "useLightBox", true, "Boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "clickOutCloses", true, "Boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "moveable", true, "Boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "position", "center");
com.art.core.components.Component.addProperty(com.art.core.components.Modal, "closeHandler", null, "function");
com.art.core.components.Modal.prototype.registerCloseButton = function() {
  var a = this;
  UIUtil.bind($art.g(this.id + "_closeButton"), "click",
  function() {
    a.close()
  });
  UIUtil.bind($art.g(this.id + "_lightBox"), "click",
  function() {
    a.close()
  })
};
com.art.core.components.Modal.prototype.open = function() {
  this.getHTMLNode().style.display = "block";
  var d = this.getHTMLNode();
  if (this.position == "center") {
    var j = d.offsetWidth;
    var a = d.offsetHeight;
    var k = window.innerWidth;
    var c = window.innerHeight;
    var e = k / 2 - j / 2;
    var f = c / 2 - a / 2;
    d.style.left = e + "px";
    d.style.top = f + "px"
  }
  if (typeof(this.position) == "function") {
    this.position.call(this, d)
  }
  if (this.useLightBox) {
    $art.g(this.id + "_lightBox").style.display = "block"
  } else {
    $art.g(this.id + "_lightBox").style.display = "none"
  }
  if (this.moveable) {
    $art.g(this.id + "_title").style.cursor = "pointer";
    UIUtil.makeDraggable(this.getHTMLNode(), $art.g(this.id + "_title"))
  }
};
com.art.core.components.Modal.prototype.close = function() {
  if (typeof(this.closeHandler) == "function") {
    this.closeHandler()
  }
  this.getHTMLNode().style.display = "none";
  $art.g(this.id + "_lightBox").style.display = "none"
};
com.art.core.components.Modal.prototype.template = '<div id="{~id~}_lightBox" class="core_modal_lightBox"></div><div id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}><div id="{~id~}_title" class="core_modal_title">{~title~}<span id="{~id~}_closeButton" class="core_modal_closeButton"></span></div><div class="core_modal_content">{~renderedInnerHTML~}</div></div>';
com.art.core.components.ViewStack = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.setup)
};
com.art.core.components.ViewStack.prototype = new com.art.core.components.Container();
com.art.core.components.ViewStack.prototype.tagName = "ViewStack";
com.art.core.components.ViewStack.prototype.className = "core_ViewStack";
com.art.core.components.ViewStack.prototype.selectView = function(h, f) {
  var a = f ? f.childNodes: this.getHTMLNode().childNodes;
  var e = 0;
  var d = -1;
  if (typeof(h) == "number") {
    d = parseInt(h)
  }
  if (typeof(h) == "string") {
    for (var c = 0; c < a.length; c++) {
      if (a[c].nodeType == 1) {
        e++;
        if (a[c].id == h) {
          d = e;
          break
        }
      }
    }
  }
  if (d < 0) {
    error('ViewStack > selectView > attempting to set view with index "' + d + '". Not gonna work.');
    return
  }
  e = 0;
  for (var c = 0; c < a.length; c++) {
    if (a[c].nodeType == 1) {
      if (e++==d) {
        a[c].setAttribute("selected", "true")
      } else {
        a[c].setAttribute("selected", "false")
      }
    }
  }
};
com.art.core.components.ViewStack.prototype.setup = function() {
  var a = this.getHTMLNode().childNodes;
  var d = false;
  for (var c = 0; c < a.length; c++) {
    if (a[c].nodeType == 1 && a[c].getAttribute("selected") && a[c].getAttribute("selected").length) {
      d = true;
      break
    }
  }
  if (!d) {
    for (var c = 0; c < a.length; c++) {
      if (a[c].nodeType == 1) {
        a[c].setAttribute("selected", "true");
        break
      }
    }
  }
};
com.art.core.components.ViewStack.prototype.template = '<div id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}>{~renderedInnerHTML~}</div>';
com.art.core.components.TabNavigator = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.setupTabBar);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.TabNavigator.prototype = new com.art.core.components.ViewStack();
com.art.core.components.TabNavigator.prototype.tagName = "TabNavigator";
com.art.core.components.TabNavigator.prototype.className = "core_TabNavigator";
com.art.core.components.Component.addProperty(com.art.core.components.TabNavigator, "containment", "contained");
com.art.core.components.TabNavigator.prototype.setupTabBar = function() {
  var a = this;
  var d = [];
  var k = $art.XMLUtil.getXMLFromString(this.innerHTML, {
    wrap: true
  });
  var l = 0;
  var c = false;
  for (var e = 0; e < k.childNodes.length; e++) {
    var n = k.childNodes[e];
    if (!n || n.nodeType != 1) {
      continue
    }
    l++;
    var f = n.id;
    if (!f) {
      f = this.id + "_tab" + l
    }
    var m = n.getAttribute("label");
    var p = n.getAttribute("selected") == "true";
    if (p) {
      c = true
    }
    var h = l;
    var o = {
      id: f,
      label: m,
      selected: p,
      index: l - 1
    };
    if (!m) {
      m = "tab #" + l
    }
    d.push(o)
  }
  if (!c) {
    d[0].selected = true
  }
  this.tabData = d;
  this.tabBar = new com.art.core.components.jvml.TabBar({
    id: this.id + "_tabBar",
    data: d
  });
  this.tabBar.dataPrepared = true;
  this.tabBar.postTabClick = function(j) {
    a.selectView(j, $art.g(a.id + "_viewStack"))
  };
  var q = this.tabBar.render();
  this.tabBarHtml = q
};
com.art.core.components.TabNavigator.prototype.registerEvents = function() {
  this.tabBar.onDOMInsertion(this.tabBar)
};
com.art.core.components.TabNavigator.prototype.template = '<div id="{~id~}" class="{~className~} {~extraClasses~}" {~renderHtmlAttributes()~}>{~tabBarHtml~}<span id="{~id~}_viewStack" class="core_ViewStack">{~renderedInnerHTML~}</span></div>';
com.art.core.components.Tooltip = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.push(this.handleTitle);
  this.postDOMInsertionCallbacks.push(this.registerEvents);
  this.postDOMInsertionCallbacks.push(this.handlePostDOM)
};
com.art.core.components.Tooltip.prototype = new com.art.core.components.Container();
com.art.core.components.Tooltip.prototype.tagName = "Tooltip";
com.art.core.components.Tooltip.prototype.className = "core_Tooltip";
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "title", "");
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "anchor", null, "string", false);
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "useAnchor", true);
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "useLightBox", false);
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "showTitle", false);
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "enabled", true, "boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "touchEnabled", true, "boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "caret", true, "boolean");
com.art.core.components.Component.addProperty(com.art.core.components.Tooltip, "forcePosition", null, "string");
com.art.core.components.Tooltip.prototype.getAnchor = function() {
  var c = this.anchor ? this.anchor: this.id + "_anchor";
  var a = $art.g(c);
  return a
};
com.art.core.components.Tooltip.prototype.handlePostDOM = function() {
  if (!isNullOrEmpty(this.anchor)) {
    document.getElementById(this.id + "_anchor").style.display = "none"
  }
  document.getElementById(this.id).setAttribute("data-showCarets", this.caret)
};
com.art.core.components.Tooltip.prototype.handleTitle = function() {
  this.showTitle = !isNullOrEmpty(this.title)
};
com.art.core.components.Tooltip.prototype.registerEvents = function() {
  var a = this;
  var f = document.getElementById(this.id);
  var c = this.getAnchor();
  var j = $art.g(this.id + "_tooltip");
  var h = null;
  function e() {
    window.clearTimeout(h);
    h = window.setTimeout(function() {
      a.open()
    },
    100)
  }
  function d() {
    window.clearTimeout(h);
    h = window.setTimeout(function() {
      a.close()
    },
    100)
  }
  UIUtil.bind(c, "mouseover",
  function() {
    e()
  });
  UIUtil.bind(c, "mouseout",
  function() {
    d()
  });
  UIUtil.bind(j, "mouseover",
  function() {
    e()
  });
  UIUtil.bind(j, "mouseout",
  function() {
    d()
  });
  UIUtil.bind(j, "mousedown",
  function() {
    a.close()
  });
  UIUtil.bind(document.getElementById(this.id + "_lightBox"), "click",
  function() {
    a.close()
  })
};
com.art.core.components.Tooltip.prototype.open = function() {
  var c = this;
  if (this._status == "open") {
    info("core > Tooltip#" + this.id + " > open > not opening, because tooltip is already open.");
    return
  }
  info("core > Tooltip#" + this.id + " > open > tooltip opening.");
  if (this.enabled == false || this.enabled == "false") {
    return
  }
  if ("ontouchstart" in document.documentElement && (this.touchEnabled == false || this.touchEnabled == "false")) {
    return
  }
  clearInterval(this._bufferTimeout);
  var q = $art.g(this.id + "_tooltip");
  if (isNull(q._status, "closed") == "closed") {
    q.style.opacity = 0
  }
  var e = this.getAnchor();
  var h = UIUtil.getWindowOffset(e);
  var f = UIUtil.getPageOffset(e);
  var y = {
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    left: 0
  };
  var k = h;
  q.style.display = "block";
  var x = q.offsetWidth;
  var p = q.offsetHeight;
  var j = e.offsetWidth;
  var d = e.offsetHeight;
  var w = {
    top: k.y - p,
    right: k.x + x / 2,
    bottom: k.y,
    left: k.x - x / 2
  };
  var v = {
    top: k.y - p / 2,
    right: k.x + x,
    bottom: k.y + p / 2,
    left: k.x
  };
  var r = {
    top: k.y,
    right: k.x + x / 2,
    bottom: k.y + p,
    left: k.x - x / 2
  };
  var u = {
    top: k.y - p / 2,
    right: k.x,
    bottom: k.y + p / 2,
    left: k.x - x
  };
  function o(z, A) {
    if (z.top < A.top || z.right > A.right || z.bottom > A.bottom || z.left < A.left) {
      return false
    } else {
      return true
    }
  }
  this.which = "";
  if (o(w, y)) {
    tooltipCoords = w;
    this.which = "top"
  } else {
    if (o(v, y)) {
      tooltipCoords = v;
      this.which = "right"
    } else {
      if (o(r, y)) {
        tooltipCoords = r;
        this.which = "bottom"
      } else {
        if (o(u, y)) {
          tooltipCoords = u;
          this.which = "left"
        }
      }
    }
  }
  if (!isNullOrEmpty(this.forcePosition)) {
    this.which = this.forcePosition
  }
  if (this.which == "") {
    error("Tooltip > open > unable to find position for tooltip that fits in window!");
    return
  }
  var s = {};
  var t = {};
  q.style.top = 0;
  q.style.left = 0;
  var a = q.style.opacity;
  q.style.opacity = 0;
  q.style.visibility = "visible";
  this._originalTooltipPageCoords = UIUtil.getPageOffset(q);
  q.style.opacity = a;
  q.style.visibility = "hidden";
  var m = this._originalTooltipPageCoords.x;
  var n = this._originalTooltipPageCoords.y;
  var l = 5;
  switch (this.which) {
  case "top":
    s.left = f.x - x / 2 - m + j / 2;
    s.top = f.y - p - n - l;
    t.left = s.left;
    t.top = s.top;
    t.top += 5;
    break;
  case "right":
    s.left = f.x - m + x + l;
    s.top = f.y - p / 2 - n;
    t.left = s.left;
    t.top = s.top;
    t.left -= 5;
    break;
  case "bottom":
    s.left = f.x - x / 2 - m + j / 2;
    s.top = f.y + p - n;
    t.left = s.left;
    t.top = s.top;
    t.top -= 5;
    break;
  case "left":
    s.left = f.x - x - m;
    s.top = f.y - p / 2 - n;
    t.left = s.left;
    t.top = s.top;
    t.left += 5;
    break
  }
  this._tooltipCoords = s;
  $art.g(this.id).setAttribute("which", this.which);
  q.style.top = t.top + "px";
  q.style.left = t.left + "px";
  q.style.visibility = "visible";
  if (q._status != "open") {
    UIUtil.animate(q, 150, {
      opacity: {
        start: 0,
        end: 1
      },
      top: {
        start: t.top,
        end: s.top
      },
      left: {
        start: t.left,
        end: s.left
      },
      done: function() {
        q._status = "open";
        c._status = "open"
      }
    });
    q._status = "opening"
  }
  if (this.useLightBox) {
    $art.g(this.id + "_lightBox").style.display = "block"
  } else {
    $art.g(this.id + "_lightBox").style.display = "none"
  }
};
com.art.core.components.Tooltip.prototype.close = function() {
  info("core > Tooltip#" + this.id + " > close > tooltip closing.");
  var a = this;
  var d = $art.g(this.id + "_tooltip");
  var c = {
    opacity: {
      start: 1,
      end: 0
    }
  };
  switch (this.which) {
  case "left":
    c.left = this._tooltipCoords.left + 5;
    break;
  case "top":
    c.top = {
      start: this._tooltipCoords.top,
      end: this._tooltipCoords.top + 5
    };
    break;
  case "right":
    c.left = this._tooltipCoords.left - 5;
    break;
  case "bottom":
    c.top = this._tooltipCoords.top - 5;
    break
  }
  c.done = function() {
    d.style.display = "none";
    d._status = "closed";
    a._status = "closed"
  };
  d.animate = c;
  this._bufferTimeout = setTimeout(function() {
    UIUtil.animate(d, 300, c);
    d._status = "closing"
  },
  250);
  $art.g(this.id + "_lightBox").style.display = "none"
};
com.art.core.components.Tooltip.prototype._startAnimation = function() {
  var e = this.getHTMLNode();
  var a = 25;
  var d = 1000 / a;
  this._animationInterval = setInterval(function() {
    if (!e.animation) {
      this._stopAnimation()
    }
    for (var m in e.animation) {
      var n = m;
      var o = e.animation[m];
      var p;
      var l;
      var h;
      var k;
      var f;
      if (typeof(o) == "object") {
        p = o.start;
        l = o.end;
        h = o.currentValue;
        k = o.duration;
        f = o.currentTime
      } else {
        error("Tooltip > startAnimation > not supported yet");
        continue
      }
      if (!h) {
        h = p
      }
      if (!k) {
        k = 500
      }
      if (!f) {
        f = 0
      }
      var j = (l - p) / a * (k / 1000);
      h += j;
      f += d
    }
  },
  d);
  function c(f) {
    switch (f) {}
  }
  error("Tooltip > startAnimation > invalid! Does not work!")
};
com.art.core.components.Tooltip.prototype._stopAnimation = function() {
  clearInterval(this._animationInterval)
};
com.art.core.components.Tooltip.prototype.template = '<span id="{~id~}" class="core_Tooltip_container"><div id="{~id~}_lightBox" class="core_Tooltip_lightBox"></div><span id="{~id~}_anchor" class="core_Tooltip_anchor" data-visible="{~useAnchor~}"></span><div id="{~id~}_tooltip" class="{~className~} {~class~}" {~renderHtmlAttributes()~}><span class="core_Tooltip_leftCaret core_Tooltip_caret"></span><span class="core_Tooltip_topCaret core_Tooltip_caret"></span><div id="{~id~}_title" class="core_Tooltip_title" data-visible="{~showTitle~}">{~title~}</div><div class="core_Tooltip_content">{~renderedInnerHTML~}</div><span class="core_Tooltip_rightCaret core_Tooltip_caret"></span><span class="core_Tooltip_bottomCaret core_Tooltip_caret"></span></div></span>';
com.art.core.components.DataRepeater = function(c) {
  var a = this;
  this.setProperties(c);
  this.inheritArrays();
  this.components = [];
  this.preRenderCallbacks.push(this.renderData);
  this.postDOMInsertionCallbacks.push(this.sendDOMInsertionToChildren)
};
com.art.core.components.DataRepeater.prototype = new com.art.core.components.Component();
com.art.core.components.DataRepeater.prototype.tagName = "DataRepeater";
com.art.core.components.DataRepeater.prototype.className = "core_DataRepeater";
com.art.core.components.DataRepeater.prototype.components = [];
com.art.core.components.Component.addProperty(com.art.core.components.DataRepeater, "data", []);
com.art.core.components.Component.addProperty(com.art.core.components.DataRepeater, "itemRendererId", "");
com.art.core.components.Component.addProperty(com.art.core.components.DataRepeater, "foobly", "");
com.art.core.components.Component.addProperty(com.art.core.components.DataRepeater, "headerData", null);
com.art.core.components.Component.addProperty(com.art.core.components.DataRepeater, "noData", null);
com.art.core.components.DataRepeater.prototype.parseItemRenderer = function() {
  var a;
  var c;
  var f;
  if (!this.itemRenderer) {
    for (var d = 0; d < $art.jvml.parser.itemRenderers.length; d++) {
      var e = $art.jvml.parser.itemRenderers[d];
      if (e.id == this.itemRendererId) {
        this.itemRenderer = e;
        break
      }
    }
  }
  if (typeof(this.itemRenderer) == "string") {
    if (this.itemRenderer.substr(0, 1) == "#") {
      this.itemRenderer = gv(this.itemRenderer)
    }
    if (this.itemRenderer.length < 1) {
      error("DataRepeater > renderData > itemRenderer is empty. Cannot render.");
      return
    }
  }
  if (typeof(this.itemRenderer) == "object") {
    a = document;
    c = this.itemRenderer.tag;
    f = "html"
  } else {
    if (typeof(this.itemRenderer) == "string") {
      var e = this.itemRenderer;
      a = $art.XMLUtil.convertRawXmlToDocument(e);
      c = a.documentElement;
      f = "xml"
    } else {
      error("DataRepeater > renderData > something is wrong. this.itemRenderer is neither an object nor a string! Aborting renderData! Expect errors during render.");
      this.repeatedHtml = "asdfasdfasd";
      return
    }
  }
  return {
    doc: a,
    DOMObject: c,
    type: f
  }
};
com.art.core.components.DataRepeater.prototype.renderData = function() {
  if (isNullOrEmpty(this.data)) {
    if (isNull(this.noData)) {
      this.renderedInnerHTML = "No data."
    } else {
      this.renderedInnerHTML = this.noData
    }
  }
  var iro = this.parseItemRenderer();
  var doc = iro.doc;
  var DOMObject = iro.DOMObject;
  var type = iro.type;
  if (isNull(this.data.length)) {
    error("DataRepeater > renderData > data does not have a length property. Aborting render...");
    return
  }
  this.components = [];
  var itemHtml = "";
  this.renderedInnerHTML = "";
  if (this.headerData && this.data[0] != this.headerData) {
    this.data.unshift(this.headerData)
  }
  for (var i = 0; i < this.data.length; i++) {
    var components = $art.jvml.parser.parse(DOMObject, {
      skipItemRenderers: true
    });
    for (var j = 0; j < components.length; j++) {
      components[j].item = this.data[i];
      components[j].isItemRenderer = true
    }
    this.components = this.components.concat(components);
    var clone = DOMObject.cloneNode(true);
    var newDOMObject = $art.jvml.renderer.render(components, clone, {
      searchByOriginalId: true
    });
    var innerXML = newDOMObject.innerHTML ? newDOMObject.innerHTML: $art.XMLUtil.XMLToString(newDOMObject, "innerXML");
    itemHtml = type == "html" ? innerXML: $art.XMLUtil.XMLToString(newDOMObject, "bodyOnly");
    var _this = this;
    _this.item = this.data[i];
    _this.item.i = i;
    itemHtml = itemHtml.replace(/{([^}]*)}/gi,
    function(entireMatch, strToEval) {
      return _this.eval(strToEval, _this)
    });
    this.renderedInnerHTML += itemHtml
  }
  for (var i = 0; i < this.components.length; i++) {
    this.components[i].parent = this
  }
};
com.art.core.components.DataRepeater.prototype.sendDOMInsertionToChildren = function() {
  if (!this.components || !this.components.length) {
    verbose("DataRepeater > sendDOMInsertionToChildren > warning: container has no components property!");
    return
  }
  for (var c = 0; c < this.components.length; c++) {
    var a = this.components[c];
    a.onDOMInsertion(a)
  }
};
com.art.core.components.DataRepeater.prototype.template = '<div id="{~id~}" class="{~className~} {~class~}"  {~renderHtmlAttributes()~}>{~renderedInnerHTML~}</div>';
com.art.core.components.jvml.TabBar = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.unshift(this.prepareData);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.jvml.TabBar.prototype = new com.art.core.components.DataRepeater();
var _x_c = com.art.core.components.jvml.TabBar;
var _x_p = com.art.core.components.jvml.TabBar.prototype;
_x_p.tagName = "TabBar";
_x_p.className = "core_TabBar";
var _x_c2 = com.art.core.components.Component;
_x_c2.addProperty(com.art.core.components.jvml.TabBar, "viewStackId", null);
_x_c2.addProperty(com.art.core.components.jvml.TabBar, "idField", null);
_x_c2.addProperty(com.art.core.components.jvml.TabBar, "dataField", "tab");
_x_c2.addProperty(com.art.core.components.jvml.TabBar, "labelField", "label");
_x_c2.addProperty(com.art.core.components.jvml.TabBar, "selectedField", "selected");
_x_p.dataPrepared = false;
_x_p.prepareData = function() {
  if (this.dataPrepared) {
    return
  }
  var e = [];
  var c = this.data;
  if (c[this.dataField]) {
    c = c[this.dataField]
  } else {
    error('core > TabBar > prepareData > cannot find dataField "' + this.dataField + '" in dataset (to follow)');
    error(this.data);
    return
  }
  for (var a = 0; a < c.length; a++) {
    if (isNull(c[a])) {
      continue
    }
    var d = {};
    d.index = a;
    d.id = this.idField ? c[a][this.idField] : "";
    d.label = this.labelField ? c[a][this.labelField] : "???";
    d.selected = this.selectedField ? c[a][this.selectedField] : false;
    if (isNullOrEmpty(d.id)) {
      d.id = this.id + "_tab" + a
    }
    e.push(d)
  }
  this.data = e;
  this.dataPrepared = true
};
_x_p.registerEvents = function() {
  var a = this;
  for (var c = 0; c < this.data.length; c++) {
    var d = this.data[c];
    UIUtil.bind($art.g(d.id), "click",
    function() {
      a.tabClick(parseInt(this.getAttribute("data-index")))
    })
  }
};
_x_p.tabClick = function(d) {
  if (this.data[d]) {
    for (var c = 0; c < this.data.length; c++) {
      this.data[c].selected = false
    }
    this.data[d].selected = true;
    var a = this.getHTMLNode().getElementsByClassName("core_Tab");
    var e = 0;
    for (var c = 0; c < a.length; c++) {
      if (a[c].nodeType == 1) {
        a[c].setAttribute("selected", e++==d)
      }
    }
  } else {
    error('TabBar > tabClick > invalid index "' + d + '"')
  }
  if (this.postTabClick) {
    this.postTabClick.call(this, d)
  }
};
_x_p.template = '<div id="{~id~}" class="{~className~}" {~renderHtmlAttributes()~}>{~renderedInnerHTML~}</div>';
_x_p.itemRenderer = '<div class="core_Tab{item.selected?\' selected\':\'\'}" id="{item.id}" data-index="{item.index}" selected="{item.selected}">{item.label}</div>';
com.art.core.components.Carousel = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.preRenderCallbacks.unshift(this.prepareData);
  this.postDOMInsertionCallbacks.push(this.setWidth);
  this.postDOMInsertionCallbacks.push(this.registerEvents);
  this.postDOMInsertionCallbacks.push(this.enableButtons)
};
com.art.core.components.Carousel.prototype = new com.art.core.components.DataRepeater();
$p = com.art.core.components.Carousel.prototype;
$p.tagName = "Carousel";
$p.className = "core_Carousel";
com.art.core.components.Component.addProperty(com.art.core.components.Carousel, "scrollType", "page");
com.art.core.components.Component.addProperty(com.art.core.components.Carousel, "width", 5);
com.art.core.components.Component.addProperty(com.art.core.components.Carousel, "itemClick",
function() {},
"function");
$p.leftIndex = 0;
$p.enableButtons = function() {
  var a = document.getElementById(this.id + "_leftButton");
  var d = document.getElementById(this.id + "_rightButton");
  if (!a) {
    error("core > Carousel > enableButtons > failed! nothing to enable!");
    return
  }
  var c = this.leftIndex > 0;
  var e = this.leftIndex < this.data.length - this.width;
  a.setAttribute("data-enabled", c);
  d.setAttribute("data-enabled", e)
};
$p.getWidth = function() {
  if (!this.width || isNaN(this.width)) {
    error("com.art.core.components.Carousel > prepareData > width is not valid. Please provide an integer value.");
    return
  }
  var c = this.getHTMLNode().getElementsByClassName("core_Carousel_item");
  if (!c || c.length < 1) {
    return
  }
  var d = c[0].offsetWidth;
  d += 5;
  var a = d * parseInt(this.width);
  return {
    itemWidth: d,
    finalWidth: a
  }
};
$p.handleItemClick = function(a) {
  if (!a) {
    a = {}
  }
  var e = a.node;
  var d = a.item;
  var c = a.event;
  this.itemClick(a)
};
$p.pageLeft = function() {
  var a = parseInt(this.width);
  this.leftIndex -= a;
  if (this.leftIndex < 0) {
    this.leftIndex = 0
  }
  this.scroll();
  this.enableButtons()
};
$p.pageRight = function() {
  var a = parseInt(this.width);
  this.leftIndex += a;
  if (this.leftIndex + a > this.data.length) {
    this.leftIndex = this.data.length - a
  }
  if (this.leftIndex < 0) {
    this.leftIndex = 0
  }
  this.scroll();
  this.enableButtons()
};
$p.prepareData = function() {
  if (!this.data || !this.data.length) {
    warn("com.art.core.components.Carousel > prepareData > no data supplied, or data did not have a length property.");
    return
  }
  if (this.data.length == 0) {
    return
  }
  var c = this.data[0];
  var a = com.art.core.vos;
  switch (true) {
  case c instanceof a.ProductVO:
    this.itemRenderer = this.itemRenderer_productVO;
    break;
  case c instanceof a.RoomVO:
    this.itemRenderer = this.itemRenderer_roomVO;
    break;
  default:
    if (!this.itemRenderer) {
      warn("com.art.core.components.Carousel > prepareData > unable to determine VO type, or invalid VO supplied, and no user-specified itemRenderer exists.");
      return
    }
  }
};
$p.registerEvents = function() {
  var a = this;
  UIUtil.bind(document.getElementById(this.id + "_leftButton"), "click",
  function() {
    a.pageLeft()
  });
  UIUtil.bind(document.getElementById(this.id + "_rightButton"), "click",
  function() {
    a.pageRight()
  });
  var d = document.getElementById(this.id).getElementsByClassName("core_Carousel_item");
  for (var c = 0; c < d.length; c++) {
    UIUtil.bind(d[c], "click",
    function(f) {
      this.itemClick({
        nodes: d[c],
        item: this.data[c],
        event: f
      })
    })
  }
};
$p.scroll = function(a) {
  if (typeof(a) == "undefined") {
    a = this.leftIndex
  } else {
    this.leftIndex = a
  }
  var d = this.getWidth();
  var c = -(d.itemWidth * a);
  UIUtil.animate(document.getElementById(this.id + "_scrollContainer"), 330, {
    left: c
  })
};
$p.setWidth = function(c) {
  if (c == "css") {
    this.getHTMLNode().style.width = "";
    return
  }
  if (typeof(c) != "undefined" && !isNaN(c)) {
    this.width = c
  }
  var a = this.getWidth();
  if (isNull(a)) {
    error("core > Carousel > setWidth > could not determine width property.");
    return
  }
  this.getHTMLNode().style.width = a.finalWidth + "px"
};
$p.template = '<div id="{~id~}" class="{~className~}" {~renderHtmlAttributes()~}><span id="{~id~}_leftButton" class="{~className~}_leftButton" data-enabled="false"><span class="{~className~}_leftButtonImage"> </span></span><span id="{~id~}_innerContainer" class="{~className~}_innerContainer"><div id="{~id~}_scrollContainer" class="{~className~}_scrollContainer">{~renderedInnerHTML~}</div></span><span id="{~id~}_rightButton" class="{~className~}_rightButton" data-enabled="true"><span class="{~className~}_rightButtonImage"> </span></span></div>';
$p.itemRenderer_productVO = '<span id="{~id~}_item{~i~}" class="{~className~}_item"><span class="{~className~}_itemImage" style="background-image: url(\'{~item.images.thumbnailImageUrl~}\')"> </span><span class="{~className~}_itemHover"><span class="{~className~}_itemTitle">{~item.title~}</span><span class="{~className~}_itemArtist">{~item.artist~}</span></span></span>';
$p.itemRenderer_roomVO = '<span id="{~id~}_item{~i~}" class="{~className~}_item"><span class="{~className~}_itemImage" style="background-image: url(\'{~item.thumbUrl~}\')"> </span><span class="{~className~}_itemHover"><span class="{~className~}_itemTitle">{~item.name~}</span></span></span>';
com.art.core.components.FormControl = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.field = {};
  this.states = {
    enabled: "enabled",
    disabled: "disabled",
    error: "error",
    loading: "loading"
  };
  this.events = {
    focus: "focus",
    blur: "blur",
    hover: "hover",
    keypress: {
      enter: "enter"
    }
  };
  this.stateCurrent = this.states.enabled;
  this.eventCurrent = this.events.blur;
  this.valid = [];
  this.validDisabled = [];
  this.preRenderCallbacks.push(function() {
    var c = this.surroundTemplate();
    this.template = c
  });
  this.postDOMInsertionCallbacks.push(function() {
    this.copyAttributesToTag();
    this.bindValidation(this.validators.validator);
    this.registerCallbacks(this.eventCallbacks.callbacks)
  });
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.FormControl.prototype = new com.art.core.components.Component();
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "label", "");
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "labelPosition", "top");
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "errorPosition", "top");
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "maxLength", 0);
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "defaultValue", "");
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "data", []);
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "validators", []);
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "eventCallbacks", []);
com.art.core.components.FormControl.prototype.template = "{~replaceme~}";
com.art.core.components.FormControl.prototype.clearError = function() {
  $("#" + this.id + "_error").html("")
};
com.art.core.components.FormControl.prototype.getValue = function() {
  return $("#" + this.id).val()
};
com.art.core.components.FormControl.prototype.getLabel = function() {
  return $("#" + this.id + " option:selected").text()
};
com.art.core.components.FormControl.prototype.getTemplate = function() {
  this.surroundTemplate();
  return this.render()
};
com.art.core.components.FormControl.prototype.setValue = function(a) {
  $("#" + this.id).val(a)
};
com.art.core.components.FormControl.prototype.enable = function(a) {
  if (a == undefined) {
    a = true
  }
  if (a) {
    this.stateCurrent = this.states.enabled;
    $("#" + this.id).removeAttr("disabled");
    this.valid = this.validDisabled
  } else {
    this.stateCurrent = this.states.disabled;
    $("#" + this.id).attr("disabled", "disabled");
    this.valid = []
  }
  var e = a ? 1 : 0.3;
  var c = "#" + this.id;
  var d = c + "_label";
  $(c).css("opacity", e);
  $(c + "," + d).unbind("mouseout");
  $(c + "," + d).unbind("mouseover");
  $(c + "," + d).unbind("click");
  $(c).unbind("blur");
  $(c).unbind("focus");
  this.registerEvents()
};
com.art.core.components.FormControl.prototype.setFixedWidth = function(a) {
  $("#" + this.id).css({
    width: a + "px"
  });
  $("#" + this.id + "_h").css({
    width: a + "px"
  })
};
com.art.core.components.FormControl.prototype.hide = function() {
  $("#" + this.id + "_c").hide()
};
com.art.core.components.FormControl.prototype.show = function() {
  $("#" + this.id + "_c").fadeIn()
};
com.art.core.components.FormControl.prototype.setValidators = function(a) {
  this.valid = a;
  this.validDisabled = a
};
com.art.core.components.FormControl.prototype.inputValidation = function() {
  this.clearError();
  var c = true;
  var d = this.valid;
  for (var a = 0; a < d.length; a++) {
    if (d[a].func(d[a].criteria, this.getValue())) {
      this.stateCurrent = this.states.enabled;
      this.updateStyle(this.stateCurrent, this.eventCurrent)
    } else {
      this.stateCurrent = this.states.error;
      this.updateStyle(this.states.error, this.eventCurrent);
      $("#" + this.id + "_error").html(this.valid[a].msg);
      c = false;
      break
    }
  }
  return c
};
com.art.core.components.FormControl.prototype.copyAttributesToTag = function() {
  this.copyAttrToTag()
};
com.art.core.components.FormControl.prototype.copyAttrToTag = function(a) {
  var e = this.getHTMLNode(a);
  var d = "";
  for (i in this.htmlAttributes) {
    if (i == "width") {
      d = e.getAttribute("style") != null ? e.getAttribute("style") : "";
      e.setAttribute("style", d + i + ":" + this.htmlAttributes[i] + ";")
    }
  }
};
com.art.core.components.FormControl.prototype.registerEvents = function() {
  if (this.stateCurrent == this.states.disabled) {
    return
  }
  var a = this;
  var e = "#" + this.id;
  var f = e + "_label";
  var d = "#" + this.id + "_h";
  var c = $(d).length > 0;
  $(e + ", " + f + ", " + d).mouseover(function() {
    if (document.activeElement.id != a.id && document.activeElement.id != a.id + "_h") {
      a.updateStyle(a.stateCurrent, a.events.hover)
    }
  });
  $(e + ", " + f + ", " + d).mouseout(function() {
    if (document.activeElement.id != a.id) {
      a.updateStyle(a.stateCurrent, a.eventCurrent)
    }
  });
  $(d).bind("focus",
  function() {
    a.updateStyle(a.stateCurrent, a.events.focus);
    if (c) {
      $(d).hide();
      $(e).show()
    }
    $(e).focus()
  });
  $(e).bind("focus",
  function() {
    a.updateStyle(a.stateCurrent, a.events.focus);
    if (c) {
      $(d).hide();
      $(e).show()
    } else {
      if ($(e).attr("value") == a.label && a.labelPosition == "inside") {
        $(e).attr("value", "")
      }
    }
  });
  $(e).bind("blur",
  function() {
    a.updateStyle(a.stateCurrent, a.events.blur);
    if ($(e).attr("value").length == 0 && c) {
      $(e).hide();
      $(d).show()
    } else {
      if ($(e).attr("value").length == 0 && a.labelPosition == "inside") {
        $(e).attr("value", a.label)
      }
    }
  });
  $(f).bind("click",
  function() {
    $(e).focus()
  });
  $(e).bind("keydown",
  function(h) {
    if (h.keyCode == 13) {
      if (a.callbacks[a.events.keypress.enter] != undefined) {
        a.callbacks[a.events.keypress.enter]()
      }
    }
    if (a.callbacks.keydown != undefined) {
      a.callbacks.keydown()
    }
  });
  $(e).bind("keyup",
  function(h) {
    if (a.callbacks.keyup != undefined) {
      a.callbacks.keyup()
    }
  });
  $(e).change(function() {
    if (a.callbacks["selectedItemChange"] != undefined) {
      a.callbacks["selectedItemChange"]()
    }
    if (a.callbacks["change"] != undefined) {
      a.callbacks["change"]()
    }
  })
};
com.art.core.components.FormControl.prototype.changeClasses = function(a, c) {
  var d = $("#" + this.id + ",#" + this.id + "_label,#" + this.id + "_error,#" + this.id + "_h");
  for (var f in c) {
    d.removeClass(c[f])
  }
  d.addClass(a)
};
com.art.core.components.FormControl.prototype.updateStyle = function(state, event) {
  var events = {
    blur: "",
    focus: "core_form_event_focus",
    hover: "core_form_event_hover"
  };
  var states = {
    enabled: "",
    disabled: "core_form_state_disabled",
    error: "core_form_state_error",
    loading: "core_form_state_loading"
  };
  var e = eval("events." + event.toString());
  var s = eval("states." + state.toString());
  this.changeClasses(s, states);
  this.changeClasses(e, events)
};
com.art.core.components.FormControl.prototype.surroundTemplate = function() {
  var n = this.label.length == 0 ? "": "<span id='" + this.id + "_label' class='core_form_label'>" + this.label + "</span>";
  var h = "<span id='" + this.id + "_error' class='core_form_error'></span>";
  var o = this.labelPosition.toLowerCase();
  var j = this.errorPosition.toLowerCase();
  var k = this.templateInput;
  var c = "",
  u = "top",
  d = "bottom",
  m = "left",
  p = "right",
  f = "<br>",
  q = "&nbsp;";
  if (o == "inside") {
    this.defaultValue = this.defaultValue.length == 0 ? this.label: this.defaultValue;
    n = ""
  }
  switch (o) {
  case "inside":
  case m:
    switch (j) {
    case m:
      c = n + q + h + k;
      break;
    case u:
      c = h + n + k;
      break;
    case p:
      c = n + k + h;
      break;
    case d:
    default:
      c = n + k + f + h;
      break
    }
    break;
  case p:
    switch (j) {
    case p:
      c = k + n + q + h;
      break;
    case d:
      c = k + n + f + h;
      break;
    case m:
      c = h + k + n;
      break;
    case u:
    default:
      c = h + f + k + n;
      break
    }
    break;
  case d:
    switch (j) {
    case p:
      c = k + h + f + n;
      break;
    case d:
      c = k + f + n + q + h;
      break;
    case m:
      c = h + k + f + n;
      break;
    case u:
    default:
      c = h + f + k + f + n;
      break
    }
    break;
  case u:
  default:
    switch (j) {
    case m:
      c = n + f + h + k;
      break;
    case u:
      c = n + q + h + f + k;
      break;
    case p:
      c = n + f + k + h;
      break;
    case d:
    default:
      c = n + f + k + f + h;
      break
    }
    break
  }
  return "<div id='" + this.id + "_c' class='core_form_container' {~renderHtmlAttributes()~}>" + c + "</div>"
};
com.art.core.components.FormControl.prototype.bindValidation = function(k) {
  if ($art.ObjectUtil.isArray(k)) {
    var f = new com.art.core.utils.InputValidation();
    var h = "input error";
    var d = null;
    var c = [];
    var j = k;
    for (var e = 0; e < j.length; e++) {
      h = j[e].message;
      d = j[e].criteria || j[e].criteria1;
      switch (j[e].name.trim().toLowerCase()) {
      case "maxlength":
        c.push(f.getMaxLength(d, h.replace("[COUNT]", d)));
        break;
      case "alphanumeric":
        c.push(f.getAlphaNumeric(h));
        break;
      case "isequalto":
        c.push(f.getIsEqual(d, h));
        break;
      case "minlength":
        c.push(f.getMinLength(d, h.replace("[COUNT]", d)));
        break;
      case "notequal":
        c.push(f.getNotEqual(d, h));
        break;
      case "required":
        c.push(f.getRequired(h));
        break;
      case "validemail":
        c.push(f.getValidEmail(h));
        break;
      case "custom":
        c.push(f.getCustom(d, h));
        break
      }
    }
    this.setValidators(c)
  }
};
com.art.core.components.FormControl.prototype.registerCallbacks = function(callbacks) {
  var _this = this;
  if ($art.ObjectUtil.isArray(callbacks)) {
    for (var i = 0; i < callbacks.length; i++) {
      var f = "(" + callbacks[i].callback.toString() + ")";
      this.registerCallback(callbacks[i].name, eval(f))
    }
  }
};
com.art.core.components.Button2 = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.handleCssClass);
  this.postDOMInsertionCallbacks.push(this.registerEvents)
};
com.art.core.components.Button2.prototype = new com.art.core.components.Component();
com.art.core.components.Button2.prototype.tagName = "Button";
com.art.core.components.Button2.prototype.className = "core_Button";
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "label", "");
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "size", "medium");
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "flavor", "primary");
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "cssClass", "");
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "clickHandler", "");
com.art.core.components.Component.addProperty(com.art.core.components.Button2, "enabled", true, "Boolean");
com.art.core.components.Button2.prototype.click = function() {
  if (!this.enabled) {
    return
  }
  eval(this.clickHandler)
};
com.art.core.components.Button2.prototype.disable = function() {
  this.enabled = false;
  this.update()
};
com.art.core.components.Button2.prototype.enable = function() {
  this.enabled = true;
  this.update()
};
com.art.core.components.Button2.prototype.handleCssClass = function() {
  var a = this.className;
  if (this.extraClasses && this.extraClasses.length > 0) {
    a += " " + this.extraClasses
  }
  a += " " + this.flavor;
  a += " " + this.size;
  if (this.cssClass) {
    a = this.cssClass
  }
  if (this["class"]) {
    a += " " + this["class"]
  }
  var c = this.getHTMLNode();
  if (!c) {
    error("Button2 > handleCssClass > failed to set CSS class. The node was not found. this to follow");
    error(this);
    return
  }
  c.className = a
};
com.art.core.components.Button2.prototype.registerEvents = function() {
  var a = this;
  UIUtil.bind(this.getHTMLNode(), "click",
  function() {
    a.click()
  })
};
com.art.core.components.Button2.prototype.template = '<input type="button" id="{~id~}" class="{~className~} {~class~}" data-enabled="{~enabled~}" value="{~label~}" {~renderHtmlAttributes()~} />';
com.art.core.components.Button2.prototype.template2 = '<div id="{~id~}" class="{~className~} {~extraClasses~}">{~label~}</div>';
com.art.core.components.Dropdown = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.items = a.data;
  this.preRenderCallbacks.push(this.renderContents)
};
com.art.core.components.Dropdown.prototype = new com.art.core.components.FormControl();
com.art.core.components.Dropdown.prototype.tagName = "DropDown";
com.art.core.components.Dropdown.prototype.className = "core_DropDown";
com.art.core.components.Component.addProperty(com.art.core.components.Dropdown, "itemChangeHandler", "");
com.art.core.components.Component.addProperty(com.art.core.components.Dropdown, "selectedIndex", null);
com.art.core.components.Component.addProperty(com.art.core.components.Dropdown, "selectedLabel", "");
com.art.core.components.Component.addProperty(com.art.core.components.Dropdown, "selectedValue", "");
com.art.core.components.Component.addProperty(com.art.core.components.Dropdown, "translatedContent", {
  nullOptionValue: "xx",
  nullOptionLabel: "Please Select..."
});
com.art.core.components.Dropdown.prototype.renderContents = function() {
  var data;
  if (this.factory && this.factory.data) {
    data = this.factory.data
  } else {
    data = this.data;
    if (!this.factory) {
      this.factory = {}
    }
    this.factory.data = this.data
  }
  if (typeof(data) == "string") {
    if (data.substr(0, 1) == "{") {
      data = this.eval(data)
    } else {
      var a = $art.XMLUtil.xmlToJson(data, {
        returnType: "object"
      });
      data = a.item ? a.item: a.Item
    }
  }
  this.data = data;
  switch (true) {
  case(this.selectedIndex != null) : this.setSelected({
      index: this.selectedIndex
    });
    break;
  case (this.selectedLabel != "") : this.setSelected({
      label: this.selectedLabel
    });
    break;
  case (this.selectedValue != "") : this.setSelected({
      value: this.selectedValue
    });
    break
  }
  var html = "";
  var row = "";
  for (var i = 0; i < data.length; i++) {
    row = this.itemTemplate;
    row = row.replace("{~item.label~}", data[i].label);
    row = row.replace("{~item.value~}", data[i].value);
    row = row.replace("{~item.selected~}", i == this.selectedIndex ? " selected": "");
    html += row
  }
  this.content = html
};
com.art.core.components.Dropdown.prototype.setSelected = function(h, d) {
  var f = "",
  c = "";
  if (typeof(h) == "number") {
    f = "index";
    c = h
  }
  if (typeof(h) == "string") {
    f = "value";
    c = h
  }
  if (typeof(h) == "object") {
    switch (true) {
    case ! isNullOrEmpty(h.index) : f = "index";
      c = h.index;
      break;
    case ! isNullOrEmpty(h.label) : f = "label";
      c = h.label;
      break;
    case ! isNullOrEmpty(h.value) : f = "value";
      c = h.value;
      break;
    default:
      error("DropDown > setSelected > supplied object does not have an index, label, or value property.");
      return
    }
  }
  var e = -1;
  switch (f) {
  case "index":
    e = h;
    break;
  case "label":
  case "value":
    for (var a = 0; a < this.data.length; a++) {
      if (this.data[a][f] == c) {
        e = a;
        break
      }
    }
  }
  if (e < 0 || e > this.data.length) {
    error("DropDown > setSelected > selected index was out of bounds. Index: " + e);
    return
  }
  this.selectedIndex = e;
  if (d && d.update) {
    this.update()
  }
};
com.art.core.components.Dropdown.prototype.setValue = function(a) {
  if (this.doesValueExist(a)) {
    if (a != $("#" + this.id).val()) {
      $("#" + this.id).val(a);
      $("#" + this.id).change()
    }
  } else {
    if (!this.doesValueExist(this.translatedContent.nullOptionValue)) {
      $("#" + this.id).prepend("<option value='" + this.translatedContent.nullOptionValue + "'>" + this.translatedContent.nullOptionLabel + "</option>");
      this.setValue(this.translatedContent.nullOptionValue)
    }
  }
};
com.art.core.components.Dropdown.prototype.doesValueExist = function(c) {
  var a = false;
  $("#" + this.id + " option").each(function() {
    if (this.value == c) {
      a = true
    }
  });
  return a
};
com.art.core.components.Dropdown.prototype.fillDropDown = function(c) {
  var a = this;
  var f = $("#" + a.id);
  var e;
  if (f.prop) {
    e = f.prop("options")
  } else {
    e = f.attr("options")
  }
  $("option", f).remove();
  var h, d;
  $.each(c,
  function(k, j) {
    h = j.value || k;
    d = j.label || j.name;
    if (e) {
      e[e.length] = new Option(d, h)
    }
  });
  if (!com.art.core.utils.ObjectUtil.isNullOrEmpty(a.selectedValue)) {
    f.val(a.selectedValue)
  }
};
com.art.core.components.Dropdown.prototype.templateInput = '<select class="{~className~} core_form_field" id="{~id~}">{~content~}</select>';
com.art.core.components.Dropdown.prototype.itemTemplate = '<option{~item.selected~} value="{~item.value~}">{~item.label~}</option>';
com.art.core.components.Text = function(a) {
  this.setProperties(a);
  this.inheritArrays()
};
com.art.core.components.Text.prototype = new com.art.core.components.FormControl();
com.art.core.components.Text.prototype.tagName = "Text";
com.art.core.components.Text.prototype.className = "core_Text";
com.art.core.components.Text.prototype.templateInput = '<input type="text" id="{~id~}" class="{~className~} core_form_field" value="{~defaultValue~}"/>';
com.art.core.components.Email = function(a) {
  this.setProperties(a);
  this.inheritArrays()
};
com.art.core.components.Email.prototype = new com.art.core.components.FormControl();
com.art.core.components.Email.prototype.tagName = "Email";
com.art.core.components.Email.prototype.className = "core_Email";
com.art.core.components.Email.prototype.templateInput = '<input type="email" id="{~id~}" class="{~className~} core_form_field" value="{~defaultValue~}"/>';
com.art.core.components.Password = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.postDOMInsertionCallbacks.push(this.copyAttributesToHint)
};
com.art.core.components.Password.prototype = new com.art.core.components.FormControl();
com.art.core.components.Password.prototype.tagName = "Password";
com.art.core.components.Password.prototype.className = "core_Password";
com.art.core.components.Password.prototype.copyAttributesToHint = function() {
  this.copyAttrToTag("_h")
};
com.art.core.components.Password.prototype.templateInput = '<input type="password" id="{~id~}" class="{~className~} core_form_field" style="display:none;" value=""/><input id="{~id~}_h" class="{~className~} core_form_field" style="" type=text value="{~defaultValue~}"/>';
com.art.core.components.TextArea = function(c) {
  this.setProperties(c);
  this.inheritArrays();
  var a = this;
  this.preRenderCallbacks.push(function() {
    if (a.maxLength <= 0) {
      a.maxLength = "";
      a.template = a.template.replace("{~count~}", "")
    } else {
      var d = a.getTemplateCharCount();
      this.template = this.template.replace(/\{~count~\}/g, d)
    }
  });
  this.postDOMInsertionCallbacks.push(function() {
    $("#" + a.id + "_label").css({
      "vertical-align": "top"
    });
    var d = [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46];
    $("#" + this.id).live("keypress",
    function(f) {
      var j = $(this),
      h = j.attr("maxlength"),
      e = $.data(this, "keycode");
      if (h && h > 0) {
        return j.val().length < h || $.inArray(e, d) !== -1
      }
    }).live("keyup",
    function() {
      $("#" + a.id + "_cnt").html(a.maxLength - $(this).val().length)
    });
    a.setValue(a.defaultValue)
  })
};
com.art.core.components.TextArea.prototype = new com.art.core.components.FormControl();
com.art.core.components.TextArea.prototype.tagName = "TextAreaField";
com.art.core.components.TextArea.prototype.className = "core_TextArea";
com.art.core.components.Component.addProperty(com.art.core.components.FormControl, "translatedContent", {
  charRemaining: "[COUNT] characters remaining"
});
com.art.core.components.TextArea.prototype.getTemplateCharCount = function() {
  var a = this.translatedContent.charRemaining.replace("[COUNT]", "<span id='" + this.id + "_cnt'></span>");
  return "<div id='" + this.id + "_cntdown' class='core_form_cntdown'>" + a + "</div>"
};
com.art.core.components.TextArea.prototype.setValue = function(a) {
  if (this.maxLength > 0) {
    $("#" + this.id + "_cnt").html(this.maxLength - a.length)
  }
  $("#" + this.id).val(a)
};
com.art.core.components.TextArea.prototype.getTemplate = function() {
  var a = this;
  a.surroundTemplate();
  if (a.factory.maxLength > 0) {
    a.postDOMInsertionCallbacks.push(function() {
      var c = a.getHTMLNode();
      if (c) {
        c.setAttribute("maxlength", a.maxLength)
      }
    })
  }
  return a.render()
};
com.art.core.components.TextArea.prototype.registerEvents = function() {
  this.onDOMInsertion(this)
};
com.art.core.components.TextArea.prototype.templateInput = '<textarea id="{~id~}" class="{~className~} core_form_field">{~defaultValue~}</textarea>{~count~}';
com.art.core.components.CheckboxList = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.items = a.data;
  this.preRenderCallbacks.push(this.renderContents);
  this.postDOMInsertionCallbacks.push(this.registerEventsThis)
};
com.art.core.components.CheckboxList.prototype = new com.art.core.components.FormControl();
com.art.core.components.CheckboxList.prototype.tagName = "CheckboxList";
com.art.core.components.CheckboxList.prototype.className = "core_CheckboxList";
com.art.core.components.Component.addProperty(com.art.core.components.CheckboxList, "itemChangeHandler", "");
com.art.core.components.Component.addProperty(com.art.core.components.CheckboxList, "selectedIndex", null);
com.art.core.components.Component.addProperty(com.art.core.components.CheckboxList, "selectedLabel", "");
com.art.core.components.Component.addProperty(com.art.core.components.CheckboxList, "selectedValue", "");
com.art.core.components.Component.addProperty(com.art.core.components.CheckboxList, "translatedContent", {
  nullOptionValue: "xx",
  nullOptionLabel: "Please Select..."
});
com.art.core.components.CheckboxList.prototype.renderContents = function() {
  var data;
  if (this.factory && this.factory.data) {
    data = this.factory.data
  } else {
    data = this.data;
    if (!this.factory) {
      this.factory = {}
    }
    this.factory.data = this.data
  }
  if (typeof(data) == "string") {
    if (data.substr(0, 1) == "{") {
      data = this.eval(data)
    } else {
      var a = $art.XMLUtil.xmlToJson(data, {
        returnType: "object"
      });
      data = a.item ? a.item: a.Item
    }
  }
  this.data = data;
  switch (true) {
  case(this.selectedIndex != null) : this.setSelected({
      index: this.selectedIndex
    });
    break;
  case (this.selectedLabel != "") : this.setSelected({
      label: this.selectedLabel
    });
    break;
  case (this.selectedValue != "") : this.setSelected({
      value: this.selectedValue
    });
    break
  }
  var html = "";
  var row = "";
  for (var i = 0; i < data.length; i++) {
    row = this.itemTemplate;
    row = row.replace(/\{~id~\}/g, this.id);
    row = row.replace(/\{~count~\}/g, i);
    row = row.replace(/\{~item.label~\}/g, data[i].label);
    row = row.replace(/\{~item.value~\}/g, data[i].value);
    if (i == this.selectedIndex || data[i].selected == "true") {
      row = row.replace(/\{~item.selected~\}/g, ' checked="checked"')
    } else {
      row = row.replace(/\{~item.selected~\}/g, "")
    }
    html += row
  }
  this.content = html
};
com.art.core.components.CheckboxList.prototype.setSelected = function(h, d) {
  var f = "",
  c = "";
  if (typeof(h) == "number") {
    f = "index";
    c = h
  }
  if (typeof(h) == "string") {
    f = "value";
    c = h
  }
  if (typeof(h) == "object") {
    switch (true) {
    case ! isNullOrEmpty(h.index) : f = "index";
      c = h.index;
      break;
    case ! isNullOrEmpty(h.label) : f = "label";
      c = h.label;
      break;
    case ! isNullOrEmpty(h.value) : f = "value";
      c = h.value;
      break;
    default:
      error("CheckboxList > setSelected > supplied object does not have an index, label, or value property.");
      return
    }
  }
  var e = -1;
  switch (f) {
  case "index":
    e = h;
    break;
  case "label":
  case "value":
    for (var a = 0; a < this.data.length; a++) {
      if (this.data[a][f] == c) {
        e = a;
        break
      }
    }
  }
  if (e < 0 || e > this.data.length) {
    error("CheckboxList > setSelected > selected index was out of bounds.");
    return
  }
  this.selectedIndex = e;
  if (d && d.update) {
    this.update()
  }
};
com.art.core.components.CheckboxList.prototype.registerEventsThis = function() {
  $(".core_form_checkbox").bind("mouseover",
  function() {
    $(this).addClass("core_form_event_hover")
  });
  $(".core_form_checkbox").bind("mouseout",
  function() {
    $(this).removeClass("core_form_event_hover")
  });
  $(".core_form_checkbox").bind("click",
  function() {
    var a = "#" + this.id + " input";
    if ($(a).attr("checked") == "checked") {
      $(a).removeAttr("checked")
    } else {
      $(a).attr("checked", "checked")
    }
    $(a).focus()
  });
  $(".core_form_checkbox input").bind("click",
  function(a) {
    $(this).focus();
    a.stopImmediatePropagation()
  })
};
com.art.core.components.CheckboxList.prototype.setValue = function(a) {
  if (this.doesValueExist(a)) {
    if (a != $("#" + this.id).val()) {
      $("#" + this.id).val(a);
      $("#" + this.id).change()
    }
  } else {
    if (!this.doesValueExist(this.translatedContent.nullOptionValue)) {
      $("#" + this.id).prepend("<option value='" + this.translatedContent.nullOptionValue + "'>" + this.translatedContent.nullOptionLabel + "</option>");
      this.setValue(this.translatedContent.nullOptionValue)
    }
  }
};
com.art.core.components.CheckboxList.prototype.getValue = function() {
  var a = [];
  $("#" + this.id + " :checked").each(function() {
    a.push($(this).val())
  });
  return a.toString()
};
com.art.core.components.CheckboxList.prototype.doesValueExist = function(c) {
  var a = false;
  $("#" + this.id + "").each(function() {
    if (this.value == c) {
      a = true
    }
  });
  return a
};
com.art.core.components.CheckboxList.prototype.templateInput = "<div id={~id~}>{~content~}</div>";
com.art.core.components.CheckboxList.prototype.itemTemplate = '<span id="{~id~}_checkbox_{~count~}" class="core_form_checkbox core_form_label" ><input type="checkbox"{~item.selected~} id="{~id~}_{~count~}" name="{~id~}_chk" value="{~item.value~}"/>&nbsp;{~item.label~}</span>';
com.art.core.components.RadiobuttonList = function(a) {
  this.setProperties(a);
  this.inheritArrays();
  this.items = a.data;
  this.preRenderCallbacks.push(this.renderContents);
  this.postDOMInsertionCallbacks.push(this.registerEventsThis)
};
com.art.core.components.RadiobuttonList.prototype = new com.art.core.components.FormControl();
com.art.core.components.RadiobuttonList.prototype.tagName = "RadiobuttonList";
com.art.core.components.RadiobuttonList.prototype.className = "core_RadiobuttonList";
com.art.core.components.Component.addProperty(com.art.core.components.RadiobuttonList, "itemChangeHandler", "");
com.art.core.components.Component.addProperty(com.art.core.components.RadiobuttonList, "selectedIndex", null);
com.art.core.components.Component.addProperty(com.art.core.components.RadiobuttonList, "selectedLabel", "");
com.art.core.components.Component.addProperty(com.art.core.components.RadiobuttonList, "selectedValue", "");
com.art.core.components.Component.addProperty(com.art.core.components.RadiobuttonList, "translatedContent", {
  nullOptionValue: "xx",
  nullOptionLabel: "Please Select..."
});
com.art.core.components.RadiobuttonList.prototype.renderContents = function() {
  var data;
  if (this.factory && this.factory.data) {
    data = this.factory.data
  } else {
    data = this.data;
    if (!this.factory) {
      this.factory = {}
    }
    this.factory.data = this.data
  }
  if (typeof(data) == "string") {
    if (data.substr(0, 1) == "{") {
      data = this.eval(data)
    } else {
      var a = $art.XMLUtil.xmlToJson(data, {
        returnType: "object"
      });
      data = a.item ? a.item: a.Item
    }
  }
  this.data = data;
  switch (true) {
  case(this.selectedIndex != null) : this.setSelected({
      index: this.selectedIndex
    });
    break;
  case (this.selectedLabel != "") : this.setSelected({
      label: this.selectedLabel
    });
    break;
  case (this.selectedValue != "") : this.setSelected({
      value: this.selectedValue
    });
    break
  }
  var html = "";
  var row = "";
  for (var i = 0; i < data.length; i++) {
    row = this.itemTemplate;
    row = row.replace(/\{~id~\}/g, this.id);
    row = row.replace(/\{~count~\}/g, i);
    row = row.replace(/\{~item.label~\}/g, data[i].label);
    row = row.replace(/\{~item.value~\}/g, data[i].value);
    if (i == this.selectedIndex || data[i].selected == "true") {
      row = row.replace(/\{~item.selected~\}/g, ' checked="checked"')
    } else {
      row = row.replace(/\{~item.selected~\}/g, "")
    }
    html += row
  }
  this.content = html
};
com.art.core.components.RadiobuttonList.prototype.setSelected = function(h, d) {
  var f = "",
  c = "";
  if (typeof(h) == "number") {
    f = "index";
    c = h
  }
  if (typeof(h) == "string") {
    f = "value";
    c = h
  }
  if (typeof(h) == "object") {
    switch (true) {
    case ! isNullOrEmpty(h.index) : f = "index";
      c = h.index;
      break;
    case ! isNullOrEmpty(h.label) : f = "label";
      c = h.label;
      break;
    case ! isNullOrEmpty(h.value) : f = "value";
      c = h.value;
      break;
    default:
      error("RadiobuttonList > setSelected > supplied object does not have an index, label, or value property.");
      return
    }
  }
  var e = -1;
  switch (f) {
  case "index":
    e = h;
    break;
  case "label":
  case "value":
    for (var a = 0; a < this.data.length; a++) {
      if (this.data[a][f] == c) {
        e = a;
        break
      }
    }
  }
  if (e < 0 || e > this.data.length) {
    error("RadiobuttonList > setSelected > selected index was out of bounds.");
    return
  }
  this.selectedIndex = e;
  if (d && d.update) {
    this.update()
  }
};
com.art.core.components.RadiobuttonList.prototype.registerEventsThis = function() {
  $(".core_form_radio").bind("mouseover",
  function() {
    $(this).addClass("core_form_event_hover")
  });
  $(".core_form_radio").bind("mouseout",
  function() {
    $(this).removeClass("core_form_event_hover")
  });
  $(".core_form_radio").bind("click",
  function() {
    var a = "#" + this.id + " input";
    if ($(a).attr("checked") == "checked") {
      $(a).removeAttr("checked")
    } else {
      $(a).attr("checked", "checked")
    }
    $(a).focus()
  });
  $(".core_form_radio input").bind("click",
  function(a) {
    $(this).focus();
    a.stopImmediatePropagation()
  })
};
com.art.core.components.RadiobuttonList.prototype.setValue = function(a) {
  if (this.doesValueExist(a)) {
    if (a != $("#" + this.id).val()) {
      $("#" + this.id).val(a);
      $("#" + this.id).change()
    }
  } else {
    if (!this.doesValueExist(this.translatedContent.nullOptionValue)) {
      $("#" + this.id).prepend("<option value='" + this.translatedContent.nullOptionValue + "'>" + this.translatedContent.nullOptionLabel + "</option>");
      this.setValue(this.translatedContent.nullOptionValue)
    }
  }
};
com.art.core.components.RadiobuttonList.prototype.getValue = function() {
  var a = [];
  $("#" + this.id + " :checked").each(function() {
    a.push($(this).val())
  });
  return a.toString()
};
com.art.core.components.RadiobuttonList.prototype.doesValueExist = function(c) {
  var a = false;
  $("#" + this.id + "").each(function() {
    if (this.value == c) {
      a = true
    }
  });
  return a
};
com.art.core.components.RadiobuttonList.prototype.templateInput = "<div id={~id~}>{~content~}</div>";
com.art.core.components.RadiobuttonList.prototype.itemTemplate = '<span id="{~id~}_radio_{~count~}" class="core_form_radio core_form_label" ><input type="radio"{~item.selected~} id="{~id~}_{~count~}" name="{~id~}_rad" value="{~item.value~}"/>&nbsp;{~item.label~}</span>';
com.art.core.jvml.JVML = function() {
  this.library = {
    components: [],
    data: [],
    control: []
  };
  this.getComponentLibrary = function(a) {
    if (this.library.components.length > 0 && !a) {
      return this.library.components
    }
    this.library.components = [];
    for (var c in com.art.core.components) {
      var d = com.art.core.components[c];
      if (typeof(d) == "function" && com.art.core.components.hasOwnProperty(c)) {
        this.library.components.push(d)
      }
    }
    for (var c in com.art.core.components.jvml) {
      var d = com.art.core.components.jvml[c];
      if (typeof(d) == "function" && com.art.core.components.jvml.hasOwnProperty(c)) {
        this.library.components.push(d)
      }
    }
    return this.library.components
  };
  this.library.addComponent = function(d) {
    if (! (d.prototype instanceof com.art.core.components.Component)) {
      var a = d.toString();
      a = a.substr(0, a.indexOf("{"));
      error("JVML > library > addComponent > cannot add component, as it does not extend com.art.core.components.Component. Tried to add: " + a);
      return
    }
    this.components.push(d)
  };
  this.library.listAll = function() {
    for (var d = 0; d < this.components.length; d++) {
      var a = this.components[d];
      info(a.prototype.tagName)
    }
  };
  this.library.data = [com.art.core.components.ItemRenderer];
  this.parse = function(j, a) {
    var k = new Date().getTime();
    if (!j && document && document.body) {
      j = document.body
    }
    var e = this.parser.parse(j, a);
    if (j == document.body) {
      if (this.documentComponents && this.documentComponents.length) {
        this.documentComponents = this.documentComponents.concat(e)
      } else {
        this.documentComponents = e
      }
      if (!this.documentComponents) {
        this.documentComponents = []
      }
      this.documentComponents = this.documentComponents.concat(e);
      this.document = {};
      this.document.components = {};
      for (var f = 0; f < e.length; f++) {
        var d = e[f];
        var h = d.id;
        this.document.components[h] = d
      }
    }
    var l = new Date().getTime();
    this.renderer.render(e, j);
    var m = new Date().getTime();
    info("com.art.core.jvml.Parser > parseAndRender > parsed in " + (l - k) + " ms. Rendered in " + (m - l) + " ms.  Total: " + (m - k) + " ms. Parsed " + e.length + " components.")
  };
  this.parseDocument = function(a) {
    this.parse(document.body, a)
  };
  this.go = function(c, a) {
    warn("JVML > please use $art.jvml.parseDocument() instead of go()");
    if (isNullOrEmpty(c)) {
      c = document.body
    }
    this.parse(c, a)
  };
  this.tagFinder = new com.art.core.jvml.TagFinder(this);
  this.parser = new com.art.core.jvml.Parser(this);
  this.renderer = new com.art.core.jvml.Renderer(this);
  this.getComponentById = function(a) {
    return this.getComponentById_recurse(a, this.documentComponents)
  };
  this.getComponentById_recurse = function(d, a) {
    for (var c in a) {
      if (a[c].id == d) {
        return a[c]
      }
      if (a[c].components) {
        var e = this.getComponentById_recurse(d, a[c].components);
        if (e) {
          return e
        }
      }
    }
  };
  this.dataNodes = [];
  this.getDataNode = function(c) {
    for (var a = 0; a < this.dataNodes.length; a++) {
      if (this.dataNodes[a].id == c) {
        return this.dataNodes[a]
      }
    }
    return null
  }
};
$art.jvml = new com.art.core.jvml.JVML();
$art.p = {};
art.jvml = $art.jvml;
var swfobject = function() {
  var ae = "undefined",
  aG = "object",
  aJ = "Shockwave Flash",
  aR = "ShockwaveFlash.ShockwaveFlash",
  aE = "application/x-shockwave-flash",
  aH = "SWFObjectExprInst",
  aS = "onreadystatechange",
  aB = window,
  ap = document,
  aK = navigator,
  aL = false,
  aN = [al],
  aA = [],
  az = [],
  ao = [],
  au,
  aF,
  ag,
  aa,
  aq = false,
  X = false,
  ay,
  ak,
  aw = true,
  ax = function() {
    var a = typeof ap.getElementById != ae && typeof ap.getElementsByTagName != ae && typeof ap.createElement != ae,
    k = aK.userAgent.toLowerCase(),
    m = aK.platform.toLowerCase(),
    f = m ? /win/.test(m) : /win/.test(k),
    d = m ? /mac/.test(m) : /mac/.test(k),
    h = /webkit/.test(k) ? parseFloat(k.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
    l = !+"\v1",
    j = [0, 0, 0],
    c = null;
    if (typeof aK.plugins != ae && typeof aK.plugins[aJ] == aG) {
      c = aK.plugins[aJ].description;
      if (c && !(typeof aK.mimeTypes != ae && aK.mimeTypes[aE] && !aK.mimeTypes[aE].enabledPlugin)) {
        aL = true;
        l = false;
        c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        j[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10);
        j[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
        j[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
      }
    } else {
      if (typeof aB.ActiveXObject != ae) {
        try {
          var e = new ActiveXObject(aR);
          if (e) {
            c = e.GetVariable("$version");
            if (c) {
              l = true;
              c = c.split(" ")[1].split(",");
              j = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]
            }
          }
        } catch(n) {}
      }
    }
    return {
      w3: a,
      pv: j,
      wk: h,
      ie: l,
      win: f,
      mac: d
    }
  } (),
  ar = function() {
    if (!ax.w3) {
      return
    }
    if ((typeof ap.readyState != ae && ap.readyState == "complete") || (typeof ap.readyState == ae && (ap.getElementsByTagName("body")[0] || ap.body))) {
      ah()
    }
    if (!aq) {
      if (typeof ap.addEventListener != ae) {
        ap.addEventListener("DOMContentLoaded", ah, false)
      }
      if (ax.ie && ax.win) {
        ap.attachEvent(aS,
        function() {
          if (ap.readyState == "complete") {
            ap.detachEvent(aS, arguments.callee);
            ah()
          }
        });
        if (aB == top) { (function() {
            if (aq) {
              return
            }
            try {
              ap.documentElement.doScroll("left")
            } catch(a) {
              setTimeout(arguments.callee, 0);
              return
            }
            ah()
          })()
        }
      }
      if (ax.wk) { (function() {
          if (aq) {
            return
          }
          if (!/loaded|complete/.test(ap.readyState)) {
            setTimeout(arguments.callee, 0);
            return
          }
          ah()
        })()
      }
      aI(ah)
    }
  } ();
  function ah() {
    if (aq) {
      return
    }
    try {
      var e = ap.getElementsByTagName("body")[0].appendChild(ac("span"));
      e.parentNode.removeChild(e)
    } catch(a) {
      return
    }
    aq = true;
    var c = aN.length;
    for (var d = 0; d < c; d++) {
      aN[d]()
    }
  }
  function at(a) {
    if (aq) {
      a()
    } else {
      aN[aN.length] = a
    }
  }
  function aI(c) {
    if (typeof aB.addEventListener != ae) {
      aB.addEventListener("load", c, false)
    } else {
      if (typeof ap.addEventListener != ae) {
        ap.addEventListener("load", c, false)
      } else {
        if (typeof aB.attachEvent != ae) {
          an(aB, "onload", c)
        } else {
          if (typeof aB.onload == "function") {
            var a = aB.onload;
            aB.onload = function() {
              a();
              c()
            }
          } else {
            aB.onload = c
          }
        }
      }
    }
  }
  function al() {
    if (aL) {
      aP()
    } else {
      am()
    }
  }
  function aP() {
    var c = ap.getElementsByTagName("body")[0];
    var a = ac(aG);
    a.setAttribute("type", aE);
    var e = c.appendChild(a);
    if (e) {
      var d = 0; (function() {
        if (typeof e.GetVariable != ae) {
          var f = e.GetVariable("$version");
          if (f) {
            f = f.split(" ")[1].split(",");
            ax.pv = [parseInt(f[0], 10), parseInt(f[1], 10), parseInt(f[2], 10)]
          }
        } else {
          if (d < 10) {
            d++;
            setTimeout(arguments.callee, 10);
            return
          }
        }
        c.removeChild(a);
        e = null;
        am()
      })()
    } else {
      am()
    }
  }
  function am() {
    var j = aA.length;
    if (j > 0) {
      for (var h = 0; h < j; h++) {
        var n = aA[h].id;
        var c = aA[h].callbackFn;
        var a = {
          success: false,
          id: n
        };
        if (ax.pv[0] > 0) {
          var f = ab(n);
          if (f) {
            if (ai(aA[h].swfVersion) && !(ax.wk && ax.wk < 312)) {
              aQ(n, true);
              if (c) {
                a.success = true;
                a.ref = aU(n);
                c(a)
              }
            } else {
              if (aA[h].expressInstall && Y()) {
                var l = {};
                l.data = aA[h].expressInstall;
                l.width = f.getAttribute("width") || "0";
                l.height = f.getAttribute("height") || "0";
                if (f.getAttribute("class")) {
                  l.styleclass = f.getAttribute("class")
                }
                if (f.getAttribute("align")) {
                  l.align = f.getAttribute("align")
                }
                var k = {};
                var m = f.getElementsByTagName("param");
                var d = m.length;
                for (var e = 0; e < d; e++) {
                  if (m[e].getAttribute("name").toLowerCase() != "movie") {
                    k[m[e].getAttribute("name")] = m[e].getAttribute("value")
                  }
                }
                aD(l, k, n, c)
              } else {
                aC(f);
                if (c) {
                  c(a)
                }
              }
            }
          }
        } else {
          aQ(n, true);
          if (c) {
            var o = aU(n);
            if (o && typeof o.SetVariable != ae) {
              a.success = true;
              a.ref = o
            }
            c(a)
          }
        }
      }
    }
  }
  function aU(a) {
    var c = null;
    var d = ab(a);
    if (d && d.nodeName == "OBJECT") {
      if (typeof d.SetVariable != ae) {
        c = d
      } else {
        var e = d.getElementsByTagName(aG)[0];
        if (e) {
          c = e
        }
      }
    }
    return c
  }
  function Y() {
    return ! X && ai("6.0.65") && (ax.win || ax.mac) && !(ax.wk && ax.wk < 312)
  }
  function aD(a, c, h, k) {
    X = true;
    ag = k || null;
    aa = {
      success: false,
      id: h
    };
    var f = ab(h);
    if (f) {
      if (f.nodeName == "OBJECT") {
        au = aj(f);
        aF = null
      } else {
        au = f;
        aF = h
      }
      a.id = aH;
      if (typeof a.width == ae || (!/%$/.test(a.width) && parseInt(a.width, 10) < 310)) {
        a.width = "310"
      }
      if (typeof a.height == ae || (!/%$/.test(a.height) && parseInt(a.height, 10) < 137)) {
        a.height = "137"
      }
      ap.title = ap.title.slice(0, 47) + " - Flash Player Installation";
      var e = ax.ie && ax.win ? "ActiveX": "PlugIn",
      d = "MMredirectURL=" + aB.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + e + "&MMdoctitle=" + ap.title;
      if (typeof c.flashvars != ae) {
        c.flashvars += "&" + d
      } else {
        c.flashvars = d
      }
      if (ax.ie && ax.win && f.readyState != 4) {
        var j = ac("div");
        h += "SWFObjectNew";
        j.setAttribute("id", h);
        f.parentNode.insertBefore(j, f);
        f.style.display = "none"; (function() {
          if (f.readyState == 4) {
            f.parentNode.removeChild(f)
          } else {
            setTimeout(arguments.callee, 10)
          }
        })()
      }
      aM(a, c, h)
    }
  }
  function aC(c) {
    if (ax.ie && ax.win && c.readyState != 4) {
      var a = ac("div");
      c.parentNode.insertBefore(a, c);
      a.parentNode.replaceChild(aj(c), a);
      c.style.display = "none"; (function() {
        if (c.readyState == 4) {
          c.parentNode.removeChild(c)
        } else {
          setTimeout(arguments.callee, 10)
        }
      })()
    } else {
      c.parentNode.replaceChild(aj(c), c)
    }
  }
  function aj(c) {
    var a = ac("div");
    if (ax.win && ax.ie) {
      a.innerHTML = c.innerHTML
    } else {
      var f = c.getElementsByTagName(aG)[0];
      if (f) {
        var d = f.childNodes;
        if (d) {
          var e = d.length;
          for (var h = 0; h < e; h++) {
            if (! (d[h].nodeType == 1 && d[h].nodeName == "PARAM") && !(d[h].nodeType == 8)) {
              a.appendChild(d[h].cloneNode(true))
            }
          }
        }
      }
    }
    return a
  }
  function aM(l, j, n) {
    var m, a = ab(n);
    if (ax.wk && ax.wk < 312) {
      return m
    }
    if (a) {
      if (typeof l.id == ae) {
        l.id = n
      }
      if (ax.ie && ax.win) {
        var k = "";
        for (var f in l) {
          if (l[f] != Object.prototype[f]) {
            if (f.toLowerCase() == "data") {
              j.movie = l[f]
            } else {
              if (f.toLowerCase() == "styleclass") {
                k += ' class="' + l[f] + '"'
              } else {
                if (f.toLowerCase() != "classid") {
                  k += " " + f + '="' + l[f] + '"'
                }
              }
            }
          }
        }
        var h = "";
        for (var e in j) {
          if (j[e] != Object.prototype[e]) {
            h += '<param name="' + e + '" value="' + j[e] + '" />'
          }
        }
        a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + k + ">" + h + "</object>";
        az[az.length] = l.id;
        m = ab(l.id)
      } else {
        var o = ac(aG);
        o.setAttribute("type", aE);
        for (var d in l) {
          if (l[d] != Object.prototype[d]) {
            if (d.toLowerCase() == "styleclass") {
              o.setAttribute("class", l[d])
            } else {
              if (d.toLowerCase() != "classid") {
                o.setAttribute(d, l[d])
              }
            }
          }
        }
        for (var c in j) {
          if (j[c] != Object.prototype[c] && c.toLowerCase() != "movie") {
            af(o, c, j[c])
          }
        }
        a.parentNode.replaceChild(o, a);
        m = o
      }
    }
    return m
  }
  function af(e, c, d) {
    var a = ac("param");
    a.setAttribute("name", c);
    a.setAttribute("value", d);
    e.appendChild(a)
  }
  function aT(c) {
    var a = ab(c);
    if (a && a.nodeName == "OBJECT") {
      if (ax.ie && ax.win) {
        a.style.display = "none"; (function() {
          if (a.readyState == 4) {
            Z(c)
          } else {
            setTimeout(arguments.callee, 10)
          }
        })()
      } else {
        a.parentNode.removeChild(a)
      }
    }
  }
  function Z(d) {
    var c = ab(d);
    if (c) {
      for (var a in c) {
        if (typeof c[a] == "function") {
          c[a] = null
        }
      }
      c.parentNode.removeChild(c)
    }
  }
  function ab(d) {
    var a = null;
    try {
      a = ap.getElementById(d)
    } catch(c) {}
    return a
  }
  function ac(a) {
    return ap.createElement(a)
  }
  function an(d, a, c) {
    d.attachEvent(a, c);
    ao[ao.length] = [d, a, c]
  }
  function ai(d) {
    var c = ax.pv,
    a = d.split(".");
    a[0] = parseInt(a[0], 10);
    a[1] = parseInt(a[1], 10) || 0;
    a[2] = parseInt(a[2], 10) || 0;
    return (c[0] > a[0] || (c[0] == a[0] && c[1] > a[1]) || (c[0] == a[0] && c[1] == a[1] && c[2] >= a[2])) ? true: false
  }
  function aO(d, h, e, c) {
    if (ax.ie && ax.mac) {
      return
    }
    var a = ap.getElementsByTagName("head")[0];
    if (!a) {
      return
    }
    var f = (e && typeof e == "string") ? e: "screen";
    if (c) {
      ay = null;
      ak = null
    }
    if (!ay || ak != f) {
      var j = ac("style");
      j.setAttribute("type", "text/css");
      j.setAttribute("media", f);
      ay = a.appendChild(j);
      if (ax.ie && ax.win && typeof ap.styleSheets != ae && ap.styleSheets.length > 0) {
        ay = ap.styleSheets[ap.styleSheets.length - 1]
      }
      ak = f
    }
    if (ax.ie && ax.win) {
      if (ay && typeof ay.addRule == aG) {
        ay.addRule(d, h)
      }
    } else {
      if (ay && typeof ap.createTextNode != ae) {
        ay.appendChild(ap.createTextNode(d + " {" + h + "}"))
      }
    }
  }
  function aQ(d, a) {
    if (!aw) {
      return
    }
    var c = a ? "visible": "hidden";
    if (aq && ab(d)) {
      ab(d).style.visibility = c
    } else {
      aO("#" + d, "visibility:" + c)
    }
  }
  function av(c) {
    var d = /[\\\"<>\.;]/;
    var a = d.exec(c) != null;
    return a && typeof encodeURIComponent != ae ? encodeURIComponent(c) : c
  }
  var ad = function() {
    if (ax.ie && ax.win) {
      window.attachEvent("onunload",
      function() {
        var d = ao.length;
        for (var c = 0; c < d; c++) {
          ao[c][0].detachEvent(ao[c][1], ao[c][2])
        }
        var h = az.length;
        for (var a = 0; a < h; a++) {
          aT(az[a])
        }
        for (var f in ax) {
          ax[f] = null
        }
        ax = null;
        for (var e in swfobject) {
          swfobject[e] = null
        }
        swfobject = null
      })
    }
  } ();
  return {
    registerObject: function(c, d, a, f) {
      if (ax.w3 && c && d) {
        var e = {};
        e.id = c;
        e.swfVersion = d;
        e.expressInstall = a;
        e.callbackFn = f;
        aA[aA.length] = e;
        aQ(c, false)
      } else {
        if (f) {
          f({
            success: false,
            id: c
          })
        }
      }
    },
    getObjectById: function(a) {
      if (ax.w3) {
        return aU(a)
      }
    },
    embedSWF: function(c, k, f, j, m, a, n, e, h, d) {
      var l = {
        success: false,
        id: k
      };
      if (ax.w3 && !(ax.wk && ax.wk < 312) && c && k && f && j && m) {
        aQ(k, false);
        at(function() {
          f += "";
          j += "";
          var p = {};
          if (h && typeof h === aG) {
            for (var r in h) {
              p[r] = h[r]
            }
          }
          p.data = c;
          p.width = f;
          p.height = j;
          var s = {};
          if (e && typeof e === aG) {
            for (var q in e) {
              s[q] = e[q]
            }
          }
          if (n && typeof n === aG) {
            for (var o in n) {
              if (typeof s.flashvars != ae) {
                s.flashvars += "&" + o + "=" + n[o]
              } else {
                s.flashvars = o + "=" + n[o]
              }
            }
          }
          if (ai(m)) {
            var t = aM(p, s, k);
            if (p.id == k) {
              aQ(k, true)
            }
            l.success = true;
            l.ref = t
          } else {
            if (a && Y()) {
              p.data = a;
              aD(p, s, k, d);
              return
            } else {
              aQ(k, true)
            }
          }
          if (d) {
            d(l)
          }
        })
      } else {
        if (d) {
          d(l)
        }
      }
    },
    switchOffAutoHideShow: function() {
      aw = false
    },
    ua: ax,
    getFlashPlayerVersion: function() {
      return {
        major: ax.pv[0],
        minor: ax.pv[1],
        release: ax.pv[2]
      }
    },
    hasFlashPlayerVersion: ai,
    createSWF: function(d, c, a) {
      if (ax.w3) {
        return aM(d, c, a)
      } else {
        return undefined
      }
    },
    showExpressInstall: function(e, a, c, d) {
      if (ax.w3 && Y()) {
        aD(e, a, c, d)
      }
    },
    removeSWF: function(a) {
      if (ax.w3) {
        aT(a)
      }
    },
    createCSS: function(a, e, d, c) {
      if (ax.w3) {
        aO(a, e, d, c)
      }
    },
    addDomLoadEvent: at,
    addLoadEvent: aI,
    getQueryParamValue: function(a) {
      var e = ap.location.search || ap.location.hash;
      if (e) {
        if (/\?/.test(e)) {
          e = e.split("?")[1]
        }
        if (a == null) {
          return av(e)
        }
        var d = e.split("&");
        for (var c = 0; c < d.length; c++) {
          if (d[c].substring(0, d[c].indexOf("=")) == a) {
            return av(d[c].substring((d[c].indexOf("=") + 1)))
          }
        }
      }
      return ""
    },
    expressInstallCallback: function() {
      if (X) {
        var a = ab(aH);
        if (a && au) {
          a.parentNode.replaceChild(au, a);
          if (aF) {
            aQ(aF, true);
            if (ax.ie && ax.win) {
              au.style.display = "block"
            }
          }
          if (ag) {
            ag(aa)
          }
        }
        X = false
      }
    }
  }
} ();
var urlForUTE = unescape(window.location.href);
var UTEuserAgent = navigator.userAgent.toLowerCase();
var UTEBrie6 = ((UTEuserAgent.indexOf("msie 6") != -1));
var UTEBrie7 = ((UTEuserAgent.indexOf("msie 7") != -1));
if ((urlForUTE.indexOf("/mountshop/") != -1) || (UTEBrie6 == true) || (UTEBrie7 == true)) {
  var pixel = new Image();
  var currentDate = new Date();
  currentDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  pixel.src = "/asp/UTERecording.asp?UTE.REF=" + escape(document.referrer) + "&UTE.LOC=" + escape(window.location) + "&UTE.TS=" + currentDate
} else {
  var pixel = new Image();
  var currentDate = new Date();
  currentDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  pixel.src = "/asp/UTERecording.asp?UTE.REF=" + escape(document.referrer) + "&UTE.LOC=" + escape(window.location) + "&UTE.TS=" + currentDate
};
var XMLHttpFactories = [function() {
  return new XMLHttpRequest()
},
function() {
  return new ActiveXObject("Msxml2.XMLHTTP")
},
function() {
  return new ActiveXObject("Msxml3.XMLHTTP")
},
function() {
  return new ActiveXObject("Microsoft.XMLHTTP")
}];
var tGuaranteePop;
$(document).ready(function() {
  $(".guarantee-icon").live("mouseover",
  function() {
    if (!$(this).hasClass("guarantee-icon-hover")) {
      $(this).addClass("guarantee-icon-hover")
    }
    var c = 110;
    var a = 40;
    if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
      c = c + 10;
      a = a + 10
    }
    $(".guarantee-popup").css("left", $(this).offset().left - a + "px");
    $(".guarantee-popup").css("top", $(this).offset().top - c + "px");
    clearTimeout(tGuaranteePop);
    tGuaranteePop = setTimeout("showGuaranteePopUp()", 500)
  });
  $(".guarantee-icon").live("mouseleave",
  function() {
    if ($(".guarantee-icon").hasClass("guarantee-icon-hover")) {
      $(".guarantee-icon").removeClass("guarantee-icon-hover")
    }
    clearTimeout(tGuaranteePop);
    tGuaranteePop = setTimeout("hideGuaranteePopUp()", 500)
  });
  $(".guarantee-popup").hover(function() {
    clearTimeout(tGuaranteePop)
  },
  function() {
    clearTimeout(tGuaranteePop);
    tGuaranteePop = setTimeout("hideGuaranteePopUp()", 500)
  });
  if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
    $("<style>.guarantee-popup {filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=225, Color='#e2e2e2'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=45, Color='#e2e2e2'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#e2e2e2'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=315, Color='#e2e2e2');}</style>").appendTo("head")
  }
});
function showGuaranteePopUp() {
  clearTimeout(tGuaranteePop);
  $(".guarantee-popup").fadeIn()
}
function hideGuaranteePopUp() {
  clearTimeout(tGuaranteePop);
  $(".guarantee-popup").hide()
}
function getCropperUrl(a) {
  var f;
  var l, h;
  if (a.indexOf("http://") > -1) {
    f = a
  } else {
    var e = superZoomImageTemplate;
    var c = a.indexOf(".");
    var d = c == -1 ? a: a.substring(0, c);
    f = e.replace("$IMG_ID", d)
  }
  if (typeof window.innerWidth != "undefined") {
    l = window.innerWidth * 0.92;
    h = window.innerHeight * 0.92
  } else {
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      l = document.documentElement.clientWidth * 0.92;
      h = document.documentElement.clientHeight * 0.92
    } else {
      l = $(window).width() * 0.92;
      h = $(window).height() * 0.92
    }
  }
  var k = com.art.core.utils.BrowserUtil.getCroppedImageUrl(f, Math.round(l), Math.round(h), com.art.core.utils.BrowserUtil.cropperModes.NONE);
  return k
}
function createXMLHTTPObject() {
  var d = false;
  for (var c = 0; c < XMLHttpFactories.length; c++) {
    try {
      d = XMLHttpFactories[c]()
    } catch(a) {
      continue
    }
    break
  }
  return d
}
function validateAndSaveEmail(e, c) {
  var a = false;
  var f = e.email.value;
  var d = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (d.test(f)) {
    document.getElementById(c).style.visibility = "hidden";
    a = true
  } else {
    document.getElementById(c).style.visibility = "visible";
    return (false)
  }
  if (a) {
    req = createXMLHTTPObject();
    if (!req) {
      return
    }
    userEmail = e.email.value;
    req.open("GET", "/asp/newsletter/saveEmail.asp?email=" + (userEmail), true);
    req.send(null);
    return true
  }
}
var CHECK_BLANK = 1;
var CHECK_REGEXP_EMAIL = 2;
function htmlControl(d, a, c) {
  this.IsValid = false;
  this.objControl = d;
  this.arEvals = a;
  this.arMessages = c
}
function htmlForm(d, a, c) {
  this.objForm = d;
  this.submitForm = false;
  this.ArrayControls = a;
  this.ErrorLabel = c
}
htmlForm.prototype.validateForm = validateForm;
function RaiseError(c, a) {
  if (document.getElementById) {
    document.getElementById(c).style.display = ""
  } else {
    if (String(a).length > 0) {
      alert(a)
    }
  }
}
function HideError(a) {
  if (document.getElementById) {
    document.getElementById(a).style.display = "none"
  }
}
function validateForm() {
  var a = false;
  for (i = 0; i < this.ArrayControls.length; i++) {
    for (j = 0; j < this.ArrayControls[i].arEvals.length; j++) {
      switch (this.ArrayControls[i].arEvals[j]) {
      case CHECK_BLANK:
        if (String(this.ArrayControls[i].objControl.value).length <= 0) {
          RaiseError(this.ArrayControls[i].arMessages[j], "");
          this.ArrayControls[i].IsValid = false;
          a = true
        } else {
          HideError(this.ArrayControls[i].arMessages[j]);
          this.ArrayControls[i].IsValid = true
        }
        break;
      case CHECK_REGEXP_EMAIL:
        if (RegularExpressionValidatorEvaluateIsValid(this.ArrayControls[i].objControl, /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) == false) {
          RaiseError(this.ArrayControls[i].arMessages[j], "");
          this.ArrayControls[i].IsValid = false;
          a = true
        } else {
          HideError(this.ArrayControls[i].arMessages[j]);
          this.ArrayControls[i].IsValid = true
        }
        break
      }
      if (this.ArrayControls[i].IsValid == false) {
        break
      }
    }
  }
  if (a) {
    if (this.ErrorLabel.length) {
      RaiseError(this.ErrorLabel, "")
    }
    this.submitForm = false
  } else {
    if (this.ErrorLabel.length) {
      HideError(this.ErrorLabel)
    }
    this.submitForm = true
  }
}
function RegularExpressionValidatorEvaluateIsValid(c, e) {
  var f = c.value;
  var d = new RegExp(e);
  var a = d.exec(f);
  return (a != null && f == a[0])
}
function disableCtrlModifer(e) {
  var d = {
    a: 0,
    c: 0,
    x: 0,
    n: 0,
    u: 0
  };
  var c = (window.event) ? window.event.ctrlKey: e.ctrlKey;
  var a = (window.event) ? window.event.altKey: e.altKey;
  var f = (window.event) ? window.event.keyCode: e.which;
  f = String.fromCharCode(f).toLowerCase();
  if (a) {
    window.location.reload(false);
    window.blur()
  }
  return (c && (f in d)) ? false: true
}
var bSentDiagnosticOnce = false;
function keyCapture(c) {
  var d = (c) ? c: (window.event) ? window.event: null;
  var f = "m";
  if (d) {
    var a = (window.event) ? window.event.ctrlKey: d.ctrlKey;
    var k = (window.event) ? window.event.shiftKey: d.shiftKey;
    var h = (window.event) ? window.event.keyCode: d.which;
    h = String.fromCharCode(h).toLowerCase();
    if (a && k && h == f && bSentDiagnosticOnce == false) {
      sendDiagnosticReport(true);
      bSentDiagnosticOnce = true
    }
  }
  return true
}
function sendDiagnosticReport(a) {
  req = createXMLHTTPObject();
  if (!req) {
    return
  }
  postString = "";
  if (a) {
    queryString = "popup=true"
  } else {
    queryString = "popup=false"
  }
  req.open("POST", "/asp/functions/diagnostics.asp?" + queryString);
  req.onreadystatechange = getResponseKeyCapture;
  req.send(postString)
}
function getResponseKeyCapture() {
  if (req.readyState == 4) {
    $("#dartContainer").html(req.responseText);
    $("#dartContainer").css("top", "150px");
    $("#dartContainer").css("left", "500px");
    $("#dartContainer").show()
  }
}
document.onkeydown = keyCapture;
function showFreeShippingDetails() {
  window.open("/asp/customerservice/freeShipping_popup.asp", "freeShipping", "status=0,toolbar=0,location=0,menubar=0,resizable=1,scrollbars=auto,height=425,width=450")
}
function getCookie(a) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(a + "=");
    if (c_start != -1) {
      c_start = c_start + a.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}
function SetCookieDictionary(f, e, h, l, p, k, q) {
  var d = String(GetCookieBase(f));
  var o = new String();
  if (d != null) {
    if (d.indexOf("=") > 0) {
      if (d.indexOf(e + "=") >= 0) {
        var a = d.split("&");
        var c = new Array();
        var n;
        for (var m = 0; m < a.length; m++) {
          n = String(a[m]).indexOf("=");
          c[0] = String(a[m]).substring(0, n);
          c[1] = String(a[m]).substring(n + 1);
          if (o.length != 0) {
            o += "&"
          }
          if (c[0] == e) {
            o += c[0] + "=" + escape(h)
          } else {
            o += c[0] + "=" + escape(c[1])
          }
        }
        SetCookie(f, o, l, p, k, q)
      } else {
        o = d + "&" + e + "=" + h;
        SetCookie(f, o, l, p, k, q)
      }
    } else {}
  } else {
    o = e + "=" + h;
    SetCookie(f, o, l, p, k, q)
  }
}
function GetCookieDictionary(e, d) {
  var h = "";
  var k = String(GetCookieBase(e));
  var c;
  var a;
  if (k != null) {
    c = k.split("&");
    for (var f = 0; f < c.length; f++) {
      a = c[f].split("=");
      if (a[0] == d) {
        h = a[1];
        return h
      }
    }
  }
  return h
}
function GetCookieBase(h) {
  var c = h + "=";
  var a = c.length;
  var d = document.cookie.length;
  var e = 0;
  while (e < d) {
    var f = e + a;
    if (document.cookie.substring(e, f) == c) {
      return GetCookieVal(f)
    }
    e = document.cookie.indexOf(" ", e) + 1;
    if (e == 0) {
      break
    }
  }
  return null
}
function SetCookie(e, k, d, f, c, h) {
  var a = e + "=" + (k) + ((d) ? "; expires=" + d.toGMTString() : "") + ((f) ? "; path=" + f: "") + ((c) ? "; domain=" + c: "") + ((h) ? "; secure": "");
  document.cookie = a
}
function GetCookieVal(c) {
  var a = document.cookie.indexOf(";", c);
  if (a == -1) {
    a = document.cookie.length
  }
  return unescape(document.cookie.substring(c, a))
}
function getQueryStringValue(a) {
  a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var d = "[\\?&]" + a + "=([^&#]*)";
  var c = new RegExp(d);
  var e = c.exec(window.location.href);
  if (e == null) {
    return ""
  } else {
    return e[1]
  }
}
isessionpicked = isSessionRandomPicked();
isessionNumrepeat = false;
israndomPicked = true;
function isSessionRandomPicked() {
  var d = "";
  var c = false;
  var a = "";
  d = getCookie("CustSessionID");
  if (d == "") {
    d = getQueryStringValue("ui")
  }
  if (d != "") {
    a = d.charAt(d.length - 1);
    if (a == "0" || a == "4" || a == "8" || a == "A" || a == "B") {
      c = true
    }
  }
  return c
}
function highlightSearchBox(c, a) {
  theBorder = $("#searchBorder");
  theTextBox = document.getElementById("Search_String");
  if (c == "over") {
    if (theBorder.length) {
      theBorder.css("borderColor", "#FFCC00")
    }
  }
  if (c == "out") {
    if (!a) {
      if (theTextBox.value == "SEARCH over 500,000 prints") {
        theBorder.style.borderColor = "#000000"
      } else {
        theBorder.style.borderColor = "#FFCC00"
      }
    } else {
      if (theBorder.length) {
        if (theTextBox.value == "") {
          theBorder.css("borderColor", "#000000")
        } else {
          theBorder.css("borderColor", "#FFCC00")
        }
      }
    }
  }
}
function LoadAdchemy(a) {
  var c = '<iframe src="http://banner.adchemy.com/bcs/retargetpixel?customer=art.com' + a + '"" width="2" height="2" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#000000"></iframe>';
  $("#HeaderLogo").append(c)
}
function MyGalLandingPage(a) {
  var c = "";
  c = "http://" + window.location.hostname + a;
  window.location.href = c
}
function GetCookieDomain() {
  var c = ".art.com";
  var d;
  d = window.location.hostname;
  var a = d.indexOf(".art");
  if (a > 0) {
    c = d.substring(a)
  }
  return c
}
var sStringPlatform = self.navigator.platform;
var sStringBrowser = self.navigator.userAgent;
if ("Mac" == sStringPlatform.substring(0, 3) && "Moz" == sStringBrowser.substring(0, 3)) {
  $(".HeaderMenubar").css("padding-top", "8px");
  $(".HeaderMenubar").css("padding-bottom", "7px");
  $(".headerMnuLink").css("padding-top", "9px");
  $(".headerMnuLink").css("padding-bottom", "8px")
}
function isiOSDevice() {
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
    return true
  } else {
    return false
  }
};
function link(a) {
  document.location = a
}
function openLink(a) {
  window.open(a)
}
function getValidPageNameForLiveChat() {
  var a = $('meta[name="WT.cg_n"]').attr("content");
  if (a == null || a == "") {
    a = "header location";
    return a
  }
  a = a.toLowerCase();
  if (a.indexOf("gallery") != -1) {
    a = "Gallery Page"
  } else {
    if (a.indexOf("product") != -1) {
      a = "Product Page"
    } else {
      if (a.indexOf("view") != -1) {
        a = "Cart Page"
      }
    }
  }
  return a
}
var lbHeaderHelp;
var cookieobject;
var iClick;
$(document).ready(function() {
  var n = navigator.userAgent;
  iClick = (n.match(/iPad/i)) ? "touchstart": "click";
  lbHeaderHelp = new com.art.core.components.LightBox("lbHeaderHelp", "body", 0.7);
  toggleHeaderCart();
  $(window).scroll(function() {
    toggleHeaderCart()
  });
  $(window).resize(function() {
    toggleHeaderCart()
  });
  window.onscroll = function() {};
  var e = GetCookieDictionary("arts", "cookiedirective");
  if (e) {
    $(".cookiebanner").hide()
  }
  com.art.core.utils.BrowserUtil.hideLiveChatBasedonTimer();

  if (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod") {
    $(".MyGalleriesTrayModuleContainer").css("position", "static")
  }
  $(".hdr-account-menu-you-art,.hdr-top-head-you-plus-art").live("click",
  function() {
    window.location.href = getProfileKey()
  });
  $(".hdr-my-galleries").live("click",
  function() {
    window.location.href = getProfileKey() + "gallery/"
  });
  $(".hdr-account-menu-myaccount").live("click",
  function() {
    window.location.href = getProfileKey() + "?ac=true"
  });
  $("#SearchForm:input").live("click",
  function() {
    var o = $("#Search_String");
    if (o != null) {
      if (o.val().length > 1) {
        triggerSearch()
      }
    }
  });
  var d = false;
  $("#headerSearchDropdown").click(function() {
    d = true
  });
  $(document).bind("click",
  function(p) {
    var o = $(p.target);
    if (o.attr("id") != "headerSearchDropdown") {
      $("#nav-search-in-content").removeClass("nav-search-in-hover");
      $(".nav-down-arrow").removeClass("nav-down-arrow-hover");
      $("#nav-search-in-content").css("color", "#777777");
      d = false
    }
  });
  $("#headerSearchDropdown").change(function() {
    $("#nav-search-in-content").text($(this).find(":selected").text());
    $(this).css("background-color", "#fff");
    $(this).css("color", "#000");
    $(this).css("border-color", "#000");
    var s = $("#Search_String");
    if (s != null) {
      s.focus()
    }
    var p = "";
    if ($("#headerSearchDropdown")) {
      p = $("#headerSearchDropdown").val()
    }
    if (p == "mg") {
      $(".hdr-nav-right-searchby").css("width", "142px");
      $("#headerSearchDropdown").css("width", "142px");
      $("#nav-search-in-content").css("width", "135px");
      var q = 24;
      var o = 300 - (r + q);
      $(".searchButton").css("float", "right");
      $("#Search_String").css("width", "130");
      $(".searchButton").addClass("searchByButton")
    } else {
      var r = $(".hdr-nav-right-searchby").width();
      $(".hdr-nav-right-searchby").css("width", "85px");
      $("#headerSearchDropdown").css("width", "85px");
      $("#nav-search-in-content").css("width", "85px");
      var q = 24;
      var o = 300 - (r + q);
      $(".searchButton").css("float", "right");
      $("#Search_String").css("width", "180");
      $(".searchButton").addClass("searchByButton")
    }
  });
  $("#nav-search-in").live("mouseover",
  function() {
    $("#nav-search-in-content").addClass("nav-search-in-hover");
    $(".nav-down-arrow").addClass("nav-down-arrow-hover");
    $("#nav-search-in-content").css("color", "#ffffff")
  });
  $("#nav-search-in-content, #nav-search-in").live("mouseout",
  function() {
    if (!d) {
      $("#nav-search-in-content").removeClass("nav-search-in-hover");
      $(".nav-down-arrow").removeClass("nav-down-arrow-hover");
      $("#nav-search-in-content").css("color", "#777777")
    }
  });
  $("#hdr .link,#ftr .link").hover(function() {
    $(this).addClass("hdr-ftr-link-hover")
  },
  function() {
    $(this).removeClass("hdr-ftr-link-hover")
  });
  cookieobject = new com.art.core.cookie.Cookie();
  if (cookieobject.getCookieDictionary("ap", "ARvisited") != "") {
    $(".hdr-account-ar").removeClass("hidden")
  } else {
    $(".hdr-account-ar").addClass("hidden")
  }
  if ($("#museum-hdr").length) {
    SetCookieDictionary("arts", "IsMuseumMode", "true", "", "/", GetCookieDomain())
  }
  $(".hdr-art-logo img").bind("click",
  function() {
    ClearMuseumMode()
  });
  var c = "";
  c = cookieobject.getCookieDictionary("ap", "ct");
  if (c.length < 1) {
    c = "0"
  }
  $(".cart-count").text(c);
  var k = "";
  k = com.art.core.utils.BrowserUtil.getQueryString("sby");
  if (k.length > 0) {
    if (k == "title") {
      $("#headerSearchDropdown").val("title")
    } else {
      if (k == "artist") {
        $("#headerSearchDropdown").val("artist")
      } else {
        if (k == "mg") {
          $("#headerSearchDropdown").val("mg")
        } else {
          $("#headerSearchDropdown").val("all")
        }
      }
    }
    $("#nav-search-in-content").text($("#headerSearchDropdown").find(":selected").text())
  }
  $(".hdr-nav-right-searchby").show();
  $(".hdr-nav-right").css("width", "345px");
  $("#Search_String").val("");
  if (k == "mg") {
    $(".hdr-nav-right-searchby").css("width", "142px");
    $("#headerSearchDropdown").css("width", "142px");
    $("#nav-search-in-content").css("width", "135px");
    var l = 24;
    var h = 300 - (m + l);
    $(".searchButton").css("float", "right");
    $("#Search_String").css("width", "130");
    $(".searchButton").addClass("searchByButton")
  } else {
    var m = $(".hdr-nav-right-searchby").width();
    $(".hdr-nav-right-searchby").css("width", "85px");
    $("#headerSearchDropdown").css("width", "85px");
    $("#nav-search-in-content").css("width", "85px");
    var l = 24;
    var h = 300 - (m + l);
    $(".searchButton").css("float", "right");
    $("#Search_String").css("width", "180");
  }
  $(".searchButton").live("mouseover",
  function() {
    $(".searchButton").addClass("searchByButtonHover")
  });
  $(".searchButton").live("mouseout",
  function() {
    $(".searchButton").removeClass("searchByButtonHover")
  });
  $("#Search_String").keypress(function(o) {
    doSearch(o)
  });
  $("#SearchForm").submit(function() {
    searchString = $("#Search_String");
    var o = $("#hdr").find(".defaultSearchString").text();
    if (searchString.val().length < 1 || searchString.val() == o) {
      return false
    }
  });
  $("#hdr").find(".help").bind("click",
  function() {
    showHeaderHelp()
  });
  $("#hdr").find(".hdr-help-close").bind("click",
  function() {
    closeHeaderHelp()
  });
  $("#hdr-account-menu").find("ul").hover(function() {
    $("#hdr").find(".my-gallery .icon").addClass("hover")
  });
  $("#hdr-account-menu").find("ul li").hover(function() {
  },
  function() {
    $(this).removeClass("hover")
  });
  $("#hdr").find(".my-gallery").hover(function() {
    $(this).find(".icon").addClass("hover")
  },
  function() {
    if (!$("#hdr-account-menu").is(":visible")) {
      $(this).find(".icon").removeClass("hover")
    }
  });
  $(".login-trigger").bind("click",
  function() {
    var o = com.art.core.components.LoginModal.LOGIN;
    var p = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
      loginOption: o
    },
    {
      modulename: "GlobalHeader"
    });
    MyGalleriesCore.sendNotification(p)
  });
  $(".register-trigger").bind("click",
  function() {
    var o = com.art.core.components.LoginModal.REGISTER;
    var p = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
      loginOption: o
    },
    {
      modulename: "GlobalHeader"
    });
    MyGalleriesCore.sendNotification(p)
  });
  $(".logout-trigger").bind("click",
  function() {
    var o = new com.art.core.components.Logout("lg", {},
    {},
    {},
    {
      defaultFacebookAccountId: MyGalleriesCore.getEnvironment().facebookAccountId
    });
    o.registerCallback(com.art.core.components.Logout.events.LOGOUT,
    function() {
      var p = MyGalleriesCore.getModel().getLastSelectedGalleryKey();
      MyGalleriesCore.getModel().resetLastSelectedGalleryName("");
      MyGalleriesCore.getModel().resetGalleryIDCountCookie(p);
      MyGalleriesCore.getModel().setOneClickAddToGalleryEnabled(false);
      $("#autoSave").attr("checked", true);
      o.reloadPage();
      _gaq.push(["t1._setCustomVar", 3, "logged-in", "false", 1]);
      _gaq.push(["global._setCustomVar", 3, "logged-in", "false", 1])
    });
    o.logOut()
  });
  $("#hdr").find(".my-gallery").bind("click",
  function(q) {
    q.stopPropagation();
    var p = $("#hdr-account-menu");
    var o = $(this).find(".icon");
    if (p.is(":visible")) {
      o.removeClass("hover");
      p.hide()
    } else {
      var r = o.position();
      var t = r.top + o.height();
      var s = r.left + o.width() - p.width() + 10;
      p.css("top", t);
      p.css("left", s);
      o.addClass("hover");
      p.show()
    }
  });
  $(document).bind("click",
  function() {
    if ($("#hdr-account-menu").is(":visible")) {
      $("#hdr-account-menu").hide();
      $(this).find(".icon").removeClass("hover")
    }
  });
  /*
  $(document).one("mousemove",
  function() {
    if (!isiOS()) {
      showSkinnyBanner();
      var p = location.href;
      if (p.indexOf("/OrderConfirmation.aspx") < 0) {
        var o = new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_ITEMS_RECENT_GALLERY, {
          modulename: "RecentlyViewedModule"
        });
        MyGalleriesCore.sendNotification(o)
      }
    }
  });
  */
  if (isiOS()) {
    showSkinnyBanner()
  }
  if ($(window).width() < 1008) {
    $("head").append('<meta name="viewport" content="width=1064" />')
  }
  $("#banner-terms-link").live("click",
  function() {
    var p = $(this).offset();
    var q = p.top + $(this).height() + 5;
    var o = p.left - $("#banner-terms").width() + $(this).width() - 12;
    $("#banner-terms").css("top", q).css("left", o);
    $("#banner-terms").slideDown("fast")
  });
  $("#banner-terms-close").live("click",
  function() {
    $("#banner-terms").slideUp("fast")
  });
  $("#banner-terms-close").live("mouseenter",
  function() {
    $(this).addClass("hover")
  });
  $("#banner-terms-close").live("mouseleave",
  function() {
    $(this).removeClass("hover")
  });
  var f = $("#ftr-email").find(".ftr-email-default").text();
  $("#ftrEmailInput").val(f);
  $("#ftrEmailInput").focusin(function() {
    var o = $("#ftr-email").find(".ftr-email-default").text();
    if ($(this).val() == o) {
      $(this).val("")
    }
  });
  $("#ftrEmailInput").focusout(function() {
    var o = $("#ftr-email").find(".ftr-email-default").text();
    if ($(this).val() == "") {
      $(this).val(o)
    }
  });
  $("#ftrEmailForm").submit(function() {
    var o = $("#ftr-email").find(".error");
    o.hide();
    var s = false;
    var r = $("#ftrEmailInput").val();
    var q = $("#ftr-email-msg").find(".ftr-email-default").text();
    var t = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    cookieobject = new com.art.core.cookie.Cookie();
    var p = new Date(document.lastModified);
    p.setHours(p.getHours() - 7);
    db = p.toString();
    dc = db.split(" ");
    dte = dc[2] + "-" + dc[1] + "-" + dc[3];
    $("input[name=email_acq_date]").val(dte);
    $("input[name=country_iso2]").val(cookieobject.getCookieDictionary("arts", "CountryCode"));
    if (!IsProd()) {
      $("input[name=_ri_]").val("X0Gzc2X%3DWQpglLjHJlYQGovEIKbnA2UUOzaYysnN8qSgphuJVwjpnpgHlpgneHmgJoXX0Gzc2X%3DWQpglLjHJlYQGmqcWIL3gSu6Pzaczb9zdnvoIzaEuh6")
    }
    if (r.match(t)) {
      setupDCSCall();
      $.post("/asp/newsletter/saveEmail.asp", {
        email: $("#ftrEmailInput").val()
      },
      function(u) {});
      return true
    } else {
      o.fadeIn();
      return false
    }
  });
  $(".ftr-access-my-account").live("click",
  function() {
    window.location.href = getProfileKey() + "?ac=true"
  });
  if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
    $("<style>.shadow{filter: progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=225, Color='#888888'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=45, Color='#888888'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=135, Color='#888888'),\n progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=315, Color='#888888');}\n .shadow{margin:0 0 8px -8px !important;}</style>").appendTo("head")
  }
  var a = $("#ftr").parents(".PageContainer");
  if (a.length == 1) {
    $("#ftr").insertAfter(a)
  }
  $(".hdr-account-ar").bind("click",
  function(p) {
    var o = new com.art.core.cookie.Cookie();
    if (o.getCookieDictionary("ap", "ARlastVisited") != "") {
      arpage_hyperlink = o.getCookieDictionary("ap", "ARlastVisited")
    } else {
      arpage_hyperlink = MyGalleriesEnvironmentVariables.ArtistrisingDomainUS
    }
    SetARTCookie(arpage_hyperlink, "true")
  })
});
function isiOS() {
  return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1))
}
function showSkinnyBanner() {
  $.ajax({
    url: "/asp/include/global/promo.asp",
    cache: false,
    beforeSend: function() {
      return determineToShowBanner()
    },
    success: function(a) {
      $("#hdr").after(a);
      if ($("#skinny-banner-container").length) {
        if ($("#skinny-banner-placeholder").length) {
          $("#skinny-banner-placeholder").hide();
          $("#skinny-banner-container").show();
          $("#promo-container").fadeIn()
        } else {
          animateSkinnyBanner();
          SetCookieDictionary("arts", "bnr", "1", "", "/", GetCookieDomain())
        }
      } else {
        $("#skinny-banner-placeholder").slideUp();
        SetCookieDictionary("arts", "bnr", "0", "", "/", GetCookieDomain())
      }
    },
    error: function(c, d, a) {
      $("#skinny-banner-placeholder").slideUp();
      SetCookieDictionary("arts", "bnr", "0", "", "/", GetCookieDomain())
    },
    complete: function() {
      if (typeof skinnyBannerComplete == "function") {
        skinnyBannerComplete()
      }
    }
  })
}
function callCssToolBar() {
  $.ajax({
    url: "/asp/misc/csstoolbar.asp",
    cache: false,
    beforeSend: function() {},
    success: function(a) {
      $(a).insertBefore("#hdr")
    },
    error: function(c, d, a) {},
    complete: function() {}
  })
}
function setupDCSCall() {
  var a = $("#ftrEmailInput").val();
  if (a != "" && a != "Enter email address") {
    dcsMultiTrack("WT.ti", "Exclusives Offers and Updates", "DCS.dcsuri", "/footer/exclusive-offers-email-signup.aspx", "WT.dl", "10", "WT.z_em_l", a, "WT.cg_n", "Newsletter")
  }
}
function showHeaderHelp() {
  lbHeaderHelp.show();
  $("#hdr-help-box").css("z-index", "100010");
  var a = ($(window).width() / 2) - ($("#hdr-help-box").width() / 2);
  $("#hdr-help-box").css("left", a);
  $("#hdr-help-box").show()
}
function closeHeaderHelp() {
  lbHeaderHelp.close();
  $("#hdr-help-box").hide()
}
function toggleHeaderCart() {
  var c = $("#hdr").height();
  var d = $("#hdr").offset();
  var a = $("#hdr-help-cart");
  if (d == null) {
    d = 0
  }
  var e = d.top + c;
  var f = $(window).scrollTop();
  if (f > e) {
    if (!a.hasClass("fixed")) {
      a.hide();
      a.addClass("fixed");
      a.slideDown("fast")
    }
  } else {
    if (a.hasClass("fixed")) {
      a.removeClass("fixed")
    }
  }
}
function PositionTray() {
  var a = (window.pageYOffset + window.innerHeight - 30);
  $(".MyGalleriesTrayModuleContainer").css("top", a)
}
function updateHeaderSignIn(e, a) {
  var c = false;
  var d = false;
  switch (e) {
  case "LOGIN_SUCCESS":
    c = true;
    break;
  case "LOGIN_FACEBOOK_SUCCESS":
    c = true;
    break;
  case "LOGOUT_SUCCESS":
    d = true;
    break
  }
  if (c) {
    if (typeof afterLoginSuccess == "function") {
      afterLoginSuccess()
    } else {
      window.location.reload()
    }
  } else {
    if (d) {
      if (typeof afterLogoutSuccess == "function") {
        afterLogoutSuccess()
      } else {
        window.location.reload()
      }
    }
  }
}
$(document).ready(function() {
  var a = 975;
  $("#Header > div").each(function() {
    $(this).css("zIndex", a);
    a -= 1
  });
  $("#HeaderMyLinks span:nth-child(3)").mouseover(function() {
    var c = new com.art.core.components.ToolTip("tooltip");
    var d = $("#HeaderMyLinks span:nth-child(3)").offset();
    var e, f;
    e = d.left + 100;
    f = d.top;
    c.setToolTip("", "Collect, organize, and share your favorite art");
    var h = setTimeout(function() {
      c.render(e, f, "200")
    },
    1000);
    $("#HeaderMyLinks span:nth-child(3)").mouseout(function() {
      clearTimeout(h);
      c.destroy()
    })
  })
});
function IsProd() {
  var a = false;
  var d = location.hostname;
  var c = d.split(".", 2);
  if (c.length > 1) {
    c = c[0].toLowerCase();
    if (c == "www" || c == "eu") {
      a = true
    } else {
      a = false
    }
  }
  return a
}
function ClearMuseumMode() {
  SetCookieDictionary("arts", "IsMuseumMode", "", "", "/", GetCookieDomain())
}
function linkForm(a) {
  document.getElementById("globalLinkForm").action = a;
  document.getElementById("globalLinkForm").submit()
}
function triggerSearch() {
  var k = document.getElementById("Search_String");
  var h = k.value;
  var e = "";
  if ($("#headerSearchDropdown")) {
    e = $("#headerSearchDropdown").val()
  }
  if (h.length > 0) {
    var c = document.forms.SearchForm;
    if (!c) {
      c = document.SearchForm
    }
    var a = c.action.indexOf("searchstring=");
    if (a > 0) {
      c.action = c.action.replace(getQuerystring("searchstring", c.action), encodeURI(h))
    } else {
      if ($(".hdr-nav-right-searchby").is(":visible") && e.length > 0) {
        if (e == "mg") {
          var d = getProfileKey() + "gallery/?gs=" + encodeURI(h) + "&mtm=0&sby=" + e;
          c.action = d
        } else {
          c.action = c.action + "?searchstring=" + encodeURI(h) + "&SSK=" + encodeURI(h) + "&WT.oss=" + encodeURI(h) + "&sby=" + e
        }
      } else {
        c.action = c.action + "?searchstring=" + encodeURI(h) + "&SSK=" + encodeURI(h) + "&WT.oss=" + encodeURI(h)
      }
    }
    c.submit()
  }
}
function getQuerystring(a, e) {
  a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var d = new RegExp("[\\?&]" + a + "=([^&#]*)");
  var c = d.exec(e);
  if (c == null) {
    return ""
  } else {
    return c[1]
  }
}
function doSearch(a) {
  if (a.keyCode == "13") {
    triggerSearch()
  }
}
function SetARTCookie(a, e) {
  var d = new Date();
  d.setDate(d.getDate() + 730);
  var c = window.location.href;
  c = replaceAllString(c, "=", "|");
  c = replaceAllString(c, "&", "~~");
  SetCookieDictionary("ap", "ARTlastVisited", c, d, "/", GetCookieDomain());
  a = replaceAllString(a, "|", "=");
  a = replaceAllString(a, "~~", "&");
  a = replaceAllString(a, " ", "+");
  if (e == "true") {
    link(a)
  }
}
function replaceAllString(c, d, a) {
  while (c.indexOf(d) != -1) {
    c = c.replace(d, a)
  }
  return c
}
function getProfileKey() {
  var c = "";
  var a = new com.art.core.cookie.Cookie();
  if (a.getCookieDictionary("ap", "profileURL") != "") {
    c = a.getCookieDictionary("ap", "profileURL");
    return c
  }
}
function animateSkinnyBanner() {
  $("#skinny-banner-container").slideDown(function() {
    $("#promo-container").fadeIn()
  })
}
function determineToShowBanner() {
  var a = true;
  if (cookieobject.getCookieDictionary("arts", "IsMuseumMode") == "true") {
    a = false
  } else {
    if (typeof isMuseumMode != "undefined") {
      if (isMuseumMode) {
        a = false
      }
    }
  }
  if (a == false) {
    $("#skinny-banner-placeholder").slideUp();
    SetCookieDictionary("arts", "bnr", "0", "", "/", GetCookieDomain())
  }
  return a
}
function turnOnnewsearchfeatures() {
  $(".hdr-nav-right-searchby").show();
  $("#Search_String").removeClass("searchstringInput");
  $(".hdr-nav-right").css("width", "300px");
  $("#Search_String").val("");
  $("#Search_String").css("background-color", "#fff");
  $("#Search_String").css("border", "1px solid #D6D6D6");
  $("#Search_String").css("border-right", "0px");
  $("#Search_String").css("height", "22px");
  var e = $(".hdr-nav-right-searchby").width();
  $("#headerSearchDropdown").css("width", e + "px");
  var a = 101;
  var c = 54 - (e - a);
  c = a + c;
  c = c - 5 + "px";
  $("#Search_String").css("width", c);
  $(".searchButton").addClass("searchByButton");
  $("#Search_String").live("mouseover",
  function() {
    $(this).css("border", "1px solid #000")
  });
  $("#Search_String").live("mouseout",
  function() {
    $(this).css("border", "1px solid #D6D6D6");
    $(this).css("border-right", "0px")
  });
  $(".searchButton").live("mouseover",
  function() {
    $(".searchButton").addClass("searchByButtonHover")
  });
  $(".searchButton").live("mouseout",
  function() {
    $(".searchButton").removeClass("searchByButtonHover")
  });
  $("#Search_String").focusin(function() {
    $(this).css("border", "1px solid #000")
  });
  $("#Search_String").focusout(function() {
    $(this).css("border", "1px solid #D6D6D6");
    $(this).css("border-right", "0px")
  });
  var d = "";
  d = com.art.core.utils.BrowserUtil.getQueryString("sby");
  if (d.length > 0) {
    if (d == "title") {
      $("#headerSearchDropdown").val("title")
    } else {
      if (d == "artist") {
        $("#headerSearchDropdown").val("artist")
      } else {
        if (d == "mg") {
          $("#headerSearchDropdown").val("mg")
        } else {
          $("#headerSearchDropdown").val("all")
        }
      }
    }
    $("#nav-search-in-content").text($("#headerSearchDropdown").find(":selected").text())
  }
}
function cookieDirectiveAcknowledge() {
  var a = "";
  a = document.domain;
  var c = a.indexOf("art");
  a = a.substr(c);
  a = "." + a;
  $(".cookiebanner").hide();
  SetCookieDictionary("arts", "cookiedirective", "1", "", "/", a)
};
var hoverBackgroundColor = "E6DED5";
var hoverTextColor = "4C3327";
function findPos(c) {
  var a = curtop = 0;
  if (c.offsetParent) {
    a = c.offsetLeft;
    curtop = c.offsetTop;
    while (c = c.offsetParent) {
      a += c.offsetLeft;
      curtop += c.offsetTop
    }
  }
  return [a, curtop]
}
function fnDisplayMenu(d, c) {
  var a = document.getElementById(c);
  a.style.display = "block";
  if (c == "mnuArtStyles" || c == "mnuArtists") {
    var e = findPos(d);
    a.style.left = e[0] + "px"
  }
  fnHighlightTD(c);
  fnChangeMenuSeparatorColor(c, "hidden")
}
function fnHideMenu(c) {
  var a = document.getElementById(c);
  a.style.display = "none";
  fnChangeMenuSeparatorColor(c, "visible")
}
function fnHighlightTD(c) {
  var a = document.getElementById(c + "Link");
  a.style.backgroundColor = hoverBackgroundColor;
  a.style.color = hoverTextColor
}
function fnRemoveHighlight(c) {
  var a = document.getElementById(c + "Link");
  a.style.backgroundColor = hoverTextColor;
  a.style.color = "#FFFFFF"
}
function fnChangeMenuSeparatorColor(c, a) {
  var d = document.getElementById("divider1");
  var e = document.getElementById("divider2");
  var f = document.getElementById("divider3");
  var h = document.getElementById("divider4");
  var k = document.getElementById("divider5");
  switch (c) {
  case "mnuArtStyles":
    d.style.visibility = a;
    break;
  case "mnuSubjects":
    d.style.visibility = a;
    e.style.visibility = a;
    break;
  case "mnuArtists":
    e.style.visibility = a;
    f.style.visibility = a;
    break;
  case "mnuProductTypes":
    f.style.visibility = a;
    h.style.visibility = a;
    break;
  case "mnuCollections":
    h.style.visibility = a;
    k.style.visibility = a;
    break
  }
}
function fnUnderlineLink(a) {
  a.style.textDecoration = "underline";
  a.style.cursor = "pointer"
}
function fnRemoveUnderline(a) {
  a.style.textDecoration = "none";
  a.style.cursor = "arrow"
}
function fnGetMenuTopPosition() {
  var c = document.getElementById("CSContainer");
  var d = 0;
  if (c) {
    if (c.style.display != "none") {
      d = c.offsetHeight
    }
  }
  var a = $("#HeaderRight");
  var e = $("#HeaderBar");
  var f = 0;
  if (a.length && e.length) {
    f = parseInt(d) + parseInt(e.offsetHeight) + parseInt(a.offsetHeight)
  }
  return f
}
window.onload = function() {
  fnSetTopPosForHeaderMenu()
};
function fnSetTopPosForHeaderMenu() {
  var c = fnGetMenuTopPosition();
  var a = 0;
  a = $("#mnuArtStyles");
  a.css("Top", c);
  a = $("#mnuSubjects");
  a.css("Top", c);
  a = $("#mnuArtists");
  a.css("Top", c);
  a = $("#mnuProductTypes");
  a.css("Top", c);
  a = $("#mnuCollections");
  a.css("Top", c)
}; (function(a) {
  a.fn.touchwipe = function(d) {
    var c = {
      min_move_x: 20,
      min_move_y: 20,
      wipeLeft: function() {},
      wipeRight: function() {},
      wipeUp: function() {},
      wipeDown: function() {},
      preventDefaultEvents: true
    };
    if (d) {
      a.extend(c, d)
    }
    this.each(function() {
      var l;
      var m;
      var f = false;
      function e() {
        this.removeEventListener("touchmove", h);
        l = null;
        f = false
      }
      function h(p) {
        if (c.preventDefaultEvents) {
          p.preventDefault()
        }
        if (f) {
          var q = p.touches[0].pageX;
          var r = p.touches[0].pageY;
          var n = l - q;
          var o = m - r;
          if (Math.abs(n) >= c.min_move_x) {
            e();
            if (n > 0) {
              c.wipeLeft()
            } else {
              c.wipeRight()
            }
          } else {
            if (Math.abs(o) >= c.min_move_y) {
              e();
              if (o > 0) {
                c.wipeDown()
              } else {
                c.wipeUp()
              }
            }
          }
        }
      }
      function k(n) {
        if (n.touches.length == 1) {
          l = n.touches[0].pageX;
          m = n.touches[0].pageY;
          f = true;
          this.addEventListener("touchmove", h, false)
        }
      }
      if ("ontouchstart" in document.documentElement) {
        this.addEventListener("touchstart", k, false)
      }
    });
    return this
  }
})(jQuery);
com.art.myGalleries = {};
com.art.myGalleries.modules = {};
com.art.myGalleries.proxies = {};
com.art.myGalleries.components = {};
com.art.myGalleries.commands = {};
com.art.myGalleries.vos = {};
com.art.myGalleries.proxies.ApplicationProxy = function(a, d, c) {
  this.NAME = "ApplicationProxy";
  this.galleryPerPage = 16;
  this.galleryItemPerPage = 9;
  this.galleryList = [];
  this.galleryListForWebUser = [];
  this.galleryItemList = [];
  this.galleryListIsCachedFlag = false;
  this.cacheByGalleryList = {};
  this.cacheByGalleryListForWebUser = {};
  this.cacheByGalleryItemList = {};
  this.toggleDisplay = "";
  this.galleryItemPageNumber = -1;
  this.galleryDefaultSort = false;
  this.gallerySortBy = 0;
  this.gallerySortDirection = 1;
  this.getAllItemsFlag = true;
  this.ProfileUrl = "";
  this.myGalleryItemCount = 0;
  this.GalleryNamecookieCountValueSeparator = "~!";
  this.environment = a;
  this.environmentSub = c;
  this.galleryTemplate = {
    Name: null,
    GalleryItemSource: 4,
    GalleryId: null,
    GalleryVisibility: 1,
    BackGround: null,
    GalleryImage: {
      LargeImage: {
        HttpImageURL: ""
      }
    },
    ShortDescription: null,
    SortOptions: {
      SortBy: 0,
      SortDirection: 0,
      DefaultSort: true
    },
    LongDescription: null,
    StreamConfiguration: null,
    GalleryType: 0
  };
  this.galleryItemTemplate = {
    APNum: null,
    FrameSku: null,
    Imageid: 0,
    GalleryItemSource: 4,
    AvailableInOtherSizes: false,
    ItemGalleryItemID: 0,
    ItemDisplayTypeID: 0,
    Item: {
      ArtistId: 0,
      ArtistName: null,
      " Price": null,
      Title: null
    }
  };
  this.getDFEEngineParameters = {
    PrintAPNum: 0,
    PrintPODConfigID: 0,
    Crop: 0,
    ColorGrouping: {
      ColorID: 0,
      ColorName: ""
    },
    StyleGrouping: {
      StyleID: 0,
      StyleName: ""
    },
    MaxConfigurations: 0,
    CustomerZoneID: 0,
    LanguageID: 0,
    FitFixedFrame: true,
    CurrencyCode: null,
    WriteToDB: true,
    ImageMaxW: "0",
    ImageMaxH: "0",
    ShowTrace: false,
    MergePreFrameData: false,
    FrameSKU: null,
    Domain: null,
    SendLiteResponse: false,
    FSFrameConfiguration: {
      Print: {
        APNum: 0
      },
      MatCombo: {
        NumMats: 0,
        TopMat: {
          APNum: 0,
          LeftSize: 2.5,
          TopSize: 2.5,
          RightSize: 2.5,
          BottomSize: 2.5
        },
        MiddleMat: {
          APNum: 0,
          LeftSize: 0,
          TopSize: 0,
          RightSize: 0,
          BottomSize: 0
        },
        BottomMat: {
          APNum: 0,
          LeftSize: 0,
          TopSize: 0,
          RightSize: 0,
          BottomSize: 0
        }
      },
      Moulding: {
        APNum: 0
      },
      GlassConfig: {
        GlassAPNum: 0
      }
    }
  };
  this.selectedItemId;
  this.selectedGalleryId;
  this.orderObject = [];
  this.highestZIndex = -1;
  this.frameStudioFlag = false;
  this.requestForAllItemsFromSlideShow = false;
  this.selectedImageObject = {};
  this.currentViewMode = d;
  this.updateFromDLE = false;
  this.facebookShare = {};
  this.facebookShare[MyGalleriesCore.constants.GRID_VIEW] = {
    caption: "I've created a gallery on Art.com",
    description: "Come check out the gallery of art I created on Art.com, and let me know what you think!"
  };
  this.facebookShare[MyGalleriesCore.constants.SLIDESHOW] = {
    caption: "I've created a gallery on Art.com",
    description: "Come check out the gallery of art I created on Art.com, and let me know what you think!"
  };
  this.facebookShare[MyGalleriesCore.constants.ROOM_VIEW] = {
    caption: "I've decorated a room on Art.com",
    description: "Come check out the room view of art I created on Art.com, and let me know what you think!"
  };
  this.LOGGED_IN = com.art.myGalleries.proxies.ApplicationProxy.LOGGED_IN;
  this.LOGGED_OUT = com.art.myGalleries.proxies.ApplicationProxy.LOGGED_OUT;
  this.galleryRequiredProperites = ["GalleryId", "ItemId", "DateUpdated", "DateCreated", "Name", "GalleryItemSource", "PagingOptions", "ParentId", "ItemCount", "AccountId", "Icon", "ItemSource", "ItemKey", "ItemText", "ItemData", "GalleryId", "GalleryVisibility", "Rooms", "Walls", "BackGround", "ShortDescription", "SortOptions", "LongDescription", "BareWalls", "ChildGalleries", "Permissions", "Items", "TotalItems"];
  this.ISOCurrencyENUM = {
    AUD: 0,
    CAD: 1,
    DKK: 2,
    HKD: 3,
    JPY: 4,
    NZD: 5,
    NOK: 6,
    SGD: 7,
    ZAR: 8,
    SEK: 9,
    CHF: 10,
    GBP: 11,
    USD: 12,
    EUR: 13,
    ARS: 14,
    CNY: 15,
    CZK: 16,
    MXN: 17,
    TRY: 18,
    PLN: 19,
    BRL: 20
  };
  this.ISOLangaugeENUM = {
    EN: 0,
    FR: 1,
    DE: 2,
    ES: 3,
    IT: 4,
    JA: 5,
    NL: 6,
    SE: 7,
    DA: 8,
    NO: 9,
    FI: 10
  };
  this.shareTitle = "";
  this.shareURL = "";
  this.selectedFramingStudioObject = [{}];
  this.shareType;
  this.isViewingSharedRoomView = false;
  this.isViewingSavedRoom = false;
  this.isEditingSavedRoom = false;
  this.savedRoomViewingMode = "view";
  this.savedRoomKey;
  this.isRoomView = false;
  this.roomViewParms = {
    mode: null,
    type: null,
    roomKey: null,
    galleryKey: null,
    savedWallId: null
  };
  this.roomImageBaseURL = "http://cache1.allpostersimages.com/";
  this.restorePreviousVisit = false;
  this.dleIsLoaded = false;
  this.galleryItemsLoaded = false;
  this.oneClickCookie = "oneclick";
  this.GalleryIDCookie = "galleryid";
  this.LastGalleryNameCookie = "lastgalleryname";
  this.artCookieBase = "arts";
  this.cookieobject = new com.art.core.cookie.Cookie();
  this.loginSource = "";
  this.registerSource = "";
  this.myGalItemCount = "";
  this.selectedMultipleSize = {};
  this.user = new com.art.core.vos.User();
  this.shareRequestObject = new com.art.myGalleries.vos.ShareRequestVO();
  this.shareRequestFlag = false;
  this.saveMenuBoolean = false;
  this.saveMenuPosition = {
    left: 172,
    top: 566,
    width: 0
  };
  this.saveMenuSourceClick = "";
  this.saveDefaultGalleryTitle = "Untitled Gallery";
  this.savetogalleryoption = true;
  this.galleryKey
};
com.art.myGalleries.proxies.ApplicationProxy.NAME = "ApplicationProxy";
com.art.myGalleries.proxies.ApplicationProxy.LOGGED_IN = "0";
com.art.myGalleries.proxies.ApplicationProxy.LOGGED_OUT = "1";
com.art.myGalleries.proxies.ApplicationProxy.ONECLICKCOOKIEVAL = "1";
com.art.myGalleries.proxies.ApplicationProxy.prototype.hasWritePermissions = function() {
  var a = {};
  if (typeof _galleryDataJson != "undefined") {
    for (var d = 0; d < _galleryDataJson.length; d++) {
      var c = _galleryDataJson[d];
      if (location.href.indexOf(c.VanityURL)) {
        return c.Permissions > Number(MyGalleriesCore.constants.VIEW)
      }
    }
  }
  return false
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.filterGalleries = function(d) {
  var c = [];
  for (var e = 0; e < d.length; e++) {
    if (d[e].GalleryDefaultFlags == null) {
      c.push(d[e])
    } else {
      var a = d[e].GalleryDefaultFlags;
      for (var f = 0; f < a.length; f++) {
        if (a[f].GalleryDefaultType == 0) {
          c.push(d[e])
        }
      }
    }
  }
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getColorIndexByHex = function(c) {
  var a = this.getBackgroundColors();
  for (var d = 0; d < a.length; d++) {
    if (a[d] == c) {
      return d
    }
  }
  return 0
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getFramingSKURequestObjectAsString = function(a) {
  return "dfeEngineParameters=" + JSON.stringify(this.getDFEEngineParameters)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setFramingStudioResponseObject = function(a) {
  this.selectedFramingStudioObject = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getFramingStudioResponseObject = function() {
  return this.selectedFramingStudioObject
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setSelectedImageObject = function(a) {
  this.selectedImageObject = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getNextHighestZIndex = function() {
  if (this.highestZIndex == -1) {
    this.highestZIndex = com.art.core.utils.BrowserUtil.getNextHighestZIndex()
  }
  return this.highestZIndex
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setInitialPageNumber = function(a) {
  this.galleryItemPageNumber = (a != "") ? parseInt(a) : 1
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getSelectedGallery = function() {
  var a = this.environmentSub.selectedGalleryID;
  var c = this.cacheByGalleryList[a];
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getOneClickAddToGalleryEnabled = function() {
  var c = "";
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, this.oneClickCookie) == "1";
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleryItemCountCookie = function(a) {
  var a = this.getGalleryItemCountFromCookie();
  if (a > 0) {
    a = parseInt(a) + 1;
    this.cookieobject.setCookieDictionary(this.artCookieBase, "mgitemcount", a, "/", this.cookieobject.getCookieDomain("art"))
  } else {
    a = 1;
    this.cookieobject.setCookieDictionary(this.artCookieBase, "mgitemcount", a, "/", this.cookieobject.getCookieDomain("art"))
  }
  this.myGalleryItemCount = parseInt(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.resetGalleryItemCountCookie = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, "mgitemcount", a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryItemCountFromCookie = function() {
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, "mgitemcount");
  if (a.length > 0) {
    return a
  } else {
    return 0
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setCookieGalleryIDCountCookie = function(h) {
  var c = this.getGalIDCountCookie(h);
  var e = "";
  var o = "";
  if (c == 0) {
    o = 1;
    e = h + this.GalleryNamecookieCountValueSeparator + 1;
    this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryCount", e, "/", this.cookieobject.getCookieDomain("art"))
  } else {
    var m = "";
    var d = "";
    var k = "";
    var a = c.indexOf("|");
    d = c.split("~!");
    k = d[0];
    o = parseInt(d[1]) + 1;
    if (a < 0 && k == h) {
      e = h + this.GalleryNamecookieCountValueSeparator + o;
      this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryCount", e, "/", this.cookieobject.getCookieDomain("art"))
    } else {
      m = c.split("|");
      if (a < 0) {
        o = 1;
        e = c + "|" + h + this.GalleryNamecookieCountValueSeparator + o;
        this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryCount", e, "/", this.cookieobject.getCookieDomain("art"))
      } else {
        var l = "";
        var p = false;
        for (var n = 0; n < m.length; n++) {
          var f = m[n].split("~!");
          if (h == f[0]) {
            p = true;
            o = parseInt(f[1]) + 1;
            l += f[0] + this.GalleryNamecookieCountValueSeparator + o + "|"
          } else {
            l += f[0] + this.GalleryNamecookieCountValueSeparator + f[1] + "|"
          }
        }
        if (!p) {
          l = c + "|" + h + this.GalleryNamecookieCountValueSeparator + 1 + "|"
        }
        e = l.substring(0, l.length - 1);
        this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryCount", e, "/", this.cookieobject.getCookieDomain("art"))
      }
    }
  }
  this.myGalleryItemCount = parseInt(o)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalIDCountCookie = function(c) {
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryCount");
  if (a != "" && a != "~!undefined") {
    return a
  } else {
    return 0
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryIDCountCookie = function(f) {
  var d = this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryCount");
  var a = d.indexOf("|");
  var c = "";
  var h = "";
  if (a < 0) {
    h = d.split("~!");
    c = h[1]
  } else {
    h = d.split("|");
    for (var k = 0; k < h.length; k++) {
      var e = h[k].split("~!");
      if (f == e[0]) {
        c = e[1]
      }
    }
  }
  if (c == undefined || c == "undefined" || c == "~!undefined") {
    return 0
  } else {
    return c
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.resetGalleryIDCountCookie = function(f) {
  var c = this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryCount");
  var k = "";
  var h = "";
  var a = "";
  var d = "";
  k = c.split("|");
  for (var l = 0; l < k.length; l++) {
    var e = k[l].split("~!");
    h = e[0];
    a = e[1];
    h = h.toLowerCase();
    f = f.toLowerCase();
    if (f == h) {
      a = 0
    }
    d += h + this.GalleryNamecookieCountValueSeparator + a + "|"
  }
  d = d.substring(0, d.length - 1);
  this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryCount", d, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setOneClickAddToGalleryEnabled = function(c) {
  if (typeof c == "string") {
    throw new Error("ApplicationProxy.setOneClickAddToGalleryEnabled failed! Invalid input.")
  }
  if (typeof c == "number") {
    throw new Error("ApplicationProxy.setOneClickAddToGalleryEnabled failed! Invalid input.")
  }
  var a = c == true ? "1": "0";
  this.cookieobject.setCookieDictionary(this.artCookieBase, this.oneClickCookie, a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setLoginUserNameCookie = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, "loginusername", a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getLoginUserNameCookie = function() {
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, "loginusername");
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getIfLoggedInCookie = function() {
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, "loggedin");
  if (a != "-1" && a != "") {
    return true
  } else {
    return false
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getIfLoggedInCookieNew = function() {
  var a = this.cookieobject.getCookieDictionary("ap", "accounttype");
  if (a == "2" || a == "3") {
    return true
  }
  if (a == "" || a == "1") {
    return false
  }
  return false
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getLastSelectedGalleryID = function() {
  var a = "";
  a = this.cookieobject.getCookieDictionary(this.artCookieBase, this.GalleryIDCookie);
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setLastSelectedGalleryID = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, this.GalleryIDCookie, a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setLastSelectedGalleryName = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, this.LastGalleryNameCookie, a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.resetLastSelectedGalleryName = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryKey", a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setLastSelectedGalleryKey = function(a) {
  this.cookieobject.setCookieDictionary(this.artCookieBase, "galleryKey", a, "/", this.cookieobject.getCookieDomain("art"))
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getLastSelectedGalleryKey = function() {
  return this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryKey")
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getLastSelectedGalleryName = function() {
  var a = this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryid");
  var c = "";
  if (a.length > 0) {
    if (this.cacheByGalleryList[a] != undefined) {
      c = this.cacheByGalleryList[a].Name
    } else {
      c = this.cookieobject.getCookieDictionary(this.artCookieBase, "galleryKey")
    }
  }
  c = c.replace(/-/g, " ");
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getSelectedGalleryClone = function() {
  var a = {};
  var c = this.getSelectedGallery();
  for (var d in c) {
    a[d] = c[d]
  }
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.galleyNameIsAvailable = function(d, c) {
  for (var a = 0; a < this.galleryList.length; a++) {
    if (this.galleryList[a].Name == d && c != this.galleryList[a].GalleryId) {
      return false
    }
  }
  return true
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setSelectedGalleryTitle = function(a) {
  this.cacheByGalleryList[this.environmentSub.selectedGalleryID].Name = $.trim(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setSelectedGalleryDesc = function(a) {
  this.cacheByGalleryList[this.environmentSub.selectedGalleryID].LongDescription = $.trim(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setSelectedGalleryPrivacy = function(a) {
  this.cacheByGalleryList[this.environmentSub.selectedGalleryID].GalleryVisibility = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setCreateGallery = function() {
  if (this.galleryTemplate.GalleryVisibility == undefined) {
    this.galleryTemplate.GalleryVisibility = 1
  }
  if (this.galleryTemplate.LongDescription == "Enter a description (optional)") {
    this.galleryTemplate.LongDescription = ""
  }
  return this.galleryTemplate
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setAddedGalleryTitle = function(a) {
  var a = encodeURIComponent($.trim(a));
  this.galleryTemplate.Name = escape(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setAddedGalleryDesc = function(a) {
  var a = encodeURIComponent($.trim(a));
  this.galleryTemplate.LongDescription = escape(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setAddedGalleryPrivacy = function(a) {
  this.galleryTemplate.GalleryVisibility = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setAddedBannerUrl = function(a) {
  var a = encodeURIComponent($.trim(a));
  this.galleryTemplate.GalleryImage.LargeImage.HttpImageURL = escape(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getImagesPerPage = function() {
  return this.imagesPerPage
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getSelectedMethodName = function() {
  return "SomeService"
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.galleryListIsCached = function() {
  return this.galleryListIsCachedFlag
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleryList = function(a) {
  this.galleryList = a;
  this.flattenGalleryList(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.flattenGalleryList = function(a) {
  for (var c = 0; c < a.length; c++) {
    this.cacheByGalleryList[a[c].GalleryId] = a[c]
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleryListForWebUser = function(a) {
  this.galleryListForWebUser = a;
  this.flattenGalleryListForWebUser(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.flattenGalleryListForWebUser = function(a) {
  for (var c = 0; c < a.length; c++) {
    this.cacheByGalleryListForWebUser[a[c].GalleryId] = a[c]
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.flattenGalleryItemDetails = function(c) {
  this.orderObject = [];
  this.cacheByGalleryItemList = {};
  if (this.environmentSub.isMyGalleryPage) {
    if (mygalPageInfo.wallItemsViewLink != "") {
      for (var a = 0; a < c.length; a++) {
        if (c[a] != null && c[a].Item != null) {
          this.orderObject.push(c[a].Item.ItemGalleryItemID);
          this.cacheByGalleryItemList[c[a].Item.ItemGalleryItemID] = c[a].Item
        }
      }
      return
    }
  }
  for (var a = 0; a < c.length; a++) {
    if (c[a] != null && c[a].ItemDetails != null) {
      this.orderObject.push(c[a].ItemGalleryItemID);
      this.cacheByGalleryItemList[c[a].ItemGalleryItemID] = c[a]
    }
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryByGalleryId = function(a) {
  return {
    GalleryData: this.cacheByGalleryList[a]
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryItemByGalleryId = function(c, a) {
  var d = a != undefined ? this.orderObject[a] : c;
  return {
    GalleryItemData: this.convertToGalleryItemVO(this.cacheByGalleryItemList[d])
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.convertToGalleryItemVO = function(a) {
  return new com.art.myGalleries.vos.GalleryItemVO(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryList = function(c) {
  var e = [];
  var d = (c - 1) * this.galleryPerPage;
  for (var a = 0; a < this.galleryPerPage; a++) {
    if (this.galleryList[d] != undefined) {
      e.push(this.galleryList[d])
    } else {
      e.push({
        placeholder: true,
        imageUrl: "http://spacer.gif"
      })
    }
    d++
  }
  return e
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryListForSlideShow = function(k, h, a) {
  var l = [];
  var f = this.getGalleryItemList();
  for (var d = 0; d < f.length; d++) {
    if (f[d].ItemDetails != null) {
      var e = new com.art.myGalleries.vos.GalleryItemVO(f[d]);
      var c = f[d].ItemDetails.ImageInformation.CroppedSquareImage.HttpImageURL || f[d].ItemDetails.ImageInformation.LargeImage.HttpImageURL;
      if (c != null) {
        var m = com.art.core.utils.BrowserUtil.getCroppedImageUrl(c, k, h, a);
        l.push({
          apnum: f[d].ItemDetails.APNum,
          url: m,
          price: e.Price,
          showMarkDownPrice: e.ShowMarkDownPrice,
          DisplayMSRP: e.DisplayMSRP,
          ItemStatus: e.ItemStatus
        })
      }
    }
  }
  return l
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.galleryItemsCached = function() {
  return this.galleryItemList[this.galleryItemPageNumber] != undefined
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getBackgroundColorsForDLE = function() {
  var e = [];
  var a = this.getBackgroundColors();
  for (var d = 0; d < a.length; d++) {
    e.push({
      id: "hex_" + a[d],
      url: null,
      emptyWallFlag: true,
      bgcolor: "0x" + a[d],
      hexAsString: a[d]
    })
  }
  return e
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getBackgroundColors = function() {
  return ["ffe3e4", "fff4d6", "fff7d0", "efede7", "ebf0e4", "edf7fa", "fcfaec", "e2c7c7", "f0debd", "eee7c3", "d4d0c2", "ced7d3", "cfd9dd", "d6d7d3", "9f6d73", "e4bd8b", "decfad", "bdb1a5", "94a6a1", "b3c4ce", "868f94", "733b4b", "ca9153", "907761", "847467", "526965", "607d90", "4c545b", "84303d", "8b4a26", "584035", "584d43", "364643", "31343a", "FFFFFF"]
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleryItems = function(a, c) {
  if (!c) {
    if (mygalPageInfo.wallItemsViewLink != "") {
      this.galleryItemList = this.movePropertiesOneLevelUp(a)
    } else {
      this.galleryItemList = a
    }
  }
  this.flattenGalleryItemDetails(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryItemList = function(a) {
  return this.galleryItemList
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleries = function(a) {
  this.galleryList = a;
  this.flattenGalleryList(a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getAccessKeyObjectAsString = function() {
  var a = new com.art.core.cookie.Cookie();
  var d = a.cookieGetStateData();
  var e = "accessKey=" + JSON.stringify({
    apikey: this.environment.apiKey,
    authToken: d.authToken
  });
  return e
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getUserProfileObjectAsString = function() {
  var a = "userProfile=" + JSON.stringify({
    ClientIpAddress: this.environment.clientIpAddress,
    ISOCurrencyCode: this.ISOCurrencyENUM[this.environment.currencyCode],
    CustomerZoneId: this.environment.customerZoneId,
    ISOLanguageCode: this.ISOLangaugeENUM[this.environment.languageIso]
  });
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGallerySortObjectAsString = function() {
  var a = "gallerySortOption=" + JSON.stringify({
    DefaultSort: this.environment.galleryDefaultSort,
    SortBy: this.gallerySortBy,
    SortDirection: this.gallerySortDirection
  });
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGraphInfoObjectAsString = function() {
  var d = "";
  var a = "";
  d = this.environmentSub.selectedGalleryID;
  if (d.length > 0 && this.cacheByGalleryList[d]) {
    a = this.cacheByGalleryList[d].GalleryId
  }
  var c;
  c = {
    RelationshipChangeAction: "placeholder1",
    UserRelationshipData: {
      UserRelationshipType: "placeholder2",
      UserRelationshipActivities: [{
        GalleryId: a
      }]
    }
  };
  var e = "request=" + JSON.stringify(c);
  return e
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getBookmarkObjectAsString = function() {
  var a;
  a = {
    RelationshipChangeAction: "placeholder1",
    UserRelationshipData: {
      UserRelationshipType: "placeholder2",
      UserRelationshipActivities: [{
        GalleryId: "placeholder3"
      }]
    }
  };
  var c = "request=" + JSON.stringify(a);
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getFollowsObjectAsString = function() {
  var a;
  a = {
    RelationshipChangeAction: "placeholder1",
    UserRelationshipData: {
      UserRelationshipType: "placeholder2",
      UserRelationshipActivities: [{
        UserId: "placeholder3"
      }]
    }
  };
  var c = "request=" + JSON.stringify(a);
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setPagingOptionsAllItems = function(a) {
  if (a) {
    this.getAllItemsFlag = true
  } else {
    this.getAllItemsFlag = false
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryPagingOptionObjectAsString = function() {
  var a = "pagingOptions=" + JSON.stringify({
    AllItems: this.getAllItemsFlag,
    ItemsPerPage: this.galleryItemPerPage,
    PageNumber: this.galleryItemPageNumber,
    TotalPages: 0
  });
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getMoveOptions = function() {
  return "moveOptions=" + this.environment.moveOption
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getNewItemToGalleryFromFramingStudio = function() {
  var a = this;
  var d;
  var c = {};
  c = this.galleryItemTemplate;
  c.AccountId = 1;
  c.Imageid = this.getFramingStudioResponseObject().Imageid;
  c.ItemGroupType = 1;
  c.GalleryItemSource = 0;
  c.APNum = this.getFramingStudioResponseObject().APNum;
  c.FrameSku = this.getFramingStudioResponseObject().FrameSku;
  c.AvailableInOtherSizes = this.getFramingStudioResponseObject().AvailableInOtherSizes == "True" ? true: false;
  c.ItemDisplayTypeID = this.getFramingStudioResponseObject().ItemDisplayedTypeID;
  c.Item.ArtistId = this.getFramingStudioResponseObject().ArtistId;
  c.Item.ArtistName = "";
  c.Item.ItemId = 0;
  c.Item.Title = "";
  d = "";
  c.PODConfigID = this.getFramingStudioResponseObject().PODConfigID;
  c.Source = 0;
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getNewItemToGallery = function() {
  var c = {};
  c = this.galleryItemTemplate;
  c.AccountId = 1;
  c.Imageid = this.selectedImageObject.Imageid;
  c.ItemGroupType = 1;
  c.GalleryItemSource = 0;
  c.APNum = this.selectedImageObject.APNum;
  if (this.selectedImageObject.FrameSku) {
    c.FrameSku = this.selectedImageObject.FrameSku
  }
  var a = false;
  if (this.selectedImageObject.AvailableInOtherSizes == true || this.selectedImageObject.AvailableInOtherSizes == "true" || this.selectedImageObject.AvailableInOtherSizes == "True") {
    a = true
  }
  c.AvailableInOtherSizes = a;
  c.ItemDisplayTypeID = this.selectedImageObject.ItemDisplayTypeID;
  c.Item.ArtistId = this.selectedImageObject.ArtistId;
  c.Item.ArtistName = "";
  c.Item.ItemId = 0;
  c.Item.Title = "";
  c.ItemURL = "";
  c.PODConfigID = this.selectedImageObject.PODConfigID;
  c.Source = this.selectedImageObject.Source;
  c.SpecialHandlingID = this.selectedImageObject.SpecialHandlingID;
  return c
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getExisitngItemToGallery = function(c) {
  var d = {};
  if (c) {
    d = this.galleryItemTemplate;
    d.AccountId = 1;
    d.APNum = this.cacheByGalleryItemList[this.getSelectedGridItem()].APNum;
    d.Name = this.cacheByGalleryItemList[this.getSelectedGridItem()].Name;
    d.Imageid = this.cacheByGalleryItemList[this.getSelectedGridItem()].Imageid;
    d.ItemText = this.cacheByGalleryItemList[this.getSelectedGridItem()].ItemText;
    d.ItemGroupType = this.cacheByGalleryItemList[this.getSelectedGridItem()].ItemGroupType;
    d.ItemData = this.cacheByGalleryItemList[this.getSelectedGridItem()].ItemData;
    d.ItemKey = this.cacheByGalleryItemList[this.getSelectedGridItem()].ItemKey;
    d.GalleryItemSource = this.cacheByGalleryItemList[this.getSelectedGridItem()].GalleryItemSource;
    d.ItemGalleryItemID = this.cacheByGalleryItemList[this.getSelectedGridItem()].ItemGalleryItemID;
    var a = false;
    if (this.selectedImageObject.AvailableInOtherSizes == true || this.selectedImageObject.AvailableInOtherSizes == "true" || this.selectedImageObject.AvailableInOtherSizes == "True") {
      a = true
    }
    d.AvailableInOtherSizes = a;
    d.ItemURL = "";
    d.Item.ArtistId = this.cacheByGalleryItemList[this.getSelectedGridItem()].Item.ArtistId;
    d.Item.ArtistName = "";
    d.Item.ItemId = this.cacheByGalleryItemList[this.getSelectedGridItem()].Item.ItemId;
    d.Item.Title = "";
    d.Source = this.cacheByGalleryItemList[this.getSelectedGridItem()].Item.Source;
    d.SpecialHandlingID = this.cacheByGalleryItemList[this.getSelectedGridItem()].SpecialHandlingID
  } else {
    d = this.galleryTemplate;
    d = this.cacheByGalleryList[this.getDestinationSelectedGalleryId()]
  }
  return d
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getSelectedGridItem = function() {
  return this.selectedItemId
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setSelectedGridItem = function(a) {
  this.selectedItemId = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getDestinationSelectedGalleryId = function() {
  return this.selectedGalleryId
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setDestinationSelectedGalleryId = function(a) {
  this.selectedGalleryId = a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setStreamObject = function(a) {
  this.galleryTemplate.StreamConfiguration = a;
  this.galleryTemplate.GalleryType = 1
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.movePropertiesOneLevelUp = function(d) {
  var a = [];
  for (var c = 0; c < d.length; c++) {
    if (d[c].Item != null) {
      a.push(d[c].Item)
    }
  }
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getProductPageUrl = function(h) {
  var z = "";
  var c = this.cacheByGalleryItemList[h];
  var s = "",
  f = "",
  k = "",
  r = "",
  a = "",
  m = "",
  p = "",
  t = "";
  var x = this.environment.sessionId;
  var e = "",
  d = "",
  y = "";
  if (c.PODConfigID != undefined && c.PODConfigID > 0) {
    r = c.PODConfigID
  } else {
    r = 0
  }
  if (c.FrameSku != undefined && c.FrameSku != "") {
    m = "&mg"
  } else {
    m = "?mg"
  }
  if (c.SpecialHandlingID != undefined && c.SpecialHandlingID > 0 && c.SpecialHandlingID != 1) {
    var v = c.ItemDetails.Sku;
    var q = v.substring(0, v.length - 1);
    var w = v.substring(v.length - 1, v.length).toLowerCase();
    var n = "";
    if (c.SpecialHandlingID == 2) {
      n = 1
    } else {
      if (c.SpecialHandlingID == 6) {
        n = 2
      } else {
        if (c.SpecialHandlingID == 4) {
          n = 3
        }
      }
    }
    s = "asp/mountshop/default.asp/_/mt--" + n + "/pd--" + q + "/sp--" + w + "/posters.htm?PODConfigID=" + r + "&ui=" + x;
    r = "";
    m = "&mg"
  } else {
    var A = c.ItemDetails.AdditonalUrls.ProductPageUrl;
    if (A.substring(0, 1) == "/") {
      s = A.substring(1, A.length)
    } else {
      s = c.ItemDetails.AdditonalUrls.ProductPageUrl
    }
    r = "&PODConfigID=" + r
  }
  var u = this.environmentSub.selectedGalleryID;
  if (u != undefined && u != "") {
    f = "gid=" + u;
    t = this.cacheByGalleryList[u].Name
  }
  if (h != undefined && h != "") {
    k = "&itemid=" + h
  }
  if (c.ItemDetails.ItemStatus != undefined && c.ItemDetails.ItemStatus != "") {
    p = "&oos=" + c.ItemDetails.ItemStatus
  }
  if (c.APNum != undefined && c.APNum != "") {
    a = "&apnum=" + c.APNum
  }
  e = "http://" + window.location.hostname + "/me/" + this.environmentSub.profileKey + "/gallery/";
  d = "http://" + window.location.hostname + "/me/" + this.environmentSub.profileKey + "/gallery/" + this.environmentSub.galleryKey + "/?vt=gv";
  if (mygalPageInfo != undefined && mygalPageInfo.RightNavThem) {
    if (mygalPageInfo.UserView == "room") {
      f = "";
      t = mygalPageInfo.wallItemsTitle;
      d = mygalPageInfo.wallItemsViewLink;
      e = "http://" + window.location.hostname + "/me/" + this.environmentSub.profileKey + "/room/";
      m = m + "=rv&";
      z = "http://" + location.host + "/" + s + m + k + a + r + p
    } else {
      m = m + "=n&";
      z = "http://" + location.host + "/" + s + m + f + k + a + r + p
    }
  } else {
    if (mygalPageInfo != undefined && mygalPageInfo.UserView == "room") {
      f = "";
      t = mygalPageInfo.wallItemsTitle;
      d = mygalPageInfo.wallItemsViewLink;
      e = "http://" + window.location.hostname + "/me/" + this.environmentSub.profileKey + "/room/";
      m = m + "=rv&";
      z = "http://" + location.host + "/" + s + m + k + a + r + p
    } else {
      m = m + "=y&";
      z = "http://" + location.host + "/" + s + m + f + k + a + r + p
    }
  }
  if (mygalPageInfo != undefined) {
    var l = this.cookieobject.getCookieDictionary("ap", "accountid").length;
    if (l > 0 && !mygalPageInfo.RightNavThem && mygalPageInfo.profileInfoExists) {
      y = mygalPageInfo.profileNickName
    } else {
      if (l > 0 && mygalPageInfo.RightNavThem && mygalPageInfo.profileInfoExists) {
        y = mygalPageInfo.profileNickName
      } else {
        if (l > 0 && !mygalPageInfo.RightNavThem && !mygalPageInfo.profileInfoExists) {
          y = MyGalleriesCore.constants.YOUPLUSARTLABEL
        } else {
          if (l > 0 && mygalPageInfo.RightNavThem && !mygalPageInfo.profileInfoExists) {
            y = MyGalleriesCore.constants.ANONYMOUSUSERLABEL
          } else {
            if (l == 0 && !mygalPageInfo.RightNavThem && !mygalPageInfo.profileInfoExists) {
              y = MyGalleriesCore.constants.YOUPLUSARTLABEL
            } else {
              if (l == 0 && mygalPageInfo.RightNavThem && mygalPageInfo.profileInfoExists) {
                y = mygalPageInfo.profileNickName
              } else {
                if (l == 0 && mygalPageInfo.RightNavThem && !mygalPageInfo.profileInfoExists) {
                  y = MyGalleriesCore.constants.ANONYMOUSUSERLABEL
                }
              }
            }
          }
        }
      }
    }
  }
  var o = {
    gid: u,
    itemid: h,
    title: t,
    galleryNameUrl: d,
    uname: y,
    galleryUrl: e
  };
  MyGalleriesCore.getModel().setMyGalObjectVal(o);
  return z
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setGalleryKey = function(a) {
  this.galleryKey = this.cacheByGalleryList[a].ItemKey
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getGalleryKey = function() {
  var a = "";
  if (!this.savetogalleryoption) {
    a = this.galleryKey
  } else {
    a = this.environmentSub.galleryKey
  }
  return a
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setMyGalObjectVal = function(a) {
  store.set("MyGalObject", a)
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getMyGalObjectVal = function() {
  var f = store.get("MyGalObject");
  var d = "",
  e = "",
  h = "",
  a = "",
  k = "",
  c = "";
  if (f != undefined) {
    d = f.gid;
    e = f.itemid;
    h = f.title;
    a = f.galleryNameUrl;
    k = f.uname;
    c = f.galleryUrl
  }
  return {
    gid: d,
    itemid: e,
    title: h,
    galleryNameUrl: a,
    uname: k,
    galleryUrl: c
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.setProfileKey = function() {
  if (this.cookieobject.getCookieDictionary("ap", "accounttype") != MyGalleriesCore.constants.ANONYMOUS) {
    var a = this.cookieobject.getCookieDictionary("ap", "profileURL");
    if (a != "") {
      a = a.replace("/me/", "");
      this.environmentSub.profileKey = a.substring(0, a.length - 1)
    }
  } else {
    if (this.cookieobject.getCookieDictionary("arts", "profileKey") != "") {
      this.environmentSub.profileKey = this.cookieobject.getCookieDictionary("arts", "profileKey")
    }
  }
};
com.art.myGalleries.proxies.ApplicationProxy.prototype.getButtonTextForNewGallery = function() {
  var a = MyGalleriesCore.getString("Save To Gallery");
  if (!this.savetogalleryoption) {
    a = MyGalleriesCore.getString("Move To Gallery")
  }
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy = function(a, c) {
  this.NAME = com.art.myGalleries.proxies.UserLibraryProxy.NAME;
  this.systemLibraryObject;
  this.userLibraryObject;
  this.wallsObject = [];
  this.savedWallsObject = [];
  this.selectedWallGalleryName = "LivingRoom";
  this.selectedWallGalleryIndex = 1;
  this.selectedWallName = "LivingRoom_04";
  this.totalItemsOnWall = 0;
  this.userBareWallNamePrefix = "UserBareWall_";
  this.wallItemsMap = {};
  this.selectedWallObject;
  this.EMPTY_WALL_DELIMITER = com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER;
  this.baseUrl = "http://cache1.allpostersimages.com/";
  this.baseUrlUserWalls = "http://cache2.artprintimages.com";
  this.flattenedWallItemsByWallId = {};
  this.tempWallItems = {};
  this.flattenedWallsByName = {};
  this.userLibraryObject;
  this.roomsCollection = [];
  this.selectedSharedBareWallIndex = 0;
  this.checkBoxMap = {};
  this.RHVerticalTray;
  this.selectedSharedWallObject;
  this.sharedWallId;
  this.sharedEmptyRoomHexColor = "";
  this.lastUpdatedWallObject;
  this.updateWalls = false;
  this.initialLoadComplete = false;
  this.RETRIEVE_ALL_WALLS = com.art.myGalleries.proxies.UserLibraryProxy.RETRIEVE_ALL_WALLS;
  this.savedWallId
};
com.art.myGalleries.proxies.UserLibraryProxy.NAME = "UserLibraryProxy";
com.art.myGalleries.proxies.UserLibraryProxy.RETRIEVE_ALL_WALLS = "UserLibraryProxyRetrieveAllWalls";
com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER = "@@@";
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getCheckBoxByItemGalleryItemID = function(c) {
  for (var a in this.checkBoxMap) {
    if (this.checkBoxMap[a].value.ItemGalleryItemID == c) {
      return this.checkBoxMap[a]
    }
  }
  throw new Error("UserLibraryProxy.getCheckBoxByItemGalleryItemID failed! No checkbox found by id: " + c + ".")
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedWallGAEventName = function(c) {
  var c = c != undefined ? c: this.selectedWallName;
  var a = "Choose Public Wall";
  if (c.indexOf(com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER) > -1 || c.indexOf("hex") > -1) {
    a = "Choose Bare Wall"
  }
  if (c.indexOf("myWallsBrowseBtn") > -1 || c.indexOf(this.userBareWallNamePrefix) > -1) {
    a = "Choose Personal Room"
  }
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.flatten = function(a) {
  this.flattenWallItems(a);
  this.flattenWallsByName(a)
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.flattenWallItems = function(f) {
  for (var a = 0; a < f.length; a++) {
    var e = f[a];
    this.flattenedWallItemsByWallId[e.WallId] = {};
    for (var c = 0; c < e.WallItems.length; c++) {
      var d = e.WallItems[c];
      this.flattenedWallItemsByWallId[e.WallId][d.Item.ItemGalleryItemID] = d
    }
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.flattenWallsByName = function(e) {
  for (var a = 0; a < e.length; a++) {
    var d = e[a];
    var c = d.WallDetails.Name;
    if (c == "" || (d.WallDetails.RulerX1 != undefined && c.indexOf(this.userBareWallNamePrefix) < 0)) {
      c = this.userBareWallNamePrefix + d.WallDetails.BareWallId
    }
    this.flattenedWallsByName[c] = d
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.setUserLibrary = function(a) {
  this.userLibraryObject = a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getUserLibrary = function() {
  return this.userLibraryObject
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.updateItemPosition = function(a, c) {};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getUserBareWalls = function() {
  if (this.userLibraryObject == undefined) {
    return []
  }
  var e = [];
  if (this.userLibraryObject.BareWallGalleries.length == 0) {
    return e
  }
  var a = this.userLibraryObject.BareWallGalleries[0].BareWalls;
  for (var c = 0; c < a.length; c++) {
    var f = a[c];
    var d = f.Name == "" ? this.userBareWallNamePrefix + f.BareWallId: f.Name;
    f.Name = d;
    e.push({
      id: d,
      url: f.ImageInformation.ThumbnailImage.HttpImageURL
    })
  }
  return e
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedPersonalBareWallWithUpdates = function(d) {
  var f = this.userLibraryObject.BareWallGalleries[0].BareWalls;
  var a = {};
  for (var c = 0; c < f.length; c++) {
    if (f[c].Name == this.selectedWallName) {
      for (var e in f[c]) {
        a[e] = f[c][e]
      }
      a.InchesConversionRate = d.inchesConversionRate;
      a.ProductTargetAreaPosX = d.productTargetAreaPosX;
      a.ProductTargetAreaPosY = d.productTargetAreaPosY;
      a.RulerLength = d.rulerLength;
      a.RulerX1 = d.rulerX1;
      a.RulerX2 = d.rulerX2;
      a.RulerY1 = d.rulerY1;
      a.RulerY2 = d.rulerY2;
      delete a.__type;
      delete a.ImageInformation
    }
  }
  if (a.InchesConversionRate == undefined) {
    throw new Error("UserLibraryProxy.getSelectedPersonalBareWallWithUpdates failed! currentPersonalBareWall not set.")
  }
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.refreshUserBareWalls = function(a) {
  this.userLibraryObject.BareWallGalleries[0] = a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.setSystemLibrary = function(a) {
  this.systemLibraryObject = a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSystemLibrary = function(a) {
  return this.systemLibraryObject
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.setSelectedWallGalleryIndexAndName = function(e) {
  this.selectedWallGalleryName = e.indexOf(this.EMPTY_WALL_DELIMITER) > -1 ? e.split(this.EMPTY_WALL_DELIMITER)[1] : e;
  var d = this.systemLibraryObject.BareWallGalleries;
  var c = e.indexOf(this.EMPTY_WALL_DELIMITER) > -1 ? e.split(this.EMPTY_WALL_DELIMITER)[0] : e;
  for (var a = 0; a < d.length; a++) {
    if (d[a].Name == c) {
      this.selectedWallGalleryIndex = a;
      return
    }
  }
  return
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getThumbnailImageUrls = function(p, a, e, d, m) {
  var l = this.systemLibraryObject.BareWallGalleries;
  var f = [];
  var o = l[this.selectedWallGalleryIndex].BareWalls;
  for (var c = 0; c < o.length; c++) {
    var k = o[c];
    var h = this.baseUrl + k.ImageInformation.ThumbnailImage.HttpImageURL;
    f.push({
      id: k.Name,
      url: h
    })
  }
  return f
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getImageObject = function(e) {
  if (e.indexOf(this.userBareWallNamePrefix) > -1) {
    return this.getUserImageObject(e)
  } else {
    var a = e.indexOf("hex") > -1;
    if (this.selectedWallGalleryName == null || this.selectedWallGalleryIndex == null) {
      throw new Error("UserLibraryProxy.getImageObject failure! Selected wall gallery and/or selected wall gallery index not set.")
    }
    var d = {};
    var f = this.systemLibraryObject.BareWallGalleries[this.selectedWallGalleryIndex].BareWalls;
    for (var c = 0; c < f.length; c++) {
      e = a ? this.selectedWallGalleryName: e;
      if (f[c].Name == e) {
        d = f[c];
        d.url = f[c].ImageInformation == null ? null: this.baseUrl + f[c].ImageInformation.LargeImage.HttpImageURL;
        d.thumbUrl = f[c].ImageInformation == null ? null: this.baseUrl + f[c].ImageInformation.ThumbnailImage.HttpImageURL;
        this.selectedWallObject = d;
        return d
      } else {
        if (e.indexOf("hex") > -1) {
          return {}
        }
      }
    }
    throw new Error("UserLibraryProxy.getImageObject failure! no Wall Object found.")
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getUserImageObject = function(e) {
  var c = {};
  for (var a = 0; a < this.userLibraryObject.BareWallGalleries[0].BareWalls.length; a++) {
    var d = this.userLibraryObject.BareWallGalleries[0].BareWalls[a];
    if (d.Name == e) {
      c = d;
      c.url = d.ImageInformation.LargeImage.HttpImageURL;
      c.thumbUrl = d.ImageInformation.ThumbnailImage.HttpImageURL;
      this.selectedWallObject = c;
      return c
    }
  }
  throw new Error("UserLibraryProxy.getUserImageObject failure! no User Wall Object found.")
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedWallId = function() {
  if (this.selectedWallName == undefined) {
    throw new Error("UserLibraryProxy.UserLibraryProxy failed! selectedWallName is undefined.")
  }
  var a = this.selectedWallName.indexOf("hex") > -1 ? this.selectedWallGalleryName: this.selectedWallName;
  if (this.flattenedWallsByName[a] == undefined) {
    return - 1
  }
  var c = this.flattenedWallsByName[a].WallId;
  return c
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getPositionData = function(c, a) {
  var d = this.getSelectedWallId();
  if (d == -1 && !a) {
    return this.tempWallItems[c]
  }
  return this.flattenedWallItemsByWallId[d][c]
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.wallItemExists = function(c, a) {
  var d = this.getSelectedWallId();
  if (d == -1 && !a) {
    return this.tempWallItems[c] != undefined
  }
  if (!d) {
    return false
  }
  if (!this.flattenedWallItemsByWallId) {
    return false
  }
  if (!this.flattenedWallItemsByWallId[d]) {
    return false
  }
  if (!this.flattenedWallItemsByWallId[d][c]) {
    return false
  }
  return this.flattenedWallItemsByWallId[d][c] != undefined
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.countWallItem = function() {
  this.totalItemsOnWall++
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.removeWallItem = function(c, a) {
  this.totalItemsOnWall--;
  if (this.totalItemsOnWall < 0) {
    throw new Error("UserLibraryProxy.removeWallItme error! totalItemsOnWall is < 0")
  }
  if (!a) {
    delete this.tempWallItems[c]
  } else {
    delete this.wallItemsMap[c]
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getWallObjectAsStringForCreateWall = function() {
  return JSON.stringify({
    WallDetails: {
      BareWallId: this.selectedWallObject.BareWallId
    }
  })
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getWallObjectAsStringForUpdateWall = function(c, e) {
  var a = {
    WallItems: c,
    WallId: e
  };
  var d = JSON.stringify(a);
  return d
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getWallByBareWallId = function(a) {
  var e;
  var f = this.userLibraryObject.Walls;
  for (var c = 0; c < f.length; c++) {
    var d = f[c];
    if (d.WallDetails.BareWallId == a) {
      e = d;
      break
    }
  }
  return e
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.lastUpdatedIsSet = function() {
  return this.lastUpdatedWallObject != undefined
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.setLastUpdatedWall = function(f) {
  var d;
  var c;
  if (this.lastUpdatedWallObject == undefined && f.length > 0) {
    this.lastUpdatedWallObject = f[0];
    c = this.parseDateUpdated(this.lastUpdatedWallObject)
  }
  for (var a = 0; a < f.length; a++) {
    var e = f[a];
    d = this.parseDateUpdated(e);
    if (d > c) {
      this.lastUpdatedWallObject = e;
      c = this.parseDateUpdated(this.lastUpdatedWallObject)
    }
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.parseDateUpdated = function(wallObject) {
  var str = wallObject.DateUpdated;
  if (str.indexOf("Date") == -1) {
    throw new Error("UserLibraryProxy.parseDateUpdated failed! Date object not found.")
  }
  str = str.replace(/\//g, "");
  return eval("new " + str)
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getWallByWallId = function(e) {
  var d;
  var f = this.userLibraryObject.Walls;
  for (var a = 0; a < f.length; a++) {
    var c = f[a];
    if (c.WallId == e) {
      d = c;
      break
    }
  }
  return d
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.wallExists = function() {
  var c = this.selectedWallName.indexOf("hex") > -1 ? this.selectedWallGalleryName: this.selectedWallName;
  var a = this.flattenedWallsByName[c] ? true: false;
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getItemsForUpdate = function() {
  var h = this.getSelectedWallId();
  if (h == -1) {
    return []
  }
  var a = [];
  for (var c in this.wallItemsMap) {
    if (c) {
      var e = this.wallItemsMap[c];
      if (e.moved == undefined) {
        var d = {
          centerXPos: e.ProductCenterPositionX,
          centerYPos: e.ProductCenterPositionY,
          initialLoad: false,
          itemGalleryItemID: c,
          moved: false
        };
        this.wallItemsMap[c] = d;
        e = this.wallItemsMap[c]
      }
      var f = new com.art.myGalleries.vos.WallItemVO(c);
      if (e.moved) {
        if (!MyGalleriesCore.getModel().isEditingSavedRoom) {
          e.moved = false
        }
        f.ProductCenterPositionX = e.centerXPos;
        f.ProductCenterPositionY = e.centerYPos;
        f.ProductTargetAreaPosX = -1;
        f.ProductTargetAreaPosY = -1
      } else {
        if (this.flattenedWallItemsByWallId[h][c] != undefined) {
          f.ProductCenterPositionX = this.flattenedWallItemsByWallId[h][c].ProductCenterPositionX;
          f.ProductCenterPositionY = this.flattenedWallItemsByWallId[h][c].ProductCenterPositionY;
          f.ProductTargetAreaPosX = this.flattenedWallItemsByWallId[h][c].ProductTargetAreaPosX;
          f.ProductTargetAreaPosY = this.flattenedWallItemsByWallId[h][c].ProductTargetAreaPosY
        } else {
          this.updateWalls = true;
          f.ProductCenterPositionX = e.centerXPos;
          f.ProductCenterPositionY = e.centerYPos;
          f.ProductTargetAreaPosX = 0;
          f.ProductTargetAreaPosY = 0
        }
      }
      a.push(f)
    }
  }
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getFlattenedWallItems = function(a) {
  this.selectedWallName = this.selectedWallName.indexOf("hex") > -1 ? this.selectedWallGalleryName: a ? this.getPersonalWallName() : this.selectedWallName;
  if (this.flattenedWallsByName[this.selectedWallName] != undefined && this.flattenedWallsByName[this.selectedWallName].WallId) {
    var c = this.flattenedWallsByName[this.selectedWallName].WallId;
    return this.flattenedWallItemsByWallId[c]
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getPersonalWallName = function() {
  for (var a in this.flattenedWallsByName) {
    return a
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedWallItems = function() {
  return []
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getRooms = function(v, f, p, o) {
  if (this.roomsCollection.length > 0) {
    return this.roomsCollection
  }
  var r = [];
  var c = 0;
  for (var h = 0; h < this.systemLibraryObject.BareWallGalleries.length; h++) {
    var u = this.systemLibraryObject.BareWallGalleries[h];
    var l = u.Name;
    if (l == "Roomsbysize") {
      for (var w = 0; w < u.BareWalls.length; w++) {
        var t = "emptyRoom-" + com.art.core.utils.StringUtil.generateUID();
        var e = u.BareWalls[w];
        var k = e.Name;
        var a = l + this.EMPTY_WALL_DELIMITER + k;
        var d = (e.WallAreaWidth / 12) + "' x " + (e.WallAreaHeight / 12) + "'";
        this.roomsCollection.push({
          label: k,
          name: a,
          id: t,
          selected: false,
          data: 0,
          isEmptyWall: true,
          dimension: d
        })
      }
    } else {
      var m = u.BareWalls.length;
      if (m > 0) {
        var q = c == 0;
        var s = u.GalleryId;
        this.roomsCollection.push({
          label: l,
          name: l,
          id: s,
          selected: q,
          data: m,
          isEmptyWall: false
        });
        c++
      }
    }
  }
  return this.roomsCollection
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getEmptyRoomIdByName = function(c) {
  for (var a = 0; a < this.getRooms().length; a++) {
    if (this.getRooms()[a].name == c) {
      return this.getRooms()[a].id
    }
  }
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedSharedWallObject = function() {
  if (this.selectedSharedWallObject != null) {
    return this.selectedSharedWallObject
  }
  for (var a = 0; a < this.wallsObject.length; a++) {
    var c = this.wallsObject[a];
    if (c.WallId == this.sharedWallId) {
      this.selectedSharedWallObject = c;
      return this.selectedSharedWallObject
    }
  }
  throw new Error("UserLibraryProxy.getSelectedSharedWallObject failed! SharedWallId can't be resolved.")
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getSelectedWallObject = function() {
  for (var a = 0; a < this.wallsObject.length; a++) {
    var c = this.wallsObject[a];
    if (c.WallDetails.Name == this.selectedWallObject.Name) {
      return c
    }
  }
  throw new Error("UserLibraryProxy.getSelectedWallObject failed! SharedWallId can't be resolved.")
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getGalleryByWallId = function(n) {
  var k = this.systemLibraryObject.BareWallGalleries;
  for (var e = 0; e < k.length; e++) {
    var a = k[e];
    for (var f = 0; f < a.BareWalls.length; f++) {
      if (a.BareWalls[f].BareWallId == n.WallDetails.BareWallId) {
        this.selectedSharedBareWallIndex = f;
        return a
      }
    }
  }
  var m = this.userLibraryObject.BareWallGalleries;
  for (var c = 0; c < m.length; c++) {
    var l = m[c];
    for (var d = 0; d < l.BareWalls.length; d++) {
      if (l.BareWalls[d].BareWallId == n.WallDetails.BareWallId) {
        this.selectedSharedBareWallIndex = d;
        return l
      }
    }
  }
  throw new Error("UserLibraryProxy.getGalleryByWallId failed! No System Gallery found.")
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.galleryHasWalls = function() {
  var c = this.systemLibraryObject.BareWallGalleries[this.selectedWallGalleryIndex].Walls;
  var a = c.length > 0;
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getWallId = function(c) {
  var a = c.indexOf("hex") > -1 ? this.selectedWallGalleryName: c;
  if (!this.flattenedWallsByName[a]) {
    throw new Error("TitleBarModule.getRoomViewQuerystringVals failed! Wall not found.")
  }
  return this.flattenedWallsByName[a].WallId
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getHexValue = function(a) {
  return a.indexOf("hex") > -1 ? "/" + a: ""
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.getNumberOfWalls = function(h, k, c, e, d) {
  var a = 0;
  for (var f = 0; f < h.BareWalls.length; f++) {
    if (this.wallCanAccomodateImage(h.BareWalls[f], k, c, e, d)) {
      a++
    }
  }
  return a
};
com.art.myGalleries.proxies.UserLibraryProxy.prototype.wallCanAccomodateImage = function(o, p, a, d, c) {
  var n = o.UsableAreaWidth;
  var l = 500;
  var f = o.WallAreaWidth / o.WallAreaWidthInches;
  var m = Math.round(n / f);
  var k = Math.round(l / f);
  var h = d / f;
  var e = c / f;
  return (m >= p) && (k >= a) && ((h) > p) && ((e) > a)
};
com.art.myGalleries.proxies.RoomViewProxy = function() {
  if (! (this instanceof com.art.myGalleries.proxies.RoomViewProxy)) {
    error("BIZARRE ERROR")
  }
  this.currentWall;
  this.bareWalls_system;
  this.bareWalls_userUploaded;
  this.changeSize_dataset;
  this.serviceProvider;
  this.status = "ready"
};
com.art.myGalleries.proxies.RoomViewProxy.NAME = "RoomViewProxy";
com.art.myGalleries.proxies.RoomViewProxy.prototype.getDataset_wall = function(d) {
  if (!this.checkDatasetStatus("getDataset_wall")) {
    return
  }
  this.status = "working";
  this.currentWall = null;
  this.bareWalls_system = null;
  this.bareWalls_userUploaded = null;
  if (typeof(d) != "object") {
    this.error("getDataset_wall > must provide an object as input.");
    return
  }
  var e = d.mode;
  var r = d.type;
  var s = d.wallKey;
  var a = d.galleryKey;
  var l = d.onComplete;
  var q = d.thisObj;
  var n = d.savedWallId;
  var t = !isNullOrEmpty(s);
  var c = !isNullOrEmpty(a);
  var o = !isNullOrEmpty(n);
  if (! (e == "view" || e == "edit")) {
    this.error('getDataset_wall > expected inputs.mode to be either "view" or "edit". Instead, got "' + e + '".');
    return
  }
  if (! (r == "user" || r == "auto" || r == "new" || r == "")) {
    this.error('getDataset_wall > expected inputs.type to be either "user", "auto", "new", or blank. Instead, got "' + r + '".');
    return
  }
  if (r == "auto" && !c && !t) {
    this.error("getDataset_wall > in auto mode, either wallKey or galleryKey must be supplied.");
    return
  }
  if (r == "" && !t) {
    this.error("getDataset_wall > leaving type blank will auto-detect type. However, this requires wallKey, which was not supplied.");
    return
  }
  if (e == "view" && !t && !o) {
    this.error("getDataset_wall > in view mode, room key is required.");
    return
  }
  var f = r == "";
  var h = !t;
  var k = f || h || r == "user";
  var p = function() {
    if (this.bareWalls_system == null) {
      return
    }
    if (this.bareWalls_userUploaded == null) {
      return
    }
    if (this.currentWall == null) {
      return
    }
    this.status = "done";
    this.currentWall.bareWalls_system = this.bareWalls_system;
    this.currentWall.bareWalls_userUploaded = this.bareWalls_userUploaded;
    if (this.currentWall.bareWall == null) {
      for (var u = 0; u < this.bareWalls_system.length; u++) {
        if (this.bareWalls_system[u].Name == "Roomsbysize") {
          continue
        }
        this.currentWall.bareWall = this.bareWalls_system[u].BareWalls[0];
        break
      }
    }
    l.call(q, this.currentWall);
    this.status = "ready"
  };
  if (e == "view") {
    var m = this;
    this.getWallByProfileKey(s,
    function() {
      l.call(q, m.currentWall)
    })
  }
  if (e == "edit") {
    this.getBareWalls_system(p);
    this.getBareWalls_userUploaded(p);
    if (!t) {
      this.getGalleryDetailsWithResultFilter(a, p, "auto", null)
    } else {
      this.getWallByProfileKey(s,
      function(u) {
        this.handleAutoDetectGallery(u, p, r, s)
      })
    }
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handleAutoDetectGallery = function(c, d, e, f) {
  this.checkResponseForErrors(c, "handleAutoDetectGallery (anonymous)");
  switch (true) {
  case typeof(c.Library) == "undefined": this.error("handleAutoDetectGallery (anonymous) > response.Library not found.");
    return;
  case typeof(c.Library.Galleries[0]) == "undefined": this.error("handleAutoDetectGallery (anonymous) > response.Library.Galleries[0] not found.");
    return;
  case typeof(c.Library.Galleries[0].ItemKey) == "undefined": this.error("handleAutoDetectGallery (anonymous) > response.Library.Galleries[0].ItemKey not found.");
    return
  }
  var a = c.Library.Galleries[0].ItemKey;
  this.getGalleryDetailsWithResultFilter(a, d, e, f)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getBareWalls_system = function(d) {
  var a = MyGalleriesCore.getModel();
  var c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&gallerySortOption=" + JSON.stringify({
    DefaultSort: true,
    SortBy: a.gallerySortBy,
    SortDirection: a.gallerySortDirection
  });
  c += "&" + a.getGalleryPagingOptionObjectAsString();
  var e = this.getServiceProvider();
  e.galleryAPIService.getSystemLibrary({
    rvp: this,
    successHandler: function(f) {
      this.rvp.handle_getBareWalls_system_success(f, d)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_getBareWalls_system_success = function(e, d) {
  this.checkResponseForErrors(e, "handle_getBareWalls_system_success");
  if (typeof(e.Library) == "undefined") {
    this.error("handle_getBareWalls_system_success > response.Library is not present.");
    return
  }
  this.bareWalls_system = e.Library.BareWallGalleries;
  for (var a = 0; a < this.bareWalls_system.length; a++) {
    for (var c = 0; c < this.bareWalls_system[a].BareWalls.length; c++) {
      this.bareWalls_system[a].BareWalls[c].type = "system";
      this.bareWalls_system[a].BareWalls[c].bareWallGalleryId = this.bareWalls_system[a].GalleryId
    }
  }
  if (typeof(d) == "function") {
    d.call(this)
  }
  return this.bareWalls_system
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getBareWalls_userUploaded = function(d) {
  var a = MyGalleriesCore.getModel();
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += '&libraryResultFilter={"IncludeAutoSavedWalls":"false","IncludeBareWalls":"true"}';
  var e = this.getServiceProvider();
  e.galleryAPIService.getUserLibrary({
    rvp: this,
    successHandler: function(f) {
      this.rvp.handle_getBareWalls_userUploaded_success(f, d)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_getBareWalls_userUploaded_success = function(h, f) {
  this.checkResponseForErrors(h, "handle_getBareWalls_userUploaded_success");
  if (typeof(h.Library) == "undefined") {
    this.error("handle_getBareWalls_userUploaded_success > response.Library is not present.");
    return
  }
  var a = [];
  for (var d in h.Library.BareWallGalleries) {
    var c = h.Library.BareWallGalleries[d].BareWalls;
    if (!c || !c.length) {
      continue
    }
    for (var e = 0; e < c.length; e++) {
      a.push(c[e])
    }
  }
  for (var d = 0; d < a.length; d++) {
    a[d].type = "userUploaded";
    a[d].bareWallGalleryId = "user"
  }
  this.bareWalls_userUploaded = a;
  if (typeof(f) == "function") {
    f.call(this, a)
  }
  return a
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getWallByProfileKey = function(h, d, f) {
  if (typeof(h) == "undefined") {
    this.error("getWallByProfileKey > wallKey was not defined.")
  }
  var a = MyGalleriesCore.getModel();
  var e = this.getServiceProvider();
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&profileKey=" + a.environmentSub.profileKey;
  if (MyGalleriesCore.getUserLibraryProxy().savedWallId != "" && MyGalleriesCore.getUserLibraryProxy().savedWallId != undefined) {
    c += "&wallId=" + MyGalleriesCore.getUserLibraryProxy().savedWallId;
    e.galleryAPIService.getWallByWallId({
      rvp: this,
      successHandler: function(k) {
        this.rvp.handle_getWallByProfileKey_success(k, d)
      },
      errorHandler: this.handleError,
      beforeSendHandler: function() {}
    },
    c)
  } else {
    c += "&roomKey=" + h;
    e.galleryAPIService.getWallByProfileKey({
      rvp: this,
      successHandler: function(k) {
        this.rvp.handle_getWallByProfileKey_success(k, d)
      },
      errorHandler: this.handleError,
      beforeSendHandler: function() {}
    },
    c)
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_getWallByProfileKey_success = function(d, c) {
  this.checkResponseForErrors(d, "handle_getWallByProfileKey_success");
  if (d.Library == null) {
    $("#itemsDisplayErrorMsg").show();
    $("#itemsDisplay").hide();
    return
  }
  switch (true) {
  case typeof(d.Library) == "undefined": this.error("handle_getWallByProfileKey_success > response.Library not found.");
    return;
  case typeof(d.Library.Galleries[0]) == "undefined": this.error("handle_getWallByProfileKey_success > response.Library.Galleries[0] not found.");
    return;
  case typeof(d.Library.Galleries[0].Walls[0]) == "undefined": this.error("handle_getWallByProfileKey_success > response.Library.Galleries[0].Walls[0] not found.");
    return;
  case typeof(c) != "function": this.error("handle_getWallByProfileKey_success > onSuccess was not a function. Cannot return data.");
    return
  }
  var f = d.Library.Galleries[0].Walls[0];
  var e = {};
  e.id = f.WallId;
  e.name = f.Name;
  e.key = f.ItemKey;
  e.saveType = f.IsSnapShot ? "user": "auto";
  e.imageUrl = f.Icon.LargeImage.HttpImageURL;
  e.bareWall = f.WallDetails;
  e.wallItems = f.WallItems;
  e.description = f.LongDescription;
  for (var a = 0; a < e.wallItems.length; a++) {
    e.wallItems[a].selected = true
  }
  e.gallery = d.Library.Galleries[0];
  this.currentWall = e;
  if (typeof(c) == "function") {
    c.call(this, d)
  }
  return d
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getGalleryDetailsWithResultFilter = function(d, e, h, k) {
  if (typeof(d) == "undefined") {
    this.error("getGalleryDetailsWithResultFilter > galleryKey was not defined.")
  }
  if (!h || h == "") {
    error('RoomViewProxy > getGalleryDetailsWithResultFilter > ERROR: required input "type" not provided. Aborting...')
  }
  var a = MyGalleriesCore.getModel();
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&persona=" + a.environmentSub.profileKey;
  c += "&galleryKey=" + d;
  c += "&galleryAuthToken=" + a.environment.galleryAuthToken;
  c += "&gallerySortOption=" + JSON.stringify({
    DefaultSort: true,
    SortBy: a.gallerySortBy,
    SortDirection: a.gallerySortDirection
  });
  c += "&" + a.getGalleryPagingOptionObjectAsString();
  c += "&ResultFilterOptions=" + JSON.stringify({
    IncludeGalleryItems: true,
    IncludeUserSavedWalls: h == "user",
    IncludeAutoSavedWalls: h == "auto",
    IncludeWallItems: true
  });
  var f = this.getServiceProvider();
  f.galleryAPIService.getGalleryDetailswithResultFilter({
    rvp: this,
    successHandler: function(l) {
      this.rvp.handle_getGalleryDetailsWithResultFilter_success(l, e, h, k)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_getGalleryDetailsWithResultFilter_success = function(m, l, o, q) {
  this.checkResponseForErrors(m, "handle_getGalleryDetailsWithResultFilter_success");
  switch (true) {
  case typeof(m.Library) == "undefined": this.error("handle_getGalleryDetailsWithResultFilter_success > response.Library not found.");
    return;
  case typeof(m.Library.Galleries[0]) == "undefined": this.error("handle_getGalleryDetailsWithResultFilter_success > response.Library.Galleries[0] not found.");
    return;
  case typeof(m.Library.Galleries[0].Walls) != "object": this.error("handle_getGalleryDetailsWithResultFilter_success > response.Library.Galleries[0].Walls not found, or was not an array. Cannot parse auto-saved walls.");
    return;
  case typeof(m.Library.Galleries[0].Items) == "undefined": this.error("handle_getGalleryDetailsWithResultFilter_success > response.Library.Galleries[0].Items not found. Cannot parse gallery items.");
    return;
  case typeof(l) != "function": this.error("handle_getGalleryDetailsWithResultFilter_success > onSuccess was not a function. Cannot return data.");
    return
  }
  var r = null;
  var c = m.Library.Galleries[0];
  if (c.Walls.length == 0) {
    o = "new"
  } else {
    for (var h = 0; h < c.Walls.length; h++) {
      if (typeof(q) != "undefined" && q != "") {
        if (typeof(c.Walls[h].ItemKey) != "undefined" && c.Walls[h].ItemKey == q) {
          r = c.Walls[h];
          break
        } else {
          if (r == null || c.Walls[h].DateUpdated > r.DateUpdated) {
            r = c.Walls[h]
          }
        }
      }
    }
    if (r == null) {
      error("RoomViewProxy > handle_getGalleryDetailsWithResultFilter_success > could not find the right wall node! Aborting...")
    }
  }
  var p;
  var n = [];
  if (this.currentWall) {
    p = this.currentWall;
    p.gallery = m.Library.Galleries[0];
    for (var h = 0; h < this.currentWall.wallItems.length; h++) {
      if (this.currentWall.wallItems[h].selected) {
        n.push(this.currentWall.wallItems[h])
      }
    }
    p.wallItems = []
  } else {
    p = {};
    if (o == "new") {
      p.id = "";
      p.name = "(NEW WALL)";
      p.key = "";
      p.saveType = "new";
      p.imageUrl = "";
      p.bareWall = null;
      p.wallItems = []
    } else {
      p.id = r.WallId;
      p.name = r.Name;
      p.key = r.ItemKey;
      p.saveType = r.IsSnapShot ? "user": "auto";
      try {
        p.imageUrl = r.Icon.LargeImage.HttpImageURL
      } catch(a) {
        if (p.saveType == "user") {
          error("RoomViewProxy > handle_getGalleryDetailsWithResultFilter > warning! this wall did not have an Icon property! View and Share functionality will not work! Wall to follow.");
          error(p)
        }
        p.imageUrl = ""
      }
      p.bareWall = r.WallDetails;
      if (r.WallItems.length > 0) {
        n = r.WallItems
      }
      p.wallItems = []
    }
    p.gallery = m.Library.Galleries[0]
  }
  var f = m.Library.Galleries[0].Items;
  for (var h = 0; h < f.length; h++) {
    var d = {
      Item: f[h],
      selected: false
    };
    if (n.length > 0) {
      for (var k = 0; k < n.length; k++) {
        if (d.Item.ItemGalleryItemID == n[k].Item.ItemGalleryItemID) {
          d.selected = true;
          d.ProductCenterPositionX = n[k].ProductCenterPositionX;
          d.ProductCenterPositionY = n[k].ProductCenterPositionY;
          d.ProductTargetAreaPosX = n[k].ProductTargetAreaPosX;
          d.ProductTargetAreaPosY = n[k].ProductTargetAreaPosY
        }
      }
    }
    p.wallItems.push(d)
  }
  this.currentWall = p;
  if (typeof(l) == "function") {
    l.call(this, m)
  }
  return m
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.updateWall = function(h, e) {
  if (typeof(h) == "undefined") {
    this.error("updateWall > wall was not defined.")
  }
  var a = MyGalleriesCore.getModel();
  if (!a.hasWritePermissions()) {
    return
  }
  var d = "";
  if (h.description) {
    d = h.description
  }
  var k = {
    Name: h.name,
    WallId: h.id,
    WallVisibility: 0,
    ShortDescription: d,
    LongDescription: d,
    WallDetails: {
      BareWallId: h.bareWall.BareWallId,
      BackGroundColor: h.bareWall.hex
    }
  };
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&WallId=" + h.id;
  c += "&Wall=" + JSON.stringify(k);
  var f = this.getServiceProvider();
  f.galleryAPIService.updateWall({
    rvp: this,
    successHandler: function(l) {
      this.rvp.handle_updateWall_success(l, e)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_updateWall_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_updateWall_success");
  if (typeof(a) == "function") {
    a.call(this, c)
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.updateWallItems = function(k, f) {
  if (typeof(k) == "undefined") {
    this.error("updateWallItems > wall was not defined.")
  }
  var a = MyGalleriesCore.getModel();
  if (!a.hasWritePermissions()) {
    return
  }
  var l = {
    WallId: k.id,
    WallItems: []
  };
  for (var d = 0; d < k.wallItems.length; d++) {
    if (!k.wallItems[d].selected) {
      continue
    }
    var e = {
      Item: {
        ItemGalleryItemID: k.wallItems[d].Item.ItemGalleryItemID
      },
      ProductCenterPositionX: k.wallItems[d].ProductCenterPositionX,
      ProductCenterPositionY: k.wallItems[d].ProductCenterPositionY,
      ProductTargetAreaPosX: 0,
      ProductTargetAreaPosY: 0
    };
    l.WallItems.push(e)
  }
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&WallID=" + k.id;
  c += "&Wall=" + JSON.stringify(l);
  var h = this.getServiceProvider();
  h.galleryAPIService.updateWallItems({
    rvp: this,
    successHandler: function(m) {
      this.rvp.handle_updateWallItems_success(m, f)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_updateWallItems_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_updateWallItems_success");
  if (typeof(a) == "function") {
    a.call(this, c)
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.createWall = function(k, f) {
  if (typeof(k) == "undefined") {
    this.error("createWall > wall was not defined.")
  }
  var a = MyGalleriesCore.getModel();
  var l = {
    WallDetails: {
      BareWallId: k.bareWall.BareWallId
    },
    WallItems: []
  };
  for (var d = 0; d < k.wallItems.length; d++) {
    if (!k.wallItems[d].selected) {
      continue
    }
    var e = {
      Item: {
        ItemGalleryItemID: k.wallItems[d].Item.ItemGalleryItemID
      },
      ProductCenterPositionX: k.wallItems[d].ProductCenterPositionX,
      ProductCenterPositionY: k.wallItems[d].ProductCenterPositionY,
      ProductTargetAreaPosX: 0,
      ProductTargetAreaPosY: 0
    };
    l.WallItems.push(e)
  }
  var c;
  c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&galleryId=" + k.gallery.GalleryId;
  c += "&Wall=" + JSON.stringify(l);
  var h = this.getServiceProvider();
  h.galleryAPIService.createWall({
    rvp: this,
    successHandler: function(m) {
      this.rvp.handle_createWall_success(m, f)
    },
    errorHandler: this.handleError,
    beforeSendHandler: function() {}
  },
  c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_createWall_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_createWall_success");
  if (typeof(a) == "function") {
    a.call(this, c)
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getAlternateSizes = function(a, d) {
  var e = "itemId=" + a;
  e += "&imageId=";
  e += "&lookupType=ItemNumber";
  e += "&targetDomain=ArtCom";
  e += "&CurrencyCode=" + MyGalleriesCore.getModel().environment.currencyCode;
  e += "&languageCode=" + MyGalleriesCore.getModel().environment.languageIso;
  e += "&includePODServiceOptions=true";
  e += "&includeRelatedCategories=true";
  e += "&includeRelatedItems=true";
  e += "&includeProductContent=true";
  e += "&includeRatingAndReview=true";
  var c = {
    rvp: this,
    getProductInfoSuccess: function(f) {
      this.rvp.handle_getAlternateSizes_success(f, d)
    },
    getProductInfoError: this.handleError,
    getProductInfoBeforeSend: function() {}
  };
  this.serviceProvider.productServiceAPI.GetProductInformation(e, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_getAlternateSizes_success = function(c, a) {
  this.changeSize_dataset = c;
  a.call(null, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.addNewSizeToGallery = function(n, s, r) {
  var c = null;
  for (var m = 0; m < this.currentWall.wallItems.length; m++) {
    if (this.currentWall.wallItems[m].Item.ItemGalleryItemID == n) {
      c = this.currentWall.wallItems[m].Item;
      break
    }
  }
  if (c == null) {
    error('RoomViewProxy > addNewSizeToGallery > ERROR: could not find base item in wallItems collection. ItemGalleryItemID was: "' + n + '". WallItems collection to follow.');
    error(this.currentWall.wallItems);
    return
  }
  var e = this.changeSize_dataset;
  var q = {};
  q.Imageid = c.Imageid;
  q.AvailableInOtherSizes = c.AvailableInOtherSizes || false;
  q.ArtistId = c.Item.ArtistId;
  q.ArtistName = c.Item.ArtistName;
  q.Source = "roomView";
  if (c.SpecialHandlingID != null && c.SpecialHandlingID != undefined) {
    q.SpecialHandlingID = c.SpecialHandlingID
  }
  for (var m = 0; m < e.length; m++) {
    if (s == e[m].ItemId && !e[m].IsPOD) {
      q.APNum = e[m].ItemId;
      q.Sku = "";
      q.ItemDisplayTypeID = e[m].ItemDisplayTypeID;
      q.ItemPrice = e[m].ItemPrice.Price;
      q.Title = e[m].Title;
      q.PODConfigID = 0
    } else {
      if (e[m].IsPOD) {
        var w = e[m].PODProductType.length;
        for (var p = 0; p < w; p++) {
          var u = e[m].PODProductType[p];
          var v = u.PODInformation;
          for (var o = 0; o < v.length; o++) {
            if (s == v[o].POD_ConfigID || s == e[m].ItemId) {
              q.APNum = e[m].ItemId;
              q.Sku = "";
              q.ItemDisplayTypeID = u.ItemDisplayTypeID;
              q.ItemPrice = v[o].ItemPrice.Price;
              q.Title = e[m].Title;
              q.PODConfigID = v[o].POD_ConfigID
            }
          }
        }
      }
    }
  }
  var a = MyGalleriesCore.getModel();
  var h = this.currentWall.gallery.GalleryId;
  var l = [q];
  var d = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  d += "&galleryItems=" + escape(JSON.stringify(l));
  d += "&galleryID=" + h;
  d += "&allowDuplicate=false";
  var f = {
    rvp: this,
    app: this.app,
    successHandler: function(k) {
      this.rvp.handle_addNewSizeToGallery_success(k, r)
    },
    getProductInfoError: this.handleError,
    beforeSendHandler: function() {}
  };
  var t = this.getServiceProvider();
  t.galleryAPIService.addItemsToGallery(f, d)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_addNewSizeToGallery_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_addNewSizeToGallery_success");
  this.getGalleryDetailsWithResultFilter(this.currentWall.gallery.ItemKey, a, this.currentWall.saveType, this.currentWall.key)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.saveRoom = function(e) {
  var a = MyGalleriesCore.getModel();
  var h = $("#mg_saveroommodal_roomtitle").val();
  var f = $("#mg_saveroommodal_roomdescription").val();
  if (f == "Optional Description") {
    f = ""
  }
  var l = 0;
  var m = {
    Name: h,
    ShortDescription: f,
    LongDescription: f,
    WallVisibility: l,
    IsSnapshot: "true"
  };
  var c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&WallID=" + this.currentWall.id;
  c += "&wall=" + escape(JSON.stringify(m));
  var d = {
    rvp: this,
    app: this.app,
    successHandler: function(n) {
      this.rvp.handle_saveRoom_success(n, e)
    },
    getProductInfoError: this.handleError,
    beforeSendHandler: function() {}
  };
  var k = this.getServiceProvider();
  k.galleryAPIService.copyWallWithItems(d, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_saveRoom_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_saveRoom_success");
  a.call(null, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.shareWall = function(e) {
  var a = MyGalleriesCore.getModel();
  var c = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  c += "&galleryId=" + a.environmentSub.selectedGalleryID;
  c += "&persona=" + a.environmentSub.profileKey;
  c += "&galleryKey=" + a.environmentSub.galleryKey;
  c += "&galleryAuthToken=" + a.environment.galleryAuthToken;
  c += "&WallID=" + this.currentWall.id;
  c += "&createSnapshot=true";
  var d = {
    rvp: this,
    app: this.app,
    successHandler: function(h) {
      this.rvp.handle_shareWall_success(h, e)
    },
    getProductInfoError: this.handleError,
    beforeSendHandler: function() {}
  };
  var f = this.getServiceProvider();
  f.galleryAPIService.shareWall(d, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_shareWall_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_shareWall_success");
  a.call(null, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.createBarewallFromImageUploadService = function(e, k) {
  var a = {};
  var h = com.art.core.utils.XMLUtil.getXMLFromString(e.Image.replace(/\[\[BACKSLASH\]\]/g, "\\"));
  var f = {};
  f.LargeImage = {
    HttpImageURL: com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "LrgImageUrl")
  };
  f.MediumImage = {
    HttpImageURL: com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "MedImageUrl")
  };
  f.SmallImage = {
    HttpImageURL: com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "SmlImageUrl")
  };
  a.BareWallId = "0";
  a.IsAngledRoom = false;
  a.RoomAngle = 0;
  a.ImageInformation = null;
  a.UsableAreaWidth = com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "OrigW");
  a.UsableAreaHeight = com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "OrigH");
  a.UsableAreaPosY = 0;
  a.UsableAreaPosX = 0;
  a.ProductTargetAreaPosX = 0;
  a.ProductTargetAreaPosY = 0;
  a.WallAreaWidth = a.UsableAreaWidth;
  a.WallAreaHeight = a.UsableAreaHeight;
  a.WallAreaWidthInches = 10 * 12;
  a.WallAreaHeightInches = a.WallAreaWidthInches * (a.UsableAreaHeight / a.UsableAreaWidth);
  a.RulerLength = 0;
  a.Guide1Y = 0;
  a.Guide2Y = 0;
  a.RulerX1 = 0;
  a.RulerX2 = 0;
  a.RulerY1 = 0;
  a.RulerY2 = 0;
  a.RulerLength = 0;
  a.Caption = "caption";
  a.WallImageGUID = com.art.core.utils.XMLUtil.getTextFromUniqueNodeInXml(h, "ImageGUID");
  var c = -1;
  var d = Number(a.UsableAreaWidth) / (10 * 12);
  if (!isNaN(d)) {
    c = d
  }
  a.InchesConversionRate = c;
  this.createBarewall(a, k)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.createBarewall = function(c, f) {
  var a = MyGalleriesCore.getModel();
  var d = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  d += "&galleryID=0";
  d += "&Wall=" + JSON.stringify([c]);
  var e = {
    rvp: this,
    app: this.app,
    successHandler: function(k) {
      this.rvp.handle_createBarewall_success(k, f)
    },
    getProductInfoError: this.handleError,
    beforeSendHandler: function() {}
  };
  var h = this.getServiceProvider();
  h.galleryAPIService.addBareWalls(e, d)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_createBarewall_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_createBarewall_success");
  a.call(null, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.updateBarewall = function(c, h) {
  var a = MyGalleriesCore.getModel();
  var d = JSON.parse(JSON.stringify(c));
  delete d.ImageInformation;
  var l = JSON.stringify(d);
  l = escape(l);
  var e = a.getAccessKeyObjectAsString() + "&" + a.getUserProfileObjectAsString();
  e += "&galleryID=0";
  e += "&Wall=" + l;
  var f = {
    rvp: this,
    app: this.app,
    successHandler: function(m) {
      this.rvp.handle_updateBarewall_success(m, h)
    },
    getProductInfoError: this.handleError,
    beforeSendHandler: function() {}
  };
  var k = this.getServiceProvider();
  k.galleryAPIService.updateBareWall(f, e)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handle_updateBarewall_success = function(c, a) {
  this.checkResponseForErrors(c, "handle_updateBarewall_success");
  a.call(null, c)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.checkResponseForErrors = function(c, a) {
  if (typeof(a) == "undefined") {
    a = ""
  }
  if (typeof(c) == "undefined") {
    this.error(a + " > response is null.");
    return
  }
  if (typeof(c.OperationResponse) == "undefined") {
    this.error(a + " >  OperationResponse is null.");
    return
  }
  if (typeof(c.OperationResponse.ResponseMessage) == "undefined") {
    this.error(a + " > OperationResponse.ResponseMessage is null.");
    return
  }
  if (c.OperationResponse.ResponseMessage != "Success") {
    this.error(a + " > service call was not successful. ResponseMessage=" + c.OperationResponse.ResponseMessage)
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.checkDatasetStatus = function(a) {
  switch (this.status) {
  case "working":
    this.error(a + "> unable to get new dataset. An operation is currently in progress.");
    return false;
  case "error":
    this.error(a + "> beginning a new dataset while a previous dataset is in an error state. This will overwrite the dataset and discard the error.");
    break;
  case "done":
    this.warn(a + "> beginning a new dataset while a previous dataset is done, but not yet read. This will overwrite the dataset.");
    break;
  case "ready":
    break;
  default:
    this.warn(a + "> unknown status prior to getDataset operation. Erratic behavior may occur.")
  }
  return true
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.handleError = function(a) {
  this.status = "error";
  this.error("handleError > generic error. Response to follow.");
  this.error(a)
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.getServiceProvider = function() {
  if (!this.serviceProvider) {
    this.serviceProvider = new com.art.core.services.ServiceProvider(MyGalleriesCore.getEnvironment())
  }
  return this.serviceProvider
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.error = function(a) {
  this.status = "error";
  if (typeof(console) != "undefined") {
    if (typeof(console.error) != "undefined") {
      console.error("RoomViewProxy > " + a)
    } else {
      if (typeof(console.log) != "undefined") {
        console.log("ERROR: RoomViewProxy > " + a)
      }
    }
  }
};
com.art.myGalleries.proxies.RoomViewProxy.prototype.warn = function(a) {
  if (typeof(console) != "undefined") {
    if (typeof(console.warn) != "undefined") {
      console.warn("RoomViewProxy > " + a)
    } else {
      if (typeof(console.log) != "undefined") {
        console.log("WARNING: RoomViewProxy > " + a)
      }
    }
  }
};
var MyGalleriesCore = (function() {
  var o = {};
  var t = {};
  var p = {};
  var q = {};
  var s = {};
  var r = {};
  var d = {};
  var e = {};
  var h = {};
  var c = {};
  var u = "@VERSION@";
  var l;
  var n = {};
  var m = {};
  var f = {
    STARTUP: "startup",
    UPDATE_BACKGROUND_COLOR: "updateBackgroundColor",
    CHANGE_VIEWMODE: "changeViewMode",
    GET_ALL_GALLERY_ITEMS: "getAllGalleryItems",
    GET_ALL_GALLERY_ITEMS_SUCCESS: "getAllGalleryItemsSuccess",
    GET_ALL_GALLERY_ITEMS_FAILED: "getAllGalleryItemsFailed",
    UPDATE_GALLERY_TITLE_DESC: "updateTitleDesc",
    UPDATE_GALLERY_TITLE_DESC_SUCCESS: "updateTitleDescSuccess",
    UPDATE_GALLERY_TITLE_DESC_FAILED: "updateTitleDescFailure",
    ADD_GALLERY_TITLE_DESC: "addTitleDesc",
    ADD_GALLERY_TITLE_DESC_SUCCESS: "addTitleDescSuccess",
    ADD_GALLERY_TITLE_DESC_FAILED: "addTitleDescFailure",
    GALLERY_ITEM_SORT: "galleryItemsSort",
    GALLERY_ITEM_SORT_SUCCESS: "galleryItemsSortSuccess",
    GALLERY_ITEM_SORT_FAILED: "galleryItemsSortFailed",
    GET_SYSTEM_LIBRARY: "getSystemLibrary",
    GET_SYSTEM_LIBRARY_SUCCESS: "getSystemLibrarySuccess",
    GET_SYSTEM_LIBRARY_FAILED: "getSystemLibraryFailed",
    GET_USER_LIBRARY: "getUserLibrary",
    GET_USER_LIBRARY_SUCCESS: "getUserLibrarySuccess",
    GET_USER_LIBRARY_FAILED: "getUserLibraryFailed",
    ADD_ITEM_TO_EXISTING_GALLERY: "addItemToExistingGallery",
    ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS: "addItemToExistingGallerySuccess",
    ADD_ITEM_TO_EXISTING_GALLERY_FALIED: "addItemToExistingGalleryFailed",
    ADD_ITEM_TO_EXISTING_GALLERY_DP: "detailPageAddItemToExistingGallery",
    ADD_ITEM_TO_EXISTING_GALLERY_DP_SUCCESS: "detailPageAddItemToExistingGallerySuccess",
    ADD_ITEM_TO_EXISTING_GALLERY_DP_FALIED: "detailPageAddItemToExistingGalleryFailed",
    MOVE_ADD_ITEM_TO_EXISTING_GALLERY: "moveAddItemToExistingGallery",
    MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS: "moveAddItemToExistingGallerySuccess",
    MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FALIED: "moveAddItemToExistingGalleryFailed",
    MOVE_ADD_ITEM_TO_NEW_GALLERY: "moveAddItemToNewGallery",
    MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS: "moveAddItemToNewGallerySuccess",
    MOVE_ADD_ITEM_TO_NEW_GALLERY_FALIED: "moveAddItemToNewGalleryFailed",
    ADD_ITEM_TO_EXISTING_GALLERY_EXT: "addItemToExistingGalleryExt",
    GET_ALL_GALLERIES: "getAllGalleries",
    GET_ALL_GALLERIES_SUCCESS: "getAllGalleriesSuccess",
    GET_ALL_GALLERIES_FAILED: "getAllGalleriesFailed",
    ADD_ITEM_TO_NEW_GALLERY: "AddItemToNewGallery",
    ADD_ITEM_TO_NEW_GALLERY_SUCCESS: "AddItemToNewGallerySuccess",
    ADD_ITEM_TO_NEW_GALLERY_FALIED: "AddItemToNewGalleryFailed",
    ADD_ITEM_TO_NEW_GALLERY_DP: "detailPageAddItemToNewGallery",
    ADD_ITEM_TO_NEW_GALLERY_DP_SUCCESS: "detailPageAddItemToNewGallerySuccess",
    ADD_ITEM_TO_NEW_GALLERY_DP_FALIED: "detailPageAddItemToNewGalleryFailed",
    SHOW_LOGINMODAL: "showLoginModal",
    REGISTER_ACCOUNT: "registerMyGalleriesAccount",
    REGISTER_ACCOUNT_SUCCESS: "registerMyGalleriesAccountSuccess",
    REGISTER_ACCOUNT_FAILED: "registerMyGalleriesAccountFailed",
    REGISTER_ACCOUNT_TRAY_SUCCESS: "registerMyGalleriesTrayAccountSuccess",
    REGISTER_ACCOUNT_TRAY_FAILED: "registerMyGalleriesTrayAccountFailed",
    LOGIN_ACCOUNT: "loginMyGalleriesAccount",
    LOGIN_ACCOUNT_SUCCESS: "loginMyGalleriesAccountSuccess",
    LOGIN_ACCOUNT_FAILED: "loginMyGalleriesAccountFailed",
    LOGOUT_MYGALLERY: "logoutMyGalleriesAccount",
    LOGOUT_MYGALLERY_SUCCESS: "logoutMyGalleriesAccountSuccess",
    LOGOUT_MYGALLERY_FAILED: "logoutMyGalleriesAccountFailed",
    LOGIN_ACCOUNT_TRAY_SUCCESS: "loginMyGalleriesTrayAccountSuccess",
    LOGIN_ACCOUNT_TRAY_FAILED: "loginMyGalleriesTrayAccountFailed",
    LOGOUT_TRAY_MYGALLERY: "logoutMyGalleriesAccount",
    LOGOUT_TRAY_MYGALLERY_SUCCESS: "logoutMyGalleriesAccountSuccess",
    LOGOUT_TRAY_MYGALLERY_FAILED: "logoutMyGalleriesAccountFailed",
    UPDATE_DLE: "updateDLE",
    UPDATE_WALL_ITEMS: "updateWallItems",
    UPDATE_WALL_ITEMS_SUCCESS: "updateWallItemsSuccess",
    UPDATE_WALL_ITEMS_FAILED: "updateWallItemsFailed",
    CREATE_WALL: "createWall",
    CREATE_WALL_SUCCESS: "createWallSuccess",
    CREATE_WALL_FAILED: "createWallFailed",
    GET_WALLS: "getWalls",
    GET_WALLS_SUCCESS: "getWallsSuccess",
    GET_WALLS_FAILED: "getWallsFailed",
    ADD_SIMILAR_ARTIST_ITEM: "addSimilarArtistItem",
    ADD_SIMILAR_ARTIST_ITEM_SUCCESS: "addSimilarArtistItemSuccess",
    ADD_SIMILAR_ARTIST_ITEM_FAILED: "addSimilarArtistItemFailed",
    SHORTEN_ROOM_VIEW_URL: "shortenRoomViewURL",
    SHORTEN_ROOM_VIEW_URL_SUCCESS: "shortenRoomViewURLSuccess",
    SHORTEN_ROOM_VIEW_URL_FAILED: "shortenRoomViewURLFailed",
    INITIAL_LOAD: "initialLoad",
    SHARE_REQUEST: "shareRequest",
    SHARE_REQUEST_SUCCESS: "shareRequestSuccess",
    SHARE_REQUEST_FAILED: "shareRequestFailed",
    DELETE_GALLERY_ITEM: "deleteGalleryItem",
    DELETE_GALLERY_ITEM_FAILED: "deleteGalleryItemFailed",
    DELETE_GALLERY_ITEM_SUCCESS: "deleteGalleryItemSuccess",
    DELETE_GALLERY: "deleteGallery",
    DELETE_GALLERY_FAILED: "deleteGalleryFailed",
    DELETE_GALLERY_SUCCESS: "deleteGallerySuccess",
    ADD_BARE_WALLS: "addBareWalls",
    ADD_BARE_WALLS_SUCCESS: "addBareWallsSuccess",
    ADD_BARE_WALLS_ERROR: "addBareWallsError",
    SHARE_WALL: "shareWall",
    SHARE_ACTION_SUCCESS: "shareActionSuccess",
    UPDATE_BARE_WALL: "updateBareWall",
    UPDATE_BARE_WALL_SUCCESS: "updateBareWallSuccess",
    UPDATE_BARE_WALL_ERROR: "updateBareWallError",
    ADD_BARE_WALLS_ERROR: "addBareWallsError",
    SHOW_CREATE_GALLERY_MODAL: "SHOW_CREATE_GALLERY_MODAL",
    DELETE_GALLERY_ITEM_DP: "detailPageDeleteGalleryItem",
    DELETE_GALLERY_ITEM_DP_FAILED: "detailPageDeleteGalleryItemFailed",
    DELETE_GALLERY_ITEM_DP_SUCCESS: "detailPageDeleteGalleryItemSuccess",
    SHOW_LOGIN_OR_JOIN: "showloginorjoin",
    UPDATE_PRIVACY_SETTINGS: "updateprivacysettings",
    GET_FRAME_SKU: "getFrameSku",
    GET_FRAME_SKU_SUCCESS: "getFrameSkuSuccess",
    GET_FRAME_SKU_FAILED: "getFrameSkuError",
    GET_WALL_BY_ID: "getWallById",
    GET_WALL_BY_ID_SUCCESS: "getWallByIdSuccess",
    GET_WALL_BY_ID_ERROR: "getWallByIdError",
    GET_WALL_BY_PROFILE_KEY: "getWallByProfileKey",
    GET_WALL_BY_PROFILE_KEY_SUCCESS: "getWallByProfileKeySuccess",
    GET_WALL_BY_PROFILE_KEY_ERROR: "getWallByProfileKeyError",
    GET_USER_LIBRARY_BY_PROFILE: "getUserLibraryByProfile",
    GET_USER_LIBRARY_BY_PROFILE_SUCCESS: "getUserLibraryByProfileSuccess",
    GET_USER_LIBRARY_BY_PROFILE_ERROR: "getUserLibraryByProfileError",
    LOGIN_FACEBOOK_MYGALLERY: "loginWithFacebook",
    LOGIN_FACEBOOK_MYGALLERY_SUCCESS: "loginWithFacebookSuccess",
    LOGIN_FACEBOOK_MYGALLERY_FAILED: "loginWithFacebookFailed",
    ROOM_VIEW_SWF_LOADED: "roomViewSWFLoaded",
    MYACCOUNT_WISHLIST: "myAccountWishList",
    GET_FRAME_ID: "getFrameID",
    GET_FRAME_ID_SUCCESS: "getFrameIDSuccess",
    GET_FRAME_ID_FAILED: "getFrameIDFailed",
    ADD_DATA_GRAPH: "addDataToGraph",
    FACEBOOK_MERGE_ACCOUNTS: "facebookMergeAccounts",
    ADD_GALLERY_TO_BOOKMARK: "addGalleryToBookmark",
    ADD_GALLERY_TO_BOOKMARK_SUCCESS: "addGalleryToBookmarkSuccess",
    ADD_GALLERY_TO_BOOKMARK_FAILED: "addGalleryToBookmarkFailed",
    ADD_ROOM_TO_BOOKMARK: "addRoomToBookmark",
    ADD_ROOM_TO_BOOKMARK_SUCCESS: "addRoomToBookmarkSuccess",
    ADD_ROOM_TO_BOOKMARK_FAILED: "addRoomToBookmarkFailed",
    REMOVE_ROOM_FROM_BOOKMARK: "removeRoomFromBookmark",
    REMOVE_ROOM_FROM_BOOKMARK_SUCCESS: "removeRoomFromBookmarkSuccess",
    REMOVE_ROOM_FROM_BOOKMARK_FAILED: "removeRoomFromBookmarkFailed",
    REMOVE_GALLERY_FROM_BOOKMARK: "removeGalleryFromBookmark",
    REMOVE_GALLERY_FROM_BOOKMARK_SUCCESS: "removeGalleryFromBookmarkSuccess",
    REMOVE_GALLERY_FROM_BOOKMARK_FAILED: "removeGalleryFromBookmarkFailed",
    ADD_FOLLOW_PROFILE: "addFollowProfile",
    ADD_FOLLOW_PROFILE_SUCCESS: "addFollowProfileSuccess",
    ADD_FOLLOW_PROFILE_FAILED: "addFollowProfileFailed",
    REMOVE_FOLLOW_PROFILE: "removeFollowProfile",
    REMOVE_FOLLOW_PROFILE_SUCCESS: "removeFollowProfileSuccess",
    REMOVE_FOLLOW_PROFILE_FAILED: "removeFollowProfileFailed",
    ADD_ITEM_TO_DEFAULT_GALLERY: "addItemsToDefaultGallery",
    SAVE_ROOM: "saveRoom",
    SAVE_EXISTING_ROOM: "saveExistingRoom",
    SAVE_ROOM_AS: "saveRoomAs",
    SAVE_ROOM_SUCCESS: "saveRoomSuccess",
    SAVE_ROOM_ERROR: "saveRoomError",
    OPEN_SAVE_ROOM_MODAL: "openSaveRoomModal",
    DLE_IMAGE_UPLOAD_COMPLETE: "dleImageUploadComplete",
    DLE_ENABLE_UPLOAD_BUTTON: "dleEnableUploadButton",
    DLE_DISABLE_UPLOAD_BUTTON: "dleDisableUploadButton",
    GET_PRODUCT_INFO: "getProductInfo",
    GET_PRODUCT_INFO_SUCCESS: "getProductInfoSuccess",
    GET_PRODUCT_INFO_FAILED: "getProductInfoFailed",
    SHOW_GLOBAL_LOGINMODAL: "showGlobalLoginModal",
    LOGIN_ACCOUNT_GLOBAL_SUCCESS: "loginAccountGlobalSuccess",
    LOGIN_ACCOUNT_GLOBAL_FAILED: "loginAccountGlobalFailed",
    REGISTER_ACCOUNT_GLOBAL_SUCCESS: "registerAccountGlobalSuccess",
    REGISTER_ACCOUNT_GLOBAL_FAILED: "registerAccountGlobalFailed",
    LOGIN_FACEBOOK_GLOBAL_SUCCESS: "loginFacebookGlobalSuccess",
    LOGIN_FACEBOOK_GLOBAL_FAILED: "loginFacebookGlobalFailed",
    GET_ALL_GALLERIES_USER: "getAllGalleriesUser",
    GET_ALL_GALLERIES_FAILED_FOR_WEBUSER: "getAllGalleriesFailedForWebUser",
    GET_ALL_GALLERIES_SUCCESS_FOR_WEBUSER: "getAllGalleriesSuccessForWebUser",
    REMOVE_WALL: "removeWall",
    REMOVE_WALL_SUCCESS: "removeWallSucess",
    REMOVE_WALL_FAILED: "removeWallFailed",
    SHARE_GALLERY_ITEM: "shareGalleryItem",
    SHARE_GALLERY_ITEM_SUCCESS: "shareGalleryItemSucess",
    SHARE_GALLERY_ITEM_FAILED: "shareGalleryItemFailed",
    ADD_ITEM_TO_EXISTING_OR_NEW_GALLERY_SAVEMENU: "addItemToExistingOrNewGallerySaveMenu",
    GET_ALL_ITEMS_RECENT_GALLERY: "getAllItemsRecentGallery",
    GET_ALL_ITEMS_RECENT_GALLERY_SUCCESS: "getAllItemsRecentGallerySuccess",
    UPDATE_GALLERY_ITEM: "updateGalleryItem"
  };
  var a = {
    GALLERY_HOME: "galleryHome",
    GRID_VIEW: "gridView",
    DETAIL_VIEW: "detailView",
    SLIDESHOW: "slideshow",
    ROOM_VIEW: "roomView",
    DEFAULT: "default",
    FACEBOOK: "facebook",
    EMAIL: "email",
    ANONYMOUS: "1",
    OWNER: "200",
    VIEW: "50",
    EDIT: "100",
    SIGNUP: "SignUp",
    PRODUCT_PAGE: "productPage",
    GALLERY_PAGE: "galleryPage",
    LOGIN: "Login",
    DFEIMAGEMAXW: "200",
    DFEIMAGEMAXH: "200",
    DFEUNITOFMEASUREINCH: "in",
    DFEUNITOFMEASURECM: "cm",
    PERSISTENTCOOKIENAME: "ap",
    SESSIONCOOKIENAME: "arts",
    ACCOUNTID: "accountid",
    AUTHTOKEN: "authtoken",
    ACCOUNTTYPE: "accounttype",
    PROFILEURL: "profileURL",
    BOOKMARK: "10",
    FOLLOWS: "9",
    LOGINFOLLOWS: "follows",
    LOGINBOOKMARK: "bookmark",
    LOGINTRAY: "tray",
    GALLERYPAGE: "gallery",
    FOLLOWSPAGE: "follows",
    BOOKMARKGALLERYPAGE: "bookmarks-gallery",
    BOOKMARKROOMPAGE: "bookmarks-room",
    ROOMPAGE: "room",
    ANONYMOUSUSERLABEL: "Anonymous User",
    YOUPLUSARTLABEL: "You+Art"
  };
  var k = {};
  return {
    getVersion: function() {
      return u
    },
    events: f,
    constants: a,
    getUseCaseResultsByName: function(v) {
      return applicationFlowDebugger.getUseCase(v)
    },
    registerModule: function(v) {
      this.registerSubscriber(v)
    },
    registerSubscriber: function(y) {
      if (y.NAME == undefined) {
        throw new Error("MyGalleries.registerSubscriber failed! observer.NAME is undefined.")
      }
      var v = y.listNotificationInterests();
      for (var w = 0; w < v.length; w++) {
        var x = v[w];
        if (k[x] == undefined) {
          k[x] = {}
        }
        k[x][y.NAME] = true
      }
      r[y.NAME] = y
    },
    getInterestedSubscribers: function() {
      return k
    },
    removeModule: function(w) {
      var x = {};
      for (var v in r) {
        if (v != w) {
          x[v] = r[v]
        }
      }
      r = x
    },
    sendNotification: function(w) {
      for (var v in k[w.name]) {
        if (r[v] != undefined) {
          r[v].handleNotification(w)
        }
      }
    },
    clearAll: function() {
      r = {};
      k = {}
    },
    startAll: function() {
      for (var v in r) {
        r[v].init()
      }
    },
    startAllByViewMode: function(w) {
      for (var v in r) {
        r[v].init(w)
      }
    },
    startModule: function(v, w) {
      if (w == undefined) {
        r[v].init()
      } else {
        r[v].init(w)
      }
    },
    getSubscriber: function(v) {
      return r[v]
    },
    getSubscribers: function(v) {
      return r
    },
    getModule: function(v) {
      return r[v]
    },
    setEnvironment: function(v) {
      d = v
    },
    getEnvironment: function() {
      return d
    },
    addToEnvironment: function(v, w) {
      d[v] = w
    },
    setSubEnvironment: function(v) {
      e = v
    },
    getSubEnvironment: function() {
      return e
    },
    addToSubEnvironment: function(v, w) {
      e[v] = w
    },
    getModel: function() {
      return o
    },
    getUserLibraryProxy: function() {
      return t
    },
    getRoomViewProxy: function() {
      return p
    },
    getServiceProvider: function() {
      return q
    },
    getLocalizationManager: function() {
      return m
    },
    getString: function(v) {
      return m.getString(v)
    },
    init: function(w, z, x) {
      try {
        if (w == undefined) {
          w = {}
        }
      } catch(y) {
        w = {}
      }
      var v = new com.art.core.vos.Environment();
      v.init(w);
      d = v.properties;
      e = x;
      o = new com.art.myGalleries.proxies.ApplicationProxy(d, z, x);
      t = new com.art.myGalleries.proxies.UserLibraryProxy(d, x);
      p = new com.art.myGalleries.proxies.RoomViewProxy();
      m = new com.art.core.utils.LocalizationManager(v, "mg");
      n = new com.art.core.utils.LoggingManager(v);
      this.getLocalizationManager().registerCallback(com.art.core.utils.LocalizationManager.ERROR,
      function(A) {
        _this.getLoggingManager().logError(A)
      })
    },
    updateWallFromDLE: function(w) {
      if (!w.initialLoad) {
        this.getUserLibraryProxy().wallItemsMap[w.itemGalleryItemID] = w;
        if (!this.getModel().hasWritePermissions()) {
          this.getUserLibraryProxy().tempWallItems[w.itemGalleryItemID] = w;
          com.art.core.utils.Flash.getMovie("roomViewFlashTarget").stopCursor();
          return
        } else {
          var v = this.getUserLibraryProxy().getItemsForUpdate();
          this.getModel().updateFromDLE = true;
          if (this.getModel().isEditingSavedRoom) {
            com.art.core.utils.Flash.getMovie("roomViewFlashTarget").stopCursor();
            return
          }
          this.sendNotification(new com.art.core.utils.Note(this.events.UPDATE_WALL_ITEMS, v))
        }
      } else {
        this.getUserLibraryProxy().getCheckBoxByItemGalleryItemID(w.itemGalleryItemID).value.initialLoad = false
      }
    },
    createWallFromDLE: function(v) {
      this.getModel().updateFromDLE = true;
      var v = v.indexOf("hex") > -1 ? this.getUserLibraryProxy().selectedWallGalleryName: v;
      if (this.getModel().isEditingSavedRoom) {
        com.art.core.utils.Flash.getMovie("roomViewFlashTarget").stopCursor();
        return
      }
      if (!this.getUserLibraryProxy().initialLoadComplete) {
        this.getUserLibraryProxy().initialLoadComplete = true;
        if (!this.getUserLibraryProxy().wallExists()) {
          if (!this.getModel().hasWritePermissions()) {
            return
          } else {
            this.sendNotification(new com.art.core.utils.Note(this.events.CREATE_WALL))
          }
        } else {
          this.sendNotification(new com.art.core.utils.Note(this.events.INITIAL_LOAD))
        }
      } else {
        if (!this.getUserLibraryProxy().wallExists()) {
          if (!this.getModel().hasWritePermissions()) {
            return
          }
          this.sendNotification(new com.art.core.utils.Note(this.events.CREATE_WALL))
        } else {
          if (this.getModel().hasWritePermissions()) {
            items = this.getUserLibraryProxy().getItemsForUpdate();
            this.sendNotification(new com.art.core.utils.Note(this.events.UPDATE_WALL_ITEMS, items))
          }
        }
      }
    },
    gaTrackFromDLE: function(v) {
      if (this.getUserLibraryProxy().initialLoadComplete) {
        mygalleriesGA.trackEventWithCategory("Room", this.getUserLibraryProxy().getSelectedWallGAEventName(v))
      }
    },
    allWallItemsResizeComplete: function() {
      if (this.getUserLibraryProxy().wallExists()) {
        var v = this.getUserLibraryProxy().getItemsForUpdate();
        com.art.core.utils.Flash.getMovie("roomViewFlashTarget").updateImagePositions(v)
      }
    },
    swfReadyFromDLE: function() {
      this.getModel().dleIsLoaded = true;
      if (this.getModel().galleryItemsLoaded) {
        this.sendNotification(new com.art.core.utils.Note(this.events.ROOM_VIEW_SWF_LOADED))
      }
    },
    getImageObjectFromDLE: function(w) {
      this.getUserLibraryProxy().selectedWallName = w;
      var v = this.getUserLibraryProxy().getImageObject(w);
      return v
    },
    setSelectedWallGalleryIndexAndNameFromDLE: function(A) {
      this.getUserLibraryProxy().selectedWallGalleryName = A.indexOf(com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER) > -1 ? A.split(com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER)[1] : A;
      var w = A.indexOf(com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER) > -1 ? A.split(com.art.myGalleries.proxies.UserLibraryProxy.EMPTY_WALL_DELIMITER)[0] : A;
      if (this.getUserLibraryProxy().selectedWallGalleryName != "myWallsBrowseBtn") {
        var y = this.getUserLibraryProxy().systemLibraryObject.BareWallGalleries;
        for (var v = 0; v < y.length; v++) {
          if (y[v].Name == w) {
            this.getUserLibraryProxy().selectedWallGalleryIndex = v;
            return
          }
        }
      } else {
        var x = this.getUserLibraryProxy().userLibraryObject.BareWallGalleries;
        for (var B = 0; B < x.length; B++) {
          if (x[B].Name == this.getUserLibraryProxy().selectedWallGalleryName) {
            this.getUserLibraryProxy().selectedWallGalleryIndex = B;
            return
          }
        }
      }
    },
    handleSignInFromDLE: function(v) {
      if (v != "upload" && v != "ruler") {
        this.sendNotification(new com.art.core.utils.Note(this.events.SHOW_LOGINMODAL, {
          signInMode: v
        }))
      }
    },
    handleCallibrationFromDLE: function(v) {
      this.sendNotification(new com.art.core.utils.Note(this.events.UPDATE_BARE_WALL, v))
    },
    createBareWallFromDLE: function(v) {
      if (this.getModel().hasWritePermissions()) {
        this.sendNotification(new com.art.core.utils.Note(this.events.ADD_BARE_WALLS, v))
      }
    },
    setAccountCookieInfo: function(w, x, v) {},
    isUserInThemMode: function() {
      var v = false;
      if (mygalPageInfo.RightNavThem != null) {
        var w = mygalPageInfo.RightNavThem != null;
        if (w == true) {
          v = true
        }
      }
      return v
    },
    AddItemToDefaultGallery: function() {
      this.sendNotification(new com.art.core.utils.Note(this.events.ADD_ITEM_TO_DEFAULT_GALLERY))
    },
    updateGalleryItemFromExternal: function() {
      var v = this;
      clearTimeout(l);
      l = setTimeout(function() {
        v.sendNotification(new com.art.core.utils.Note(v.events.UPDATE_GALLERY_ITEM))
      },
      300)
    },
    externalAddToGallery: function(w) {
      var v = this;
      v.getModel().saveMenuBoolean = false;
      clearTimeout(l);
      l = setTimeout(function() {
        if (v.getModel().selectedImageObject != null) {
          switch (w) {
          case v.constants.PRODUCT_PAGE:
            mygalleriesGA.trackEventWithCategory("Save to Gallery", "Product Page Add - Page Link");
            break;
          case v.constants.GALLERY_PAGE:
            mygalleriesGA.trackEventWithCategory("Save to Gallery", "Gallery Page Add - Page Link");
            break
          }
          v.sendNotification(new com.art.core.utils.Note(v.events.ADD_ITEM_TO_EXISTING_GALLERY_EXT))
        }
      },
      300)
    },
    externalSaveToGalleryMenu: function(w) {
      var v = this;
      v.getModel().saveMenuBoolean = true;
      clearTimeout(l);
      l = setTimeout(function() {
        if (v.getModel().selectedImageObject != null) {
          switch (w) {
          case v.constants.PRODUCT_PAGE:
            mygalleriesGA.trackEventWithCategory("Save to Gallery", "Product Page Add - Page Link");
            break;
          case v.constants.GALLERY_PAGE:
            mygalleriesGA.trackEventWithCategory("Save to Gallery", "Gallery Page Add - Page Link");
            break
          }
          v.sendNotification(new com.art.core.utils.Note(v.events.ADD_ITEM_TO_EXISTING_OR_NEW_GALLERY_SAVEMENU))
        }
      },
      300)
    }
  }
})();
com.art.myGalleries.modules.GalleryHome = function(c, a) {
  this.app = a;
  this.moduleData = c;
  this.NAME = com.art.myGalleries.modules.GalleryHome.NAME;
  this.instance = this
};
com.art.myGalleries.modules.GalleryHome.NAME = "GalleryHome";
com.art.myGalleries.modules.GalleryHome.prototype.init = function(c) {
  var a = this
};
com.art.myGalleries.modules.GalleryHome.prototype.destroy = function() {};
com.art.myGalleries.modules.GalleryHome.prototype.notify = function() {
  this.app.sendNotification(note)
};
com.art.myGalleries.modules.GalleryHome.prototype.listNotificationInterests = function() {
  return [this.app.events.STARTUP]
};
com.art.myGalleries.modules.GalleryHome.prototype.handleNotification = function(a) {
  switch (a.name) {
  case this.app.events.STARTUP:
    break;
  default:
  }
};
com.art.myGalleries.modules.GalleryHome.prototype.getTemplate = function() {
  var a = this.template;
  a = a.replace(/\[IMAGE_DOMAIN\]/gi, this.imagePath);
  a = a.replace(/\[$MYGALLERY\]/gi, this.imagePath);
  return a.replace("$NAME", this.NAME)
};
com.art.myGalleries.modules.GalleryHome.prototype.getTarget = function() {
  return this.moduleData.target
};
com.art.myGalleries.modules.GalleryHome.prototype.template = "";
com.art.myGalleries.modules.ExternalModule = function(c, a) {
  this.app = a;
  this.moduleData = c;
  this.NAME = com.art.myGalleries.modules.ExternalModule.NAME;
  this.instance = this;
  this.modalGalleryLB;
  this.modalSignUpLB;
  this.myModalSaveToGallery;
  this.loginLink;
  this.modalGallery;
  this.selectedGalleryName = "";
  this.framingStudioCall;
  this.FSData = {};
  this.loginOption = "";
  this.wishList;
  this.modalWishList;
  this.modalSaveMenuContainer;
  this.modalAddNewGallery;
  this.newGalleryOptionLB;
  this.deleteArt;
  this.modalDeleteArt;
  this.deleteArtLB;
  this.updateGalleryItemFlag = false
};
com.art.myGalleries.modules.ExternalModule.NAME = "ExternalModule";
com.art.myGalleries.modules.ExternalModule.prototype.init = function(c) {
  var a = this;
  $(".myWishListMyAccount").live("click",
  function() {
    a.app.sendNotification(new com.art.core.utils.Note(a.app.events.MYACCOUNT_WISHLIST))
  });
  if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "y") {
    this.getUserGalleries()
  }
  $(".mygalremovecontainer").live("click",
  function() {
    a.DeleteArt()
  })
};
com.art.myGalleries.modules.ExternalModule.prototype.getUserGalleries = function() {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES))
};
com.art.myGalleries.modules.ExternalModule.prototype.updateGalleryItem = function() {
  var d = this.app.getModel().getSelectedGridItem();
  var c = this.app.getModel().getGalleryItemByGalleryId(d);
  var a = c.GalleryItemData.APNum;
  var e = c.GalleryItemData.PODConfigID;
  this.updateGalleryItemFlag = true;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_ITEM, {
    ItemId: d,
    APNum: a,
    PodConfigId: e
  }))
};
com.art.myGalleries.modules.ExternalModule.prototype.updateGalleryItemToGallery = function() {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_EXISTING_GALLERY, this.app.getModel().environmentSub.selectedGalleryID))
};
com.art.myGalleries.modules.ExternalModule.prototype.DeleteArt = function() {
  var a = this;
  this.deleteArtLB = new com.art.core.components.LightBox("myDeleteArtLB", "body", 0.7);
  this.deleteArtLB.show();
  var f = a.app.getModel().getSelectedGridItem();
  var e = a.app.getModel().getGalleryItemByGalleryId(f);
  var c = e.GalleryItemData.APNum;
  var h = e.GalleryItemData.PODConfigID;
  var d = a.app.getString("This will remove ") + "<span style='font-weight: bold;'>" + e.GalleryItemData.Title + " </span> " + a.app.getString("from YOU + ART.");
  this.deleteArt = new com.art.myGalleries.components.CommonComponent("deleteArtComponent", "Remove", 500, 200, f, "", "", "", e.GalleryItemData.Title, d);
  this.modalDeleteArt = new com.art.core.components.BaseModal("myModalDeleteArt", 480, "#ffffff", true);
  this.modalDeleteArt.setContents(this.deleteArt.render());
  $("body").append(this.modalDeleteArt.render(this.deleteArtLB.getLightBoxZIndex() + 1));
  this.modalDeleteArt.registerEvents();
  $(".modal_header_text").html(a.app.getString("Remove from you + art"));
  $(".modal_header_text").addClass("uCase gCustomFont");
  this.modalDeleteArt.registerButton("dontDelete", com.art.core.components.ArtButton.ART_ORANGE, a.app.getString("Don't Remove"),
  function() {
    a.modalDeleteArt.close();
    a.deleteArtLB.close()
  });
  this.modalDeleteArt.registerButton("delete", com.art.core.components.ArtButton.ART_BLUE, a.app.getString("Remove"),
  function() {
    a.app.sendNotification(new com.art.core.utils.Note(a.app.events.DELETE_GALLERY_ITEM, {
      ItemId: f,
      APNum: c,
      PodConfigId: h
    }))
  });
  this.modalDeleteArt.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
  function() {
    a.deleteArtLB.close()
  });
  this.deleteArt.registerEvents();
  $("#deleteArtComponent_Title").addClass("uCase gCustomFont")
};
com.art.myGalleries.modules.ExternalModule.prototype.setModalInit = function() {
  var d = new com.art.core.cookie.Cookie();
  var f = "";
  f = this.app.getModel().getLastSelectedGalleryID();
  if (d.getCookieDictionary(this.app.constants.SESSIONCOOKIENAME, this.app.getModel().oneClickCookie) == "1" && f.length > 0) {
    this.app.getModel().environmentSub.selectedGalleryID = this.app.getModel().getLastSelectedGalleryID();
    this.app.getModel().setDestinationSelectedGalleryId(this.app.getModel().getLastSelectedGalleryID());
    this.selectedGalleryName = this.app.getModel().cacheByGalleryList[this.app.getModel().getLastSelectedGalleryID()].Name;
    setTimeout(function() {
      MyGalleriesCore.getModel().frameStudioFlag = false
    },
    250);
    if (this.framingStudioCall == "framingStudioCall") {
      this.app.getModel().setFramingStudioResponseObject(this.FSData);
      mygalleriesGA.trackEventWithCategory("Save to Gallery", "Framing Studio Add - Completed");
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_EXISTING_GALLERY, this.FSData.FileName))
    } else {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_EXISTING_GALLERY, this.app.getModel().getLastSelectedGalleryID()))
    }
  } else {
    var a = this;
    this.modalGalleryLB = new com.art.core.components.LightBox("myMoveToGalleryLB", "body", 0.7);
    this.modalGalleryLB.show();
    setTimeout(function() {
      MyGalleriesCore.getModel().frameStudioFlag = false
    },
    250);
    var m = "";
    var n = "";
    var e = a.app.getModel().selectedImageObject;
    var m = this.app.getModel().environmentSub.selectedGalleryID;
    var h = {
      id: "SaveToGallery",
      Title: a.app.getString("Save to My Gallery"),
      SelectedGalleryId: m,
      galleryList: a.app.getModel().galleryList,
      galleryItem: e
    };
    if (this.framingStudioCall != "framingStudioCall") {
      var e = a.app.getModel().selectedImageObject;
      var m = this.app.getModel().environmentSub.selectedGalleryID;
      var h = {
        id: "SaveToGallery",
        Title: a.app.getString("Save to My Gallery"),
        SelectedGalleryId: m,
        galleryList: a.app.getModel().galleryList,
        galleryItem: e
      }
    } else {
      var h = {
        id: "SaveToGallery",
        Title: a.app.getString("Save to My Gallery"),
        galleryList: a.app.getModel().galleryList,
        galleryItem: this.FSData
      }
    }
    this.modalGallery = new com.art.myGalleries.components.MyGalleriesModal(h);
    var k = $.browser.msie ? 750 : 720;
    this.myModalSaveToGallery = new com.art.core.components.BaseModal("myModalSaveToGallery", k, "#ffffff", false);
    this.myModalSaveToGallery.setContents(this.modalGallery.render());
    var l = new com.art.core.components.CheckBox("privacyChk", "privacy", a.app.getString("Make Gallery Private"), false);
    var o = "<div class='privacy'><div style='float: left;'>" + l.render() + "</div><div id='privacyTxt' class='SiteFont fontsize12'>" + l.label + "</div><div style='clear:both'></div></div>";
    $("body").append(this.myModalSaveToGallery.render(this.modalGalleryLB.getLightBoxZIndex() + 1));
    this.myModalSaveToGallery.registerEvents();
    $(".modal_header_text").html(a.app.getString("Save to My Gallery"));
    $(".modal_header_text").addClass("uCase gCustomFont");
    if (this.app.getModel().environment.accountType != this.app.constants.ANONYMOUS) {
      this.myModalSaveToGallery.setLeftButtonBarContent(o)
    }
    $(".newGalleryTextBox").after(o);
    l.registerEvents();
    l.registerCallback(com.art.core.components.CheckBox.CHECKED,
    function(p) {
      var q = p.selected ? 3 : 1;
      a.app.getModel().setAddedGalleryPrivacy(q)
    });
    this.modalGallery.registerCallback(com.art.myGalleries.components.MyGalleriesModal.LOGIN_CLICKED,
    function() {
      a.loginOption = com.art.core.components.LoginModal.LOGIN;
      a.showLoginModal()
    });
    this.modalGallery.registerCallback(com.art.myGalleries.components.MyGalleriesModal.REGISTER_CLICKED,
    function() {
      a.loginOption = com.art.core.components.LoginModal.REGISTER;
      a.showLoginModal()
    });
    var c = new com.art.core.components.ArtButton("continue", com.art.core.components.ArtButton.ART_ORANGE, a.app.getString("Save to Gallery"));
    $(".MyGalleriesModalGalleryContainer").after(c.render());
    c.registerEvents();
    c.registerCallback(com.art.core.components.BaseButton.CLICK,
    function() {
      var p = a.modalGallery.ContinueToMove();
      var q = d.getCookieDictionary(a.app.constants.SESSIONCOOKIENAME, a.app.getModel().oneClickCookie);
      if (p == "Existing") {
        a.app.getModel().environmentSub.selectedGalleryID = a.modalGallery.getDestinationSelectedGalleryId();
        a.app.getModel().setDestinationSelectedGalleryId(a.modalGallery.getDestinationSelectedGalleryId());
        a.selectedGalleryName = a.app.getModel().cacheByGalleryList[a.app.getModel().environmentSub.selectedGalleryID].Name;
        if (a.framingStudioCall == "framingStudioCall") {
          a.app.getModel().setFramingStudioResponseObject(a.FSData);
          mygalleriesGA.trackEventWithCategory("Save to Gallery", "Framing Studio Add - Completed");
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY, a.FSData.FileName))
        } else {
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY))
        }
      } else {
        if (p) {
          var r = a.modalGallery.getAddTitleData();
          a.app.getModel().setAddedGalleryTitle(r.title);
          a.selectedGalleryName = r.title;
          var s = a.app.getString("Found invalid characters in in title:");
          var t = com.art.core.utils.StringUtil.findInvalidChars(a.selectedGalleryName, "-@#$%^&*()_+<>!~,.?/[]{}|=", "<p>" + s + " {~listOfInvalidChars~}</p>");
          if (t != "") {
            $(".commonErrorMsg").text(a.app.getString("Found invalid characters in title"));
            $(".commonErrorMsg").show();
            return
          }
          if (a.framingStudioCall == "framingStudioCall") {
            a.app.getModel().setFramingStudioResponseObject(a.FSData);
            a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_NEW_GALLERY, a.FSData.FileName))
          } else {
            a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_NEW_GALLERY))
          }
        }
      }
    });
    this.myModalSaveToGallery.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
    function() {
      $("#loginSavetogallery").die("click");
      $("#loginSavetogallery").unbind("click");
      $("#registerSavetogallery").die("click");
      $("#registerSavetogallery").unbind("click");
      a.app.getModel().galleryList = "";
      a.modalGalleryLB.close()
    });
    this.modalGallery.registerEvents()
  }
};
com.art.myGalleries.modules.ExternalModule.prototype.setCookieForDropDown = function(c) {
  if (c != "") {
    var a = new com.art.core.cookie.Cookie();
    a.setCookieDictionary("arts", "SaveToGallery", c, "/", a.getCookieDomain("art"))
  }
};
com.art.myGalleries.modules.ExternalModule.prototype.showLoginModal = function() {
  var a = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
    loginOption: this.loginOption
  },
  {
    modulename: this.NAME
  });
  MyGalleriesCore.sendNotification(a)
};
com.art.myGalleries.modules.ExternalModule.prototype.loginModalClose = function() {
  var a = this;
  $("#myModalLogin").die();
  $("#myModalLogin").unbind("click");
  $("#myModalLogin").remove();
  if (this.loginLink) {
    this.loginLink.doClose()
  }
  if (this.modalSignUpLB) {
    this.modalSignUpLB.close()
  }
  $("#mygallerylogin").unbind("click");
  $("#mygallerylogin").die("click");
  $("#mygallerylogin").remove();
  $("#mygalleryregister").unbind("click");
  $("#mygalleryregister").die("click");
  $("#mygalleryregister").remove();
  $("#" + this.id).die();
  $("#" + this.id).unbind("click");
  $("#" + this.id).remove()
};
com.art.myGalleries.modules.ExternalModule.prototype.OpenWishListModal = function() {
  var a = this;
  var c = new com.art.core.components.LightBox("myAccountWishListLB", "body", 0.7);
  c.show();
  this.wishList = new com.art.myGalleries.components.CommonComponent("wishlistMyAccount", a.app.getString("Wish lists are now My Galleries"), 500, 200);
  this.modalWishList = new com.art.core.components.BaseModal("myModalWishlist", 480, "#f7f7ed", true);
  this.modalWishList.setContents(this.wishList.render());
  $("body").append(this.modalWishList.render(c.getLightBoxZIndex() + 1));
  this.modalWishList.registerEvents();
  this.modalWishList.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
  function() {
    c.close()
  });
  this.modalWishList.registerButton("closeBtn", com.art.core.components.ArtButton.ART_ORANGE, a.app.getString("Close"),
  function() {
    a.modalWishList.close();
    c.close()
  });
  this.wishList.registerEvents()
};
com.art.myGalleries.modules.ExternalModule.prototype.setMenuModalInit = function() {
  var a = this;
  var f = this.app.getModel().environmentSub.selectedGalleryID;
  var e = {
    id: "SaveMenuContainer",
    SelectedGalleryId: f,
    galleryList: a.app.getModel().galleryList
  };
  this.modalSaveMenuContainer = new com.art.myGalleries.components.SaveMenuContainer(e);
  $("body").append(this.modalSaveMenuContainer.render());
  this.modalSaveMenuContainer.position();
  if (this.app.getModel().galleryList.length > 0) {
    this.modalSaveMenuContainer.renderGalleriesList();
    $(".allMyGalleriesSaveMenuMarginTop").show();
    $(".allMyGalleriesContainer").show();
    if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
      $(".allMyGalleriesSaveMenuLine").show()
    }
  }
  var c = new com.art.core.cookie.Cookie();
  if (c.getCookieDictionary("ap", "accounttype") != this.app.constants.ANONYMOUS) {
    $(".loginSaveGalleryMenuText").hide();
    $(".loginSaveMenuGap").hide()
  }
  $(".lastSavedGalleryMenu").hide();
  $(".lastSavedMenuLine").hide();
  $(".lastSaveMenuGap").hide();
  var d = "";
  if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
    d = MyGalleriesCore.getModel().getLastSelectedGalleryName();
    d = com.art.core.utils.StringUtil.autoEllipseText(d, 15);
    $(".lastSavedGalleryMenu").html(d);
    $(".lastSaveMenuGap").show();
    $(".lastSavedGalleryMenu").show();
    $(".lastSavedMenuLine").show();
    $(".lastSavedGalleryMenu").addClass("saveMenuHover")
  }
  this.modalSaveMenuContainer.registerEvents();
  setTimeout(function() {
    MyGalleriesCore.getModel().frameStudioFlag = false
  },
  250);
  this.modalSaveMenuContainer.registerCallback(com.art.myGalleries.components.SaveMenuContainer.RECENTLYSAVEDGALLERY_CLICKED,
  function() {
    a.app.getModel().environmentSub.selectedGalleryID = a.app.getModel().getLastSelectedGalleryID();
    if (a.framingStudioCall == "framingStudioCall") {
      a.app.getModel().setFramingStudioResponseObject(a.FSData);
      mygalleriesGA.trackEventWithCategory("Save to Gallery", "Framing Studio Add - Completed");
      a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY, a.FSData.FileName))
    } else {
      if (a.app.getModel().savetogalleryoption) {
        a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY, a.app.getModel().environmentSub.selectedGalleryID))
      } else {
        a.app.getModel().setDestinationSelectedGalleryId(a.app.getModel().environmentSub.selectedGalleryID);
        a.app.sendNotification(new com.art.core.utils.Note(a.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY))
      }
    }
  });
  this.modalSaveMenuContainer.registerCallback(com.art.myGalleries.components.SaveMenuContainer.GALLERIES_CLICKED,
  function() {
    a.app.getModel().environmentSub.selectedGalleryID = a.modalSaveMenuContainer.GetGalleryID();
    if (a.framingStudioCall == "framingStudioCall") {
      a.app.getModel().setFramingStudioResponseObject(a.FSData);
      mygalleriesGA.trackEventWithCategory("Save to Gallery", "Framing Studio Add - Completed");
      a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY, a.FSData.FileName))
    } else {
      if (a.app.getModel().savetogalleryoption) {
        a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_EXISTING_GALLERY, a.app.getModel().environmentSub.selectedGalleryID))
      } else {
        a.app.getModel().setDestinationSelectedGalleryId(a.app.getModel().environmentSub.selectedGalleryID);
        a.app.sendNotification(new com.art.core.utils.Note(a.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY))
      }
    }
  });
  this.modalSaveMenuContainer.registerCallback(com.art.myGalleries.components.SaveMenuContainer.NEW_GALLERY_CLICKED,
  function() {
    if ($("#myModalAddNewGallery").length > 0) {
      $("#myModalAddNewGallery").die();
      $("#myModalAddNewGallery").unbind("click");
      $("#myModalAddNewGallery").remove()
    }
    a.newGalleryOptionLB = new com.art.core.components.LightBox("newGalleryOptionLB", "body", 0.7);
    a.newGalleryOptionLB.show();
    var h = new com.art.myGalleries.components.CommonComponent("addNewGallery", "", 340, 196, "", MyGalleriesCore.getModel().saveDefaultGalleryTitle);
    a.modalAddNewGallery = new com.art.core.components.BaseModal("myModalAddNewGallery", 340, "#ffffff", true);
    a.modalAddNewGallery.setContents(h.render());
    $("body").append(a.modalAddNewGallery.render(a.newGalleryOptionLB.getLightBoxZIndex() + 1));
    a.modalAddNewGallery.registerEvents();
    $(".modal_header_text").html(a.app.getString("New Gallery"));
    $(".modal_header_text").addClass("uCase gCustomFont");
    a.modalAddNewGallery.registerButton("savetomygallery", com.art.core.components.ArtButton.ART_ORANGE, a.app.getModel().getButtonTextForNewGallery(),
    function() {
      if (h.validateTitle()) {
        var k = $("#addNewGallery_txtTitle").val();
        var l = a.app.getString("Found invalid characters in in title: ");
        var m = com.art.core.utils.StringUtil.findInvalidChars(k, "-@#$%^&*()_+<>!~,.?/[]{}|=", "<p>" + l + " {~listOfInvalidChars~}</p>");
        if (m != "") {
          $("#showErrorMsg").text("");
          $(".newGalleryErrorMsg").text(a.app.getString("Found invalid characters in title"));
          $(".newGalleryErrorMsg").css("visibility", "visible");
          return
        }
        a.app.getModel().setAddedGalleryTitle(k);
        if (a.app.getModel().savetogalleryoption) {
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_NEW_GALLERY))
        } else {
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY))
        }
      }
    });
    a.modalAddNewGallery.registerCallback(com.art.core.components.BaseModal.CLOSE_CLICKED,
    function() {
      $("#myModalAddNewGallery").die();
      $("#myModalAddNewGallery").unbind("click");
      $("#myModalAddNewGallery").remove();
      if (a.modalAddNewGallery) {
        a.modalAddNewGallery.close()
      }
      if (a.newGalleryOptionLB) {
        a.newGalleryOptionLB.close()
      }
    });
    h.registerCallback(com.art.myGalleries.components.CommonComponent.NEW_GALLERY_SUBMIT,
    function() {
      if (h.validateTitle()) {
        var k = $("#addNewGallery_txtTitle").val();
        var l = a.app.getString("Found invalid characters in in title: ");
        var m = com.art.core.utils.StringUtil.findInvalidChars(k, "-@#$%^&*()_+<>!~,.?/[]{}|=", "<p>" + l + " {~listOfInvalidChars~}</p>");
        if (m != "") {
          $(".newGalleryErrorMsg").text(a.app.getString("Found invalid characters in title"));
          $(".newGalleryErrorMsg").css("visibility", "visible");
          return
        }
        a.app.getModel().setAddedGalleryTitle(k);
        if (a.app.getModel().savetogalleryoption) {
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.ADD_ITEM_TO_NEW_GALLERY))
        } else {
          a.app.sendNotification(new com.art.core.utils.Note(a.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY))
        }
      }
    });
    h.registerEvents()
  })
};
com.art.myGalleries.modules.ExternalModule.prototype.destroy = function() {};
com.art.myGalleries.modules.ExternalModule.prototype.notify = function() {
  this.app.sendNotification(note)
};
com.art.myGalleries.modules.ExternalModule.prototype.listNotificationInterests = function() {
  return [this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_EXT, this.app.events.ADD_ITEM_TO_EXISTING_OR_NEW_GALLERY_SAVEMENU, this.app.events.GET_ALL_GALLERIES_SUCCESS, this.app.events.GET_ALL_GALLERIES_FAILED, this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS, this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_FAILED, this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS, this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED, this.app.events.REGISTER_ACCOUNT_SUCCESS, this.app.events.REGISTER_ACCOUNT_FAILED, this.app.events.LOGIN_ACCOUNT_SUCCESS, this.app.events.LOGIN_ACCOUNT_FAILED, this.app.events.GET_FRAME_SKU_SUCCESS, this.app.events.GET_FRAME_SKU_FAILED, this.app.events.MYACCOUNT_WISHLIST, this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS, this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED, this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS, this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_FAILED, this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS, this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FAILED, this.app.events.GET_ALL_GALLERY_ITEMS_SUCCESS, this.app.events.DELETE_GALLERY_ITEM_SUCCESS, this.app.events.DELETE_GALLERY_ITEM_FAILED, this.app.events.UPDATE_GALLERY_ITEM]
};
com.art.myGalleries.modules.ExternalModule.prototype.handleNotification = function(o) {
  switch (o.name) {
  case this.app.events.GET_FRAME_SKU_SUCCESS:
    this.FSData = o.body;
    this.framingStudioCall = "framingStudioCall";
    if (this.app.getModel().galleryList.length == 0) {
      this.getUserGalleries()
    } else {
      if (this.app.getModel().saveMenuBoolean == true) {
        this.setMenuModalInit()
      }
      if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "y") {
        MyGalleriesCore.getModel().setGalleryKey(this.app.getModel().getMyGalObjectVal().gid);
        if (MyGalleriesCore.getModel().galleryItemList.length == 0) {
          MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_GALLERY_ITEMS, {
            module: ""
          }))
        }
      } else {
        if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "rv") {}
      }
    }
    break;
  case this.app.events.GET_FRAME_SKU_FAILED:
    break;
  case this.app.events.MYACCOUNT_WISHLIST:
    this.OpenWishListModal();
    if ($.browser.msie) {
      $("#baseModalButtonBarRight_myModalWishlist").css("width", "35%");
      $("#closeBtn").css("height", "32px");
      $("#closeBtn").css("left", "120px");
      $("#closeBtn_label").css("height", "32px");
      $("#closeBtn_rightcap").css("height", "32px")
    }
    break;
  case this.app.events.UPDATE_GALLERY_ITEM:
    this.updateGalleryItem();
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_OR_NEW_GALLERY_SAVEMENU:
    if (this.app.getModel().galleryList.length == 0) {
      this.getUserGalleries()
    } else {
      if (MyGalleriesCore.getModel().galleryItemList.length == 0) {
        MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_GALLERY_ITEMS, {
          module: ""
        }))
      }
      this.setMenuModalInit()
    }
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_EXT:
    if (this.app.getModel().galleryList.length == 0) {
      this.getUserGalleries()
    }
    break;
  case this.app.events.GET_ALL_GALLERIES_SUCCESS:
    if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "y") {
      MyGalleriesCore.getModel().setGalleryKey(this.app.getModel().getMyGalObjectVal().gid);
      if (MyGalleriesCore.getModel().galleryItemList.length == 0) {
        MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_GALLERY_ITEMS, {
          module: ""
        }))
      }
    } else {
      if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "rv") {}
    }
    if (this.app.getModel().saveMenuBoolean == true) {
      this.setMenuModalInit()
    }
    break;
  case this.app.events.GET_ALL_GALLERIES_FAILED:
    if (this.app.getModel().saveMenuBoolean == true) {
      this.setMenuModalInit()
    }
    if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "y") {
      MyGalleriesCore.getModel().setGalleryKey(this.app.getModel().getMyGalObjectVal().gid);
      if (MyGalleriesCore.getModel().galleryItemList.length == 0) {
        MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_GALLERY_ITEMS, {
          module: ""
        }))
      }
    } else {
      if (com.art.core.utils.BrowserUtil.getQueryString("mg") == "rv") {}
    }
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS:
    this.newCreatedGalleryId = o.body.GalleryName;
    this.app.getModel().setLastSelectedGalleryID(o.body.GalleryID);
    this.app.getModel().setLastSelectedGalleryName(o.body.Library.Galleries[0].Name);
    this.app.getModel().galleryList = "";
    this.myModalSaveToGallery.close();
    $("#loginSavetogallery").die("click");
    $("#loginSavetogallery").unbind("click");
    $("#registerSavetogallery").die("click");
    $("#registerSavetogallery").unbind("click");
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_FAILED:
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS:
    if (o.body.OperationResponse.OperationStatus != 0) {
      if (this.app.getModel().saveMenuBoolean == true) {
        var d = o.body.OperationResponse.ResponseMessage;
        $(".newGalleryErrorMsg").text(d);
        $(".newGalleryErrorMsg").css("visibility", "visible")
      } else {
        if (o.body.OperationResponse.ResponseCode == 503) {
          $(".commonErrorMsg").css("width", "450px");
          $(".commonErrorMsg").css("top", "165px");
          $(".commonErrorMsg").text(this.app.getString("You have an existing gallery with this name. Please enter a new name or select your existing gallery from the dropdown menu."));
          $(".commonErrorMsg").show()
        } else {
          var d = o.body.OperationResponse.ResponseMessage;
          $(".commonErrorMsg").text(d);
          $(".commonErrorMsg").show()
        }
      }
    } else {
      this.newCreatedGalleryId = o.body.GalleryName;
      var f = o.body.Library.Galleries[0].Name;
      this.app.getModel().setLastSelectedGalleryID(o.body.GalleryID);
      this.app.getModel().setLastSelectedGalleryName(f);
      this.app.getModel().galleryList = "";
      if (this.myModalSaveToGallery) {
        this.myModalSaveToGallery.close()
      }
      if (this.modalGalleryLB) {
        this.modalGalleryLB.close()
      }
      $("#loginSavetogallery").die("click");
      $("#loginSavetogallery").unbind("click");
      $("#registerSavetogallery").die("click");
      $("#registerSavetogallery").unbind("click");
      if (this.app.getModel().saveMenuBoolean == true) {
        $("#myModalAddNewGallery").die();
        $("#myModalAddNewGallery").unbind("click");
        $("#myModalAddNewGallery").remove();
        if (this.newGalleryOptionLB) {
          this.newGalleryOptionLB.close()
        }
        if ($("#SaveMenuContainer").length > 0) {
          $("#SaveMenuContainer").die();
          $("#SaveMenuContainer").unbind("click");
          $("#SaveMenuContainer").remove()
        }
      }
      if (this.updateGalleryItemFlag) {
        $(".mygalmoveoptions").show();
        $(".mygalsaveoptions").hide();
        $(".mygalupdatesize").hide();
        this.updateGalleryItemFlag = false;
        var n = this.app.getModel().getMyGalObjectVal();
        n.itemid = o.body.Library.Galleries[0].Items[0].ItemGalleryItemID;
        this.app.getModel().setMyGalObjectVal(n);
        this.app.getModel().setSelectedGridItem(this.app.getModel().getMyGalObjectVal().itemid);
        MyGalleriesCore.getModel().galleryItemList = "";
        if (!this.app.getModel().savetogalleryoption) {
          MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_GALLERY_ITEMS, {
            module: ""
          }))
        }
      }
    }
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED:
    var d = o.body.OperationResponse.ResponseMessage;
    $(".commonErrorMsg").text(d);
    $(".commonErrorMsg").show();
    break;
  case this.app.events.REGISTER_ACCOUNT_SUCCESS:
    this.loginModalClose();
    if (this.modalGalleryLB) {
      this.modalGalleryLB.close()
    }
    if (this.myModalSaveToGallery) {
      this.myModalSaveToGallery.close();
      $("#" + this.myModalSaveToGallery.id).remove()
    }
    try {
      if (MyGalleriesCore.getModule("LoginInvokeComponent").doNotRefreshOnLogin) {
        dle_handleLoginSuccess();
        return
      }
    } catch(a) {}
    location.reload(true);
    break;
  case this.app.events.REGISTER_ACCOUNT_FAILED:
    $(".loginModalErrorMsg").css("display", "block");
    if (o.body == "exist") {
      if ($.browser.msie && parseInt($.browser.version) == 7) {
        if (this.id != "myGalleryLogin") {
          $(".loginErrorMsg").css("top", "60px")
        }
      }
      $(".loginErrorMsg").text(this.app.getString("The email address you entered is already associated with an Art.com account."))
    } else {
      if (o.body == "invalidemail") {
        $(".loginErrorMsg").text(this.app.getString("Please enter a valid email address."))
      } else {
        if (o.body == "invalidpassword") {
          $(".loginErrorMsg").text(this.app.getString("Password must be at least 8 characters."))
        } else {
          if (o.body == "failure") {
            if ($.browser.msie) {
              if (this.id != "myGalleryLogin") {
                $(".loginErrorMsg").css("top", "40px")
              } else {
                $(".loginErrorMsg").css("top", "70px")
              }
            }
            $(".loginErrorMsg").text(this.app.getString("We were unable to find an account associated with that email address."))
          }
        }
      }
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_SUCCESS:
    if (o.type.modulename == this.NAME) {
      this.myModalSaveToGallery.close();
      $("#" + this.myModalSaveToGallery.id).remove();
      var l = location.href;
      var p = l.indexOf("#");
      if (p > -1) {
        l = l.substring(0, p)
      }
      window.location.href = l.indexOf("?") > -1 ? l + "&myLoginProduct=true": l + "?myLoginProduct=true"
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_FAILED:
    if (o.body == "failure") {
      $(".loginModalErrorMsg").css("display", "block");
      if ($.browser.msie) {
        if (this.id != "myGalleryLogin") {
          $(".loginErrorMsg").css("top", "40px")
        } else {
          $(".loginErrorMsg").css("top", "70px")
        }
      }
      $(".loginErrorMsg").text(this.app.getString("We were unable to find an account associated with that email address."))
    }
    break;
  case this.app.events.GET_FRAME_SKU_FAILED:
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS:
    if (o.type.modulename == this.NAME) {
      if (this.myModalSaveToGallery) {
        this.myModalSaveToGallery.close();
        $("#" + this.myModalSaveToGallery.id).remove()
      }
      window.location.href = window.location.href.indexOf("?") > -1 ? window.location.href + "&myLoginProduct=true": window.location.href + "?myLoginProduct=true"
    }
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED:
    break;
  case this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS:
  case this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS:
    MyGalleriesCore.getModel().savetogalleryoption = true;
    this.app.getModel().resetLastSelectedGalleryName(o.body.Library.Galleries[0].Name);
    this.app.getModel().setLastSelectedGalleryID(o.body.GalleryID);
    this.app.getModel().setLastSelectedGalleryName(o.body.Library.Galleries[0].Name);
    this.app.getModel().galleryList = "";
    $(".mygalmoveoptions").hide();
    $(".mygalsaveoptions").show();
    if (this.modalAddNewGallery) {
      $("#myModalAddNewGallery").die();
      $("#myModalAddNewGallery").unbind("click");
      $("#myModalAddNewGallery").remove();
      this.modalAddNewGallery.close();
      if (this.newGalleryOptionLB) {
        this.newGalleryOptionLB.close()
      }
    }
    break;
  case this.app.events.DELETE_GALLERY_ITEM_SUCCESS:
    if (this.updateGalleryItemFlag) {
      this.updateGalleryItemToGallery()
    } else {
      var m = o.body.Library;
      if (m != null) {
        if (this.modalDeleteArt) {
          this.modalDeleteArt.close()
        }
        MyGalleriesCore.getModel().savetogalleryoption = true;
        this.app.getModel().resetLastSelectedGalleryName(o.body.Library.Galleries[0].Name);
        this.app.getModel().setLastSelectedGalleryID(o.body.Library.Galleries[0].GalleryId);
        this.app.getModel().setLastSelectedGalleryName(o.body.Library.Galleries[0].Name);
        $(".mygalmoveoptions").hide();
        $(".mygalsaveoptions").show();
        if (this.deleteArtLB) {
          this.deleteArtLB.close()
        }
      } else {
        if (o.body.OperationResponse.ResponseCode == 607) {
          $(".modal_header_text").html("UNABLE TO REMOVE ITEM");
          var k = this.app.getModel().getGalleryByGalleryId(this.app.getModel().environmentSub.selectedGalleryID);
          var f = unescape(k.GalleryData.Name);
          var q = this.app.getString("This gallery item is being used by a room you created.");
          $("#deleteArtComponent_Title").html(q);
          var c = o.body.OperationResponse.ResponseMessage;
          $("#deleteArtComponent_Content").html("");
          $("#delete").hide();
          $("#dontDelete").attr("value", "OK");
          $("#dontDelete").css("width", "132px")
        }
      }
    }
    break;
  case this.app.events.DELETE_GALLERY_ITEM_FAILED:
    break;
  default:
  }
};
com.art.myGalleries.modules.ExternalModule.prototype.setBtnStyle = function() {
  $(".MyGalleriesRightContainer").css("visibility", "hidden");
  $("#SavetoGalleryConfirm").css("visibility", "visible");
  $("#SavetoGalleryConfirm").css("position", "absolute");
  $("#SavetoGalleryConfirm").css("margin-top", "10px");
  $("#SavetoGalleryConfirm").css("margin-left", "235px;");
  $("#SavetoGalleryConfirm").css("margin-bottom", "20px;");
  $("#galleryName").text('"' + this.selectedGalleryName + '"');
  $("#continue").css("visibility", "hidden");
  $("#privacyChk").css("visibility", "hidden");
  $("#privacyTxt").css("visibility", "hidden");
  $("#doneBtn").css("visibility", "visible");
  $("#doneBtn").css("position", "absolute");
  $("#doneBtn").css("right", "25px");
  $("#doneBtn").css("bottom", "25px");
  if ($.browser.msie) {
    $("#doneBtn").css("width", "65px");
    $("#doneBtn_label").css("height", "32px");
    $("#doneBtn_rightcap").css("height", "32px")
  }
  $("#visitGallery").css("visibility", "visible");
  $("#visitGallery").css("position", "absolute");
  $("#visitGallery").css("right", "90px");
  $("#visitGallery").css("bottom", "25px");
  if ($.browser.msie) {
    $("#visitGallery").css("width", "105px");
    $("#visitGallery_label").css("height", "32px");
    $("#visitGallery_rightcap").css("height", "32px")
  }
};
com.art.myGalleries.modules.ExternalModule.prototype.getTemplate = function() {
  var a = this.template;
  a = a.replace(/\[IMAGE_DOMAIN\]/gi, this.imagePath);
  a = a.replace(/\[$MYGALLERY\]/gi, this.imagePath);
  return a.replace("$NAME", this.NAME)
};
com.art.myGalleries.modules.ExternalModule.prototype.getTarget = function() {
  return this.moduleData.target
};
com.art.myGalleries.modules.ExternalModule.prototype.template = "";
com.art.myGalleries.modules.TrayModule = function(c, a) {
  this.app = a;
  this.moduleData = c;
  this.NAME = com.art.myGalleries.modules.TrayModule.NAME;
  this.menuContainerComponent = new com.art.myGalleries.components.MenuContainerComponent(this.app.getModel().environment.imagePath);
  this.COOKIE_NAME = "arts";
  this.COOKIE_KEY = "oneClick";
  this.menuContainerComp;
  this.loginLB;
  this.loginOption = "";
  this.modalSignUpLB;
  this.modalGallery;
  this.selectedGalleryName = "";
  this.framingStudioCall;
  this.FSData = {};
  this.loginOption = "";
  this.wishList;
  this.modalWishList
};
com.art.myGalleries.modules.TrayModule.NAME = "TrayModule";
com.art.myGalleries.modules.TrayModule.prototype.init = function(c) {
  var a = this;
  if ($("#TrayModule").length == 0) {
    $(this.getTarget()).append(this.getTemplate());
    $(".MyGalleriesTrayModuleTabContainer").append(a.menuContainerComponent.render())
  }
  $(".MyGalleriesTrayModuleTabContainer").live("click",
  function() {
    if ($(".tray_container").css("display") != "block") {
      $(".tray_container").slideDown("slow",
      function() {
        $(".tray_container").css("overflow", "visible")
      });
      $(".TraygalleryBadge").hide();
      a.showLastSelectedGalleryName()
    }
    $(".MyGalleriesTrayModuleTabArrow").addClass("hidden")
  });
  $(".MyGalleriesTrayModuleTabContainer").live("mouseenter",
  function() {
    if ($(".tray_container").css("display") != "block") {
      $(".galleryBadge").hide();
      $(".TraygalleryBadge").hide();
      $(".tray_container").slideDown("slow",
      function() {
        $(".tray_container").css("overflow", "visible");
        if (a.app.getModel().getGalleryIDCountCookie(MyGalleriesCore.getModel().getLastSelectedGalleryKey()) != 0) {
          $(".galleryBadge").show()
        }
      });
      $(".MyGalleriesTrayModuleTabArrow").addClass("hidden");
      a.showLastSelectedGalleryName()
    }
  });
  $(".MyGalleriesTrayModuleTabContainer").live("mouseleave",
  function() {
    if ($(".tray_container").css("display") == "block") {
      $(".galleryBadge").hide();
      $(".tray_container").slideUp("slow");
      setTimeout(function() {
        $(".MyGalleriesTrayModuleTabArrow").removeClass("hidden");
        $(".tray_container").stop(true, true).hide()
      },
      300);
      if (a.app.getModel().getGalleryIDCountCookie(MyGalleriesCore.getModel().getLastSelectedGalleryKey()) != 0) {
        $(".TraygalleryBadge").show()
      } else {
        $(".TraygalleryBadge").hide()
      }
    }
  });
  $(".tray_container").live("mouseleave",
  function() {
    $(".galleryBadge").hide();
    $(".MyGalleriesTrayModuleTabArrow").addClass("hidden");
    $(this).slideUp("slow",
    function() {
      if (a.app.getModel().getGalleryIDCountCookie(MyGalleriesCore.getModel().getLastSelectedGalleryKey()) != 0) {
        $(".TraygalleryBadge").show()
      }
    });
    setTimeout(function() {
      $(".MyGalleriesTrayModuleTabArrow").removeClass("hidden");
      $(".tray_container").stop(true, true).hide()
    },
    300)
  });
  $(".MyGalleriesTrayModuleTabClose").live("click",
  function() {
    $(".galleryBadge").hide();
    $(".tray_container").slideUp("slow");
    setTimeout(function() {
      $(".tray_container").stop(true, true).hide()
    },
    300);
    if (a.app.getModel().getGalleryIDCountCookie(MyGalleriesCore.getModel().getLastSelectedGalleryKey()) != 0) {
      $(".TraygalleryBadge").show()
    } else {
      $(".TraygalleryBadge").hide()
    }
  });
  $(".viewGalleryButton").live("click",
  function() {
    window.location.href = "http://" + window.location.hostname + a.app.getModel().environment.profileURL + "gallery/"
  });
  $("#lastGalleryName").live("click",
  function() {
    var d = MyGalleriesCore.getModel().getLastSelectedGalleryKey();
    window.location.href = "http://" + window.location.hostname + a.app.getModel().environment.profileURL + "gallery/" + d + "/?vt=gv&mtm=0"
  });
  this.toggleGalleryBadge();
  if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "") {
    $(".tray_subSection").show()
  } else {
    $(".tray_subSection").hide()
  }
  this.menuContainerComp = new com.art.myGalleries.components.MenuContainerComponent("menuContainerComponent");
  this.menuContainerComp.registerEvents();
  this.menuContainerComp.registerCallback(com.art.myGalleries.components.MenuContainerComponent.LOGIN_CLICK,
  function() {
    a.loginOption = com.art.core.components.LoginModal.LOGIN;
    a.app.getModel().loginSource = a.app.constants.LOGINTRAY;
    a.app.getModel().registerSource = a.app.constants.LOGINTRAY;
    a.showLoginModal()
  });
  this.menuContainerComp.registerCallback(com.art.myGalleries.components.MenuContainerComponent.REGISTER_CLICK,
  function() {
    a.loginOption = com.art.core.components.LoginModal.REGISTER;
    a.app.getModel().loginSource = a.app.constants.LOGINTRAY;
    a.app.getModel().registerSource = a.app.constants.LOGINTRAY;
    a.showLoginModal()
  });
  $(".viewGalleryButton").mouseover(function() {
    $(".viewGalleryButton").addClass("mg-viewGalleryButtonHover")
  });
  $(".viewGalleryButton").mouseout(function() {
    $(".viewGalleryButton").removeClass("mg-viewGalleryButtonHover")
  })
};
com.art.myGalleries.modules.TrayModule.prototype.showLoginModal = function() {
  var a = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
    loginOption: this.loginOption
  },
  {
    modulename: this.NAME
  });
  MyGalleriesCore.sendNotification(a)
};
com.art.myGalleries.modules.TrayModule.prototype.destroy = function() {};
com.art.myGalleries.modules.TrayModule.prototype.showLastSelectedGalleryName = function() {
  var a = "";
  if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
    a = MyGalleriesCore.getModel().getLastSelectedGalleryName();
    a = com.art.core.utils.StringUtil.autoEllipseText(a, 15);
    $("#lastGalleryName").html(a)
  }
};
com.art.myGalleries.modules.TrayModule.prototype.getGalleryIdCount = function(a) {
  var c = MyGalleriesCore.getModel().getGalleryIDCountCookie(a);
  return c
};
com.art.myGalleries.modules.TrayModule.prototype.notify = function() {
  this.app.sendNotification(note)
};
com.art.myGalleries.modules.TrayModule.prototype.listNotificationInterests = function() {
  return [this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS, this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED, this.app.events.LOGIN_ACCOUNT_TRAY_SUCCESS, this.app.events.LOGIN_ACCOUNT_TRAY_FAILED, this.app.events.REGISTER_ACCOUNT_TRAY_SUCCESS, this.app.events.REGISTER_ACCOUNT_TRAY_FAILED, this.app.events.GET_FRAME_SKU_SUCCESS, this.app.events.GET_FRAME_SKU_FAILED, this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS, this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED, this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS, this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_FAILED, this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS, this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FAILED]
};
com.art.myGalleries.modules.TrayModule.prototype.handleNotification = function(e) {
  switch (e.name) {
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS:
  case this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS:
  case this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS:
    if (e.body.OperationResponse.OperationStatus != 0) {
      if (e.body.OperationResponse.ResponseCode == 503) {
        return
      }
    }
    this.app.getModel().setCookieGalleryIDCountCookie(e.body.Library.Galleries[0].ItemKey);
    this.app.getModel().setLastSelectedGalleryKey(e.body.Library.Galleries[0].ItemKey);
    var d = this.getGalleryIdCount(e.body.Library.Galleries[0].ItemKey);
    this.setGalleryCount(d);
    this.updateCountWithAjaxSuccess();
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED:
  case this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_FAILED:
  case this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FAILED:
    break;
  case this.app.events.REGISTER_ACCOUNT_TRAY_SUCCESS:
    _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
    _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
    var a = this.login.getLoginAccountData();
    this.app.getModel().setLoginUserNameCookie(a.username);
    location.reload(true);
    break;
  case this.app.events.REGISTER_ACCOUNT_TRAY_FAILED:
    $(".loginModalErrorMsg").css("display", "block");
    if (e.body == "exist") {
      if ($.browser.msie && parseInt($.browser.version) == 7) {
        if (this.id != "myGalleryLogin") {
          $(".loginErrorMsg").css("top", "60px")
        }
      }
      $(".loginErrorMsg").text(this.app.getString("The email address you entered is already associated with an Art.com account."))
    } else {
      if (e.body == "invalidemail") {
        $(".loginErrorMsg").text(this.app.getString("Please enter a valid email address."))
      } else {
        if (e.body == "invalidpassword") {
          $(".loginErrorMsg").text(this.app.getString("Password must be at least 8 characters."))
        } else {
          if (e.body == "failure") {
            if ($.browser.msie) {
              if (this.id != "myGalleryLogin") {
                $(".loginErrorMsg").css("top", "40px")
              } else {
                $(".loginErrorMsg").css("top", "70px")
              }
            }
            $(".loginErrorMsg").text(this.app.getString("We were unable to find an account associated with that email address."))
          }
        }
      }
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_TRAY_SUCCESS:
    if (e.type.modulename == this.NAME) {
      _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
      _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
      var c = location.href;
      c = c.substring(0, c.indexOf("#"));
      updateHeaderSignIn("LOGIN_SUCCESS", a);
      window.location.href = window.location.href.indexOf("?") > -1 ? window.location.href + "&myLoginProduct=true": c + "?myLoginProduct=true"
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_TRAY_FAILED:
    if (e.body == "failure") {
      $(".loginModalErrorMsg").css("display", "block");
      if ($.browser.msie) {
        if (this.id != "myGalleryLogin") {
          $(".loginErrorMsg").css("top", "40px")
        } else {
          $(".loginErrorMsg").css("top", "70px")
        }
      }
      $(".loginErrorMsg").text(this.app.getString("We were unable to find an account associated with that email address."))
    }
    break;
  case this.app.events.GET_FRAME_SKU_FAILED:
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS:
    if (e.type.modulename == this.NAME) {
      _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
      _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
      this.loginModalClose();
      updateHeaderSignIn("LOGIN_FACEBOOK_SUCCESS", a);
      window.location.href = window.location.href.indexOf("?") > -1 ? window.location.href + "&myLoginProduct=true": window.location.href + "?myLoginProduct=true"
    }
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED:
    break;
  default:
  }
};
com.art.myGalleries.modules.TrayModule.prototype.toggleGalleryBadge = function() {
  var a = this.getGalleryIdCount(MyGalleriesCore.getModel().getLastSelectedGalleryKey());
  if (a == 0) {
    if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" || MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
      this.showSubTrayHtml()
    } else {
      this.hideSubTrayHtml()
    }
  } else {
    this.setGalleryCount(a);
    this.showSubTrayHtml()
  }
};
com.art.myGalleries.modules.TrayModule.prototype.setGalleryCount = function(a) {
  $(".galleryBadge").text(a);
  $(".TraygalleryBadge").text(a);
  var c = "(" + a + ")" + this.app.getString(" items successfully added to:");
  var d = "(" + a + ")" + this.app.getString(" item successfully added to:");
  if (a == 1) {
    $(".labelTrayCount").text(d)
  } else {
    $(".labelTrayCount").text(c)
  }
};
com.art.myGalleries.modules.TrayModule.prototype.updateCountWithAjaxSuccess = function() {
  var a = this.getGalleryIdCount(MyGalleriesCore.getModel().getLastSelectedGalleryKey());
  this.setGalleryCount(a);
  this.showSubTrayHtml();
  this.showContainerHtml()
};
com.art.myGalleries.modules.TrayModule.prototype.showSubTrayHtml = function() {
  var a = this.getGalleryIdCount(MyGalleriesCore.getModel().getLastSelectedGalleryKey());
  if (a != 0) {
    $(".galleryBadge").show();
    $(".TraygalleryBadge").show()
  } else {
    $(".galleryBadge").hide();
    $(".TraygalleryBadge").hide()
  }
  if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && a != 0) {
    $(".tray_subSection").show()
  } else {
    $(".tray_subSection").hide()
  }
};
com.art.myGalleries.modules.TrayModule.prototype.showContainerHtml = function() {
  var a = this.getGalleryIdCount(MyGalleriesCore.getModel().getLastSelectedGalleryKey());
  this.showLastSelectedGalleryName();
  if ($(".tray_container").css("display") != "block") {
    $(".galleryBadge").hide();
    $(".TraygalleryBadge").hide();
    $(".tray_container").slideDown("slow",
    function() {
      $(".tray_container").css("overflow", "visible");
      if (a != 0) {
        $(".galleryBadge").show()
      }
    });
    this.showLastSelectedGalleryName()
  }
  setTimeout(function() {
    $(".galleryBadge").hide();
    $(".TraygalleryBadge").hide();
    $(".tray_container").slideUp("slow",
    function() {
      if (a != 0) {
        $(".TraygalleryBadge").show()
      }
    });
    setTimeout(function() {
      $(".tray_container").stop(true, true).hide()
    },
    300)
  },
  5500)
};
com.art.myGalleries.modules.TrayModule.prototype.hideSubTrayHtml = function() {
  $(".galleryBadge").hide();
  $(".TraygalleryBadge").hide();
  $(".tray_subSection").hide()
};
com.art.myGalleries.modules.TrayModule.prototype.getTemplate = function() {
  var a = this.template;
  a = a.replace("$NAME", this.NAME);
  a = a.replace("$TABLOGO", this.app.getString("MY GALLERIES"));
  return a
};
com.art.myGalleries.modules.TrayModule.prototype.getTarget = function() {
  return this.moduleData.target
};
com.art.myGalleries.modules.TrayModule.prototype.loginModalClose = function() {
  var a = this;
  trace("login closed");
  $("#myModalLogin").die();
  $("#myModalLogin").unbind("click");
  $("#myModalLogin").remove();
  if (this.loginLink) {
    this.loginLink.doClose()
  }
  if (this.modalSignUpLB) {
    this.modalSignUpLB.close()
  }
  $("#mygallerylogin").unbind("click");
  $("#mygallerylogin").die("click");
  $("#mygallerylogin").remove();
  $("#mygalleryregister").unbind("click");
  $("#mygalleryregister").die("click");
  $("#mygalleryregister").remove();
  $("#" + this.id).die();
  $("#" + this.id).unbind("click");
  $("#" + this.id).remove()
};
com.art.myGalleries.modules.TrayModule.prototype.template = "<div id='$NAME' class='MyGalleriesTrayModuleContainer'><div class='MyGalleriesTrayModuleBorderTopContainer'></div><div class='MyGalleriesTrayModuleTabContainer floatRight cPointer'><div class='line-separator-tray floatLeft'></div><div class='TraygalleryBadge gCustomFont'></div><div class='MyGalleriesTrayModuleTabLogo gCustomFont uCase'>$TABLOGO</div><div class='line-separator-tray floatRight'></div><div class='MyGalleriesTrayModuleTabArrow cPointer floatRight'></div></div></div>";
com.art.myGalleries.commands.ApplicationCommand = function(c, a) {
  this.NAME = com.art.myGalleries.commands.ApplicationCommand.NAME;
  this.app = a;
  this.serviceProvider = new com.art.core.services.ServiceProvider(this.app.getEnvironment());
  this.model = this.app.getModel();
  this.processing = false;
  this.pageNumber = 1;
  this.currentNote;
  this.username;
  this.password;
  this.tempNewCreatedGalleryId;
  this.tempLastSelectedGalleryId;
  this.printFileName;
  this.fromExternalModule = false;
  this.fromGridModule = false;
  this.referredModule = "";
  this.requestfromforb = false
};
com.art.myGalleries.commands.ApplicationCommand.NAME = "ApplicationCommand";
com.art.myGalleries.commands.ApplicationCommand.prototype.init = function() {};
com.art.myGalleries.commands.ApplicationCommand.prototype.listNotificationInterests = function() {
  return [this.app.events.STARTUP, this.app.events.GALLERY_ITEM_LIST_REQUEST, this.app.events.GALLERY_ITEM_LIST_REQUEST_SUCCESS, this.app.events.GALLERY_ITEM_LIST_REQUEST_FAILED, this.app.events.GET_ALL_GALLERY_ITEMS, this.app.events.UPDATE_GALLERY_TITLE_DESC, this.app.events.GALLERY_ITEM_SORT, this.app.events.ADD_ITEM_TO_EXISTING_GALLERY, this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_DP, this.app.events.ADD_GALLERY_TITLE_DESC, this.app.events.GALLERY_ITEM_SORT, this.app.events.GET_SYSTEM_LIBRARY, this.app.events.GET_ALL_GALLERY_ITEMS, this.app.events.UPDATE_GALLERY_TITLE_DESC, this.app.events.GALLERY_ITEM_SORT, this.app.events.ADD_GALLERY_TITLE_DESC, this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY, this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY, this.app.events.GET_ALL_GALLERIES, this.app.events.GET_ALL_GALLERIES_USER, this.app.events.ADD_ITEM_TO_NEW_GALLERY, this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP, this.app.events.REGISTER_ACCOUNT, this.app.events.LOGIN_ACCOUNT, this.app.events.LOGOUT_MYGALLERY, this.app.events.CREATE_WALL, this.app.events.UPDATE_WALL_ITEMS, this.app.events.GET_WALLS, this.app.events.ADD_SIMILAR_ARTIST_ITEM, this.app.events.ADD_BARE_WALLS, this.app.events.SHARE_WALL, this.app.events.GET_USER_LIBRARY, this.app.events.DELETE_GALLERY, this.app.events.DELETE_GALLERY_ITEM, this.app.events.UPDATE_BARE_WALL, this.app.events.DELETE_GALLERY_ITEM_DP, this.app.events.UPDATE_PRIVACY_SETTINGS, this.app.events.GET_FRAME_SKU, this.app.events.GET_WALL_BY_ID, this.app.events.GET_WALL_BY_PROFILE_KEY, this.app.events.GET_USER_LIBRARY_BY_PROFILE, this.app.events.LOGIN_FACEBOOK_MYGALLERY, this.app.events.GET_FRAME_ID, this.app.events.FACEBOOK_MERGE_ACCOUNTS, this.app.events.ADD_GALLERY_TO_BOOKMARK, this.app.events.REMOVE_GALLERY_FROM_BOOKMARK, this.app.events.ADD_ROOM_TO_BOOKMARK, this.app.events.REMOVE_ROOM_FROM_BOOKMARK, this.app.events.ADD_FOLLOW_PROFILE, this.app.events.REMOVE_FOLLOW_PROFILE, this.app.events.ADD_ITEM_TO_DEFAULT_GALLERY, this.app.events.SAVE_ROOM, this.app.events.SAVE_EXISTING_ROOM, this.app.events.SAVE_ROOM_AS, this.app.events.GET_PRODUCT_INFO, this.app.events.REMOVE_WALL, this.app.events.SHARE_GALLERY_ITEM, this.app.events.GET_ALL_ITEMS_RECENT_GALLERY, ]
};
com.art.myGalleries.commands.ApplicationCommand.prototype.handleNotification = function(t) {
  var a = this;
  switch (t.name) {
  case this.app.events.STARTUP:
    break;
  case this.app.events.GET_ALL_GALLERIES:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&" + this.app.getModel().getGallerySortObjectAsString() + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString();
    this.serviceProvider.galleryAPIService.getUserGalleries({
      command: this,
      app: this.app,
      successHandler: this.getUserGalleriesSuccess,
      errorHandler: this.getUserGalleriesError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_ALL_GALLERIES_USER:
    this.fromGridModule = t.body.fromGridModule ? true: false;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&" + this.app.getModel().getGallerySortObjectAsString() + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString();
    this.serviceProvider.galleryAPIService.getUserGalleries({
      command: this,
      app: this.app,
      successHandler: this.getUserGalleriesSuccessForWebUser,
      errorHandler: this.getUserGalleriesErrorForWebUser,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GALLERY_ITEM_SORT:
    this.app.getModel().setPagingOptionsAllItems(false);
    var z = "gallerySortOption=" + JSON.stringify({
      DefaultSort: true,
      SortBy: t.body.sortBy,
      SortDirection: t.body.sortOrder
    });
    this.app.getModel().gallerySortBy = t.body.sortBy;
    this.app.getModel().gallerySortDirection = t.body.sortOrder;
    var w;
    w = "ResultFilterOptions=" + JSON.stringify({
      IncludeGalleryItems: true,
      IncludeSavedRooms: false,
      IncludeSavedWalls: false,
      IncludeSavedWallsItems: false
    });
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&";
    e += this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "persona=" + this.app.getModel().environmentSub.profileKey + "&";
    e += "galleryKey=" + this.app.getModel().environmentSub.galleryKey + "&";
    e += "galleryAuthToken=" + this.app.getModel().environment.galleryAuthToken + "&";
    e += z + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString() + "&";
    e += w;
    this.serviceProvider.galleryAPIService.getGalleryDetailswithResultFilter({
      command: this,
      app: this.app,
      successHandler: this.galleryItemSortSuccess,
      errorHandler: this.galleryItemSortError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_SYSTEM_LIBRARY:
    if (this.app.getUserLibraryProxy().systemLibraryObject != undefined) {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_SYSTEM_LIBRARY_SUCCESS, {},
      "ajax"))
    } else {
      var z = "gallerySortOption=" + JSON.stringify({
        DefaultSort: true,
        SortBy: this.app.getModel().gallerySortBy,
        SortDirection: this.app.getModel().gallerySortDirection
      });
      var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&" + z + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString();
      this.serviceProvider.galleryAPIService.getSystemLibrary({
        command: this,
        app: this.app,
        successHandler: this.getSystemLibrarySuccess,
        errorHandler: this.getSystemLibraryError,
        beforeSendHandler: function() {}
      },
      e)
    }
    break;
  case this.app.events.GET_ALL_GALLERY_ITEMS:
    this.currentNote = t;
    if (this.app.getModel().galleryItemList.length > 0) {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERY_ITEMS_SUCCESS, this.currentNote.body))
    } else {
      this.app.getModel().setPagingOptionsAllItems(true);
      var z = "gallerySortOption=" + JSON.stringify({
        DefaultSort: true,
        SortBy: this.app.getModel().gallerySortBy,
        SortDirection: this.app.getModel().gallerySortDirection
      });
      var w = "ResultFilterOptions=" + JSON.stringify({
        IncludeGalleryItems: true,
        IncludeUserSavedWalls: false,
        IncludeAutoSavedWalls: true,
        IncludeWallItems: true
      });
      var e = this.app.getModel().getAccessKeyObjectAsString() + "&";
      e += this.app.getModel().getUserProfileObjectAsString() + "&";
      e += "persona=" + this.app.getModel().environmentSub.profileKey + "&";
      e += "galleryKey=" + this.app.getModel().getGalleryKey() + "&";
      e += "galleryAuthToken=" + this.app.getModel().environment.galleryAuthToken + "&";
      e += z + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString() + "&";
      e += w;
      this.serviceProvider.galleryAPIService.getGalleryDetailswithResultFilter({
        command: this,
        app: this.app,
        successHandler: this.getGalleryWithItemsSuccess,
        errorHandler: this.getGalleryWithItemsError,
        beforeSendHandler: function() {}
      },
      e)
    }
    break;
  case this.app.events.UPDATE_GALLERY_TITLE_DESC:
    var m = this.app.getModel().getSelectedGalleryClone();
    if (this.app.getModel().isRoomView) {
      var B = this.app.getRoomViewProxy().currentWall.gallery;
      m = {};
      m.GalleryId = B.GalleryId;
      m.ItemKey = B.ItemKey
    }
    if (this.app.getModel().galleyNameIsAvailable(t.body.title, m.GalleryId)) {
      this.currentNote = t;
      var s = encodeURIComponent(t.body.title);
      m.Name = escape(s);
      m.LongDescription = encodeURIComponent(escape(t.body.desc));
      m.GalleryIconURL = "";
      m.IconUrl = "";
      m.Icon = null;
      if (m.GalleryImage != null && m.GalleryImage.LargeImage != null && m.GalleryImage.LargeImage.HttpImageURL != null) {
        if (t.body.bannerUrl.length > 0) {
          m.GalleryImage.LargeImage.HttpImageURL = encodeURIComponent(escape(t.body.bannerUrl))
        }
      }
      var q = JSON.stringify(m);
      q = q.replace(/#/g, "");
      var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&gallery=" + q;
      this.serviceProvider.galleryAPIService.updateGallery({
        command: this,
        app: this.app,
        successHandler: this.updateGallerySuccess,
        errorHandler: this.updateGalleryError,
        beforeSendHandler: function() {}
      },
      e)
    } else {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_GALLERY_TITLE_DESC_FAILED, {
        msg: "duplicate"
      }))
    }
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_GALLERY:
    var p = [{}];
    if (this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != null || this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != undefined) {
      p[0] = this.app.getModel().getNewItemToGalleryFromFramingStudio();
      p[0].Item.Title = escape(this.app.getModel().getNewItemToGalleryFromFramingStudio().Item.Title);
      p[0].Item.ArtistName = escape(p[0].Item.ArtistName)
    } else {
      p[0] = this.app.getModel().getNewItemToGallery();
      p[0].Item.Title = escape(this.app.getModel().getNewItemToGallery().Item.Title);
      p[0].Item.ArtistName = escape(p[0].Item.ArtistName);
      if (this.app.getModel().selectedImageObject.FrameSku != undefined && this.app.getModel().selectedImageObject.FrameSku != null && this.app.getModel().selectedImageObject.FrameSku.length > 0) {}
    }
    var n = "";
    if (this.app.getModel().environmentSub.selectedGalleryID != undefined) {
      n = this.app.getModel().environmentSub.selectedGalleryID
    } else {
      n = this.app.getModel().environment.selectedGalleryID
    }
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryItems=" + JSON.stringify(p) + "&galleryID=" + n + "&allowDuplicate=true";
    this.serviceProvider.galleryAPIService.addItemsToGallery({
      command: this,
      app: this.app,
      successHandler: this.addItemsToGallerySuccess,
      errorHandler: this.addItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_ALL_ITEMS_RECENT_GALLERY:
    var z = "galleryItemSortOption=" + JSON.stringify({
      DefaultSort: true,
      SortBy: this.app.getModel().gallerySortBy,
      SortDirection: this.app.getModel().gallerySortDirection
    });
    var w = "ResultFilterOptions=" + JSON.stringify({
      IncludeGalleryItems: true,
      IncludeUserSavedWalls: false,
      IncludeAutoSavedWalls: false,
      IncludeWallItems: false
    });
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&";
    e += this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "AppID=519BAAC8E607413CA1FC043C92D08AAD&";
    e += z + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString() + "&";
    e += w + "&DonotCreate=false&galleryDefaultType=3";
    this.serviceProvider.galleryAPIService.getUserDefaultGallery({
      command: this,
      app: this.app,
      successHandler: this.getUserRecentlyGallerySuccess,
      errorHandler: this.getUserRecentlyGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_ITEM_TO_DEFAULT_GALLERY:
    var p = [{}];
    p[0] = this.app.getModel().getNewItemToGallery();
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryItems=" + JSON.stringify(p) + "&GalleryDefaultType=3";
    this.serviceProvider.galleryAPIService.addItemsToDefaultGallery({
      command: this,
      app: this.app,
      successHandler: this.addItemsToDefaultGallerySuccess,
      errorHandler: this.addItemsToDefaultGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_DP:
    var p = [{}];
    if (this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != null || this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != undefined) {
      p[0] = this.app.getModel().getNewItemToGalleryFromFramingStudio();
      p[0].Item.Title = escape(this.app.getModel().getNewItemToGalleryFromFramingStudio().Item.Title);
      p[0].Item.ArtistName = escape(p[0].Item.ArtistName)
    } else {
      p[0] = this.app.getModel().getNewItemToGallery();
      p[0].Item.Title = escape(this.app.getModel().getNewItemToGallery().Item.Title);
      p[0].Item.ArtistName = escape(p[0].Item.ArtistName);
      if (this.app.getModel().selectedImageObject.FrameSku != undefined && this.app.getModel().selectedImageObject.FrameSku != null && this.app.getModel().selectedImageObject.FrameSku.length > 0) {}
    }
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryItems=" + JSON.stringify(p) + "&galleryID=" + this.app.getModel().environmentSub.selectedGalleryID + "&allowDuplicate=true";
    this.serviceProvider.galleryAPIService.addItemsToGallery({
      command: this,
      app: this.app,
      successHandler: this.detailPageAddItemsToGallerySuccess,
      errorHandler: this.detailPageAddItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_GALLERY_TITLE_DESC:
    var m = this.app.getModel().setCreateGallery();
    var u = 1;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&parentGalleryId=" + u + "&gallery=" + JSON.stringify(m);
    this.serviceProvider.galleryAPIService.createGallery({
      command: this,
      app: this.app,
      successHandler: this.addGallerySuccess,
      errorHandler: this.addGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY:
    var m = this.app.getModel().setCreateGallery();
    var u = 1;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&parentGalleryId=" + u + "&gallery=" + JSON.stringify(m);
    this.serviceProvider.galleryAPIService.createGallery({
      command: this,
      app: this.app,
      successHandler: this.moveAddNewItemsToGallerySuccess,
      errorHandler: this.moveAddNewItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY:
    var p = [{}];
    p[0] = this.app.getModel().getExisitngItemToGallery(true);
    var h = [{}];
    var m = this.app.getModel().galleryTemplate;
    m.GalleryId = this.app.getModel().getDestinationSelectedGalleryId();
    h[0] = m;
    p[0].ItemURL = "";
    p[0].Item.Title = escape(p[0].Item.Title);
    p[0].Item.ArtistName = escape(p[0].Item.ArtistName);
    var A = this.app.getModel().environmentSub.selectedGalleryID;
    if (!this.app.getModel().savetogalleryoption) {
      A = this.app.getModel().getMyGalObjectVal().gid
    }
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&sourceGalleryID=" + A + "&galleryItem=" + JSON.stringify(p) + "&destinationGalleries=" + JSON.stringify(h) + "&" + this.app.getModel().getMoveOptions();
    this.serviceProvider.galleryAPIService.moveGalleryItem({
      command: this,
      app: this.app,
      successHandler: this.moveExistingItemsToGallerySuccess,
      errorHandler: this.moveExistingItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY:
    var m = this.app.getModel().setCreateGallery();
    var u = 1;
    this.printFileName = t.body;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&parentGalleryId=" + u + "&gallery=" + JSON.stringify(m);
    this.serviceProvider.galleryAPIService.createGallery({
      command: this,
      app: this.app,
      successHandler: this.addNewItemsToGallerySuccess,
      errorHandler: this.addNewItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP:
    var m = this.app.getModel().setCreateGallery();
    var u = 1;
    this.printFileName = t.body;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&parentGalleryId=" + u + "&gallery=" + JSON.stringify(m);
    this.serviceProvider.galleryAPIService.createGallery({
      command: this,
      app: this.app,
      successHandler: this.detailpageaddNewItemsToGallerySuccess,
      errorHandler: this.detailpageaddNewItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.REGISTER_ACCOUNT:
    this.username = t.body.username;
    this.password = t.body.password;
    this.registerAccountSuccess(t.body.coreresponse);
    break;
  case this.app.events.LOGIN_ACCOUNT:
    this.fromExternalModule = t.type.fromExternalModule ? true: false;
    this.referredModule = t.type.modulename;
    this.requestfromforb = t.type.logintfob;
    this.username = t.body.username;
    this.password = t.body.password;
    var e = "account=LoginAccount&usr=" + this.username + "&pwd=" + this.password;
    this.loginAccountSuccess(t.body.coreresponse);
    break;
  case this.app.events.LOGOUT_MYGALLERY:
    var d = new com.art.core.cookie.Cookie();
    var y = d.getCookieBase("sessionid");
    var e = "myaccount=LogoutMyGallery&sessionID=" + y;
    this.serviceProvider.galleryAPIService.callMyAccountProxy({
      command: this,
      app: this.app,
      successHandler: this.logoutAccountSuccess,
      errorHandler: this.logoutAccountError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.CREATE_WALL:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&wall=" + this.app.getUserLibraryProxy().getWallObjectAsStringForCreateWall();
    this.serviceProvider.galleryAPIService.createWall({
      command: this,
      app: this.app,
      successHandler: this.createWallSuccess,
      errorHandler: this.createWallError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.UPDATE_WALL:
    var r = t.body;
    var F = this.app.getUserLibraryProxy().getSelectedWallId();
    var E = this.app.getUserLibraryProxy().getWallObjectAsStringForUpdateWall(t.body, F);
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&WallID=" + F + "&Wall=" + E;
    this.serviceProvider.galleryAPIService.updateWall({
      command: this,
      app: this.app,
      successHandler: this.updateWallItemsSuccess,
      errorHandler: this.updateWallItemsError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.UPDATE_WALL_ITEMS:
    var r = t.body;
    var F = this.app.getUserLibraryProxy().getSelectedWallId();
    var E = this.app.getUserLibraryProxy().getWallObjectAsStringForUpdateWall(t.body, F);
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString();
    e += "&WallID=" + F + "&Wall=" + E;
    this.serviceProvider.galleryAPIService.updateWallItems({
      command: this,
      app: this.app,
      successHandler: this.updateWallItemsSuccess,
      errorHandler: this.updateWallItemsError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_SIMILAR_ARTIST_ITEM:
    var e = {};
    e.Apnum = this.app.getModel().cacheByGalleryItemList[this.app.getModel().environment.selectedGalleryItemId].APNum;
    e.ImageFilePath = this.app.getModel().cacheByGalleryItemList[this.app.getModel().environment.selectedGalleryItemId].ItemDetails.ImageInformation.LargeImage.HttpImageURL;
    this.serviceProvider.searchAPIService.getSimilarImagesForImage({
      command: this,
      app: this.app,
      successHandler: this.searchSimilarArtistSuccess,
      errorHandler: this.searchSimilarArtistError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_WALLS:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString();
    e += '&libraryResultFilter={"IncludeAutoSavedWalls":"true","IncludeBareWalls":"true"}';
    this.serviceProvider = new com.art.core.services.ServiceProvider(this.app.getEnvironment());
    this.serviceProvider.galleryAPIService.getUserLibrary({
      command: this,
      app: this.app,
      successHandler: this.getWallsSuccess,
      errorHandler: this.y,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_BARE_WALLS:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&";
    e += this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "galleryID=" + this.app.getModel().environmentSub.selectedGalleryID + "&";
    e += "Wall=" + JSON.stringify([t.body]);
    this.serviceProvider.galleryAPIService.addBareWalls({
      command: this,
      app: this.app,
      successHandler: this.addBareWallSuccess,
      errorHandler: this.addBareWallError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_USER_LIBRARY:
    if (this.app.getModel().userLibraryObject == undefined) {
      var z = "gallerySortOption=" + JSON.stringify({
        DefaultSort: false,
        SortBy: "0",
        SortDirection: 1
      });
      var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&" + z + "&" + this.app.getModel().getGalleryPagingOptionObjectAsString();
      this.serviceProvider.galleryAPIService.getUserLibrary({
        command: this,
        app: this.app,
        successHandler: this.getUserLibrarySuccess,
        errorHandler: this.getUserLibraryError,
        beforeSendHandler: function() {}
      },
      e)
    } else {
      return this.app.getModel().userLibraryObject
    }
    break;
  case this.app.events.SHARE_WALL:
    var x = MyGalleriesCore.getRoomViewProxy();
    x.shareWall(function(G) {
      a.shareWallSuccess(G)
    });
    break;
  case this.app.events.DELETE_GALLERY:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&gallery=" + JSON.stringify(t.body);
    this.serviceProvider.galleryAPIService.deleteGallery({
      command: this,
      app: this.app,
      successHandler: this.deleteGallerySuccess,
      errorHandler: this.deleteGalleryError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.REMOVE_WALL:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&wall=" + JSON.stringify(t.body);
    this.serviceProvider.galleryAPIService.removeWall({
      command: this,
      app: this.app,
      successHandler: this.deleteRoomSuccess,
      errorHandler: this.deleteRoomError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.DELETE_GALLERY_ITEM:
    var f = [{}];
    f[0].ItemGalleryItemID = t.body.ItemId;
    f[0].APNum = t.body.APNum;
    f[0].PODConfigID = t.body.PodConfigId;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&itemstoRemove=" + JSON.stringify(f) + "&removeOptions=1";
    this.serviceProvider.galleryAPIService.deleteGalleryItem({
      command: this,
      app: this.app,
      successHandler: this.deleteGalleryItemSuccess,
      errorHandler: this.deleteGalleryItemError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.DELETE_GALLERY_ITEM_DP:
    var f = [{}];
    f[0].ItemGalleryItemID = t.body;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&itemstoRemove=" + JSON.stringify(f) + "&removeOptions=1";
    this.serviceProvider.galleryAPIService.deleteGalleryItem({
      command: this,
      app: this.app,
      successHandler: this.detailPageDeleteGalleryItemSuccess,
      errorHandler: this.detailPageDeleteGalleryItemError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.UPDATE_BARE_WALL:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "galleryId=" + this.app.getModel().environmentSub.selectedGalleryID + "&";
    e += "Wall=" + JSON.stringify(this.app.getUserLibraryProxy().getSelectedPersonalBareWallWithUpdates(t.body));
    this.serviceProvider.galleryAPIService.updateBareWall({
      command: this,
      app: this.app,
      successHandler: this.updateBareWallSuccess,
      errorHandler: this.updateBareWallError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.UPDATE_PRIVACY_SETTINGS:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&gallery=" + JSON.stringify(t.body);
    this.serviceProvider.galleryAPIService.updateGallery({
      command: this,
      app: this.app,
      successHandler: this.privacyUpdateGalleryItemSuccess,
      errorHandler: this.privacyUpdateGalleryItemError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_FRAME_SKU:
    var e = "dfeEngineParameters=" + JSON.stringify(t.body);
    this.serviceProvider.dfeAPIService.GetFrameSkuForFrameConfiguration({
      command: this,
      app: this.app,
      successHandler: this.getFrameSKUSuccess,
      errorHandler: this.getFrameSKUError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_WALL_BY_ID:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "wallId=" + this.app.getUserLibraryProxy().sharedWallId + "&";
    e += "profileKey=" + this.app.getModel().environmentSub.profileKey + "&";
    e += "galleryKey=" + this.app.getModel().environmentSub.galleryKey + "&";
    e += "galleryAccessKey=" + this.app.getModel().environment.galleryAuthToken;
    this.serviceProvider.galleryAPIService.getWallByWallId({
      command: this,
      app: this.app,
      successHandler: this.getWallByIdSuccess,
      errorHandler: this.getWallByIdError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_WALL_BY_PROFILE_KEY:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&";
    e += "profileKey=" + this.app.getModel().environmentSub.profileKey + "&";
    e += "roomKey=" + this.app.getModel().savedRoomKey + "&";
    this.serviceProvider.galleryAPIService.getWallByProfileKey({
      command: this,
      app: this.app,
      successHandler: this.getWallByProfileKeySuccess,
      errorHandler: this.getWallByProfileKeyError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.GET_USER_LIBRARY_BY_PROFILE:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&";
    e += this.app.getModel().getGalleryPagingOptionObjectAsString + "&";
    e += "gallerySortOption=" + JSON.stringify({
      DefaultSort: false,
      SortBy: "0",
      SortDirection: 1
    }) + "&";
    e += "profileKey=" + this.app.getModel().environmentSub.profileKey + "&";
    this.serviceProvider.galleryAPIService.getUserLibraryByProfileKey({
      command: this,
      app: this.app,
      successHandler: this.getUserLibraryByProfileKeySuccess,
      errorHandler: this.getUserLibraryByProfileKeyError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.FACEBOOK_MERGE_ACCOUNTS:
    var l = this.app.getModel().environment.authToken;
    var C = t.body.authToken;
    this.referredModule = t.type.modulename;
    this.requestfromforb = t.type.logintfob;
    this.accountMerge(l, C, true);
    break;
  case this.app.events.GET_FRAME_ID:
    var e = this.app.getModel();
    var k = (com.art.core.utils.LocalizationManager.determineConvertToCm("", e.environment.currencyCode, "")) ? this.app.constants.DFEUNITOFMEASURECM: this.app.constants.DFEUNITOFMEASUREINCH;
    var v = "ui=" + e.environment.sessionId + "&frameSKU=" + t.body.frameConfigurationId + "&imageMaxW=" + this.app.constants.DFEIMAGEMAXW + "&imageMaxH=" + this.app.constants.DFEIMAGEMAXH;
    v += "&unitofmeasure=" + k + "&customerZoneId=" + e.environment.customerZoneId + "&languageId=" + e.environment.languageId + "&currencyId=" + e.environment.currencyId + "&currencyCode=" + e.environment.currencyCode;
    v += "&IsDFEAjax=Y";
    this.serviceProvider.framingServiceAPI.getFrameIdForDFE({
      command: this,
      app: this.app,
      successHandler: this.getFrameIdForDFESuccess,
      errorHandler: this.getFrameIdForDFEError,
      beforeSendHandler: function() {}
    },
    v);
    break;
  case this.app.events.ADD_DATA_GRAPH:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getGraphInfoObjectAsString();
    this.serviceProvider.graphServiceAPI.UpdateUserRelationship({
      command: this,
      app: this.app,
      successHandler: this.addItemsToGraphSuccess,
      errorHandler: this.addItemsToGraphError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_GALLERY_TO_BOOKMARK:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getBookmarkObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_BOOKMARK);
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.addGalleryToBookmarkSuccess,
      errorHandler: this.addGalleryToBookmarkError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.REMOVE_GALLERY_FROM_BOOKMARK:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getBookmarkObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_REMOVE);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_BOOKMARK);
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.removeGalleryFromBookmarkSuccess,
      errorHandler: this.removeGalleryFromBookmarkError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_ROOM_TO_BOOKMARK:
    trace("ADD_ROOM_TO_BOOKMARK");
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getBookmarkObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_BOOKMARK);
    e = e.replace("GalleryId", "WallId");
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.addRoomToBookmarkSuccess,
      errorHandler: this.addRoomToBookmarkError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.REMOVE_ROOM_FROM_BOOKMARK:
    trace("REMOVE_ROOM_TO_BOOKMARK");
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getBookmarkObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_REMOVE);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_BOOKMARK);
    e = e.replace("GalleryId", "WallId");
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.removeRoomFromBookmarkSuccess,
      errorHandler: this.removeRoomFromBookmarkError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.ADD_FOLLOW_PROFILE:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getFollowsObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_ADD);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_FOLLOWS);
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.addFollowProfileSuccess,
      errorHandler: this.addFollowProfileError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.REMOVE_FOLLOW_PROFILE:
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getFollowsObjectAsString();
    e = e.replace("placeholder1", com.art.core.services.GraphAPIService.RelationshipChangeAction_REMOVE);
    e = e.replace("placeholder2", com.art.core.services.GraphAPIService.UserRelationshipType_FOLLOWS);
    e = e.replace("placeholder3", t.body);
    this.serviceProvider.graphServiceAPI.UpdateUserRelationshipForFollowsAndBookmark({
      command: this,
      app: this.app,
      successHandler: this.removeFollowProfileSuccess,
      errorHandler: this.removeFollowProfileError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  case this.app.events.SAVE_ROOM:
    var x = MyGalleriesCore.getRoomViewProxy();
    x.saveRoom(this.saveRoomSuccess);
    break;
  case this.app.events.SAVE_ROOM_AS:
    var c = "edit";
    if (t && t.body && t.body.afterSuccess) {
      c = t.body.afterSuccess
    }
    var x = MyGalleriesCore.getRoomViewProxy();
    x.saveRoom(function(H) {
      if (H.OperationResponse.ResponseMessage != "Success") {
        MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_ERROR, {
          message: H.OperationResponse.ResponseMessage
        }))
      } else {
        var G = H.Library.Galleries[0].Walls[0].WallId;
        x.currentWall.id = G;
        x.currentWall.name = H.Library.Galleries[0].Walls[0].Name;
        x.updateWall(x.currentWall,
        function() {
          x.updateWallItems(x.currentWall,
          function(I) {
            a.saveExistingRoomSuccess(I, c)
          })
        })
      }
    });
    break;
  case this.app.events.SAVE_EXISTING_ROOM:
    var x = this.app.getRoomViewProxy();
    x.updateWall(x.currentWall,
    function() {
      x.updateWallItems(x.currentWall, a.saveExistingRoomSuccess)
    });
    break;
  case this.app.events.GET_PRODUCT_INFO:
    var D = "itemId=" + t.body;
    D += "&imageId=";
    D += "&lookupType=ItemNumber";
    D += "&targetDomain=ArtCom";
    D += "&CurrencyCode=USD";
    D += "&languageCode=EN";
    D += "&includePODServiceOptions=true";
    D += "&includeRelatedCategories=true";
    D += "&includeRelatedItems=true";
    D += "&includeProductContent=true";
    D += "&includeRatingAndReview=true";
    this.serviceProvider.productServiceAPI.GetProductInformation(D, this);
    break;
  case this.app.events.SHARE_GALLERY_ITEM:
    var o = this.app.getModel().environmentSub.selectedGalleryID;
    var e = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&GalleryID=" + o + "&createSnapshot=false";
    this.serviceProvider.galleryAPIService.shareGalleryItem({
      command: this,
      app: this.app,
      successHandler: this.shareGalleryItemSuccess,
      errorHandler: this.shareGalleryItemError,
      beforeSendHandler: function() {}
    },
    e);
    break;
  default:
    throw new Error("ApplicationCommand failure! Invalid event: " + t.name)
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.facebookLoginAccountSuccess = function(a) {
  trace("success")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.facebookLoginAccountError = function(a) {
  trace("failure")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getFrameSKUSuccess = function(d) {
  var a = [{}];
  a.ImageUrl = d.d.FrameConfigurations[0].FrameImageUrl;
  a.FrameSku = d.d.FrameConfigurations[0].FrameSku;
  a.Height = d.d.FrameConfigurations[0].ImageHeight;
  a.Width = d.d.FrameConfigurations[0].ImageWidth;
  a.Price = d.d.FrameConfigurations[0].PriceConfig.Price;
  a.DisplayPrice = d.d.FrameConfigurations[0].PriceConfig.DisplayPrice;
  a.Title = d.d.FrameConfigurations[0].Print.Title;
  a.APNum = d.d.FrameConfigurations[0].Print.APNum;
  a.ArtistID = d.d.FrameConfigurations[0].Print.ArtistCategoryID;
  a.Imageid = d.d.FrameConfigurations[0].Print.ImageID;
  a.ItemDisplayedTypeID = d.d.FrameConfigurations[0].Print.ItemDisplayedTypeID;
  a.PODConfigID = d.d.FrameConfigurations[0].Print.PODConfigID;
  a.ArtistName = d.d.FrameConfigurations[0].Print.ArtistLastName + " " + d.d.FrameConfigurations[0].Print.ArtistFirstName;
  var c = d.d.FrameConfigurations[0].Print.FileName;
  c = "http://" + this.app.getModel().environment.ImageDynPath + "/lrg" + c;
  c = c.replace(/\134/g, "/");
  a.FileName = c;
  a.Source = "FramingStudioPage";
  this.app.getModel().setSelectedImageObject(a);
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_FRAME_SKU_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getFrameSKUError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_FRAME_SKU_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.privacyUpdateGalleryItemSuccess = function(a) {
  window.location.href = window.location.href
};
com.art.myGalleries.commands.ApplicationCommand.prototype.privacyUpdateGalleryItemError = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailPageDeleteGalleryItemSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_ITEM_DP_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailPageDeleteGalleryItemError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_ITEM_DP_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteGallerySuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteRoomSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_WALL_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteRoomError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_WALL_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteGalleryItemSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_ITEM_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.deleteGalleryItemError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.DELETE_GALLERY_ITEM_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.logoutAccountSuccess = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.logoutAccountError = function(c) {
  var a = this;
  if (c.responseText == "{'success'}") {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGOUT_MYGALLERY_SUCCESS))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGOUT_MYGALLERY_FAILED))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginAccountSuccess = function(e) {
  var a = this;
  if (e.OperationResponse.ResponseMessage == "Success" && e.OperationResponse.ResponseCode == "200") {
    var c = e.AuthenticationToken;
    var d = this.app.getModel().environment.authToken;
    this.app.getModel().environment.authToken = c;
    this.accountMerge(d, c, false, e)
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGIN_ACCOUNT_FAILED, "failure"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginAccountError = function(e) {
  var a = this;
  if (e.responseText == "{'success'}") {
    var c = new com.art.core.cookie.Cookie();
    var f = c.getCookieBase("sessionid");
    var d = "myaccount=myLoginAccount&usr=" + this.command.username + "&pwd=" + this.command.password + "&sessionID=" + f;
    this.command.serviceProvider.galleryAPIService.callMyAccountProxy({
      command: this.command,
      app: this.app,
      successHandler: this.command.loginMyAccountSuccess,
      errorHandler: this.command.loginMyAccountError,
      beforeSendHandler: function() {}
    },
    d)
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGIN_ACCOUNT_FAILED, "failure"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginMyAccountSuccess = function(c) {
  var a = this.app.getModel().environment.authToken;
  this.app.getModel().environment.authToken = this.toAuthToken;
  this.appCmd.accountMerge(a, this.toAuthToken, false, c)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginMyAccountErrorTest = function(a) {
  trace("Error")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginMyAccountSuccessTest = function(a) {
  trace("Success")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.loginMyAccountError = function(c) {
  var a = this.app.getModel().environment.authToken;
  this.app.getModel().environment.authToken = this.toAuthToken;
  this.appCmd.accountMerge(a, this.toAuthToken, false, c)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.registerMyAccountSuccess = function(a) {
  if (this.app.getModel().registerSource != "") {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_TRAY_SUCCESS))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_SUCCESS))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.registerMyAccountError = function(a) {
  if (a.responseText == "{'success'}") {
    if (this.app.getModel().registerSource != "") {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_TRAY_SUCCESS))
    } else {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_SUCCESS))
    }
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "failure"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.registerAccountSuccess = function(a) {
  if (a.OperationResponse.ResponseMessage == "Success" && a.OperationResponse.ResponseCode == "200") {
    this.registerMyAccountSuccess()
  } else {
    if (a.OperationResponse.ResponseMessage == "exist") {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "exist"))
    } else {
      if (a.OperationResponse.ResponseMessage == "invalidemail") {
        this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "invalidemail"))
      } else {
        if (a.OperationResponse.ResponseMessage == "invalidpassword") {
          this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "invalidpassword"))
        } else {
          this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "failure"))
        }
      }
    }
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveAddNewItemsToGallerySuccess = function(f) {
  if (f.OperationResponse.OperationStatus == 0) {
    var e = [{}];
    e[0] = this.app.getModel().getExisitngItemToGallery(true);
    e[0].ItemURL = "";
    e[0].Item.Title = escape(e[0].Item.Title);
    e[0].Item.ArtistName = escape(e[0].Item.ArtistName);
    var c = [{}];
    var d = this.app.getModel().galleryTemplate;
    d.GalleryId = f.Library.Galleries[0].GalleryId;
    this.command.tempNewCreatedGalleryId = f.Library.Galleries[0].ItemKey;
    this.command.tempLastSelectedGalleryId = f.Library.Galleries[0].GalleryId;
    c[0] = d;
    var a = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&sourceGalleryID=" + this.app.getModel().environmentSub.selectedGalleryID + "&galleryItem=" + JSON.stringify(e) + "&destinationGalleries=" + JSON.stringify(c) + "&" + this.app.getModel().getMoveOptions();
    this.command.serviceProvider.galleryAPIService.moveGalleryItem({
      command: this.command,
      app: this.app,
      successHandler: this.command.moveAddItemsToGallerySuccess,
      errorHandler: this.command.moveAddItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    a)
  } else {
    trace("test12:" + f);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS, f))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.accountMerge = function(e, k, d, h) {
  var f = this.serviceProvider.createHandlers(this.accountMergeSuccess, this.accountMergeFailure,
  function() {});
  f.app = this.app;
  f.appCmd = this;
  f.facebookLogin = d;
  f.optionalResponseObject = h;
  var c = this.app.getModel().environment;
  this.serviceProvider.accountAuthorizationAPIService.accountMerge(f, c.apiKey, c.sessionId, e, k)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.accountMergeSuccess = function(a) {
  if (this.facebookLogin) {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS, {},
    {
      modulename: this.appCmd.referredModule,
      reqfromforb: this.appCmd.requestfromforb
    }))
  } else {
    if (this.app.getModel().loginSource == this.app.constants.LOGINTRAY) {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGIN_ACCOUNT_TRAY_SUCCESS, {},
      {
        modulename: this.appCmd.referredModule,
        reqfromforb: this.appCmd.requestfromforb
      }))
    } else {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.LOGIN_ACCOUNT_SUCCESS, {
        fromExternalModule: this.appCmd.fromExternalModule
      },
      {
        modulename: this.appCmd.referredModule,
        reqfromforb: this.appCmd.requestfromforb
      }))
    }
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.accountMergeFailure = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUseRecentlyGalleryError = function(a) {
  trace("getitemsfromrecentlygallery failure")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserRecentlyGallerySuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_ITEMS_RECENT_GALLERY_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveAddNewItemsToGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_FAILED, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveAddItemsToGallerySuccess = function(c) {
  var a = [{}];
  a = c;
  this.command.tempNewCreatedGalleryId = c.Library.Galleries[0].ItemKey;
  this.command.tempLastSelectedGalleryId = c.Library.Galleries[0].GalleryId;
  a.GalleryName = this.command.tempNewCreatedGalleryId;
  a.GalleryID = this.command.tempLastSelectedGalleryId;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveAddItemsToGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_NEW_GALLERY_FAILED, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addNewItemsToGallerySuccess = function(f) {
  if (f.Library != null || f.Library != undefined) {
    var e = [{}];
    if (this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != null || this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != undefined) {
      e[0] = this.app.getModel().getNewItemToGalleryFromFramingStudio();
      e[0].Item.Title = escape(this.app.getModel().getNewItemToGalleryFromFramingStudio().Item.Title);
      e[0].Item.ArtistName = escape(e[0].Item.ArtistName)
    } else {
      e[0] = this.app.getModel().getNewItemToGallery();
      e[0].Item.Title = escape(this.app.getModel().getNewItemToGallery().Item.Title);
      e[0].Item.ArtistName = escape(e[0].Item.ArtistName);
      if (this.app.getModel().selectedImageObject.FrameSku != undefined && this.app.getModel().selectedImageObject.FrameSku != null && this.app.getModel().selectedImageObject.FrameSku.length > 0) {}
    }
    var d = f.Library.Galleries[0].GalleryId;
    this.command.tempNewCreatedGalleryId = f.Library.Galleries[0].ItemKey;
    this.command.tempLastSelectedGalleryId = f.Library.Galleries[0].GalleryId;
    var a = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryItems=" + JSON.stringify(e) + "&galleryID=" + d + "&allowDuplicate=true";
    this.command.serviceProvider.galleryAPIService.addItemsToGallery({
      command: this.command,
      app: this.app,
      successHandler: this.command.addItemsToGallerySuccess,
      errorHandler: this.command.addItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    a)
  } else {
    var c = [{}];
    c = f;
    c.GalleryName = this.command.tempNewCreatedGalleryId;
    c.GalleryID = this.command.tempLastSelectedGalleryId;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS, c))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addNewItemsToGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailpageaddNewItemsToGallerySuccess = function(f) {
  if (f.Library != null || f.Library != undefined) {
    var e = [{}];
    if (this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != null || this.app.getModel().getNewItemToGalleryFromFramingStudio().FrameSku != undefined) {
      e[0] = this.app.getModel().getNewItemToGalleryFromFramingStudio();
      e[0].Item.Title = escape(this.app.getModel().getNewItemToGalleryFromFramingStudio().Item.Title);
      e[0].Item.ArtistName = escape(e[0].Item.ArtistName)
    } else {
      e[0] = this.app.getModel().getNewItemToGallery();
      e[0].Item.Title = escape(this.app.getModel().getNewItemToGallery().Item.Title);
      e[0].Item.ArtistName = escape(e[0].Item.ArtistName);
      if (this.app.getModel().selectedImageObject.FrameSku != undefined && this.app.getModel().selectedImageObject.FrameSku != null && this.app.getModel().selectedImageObject.FrameSku.length > 0) {}
    }
    var d = f.Library.Galleries[0].GalleryId;
    this.command.tempNewCreatedGalleryId = f.Library.Galleries[0].ItemKey;
    this.command.tempLastSelectedGalleryId = f.Library.Galleries[0].GalleryId;
    var a = this.app.getModel().getAccessKeyObjectAsString() + "&" + this.app.getModel().getUserProfileObjectAsString() + "&galleryItems=" + JSON.stringify(e) + "&galleryID=" + d + "&allowDuplicate=true";
    this.command.serviceProvider.galleryAPIService.addItemsToGallery({
      command: this.command,
      app: this.app,
      successHandler: this.command.detailpageaddItemsToGallerySuccess,
      errorHandler: this.command.detailpageaddItemsToGalleryError,
      beforeSendHandler: function() {}
    },
    a)
  } else {
    var c = [{}];
    c = f;
    c.GalleryName = this.command.tempNewCreatedGalleryId;
    c.GalleryID = this.command.tempLastSelectedGalleryId;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_SUCCESS, c))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailpageaddNewItemsToGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_FAILED, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveExistingItemsToGallerySuccess = function(d) {
  var a = "";
  if (this.app.getModel().selectedImageObject.Source == "ProductPage") {
    a = "Product Page Add - Completed"
  } else {
    if (this.app.getModel().selectedImageObject.Source == "GalleryPage") {
      a = "Gallery Page Add - Completed"
    } else {
      if (this.app.getModel().selectedImageObject.Source == "ServicesPage") {
        a = "Services Page Add - Completed"
      } else {
        if (this.app.getModel().selectedImageObject.Source == "FramingStudioPage") {
          a = "Framing Studio Page Add - Completed"
        }
      }
    }
  }
  if (a != "") {
    mygalleriesGA.trackEventWithCategory(a, a)
  }
  var c = [{}];
  c = d;
  this.command.tempNewCreatedGalleryId = d.Library.Galleries[0].ItemKey;
  this.command.tempLastSelectedGalleryId = d.Library.Galleries[0].GalleryId;
  c.GalleryName = this.command.tempNewCreatedGalleryId;
  c.GalleryID = this.command.tempLastSelectedGalleryId;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_SUCCESS, c))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.moveExistingItemsToGalleryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addItemsToGalleryError = function(a) {
  this.app.sendNotification(this.app.events.MOVE_ADD_ITEM_TO_EXISTING_GALLERY_FAILED)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addItemsToGallerySuccess = function(h) {
  var d = "";
  var a = "Save to Gallery";
  if (this.app.getModel().selectedImageObject.Source == "ProductPage") {
    d = "Product Page Add - Completed"
  } else {
    if (this.app.getModel().selectedImageObject.Source == "GalleryPage") {
      d = "Gallery Page Add - Completed"
    } else {
      if (this.app.getModel().selectedImageObject.Source == "ServicesPage") {
        d = "Services Page Add - Completed"
      } else {
        if (this.app.getModel().selectedImageObject.Source == "FramingStudioPage") {
          d = "Framing Studio Page Add - Completed"
        }
      }
    }
  }
  if (d != "") {
    mygalleriesGA.trackEventWithCategory(a, d)
  }
  var e = [{}];
  e = h;
  this.command.tempNewCreatedGalleryId = h.Library.Galleries[0].ItemKey;
  this.command.tempLastSelectedGalleryId = h.Library.Galleries[0].GalleryId;
  e.GalleryName = this.command.tempNewCreatedGalleryId;
  e.GalleryID = this.command.tempLastSelectedGalleryId;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_SUCCESS, e));
  var c = this.app.getModel();
  var f = "galid=" + h.Library.Galleries[0].GalleryId;
  f = f + "&customerZoneId=" + c.environment.customerZoneId + "&languageId=" + c.environment.languageId + "&currencyId=" + c.environment.currencyId + "&currencyCode=" + c.environment.currencyCode;
  this.command.serviceProvider.galleryAPIService.callAccountProxy({
    command: this.command,
    app: this.app,
    successHandler: this.command.loginMyAccountSuccessTest,
    errorHandler: this.command.loginMyAccountErrorTest,
    beforeSendHandler: function() {}
  },
  f)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addItemsToDefaultGallerySuccess = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.addItemsToDefaultGalleryError = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.addItemsToGalleryError = function(a) {
  this.app.sendNotification(this.app.events.ADD_ITEM_TO_EXISTING_GALLERY_FAILED)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailPageAddItemsToGallerySuccess = function(f) {
  var c = "";
  var a = "Save to Gallery";
  if (this.app.getModel().selectedImageObject.Source == "ProductPage") {
    c = "Product Page Add - Completed"
  } else {
    if (this.app.getModel().selectedImageObject.Source == "GalleryPage") {
      c = "Gallery Page Add - Completed"
    } else {
      if (this.app.getModel().selectedImageObject.Source == "ServicesPage") {
        c = "Services Page Add - Completed"
      } else {
        if (this.app.getModel().selectedImageObject.Source == "FramingStudioPage") {
          c = "Framing Studio Page Add - Completed"
        }
      }
    }
  }
  if (c != "") {
    mygalleriesGA.trackEventWithCategory(a, c)
  }
  var d = [{}];
  d = f;
  this.command.tempNewCreatedGalleryId = f.Library.Galleries[0].ItemKey;
  this.command.tempLastSelectedGalleryId = f.Library.Galleries[0].GalleryId;
  d.GalleryName = this.command.tempNewCreatedGalleryId;
  d.GalleryID = this.command.tempLastSelectedGalleryId;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_SUCCESS, d));
  var e = "galid=" + f.Library.Galleries[0].GalleryId;
  e = e + "&customerZoneId=" + data.environment.customerZoneId + "&languageId=" + data.environment.languageId + "&currencyId=" + data.environment.currencyId + "&currencyCode=" + data.environment.currencyCode;
  this.command.serviceProvider.galleryAPIService.callAccountProxy({
    command: this.command,
    app: this.app,
    successHandler: this.command.loginMyAccountSuccessTest,
    errorHandler: this.command.loginMyAccountErrorTest,
    beforeSendHandler: function() {}
  },
  e)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailPageAddItemsToGalleryError = function(a) {
  this.app.sendNotification(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_FAILED)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailpageaddItemsToGallerySuccess = function(f) {
  var c = "";
  var a = "Save to Gallery";
  if (this.app.getModel().selectedImageObject.Source == "ProductPage") {
    c = "Product Page Add - Completed"
  } else {
    if (this.app.getModel().selectedImageObject.Source == "GalleryPage") {
      c = "Gallery Page Add - Completed"
    } else {
      if (this.app.getModel().selectedImageObject.Source == "ServicesPage") {
        c = "Services Page Add - Completed"
      } else {
        if (this.app.getModel().selectedImageObject.Source == "FramingStudioPage") {
          c = "Framing Studio Page Add - Completed"
        }
      }
    }
  }
  if (c != "") {
    mygalleriesGA.trackEventWithCategory(a, c)
  }
  var d = [{}];
  d = f;
  this.command.tempNewCreatedGalleryId = f.Library.Galleries[0].ItemKey;
  this.command.tempLastSelectedGalleryId = f.Library.Galleries[0].GalleryId;
  d.GalleryName = this.command.tempNewCreatedGalleryId;
  d.GalleryID = this.command.tempLastSelectedGalleryId;
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_SUCCESS, d));
  var e = "galid=" + f.Library.Galleries[0].GalleryId;
  e = e + "&customerZoneId=" + data.environment.customerZoneId + "&languageId=" + data.environment.languageId + "&currencyId=" + data.environment.currencyId + "&currencyCode=" + data.environment.currencyCode;
  this.command.serviceProvider.galleryAPIService.callAccountProxy({
    command: this.command,
    app: this.app,
    successHandler: this.command.loginMyAccountSuccessTest,
    errorHandler: this.command.loginMyAccountErrorTest,
    beforeSendHandler: function() {}
  },
  e)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.detailpageaddItemsToGalleryError = function(a) {
  this.app.sendNotification(this.app.events.ADD_ITEM_TO_NEW_GALLERY_DP_FAILED)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateGallerySuccess = function(c) {
  var a = c.Library.Galleries;
  this.app.getModel().setCookieGalleryIDCountCookie(c.Library.Galleries[0].ItemKey);
  this.app.getModel().setLastSelectedGalleryKey(c.Library.Galleries[0].ItemKey);
  this.app.getModel().setLastSelectedGalleryName(c.Library.Galleries[0].Name);
  if (this.app.getModel().isRoomView) {
    location.href += "";
    return
  }
  location.href = "http://" + location.host + a[0].VanityURL;
  this.app.getModel().setSelectedGalleryTitle(this.command.currentNote.body.title);
  this.app.getModel().setSelectedGalleryDesc(this.command.currentNote.body.desc);
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_GALLERY_TITLE_DESC_SUCCESS, c))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateGalleryError = function(a) {
  this.app.sendNotification(this.app.events.UPDATE_GALLERY_TITLE_DESC_FAILED, a)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addGallerySuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_GALLERY_TITLE_DESC_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addGalleryError = function(a) {
  this.app.sendNotification(this.app.events.ADD_GALLERY_TITLE_DESC_FAILED)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getGalleryWithItemsSuccess = function(c) {
  var a = this;
  if (c.Library == null && c.Library.Galleries == null && c.Library.Galleries[0] == undefined) {
    throw new Error("ApplicationCommand.getGalleryWithItemsSuccess failed! response.Library.Galleries is undefined.")
  } else {
    if (!this.app.getModel().savetogalleryoption) {
      this.app.getModel().flattenGalleryItemDetails(c.Library.Galleries[0].Items);
      this.app.getModel().galleryItemList = c.Library.Galleries[0].Items;
      this.processing = false
    } else {
      this.app.getModel().setGalleryItems(c.Library.Galleries[0].Items);
      this.app.getUserLibraryProxy().flatten(c.Library.Galleries[0].Walls);
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERY_ITEMS_SUCCESS, this.command.currentNote.body));
      this.processing = false
    }
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getGalleryWithItemsError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERY_ITEMS_FAILED, error, "ajax"));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.galleryItemSortSuccess = function(c) {
  var a = c.Library.Galleries[0].Items;
  this.app.getModel().flattenGalleryItemDetails(a);
  this.app.getModel().galleryItemList = [];
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GALLERY_ITEM_SORT_SUCCESS, {
    items: a
  },
  ""));
  this.command.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.galleryItemSortError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GALLERY_ITEM_LIST_REQUEST_FAILED, error, "ajax"));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getSystemLibrarySuccess = function(a) {
  if (a.Library != null) {
    this.app.getUserLibraryProxy().setSystemLibrary(a.Library);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_SYSTEM_LIBRARY_SUCCESS, {},
    "ajax"))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_SYSTEM_LIBRARY_FAILED, {},
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getSystemLibraryError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_SYSTEM_LIBRARY_FAILED, {},
  "ajax"))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserGalleriesSuccess = function(d) {
  var a = this;
  if (d.Library == null || d.Library.Galleries.length == 0) {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_FAILED))
  } else {
    var c = this.app.getModel().filterGalleries(d.Library.Galleries);
    this.app.getModel().setGalleryList(c);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_SUCCESS));
    this.processing = false
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserGalleriesError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_FAILED, error, "ajax"));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserGalleriesSuccessForWebUser = function(d) {
  var a = this;
  if (d.Library == null || d.Library.Galleries.length == 0) {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_FAILED_FOR_WEBUSER, {
      fromGridModule: this.command.fromGridModule
    }))
  } else {
    var c = this.app.getModel().filterGalleries(d.Library.Galleries);
    this.app.getModel().setGalleryListForWebUser(c);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_SUCCESS_FOR_WEBUSER, {
      fromGridModule: this.command.fromGridModule
    }));
    this.processing = false
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserGalleriesErrorForWebUser = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_ALL_GALLERIES_FAILED_FOR_WEBUSER, error, "ajax"));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.createWallSuccess = function(c) {
  if (c.Library) {
    var d = c.Library.Galleries[0].Walls[0];
    var a = this.app.getUserLibraryProxy().selectedWallName.indexOf("hex") > -1 ? this.app.getUserLibraryProxy().selectedWallGalleryName: this.app.getUserLibraryProxy().selectedWallName;
    d.WallDetails.Name = a;
    this.app.getUserLibraryProxy().wallsObject.push(d);
    this.app.getUserLibraryProxy().flatten(this.app.getUserLibraryProxy().wallsObject);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.CREATE_WALL_SUCCESS))
  } else {
    throw new Error("ApplicationCommand createWallSuccess Error! Response does not have wallid.")
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.createWallError = function(a) {
  this.sendNotification(new com.art.core.utils.Note(this.app.events.CREATE_WALL_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateWallItemsSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_WALL_ITEMS_SUCCESS));
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALLS))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateWallItemsError = function(a) {
  this.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_WALL_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.searchSimilarArtistSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_SIMILAR_ARTIST_ITEM_SUCCESS, a));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.searchSimilarArtistError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_SIMILAR_ARTIST_ITEM_FAILED, "ajax"));
  this.processing = false
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallsSuccess = function(a) {
  if (a.Library) {
    this.app.getUserLibraryProxy().setLastUpdatedWall(a.Library.Walls);
    this.app.getUserLibraryProxy().wallsObject = a.Library.Walls;
    if (!this.app.getModel().isEditingSavedRoom) {
      this.app.getUserLibraryProxy().flatten(a.Library.Walls)
    }
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALLS_SUCCESS, {},
    "ajax"))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALLS_SUCCESS, {},
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallsError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALLS_FAILED, {},
  "ajax"))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addBareWallSuccess = function(a) {
  if (a.Library) {
    if (a.Library.BareWallGalleries.length > 0) {
      this.command.setBareWallNamesLibrary(a.Library)
    }
    this.app.getUserLibraryProxy().refreshUserBareWalls(a.Library.BareWallGalleries[0]);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_BARE_WALLS_SUCCESS, {},
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addBareWallError = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserLibrarySuccess = function(a) {
  if (a.Library) {
    if (a.Library.BareWallGalleries.length > 0) {
      this.command.setBareWallNamesLibrary(a.Library)
    }
    this.app.getUserLibraryProxy().userLibraryObject = a.Library;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_USER_LIBRARY_SUCCESS, {},
    "ajax"))
  } else {
    throw new Error("ApplicationCommand.getUserLibrary failed! UserLibrary is null.")
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserLibraryError = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateBareWallSuccess = function(c) {
  if (c != undefined) {
    for (var a = 0; a < this.app.getUserLibraryProxy().userLibraryObject.BareWallGalleries[0].BareWalls.length; a++) {
      var d = this.app.getUserLibraryProxy().userLibraryObject.BareWallGalleries[0].BareWalls[a];
      if (d.BareWallId == c.Library.BareWalls[0].BareWallId) {
        this.command.setBareWallName(c.Library.BareWalls[0]);
        this.app.getUserLibraryProxy().userLibraryObject.BareWallGalleries[0].BareWalls[a] = c.Library.BareWalls[0];
        return
      }
    }
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_BARE_WALL_SUCCESS))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_BARE_WALL_ERROR))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.updateBareWallError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.UPDATE_BARE_WALL_ERROR))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.shareWallSuccess = function(c) {
  if (c.Library.Galleries[0] == undefined) {
    throw new Error("ApplicationCommand.shareWallSuccess failed! Galleries is undefined.")
  }
  var e = MyGalleriesCore.getRoomViewProxy();
  var h = typeof(e.currentWall) != "undefined";
  var f = null;
  if (h) {
    f = e.currentWall.gallery
  } else {
    f = _this.app.getModel().cacheByGalleryList[_this.app.getModel().environmentSub.selectedGalleryID]
  }
  var d = new com.art.myGalleries.vos.ShareRequestVO();
  d.viewMode = this.app.constants.ROOM_VIEW;
  d.title = f.Name;
  d.additionalArgs = f.ItemCount;
  d.imageURL = c.SharedItemImageURL.MediumImage.HttpImageURL;
  var a = "";
  if (h) {
    a = e.currentWall.bareWall.roomType == "hex" ? "/" + e.currentWall.name: ""
  } else {
    a = this.app.getUserLibraryProxy().selectedWallName.indexOf("hex") > -1 ? "/" + this.app.getUserLibraryProxy().selectedWallName: ""
  }
  if (h) {
    d.galleryURL = "http://" + window.location.host + c.Library.Galleries[0].VanityURL + "room/" + e.currentWall.key + "/?mode=view&type=" + e.currentWall.saveType
  } else {
    d.galleryURL = "http://" + window.location.host + c.Library.Galleries[0].VanityURL + "?viewmode=" + this.app.constants.ROOM_VIEW + "/" + c.Library.Galleries[0].Walls[0].WallId + a
  }
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.SHARE_ACTION_SUCCESS, {
    rvo: d
  }))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallByIdSuccess = function(a) {
  if (a.Library) {
    this.app.getUserLibraryProxy().wallsObject = a.Library.Galleries[0].Walls;
    this.app.getUserLibraryProxy().flatten(a.Library.Galleries[0].Walls);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALL_BY_ID_SUCCESS, {},
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallByIdError = function(a) {
  throw new Error("ApplicationCommand.getWallByIdError bad response.")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallByProfileKeySuccess = function(a) {
  if (a.Library) {
    this.app.getUserLibraryProxy().savedWallsObject = a.Library.Galleries[0].Walls;
    this.app.getUserLibraryProxy().flatten(a.Library.Galleries[0].Walls);
    this.app.getModel().setGalleryItems(a.Library.Galleries[0].Walls[0].WallItems);
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_WALL_BY_PROFILE_KEY_SUCCESS, {
      response: a
    },
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getWallByProfileKeyError = function(a) {
  throw new Error("ApplicationCommand.getWallByProfileKeyError bad response.")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserLibraryByProfileKeySuccess = function(a) {
  if (a.Library) {
    if (a.Library.BareWallGalleries.length > 0) {
      this.command.setBareWallNamesLibrary(a.Library)
    }
    this.command.setBareWallNames(a.Library);
    this.app.getUserLibraryProxy().userLibraryObject = a.Library;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_USER_LIBRARY_BY_PROFILE_SUCCESS, {},
    "ajax"))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getUserLibraryByProfileKeyError = function(a) {
  throw new Error("ApplicationCommand.getUserLibraryByProfileKeyError bad response.")
};
com.art.myGalleries.commands.ApplicationCommand.prototype.setBareWallNamesLibrary = function(c) {
  if (c.BareWallGalleries == undefined || c.BareWallGalleries[0] == undefined || c.BareWallGalleries[0].BareWalls == undefined) {
    throw new Error("ApplicationCommand.setBareWallNames failed! BareWallGalleries is undefined.")
  }
  var a = c.BareWallGalleries[0].BareWalls;
  this.setBareWallNames(a)
};
com.art.myGalleries.commands.ApplicationCommand.prototype.setBareWallNames = function(a) {
  for (var c = 0; c < a.length; c++) {
    this.setBareWallName(a[c])
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.setBareWallName = function(a) {
  if (a.Name == undefined) {
    throw new Error("ApplicationCommand.setBareWallName failed! Name property is undefined.")
  }
  if (a.Name.indexOf(this.app.getUserLibraryProxy().userBareWallNamePrefix) == -1) {
    a.Name = this.app.getUserLibraryProxy().userBareWallNamePrefix + a.BareWallId
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getFrameIdForDFESuccess = function(c) {
  if (c != null && c.trim().length > 1) {
    var a = this.app.getModel().cacheByGalleryItemList[this.app.getModel().selectedItemId].APNum;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_FRAME_ID_SUCCESS, {
      frameid: c,
      apNum: a
    }))
  } else {
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_FRAME_ID_FAILED, {}))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addGalleryToBookmarkSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_GALLERY_TO_BOOKMARK_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addGalleryToBookmarkError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_GALLERY_TO_BOOKMARK_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeGalleryFromBookmarkSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_GALLERY_FROM_BOOKMARK_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeGalleryFromBookmarkError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_GALLERY_FROM_BOOKMARK_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addRoomToBookmarkSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ROOM_TO_BOOKMARK_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addRoomToBookmarkError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_ROOM_TO_BOOKMARK_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeRoomFromBookmarkSuccess = function(a) {
  trace("REMOVE_ROOM_TO_BOOKMARK_SUCCESS");
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_ROOM_FROM_BOOKMARK_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeRoomFromBookmarkError = function(a) {
  trace("REMOVE_ROOM_TO_BOOKMARK_ERROR");
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_ROOM_FROM_BOOKMARK_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addFollowProfileSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_FOLLOW_PROFILE_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.addFollowProfileError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.ADD_FOLLOW_PROFILE_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeFollowProfileSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_FOLLOW_PROFILE_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.removeFollowProfileError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REMOVE_FOLLOW_PROFILE_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.saveRoomSuccess = function(a) {
  if (a.OperationResponse.ResponseMessage != "Success") {
    MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_ERROR, {
      message: a.OperationResponse.ResponseMessage
    }))
  } else {
    var c = a.Library.Galleries[0].Walls[0].VanityURL;
    if (c != "") {
      c += "?mode=edit&type=user";
      window.location = c
    }
    MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_SUCCESS, {}))
  }
};
com.art.myGalleries.commands.ApplicationCommand.prototype.saveRoomError = function(a) {
  MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_ERROR, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.saveExistingRoomSuccess = function(c, a) {
  var d = c.Library.Galleries[0].Walls[0].VanityURL;
  if (d != "") {
    if (a) {
      if (d.indexOf("?") > -1) {
        d += "&mode=" + a
      } else {
        d += "?mode=" + a
      }
      d += "&type=user"
    } else {
      d += "?mode=edit&type=user"
    }
    window.location = d
  }
  MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_SUCCESS, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.saveExistingRoomError = function(a) {
  MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.SAVE_ROOM_ERROR, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getFrameIdForDFEError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_FRAME_ID_FAILED, {}))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getProductInfoSuccess = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_PRODUCT_INFO_SUCCESS, a))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getProductInfoError = function(a) {
  this.app.sendNotification(new com.art.core.utils.Note(this.app.events.GET_PRODUCT_INFO_FAILED))
};
com.art.myGalleries.commands.ApplicationCommand.prototype.getProductInfoBeforeSend = function(a) {};
com.art.myGalleries.commands.ApplicationCommand.prototype.shareGalleryItemSuccess = function(a) {
  if (a.Library.Galleries[0] == undefined) {
    throw new Error("ApplicationCommand.shareGalleryItemSuccess failed! Galleries is undefined.")
  }
  var d = null;
  d = this.app.getModel().cacheByGalleryList[this.app.getModel().environmentSub.selectedGalleryID];
  var c = new com.art.myGalleries.vos.ShareRequestVO();
  c.viewMode = this.app.getModel().currentViewMode;
  c.shareType = this.app.getModel().shareType;
  c.title = d.Name;
  c.additionalArgs = d.ItemCount;
  if (a.OperationResponse.ResponseMessage == "Success") {
    c.imageURL = a.SharedItemImageURL.MediumImage.HttpImageURL;
    c.galleryURL = "http://" + window.location.host + a.SharedOGURL + "&viewmode=" + this.app.getModel().currentViewMode;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.SHARE_REQUEST, c))
  } else {
    c.imageURL = d.GalleryIconURL;
    c.galleryURL = window.location.href + "?viewmode=" + this.app.getModel().currentViewMode;
    this.app.sendNotification(new com.art.core.utils.Note(this.app.events.SHARE_REQUEST, c))
  }
  this.app.getModel().shareRequestObject = c;
  this.app.getModel().shareRequestFlag = true
};
com.art.myGalleries.commands.ApplicationCommand.prototype.shareGalleryItemError = function(a) {};
com.art.myGalleries.commands.ShareCommand = function(c, a) {
  this.data = c;
  this.app = a
};
com.art.myGalleries.commands.ShareCommand.prototype.init = function() {};
com.art.myGalleries.commands.ShareCommand.prototype.listNotificationInterests = function() {
  return []
};
com.art.myGalleries.commands.ShareCommand.prototype.handleNotification = function(a) {
  switch (a.name) {
  default:
    throw new Error("ShareCommand Failure! Unrecognized note.name")
  }
};
com.art.myGalleries.components.MenuContainerComponent = function(a) {
  this.id = "MenuContainerComponent";
  this.data;
  this.LOGIN_CLICK = com.art.myGalleries.components.MenuContainerComponent.LOGIN_CLICK;
  this.REGISTER_CLICK = com.art.myGalleries.components.MenuContainerComponent.REGISTER_CLICK;
  this.imagePath = a;
  this.callbacks = {}
};
com.art.myGalleries.components.MenuContainerComponent.LOGIN_CLICK = "loginClick";
com.art.myGalleries.components.MenuContainerComponent.REGISTER_CLICK = "registerClick";
com.art.myGalleries.components.MenuContainerComponent.prototype.init = function() {
  var a = this
};
com.art.myGalleries.components.MenuContainerComponent.prototype.render = function() {
  this.init();
  return this.getTemplate()
};
com.art.myGalleries.components.MenuContainerComponent.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.myGalleries.components.MenuContainerComponent.prototype.registerEvents = function() {
  var a = this;
  $("#loginTray").click(function() {
    a.callbacks[com.art.myGalleries.components.MenuContainerComponent.LOGIN_CLICK]()
  });
  $("#registerTray").click(function() {
    a.callbacks[com.art.myGalleries.components.MenuContainerComponent.REGISTER_CLICK]()
  });
  $("#loginTray, #registerTray, #lastGalleryName").hover(function() {
    $(this).addClass("loginhover")
  },
  function() {
    $(this).removeClass("loginhover")
  })
};
com.art.myGalleries.components.MenuContainerComponent.prototype.getTemplate = function() {
  var a = this.template;
  a = a.replace("$ID", this.id);
  a = a.replace(/\[IMAGE_DOMAIN\]/gi, this.imagePath);
  a = a.replace("$HEADER", MyGalleriesCore.getString("View My Galleries"));
  a = a.replace("$LOGIN", MyGalleriesCore.getString("Log In"));
  a = a.replace("$SIGNUP", MyGalleriesCore.getString("Sign Up"));
  a = a.replace("$TXT", MyGalleriesCore.getString("to collect and share art."));
  return a
};
com.art.myGalleries.components.MenuContainerComponent.prototype.template = "<div id='$ID' class='tray_container'><div class='tray'><div class='galleryBadge gCustomFont'></div><div class='MenuContainerComponent_TopRow'><div class='MyGalleriesTrayModuleTopRowLeft'><img src='[IMAGE_DOMAIN]/images/mygallery/trayLogo.gif'></div><div class='MyGalleriesTrayModuleTabClose'></div></div><div class='clear'></div><div class='tray_subSection'><div class='labelSaveSuccess'><span class='labelTrayCount'></span></div><span id='lastGalleryName' name='lastGalleryName' class='lastGalleryName gCustomFont uCase'></span></div>			<div class='viewGalleryButton gCustomFont cPointer'>$HEADER</div></div><div class='tray_login'><span id ='loginTray' class='login'>$LOGIN</span> or <span id ='registerTray' class='login'>$SIGNUP</span><br />$TXT</div></div>";
com.art.myGalleries.components.SaveMenuContainer = function(a) {
  this.init();
  if (a == null || a == undefined) {
    return false
  }
  this.id = a.id;
  this.modal = a;
  this.data;
  this.selectedGalleryId;
  this.RECENTLYSAVEDGALLERY_CLICKED = com.art.myGalleries.components.SaveMenuContainer.RECENTLYSAVEDGALLERY_CLICKED;
  this.GALLERIES_CLICKED = com.art.myGalleries.components.SaveMenuContainer.GALLERIES_CLICKED;
  this.NEW_GALLERY_CLICKED = com.art.myGalleries.components.SaveMenuContainer.NEW_GALLERY_CLICKED;
  this.callbacks = {}
};
com.art.myGalleries.components.SaveMenuContainer.RECENTLYSAVEDGALLERY_CLICKED = "recentlysavedgalleryclicked";
com.art.myGalleries.components.SaveMenuContainer.GALLERIES_CLICKED = "galleriesclicked";
com.art.myGalleries.components.SaveMenuContainer.NEW_GALLERY_CLICKED = "newgalleryclicked";
com.art.myGalleries.components.SaveMenuContainer.prototype.init = function() {
  var a = this
};
com.art.myGalleries.components.SaveMenuContainer.prototype.render = function() {
  return this.getTemplate()
};
com.art.myGalleries.components.SaveMenuContainer.prototype.position = function() {
  var a = this;
  $("#" + a.id).css("left", MyGalleriesCore.getModel().saveMenuPosition.left + "px");
  $("#" + a.id).css("top", (MyGalleriesCore.getModel().saveMenuPosition.top - 35) + "px")
};
com.art.myGalleries.components.SaveMenuContainer.prototype.renderGalleriesList = function() {
  var d = "",
  c = "";
  if (this.modal.galleryList.length > 0) {
    for (var a = 0; a < this.modal.galleryList.length; a++) {
      if (this.modal.galleryList[a].Permissions != 50) {
        galleryName = com.art.core.utils.StringUtil.autoEllipseText(this.modal.galleryList[a].Name, 15);
        d += '<li class="drpDownLstItemSaveMenu" id="' + this.modal.galleryList[a].GalleryId + '">' + unescape(galleryName) + "</li>"
      }
    }
    c = '<ul id="drpDownLstGalleryForSaveMenu" class="drpDownLstGalleryForSaveMenu hidden">' + d + "</ul>"
  }
  $(".allMyGalleiresListContainer").html(c)
};
com.art.myGalleries.components.SaveMenuContainer.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.myGalleries.components.SaveMenuContainer.prototype.registerEvents = function() {
  var a = this;
  $(".newGalleryMenu, .lastSavedGalleryMenu, .allMyGalleiresTextContainer, .drpDownLstGalleryForSaveMenu li").live("mouseenter",
  function() {
    $(this).addClass("saveMenuHover")
  });
  $(".newGalleryMenu, .lastSavedGalleryMenu, .allMyGalleiresTextContainer,.drpDownLstGalleryForSaveMenu li").live("mouseleave",
  function() {
    $(this).removeClass("saveMenuHover")
  });
  $(".newGalleryMenu").live("click",
  function() {
    $("#" + a.id).die("click");
    $("#" + a.id).unbind("click");
    $("#" + a.id).remove();
    if (a.callbacks[a.NEW_GALLERY_CLICKED] != undefined) {
      a.callbacks[a.NEW_GALLERY_CLICKED]()
    }
  });
  $(".allMyGalleiresTextContainer").click(function() {
    $(".allMyGalleiresText").removeClass("allMyGalleiresTextHover");
    $(".drpDownLstGalleryForSaveMenu").slideToggle("slow",
    function() {
      $(".allMyGalleiresText").addClass("allMyGalleiresTextHover")
    })
  });
  if (isiOSDevice()) {
    $(document).on("touchstart",
    function(c) {
      if (!$(c.target).closest(".SaveMenuContainer").length && c.target.className != "SaveMenuContainer") {
        $(".lastSavedGalleryMenu").die("click");
        $(".lastSavedGalleryMenu").unbind("click");
        $(".drpDownLstGalleryForSaveMenu li").die("click");
        $(".drpDownLstGalleryForSaveMenu li").unbind("click");
        $("#" + a.id).die("click");
        $("#" + a.id).unbind("click");
        $("#" + a.id).remove()
      }
    })
  } else {
    $(document).click(function(c) {
      if (!$(c.target).hasClass("allMyGalleiresTextContainer") && !$(c.target).hasClass("allMyGalleiresText") && !$(c.target).hasClass("nav-down-arrow") && MyGalleriesCore.getModel().saveMenuSourceClick != c.target.id && !$(c.target).hasClass("mygalmoveoptioncommon")) {
        $(".lastSavedGalleryMenu").die("click");
        $(".lastSavedGalleryMenu").unbind("click");
        $(".drpDownLstGalleryForSaveMenu li").die("click");
        $(".drpDownLstGalleryForSaveMenu li").unbind("click");
        $("#" + a.id).die("click");
        $("#" + a.id).unbind("click");
        $("#" + a.id).remove()
      }
    })
  }
  $(".lastSavedGalleryMenu").live("click",
  function() {
    if (a.callbacks[a.RECENTLYSAVEDGALLERY_CLICKED] != undefined) {
      a.callbacks[a.RECENTLYSAVEDGALLERY_CLICKED]()
    }
  });
  $(".drpDownLstGalleryForSaveMenu li").live("click",
  function() {
    a.selectedGalleryId = $(this).attr("id");
    if (a.callbacks[a.GALLERIES_CLICKED] != undefined) {
      a.callbacks[a.GALLERIES_CLICKED]()
    }
  })
};
com.art.myGalleries.components.SaveMenuContainer.prototype.GetGalleryID = function() {
  if (this.selectedGalleryId != "" && this.selectedGalleryId != undefined) {
    return this.selectedGalleryId
  }
};
com.art.myGalleries.components.SaveMenuContainer.prototype.getTemplate = function() {
  var a = this.template;
  a = a.replace("$ID", this.id);
  a = a.replace("$New", MyGalleriesCore.getString("New Gallery..."));
  a = a.replace("$All", MyGalleriesCore.getString("All My Galleries"));
  a = a.replace("$Login", MyGalleriesCore.getString("Login to see existing galleries"));
  return a
};
com.art.myGalleries.components.SaveMenuContainer.prototype.template = "<div id='$ID' class='SaveMenuContainer'><div class='SaveMenuMarginTop'></div><div class='newGalleryMenu'>$New</div><div class='SaveMenuMarginTop'></div><div class='SaveMenuLine'></div><div class='lastSaveMenuGap SaveMenuMarginTop hidden'></div><div class='lastSavedGalleryMenu hidden'></div><div class='lastSaveMenuGap SaveMenuMarginTop hidden'></div><div class='lastSavedMenuLine SaveMenuLine hidden'></div><div class='allMyGalleriesSaveMenuMarginTop SaveMenuMarginTop hidden'></div><div class='allMyGalleriesContainer hidden'>   <div class='allMyGalleiresTextContainer'>       <span class='allMyGalleiresText'>$All</span>       <span class='nav-down-arrow nav-sprite'></span>   </div>   <div class='clear'></div>   <div class='allMyGalleiresListContainer'></div></div><div class='allMyGalleriesSaveMenuMarginTop SaveMenuMarginTop hidden'></div><div class='allMyGalleriesSaveMenuLine SaveMenuLine hidden'></div><div class='loginSaveMenuGap SaveMenuMarginTop'></div><div class='loginSaveGalleryMenuText'>$Login</div><div class='loginSaveMenuGap SaveMenuMarginTop'></div></div>";
com.art.myGalleries.vos.RequestVO = function(a) {
  this.properties = a;
  this.NAME = com.art.myGalleries.vos.RequestVO.NAME;
  this.sessionid = false;
  this.authToken = false;
  this.apiKey = false;
  this.accountid = false;
  this.pageNumber = -1
};
com.art.myGalleries.vos.RequestVO.NAME = "RequestVO";
com.art.myGalleries.vos.RequestVO.prototype.init = function(e, c, a, d) {
  this.pageNumber = d
};
com.art.myGalleries.vos.GalleryItemVO = function(a) {
  if (a == undefined) {
    return
  }
  this.ItemId = a.ItemGalleryItemID;
  this.ItemStatus = a.ItemDetails.ItemStatus || 0;
  this.AvailableInOtherSizes = a.AvailableInOtherSizes || false;
  this.APNum = a.ItemDetails.APNum || "";
  this.ItemDisplayedType = a.ItemDetails.ItemDisplayType || "";
  this.Imageid = a.ItemDetails.ImageId || "";
  if (a.FrameSku && a.FrameSku != "") {
    this.FrameSku = a.FrameSku || ""
  }
  this.Sku = a.ItemDetails.Sku || "";
  this.Title = a.ItemDetails.Title || "";
  this.ArtistName = a.ItemDetails.Artist.FirstName || "";
  this.ArtistUrl = "";
  this.ImageUrl = "";
  this.Height = a.ItemDetails.ImageInformation.LargeImage.Dimensions.Height;
  this.Width = a.ItemDetails.ImageInformation.LargeImage.Dimensions.Width;
  this.PhysicalDimensionHeight = a.ItemDetails.PhysicalDimensions.Height;
  this.PhysicalDimensionWidth = a.ItemDetails.PhysicalDimensions.Width;
  this.Price = a.ItemDetails.ItemPrice.DisplayPrice;
  this.DisplayMSRP = a.ItemDetails.ItemPrice.DisplayMSRP;
  this.MarkDownPrice = a.ItemDetails.ItemPrice.MarkDownPrice;
  this.ShowMarkDownPrice = a.ItemDetails.ItemPrice.ShowMarkDownPrice;
  this.CanFrame = a.ItemDetails.ServiceFlags.CanFrame || false;
  this.AppendShadow = a.ItemDetails.AppendShadow;
  this.DateCreated = a.DateCreated;
  this.DateCreated = a.DateUpdated;
  this.ZoomUrl = "";
  this.CropperUrl = "";
  this.AddToCartUrl = "";
  this.ProductPageUrl = "";
  this.PODConfigID = a.PODConfigID || 0;
  this.VanityURL = a.VanityURL || "";
  this.ItemDetails = a.ItemDetails || null;
  if (a.SpecialHandlingID != null && a.SpecialHandlingID != undefined) {
    this.SpecialHandlingID = a.SpecialHandlingID
  }
};
com.art.myGalleries.vos.GalleryVO = function(a) {
  this.GalleryId = a.GalleryId;
  this.Name = a.Name;
  this.ShortDescription = a.ShortDescription;
  this.LongDescription = a.LongDescription;
  this.Visibility = a.Visibility;
  this.GalleryItems = a.GalleryItems;
  this.WallImages = a.WallImages;
  this.DateCreated = a.DateCreated;
  this.DateModified = a.DateModified;
  this.galleryItemCount = a.GalleryItemCount;
  this.LastGalleryImageUrl = a.LastGalleryImageUrl
};
com.art.myGalleries.vos.ShareRequestVO = function(h, e, f, c, d, a) {
  this.viewMode = h;
  this.shareType = e;
  this.title = f;
  this.imageURL = c;
  this.galleryURL = d;
  this.additionalArgs = a
};
com.art.myGalleries.vos.WallItemVO = function(a, e, f, c, d) {
  this.Item = {
    ItemGalleryItemID: a
  };
  this.ProductCenterPositionX = e;
  this.ProductCenterPositionY = f;
  this.ProductTargetAreaPosX = c;
  this.ProductTargetAreaPosY = d
};
com.art.myGalleries.components.CommonComponent = function(n, e, s, m, h, l, f, q, d, c, o, r, a, p, k) {
  this.init();
  this.id = n;
  this.contentTitle = e;
  this.width = s;
  this.height = m;
  this.galleryList = k;
  this.galleryId = h;
  this.galleryTitle = l;
  this.galleryDesc = f;
  this.privacy = q;
  this.contentName = d;
  this.content = c;
  this.imageURL = o;
  this.skuName = r;
  this.artistName = a;
  this.price = p;
  this.data;
  this.UPDATE_GALLERY_TITLE = com.art.myGalleries.components.CommonComponent.UPDATE_GALLERY_TITLE;
  this.NEW_GALLERY_SUBMIT = com.art.myGalleries.components.SaveMenuContainer.NEW_GALLERY_SUBMIT;
  this.callbacks = {}
};
com.art.myGalleries.components.CommonComponent.NAME = "CommonComponent";
com.art.myGalleries.components.CommonComponent.CLICK = "click";
com.art.myGalleries.components.CommonComponent.UPDATE_GALLERY_TITLE = "CommonComponentUpdateGalleryTitle";
com.art.myGalleries.components.CommonComponent.prototype.render = function() {
  return this.getTemplate()
};
com.art.myGalleries.components.CommonComponent.prototype.setData = function(a) {
  $(".modalGallerytxtTitle").val(a)
};
com.art.myGalleries.components.CommonComponent.prototype.setBannerValue = function(a) {
  $(".modalGalleryBanner").val(a)
};
com.art.myGalleries.components.CommonComponent.prototype.registerCallback = function(c, a) {
  this.callbacks[c] = a
};
com.art.myGalleries.components.CommonComponent.prototype.registerEvents = function() {
  var a = this;
  if (this.galleryTitle == "Enter Title") {
    $("input:text").css("color", "#666666")
  }
  if (this.galleryDesc == "Enter a Description (optional)") {
    $("textarea:#editGalleryTitle_txtDesc").css("color", "#666666")
  }
  var c = "#" + this.id + "_rdGallery";
  var d = "#" + this.id + "_txtNewGallery";
  $("input:radio").change(function() {
    if ($("input[@name='" + c + "']:checked").val() == "Existing") {
      $(d).val("");
      $(d).attr("disabled", true);
      $("#txtExistingDrpDownGallery").live("click",
      function() {
        $("#drpDownLstGallery").css("visibility", "visible")
      });
      $(".ExistingGalleryLI").live("click",
      function() {
        $("#drpdownSelection").text($("#drpdownSelection").text().replace(($("#drpdownSelection").text()), ($(this).attr("id"))));
        $("#drpDownLstGallery").css("visibility", "hidden")
      })
    } else {
      if ($("input[@name='" + c + "']:checked").val() == "New") {
        $("input[@name='" + d + "']:input").removeAttr("disabled");
        $("#drpdownSelection").text($("#drpdownSelection").text().replace(($("#drpdownSelection").text()), "Select Existing Gallery"));
        $("#txtExistingDrpDownGallery").unbind("live");
        $("#txtExistingDrpDownGallery").unbind("click");
        $("#txtExistingDrpDownGallery").unbind("mouseenter");
        $("#txtExistingDrpDownGallery").die();
        $("#drpDownLstGallery").css("visibility", "hidden")
      }
    }
  });
  $("txtExistingDrpDownGallery").live("click",
  function() {
    if ($("input[@name='" + c + "']:checked").val() == "New") {
      $("#drpDownLstGallery").css("visibility", "hidden")
    }
  });
  $("#existingDrpDownGalleries").mouseleave(function() {
    $("#drpDownLstGallery").css("visibility", "hidden")
  });
  $("#existingDrpDownGalleries").mouseenter(function() {
    if ($("input[@name='" + c + "']:checked").val() == "New") {
      $("#drpDownLstGallery").css("visibility", "hidden")
    }
  });
  $("#" + this.id + "_txtTitle").focus(function() {
    $(this).css("color", "#333333");
    $(this).css("background-color", "#fff");
    var e = $(this).val();
    if (e == MyGalleriesCore.getModel().saveDefaultGalleryTitle) {
      $(this).val("")
    }
  });
  $("#" + this.id + "_txtTitle").blur(function() {
    $(this).css("color", "#666666");
    $(this).css("background-color", "#F1F1F1");
    if ($(this).val() == "") {
      $(this).val(MyGalleriesCore.getModel().saveDefaultGalleryTitle)
    }
  });
  $("textarea[maxlength]").keyup(function() {
    var e = parseInt($(this).attr("maxlength"));
    if ($(this).val().length > e) {
      $(this).val($(this).val().substr(0, $(this).attr("maxlength")))
    }
  });
  $("#" + this.id + "_txtDesc").focus(function() {
    $(this).css("color", "#333333");
    $(this).css("background-color", "#fff");
    var e = $(this).val();
    if (e == "" || e == "Enter a Description (optional)") {
      $(this).val("")
    }
  });
  $("#" + this.id + "_txtDesc").blur(function() {
    $(this).css("color", "#666666");
    $(this).css("background-color", "#F1F1F1");
    if ($(this).val() == "") {
      $(this).val("Enter a Description (optional)")
    }
  });
  $("#addNewGallery_txtTitle").keypress(function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      if (a.callbacks[a.NEW_GALLERY_SUBMIT] != undefined) {
        a.callbacks[a.NEW_GALLERY_SUBMIT]()
      }
    }
  })
};
com.art.myGalleries.components.CommonComponent.prototype.existingGalleryEvent = function() {
  _this = this
};
com.art.myGalleries.components.CommonComponent.prototype.validateTitle = function() {
  var a = true;
  if ($("#" + this.id + "_txtTitle").val() == "Enter Title") {
    $("#" + this.id + "_txtTitle").val("")
  }
  if ($("#" + this.id + "_txtDesc").val() == "Enter a Description (optional)") {
    $("#" + this.id + "_txtDesc").val("")
  }
  var c = $("#" + this.id + "_txtTitle").val();
  c = c.trim();
  var d = c.length;
  if (d <= 0) {
    a = false;
    $("#" + this.id + "_txtTitle").css("border", "1px solid red");
    $(".newGalleryErrorMsg").text("");
    $("#showErrorMsgContainer").show();
    $("#showErrorMsg").text("Please provide a unique gallery name.")
  }
  $("#" + this.id + "_txtTitle").keypress(function() {
    $("#" + this.id).css("border", "1px solid #9E9E9E");
    $("#showErrorMsgContainer").hide();
    $("#showErrorMsg").text("")
  });
  return a
};
com.art.myGalleries.components.CommonComponent.prototype.getAddTitleData = function() {
  var d = $("#addGalleryTitle_txtTitle").val();
  d = $.trim(d);
  var c = $("#addGalleryTitle_txtDesc").val();
  c = $.trim(c);
  var a = $("#addGalleryTitle_txtGalleryBanner").val();
  a = $.trim(a);
  return {
    title: d,
    desc: c,
    banner: a
  }
};
com.art.myGalleries.components.CommonComponent.prototype.getEditTitleData = function() {
  var d = $("#editGalleryTitle_txtTitle").val();
  d = $.trim(d);
  var c = $("#editGalleryTitle_txtDesc").val();
  c = $.trim(c);
  var a = "";
  a = $("#editGalleryTitle_txtGalleryBanner").val();
  a = $.trim(a);
  return {
    title: d,
    desc: c,
    bannerUrl: a
  }
};
com.art.myGalleries.components.CommonComponent.prototype.ContinueToMove = function() {};
com.art.myGalleries.components.CommonComponent.prototype.getTemplate = function() {
  var e;
  if (this.id == "editGalleryTitle") {
    if (this.galleryTitle == "") {
      this.galleryTitle = ""
    }
    if (this.galleryDesc == "") {
      this.galleryDesc = MyGalleriesCore.getString("Enter a Description (optional)")
    }
    e = this.editGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$GDESC", this.galleryDesc).replace("$DESCTITLE", MyGalleriesCore.getString("Enter a Description")).replace("$EnterGalleryBannerUrl", MyGalleriesCore.getString("Enter Gallery Banner Url")).replace("$RequiredField", MyGalleriesCore.getString("Required Field"))
  } else {
    if (this.id == "addGalleryTitle") {
      e = this.addGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$EnterGalleryBannerUrl", MyGalleriesCore.getString("Enter Gallery Banner Url")).replace("$RequiredField", MyGalleriesCore.getString("Required Field")).replace("$EnterDescription", MyGalleriesCore.getString("Enter a Description"))
    } else {
      if (this.id == "deleteArtComponent") {
        e = this.deleteArtTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$ARTNAME", this.contentName).replace("$CONTENT", this.content)
      } else {
        if (this.id == "deleteGalleryComponent") {
          e = this.deleteGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$GALLERYNAME", this.contentName).replace("$CONTENT", this.content)
        } else {
          if (this.id == "deleteRoomComponent") {
            e = this.deleteGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$GALLERYNAME", this.contentName).replace("$CONTENT", this.content)
          } else {
            if (this.id == "wishlistMyAccount") {
              e = this.wishlistMyAccountTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$CONTENT", this.content).replace("$TXT", MyGalleriesCore.getString("Wish lists are now called My Galleries. Items saved to your galleries can be organized, compared, viewed in a room, and shared with friends via email or Facebook."))
            } else {
              if (this.id == "moveToGalleryComponent") {
                var a = "<ul class='ExistingGallery' style='background-color:#FFFFFF;font-family:verdana;font-size:11x;'>";
                var f = "";
                for (var d = 0; d < this.galleryList.length; d++) {
                  f += "<li class='ExistingGalleryLI' id='" + this.galleryList[d].galleryName + "'><a href='#'>" + this.galleryList[d].galleryName + "</a></li>"
                }
                a = a + f + "</ul>";
                var c = this.existingGalleryItemsTemplate.replace("$existingListItems", a).replace("$SelectExistingGallery", MyGalleriesCore.getString("Select Existing Gallery"));
                e = this.moveToGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$SKUNAME", this.skuName).replace("$ARTISTNAME", this.artistName).replace("$PRICE", this.price).replace("$EXISTINGITEMSNAME", c).replace("$CONTENT", this.content).replace("$IMAGEURL", this.imageURL).replace("$EXISTINGGALLERY", MyGalleriesCore.getString("Existing Gallery")).replace("$NEWGALLERY", MyGalleriesCore.getString("New Gallery"))
              } else {
                if (this.id == "shareWithoutLoggedIn") {
                  e = this.shareWithoutLoggedInTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$CONTENT", this.content)
                } else {
                  if (this.id == "addNewGallery") {
                    e = this.addNewGalleryTemplate.replace(/\$NAME/g, this.id).replace("$CONTENTTITLE", this.contentTitle).replace("$GTITLE", this.galleryTitle)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return e
};
com.art.myGalleries.components.CommonComponent.prototype.moveToGalleryTemplate = "<div id='$NAME' class='MainMoveToGalleryContainer'><div id='$NAME_LeftModalContainer' class='LeftModalContainer'><div id='$NAME_LeftInnerContainer' class='LeftInnerContainer'><div style='1px solid #B7B7B7;margin-bottom:10px;'><img src='$IMAGEURL' width='160px' style='1px solid red;' height='300px' alt='' title='' /> </div><div><span>SKU Name</span><span>$SKUNAME</span></div><div><span>Artist Name</span><span>$ARTISTNAME</span></div><div><span>Price</span><span>$PRICE</span></div></div></div><div id='$NAME_RightModalContainer' class='RightModalContainer'><div id='$NAME_RightInnerContainer' class='RightInnerContainer'><div id='$NAME_Title' class='MoveToGalleryTitle'>$CONTENTTITLE</div><div id='$NAME_GallerySpliter' class='MovetoGallerySpliter'><div class='MoveToExistingItems'><div style='margin-bottom:10px;'><input type='radio' id='$NAME_rdGallery' name='$NAME_rdGallery' value='Existing' class='radioModal' /><span id='spMsg' class='spRdMsg'>$EXISTINGGALLERY</div>$EXISTINGITEMSNAME</div><div class='MoveToNewItems'><div style='margin-bottom:10px;'><input type='radio' id='$NAME_rdGallery' name='$NAME_rdGallery' value='New' class='radioModal' /><span id='spMsg' class='spRdMsg'>$NEWGALLERY</div><div><input type='text' id='$NAME_txtNewGallery' name='$NAME_txtNewGallery' class='modalGallerytxtTitle' disabled='true' /></div></div></div></div><div style='font-family:verdana;font-size:11px;margin-top:280px;margin-right:30px'>$CONTENT</div></div><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.existingGalleryItemsTemplate = '<div id="existingDrpDownGalleries"><div id="txtExistingDrpDownGallery" style="display:inline-block;float:left;width:175px;height:24px;padding-left:20px;padding-top:6px;color:#FFFFFF;font-size:13px;font-family:arial,sans-serif;background-image:url(http://cache1.artprintimages.com/images/coreimages/core-components-sprites.png); background-position:0px 0px;background-repeat:no-repeat;"><label id="drpdownSelection">$SelectExistingGallery</label></div><div id="txtExistingDrpDownGallery" style="display:inline-block;float:left;height:30px; width:20px;background-image:url(http://cache1.artprintimages.com/images/coreimages/core-components-sprites.png); background-position:-280px 0px;background-repeat:no-repeat;"></div><div id="drpDownLstGallery" style="visibility:hidden;">$existingListItems</div></div>';
com.art.myGalleries.components.CommonComponent.prototype.editGalleryTemplate = "<div id='$NAME'><div id='$NAME_Title'>$CONTENTTITLE<span id='spError' class='ErrorMsg'> *</span></div><div style='float:left;display:none;' class='ErrorMsg dErrorMessage' id='showErrorMsgContainer'><div class='loginModalErrorMsgImg floatLeft'></div><div class='floatLeft galErrorMsg' id='showErrorMsg'></div></div><div style='margin-top:1px;width:222px;padding-bottom: 10px;height:27px;float:left;'><input type='text' id='$NAME_txtTitle' name='$NAME_txtTitle' class='modalGallerytxtTitle' maxlength='25' value='' /></div><div id='$NAME_Title'>$DESCTITLE</div><div style='margin-top:2px;float:left;'><pre><textarea id='$NAME_txtDesc' rows='6' cols='20' class='modalGallerytxtDesc' maxlength='500'>$GDESC</textarea></pre></div><div class='clear'></div><div class='bannerContainerEdit' style='display:none'><div id='$NAME_Title'>$EnterGalleryBannerUrl</div><div style='margin-top:1px;width:222px;padding-bottom: 10px;height:27px;float:left;'><input type='text' id='$NAME_txtGalleryBanner' name='$NAME_txtGalleryBanner' class='modalGalleryBanner' maxlength='150' value='' /></div></div><div class='clear'></div><div style='float:left' class='ErrorMsg'>*<span id='ErrorMsg'>$RequiredField</span></div><br/><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.shareWithoutLoggedInTemplate = "<div id='$NAME' style='margin-left:25px;margin-right:20px;'><div id='$NAME_Title' class='MainModalTitle'>$CONTENTTITLE</div><div id='txtContent' class='MyGalleriesLoginContainer' style='margin-top:10px;'>$CONTENT</div><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.wishlistMyAccountTemplate = "<div id='$NAME' style='margin-left:25px;margin-top:60px;margin-right:20px;'><div id='$NAME_Title' class='MainModalTitle'>$CONTENTTITLE</div><div id='txtContent' class='MyGalleriesLoginContainer' style='margin-top:10px;'>$TXT</div><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.addGalleryTemplate = "<div id='$NAME'><div id='$NAME_Title'>$CONTENTTITLE<span id='spError' class='ErrorMsg'> *</span></div><div style='float:left;display:none;' class='ErrorMsg dErrorMessage' id='showErrorMsgContainer'><div class='loginModalErrorMsgImg floatLeft'></div><div class='floatLeft galErrorMsg' id='showErrorMsg'></div></div><div style='margin-top:1px;width:222px;padding-bottom: 10px;height:27px;'><input type='text' id='$NAME_txtTitle' name='$NAME_txtTitle' class='modalGallerytxtTitle' style='color:#666666;' maxlength='25' value='' /></div><div id='$NAME_Title'>$EnterDescription</div><div style='margin-top:2px;float:left;'><pre><textarea id='$NAME_txtDesc' rows='6' cols='20' class='modalGallerytxtDesc' style='color:#666666;' maxlength='500'></textarea></pre></div><div class='clear'></div><div class='bannerContainer' style='display:none'><div id='$NAME_Title'>$EnterGalleryBannerUrl</div><div style='margin-top:1px;width:222px;padding-bottom: 10px;height:27px;float:left;'><input type='text' id='$NAME_txtGalleryBanner' name='$NAME_txtGalleryBanner' class='modalGalleryBanner' maxlength='150' value='' /></div></div><div class='clear'></div><div style='float:left' class='ErrorMsg'>*<span id='ErrorMsg'>$RequiredField</span></div><br><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.deleteArtTemplate = "<div id='$NAME'><div id='$NAME_Title'>$CONTENTTITLE \"$ARTNAME\"?</div><div id='$NAME_Content' class='modalContent'>$CONTENT</div><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.deleteGalleryTemplate = "<div id='$NAME'><div id='$NAME_Title'>$CONTENTTITLE  $GALLERYNAME</div><div id='$NAME_Content' class='modalContent'>$CONTENT</div><div class='clear'></div></div>";
com.art.myGalleries.components.CommonComponent.prototype.addNewGalleryTemplate = "<div id='$NAME'><div id='$NAME_Title'>$CONTENTTITLE</div><div style='margin-top:10px;margin-left:10px;padding-bottom: 10px;height:27px;'><input type='text' id='$NAME_txtTitle' name='$NAME_txtTitle' class='modalGallerytxtTitle' style='color:#666666;' maxlength='25' value='$GTITLE' /></div><div style='float:left;display:none;' class='ErrorMsg dErrorMessage' id='showErrorMsgContainer'><div class='floatLeft'></div><div class='floatLeft galErrorMsg' id='showErrorMsg'></div></div><div class='newGalleryErrorMsg'></div><div class='clear'></div></div>";
com.art.core.components.BaseComponent.extend(com.art.myGalleries.components.CommonComponent.prototype);
com.art.myGalleries.components.MyGalleriesModal = function(a) {
  this.init();
  if (a == null || a == undefined) {
    return false
  }
  this.id = a.id;
  this.modal = a;
  this.selectedGalleryId;
  this.btn;
  this.LOGIN_CLICKED = com.art.myGalleries.components.MyGalleriesModal.LOGIN_CLICKED;
  this.REGISTER_CLICKED = com.art.myGalleries.components.MyGalleriesModal.REGISTER_CLICKED
};
com.art.myGalleries.components.MyGalleriesModal.NAME = "MyGalleriesModal";
com.art.myGalleries.components.MyGalleriesModal.CLICK = "click";
com.art.myGalleries.components.MyGalleriesModal.UPDATE_GALLERY_TITLE = "MyGalleriesModalUpdateGalleryTitle";
com.art.myGalleries.components.MyGalleriesModal.LOGIN_CLICKED = "LoginClicked";
com.art.myGalleries.components.MyGalleriesModal.REGISTER_CLICKED = "RegisterClicked";
com.art.myGalleries.components.MyGalleriesModal.prototype.render = function() {
  return this.getTemplate()
};
com.art.myGalleries.components.MyGalleriesModal.prototype.registerEvents = function() {
  $("#doneBtn").css("visibility", "hidden");
  $("#visitGallery").css("visibility", "hidden");
  if ($.browser.msie) {
    $("#continue").css("width", "155px")
  }
  var f = "#" + this.modal.id + "_rdGallery";
  var h = "#" + this.modal.id + "_rdNewGalery";
  var l = "#" + this.modal.id + "_txtNewGallery";
  var a = this;
  if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
    if (this.modal.id == "SaveToGallery") {
      var e = MyGalleriesCore.getModel().getLastSelectedGalleryName();
      e = com.art.core.utils.StringUtil.autoEllipseText(e, 15);
      a.selectedGalleryId = MyGalleriesCore.getModel().getLastSelectedGalleryID();
      $("#drpdownSelection").text($("#drpdownSelection").text().replace(($("#drpdownSelection").text()), e))
    }
  }
  if ($.browser.msie && parseInt($.browser.version) == 7) {
    if (this.modal.id == "MoveToGallery") {
      $(".MyGalleriesLeftContainer").css("height", "365")
    } else {
      $(".MyGalleriesLeftContainer").css("height", "385")
    }
  }
  if ($.browser.msie && parseInt($.browser.version) == 8) {
    if (this.modal.id == "MoveToGallery") {
      $("#baseModalButtonBarRight_myModalMoveToGallery").css("height", "0px")
    }
  }
  var k = false;
  if (this.modal.galleryList.length > 0) {
    for (var d = 0; d < this.modal.galleryList.length; d++) {
      if (this.modal.galleryList[d].Permissions != 50) {
        k = true
      }
    }
  }
  if (k) {
    $("[class=radioModal]").removeAttr("checked");
    $("[class=radioModal]").filter("[value=Existing]").attr("checked", "checked");
    $(l).attr("disabled", "true");
    $("#existingDrpDownGalleries").removeClass("existingDrpDownGalleriesOpacity")
  } else {
    $("[class=radioModal]").removeAttr("checked");
    $("[class=radioModal]").filter("[value=New]").attr("checked", "checked");
    $("input[@name='" + l + "']:input").removeAttr("disabled");
    $(f).attr("disabled", "disabled");
    $("#existingDrpDownGalleries").addClass("existingDrpDownGalleriesOpacity");
    var c = 0.3;
    $("#txtExistingDrpDownGallery").css({
      filter: "alpha (opacity=" + (c * 100) + ")",
      filter: "progid:DXImageTransform.Microsoft.Alpha(style=0, opacity=" + (c * 100) + ")",
      "-moz-opacity": c,
      opacity: c,
      "-khtml-opacity": c
    })
  }
  $("#privacyChk").css("visibility", "hidden");
  $("#privacyTxt").css("visibility", "hidden");
  $("input:radio").change(function() {
    if ($("input[name='SaveToGallery_rdGallery']:checked").val() == "Existing" || $("input[name='MoveToGallery_rdGallery']:checked").val() == "Existing") {
      $(l).val("Untitled Gallery");
      $(l).attr("disabled", "true");
      $("#privacyChk").css("visibility", "hidden");
      $("#privacyTxt").css("visibility", "hidden");
      $(".commonErrorMsg").text("");
      $(".commonErrorMsg").hide()
    } else {
      if ($("input[name='SaveToGallery_rdGallery']:checked").val() == "New" || $("input[name='MoveToGallery_rdGallery']:checked").val() == "New") {
        $("input[@name='" + l + "']:input").removeAttr("disabled");
        $("#drpdownSelection").text($("#drpdownSelection").text().replace(($("#drpdownSelection").text()), MyGalleriesCore.getString("Select Gallery")));
        var n = new com.art.core.cookie.Cookie();
        var m = n.getCookieDictionary("ap", "accounttype");
        if (m != "1") {
          $("#privacyChk").css("visibility", "visible");
          $("#privacyTxt").css("visibility", "visible")
        }
        $("#txtExistingDrpDownGallery").unbind("live");
        $("#txtExistingDrpDownGallery").unbind("click");
        $("#txtExistingDrpDownGallery").unbind("mouseenter");
        $("#txtExistingDrpDownGallery").die();
        $(".commonErrorMsg").text("");
        $(".commonErrorMsg").hide();
        $("#drpDownLstGallery").hide()
      }
    }
    if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
      if (a.modal.id == "SaveToGallery") {
        var o = MyGalleriesCore.getModel().getLastSelectedGalleryName();
        o = com.art.core.utils.StringUtil.autoEllipseText(o, 15);
        a.selectedGalleryId = MyGalleriesCore.getModel().getLastSelectedGalleryID();
        $("#drpdownSelection").text($("#drpdownSelection").text().replace(($("#drpdownSelection").text()), o))
      }
    }
  });
  $("#txtExistingDrpDownGallery").live("click",
  function() {
    if ($("input[@name='" + f + "']:checked").val() == "New") {
      $("#drpDownLstGallery").hide()
    }
  });
  $("#drpDownLstGallery").mouseenter(function() {
    $(this).show();
    $(".commonErrorMsg").hide()
  });
  $("#existingDrpDownGalleries, #drpDownLstGallery").mouseleave(function() {
    $("#drpDownLstGallery").hide();
    $(".commonErrorMsg").show()
  });
  $("#existingDrpDownGalleries").click(function() {
    $(".commonErrorMsg").text("");
    if ($("input[name='SaveToGallery_rdGallery']:checked").val() == "New" || $("input[name='MoveToGallery_rdGallery']:checked").val() == "New") {
      $("#drpDownLstGallery").hide()
    } else {
      if ($("input[name='SaveToGallery_rdGallery']:checked").val() == "Existing" || $("input[name='MoveToGallery_rdGallery']:checked").val() == "Existing") {
        $("#drpDownLstGallery").show()
      }
    }
  });
  $(".drpDownLstItem").live("click",
  function() {
    a.selectedGalleryId = $(this).attr("id");
    var n = $("#drpdownSelection").text().replace(($("#drpdownSelection").text()), ($(this).text()));
    var m = com.art.core.utils.StringUtil.autoEllipseText(n, 15);
    $("#drpdownSelection").text(m);
    $("#drpDownLstGallery").hide()
  });
  $("#" + this.modal.id + "_txtNewGallery").keypress(function() {
    $(".commonErrorMsg").text("");
    $(".commonErrorMsg").hide()
  });
  $("#" + this.modal.id + "_txtNewGallery").focus(function() {
    $(this).css("color", "#333333");
    $(this).css("background-color", "#fff");
    var m = $(this).val();
    if (m == "" || m == "Untitled Gallery") {
      $(this).val("")
    }
  });
  $("#" + this.modal.id + "_txtNewGallery").blur(function() {
    $(this).css("color", "#666666");
    $(this).css("background-color", "#F1F1F1");
    if ($(this).val() == "") {
      $(this).val("Untitled Gallery")
    }
  });
  $("#registerSavetogallery").live("click",
  function() {
    if (a.callbacks[a.REGISTER_CLICKED] != undefined) {
      a.callbacks[a.REGISTER_CLICKED]()
    }
  })
};
com.art.myGalleries.components.MyGalleriesModal.prototype.GetGalleryID = function() {
  if (this.selectedGalleryId != "" && this.selectedGalleryId != undefined) {
    return this.selectedGalleryId
  }
};
com.art.myGalleries.components.MyGalleriesModal.prototype.ContinueToMove = function() {
  if ($("input[name=" + this.modal.id + "_rdGallery]:checked").val() == undefined) {
    $(".commonErrorMsg").text(MyGalleriesCore.getString("Please select a option."));
    $(".commonErrorMsg").show()
  } else {
    var a = $("input[name=" + this.modal.id + "_rdGallery]:checked").val();
    switch (a) {
    case "New":
      if ($("#" + this.modal.id + "_txtNewGallery").val().trim().length <= 0) {
        $(".commonErrorMsg").text(MyGalleriesCore.getString("Please enter a gallery name. "));
        $(".commonErrorMsg").show()
      } else {
        return "New"
      }
      break;
    case "Existing":
      if ($("#drpdownSelection").text() == "Select Gallery") {
        $(".commonErrorMsg").text(MyGalleriesCore.getString("Please select an existing gallery from the dropdown menu."));
        $(".commonErrorMsg").show()
      } else {
        return "Existing"
      }
      break;
    default:
      return a;
      break
    }
  }
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getAddTitleData = function() {
  var a = "#" + this.modal.id + "_txtNewGallery";
  return {
    title: $(a).val()
  }
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getTemplate = function() {
  var a = "";
  switch (this.modal.id) {
  case "MoveToGallery":
  case "SaveToGallery":
    a = this.getTemplateForMoveToGallery();
    break;
  case "DeleteGallery":
    a = this.getTemplateForDeleteGallery();
    break;
  default:
    throw new Error("Modal Failure! Unknown note.name")
  }
  return a
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getTemplateForMoveToGallery = function() {
  var a = "<div id='" + this.modal.id + "' class='MyGalleriesModalContainer'>" + this.ModalLeftContainer() + this.ModalRightContainer() + this.ModalConfirmContainer() + "</div><div class='clear'></div>";
  return a
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getTemplateForDeleteGallery = function() {
  var a = "<div id='" + this.modal.id + "' class='MyGalleriesModalContainer'>" + this.ModalLeftContainer() + this.ModalRightContainer() + "</div><div class='clear'></div>";
  return a
};
com.art.myGalleries.components.MyGalleriesModal.prototype.ModalLeftContainer = function() {
  var c = this;
  var B = "";
  var r = "";
  var D = "";
  var u = "1";
  var m = "";
  var H = "";
  var C = "";
  if (!MyGalleriesCore.getModel().environmentSub.isExternalPage) {
    m = c.modal.galleryItem.ItemDetails.ImageInformation.LargeImage.HttpImageURL;
    C = (c.modal.galleryItem.ItemDetails.Artist.FirstName || "") + " " + (c.modal.galleryItem.ItemDetails.Artist.LastName || "");
    H = c.modal.galleryItem.ItemDetails.Title
  } else {
    m = c.modal.galleryItem.ImageUrl;
    C = (c.modal.galleryItem.ArtistName != undefined) ? c.modal.galleryItem.ArtistName: "";
    H = c.modal.galleryItem.Title
  }
  var n = c.modal.galleryItem.Width;
  var l = c.modal.galleryItem.Height;
  var v = 180;
  var J = 0,
  k = 0,
  z = 0,
  y = 0;
  var e = n / l;
  if (e > 1) {
    J = v;
    k = v / e;
    z = (J - k) / 2
  } else {
    J = v * e;
    k = v;
    y = (k - J) / 2
  }
  l = Math.floor(k);
  n = Math.floor(J);
  var a = (220 - l);
  var d = (220 - n);
  var I, f, A, x;
  if (a > 0) {
    I = a / 2;
    bp = (a - I)
  }
  if (d > 0) {
    A = d / 2;
    x = (d - A)
  }
  x = Math.floor(x);
  I = Math.floor(I) + 41;
  r = '<img style="position:absolute;left:' + x + 'px;margin-top:20px" width="' + n + '" height="' + l + '" class="mg-modalImage mg-shadow" alt="" title="" src="' + m + '" />';
  var t = '<img alt="" style="top:' + I + "px; left: " + (n + x) + 'px;" class="abs w8 h10" src="http://cache1.artprintimages.com/images/photostoart/shadow_righttop_E5E7DC.png" />';
  var s = '<img height="' + (l - 10) + '" alt="" style="top:' + (I + 10) + "px; left:" + (n + x) + 'px;" class="abs w8" src="http://cache1.artprintimages.com/images/mygallery/shadow_righttiling_E5E7DC.png" />';
  var o = '<img alt="" style="top:' + (l + I) + "px; left: " + (x) + 'px;" class="abs w8 h8" src="http://cache1.artprintimages.com/images/photostoart/shadow_bottomleft_E5E7DC.png" />';
  if (n == "NaN") {
    var q = '<img width="220px" alt="" style="top:' + (l + I) + "px; left: " + (x + 8) + 'px;" class="abs h8" src="http://cache1.artprintimages.com/images/mygallery/shadow_bottomtiling_E5E7DC.png" />'
  } else {
    var q = '<img width="' + (n - 8) + '" alt="" style="top:' + (l + I) + "px; left: " + (x + 8) + 'px;" class="abs h8" src="http://cache1.artprintimages.com/images/mygallery/shadow_bottomtiling_E5E7DC.png" />'
  }
  var p = '<img alt="" style="top:' + (l + I) + "px; left: " + (n + x) + 'px;" class="abs w8 h8" src="http://cache1.artprintimages.com/images/photostoart/shadow_bottomright_E5E7DC.png" />';
  var G = '<div id="mg-modalSkuName" class="MyGalleriesText SiteFont"  >' + H + "</div>";
  if (C != "") {
    var E = '<div id="mg-modalArtistName" class="MyGalleriesText SiteFont gTxtPrimary">' + decodeURI(C) + "</div>"
  } else {
    var E = ""
  }
  if (c.modal.galleryItem.DisplayPrice != undefined) {
    var F = "<div id='mg-modalItemPrice' class='MyGalleriesText SiteFont'>" + c.modal.galleryItem.DisplayPrice + "</div>"
  } else {
    var F = "<div id='mg-modalItemPrice' class='MyGalleriesText SiteFont'>" + c.modal.galleryItem.Price + "</div>"
  }
  B = '<div class=\'MyGalleriesLeftContainer\'><div class="MyGalleriesLeftImgContainer" style="width:' + n + "px;height:" + l + 'px;">' + r + D + "</div><div class='MyGalleriesLeftItemDetailsContainer' >" + G + E + F + "</div></div>";
  return B
};
com.art.myGalleries.components.MyGalleriesModal.prototype.ModalRightContainer = function() {
  var d = "<div class='MainModalTitle'>" + this.modal.Title + "</div>";
  var c = this.getTemplateForGalleryContent();
  var a = "<div class='MyGalleriesRightContainer'>" + c + "</div>";
  return a
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getTemplateForGalleryContent = function() {
  var e = "",
  d = "";
  var h = this.getExistingDropDownTextBox();
  var f = this.getExistingDropDownList();
  var k;
  var c = new com.art.core.cookie.Cookie();
  var a = c.getCookieDictionary("ap", "accounttype");
  if (this.modal.id == "SaveToGallery" && a == "1") {
    k = "<div class='MyGalleriesLoginContainer'>" + MyGalleriesCore.getString("Don't see your existing galleries? ") + "<br><div id ='loginSavetogallery'>" + MyGalleriesCore.getString("Close this dialog and login to your account.") + "</div></div>"
  } else {
    k = ""
  }
  d = this.modal.id == "SaveToGallery" ? "": "hidden";
  var m = "<div class='ModalExistingGallery'><input type='radio' id='" + this.modal.id + "_rdGallery' name='" + this.modal.id + "_rdGallery' value='Existing' class='radioModal' style='vertical-align:top;margin-right:10px;margin-left:0px;' /><span id='ModalExistingGalleryLabel' class='ModalExistingGalleryLabel gCustomFont'>" + MyGalleriesCore.getString("Existing Gallery") + "</span><div class='clear'></div>" + h + "<div class='clear'></div>" + f + "<div class='clear'></div>" + k + "<div class='commonErrorMsg fontsize12'></div></div>";
  var l = "<div class='MygalleriesDashlines'></div>";
  var n = "<div class='ModalNewGallery floatRight'><input type='radio' id='" + this.modal.id + "_rdNewGallery' name='" + this.modal.id + "_rdGallery' value='New' class='radioModal' style='vertical-align:top;margin-right:10px;margin-left:0;' /><span id='ModalNewGalleryLabel' class='ModalNewGalleryLabel gCustomFont'>" + MyGalleriesCore.getString("New Gallery") + "</span><div id='mg-newGallery' class='newGalleryTextBox'><input type='text' id='" + this.modal.id + "_txtNewGallery' name='" + this.modal.id + "_txtNewGallery' class='modalGallerytxtTitle SiteFont' maxlength='25'  value='Untitled Gallery' /></div></div>";
  e = "<div class='MyGalleriesModalGalleryContainer floatLeft'>" + m + n + "</div>";
  return e
};
com.art.myGalleries.components.MyGalleriesModal.prototype.ModalConfirmContainer = function() {
  if (this.modal.id == "SaveToGallery") {
    var h = "<div class='MainModalTitle gCustomFont uCase' style='margin-bottom:20px;'>" + MyGalleriesCore.getString("Successfully Saved!") + "</div>";
    var f = "<div id='txtConfirmationMessage' class='MyGalleriesText'>\"" + this.modal.galleryItem.Title + '"' + MyGalleriesCore.getString(" was added to your") + " <span id='galleryName'></span>&nbsp;" + MyGalleriesCore.getString("gallery. You can access your gallery at any time from the My Galleries link at the top of each page, or by selecting Visit Gallery below.") + "</div>";
    var k;
    var c = new com.art.core.cookie.Cookie();
    var a = c.getCookieDictionary("ap", "accounttype");
    if (this.modal.id == "SaveToGallery" && a == "1") {
      k = "<hr/><div id='txtLoginConfirm' class='MyGalleriesText'>" + MyGalleriesCore.getString("To take full advantage of gallery features, including accessing your saved items from any computer and sharing with friends, please") + " <span id ='loginSavetogallery'>" + MyGalleriesCore.getString("Login") + "</span> " + MyGalleriesCore.getString("or") + " <span id ='registerSavetogallery'>" + MyGalleriesCore.getString("Sign Up.") + "</span></div>"
    } else {
      k = ""
    }
    var e = "<div id='btnContainer'></div>";
    var d = "<div id='SavetoGalleryConfirm' style='visibility:hidden;' class='MyGalleriesConfirmRightContainer'>" + h + f + k + e + "</div>"
  } else {
    var h = "<div class='MainModalTitle gCustomFont uCase'  style='margin-bottom:20px;'>" + MyGalleriesCore.getString("Successfully Saved!") + "</div>";
    var f = "<div id='txtConfirmationMessage' class='MyGalleriesText'>\"" + this.modal.galleryItem.Title + '"' + MyGalleriesCore.getString(" was added to your") + " <span id='galleryName'></span>&nbsp;" + MyGalleriesCore.getString("gallery. You can access your gallery at any time from the My Galleries link at the top of each page, or by selecting Visit Gallery below.") + "</div>";
    var e = "<div id='btnContainer'></div>";
    var d = "<div id='MoveToGalleryConfirm' style='visibility:hidden;' class='MyGalleriesConfirmRightContainer'>" + h + f + e + "</div>"
  }
  return d
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getExistingDropDownTextBox = function() {
  var a = new com.art.core.cookie.Cookie();
  var c = a.getCookieDictionary("arts", this.modal.id);
  var d = "";
  if (this.modal.galleryList.length > 0) {
    for (var e = 0; e < this.modal.galleryList.length; e++) {
      if (this.modal.galleryList[e].Permissions != 50) {
        if (this.modal.galleryList[e].ItemKey == c) {
          d = unescape(this.modal.galleryList[e].Name);
          d = com.art.core.utils.StringUtil.autoEllipseText(d, 15);
          this.selectedGalleryId = this.modal.galleryList[e].GalleryId;
          break
        }
      }
    }
  }
  if (d == "") {
    d = "Select Gallery"
  } else {
    if (MyGalleriesCore.getModel().getLastSelectedGalleryName() != "" && MyGalleriesCore.getModel().getLastSelectedGalleryName() != null) {
      if (this.modal.id == "SaveToGallery") {
        d = MyGalleriesCore.getModel().getLastSelectedGalleryName();
        d = com.art.core.utils.StringUtil.autoEllipseText(d, 15);
        this.selectedGalleryId = MyGalleriesCore.getModel().getLastSelectedGalleryID()
      }
    }
  }
  if (this.modal.id == "SaveToGallery") {
    var f = '<div id="existingDrpDownGalleries"><div id="txtExistingDrpDownGallery"><div id="txtExistingDrpDownGallery_label" class=""><div id="drpdownSelection" class="floatLeft">' + d + '</div><div style="float: left; background-image: url(&quot;http://cache1.artprintimages.com/images/coreimages/core-components-sprites.png&quot;); background-repeat: no-repeat; width: 20px; height: 25px;#height: 18px; background-position: -315px -73px;"></div></div></div></div>'
  } else {
    var f = '<div id="existingDrpDownGalleries"><div id="txtExistingDrpDownGallery"><div id="txtExistingDrpDownGallery_label"><div style="float: left;width:150px;" id="drpdownSelection">' + d + '</div><div style="float: left; background-image: url(&quot;http://cache1.artprintimages.com/images/coreimages/core-components-sprites.png&quot;); background-repeat: no-repeat; width: 20px; height: 25px; background-position: -315px -73px;"></div></div></div></div>'
  }
  return f
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getExistingDropDownList = function() {
  var d = "",
  c = "";
  if (this.modal.galleryList.length > 0) {
    for (var a = 0; a < this.modal.galleryList.length; a++) {
      if (this.modal.galleryList[a].Permissions != 50) {
        galleryName = com.art.core.utils.StringUtil.autoEllipseText(this.modal.galleryList[a].Name, 15);
        d += '<li class="drpDownLstItem" id="' + this.modal.galleryList[a].GalleryId + '">' + unescape(galleryName) + "</li>"
      }
    }
    c = '<ul id="drpDownLstGallery" class="floatLeft">' + d + "</ul>"
  }
  return c
};
com.art.myGalleries.components.MyGalleriesModal.prototype.getDestinationSelectedGalleryId = function() {
  return this.selectedGalleryId
};
com.art.core.components.BaseComponent.extend(com.art.myGalleries.components.MyGalleriesModal.prototype);
com.art.myGalleries.components.LoginInvokeComponent = function(c, a, d) {
  this.id = "LoginInvokeComponent";
  this.NAME = com.art.myGalleries.components.LoginInvokeComponent.NAME;
  this.LOGIN_CLICK = com.art.myGalleries.components.LoginInvokeComponent.LOGIN_CLICK;
  this.REGISTER_CLICK = com.art.myGalleries.components.LoginInvokeComponent.REGISTER_CLICK;
  this.imagePath = "";
  this.callbacks = {};
  this.loginOption = com.art.core.components.LoginModal.LOGIN;
  this.app = a;
  this.calledmodule = "";
  this.loginclickedFForB = false
};
com.art.myGalleries.components.LoginInvokeComponent.NAME = "LoginInvokeComponent";
com.art.myGalleries.components.LoginInvokeComponent.prototype.init = function() {};
com.art.myGalleries.components.LoginInvokeComponent.prototype.showLoginModal = function(d) {
  var a = this;
  this.loginLB = new com.art.core.components.LightBox("myLoginLB", "body", 0.7);
  this.loginLB.zindex = this.app.getModel().getNextHighestZIndex();
  this.loginLB.show();
  var c = {
    defaultFacebookAccountId: this.app.getModel().environment.facebookAccountId
  };
  this.login = new com.art.core.components.LoginModal("myGalleryLogin", MyGalleriesCore.getString("Login to your Art.com account"), MyGalleriesCore.getString("Sign up for a new Art.com account "), {},
  this.loginOption, {},
  {},
  c);
  var e = {
    serviceUrlAccountAuthenticationApi: this.app.getModel().environment.serviceUrlAccountAuthenticationApi,
    apiKey: this.app.getModel().environment.apiKey,
    sessionId: this.app.getModel().environment.sessionId
  };
  this.login.setServiceDetails(e);
  $("body").append(this.login.render(this.app.getModel().getNextHighestZIndex() + 1));
  this.login.initSubmitButtons();
  this.login.registerEvents();
  this.login.close(function() {
    if (a.loginLB) {
      a.loginLB.close()
    }
  });
  this.login.login(function(o) {
    if (o.success) {
      var n = o.facebookResponse != undefined ? o.artComResponse: o;
      if (o.facebookResponse != undefined && o.facebookResponse != null) {
        var h = o.artComResponse.AuthenticationToken;
        var m = o.artComResponse.Account.ProfileInfo.ProfileKey;
        var f = o.artComResponse.Account.ProfileInfo.AccountId;
        a.app.sendNotification(new com.art.core.utils.Note(a.app.events.FACEBOOK_MERGE_ACCOUNTS, {
          authToken: h
        },
        {
          modulename: a.calledmodule,
          logintfob: a.loginclickedFForB
        }))
      } else {
        var h = o.AuthenticationToken;
        var m = o.Account.ProfileInfo.ProfileKey;
        var f = o.Account.ProfileInfo.AccountId;
        var k = a.login.getLoginAccountData();
        var l = new com.art.core.utils.Note(a.app.events.LOGIN_ACCOUNT, {
          username: k.username,
          password: k.password,
          coreresponse: o
        },
        {
          fromExternalModule: false,
          modulename: a.calledmodule,
          logintfob: a.loginclickedFForB
        });
        a.app.sendNotification(l)
      }
    } else {
      this.app.sendNotification(new com.art.core.utils.Note(this.app.events.REGISTER_ACCOUNT_FAILED, "failure"))
    }
  });
  this.login.register(function(n) {
    var h = n.AuthenticationToken;
    var m = n.Account.ProfileInfo.ProfileKey;
    var f = n.Account.ProfileInfo.AccountId;
    var k = a.login.getLoginAccountData();
    var l = new com.art.core.utils.Note(a.app.events.LOGIN_ACCOUNT, {
      username: k.username,
      password: k.password,
      coreresponse: n
    },
    {
      fromExternalModule: false,
      modulename: a.calledmodule,
      logintfob: a.loginclickedFForB
    });
    a.app.sendNotification(l)
  });
  this.login.close(function() {
    if (a.loginLB) {
      a.loginLB.close()
    }
  })
};
com.art.myGalleries.components.LoginInvokeComponent.prototype.notify = function() {
  this.app.sendNotification(note)
};
com.art.myGalleries.components.LoginInvokeComponent.prototype.listNotificationInterests = function() {
  return [this.app.events.SHOW_GLOBAL_LOGINMODAL, this.app.events.REGISTER_ACCOUNT_SUCCESS, this.app.events.REGISTER_ACCOUNT_FAILED, this.app.events.LOGIN_ACCOUNT_SUCCESS, this.app.events.LOGIN_ACCOUNT_FAILED, this.app.events.LOGOUT_MYGALLERY_SUCCESS, this.app.events.LOGOUT_MYGALLERY_FAILED, this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS, this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED, ]
};
com.art.myGalleries.components.LoginInvokeComponent.prototype.refreshpage = function() {
  var a = location.href;
  var c = a.indexOf("#");
  if (c > -1) {
    a = a.substring(0, c)
  }
  window.location.href = a
};
com.art.myGalleries.components.LoginInvokeComponent.prototype.handleNotification = function(f) {
  switch (f.name) {
  case this.app.events.SHOW_GLOBAL_LOGINMODAL:
    this.loginOption = f.body.loginOption;
    this.calledmodule = f.type.modulename;
    if (f.type.clickedLoginThroughFollowOrBookMark) {
      this.loginclickedFForB = f.type.clickedLoginThroughFollowOrBookMark
    }
    var a = new com.art.core.cookie.Cookie();
    if (a.getCookieDictionary("ap", "accounttype") != this.app.constants.ANONYMOUS) {
      window.location.href = getProfileKey() + "?ac=true"
    } else {
      this.showLoginModal()
    }
    break;
  case this.app.events.REGISTER_ACCOUNT_SUCCESS:
    if (f.body && f.body.fromExternalModule) {
      return
    }
    _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
    _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
    if (this.doNotRefreshOnLogin) {
      try {
        dle_handleLoginSuccess()
      } catch(c) {}
      return
    }
    var a = new com.art.core.cookie.Cookie();
    if (location.href.indexOf("/me/") > -1 || location.href.indexOf("mygalleries.asp") > -1) {
      if (a.getCookieDictionary("ap", "profileURL") != "") {
        var h = a.getCookieDictionary("ap", "profileURL");
        window.location.href = h
      }
    } else {
      this.refreshpage()
    }
    break;
  case this.app.events.REGISTER_ACCOUNT_FAILED:
    window.location.href = window.location.href;
    $(".loginModalErrorMsg").css("display", "block");
    if (f.body == "exist") {
      if ($.browser.msie && parseInt($.browser.version) == 7) {
        if (this.id != "myGalleryLogin") {
          $(".loginErrorMsg").css("top", "60px")
        }
      } else {
        $(".loginErrorMsg").css("top", "70px")
      }
      $(".loginErrorMsg").text(MyGalleriesCore.getString("The email address you entered is already associated with an Art.com account."))
    } else {
      if (f.body == "invalidemail") {
        $(".loginErrorMsg").text(MyGalleriesCore.getString("Please enter a valid email address."))
      } else {
        if (f.body == "invalidpassword") {
          $(".loginErrorMsg").text(MyGalleriesCore.getString("Password must be at least 8 characters."))
        } else {
          if (f.body == "failure") {
            if ($.browser.msie) {
              if (this.id != "myGalleryLogin") {
                $(".loginErrorMsg").css("top", "40px")
              } else {
                $(".loginErrorMsg").css("top", "70px")
              }
            }
            $(".loginErrorMsg").text(MyGalleriesCore.getString("We were unable to find an account associated with that email address."))
          }
        }
      }
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_SUCCESS:
    if (f.type.modulename == "GlobalHeader") {
      trace("logging ga for login success");
      _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
      _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
      var a = new com.art.core.cookie.Cookie();
      if (location.href.indexOf("/me/") > -1 || location.href.indexOf("mygalleries.asp") > -1 || location.href.indexOf("~/youplusart/") > -1) {
        if (a.getCookieDictionary("ap", "profileURL") != "") {
          var h = a.getCookieDictionary("ap", "profileURL");
          window.location.href = h
        }
      } else {
        if (this.doNotRefreshOnLogin) {
          try {
            dle_handleLoginSuccess()
          } catch(c) {}
          return
        }
        this.refreshpage()
      }
    }
    break;
  case this.app.events.LOGIN_ACCOUNT_FAILED:
    if (f.body == "failure") {
      $(".loginModalErrorMsg").css("display", "block");
      if ($.browser.msie) {
        $(".loginErrorMsg").css("top", "70px")
      }
      $(".loginErrorMsg").text(MyGalleriesCore.getString("We were unable to find an account associated with that email address."))
    }
    break;
  case this.app.events.LOGOUT_MYGALLERY_SUCCESS:
    var d = MyGalleriesCore.getModel().getLastSelectedGalleryKey();
    MyGalleriesCore.getModel().resetGalleryIDCountCookie(d);
    MyGalleriesCore.getModel().resetLastSelectedGalleryName("");
    FB.getLoginStatus(function(m) {
      if (m.status === "connected") {
        FB.logout(function(n) {});
        var k = "http://" + location.host + _this.app.getModel().environment.profileURL + "?logout=yes";
        location.href = "https://www.facebook.com/logout.php?next=" + k + "&access_token=" + FB._authResponse.accessToken
      } else {
        var e = new com.art.core.cookie.Cookie();
        if (e.getCookieDictionary("ap", "profileURL") != "") {
          var l = e.getCookieDictionary("ap", "profileURL");
          window.location.href = l + "?logout=yes"
        } else {
          window.location.href = "http://" + location.host + _this.app.getModel().environment.profileURL + "?logout=yes"
        }
      }
    });
    break;
  case this.app.events.LOGOUT_MYGALLERY_FAILED:
    window.location.href = window.location.href;
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_SUCCESS:
    _gaq.push(["t1._setCustomVar", 3, "logged-in", "true", 1]);
    _gaq.push(["global._setCustomVar", 3, "logged-in", "true", 1]);
    if (this.doNotRefreshOnLogin) {
      try {
        dle_handleLoginSuccess()
      } catch(c) {}
      return
    }
    if (f.type.modulename == "GlobalHeader") {
      var a = new com.art.core.cookie.Cookie();
      if (location.href.indexOf("/me/") > -1 || location.href.indexOf("mygalleries.asp") > -1 || location.href.indexOf("~/youplusart/") > -1) {
        if (a.getCookieDictionary("ap", "profileURL") != "") {
          var h = a.getCookieDictionary("ap", "profileURL");
          window.location.href = h
        }
      } else {
        window.location.href = window.location.href
      }
    }
    break;
  case this.app.events.LOGIN_FACEBOOK_MYGALLERY_FAILED:
    break;
  default:
  }
};

com.art.myGalleries.modules.RecentlyViewedModule = function(c, a) {
  this.app = a;
  this.moduleData = c;
  this.NAME = com.art.myGalleries.modules.RecentlyViewedModule.NAME;
  this.ImageCount = 0;
  this.MaxImageCount = 30
};
com.art.myGalleries.modules.RecentlyViewedModule.NAME = "RecentlyViewedModule";
com.art.myGalleries.modules.RecentlyViewedModule.ImageCount = "RecentlyViewedModule";
com.art.myGalleries.modules.RecentlyViewedModule.prototype.init = function(e) {
  var f = location.href;
  var c = false;
  if (f.indexOf("/OrderConfirmation.aspx") > 0) {
    c = true
  }
  var a = this;
  if ($("#RecentlyViewedModule").length == 0 && !c) {
    $(this.getTarget()).append(this.getTemplate())
  }
  if (isiOS()) {
    if (!c) {
      var d = new com.art.core.utils.Note(MyGalleriesCore.events.GET_ALL_ITEMS_RECENT_GALLERY, {
        modulename: "RecentlyViewedModule"
      });
      MyGalleriesCore.sendNotification(d)
    }
  }
};

com.art.myGalleries.modules.RecentlyViewedModule.prototype.destroy = function() {};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.trackEventWithCategory = function(a) {
  if (typeof(_gaq) != "undefined") {
    var c = "recently viewed";
    trace("GA Category Name : " + c + ", GA Action Name : " + a);
    _gaq.push(["_trackEvent", c, a]);
    return true
  } else {
    throw Error("GA is not setup; art.core.GoogleAnalytics")
  }
  return false
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.PopulateRecentlyViewed = function(s) {
  var a = this;
  $(".jcarousel-prev").live("click",
  function() {
    a.trackEventWithCategory("recently viewed left arrow")
  });
  $(".jcarousel-next").live("click",
  function() {
    a.trackEventWithCategory("recently viewed right arrow")
  });
  $(".imageItem").live("click",
  function() {
    a.trackEventWithCategory("recently viewed click")
  });
  var n = "";
  var o = 0;
  var r;
  if (s.body.Library != null && s.body.Library.Galleries[0] != null) {
    r = s.body.Library.Galleries[0].Items
  }
  o = this.ImageCount;
  if (this.ImageCount > 30) {
    o = 30
  }
  if (this.ImageCount > 0) {
    _gaq.push(["_trackEvent", "recently viewed", "recently viewed loaded", "", undefined, true]);
    n = "";
    for (var k = 0; k < o; k++) {
      var e = 0;
      var d = 0;
      var q = r[k].ItemDetails.ImageInformation.LargeImage.Dimensions.Width;
      var p = r[k].ItemDetails.ImageInformation.LargeImage.Dimensions.Height;
      var l = 135;
      var u = 0,
      f = 0,
      t = 5,
      m = 0;
      var c = q / p;
      if (c > 1) {
        u = l;
        f = l / c;
        t = l - f;
        t = Math.floor(t)
      } else {
        u = l * c;
        f = l - 5;
        m = (160 - u) / 2;
        m = Math.floor(m)
      }
      e = Math.floor(u);
      d = Math.floor(f);
      n += "<li> <div class='imgParentContainer-rv-site'>";
      n += "<div style='width:" + e + "px; height:" + d + "px;margin-top:" + t + "px;margin-left:" + m + "px;'>";
      n += "<a href= http://" + location.host + "/" + r[k].ItemDetails.AdditonalUrls.ProductPageUrl + ">";
      n += "<img width='" + e + "'height='" + d + "'src=" + r[k].ItemDetails.ImageInformation.LargeImage.HttpImageURL + " class='imageItem shadow'/>";
      n += "</a>";
      n += "</div></div></li>"
    }
    $(".jcarousel-skin-rv-site").html(n);
    $("#RecentlyViewedModule").insertBefore("#ftr")
  } else {
    n = "";
    n += "<div class='innerText'>" + a.app.getString("Start exploring Art.com to find art you love") + "</div>";
    n += "<div class='innerText'>" + a.app.getString("You can look here to keep track of what you've recently viewed.") + "</div>";
    n += "<div class='innerText' style='margin-bottom:40px;'><a class='rvlink' href='/shop/wall-art/'>" + a.app.getString("Shop Now") + "</a>";
    n += " or <a class='rvlink' href='/~/design-inspiration/'>" + a.app.getString("Get Inspired") + "</a>";
    n += "</div>";
    $(".innerContent").html("");
    $(".innerContent").html(n);
    $("#RecentlyViewedModule").insertBefore("#ftr")
  }
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.ApplyCarousel = function() {
  trace("this.ImageCount" + this.ImageCount);
  jQuery(".jcarousel-skin-rv-site").jcarousel({
    initCallback: this.carousel_callback,
    size: this.MaxImageCount,
    visible: 6,
    scroll: 6,
    buttonNextCallback: this.mycarousel_buttonCallback,
    buttonPrevCallback: this.mycarousel_buttonCallback
  });
  if (this.ImageCount < 6) {
    var c = this.ImageCount * 160;
    var a = (960 - c) / 2;
    $("#RecentlyViewedModule .jcarousel-list").css("left", a + "px")
  }
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.mycarousel_buttonCallback = function(c, a, d) {};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.carousel_callback = function(a, e) {
  $("#RecentlyViewedModule").touchwipe({
    wipeLeft: function() {
      a.next()
    },
    wipeRight: function() {
      a.prev()
    },
    wipeUp: function() {
      trace("up")
    },
    wipeDown: function() {
      trace("down")
    },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: true
  });
  if (this.ImageCount < 6) {
    var d = this.ImageCount * 160;
    var c = (960 - d) / 2;
    $("#RecentlyViewedModule .jcarousel-list").css("left", c + "px")
  }
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.notify = function() {
  this.app.sendNotification(note)
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.listNotificationInterests = function() {
  return [this.app.events.GET_ALL_ITEMS_RECENT_GALLERY_SUCCESS]
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.handleNotification = function(a) {
  if (a.body.Library != null && a.body.Library.Galleries[0] != null) {
    this.ImageCount = a.body.Library.Galleries[0].Items.length;
    this.MaxImageCount = a.body.Library.Galleries[0].Items.length;
    if (this.ImageCount > 30) {
      this.MaxImageCount = 30
    }
  }
  switch (a.name) {
  case this.app.events.GET_ALL_ITEMS_RECENT_GALLERY_SUCCESS:
    if (a.body.OperationResponse.OperationStatus != 0) {
      if (a.body.OperationResponse.ResponseCode == 503) {
        return
      }
    }
    trace(a);
    var c = true;
    var d = window.location;
    d = d.toString().toLowerCase();
    if (d.indexOf("/framestep/") !== -1 || d.indexOf("/photostoart") !== -1) {
      c = false;
      $("#RecentlyViewedModule").hide();
      return
    } else {
      c = true
    }
    if (typeof pageName != "undefined" && pageName == "HomePage") {
      c = false
    }
    if (this.ImageCount == 0 && !c) {
      $("#RecentlyViewedModule").hide();
      return
    }
    this.PopulateRecentlyViewed(a);
    this.ApplyCarousel();
    break;
  case this.app.events.ADD_ITEM_TO_NEW_GALLERY_FAILED:
  default:
  }
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.getTemplate = function() {
  var a = this.template.replace("$NAME", this.NAME);
  a = a.replace("$HEADER", this.app.getString("RECENTLY VIEWED"));
  return a
};
com.art.myGalleries.modules.RecentlyViewedModule.prototype.getTarget = function() {
  return this.moduleData.target
};
//不在js里做这样的浏览记录显示
//com.art.myGalleries.modules.RecentlyViewedModule.prototype.template = "<div id='$NAME' class='track-group'><div class='containerDiv' class='SiteFont'><div class='headerTxt gCustomFont'>$HEADER</div><div class='innerContent'><ul class='jcarousel-skin-rv-site'></ul><div class='clear'></div></div></div></div>";
com.art.myGalleries.modules.RecentlyViewedModule.prototype.template = "";

var mygalleriesGA = {};
var isMygalleriesMainLoaded = false;
$(document).ready(function() {
  mygalleriesGA = new com.art.core.tracking.GoogleAnalytics("My Galleries");
  mygalleriesGA.init();
  var viewMode = "";
  var loc = window.location.href;
  if (loc.indexOf("item/") > -1) {
    viewMode = MyGalleriesCore.constants.DETAIL_VIEW
  } else {
    var regex = /gallery\/.+/;
    if (loc.match(regex) == undefined || com.art.core.utils.BrowserUtil.getQueryString("logout")) {
      viewMode = MyGalleriesCore.constants.GALLERY_HOME
    } else {
      viewMode = MyGalleriesCore.constants.GRID_VIEW
    }
  }
  if (typeof MyGalleriesEnvironmentVariables == "undefined") {
    eval("MyGalleriesEnvironmentVariables={};")
  }
  if (typeof MyGalleriesEnvironmentVariablesDynamic == "undefined") {
    eval("MyGalleriesEnvironmentVariablesDynamic={};")
  }
  MyGalleriesEnvironmentVariablesDynamic.selectedGalleryID = "";
  var urlValue = location.href;
  if (urlValue.indexOf("/gallery/") > -1) {
    if ($(".mg-selected").length > 0) {
      var getId = $(".mg-selected").attr("id");
      getId = getId.split("_");
      MyGalleriesEnvironmentVariablesDynamic.selectedGalleryID = getId[1]
    }
  }
  if ($(".MyGalleriesDefault").length > 0) {
    var getId = $(".MyGalleriesDefault").attr("id");
    getId = getId.split("_");
    MyGalleriesEnvironmentVariablesDynamic.selectedGalleryID = getId[1]
  }
  if (MyGalleriesEnvironmentVariablesDynamic.selectedGalleryID == "" && typeof mygalPageInfo != "undefined") {
    MyGalleriesEnvironmentVariablesDynamic.selectedGalleryID = mygalPageInfo.UserModeGalleryId
  }
  MyGalleriesCore.init(MyGalleriesEnvironmentVariables, viewMode, MyGalleriesEnvironmentVariablesDynamic);
  MyGalleriesCore.addToSubEnvironment("isMyGalleryPage", (location.href.indexOf("/me/") > -1 || location.href.indexOf("mygalleries.asp")) > -1);
  MyGalleriesCore.addToSubEnvironment("isExternalPage", location.href.indexOf("/me/") == -1);
  MyGalleriesCore.addToSubEnvironment("isMyAccountPage", location.href.indexOf("/asp/secure") > -1);
  MyGalleriesCore.addToSubEnvironment("isMyPhotosPage", location.href.indexOf("/photostoart") > -1);
  if (MyGalleriesEnvironmentVariablesDynamic.isExternalPage) {
    MyGalleriesCore.registerModule(new com.art.myGalleries.modules.ExternalModule({},
    MyGalleriesCore));
    MyGalleriesCore.registerModule(new com.art.myGalleries.components.LoginInvokeComponent({},
    MyGalleriesCore));
    MyGalleriesCore.registerSubscriber(new com.art.myGalleries.commands.ApplicationCommand({
      target: ""
    },
    MyGalleriesCore));
    MyGalleriesCore.startModule(com.art.myGalleries.modules.ExternalModule.NAME);
    MyGalleriesCore.startModule(com.art.myGalleries.components.LoginInvokeComponent.NAME)
  }
  var urlVal = location.href;
  var isOrdeConfirmationPage = false;
  if (urlVal.indexOf("/OrderConfirmation.aspx") > -1) {
    isOrdeConfirmationPage = true
  }
  if (! (MyGalleriesEnvironmentVariablesDynamic.isMyAccountPage || MyGalleriesEnvironmentVariablesDynamic.isMyPhotosPage || isOrdeConfirmationPage)) {
    MyGalleriesCore.registerModule(new com.art.myGalleries.modules.TrayModule({
      target: "body"
    },
    MyGalleriesCore));
    MyGalleriesCore.startModule(com.art.myGalleries.modules.TrayModule.NAME);
    if (MyGalleriesCore.getModel().getIfLoggedInCookieNew()) {
      $(".tray_login").hide()
    } else {
      $(".tray_login").show()
    }
  }
  if (true) {
    MyGalleriesCore.registerModule(new com.art.myGalleries.modules.RecentlyViewedModule({
      target: "body"
    },
    MyGalleriesCore));
    MyGalleriesCore.startModule(com.art.myGalleries.modules.RecentlyViewedModule.NAME)
  }
  MyGalleriesCore.registerModule(new com.art.myGalleries.components.LoginInvokeComponent({},
  MyGalleriesCore));
  MyGalleriesCore.startModule(com.art.myGalleries.components.LoginInvokeComponent.NAME)
});

var isVSALoaded = false;
var VSjsFilepath = "/scripts/VisualSearchApplication.js";
$(document).ready(function() {
  var a = {
    intro: {
      title: "",
      continueButton: "CONTINUE",
      bodyHeader: "Provide us with an image you like",
      body: '<div class="VSIntroRadioContainer"><span class="VSradio1"></span><input type="hidden" name="radiovs" value="upload"/><div id="IntroRadioTxt1" class="IntroRadioTxt">Upload a file from my computer</div><div class="clear"></div><span class="VSradio2"></span><input type="hidden" name="radiovs" value="link"/><div id="IntroRadioTxt2" class="IntroRadioTxt">Enter a link to the image I like</div></div>',
      contentRight: ""
    },
    upload: {
      title: "Upload File",
      continueButton: "UPLOAD & CONTINUE",
      bodyHeader: "",
      body: "<span class='uploadtxt'>Upload  a file from my computer</span>",
      contentRight: "<div><p>&bull; We accept the following formats: jpeg, jpg, png, or gif.<p>&bull; Please select an image between 25KB and 10MB in size.</p></div>"
    },
    link: {
      title: "Enter Link",
      continueButton: "UPLOAD & CONTINUE",
      bodyHeader: "",
      body: "Please enter the link to the image you like",
      contentRight: "<div><p>&bull; The link you provide must end in jpeg, jpg, png, or gif.</p><p> &bull; File size must be greater than 25KB.</p></div>"
    }
  };
  $("#vs-upload,#vs-upload2,#vs-upload3,#vs-upload4,#vs-upload5,#vs-upload6").bind("click",
  function() {
    if (!isVSALoaded) {
      $.getScript(VSjsFilepath,
      function() {
        VisualSearchApplication_upload(VisualSearchCore);
        isVSALoaded = true
      })
    } else {
      VisualSearchApplication_upload(VisualSearchCore)
    }
  });
  $("#vs-wizard, #vs-wizard2, #vs-wizard3, #vs-wizard4, #vs-wizard5, #vs-wizard6").bind("click",
  function() {
    if (!isVSALoaded) {
      $.getScript(VSjsFilepath,
      function() {
        VisualSearchApplication_Inspire();
        isVSALoaded = true
      })
    } else {
      VisualSearchApplication_Inspire()
    }
  });
  $("#vs-wizardStep3").bind("click",
  function() {
    if (!isVSALoaded) {
      $.getScript(VSjsFilepath,
      function() {
        VisualSearchApplication_step3();
        isVSALoaded = true
      })
    } else {
      VisualSearchApplication_step3()
    }
  });
  $("#vs-wizard-lp, #vs-wizard-lp2, #vs-wizard-lp3, #vs-wizard-lp4, #vs-wizard-lp5, #vs-wizard-lp6").bind("click",
  function() {
    if (!isVSALoaded) {
      $.getScript(VSjsFilepath,
      function() {
        VisualSearchApplication_VsWizardLp();
        isVSALoaded = true
      })
    } else {
      VisualSearchApplication_VsWizardLp()
    }
  });
  $("#vs-get-images").bind("click",
  function() {
    if (!isVSALoaded) {
      $.getScript(VSjsFilepath,
      function() {
        VisualSearchApplication_VsGetImages();
        isVSALoaded = true
      })
    } else {
      VisualSearchApplication_VsGetImages()
    }
  });
  VisualSearchApplication_upload = function() {
    VisualSearchCore.init(visualSearchCoreEnvironment);
    var c = $(this).attr("id") == "vs-upload" ? "VSexactsearchLN": "VSexactsearchblock";
    VisualSearchCore.GATrackEvent(c);
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleLightbox({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleUpload({
      target: "body",
      content: a
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleCurrentSearch({
      target: "body",
      content: {}
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleSearchResults({
      target: ".VSResultsContentRight",
      content: {}
    },
    VisualSearchCore));
    VisualSearchCore.startModule("ModuleLightbox");
    VisualSearchCore.startModule("ModuleUpload");
    VisualSearchCore.getModule("ModuleUpload").updateContent("intro")
  };
  VisualSearchApplication_Inspire = function() {
    VisualSearchCore.init(visualSearchCoreEnvironment);
    var c = $(this).attr("id") == "vs-wizard" ? "VS HP left nav Inspire me": "VS HP block Inspire me";
    VisualSearchCore.GATrackEvent(c);
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleLightbox({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleMultipleItemSearch({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleWizard({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleWizardIntro({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.startModule("ModuleLightbox");
    VisualSearchCore.startModule("ModuleWizardIntro")
  };
  VisualSearchApplication_step3 = function() {
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleLightbox({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleMultipleItemSearchResults({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleWizard({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.startModule("ModuleLightbox");
    VisualSearchCore.startModule("ModuleMultipleItemSearchResults")
  };
  VisualSearchApplication_VsWizardLp = function() {
    VisualSearchCore.init(visualSearchCoreEnvironment);
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleLightbox({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleMultipleItemSearch({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleWizard({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.startModule("ModuleLightbox");
    VisualSearchCore.startModule("ModuleWizard")
  };
  VisualSearchApplication_VsGetImages = function() {
    VisualSearchCore.init(visualSearchCoreEnvironment);
    var c = new com.art.core.vos.ImageVO();
    c.getTestCatalogImage();
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleLightbox({
      target: "body"
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleCurrentSearch({
      target: "body",
      content: {}
    },
    VisualSearchCore));
    VisualSearchCore.registerModule(new _art_.visualSearch.modules.ModuleSearchResults({
      target: ".VSResultsContentRight",
      content: {}
    },
    VisualSearchCore));
    VisualSearchCore.startModule("ModuleLightbox");
    VisualSearchCore.sendNotification(new _art_.core.Note(VisualSearchCore.events.SEARCH_FROM_CATALOG, {
      pivotImage: c
    },
    "vo"))
  }
});

ABTestListBuilt = false;
var isQuirksMode = false;
var countryArray = new Array();
if (typeof currentCountryCode != "undefined") {
  buildCountryList()
}
$(document).ready(function() {
  isQuirksMode = (!jQuery.support.boxModel);
  if (isQuirksMode) {
    $("#css-toolbar-inner").css("height", "37px");
    $(".cst-error, .cst-waiting").css("float", "left")
  }
  if (typeof currentCountryCode != "undefined") {
    getCurrentCountry();
    if (typeof currentCountry != "undefined") {
      $("#cst-current-country").text(currentCountry)
    }
  }
  $(".cst-button").live("mouseover mouseout",
  function(a) {
    if (a.type == "mouseover") {
      $(this).addClass("cst-button-hover")
    } else {
      $(this).removeClass("cst-button-hover")
    }
  });
  $("#cst-save-cart").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-save-cart");
    $(this).siblings().removeClass("cst-button-active");
    hideCSPopup();
    if ($(this).hasClass("cst-button-active")) {
      $(this).removeClass("cst-button-active")
    } else {
      positionCSTPopup(c, a);
      c.addClass("cst-button-active")
    }
  });
  $("#cst-abtests").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-abtests");
    $(this).siblings().removeClass("cst-button-active");
    buildABTestList();
    hideCSPopup();
    if ($(this).hasClass("cst-button-active")) {
      $(this).removeClass("cst-button-active")
    } else {
      positionCSTPopup(c, a);
      c.addClass("cst-button-active")
    }
  });
  $("#cst-login").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-login");
    $(this).siblings().removeClass("cst-button-active");
    hideCSPopup();
    if ($(this).hasClass("cst-button-active")) {
      $(this).removeClass("cst-button-active")
    } else {
      positionCSTPopup(c, a);
      c.addClass("cst-button-active")
    }
  });
  $("#cst-agent-container").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-login");
    positionCSTPopup(c, a)
  });
  $("#cst-country-container").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-country");
    $(this).siblings().removeClass("cst-button-active");
    getCountries();
    hideCSPopup();
    positionCSTPopup(c, a)
  });
  $("#cst-links").live("click",
  function() {
    var c = $(this);
    var a = $("#cst-popup-links");
    $(this).siblings().removeClass("cst-button-active");
    hideCSPopup();
    if ($(this).hasClass("cst-button-active")) {
      $(this).removeClass("cst-button-active")
    } else {
      positionCSTPopup(c, a);
      c.addClass("cst-button-active")
    }
  });
  $(".cst-double-container").live("mouseover mouseout",
  function(a) {
    if (a.type == "mouseover") {
      $(this).find(".cst-double-first").addClass("cst-double-first-hover");
      $(this).find(".cst-double-second").fadeIn("fast")
    } else {
      $(this).find(".cst-double-first").removeClass("cst-double-first-hover");
      $(this).find(".cst-double-second").hide()
    }
  });
  $(".cst-link").live("mouseover mouseout",
  function(a) {
    if (a.type == "mouseover") {
      $(this).addClass("cst-link-hover")
    } else {
      $(this).removeClass("cst-link-hover")
    }
  });
  $(".cst-close").live("click",
  function() {
    hideCSPopup();
    $(".cst-button").removeClass("cst-button-active")
  });
  $("#cst-hide").live("click",
  function() {
    if (isQuirksMode) {
      $("#css-toolbar").hide();
      $("#css-toolbar-hidden").show()
    } else {
      $("#css-toolbar").slideUp("fast",
      function() {
        $("#css-toolbar-hidden").show()
      })
    }
  });
  $("#css-toolbar-hidden").live("click",
  function() {
    $(this).hide();
    if (isQuirksMode) {
      $("#css-toolbar").show()
    } else {
      $("#css-toolbar").slideDown("fast")
    }
  });
  $(".cst-exp-group").live("mouseenter",
  function() {
    $(this).find(".cst-exp-text").addClass("cst-exp-text-hover");
    $(this).find(".cst-button").addClass("cst-button-hover")
  });
  $(".cst-exp-group").live("mouseleave",
  function() {
    $(this).find(".cst-exp-text").removeClass("cst-exp-text-hover");
    $(this).find(".cst-button").removeClass("cst-button-hover")
  });
  $(window).resize(function() {
    if ($(".cst-popup").is(":visible")) {
      var a = $(".cst-button-active");
      var c = $(".cst-popup:visible");
      positionCSTPopup(a, c)
    }
  });
  $("#cst-popup-country-list ul li").live("click",
  function() {
    hideCSPopup();
    $("#cst-current-country").text("loading...");
    countryCode = $(this).attr("class");
    countryCode = countryCode.substr(countryCode.length - 2);
    var a = Math.floor(Math.random() * 1000000);
    if (currentCountryCode == "GB") {
      location.href = "/asp/misc/csstoolbar_action.asp?ACTION=ChangeCountry&CountryName=US&_r=" + a
    } else {
      location.href = "/asp/misc/csstoolbar_action.asp?ACTION=ChangeCountry&CountryName=" + countryCode + "&_r=" + a
    }
  });
  $("#cst-new-session").live("click",
  function() {
    location.href = "/asp/misc/csstoolbar_action.asp?ACTION=NewSession"
  });
  $("#cst-update-payment").live("click",
  function() {
    location.href = "https://www.art.com/ADC.Net/Root/Pages/Secure/PaymentUpdateForm/default.aspx?formMode=css"
  });
  $("#cst-empty-cart").live("click",
  function() {
    location.href = "/asp/misc/csstoolbar_action.asp?ACTION=EmptyCart"
  });
  $("#cst-report-problem").live("click",
  function() {
    sendDiagnosticReport("true")
  });
  $(".cst-exp-group").live("click",
  function() {
    var d = $(this).index() + 1;
    var c = document.location.href;
    var a = false;
    c = c.replace("&_wt.mode=staging", "");
    c = c.replace(/[&?]testgroup=exp\d/i, "");
    if (c.indexOf("?") > 1) {
      c = c + "&"
    } else {
      c = c + "?"
    }
    urlString = "testgroup=exp" + d;
    if (a) {
      urlString = urlString + "&_wt.mode=staging"
    }
    location.href = c + urlString
  });
  $("#cst-email-submit").live("click",
  function() {
    $(this).siblings(".cst-error").fadeOut();
    var d = false;
    var a = $(".cst-save-cart-text").val();
    var c = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    if (a.match(c)) {
      location.href = "/asp/misc/csstoolbar_action.asp?ACTION=SaveCart&SCEmail=" + a
    } else {
      $(this).siblings(".cst-error").fadeIn()
    }
  });
  $("#cst-login-submit").live("click",
  function() {
    $(this).siblings(".cst-error").hide();
    $("#cst-login-waiting").show();
    var a = "/asp/misc/csstoolbar_action.asp?ACTION=Login&UserID=" + $(".cst-login-text").val();
    $.ajax({
      url: a,
      type: "GET",
      success: function(c) {
        $("#cst-login-waiting").hide();
        if (c.length > 1) {
          $("#cst-agent-name").html(c);
          if (c.indexOf("error") > -1) {
            $("#cst-login-submit").siblings(".cst-error").fadeIn()
          } else {
            hideCSPopup();
            $("#cst-login").hide();
            $("#cst-agent-container").show()
          }
        } else {
          $("#cst-login-submit").siblings(".cst-error").fadeIn()
        }
      },
      error: function(d, e, c) {
        $("#cst-login-waiting").hide();
        $("#cst-login-submit").siblings(".cst-error").fadeIn()
      }
    })
  });
  $("#cst-login-text").focus(function() {
    if ($(this).val() == "Enter your name") {
      $(this).select()
    }
  });
  $("#cst-login-text").blur(function() {
    if ($(this).val() == "") {
      $(this).val("Enter your name")
    }
  });
  $(".cst-input").keypress(function(a) {
    if (a.which == 13) {
      $(this).siblings(".cst-submit").trigger("click")
    }
  });
  csAgentName = "";
  csAgentName = GetCookieDictionary("cs", "EN");
  csAgentCurrentName = $("#cst-agent-name").text();
  if (csAgentName.length > 2 && csAgentCurrentName.length < 1) {
    csAgentName = csAgentName.replace("|", " ");
    $("#cst-login").hide();
    $("#cst-agent-container").show();
    $("#cst-agent-name").text(csAgentName)
  }
});
function hideCSPopup() {
  $(".cst-popup").hide();
  $("#cst-arrow-up").hide()
}
function positionCSTPopup(c, d) {
  var e = c.offset();
  var h = $("#css-toolbar").offset();
  var a = $("#cst-arrow-up");
  var k = h.top + $("#css-toolbar").height();
  var f = e.left;
  if (f + d.width() > h.left + $("#css-toolbar-inner").width()) {
    f = f - d.width() + c.width() - 20
  }
  arrowTopPos = h.top + $("#css-toolbar").height() - 13;
  if (isQuirksMode) {
    arrowTopPos = arrowTopPos - 13
  }
  arrowLeftPos = e.left + (c.width() / 2);
  d.css("top", k).css("left", f);
  a.css("top", arrowTopPos);
  a.css("left", arrowLeftPos);
  a.show();
  d.slideDown("fast")
}
function buildABTestList() {
  var c = false;
  ABTestListBuilt = true;
  var a = "";
  if (typeof wt_test_name != "undefined") {
    if (wt_test_name.length > 1) {
      $("#cst-ab-test-title").text(wt_test_name);
      $("#cst-ab-top").show();
      c = true
    }
  }
  if (typeof wt_test_groups != "undefined") {
    if (wt_test_groups.length > 1) {
      console.log("has groups");
      $.each(wt_test_groups,
      function(d) {
        d = d + 1;
        a = a + '<div class="cst-exp-group"><div id="cs-exp' + d + '" class="cst-button">' + d + '</div><div class="cst-exp-text">' + this + '</div><div class="clear"></div></div>'
      });
      $("#cst-ab-top").show();
      $("#cst-ab-group-list").html(a)
    }
  }
  if (!c) {
    $(".cst-exp-off").show()
  }
}
function addCountry(c, a, d) {
  if (d == null) {
    d = 0
  }
  countryArray.push([c, a, d])
}
function buildCountryList() {
  addCountry("Australia", "AU");
  addCountry("Austria", "AT");
  addCountry("Belgium", "BE");
  addCountry("Canada", "CA");
  addCountry("Denmark", "DK");
  addCountry("Finland", "FI");
  addCountry("France", "FR");
  addCountry("Germany", "DE");
  addCountry("Greece", "GR");
  addCountry("Hong Kong", "HK");
  addCountry("Ireland", "IE");
  addCountry("Italy", "IT");
  addCountry("Japan", "JP");
  addCountry("Luxembourg", "LU");
  addCountry("Mexico", "MX");
  addCountry("Netherlands", "NL");
  addCountry("New Zealand", "NZ");
  addCountry("Norway", "NO");
  addCountry("Portugal", "PT");
  addCountry("Singapore", "SG");
  addCountry("South Africa", "ZA");
  addCountry("Spain", "ES");
  addCountry("Sweden", "SE");
  addCountry("Switzerland", "CH");
  addCountry("United Kingdom", "GB");
  addCountry("United States", "US")
}
function getCountries() {
  var a = "";
  $.each(countryArray,
  function(c) {
    if (c % 10 == 0) {
      a = a + "<ul>"
    }
    a = a + '<li class="cstCountry-' + countryArray[c][1] + '">' + countryArray[c][0] + "</li>";
    if (((c + 1) % 10) == 0 || c == countryArray.length - 1) {
      a = a + "</ul>"
    }
  });
  a = a + '<div class="clear"></div>';
  $("#cst-popup-country-list").html(a)
}
function getCurrentCountry() {
  $.each(countryArray,
  function(a) {
    if (countryArray[a][1] == currentCountryCode) {
      currentCountry = countryArray[a][0];
      return true
    }
  })
}
var csPopupIsOpen = false;
var bIsLoggedIn = false;
var changeLink = document.getElementById("CSCurrentUserChange");
function ChangeLinkStatus(c) {
  var a = document.getElementById("CSCurrentUserChange");
  if (c == "true") {
    a.style.display = "block"
  }
}
var XMLHttpFactories = [function() {
  return new XMLHttpRequest()
},
function() {
  return new ActiveXObject("Msxml2.XMLHTTP")
},
function() {
  return new ActiveXObject("Msxml3.XMLHTTP")
},
function() {
  return new ActiveXObject("Microsoft.XMLHTTP")
}];
function createXMLHTTPObject() {
  var d = false;
  for (var c = 0; c < XMLHttpFactories.length; c++) {
    try {
      d = XMLHttpFactories[c]()
    } catch(a) {
      continue
    }
    break
  }
  return d
}
req = createXMLHTTPObject();
function mouseButton(d, a) {
  var c = "https://secureimg.art.com/images/nav/CSToolbar/button_bk_art.gif";
  if (a == "over") {
    d.style.background = "none";
    d.style.background = "#F7ECCC"
  } else {
    if (a == "out") {
      d.style.backgroundImage = "url(" + c + ")"
    }
  }
}
function mouseLink(c, a) {
  if (a == "over") {
    c.style.color = "#FFFFFF";
    c.style.textDecoration = "underline"
  } else {
    if (a == "out") {
      c.style.color = "#EFD998"
    }
  }
}
function csEmptyCart(a) {
  window.location = "/asp/misc/csstoolbar_action.asp?ACTION=EmptyCart"
}
function csNewSession(a) {
  window.location = "/asp/misc/csstoolbar_action.asp?ACTION=NewSession"
}
function getChangeUserResponse() {
  if (req.readyState == 4) {
    var c = document.getElementById("CSCurrentUserName");
    var a = req.responseText;
    c.innerHTML = a;
    bIsLoggedIn = true;
    csChangeUser("hide")
  }
}
function csSaveCart(a) {
  saveCartModule = document.getElementById("CSModuleSaveCartContainer");
  saveCartPlacement = document.getElementById("CSBtn_SaveCart");
  SCEmail = document.getElementById("CSSaveCartEmail").value;
  if (a == "show") {
    if (csPopupIsOpen) {
      closeAllCSPopups()
    }
    saveCartModule.style.left = "152px";
    saveCartModule.style.display = "block";
    csPopupIsOpen = true
  } else {
    if (a == "hide") {
      saveCartModule.style.display = "none";
      csPopupIsOpen = false
    } else {
      if (a == "submit") {
        var d = "EmailError";
        var c = false;
        var f = document.getElementById("CSSaveCartEmail").value;
        var e = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (e.test(f)) {
          document.getElementById(d).style.visibility = "hidden";
          c = true
        } else {
          document.getElementById(d).style.visibility = "visible";
          return (false)
        }
        if (c) {
          window.location = "/asp/misc/csstoolbar_action.asp?ACTION=SaveCart&SCEmail=" + SCEmail
        }
      }
    }
  }
}
function csChangeCountry(a) {
  var f = document.getElementById("CSModuleChangeCountryContainer");
  var d = document.getElementById("CSCurrentCountryChange");
  var c = document.getElementById("CSCurrentCountryCancel");
  var e = Math.floor(Math.random() * 10000);
  if (a == "show") {
    if (csPopupIsOpen) {
      closeAllCSPopups()
    }
    f.style.left = "515px";
    f.style.display = "block";
    d.style.display = "none";
    c.style.display = "block";
    csPopupIsOpen = true
  } else {
    if (a == "hide") {
      f.style.display = "none";
      d.style.display = "block";
      c.style.display = "none";
      csPopupIsOpen = false
    } else {
      if (a == "special") {
        document.getElementById("CSCurrentCountry").innerHTML = "Loading..";
        window.location = "/asp/misc/csstoolbar_action.asp?ACTION=ChangeCountry&CountryName=US&randomnumber=" + e
      } else {
        document.getElementById("CSCurrentCountry").innerHTML = "Loading..";
        window.location = "/asp/misc/csstoolbar_action.asp?ACTION=ChangeCountry&CountryName=" + a + "&randomnumber=" + e
      }
    }
  }
}
function csChangeLanguage(a) {
  var e = document.getElementById("CSModuleChangeLanguageContainer");
  var d = document.getElementById("CSCurrentLanguageChange");
  var c = document.getElementById("CSCurrentLanguageCancel");
  if (a == "show") {
    if (csPopupIsOpen) {
      closeAllCSPopups()
    }
    e.style.left = "515px";
    d.style.display = "none";
    c.style.display = "block";
    e.style.display = "block";
    csPopupIsOpen = true
  } else {
    if (a == "hide") {
      e.style.display = "none";
      d.style.display = "block";
      c.style.display = "none";
      csPopupIsOpen = false
    } else {
      if (a == "submit") {}
    }
  }
}
function csChangeUser(a) {
  var m = document.getElementById("CSCurrentUserName");
  var l = document.getElementById("CSCurrentUserEdit");
  var d = document.getElementById("CSCurrentUserChange");
  var c = document.getElementById("CSCurrentUserCancel");
  var k = document.getElementById("CSCurrentUserTextBox");
  var h = document.getElementById("CSCurrentUserInit");
  var e = document.getElementById("CSCurrentUserLogin");
  if (a == "show") {
    if (csPopupIsOpen) {
      closeAllCSPopups()
    }
    h.style.display = "none";
    e.style.display = "none";
    k.value = "Type your username";
    m.style.display = "none";
    d.style.display = "none";
    l.style.display = "block";
    c.style.display = "block";
    csPopupIsOpen = true
  } else {
    if (a == "hide") {
      l.style.display = "none";
      c.style.display = "none";
      if (bIsLoggedIn) {
        m.style.display = "block";
        d.style.display = "block"
      } else {
        h.style.display = "block";
        e.style.display = "block"
      }
      csPopupIsOpen = false
    } else {
      if (a == "submit") {
        if (!req) {
          return
        }
        var f;
        f = "ACTION=Login&UserID=" + document.getElementById("CSCurrentUserTextBox").value;
        req.open("GET", "/asp/misc/csstoolbar_action.asp?" + (f), true);
        req.onreadystatechange = getChangeUserResponse;
        req.send(null);
        return true
      }
    }
  }
}
function closeAllCSPopups() {
  if (csPopupIsOpen) {
    csChangeCountry("hide");
    csChangeUser("hide");
    csSaveCart("hide");
    csPopupIsOpen = false
  }
  return false
}
function csChangeABTest(a) {
  document.getElementById("CSCurrentABTest").innerHTML = "Loading..";
  var d = parseInt(a);
  var c = Math.floor(Math.random() * 10000);
  window.location = "/asp/default.asp?ABTESTID=" + d + "&randomnumber=" + c
}
function CSToolbar(a) {
  var f = document.getElementById("CSTopBar");
  var e = document.getElementById("CSMessage");
  var d = document.getElementById("CSBottomBar");
  var c = document.getElementById("CSOpen");
  if (a == "show") {
    f.style.display = "block";
    e.innerHTML = "";
    c.style.display = "none"
  } else {
    if (a == "hide") {
      closeAllCSPopups();
      f.style.display = "none";
      d.style.display = "none";
      c.style.display = "block"
    }
  }
}
function GetCookieDictionary(e, d) {
  var h = "";
  var k = String(GetCookieBase(e));
  var c;
  var a;
  if (k != null) {
    c = k.split("&");
    for (var f = 0; f < c.length; f++) {
      a = c[f].split("=");
      if (a[0] == d) {
        h = a[1];
        return h
      }
    }
  }
  return h
}
function GetCookieBase(h) {
  var c = h + "=";
  var a = c.length;
  var d = document.cookie.length;
  var e = 0;
  while (e < d) {
    var f = e + a;
    if (document.cookie.substring(e, f) == c) {
      return GetCookieVal(f)
    }
    e = document.cookie.indexOf(" ", e) + 1;
    if (e == 0) {
      break
    }
  }
  return null
}
function GetCookieVal(c) {
  var a = document.cookie.indexOf(";", c);
  if (a == -1) {
    a = document.cookie.length
  }
  return unescape(document.cookie.substring(c, a))
}
function submitActionOnEnter(c, a) {
  if (window.event) {
    keynum = a.keyCode
  } else {
    if (a.which) {
      keynum = a.which
    }
  }
  keychar = String.fromCharCode(keynum);
  if (keynum == "13") {
    if (c == "saveCart") {
      csSaveCart("submit")
    } else {
      if (c == "login") {
        csChangeUser("submit")
      }
    }
  }
  return keychar == "13"
};
var myEnvironment = {};
var theDomain;
myEnvironment = {
  serviceUrlEcommerceApi: getServiceUrl() + "/ProcessEventAPI.svc"
};
function trace(a) {
  window.console && console.log(a)
}
$(document).ready(function() {
  $("#emailbtn, #savebtn").live("click",
  function() {
    triggerServiceCall(myEnvironment)
  })
});
function getServiceUrl() {
  var c = "api.art.com";
  var a = "";
  var d = window.location.host;
  var e = d.substring(0, d.indexOf(".") + 1);
  if (e.indexOf("-") > 0) {
    a = e.substring(0, e.indexOf("-") + 1);
    switch ((a).toLowerCase()) {
    case "rel1-":
      a = "rel1-";
      break;
    case "rel2-":
      a = "rel2-";
      break;
    case "qa1-":
      a = "qa1-";
      break;
    case "qa2-":
      a = "qa2-";
      break;
    case "qa3-":
      a = "qa3-";
      break;
    default:
      a = "dev2-";
      break
    }
  }
  return location.protocol + "//" + a + c
}
ServiceProvider = function(a) {
  this.name = "ServiceProvider";
  this.environment = a;
  this.ProcessEventAPI = new ProcessEventAPI(this);
  this.contentType = ServiceProvider.JSON_CONTENT_TYPE;
  this.TEXT_CONTENT_TYPE = ServiceProvider.TEXT_CONTENT_TYPE;
  this.dataType = ServiceProvider.JSONP;
  this.type = ServiceProvider.GET
};
ServiceProvider.JSON_CONTENT_TYPE = "application/json; charset=utf-8";
ServiceProvider.JSON = "json";
ServiceProvider.JSONP = "jsonp";
ServiceProvider.TEXT_CONTENT_TYPE = "text/plain; charset=utf-8";
ServiceProvider.GET = "get";
ServiceProvider.POST = "post";
ServiceProvider.prototype.ProcessEventAPI;
ProcessEventAPI = function(a) {
  this.base = a;
  console.info("base:" + a);
  this.serviceUrl = this.base.environment.serviceUrlEcommerceApi
};
ProcessEventAPI.prototype.EventRecordMessage = function(a, c) {
  var e;
  var d = "EventRecordMessage";
  e = this.serviceUrl + "/json/" + d;
  $.ajax({
    url: e,
    async: false,
    data: {
      objData: c
    },
    success: function(f) {},
    dataType: "jsonp"
  })
};
function triggerServiceCall(a) {
  try {
    var e;
    var f;
    var p = "";
    var c = GetCookieDictionary("ap", "cartkey");
    var o = GetCookieDictionary("ap", "langIso");
    var l;
    var q;
    var d;
    l = "SAVE_CART";
    theDomain = findDomain();
    if (theDomain.indexOf("art") > -1) {
      d = GetCookieDictionary("ap", "customerZoneID")
    } else {
      d = GetCookieDictionary("apc", "CustomerZoneID")
    }
    if ($("#email").val() != undefined) {
      e = $("#email").val()
    } else {
      if ($("#txtEmail").val() != undefined) {
        e = $("#txtEmail").val()
      } else {
        if ($("#Text1").val() != undefined) {
          if ($("#Text1").val() == "Email Address") {
            e = "Enter Email Address"
          } else {
            e = $("#Text1").val()
          }
        }
      }
    }
    if (validateEmail(e)) {
      try {
        var r = new ServiceProvider(a);
        var n = {
          EventType: l,
          ReferenceID: c,
          EmailAddress: e,
          CustomerZoneID: d,
          LanguageISOCode: o,
          Domain: theDomain
        };
        p = JSON.stringify(n);
        var m = {
          successHandler: this.receiveContentSuccess,
          errorHandler: this.receiveContentError
        };
        try {
          r.ProcessEventAPI.EventRecordMessage(m, p)
        } catch(h) {
          alert(h.message + h.stackTrace)
        }
      } catch(k) {
        alert("Show Help " + k.message + k.stackTrace)
      }
    }
  } catch(k) {
    alert(k.message)
  }
}
function findDomain() {
  theDomain = document.domain;
  var a = theDomain.indexOf("allposters");
  if (a < 0) {
    a = theDomain.indexOf("condenaststore")
  }
  if (a < 0) {
    a = theDomain.indexOf("jcpenney")
  }
  if (a < 0) {
    a = theDomain.indexOf("art")
  }
  theDomain = theDomain.substr(a);
  return theDomain
}
function validateEmail(a) {
  var c = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!c.test(a)) {
    return false
  } else {
    return true
  }
};