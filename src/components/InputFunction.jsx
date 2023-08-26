import React from 'react'
import '../components/form.css'
import {AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'
const InputFunction = ({formik,handleCheckboxChange,handleAddRow,handleRemoveRow,validateFile}) => {
  return (
    <div className="form-container">
  <div className="form-body">
  <h1>Registration Form</h1>
    <form action="#" onSubmit={formik.handleSubmit} >

      <div className="input-container">
       <div className="input-field">
        <label htmlFor="fname">First Name <span>*</span></label> <br />
        <input type="text" name="fname" id="" value={formik.values.fname} onChange={formik.handleChange} placeholder='Enter your first name here...' />
        {formik.touched.fname && formik.errors.fname && (
                      <span className="error">{formik.errors.fname}</span>
                    )}
       </div>
       <div className="input-field">
        <label htmlFor="lname">Last Name <span>*</span></label> <br />
        <input type="text" name="lname" value={formik.values.lname} onChange={formik.handleChange} id="" placeholder='Enter your last name here...' />
        {formik.touched.lname && formik.errors.lname && (
                      <span className="error">{formik.errors.lname}</span>
                    )}
       </div>
      </div>
      <div className="input-container">
       <div className="input-field">
        <label htmlFor="email">Email <span>*</span></label> <br />
        <input type="text" name="email" id="" value={formik.values.email} onChange={formik.handleChange} placeholder='@gmail.com' />
        {formik.touched.email && formik.errors.email && (
                      <span className="error">{formik.errors.email}</span>
                    )}
       </div>
       <div className="input-field">
        <label htmlFor="dob">Date of Birth <span>*</span></label> <br />
        <input type="date" name="dob" value={formik.values.dob} onChange={formik.handleChange} id="" placeholder='Date of Birth'/>
        {formik.touched.dob && formik.errors.dob && (
                      <span className="error">{formik.errors.dob}</span>
                    )}
       </div>
      </div>
      
   <div className="r-address-container">
    <h3>Residential Address</h3>
   <div className="input-container">
       <div className="input-field-a">
        <label htmlFor="currentAddress">Street 1 <span>*</span></label> <br />
        <input
          type="text"
          id="currentAddress"
          name="currentAddress"
          onChange={formik.handleChange}
          value={formik.values.currentAddress}
        />
          {formik.touched.currentAddress && formik.errors.currentAddress && (
                      <span className="error">{formik.errors.currentAddress}</span>
                    )}
       </div>
       <div className="input-field-a">
        <label htmlFor="currentDistrict">Street 2 <span>*</span></label> <br />
        <input
          type="text"
          id="currentDistrict"
          name="currentDistrict"
          onChange={formik.handleChange}
          value={formik.values.currentDistrict}
        />
          {formik.touched.currentDistrict && formik.errors.currentDistrict && (
                      <span className="error">{formik.errors.currentDistrict}</span>
                    )}
       </div>
      </div>
   </div>
   <div className="r-address-container">
    <div className="c-container">
    <input
          type="checkbox"
          id="useSameAddress"
          name="useSameAddress"
          checked={formik.values.useSameAddress}
          onChange={handleCheckboxChange}
        />
     <h3>Same as Residential Address </h3>
    </div>
    <h3>Permanent Address</h3>
   <div className="input-container">
       <div className="input-field-a">
        <label htmlFor="permanentAddress">Street 1 <span>*</span></label> <br />
        <input
          type="text"
          id="permanentAddress"
          name="permanentAddress"
          onChange={formik.handleChange}
          value={
            formik.values.useSameAddress
              ? formik.values.currentAddress
              : formik.values.permanentAddress
          }
          disabled={formik.values.useSameAddress}
        />
       </div>
       <div className="input-field-a">
        <label htmlFor="permanentDistrict">Street 2 <span>*</span></label> <br />
        <input
          type="text"
          id="permanentDistrict"
          name="permanentDistrict"
          onChange={formik.handleChange}
          value={
            formik.values.useSameAddress
              ? formik.values.currentDistrict
              : formik.values.permanentDistrict
          }
          disabled={formik.values.useSameAddress}
        />
       </div>
      </div>
   </div>
   <div className="r-address-container">
 <div className="add-btn-container">
 <h3>Upload Document</h3>
    <div className="add-btn-1" onClick={handleAddRow}>
        <AiOutlinePlus className='icon'/>
       </div>
 </div>
    {
 formik?.values?.documents.map((document, index) => (
  <div className='input-container' key={index}>
    <div className="input-field-a-b">
    <label htmlFor="fname">File Name <span>*</span></label> <br />
    <input  type="text"
            placeholder="File Name"
            value={document.fileName}
            onChange={(event) =>
              formik.setFieldValue(
                `documents[${index}].fileName`,
                event.target.value
              )
            } />
            
   </div>
   <div className="input-field-a-b">
    <label htmlFor="fname">Type of File <span>*</span></label> <br />
    <select
            value={document.fileType}
            onChange={(event) =>
              formik.setFieldValue(
                `documents[${index}].fileType`,
                event.target.value
              )
            }
          >
            <option value="">Select File Type</option>
            <option value="pdf">PDF</option>
            <option value="doc">DOC</option>
            <option value="image">Image</option>
            {/* Add more options as needed */}
          </select>
         
   </div>
   <div className="input-field-a-b">
    <label htmlFor="fname">Upload Document <span>*</span></label> <br />
    <input  type="file"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              const fileType = document.fileType;
              const validationError = validateFile(file, fileType);

              if (!validationError) {
                formik.setFieldValue(`documents[${index}].file`, file);
              } else {
                event.target.value = null; // Reset the input
                alert(validationError);
              }
            }} />
             
   </div>
   <div className="add-btn" onClick={() => handleRemoveRow(index)}>
   <RiDeleteBinLine className='icon'/>
       
   </div>
  </div>
 ))
    }
      
      
   
   </div>
   <div className="btn-container">
    <button type='submit'>Submit</button>
   </div>
    </form>
  </div>
 </div>
  )
}

export default InputFunction