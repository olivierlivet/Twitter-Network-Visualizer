import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { ControlsContainer, ZoomControl, FullScreenControl, SearchControl, useRegisterEvents } from "@react-sigma/core";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";

import "@react-sigma/core/lib/react-sigma.min.css";
import data1 from './data1.json'
import data2 from './data2.json'

export const LoadGraph = ({ dataSet }) => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();


    let nodes = dataSet === 1 ? data1.nodes : data2.nodes
    let edges = dataSet === 1 ? data1.edges : data2.edges

    useEffect(() => {
        const graph = new Graph({
            "drawingProperties": {
                defaultLabelColor: "#FFF",
                defaultLabelSize: 10,
                defaultLabelBGColor: "#ddd",
                defaultHoverLabelBGColor: "#002147",
                defaultLabelHoverColor: "#fff",
                labelThreshold: 0,
                defaultEdgeType: "curve",
                hoverFontStyle: "bold",
                fontStyle: "bold",
                activeFontStyle: "bold"
            }
        }
        );

        // for (let index = 0; index < nodes.length; index++) {
        //     const node = nodes[index];

        //     graph.addNode(`node - ${index}`, node);


        // }

        nodes
            // .filter(item => item.attributes["Modularity Class"] === "1")
            .forEach(({ id, ...rest }) => graph.addNode(id, rest))

        // edges.forEach(({ source, target, ...rest }) => graph.addEdge(source, target, rest))


        // for (let index2 = 0; index2 < edges.length; index2++) {
        //     const edge = edges[index2];
        //     console.log(edge)
        //     graph.addEdge(`edge - ${index2}`, edge);
        // }

        // graph.addEdge(`edge - `, edges[0]);


        loadGraph(graph);
    }, [loadGraph]);


    useEffect(() => {
        // Register the events
        registerEvents({
            // node events
            clickNode: (event) => {
                console.log("clickNode", event.event, event.node, event.preventSigmaDefault);

            }



            // clickNode: (event) => console.log("clickNode", event.event, event.node, event.preventSigmaDefault),
            // doubleClickNode: (event) => console.log("doubleClickNode", event.event, event.node, event.preventSigmaDefault),
            // rightClickNode: (event) => console.log("rightClickNode", event.event, event.node, event.preventSigmaDefault),
            // wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
            // downNode: (event) => console.log("downNode", event.event, event.node, event.preventSigmaDefault),
            // enterNode: (event) => console.log("enterNode", event.node),
            // leaveNode: (event) => console.log("leaveNode", event.node),
            // // edge events
            // clickEdge: (event) => console.log("clickEdge", event.event, event.edge, event.preventSigmaDefault),
            // doubleClickEdge: (event) => console.log("doubleClickEdge", event.event, event.edge, event.preventSigmaDefault),
            // rightClickEdge: (event) => console.log("rightClickEdge", event.event, event.edge, event.preventSigmaDefault),
            // wheelEdge: (event) => console.log("wheelEdge", event.event, event.edge, event.preventSigmaDefault),
            // downEdge: (event) => console.log("downEdge", event.event, event.edge, event.preventSigmaDefault),
            // enterEdge: (event) => console.log("enterEdge", event.edge),
            // leaveEdge: (event) => console.log("leaveEdge", event.edge),
            // // stage events
            // clickStage: (event) => console.log("clickStage", event.event, event.preventSigmaDefault),
            // doubleClickStage: (event) => console.log("doubleClickStage", event.event, event.preventSigmaDefault),
            // rightClickStage: (event) => console.log("rightClickStage", event.event, event.preventSigmaDefault),
            // wheelStage: (event) => console.log("wheelStage", event.event, event.preventSigmaDefault),
            // downStage: (event) => console.log("downStage", event.event, event.preventSigmaDefault),
            // // default mouse events
            // click: (event) => console.log("click", event.x, event.y),
            // doubleClick: (event) => console.log("doubleClick", event.x, event.y),
            // wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
            // rightClick: (event) => console.log("rightClick", event.x, event.y),
            // mouseup: (event) => console.log("mouseup", event.x, event.y),
            // mousedown: (event) => console.log("mousedown", event.x, event.y),
            // mousemove: (event) => console.log("mousemove", event.x, event.y),
            // // default touch events
            // touchup: (event) => console.log("touchup", event.touches),
            // touchdown: (event) => console.log("touchdown", event.touches),
            // touchmove: (event) => console.log("touchmove", event.touches),
            // // sigma kill
            // kill: () => console.log("kill"),
            // // sigma camera update
            // updated: (event) => console.log("updated", event.x, event.y, event.angle, event.ratio),
        });
    }, [registerEvents]);

    return null;
};

export const DisplayGraph = ({ dataSet }) => {
    return (
        <>
            <SigmaContainer
                key={dataSet}
                id="sigmaContainer"
                style={{
                    height: "100vh",
                    width: "100vw",
                    margin: 0,
                    padding: 0,
                    border: 'solid 1px red',
                    overflow: `hidden`,
                    background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(1,11,55,1) 100%)`
                }}
            // graphProperties={{
            //     minNodeSize: 1,
            //     maxNodeSize: 2,
            //     minEdgeSize: 0.2,
            //     maxEdgeSize: 0.5
            // }}
            // settings={{

            //     "drawingProperties": {
            //         defaultLabelColor: "#FFF",
            //         defaultLabelSize: 10,
            //         defaultLabelBGColor: "#ddd",
            //         defaultHoverLabelBGColor: "#002147",
            //         defaultLabelHoverColor: "#fff",
            //         labelThreshold: 10,
            //         defaultEdgeType: "curve",
            //         hoverFontStyle: "bold",
            //         fontStyle: "bold",
            //         activeFontStyle: "bold"
            //     },
            //     "graphProperties": {
            //         minNodeSize: 1,
            //         maxNodeSize: 2,
            //         minEdgeSize: 0.2,
            //         maxEdgeSize: 0.5
            //     },
            //     "mouseProperties": {
            //         "maxRatio": 20,
            //         "minRatio": 0.75
            //     }
            // }}
            >
                <LoadGraph dataSet={dataSet} />


                <ControlsContainer position={"bottom-right"}>
                    <ZoomControl />
                    <FullScreenControl />
                    <LayoutForceAtlas2Control />
                </ControlsContainer>
                <ControlsContainer position={"top-right"}>
                    <SearchControl style={{ width: "200px" }} />
                </ControlsContainer>
            </SigmaContainer>
        </>
    );
};