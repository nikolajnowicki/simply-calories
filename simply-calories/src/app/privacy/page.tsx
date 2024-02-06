"use client";

export default function Privacy() {
  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="flex flex-col">
          <section className="px-8 md:px-12">
            <h2 className="font-bold pb-4 pt-12">Privacy Policy</h2>
            <p>
              At Simply Calories, we take your privacy seriously. This privacy
              policy outlines how we collect, use, and protect your data when
              you use our services.
            </p>

            <h3 className="font-bold pt-4 pb-2">Data Usage</h3>
            <p>
              Simply Calories collects and uses data solely for the purpose of
              creating and managing user accounts. We do not sell your data or
              use it to track user trends.
            </p>

            <h3 className="font-bold pt-4 pb-2">Data Removal and Access</h3>
            <p>
              You have the right to request the removal of your data or to
              access the data we have on you. If you wish to exercise these
              rights or have any questions about your data, please contact us.
            </p>

            <h3 className="font-bold pt-4 pb-2">Policy Updates</h3>
            <p>
              This privacy policy may be updated from time to time. Any changes
              to our policy will be reflected on this page. Please review this
              policy periodically to stay informed about how we protect your
              privacy.
            </p>

            <h3 className="font-bold pt-4 pb-2">Contact Us</h3>
            <p>
              If you have any questions or concerns about your privacy or this
              policy, please do not hesitate to contact us.
            </p>

            <p className="pt-4 pb-8">
              This privacy policy was last updated on February 6, 2024.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
