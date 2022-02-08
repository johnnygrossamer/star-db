import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helper";
import { useParams } from "react-router-dom";

const StarshipDetails = (props) => {
    const { id } = useParams();
    return (
        <ItemDetails {... props} itemId={id}>
            <Record label="Model" field="model"/>
            <Record label="Length" field="length"/>
            <Record label="Cost" field="costInCredits"/>
        </ItemDetails>
    );
};

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    };
};

export default withSwapiService(mapMethodToProps)(StarshipDetails);