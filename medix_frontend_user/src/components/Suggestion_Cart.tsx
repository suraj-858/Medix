import ContentWrapper from "./ContentWrapper"
import Recent_launch from "./Recent_launch"

const Suggestion_Cart = () => {

  return (
    <div className="my-6">
        <ContentWrapper>
            <div className="my-2">
                <h1 className="md:text-3xl text-2xl  font-semibold my-1">You may also like</h1>
                <hr className="max-w-[350px] border-0 h-[4px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-se-md" />
            </div>
            <section>
                <Recent_launch />
            </section>
        </ContentWrapper>
    </div>
  )
}

export default Suggestion_Cart