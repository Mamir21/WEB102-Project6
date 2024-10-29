import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/weatherAPI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

const WeatherDetail = () => {
    const { city } = useParams();
    const [weatherDetail, setWeatherDetail] = useState(null);
    const [chartType, setChartType] = useState('bar'); // State to toggle chart type

    useEffect(() => {
        const getWeatherDetail = async () => {
            try {
                const data = await fetchWeatherData(city);
                setWeatherDetail(data);
            } catch (error) {
                console.error('Error fetching weather detail:', error);
            }
        };
        getWeatherDetail();
    }, [city]);

    if (!weatherDetail) return <div>Loading...</div>;

    const temperatureData = [
        { name: 'Mon', temp: 10 },
        { name: 'Tue', temp: 12 },
        { name: 'Wed', temp: 8 },
        { name: 'Thu', temp: 14 },
        { name: 'Fri', temp: 16 },
        { name: 'Sat', temp: 18 },
        { name: 'Sun', temp: 20 },
    ];

    return (
        <div className="weather-detail">
            <h2>{weatherDetail.city_name}, {weatherDetail.country_code}</h2>
            <p>Temperature: {weatherDetail.temp}°C</p>
            <p>Humidity: {weatherDetail.rh}%</p>
            <p>Wind Speed: {weatherDetail.wind_spd} m/s</p>
            <p>Weather: {weatherDetail.weather.description}</p>

            {/* Toggle button to switch chart types */}
            <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
                Toggle to {chartType === 'bar' ? 'Line Chart' : 'Bar Chart'}
            </button>

            {/* Conditionally render chart type based on state */}
            {chartType === 'bar' ? (
                <BarChart width={600} height={300} data={temperatureData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="temp" fill="#8884d8" />
                </BarChart>
            ) : (
                <LineChart width={600} height={300} data={temperatureData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                </LineChart>
            )}

            {/* Annotation for the chart */}
            <p className="chart-annotation">
                The chart displays the temperature trend for the week. Use the toggle button to switch between a bar chart and a line chart view.
            </p>
        </div>
    );
}

export default WeatherDetail;
