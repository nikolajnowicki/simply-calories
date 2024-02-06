"use client";

export default function Contact() {
  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="flex flex-col">
          <section className="px-8 md:px-12">
            <h2 className="font-bold pb-4 pt-12">Contact Us</h2>
            <p className="pt-4">
              I would love to hear from you! If you have any questions,
              suggestions, or feedback, please do not hesitate to get in touch
              with me. You can reach me through the following methods:
            </p>

            <h3 className="font-bold pt-4">Email</h3>
            <p className="pt-4">
              Send us an email at:{" "}
              <a
                className="font-semibold"
                href="mailto:nikolaj.nowicki@gmail.com"
              >
                nikolaj.nowicki@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
