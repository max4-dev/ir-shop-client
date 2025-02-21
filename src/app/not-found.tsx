import { Button } from "../shared/ui";

export default function NotFound() {
  return (
    <div className="container">
      <div className="notFound">
        <h2 className="title-b">Страница не найдена</h2>
        <Button className="notFoundButton" href="/" typeOf="link" icon="ArrowNextIcon">
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
