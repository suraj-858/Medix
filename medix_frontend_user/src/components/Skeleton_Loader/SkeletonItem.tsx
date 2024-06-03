import './Skeleton.css'
interface skeletonProps {
  result: boolean
}
const SkeletonItem = ({result}: skeletonProps) => {

  
  return (
    <div className=  {`${result === true ? 'skeletonItem': 'skeleton_crousel'}`}>
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
                <div className="cartBlock">
                    <div className="buy skeleton"></div>
                    <div className="buy skeleton"></div>
                </div>
            </div>
  )
}

export default SkeletonItem