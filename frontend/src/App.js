import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Render Backend URL
const API_URL = "https://house-price-prediction-1lrz.onrender.com";

function App() {
  const [locations, setLocations] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bhk: '',
    type: 'Independent',
    area_sq_ft: '',
    location: '',
    bathrooms: '',
    carpet_area: '',
    status: 'StatusReady'
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/locations`)
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/predict`,
        formData
      );

      setPrediction(res.data.predicted_price_lakhs);
    } catch (err) {
      console.error(err);
      alert("Unable to connect to backend.");
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
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">-- Choose Area --</option>

              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>BHK</label>

            <input
              type="number"
              name="bhk"
              placeholder="e.g. 3"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Bathrooms</label>

            <input
              type="number"
              name="bathrooms"
              placeholder="e.g. 2"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Total Area (Sq Ft)</label>

            <input
              type="number"
              name="area_sq_ft"
              placeholder="Total"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Carpet Area (Sq Ft)</label>

            <input
              type="number"
              name="carpet_area"
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
            {loading ? "Processing ML Weights..." : "Generate Prediction"}
          </button>
        </form>

        {prediction && (
          <div style={styles.resultContainer}>
            <p style={styles.resultLabel}>
              Estimated Market Value
            </p>

            <div style={styles.priceTag}>
              <span style={styles.currencySymbol}>₹</span>
              {" "}
              {prediction}
              {" "}
              <span style={styles.unit}>Lakhs</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },

  circle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    top: '-50px',
    right: '-50px'
  },

  circle2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    bottom: '20px',
    left: '-50px'
  },

  glassCard: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '40px',
    width: '500px',
    color: 'white',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    zIndex: 10
  },

  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },

  mainTitle: {
    fontSize: '28px',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.5px'
  },

  badge: {
    fontSize: '12px',
    background: '#00d2ff',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase'
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },

  inputGroupFull: {
    gridColumn: 'span 2',
    display: 'flex',
    flexDirection: 'column'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },

  label: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    fontWeight: 'bold',
    opacity: 0.9
  },

  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
  },

  select: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '14px',
    outline: 'none'
  },

  button: {
    gridColumn: 'span 2',
    padding: '15px',
    marginTop: '10px',
    borderRadius: '12px',
    border: 'none',
    background: '#ffffff',
    color: '#b21f1f',
    fontWeight: '900',
    fontSize: '15px',
    cursor: 'pointer'
  },

  buttonLoading: {
    gridColumn: 'span 2',
    padding: '15px',
    marginTop: '10px',
    borderRadius: '12px',
    border: 'none',
    background: '#ccc',
    color: '#666'
  },

  resultContainer: {
    marginTop: '30px',
    textAlign: 'center',
    background: 'rgba(0,0,0,0.2)',
    padding: '25px',
    borderRadius: '20px'
  },

  resultLabel: {
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#00d2ff',
    fontWeight: 'bold'
  },

  priceTag: {
    fontSize: '42px',
    fontWeight: '900'
  },

  currencySymbol: {
    fontSize: '24px',
    opacity: 0.6
  },

  unit: {
    fontSize: '20px',
    opacity: 0.6
  }
};

export default App;