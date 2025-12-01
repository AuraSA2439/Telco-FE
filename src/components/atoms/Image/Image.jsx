import NextImage from "next/image";

export const Image = ({ src, alt }) => (
  <NextImage
    src={src}
    alt={alt}
    width={400}
    height={800}
    className="w-full h-48 object-cover rounded-xl"
    priority={false}
  />
);