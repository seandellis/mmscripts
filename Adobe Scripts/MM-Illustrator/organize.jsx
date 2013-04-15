/////////////////////////////////////////////////////////////////
//organize v1.3 -- CS,CS2,CS3,CS4,CS5
//>=--------------------------------------
// A quick way to sort selected items by a given attribute.
// For example, use this script to arrange items from left to right based on their height.
// Another example is to change a group of items z-order position based on volumetric area.
// More complexly, you can re-assign height based on x position.
// Items can be sorted on (h)eight, (w)idth, (a)rea, (x)-axis, (y)-axis, (o)pacity, (z)-order)
// Sort directions are small-to-large, large-to-small, and random. 
// Use most effectively in combination with the align palette to redistribute objects in new
// powerful ways. 
//
// v1.1: changed wording for clarity, 
//  added option to keep existing values, vs. align evenly.
//  and fixed prompt values displaying correctly. (thanks Egor) 
// v1.2: Fixed inconsistant spacing issue with autoAlign option
// v 1.3: added a shortcut option in the first prompt.
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
////////////////////////////////////////////////////////////////// 

var alert_fail, createItemSort, getInterval, go, isBad, numericSort, randomSort, rearrange, revNumericSort;
isBad = function(val) {
  return val === "" || !(val != null);
};
rearrange = function(arr, attrFilter, arrangeSort, positioning, dist) {
  var fin, max, selArrLen, start, tempAtts, _results, _results2;
  arr.sort(attrFilter);
  selArrLen = arr.length;
  tempAtts = [];
  while (selArrLen--) {
    tempAtts.push(arr[selArrLen][positioning]);
  }
  tempAtts.sort(arrangeSort);
  selArrLen = arr.length;
  if (positioning === "zOrderPosition") {
    _results = [];
    while (selArrLen--) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        while (arr[selArrLen][positioning] !== tempAtts[selArrLen]) {
          _results2.push(arr[selArrLen][positioning] > tempAtts[selArrLen] ? arr[selArrLen].zOrder(ZOrderMethod.SENDBACKWARD) : arr[selArrLen].zOrder(ZOrderMethod.BRINGFORWARD));
        }
        return _results2;
      })());
    }
    return _results;
  } else {
    if(positioning === 'top'){tempAtts.reverse();}
    start = tempAtts[0];  // arr[0][positioning];//
    fin = tempAtts[selArrLen - 1];  // arr[selArrLen-1][positioning];//
    max = selArrLen;
    _results2 = [];
    while (selArrLen--) {
      _results2.push(arr[selArrLen][positioning] = ((arrangeSort === randomSort  || !dist )? tempAtts[selArrLen] : getInterval(start, fin, max-1, selArrLen)));
    }
    return _results2;
  }
};
createItemSort = function(attrStr) {
  return function(a, b) {
    return a[attrStr] - b[attrStr];
  };
};
getInterval = function(start, fin, len, curr) {
  var f, s;
  s = start;
  f = fin;
  if (start < 0) {
    s = 0;
    f = f - start;
  }
  return start + (((f - s) / len) * curr);
};
alert_fail = "Please open a file in Illustrator, and select some stuff to sort.";
go = function(attrPrompt,orderPrompt,sortPrompt,dist) {
    
  var attrParam, attrParams, doc, prompt_attr, prompt_order1, prompt_order2, prompt_sort, sel, selArr, selLen, sortOrder, sortParam, sortParams ;
  doc = activeDocument;
  sel = doc.selection;
  selArr = [];
  attrParams = {
    h: "height",
    w: "width",
    a: "area",
    x: "left",
    y: "top",
    o: "opacity",
    z: "zOrderPosition"
  };
  sortParams = {
    s: numericSort,
    l: revNumericSort,
    r: randomSort
  };
  //sortPrompt = void 0;
  //orderPrompt = void 0;
  //attrPrompt = void 0;
  attrParam = void 0;
  sortParam = void 0;
  sortOrder = void 0;
  prompt_attr = "Sorting BY: (What attribute would you like to use for input.?)\n(h)eight, (w)idth, (a)rea, (x)-axis, (y)-axis, (o)pacity, (z)-order)\n Alternately, you can enter a 4 letter sequence here, like \"hxsy\"";
  prompt_order1 = "Sort ALONG: (How to output your '";
  prompt_order2 = "' sorted items along what property?) \n(h)eight, (w)idth, (a)rea, (x)-axis, (y)-axis, (o)pacity, (z)-order)";
  prompt_sort = "Sort DIRECTION: (L)arge to small, (S)mall to large, or (R)andom?";
  prompt_dist = "Distribute objects evenly (y), or  just sort ALONG existing values (n)?";
  /*---------------- get user input ----------------*/
 
  while (attrPrompt === undefined) {
    attrPrompt = prompt(prompt_attr, "h");
    if(attrPrompt.length==4){
                var pArr = attrPrompt.split('');
                attrPrompt=pArr[0];
                orderPrompt=pArr[1];
                sortPrompt=pArr[2];
                dist=(pArr[3]=='y' || pArr[3]=='t')?true:false;
        } else
    if (isBad(attrPrompt)) {
      return false;
    }
  }
 attrParam = attrParams[attrPrompt.toLowerCase()];
  while (orderPrompt === undefined) {
    orderPrompt = prompt(prompt_order1 + attrParam + prompt_order2, "x");
    if (isBad(orderPrompt)) {
      return false;
    }
  }   
  sortParam = attrParams[orderPrompt.toLowerCase()];
  while (sortPrompt === undefined) {
    sortPrompt = prompt(prompt_sort, "s");
    if (isBad(sortPrompt)) {
      return false;
    }
  } 
sortOrder = sortParams[sortPrompt.toLowerCase()];
while(dist === undefined){
  dist = confirm(prompt_dist);
}

  selLen = sel.length;
  while (selLen--) {
    selArr.push(sel[selLen]);
  }
  rearrange(selArr, createItemSort(attrParam), sortOrder, sortParam,dist);
  return true;
};
numericSort = function(a, b) {
  return a - b;
};
revNumericSort = function(a, b) {
  return b - a;
};
randomSort = function(a, b) {
  return Math.random() - .5;
};
if (app.activeDocument) {

    go();
 
 //('h','x','s',true)  // to automate, you can pass in all the variables
} else {
  alert(alert_fail);
}