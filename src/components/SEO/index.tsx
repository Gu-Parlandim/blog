import React from "react";
import { useSiteMetadata } from "@hooks/useSiteMetadata";

function constructUrl(baseUrl: string, path: string): string {
  if (baseUrl === "" || path === "") return "";
  return `${baseUrl}${path}`;
}

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {
  const { site, file } = useSiteMetadata();

  let defaultValues = {
    title: "",
    description: "",
    siteUrl: "",
    twitterUsername: "",
  };

  if (site?.siteMetadata) {
    const { description, title, siteUrl, twitterUsername } = site.siteMetadata;

    defaultValues = {
      title: title || "",
      description: description || "",
      siteUrl: siteUrl || "",
      twitterUsername: twitterUsername || "",
    };
  }

  const seoImage = file?.childImageSharp?.fixed?.src || "";
  const seoImageSrc = constructUrl(defaultValues.siteUrl, seoImage);

  const titleWithTemplate = title
    ? `Parlandim<dev> - ${title}`
    : defaultValues.title;

  const seo = {
    title: titleWithTemplate,
    description: description || defaultValues.description,
    url: `${defaultValues.siteUrl}${pathname || ``}`,
    twitterUsername: defaultValues.twitterUsername,
    image: seoImageSrc,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={seo.title} />

      {children}
    </>
  );
};

export default SEO;