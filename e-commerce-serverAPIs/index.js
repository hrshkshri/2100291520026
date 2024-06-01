const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjIyODg0LCJpYXQiOjE3MTcyMjI1ODQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZlMjJiZDcyLTBmNDItNGJlZi04Yzg2LWUwZTMwNGVkMDM3MCIsInN1YiI6ImhhcnNoLjIxMjVjc2FpMTA2NkBraWV0LmVkdSJ9LCJjb21wYW55TmFtZSI6ImdvSGFyc2hrZXNoYXJpIiwiY2xpZW50SUQiOiI2ZTIyYmQ3Mi0wZjQyLTRiZWYtOGM4Ni1lMGUzMDRlZDAzNzAiLCJjbGllbnRTZWNyZXQiOiJmQk16WVJCZkZRUlRUWU1KIiwib3duZXJOYW1lIjoiSGFyc2ggS2VzaGFyaSIsIm93bmVyRW1haWwiOiJoYXJzaC4yMTI1Y3NhaTEwNjZAa2lldC5lZHUiLCJyb2xsTm8iOiIyMTAwMjkxNTIwMDI2In0.aFbZVi8kNY7qzXBKEluOXfEHnwVnj4r3fMgZ1yQs_MM";

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/categories/:categoryname/products", async (req, res) => {
  const categoryname = req.params.categoryname;
  const top = req.query.top || 10; // Default to top 10 products if 'top' query parameter is not provided

  const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${top}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

app.get(
  "/test/companies/:companyname/categories/:categoryname/products",
  async (req, res) => {
    const companyname = req.params.companyname;
    const categoryname = req.params.categoryname;
    const top = req.query.top || 10;
    const minPrice = req.query.minPrice || 1;
    const maxPrice = req.query.maxPrice || 10000;

    const url = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
      res.status(error.response ? error.response.status : 500).json({
        error: error.response ? error.response.data : "Internal Server Error",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
