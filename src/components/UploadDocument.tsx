import { Component } from "react";
import DocumentDataService from "../services/announcement.service";
import "./UploadDocument.css";
import DocumentData from "../types/announcement.type";

type Props = {
    name: string,
    parentCallback: any,
}

type State = {
    file: any;
    base64URL: any;
    isUploaded: boolean;
}

export default class UploadDocument extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            file: null,
            base64URL: null,
            isUploaded: false,
        }
        this.getBase64 = this.getBase64.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.toggleUploadButton = this.toggleUploadButton.bind(this);
        this.onTrigger = this.onTrigger.bind(this);
    }

    toggleUploadButton() {
        this.setState( {
            file: this.state.file,
            base64URL: this.state.base64URL,
            isUploaded: !this.state.isUploaded
            }
        )
    }

    onTrigger() {
        this.props.parentCallback(this.state.base64URL);
    }

    getBase64 = (file:any) => {
        return new Promise(resolve => {
            let baseURL:any = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    handleFileInputChange = (e:any) => {
        this.toggleUploadButton();
        let { file } = this.state;
        file = e.target.files[0];
        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                this.setState({
                    base64URL: result,
                    file
                });
                this.onTrigger();
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };
    render() {
        const { isUploaded, file, base64URL } = this.state;
        const { name } = this.props;

        return (
        <div className={`box ${isUploaded ? "green" : "red"}`}>
            <div className="file-upload btn btn-secondary">
                <span>{name}</span>

                <input type="file" accept="application/pdf" className="upload" id="upload-btn" onChange={this.handleFileInputChange}/>
                <i className="fa fa-upload icon"></i>
            </div>
        </div>
        );
    }
}
//<div>{file?.name}</div>