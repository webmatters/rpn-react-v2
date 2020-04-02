import React from 'react'
import { useForm } from 'react-hook-form'

import { sameAs } from 'helpers/validators'
import FormError from './FormError'

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" />
        {}
      </div> */}

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
          type="email"
          className="form-control"
          id="email"
          name="email"
        />
        <FormError errors={errors} name="email">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register({
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters.',
            },
          })}
          type="password"
          className="form-control"
          id="password"
          name="password"
        />
        <FormError errors={errors} name="password">
          {message => <p>{message}</p>}
        </FormError>
      </div>

      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          ref={register({
            required: true,
            minLength: 8,
            validate: { sameAs: sameAs('password', getValues) },
          })}
          type="password"
          className="form-control"
          id="passwordConfirmation"
          name="passwordConfirmation"
        />
        {errors.passwordConfirmation && (
          <div className="alert alert-danger">
            {errors.passwordConfirmation.type === 'required' && (
              <span>Password confirmation is required</span>
            )}
            {errors.passwordConfirmation.type === 'minLength' && (
              <span>Password confirmation must be at least 8 characters.</span>
            )}
            {errors.passwordConfirmation.type === 'sameAs' && (
              <span>Password confirmation does not match password. </span>
            )}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-rpn-main">
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
