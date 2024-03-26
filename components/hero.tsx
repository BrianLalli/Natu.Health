import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter
import "../app/css/additional-styles/buttons.css";
import PageIllustration from "./page-illustration";
import PageIllustration2 from "./page-illustration2";
import SearchBar from "./search-bar.client";
import "../app/css/additional-styles/hero.css";

export default function Hero() {
  const router = useRouter(); // Initialize useRouter

  // Updated handleSearch to accept focusArea and location, and to use Next.js routing
  const handleSearch = (focusArea: string, location: string) => {
    router.push({
      pathname: "/practitioners", // Update this path based on your routing structure
      query: { focusArea, zipCode: location }, // Passing focusArea and zipCode as query parameters
    });
  };

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div
          className="hide-on-mobile"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 1,
          }}
        >
          <PageIllustration2 pageName="hero2" />
        </div>
        <div
          className="hide-on-mobile"
          style={{
            position: "absolute",
            top: 0,
            right: -50,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 1,
          }}
        >
          <PageIllustration pageName="hero1" />
        </div>

        {/* Hero content */}
        <div
          className="relative pt-10 pb-10 md:pt-32 md:pb-0"
          style={{ zIndex: 2 }}
        >
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
            <h1
              className="h1 mb-4"
              data-aos="fade-up"
              style={{ color: "#435373" }}
            >
              A new way to find care
            </h1>
            <p
              className="text-xl mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ color: "#435373", fontWeight: "bold" }}
            >
              {" "}
              Evidence-based alternative and nontraditional medical care.
            </p>

            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link
                  href="/quiz"
                  className="btn text-white bg-flora hover:bg-lavender w-full mb-0 sm:w-auto sm:mb-0 font-bold"
                >
                  Find Personalized Care
                </Link>
              </div>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
