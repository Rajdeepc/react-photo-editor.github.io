import { useState, useEffect, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function App() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const DEFAULT_CONTROLS = [
    {
      name: "Brightness",
      property: "brightness",
      value: 100,
      range: {
        min: 0,
        max: 200,
      },
      unit: "%",
    },
    {
      name: "Contrast",
      property: "contrast",
      value: 100,
      range: {
        min: 0,
        max: 200,
      },
      unit: "%",
    },
    {
      name: "Saturation",
      property: "saturate",
      value: 100,
      range: {
        min: 0,
        max: 200,
      },
      unit: "%",
    },

    {
      name: "Grayscale",
      property: "grayscale",
      value: 0,
      range: {
        min: 0,
        max: 100,
      },
      unit: "%",
    },
    {
      name: "Hue",
      property: "hue-rotate",
      value: 0,
      range: {
        min: 0,
        max: 360,
      },
      unit: "deg",
    },
    {
      name: "Blur",
      property: "blur",
      value: 0,
      range: {
        min: 0,
        max: 100,
      },
      unit: "px",
    },
  ];

  const [options, setOptions] = useState(DEFAULT_CONTROLS);

  const handleChangeSlider = (e, name) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, i) => {
        if (option.name === name) {
          return { ...option, value: e.target.value };
        }
        return option;
      });
    });
  };

  const getImageStyle = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  };

  return (
    <div className="App">
      <Header preview={preview} />
      <div className="grid">
        <div className="left-grid">
          <button
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
            className="upload-button"
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/upload.png"}
              alt="upload"
            />{" "}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.type.substr(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </div>
        <div className="image-container">
          <div
            className="imagePreview"
            style={{ backgroundImage: `url(${preview})`, ...getImageStyle() }}
          ></div>
        </div>
        <div className="controls">
          <Sidebar options={options} handleSliderChange={handleChangeSlider} />
        </div>
      </div>
      <footer><div className="footer-info text-center">Made in India</div></footer>
    </div>
  );
}

export default App;
