import NextImage from "next/image";

export const Image = ({ src, alt }) => (
  <NextImage
    src={src}
    alt={alt}
    width={500}
    height={500}
    className="w-full h-48 object-cover rounded-xl"
    priority={false}
  />
);