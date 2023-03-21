const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";


////////////////////////////////////////////////////
////////////////Pagination//////////////////////////



let currentPageNum = 0;


let data = [];

let getData = async () => {
  let res = await fetch(url);
  res = await res.json();
  return res;
}
let main = async () => {
  data = await getData();


  renderDom(currentPageNum)
  dataLength(data.length);
  searchFunctionality(data);
}

main();

let renderDom = (index) => {
  let cont = document.getElementById("container");
  cont.innerHTML = null;

  //page no:1

  let start = 10 * index;
  let end = start + 10;

  let per_page_data = data.slice(start, end);
  // dataLength = data.length;

  per_page_data.forEach(({ name, email, role }, id) => {

    let tr = document.createElement("tr");
    tr.innerHTML = `
          <td><input type="checkbox" name="selected[]"></td>
          <td>${name}</td>
          <td>${email}</td>
          <td>${role}</td>
          <td>
             <span onclick="editData(${id}]]])"><i class="fas fa-edit"></i></span>
             <span onclick="deleteData(this)" class="delete"><i class="fas fa-trash-alt"></i></span>
          </td>
`
    container.append(tr);
  });
  document.getElementById("page-buttons").innerText = index + 1;
};

let dataLength = (totalData) => {
  console.log(Math.ceil(totalData / 10));
  //next page
  document.getElementById("next-button").addEventListener("click", () => {


    if (currentPageNum == Math.ceil(totalData / 10) - 1) {
      currentPageNum = 0;
      renderDom(currentPageNum);
    } else {
      currentPageNum++;
      console.log(currentPageNum);
      renderDom(currentPageNum);
    }
  })

  //previous page
  document.getElementById("previous-button").addEventListener("click", () => {

    if (currentPageNum == 0) {
      currentPageNum = Math.ceil(totalData / 10) - 1;
      renderDom(currentPageNum);
    } else {

      currentPageNum--;
      renderDom(currentPageNum);
    }
  })

  //first page
  document.getElementById("first-button").addEventListener("click", () => {
    currentPageNum = 0;
    renderDom(currentPageNum);
  })

  //last page
  document.getElementById("last-button").addEventListener("click", () => {
    currentPageNum = Math.ceil(totalData / 10) - 1;
    renderDom(currentPageNum);
  })

}


////////////////////////////////////////////////////////////////////////
//////////////////search functionailty//////////////////////////////////

let searchFunctionality = (data) => {


  console.log(data);

  let searchInput = document.querySelector('#search');
searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value;
  console.log("searchterm: ", searchTerm);

  console.log("data",data);
  
  let filteredResult = data.filter((ele) => {
    // console.log(data[0].name);
    if (ele.name.includes(searchTerm) || ele.email.includes(searchTerm) || ele.role.includes(searchTerm)) {
      return true;
    }
    return false;
  })
  

  // console.log("ad ", data);
   document.getElementById("container").innerHTML = null;
  filteredResult.forEach(({ name, email, role }, id) => {
      // console.log(12121212);
// console.log(name);
      console.log("index", id)
    let tr = document.createElement("tr");
    tr.setAttribute('data-id', id+1);
    tr.innerHTML = `
          <td><input type="checkbox" name="selected[]"></td>
          <td>${name}</td>
          <td>${email}</td>
          <td>${role}</td>
          <td>
            <span onclick="editData(${id})"><i class="fas fa-edit"></i></span>
            <span onclick="deleteData(this)" class="delete"><i class="fas fa-trash-alt"></i></span>
          </td>
`
    container.append(tr);
  });

})
}




///////////////////////////////select All/////////////////////////////////////////////////////
const selectAllCheckbox = document.getElementById('selectAll');
selectAllCheckbox.addEventListener('click', function() {
  // Code to select or deselect all rows
  const checkboxes = Array.from(document.querySelectorAll('tbody input[type="checkbox"]'));

  checkboxes.forEach(function(checkbox) {
    checkbox.checked = selectAllCheckbox.checked;
  });
  
});


/////////////////////////////////Delete Functionailty////////////////////////////////////


////////////////////////////delete selected////////////////////
function deleteRows() {
  let table = document.getElementById("myTable");
  let checkboxes = document.getElementsByName("selected[]");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      table.deleteRow(i+1);
      i--;
    }
  }
}

///////////////////////delete row//////////////////////



let deleteData = (btn) => {
  var row = btn.parentNode.parentNode; // Get the row
  row.parentNode.removeChild(row); // Delete the row
}



///////////////////////////////Edit Functionailty////////////////////////////////////////

let editData = (id) => {
  console.log("editId",id);
}