import { makeScene2D } from "@motion-canvas/2d";
import { Circle, Rect, Shape } from "@motion-canvas/2d/lib/components";
import { all, waitFor } from "@motion-canvas/core/lib/flow";
import { easeInOutCubic } from "@motion-canvas/core/lib/tweening";
import {
  createRef,
  Reference,
  ReferenceReceiver,
} from "@motion-canvas/core/lib/utils";

type FormFieldProps = {
  x?: number;
  y?: number;
  width?: number;
};
const FormField = ({ x, y, width }: FormFieldProps) => {
  return (
    <Rect layout direction={"column"} gap={8} x={x} y={y} width={width}>
      <Rect width={"25%"} height={30} fill={"#b6d6cc"} radius={8} />

      <Rect width={"100%"} height={120} fill={"#eaf4f1"} radius={8} />
    </Rect>
  );
};

type FormGroupProps = {
  ref?: ReferenceReceiver<any>;
  x?: number;
  y?: number;
  width?: number;
};
const FormGroup = ({ ref, x, y, width }: FormGroupProps) => {
  return (
    <Rect
      ref={ref}
      layout
      position={[x, y]}
      padding={4}
      fill={"#dddddd"}
      radius={8}
    >
      <Rect
        layout
        radius={8}
        padding={[20, 24]}
        fill={"#ffffff"}
        direction={"column"}
        gap={24}
        width={width}
      >
        <FormField />

        <FormField />
      </Rect>
    </Rect>
  );
};

type ButtonProps = {
  x?: number;
  y?: number;
  width?: number;
};
const Button = (props: ButtonProps) => {
  return <Rect {...props} height={100} fill={"#b3d1cb"} radius={200} />;
};

type CircularButtonProps = {
  ref?: ReferenceReceiver<any>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
const CircularButton = (props: CircularButtonProps) => {
  return <Circle {...props} fill={"#ff8c20"} />;
};

export default makeScene2D(function* (view) {
  const itemsWidth = 800;
  const buttonWidth = 400;

  const circularButton = createRef<Circle>();
  const firstForm = createRef<Rect>();
  const secondForm = createRef<Rect>();

  view.add(<FormField x={0} y={-800} width={itemsWidth} />);
  view.add(<Button x={0} y={800} width={buttonWidth} />);
  view.add(
    <CircularButton
      ref={circularButton}
      x={400}
      y={750}
      width={175}
      height={175}
    />
  );

  yield* clickEffect(circularButton);

  view.add(<FormGroup ref={firstForm} x={0} y={-400} width={itemsWidth} />);
  yield* all(
    firstForm().opacity(0, 0).to(1, 0.5, easeInOutCubic),
    firstForm().scale(0, 0).to(1, 0.5, easeInOutCubic)
  );

  yield* waitFor(1);

  yield* clickEffect(circularButton);

  view.add(<FormGroup ref={secondForm} x={0} y={25} width={itemsWidth} />);
  yield* all(
    secondForm().opacity(0, 0).to(1, 0.5, easeInOutCubic),
    secondForm().scale(0, 0).to(1, 0.5, easeInOutCubic)
  );
});

function* clickEffect(ref: Reference<Shape>) {
  yield* ref().scale(0.8, 0.4).to(1, 0.4);
}
