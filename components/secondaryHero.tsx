import Link from "next/link";
import PageIllustration from "./page-illustration";
import PageIllustration2 from "./page-illustration2"; // Import if you intend to use a second illustration
import "../app/css/additional-styles//secondaryHero.css";

export default function SecondaryHero() {
  return (
    <section>
      <div className="max-w-6xl mx-auto pt-40 pb-40 px-4 sm:px-6 relative">
        {/* Illustrations behind hero content */}
        {/* Ensure the container div for each illustration has appropriate styles for positioning */}
        <div
        className="hide-on-mobile"
          style={{
            position: "absolute",
            top: -0,
            left: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 1,
          }}
        >
          <PageIllustration2 pageName="secondaryHero1" />
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
            transform: "scaleY(-1)", // Add this line to flip the illustration vertically
          }}
        >
          <PageIllustration pageName="secondaryHero2" />
        </div>

        {/* Hero content */}
        <div
          className="relative pt-32 pb-10 md:pt-10 md:pb-10"
          style={{ zIndex: 1 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="h1 mb-4"
              data-aos="fade-up"
              style={{ color: "#435373" }}
            >
              Find Personalized Care
            </h1>
            <Link
              href="/quiz"
              className="btn text-white bg-flora hover:bg-lavender w-full mb-4 sm:w-auto sm:mb-0"
              style={{ margin: "20px" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
