import Navbar from "../components/NavbarComponent"
import Footer from "../components/FooterComponent"
import InformationBox from "../components/InformationBoxComponent"
import "../css/DashboardPage.css"
import { informationTypes } from "../global/variables"

export default function Dashboard() {

    return (
        <>
            <Navbar/>
            <div className="dashboard">
                <InformationBox header="Welcome" text="Visit notes page to see your saved notes" type={informationTypes.general}></InformationBox>
            </div>
            <Footer/>
        </>
    )
}