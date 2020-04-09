import React from 'react'
import { useForm } from 'react-hook-form'

import FormError from './FormError'

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const NannyNewForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          ref={register({
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters.',
            },
          })}
          name="name"
          type="text"
          className="form-control"
          id="name"
        />
        <FormError errors={errors} name="name">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="address1">Address 1</label>
        <input
          ref={register({
            required: 'Address is required',
            minLength: {
              value: 4,
              message: 'Address must be at least 4 characters.',
            },
          })}
          name="address1"
          type="text"
          className="form-control"
          id="address1"
        />
        <FormError errors={errors} name="address1">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="address2">Address 2</label>
        <input
          ref={register}
          name="address2"
          type="text"
          className="form-control"
          id="address2"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          ref={register({
            required: 'City is required',
            minLength: {
              value: 2,
              message: 'City must be at least 2 characters.',
            },
          })}
          name="city"
          type="text"
          className="form-control"
          id="city"
        />
        <FormError errors={errors} name="city">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="state">State (2-letter)</label>
        <input
          ref={register({
            required: 'State is required',
            minLength: {
              value: 2,
              message: 'State must be 2 character abbreviation.',
            },
            maxLength: {
              value: 2,
              message: 'State must be 2 character abbreviation.',
            },
          })}
          name="state"
          type="text"
          className="form-control"
          id="state"
        />
        <FormError errors={errors} name="state">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="zip">Zip Code</label>
        <input
          ref={register({
            required: 'Zip Code is required',
            minLength: {
              value: 5,
              message: 'Zip Code must be at least 5 characters.',
            },
          })}
          name="zip"
          type="text"
          className="form-control"
          id="zip"
        />
        <FormError errors={errors} name="zip">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register({
            required: 'Email is required',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Please provide a valid email address',
            },
          })}
          name="email"
          type="email"
          className="form-control"
          id="email"
        />
        <FormError errors={errors} name="email">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          ref={register({
            required: 'Phone Number is required',
            minLength: {
              value: 10,
              message: 'Phone number must be at least 10 characters.',
            },
          })}
          name="phone"
          type="tel"
          className="form-control"
          id="phone"
        />
        <FormError errors={errors} name="phone">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image Url</label>
        <input
          ref={register({
            required: 'Image is required',
          })}
          name="image"
          type="text"
          className="form-control"
          id="image"
        />
        <FormError errors={errors} name="image">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="headline">Headline</label>
        <input
          ref={register({
            required: 'Headline is required',
            minLength: {
              value: 2,
              message: 'Headline must be at least 2 characters.',
            },
          })}
          name="headline"
          type="text"
          className="form-control"
          id="headline"
        />
        <FormError errors={errors} name="headline">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register({
            required: 'Description is required',
            minLength: {
              value: 2,
              message: 'Description must be at least 2 characters.',
            },
          })}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        ></textarea>
        <FormError errors={errors} name="description">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="hourlyRate">Hourly Rate</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            ref={register({
              required: 'Hourly Rate is required',
              min: {
                value: 0,
                message: 'Hourly rate must be a positive number.',
              },
            })}
            name="hourlyRate"
            type="number"
            className="form-control"
            id="hourlyRate"
          />
        </div>
        <FormError errors={errors} name="hourlyRate">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      {/* <div className="form-group">
        <label htmlFor="milesRadius">Miles Will Drive</label>
        <input
          ref={register}
          name="milesRadius"
          type="text"
          className="form-control"
          id="milesRadius"
        />
      </div> */}

      <button type="submit" className="btn btn-rpn-main">
        Create
      </button>
    </form>
  )
}

export default NannyNewForm
