import { Link } from 'react-router-dom';

const List = ({ items }) => (
    <ul className="list">
        {items.map((item) => (
            <li key={item.city_name} className="list-item">
                <Link to={`/weather/${item.city_name}`}>
                    <h3>{item.city_name}, {item.country_code}</h3>
                    <p>Temperature: {item.temp}°C</p>
                    <p>Weather: {item.weather.description}</p>
                </Link>
            </li>
        ))}
    </ul>
)

export default List;