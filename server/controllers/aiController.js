const analyzeComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const text =
      `${title} ${description} ${category}`.toLowerCase();

    let priority = "Normal";
    let department = "General";

    // Water complaints
    if (
      text.includes("water") ||
      text.includes("leakage") ||
      text.includes("pipeline")
    ) {
      priority = "High";
      department = "Water Department";
    }

    // Electricity complaints
    else if (
      text.includes("electricity") ||
      text.includes("power")
    ) {
      priority = "High";
      department = "Electricity Department";
    }

    // Garbage complaints
    else if (
      text.includes("garbage") ||
      text.includes("waste")
    ) {
      priority = "Medium";
      department = "Sanitation Department";
    }

    const summary = description.slice(0, 80);

    const responseMessage =
      "Your complaint has been registered successfully.";

    res.json({
      priority,
      department,
      summary,
      responseMessage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI Analysis Failed",
    });
  }
};

module.exports = {
  analyzeComplaint,
};