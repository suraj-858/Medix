import Highlight_section from "../components/Dashboard_Animated/Highlight_section";
import ContentWrapper from "../components/ContentWrapper";
import Upper from "../components/Dashboard_Animated/Upper";
import Order_Table from "../components/Order_Table";


const Dashboard_editor = () => {
 
  return (
    <div className="  h-full w-full">
        <ContentWrapper>
        <div className=" mx-6 my-4">
        <h1 className="lg:text-3xl font-semibold md:text-2xl">Dashboard</h1>
      </div>
          <Upper/>
        <Highlight_section/>
        <Order_Table/>
        </ContentWrapper>
    </div>
  )
}

export default Dashboard_editor