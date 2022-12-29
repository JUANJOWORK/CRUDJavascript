let selectedRow = null;
const pattern = new RegExp('/^[a-zA-ZÀ-ÿ\s]{1,40}$/');
//show alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const main = document.querySelector(".main");
    const form = document.querySelector("#student-form")
    main.insertBefore(div, form);

    setTimeout(() => {document.querySelector(".alert").remove()}, 3000);
    console.log("prueba")
}

//clear all fields
function clearFields() {
    document.querySelector('#firstName').value = "";
    document.querySelector('#lastName').value = "";
    document.querySelector('#rollNo').value = "";
}
//add Data
document.querySelector("#student-form").addEventListener('submit', (e) => {
    e.preventDefault();

    //get Form values
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const rollNo = document.querySelector('#rollNo').value;

    //validate
    if (firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Please  fill in all fields", "warning");
    }else if(firstName.length< 3 || lastName.length<3){
        showAlert("Please the FirstName and  Last Name must have more than 3 letters", "warning" )
    }
    else if(isNaN(rollNo)){
        showAlert("Roll number must be a number", "warning" )

    }
    else{
        if(selectedRow==null){
            const list =  document.querySelector("#student-list");
            const row = document.createElement("tr");
            const td1= document.createElement("td");
            const td2= document.createElement("td");
            const td3= document.createElement("td");
            const td4= document.createElement("td");
            const a1 = document.createElement("a");
            const a2 = document.createElement("a");
            a1.setAttribute("href", "#");
            a2.setAttribute("href", "#");



            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            td4.appendChild(a1);
            td4.appendChild(a2);

            td1.textContent = firstName;
            td2.textContent = lastName;
            td3.textContent = rollNo;
            a1.className = "btn btn-warning btn-sm edit";
            a2.className = "btn btn-danger btn-sm delete";
            a1.textContent= "Edit";
            a2.textContent= "Delete";
            

            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        }else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("student Info Edited", "info")


        }
        clearFields();
    }

});

//Edit data
document.querySelector("#student-list").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;


    }
})

//delete DATA
document.querySelector("#student-list").addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
})


/*
function init() {

    let a = document.createElement("a");
    a.setAttribute("href", "http://www.google.es");
    let aTexto = document.createTextNode("Google");
    a.appendChild(aTexto);
    
    document.body.appendChild(a);

}

window.onload = init;*/
