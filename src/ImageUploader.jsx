function ImageUploader({ image, onImageChange }) {
  function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => onImageChange(e.target.result);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <label>
        upload:
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handleFile}
        />
      </label>
      <img src={image} width={200} alt="" />
    </div>
  );
}

export default ImageUploader;
