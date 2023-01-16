import { Fragment } from "react";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Forecast({ data }) {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    console.log(forecastDays);

    return (
        <>
            <div className="mt-2">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <div className="d-flex align-middle">
                            <h5 className="mb-0 fw-bold">7 Day Forecast</h5>
                        </div>           
                        <Accordion allowZeroExpanded>
                            {data.list.splice(0, 7).map((item, idx) => (
                                <AccordionItem key={idx}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <hr className="mt-1 mb-1" />
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <label className="fw-bold mb-0">{forecastDays[idx]}</label><br />
                                                    <label className="ml-1 mb-0">{item.weather[0].description}</label><br />
                                                    <label className="ml-1 mb-0">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                                </div>
                                                <div className="col-sm-4 d-flex justify-content-center">
                                                    <img className="weather-icon" style={{ width: "80px", height: "80px" }} src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon"></img>
                                                </div>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <div>
                                            <div className="d-flex justify-content-between">
                                                <label>Feels Like</label>
                                                <label>{Math.round(item.main.feels_like)}°C</label>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <label>Wind Speed</label>
                                                <label>{Math.round(item.wind.speed)} m/s</label>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <label>Humidity</label>
                                                <label>{item.main.humidity} %</label>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <label>Pressure</label>
                                                <label>{item.main.pressure} hPa</label>
                                            </div>
                                        </div>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}