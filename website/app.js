/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=cff9d75861fe0c72e610744b0fa1595e&units=metric";
let zipCode = "";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
console.log(newDate);
const zip = document.getElementById("zip");
const generateButton = document.getElementById("generate");
const textArea = document.querySelector("#feelings");
const entries = document.querySelector(".entry");

generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  zipCode = zip.value;
  const contentData = textArea.value;

  getWeatherData(url, zipCode, apiKey)
    .then((data) => {
      postData("/addFeeling", {
        date: newDate,
        temp: data.main.temp,
        contentData,
      });
    })
    .then(function (newData) {
      // call updateUI to update browser content
      updateUI();
    });

  zip.value = "";
  textArea.value = "";
});
//get data
const getWeatherData = async (url, zipCode, apiKey) => {
  const res = await fetch(url + zipCode + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//post data
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      contentData: data.contentData,
      temp: data.temp,
    }),
  });
  try {
    const postedData = req.json();
    return postedData;
  } catch (error) {
    console.log(error);
  }
};

//update UI
async function updateUI() {
  const date = document.getElementById("date");
  const content = document.getElementById("content");
  const temp = document.getElementById("temp");
  const res = await fetch("/all");
  try {
    const entry = res.json().then((data) => {
      date.innerHTML = `${data.date}`;
      content.innerHTML = `${data.contentData}`;
      temp.innerHTML = `${data.temp} degree `;
    });
  } catch (error) {
    console.log(error);
  }
}
