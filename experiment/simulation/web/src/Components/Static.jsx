import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";
import { Html } from "@react-three/drei";
import { Helmet } from "react-helmet";

const Static = () => {
  const containerRef = useRef();
  const textLabels = [];

  const [currentTextLabel, setCurrentTextLabel] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, .7, 5); 
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("black");
    renderer.setSize(window.innerWidth / 1.2, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
   
    const imageUrls = [
      process.env.PUBLIC_URL + "/images/user14.png",
      process.env.PUBLIC_URL + "/images/user14.png",
    ];
 
  const imagePositions = [
    new THREE.Vector3(-2, 2, -0.1), 
    new THREE.Vector3(2, 2, -0.1),
  ];

  const textureLoader = new THREE.TextureLoader();

  const imageSizes = [.6, 0.6]; 

  imageUrls.forEach((imageUrl, index) => {
    textureLoader.load(imageUrl, (texture) => {
      const size = imageSizes[index] || 1.0;
      const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const imageGeometry = new THREE.PlaneGeometry(size, size); 
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.position.copy(imagePositions[index]);
      scene.add(imageMesh);
  
      const imageTextLabel = new Text();
      imageTextLabel.text = `User ${index + 1}`;
      imageTextLabel.color = 'white';
      imageTextLabel.fontSize = 0.15;
      imageTextLabel.position.set(
        imagePositions[index].x-.15,
        imagePositions[index].y - 0.3,
        imagePositions[index].z
      );
      scene.add(imageTextLabel);
    });
  });
 
 
    const nodes = [];
    const linesGroup = new THREE.Group();

    const numNodes = 6;
    const radius = 2;
    const angleIncrement = (2 * Math.PI) / numNodes;
    for (let i = 0; i < numNodes; i++) {
      const x = radius * Math.cos(i * angleIncrement);
      const y = radius * Math.sin(i * angleIncrement);
      const z = 0;
      let nodeColor = "red";
      if (i === 0) {
        nodeColor = "red";
      }
      const node = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 16),
        new THREE.MeshBasicMaterial({ color: nodeColor })
      );
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);

      const labelText = (i + 1).toString();
      const text = new Text();
      text.text = labelText;
      text.color = "Black";
      text.fontSize = 0.2;
      text.position.set(x - 0.0, y - -0.2);
      scene.add(text);
    }

    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < i; j++) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[j].position,
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        linesGroup.add(line);
      }
    }

    scene.add(linesGroup);
    const square = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial({ color: "red" })
    );
    square.position.copy(nodes[0]);
    scene.add(square);

  


   

    let startTime = Date.now();
    let currentIndex = 0;
    let startNodeIndex = (currentIndex + 2) % numNodes;
    const removeTextLabel = (textLabel) => {
      scene.remove(textLabel);
      textLabels.splice(textLabels.indexOf(textLabel), 1);
    };

      
    const addTextLabelWithTimeDuration = (text, position, fontSize, color) => {
      const textLabel = new Text();
      textLabel.text = text;
      textLabel.color = color;
      textLabel.fontSize = fontSize;
      textLabel.position.copy(position);
      scene.add(textLabel);

      textLabels.push(textLabel);
    };

    setCurrentTextLabel(
      addTextLabelWithTimeDuration(
        "Smart Contract- Transaction Process",
        new THREE.Vector3(-2,3, 0),
        0.2,
        "red"
      )
    );

   
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef} />;
};

export default Static;