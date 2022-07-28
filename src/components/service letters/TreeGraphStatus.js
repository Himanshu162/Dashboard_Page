import React from "react";
import { Grid } from "@material-ui/core";
import Tree from "react-tree-graph";
import "../../Assets/CSS/TreeGraph.css";

const TreeGraphStatus = () => {
  let data = {
    name: "Letters",
    textProps: { x: -25, y: 25 },
    children: [
      {
        name: "New2",
        pathProps: "New2",
        textProps: { x: -25, y: 25 },
        children: [],
      },
      {
        name: "New4",
        textProps: { x: -25, y: 25 },
        children: [
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New4",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New4",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
        ],
      },
      {
        name: "New2",
        textProps: { x: -25, y: 25 },
        children: [],
      },
      {
        name: "New4",
        textProps: { x: -25, y: 25 },
        children: [
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New4",
            textProps: { x: -25, y: 25 },
            children: [],
          },
        ],
      },
      {
        name: "New4",
        textProps: { x: -25, y: 25 },
        children: [
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
          {
            name: "New2",
            textProps: { x: -25, y: 25 },
            children: [],
          },
        ],
      },
      {
        name: "New2",
        textProps: { x: -25, y: 25 },
        children: [],
      },
      {
        name: "New2",
        textProps: { x: -25, y: 25 },
        children: [],
      },
    ],
  };

  return (
    <Grid container>
      <Tree
        animated={true}
        data={data}
        nodeRadius={15}
        margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        height={700}
        width={1000}
      />
    </Grid>
  );
};

export default TreeGraphStatus;
