"use client";

export default function About() {
  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="flex flex-col">
          <section className="px-8 md:px-12">
            <h2 className="font-bold pb-4 pt-12">About Simply Calories</h2>
            <p>
              Simply Calories is a personal project created with Next.js 14. It
              was developed as part of an educational journey to deepen my
              understanding of web development and the Next.js framework.
            </p>

            <p className="pt-4">
              The main goal of this project is to provide a free-to-use calorie
              and fasting tracker application with a variety of features to help
              users manage their dietary habits and track their nutritional
              intake.
            </p>

            <p className="pt-4">
              As the project continues to evolve, I aim to enhance its
              functionality and user experience. I am passionate about promoting
              healthier lifestyles and believe that Simply Calories can be a
              valuable tool for individuals striving to improve their diet and
              well-being.
            </p>

            <p className="pt-4 pb-8">
              Thank you for visiting Simply Calories, and I hope you find this
              application helpful in your journey towards a healthier lifestyle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
