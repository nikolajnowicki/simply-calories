import React from "react";

const InformationTab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="px-8 md:px-12">
        <h3 className="font-bold pb-4 pt-12">Summary</h3>
        <p>
          Fasting is an ancient practice that involves voluntarily abstaining
          from food or caloric intake for a specific period. It has been
          observed in various cultures and religions for centuries, often as a
          means of spiritual or physical purification. In recent years, fasting
          has gained popularity as a potential health and wellness strategy,
          with scientific research uncovering its potential benefits.
        </p>

        <h3 className="font-bold pt-12 pb-4">How The Fasting Tracker Works</h3>
        <p>
          The <span className="font-bold">Simply Calories fasting tracker</span>{" "}
          is the ideal tool for managing your fasting regimen with ease. Choose
          from preset fasting durations or input your custom timeframe. Keep an
          eye on your progress with a real-time countdown, and if plans change,
          end your fast at your convenience. Your fasting data is securely
          stored for future reference, and our tracker stays with you even as
          you switch pages or close your browser. Simplify your fasting journey
          with the user-friendly tracker.
        </p>

        <h3 className="font-bold pt-12 pb-4">
          Intermittent Fasting: What Is It?
        </h3>

        <p>
          Intermittent fasting (IF) is a specific approach to fasting that
          alternates between periods of eating and fasting. Unlike traditional
          prolonged fasting, intermittent fasting typically involves shorter
          fasting windows, making it more sustainable for many people. Here are
          some common intermittent fasting methods:
        </p>

        <ul>
          <li className="py-4">
            <span className="font-semibold">16/8 Method:</span> This method
            involves fasting for 16 hours and restricting your eating to an
            8-hour window. For example, you might skip breakfast and only eat
            between 12:00 PM and 8:00 PM.
          </li>
          <li className="py-4">
            <span className="font-semibold">5:2 Method:</span> In this approach,
            you eat normally for five days of the week and significantly reduce
            calorie intake (usually around 500-600 calories) on the remaining
            two non-consecutive days.
          </li>
          <li className="py-4">
            <span className="font-semibold">Alternate-Day Fasting:</span> As the
            name suggests, you alternate between days of regular eating and days
            of fasting or consuming very few calories.
          </li>
          <li className="py-4">
            <span className="font-semibold">Eat-Stop-Eat:</span> This method
            involves fasting for a full 24 hours once or twice a week, with no
            calorie intake during the fasting period.
          </li>
          <li className="py-4">
            <span className="font-semibold">The Warrior Diet:</span> This
            approach involves fasting for 20 hours and eating one large meal or
            having a small snack during a 4-hour window in the evening.
          </li>
        </ul>

        <h3 className="font-bold pt-12 pb-4">
          Benefits of Intermittent Fasting:
        </h3>

        <ul>
          <li className="py-4">
            <span className="font-semibold">Weight Management:</span>{" "}
            Intermittent fasting can help with weight loss by reducing calorie
            intake and promoting fat loss while preserving muscle mass.
          </li>
          <li className="py-4">
            <span className="font-semibold">Improved Insulin Sensitivity:</span>{" "}
            It may lead to better blood sugar control and reduced risk of type 2
            diabetes.
          </li>
          <li className="py-4">
            <span className="font-semibold">Heart Health:</span> Some studies
            suggest that intermittent fasting may improve cardiovascular health
            by reducing risk factors like cholesterol levels and blood
            pressure..
          </li>
          <li className="py-4">
            <span className="font-semibold">Cellular Autophagy:</span> Fasting
            triggers a process called autophagy, where the body cleans out
            damaged cells and regenerates new ones, potentially slowing down the
            aging process.
          </li>
          <li className="py-4">
            <span className="font-semibold">Mental Clarity:</span> Many people
            report improved mental focus and clarity during fasting periods.
          </li>
          <li className="py-4">
            <span className="font-semibold">Longevity:</span> While more
            research is needed, some studies in animals suggest that
            intermittent fasting could extend lifespan.
          </li>
        </ul>

        <h3 className="font-bold py-12 pb-4">Important Considerations</h3>

        <ul>
          <li className="py-4">
            <span className="font-semibold">
              Consult a Healthcare Professional:
            </span>
            Before starting any fasting regimen, it's essential to consult with
            a healthcare provider, especially if you have underlying health
            conditions or are pregnant/nursing.
          </li>
          <li className="py-4">
            <span className="font-semibold">Hydration:</span> Staying
            well-hydrated is crucial during fasting periods. Water, herbal teas,
            and black coffee (without added sugars or cream) are generally
            allowed.
          </li>
          <li className="py-4">
            <span className="font-semibold">Nutrient-Rich Eating:</span> When
            you do eat, focus on nutrient-dense foods to ensure you get
            essential vitamins and minerals.
          </li>
          <li className="py-4">
            <span className="font-semibold">Listen to Your Body:</span> Pay
            attention to how your body responds to fasting. If you experience
            severe discomfort or negative effects, it's essential to reconsider
            your fasting schedule.
          </li>
          <li className="py-4">
            <span className="font-semibold">Long-Term Sustainability:</span>{" "}
            Intermittent fasting may not be suitable for everyone, and it's
            important to find an approach that fits your lifestyle and
            preferences.
          </li>
        </ul>

        <p className="pt-8 pb-20 font-semibold">
          Remember that fasting and intermittent fasting may not be suitable for
          everyone, and individual results can vary. It's crucial to approach
          fasting with a well-informed and personalized approach to ensure it
          aligns with your health goals and needs. Always consult a healthcare
          professional before making significant dietary changes or starting a
          fasting regimen.
        </p>
      </section>
    </div>
  );
};

export default InformationTab;
