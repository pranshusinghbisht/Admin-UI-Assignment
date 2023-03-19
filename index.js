let url =  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

let dataLength = 0;
fetch(url).then((res)=> {
    return (res.json());
  }).then((data) => {
    // console.log(data.articles);
    dataLength = data.length;
}).catch(function(err){
    console.log(err);
})
console.log(dataLength);
////////////////////////////////////////////////////


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
   // console.log(data[0])
  }

  main();



  let renderDom = (index) => {
   let cont = document.getElementById("container");
   cont.innerHTML = null;

   //page no:1

   let start = 10*index;
   let end = start + 10;

   let per_page_data = data.slice(start,end);
    dataLength = data.length;

   per_page_data.forEach(({name, email, role}) => {

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
  document.getElementById("page-buttons").innerText = index+1;
  };

  
  //next page
  document.getElementById("next-button").addEventListener("click", () => {
    currentPageNum++;
    renderDom(currentPageNum);
  })

  //previous page
  document.getElementById("previous-button").addEventListener("click", () => {
    currentPageNum--;
    renderDom(currentPageNum);
  })

  //first page
  document.getElementById("first-button").addEventListener("click", () => {
    currentPageNum = 0;
    renderDom(currentPageNum);
  })

//   let showButtons = (pageNo) => {
//    let btn = document.getElementById("page-buttons")
//    btn.innerHTML = null;

//    let start = 1;

//    if(pageNo > 4){
//        start = pageNo - 1;
//    }

//    for(let i= start; i<=start+9; i++){
//        let b = document.createElement('button');
//    b.innerText = i;
//    b.onclick = () => {
//        renderDom(i-1);
//    };
//    btn.append(b);
//    }
//   };

