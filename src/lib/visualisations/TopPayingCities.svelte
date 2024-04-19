<script>
    import { onMount, afterUpdate } from "svelte";
    import * as d3 from "d3";

    let data,
        chartContainer,
        tooltip,
        selectedCity,
        useUniqueColors = true;
    let width = 800;
    let height = 600;
    let radius = Math.min(width, height) / 2;
    let colorScale;
    let topJobCities;

    onMount(async () => {
        data = await d3.csv("/dataset.csv");
        data.forEach((d) => {
            d.Salary = +d.Salary;
        });

        const jobCitySalaries = d3.rollup(
            data,
            (v) => d3.mean(v, (d) => d.Salary),
            (d) => d.JobCity,
        );

        topJobCities = Array.from(jobCitySalaries.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        updateChart();
    });

    afterUpdate(() => {
        updateChart();
    });

    function updateChart() {
        const jobCityNames = topJobCities.map((d) => d[0]);
        const jobCityAverageSalaries = topJobCities.map((d) => d[1]);

        drawChart(jobCityNames, jobCityAverageSalaries);
    }

    function drawChart(jobCityNames, jobCityAverageSalaries) {
        // Remove the existing SVG element
        d3.select(chartContainer).select("svg").remove();

        const svg = d3
            .select(chartContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        colorScale = useUniqueColors
            ? d3.scaleOrdinal().domain(jobCityNames).range(d3.schemeCategory10)
            : d3
                  .scaleLinear()
                  .domain([0, d3.max(jobCityAverageSalaries)])
                  .range(["#cce5ff", "#003399"]);

        const arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const pie = d3
            .pie()
            .sort(null)
            .value((d) => d);

        const arcData = pie(jobCityAverageSalaries);

        const arcs = svg
            .selectAll(".arc")
            .data(arcData)
            .enter()
            .append("g")
            .attr("class", "arc")
            .style("cursor", "pointer");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => getColor(d.data, jobCityNames[i]))
            .on("mouseover", (event, d) => {
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("transform", "scale(1.1)");

                selectedCity = jobCityNames[d.index];
                tooltip
                    .html(
                        `JobCity: ${jobCityNames[d.index]}<br>Average Salary: Rs${jobCityAverageSalaries[d.index]}`,
                    )
                    .style("display", "block")
                    .style("top", `${event.pageY}px`)
                    .style("left", `${event.pageX}px`);
            })
            .on("mouseout", (event) => {
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("transform", "scale(1)");

                selectedCity = null;
                tooltip.style("display", "none");
            });

        svg.append("text")
            .attr("x", 0)
            .attr("y", -height / 2 - 40)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("fill", "#333")
            .text("Average Salary in Top 10 Highest Paying JobCities");

        tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("display", "none");
    }

    function getColor(value, cityName) {
        return useUniqueColors ? colorScale(cityName) : colorScale(value);
    }
</script>

<main style="display: flex; justify-content: center;">
    <div style="display: flex;">
        <div
            bind:this={chartContainer}
            style="width: 800px; height: 600px; position: relative; overflow: auto;"
        />
    </div>
</main>

<div class="controls" style="text-align: center;">
    <button on:click={() => (useUniqueColors = !useUniqueColors)}>
        {useUniqueColors
            ? "Linear Gradient Color Scheme"
            : "Original Color Scheme"}
    </button>
</div>

<style>
    .tooltip {
        position: absolute;
        text-align: center;
        padding: 10px;
        font:
            16px Arial,
            sans-serif;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: 8px;
        pointer-events: none;
        z-index: 9999;
    }

    .arc:hover {
        opacity: 0.7;
    }

    .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .controls button {
        margin-bottom: 10px;
    }
</style>
