
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Hero from '../components/landing_page_components/Hero';
import Services from '../components/landing_page_components/Services'
import Banner from '../components/landing_page_components/Banner';
import AppStore from '../components/landing_page_components/AppStore';
import Books from '../components/landing_page_components/Books';


const Home = () => {

  return (
    <div>
      <Navbar />
      <div className="bg-white dark:bg-white dark:text-gray-800 duration-200">
        <Hero />
        <Services />
        <Banner />
        <AppStore />
        <Books />
      </div>
      <Footer />
    </div>
  )
}

export default Home