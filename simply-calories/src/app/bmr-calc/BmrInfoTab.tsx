import React from "react";

const InformationTab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="px-8 md:px-12">
        <h2 className="flex justify-center pb-8">Information</h2>
        <h3 className="font-bold pb-4">What is BMR?</h3>
        <p>
          BMR, or Basal Metabolic Rate, is the minimum number of calories
          required to maintain essential bodily functions while at rest. It
          accounts for approximately 60-75% of the total daily calorie
          expenditure and varies from person to person based on factors like
          age, gender, weight, and muscle mass.
        </p>

        <h3 className="font-bold pt-12 pb-4">How The BMR Calculator Works</h3>
        <p>
          Weight Management: Knowing your BMR helps determine the ideal calorie
          intake for weight loss, maintenance, or muscle gain. Nutrition
          Planning: It guides meal planning by providing the foundation for
          setting calorie goals and macronutrient ratios. Fitness Goals: BMR
          helps tailor exercise and nutrition plans to meet specific fitness
          objectives. Health Monitoring: Monitoring changes in BMR can offer
          insights into overall health and metabolism.
        </p>

        <h3 className="font-bold pt-12 pb-4">Why BMR Matters</h3>
        <ul>
          <li className="py-4">
            <span className="font-bold">Weight Management:</span> Knowing your
            BMR helps determine the ideal calorie intake for weight loss,
            maintenance, or muscle gain.
          </li>
          <li className="py-4">
            <span className="font-bold">Nutrition Planning:</span> It guides
            meal planning by providing the foundation for setting calorie goals
            and macronutrient ratios.
          </li>
          <li className="py-4">
            <span className="font-bold">Fitness Goals:</span> BMR helps tailor
            exercise and nutrition plans to meet specific fitness objectives.
          </li>
          <li className="py-4">
            <span className="font-bold">Health Monitoring:</span> Monitoring
            changes in BMR can offer insights into overall health and
            metabolism.
          </li>
        </ul>

        <h3 className="font-bold pt-12 pb-4">Factors Affecting BMR</h3>
        <p>
          Several factors influence an individual&apos;s BMR, including age,
          gender, genetics, muscle mass, and hormonal fluctuations. Generally,
          BMR decreases with age and is higher in men due to differences in
          muscle mass.
        </p>

        <h3 className="font-bold pt-12 pb-4">Using the BMR Calculation</h3>
        <p className="pb-20">
          Once you calculate your BMR, you can adjust your daily calorie intake
          based on your activity level. This allows for precise calorie
          management, which is vital for achieving fitness and weight-related
          goals.
        </p>
      </section>
    </div>
  );
};

export default InformationTab;
