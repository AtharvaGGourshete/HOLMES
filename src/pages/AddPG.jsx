import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/config/supabase";

const AddPG = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    PG_Name: "",
    Address: "",
    Owner_Name: "",
    Owner_Phone_no: "",
    Rent_Price: "",
    BHK: "",
    img: "",
    amenities: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.PG_Name || formData.PG_Name.length < 3) {
      newErrors.PG_Name = "PG name must be at least 3 characters";
    }

    if (!formData.Address || formData.Address.length < 5) {
      newErrors.Address = "Address must be at least 5 characters";
    }

    if (!formData.Owner_Name || formData.Owner_Name.length < 3) {
      newErrors.Owner_Name = "Owner's name must be at least 3 characters";
    }

    if (!/^\d{10}$/.test(formData.Owner_Phone_no)) {
      newErrors.Owner_Phone_no = "Mobile number must be 10 digits";
    }

    if (!/^\d+$/.test(formData.Rent_Price)) {
      newErrors.Rent_Price = "Rent Price must be a valid number";
    }

    if (!formData.BHK) {
      newErrors.BHK = "Please select a BHK type";
    }
    if (!formData.img) {
      newErrors.img = "Please select an image";
    }

    if (!formData.amenities) {
      newErrors.amenities = "Please select an image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { error } = await supabase.from("insert_pg").insert([
        {
          PG_Name: formData.PG_Name,
          Address: formData.Address,
          Owner_Name: formData.Owner_Name,
          Owner_Phone_no: formData.Owner_Phone_no,
          Rent_Price: parseFloat(formData.Rent_Price),
          BHK: formData.BHK,
          img: formData.img,
          amenities: formData.amenities,
        },
      ]);

      if (error) throw error;

      toast({ title: "PG listed successfully ✅" });

      setFormData({
        PG_Name: "",
        Address: "",
        Owner_Name: "",
        Owner_Phone_no: "",
        Rent_Price: "",
        BHK: "",
        img: "",
        amenities: "",
      });

      setErrors({});
      navigate("/listed-pgs", { state: formData });
    } catch (err) {
      toast({
        title: "Failed to list PG",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-lg border border-purple-300">
        <div className="flex items-center gap-3 mb-8">
          <Building2Icon className="text-purple-600 w-6 h-6" />
          <h2 className="text-3xl font-bold text-purple-700">List Your PG</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PG Name */}
            <div>
              <label className="block font-semibold text-purple-800">PG Name</label>
              <input
                type="text"
                name="PG_Name"
                placeholder="Enter PG Name"
                value={formData.PG_Name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.PG_Name && <p className="text-red-500 text-sm mt-1">{errors.PG_Name}</p>}
            </div>

            {/* Owner Name */}
            <div>
              <label className="block font-semibold text-purple-800">Owner's Name</label>
              <input
                type="text"
                name="Owner_Name"
                placeholder="Enter Owner's Name"
                value={formData.Owner_Name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.Owner_Name && <p className="text-red-500 text-sm mt-1">{errors.Owner_Name}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-purple-800">Address</label>
              <textarea
                name="Address"
                placeholder="Enter Address"
                value={formData.Address}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address}</p>}
            </div>

            {/* Owner Phone No */}
            <div>
              <label className="block font-semibold text-purple-800">Owner's Mobile</label>
              <input
                type="text"
                placeholder="Enter Owner's Mobile No"
                name="Owner_Phone_no"
                value={formData.Owner_Phone_no}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.Owner_Phone_no && <p className="text-red-500 text-sm mt-1">{errors.Owner_Phone_no}</p>}
            </div>

            {/* Rent Price */}
            <div>
              <label className="block font-semibold text-purple-800">Rent Price (₹)</label>
              <input
                type="text"
                placeholder="Enter Rent Price"
                name="Rent_Price"
                value={formData.Rent_Price}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.Rent_Price && <p className="text-red-500 text-sm mt-1">{errors.Rent_Price}</p>}
            </div>

            <div>
              <label className="block font-semibold text-purple-800">Add Amenities</label>
              <input
                type="text"
                placeholder="Add Amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.Rent_Price && <p className="text-red-500 text-sm mt-1">{errors.Rent_Price}</p>}
            </div>

            {/* BHK */}
            <div>
              <label className="block font-semibold text-purple-800">BHK Type</label>
              <select
                name="BHK"
                value={formData.BHK}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Studio">Studio</option>
              </select>
              {errors.BHK && <p className="text-red-500 text-sm mt-1">{errors.BHK}</p>}
            </div>

            

            {/* Image Link */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-purple-800">Add Image Link</label>
              <input
                type="text"
                name="img"
                placeholder="Add image link"
                value={formData.img}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              List PG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPG;
