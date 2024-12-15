import { Link } from "react-router-dom";

const WeeklySalesImage = [
  "/WeekSales.jpg",
  "/WeekSales2.jpg",
  "/WeekSales3.jpg",
  "/WeekSales4.jpg",
  "/WeekSales5.jpg",
  "/WeekSales6.jpg",
];

export const weeklySales = [
  {
    brand: "Fitflop",
    offer: "Save up to Rp 600.000",
    link: "/brand/fitflop",
  },
  {
    brand: "Dr. Martens",
    offer: "Save Up to Rp 600.000",
    link: "/brand/dr-martens",
  },
  {
    brand: "Converse",
    offer: "Up to 40% Off + Buy 2 Get 20%",
    link: "/brand/converse",
  },
  {
    brand: "Nike",
    offer: "Special Offer",
    link: "/brand/brand4",
  },
  {
    brand: "Alexander Christie",
    offer: "Limited Time Deal",
    link: "/brand/brand5",
  },
  {
    brand: "Under Armor",
    offer: "Exclusive Discount",
    link: "/brand/brand6",
  },
];

const WeeklySalesCard = ({ brand, offer, link, index }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square">
          <img
            src={WeeklySalesImage[index]}
            alt={`${brand} promotion`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="p-4 bg-gradient-to-r from-red-600 to-red-800 text-white">
          <h3 className="font-bold text-lg mb-2">{brand}</h3>
          <p className="text-sm">{offer}</p>
          <div className="mt-2 flex justify-end">
            <span className="text-xl">&rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WeeklySalesCard;
