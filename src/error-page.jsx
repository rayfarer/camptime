import { useRouteError } from "react-router-dom";
import fallingGnome from './assets/falling-gnome.gif';
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <img width='200px' src={fallingGnome} />
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}