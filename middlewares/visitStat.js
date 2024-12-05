import axios from "axios";

import { HttpError } from "../helpers/index.js";
import { VisitStat } from "../models/visitStat.js";
import {
  calculateAverageVisits,
  regroupedDataByDays,
  regroupedDataByCountry,
  uniqueVisitsCounter,
} from "../helpers/index.js";

const { IP_API_KEY } = process.env;

// const ipdata =
// new IPData(IP_API_KEY);

export const visitStat = async (req, res) => {
  // const ip = req.ip;
  // console.log(ip);

  ////////// заглушка для тестов на локалхосте
  const response = await axios.get("https://api.ipify.org?format=json");
  const publicIp = response.data.ip;
  /////////
  const result = await axios.get(
    `https://api.geoapify.com/v1/ipinfo?ip=${publicIp}&apiKey=${IP_API_KEY}`
  );

  const data = await result.data;
  const visit = await VisitStat.create({
    date: new Date(),
    visitorIp: publicIp, // ip from line 15 when local tests will be ended
    visitRegion: data.country.name,
  });
  // console.log(iorhjrio);

  console.log(data.country.name);
  console.log(visit);
  res.json(visit);
};

export const getVisitStats = async (req, res) => {
  const { monthNumber } = req.params;
  const adjustedMonth = parseInt(monthNumber) - 1;

  const startOfMonth = new Date();
  startOfMonth.setMonth(adjustedMonth, 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(adjustedMonth + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const visitStats = await VisitStat.find({
    date: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });

  const avgVisits = calculateAverageVisits(visitStats.length, adjustedMonth);

  const filteredVisitsArray = regroupedDataByDays(visitStats);

  const countryCounter = regroupedDataByCountry(visitStats);

  const uniqueVisits = uniqueVisitsCounter(visitStats);
  const result = {
    allVisits: visitStats.length,
    avgVisits,
    visitList: filteredVisitsArray,
    countryCounter,
    uniqueVisits: uniqueVisits.counter,
  };

  res.json(result);
};
