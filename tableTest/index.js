var data;

var hanghao=1;

function init(){undefined

  data=document.getElementById("data");

//   deletearow();
 tianjia(1,"lisi",25);
 tianjia(2,"zhangsan",24);

}

//添加一行，判断是否重复插入

function tianjia(bianhao,xingming,chuohao){undefined

var rows=data.rows;

for(var i=0;i<rows.length;i++){undefined

if(bianhao==rows[i].cells[0].innerText){undefined

window.alert("已经存在该编号的用户，请重新输入");

return;

}

}

  var atr=data.insertRow(rows.length);
// insertCell插入新的td
  var tda=atr.insertCell();

  var tdb=atr.insertCell();

  var tdc=atr.insertCell();

  var tdd=atr.insertCell();

  atr.id="tr"+hanghao;

  tda.innerText=bianhao;

  tdb.innerText=xingming;

  tdc.innerText=chuohao;

  tdd.innerHTML="<button  onclick=\"xiugai('"+atr.id+"')\">修改</button><button onclick=\"deletearow('"+atr.id+"')\">删除</button>";

  hanghao++;

}

function xiugai(atrid){undefined

var xuhao=document.getElementById("xuhao");

var xingming=document.getElementById("xingming");

var chuohao=document.getElementById("chuohao");

var rows=data.rows;

      for(var i=0;i<rows.length;i++){undefined

          var atr=rows[i];

          if(atr.id==atrid){undefined

             // cols = atr.getElementByTagName('td');

//alert(cols.length);

var a = atr.cells[0].innerText;

var b = atr.cells[1].innerText;

var c = atr.cells[2].innerText;

document.getElementById("xuhao").value=a;

document.getElementById("xingming").value=b;

document.getElementById("chuohao").value=c;

          }

      }

}

function deletearow(atrid){undefined

  if(confirm("确定要删除吗？")){

  var rows=data.rows;

      for(var i=0;i<rows.length;i++){undefined

          var atr=rows[i];

          if(atr.id==atrid){undefined

              data.deleteRow(i);

          }

      }

  }

}

function dotianjia(){

    var xuhao=document.getElementById("xuhao");

    var xingming=document.getElementById("xingming");

    var chuohao=document.getElementById("chuohao");

    tianjia(xuhao.value,xingming.value,chuohao.value);

}

function dobaocun(){undefined

var winname=window.open('','_blank');

winname.document.open('text/html','replace');

var code=document.getElementById("data").innerHTML;

winname.document.write(code);

winname.document.execCommand('saveas','table.html');

winname.close();

}
