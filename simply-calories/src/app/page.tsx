"use client";

export default function Home() {
  return (
    <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
        <div className="flex flex-col">
          <section className="px-8 md:px-12">
            <h2 className="font-bold pb-4 pt-12">
              Welcome to Simply Calories!
            </h2>
            <p className="pt-4">
              Simply Calories is a free-to-use calorie and fasting tracker
              application. Our app offers a wide range of features, including
              the ability to search for food and access their nutritional
              information. We also provide a functional BMR (Basal Metabolic
              Rate) calculator, allowing you to input your details and determine
              the approximate daily calorie intake required to maintain, lose,
              or gain weight.
            </p>

            <p className="pt-4">
              To unlock the full potential of our app, consider creating an
              account. Features like the recipe maker and a weekly caloric
              intake tracking graph with goal setting are accessible to
              logged-in users only.
            </p>

            <p className="pt-4">
              Additionally, we offer a recipe search function where you can
              discover delicious recipes while viewing their calorie and
              nutrient details. If you enjoy cooking, don&apos;t forget to use
              our Recipe Creator under{" "}
              <span className="font-semibold">My Recipes</span> to save your
              favorite recipes for future use. The app will also provide a
              caloric value based on the ingredients you select.
            </p>

            <p className="pt-4 pb-8">
              Enjoy exploring all that Simply Calories has to offer, and if you
              encounter any issues or have questions, please don&apos;t hesitate
              to reach out through our contact page. We aspire to assist you in
              achieving a healthier lifestyle!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
