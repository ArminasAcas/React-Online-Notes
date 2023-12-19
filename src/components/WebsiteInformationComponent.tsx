import "../css/WebsiteInformationComponent.css"

export default function WebsiteInformation(props: { headerText : string, paragraphTextArray: string[], imgURLS ?: string[]}) {

    if (!props.headerText || !props.paragraphTextArray || !Array.isArray(props.paragraphTextArray)) return null;

    const paragraphs = props.paragraphTextArray.map((paragraph, index) => <p key={index} className="web-information--text">{paragraph}</p>);
    let images;
    if (props.imgURLS) images = props.imgURLS.map((image, index) => <img src={image} key={index} className="web-information--image"></img>)

    return (
        <div className="web-information">
            <h1 className="web-information--header">{props.headerText}</h1>
            {paragraphs}
            {images ? <div className="web-information--images"> {images} </div> : null}
        </div>
    )
}