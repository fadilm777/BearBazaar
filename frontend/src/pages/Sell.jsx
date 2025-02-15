import React, { useState } from "react";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    photo: null,
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Item Listed Successfully!");
    // Replace with backend API call to submit the form data and store it
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
            required
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block font-semibold mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border rounded-md"
            required
          />
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
            required
          />
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
