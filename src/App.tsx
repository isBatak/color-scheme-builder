import * as React from "react";
import chroma from "chroma-js";
import {
  scaleLog,
  scaleLinear,
  scalePow,
  scaleSqrt,
  scaleSequential
} from "d3-scale";
import "./styles.css";

function colorBoxStyle(color: string) {
  return {
    backgroundColor: color,
    height: "50px"
  };
}

const scales = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const startDomain = 0.1;
const endDomain = 0.9;

function palette(hex: string, selectedScale: number) {
  const color = chroma(hex);
  const luminance = chroma(hex).luminance();
  const selectedIndex = scales.indexOf(selectedScale);

  // color scale before current color

  const logScaleBefore = scaleLinear()
    .domain([scales[0], scales[selectedIndex + 1]])
    .range([luminance, endDomain]);

  const previousScales = [...Array(selectedIndex + 1)]
    .map((_, index) => {
      return logScaleBefore(scales[index]);
    })
    .reverse();

  const afterCount = scales.length - (selectedIndex + 1);
  const logScaleAfter = scaleLinear()
    .domain([scales[selectedIndex], scales[scales.length - 1]])
    .range([luminance, startDomain]);

  const nextScales = [...Array(afterCount)].map((_, index) => {
    return logScaleAfter(scales[selectedIndex + 1 + index]);
  });

  console.log(scales.length, selectedIndex + 1, [
    ...previousScales,
    ...nextScales
  ]);

  return [...previousScales, ...nextScales].map((lum) => {
    return chroma(hex).luminance(lum).hex();
  });
}

export default function App() {
  const [hex, setHex] = React.useState("#0070f3");
  const [selectedScale, setSelectedScale] = React.useState(scales[6]);

  const colors = React.useMemo(() => palette(hex, selectedScale), [
    hex,
    selectedScale
  ]);

  return (
    <div className="App">
      <select
        value={selectedScale}
        onChange={(e) => setSelectedScale(parseInt(e.target.value, 10))}
      >
        {scales.map((scale) => (
          <option key={scale} value={scale}>
            {scale}
          </option>
        ))}
      </select>
      <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} />
      <input
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
      />
      <div style={{ display: "grid", marginTop: "10px" }}>
        {colors.map((c, index) => (
          <div
            key={c}
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: selectedScale === scales[index] ? "bold" : undefined,
              zIndex: selectedScale === scales[index] ? "10" : undefined,
              boxShadow:
                selectedScale === scales[index]
                  ? "0px 0px 0px 5px white, 0px 0px 10px 5px rgba(0,0,0,0.5)"
                  : undefined
            }}
          >
            <div
              style={{
                width: "50px",
                textAlign: "center"
              }}
            >
              {scales[index]}
            </div>
            <div style={{ width: "100px", textAlign: "center" }}>{c}</div>
            <div style={{ ...colorBoxStyle(c), flex: 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
