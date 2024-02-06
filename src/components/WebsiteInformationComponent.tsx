import "../css/WebsiteInformationComponent.css"
import Container from "./ContainerComponent";

export default function WebsiteInformation(props: { headerText : string, paragraphTextArray: string[], imgURLS ?: string[]}) {

    let paragraphs;
    let images;

    function mapData() {
        paragraphs = props.paragraphTextArray.map(
            (paragraph, index) => <p key={index} className="web-information__text">{paragraph}</p>
        );
    
        if (props.imgURLS) images = props.imgURLS.map(
            (image, index) => <img src={image} key={index} className="web-information__image"></img>
        );
    }

    mapData();

    return (
        <Container>
            <div className="web-information">
                <h1 className="web-information__header">{props.headerText}</h1>
                {paragraphs}
                {images ? <div className="web-information__images"> {images} </div> : null}
            </div>
        </Container>
        
    )
}