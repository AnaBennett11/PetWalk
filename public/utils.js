export async function loadGoogleMaps(callback) {
  try {
    const response = await fetch("/api-key");
    const data = await response.json();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&callback=initMap&libraries=drawing,marker`;
    script.async = true;
    script.defer = true;
    script.setAttribute("loading", "async");
    script.onload = callback;
    document.head.appendChild(script);
  } catch (error) {
    console.log("Error loading Google Maps script:", error);
  }
}
