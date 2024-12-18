import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import NavLayout from "@/components/Navbar/NavLayout";
import {
  CountryCode,
  countryNames,
} from "@/components/Constants/Navbar/config";
import dynamic from "next/dynamic";
import { locales, validCountryISOs } from "@/i18n";
import { FormProvider } from "./context/FormContext";
import ContactIcons from "@/components/Contact/ContactIcon";
import { getBaseUrl } from "@/app/api/environment";
import { EnquiryCartProvider } from "./context/EnquiryContext";
const FooterLayout = dynamic(() => import("@/components/Footer/FooterLayout"));
const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--poppins",
  weight: ["400", "500", "600", "700"],
});

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
export async function generateMetadata({
  params: { country, locale },
}: {
  params: { country: CountryCode; locale: string };
}) {
  const t = await getTranslations({ locale });
  const countryName = countryNames[country] || "Country";

  let heroData;
  try {
    const heroRes = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!heroRes.ok) {
      throw new Error(`Failed to fetch hero data for locale: ${locale}`);
    }
    heroData = await heroRes.json();
  } catch (error) {
    console.error(`Error fetching hero data for locale ${locale}:`, error);
    const fallbackRes = await fetch(`${apiUrl}en/hero.json`);
    heroData = await fallbackRes.json();
  }
  const metaTitle =
    heroData?.home?.[0]?.homeSeoData?.title || t("meta.home.title");
  const metaDescription =
    heroData?.home?.[0]?.homeSeoData?.description || t("meta.home.description");
  return {
    title: `${metaTitle} - ${countryName}`,
    description: `${metaDescription} (${countryName})`,
  };
}
const generateHreflangLinks = (locale: string) => {
  const supportedLocales = validCountryISOs; // Array of valid country codes
  const baseUrl = getBaseUrl(); // Get the base URL dynamically
  // Extract the parts of the URL to make the country dynamic
  const urlParts = new URL(baseUrl);
  const pathSegments = urlParts.pathname.split("/");
  // Ensure "locale" and country segment exist in the URL structure
  if (pathSegments.length >= 3) {
    pathSegments[1] = "{country}"; // Replace the country code segment dynamically
  }
  const dynamicPath = pathSegments.join("/");
  const baseDomain = `${urlParts.origin}${dynamicPath}`;
  // Generate hreflang links
  const hreflangLinks = supportedLocales.map((country) => {
    const url = baseDomain.replace("{country}", country.toLowerCase());
    return (
      <link
        key={country}
        rel="alternate"
        hrefLang={`${locale}-${country.toUpperCase()}`}
        href={url}
      />
    );
  });
  // Add the x-default link
  hreflangLinks.push(
    <link
      key="x-default"
      rel="alternate"
      hrefLang="x-default"
      href={baseUrl} // Use the original URL as the x-default
    />
  );

  return hreflangLinks;
};

// Root layout component with internationalization
export default async function RootLayout({
  children,
  params: { country, locale },
}: {
  children: React.ReactNode;
  params: { country: CountryCode; locale: string };
}) {
  // Fallback to English if locale is not supported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  locale = locales.includes(locale as any) ? locale : "en";
  // Ensure locale is correctly set here for debugging
  unstable_setRequestLocale(locale);

  // Fetch translations for the locale

  return (
    <html lang={`${locale}-${country.toUpperCase()}`}>
      <head>{generateHreflangLinks(locale)}</head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        {/* NextIntlClientProvider wraps the children with messages and locale */}
        {/* Navbar with internationalization */}
        <FormProvider>
          <EnquiryCartProvider>
            <NavLayout params={{ locale }} />
            {/* Page content */}
            <ContactIcons />
            {children}
            <div>
              <FooterLayout params={{ locale }} />
            </div>
          </EnquiryCartProvider>
        </FormProvider>
        <Script
          src="https://cdn.pagesense.io/js/nesscoindia/ff3c25fdacd845338fcb5edd343fcde6.js"
          strategy="lazyOnload"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16529601205"
        ></Script>
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16529601205');
          `}
        </Script>
        <Script id="zsiqchat" strategy="lazyOnload">
          {`
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "siq57ecdd6785594ae3a0a956b5169f571c3e9a79d85694cb61eae8437cb511a908",
              values: {},
              ready: function() {}
            };
            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zohopublic.com/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
          `}
        </Script>
      </body>
    </html>
  );
}
