export default function CurrentWeather({ data }) {
    return (
        <div className="mt-2">
            <div className="card">
                <div className="card-header bg-primary text-white border-0">
                    <div className="row">
                        <div className="col-sm-8">
                            <h4 className="fw-bold">{data.city}</h4>
                            <h5>{data.weather[0].description}</h5>
                        </div>
                        <div className="col-sm-4 d-flex justify-content-center">
                            <img className="weather-icon px-0" style={{ width: "90px", height: "90px" }} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon"></img>
                        </div>
                    </div>

                </div>
                <div className="card-body bg-primary text-white text-center">
                    <h1 className="fw-bold" style={{ fontSize: "60px" }}>{Math.round(data.main.temp)}°C</h1>
                </div>
                <div className="card-footer bg-primary text-white">
                    <table className="table table-primary mt-2">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={2}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Feels Like:</th>
                                <td>{Math.round(data.main.feels_like)}°C</td>
                            </tr>
                            <tr>
                                <th scope="row">Wind:</th>
                                <td>{data.wind.speed} m/s</td>
                            </tr>
                            <tr>
                                <th scope="row">Humidity:</th>
                                <td>{data.main.humidity}%</td>
                            </tr>
                            <tr>
                                <th scope="row">Pressure:</th>
                                <td>{data.main.pressure} hPa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}