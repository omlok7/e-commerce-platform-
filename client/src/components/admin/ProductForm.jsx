import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductForm({ editingProduct, onSuccess }) {

  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  };


  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    if (editingProduct) {

      setForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        stock: editingProduct.stock,
      });


      if (editingProduct.image) {
        setPreview(
          `http://localhost:5000/uploads/${editingProduct.image}`
        );
      }

    } else {

      setForm(initialState);
      setImage(null);
      setPreview("");

    }

  }, [editingProduct]);





  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };





  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    }

  };





  const uploadImage = async () => {

    if(!image) return null;


    const data = new FormData();

    data.append("image", image);


    const res = await api.post(

      "/upload",

      data,

      {
        headers:{
          "Content-Type":"multipart/form-data",
        },
      }

    );


    return res.data.image;

  };





  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);


      let imageName = null;


      if(image){

        imageName = await uploadImage();

      }


      const productData = {
        ...form,
      };


      if(imageName){

        productData.image = imageName;

      }



      if(editingProduct){


        await api.put(

          `/products/${editingProduct._id}`,

          productData

        );


        alert("Product updated successfully");


      }else{


        await api.post(

          "/products",

          productData

        );


        alert("Product added successfully");


      }


      onSuccess();



    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.message || "Error"
      );


    }finally{

      setLoading(false);

    }

  };





return (

<div className="card p-4 mb-4">


<h4>

{
editingProduct ?

<>

<i className="bi bi-pencil-square me-2"></i>
Update Product

</>

:

<>

<i className="bi bi-plus-circle me-2"></i>
Add Product

</>

}

</h4>




<form onSubmit={handleSubmit}>


<input

className="form-control mb-3"

placeholder="Product name"

name="name"

value={form.name}

onChange={handleChange}

/>



<textarea

className="form-control mb-3"

placeholder="Description"

name="description"

value={form.description}

onChange={handleChange}

/>





<input

className="form-control mb-3"

type="number"

placeholder="Price"

name="price"

value={form.price}

onChange={handleChange}

/>





<input

className="form-control mb-3"

placeholder="Category"

name="category"

value={form.category}

onChange={handleChange}

/>





<input

className="form-control mb-3"

type="number"

placeholder="Stock"

name="stock"

value={form.stock}

onChange={handleChange}

/>





<div className="mb-3">

<label className="form-label">

<i className="bi bi-image me-2"></i>

Product Image

</label>


<input

type="file"

className="form-control"

accept="image/*"

onChange={handleImageChange}

/>


</div>





{preview && (

<div className="text-center mb-3">

<img

src={preview}

width="200"

className="img-thumbnail"

alt="preview"

/>

</div>

)}





<button

className="btn btn-warning w-100"

disabled={loading}

>


{

loading ?

<>

<i className="bi bi-hourglass-split me-2"></i>

Saving...

</>

:

editingProduct ?

<>

<i className="bi bi-check-circle me-2"></i>

Update Product

</>

:

<>

<i className="bi bi-plus-circle me-2"></i>

Add Product

</>

}


</button>





{editingProduct && (

<button

type="button"

className="btn btn-secondary w-100 mt-2"

onClick={onSuccess}

>


<i className="bi bi-x-circle me-2"></i>

Cancel


</button>

)}



</form>


</div>

);

}


export default ProductForm;