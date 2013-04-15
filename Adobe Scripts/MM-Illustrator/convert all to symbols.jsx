//$.bp()
sel = activeDocument.selection;
if (sel.length){
 if (sel instanceof Array){

    for(var e=0, slen=sel.length;e<slen;e++)




  if(mySelection.length>1){
   gr=activeDocument.groupItems.add()
   gr.name='gro';
   for(i=0;i<(mySelection.length);i++){
    mySelection[i].moveToEnd(activeDocument.groupItems['gro']);
   }
   currItem=gr;
  }else{
  currItem=mySelection[0]}
  currSym=activeDocument.symbols.add(currItem);
  inst=activeDocument.symbolItems.add(currSym);
  inst.position=Array((currItem.position[0]),(currItem.position[1]));
  currItem.remove()
 }
}else{}