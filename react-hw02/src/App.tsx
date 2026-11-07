
import { useEffect, useState } from "react";
import "./App.css";

interface MovieProps {
  title: string;
  director: string;
  year: number;
  studio: string;
  genre: string;
  description: string;
  poster: string;
}

interface ProfileProps {
  name: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  university: string;
  experience: string;
  hobbies: string[];
  skills: string[];
  photo: string;
}

interface ClockProps {
  title: string;
}

interface PetProps {
  name: string;
  type: string;
  age: number;
  breed: string;
  description: string;
  image: string;
}

function FavoriteMovie(props: MovieProps) {
  return (
    <section className="card">
      <h2>🎬 Улюблений фільм</h2>

      <img src={props.poster} alt={props.title} className="poster" />

      <h3>{props.title}</h3>
      <p><strong>Режисер:</strong> {props.director}</p>
      <p><strong>Рік випуску:</strong> {props.year}</p>
      <p><strong>Кіностудія:</strong> {props.studio}</p>
      <p><strong>Жанр:</strong> {props.genre}</p>
      <p>{props.description}</p>
    </section>
  );
}

function PersonalPage(props: ProfileProps) {
  return (
    <section className="card">
      <h2>👤 Персональна сторінка</h2>

      <img src={props.photo} alt={props.name} className="avatar" />

      <h3>{props.name}</h3>
      <p><strong>Вік:</strong> {props.age}</p>
      <p><strong>Телефон:</strong> {props.phone}</p>
      <p><strong>Email:</strong> {props.email}</p>
      <p><strong>Місто:</strong> {props.city}</p>
      <p><strong>Навчання:</strong> {props.university}</p>
      <p><strong>Досвід роботи:</strong> {props.experience}</p>

      <h3>Навички</h3>
      <ul>
        {props.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Захоплення</h3>
      <ul>
        {props.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </section>
  );
}

function Clock(props: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="card clock">
      <h2>🕒 {props.title}</h2>
      <div className="time">
        {time.toLocaleTimeString("uk-UA")}
      </div>
      <p>{time.toLocaleDateString("uk-UA")}</p>
    </section>
  );
}

function Pet(props: PetProps) {
  return (
    <section className="card">
      <h2>🐕 Домашній улюбленець</h2>

      <img src={props.image} alt={props.name} className="pet-image" />

      <h3>{props.name}</h3>
      <p><strong>Тварина:</strong> {props.type}</p>
      <p><strong>Вік:</strong> {props.age} роки</p>
      <p><strong>Порода:</strong> {props.breed}</p>
      <p>{props.description}</p>
    </section>
  );
}

function App() {
  return (
    <main className="container">

      <div className="grid">
        <FavoriteMovie
          title="Бійцівський клуб"
          director="Девід Фінчер"
          year={1999}
          studio="Fox 2000 Pictures"
          genre="Психологічний трилер"
          description="Працівник офісу знайомиться з Тайлером Дерденом, разом із яким створює підпільний бійцівський клуб."
          poster="https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
        />

        <PersonalPage
          name="Корсун Олександр Анатолійович"
          age={17}
          phone="12345"
          email="sashka@gmail.com"
          city="Вінниця"
          university="ВНТУ"
          experience="Немає"
          skills={["C#", "JavaScript"]}
          hobbies={["Футбол"]}
          photo="/photo.jpg"
        />

        <Clock title="Поточний час" />

        <Pet
          name="Рекс"
          type="Собака"
          age={3}
          breed="Німецька вівчарка"
          description="Активний, розумний та відданий собака. Любить прогулянки та ігри."
          image="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
        />
      </div>
    </main>
  );
}

export default App;
