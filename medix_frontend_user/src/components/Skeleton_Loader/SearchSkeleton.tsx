import './Skeleton.css'

const SearchSkeleton = () => {
    return (
        <div className='searchSkeleton'>
            <div className="searchSkeletonImage skeleton"></div>
            <div className="searchtextBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
                <div className="serachCartBlock">
                    <div className="buy skeleton"></div>
                    <div className="buy skeleton"></div>
                </div>
            </div>
        </div>
    )
}

export default SearchSkeleton
 