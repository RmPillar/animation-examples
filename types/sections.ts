export type ImageContentType = {
  section: {
    heading: string;
    body: string;
    image: {
      src: string;
      hover: string;
      shape: string;
      effect: "gloop" | "reveal" | "shape";
    };
    imageSide: "left" | "right";
  };
};
