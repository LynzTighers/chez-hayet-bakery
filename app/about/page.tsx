import { Cormorant_Garamond, Inter } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
});

export default function contact() {
  return (
    <html>
      <body>
        <main
          className={`${bodyFont.className} min-h-screen bg-[#fff8f1] text-[#3f2a26]`}
        >
          <div>
            <p className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10">
              Welcome to Hayet’s Sweets and Desserts! What started as a love for
              baking at home has grown into a small business created around
              something I truly enjoy—making beautiful and delicious treats for
              others. I love creating homemade cakes and desserts for birthdays,
              celebrations, special occasions, or simply when you’re craving
              something sweet. Each order is prepared with care and attention to
              detail, and I enjoy bringing my customers’ ideas to life through
              custom creations. As a local small business serving the Columbus,
              Ohio area, my goal is simple: to provide fresh, delicious desserts
              made with love and to make every order feel a little extra
              special. Thank you for supporting Hayet’s Sweets and Desserts and
              allowing me to be a sweet part of your special moments. ❤️
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
