import "../css/FooterComponent.css"

export default function Footer(props: {footerText : string}) {
    if (!props.footerText) return;
    
    return ( 
        <span  className="footer">{props.footerText}</span>
    )
}