export type ImageContentType = {
  section: {
    heading: string;
    body: string;
    image: {
      src: string;
      hover: string;
      shape: string;
      effect: "smoke" | "reveal" | "shape";
    };
    imageSide: "left" | "right";
  };
};

export type ImageContentDataType = {
  heading: string;
  body: string;
  image: {
    src: string;
    hover: string;
    shape: string;
    effect: "smoke" | "reveal" | "shape" | "glitch" | "snap";
  };
  imageSide: "left" | "right";
};
