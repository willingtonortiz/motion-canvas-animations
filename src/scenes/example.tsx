import { Circle } from "@motion-canvas/2d/lib/components";
import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { createRef } from "@motion-canvas/core/lib/utils";

export default makeScene2D(function* (view) {
  const circle = createRef<Circle>();

  const circleDiameter = 200;
  const circleRadius = circleDiameter / 2;
  const midWidth = 960;
  const midHeight = 540;
  const canvasRect = {
    left: -midWidth + circleRadius,
    top: -midHeight + circleRadius,
    right: midWidth - circleRadius,
    bottom: midHeight - circleRadius,
  };

  view.add(
    <Circle
      ref={circle}
      x={canvasRect.left}
      y={canvasRect.top}
      width={circleDiameter}
      height={circleDiameter}
      fill={"#e12338"}
    />
  );

  // Move in the rect
  yield* circle().position.x(canvasRect.left, 0).to(canvasRect.right, 1);
  yield* circle().position.y(canvasRect.top, 0).to(canvasRect.bottom, 1);
  yield* circle().position.x(canvasRect.right, 0).to(canvasRect.left, 1);
  yield* circle().position.y(canvasRect.bottom, 0).to(canvasRect.top, 1);
});

// ffmpeg command
// ffmpeg -framerate 60 -pattern_type sequence -start_number 000001 -i ./output/project/%06d.png -s:v 1920x1080 -c:v libx264 -pix_fmt yuv420p out.mp4

// ffmpeg create gif
// ffmpeg -i out.mp4 -pix_fmt rgb24 -loop-output 0 out.gif
