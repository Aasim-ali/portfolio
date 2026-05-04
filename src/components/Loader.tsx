const Loader = ({ loading }: { loading: boolean }) => {
    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
                <div className="text-[#514b82] text-4xl font-bold flex items-center gap-1">
                    <div className="loader"></div>
                </div>
            </div>
        )
    return <></>
}

export default Loader