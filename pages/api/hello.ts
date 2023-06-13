/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type FlightData = {
  icao24: string;
  callsign:string | null;
  arrivalAirportCandidatesCount: string | null;
  departureAirportCandidatesCount: string | null; 
  estDepartureAirport: string | null;
  lastSeen: Date;
  firstSeen: Date;
  message?: string | null;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;

  if (method === "GET") {
    // Define the OpenSky API endpoint
    const url = "https://opensky-network.org/api/flights/all??begin=1517227200&end=1517230800";

    try {
      // Fetch flight data from the OpenSky API
      const response = await axios.get<FlightData[]>(url);
      // Return the flight data to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching flight data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};
