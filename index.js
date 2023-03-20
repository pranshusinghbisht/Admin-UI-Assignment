let url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

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

  per_page_data.forEach(({ name, email, role }) => {

    let tr = document.createElement("tr");
    tr.innerHTML = `
          <td><input type="checkbox"></td>
          <td>${name}</td>
          <td>${email}</td>
          <td>${role}</td>
          <td>
            <span><i class="fas fa-edit"></i></span>
            <span><i class="fas fa-trash-alt"></i></span>
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

  const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value;
  console.log("searchterm: ", searchTerm);
  
  let filteredResult = data.filter((ele) => {
    // console.log(data[0].name);
    if (ele.name.includes(searchTerm) || ele.email.includes(searchTerm) || ele.role.includes(searchTerm)) {
      return true;
    }
    return false;
  })
  

  console.log("ad ", filteredResult);

//   filteredResult.forEach(({ name, email, role }) => {

//     let tr = document.createElement("tr");
//     tr.innerHTML = `
//           <td><input type="checkbox"></td>
//           <td>${name}</td>
//           <td>${email}</td>
//           <td>${role}</td>
//           <td>
//             <span><i class="fas fa-edit"></i></span>
//             <span><i class="fas fa-trash-alt"></i></span>
//           </td>
// `
//     container.append(tr);
//   });

})
}

