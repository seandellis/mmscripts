/////////////////////////////////////////////////////////////////
//  Set All The Things v.1.0 -- CS,CS2,CS3,CS4
//>=--------------------------------------
// Wanna Batch Transform objects?  Illustrator has built in tools to resize each selected item, 
// but only by percentage, not by hard values. I made this script because I could find no
// native way to set the width of all selected objects to 100px at once.
//
// This script can accept multiple parameters at once.
// To change, for instance, both width and height at the same time, 
// at the 'attributes' prompt, enter <b>width,height</b>
// then at the 'values' prompt, enter a comma separated value list like <b>20,30</b>
//  If a single value is passed for 'values', that value will be applied to all chosen properties. 
//
// Common legal parameter names include, but are not limited to: <b>width,height,top,left</b>.
// Install and use <a href='http://wundes.com/JS4AI/#explore.js'>explore.js</a> on an object to see what other properties can be set.
//
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
////////////////////////////////////////////////////////////////// 

function main(){
    var trace = function (m){alert(m)};
    if(activeDocument == null){trace("No open document found. Please open a document.");return;}
    if(activeDocument.selection.length == 0){trace("Nothing selected. Please select one or more items.");return;}
    var i = prompt("What attribute(s) do you want to set?","width,height");
    if( i===null ){return false;}
    var v = prompt("What value(s) do you want to assign?","100,50");
    if (v === null ){return false;}
    // here's where we walk through all objects.
    var assign = function (i,v){
        for (var x=0 ; x < activeDocument.selection.length ; x++){
            activeDocument.selection[x][i] = eval(v);
        };
    }

    if(  i.indexOf(',') !== -1){  i =  i.split(',');}
    //split if a list, but not if function is found.
    if( v.indexOf(',') !== -1){ v = v.split(',');}
    
    if(typeof i !== "string")
    {
        
        for ( var len=i.length,c=0;c<len;c++)
        {
            assign(i[c],typeof v !== 'string' ? v[c] : v);
        }
    } else
    {
        assign(i,v);
    }
    return true;
}
main();
 