<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    // Declare exported variables for width and height of the SVG container
    export let width = 800;
    export let height = 600;

    // Declare variables to store SVG container, data, color scale, tooltip, selected color, and SVG element
    let svgContainer;
    let data;
    let colorScale;
    let tooltip;
    let selectedColor = "red";
    let svg;

    // Define color scales for different colors
    const colorScales = {
        black: d3.scaleSequential(d3.interpolateGreys),
        red: d3.scaleSequential(d3.interpolateReds),
        blue: d3.scaleSequential(d3.interpolateBlues),
        green: d3.scaleSequential(d3.interpolateGreens),
    };

    // Use onMount lifecycle hook to fetch data and draw the scatter plot
    onMount(async () => {
        data = await d3.csv("/dataset.csv"); // Fetch dataset
        drawScatterPlot(); // Draw the scatter plot
    });

    // Function to draw the scatter plot
    function drawScatterPlot() {
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

        // Define x and y scales for College GPA and 12th Percentage
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => +d.collegeGPA)])
            .range([50, width - 50]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => +d["12percentage"])])
            .range([height - 50, 50]);

        // Define color scale for selected color
        colorScale = colorScales[selectedColor].domain([
            0,
            d3.max(data, (d) => +d["12percentage"]),
        ]);

        // Draw dots for each data point
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(+d.collegeGPA))
            .attr("cy", (d) => yScale(+d["12percentage"]))
            .attr("r", 5)
            .attr("fill", (d) => colorScale(+d["12percentage"]))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("opacity", 0.7)
            .on("mouseover", (event, d) => {
                const [x, y] = d3.pointer(event, svg.node());
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip
                    .html(
                        `<strong>College GPA:</strong> ${d.collegeGPA}<br><strong>12th Percentage:</strong> ${d["12percentage"]}`,
                    )
                    .style("left", x + 10 + "px")
                    .style("top", y - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            });

        // Create the x-axis
        const xAxis = d3.axisBottom(xScale).ticks(5);
        svg.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(xAxis);

        // Add x-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .style("text-anchor", "middle")
            .text("College GPA");

        // Create the y-axis
        const yAxis = d3.axisLeft(yScale).ticks(5);
        svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

        // Add y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", 20)
            .style("text-anchor", "middle")
            .text("12th Percentage");

        // Create a tooltip container
        tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("pointer-events", "none");
    }

    // Function to update the color scale and redraw the scatter plot
    function updateColor(color) {
        selectedColor = color;
        drawScatterPlot();
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

    .tooltip {
        font-size: 14px;
        font-family: Arial, sans-serif;
        padding: 10px;
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
    }
</style>
