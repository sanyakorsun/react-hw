
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

interface RestaurantData {
  name: string;
  address: string;
  rating: number;
  cuisine: string;
  image: string;
}

interface RestaurantProps {
  restaurant: RestaurantData;
  onChange: (restaurant: RestaurantData) => void;
}

interface CredentialsProps {
  login: string;
  password: string;
  onLoginChange: (login: string) => void;
  onPasswordChange: (password: string) => void;
}

const Restaurant = Object.assign(
  function Restaurant({ restaurant, onChange }: RestaurantProps) {
    return (
      <section className="card">
        <h2>Інформація про ресторан</h2>

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />

        <h3>{restaurant.name}</h3>
        <p><strong>Адреса:</strong> {restaurant.address}</p>
        <p><strong>Рейтинг:</strong> ⭐ {restaurant.rating}</p>
        <p><strong>Тип кухні:</strong> {restaurant.cuisine}</p>

        <h3>Редагування інформації</h3>

        <label>Назва ресторану</label>
        <input
          value={restaurant.name}
          onChange={(e) => onChange({ ...restaurant, name: e.target.value })}
        />

        <label>Адреса</label>
        <input
          value={restaurant.address}
          onChange={(e) => onChange({ ...restaurant, address: e.target.value })}
        />

        <label>Рейтинг</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={restaurant.rating}
          onChange={(e) =>
            onChange({ ...restaurant, rating: Number(e.target.value) })
          }
        />

        <label>Тип кухні</label>
        <input
          value={restaurant.cuisine}
          onChange={(e) => onChange({ ...restaurant, cuisine: e.target.value })}
        />

        <label>Посилання на зображення</label>
        <input
          value={restaurant.image}
          onChange={(e) => onChange({ ...restaurant, image: e.target.value })}
        />

        <p className="hint">Зміни зберігаються автоматично.</p>
      </section>
    );
  },
  {
    propTypes: {
      restaurant: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        cuisine: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      }).isRequired,
      onChange: PropTypes.func.isRequired
    }
  }
);

const Credentials = Object.assign(
  function Credentials({
    login,
    password,
    onLoginChange,
    onPasswordChange
  }: CredentialsProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <section className="card">
        <h2>Логін і пароль</h2>

        <label>Логін</label>
        <input
          type="text"
          placeholder="Введіть логін"
          value={login}
          onChange={(e) => onLoginChange(e.target.value)}
        />

        <label>Пароль</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Приховати пароль" : "Показати пароль"}
        </button>

        <div className="credentials-info">
          <h3>Введені дані</h3>
          <p><strong>Логін:</strong> {login || "Не введено"}</p>
          <p>
            <strong>Пароль:</strong>{" "}
            {password
              ? showPassword
                ? password
                : "•".repeat(password.length)
              : "Не введено"}
          </p>
        </div>
      </section>
    );
  },
  {
    propTypes: {
      login: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      onLoginChange: PropTypes.func.isRequired,
      onPasswordChange: PropTypes.func.isRequired
    }
  }
);

function App() {
  const [restaurant, setRestaurant] = useState<RestaurantData>(() => {
    const saved = localStorage.getItem("restaurant");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      name: "Ресторан «Смак»",
      address: "м. Вінниця, вул. Соборна, 00",
      rating: 4.8,
      cuisine: "Українська та європейська",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
    };
  });

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("restaurant", JSON.stringify(restaurant));
  }, [restaurant]);

  return (
    <main className="container">

      <div className="grid">
        <Restaurant
          restaurant={restaurant}
          onChange={setRestaurant}
        />

        <Credentials
          login={login}
          password={password}
          onLoginChange={setLogin}
          onPasswordChange={setPassword}
        />
      </div>
    </main>
  );
}

export default App;