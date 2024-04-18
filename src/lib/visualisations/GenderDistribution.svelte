<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    // Declare exported variables for width and height of the SVG container
    export let width = 800;
    export let height = 600;

    // Declare variables to store SVG container, data, color scale, tooltip, selected color, and SVG element
    let svgContainer;
    let data;
    let genderCounts;
    let colorScale;
    let tooltip;
    let selectedColor = "blue";
    let svg;

    // Define color scales for different colors
    const colorScales = {
        black: d3.scaleSequential(d3.interpolateGreys),
        red: d3.scaleSequential(d3.interpolateReds),
        blue: d3.scaleSequential(d3.interpolateBlues),
        green: d3.scaleSequential(d3.interpolateGreens),
    };

    // Use onMount lifecycle hook to fetch data and draw the bar chart
    onMount(async () => {
        data = await d3.csv("/dataset.csv"); // Fetch dataset
        drawBarChart(); // Draw the bar chart
    });

    // Function to draw the bar chart
    function drawBarChart() {
        // Remove the previous SVG if it exists
        if (svg) {
            svg.remove();
        }

        // Count the number of males and females
        genderCounts = d3.rollup(
            data,
            (v) => v.length,
            (d) => d.Gender,
        );

        // Set the color scale based on the selected color and the range of gender counts
        colorScale = colorScales[selectedColor].domain([
            0,
            d3.max(genderCounts.values()),
        ]);

        // Create the SVG container
        svg = d3
            .select(svgContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create a group for the bars
        const barsGroup = svg.append("g");

        // Define bar data
        const barData = Array.from(genderCounts, ([gender, count]) => ({
            gender,
            count,
        }));

        // Define scales for x and y axes
        const xScale = d3
            .scaleBand()
            .domain(barData.map((d) => d.gender))
            .range([50, width - 50])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(barData, (d) => d.count)])
            .range([height - 100, 20]);

        // Draw bars
        barsGroup
            .selectAll("rect")
            .data(barData)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.gender))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - 100 - yScale(d.count))
            .attr("fill", (d) => colorScale(d.count));

        // Draw x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - 80})`)
            .call(d3.axisBottom(xScale));

        // Draw y-axis
        svg.append("g")
            .attr("transform", `translate(50, 0)`)
            .call(d3.axisLeft(yScale));

        // Add tooltip
        tooltip = svg.append("g").attr("class", "tooltip");
        const tooltipRect = tooltip
            .append("rect")
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", "white")
            .style("opacity", 0.8);
        const tooltipText = tooltip
            .append("text")
            .attr("x", 10)
            .attr("dy", "1.2em")
            .style("text-anchor", "start")
            .style("font-size", "12px");

        // Tooltip mouseover and mouseout events
        barsGroup
            .selectAll("rect")
            .on("mouseover", (event, d) => {
                const [x, y] = d3.pointer(event, svg.node());
                tooltipText.text(`${d.gender}: ${d.count}`);
                tooltip.attr("transform", `translate(${x + 10}, ${y - 28})`);
            })
            .on("mouseout", () => {
                tooltip.attr("transform", "translate(-500, -500)");
            });
    }

    // Function to update the color scale and redraw the bar chart
    function updateColor(color) {
        selectedColor = color;
        drawBarChart();
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
</main>

<style>
    .container {
        overflow: auto;
    }
</style>
