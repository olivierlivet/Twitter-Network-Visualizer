
import { useState, useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { ControlsContainer, ZoomControl, FullScreenControl, SearchControl, useRegisterEvents } from "@react-sigma/core";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";

import "@react-sigma/core/lib/react-sigma.min.css";
import axios from 'axios'

export const LoadGraph = ({ space }) => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();

    const [data, setData] = useState(undefined);

    useEffect(
        () => {
            if (!data) {
                getData(space);
            }
        },
        [space]
    )

    const getData = (space) => {

        axios.get(
            `/data/${space}.json`
        ).then(
            res => {
                // setData(res.data);
                // setGraph();

                const graph = new Graph();

                res.data.nodes
                    .forEach(({ id, size, x, y, color, label, attributes }) => graph.addNode(id, { label: label, color: color, size: size / 3, x: x, y: y }))

                res.data.edges
                    .forEach(({ id, source, target, color, label, size }) => graph.addEdge(source, target, { color: color, size: size / 5, "type": "arrow" }))


                loadGraph(graph);
            }
        )

    }

    const getNodeColor = (category) => {
        let colors = [
            `rgb(115,192,0)`,
            `rgb(255, 204, 0)`,
            `rgb(223,137,255)`,
            `rgb(255,136,5)`,
            `rgb(255,85,132)`,
            `rgb(192,192,192)`,
            `rgb(0,196,255)`,
            `rgb(0,189,148)`
        ]
        let categoryIndex = parseInt(category);
        return colors[categoryIndex]
    }

    // useEffect(() => {
    //     // Register the events
    //     registerEvents({
    //         // node events
    //         clickNode: (event) => {
    //             console.log("clickNode", event.event, event.node, event.preventSigmaDefault);

    //         }



    //         // clickNode: (event) => console.log("clickNode", event.event, event.node, event.preventSigmaDefault),
    //         // doubleClickNode: (event) => console.log("doubleClickNode", event.event, event.node, event.preventSigmaDefault),
    //         // rightClickNode: (event) => console.log("rightClickNode", event.event, event.node, event.preventSigmaDefault),
    //         // wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
    //         // downNode: (event) => console.log("downNode", event.event, event.node, event.preventSigmaDefault),
    //         // enterNode: (event) => console.log("enterNode", event.node),
    //         // leaveNode: (event) => console.log("leaveNode", event.node),
    //         // // edge events
    //         // clickEdge: (event) => console.log("clickEdge", event.event, event.edge, event.preventSigmaDefault),
    //         // doubleClickEdge: (event) => console.log("doubleClickEdge", event.event, event.edge, event.preventSigmaDefault),
    //         // rightClickEdge: (event) => console.log("rightClickEdge", event.event, event.edge, event.preventSigmaDefault),
    //         // wheelEdge: (event) => console.log("wheelEdge", event.event, event.edge, event.preventSigmaDefault),
    //         // downEdge: (event) => console.log("downEdge", event.event, event.edge, event.preventSigmaDefault),
    //         // enterEdge: (event) => console.log("enterEdge", event.edge),
    //         // leaveEdge: (event) => console.log("leaveEdge", event.edge),
    //         // // stage events
    //         // clickStage: (event) => console.log("clickStage", event.event, event.preventSigmaDefault),
    //         // doubleClickStage: (event) => console.log("doubleClickStage", event.event, event.preventSigmaDefault),
    //         // rightClickStage: (event) => console.log("rightClickStage", event.event, event.preventSigmaDefault),
    //         // wheelStage: (event) => console.log("wheelStage", event.event, event.preventSigmaDefault),
    //         // downStage: (event) => console.log("downStage", event.event, event.preventSigmaDefault),
    //         // // default mouse events
    //         // click: (event) => console.log("click", event.x, event.y),
    //         // doubleClick: (event) => console.log("doubleClick", event.x, event.y),
    //         // wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
    //         // rightClick: (event) => console.log("rightClick", event.x, event.y),
    //         // mouseup: (event) => console.log("mouseup", event.x, event.y),
    //         // mousedown: (event) => console.log("mousedown", event.x, event.y),
    //         // mousemove: (event) => console.log("mousemove", event.x, event.y),
    //         // // default touch events
    //         // touchup: (event) => console.log("touchup", event.touches),
    //         // touchdown: (event) => console.log("touchdown", event.touches),
    //         // touchmove: (event) => console.log("touchmove", event.touches),
    //         // // sigma kill
    //         // kill: () => console.log("kill"),
    //         // // sigma camera update
    //         // updated: (event) => console.log("updated", event.x, event.y, event.angle, event.ratio),
    //     });
    // }, [registerEvents]);

    return null;
};

export const DisplayGraph = ({ space }) => {
    return (
        <>
            <SigmaContainer
                key={space}
                id="sigmaContainer"
                style={{
                    height: "100vh",
                    width: "100vw",
                    margin: 0,
                    padding: 0,
                    overflow: `hidden`,
                    background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(1,11,55,1) 100%)`
                }}
                settings={{
                    defaultNodeColor: `#FF0000`,
                    labelColor: { color: "#FFFFFF" },

                    defaultEdgeType: 'curve',
                    minEdgeSize: 0,
                    maxEdgeSize: 10,

                    // defaultLabelColor: "#000",
                    // defaultLabelSize: 14,
                    // defaultLabelBGColor: "#ddd",
                    // defaultHoverLabelBGColor: "#002147",
                    defaultLabelHoverColor: "#FF0000",
                    // labelThreshold: 10,
                    // defaultEdgeType: "curve",
                    // hoverFontStyle: "bold",
                    // fontStyle: "bold",
                    // activeFontStyle: "bold"
                }}
            >
                <LoadGraph space={space} />
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