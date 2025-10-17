// app.js
const mockRooms = [
  { id: 1, name: "Living Room", image: "🛋️" },
  { id: 2, name: "Bedroom", image: "🛏️" },
  { id: 3, name: "Kitchen", image: "🍳" },
  { id: 4, name: "Office", image: "💻" }
];

const mockDevices = {
  1: [
    { id: 1, name: "Smart Light", type: "light", on: true },
    { id: 2, name: "Air Conditioner", type: "ac", on: false },
    { id: 3, name: "TV", type: "tv", on: true },
  ],
  2: [
    { id: 1, name: "Lamp", type: "light", on: false },
    { id: 2, name: "Fan", type: "fan", on: false },
  ],
  3: [
    { id: 1, name: "Refrigerator", type: "fridge", on: true },
    { id: 2, name: "Oven", type: "oven", on: false },
  ],
  4: [
    { id: 1, name: "PC", type: "computer", on: true },
    { id: 2, name: "Printer", type: "printer", on: false },
  ]
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
}
