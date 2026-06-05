// ================= TASK MANAGER =================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(list = tasks){
let ul = document.getElementById("taskList");
ul.innerHTML = "";

list.forEach((task,index)=>{
ul.innerHTML += `
<li>
${task}
<button onclick="deleteTask(${index})">X</button>
</li>`;
});
}

function addTask(){
let input = document.getElementById("taskInput");

if(input.value !== ""){
tasks.push(input.value);
saveTasks();
displayTasks();
input.value = "";
}
}

function deleteTask(index){
tasks.splice(index,1);
saveTasks();
displayTasks();
}

function filterTasks(){
let search = document.getElementById("searchInput").value.toLowerCase();

let filtered = tasks.filter(t =>
t.toLowerCase().includes(search)
);

displayTasks(filtered);
}

displayTasks();


// ================= WEATHER APP =================

async function getWeather(){

let city = document.getElementById("cityInput").value;

if(city === ""){
alert("Enter city name");
return;
}

let apiKey = "YOUR_API_KEY";

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

let res = await fetch(url);
let data = await res.json();

if(!res.ok){
throw new Error("City not found");
}

document.getElementById("weatherCard").innerHTML = `
<h3>${data.name}</h3>
<p>Temp: ${data.main.temp}°C</p>
<p>Humidity: ${data.main.humidity}%</p>
<p>Wind: ${data.wind.speed}</p>
<p>${data.weather[0].description}</p>
`;

}

catch(err){
document.getElementById("weatherCard").innerHTML =
err.message;
}

}