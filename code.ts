figma.showUI(__html__, {
  width: 320,
  height: 640,
  title: "Color tint Generator",
});

figma.ui.onmessage = async (msg) => {
  await figma.loadAllPagesAsync();

  console.log("Received message:", msg);
  if (msg.type === "actionGenerate") {
    console.log(msg.formDataObj);
    console.log("Generating action detected");
    figma.closePlugin("Tint Generated Successfully");
  } else if (msg.type === "actionExit") {
    console.log("Exit action detected");
    figma.closePlugin();
  }
};
