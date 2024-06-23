import './HomeSlider.scss'

export default function HomeSlider(){

    // Loading images dynamically using import.meta.glob (glob is a special Vite feature)
    const imageModules = import.meta.glob("../../assets/home-slider/*", {eager: true})
    const images = Object.values(imageModules).map((imageModule: any) => imageModule.default)
    console.log(images)
    return  (
        <div className="home-slider">
            <div className="home-slider_track">
                {images.map( (imagePath: string, index) => {
                    return (
                        <img key={index} src={imagePath}/>
                    )
                }
                    
                )}
                {/* Duplicate images to create a seamless loop */}
                {images.map( (imagePath: string, index) => {
                    return (
                        <img key={'dup-' + index} src={imagePath}/>
                    )
                }
                    
                )}
            </div>
        </div>
    )
}