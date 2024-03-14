import Image from "next/image";
import FeatImage02 from "../public/images/cropped-diverse-network.png";

export default function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header for the 2nd item */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2
              className="text-3xl font-bold mb-6 mx-auto text-center"
              style={{ color: "#435373" /* Assuming deep-slate is #435373 */ }}
            >
              Diverse Practitioner Network
            </h2>
          </div>

          {/* 2nd item */}
          <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
            {/* Image */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl"
              data-aos="fade-up"
            >
              <Image
                className="max-w-full mx-auto md:max-w-none h-auto"
                src={FeatImage02}
                width={540}
                height={405}
                alt="Features 02"
              />
            </div>
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
              data-aos="fade-left"
            >
              <div className="md:pl-4 lg:pl-12 xl:pl-16">
                <div
                  className="text-xl mb-2"
                  style={{ color: "#435373" /* deep-slate */ }}
                >
                  More options. Easy access.
                </div>
                <h3 className="h3 mb-3" style={{ color: "#435373" }}>
                  Access a diverse network of practitioners that help people
                  find alternative and cutting-edge therapies to achieve a
                  healthier and more fulfilling life.
                </h3>
                <p
                  className="text-xl mb-4"
                  style={{ color: "#9fa4b7" /* medium-slate */ }}
                >
                  Natu’s responsive approach to care supports people across a
                  wide range of needs, interests and goals. Our personalized
                  options are backed up by a practitioner network with varying
                  clinical expertise and modalities to help make access to care
                  easier than ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
