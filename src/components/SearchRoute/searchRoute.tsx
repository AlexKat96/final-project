import PageError from "../PageError/pageError";
import Search from "../Search/search";

interface PrivateRouteProps {
    autorize: boolean,
    setJson: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ autorize, setJson }) => {

    if (autorize) {
        return (
            <Search setJson={setJson} />
        )
    }
    return (
        <PageError />
    )
};

export default PrivateRoute;