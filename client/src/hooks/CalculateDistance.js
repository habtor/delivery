const { DOMParser } = require("xmldom");

async function calculateDistance(from, to) {
  const DISTANCE_API_KEY = process.env.DISTANCE_API_KEY;
  const url = `http://dev.virtualearth.net/REST/V1/Routes/Driving?o=xml&wp.0=${from}&wp.1=${to}&avoid=minimizeTolls&key=${DISTANCE_API_KEY}`;
  try {
    const response = await fetch(url);
    const xml = await response.text();
    const data = new DOMParser().parseFromString(xml, "text/xml");

    const distance =
      data.getElementsByTagName("TravelDistance")[0].childNodes[0].nodeValue;

    return distance;
  } catch (error) {
    return;
  }
}

export default calculateDistance;
