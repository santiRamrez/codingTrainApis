const getData = async (url) => {
  let resp = await fetch(url);
  let text = await resp.text();

  let output = {
    years: [],
    tempt: [],
  };

  let table = text.split("\n").slice(1);
  table.forEach((row) => {
    let data = row.split(",");
    let year = data[0];
    let tempt = Number(data[1]);
    output.years.push(year);
    output.tempt.push(tempt);
  });

  return output;
};

const makeChart = async () => {
  const labels = await getData("global-warming.csv");

  var ctx = document.getElementById("chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [...labels.years],
      datasets: [
        {
          label:
            "Cuánto se ha calentado la Superficie Terrestre y Marina de la Tierra en ºC",
          data: [...labels.tempt],
          backgroundColor: "rgb(255, 99, 132)",
          fill: false,
          borderColor: "red",
          tension: 0.1,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value.toFixed(1) + " ºC";
            },
          },
        },
      },
    },
  });
};

makeChart();
