import React, { Fragment} from 'react';
import '../App.css';
import HomeHero from "./HomeHero";
import AboutSection from "./AboutSection"

const Home = () => {

    return (
        <Fragment>
          <div className="App">
            <HomeHero />
            <AboutSection />
          </div>
        </Fragment>
    );
}

export default Home;
