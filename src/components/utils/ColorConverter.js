export function colorToHex(color) {
  if (typeof window === "undefined") return color;

  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);

  const computed = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  const match = computed.match(/\d+/g);
  if (!match) return color;

  const [r, g, b] = match.map(Number);

  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
