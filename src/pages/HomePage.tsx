import Navbar from "../components/NavbarComponent"
import WebsiteInformation from "../components/WebsiteInformationComponent"
import Footer from "../components/FooterComponent"
import { websiteInformationData } from "../global/textData";

export default function Home() {

    return(
        <>
            <Navbar/>
            <WebsiteInformation 
            headerText={websiteInformationData.headerText} 
            paragraphTextArray={websiteInformationData.paragraphs} 
            imgURLS={websiteInformationData.imageURLS}
            />
            <Footer/>
        </>
    )
}