import { makeScene2D } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Line, Circle, Text } from "@motion-canvas/2d/lib/components";
import { createSignal } from "@motion-canvas/core/lib/signals";
import { linear } from "@motion-canvas/core/lib/tweening";
import { Vector2 } from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {
  // const circle = createRef<Circle>();
  // view.add(<Circle ref={circle} x={0} y={0} width={100} height={100} fill={"tomato"} />)

  // yield* circle().position.x(0, 0).to(500, 2);
  // yield* all(
  //     circle().position.x(0, 0).to(250, 1).to(500, 2),
  //     delay(1, circle().position.y(0, 0).to(500, 2))
  // );

  // const colors = [
  //     '#ff6470',
  //     '#ffc66d',
  //     '#68abdf',
  //     '#99c47a',
  // ];
  // yield* loop(
  //     colors.length,
  //     i => circle().fill(colors[i], 0.5),
  // );

  const textProps = {
    fontSize: 30,
    fontFamily: "monospace",
  };

  const lineProps = {
    startArrow: true,
    endArrow: true,
    lineWidth: 4,
    lineDash: [20, 20],
    endOffset: 8,
  };

  const radius = createSignal(200);
  const diameter = createSignal(() => radius() * 2);
  const perimeter = createSignal(() => 2 * Math.PI * radius());
  const area = createSignal(() => Math.PI * radius() * radius());
  const circle = createRef<Circle>();

  view.add(
    <>
      <Circle
        ref={circle}
        width={() => diameter()}
        height={() => diameter()}
        fill={"#323232"}
        stroke={"mediumseagreen"}
        lineWidth={8}
        lineDash={[40, 30]}
      ></Circle>
      <Line
        points={[() => new Vector2(0, -1 * radius()), () => new Vector2(0, 0)]}
        stroke={"tomato"}
        {...lineProps}
      />
      <Text
        fill={"tomato"}
        text={() => `R = ${radius().toFixed(0)}`}
        position={() => new Vector2(75, (-1 * radius()) / 2)}
        {...textProps}
      />
      <Line
        points={[
          () => new Vector2(0 - radius(), 0),
          () => new Vector2(0 + radius(), 0),
        ]}
        stroke={"dodgerblue"}
        {...lineProps}
      />
      <Text
        fill={"dodgerblue"}
        text={() => `D = ${diameter().toFixed(0)}`}
        position={() => new Vector2(0, 30)}
        {...textProps}
      />
      <Text
        position={() => new Vector2(0, -30 - radius())}
        text={() => `P = ${perimeter().toFixed(0)}`}
        fill={"mediumseagreen"}
        {...textProps}
      />
      <Text
        text={() => `A = ${area().toFixed(0)}`}
        position={() => new Vector2(0, 30 + radius())}
        fill={"white"}
        {...textProps}
      />
    </>
  );

  yield* radius(200, 0).to(400, 3, linear);
});
