import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, price: "Rp. 100.000", image: "/assets/paket1.svg" }, 
    { id: 2, price: "Rp. 25.000", image: "/assets/paket2.svg" }, 
    { id: 3, price: "Rp. 15.000", image: "/assets/paket3.svg" }, 
    { id: 4, price: "Rp. 8.500", image: "/assets/paket4.svg" }, 
    { id: 5, price: "Rp. 100.000", image: "/assets/paket1.svg" }, 
    { id: 6, price: "Rp. 25.000", image: "/assets/paket2.svg" }, 
    { id: 7, price: "Rp. 15.000", image: "/assets/paket3.svg" }, 
    { id: 8, price: "Rp. 8.500", image: "/assets/paket4.svg" },
  ];

  return NextResponse.json(products);
}