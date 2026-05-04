const Loader = ({ loading }: { loading: boolean }) => {
    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
                <div className="text-white text-4xl font-bold">
                    Loading...
                </div>
            </div>
        )
    return <></>
}

export default Loader