'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  })
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ''
    )
    setIsFormValid(isValid)
  }, [formData])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const reset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      Message: '',
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)

    fetch('https://formsubmit.co/ajax/bhainirav772@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Name: formData.firstname,
        LastName: formData.lastname,
        Email: formData.email,
        PhoneNo: formData.phnumber,
        Message: formData.Message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowThanks(true)
          reset()
          setTimeout(() => {
            setShowThanks(false)
          }, 5000)
        } else {
          reset()
        }
      })
      .catch((error) => {
        console.error('Form submission error:', error)
      })
      .finally(() => {
        setLoader(false)
      })
  }
  return (
    <section id='contact' className='scroll-mt-12'>
      <div className='container'>
        <div className='relative'>
          <h2 className='mb-9 text-center'>Start Your Project</h2>
          <p className='text-lg font-normal text-center max-w-2xl mx-auto mb-8'>
            Discuss your enterprise technology needs with our team.
          </p>
          <div className='relative border px-6 py-2 rounded-lg border-darkazure/20 bg-darkazure/5'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-wrap w-full m-auto justify-between'>
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='fname'
                    className='pb-3 inline-block text-base'>
                    First Name
                  </label>
                  <input
                    id='fname'
                    type='text'
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder='John'
                    className='w-full text-base px-4 rounded-lg border-darkazure/20 py-2.5 border-solid border transition-all duration-300 focus:border-darkazure focus:outline-0'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='lname'
                    className='pb-3 inline-block text-base'>
                    Last Name
                  </label>
                  <input
                    id='lname'
                    type='text'
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder='Doe'
                    className='w-full text-base px-4 rounded-lg border-darkazure/20 py-2.5 border-solid border transition-all duration-300 focus:border-darkazure focus:outline-0'
                  />
                </div>
              </div>
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='email'
                    className='pb-3 inline-block text-base'>
                    Email Address
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='john.doe@example.com'
                    className='w-full text-base px-4 rounded-lg border-darkazure/20 py-2.5 border-solid border transition-all duration-300 focus:border-darkazure focus:outline-0'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='Phnumber'
                    className='pb-3 inline-block text-base'>
                    Phone Number
                  </label>
                  <input
                    id='Phnumber'
                    type='tel'
                    name='phnumber'
                    placeholder='+1234567890'
                    value={formData.phnumber}
                    onChange={handleChange}
                    className='w-full text-base px-4 py-2.5 rounded-lg border-darkazure/20 border-solid border transition-all duration-300 focus:border-darkazure focus:outline-0'
                  />
                </div>
              </div>
              <div className='w-full mx-0 my-2.5 flex-1'>
                <label htmlFor='message' className='text-base inline-block'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='Message'
                  value={formData.Message}
                  onChange={handleChange}
                  className='w-full mt-2 px-5 py-3 rounded-lg border-darkazure/20 border-solid border transition-all duration-300 focus:border-darkazure focus:outline-0'
                  placeholder='Please share your message or inquiry'></textarea>
              </div>
              <div className='mx-0 my-2.5 w-full'>
                <button
                  type='submit'
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-lg transition-all duration-300
                    ${
                      !isFormValid || loader
                        ? 'bg-lightgrey/50 text-lightgrey cursor-not-allowed border-lightgrey/50'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
          {showThanks && (
            <div className='text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2'>
              Thank you for contacting us! We will get back to you soon.
              <div className='w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent'></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
