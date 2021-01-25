import React, { useState } from 'react'
import Header from './Header'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'

export default function AddProduct() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    function valid() {
        if (!name) {
            NotificationManager.error(<b>Name is required!</b>);
            return false;
        } else if (!price) {
            NotificationManager.error(<b>price is required!</b>);
            return false;
        } else if (!selectedFile) {
            NotificationManager.error(<b>image is required!</b>);
            return false;
        } else if (!description) {
            NotificationManager.error(<b>description is required!</b>);
            return false;
        }
        return true;
    }
    async function addProduct() {

        let formData = new FormData();
        formData.append("file_path", selectedFile)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)
        if (valid()) {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/addProducts',
                data: formData
            })
                .then(response => {
                    NotificationManager.success(<b>{response.data.name} Product added successfully!</b>);
                    // history.push("/add")
                    setName("");
                    setSelectedFile("");
                    setPrice("");
                    setDescription("");

                })
                .catch(error => {
                    NotificationManager.error(<b>Something went wrong!</b>);
                })
        }

    }
    return (
        <div>
            <Header />
            <div className="col-sm-4 offset-sm-4">
                <h1>AddProduct</h1>
                <Form>
                    <input type="text" value={name} placeholder="Product Name" onChange={(e) => setName(e.target.value)} className="form-control" required="" />
                    <br />
                    {/* <input type="file" value={file} placeholder="Product Image" onChange={(e) => setFile(e.target.files[0])} className="form-control" /> */}
                    <input type="file" name="file" onChange={changeHandler} className="form-control" />

                    <br />
                    <input type="text" value={price} placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} className="form-control" />
                    <br />
                    <input type="text" value={description} placeholder="Product Description" onChange={(e) => setDescription(e.target.value)} className="form-control" />
                    <br />
                    <button type="reset" onClick={addProduct} className="btn btn-primary"> Add Product</button>
                </Form>
                <NotificationContainer />

            </div>
        </div>
    )
}
