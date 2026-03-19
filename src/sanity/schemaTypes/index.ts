import { homeType } from "@/sanity/schemaTypes/home";
import { categoryType } from "@/sanity/schemaTypes/category";
import { contactType } from "@/sanity/schemaTypes/contact";
import { productType } from "@/sanity/schemaTypes/product";
import { aboutBrandType } from "@/sanity/schemaTypes/aboutBrand";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes = [
  homeType,
  productType,
  categoryType,
  contactType,
  aboutBrandType,
  siteSettingsType,
];

