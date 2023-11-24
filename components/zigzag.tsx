import Image from "next/image";
import FeatImage01 from "../public/images/hero-image.png";
import FeatImage02 from "../public/images/cropped-diverse-network.png";

export default function Zigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-base font-semibold py-2 px-4 m-2 text-green-600 bg-green-200 rounded-full mb-4">
              How It Works
            </div>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                data-aos="fade-up"
              >
                <Image
                  className="max-w-full mx-auto md:max-w-none h-auto"
                  src={FeatImage01}
                  width={540}
                  height={405}
                  alt="Features 01"
                />
              </div>
              {/* Content */}
              <div
                className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">
                    Simple triage. Tailored care.
                  </div>
                  <h3 className="h3 mb-3">
                    We’ll help you build a personalized path to care
                  </h3>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>
                        Tell us a little about yourself so we can recommend
                        personalized options.
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>
                        Select the right path for you - whether that’s meeting
                        with a specialized practitioner or engaging in a library of
                        resources that can help guide you on your path to a
                        healthier you
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-10"></div>
            {/* 2nd item */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex text-base font-semibold py-2 px-4 text-green-600 bg-green-200 rounded-full">
                Diverse Practitioner Network
              </div>
            </div>

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
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">
                    More options. Easy access.
                  </div>
                  <h3 className="h3 mb-3">
                    Access a diverse network of practitioners within the natural
                    medicine space, and get care that’s tailored to your
                    specific needs{" "}
                  </h3>
                  <p className="text-xl text-gray-400 mb-4">
                    Natu’s responsive approach to care supports people across a
                    wide range of needs, interests and goals. Our personalized
                    options are backed up by a practitioner network with varying
                    clinical expertise and modality to help make access to care
                    easier than ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
