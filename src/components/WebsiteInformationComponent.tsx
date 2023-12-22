import "../css/WebsiteInformationComponent.css"
import Container from "./ContainerComponent";

export default function WebsiteInformation(props: { headerText : string, paragraphTextArray: string[], imgURLS ?: string[]}) {

    if (!props.headerText || !props.paragraphTextArray || !Array.isArray(props.paragraphTextArray)) return null;

    const paragraphs = props.paragraphTextArray.map(
        (paragraph, index) => <p key={index} className="web-information__text">{paragraph}</p>
    );

    let images;
    if (props.imgURLS) images = props.imgURLS.map((image, index) => <img src={image} key={index} className="web-information__image"></img>)

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