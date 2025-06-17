// src/utils/uploadToCloudinary.js

const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "teachers"); // ✅ Use your preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dyq7n2zzm/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
