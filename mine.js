var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");
var mainIndex=0;
var bookMarks=[] ;

if(localStorage.getItem("bookMarks")==null) {
    bookMark=[];

}else{
    bookMarks= JSON.parse(localStorage.getItem("bookMarks")) ;
    displayBook(bookMarks);

}


var nameRigct=/^[A-Za-z_]{1,}$/;
function isNameValid(){
    if(nameRigct.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}

var urlRigct=/\b(https?:\/\/|www\.)\S+\b/;
function isUrlValid(){
    if(urlRigct.test(urlInput.value)){
        return true;
    }else{
        return false;
    }
}
nameInput.onkeyup =function(){
    if(isUrlValid() && isNameValid()){
addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled="true";
    }
}

urlInput.onkeyup =function(){
    if(isUrlValid() && isNameValid()){
addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled="true";
    }
}

addBtn.onclick = function() {
if(addBtn.innerHTML=="Update"){
addBtn.innerHTML ="Submit";
var bookMark = { 
    name : nameInput.value,
    url : urlInput.value}
    bookMarks.splice(mainIndex,1,bookMark)
}
else{
    var bookMark = { 
    name : nameInput.value,
    url : urlInput.value
}
bookMarks.push(bookMark);
}
localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
displayBook(bookMarks);
clearData();
}

function displayBook(anyArray){
var marks = ``;
for(var i =0 ; i<anyArray.length ; i++ ){
    marks+=`
    <tr>
    <td>${anyArray[i].name}</td>  
    <td><a href="${anyArray[i].url}" target="_blank" class="text-decoration-none btn btn-primary" >Visit</a> </td>  
  <td><button onclick="updateBook(${i})"  class="btn btn-info"> Update </button> </td>
  <td><button onclick="deleteBook(${i})"  class="btn btn-danger"> Delete </button> </td>

    </tr>    `
}
tableBody.innerHTML= marks;


}

function deleteBook(index){
    bookMarks.splice(index,1);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));

    displayBook(bookMarks);
}

function clearData(){
    nameInput.value="";
    urlInput.value="";
}

function updateBook(index){
nameInput.value = bookMarks[index].name;
urlInput.value = bookMarks[index].url;
addBtn.innerHTML="Update";
mainIndex= index;
}
function search(term){
 var wantedBook=[];
 for(var i =0;i<bookMarks.length;i++){
    if(bookMarks[i].name.toLowerCase().includes(term)){
        wantedBook.push(bookMarks[i]);
    }
 }
 displayBook(wantedBook);
}