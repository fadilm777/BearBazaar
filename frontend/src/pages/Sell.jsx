import { createListing } from "@/backend/listings";
import React, { useState } from "react";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    photo: null,
    photoPreview: null, // For previewing the selected image
    location: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If updating price, ensure it is non-negative
    if (name === "price" && (isNaN(value) || value < 0)) {
      setErrors({ ...errors, price: "Price must be a non-negative number" });
    } else {
      setErrors({ ...errors, price: "" });
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle photo upload and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: file, photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Ensure all required fields are filled
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.price || formData.price < 0) newErrors.price = "Price must be a non-negative number";
    // if (!formData.description) newErrors.description = "Description is required";
    // if (!formData.photo) newErrors.photo = "Please upload an image";
    // if (!formData.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if errors exist
    }

    console.log("Form Submitted:", formData);
    createListing({ 
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
    });
    alert("Item Listed Successfully!");
    // Replace this with an API call to save data

    // Clear form after submission
    setFormData({
      title: "",
      price: "",
      description: "",
      photo: null,
      photoPreview: null,
      location: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Sell Your Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item title"
            required
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter price"
            required
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item description"
            rows="4"
            // required
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block font-semibold mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border rounded-md"
            // required
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}

          {/* Image Preview */}
          {formData.photoPreview && (
            <div className="mt-2">
              <img src={formData.photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-md shadow-md" />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter location"
            // required
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          List Item
        </button>
      </form>
    </div>
  );
};

export default Sell;
