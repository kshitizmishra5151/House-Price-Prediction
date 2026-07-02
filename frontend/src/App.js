import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://house-price-prediction-11rz.onrender.com";

function App() {
  const [locations, setLocations] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bhk: "",
    type: "Independent",
    area_sq_ft: "",
    location: "",
    bathrooms: "",
    carpet_area: "",
    status: "StatusReady",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/locations`)
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error loading locations:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/predict`, formData);
      setPrediction(res.data.predicted_price_lakhs);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.glassCard}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>NestWorth</h1>
          <span style={styles.badge}>Lucknow</span>
        </div>

        <form onSubmit={handlePredict} style={styles.formGrid}>
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Location / Neighborhood</label>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">-- Choose Area --</option>

              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>BHK</label>
            <input
              name="bhk"
              type="number"
              placeholder="e.g. 3"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Bathrooms</label>
            <input
              name="bathrooms"
              type="number"
              placeholder="e.g. 2"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Total Area (Sq Ft)</label>
            <input
              name="area_sq_ft"
              type="number"
              placeholder="Total"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Carpet Area (Sq Ft)</label>
            <input
              name="carpet_area"
              type="number"
              placeholder="Usable"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Property Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Independent">Independent</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="StatusReady">Ready to Move</option>
              <option value="StatusUnder">Under Construction</option>
            </select>
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonLoading : styles.button}
            disabled={loading}
          >
            {loading ? "Processing ML Model..." : "Generate Prediction"}
          </button>
        </form>

        {prediction !== null && (
          <div style={styles.resultContainer}>
            <p style={styles.resultLabel}>Estimated Market Value</p>

            <div style={styles.priceTag}>
              <span style={styles.currencySymbol}>₹</span>
              {prediction}
              <span style={styles.unit}> Lakhs</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter,sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "rgba(255,255,255,.1)",
    borderRadius: "50%",
    top: -50,
    right: -50,
  },

  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "rgba(255,255,255,.1)",
    borderRadius: "50%",
    bottom: 20,
    left: -50,
  },

  glassCard: {
    background: "rgba(255,255,255,.15)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,.2)",
    padding: 40,
    width: 500,
    color: "white",
    boxShadow: "0 25px 50px rgba(0,0,0,.5)",
    zIndex: 10,
  },

  header: {
    textAlign: "center",
    marginBottom: 30,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
  },

  badge: {
    background: "#00d2ff",
    padding: "3px 10px",
    borderRadius: 5,
    fontSize: 12,
    textTransform: "uppercase",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  inputGroupFull: {
    gridColumn: "span 2",
    display: "flex",
    flexDirection: "column",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: 11,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.1)",
    color: "white",
    outline: "none",
  },

  select: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.1)",
    color: "white",
    outline: "none",
  },

  button: {
    gridColumn: "span 2",
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "white",
    color: "#b21f1f",
    fontWeight: 700,
    cursor: "pointer",
  },

  buttonLoading: {
    gridColumn: "span 2",
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "#ccc",
    color: "#666",
    cursor: "wait",
  },

  resultContainer: {
    marginTop: 30,
    textAlign: "center",
    background: "rgba(0,0,0,.2)",
    padding: 25,
    borderRadius: 20,
  },

  resultLabel: {
    color: "#00d2ff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
  },

  priceTag: {
    fontSize: 42,
    fontWeight: 900,
  },

  currencySymbol: {
    fontSize: 24,
  },

  unit: {
    fontSize: 20,
    opacity: 0.7,
  },
};

export default App;