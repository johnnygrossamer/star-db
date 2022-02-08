import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helper";

const PlanetDetails = (props) => {
    return  (
        <ItemDetails {...props}>
            <Record label="Population" field="population"/>
            <Record label="Rotation Period" field="rotationPeriod"/>
            <Record label="Diameter" field="diameter"/>
        </ItemDetails>
    );
};

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    };
};

export default withSwapiService(mapMethodToProps)(PlanetDetails);