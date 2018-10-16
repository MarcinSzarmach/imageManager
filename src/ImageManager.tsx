import * as React from 'react'
import './ImageManager.css'

class ImageManager extends React.Component {
    public state = {
        currentImagePixelsAmount: 0,
        imageBW: false,
        imagePixelsAmount: 0,
        imagePreviewUrl: '',
        imageRotate: 0,
    };
    public uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            reader.onloadend = () => {
                this.getImageFromFile(reader.result as string);
            }
            reader.readAsDataURL(file)
        }
    };
    public getImageFromFile = (fileContent : string) => {
        this.setState({
            imagePreviewUrl: fileContent
        });
        const img = document.getElementById('image') as HTMLImageElement;
        img.src = fileContent as string;
        window.onresize = () => {
            this.setState({
                currentImagePixelsAmount: img.offsetWidth * img.offsetHeight,
            });
        }
        img.onload = () => {
            this.setState({
                currentImagePixelsAmount: img.offsetWidth * img.offsetHeight,
                imagePixelsAmount: img.naturalHeight * img.naturalWidth,
            });
        };
    }
    
    public setRotate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            imageRotate: (event.target.value) ? event.target.value : 0
        });
    }
    public modeBW = () => {
        this.setState({
            imageBW: !this.state.imageBW,
        });
    }

    public render() {
        const imagePreviewUrl = this.state.imagePreviewUrl;
        // let $imagePreview = null;
        const divStyle = {
            filter: (this.state.imageBW) ? 'grayscale(100%)' : 'none',
            transform: 'rotate(' + this.state.imageRotate + 'deg)',
            transition: 'all .3s ease',
        };
        // if (imagePreviewUrl) {
        //     $imagePreview = (
        //         <div id="parentImage">
        //             <img id="image" className="img-fluid" style={divStyle} />
        //             <p>Original picture have {this.state.imagePixelsAmount} pixels</p>
        //             <p>Above picture have {this.state.currentImagePixelsAmount} pixels</p>
        //             <button onClick={this.modeBW}>Black and white</button>
        //             <div className="rotate">
        //                 <span>Rotate by </span>
        //                 <input className="btn-secondary btn" type="number" name="rotate" onChange={this.setRotate} />
        //                 <span> degree</span>
        //             </div>
        //         </div>);
        // }
        return (
            <div className="results" id="here">
                <input type="file" id="img" className="btn-primary btn" accept=".jpg,.png" onChange={this.uploadImage} />
                {imagePreviewUrl &&
                    <div id="parentImage">
                        <img id="image" className="img-fluid" style={divStyle} />
                        <p>Original picture have {this.state.imagePixelsAmount} pixels</p>
                        <p>Above picture have {this.state.currentImagePixelsAmount} pixels</p>
                        <button className="btn btn-success" onClick={this.modeBW}>Black and white</button>
                        <div className="rotate">
                            <span>Rotate by </span>
                            <input className="btn-secondary btn" type="number" name="rotate" onChange={this.setRotate} />
                            <span> degree</span>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default ImageManager
