import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from '../hoc-helper';

const PersonDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record label="Gender" field="gender"/>
            <Record label="Birth Year" field="birthYear"/>
            <Record label="Eye Color" field="eyeColor"/>
        </ItemDetails>
    );
};

const mapMethodToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    };
};

export default withSwapiService(mapMethodToProps)(PersonDetails);