import "../css/FooterComponent.css"

export default function Footer(props: {footerText ?: string}) {
    if (!props.footerText) return ( <span  className="footer">© 2023 Online Notes</span> )
    return ( <span  className="footer">{props.footerText}</span> )
}