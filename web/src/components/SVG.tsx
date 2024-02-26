interface SVGProps {
  svgString: string;
  style?: any;
}
export const SVG = ({ style = {}, svgString }: SVGProps) => {
  return (
    <div
      style={{
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
};
