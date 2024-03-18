import Link from "next/link";
import "../app/css/additional-styles/buttons.css";
import "../public/images/abstract-blue-and-green-wave-glossy.png";

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url('/images/Untitled-design.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-0">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1
              className="h1 mb-4"
              data-aos="fade-up"
              style={{
                color: "#FFFFFF",
                textShadow: `
      -1px -1px 0 #435373,  
       1px -1px 0 #435373,
      -1px  1px 0 #435373,
       1px  1px 0 #435373`,
              }}
            >
              A new way to find care
            </h1>

            <p
              className="text-xl mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{
                color: "#FFFFFF",
                fontWeight: 700,
                textShadow: `
              -1px -1px 0 #435373,  
               1px -1px 0 #435373,
              -1px  1px 0 #435373,
               1px  1px 0 #435373`,
              }}
            >
              Find evidence-based alternative and nontraditional medical care.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <Link
                  href="/quiz"
                  className="btn text-white bg-flora hover:bg-lavender w-full mb-4 sm:w-auto sm:mb-20"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
