import { Fragment } from "react/jsx-runtime";

export default function FeatureProducts() {
  const novusProducts = [
    {
      id: 1,
      name: "Gaming Laptop",
      price: "989.99",
      src: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6d5b875f-3b2c-41ef-845f-525f9063c7e0.png;maxHeight=1920;maxWidth=900?format=webp",
    },

    {
      id: 2,
      name: "Wireless Headphones",
      price: "127.50",
      src: "https://www.nearhub.us/nearhub-v1/strapi/wireless_headphone_with_noise_cancelling_mic_ep320_10bcbfb61f/wireless-headphone-with-noise-cancelling-mic-ep320.png?x-oss-process=image/resize,w_2400,h_2400/format,webp",
    },

    {
      id: 3,
      name: "Smart Watch - Apple Watch Series 11 42mm",
      price: "189.99",
      src: "https://t-mobile.scene7.com/is/image/Tmusprod/Apple-Watch-Series-11-42mm-Jet-Black-Aluminum-Case-Black-Sport-Band-frontimage?fmt=png-alpha&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&dpr=off",
    },

    {
      id: 4,
      name: "Mechanical Keyboard",
      price: "$99.99",
      src: {
        video:
          "https://www.amazon.com/vdp/757c97740d0c453788651fe17dfa8f46?aci=amzn1.ive.seller.video.757c97740d0c453788651fe17dfa8f46&product=B07G11G2X8&ref=cm_sw_cp_r_ib_dt_nMi4cwyIRc40J",
        photo:
          "https://hyperx.com/cdn/shop/files/hyperx_alloy_origins_us_5_led_off.jpg",
      },
    },

    {
      id: 5,
      name: "Sapiens: A Bried History of HumanKind by Yuval Noah Harari",
      price: "$22.99",
      src: "https://images.gatesnotes.com/12514eb8-7b51-008e-41a9-512542cf683b/34796cf4-4adb-4c61-a8e3-1d283a9e3936/Sapiens-A-Brief-History-of-Humankind_1500px_by_1500px-001.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Feature Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {novusProducts.map(toDetails)}
        <button className="bg-blue-700 text-white w-full py-2 rounded-lg hover:bg-blue-800">
          Add to Cart
        </button>
      </div>
    </section>
  );

  function toDetails(item, index) {
    const key = item + index;
    const details = (
      <Fragment key={key}>
        <dt>
          <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl">
            {novusProducts.id}
          </div>
          <h3 className="rounded-lg mb-4 text-xl font-semibold">
            {novusProducts.name}
          </h3>
        </dt>
        <dd>
          <img className="rounded-lg mb-4" src={novusProducts.src} />
          <figcaption className="text-blue-700 font-bold my-2">
            {novusProducts.price}
          </figcaption>
        </dd>
      </Fragment>
    );
    return details;
  }
}
