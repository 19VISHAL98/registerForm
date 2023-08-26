import React from 'react'
import '../components/form.css'
import { useFormik } from 'formik'
import InputFunction from './InputFunction'
import * as Yup from 'yup';
const CandidateForm = () => {

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    dob: Yup.string().required('Date of Birth is required'),
    currentAddress: Yup.string().required('Address is required'),
    currentDistrict: Yup.string().required('Address is required'),
    
  })


  const formik = useFormik({
    initialValues: {
        fname:"",
        lname:"",
        email:"",
        dob:"",
        currentAddress: '',
        currentDistrict: '',
        useSameAddress: false,
        permanentAddress: '',
        permanentDistrict: '',
        documents:[
          {
            file:"",
            fileName:"",
            fileType:""
          }
        ]
    },
    validationSchema:validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(values)
      }).then(response=>response.json()).catch(err=>console.log(err))
      console.log(res)
      if(res.status===true){
        alert("Registration Completed")
      }
      else{
        alert("Something Went wrong")
      }
      resetForm()
    }
  })
  const handleAddRow = () => {
    formik.setFieldValue('documents', [
      ...formik.values.documents,
      { file: '', fileName: '', fileType: '' },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newDocuments = [...formik.values.documents];
    newDocuments.splice(index, 1);
    formik.setFieldValue('documents', newDocuments);
  };

  const handleCheckboxChange = (e) => {
    formik.handleChange(e); // Handle checkbox change using Formik's handleChange

    if (formik.values.useSameAddress) {
      formik.setFieldValue('permanentAddress', formik.values.currentAddress);
      formik.setFieldValue('permanentDistrict', formik.values.currentDistrict);
    } else {
      formik.setFieldValue('permanentAddress', '');
      formik.setFieldValue('permanentDistrict', '');
    }
  };
  const validateFile = (file, fileType) => {
    if (fileType === 'pdf' && file.type !== 'application/pdf') {
      return 'Invalid file type. Please upload a PDF file.';
    }
    // Add more validation for other file types as needed
    return null;
  };
  


  return (
<InputFunction
handleCheckboxChange={handleCheckboxChange}
handleAddRow={handleAddRow}
handleRemoveRow={handleRemoveRow}
formik={formik}
validateFile={validateFile}
/>
  )
}

export default CandidateForm