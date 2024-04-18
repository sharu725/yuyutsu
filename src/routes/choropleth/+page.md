---
layout: default
title: Choropleth
---

## Regional Hiring Trends
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    // Declare exported variables for width and height of the SVG container
    export let width = 800;
    export let height = 600;

    // Declare variables to store SVG container, data, India map data, color scale, tooltip, selected color, and SVG element
    let svgContainer;
    let data;
    let indiaData;
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

    // Use onMount lifecycle hook to fetch data and draw the map
    onMount(async () => {
        indiaData = await d3.json("/states.json"); // Fetch India map data
        data = await d3.csv("/dataset.csv"); // Fetch dataset
        drawMap(); // Draw the map
    });

    // Function to draw the map
    function drawMap() {
        // Remove the previous SVG if it exists
        if (svg) {
            svg.remove();
        }

        // Define the map projection and path generator
        const projection = d3
            .geoMercator()
            .center([81, 22])
            .scale(1100)
            .translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);

        // Calculate the number of graduates for each state
        const stateGraduates = d3.rollup(
            data,
            (v) => v.length,
            (d) => d.CollegeState,
        );

        // Find the maximum number of graduates across all states
        const maxGraduates = d3.max(stateGraduates.values());

        // Set the color scale based on the selected color and the range of graduate counts
        colorScale = colorScales[selectedColor].domain([0, maxGraduates]);

        // Create the SVG container
        svg = d3
            .select(svgContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Draw state borders
        svg.selectAll(".state-border")
            .data(indiaData.features)
            .enter()
            .append("path")
            .attr("class", "state-border")
            .attr("stroke", "black")
            .attr("d", path);

        // Draw states and color them based on the number of graduates
        const states = svg
            .selectAll(".state")
            .data(indiaData.features)
            .enter()
            .append("path")
            .attr("class", "state")
            .attr("d", path)
            .attr("fill", (d) => colorScale(stateGraduates.get(d.id) || 0));

        // Create a tooltip container within the SVG
        tooltip = svg.append("g").attr("class", "tooltip");

        const tooltipRect = tooltip
            .append("rect")
            .attr("width", 150)
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
        states
            .on("mouseover", (event, d) => {
                const stateId = d.id;
                const [x, y] = d3.pointer(event, svg.node());

                tooltipText.html(
                    `<strong>${stateId}</strong><br>Graduates: ${
                        stateGraduates.get(stateId) || 0
                    }`,
                );

                tooltip
                    .transition()
                    .duration(200)
                    .attr("transform", `translate(${x + 10}, ${y - 28})`);
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(200)
                    .attr("transform", "translate(-500, -500)");
            });

        // Create the legend group
        const legendGroup = svg.append("g").attr("class", "legend");

        // Define legend data based on color scale ticks
        const legendData = colorScale
            .ticks(6)
            .map((d) => ({ value: d, color: colorScale(d) }));

        // Create legend items
        const legendItems = legendGroup
            .selectAll(".legend-item")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(20, ${i * 20 + 40})`); // Move legend items down by 40 pixels

        // Add rectangles and text for each legend item
        legendItems
            .append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", (d) => d.color);
        legendItems
            .append("text")
            .attr("x", 20)
            .attr("y", 12)
            .text((d) => `${d.value.toFixed(2)} graduates`);
    }

    // Function to update the color scale and redraw the map
    function updateColor(color) {
        selectedColor = color;
        drawMap();
    }
</script>

<main>
    <!-- Container to render the SVG -->
    <div class="container">
        <div bind:this={svgContainer} />

        <!-- Color options buttons -->
        <div class="color-options">
            <button on:click={() => updateColor("black")}>Black</button>
            <button on:click={() => updateColor("red")}>Red</button>
            <button on:click={() => updateColor("blue")}>Blue</button>
            <button on:click={() => updateColor("green")}>Green</button>
        </div>
    </div>
</main>

<style>
    .container {
        overflow: auto;
    }
</style>

```md
Do hirings vary from region to region?
```