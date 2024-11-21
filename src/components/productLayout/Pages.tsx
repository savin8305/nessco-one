"use client";
import React from "react";
import Page1 from "@/components/productLayout/Header";
import Page2 from "@/components/productLayout/ProductsGrid";
import { notFound, useParams } from "next/navigation";
import { ProductLayout } from "./types/constant";

interface ProductLayoutProps {
  productLayoutData: ProductLayout;
}

const formatMachineName = (name: string): string => {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const Page: React.FC<ProductLayoutProps> = ({ productLayoutData }) => {
  const Header = productLayoutData?.ProductLayout[0]?.Header;
  const ProductsGrid = productLayoutData?.ProductLayout[0]?.ProductsGrid;
  const params = useParams() as Record<string, string | string[]> | null;

  if (!params || !params.id) {
    return notFound();
  }

  let machinename = "";

  if (Array.isArray(params.id)) {
    machinename = params.id.join("-");
  } else if (typeof params.id === "string") {
    machinename = params.id;
  }

  if (!machinename) {
    return notFound();
  }

  // Format the machine name
  const formattedMachineName = formatMachineName(machinename);

  // Helper function to normalize title for comparison
  const normalizeTitle = (title: string) =>
    title.toLowerCase().replace(/\s+/g, " ").trim();

  // Find the product by its normalized title
  const normalizedMachinename = normalizeTitle(formattedMachineName);

  const page1machine = Header.data.find(
    (m) => normalizeTitle(m.title) === normalizedMachinename
  );
  const page2machine = ProductsGrid.data.find(
    (m) => normalizeTitle(m.title) === normalizedMachinename
  );

  if (!page1machine || !page2machine) {
    return notFound();
  }

  return (
    <>
      <Page1 page1machine={page1machine} />
      <Page2
        page2machine={page2machine}
        productLayoutData={productLayoutData}
      />
    </>
  );
};

export default Page;
