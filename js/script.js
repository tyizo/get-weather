const getData = async () => {
  try {
    const input = document.getElementById("country");
    const country = document.getElementById("country").value;
    input.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
    const error = document.getElementById("error");
    let isPrintData = true;
    if (!country || country === undefined) {
      error.innerHTML = "Please enter a country!";
      isPrintData = false;
    }
    const res = await fetch(`https://fnrr.dev/weather/${country}`);
    const data = await res.json();
    if (res.status !== 200) {
      error.innerHTML = "There's an error in the api.";
    }
    console.log(country);
    if (isPrintData) {
      error.innerHTML = " ";
      printData(data);
    }
  } catch (e) {
    console.log(e);
  }
};

const printData = async (data) => {
  const country = document.getElementById("country").value;
  const content = document.querySelector(".content");
  const res2 = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  const data2 = await res2.json();
  content.innerHTML = `
  <div class="card">
  <div class="card-body">
    <h5 class="card-title"> <img src="${data.current.condition.icon}" style="width: 40px"> Stats For ${data.location.country}</h5>
    <p class="card-text">Capital: ${data.location.name}</p>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Local Time: ${data.location.localtime}
    </li>
    <li class="list-group-item">Weather Stats: ${data.current.condition.text}
    </li>
    <li class="list-group-item">Temp (c): ${data.current.temp_c}
    </li>
    <li class="list-group-item">Temp (f): ${data.current.temp_f} 
    </li>
  </ul>
    <p class="card-text"><small class="text-muted">Last updated ${data.current.last_updated}</small></p>
    <img src="${data2[0].flag}" class="card-img-bottom" alt="..." style="width: 100px">
  </div>
  `;
};

getData();
