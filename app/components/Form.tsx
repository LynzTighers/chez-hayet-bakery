"use client";
import { useState } from "react";

export default function OrderForm() {
  //const [category, setCategory] = useState("");
  return (
    <form className="mx-auto max-w-2xl space-y-6 rounded-3xl bg-[#fffaf6] p-8 shadow-sm">
      <div>
        <label
          htmlFor="firstName"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          First Name
        </label>

        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          className="w-full rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          Last Name
        </label>

        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          className="w-full rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          Phone Number
        </label>

        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          className="w-full rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          className="w-full rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        >
          <option value="">Choose a category</option>
          <option value="cakes">Celebration Cakes</option>
          <option value="algerian-sweets">Tarts and Pastries</option>
          <option value="custom">Custom Creation</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="product"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          Product
        </label>

        <select
          id="product"
          name="product"
          className="w-full rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        >
          <option value="">Choose a product</option>
          <option value="product-1">Product 1</option>
          <option value="product-2">Product 2</option>
          <option value="product-3">Product 3</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-medium text-[#5e3934]"
        >
          Order Details
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Tell us what you would like..."
          className="w-full resize-none rounded-xl border border-[#e8d5cc] bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#9b645d] px-6 py-3 font-medium text-white transition hover:bg-[#814f49]"
      >
        Submit Order
      </button>
    </form>
  );
}
