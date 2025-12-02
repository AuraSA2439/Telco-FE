import NextImage from "next/image";

export const Image = ({ src, alt }) => (
  <NextImage
    src={src}
    alt={alt}
    width={300}
    height={300}
    className="w-full h-full"
    priority={false}
  />
);