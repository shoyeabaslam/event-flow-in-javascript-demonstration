var buttons = document.querySelectorAll(".wrapper_1 button");
var ul_1 = document.querySelectorAll(".wrapper_2 ul");
var ul_2 = document.querySelectorAll(".wrapper_4 ul");
var execution_list = document.querySelectorAll(".execution_list");
const globalFunctionArray = [];
const asyncFunctionArray = [];

const handleMainStack = (array,color,isExecuted) => {
 if(!isExecuted){
  var newList = document.createElement("li");
  newList.textContent = array[array.length - 1];
  newList.classList.add("stack_animation", color);
  ul_1[0].appendChild(newList);
 }else{
  var newList = document.createElement("li");
  newList.textContent = array.shift();
  newList.classList.add("stack_animation", color);
  ul_1[0].appendChild(newList);
 }
};

const handleSideStack = (array) => {
  var newList = document.createElement("li");
  newList.textContent = array[array.length - 1];
  newList.classList.add("stack_animation", "side_stack_bg");
  ul_2[0].appendChild(newList);
};

const handleAsyncFunction = (array) => {
  if (array.length < 5) {
    array.push(`Async Function ${array.length + 1}`);
    handleSideStack(array);
    console.log(asyncFunctionArray)
  } else {
    alert("Cannot add more than 5");
  }
};

const handleSyncFunction = (array) => {
  if (array.length < 5) {
    array.push(`Function ${array.length + 1}`);
    handleMainStack(array,"call_stack_bg",false);
  } else {
    alert("Cannot add more than 5");
  }
};

const removingMainStackElement = () => {
  const ul1 = ul_1[0];
  const firstChild = ul1.firstChild;

  if (firstChild) {
    firstChild.classList.add("remove_stack_element");
    setTimeout(() => {
      ul1.removeChild(firstChild);
    }, 300);
  }
};

const addAsyncFunctionToMainStack = () => {
  const list = ul_2[0];
  const listArray = Array.from(list.childNodes);
  let index = 0;

  const removeElementWithDelay = () => {
    const intervalId = setInterval(() => {
      if (index < listArray.length) {
        const element = listArray[index];
  
        // Add class for animation
        element.classList.add('remove_stack_element');
  
        setTimeout(() => {
          list.removeChild(element);
          handleMainStack(asyncFunctionArray, "side_stack_bg", true);
          index++;
        }, 400); // Adjust this delay to match your CSS transition duration
      } else {
        clearInterval(intervalId);
        handleAfterExecution();
      }
    }, 500);
  };

  // Start the process
  removeElementWithDelay();
};

const handleAfterExecution = ()=>{
  array = Array.from(ul_1[0].childNodes)
  document.querySelector(".wrapper_3").classList.remove("rotation");
  let index = 0;
  const intervalId = setInterval(async () => {
    if (index < array.length) {
      var newList = document.createElement("li");
      newList.textContent = array[index].innerText;
      newList.classList.add(
        "execution_list-animation",
        "execution_list-bg-red"
      );
      execution_list[0].appendChild(newList);
      index++;
      removingMainStackElement();
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

const handleExecution = () => {
  console.log(ul_1[0].childNodes)
  document.querySelector(".wrapper_3").classList.add("rotation");
  let index = 0;
  const intervalId = setInterval(async () => {
    if (index < globalFunctionArray.length) {
      var newList = document.createElement("li");
      newList.textContent = globalFunctionArray[index];
      newList.classList.add(
        "execution_list-animation",
        "execution_list-bg-green"
      );
      execution_list[0].appendChild(newList);
      index++;
      removingMainStackElement();
    } else {
      clearInterval(intervalId);
      globalFunctionArray.length = 0;
      addAsyncFunctionToMainStack();
    }
  }, 1000);
};

buttons[0].addEventListener("click", () => {
  handleSyncFunction(globalFunctionArray);
});
buttons[1].addEventListener("click", () => {
  handleAsyncFunction(asyncFunctionArray);
});
buttons[2].addEventListener("click", handleExecution);
