<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let ctx;
  let myRadarChart;

  onMount(() => {
    ctx = document.getElementById("radarChart").getContext("2d");
    myRadarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Average GPA",
          "Average Salary",
          "Average Academic Performance",
          "Average Domain Knowledge",
          "Average Analytical Ability",
        ],
        datasets: [
          {
            label: "Tier 1",
            data: [
              73.98784511784511, 43.35248140126189, 84.97052843018615,
              72.68512457041633, 77.73842124953234,
            ],
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Changed background color
            borderColor: "rgba(54, 162, 235, 1)", // Changed border color
            borderWidth: 2,
          },
          {
            label: "Tier 2",
            data: [
              71.28541475276946, 30.235609448457744, 77.51578321771622,
              60.09816184947597, 66.57640877840817,
            ],
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Changed background color
            borderColor: "rgba(255, 99, 132, 1)", // Changed border color
            borderWidth: 2,
          },
        ],
      },
      options: {
        scale: {
          pointLabels: {
            fontSize: 14,
          },
          ticks: {
            beginAtZero: true, // Starting point for the radial scales
            max: 100, // Maximum value for the radial scales
            stepSize: 20, // Increment value for the radial scales
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Student Performance Comparison", // Added a title
          },
        },
      },
    });
  });
</script>

<div>
  <div>
    <canvas id="radarChart" width="400" height="400"></canvas>
    <!-- Increased canvas size -->
  </div>
</div>
