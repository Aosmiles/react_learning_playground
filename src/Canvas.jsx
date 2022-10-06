import { useEffect, useRef, useState } from "react";

function Canvas(props) {
  const [hoverImage, setHoverImage] = useState("");
  const canvasRef = useRef(null);
  const hoverElement = useRef(null);
  useEffect(() => {
    canvasRef.current.style.cursor = `url(src/assets/images/house.png), auto`;
  }, []);

  // useEffect(() => {
  //   const canvasCtx = canvasRef.current.getContext("2d");
  //   console.log(canvasCtx);
  //   // canvasCtx.fillStyle = "#f06";
  //   // canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  //
  //   const img = new Image();
  //   img.src = "src/assets/images/house.png";
  //   img.onload = () => {
  //     canvasCtx.drawImage(img, 10, 10);
  //   };
  // }, []);

  function mouseOver(e) {
    const x = e.clientX;
    const y = e.clientY;
    const rect = canvasRef.current.getBoundingClientRect();
    hoverElement.current.style.transform = `translate3d(${
      x - rect.left - 70
    }px, ${y - rect.top - 70}px, 0)`;
  }

  function drawImageAtMouse(e) {
    const canvasCtx = canvasRef.current.getContext("2d");
    // canvasCtx.fillStyle = "#f06";
    // canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

    const img = new Image();
    img.src = "src/assets/images/house.png";
    const rect = canvasRef.current.getBoundingClientRect();
    img.onload = () => {
      canvasCtx.drawImage(
        img,
        e.clientX - rect.left - 70,
        e.clientY - rect.top - 70
      );
    };
  }

  return (
    <div>
      <img
        ref={hoverElement}
        className=" img-hover"
        src="src/assets/images/house.png"
      />

      <canvas
        ref={canvasRef}
        {...props}
        onMouseOut={() => {
          hoverElement.current.classList.add("hidden");
        }}
        onMouseEnter={() => {
          hoverElement.current.classList.remove("hidden");
        }}
        onMouseMove={mouseOver}
        onMouseDown={drawImageAtMouse}
      />
    </div>
  );
}

export default Canvas;
