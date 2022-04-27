// Create the application helper and add its render target to the page
let app = new PIXI.Application({
  width: 640,
  height: 540,
  backgroundColor: 0xffffff,
});
document.body.appendChild(app.view);

const spineLoaderOptions = { metadata: { spineSkeletonScale: 1 } };

app.loader
  .add("iroh", "/assets/iroh.json", spineLoaderOptions)
  .load(onAssetsLoaded);

app.stage.interactive = true;
app.stage.buttonMode = true;

function onAssetsLoaded(loader, res) {
  const iroh = new PIXI.spine.Spine(res.iroh.spineData);

  // set current skin
  iroh.skeleton.setSlotsToSetupPose();

  // set the position
  iroh.x = 320;
  iroh.y = 450;

  iroh.scale.set(1);

  iroh.state.setAnimation(1, "head", true);
  iroh.state.setAnimation(2, "smile", true);

  // play animation
  iroh.state.setAnimation(0, "idle", true);
  let currentAnimation = "idle";

  app.stage.on("pointertap", () => {
    let newAnimation = currentAnimation === "idle" ? "wiggle" : "idle";
    currentAnimation = newAnimation;
    iroh.state.setAnimation(0, newAnimation, true);
  });

  app.stage.addChild(iroh);
}
