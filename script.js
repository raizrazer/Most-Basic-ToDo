console.log("Javascript loaded");

//* Variable declaration
let listArray = [];
  
//? Update localDate
const updateLocalDate = (value) => {
    localStorage.setItem("listArray",JSON.stringify(value))
}

//? Get data from localStorage
const retrieveLocalDate = () => {
  const localData = JSON.parse(localStorage.getItem("listArray"))
  return localData
}

//* Just checking when intializing first time
if(retrieveLocalDate() === null){
    updateLocalDate(listArray)
}

listArray = retrieveLocalDate()

//? Get Input and Add to array
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  input.value
    ? listArray.push({ value: input.value.toString(), done: false })
    : null;
    updateLocalDate(listArray)
  input.value = "";
  showList();
});

//? Show the array in list
const showList = () => {
  const list = document.querySelector(".list");
  list.innerHTML = "";
  listArray.forEach((item, index) => {
    const listItem = 
    `<div class="listitem ${(item.done) ? "striked" : null}">
        <div class="item">
          <div class="buttons">
            <div class="top">🔼</div>
            <div class="bottom">🔽</div>
          </div>
          <div class="number">${index + 1}.</div>
          <div class="value">${item.value}</div>
        </div>
        <i class="button fa-regular fa-trash-can"></i>
     </div>`;
    list.insertAdjacentHTML("beforeend", listItem);
  });
  addAction();
};

const addAction = () => {
  //? Adding Actions to Each List Items
  const listItems = document.querySelectorAll(".listitem");
  listItems.forEach((singleListItem, index) => {
    singleListItem.addEventListener("click", (e) => {
      console.log(e.target.classList[0])
      const selectedItem = e.target.classList[0]
      //! Delete function
      if (selectedItem === "button") {
        singleListItem.style.transform = `translateX(1000px)`;
        setTimeout(()=>{
            listArray.splice(index, 1);
            showList();
            updateLocalDate(listArray)
        },150)
      }
      //! Done function
      else if(selectedItem === 'value'|| selectedItem === 'number'||selectedItem ==='item') {
        if (listArray[index].done) {
          singleListItem.classList.add("striked");
        } else {
            singleListItem.classList.remove("striked");
        }
        listArray[index].done = !listArray[index].done;
        updateLocalDate(listArray)
        showList();
      }
      else if(selectedItem === 'top'){
        if(listArray[index-1]){
          const temp = listArray[index-1]
          listArray.splice(index-1,1)
          listArray.splice(index,0,temp)
          console.log(listArray[index])        
          updateLocalDate(listArray)        
          showList();
        }
      }
      else if(selectedItem === 'bottom'){      
        if(listArray[index+1]){  
        const temp = listArray[index+1]
        listArray.splice(index+1,1)
        listArray.splice(index,0,temp)
        console.log(listArray[index])        
        updateLocalDate(listArray)        
        showList();
        }
      }
    });
  });
};

//? First update
showList();
