import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { title: "", body: "" } });

  // Крок 2. GET /posts?_limit=10
  async function loadPosts() {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch(`${BASE_URL}/posts?_limit=10`);

      if (!response.ok) {
        throw new Error(
          `Помилка HTTP: ${response.status} — не вдалося завантажити пости.`,
        );
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Крок 3. POST /posts
  async function onSubmit(values) {
    setSuccessMessage("");
    setSubmitError("");

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Помилка HTTP: ${response.status} — не вдалося створити пост.`,
        );
      }

      const created = await response.json();

      reset();
      setSuccessMessage(`Успішно створено пост з ID: ${created.id}`);
      setPosts((prev) => [{ userId: 1, ...created }, ...prev]);
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  // Видалення поста: DELETE /posts/:id
  async function deletePost(id) {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Помилка HTTP: ${response.status} — не вдалося видалити пост.`,
        );
      }

      setPosts((prev) => prev.filter((item) => item.id !== id));
      if (selectedPostId === id) {
        setSelectedPostId(null);
      }
    } catch (error) {
      setLoadError(error.message);
    }
  }

  // Крок 4. GET /posts/:id + GET /users/:userId з AbortController
  useEffect(() => {
    if (selectedPostId === null) {
      setPost(null);
      setAuthor(null);
      setDetailsError("");
      return;
    }

    const controller = new AbortController();

    async function loadDetails() {
      setDetailsLoading(true);
      setDetailsError("");
      setPost(null);
      setAuthor(null);

      try {
        const postResponse = await fetch(`${BASE_URL}/posts/${selectedPostId}`, {
          signal: controller.signal,
        });

        if (!postResponse.ok) {
          throw new Error(
            `Помилка HTTP: ${postResponse.status} — не вдалося завантажити пост.`,
          );
        }

        const postData = await postResponse.json();
        setPost(postData);

        const userResponse = await fetch(`${BASE_URL}/users/${postData.userId}`, {
          signal: controller.signal,
        });

        if (!userResponse.ok) {
          throw new Error(
            `Помилка HTTP: ${userResponse.status} — не вдалося завантажити автора.`,
          );
        }

        const userData = await userResponse.json();
        setAuthor(userData);
        setDetailsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        console.error(error);
        setDetailsError(error.message);
        setDetailsLoading(false);
      }
    }

    loadDetails();

    return () => {
      controller.abort();
    };
  }, [selectedPostId]);

  return (
    <div className="page-shell">
      <header className="card page-header">
        <div className="header-badges">
          <span className="badge badge--primary">Домашнє завдання №10</span>
          <span className="badge">
            Fetch API · React Hook Form · AbortController
          </span>
        </div>
        <h1 className="page-title">Панель керування блогом</h1>
        <p className="page-subtitle">
          Шаблон інтерфейсу для роботи з JSONPlaceholder (
          <code className="code-inline">https://jsonplaceholder.typicode.com</code>
          ): завантаження постів, створення нового поста, видалення та перегляд
          деталей автора.
        </p>
      </header>

      <main className="dashboard-grid">
        {/* Ліва колонка: Форма створення поста + Список постів */}
        <div className="stack">
          <section className="card stack" aria-labelledby="create-post-heading">
            <h2 id="create-post-heading" className="section-title">
              Створити новий пост (POST)
            </h2>

            <form
              id="post-form"
              className="post-form"
              aria-labelledby="create-post-heading"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="form-field">
                <label htmlFor="post-title">
                  Назва поста (Title) <span aria-hidden="true">*</span>
                </label>
                <input
                  id="post-title"
                  type="text"
                  placeholder="Наприклад: Як працює AbortController у Fetch API"
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby="post-title-hint post-title-error"
                  {...register("title", {
                    required: "Назва поста є обов'язковою",
                    minLength: {
                      value: 3,
                      message: "Мінімум 3 символи",
                    },
                  })}
                />
                <p id="post-title-hint" className="field-hint">
                  Обов'язкове поле.
                </p>
                <p id="post-title-error" className="field-error">
                  {errors.title?.message}
                </p>
              </div>

              <div className="form-field">
                <label htmlFor="post-body">
                  Текст поста (Body) <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="post-body"
                  rows="4"
                  placeholder="Введіть основний текст публікації..."
                  aria-invalid={errors.body ? "true" : "false"}
                  aria-describedby="post-body-hint post-body-error"
                  {...register("body", {
                    required: "Текст поста є обов'язковим",
                    minLength: {
                      value: 10,
                      message: "Мінімум 10 символів",
                    },
                  })}
                ></textarea>
                <p id="post-body-hint" className="field-hint">
                  Обов'язкове поле.
                </p>
                <p id="post-body-error" className="field-error">
                  {errors.body?.message}
                </p>
              </div>

              <button
                type="submit"
                className="btn-primary btn-full"
                disabled={isSubmitting}
              >
                Опублікувати пост
              </button>
            </form>

            {successMessage && (
              <div
                className="alert alert--success"
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}

            {submitError && (
              <div className="alert alert--error" role="alert">
                {submitError}
              </div>
            )}
          </section>

          <section className="card stack" aria-labelledby="posts-list-heading">
            <div className="section-header">
              <h2 id="posts-list-heading" className="section-title">
                Список постів ({posts.length})
              </h2>
              <button
                type="button"
                className="btn-primary"
                onClick={loadPosts}
                disabled={loading}
              >
                Завантажити пости
              </button>
            </div>

            {loading && (
              <div className="loading-box">
                <span>Завантаження постів...</span>
                <progress
                  className="loading-bar"
                  aria-label="Завантаження списку постів"
                ></progress>
              </div>
            )}

            {loadError && (
              <div className="alert alert--error" role="alert">
                {loadError}
              </div>
            )}

            <ul className="posts-list">
              {posts.map((item) => (
                <li
                  key={item.id}
                  className={
                    item.id === selectedPostId
                      ? "post-item post-item--selected"
                      : "post-item"
                  }
                >
                  <div className="post-item__content">
                    <span className="post-item__meta">
                      Пост #{item.id} · Автор #{item.userId}
                    </span>
                    <h3 className="post-item__title">{item.title}</h3>
                    <p className="post-item__excerpt">
                      {item.body.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="post-item__actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setSelectedPostId(item.id)}
                    >
                      Деталі
                    </button>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => deletePost(item.id)}
                    >
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Права колонка: Деталі обраного поста та автора */}
        <aside className="stack" aria-labelledby="post-details-heading">
          <section className="card stack">
            <h2 id="post-details-heading" className="section-title">
              Деталі поста та автор
            </h2>

            {selectedPostId === null && (
              <div className="empty-state">
                <p className="empty-state__title">Пост ще не обрано</p>
                <p>
                  Оберіть будь-який пост у списку ліворуч, щоб завантажити його
                  текст та дані автора з захистом через{" "}
                  <code className="code-inline">AbortController</code>.
                </p>
              </div>
            )}

            {selectedPostId !== null && detailsLoading && !post && (
              <div className="loading-box">
                <span>Завантаження деталей...</span>
                <progress
                  className="loading-bar"
                  aria-label="Завантаження деталей поста"
                ></progress>
              </div>
            )}

            {detailsError && (
              <div className="alert alert--error" role="alert">
                {detailsError}
              </div>
            )}

            {post && (
              <article className="details-card">
                <div className="details-card__header">
                  <span className="badge badge--primary">Пост #{post.id}</span>
                  <span className="badge">
                    GET /posts/{post.id} + /users/{post.userId}
                  </span>
                </div>

                <h3 className="details-card__title">{post.title}</h3>

                <p className="details-card__body">{post.body}</p>

                <div className="author-box">
                  <p className="author-box__label">Інформація про автора</p>
                  {author ? (
                    <p className="author-box__info">
                      Автор: <strong>{author.name}</strong> (Email:{" "}
                      <a href={`mailto:${author.email}`}>{author.email}</a>)
                    </p>
                  ) : (
                    <p className="author-box__info">Завантаження автора...</p>
                  )}
                </div>
              </article>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
