// A test sample diagram based on darge-es.

import { getLocaleNumberSymbol } from '@angular/common';
import { asNativeElements, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3-es';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dagre-es-example';

  ngOnInit() {

    // Create a new directed graph
    var g = new dagreD3.graphlib.Graph({ directed: true });

    // Set an object for the graph label
    g.setGraph({});

    g.graph().rankdir = "UD";
    g.graph().ranksep = 50;
    g.graph().nodesep = 20;

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () {
      return {};
    });

    // const style = "stroke: black; fill: #eee; stroke-width: 1px; ";

    // Styles about nodes.
    const dataNodeStyle = {
      shape: "circle",
      style: "stroke: blue; fill: orange; stroke-width: 1px;",
      labelStyle: "font: 400 30px 'Arial', Arial; fill: white"
    };

    const actionNodeStyle = {
      shape: "diamond",
      style: "stroke: blue; fill: #32c8ff; stroke-width: 5px;",
      labelstyle: "font: 400 30px 'Arial', Arial; fill: white"
    };

    const graphNodeStyle = {
      shape: "circle",
      style: "stroke: #32c8ff; fill: white; stroke-width: 10px;",
      labelstyle: "font: 400 30px 'Arial', Arial; fill: white"
    };

    // Styles about dependences(edges).
    const genDependStyle = {
      curve: d3.curveMonotoneX,
      style: "stroke: black; fill: none; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: grey"
    };

    const hyperDependStyle = {
      curve: d3.curveBasis,
      style: "stroke: blue; fill: none; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: gray"
    };

    const ctrlDependStyle = {
      curve: d3.curveBasis,
      style: "stroke: blue; fill: none; stroke-width: 1px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: gray"
    };


    // root
        
    // level 1
    g.setNode("w", {
      label: "w",
      width: 50,
      height: 20,
      ...dataNodeStyle
    });
    g.setNode("x", {
      label: "x",
      width: 50,
      height: 20,
      ...dataNodeStyle
    });
    g.setNode("sub1", {
      label: "sub",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });
    g.setNode("sub2", {
      label: "sub",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });

    // level 2
    g.setNode("mul1", {
      label: "mul",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });
    g.setNode("b", {
      label: "b",
      width: 50,
      height: 20,
      ...dataNodeStyle
    });
    g.setNode("mul2", {
      label: "mul",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });
    g.setNode("mul3", {
      label: "mul",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });
    g.setNode("eta", {
      label: "η",
      width: 50,
      height: 20,
      ...dataNodeStyle
    });

    // level 3
    g.setNode("add", {
      label: "add",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });
    g.setNode("y", {
      label: "y",
      width: 50,
      height: 20,
      ...dataNodeStyle
    });
    g.setNode("mul4", {
      label: "mul",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });


    // level 4
    g.setNode("L", {
      label: "L",
      width: 50,
      height: 20,
      ...graphNodeStyle
    });
    g.setNode("sub3", {
      label: "sub",
      width: 50,
      height: 20,
      ...actionNodeStyle
    });


    // Add edges to the graph.
    g.setEdge("x", "mul1", {
      ...genDependStyle
    });
    g.setEdge("x", "mul4", {
      ...genDependStyle
    });
    g.setEdge("w", "mul1", {
      ...hyperDependStyle
    });
    g.setEdge("w", "sub2", {
      ...genDependStyle
    });
    
    g.setEdge("mul1", "add", {
      ...genDependStyle
    });

    g.setEdge("b", "add", {
      ...hyperDependStyle
    });
    g.setEdge("b", "sub1", {
      ...genDependStyle
    });

    g.setEdge("add", "L", {
      ...genDependStyle
    });
    g.setEdge("add", "sub3", {
      ...genDependStyle
    });

    g.setEdge("y", "L", {
      ...genDependStyle
    });
    g.setEdge("y", "sub3", {
      ...genDependStyle
    });

    g.setEdge("sub3", "mul2", {
      ...genDependStyle
    });
    g.setEdge("sub3", "mul4", {
      ...genDependStyle
    });

    // g.setNode("mul4", "mul3", {
    //   ...genDependStyle
    // });

    g.setEdge("eta", "mul2", {
      ...genDependStyle
    });
    g.setEdge("eta", "mul3", {
      ...genDependStyle
    });


    var svg = d3.select("svg"),
      inner = svg.select("g");

    // // Create the renderer
    var render = new (dagreD3 as any).render();

    // // Run the renderer. This is what draws the final graph.
    render(inner, g);

    inner
      .selectAll("g.node")
      .attr("title", function (v) {
        return (
          "<p class='name'>" +
          v +
          "</p><p class='description'> some random description </p>"
        );
      })
      .each(function (v) {
        console.log("node details :", v);
        // $(this).tipsy({ gravity: 'w', opacity: 1, html: true });
      });
    }
}
