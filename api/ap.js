const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url, format } = req.query;

  if (!url || !format) {
    return res.status(400).json({ message: "Missing url or format parameter" });
  }

  try {
    const response = await axios.get("https://itzpire.com/download/youtube/v2", {
      params: { url, format },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
};
