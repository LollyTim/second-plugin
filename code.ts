figma.showUI(__html__, {
  width: 320,
  height: 640,
  title: "Color tint Generator",
});

figma.ui.onmessage = async (msg) => {
  await figma.loadAllPagesAsync();

  console.log("Received message:", msg);
  if (msg.type === "actionGenerate") {
    const {
      circleSize,
      colorCode,
      colorName,
      circleSpacing,
      frameDirection,
      tintNumber,
    } = msg.formDataObj;

    const parentFrame = figma.createFrame();
    parentFrame.name = "Tints for the " + colorName + " color";
    parentFrame.layoutMode = frameDirection.toUpperCase();
    parentFrame.paddingLeft = 64;
    parentFrame.paddingRight = 64;
    parentFrame.paddingBottom = 64;
    parentFrame.paddingTop = 64;
    parentFrame.itemSpacing = parseInt(circleSpacing, 10);
    parentFrame.primaryAxisSizingMode = "AUTO";
    parentFrame.counterAxisSizingMode = "AUTO";

    const hexToRgb = (
      hex: string
    ): { r: number; g: number; b: number } | null => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
          }
        : null;
    };

    for (let i = 0; i < tintNumber; i++) {
      const tintNode = figma.createEllipse();
      tintNode.name = `${colorName} ${100 - i * 10}`; // Corrected naming
      tintNode.resize(parseInt(circleSize, 10), parseInt(circleSize, 10));

      const rgb = hexToRgb(colorCode);
      if (rgb) {
        // Apply tint effect

        tintNode.fills = [
          {
            type: "SOLID",
            color: {
              r: rgb.r,
              g: rgb.g,
              b: rgb.b,
            },
          },
        ];
        // Add the node to the frame
      }
      tintNode.opacity = (100 - i * 10) / 100;
      parentFrame.appendChild(tintNode);
      // select and zoom to the generate frame
      const selectFrame: FrameNode[] = [];
      selectFrame.push(parentFrame);
      figma.currentPage.selection = selectFrame;
      figma.viewport.scrollAndZoomIntoView(selectFrame);
    }

    console.log("Generating action detected");
    figma.closePlugin("Tint Generated Successfully");
  } else if (msg.type === "actionExit") {
    console.log("Exit action detected");
    figma.closePlugin();
  }
};
