import { makeProject } from "@motion-canvas/core/lib";
import { Vector2 } from "@motion-canvas/core/lib/types";

import example from "./scenes/example?scene";
import phone from "./scenes/phone?scene";
import learning from "./scenes/learning?scene";

export default makeProject({
  background: "#101010",
  size: new Vector2(1920, 1080),
  // background: "#ffffff",
  scenes: [learning],
  // scenes: [phone],
  // size: new Vector2(1080, 1920),
});
