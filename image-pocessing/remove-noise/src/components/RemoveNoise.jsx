import React, { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const RemoveNoise = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState("gaussian");
  const canvasRef = useRef(null);

  // Load and display the uploaded image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply the filter when the image is uploaded or filter type changes
  const applyFilter = () => {
    if (!selectedImage) return;

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      let filteredData;

      if (filterType === "gaussian") {
        filteredData = applyGaussianFilter(imageData);
      } else if (filterType === "median") {
        filteredData = applyMedianFilter(imageData);
      } else if (filterType === "bilateral") {
        filteredData = applyBilateralFilter(imageData);
      }

      ctx.putImageData(filteredData, 0, 0);
    };
  };

  // Gaussian Filter implementation
  const applyGaussianFilter = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSum = 256;
    const output = new Uint8ClampedArray(data.length);

    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            const weight = kernel[ky + 2][kx + 2];
            r += data[pixelIndex] * weight;
            g += data[pixelIndex + 1] * weight;
            b += data[pixelIndex + 2] * weight;
          }
        }
        const index = (y * width + x) * 4;
        output[index] = r / kernelSum;
        output[index + 1] = g / kernelSum;
        output[index + 2] = b / kernelSum;
        output[index + 3] = data[index + 3];
      }
    }
    imageData.data.set(output);
    return imageData;
  };

  // Median Filter implementation
  const applyMedianFilter = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new Uint8ClampedArray(data.length);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let rArr = [],
          gArr = [],
          bArr = [];

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            rArr.push(data[pixelIndex]);
            gArr.push(data[pixelIndex + 1]);
            bArr.push(data[pixelIndex + 2]);
          }
        }

        rArr.sort((a, b) => a - b);
        gArr.sort((a, b) => a - b);
        bArr.sort((a, b) => a - b);

        const index = (y * width + x) * 4;
        output[index] = rArr[4];
        output[index + 1] = gArr[4];
        output[index + 2] = bArr[4];
        output[index + 3] = data[index + 3];
      }
    }
    imageData.data.set(output);
    return imageData;
  };

  // Bilateral Filter implementation
  const applyBilateralFilter = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new Uint8ClampedArray(data.length);
    const distanceSigma = 2.0;
    const colorSigma = 75.0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let rSum = 0,
          gSum = 0,
          bSum = 0,
          wSum = 0;
        const centerIndex = (y * width + x) * 4;
        const centerR = data[centerIndex];
        const centerG = data[centerIndex + 1];
        const centerB = data[centerIndex + 2];

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];

            const distanceWeight = Math.exp(
              -(kx * kx + ky * ky) / (2 * distanceSigma * distanceSigma)
            );
            const colorWeight = Math.exp(
              -((centerR - r) ** 2 + (centerG - g) ** 2 + (centerB - b) ** 2) /
                (2 * colorSigma * colorSigma)
            );
            const weight = distanceWeight * colorWeight;

            rSum += r * weight;
            gSum += g * weight;
            bSum += b * weight;
            wSum += weight;
          }
        }

        output[centerIndex] = rSum / wSum;
        output[centerIndex + 1] = gSum / wSum;
        output[centerIndex + 2] = bSum / wSum;
        output[centerIndex + 3] = data[centerIndex + 3];
      }
    }

    imageData.data.set(output);
    return imageData;
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="gaussian">Gaussian Filter</option>
        <option value="median">Median Filter</option>
        <option value="bilateral">Bilateral Filter</option>
      </select>
      <button onClick={applyFilter} className="ml-4 text-sm uppercase bg-zinc-300 p-2 rounded-xl ">
        Apply Filter
      </button>
      {selectedImage && (
        <div className="w-auto flex justify-center items-center gap-8 mt-16">
          <div>
            <img
              src={selectedImage}
              alt="Original"
              style={{ maxWidth: "300px" }}
            />
            <h4>Original Image</h4>
          </div>

          <FaArrowRight 
          size={30} color="black"
           />
          <div>
            <canvas ref={canvasRef}></canvas>
            <h4>Filtered Image</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveNoise;
