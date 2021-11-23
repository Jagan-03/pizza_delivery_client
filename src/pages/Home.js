import React from "react";

// Components
import Navbar from "../components/HomeNav";

const Home = () => {
    return (
        <div className="home container-fluid p-0">
        <Navbar />
        <div className="row homePage">
            {/* Column - 1 */}
            <div className="homeInfo col-lg-6 p-5 d-flex flex-column justify-content-center">
                <h2 className="text-light mb-4">FAST AND SAFE PIZZA DELIVERY</h2>
                <p className="text-white mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It </p>
            </div>
        </div>
        </div>
    )
}

export default Home;