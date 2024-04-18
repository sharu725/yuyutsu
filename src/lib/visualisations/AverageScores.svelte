<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    // Declare exported variables for width and height of the SVG container
    export let width = 800;
    export let height = 600;

    // Declare variables to store SVG container, data, color scale, tooltip, and SVG element
    let svgContainer;
    let data;
    let tooltip;
    let selectedColor = "blue";
    let svg;
    let gradientMagnitudeX = true; // Flag to toggle gradient magnitude with respect to x-axis or y-axis

    // Define color scales for different colors
    const colorScales = {
        black: d3.scaleSequential(d3.interpolateGreys),
        red: d3.scaleSequential(d3.interpolateReds),
        blue: d3.scaleSequential(d3.interpolateBlues),
        green: d3.scaleSequential(d3.interpolateGreens),
    };

    // Use onMount lifecycle hook to fetch data and draw the histogram
    onMount(async () => {
        data = await d3.csv("/dataset.csv"); // Fetch dataset
        drawHistogram(); // Draw the histogram
    });

    // Function to draw the histogram
    function drawHistogram() {
        // Remove the previous SVG if it exists
        if (svg) {
            svg.remove();
        }

        // Create the SVG container
        svg = d3
            .select(svgContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Calculate the maximum and minimum average score
        const maxScore = d3.max(data, (d) => +d.AverageScore);
        const minScore = d3.min(data, (d) => +d.AverageScore);

        // Define the scale for the histogram bins
        const xScale = d3
            .scaleLinear()
            .domain([minScore, maxScore])
            .range([50, width - 50]);

        // Generate histogram bins using d3.histogram()
        const histogramGenerator = d3
            .histogram()
            .value((d) => +d.AverageScore)
            .domain(xScale.domain())
            .thresholds(xScale.ticks(20));

        const bins = histogramGenerator(data);

        // Define the y-scale based on the maximum count of items in a bin
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(bins, (d) => d.length)])
            .range([height - 50, 50]);

        // Define the color scale based on the range of average scores
        const colorScale = colorScales[selectedColor].domain([
            0,
            d3.max(bins, (d) => d.length),
        ]);

        // Create bars for the histogram
        const bars = svg
            .selectAll(".bar")
            .data(bins)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.x0))
            .attr("y", (d) => yScale(d.length))
            .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - 1)
            .attr("height", (d) => height - 50 - yScale(d.length))
            .attr("fill", (d) =>
                gradientMagnitudeX
                    ? colorScale(d.length)
                    : colorScale((d.x0 + d.x1) / 2),
            );

        // Create x-axis
        const xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .style("text-anchor", "middle")
            .text("Average Score");

        // Create y-axis
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("transform", "translate(50,0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Frequency");

        // Create a tooltip container within the SVG
        tooltip = svg.append("g").attr("class", "tooltip");

        const tooltipRect = tooltip
            .append("rect")
            .attr("width", 270)
            .attr("height", 50)
            .attr("fill", "white")
            .style("opacity", 0.8);

        const tooltipText = tooltip
            .append("text")
            .attr("x", 10)
            .attr("dy", "1.2em")
            .style("text-anchor", "start")
            .style("font-size", "12px");

        // Tooltip mouseover and mouseout events
        bars.on("mouseover", (event, d) => {
            const [x, y] = d3.pointer(event, svg.node());

            tooltipText.html(
                `Average Score: ${d.x0.toFixed(2)} - ${d.x1.toFixed(2)}<br>Count: ${d.length}`,
            );

            tooltip
                .transition()
                .duration(200)
                .attr("transform", `translate(${x + 10}, ${y - 28})`);
        }).on("mouseout", () => {
            tooltip
                .transition()
                .duration(200)
                .attr("transform", "translate(-500, -500)");
        });
    }

    // Function to update the color scale and redraw the histogram
    function updateColor(color) {
        selectedColor = color;
        drawHistogram();
    }

    // Function to toggle gradient magnitude between x-axis and y-axis
    function toggleGradientMagnitude() {
        gradientMagnitudeX = !gradientMagnitudeX;
        drawHistogram();
    }
</script>

<main>
    <!-- Container to render the SVG -->
    <div class="container">
        <div bind:this={svgContainer} />
    </div>

    <!-- Color options buttons -->
    <div class="color-options">
        <button on:click={() => updateColor("black")}>Black</button>
        <button on:click={() => updateColor("red")}>Red</button>
        <button on:click={() => updateColor("blue")}>Blue</button>
        <button on:click={() => updateColor("green")}>Green</button>
    </div>

    <!-- Toggle button for gradient magnitude -->
    <div class="toggle-button">
        <button on:click={toggleGradientMagnitude}>
            {gradientMagnitudeX
                ? "Gradient Magnitude: X-Axis"
                : "Gradient Magnitude: Y-Axis"}
        </button>
    </div>
</main>

<style>
    .container {
        overflow: auto;
    }
</style>
