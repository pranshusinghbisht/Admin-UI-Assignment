let container = document.getElementById("container");

fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`).then((res)=> {
  return (res.json());
}).then((data) => {
  console.log(data);
  appendData(data);
}).catch(function(err){
  console.log(err);
})

let appendData = (data) => {
container.innerHTML = null;
    data.forEach(({name, email, role}) => {

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
}