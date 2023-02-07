function show(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/employees",
        //xử lý khi thành công
        success: function (employee) {
            let str = '';
            for (const e of employee) {
                str += `<div >
                        <table class="table">
                         <tr>
                            <td >FT00${e.id}</td>
                            <td ><a onclick="showDetail(${e.id})"  data-bs-toggle="modal" data-bs-target="#myModal2">${e.name}</a></td>
                            <td >${e.age}</td>
                            <td >${e.salary}</td>
                            <td >${e.branch.id}</td>
                            <td><button type="submit" class="btn btn-warning" onclick="Delete(${e.id})">Delete</button></td>
                            <td><button type="submit" class="btn btn-danger" onclick="showEdit(${e.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal1">Edit</button></td>
                         </tr>
                         </br>
                         </table>
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

show();

function create(){
    let employee = {
        "name": $("#name").val(),
        "age": $("#age").val(),
        "salary": $("#salary").val(),
        "branch": {
            "id": $("#idBranch").val(),
        }
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/employees",
        data: JSON.stringify(employee),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEdit(id){
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/employees/" + id,
        //xử lý khi thành công
        success: function (employee) {
            $("#id1").val(employee.id);
            $("#name1").val(employee.name);
            $("#age1").val(employee.age);
            $("#salary1").val(employee.salary);
            $("#idBranch1ranch").val(employee.branch.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function edit(){
    let employee = {
        "id": $("#id1").val(),
        "name": $("#name1").val(),
        "age": $("#age1").val(),
        "salary": $("#salary1").val(),
        "branch": {
            "id": $("#idBranch1").val(),
        }
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/employees",
        data: JSON.stringify(employee),
        //xử lý khi thành công
        success: function (data) {
            alert("Sua Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function Delete(id){
    $.ajax({
        type: "Delete",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/employees/" + id,
        //xử lý khi thành công
        success: function (employee) {
            if (confirm("Bạn có chắc chắn muốn xóa ? ") === true) {
                show();
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showDetail(id){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/employees/" +id,
        //xử lý khi thành công
        success: function (employee) {
            let str = '';
            str += `<div >
      <h3>Employee Detail</h3>
      <p>Employee Code : FT00${employee.id}</p>
      <p>Name : ${employee.name}</p>
      <p>Age : ${employee.age}</p>
      <p>Salary : ${employee.salary}</p>
      <p>Branch : ${employee.branch.id}</p>
      <a href="index.html">Back to list</a>
              </div>`
            document.getElementById("showDetail").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}