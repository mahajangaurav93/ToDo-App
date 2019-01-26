// Add function item to table
var chk, bt1;

function add() {

    var iname = myform.iname.value;
    var category = myform.category.value;
    var priority = myform.priority.value;

    //Fetching system date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();
    if(dd<10) {
        dd = '0' + dd;
    }
    if(mm<10) {
        mm = '0' + mm;
    }
    today = dd + "/" + mm + "/" + yy;

    // var obj = new Object();
    // obj.name = iname;
    // obj.cat = category;
    // obj.prio = priority;

    //store(obj);

    //Storing data in local storage
    // localStorage.setItem("Name", iname);
    // localStorage.setItem("Category", category);
    // localStorage.setItem("Priority", priority);

    var exist = localStorage.getItem("array");
    exist = exist ? exist.split(",") : [];

    exist.push(iname, category, priority, today);

    localStorage.setItem("array", exist.toString());

    createTable();

    //reset data
    document.getElementById("ftodo").reset();
}

// function store(data) {
//     arr = JSON.parse(localStorage.getItem("session"));
//     arr.push(data);
//     localStorage.setItem("session", JSON.stringify(arr));
// }

function createTable() {
    //Access table
    var table = document.getElementById("todo");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();

    var data = localStorage.getItem("array").split(",");
    //Display data in table
    for(var i=0; i<data.length; i=i+4) {
        cell1.innerHTML = data[i];
        cell2.innerHTML = data[i+1];
        cell3.innerHTML = data[i+2];
        cell4.innerHTML = data[i+3];
    }
    
    chk = document.createElement("input");
    chk.setAttribute("type","checkbox");
    chk.setAttribute("onclick", "mdisable()");
    cell5.appendChild(chk);

    var bt = document.createElement("button");
    var txt = document.createTextNode("Delete");
    bt.appendChild(txt);
    bt.setAttribute("onclick","bdelete(this)");
    cell5.appendChild(bt);

    bt1 = document.createElement("button");
    var txt1 = document.createTextNode("Modify");
    bt1.appendChild(txt1);
    bt1.setAttribute("onclick","bmodify(this)");
    cell5.appendChild(bt1);

  
    var tab = document.getElementById("todo");
    var len = tab.rows.length;
    localStorage.setItem("trow",len);
}

window.onload = function() {
    //Access table
    

    //Fetching system date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();
    if(dd<10) {
        dd = '0' + dd;
    }
    if(mm<10) {
        mm = '0' + mm;
    }
    today = dd + "/" + mm + "/" + yy;

    var data = [];
    data = localStorage.getItem("array").split(",");
    console.log(data);
    //Display data in table
    var tab = document.getElementById("todo");
    for(var i=0; i<data.length; i=i+4) {
        // tab.rows[j].cells[0].innerHTML = data[i];
        // tab.rows[j].cells[1].innerHTML = data[i+1];
        // tab.rows[j].cells[2].innerHTML = data[i+2];
        // tab.rows[j].cells[3].innerHTML = data[i+3];
        var table = document.getElementById("todo");
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();

        cell1.innerHTML = data[i];
        cell2.innerHTML = data[i+1];
        cell3.innerHTML = data[i+2];
        cell4.innerHTML = data[i+3];

        cButton();
    }
    
    function cButton() {
        chk = document.createElement("input");
        chk.setAttribute("type","checkbox");
        chk.setAttribute("onclick", "mdisable()");
        cell5.appendChild(chk);

        var bt = document.createElement("button");
        var txt = document.createTextNode("Delete");
        bt.appendChild(txt);
        bt.setAttribute("onclick","bdelete(this)");
        cell5.appendChild(bt);

        bt1 = document.createElement("button");
        var txt1 = document.createTextNode("Modify");
        bt1.appendChild(txt1);
        bt1.setAttribute("onclick","bmodify(this)");
        cell5.appendChild(bt1);
    }

}

//clear function for Form
function fclear() {
    document.getElementById("ftodo").reset();
}

//Function to delete row
function bdelete(r) {
    var table = document.getElementById("todo");
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
    var data = localStorage.getItem("array").split(",");
    data = data.splice((i*4),4);
    var store = [];
    store.push(data);
    localStorage.setItem("array", store.toString());
    var row = localStorage.getItem("trow");
    row = row-1;
    localStorage.setItem("trow",row);
}

//Function to modify data
function bmodify(d) {
    document.getElementById("updt").setAttribute("class","d-inline-block btn btn-primary");
    var table = document.getElementById("todo");
    var i = d.parentNode.parentNode.rowIndex;
    localStorage.setItem("ino",i);
    document.getElementById("iname").value = table.rows[i].cells[0].innerHTML;
    document.getElementById("category").value = table.rows[i].cells[1].innerHTML;
    document.getElementById("priority").value = table.rows[i].cells[2].innerHTML;
    document.getElementById("updt").setAttribute("onclick","bupdate()");
}

//Function to update data
function bupdate(){
    var table = document.getElementById("todo");
    var i = localStorage.getItem("ino");
    var iname = myform.iname.value;
    var category = myform.category.value;
    var priority = myform.priority.value;

    table.rows[i].cells[0].innerHTML = iname;
    table.rows[i].cells[1].innerHTML = category;
    table.rows[i].cells[2].innerHTML = priority;
}

//Function for checkbox checked or not
function mdisable() {
    if(chk.checked == true) {
        bt1.setAttribute("class", "d-none");
        chk.setAttribute("disabled","true");
    }
}